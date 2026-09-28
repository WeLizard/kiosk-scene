from __future__ import annotations

import hashlib
import re
import sqlite3
from typing import Any, Callable

from ..clock import Clock
from ..db import Database, loads
from ..embeddings import Embedder, HashingEmbedder, cosine, pack, unpack
from ..text import normalize, similarity, stem, tokens


class SearchService:
    """Hybrid retrieval over items, locations, notes, tasks and calendar events.

    Ranking = reciprocal-rank fusion of (1) FTS5/bm25 over stemmed tokens, (2) trigram fuzzy similarity of the
    query to names, (3) embedding cosine. The response says which of these contributed (`matched_by`) and which
    embedder was used, so "semantic" is only claimed when a real model answered.
    """

    KINDS = ("item", "location", "note", "task", "event")

    def __init__(self, db: Database, clock: Clock, embedder: Embedder | None = None) -> None:
        self.db = db
        self.clock = clock
        self.hashing = HashingEmbedder()
        self.model_embedder: Embedder | None = embedder
        self._doc_builders: dict[str, Callable[[sqlite3.Connection, int], tuple[str, str] | None]] = {}

    def register(self, kind: str, builder: Callable[[sqlite3.Connection, int], tuple[str, str] | None]) -> None:
        """`builder(conn, id) -> (title, body_text)` or None when the entity is gone/deleted."""
        self._doc_builders[kind] = builder

    def set_model_embedder(self, embedder: Embedder | None) -> None:
        self.model_embedder = embedder

    # ---- index maintenance ---------------------------------------------------------------------

    def reindex(self, conn: sqlite3.Connection, kind: str, ref_id: int) -> None:
        builder = self._doc_builders.get(kind)
        doc = builder(conn, ref_id) if builder else None
        conn.execute("DELETE FROM search_docs WHERE kind = ? AND ref_id = ?", (kind, ref_id))
        conn.execute("DELETE FROM embeddings WHERE kind = ? AND ref_id = ?", (kind, ref_id))
        if self.db.fts_enabled:
            conn.execute("DELETE FROM search_fts WHERE kind = ? AND ref_id = ?", (kind, ref_id))
        if not doc:
            return
        title, body = doc
        text = f"{title}\n{body}".strip()
        conn.execute("INSERT INTO search_docs(kind, ref_id, text) VALUES (?,?,?)", (kind, ref_id, text))
        if self.db.fts_enabled:
            conn.execute(
                "INSERT INTO search_fts(text, kind, ref_id) VALUES (?,?,?)", (" ".join(tokens(text)), kind, ref_id)
            )
        digest = hashlib.sha1(text.encode("utf-8")).hexdigest()
        vec = self.hashing.embed([text])[0]
        conn.execute(
            "INSERT OR REPLACE INTO embeddings(kind, ref_id, model, text_hash, vec) VALUES (?,?,?,?,?)",
            (kind, ref_id, self.hashing.name, digest, pack(vec)),
        )

    def rebuild_all(self) -> int:
        count = 0
        with self.db.write() as conn:
            conn.execute("DELETE FROM search_docs")
            conn.execute("DELETE FROM embeddings WHERE model = ?", (self.hashing.name,))
            if self.db.fts_enabled:
                conn.execute("DELETE FROM search_fts")
            tables = {"item": "items", "location": "locations", "note": "notes", "task": "tasks", "event": "calendar_events"}
            for kind, table in tables.items():
                for row in conn.execute(f"SELECT id FROM {table} WHERE deleted_at IS NULL").fetchall():
                    self.reindex(conn, kind, int(row["id"]))
                    count += 1
        return count

    def backfill_model_embeddings(self, limit: int = 64) -> int:
        """Embed documents that have no vector from the configured model yet (provider may have been down)."""
        embedder = self.model_embedder
        if embedder is None:
            return 0
        with self.db.read() as conn:
            rows = conn.execute(
                """SELECT d.kind, d.ref_id, d.text FROM search_docs d
                   LEFT JOIN embeddings e ON e.kind = d.kind AND e.ref_id = d.ref_id AND e.model = ?
                   WHERE e.ref_id IS NULL LIMIT ?""",
                (embedder.name, limit),
            ).fetchall()
        if not rows:
            return 0
        vectors = embedder.embed([r["text"] for r in rows])
        with self.db.write() as conn:
            for row, vec in zip(rows, vectors):
                digest = hashlib.sha1(row["text"].encode("utf-8")).hexdigest()
                conn.execute(
                    "INSERT OR REPLACE INTO embeddings(kind, ref_id, model, text_hash, vec) VALUES (?,?,?,?,?)",
                    (row["kind"], row["ref_id"], embedder.name, digest, pack(vec)),
                )
        return len(rows)

    # ---- query ---------------------------------------------------------------------------------

    def search(self, query: str, *, kinds: list[str] | None = None, limit: int = 20) -> dict[str, Any]:
        query = (query or "").strip()
        wanted = [k for k in (kinds or self.KINDS) if k in self.KINDS]
        if not query or not wanted:
            return {"query": query, "mode": "lexical", "embedder": self.hashing.name, "hits": []}
        q_tokens = [t for t in tokens(query, drop_stopwords=True) if t]
        if not q_tokens:
            q_tokens = tokens(query)
        rankings: dict[str, list[tuple[str, int]]] = {}
        with self.db.read() as conn:
            fts = self._fts(conn, q_tokens, wanted, limit * 4)
            docs = conn.execute(
                f"SELECT kind, ref_id, text FROM search_docs WHERE kind IN ({','.join('?' * len(wanted))})", wanted
            ).fetchall()
            model_vecs: dict[tuple[str, int], list[float]] = {}
            hash_vecs: dict[tuple[str, int], list[float]] = {}
            model = self.model_embedder
            for row in conn.execute(
                "SELECT kind, ref_id, model, vec FROM embeddings WHERE model IN (?, ?)",
                (self.hashing.name, model.name if model else self.hashing.name),
            ).fetchall():
                target = model_vecs if model and row["model"] == model.name else hash_vecs
                target[(row["kind"], row["ref_id"])] = unpack(row["vec"])
        by_key = {(d["kind"], d["ref_id"]): d["text"] for d in docs}
        rankings["fts"] = [(f"{k}:{i}", n) for n, (k, i) in enumerate(fts)]

        fuzzy_scores = []
        for (kind, ref_id), text in by_key.items():
            title = text.split("\n", 1)[0]
            score = max(similarity(query, title), similarity(" ".join(q_tokens), " ".join(tokens(title))))
            if score >= 0.45:
                fuzzy_scores.append((score, kind, ref_id))
        fuzzy_scores.sort(reverse=True)
        rankings["fuzzy"] = [(f"{k}:{i}", n) for n, (_, k, i) in enumerate(fuzzy_scores[: limit * 3])]

        semantic_used = False
        query_vec_hash = self.hashing.embed([query])[0]
        vec_scores = [(cosine(query_vec_hash, vec), key) for key, vec in hash_vecs.items() if key in by_key]
        vec_scores = [item for item in vec_scores if item[0] >= 0.35]
        vec_name = "vector"
        if model and model_vecs:
            try:
                qv = model.embed([query])[0]
                scored = [(cosine(qv, vec), key) for key, vec in model_vecs.items() if key in by_key]
                vec_scores = [item for item in scored if item[0] >= 0.3]
                semantic_used = model.semantic
            except Exception:  # provider down: keep lexical results, never fail the search
                pass
        vec_scores.sort(reverse=True)
        rankings[vec_name] = [(f"{k}:{i}", n) for n, (_, (k, i)) in enumerate(vec_scores[: limit * 3])]

        fused: dict[str, float] = {}
        matched: dict[str, list[str]] = {}
        for name, ranking in rankings.items():
            for key, position in ranking:
                fused[key] = fused.get(key, 0.0) + 1.0 / (60 + position)
                matched.setdefault(key, []).append(name)
        ordered = sorted(fused.items(), key=lambda kv: kv[1], reverse=True)[:limit]
        hits = []
        for key, score in ordered:
            kind, ref = key.split(":")
            text = by_key.get((kind, int(ref)), "")
            title, _, body = text.partition("\n")
            hits.append({
                "kind": kind, "id": int(ref), "title": title, "snippet": body[:160],
                "score": round(score * 60, 4), "matched_by": matched[key],
            })
        return {
            "query": query,
            "mode": "hybrid" if semantic_used else "lexical",
            "embedder": (model.name if semantic_used and model else self.hashing.name),
            "hits": hits,
        }

    def _fts(self, conn: sqlite3.Connection, q_tokens: list[str], kinds: list[str], limit: int) -> list[tuple[str, int]]:
        if not q_tokens:
            return []
        placeholders = ",".join("?" * len(kinds))
        if self.db.fts_enabled:
            safe = [re.sub(r'[^0-9a-zа-я]', "", t) for t in q_tokens]
            safe = [t for t in safe if t]
            for joiner, suffix in (("AND", ""), ("OR", "*")):
                if not safe:
                    break
                match = f" {joiner} ".join(f'"{t}"{suffix}' for t in safe)
                try:
                    rows = conn.execute(
                        f"SELECT kind, ref_id FROM search_fts WHERE search_fts MATCH ? AND kind IN ({placeholders}) "
                        "ORDER BY bm25(search_fts) LIMIT ?",
                        (match, *kinds, limit),
                    ).fetchall()
                except sqlite3.OperationalError:
                    rows = []
                if rows:
                    return [(r["kind"], int(r["ref_id"])) for r in rows]
            return []
        # No FTS5 in this SQLite build: score documents by matched-token count.
        rows = conn.execute(
            f"SELECT kind, ref_id, text FROM search_docs WHERE kind IN ({placeholders})", kinds
        ).fetchall()
        scored = []
        for row in rows:
            doc_tokens = set(tokens(row["text"]))
            hit = sum(1 for t in q_tokens if t in doc_tokens)
            if hit:
                scored.append((hit, row["kind"], int(row["ref_id"])))
        scored.sort(reverse=True)
        return [(k, i) for _, k, i in scored[:limit]]
