function je(e, n) {
  for (const t of n)
    t == null || t === !1 || (Array.isArray(t) ? je(e, t) : t instanceof Node ? e.appendChild(t) : e.appendChild(document.createTextNode(String(t))));
}
function a(e, n, ...t) {
  const i = document.createElement(e);
  for (const [s, o] of Object.entries(n ?? {}))
    if (!(o == null || o === !1))
      if (s === "class")
        i.className = String(o);
      else if (s === "style")
        typeof o == "string" ? i.setAttribute("style", o) : Object.assign(i.style, o);
      else if (s === "dataset")
        for (const [r, u] of Object.entries(o))
          u !== void 0 && (i.dataset[r] = String(u));
      else if (s === "aria")
        for (const [r, u] of Object.entries(o))
          u !== void 0 && i.setAttribute(`aria-${r}`, String(u));
      else s.startsWith("on") && typeof o == "function" ? i.addEventListener(s.slice(2).toLowerCase(), o) : s === "value" || s === "checked" || s === "disabled" || s === "selected" ? i[s] = o : o === !0 ? i.setAttribute(s, "") : i.setAttribute(s, String(o));
  return je(i, t), i;
}
function yt(e) {
  for (; e.firstChild; )
    e.removeChild(e.firstChild);
}
function S(e, ...n) {
  yt(e), je(e, n);
}
class I {
  callbacks = [];
  disposed = !1;
  add(n) {
    if (this.disposed) {
      n();
      return;
    }
    this.callbacks.push(n);
  }
  listen(n, t, i) {
    n.addEventListener(t, i), this.add(() => n.removeEventListener(t, i));
  }
  get isDisposed() {
    return this.disposed;
  }
  dispose() {
    if (!this.disposed) {
      this.disposed = !0;
      for (const n of this.callbacks.splice(0).reverse())
        try {
          n();
        } catch {
        }
    }
  }
}
function Qe(e, n) {
  let t = null;
  const i = (...s) => {
    t && clearTimeout(t), t = setTimeout(() => {
      t = null, e(...s);
    }, n);
  };
  return i.cancel = () => {
    t && (clearTimeout(t), t = null);
  }, i;
}
function wt(e) {
  return e.endsWith("/") ? e : `${e}/`;
}
function xt(e, n) {
  const t = n && typeof n == "object" ? n : {}, s = (t.error && typeof t.error == "object" ? t.error : null) ?? t, o = typeof s.message == "string" ? s.message : typeof t.error == "string" ? t.error : `Request failed (HTTP ${e})`, r = s.fields && typeof s.fields == "object" ? Object.fromEntries(Object.entries(s.fields).map(([u, d]) => [u, String(d)])) : void 0;
  return {
    code: typeof s.code == "string" ? s.code : `http_${e}`,
    message: o,
    fields: r,
    retryable: e >= 500 || e === 429 || e === 408
  };
}
function _t(e) {
  const n = e.fetchImpl ?? ((...o) => globalThis.fetch(...o)), t = wt(e.baseUrl);
  function i(o, r) {
    const u = new URL(o.replace(/^\/+/, ""), new URL(t, globalThis.location?.href ?? "http://localhost/"));
    for (const [d, l] of Object.entries(r ?? {}))
      l != null && l !== "" && u.searchParams.set(d, String(l));
    return u.toString();
  }
  async function s(o, r = {}) {
    const u = new AbortController(), d = r.timeoutMs ?? e.timeoutMs ?? 15e3, l = setTimeout(() => u.abort(new DOMException("Request timed out", "TimeoutError")), d), c = () => u.abort(r.signal?.reason);
    r.signal?.addEventListener("abort", c, { once: !0 }), r.signal?.aborted && c();
    try {
      const p = { Accept: "application/json", ...e.headers ?? {}, ...r.headers ?? {} }, m = e.getToken?.();
      m && (p.Authorization = `Bearer ${m}`);
      let v;
      r.rawBody !== void 0 ? v = r.rawBody : r.body !== void 0 && (p["Content-Type"] = "application/json", v = JSON.stringify(r.body));
      const h = await n(i(o, r.query), {
        method: r.method ?? (v === void 0 ? "GET" : "POST"),
        headers: p,
        body: v,
        cache: "no-store",
        signal: u.signal
      });
      let b = null;
      const y = await h.text();
      if (y)
        try {
          b = JSON.parse(y);
        } catch {
          b = { message: y.slice(0, 200) };
        }
      if (!h.ok) {
        const k = xt(h.status, b);
        return h.status === 401 && e.onUnauthorized?.(k), { ok: !1, error: k };
      }
      return { ok: !0, data: b };
    } catch (p) {
      const m = p?.name;
      return r.signal?.aborted ? { ok: !1, error: { code: "aborted", message: "Request aborted." } } : m === "TimeoutError" || m === "AbortError" ? { ok: !1, error: { code: "timeout", message: "The server did not answer in time.", retryable: !0 } } : {
        ok: !1,
        error: {
          code: "network",
          message: p instanceof Error && p.message ? p.message : "Network error",
          retryable: !0
        }
      };
    } finally {
      clearTimeout(l), r.signal?.removeEventListener("abort", c);
    }
  }
  return { request: s, url: i };
}
const Ce = "*";
function St(e) {
  return !!e && typeof e == "object" && typeof e.cursor == "number";
}
function $t(e, n) {
  return e === Ce || n === e || n.startsWith(`${e}.`);
}
function Tt(e) {
  const n = e.path ?? "events", t = e.waitSeconds ?? 25, i = (e.graceSeconds ?? 10) * 1e3, s = e.minBackoffMs ?? 1e3, o = e.maxBackoffMs ?? 3e4, r = e.random ?? Math.random, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set();
  let l = "connecting", c = null, p = !1, m = !1, v = 0, h = null, b = null, y = !1;
  function k(f) {
    if (l !== f) {
      l = f;
      for (const _ of Array.from(d))
        _(f);
    }
  }
  function E(f) {
    for (const [_, q] of Array.from(u.entries()))
      if (!(!$t(_, f.topic) && f.topic !== Ce))
        for (const V of Array.from(q))
          try {
            V(f);
          } catch {
          }
  }
  function x(f) {
    return new Promise((_) => {
      const q = () => {
        clearTimeout(V), b = null, _();
      }, V = setTimeout(q, f);
      b = q;
    });
  }
  const z = () => {
    typeof document > "u" || document.hidden || (y = !0, !p && !m && e.pauseWhenHidden !== !1 && F(), b?.(), h?.abort(new DOMException("resume", "AbortError")));
  };
  async function P() {
    p = !0;
    try {
      for (; !m && !(e.pauseWhenHidden !== !1 && typeof document < "u" && document.hidden); ) {
        h = new AbortController();
        let f = !1;
        const _ = setTimeout(() => {
          f = !0, h?.abort(new DOMException("poll timeout", "TimeoutError"));
        }, t * 1e3 + i), q = await e.http.request(n, {
          query: { since: c ?? void 0, timeout: c === null ? 0 : t },
          signal: h.signal,
          timeoutMs: t * 1e3 + i
        });
        if (clearTimeout(_), h = null, m)
          break;
        if (!q.ok && q.error.code === "aborted" && !f)
          continue;
        if (!q.ok || !St(q.data)) {
          v += 1, k(v >= 3 ? "offline" : "reconnecting");
          const X = Math.min(o, s * 2 ** Math.min(v - 1, 10));
          await x(X / 2 + r() * (X / 2)), y = !0;
          continue;
        }
        const V = q.data, ht = c;
        c = typeof V.cursor == "number" ? V.cursor : c;
        const vt = v > 0;
        v = 0, k("live"), (V.reset || y || vt) && ((ht !== null || V.reset) && E({ topic: Ce, payload: { resync: !0, reset: V.reset === !0 }, cursor: c ?? void 0 }), y = !1);
        for (const X of V.events ?? [])
          E({ topic: X.topic, payload: X.payload, cursor: X.seq });
      }
    } finally {
      p = !1;
    }
  }
  function F() {
    p || m || (typeof document < "u" && e.pauseWhenHidden !== !1 && (document.removeEventListener("visibilitychange", z), document.addEventListener("visibilitychange", z)), P());
  }
  return {
    id: e.id,
    status: () => l,
    start: F,
    subscribe(f, _) {
      let q = u.get(f);
      return q || (q = /* @__PURE__ */ new Set(), u.set(f, q)), q.add(_), !p && !m && F(), () => {
        q?.delete(_), q && q.size === 0 && u.delete(f);
      };
    },
    onStatus(f) {
      return d.add(f), () => d.delete(f);
    },
    close() {
      m = !0, h?.abort(new DOMException("closed", "AbortError")), b?.(), typeof document < "u" && document.removeEventListener("visibilitychange", z), u.clear(), d.clear();
    }
  };
}
const At = {
  retry: "Retry",
  cancel: "Cancel",
  confirm: "Confirm",
  save: "Save",
  close: "Close",
  required: "Required",
  loading: "Loading…",
  nothingHere: "Nothing here yet",
  olderData: "Showing older data",
  renderFailed: "This view could not be displayed."
};
let N = { ...At };
function Et(e) {
  N = { ...N, ...e };
}
function T(e, n = {}) {
  return a(
    "button",
    {
      class: `ks-btn ks-btn-${n.variant ?? "secondary"}`,
      type: n.type ?? "button",
      disabled: n.disabled,
      title: n.title,
      onClick: n.onClick
    },
    e
  );
}
function D(e, n = "neutral") {
  return a("span", { class: `ks-badge ks-badge-${n}` }, e);
}
function et(e, n, t) {
  return a("div", { class: "ks-empty" }, a("strong", null, e), n ? a("p", null, n) : null, t);
}
function tt(e = N.loading) {
  return a("div", { class: "ks-loading", role: "status", aria: { live: "polite" } }, a("span", { class: "ks-spinner", aria: { hidden: !0 } }), e);
}
function Ne(e, n) {
  return a(
    "div",
    { class: "ks-error", role: "alert" },
    a("strong", null, e.message),
    e.code ? a("small", null, e.code) : null,
    n && e.retryable !== !1 ? T(N.retry, { onClick: n }) : null
  );
}
let nt = 0;
function ce(e) {
  const n = `ks-field-${nt += 1}`, t = e.type ?? "text";
  let i;
  if (t === "textarea")
    i = a("textarea", { id: n, name: e.name, rows: e.rows ?? 3, placeholder: e.placeholder, required: e.required, value: String(e.value ?? "") });
  else if (t === "select") {
    const u = a(
      "select",
      { id: n, name: e.name, required: e.required },
      (e.options ?? []).map((d) => a("option", { value: d.value, selected: String(e.value ?? "") === d.value }, d.label))
    );
    u.value = String(e.value ?? e.options?.[0]?.value ?? ""), i = u;
  } else t === "checkbox" ? i = a("input", { id: n, name: e.name, type: "checkbox", checked: e.value === !0 }) : i = a("input", {
    id: n,
    name: e.name,
    type: t,
    value: e.value === null || e.value === void 0 ? "" : String(e.value),
    placeholder: e.placeholder,
    required: e.required,
    min: e.min,
    max: e.max,
    step: e.step,
    autocomplete: e.autocomplete ?? "off"
  });
  const s = a("small", { class: "ks-field-error", id: `${n}-error`, role: "alert" }), o = a("label", { for: n }, e.label, e.required ? a("span", { class: "ks-required", aria: { hidden: !0 } }, " *") : null), r = a(
    "div",
    { class: `ks-field${t === "checkbox" ? " ks-field-check" : ""}${e.wide ? " ks-field-wide" : ""}` },
    t === "checkbox" ? [i, o] : [o, i],
    e.hint ? a("small", { class: "ks-field-hint" }, e.hint) : null,
    s
  );
  return {
    el: r,
    input: i,
    name: e.name,
    value: () => t === "checkbox" ? i.checked : i.value,
    setError(u) {
      s.textContent = u ?? "", r.classList.toggle("has-error", !!u), u ? (i.setAttribute("aria-invalid", "true"), i.setAttribute("aria-describedby", s.id)) : (i.removeAttribute("aria-invalid"), i.removeAttribute("aria-describedby"));
    }
  };
}
function me(e, n) {
  const t = Object.fromEntries(e.map((u) => [u.name, ce(u)])), i = a("div", { class: "ks-form-error", role: "alert", hidden: !0 }), s = T(n.submitLabel ?? N.save, { variant: "primary", type: "submit" }), o = a("form", { class: "ks-form", novalidate: !0 }, i, a("div", { class: "ks-form-grid" }, Object.values(t).map((u) => u.el)), a("div", { class: "ks-form-actions" }, s, n.extraActions)), r = {
    el: o,
    fields: t,
    values: () => Object.fromEntries(Object.values(t).map((u) => [u.name, u.value()])),
    showErrors(u) {
      for (const l of Object.values(t))
        l.setError(u?.fields?.[l.name] ?? null);
      const d = u && (!u.fields || Object.keys(u.fields).length === 0) ? u.message : "";
      i.textContent = d, i.hidden = !d;
    },
    setBusy(u) {
      s.disabled = u, o.toggleAttribute("aria-busy", u);
    }
  };
  return o.addEventListener("submit", (u) => {
    u.preventDefault();
    let d = !0;
    for (const l of e) {
      const c = t[l.name].value();
      l.required && (c === "" || c === !1) ? (t[l.name].setError(N.required), d = !1) : t[l.name].setError(null);
    }
    d && (r.showErrors(null), r.setBusy(!0), Promise.resolve(n.onSubmit(r.values(), r)).finally(() => r.setBusy(!1)));
  }), r;
}
function Me(e, n, t) {
  return n.length ? a(
    "div",
    { class: "ks-table-wrap" },
    a(
      "table",
      { class: "ks-table" },
      a("thead", null, a("tr", null, e.map((i) => a("th", { scope: "col", class: i.className }, i.header)))),
      a("tbody", null, n.map((i) => a("tr", null, e.map((s) => a("td", { class: s.className, dataset: { label: s.header } }, s.render(i))))))
    )
  ) : t ?? et(N.nothingHere);
}
const oe = [];
function pe(e, n) {
  const t = document.activeElement;
  let i = () => {
  };
  const s = new Promise((m) => {
    i = m;
  }), o = new I(), r = (m) => {
    if (o.isDisposed)
      return;
    o.dispose();
    const v = oe.indexOf(c);
    v >= 0 && oe.splice(v, 1), c.remove(), t?.focus?.(), i(m);
  }, u = typeof n == "function" ? n(r) : n, d = `ks-dialog-title-${nt += 1}`, l = a(
    "div",
    { class: "ks-dialog", role: "dialog", aria: { modal: !0, labelledby: d }, tabindex: -1 },
    a("div", { class: "ks-dialog-head" }, a("h2", { id: d }, e), T("×", { variant: "ghost", title: N.close, onClick: () => r(void 0) })),
    a("div", { class: "ks-dialog-body" }, u)
  ), c = a("div", { class: "ks-overlay" }, l);
  c.addEventListener("mousedown", (m) => {
    m.target === c && r(void 0);
  });
  const p = (m) => {
    if (oe[oe.length - 1] === c) {
      if (m.key === "Escape") {
        m.stopPropagation(), r(void 0);
        return;
      }
      if (m.key === "Tab") {
        const v = Array.from(l.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")).filter((y) => !y.hasAttribute("disabled"));
        if (!v.length) {
          m.preventDefault();
          return;
        }
        const h = v[0], b = v[v.length - 1];
        m.shiftKey && document.activeElement === h ? (m.preventDefault(), b.focus()) : !m.shiftKey && document.activeElement === b && (m.preventDefault(), h.focus());
      }
    }
  };
  return document.addEventListener("keydown", p, !0), o.add(() => document.removeEventListener("keydown", p, !0)), document.body.appendChild(c), oe.push(c), (l.querySelector("input, select, textarea, button.ks-btn-primary") ?? l).focus(), { el: c, close: r, closed: s };
}
function at(e) {
  return pe(
    e.title,
    (t) => a(
      "div",
      { class: "ks-confirm" },
      a("p", null, e.message),
      a(
        "div",
        { class: "ks-form-actions" },
        T(N.cancel, { onClick: () => t(!1) }),
        T(e.confirmLabel ?? N.confirm, { variant: e.destructive ? "danger" : "primary", onClick: () => t(!0) })
      )
    )
  ).closed.then((t) => t === !0);
}
let re = null;
function C(e, n = "neutral", t = 4500) {
  (!re || !re.isConnected) && (re = a("div", { class: "ks-toasts", role: "status", aria: { live: "polite" } }), document.body.appendChild(re));
  const i = a("div", { class: `ks-toast ks-toast-${n}` }, e);
  re.appendChild(i), setTimeout(() => i.remove(), t);
}
function R(e) {
  let n = 0, t = null, i = !1, s = !1;
  const o = a("div", { class: "ks-stale-banner", role: "alert", hidden: !0 }), r = a("div", { class: "ks-async-content" });
  S(e.host, o, r);
  const u = () => {
    if (s)
      return;
    t?.abort(), t = new AbortController();
    const d = n += 1;
    (!i || e.keepStale === !1) && S(r, tt()), e.load(t.signal).then((l) => {
      if (!(s || d !== n)) {
        if (l.ok) {
          try {
            const c = e.render(l.data, u);
            i = !0, o.hidden = !0, S(r, c);
          } catch (c) {
            console.error("View render failed", c), S(r, Ne({ code: "render_failed", message: N.renderFailed, retryable: !0 }, u));
          }
          return;
        }
        l.error.code !== "aborted" && (i ? (o.hidden = !1, S(o, `${N.olderData} — ${l.error.message} `, T(N.retry, { variant: "ghost", onClick: u }))) : S(r, Ne(l.error, u)));
      }
    });
  };
  return u(), {
    refresh: u,
    dispose() {
      s = !0, t?.abort();
    }
  };
}
function Re(e, n) {
  if (typeof document > "u" || document.getElementById(e))
    return;
  const t = document.createElement("style");
  t.id = e, t.textContent = n, document.head.appendChild(t);
}
const Ct = 1, qt = '.ks-admin,.ks-dialog,.ks-toasts,.ks-scope{--ks-bg: #f5f7f9;--ks-surface: #ffffff;--ks-surface-2: #eef2f5;--ks-border: #d5dde4;--ks-text: #1c2833;--ks-muted: #5c6b78;--ks-accent: #2464a8;--ks-accent-text: #ffffff;--ks-good: #1f7a4d;--ks-warn: #9a6100;--ks-bad: #b3261e;--ks-info: #2464a8;--ks-radius: 10px;--ks-shadow: 0 1px 2px rgba(20, 30, 40, .06), 0 4px 14px rgba(20, 30, 40, .06);--ks-font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;font-family:var(--ks-font);color:var(--ks-text)}@media(prefers-color-scheme:dark){.ks-admin,.ks-dialog,.ks-toasts,.ks-scope:not([data-theme=kiosk]){--ks-bg: #12181e;--ks-surface: #1a222a;--ks-surface-2: #222c36;--ks-border: #33404c;--ks-text: #e6ecf1;--ks-muted: #96a5b2;--ks-accent: #5b9be0;--ks-accent-text: #0b1620;--ks-good: #5cc493;--ks-warn: #e0a84a;--ks-bad: #f08a83;--ks-info: #5b9be0;--ks-shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 4px 14px rgba(0, 0, 0, .35)}}.ks-admin *,.ks-dialog *,.ks-toasts *,.ks-scope *{box-sizing:border-box}.ks-scope[data-theme=kiosk]{--ks-bg: transparent;--ks-surface: rgba(255, 255, 255, .72);--ks-surface-2: rgba(32, 48, 65, .06);--ks-border: rgba(32, 48, 65, .12);--ks-text: #203041;--ks-muted: rgba(32, 48, 65, .66)}.ks-admin{display:grid;grid-template-columns:232px minmax(0,1fr);min-height:100vh;min-height:100dvh;background:var(--ks-bg);font-size:15px;line-height:1.45}.ks-sidebar{position:sticky;top:0;height:100vh;height:100dvh;display:flex;flex-direction:column;gap:8px;padding:16px 12px;background:var(--ks-surface);border-right:1px solid var(--ks-border);overflow-y:auto}.ks-brand{padding:4px 10px 12px;font-weight:700;font-size:17px;letter-spacing:-.01em}.ks-nav-list{display:flex;flex-direction:column;gap:2px}.ks-nav-group{margin:12px 10px 4px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ks-muted)}.ks-nav-item,.ks-bottom-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;color:var(--ks-text);text-decoration:none;min-height:40px}.ks-nav-item:hover{background:var(--ks-surface-2)}.ks-nav-item[aria-current=page]{background:color-mix(in srgb,var(--ks-accent) 14%,transparent);color:var(--ks-accent);font-weight:600}.ks-nav-icon{width:22px;text-align:center;flex:none}.ks-nav-footer{margin-top:auto;display:flex;flex-direction:column;gap:2px;padding-top:12px;border-top:1px solid var(--ks-border)}.ks-nav-footer-link{padding:6px 10px;color:var(--ks-muted);text-decoration:none;font-size:13px}.ks-content{min-width:0;display:flex;flex-direction:column}.ks-topbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;padding:12px 20px;background:color-mix(in srgb,var(--ks-bg) 88%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--ks-border)}.ks-topbar-title{margin:0;font-size:20px;font-weight:700;letter-spacing:-.01em;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ks-menu-button,.ks-bottom-nav,.ks-scrim{display:none}.ks-main-view{flex:1;padding:20px;outline:none;max-width:1200px;width:100%}.ks-conn{font-size:12px;padding:3px 10px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-muted);white-space:nowrap}.ks-conn[data-state=live]{color:var(--ks-good)}.ks-conn[data-state=reconnecting],.ks-conn[data-state=connecting]{color:var(--ks-warn)}.ks-conn[data-state=offline]{color:var(--ks-bad);border-color:var(--ks-bad)}@media(max-width:899px){.ks-admin{display:block;padding-bottom:64px}.ks-sidebar{position:fixed;inset:0 auto 0 0;z-index:30;width:min(84vw,300px);transform:translate(-102%);transition:transform .18s ease;box-shadow:var(--ks-shadow)}.ks-admin:not([data-menu=open]) .ks-sidebar{visibility:hidden;transition:transform .18s ease,visibility 0s linear .18s}.ks-admin[data-menu=open] .ks-sidebar{transform:none}.ks-admin[data-menu=open] .ks-scrim{display:block;position:fixed;inset:0;z-index:20;background:#0006}.ks-menu-button{display:inline-flex}.ks-topbar{padding:10px 12px}.ks-topbar-title{font-size:17px}.ks-main-view{padding:14px 12px}.ks-bottom-nav{position:fixed;inset:auto 0 0;z-index:10;display:grid;grid-auto-flow:column;grid-auto-columns:1fr;background:var(--ks-surface);border-top:1px solid var(--ks-border);padding-bottom:env(safe-area-inset-bottom,0)}.ks-bottom-item{flex-direction:column;gap:2px;justify-content:center;padding:8px 4px;font-size:11px;border-radius:0;min-height:56px;color:var(--ks-muted)}.ks-bottom-item[aria-current=page]{color:var(--ks-accent);font-weight:600}.ks-bottom-item .ks-nav-label{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.ks-page{display:flex;flex-direction:column;gap:16px}.ks-card{background:var(--ks-surface);border:1px solid var(--ks-border);border-radius:var(--ks-radius);padding:16px;box-shadow:var(--ks-shadow);min-width:0}.ks-card>h2,.ks-card>header>h2{margin:0 0 10px;font-size:15px;font-weight:700}.ks-card>header{display:flex;align-items:center;justify-content:space-between;gap:8px}.ks-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}.ks-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ks-row-spread{justify-content:space-between}.ks-toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.ks-toolbar .ks-grow{flex:1;min-width:180px}.ks-muted{color:var(--ks-muted)}.ks-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}.ks-list>li{display:flex;align-items:center;gap:10px;padding:9px 2px;border-bottom:1px solid var(--ks-border);min-width:0}.ks-list>li:last-child{border-bottom:0}.ks-list .ks-grow{flex:1;min-width:0}.ks-list .ks-title{font-weight:600;overflow-wrap:anywhere}.ks-list .ks-sub{color:var(--ks-muted);font-size:13px;overflow-wrap:anywhere}.ks-done{text-decoration:line-through;color:var(--ks-muted)}.ks-tree{list-style:none;margin:0;padding-left:18px;border-left:1px dashed var(--ks-border)}.ks-tree.ks-tree-root{padding-left:0;border-left:0}.ks-tree-node{padding:3px 0}.ks-btn{display:inline-flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;font:inherit;font-size:14px;min-height:38px;padding:0 14px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer;touch-action:manipulation}.ks-btn:hover:not(:disabled){background:var(--ks-surface-2)}.ks-btn:focus-visible,.ks-field input:focus-visible,.ks-field select:focus-visible,.ks-field textarea:focus-visible,.ks-nav-item:focus-visible,.ks-bottom-item:focus-visible{outline:2px solid var(--ks-accent);outline-offset:1px}.ks-btn:disabled{opacity:.55;cursor:default}.ks-btn-primary{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text);font-weight:600}.ks-btn-primary:hover:not(:disabled){background:color-mix(in srgb,var(--ks-accent) 88%,black)}.ks-btn-danger{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 50%,var(--ks-border))}.ks-btn-ghost{border-color:transparent;background:transparent}.ks-btn-sm{min-height:30px;padding:0 10px;font-size:13px}.ks-form{display:flex;flex-direction:column;gap:12px}.ks-form-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}.ks-form-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}.ks-form-error,.ks-field-error{color:var(--ks-bad);font-size:13px}.ks-field{display:flex;flex-direction:column;gap:4px;min-width:0}.ks-field-wide{grid-column:1 / -1}.ks-field label{font-size:13px;font-weight:600;color:var(--ks-muted)}.ks-field input:not([type=checkbox]),.ks-field select,.ks-field textarea,.ks-input{font:inherit;font-size:16px;width:100%;min-height:40px;padding:8px 10px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text)}.ks-field-check{flex-direction:row;align-items:center;gap:8px}.ks-field.has-error input,.ks-field.has-error select,.ks-field.has-error textarea{border-color:var(--ks-bad)}.ks-field-hint{color:var(--ks-muted);font-size:12px}.ks-required{color:var(--ks-bad)}.ks-badge{display:inline-block;padding:1px 8px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid var(--ks-border);background:var(--ks-surface-2);color:var(--ks-muted);white-space:nowrap}.ks-badge-good{color:var(--ks-good);border-color:color-mix(in srgb,var(--ks-good) 40%,var(--ks-border))}.ks-badge-warn{color:var(--ks-warn);border-color:color-mix(in srgb,var(--ks-warn) 40%,var(--ks-border))}.ks-badge-bad{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 40%,var(--ks-border))}.ks-badge-info{color:var(--ks-info);border-color:color-mix(in srgb,var(--ks-info) 40%,var(--ks-border))}.ks-empty,.ks-loading,.ks-error{padding:28px 16px;text-align:center;color:var(--ks-muted)}.ks-empty strong,.ks-error strong{display:block;color:var(--ks-text);margin-bottom:4px}.ks-error{color:var(--ks-bad);display:flex;flex-direction:column;align-items:center;gap:8px}.ks-spinner{display:inline-block;width:16px;height:16px;margin-right:8px;vertical-align:-3px;border:2px solid var(--ks-border);border-top-color:var(--ks-accent);border-radius:50%;animation:ks-spin .8s linear infinite}@keyframes ks-spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.ks-spinner{animation-duration:3s}}.ks-stale-banner{padding:8px 12px;margin-bottom:10px;border-radius:8px;background:color-mix(in srgb,var(--ks-warn) 14%,var(--ks-surface));color:var(--ks-warn);font-size:13px}.ks-table-wrap{overflow-x:auto}.ks-table{width:100%;border-collapse:collapse;font-size:14px}.ks-table th,.ks-table td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--ks-border);vertical-align:top}.ks-table th{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--ks-muted)}@media(max-width:640px){.ks-table thead{display:none}.ks-table,.ks-table tbody,.ks-table tr,.ks-table td{display:block;width:100%}.ks-table tr{padding:8px 0;border-bottom:1px solid var(--ks-border)}.ks-table td{border:0;padding:2px 4px}.ks-table td:before{content:attr(data-label) ": ";color:var(--ks-muted);font-size:12px}.ks-table td[data-label=""]:before{content:none}}.ks-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;background:#00000073}.ks-dialog{width:min(560px,100%);max-height:92vh;overflow:auto;background:var(--ks-surface);border-radius:14px;box-shadow:var(--ks-shadow);border:1px solid var(--ks-border)}.ks-dialog-head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--ks-border)}.ks-dialog-head h2{margin:0;font-size:16px}.ks-dialog-body{padding:16px}.ks-toasts{position:fixed;z-index:120;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;max-width:min(360px,calc(100vw - 32px))}.ks-toast{padding:10px 14px;border-radius:10px;background:var(--ks-text);color:var(--ks-bg);box-shadow:var(--ks-shadow);font-size:14px}.ks-toast-good{background:var(--ks-good);color:#fff}.ks-toast-bad{background:var(--ks-bad);color:#fff}@media(max-width:899px){.ks-toasts{bottom:72px}}.ks-chip{font:inherit;font-size:14px;min-height:34px;padding:4px 12px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer}.ks-chip.is-active{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text)}.ks-link{font:inherit;padding:0;border:0;background:none;color:var(--ks-accent);cursor:pointer;text-align:left;text-decoration:underline;text-underline-offset:2px}.ks-filters{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end}.ks-filters .ks-field{flex:1 1 200px;min-width:0}.ks-list-click>li{cursor:pointer}.ks-list-click>li:hover,.ks-list-click>li:focus-visible{background:var(--ks-surface-2);outline:none}@media(max-width:640px){.ks-hide-narrow{display:none}}', Ot = qt, it = "domovoy.api", st = "domovoy.actions", be = "domovoy.events", Y = (e, n = ["id"]) => Object.fromEntries(Object.entries(e).filter(([t]) => !n.includes(t))), H = (e) => (n) => `${e}/${encodeURIComponent(String(n.id))}`, He = {
  "command.send": { title: "Отправить команду", method: "POST", path: () => "api/command", body: (e) => e },
  "command.undo": { title: "Отменить команду", method: "POST", path: (e) => `api/commands/${e.id}/undo`, body: () => ({}) },
  "items.create": { title: "Добавить предмет", method: "POST", path: () => "api/items", body: (e) => e },
  "items.update": { title: "Изменить предмет", method: "PATCH", path: H("api/items"), body: (e) => Y(e) },
  "items.delete": { title: "Удалить предмет", method: "DELETE", path: H("api/items"), destructive: !0 },
  "items.move": { title: "Переместить предмет", method: "POST", path: (e) => `api/items/${e.id}/move`, body: (e) => Y(e) },
  "items.consume": { title: "Списать", method: "POST", path: (e) => `api/items/${e.id}/consume`, body: (e) => Y(e) },
  "locations.create": { title: "Добавить место", method: "POST", path: () => "api/locations", body: (e) => e },
  "locations.update": { title: "Изменить место", method: "PATCH", path: H("api/locations"), body: (e) => Y(e) },
  "locations.delete": { title: "Удалить место", method: "DELETE", path: H("api/locations"), destructive: !0 },
  "notes.create": { title: "Добавить заметку", method: "POST", path: () => "api/notes", body: (e) => e },
  "notes.update": { title: "Изменить заметку", method: "PATCH", path: H("api/notes"), body: (e) => Y(e) },
  "notes.delete": { title: "Удалить заметку", method: "DELETE", path: H("api/notes"), destructive: !0 },
  "tasks.create": { title: "Добавить задачу", method: "POST", path: () => "api/tasks", body: (e) => e },
  "tasks.update": { title: "Изменить задачу", method: "PATCH", path: H("api/tasks"), body: (e) => Y(e) },
  "tasks.complete": { title: "Отметить задачу", method: "POST", path: (e) => `api/tasks/${e.id}/complete`, body: (e) => ({ done: e.done ?? !0 }) },
  "tasks.delete": { title: "Удалить задачу", method: "DELETE", path: H("api/tasks"), destructive: !0 },
  "reminders.create": { title: "Добавить напоминание", method: "POST", path: () => "api/reminders", body: (e) => e },
  "reminders.update": { title: "Изменить напоминание", method: "PATCH", path: H("api/reminders"), body: (e) => Y(e) },
  "reminders.done": { title: "Напоминание выполнено", method: "POST", path: (e) => `api/reminders/${e.id}/done`, body: () => ({}) },
  "reminders.snooze": { title: "Отложить напоминание", method: "POST", path: (e) => `api/reminders/${e.id}/snooze`, body: (e) => ({ minutes: e.minutes }) },
  "reminders.delete": { title: "Удалить напоминание", method: "DELETE", path: H("api/reminders"), destructive: !0 },
  "calendar.create": { title: "Добавить событие", method: "POST", path: () => "api/calendar/events", body: (e) => e },
  "calendar.update": { title: "Изменить событие", method: "PATCH", path: () => "api/calendar/event", body: (e) => Y(e, ["ref"]), query: (e) => ({ ref: e.ref }) },
  "calendar.delete": { title: "Удалить событие", method: "DELETE", path: () => "api/calendar/event", query: (e) => ({ ref: e.ref }), destructive: !0 },
  "contacts.create": { title: "Добавить контакт", method: "POST", path: () => "api/contacts", body: (e) => e },
  "contacts.update": { title: "Изменить контакт", method: "PATCH", path: H("api/contacts"), body: (e) => Y(e) },
  "contacts.delete": { title: "Удалить контакт", method: "DELETE", path: H("api/contacts"), destructive: !0 },
  "contacts.link": { title: "Привязать Telegram", method: "POST", path: () => "api/contacts/link", body: (e) => e },
  "review.approve": { title: "Подтвердить", method: "POST", path: (e) => `api/review/${e.id}/approve`, body: (e) => e.proposal ? { proposal: e.proposal } : {} },
  "review.reject": { title: "Отклонить", method: "POST", path: (e) => `api/review/${e.id}/reject`, body: () => ({}) },
  "audit.undo": { title: "Отменить изменение", method: "POST", path: (e) => `api/audit/${e.id}/undo`, body: (e) => ({ force: !!e.force }) },
  "outbox.retry": { title: "Повторить отправку", method: "POST", path: (e) => `api/outbox/${e.id}/retry`, body: () => ({}) },
  "outbox.cancel": { title: "Отменить отправку", method: "POST", path: (e) => `api/outbox/${e.id}/cancel`, body: () => ({}) },
  "settings.update": { title: "Сохранить настройки", method: "PUT", path: () => "api/settings", body: (e) => e },
  "secrets.set": { title: "Сохранить секрет", method: "PUT", path: () => "api/integrations/secrets", body: (e) => e },
  "integration.test": { title: "Проверить интеграцию", method: "POST", path: (e) => `api/integrations/${e.name}/test`, body: () => ({}) },
  "telegram.test_message": { title: "Тестовое сообщение в Telegram", method: "POST", path: () => "api/integrations/telegram/test_message", body: () => ({}) },
  "alice.test": { title: "Проверить настройку Алисы", method: "POST", path: () => "api/alice/test", body: () => ({}) },
  "security.rotate": { title: "Сменить секрет", method: "POST", path: () => "api/security/rotate", body: (e) => ({ name: e.name }), destructive: !0 },
  "backup.create": { title: "Сделать резервную копию", method: "POST", path: () => "api/backup", body: () => ({}) },
  "data.import": { title: "Импортировать данные", method: "POST", path: () => "api/import", body: (e) => e.data, destructive: !0 },
  "voice.text": { title: "Голосовая команда (текст)", method: "POST", path: () => "api/voice/command", body: (e) => e }
}, qe = "domovoy.token";
function Dt() {
  try {
    return window.localStorage.getItem(qe);
  } catch {
    return null;
  }
}
function jt(e) {
  try {
    e ? window.localStorage.setItem(qe, e) : window.localStorage.removeItem(qe);
  } catch {
  }
}
function Mt(e) {
  const n = _t({
    baseUrl: e.baseUrl,
    fetchImpl: e.fetchImpl,
    getToken: Dt,
    // The custom header is what turns a cross-site form post into something the server refuses (CSRF defence).
    headers: { "X-Domovoy-Client": "kiosk-scene" },
    onUnauthorized: () => e.onUnauthorized?.(),
    timeoutMs: 2e4
  });
  return { http: n, data: {
    id: it,
    async read(s, o) {
      const r = String(s?.path ?? "");
      return /^(api\/|events)/.test(r) ? n.request(r, { query: s.query, signal: o?.signal }) : { ok: !1, error: { code: "bad_path", message: `Refusing to read ${r}` } };
    }
  }, actions: {
    id: st,
    describe() {
      return Object.entries(He).map(([s, o]) => ({ id: s, title: o.title, destructive: o.destructive }));
    },
    async invoke(s, o, r) {
      const u = He[s];
      if (!u)
        return { ok: !1, error: { code: "unknown_action", message: `Unknown action ${s}` } };
      const d = o ?? {};
      return n.request(u.path(d), {
        method: u.method,
        body: u.body ? u.body(d) : void 0,
        query: u.query?.(d),
        signal: r?.signal
      });
    }
  } };
}
const g = {
  today: "Сегодня",
  search: "Поиск",
  inventory: "Вещи",
  locations: "Места",
  calendar: "Календарь",
  tasks: "Задачи и напоминания",
  memory: "Память",
  review: "Проверка",
  activity: "Журнал",
  integrations: "Интеграции",
  settings: "Настройки",
  commandPlaceholder: "Скажите или напишите: «запомни, девять резисторов лежат в третьей коробке»",
  send: "Отправить",
  cancel: "Отмена",
  save: "Сохранить",
  delete: "Удалить",
  edit: "Изменить",
  add: "Добавить",
  close: "Закрыть",
  retry: "Повторить",
  undo: "Отменить",
  confirm: "Подтвердить",
  reject: "Отклонить",
  none: "—",
  loading: "Загрузка…",
  empty: "Пока ничего нет",
  search_placeholder: "Что ищем? Например: «резистор», «программатор», «код домофона»",
  name: "Название",
  quantity: "Количество",
  unit: "Ед.",
  place: "Место",
  notes: "Заметки",
  title: "Название",
  statuses: {
    applied: "выполнено",
    answered: "ответ",
    clarify: "нужно уточнение",
    review: "на проверке",
    rejected: "не понял",
    failed: "ошибка",
    partial: "частично",
    pending: "ожидает",
    fired: "сработало",
    done: "готово",
    cancelled: "отменено",
    queued: "в очереди",
    sending: "отправляется",
    sent: "отправлено",
    ok: "работает",
    configured: "настроено",
    degraded: "сбои",
    down: "не отвечает",
    unconfigured: "не настроено",
    unknown: "неизвестно",
    approved: "принято"
  },
  kinds: { item: "вещь", location: "место", note: "заметка", task: "задача", event: "событие" },
  channels: { ui: "на экране", speak: "голосом (колонка)", telegram: "Telegram", ha_notify: "уведомление HA" },
  lists: { tasks: "Задачи", shopping: "Покупки", chores: "Повторяющиеся дела" }
};
function te(e) {
  return g.statuses[e] ?? e;
}
function ue(e) {
  return ["applied", "answered", "done", "sent", "ok", "approved"].includes(e) ? "good" : e === "configured" ? "info" : ["clarify", "review", "pending", "queued", "sending", "partial", "degraded", "fired"].includes(e) ? "warn" : ["failed", "rejected", "down", "cancelled"].includes(e) ? "bad" : "neutral";
}
let ot = "";
function se(e) {
  ot = e;
}
function Z() {
  return ot || Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function rt(e, n) {
  const t = new Intl.DateTimeFormat("en-CA", {
    timeZone: n,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  return Object.fromEntries(t.formatToParts(e).map((i) => [i.type, i.value]));
}
function ae(e, n = Z()) {
  const t = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(e);
  if (!t)
    throw new Error(`Invalid local time: ${e}`);
  const [i, s, o, r, u] = t.slice(1).map(Number), d = Date.UTC(i, s - 1, o, r, u);
  let l = d;
  for (let c = 0; c < 2; c += 1) {
    const p = rt(new Date(l), n), m = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute));
    l += d - m;
  }
  return new Date(l).toISOString().replace(/\.\d{3}Z$/, "Z");
}
function ne(e, n = Z()) {
  const t = rt(new Date(e), n);
  return `${t.year}-${t.month}-${t.day}T${t.hour}:${t.minute}`;
}
function L(e, n = Z()) {
  return e ? new Intl.DateTimeFormat("ru-RU", { timeZone: n, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(e)) : "—";
}
function ie(e, n = Z()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: n, hour: "2-digit", minute: "2-digit" }).format(new Date(e));
}
function Pt(e, n = Z()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: n, weekday: "long", day: "numeric", month: "long" }).format(new Date(e));
}
function J(e, n = Z()) {
  return ne(e, n).slice(0, 10);
}
function Pe(e, n = Date.now()) {
  const t = new Date(e).getTime() - n, i = Math.abs(t), s = Math.round(i / 6e4), o = s < 1 ? "сейчас" : s < 60 ? `${s} мин` : s < 2880 ? `${Math.round(s / 60)} ч` : `${Math.round(s / 1440)} дн`;
  return s < 1 ? o : t < 0 ? `${o} назад` : `через ${o}`;
}
function lt(e) {
  if (!e)
    return "";
  const n = e.window ? ` (${e.window.from}–${e.window.to})` : "";
  return e.type === "presence" ? `когда буду дома${n}` : e.type === "room" ? `когда зайду: ${e.place}${n}` : e.type === "state" ? `когда ${e.entity_id} ${e.from ? `перестанет быть «${e.from}»` : `станет «${e.to}»`}` : "по условию";
}
function he(e) {
  if (!e)
    return "";
  const n = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"], t = e.interval > 1 ? `каждые ${e.interval} ` : "каждый ";
  return e.freq === "weekly" && e.byweekday?.length ? `по ${e.byweekday.map((i) => n[i]).join(", ")}` : { daily: `${t}день`, weekly: `${t}неделю`, monthly: `${t}месяц`, yearly: `${t}год` }[e.freq] ?? "повторяется";
}
function Le(e, n = "") {
  return e == null ? "" : `${Number.isInteger(e) ? String(e) : String(Math.round(e * 1e3) / 1e3)} ${n}`.trim();
}
const Be = ["ui", "telegram", "speak", "ha_notify"], xe = ["tasks", "shopping", "chores"], we = {
  add_item: { title: "Запомнить вещь", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "quantity", label: "Количество", kind: "num" }, { name: "unit", label: "Ед.", kind: "str" }, { name: "location_path", label: "Место (через →)", kind: "path" }, { name: "notes", label: "Заметки", kind: "str" }, { name: "mode", label: "Как менять количество", kind: "enum", options: ["set", "add"] }] },
  place_item: { title: "Положить вещь", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "quantity", label: "Количество", kind: "num" }, { name: "unit", label: "Ед.", kind: "str" }, { name: "location_path", label: "Место (через →)", kind: "path" }] },
  move_item: { title: "Переместить вещь", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "location_path", label: "Новое место (через →)", kind: "path" }, { name: "use_last", label: "Последнюю упомянутую", kind: "bool" }] },
  consume_item: { title: "Списать", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "quantity", label: "Сколько", kind: "num" }, { name: "use_last", label: "Последнюю упомянутую", kind: "bool" }] },
  set_quantity: { title: "Исправить количество", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "quantity", label: "Количество", kind: "num" }, { name: "unit", label: "Ед.", kind: "str" }, { name: "use_last", label: "Последнюю упомянутую", kind: "bool" }] },
  remove_item: { title: "Удалить вещь", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "use_last", label: "Последнюю упомянутую", kind: "bool" }] },
  use_item: { title: "Отметить использование", fields: [{ name: "name", label: "Название", kind: "str" }] },
  find_item: { title: "Найти вещь", fields: [{ name: "query", label: "Что ищем", kind: "str" }] },
  list_location: { title: "Что лежит в месте", fields: [{ name: "location_path", label: "Место (через →)", kind: "path" }] },
  add_note: { title: "Заметка", fields: [{ name: "title", label: "Заголовок", kind: "str" }, { name: "text", label: "Текст", kind: "str" }] },
  query_memory: { title: "Вспомнить", fields: [{ name: "query", label: "Запрос", kind: "str" }] },
  create_reminder: { title: "Напоминание", fields: [{ name: "text", label: "О чём", kind: "str" }, { name: "when", label: "Когда", kind: "iso" }, { name: "channel", label: "Как", kind: "enum", options: Be }, { name: "recipient", label: "Кому", kind: "str" }, { name: "trigger", label: "Условие", kind: "json" }, { name: "recurrence", label: "Повтор", kind: "json" }] },
  query_reminders: { title: "Активные напоминания", fields: [] },
  complete_reminder: { title: "Выполнить напоминание", fields: [{ name: "reminder_id", label: "Номер", kind: "num" }] },
  snooze_reminder: { title: "Отложить напоминание", fields: [{ name: "reminder_id", label: "Номер", kind: "num" }, { name: "minutes", label: "Минут", kind: "num" }] },
  delete_reminder: { title: "Удалить напоминание", fields: [{ name: "reminder_id", label: "Номер", kind: "num" }] },
  create_event: { title: "Событие в календаре", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "start", label: "Начало", kind: "iso" }, { name: "end", label: "Конец", kind: "iso" }, { name: "location", label: "Где", kind: "str" }] },
  update_event: { title: "Перенести/изменить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }, { name: "new_title", label: "Новое название", kind: "str" }, { name: "new_start", label: "Новое начало", kind: "iso" }, { name: "new_end", label: "Новый конец", kind: "iso" }] },
  delete_event: { title: "Удалить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }] },
  query_calendar: { title: "Что в календаре", fields: [{ name: "start", label: "С", kind: "iso" }, { name: "end", label: "По", kind: "iso" }] },
  send_message: { title: "Сообщение", fields: [{ name: "recipient", label: "Кому", kind: "str" }, { name: "text", label: "Текст", kind: "str" }, { name: "channel", label: "Как", kind: "enum", options: Be }, { name: "when", label: "Когда", kind: "iso" }] },
  add_task: { title: "Задача", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: xe }, { name: "due_date", label: "Срок (ГГГГ-ММ-ДД)", kind: "str" }] },
  add_shopping: { title: "В список покупок", fields: [{ name: "items", label: "Что купить (через запятую)", kind: "list" }] },
  complete_task: { title: "Отметить задачу", fields: [{ name: "title", label: "Какая", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: xe }] },
  query_tasks: { title: "Показать задачи", fields: [{ name: "list", label: "Список", kind: "enum", options: xe }] },
  ha_control: { title: "Управление домом", fields: [{ name: "service", label: "Сервис", kind: "str" }, { name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }, { name: "data", label: "Параметры", kind: "json" }] },
  ha_query: { title: "Состояние устройства", fields: [{ name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }] },
  clarify: { title: "Вопрос", fields: [{ name: "question", label: "Вопрос", kind: "str" }] },
  undo: { title: "Отмена последнего", fields: [] },
  help: { title: "Справка", fields: [] }
};
function Lt(e) {
  return we[e]?.title ?? e;
}
function dt(e, n) {
  return n == null ? "" : e.kind === "path" ? Array.isArray(n) ? n.join(" → ") : String(n) : e.kind === "list" ? Array.isArray(n) ? n.join(", ") : String(n) : e.kind === "json" ? JSON.stringify(n) : e.kind === "bool" ? n ? "да" : "нет" : String(n);
}
function ct(e, n = (t) => t) {
  const t = we[String(e.type)];
  if (!t)
    return String(e.type);
  const i = t.fields.filter((s) => e[s.name] !== void 0 && e[s.name] !== null && e[s.name] !== "" && e[s.name] !== !1).map((s) => `${s.label.replace(/ \(.*\)$/, "")}: ${s.kind === "iso" ? n(String(e[s.name])) : dt(s, e[s.name])}`);
  return i.length ? `${t.title} — ${i.join("; ")}` : t.title;
}
function It(e, n, t) {
  const i = we[String(e.type)], s = { ...e };
  for (const o of i?.fields ?? []) {
    if (!(o.name in n) || o.kind === "json")
      continue;
    const r = n[o.name];
    if (o.kind === "bool") {
      r === !0 ? s[o.name] = !0 : delete s[o.name];
      continue;
    }
    const u = String(r).trim();
    if (!u)
      delete s[o.name];
    else if (o.kind === "num") {
      const d = Number(u.replace(",", "."));
      s[o.name] = Number.isFinite(d) ? d : u;
    } else o.kind === "path" ? s[o.name] = u.split(/→|->|>/).map((d) => d.trim()).filter(Boolean) : o.kind === "list" ? s[o.name] = u.split(",").map((d) => d.trim()).filter(Boolean) : o.kind === "iso" ? s[o.name] = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(u) ? t(u) : u : s[o.name] = u;
  }
  return s;
}
function $(e, n, t, i) {
  return e.readData(it, { path: n, query: t }, { signal: i });
}
function ut(e, n, t) {
  return e.invokeAction(st, n, t);
}
async function A(e, n, t, i = {}) {
  if (i.confirm && !await at({ title: i.confirm.title, message: i.confirm.message, confirmLabel: i.confirm.label ?? g.delete, destructive: !0 }))
    return { ok: !1, error: { code: "cancelled", message: "cancelled" } };
  const s = await ut(e, n, t);
  return s.ok ? i.success && C(i.success, "good") : C(s.error.message, "bad", 7e3), s;
}
function B(e, n, t, i, s = 250, o) {
  let r = !1;
  const u = () => {
    const c = document.activeElement;
    return !o || !c || !o.contains(c) ? !1 : /^(INPUT|TEXTAREA|SELECT)$/.test(c.tagName) || c.tagName === "BUTTON" && c.closest("form") !== null;
  }, d = () => {
    if (u()) {
      r = !0;
      return;
    }
    r = !1, i();
  }, l = Qe(d, s);
  if (n.add(() => l.cancel()), o) {
    const c = (p) => {
      !r || p.relatedTarget instanceof Node && o.contains(p.relatedTarget) || window.setTimeout(() => {
        r && !u() && d();
      }, 150);
    };
    o.addEventListener("focusout", c), n.add(() => o.removeEventListener("focusout", c));
  }
  for (const c of t)
    n.add(e.subscribe(be, c, () => l()));
}
function Ie(e, n) {
  const t = document.activeElement instanceof HTMLElement && e.contains(document.activeElement) ? document.activeElement.dataset.key : void 0;
  n(), t && e.querySelector(`[data-key="${CSS.escape(t)}"]`)?.focus();
}
function U(e, n) {
  return {
    dispose() {
      e.dispose();
    }
  };
}
function j(e, n, t) {
  return a("section", { class: "ks-card" }, a("header", null, a("h2", null, e), null), n);
}
function ve(e) {
  return D(te(e), ue(e));
}
function M(e, n, t, i = "") {
  return a("li", { class: i }, a("div", { class: "ks-grow" }, a("div", { class: "ks-title" }, e), n ? a("div", { class: "ks-sub" }, n) : null), t ?? null);
}
function w(e, n, t = "secondary", i) {
  const s = T(e, { variant: t, onClick: n, title: i });
  return s.classList.add("ks-btn-sm"), s;
}
function G(e, ...n) {
  return a("div", { class: "ks-row ks-row-spread dv-head" }, a("h2", { class: "dv-page-title" }, e), a("div", { class: "ks-row" }, n));
}
function O(e = g.empty) {
  return a("p", { class: "ks-muted" }, e);
}
function K(e, n, t, i = {}) {
  return pe(e, (o) => {
    const r = me(n, {
      submitLabel: i.submitLabel ?? g.save,
      extraActions: [T(g.cancel, { onClick: () => o(!1) })],
      onSubmit: async (u, d) => {
        const l = await t(u);
        l.ok ? o(!0) : d.showErrors(l.error);
      }
    });
    return a("div", null, i.note ?? null, r.el);
  }).closed.then((o) => o === !0);
}
function zt(e) {
  const n = {};
  for (const t of e.split(/\r?\n/)) {
    const i = t.indexOf(":"), s = (i >= 0 ? t.slice(0, i) : t).trim(), o = i >= 0 ? t.slice(i + 1).trim() : "";
    s && (n[s] = o);
  }
  return n;
}
function Nt(e) {
  return Object.entries(e ?? {}).map(([n, t]) => `${n}: ${t}`).join(`
`);
}
function Rt(e) {
  return e.split(/→|->|>|\//).map((n) => n.trim()).filter(Boolean);
}
function Ht(e) {
  if (typeof e != "string" || e.trim() === "")
    return null;
  const n = Number(e.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}
async function fe(e, n) {
  const [t, i] = await Promise.all([e, n]);
  return t.ok ? i.ok ? { ok: !0, data: [t.data, i.data] } : i : t;
}
const Bt = [["audit", "Изменения"], ["commands", "Команды"], ["outbox", "Отправка сообщений"]];
function Ut(e, n, t) {
  const i = new I(), s = a("div"), o = a("div", { class: "ks-row dv-chips", role: "tablist" });
  let r = "audit", u = null;
  const d = () => {
    u?.dispose(), Ie(o, () => S(o, Bt.map(
      ([c, p]) => a("button", { type: "button", role: "tab", dataset: { key: c }, class: `ks-chip${r === c ? " is-active" : ""}`, "aria-selected": String(r === c), onClick: () => {
        r = c, d();
      } }, p)
    ))), r === "audit" ? u = R({
      host: s,
      load: (c) => $(t, "api/audit", { limit: 100 }, c),
      render: ({ audit: c }, p) => c.length ? a("ul", { class: "ks-list" }, c.map(
        (m) => M(
          a("span", null, m.summary, " ", D(m.source, "neutral")),
          `${L(m.ts)} · ${m.actor}`,
          m.undoable ? w(g.undo, async () => {
            (await A(t, "audit.undo", { id: m.id }, { success: "Отменено" })).ok && p();
          }, "ghost") : null
        )
      )) : O("Изменений пока не было.")
    }) : r === "commands" ? u = R({
      host: s,
      load: (c) => $(t, "api/commands", { limit: 100 }, c),
      render: ({ commands: c }) => c.length ? a("ul", { class: "ks-list" }, c.map(
        (p) => M(
          a("span", null, `«${p.text}»`, " ", l(p.status)),
          [L(p.ts), p.frontend, p.interpreter ?? "", p.confidence !== null ? `${Math.round(p.confidence * 100)}%` : "", p.reply ?? p.error ?? ""].filter(Boolean).join(" · "),
          p.intents?.length ? a("details", null, a("summary", null, "Как я понял"), a("ul", null, p.intents.map((m) => a("li", null, ct(m, (v) => L(v)))))) : null
        )
      )) : O("Команд пока не было.")
    }) : u = R({
      host: s,
      load: (c) => $(t, "api/outbox", { limit: 100 }, c),
      render: ({ messages: c }, p) => c.length ? a("ul", { class: "ks-list" }, c.map(
        (m) => M(
          a("span", null, m.text, " ", ve(m.status)),
          `${g.channels[m.channel] ?? m.channel} → ${m.recipient || "—"} · ${L(m.created_at)}${m.attempts ? ` · попыток: ${m.attempts}` : ""}${m.last_error ? ` · ${m.last_error}` : ""}`,
          a(
            "div",
            { class: "ks-row" },
            m.status === "failed" || m.status === "queued" ? w("Повторить", async () => {
              (await A(t, "outbox.retry", { id: m.id })).ok && p();
            }, "primary") : null,
            m.status === "failed" || m.status === "queued" ? w(g.cancel, async () => {
              (await A(t, "outbox.cancel", { id: m.id })).ok && p();
            }, "danger") : null
          )
        )
      )) : O("Исходящих сообщений не было.")
    });
  }, l = (c) => ve(c);
  return d(), S(e, a("div", { class: "ks-page" }, G(g.activity), o, j("", s))), B(t, i, ["audit", "commands", "outbox", "items", "locations", "notes", "tasks", "reminders", "calendar"], () => u?.refresh(), 500), i.add(() => u?.dispose()), U(i);
}
function Ue(e, n, t, i) {
  const s = Z(), o = ne(t ? t.start : new Date(Math.ceil(Date.now() / 36e5) * 36e5).toISOString(), s), r = t ? ne(t.end, s) : "", u = n.sources.filter((d) => d.capabilities.includes("create") && d.available);
  K(
    t ? `Изменить: ${t.title}` : "Новое событие",
    [
      { name: "title", label: g.title, required: !0, value: t?.title ?? "", wide: !0 },
      { name: "start", label: "Начало", type: "datetime-local", required: !0, value: o },
      { name: "end", label: "Конец", type: "datetime-local", value: r, hint: "Пусто — по умолчанию из настроек." },
      { name: "all_day", label: "Весь день", type: "checkbox", value: t?.all_day ?? !1 },
      { name: "location", label: "Где", value: t?.location ?? "", wide: !0 },
      { name: "notes", label: g.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 },
      ...t ? [] : [{ name: "calendar", label: "Календарь", type: "select", options: u.map((d) => ({ value: d.id, label: d.title })), value: n.default }]
    ],
    async (d) => {
      const l = {
        title: String(d.title).trim(),
        start: ae(String(d.start), s),
        all_day: d.all_day === !0,
        location: String(d.location ?? ""),
        notes: String(d.notes ?? "")
      };
      d.end && (l.end = ae(String(d.end), s));
      const c = t ? await e.invokeAction("domovoy.actions", "calendar.update", { ref: t.ref, ...l }) : await e.invokeAction("domovoy.actions", "calendar.create", { ...l, calendar: d.calendar });
      return c.ok && i(), c;
    }
  );
}
function Ft(e, n, t) {
  const i = new I(), s = a("div");
  let o = 14, r = { sources: [], default: "local" };
  const u = T(g.add, { variant: "primary" }), d = T("Показать ещё 2 недели", { variant: "ghost" }), l = R({
    host: s,
    load: (c) => {
      const p = Z(), m = J((/* @__PURE__ */ new Date()).toISOString(), p), v = ae(`${m}T00:00`, p), h = ae(`${J(new Date(Date.parse(`${m}T12:00:00Z`) + o * 864e5).toISOString(), "UTC")}T00:00`, p);
      return fe(
        $(t, "api/calendar/events", { start: v, end: h }, c),
        $(t, "api/calendar/sources", void 0, c)
      );
    },
    render: ([{ events: c, warnings: p }, m], v) => {
      r = m, u.onclick = () => Ue(t, r, null, v);
      const h = /* @__PURE__ */ new Map();
      for (const b of c) {
        const y = J(b.start);
        h.set(y, [...h.get(y) ?? [], b]);
      }
      return a(
        "div",
        null,
        p.length ? a("div", { class: "ks-stale-banner", role: "alert" }, `Не удалось прочитать календарь: ${p.map((b) => `${b.source} (${b.message})`).join("; ")}. Показано то, что доступно.`) : null,
        h.size ? [...h.entries()].sort(([b], [y]) => b.localeCompare(y)).map(
          ([b, y]) => a(
            "section",
            { class: "ks-card" },
            a("header", null, a("h2", null, Pt(y[0].start))),
            a("ul", { class: "ks-list" }, y.sort((k, E) => k.start.localeCompare(E.start)).map(
              (k) => M(
                a("span", null, k.title, k.recurring ? a("span", { class: "ks-muted" }, " ↻") : null, k.read_only ? [" ", D("только чтение", "neutral")] : null),
                `${k.all_day ? "весь день" : `${ie(k.start)}–${ie(k.end)}`}${k.location ? ` · ${k.location}` : ""} · ${k.calendar}`,
                k.read_only ? null : a(
                  "div",
                  { class: "ks-row" },
                  w(g.edit, () => Ue(t, r, k, v)),
                  w(g.delete, async () => {
                    (await A(t, "calendar.delete", { ref: k.ref }, { confirm: { title: "Удалить событие", message: `«${k.title}» будет удалено из календаря.` } })).ok && v();
                  }, "danger")
                )
              )
            ))
          )
        ) : O(`На ближайшие ${o} дней событий нет.`)
      );
    }
  });
  return d.onclick = () => {
    o += 14, l.refresh();
  }, e.replaceChildren(a("div", { class: "ks-page" }, G(g.calendar, u), s, a("div", { class: "ks-row" }, d))), t.readData("domovoy.api", { path: "api/state" }).then((c) => c.ok && se(c.data.timezone)), B(t, i, ["calendar"], () => l.refresh()), i.add(() => l.dispose()), U(i);
}
const Vt = {
  home_assistant: "Home Assistant",
  telegram: "Telegram",
  alice: "Алиса",
  caldav: "Календарь CalDAV",
  llm: "Языковая модель",
  speak: "Голос через колонки",
  stt: "Распознавание речи"
};
function le(e, n, t, i, s, o = !1) {
  const r = i.filter((d) => !s || s.includes(d.domain)), u = [
    { value: "", label: "Выбрать из Home Assistant" },
    ...r.map((d) => ({ value: d.id, label: `${d.name} (${d.id})` }))
  ];
  return t && !r.some((d) => d.id === t) && u.push({ value: t, label: `${t} (сейчас не найдено)` }), [
    { name: `${e}_pick`, label: n, type: "select", options: u, value: t, wide: !0 },
    {
      name: e,
      label: `${n}: ID вручную`,
      value: t,
      required: o && r.length === 0,
      hint: "Можно указать ID вручную. Сохранённое значение не исчезнет, если HA временно недоступен.",
      wide: !0
    }
  ];
}
function Q(e, n, t) {
  const i = String(e[n] ?? "").trim();
  return i !== t ? i : String(e[`${n}_pick`] ?? "").trim() || i;
}
const Oe = (e) => Array.isArray(e) ? e.join(`
`) : "", ye = (e) => e.split(/[\n,]/).map((n) => n.trim()).filter(Boolean);
function ee(e, n, t, i) {
  return me(n, {
    onSubmit: async (o, r) => {
      const { settings: u, secrets: d } = t(o), l = Object.fromEntries(Object.entries(d ?? {}).filter(([, c]) => c !== ""));
      if (u && Object.keys(u).length) {
        const c = await e.invokeAction("domovoy.actions", "settings.update", u);
        if (!c.ok) {
          r.showErrors(c.error);
          return;
        }
        (c.data.secrets_cleared ?? []).filter((m) => !(m in l)).length && C("Адрес изменён, поэтому сохранённый ключ сброшен — введите его заново.", "warn", 9e3);
      }
      if (Object.keys(l).length) {
        const c = await e.invokeAction("domovoy.actions", "secrets.set", l);
        if (!c.ok) {
          r.showErrors(c.error);
          return;
        }
      }
      C("Сохранено", "good"), i();
    }
  }).el;
}
const ke = (e, n, t) => ({
  name: e,
  label: n,
  type: "password",
  value: "",
  autocomplete: "new-password",
  placeholder: t ? "сохранён — введите, чтобы заменить" : "не задан",
  wide: !0
});
function Yt(e, n, t) {
  return w("Проверить", async () => {
    const i = await e.invokeAction("domovoy.actions", "integration.test", { name: n });
    if (!i.ok)
      C(i.error.message, "bad", 7e3);
    else if (i.data.ok) {
      const s = i.data.detail;
      C(s?.username ? `Связь есть: @${s.username}` : "Связь есть", "good");
    } else
      C(i.data.error?.message ?? "Не получилось", "bad", 7e3);
    t();
  });
}
const _e = /* @__PURE__ */ new Set();
function W(e, n, t, i) {
  const s = a("details", { class: "ks-card dv-section", id: `dv-${e}` }, a("summary", null, a("h2", null, n), t), i);
  return s.open = _e.has(e), s.addEventListener("toggle", () => {
    s.open ? _e.add(e) : _e.delete(e);
  }), s;
}
function Se(e, n, t, i, s, o, r, u) {
  const d = async (c) => {
    const p = await e.invokeAction("domovoy.actions", "settings.update", { [n]: c });
    return p.ok ? u() : C(p.error.message, "bad", 7e3), p;
  }, l = (c) => {
    const p = c >= 0 ? t[c] : null;
    K(p ? `Изменить: ${r}` : `Добавить: ${r}`, s(p), async (m) => {
      const v = t.slice(), h = o(m, p);
      return c >= 0 ? v[c] = h : v.push(h), d(v);
    });
  };
  return a(
    "div",
    null,
    Me(
      [
        ...i.map((c, p) => ({ key: `c${p}`, header: c.header, render: (m) => c.render(m) })),
        { key: "a", header: "", render: (c) => a("div", { class: "ks-row" }, w(g.edit, () => l(t.indexOf(c))), w(g.delete, async () => {
          await d(t.filter((p) => p !== c));
        }, "danger")) }
      ],
      t,
      O("Пока не задано.")
    ),
    a("div", { class: "ks-row" }, T(g.add, { onClick: () => l(-1) }))
  );
}
function Wt(e, n, t) {
  const i = (o) => {
    K(
      o ? `Изменить: ${o.name}` : "Новый контакт",
      [
        { name: "name", label: "Имя", required: !0, value: o?.name ?? "", wide: !0 },
        { name: "aliases", label: "Как ещё называют", value: (o?.aliases ?? []).join(", "), hint: "Через запятую: «жена, Маша»", wide: !0 },
        { name: "chat_id", label: "Telegram chat_id", value: o?.channels.telegram?.chat_id ?? "", hint: "Проще: пусть человек напишет боту, потом нажмите «Привязать» ниже.", wide: !0 },
        { name: "is_self", label: "Это я", type: "checkbox", value: o?.is_self ?? !1, hint: "Только этот контакт может давать команды в Telegram." }
      ],
      async (r) => {
        const u = { ...o?.channels ?? {} };
        String(r.chat_id).trim() ? u.telegram = { chat_id: String(r.chat_id).trim() } : delete u.telegram;
        const d = { name: String(r.name).trim(), aliases: ye(String(r.aliases)), channels: u, is_self: r.is_self === !0 }, l = o ? await e.invokeAction("domovoy.actions", "contacts.update", { id: o.id, ...d }) : await e.invokeAction("domovoy.actions", "contacts.create", d);
        return l.ok && t(), l;
      }
    );
  }, s = (o, r) => {
    const u = n.contacts.map((d) => ({ value: String(d.id), label: d.name }));
    u.push({ value: "__new__", label: "Создать новый контакт…" }), K(
      `Привязать ${r}`,
      [
        { name: "contact_id", label: "К контакту", type: "select", options: u, required: !0, value: n.contacts[0]?.id ? String(n.contacts[0].id) : "__new__", wide: !0 },
        { name: "is_self", label: "Это я (владелец) — разрешить команды", type: "checkbox", value: !1, hint: "Команды принимает только контакт с этой галочкой." }
      ],
      async (d) => {
        const l = d.is_self === !0;
        if (d.contact_id === "__new__") {
          const p = await e.invokeAction("domovoy.actions", "contacts.create", {
            name: r,
            aliases: [],
            channels: { telegram: { chat_id: o } },
            is_self: l
          });
          if (!p.ok)
            return p;
          const m = await e.invokeAction("domovoy.actions", "contacts.link", {
            contact_id: p.data.contact.id,
            chat_id: o,
            is_self: l
          });
          return m.ok && t(), m;
        }
        const c = await e.invokeAction("domovoy.actions", "contacts.link", {
          contact_id: Number(d.contact_id),
          chat_id: o,
          is_self: l
        });
        return c.ok && t(), c;
      }
    );
  };
  return a(
    "div",
    null,
    Me(
      [
        { key: "name", header: "Имя", render: (o) => a("span", null, o.name, o.is_self ? [" ", D("это я", "info")] : null) },
        { key: "al", header: "Также", render: (o) => o.aliases.join(", ") || g.none },
        { key: "tg", header: "Telegram", render: (o) => o.channels.telegram?.chat_id ? D("привязан", "good") : D("не привязан", "warn") },
        { key: "a", header: "", render: (o) => a("div", { class: "ks-row" }, w(g.edit, () => i(o)), w(g.delete, async () => {
          (await A(e, "contacts.delete", { id: o.id }, { confirm: { title: "Удалить контакт", message: o.name } })).ok && t();
        }, "danger")) }
      ],
      n.contacts,
      O("Контактов нет. Добавьте себя и тех, кому Домовой будет писать.")
    ),
    n.linkRequests.length ? a(
      "div",
      { class: "dv-link-requests" },
      a("h3", null, "Кто-то написал боту"),
      a("ul", { class: "ks-list" }, n.linkRequests.map((o) => a("li", null, a("div", { class: "ks-grow" }, `${o.name || o.username || "Без имени"} · chat_id ${o.chat_id}`, o.text ? a("div", { class: "ks-sub" }, `«${o.text}»`) : null), w("Привязать…", () => s(o.chat_id, o.name || o.username || o.chat_id), "primary"))))
    ) : null,
    a("div", { class: "ks-row" }, T("Добавить контакт", { onClick: () => i(null) }))
  );
}
const Kt = "http://127.0.0.1:48123/domovoy-api/", Zt = "<секрет Assist — нажмите «Показать»>";
function Fe(e) {
  return [
    "# configuration.yaml — один раз",
    "rest_command:",
    "  domovoy_say:",
    `    url: "${Kt}frontends/assist"`,
    "    method: POST",
    "    headers:",
    `      X-Domovoy-Secret: "${e}"`,
    "      Content-Type: application/json",
    `    payload: '{"text": {{ text | tojson }}, "room": {{ room | default("") | tojson }}, "speak": true}'`,
    "",
    "# автоматизация: фраза в Assist / на Яндекс Станции через HA: «домовой …»",
    "automation:",
    "  - alias: Домовой — голосовая команда",
    "    trigger:",
    "      - platform: conversation",
    "        command:",
    '          - "домовой {text}"',
    "    action:",
    "      - service: rest_command.domovoy_say",
    "        data:",
    '          text: "{{ trigger.slots.text }}"',
    "    # ответ озвучит сам Домовой через колонки из раздела «Голос через колонки»"
  ].join(`
`);
}
function mt(e, n) {
  const t = async () => {
    const o = await $(e, "api/security");
    return o.ok ? o.data : (C(o.error.message, "bad", 7e3), null);
  }, i = async (o) => {
    try {
      await navigator.clipboard.writeText(o), C("Скопировано", "good");
    } catch {
      C("Не удалось скопировать — нажмите «Показать» и выделите вручную", "warn", 7e3);
    }
  };
  return { secretRow: (o, r, u) => {
    const d = a("code", { class: "dv-secret" }, "•".repeat(12));
    let l = !1;
    return a(
      "div",
      { class: "dv-secret-row" },
      a("strong", null, o),
      d,
      a(
        "div",
        { class: "ks-row" },
        w("Показать", async () => {
          if (l) {
            l = !1, d.textContent = "•".repeat(12);
            return;
          }
          const c = await t();
          c && (l = !0, d.textContent = r(c));
        }, "ghost"),
        w("Скопировать", async () => {
          const c = await t();
          c && await i(r(c));
        }, "ghost"),
        w("Сменить", async () => {
          (await A(e, "security.rotate", { name: u }, { confirm: { title: "Сменить секрет", message: "Старый перестанет работать: его нужно будет заменить везде, где он указан.", label: "Сменить" } })).ok && n();
        }, "danger")
      )
    );
  }, fetchSecurity: t, copy: i };
}
function Gt(e, n) {
  const { secretRow: t, fetchSecurity: i, copy: s } = mt(e, n);
  return a(
    "div",
    null,
    a("p", { class: "ks-muted" }, "Из панели Home Assistant доступ уже открыт. Эти ключи нужны только для внешних клиентов: они не хранятся на странице, пока вы их не запросите."),
    t("API-токен (Bearer)", (o) => o.api_token, "api_token"),
    t("Секрет для Home Assistant (Assist)", (o) => o.assist_secret, "assist_secret"),
    a("h3", null, "Голос через Home Assistant (фраза «домовой …»)"),
    a("p", { class: "ks-muted" }, "Если Home Assistant работает не на этом же устройстве, замените 127.0.0.1 на адрес, по которому он видит аддон."),
    a("pre", { class: "dv-code" }, Fe(Zt)),
    w("Скопировать YAML с секретом", async () => {
      const o = await i();
      o && await s(Fe(o.assist_secret));
    }, "secondary")
  );
}
function Jt(e, n, t) {
  const { secretRow: i } = mt(e, n), s = w("Проверить настройку", async () => {
    const o = await e.invokeAction("domovoy.actions", "alice.test");
    o.ok ? o.data.ok ? C("Настройка Алисы готова: навык отвечает локально. Публичный адрес и сам навык проверяются в Yandex Dialogs.", "good", 9e3) : C(o.data.error?.message ?? "Настройка не готова", "bad", 8e3) : C(o.error.message, "bad", 8e3), n();
  }, "secondary");
  return a(
    "div",
    null,
    a("p", { class: "ks-muted" }, "Алиса подключается как приватный навык Yandex Dialogs. Домовой не создаёт навык за вас: нужен публичный HTTPS-адрес, который видит Яндекс."),
    a(
      "ol",
      { class: "ks-list" },
      a("li", null, "Создайте приватный навык в Yandex Dialogs."),
      a("li", null, "Вставьте полный webhook-адрес: ваш публичный https://-адрес + путь ниже."),
      a("li", null, "Добавьте свой Yandex user id в поле «Кому можно говорить» и сохраните."),
      a("li", null, "Нажмите «Проверить настройку»: она проверяет allow-list и локальный ответ навыка, но не доступность из интернета.")
    ),
    i("Путь вебхука для навыка Алисы", (o) => o.alice_path, "alice_secret"),
    a("p", { class: "ks-muted" }, "Полный адрес: https://<ваш публичный адрес> + путь выше. Если аддон доступен только в LAN, Яндекс не сможет открыть навык — нужен туннель или reverse proxy с HTTPS."),
    a("h3", null, "Кому можно говорить"),
    a("p", { class: "ks-muted" }, "Укажите Yandex user id (не логин и не email), по одному на строку или через запятую. Пустой список отключает команды: это защита от чужих людей, получивших ссылку на навык."),
    ee(e, [
      { name: "allowed_user_ids", label: "Yandex user id", type: "textarea", rows: 3, value: Oe(t.alice?.allowed_user_ids), placeholder: "1234567890", hint: "Посмотреть id можно в профиле пользователя в консоли Yandex Dialogs.", wide: !0 }
    ], (o) => ({ settings: { alice: { allowed_user_ids: ye(String(o.allowed_user_ids)) } } }), n),
    a("div", { class: "ks-row" }, s)
  );
}
function Xt(e, n, t) {
  const i = new I(), s = a("div"), o = R({
    host: s,
    load: async (r) => {
      const [u, d, l, c] = await Promise.all([
        $(t, "api/integrations", void 0, r),
        $(t, "api/settings", void 0, r),
        $(t, "api/contacts", void 0, r),
        $(t, "api/ha/entities", { limit: 1e3 }, r)
      ]), p = await fe(Promise.resolve(u), Promise.resolve(d));
      return p.ok ? l.ok ? { ok: !0, data: {
        integrations: p.data[0].integrations,
        secrets: p.data[0].secrets,
        settings: p.data[1].settings,
        contacts: l.data.contacts,
        linkRequests: l.data.link_requests ?? [],
        haEntities: c.ok ? c.data.entities : [],
        haEntitiesAvailable: c.ok
      } } : l : p;
    },
    render: (r, u) => {
      const d = r.settings, l = (f) => {
        const _ = r.integrations.find((q) => q.name === f);
        return _ ? D(te(_.status), ue(_.status)) : null;
      }, c = (f) => {
        const _ = r.integrations.find((q) => q.name === f);
        return _ ? a("p", { class: "ks-muted" }, [_.detail, _.last_ok ? `Последний успех: ${L(_.last_ok)}.` : "", _.last_error ? `Последняя ошибка: ${_.last_error}` : ""].filter(Boolean).join(" "), " ", Yt(t, f, u)) : null;
      }, p = a("div", { class: "ks-grid dv-status-grid" }, r.integrations.map(
        (f) => a("div", { class: "ks-card dv-status" }, a("strong", null, Vt[f.name] ?? f.name), D(te(f.status), ue(f.status)), a("small", { class: "ks-muted" }, f.detail && f.detail.toLowerCase() !== te(f.status).toLowerCase() ? f.detail : ""))
      )), m = W("ha", "Home Assistant", l("home_assistant"), a(
        "div",
        null,
        c("home_assistant"),
        r.haEntitiesAvailable ? null : a("p", { class: "ks-muted" }, "Список сущностей недоступен. Можно указать ID вручную."),
        ee(t, [
          { name: "url", label: "Адрес Home Assistant", type: "url", value: d.ha.url, placeholder: "http://homeassistant.local:8123", hint: "В аддоне обычно http://supervisor/core — оставьте пустым, если работаете внутри HA.", wide: !0 },
          ke("ha_token", "Долгоживущий токен доступа", r.secrets.ha_token),
          ...le("person_entity", "Ваш person", d.ha.person_entity, r.haEntities, ["person"]),
          { name: "allowed_services", label: "Разрешённые сервисы управления", type: "textarea", rows: 4, value: Oe(d.ha.allowed_services), placeholder: `light.turn_on
light.turn_off
script.turn_on`, hint: "Дополнительно к базовым (свет, розетки, вентиляторы, шторы, сцены). Замки, сигнализация, скрипты и Supervisor запрещены всегда.", wide: !0 }
        ], (f) => ({ settings: { ha: { url: String(f.url).trim(), person_entity: Q(f, "person_entity", d.ha.person_entity), allowed_services: ye(String(f.allowed_services)) } }, secrets: { ha_token: String(f.ha_token) } }), u)
      )), v = a(
        "span",
        { class: "ks-row" },
        l("telegram"),
        r.linkRequests.length ? D(`${r.linkRequests.length} запрос(а)`, "warn") : null
      ), h = w("Отправить тестовое сообщение", async () => {
        const f = await t.invokeAction(
          "domovoy.actions",
          "telegram.test_message"
        );
        f.ok ? f.data.ok ? C("Тестовое сообщение отправлено в Telegram", "good") : C(f.data.detail?.last_error ?? "Не удалось отправить: сообщение осталось в очереди", "bad", 9e3) : C(f.error.message, "bad", 8e3), u();
      }, "secondary"), b = W("telegram", "Telegram", v, a(
        "div",
        null,
        a("p", { class: "ks-muted" }, "Бот принимает команды только в личном чате владельца — контакта с галочкой «Это я». Группы и другие контакты могут только получать сообщения."),
        c("telegram"),
        a("div", { class: "ks-row" }, h),
        ee(t, [
          { name: "enabled", label: "Включён", type: "checkbox", value: d.telegram.enabled },
          ke("telegram_token", "Токен бота (от @BotFather)", r.secrets.telegram_token),
          { name: "proxy", label: "HTTP-прокси для Telegram", type: "url", value: d.telegram.proxy ?? "", placeholder: "http://127.0.0.1:9080", hint: "Только для Telegram. Для Tor add-on включите http_tunnel: true и укажите http://127.0.0.1:9080. Пусто — прямое подключение.", wide: !0 }
        ], (f) => ({ settings: { telegram: { enabled: f.enabled === !0, proxy: String(f.proxy).trim() } }, secrets: { telegram_token: String(f.telegram_token) } }), u),
        a("h3", null, "Контакты"),
        Wt(t, r, u)
      )), y = W("calendar", "Календарь", l("caldav"), a("div", null, c("caldav"), ee(t, [
        { name: "url", label: "CalDAV URL", type: "url", value: d.caldav.url, placeholder: "https://caldav.example.com/dav/user/calendar/", wide: !0 },
        { name: "username", label: "Логин", value: d.caldav.username },
        ke("caldav_password", "Пароль / пароль приложения", r.secrets.caldav_password),
        { name: "default", label: "Куда добавлять по умолчанию", type: "select", options: [{ value: "local", label: "Локальный календарь" }, { value: "caldav", label: "CalDAV" }], value: d.calendar.default },
        { name: "ha_calendar_pick", label: "Добавить календарь HA", type: "select", value: "", options: [
          { value: "", label: "Выбрать из Home Assistant" },
          ...r.haEntities.filter((f) => f.domain === "calendar").map((f) => ({ value: f.id, label: `${f.name} (${f.id})` }))
        ], wide: !0 },
        { name: "ha_calendars", label: "Календари из Home Assistant", type: "textarea", rows: 2, value: Oe(d.calendar.ha_calendars), placeholder: "calendar.family", hint: "По одному на строку. События из них видны; добавлять можно, менять и удалять — нет.", wide: !0 }
      ], (f) => ({
        settings: { caldav: { url: String(f.url).trim(), username: String(f.username).trim() }, calendar: {
          default: f.default,
          ha_calendars: [...new Set([...ye(String(f.ha_calendars)), String(f.ha_calendar_pick || "").trim()].filter(Boolean))]
        } },
        secrets: { caldav_password: String(f.caldav_password) }
      }), u))), k = W("llm", "Языковая модель (необязательно)", l("llm"), a(
        "div",
        null,
        c("llm"),
        a("p", { class: "ks-muted" }, "Подойдёт любой OpenAI-совместимый сервер: локальный (Ollama, llama.cpp, LM Studio) или облачный. Без неё Домовой работает по правилам — быстро и без нагрузки на процессор. Модель ничего не решает сама: её предложения проходят проверку и попадают в «Проверку»."),
        ee(t, [
          { name: "enabled", label: "Включена", type: "checkbox", value: d.ai.enabled },
          { name: "base_url", label: "Адрес API", type: "url", value: d.ai.base_url, placeholder: "http://192.168.1.20:11434/v1", wide: !0 },
          { name: "model", label: "Модель для команд", value: d.ai.model, placeholder: "qwen2.5:3b-instruct" },
          { name: "embedding_model", label: "Модель для смыслового поиска", value: d.ai.embedding_model, placeholder: "nomic-embed-text", hint: "Пусто — поиск по словам и опечаткам, без модели." },
          ke("llm_api_key", "API-ключ (если нужен)", r.secrets.llm_api_key)
        ], (f) => ({ settings: { ai: { enabled: f.enabled === !0, base_url: String(f.base_url).trim(), model: String(f.model).trim(), embedding_model: String(f.embedding_model).trim() } }, secrets: { llm_api_key: String(f.llm_api_key) } }), u)
      )), E = W("speak", "Голос через колонки (Яндекс Станции)", l("speak"), a(
        "div",
        null,
        c("speak"),
        a("p", { class: "ks-muted" }, "Домовой говорит через колонки, подключённые к Home Assistant. Способ озвучки задаётся здесь, а не в коде."),
        Se(t, "speakers", d.speakers, [
          { header: "Колонка", render: (f) => String(f.name || f.entity_id) },
          { header: "Комната", render: (f) => String(f.room ?? "") || g.none },
          { header: "Способ", render: (f) => ({ yandex_station_text: "Яндекс Станция (текст)", tts_speak: "TTS (tts.speak)", custom: "свой сервис" })[String(f.mode)] ?? String(f.mode ?? "Яндекс Станция (текст)") },
          { header: "", render: (f) => f.default ? "по умолчанию" : "" }
        ], (f) => [
          { name: "name", label: "Название", value: f?.name ?? "", placeholder: "Станция на кухне" },
          ...le("entity_id", "media_player", String(f?.entity_id ?? ""), r.haEntities, ["media_player"], !0),
          { name: "room", label: "Комната", value: f?.room ?? "", placeholder: "кухня" },
          { name: "mode", label: "Способ озвучки", type: "select", options: [{ value: "yandex_station_text", label: "Яндекс Станция: media_player.play_media (text)" }, { value: "tts_speak", label: "tts.speak (нужна TTS-сущность)" }, { value: "custom", label: "Свой сервис" }], value: f?.mode ?? "yandex_station_text", wide: !0 },
          ...le("tts_entity", "TTS-сущность (для tts.speak)", String(f?.tts_entity ?? ""), r.haEntities, ["tts"]),
          { name: "service", label: "Свой сервис", value: f?.service ?? "", placeholder: "script.say", hint: "domain.service; в данных используйте {text} и {entity_id}." },
          { name: "default", label: "По умолчанию, если неизвестно, где человек", type: "checkbox", value: f?.default === !0, wide: !0 }
        ], (f, _) => ({
          ..._ ?? {},
          id: _?.id ?? Q(f, "entity_id", String(_?.entity_id ?? "")),
          name: String(f.name).trim(),
          entity_id: Q(f, "entity_id", String(_?.entity_id ?? "")),
          room: String(f.room).trim(),
          mode: f.mode,
          tts_entity: Q(f, "tts_entity", String(_?.tts_entity ?? "")),
          service: String(f.service).trim(),
          default: f.default === !0
        }), "колонка", u)
      )), x = W("rooms", "Где вы находитесь: комнаты и места", null, a(
        "div",
        null,
        a("p", { class: "ks-muted" }, "Датчик присутствия или устройство, по которому Домовой понимает, что вы в комнате, — для напоминаний «когда зайду на кухню» и чтобы отвечать в нужную колонку."),
        a("h3", null, "Комнаты"),
        Se(
          t,
          "rooms",
          d.rooms,
          [{ header: "Комната", render: (f) => String(f.name || f.room) }, { header: "Датчик", render: (f) => `${f.entity_id ?? ""} = ${f.state ?? "on"}` }],
          (f) => [
            { name: "name", label: "Название", required: !0, value: f?.name ?? f?.room ?? "", placeholder: "кухня" },
            ...le(
              "entity_id",
              "Сущность",
              String(f?.entity_id ?? ""),
              r.haEntities,
              ["binary_sensor", "sensor", "device_tracker", "person", "zone", "input_boolean"],
              !0
            ),
            { name: "state", label: "Активна, когда состояние", value: f?.state ?? "on" }
          ],
          (f, _) => ({
            ..._ ?? {},
            name: String(f.name).trim(),
            entity_id: Q(f, "entity_id", String(_?.entity_id ?? "")),
            state: String(f.state).trim() || "on"
          }),
          "комната",
          u
        ),
        a("h3", null, "Другие места и устройства"),
        Se(
          t,
          "places",
          d.places,
          [{ header: "Место", render: (f) => String(f.name) }, { header: "Сущность", render: (f) => `${f.entity_id ?? ""} = ${f.state ?? "on"}` }],
          (f) => [
            { name: "name", label: "Название", required: !0, value: f?.name ?? "", placeholder: "мастерская" },
            ...le("entity_id", "Сущность", String(f?.entity_id ?? ""), r.haEntities, void 0, !0),
            { name: "state", label: "Активно, когда состояние", value: f?.state ?? "on" }
          ],
          (f, _) => ({
            ..._ ?? {},
            name: String(f.name).trim(),
            entity_id: Q(f, "entity_id", String(_?.entity_id ?? "")),
            state: String(f.state).trim() || "on"
          }),
          "место",
          u
        )
      )), z = W("stt", "Распознавание речи (микрофон киоска)", l("stt"), a(
        "div",
        null,
        c("stt"),
        a("p", { class: "ks-muted" }, "Нужно только если вы говорите в микрофон киоска. Голос через Алису/Home Assistant приходит уже текстом. Подойдёт любой сервер с OpenAI-совместимым /audio/transcriptions (например, локальный faster-whisper)."),
        ee(t, [
          { name: "base_url", label: "Адрес STT-сервера", type: "url", value: d.voice.stt.base_url, placeholder: "http://127.0.0.1:8000/v1", wide: !0 },
          { name: "model", label: "Модель", value: d.voice.stt.model, placeholder: "small" },
          { name: "language", label: "Язык", value: d.voice.stt.language },
          { name: "max_seconds", label: "Максимум секунд записи", type: "number", min: 3, max: 60, value: d.voice.stt.max_seconds }
        ], (f) => ({ settings: { voice: { stt: { base_url: String(f.base_url).trim(), model: String(f.model).trim(), language: String(f.language).trim() || "ru", max_seconds: Number(f.max_seconds) || 15 } } } }), u)
      )), P = W("alice", "Алиса", l("alice"), Jt(t, u, d)), F = W("security", "Доступ и Home Assistant", null, Gt(t, u));
      return a("div", { class: "dv-stack" }, p, m, b, P, y, E, x, k, z, F);
    }
  });
  return S(e, a("div", { class: "ks-page" }, G(g.integrations), s)), B(t, i, ["integrations", "contacts", "settings"], () => o.refresh(), 800, e), i.add(() => o.dispose()), U(i);
}
function pt(e, n = !0) {
  const t = e.slice().sort((i, s) => i.path.join("/").localeCompare(s.path.join("/"), "ru")).map((i) => ({ value: String(i.id), label: i.path.join(" → ") }));
  return n ? [{ value: "", label: "— без места —" }, ...t] : t;
}
function De(e, n, t, i) {
  return K(
    t ? `Изменить: ${t.name}` : "Добавить вещь",
    [
      { name: "name", label: g.name, required: !0, value: t?.name ?? "", wide: !0 },
      { name: "quantity", label: g.quantity, type: "number", step: "any", min: 0, value: t?.quantity ?? "" },
      { name: "unit", label: g.unit, value: t?.unit ?? "", placeholder: "шт, кг, м…" },
      { name: "location_id", label: g.place, type: "select", options: pt(n), value: t?.location_id ? String(t.location_id) : "", wide: !0 },
      { name: "new_path", label: "Или новое место", placeholder: "Нижний шкаф → Коробка 3", hint: "Создам недостающие уровни автоматически.", wide: !0 },
      { name: "category", label: "Категория", value: t?.category ?? "" },
      { name: "properties", label: "Свойства", type: "textarea", rows: 3, value: Nt(t?.properties), hint: "По строке: «номинал: 10 кОм»", wide: !0 },
      { name: "notes", label: g.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 }
    ],
    async (s) => {
      const o = Rt(String(s.new_path ?? "")), r = {
        name: String(s.name).trim(),
        quantity: Ht(s.quantity),
        unit: String(s.unit ?? "").trim(),
        category: String(s.category ?? "").trim(),
        properties: zt(String(s.properties ?? "")),
        notes: String(s.notes ?? "")
      };
      o.length ? r.location_path = o : r.location_id = s.location_id ? Number(s.location_id) : null;
      const u = t ? await Ve(e, "items.update", { id: t.id, ...r }) : await Ve(e, "items.create", r);
      return u.ok && i(), u;
    }
  );
}
function Ve(e, n, t) {
  return e.invokeAction("domovoy.actions", n, t);
}
function ft(e, n, t) {
  const i = a("div", { class: "dv-item-detail" }, a("p", { class: "ks-muted" }, g.loading)), s = pe("Вещь", i);
  (async () => {
    const [o, r, u] = await Promise.all([
      $(e, `api/items/${n}`),
      $(e, `api/items/${n}/history`),
      $(e, "api/locations")
    ]);
    if (!o.ok) {
      S(i, a("p", { class: "ks-error" }, o.error.message));
      return;
    }
    const d = o.data.item, l = () => {
      t(), s.close();
    };
    S(
      i,
      a("h3", null, d.name),
      a(
        "dl",
        { class: "dv-facts" },
        a("dt", null, g.quantity),
        a("dd", null, Le(d.quantity, d.unit) || g.none),
        a("dt", null, g.place),
        a("dd", null, d.location_text || "не указано"),
        d.category ? [a("dt", null, "Категория"), a("dd", null, d.category)] : null,
        ...Object.entries(d.properties ?? {}).flatMap(([c, p]) => [a("dt", null, c), a("dd", null, p)]),
        d.notes ? [a("dt", null, g.notes), a("dd", null, d.notes)] : null,
        a("dt", null, "Изменено"),
        a("dd", null, `${L(d.updated_at)} · ${d.source}`)
      ),
      a(
        "div",
        { class: "ks-row" },
        T(g.edit, { variant: "primary", onClick: () => u.ok && void De(e, u.data.locations, d, l) }),
        T("Списать 1", { onClick: async () => {
          (await A(e, "items.consume", { id: d.id, quantity: 1 })).ok && l();
        } }),
        T(g.delete, { variant: "danger", onClick: async () => {
          (await A(e, "items.delete", { id: d.id }, { confirm: { title: "Удалить вещь", message: `«${d.name}» будет удалена. Это можно отменить в журнале.` } })).ok && l();
        } })
      ),
      a("h4", null, "История"),
      r.ok && r.data.history.length ? a("ul", { class: "ks-list" }, r.data.history.slice(0, 12).map((c) => M(c.summary, `${L(c.ts)} · ${c.actor}/${c.source}`))) : O("Изменений не было.")
    );
  })();
}
function Qt(e, n, t) {
  const i = new I();
  let s = "", o = String(n.location_id ?? "");
  const r = a("div"), u = ce({ name: "q", label: "Фильтр", placeholder: "название или заметка" }), d = ce({ name: "loc", label: g.place, type: "select", options: [{ value: "", label: "Везде" }], value: o });
  let l = [];
  const c = R({
    host: r,
    load: (m) => fe(
      $(t, "api/items", { q: s || void 0, location_id: o || void 0, limit: 500 }, m),
      $(t, "api/locations", void 0, m)
    ),
    render: ([{ items: m }, { locations: v }], h) => {
      l = v;
      const b = d.input, y = [{ value: "", label: "Везде" }, ...pt(v, !1)];
      return S(b, y.map((k) => a("option", { value: k.value, selected: k.value === o }, k.label))), b.value = o, a(
        "div",
        null,
        Me(
          [
            { key: "name", header: g.name, render: (k) => a("button", { class: "ks-link", type: "button", onClick: () => ft(t, k.id, h) }, k.name) },
            { key: "qty", header: g.quantity, render: (k) => k.quantity === 0 ? D("нет", "warn") : Le(k.quantity, k.unit) || g.none },
            { key: "place", header: g.place, render: (k) => k.location_text || g.none },
            { key: "updated", header: "Изменено", render: (k) => L(k.updated_at), className: "ks-hide-narrow" },
            {
              key: "actions",
              header: "",
              render: (k) => a(
                "div",
                { class: "ks-row" },
                w(g.edit, () => void De(t, v, k, h)),
                w(g.delete, async () => {
                  (await A(t, "items.delete", { id: k.id }, { confirm: { title: "Удалить вещь", message: `«${k.name}» будет удалена. Это можно отменить в журнале.` } })).ok && h();
                }, "danger")
              )
            }
          ],
          m,
          a("div", { class: "ks-empty" }, a("strong", null, "Здесь пока пусто"), a("p", null, "Скажите «запомни: девять резисторов лежат в третьей коробке» или добавьте вручную."))
        ),
        a("p", { class: "ks-muted" }, `${m.length} шт.${m.length >= 500 ? " (показаны первые 500 — уточните фильтр)" : ""}`)
      );
    }
  }), p = () => c.refresh();
  return u.input.addEventListener("input", () => {
    s = u.input.value.trim(), p();
  }), d.input.addEventListener("change", () => {
    o = d.input.value, p();
  }), S(
    e,
    a(
      "div",
      { class: "ks-page" },
      G(g.inventory, T(g.add, { variant: "primary", onClick: () => void De(t, l, null, p) })),
      a("div", { class: "ks-card ks-filters" }, u.el, d.el),
      r
    )
  ), B(t, i, ["items", "locations"], p), i.add(() => c.dispose()), U(i);
}
const kt = { home: "дом", room: "комната", cabinet: "шкаф", shelf: "полка", box: "коробка", cell: "ячейка", place: "место" }, en = Object.entries(kt).map(([e, n]) => ({ value: e, label: n }));
function gt(e, n = []) {
  for (const t of e)
    n.push(t), gt(t.children, n);
  return n;
}
function tn(e, n, t) {
  const i = new I(), s = a("div"), o = T(g.add, { variant: "primary" }), r = (l, c, p, m) => {
    const v = gt(p).filter((h) => !l || h.id !== l.id && !h.path.join("\0").startsWith(l.path.join("\0") + "\0"));
    K(
      l ? `Изменить: ${l.name}` : c ? `Новое место внутри «${c.name}»` : "Новое место",
      [
        { name: "name", label: g.name, required: !0, value: l?.name ?? "", wide: !0 },
        { name: "kind", label: "Тип", type: "select", options: en, value: l?.kind ?? (c ? "box" : "room") },
        { name: "parent_id", label: "Внутри", type: "select", options: [{ value: "", label: "— верхний уровень —" }, ...v.map((h) => ({ value: String(h.id), label: h.path.join(" → ") }))], value: String((l ? l.parent_id : c?.id) ?? ""), wide: !0 },
        { name: "notes", label: g.notes, type: "textarea", rows: 2, value: l?.notes ?? "", wide: !0 }
      ],
      async (h) => {
        const b = { name: String(h.name).trim(), kind: String(h.kind), notes: String(h.notes ?? ""), parent_id: h.parent_id ? Number(h.parent_id) : null }, y = l ? await t.invokeAction("domovoy.actions", "locations.update", { id: l.id, ...b }) : await t.invokeAction("domovoy.actions", "locations.create", b);
        return y.ok && m(), y;
      }
    );
  }, u = (l, c, p) => a(
    "li",
    { class: "dv-loc" },
    a(
      "div",
      { class: "dv-loc-row" },
      a("span", { class: "dv-loc-name" }, l.name, " ", D(kt[l.kind] ?? l.kind, "neutral")),
      a("span", { class: "ks-muted" }, l.item_count ? `${l.item_count} вещ.` : ""),
      a(
        "span",
        { class: "ks-row dv-loc-actions" },
        l.item_count ? w("Вещи", () => t.navigate("domovoy.inventory", { location_id: String(l.id) }), "ghost") : null,
        w("+ Внутрь", () => r(null, l, c, p), "ghost"),
        w(g.edit, () => r(l, null, c, p)),
        w(g.delete, async () => {
          (await A(t, "locations.delete", { id: l.id }, { confirm: { title: "Удалить место", message: `«${l.name}» будет удалено (только если оно пустое).` } })).ok && p();
        }, "danger")
      )
    ),
    l.children.length ? a("ul", { class: "dv-loc-tree" }, l.children.map((m) => u(m, c, p))) : null
  ), d = R({
    host: s,
    load: (l) => t.readData("domovoy.api", { path: "api/locations/tree" }, { signal: l }),
    render: ({ tree: l }, c) => (o.onclick = () => r(null, null, l, c), l.length ? a("ul", { class: "dv-loc-tree dv-loc-root" }, l.map((p) => u(p, l, c))) : a("div", { class: "ks-empty" }, a("strong", null, "Мест ещё нет"), a("p", null, "Они появятся сами, когда вы скажете «положил в третью коробку нижнего шкафа», или добавьте вручную.")))
  });
  return e.replaceChildren(a("div", { class: "ks-page" }, G(g.locations, o), a("div", { class: "ks-card" }, s))), B(t, i, ["locations", "items"], () => d.refresh()), i.add(() => d.dispose()), U(i);
}
const Ye = "domovoy.session";
function nn() {
  try {
    let e = window.sessionStorage.getItem(Ye);
    return e || (e = `web-${Math.random().toString(36).slice(2, 10)}`, window.sessionStorage.setItem(Ye, e)), e;
  } catch {
    return "web-anon";
  }
}
function ze(e, n) {
  const t = a("input", { class: "ks-input dv-command", type: "text", placeholder: g.commandPlaceholder, "aria-label": "Команда", autocomplete: "off", enterkeyhint: "send" }), i = a("div", { class: "dv-reply", role: "status", "aria-live": "polite" }), s = T(g.send, { variant: "primary", type: "submit" }), o = a("form", { class: "dv-commandbar" }, t, s), r = async (d) => {
    const l = d.trim();
    if (!l)
      return;
    s.disabled = !0, S(i, a("span", { class: "ks-muted" }, g.loading));
    const c = await ut(e, "command.send", { text: l, session_id: nn() });
    if (s.disabled = !1, !c.ok) {
      S(i, a("span", { class: "ks-error" }, c.error.message));
      return;
    }
    t.value = "", u(c.data), n();
  }, u = (d) => {
    const l = (d.options ?? []).map((c, p) => w(`${p + 1}. ${c}`, () => void r(String(p + 1))));
    S(
      i,
      a("div", { class: "dv-reply-line" }, D(te(d.status), ue(d.status)), " ", d.reply),
      l.length ? a("div", { class: "ks-row dv-chips" }, l) : null,
      d.undoable && d.command_id ? w(g.undo, async () => {
        (await A(e, "command.undo", { id: d.command_id }, { success: "Отменено" })).ok && (S(i, a("span", { class: "ks-muted" }, "Отменено.")), n());
      }, "ghost") : null
    );
  };
  return o.addEventListener("submit", (d) => {
    d.preventDefault(), r(t.value);
  }), a("div", { class: "ks-card dv-command-card" }, o, i);
}
function an(e) {
  if (!e.events.length)
    return O("Сегодня и завтра событий нет.");
  const n = e.timezone;
  se(n);
  const t = J(e.now, n);
  return a(
    "ul",
    { class: "ks-list" },
    e.events.map(
      (i) => M(
        i.title,
        `${J(i.start, n) === t ? "сегодня" : "завтра"}, ${i.all_day ? "весь день" : `${ie(i.start, n)}–${ie(i.end, n)}`}${i.location ? ` · ${i.location}` : ""}`
      )
    )
  );
}
function sn(e, n, t) {
  const i = new I(), s = t.mode === "kiosk", o = a("div", { class: `ks-page dv-today${s ? " ks-scope dv-kiosk" : ""}`, dataset: s ? { theme: "kiosk", noSwipe: "true" } : void 0 }), r = a("div", { class: "ks-page" }), u = ze(t, () => d.refresh());
  S(e, o), S(o, u, r);
  const d = R({
    host: r,
    load: (l) => $(t, "api/today", void 0, l),
    render: (l, c) => {
      se(l.timezone);
      const p = (m, v) => a(
        "div",
        { class: "ks-row" },
        v === "fired" ? w("Готово", async () => {
          await A(t, "reminders.done", { id: m }), c();
        }, "primary") : null,
        w("+10 мин", async () => {
          await A(t, "reminders.snooze", { id: m, minutes: 10 }), c();
        })
      );
      return a(
        "div",
        { class: "ks-grid" },
        j("Календарь", an(l)),
        j(
          "Напоминания",
          l.reminders.length ? a("ul", { class: "ks-list" }, l.reminders.map((m) => M(
            m.text,
            [m.state === "fired" ? "сработало" : m.due_at ? `${L(m.due_at)} (${Pe(m.due_at)})` : lt(m.trigger), m.recurrence ? ` · ${he(m.recurrence)}` : "", ` · ${g.channels[m.channel] ?? m.channel}`].join(""),
            p(m.id, m.state),
            m.state === "fired" ? "dv-fired" : ""
          ))) : O("Напоминаний нет.")
        ),
        j(
          "Список покупок",
          l.shopping.length ? a("ul", { class: "ks-list" }, l.shopping.map((m) => M(m.title, void 0, w("Куплено", async () => {
            await A(t, "tasks.complete", { id: m.id }), c();
          })))) : O("Список покупок пуст.")
        ),
        j(
          "Задачи",
          l.tasks.length ? a("ul", { class: "ks-list" }, l.tasks.map((m) => M(m.title, m.due_date ? `до ${m.due_date}${m.recurrence ? ` · ${he(m.recurrence)}` : ""}` : "", w("Готово", async () => {
            await A(t, "tasks.complete", { id: m.id }), c();
          })))) : O("Задач нет.")
        ),
        l.review_count ? j("Ждёт проверки", a(
          "div",
          null,
          a("p", null, `Есть неуверенные команды: ${l.review_count}. Я ничего не записал без вашего подтверждения.`),
          // the review page exists in the admin UI only; on the kiosk there is nothing to open
          s ? a("p", { class: "ks-muted" }, "Откройте администрирование на телефоне или компьютере, чтобы решить.") : T("Открыть проверку", { variant: "primary", onClick: () => t.navigate("domovoy.review") })
        )) : null,
        l.warnings.length ? j("Календари", a("p", { class: "ks-stale-banner" }, `Не удалось прочитать: ${l.warnings.map((m) => m.source).join(", ")}`)) : null,
        s ? null : j(
          "Последние команды",
          l.recent.length ? a("ul", { class: "ks-list" }, l.recent.map((m) => M(m.text, m.reply ?? "", D(te(m.status), ue(m.status))))) : et("Команд ещё не было", "Скажите или напишите что-нибудь выше.")
        )
      );
    }
  });
  return B(t, i, ["calendar", "reminders", "tasks", "review", "commands", "outbox", "notification"], () => d.refresh()), i.add(() => d.dispose()), U(i);
}
function We(e, n, t) {
  K(
    n ? "Изменить заметку" : "Новая заметка",
    [
      { name: "title", label: "Заголовок", value: n?.title ?? "", wide: !0 },
      { name: "body", label: "Текст", type: "textarea", rows: 6, required: !0, value: n?.body ?? "", wide: !0 },
      { name: "tags", label: "Теги", value: (n?.tags ?? []).join(", "), hint: "Через запятую", wide: !0 }
    ],
    async (i) => {
      const s = { title: String(i.title ?? "").trim(), body: String(i.body).trim(), tags: String(i.tags ?? "").split(",").map((r) => r.trim()).filter(Boolean) }, o = n ? await e.invokeAction("domovoy.actions", "notes.update", { id: n.id, ...s }) : await e.invokeAction("domovoy.actions", "notes.create", s);
      return o.ok && t(), o;
    }
  );
}
function on(e, n, t) {
  const i = new I(), s = a("div");
  let o = "";
  const r = ce({ name: "q", label: "Поиск по заметкам", placeholder: "слово из заголовка или текста" }), u = T(g.add, { variant: "primary" }), d = R({
    host: s,
    load: (l) => fe(
      $(t, "api/notes", { q: o || void 0 }, l),
      $(t, "api/items", { limit: 8 }, l)
    ),
    render: ([{ notes: l }, { items: c }], p) => (u.onclick = () => We(t, null, p), a(
      "div",
      { class: "ks-grid" },
      j(
        "Заметки",
        l.length ? a("ul", { class: "ks-list" }, l.map(
          (m) => M(
            m.title || m.body.slice(0, 60),
            a("span", null, m.title ? m.body.slice(0, 200) : "", m.tags.length ? ` · #${m.tags.join(" #")}` : "", ` · ${L(m.updated_at)}`),
            a(
              "div",
              { class: "ks-row" },
              w(g.edit, () => We(t, m, p)),
              w(g.delete, async () => {
                (await A(t, "notes.delete", { id: m.id }, { confirm: { title: "Удалить заметку", message: m.title || m.body.slice(0, 80) } })).ok && p();
              }, "danger")
            )
          )
        )) : O(o ? "Ничего не найдено." : "Заметок пока нет. Скажите «запомни, что код домофона 4711».")
      ),
      j(
        "Недавно запомнено",
        c.length ? a("ul", { class: "ks-list" }, c.map((m) => M(`${m.name}${m.quantity !== null ? ` — ${Le(m.quantity, m.unit)}` : ""}`, `${m.location_text || "место не указано"} · ${L(m.updated_at)}`))) : O()
      )
    ))
  });
  return r.input.addEventListener("input", () => {
    o = r.input.value.trim(), d.refresh();
  }), S(e, a("div", { class: "ks-page" }, G(g.memory, u), ze(t, () => d.refresh()), a("div", { class: "ks-card ks-filters" }, r.el), s)), B(t, i, ["notes", "items", "locations"], () => d.refresh()), i.add(() => d.dispose()), U(i);
}
async function bt(e, n, t, i) {
  const s = await A(e, "review.approve", t ? { id: n, proposal: t } : { id: n });
  if (!s.ok)
    return !1;
  const o = s.data.results.filter((r) => !r.ok).map((r) => r.message);
  return s.data.still_pending ? (C(`Не выполнено, осталось в очереди: ${o.join(" ")}`, "bad", 9e3), !1) : (C(o.length ? `Выполнено частично. ${o.join(" ")}` : i, o.length ? "warn" : "good", o.length ? 9e3 : 4500), !0);
}
function rn(e, n, t) {
  pe("Проверить и поправить", (i) => {
    const s = n.proposal.map((r) => {
      const d = (we[String(r.type)]?.fields ?? []).filter((l) => l.kind !== "json").map((l) => {
        const c = r[l.name], p = l.kind === "iso" && typeof c == "string" ? ne(c) : l.kind === "bool" ? c === !0 : dt(l, c);
        return {
          name: l.name,
          label: l.label,
          type: l.kind === "bool" ? "checkbox" : l.kind === "enum" ? "select" : l.kind === "iso" ? "datetime-local" : (l.kind === "num", "text"),
          value: p,
          options: l.options?.map((m) => ({ value: m, label: g.channels[m] ?? g.lists[m] ?? { set: "заменить на это число", add: "прибавить к имеющемуся" }[m] ?? m })),
          wide: !0
        };
      });
      return { intent: r, fields: d, handle: me(d, { submitLabel: g.save, onSubmit: () => {
      } }) };
    }), o = async () => {
      const r = s.map(({ intent: u, handle: d }) => It(u, d.values(), (l) => ae(l)));
      await bt(e, n.id, r, "Выполнено с вашими правками") && (i(!0), t());
    };
    return a(
      "div",
      null,
      a("p", { class: "ks-muted" }, `Вы сказали: «${n.command_text ?? ""}». ${n.reason}`),
      s.map(({ intent: r, handle: u }) => a("fieldset", { class: "dv-intent" }, a("legend", null, Lt(String(r.type))), a("div", { class: "ks-form-grid" }, Object.values(u.fields).map((d) => d.el)))),
      a("div", { class: "ks-form-actions" }, T("Применить с правками", { variant: "primary", onClick: () => void o() }), T(g.cancel, { onClick: () => i(!1) }))
    );
  });
}
function ln(e, n, t) {
  const i = new I(), s = a("div"), o = async (c, p, m) => {
    await bt(t, c, p, "Выполнено") && m();
  };
  let r = "pending";
  const u = a("div", { class: "ks-row dv-chips" }), d = () => Ie(u, () => {
    S(u, ["pending", "approved", "rejected"].map(
      (c) => a("button", { type: "button", dataset: { key: c }, class: `ks-chip${r === c ? " is-active" : ""}`, "aria-pressed": String(r === c), onClick: () => {
        r = c, d(), l.refresh();
      } }, c === "pending" ? "Ждут решения" : c === "approved" ? "Принятые" : "Отклонённые")
    ));
  }), l = R({
    host: s,
    load: (c) => $(t, "api/review", { status: r }, c),
    render: ({ items: c }, p) => c.length ? a("div", { class: "ks-grid" }, c.map(
      (m) => j(
        a("span", null, `«${m.command_text ?? "—"}»`),
        a(
          "div",
          null,
          a("p", { class: "ks-muted" }, `${L(m.ts)} · уверенность ${m.confidence === null ? "—" : Math.round(m.confidence * 100) + "%"} · ${m.reason}`),
          a("ul", { class: "ks-list" }, m.proposal.map((v) => a("li", null, ct(v, (h) => L(h))))),
          r === "pending" ? a(
            "div",
            { class: "ks-row" },
            w("Подтвердить", async () => {
              await o(m.id, void 0, p);
            }, "primary"),
            w("Поправить…", () => rn(t, m, p)),
            w(g.reject, async () => {
              (await A(t, "review.reject", { id: m.id })).ok && p();
            }, "danger")
          ) : ve(m.status)
        )
      )
    )) : a("div", { class: "ks-empty" }, a("strong", null, r === "pending" ? "Всё проверено" : "Пусто"), a("p", null, r === "pending" ? "Неуверенные команды попадают сюда — я ничего не записываю без вашего подтверждения." : ""))
  });
  return d(), S(e, a("div", { class: "ks-page" }, G(g.review), a("p", { class: "ks-muted" }, "Здесь команды, в которых я не уверен, и всё, что предложила языковая модель. Пока вы не подтвердите, ничего не изменилось."), u, s)), B(t, i, ["review", "commands"], () => l.refresh()), i.add(() => l.dispose()), U(i);
}
const Ke = { location: "domovoy.locations", note: "domovoy.memory", task: "domovoy.tasks", event: "domovoy.calendar" };
function dn(e, n, t) {
  const i = new I(), s = /* @__PURE__ */ new Set(), o = a("input", { class: "ks-input dv-command", type: "search", placeholder: g.search_placeholder, "aria-label": g.search, autocomplete: "off", value: String(n.q ?? "") }), r = a("div", { class: "ks-row dv-chips" }), u = a("div", { class: "dv-results", "aria-live": "polite" }), d = a("p", { class: "ks-muted dv-search-meta" });
  let l = 0, c = null;
  const p = () => Ie(r, () => {
    S(
      r,
      Object.entries(g.kinds).map(
        ([b, y]) => a("button", {
          type: "button",
          dataset: { key: b },
          class: `ks-chip${s.has(b) ? " is-active" : ""}`,
          "aria-pressed": String(s.has(b)),
          onClick: () => {
            s.has(b) ? s.delete(b) : s.add(b), p(), v();
          }
        }, y)
      )
    );
  }), m = (b) => {
    b.kind === "item" ? ft(t, b.id, () => void v()) : Ke[b.kind] && t.navigate(Ke[b.kind], { id: String(b.id) });
  }, v = async () => {
    const b = o.value.trim();
    c?.abort();
    const y = l += 1;
    if (!b) {
      S(u, a("p", { class: "ks-muted" }, "Ищет по вещам, местам, заметкам, задачам и событиям — даже с опечатками.")), d.textContent = "";
      return;
    }
    c = new AbortController(), S(u, tt());
    const k = await $(t, "api/search", { q: b, kinds: [...s].join(",") || void 0, limit: 30 }, c.signal);
    if (y !== l)
      return;
    if (!k.ok) {
      k.error.code !== "aborted" && S(u, a("p", { class: "ks-error" }, k.error.message));
      return;
    }
    const { hits: E, embedder: x, mode: z } = k.data;
    d.textContent = `${z === "hybrid" ? "Смысловой поиск" : "Поиск по словам и опечаткам"} · ${x}`, S(
      u,
      E.length ? a("ul", { class: "ks-list ks-list-click" }, E.map((P) => {
        const F = M(
          a("span", null, D(g.kinds[P.kind] ?? P.kind, "info"), " ", P.title),
          P.snippet
        );
        return F.tabIndex = 0, F.setAttribute("role", "button"), F.addEventListener("click", () => m(P)), F.addEventListener("keydown", (f) => {
          (f.key === "Enter" || f.key === " ") && (f.preventDefault(), m(P));
        }), F;
      })) : O(`Ничего не нашлось по «${b}». Возможно, я этого ещё не запоминал.`)
    );
  }, h = Qe(() => void v(), 250);
  return o.addEventListener("input", () => h()), i.add(() => h.cancel()), i.add(() => c?.abort()), p(), S(e, a("div", { class: "ks-page" }, a("div", { class: "ks-card" }, o, r, d), u)), v(), B(t, i, ["items", "locations", "notes", "tasks", "calendar"], () => void v(), 500), U(i);
}
const cn = (e) => e.split(/[\n,]/).map((n) => n.trim()).filter(Boolean);
function un(e) {
  let n = [];
  try {
    n = Intl.supportedValuesOf?.("timeZone") ?? [];
  } catch {
    n = [];
  }
  return n.length || (n = ["Europe/Moscow", "Europe/Kaliningrad", "Europe/Samara", "Asia/Yekaterinburg", "Asia/Novosibirsk", "Asia/Vladivostok", "UTC"]), e && !n.includes(e) && (n = [e, ...n]), [{ value: "", label: "Как на сервере" }, ...n.map((t) => ({ value: t, label: t }))];
}
function de(e, n, ...t) {
  return a("section", { class: "ks-card dv-section-card" }, a("header", null, a("h2", null, e)), n ? a("p", { class: "ks-muted" }, n) : null, t);
}
function ge(e, n, t, i) {
  return me(n, {
    onSubmit: async (s, o) => {
      const r = await e.invokeAction("domovoy.actions", "settings.update", t(s));
      if (!r.ok) {
        o.showErrors(r.error);
        return;
      }
      C("Сохранено", "good"), i();
    }
  }).el;
}
function mn(e, n) {
  const t = URL.createObjectURL(new Blob([JSON.stringify(n, null, 2)], { type: "application/json" })), i = a("a", { href: t, download: e });
  document.body.appendChild(i), i.click(), i.remove(), window.setTimeout(() => URL.revokeObjectURL(t), 1e4);
}
function pn(e, n, t) {
  const i = new I(), s = a("div"), o = R({
    host: s,
    load: async (r) => {
      const [u, d, l, c] = await Promise.all([
        $(t, "api/settings", void 0, r),
        $(t, "api/voice/status", void 0, r),
        $(t, "api/state", void 0, r),
        $(t, "api/backups", void 0, r)
      ]);
      return u.ok ? d.ok ? l.ok ? { ok: !0, data: { settings: u.data.settings, voice: d.data, state: l.data, backups: c.ok ? c.data.backups : [] } } : l : d : u;
    },
    render: ({ settings: r, voice: u, state: d, backups: l }, c) => {
      se(d.timezone);
      const p = de("Общие", null, ge(t, [
        { name: "timezone", label: "Часовой пояс", type: "select", options: un(r.timezone), value: r.timezone, hint: `Сейчас на сервере: ${d.timezone}`, wide: !0 },
        { name: "default_reminder_hour", label: "Во сколько напоминать, если сказали только «завтра» (час)", type: "number", min: 0, max: 23, required: !0, value: r.default_reminder_hour, wide: !0 },
        { name: "default_event_minutes", label: "Длительность события по умолчанию, минут", type: "number", min: 5, max: 1440, required: !0, value: r.default_event_minutes, wide: !0 }
      ], (k) => ({ timezone: String(k.timezone), default_reminder_hour: Number(k.default_reminder_hour), default_event_minutes: Number(k.default_event_minutes) }), c)), m = de("Насколько доверять пониманию команд", "Правила понимают привычные фразы сами. Если уверенность ниже порога — команда не выполняется, а ждёт вашего решения в «Проверке». Записи, предложенные языковой моделью, всегда идут на проверку, пока вы явно не разрешите иначе.", ge(t, [
        { name: "auto_apply_confidence", label: "Выполнять сразу при уверенности от (0–1)", type: "number", min: 0, max: 1, step: 0.05, required: !0, value: r.auto_apply_confidence, wide: !0 },
        { name: "review_confidence", label: "Отправлять на проверку от (ниже — переспрашивать)", type: "number", min: 0, max: 1, step: 0.05, required: !0, value: r.review_confidence, wide: !0 },
        { name: "ai_auto_apply", label: "Выполнять записи языковой модели без проверки (при уверенности от 0,9)", type: "checkbox", value: r.ai.auto_apply, hint: "Не рекомендуется: модель может ошибаться. Всё можно отменить в «Журнале», но лучше сначала посмотреть.", wide: !0 }
      ], (k) => ({ auto_apply_confidence: Number(k.auto_apply_confidence), review_confidence: Number(k.review_confidence), ai: { auto_apply: k.ai_auto_apply === !0 } }), c)), v = de(
        "Голос",
        "Обращение по слову-триггеру работает и с колонками через Home Assistant, и с микрофоном киоска. Разговор без слова-триггера не сохраняется.",
        a("p", null, "Микрофон киоска: ", u.enabled ? D("включён", "good") : D("выключен", "neutral"), " ", u.stt_configured ? D("распознавание настроено", "good") : D("распознавание не настроено", "warn")),
        ge(t, [
          { name: "enabled", label: "Принимать голосовые команды с микрофона киоска", type: "checkbox", value: r.voice.enabled, wide: !0 },
          { name: "trigger_words", label: "Слова-триггеры", value: (r.voice.trigger_words ?? []).join(", "), hint: "Через запятую, все падежи, которые вы произносите: «домовой, домового, домовому».", wide: !0 },
          { name: "window_s", label: "После обращения слушать без повторного слова, секунд", type: "number", min: 5, max: 120, required: !0, value: r.voice.window_s, wide: !0 },
          { name: "reply", label: "Как отвечать", type: "select", options: [{ value: "speak", label: "Голосом через колонки" }, { value: "text", label: "Только текстом на экране" }], value: r.voice.reply, wide: !0 },
          { name: "room", label: "Комната этого микрофона", value: r.voice.room, hint: "Чтобы ответ прозвучал в ближайшей колонке.", wide: !0 },
          { name: "speak_enabled", label: "Озвучивать напоминания и ответы", type: "checkbox", value: r.speak.enabled, wide: !0 },
          { name: "quiet_from", label: "Тихие часы с", type: "time", value: r.speak.quiet_from },
          { name: "quiet_to", label: "до", type: "time", value: r.speak.quiet_to },
          { name: "fallback", label: "Если колонка не ответила", type: "select", options: [{ value: "telegram", label: "Написать в Telegram" }, { value: "ui", label: "Показать на экране" }, { value: "none", label: "Ничего" }], value: r.speak.fallback, wide: !0 }
        ], (k) => ({ voice: { enabled: k.enabled === !0, trigger_words: cn(String(k.trigger_words)), window_s: Number(k.window_s), reply: k.reply, room: String(k.room).trim() }, speak: { enabled: k.speak_enabled === !0, quiet_from: String(k.quiet_from), quiet_to: String(k.quiet_to), fallback: k.fallback } }), c)
      ), h = de("Сообщения", null, ge(t, [
        { name: "sandbox", label: "Тестовый режим: ничего не отправлять наружу (Telegram, HA-уведомления)", type: "checkbox", value: r.messaging.sandbox, hint: "Сообщения останутся в «Журнале → Отправка» — удобно проверять сценарии.", wide: !0 }
      ], (k) => ({ messaging: { sandbox: k.sandbox === !0 } }), c)), b = a("input", { type: "file", accept: "application/json,.json", hidden: !0 });
      b.addEventListener("change", async () => {
        const k = b.files?.[0];
        if (b.value = "", !k)
          return;
        let E;
        try {
          E = JSON.parse(await k.text());
        } catch {
          C("Это не JSON-файл", "bad");
          return;
        }
        await at({ title: "Заменить все данные?", message: "Все текущие данные (вещи, места, заметки, задачи, напоминания, журнал) будут заменены содержимым файла. Перед этим я сделаю резервную копию.", confirmLabel: "Заменить", destructive: !0 }) && (await A(t, "data.import", { data: E }, { success: "Данные импортированы" })).ok && c();
      });
      const y = de(
        "Данные и резервные копии",
        `Версия ${d.version}. В базе: ${d.counts.items} вещей, ${d.counts.locations} мест, ${d.counts.notes} заметок. Пароли и токены в экспорт не попадают.`,
        a(
          "div",
          { class: "ks-row" },
          T("Сделать резервную копию", { variant: "primary", onClick: async () => {
            (await A(t, "backup.create", {}, { success: "Копия создана" })).ok && c();
          } }),
          T("Скачать экспорт (JSON)", { onClick: async () => {
            const k = await $(t, "api/export");
            k.ok ? mn(`domovoy-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, k.data) : C(k.error.message, "bad");
          } }),
          T("Импортировать…", { variant: "danger", onClick: () => b.click() }),
          b
        ),
        l.length ? a("ul", { class: "ks-list" }, l.slice(0, 8).map((k) => a("li", null, a("div", { class: "ks-grow" }, k.name, a("div", { class: "ks-sub" }, `${Math.max(1, Math.round(k.bytes / 1024))} КБ`))))) : O("Резервных копий пока нет — они создаются раз в сутки автоматически."),
        a("small", { class: "ks-muted" }, "Копии лежат в /config/kiosk-scene/domovoy/backups — они попадают и в общую резервную копию Home Assistant.")
      );
      return a("div", { class: "dv-stack" }, p, m, v, h, y);
    }
  });
  return S(e, a("div", { class: "ks-page" }, G(g.settings), s)), B(t, i, ["settings"], () => o.refresh(), 800, e), i.add(() => o.dispose()), U(i);
}
const fn = Object.entries(g.channels).map(([e, n]) => ({ value: e, label: n }));
function Ze(e, n, t, i) {
  const s = Z(), o = t?.kind ?? "time", r = t?.trigger ?? {}, u = o !== "time" && r.type === "state", d = r.window ? { window: r.window } : {};
  K(
    t ? "Изменить напоминание" : "Новое напоминание",
    [
      { name: "text", label: "О чём напомнить", required: !0, value: t?.text ?? "", wide: !0 },
      { name: "mode", label: "Когда", type: "select", options: [...u ? [{ value: "keep", label: "Условие устройства (не меняется)" }] : [], { value: "time", label: "В указанное время" }, { value: "presence", label: "Когда приду домой" }, { value: "room", label: "Когда зайду в комнату" }], value: u ? "keep" : o === "time" ? "time" : String(r.type ?? "presence") },
      { name: "due_at", label: "Дата и время", type: "datetime-local", value: t?.due_at ? ne(t.due_at, s) : "" },
      { name: "place", label: "Комната", value: r.place && r.type === "room" ? String(r.place) : "", hint: "Для «когда зайду в комнату»: как в настройках комнат, например «кухня»." },
      { name: "channel", label: "Как сообщить", type: "select", options: fn, value: t?.channel ?? "speak" },
      { name: "recipient", label: "Кому", type: "select", options: [{ value: "self", label: "Мне" }, ...n.filter((l) => !l.is_self).map((l) => ({ value: l.name, label: l.name }))], value: t?.recipient ?? "self" }
    ],
    async (l) => {
      const c = String(l.mode), p = { text: String(l.text).trim(), channel: l.channel, recipient: l.recipient };
      if (c !== "keep") if (c === "time") {
        if (!l.due_at)
          return { ok: !1, error: { code: "validation", message: "Укажите время", fields: { due_at: "Укажите время" } } };
        p.due_at = ae(String(l.due_at), s), p.trigger = null;
      } else if (c === "room") {
        if (!String(l.place).trim())
          return { ok: !1, error: { code: "validation", message: "Укажите комнату", fields: { place: "Укажите комнату" } } };
        p.trigger = { type: "room", place: String(l.place).trim(), require_transition: !0, ...d };
      } else {
        const v = await e.readData("domovoy.api", { path: "api/settings" }), h = v.ok ? v.data.settings.ha.person_entity : "";
        if (!h)
          return { ok: !1, error: { code: "validation", message: "Сначала укажите person-сущность в Интеграциях → Home Assistant." } };
        p.trigger = { type: "presence", person: h, place: "home", require_transition: !0, ...d };
      }
      const m = t ? await e.invokeAction("domovoy.actions", "reminders.update", { id: t.id, ...p }) : await e.invokeAction("domovoy.actions", "reminders.create", p);
      return m.ok && i(), m;
    }
  );
}
function Ge(e, n, t, i) {
  K(
    n ? "Изменить задачу" : "Новая задача",
    [
      { name: "title", label: g.title, required: !0, value: n?.title ?? "", wide: !0 },
      { name: "list", label: "Список", type: "select", options: Object.entries(g.lists).map(([s, o]) => ({ value: s, label: o })), value: n?.list ?? t },
      { name: "due_date", label: "Срок", type: "date", value: n?.due_date ?? "" },
      { name: "notes", label: g.notes, type: "textarea", rows: 2, value: n?.notes ?? "", wide: !0 }
    ],
    async (s) => {
      const o = { title: String(s.title).trim(), list: s.list, due_date: s.due_date || null, notes: String(s.notes ?? "") }, r = n ? await e.invokeAction("domovoy.actions", "tasks.update", { id: n.id, ...o }) : await e.invokeAction("domovoy.actions", "tasks.create", o);
      return r.ok && i(), r;
    }
  );
}
function kn(e, n, t) {
  const i = new I(), s = a("div");
  let o = !1, r = [];
  const u = T("Напоминание", { variant: "primary" }), d = T("Задача", { variant: "secondary" }), l = ce({ name: "done", label: "Показывать выполненное", type: "checkbox", value: !1 }), c = R({
    host: s,
    load: async (p) => {
      const v = await fe(
        $(t, "api/reminders", { states: o ? "pending,fired,done,cancelled" : "pending,fired" }, p),
        $(t, "api/tasks", { include_done: o ? "1" : "0" }, p)
      );
      if (!v.ok)
        return v;
      const h = await $(t, "api/contacts", void 0, p);
      return { ok: !0, data: [v.data[0], v.data[1], h.ok ? h.data : { contacts: [] }] };
    },
    render: ([{ reminders: p }, { tasks: m }, v], h) => {
      r = v.contacts, u.onclick = () => Ze(t, r, null, h), d.onclick = () => Ge(t, null, "tasks", h);
      const b = (k) => M(
        a("span", null, k.text, " ", ve(k.state)),
        `${k.kind === "time" && k.due_at ? `${L(k.due_at)}${k.state === "pending" ? ` (${Pe(k.due_at)})` : ""}` : lt(k.trigger)}${k.recurrence ? ` · ${he(k.recurrence)}` : ""} · ${g.channels[k.channel] ?? k.channel}${k.recipient && k.recipient !== "self" ? ` → ${k.recipient}` : ""}`,
        a(
          "div",
          { class: "ks-row" },
          k.state === "fired" || k.state === "pending" ? w("Готово", async () => {
            (await A(t, "reminders.done", { id: k.id })).ok && h();
          }, "primary") : null,
          k.state === "pending" || k.state === "fired" ? w("+10 мин", async () => {
            (await A(t, "reminders.snooze", { id: k.id, minutes: 10 })).ok && h();
          }) : null,
          k.state === "pending" ? w(g.edit, () => Ze(t, r, k, h)) : null,
          w(g.delete, async () => {
            (await A(t, "reminders.delete", { id: k.id }, { confirm: { title: "Удалить напоминание", message: `«${k.text}»` } })).ok && h();
          }, "danger")
        ),
        k.state === "fired" ? "dv-fired" : ""
      ), y = (k) => {
        const E = m.filter((x) => x.list === k);
        return E.length ? a("ul", { class: "ks-list" }, E.map(
          (x) => M(
            a("span", { class: x.done ? "dv-done" : "" }, x.title),
            [x.due_date ? `срок ${x.due_date}` : "", x.recurrence ? he(x.recurrence) : "", x.notes].filter(Boolean).join(" · "),
            a(
              "div",
              { class: "ks-row" },
              w(x.done ? "Вернуть" : k === "shopping" ? "Куплено" : "Готово", async () => {
                (await A(t, "tasks.complete", { id: x.id, done: !x.done })).ok && h();
              }, x.done ? "secondary" : "primary"),
              w(g.edit, () => Ge(t, x, k, h)),
              w(g.delete, async () => {
                (await A(t, "tasks.delete", { id: x.id }, { confirm: { title: "Удалить задачу", message: `«${x.title}»` } })).ok && h();
              }, "danger")
            )
          )
        )) : O();
      };
      return a(
        "div",
        { class: "ks-grid" },
        j("Напоминания", p.length ? a("ul", { class: "ks-list" }, p.map(b)) : O("Напоминаний нет.")),
        j(g.lists.tasks, y("tasks")),
        j(g.lists.shopping, y("shopping")),
        j(g.lists.chores, y("chores"))
      );
    }
  });
  return l.input.addEventListener("change", () => {
    o = l.input.checked, c.refresh();
  }), S(e, a("div", { class: "ks-page" }, G(g.tasks, u, d), a("div", { class: "ks-card ks-filters" }, l.el), s)), B(t, i, ["reminders", "tasks", "contacts"], () => c.refresh()), i.add(() => c.dispose()), U(i);
}
function Je(e) {
  let n = 0;
  for (let t = 0; t < e.length; t += 1)
    n += e[t] * e[t];
  return Math.sqrt(n / Math.max(1, e.length));
}
class gn {
  o;
  noise = 5e-3;
  calibrated;
  calibMs = 0;
  calibSum = 0;
  calibFrames = 0;
  state = "idle";
  loudMs = 0;
  quietMs = 0;
  preroll = [];
  prerollSamples = 0;
  chunks = [];
  samples = 0;
  constructor(n) {
    this.calibrated = (n.calibrateMs ?? 1e3) <= 0, this.o = { minRms: 0.012, ratio: 3, startMs: 120, hangoverMs: 800, prerollMs: 300, maxMs: 15e3, minMs: 350, calibrateMs: 1e3, ...n };
  }
  get speaking() {
    return this.state === "speech";
  }
  get noiseFloor() {
    return this.noise;
  }
  reset() {
    this.state = "idle", this.loudMs = 0, this.quietMs = 0, this.preroll = [], this.prerollSamples = 0, this.chunks = [], this.samples = 0;
  }
  /** Feed consecutive frames; returns the events this frame caused (usually none). */
  push(n) {
    const t = [], i = n.length / this.o.sampleRate * 1e3, s = Je(n), o = Math.max(this.o.minRms, this.noise * this.o.ratio), r = s >= o;
    if (this.state === "idle")
      return this.calibrated ? (this.noise = s < this.noise ? this.noise * 0.9 + s * 0.1 : this.noise * 0.995 + s * 5e-3, this.keepPreroll(n), this.loudMs = r ? this.loudMs + i : 0, this.loudMs >= this.o.startMs && (this.state = "speech", this.quietMs = 0, this.chunks = [...this.preroll], this.samples = this.prerollSamples, this.preroll = [], this.prerollSamples = 0, t.push({ type: "start" })), t) : (this.calibSum += s, this.calibFrames += 1, this.calibMs += i, this.calibMs >= this.o.calibrateMs && (this.noise = Math.max(2e-3, this.calibSum / this.calibFrames), this.calibrated = !0), this.keepPreroll(n), t);
    this.chunks.push(n), this.samples += n.length, this.quietMs = r ? 0 : this.quietMs + i;
    const u = this.samples / this.o.sampleRate * 1e3, d = u >= this.o.maxMs && this.quietMs < this.o.hangoverMs;
    if (this.quietMs >= this.o.hangoverMs || d) {
      const l = u - this.quietMs, c = this.collect(), p = Je(c);
      this.reset(), d ? (this.noise = Math.max(this.noise, p), t.push({ type: "discard", reason: "continuous" })) : t.push(l < this.o.minMs ? { type: "discard", reason: "short" } : { type: "end", samples: c, durationMs: u });
    }
    return t;
  }
  keepPreroll(n) {
    this.preroll.push(n), this.prerollSamples += n.length;
    const t = this.o.prerollMs / 1e3 * this.o.sampleRate;
    for (; this.preroll.length > 1 && this.prerollSamples - this.preroll[0].length >= t; )
      this.prerollSamples -= this.preroll[0].length, this.preroll.shift();
  }
  collect() {
    const n = new Float32Array(this.samples);
    let t = 0;
    for (const i of this.chunks)
      n.set(i, t), t += i.length;
    return n;
  }
}
function bn(e, n, t) {
  if (t >= n)
    return e;
  const i = n / t, s = Math.floor(e.length / i), o = new Float32Array(s);
  for (let r = 0; r < s; r += 1) {
    const u = Math.floor(r * i), d = Math.min(e.length, Math.floor((r + 1) * i));
    let l = 0;
    for (let c = u; c < d; c += 1)
      l += e[c];
    o[r] = d > u ? l / (d - u) : 0;
  }
  return o;
}
function hn(e, n) {
  const t = new Uint8Array(44 + e.length * 2), i = new DataView(t.buffer), s = (o, r) => {
    for (let u = 0; u < r.length; u += 1)
      i.setUint8(o + u, r.charCodeAt(u));
  };
  s(0, "RIFF"), i.setUint32(4, 36 + e.length * 2, !0), s(8, "WAVE"), s(12, "fmt "), i.setUint32(16, 16, !0), i.setUint16(20, 1, !0), i.setUint16(22, 1, !0), i.setUint32(24, n, !0), i.setUint32(28, n * 2, !0), i.setUint16(32, 2, !0), i.setUint16(34, 16, !0), s(36, "data"), i.setUint32(40, e.length * 2, !0);
  for (let o = 0; o < e.length; o += 1) {
    const r = Math.max(-1, Math.min(1, e[o]));
    i.setInt16(44 + o * 2, r < 0 ? r * 32768 : r * 32767, !0);
  }
  return t;
}
function vn() {
  return typeof navigator > "u" || !navigator.mediaDevices?.getUserMedia ? window.isSecureContext === !1 ? "Браузер разрешает микрофон только на https:// или localhost. Откройте киоск по HTTPS или добавьте адрес в исключения браузера." : "В этом браузере нет доступа к микрофону." : null;
}
function yn(e) {
  let n = null, t = null, i = null, s = null, o = null, r = !1, u = !1, d = !1, l = 0, c = !1, p;
  const m = (b) => e.onState(b), v = (b, y = 0) => {
    window.clearTimeout(p), y > 0 ? (m(b), p = window.setTimeout(() => u && !r && m({ kind: "listening" }), y)) : m(b);
  }, h = async (b, y) => {
    if (!c) {
      c = !0, m({ kind: "sending" });
      try {
        const k = hn(bn(b, y, 16e3), Math.min(y, 16e3)), E = await e.http.request("api/voice/command", {
          method: "POST",
          rawBody: new Blob([k.buffer], { type: "audio/wav" }),
          headers: { "Content-Type": "audio/wav", "X-Room": e.room },
          timeoutMs: 3e4
        });
        if (!u)
          return;
        E.ok ? E.data.handled && E.data.reply ? v({ kind: "heard", reply: E.data.reply, status: E.data.status ?? "" }, 6e3) : v({ kind: "listening" }) : v({ kind: "unavailable", reason: E.error.message }, 6e3);
      } finally {
        c = !1;
      }
    }
  };
  return {
    get muted() {
      return r;
    },
    async start() {
      if (u || d)
        return;
      const b = vn();
      if (b && !e.mediaDevices) {
        m({ kind: "unavailable", reason: b });
        return;
      }
      const y = l;
      d = !0, m({ kind: "starting" });
      let k;
      try {
        k = await (e.mediaDevices ?? navigator.mediaDevices).getUserMedia({ audio: { channelCount: 1, echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 } });
      } catch (x) {
        if (d = !1, y !== l)
          return;
        const z = x?.name;
        m({ kind: "unavailable", reason: z === "NotAllowedError" ? "Доступ к микрофону запрещён в браузере." : z === "NotFoundError" ? "Микрофон не найден." : "Не удалось открыть микрофон." });
        return;
      }
      if (y !== l) {
        k.getTracks().forEach((x) => x.stop()), d = !1;
        return;
      }
      if (n = k, t = e.audioContextFactory ? e.audioContextFactory() : new AudioContext(), t.state === "suspended") {
        const x = () => void t?.resume().catch(() => {
        });
        x(), document.addEventListener("pointerdown", x, { once: !0 });
      }
      const E = t.sampleRate;
      o = new gn({ sampleRate: E }), s = t.createMediaStreamSource(n), i = t.createScriptProcessor(4096, 1, 1), i.onaudioprocess = (x) => {
        if (r || !u || !o)
          return;
        const z = new Float32Array(x.inputBuffer.getChannelData(0));
        for (const P of o.push(z))
          P.type === "start" ? m({ kind: "hearing" }) : P.type === "discard" ? m({ kind: "listening" }) : h(P.samples, E);
      }, s.connect(i), i.connect(t.destination), u = !0, d = !1, n.getAudioTracks().forEach((x) => {
        x.enabled = !r;
      }), m(r ? { kind: "muted" } : { kind: "listening" });
    },
    stop() {
      l += 1, d = !1, u = !1, window.clearTimeout(p), i?.disconnect(), s?.disconnect(), i && (i.onaudioprocess = null), n?.getTracks().forEach((b) => b.stop()), t?.close().catch(() => {
      }), n = t = i = s = null, o = null, m({ kind: "off" });
    },
    setMuted(b) {
      r = b, o?.reset(), n?.getAudioTracks().forEach((y) => {
        y.enabled = !b;
      }), m(b ? { kind: "muted" } : u ? { kind: "listening" } : d ? { kind: "starting" } : { kind: "off" });
    }
  };
}
const wn = {
  starting: "Запуск микрофона…",
  listening: "Слушаю: скажите «домовой …»",
  hearing: "Слышу…",
  sending: "Разбираю…",
  muted: "Микрофон выключен"
};
function xn(e) {
  const n = a("span", { class: "dv-mic-dot", "aria-hidden": "true" }), t = a("span", { class: "dv-mic-label" }), i = a("button", { class: "dv-mic", type: "button", "aria-live": "polite", title: "Включить или выключить микрофон", dataset: { noSwipe: "true" }, onClick: e }, n, t);
  return {
    el: i,
    render(s) {
      i.dataset.state = s.kind, i.hidden = s.kind === "off", t.textContent = s.kind === "unavailable" ? s.reason : s.kind === "heard" ? s.reply : wn[s.kind] ?? "";
    }
  };
}
function _n(e) {
  return [
    {
      // The scene's avatar reads its state from the Domovoy state provider; a push from the server turns
      // "poll every few seconds" into "react immediately", so the mouth moves in step with the speakers.
      id: "domovoy.avatar-sync",
      title: "Аватар следует за ответами Домового",
      modes: ["kiosk"],
      start(n) {
        return n.subscribe(be, "avatar", () => n.refresh());
      }
    },
    {
      id: "domovoy.notifications",
      title: "Уведомления на экране киоска",
      modes: ["kiosk"],
      start(n) {
        return n.subscribe(be, "notification", (t) => {
          const i = t.payload?.text;
          typeof i == "string" && i.trim() && C(i, "info", 12e3);
        });
      }
    },
    {
      // Off unless the deployment asks for it (`config.mic` in extension.json): a kiosk that does not have a
      // microphone, or a secure origin, must not nag or fail.
      id: "domovoy.mic",
      title: "Микрофон киоска",
      modes: ["kiosk"],
      start(n) {
        const t = n.config.mic;
        if (t !== !0 && !(t && typeof t == "object"))
          return () => {
          };
        const i = typeof t.room == "string" ? String(t.room) : "", s = xn(() => o.setMuted(!o.muted));
        s.el.hidden = !0, document.body.appendChild(s.el);
        const o = yn({ http: e, room: i, onState: s.render });
        return o.start(), () => {
          o.stop(), s.el.remove();
        };
      }
    }
  ];
}
const Sn = `
.dv-head { margin: 0; }
.dv-page-title { margin: 0; font-size: 20px; }
.dv-stack { display: flex; flex-direction: column; gap: 14px; }

.dv-commandbar { display: flex; gap: 8px; }
.dv-commandbar .dv-command { flex: 1; min-width: 0; }
.dv-command-card { display: flex; flex-direction: column; gap: 10px; }
.dv-reply { min-height: 1.4em; }
.dv-reply-line { overflow-wrap: anywhere; }
.dv-chips { margin-top: 6px; }

.dv-fired { background: color-mix(in srgb, var(--ks-warn) 12%, transparent); border-radius: 6px; }
.dv-done { text-decoration: line-through; color: var(--ks-muted); }
.dv-time { font-variant-numeric: tabular-nums; color: var(--ks-muted); }

.dv-facts { display: grid; grid-template-columns: max-content 1fr; gap: 4px 14px; margin: 0 0 12px; }
.dv-facts dt { color: var(--ks-muted); }
.dv-facts dd { margin: 0; overflow-wrap: anywhere; }
.dv-intent { border: 1px solid var(--ks-border); border-radius: 8px; margin: 0 0 12px; padding: 10px; }
.dv-intent legend { padding: 0 6px; font-weight: 600; }

.dv-loc-tree { list-style: none; margin: 0; padding-left: 18px; border-left: 1px dashed var(--ks-border); }
.dv-loc-root { padding-left: 0; border-left: 0; }
.dv-loc-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; flex-wrap: wrap; }
.dv-loc-name { flex: 1 1 200px; font-weight: 600; overflow-wrap: anywhere; }
.dv-loc-actions { margin-left: auto; }

.dv-section > summary { display: flex; align-items: center; gap: 10px; cursor: pointer; list-style: none; }
.dv-section > summary::-webkit-details-marker { display: none; }
.dv-section > summary h2 { margin: 0; font-size: 16px; flex: 1; }
.dv-section[open] > summary { margin-bottom: 12px; }
.dv-status-grid .dv-status { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
.dv-secret-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 6px 0; }
.dv-secret { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; overflow-wrap: anywhere; flex: 1 1 200px; }
.dv-code { background: var(--ks-surface-2); padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 12.5px; line-height: 1.5; }
.dv-link-requests { margin: 12px 0; }

/* kiosk: bigger touch targets, no admin chrome */
.dv-kiosk .ks-btn { min-height: 48px; font-size: 17px; }
.dv-kiosk .dv-command { min-height: 52px; font-size: 18px; }
.dv-widget { min-width: 0; height: 100%; overflow: hidden; }
.dv-widget .ks-list > li { border-bottom-color: color-mix(in srgb, currentColor 12%, transparent); }
.dv-next { display: flex; flex-direction: column; gap: 4px; }
.dv-next-when { font-size: 0.9em; opacity: 0.75; }
.dv-next-title { font-size: 1.35em; font-weight: 700; overflow-wrap: anywhere; }
.dv-today-widget .dv-reminders { margin-top: 8px; }
.dv-shopping .ks-btn { min-height: 40px; min-width: 40px; }

/* microphone indicator (kiosk) */
.dv-mic { position: fixed; left: 14px; bottom: 14px; z-index: 50; display: inline-flex; align-items: center; gap: 8px; max-width: min(70vw, 520px);
  padding: 8px 14px; border-radius: 999px; border: 1px solid rgba(32,48,65,.18); background: rgba(255,255,255,.88); color: #203041;
  font: 500 14px/1.3 system-ui, sans-serif; cursor: pointer; backdrop-filter: blur(6px); }
.dv-mic[hidden] { display: none; }
.dv-mic-dot { width: 10px; height: 10px; border-radius: 50%; background: #8a96a3; flex: none; }
.dv-mic[data-state="listening"] .dv-mic-dot { background: #1f7a4d; }
.dv-mic[data-state="hearing"] .dv-mic-dot { background: #d9822b; animation: dv-pulse 0.8s ease-in-out infinite; }
.dv-mic[data-state="sending"] .dv-mic-dot { background: #2464a8; animation: dv-pulse 0.8s ease-in-out infinite; }
.dv-mic[data-state="unavailable"] .dv-mic-dot { background: #b3261e; }
.dv-mic[data-state="muted"] { opacity: .7; }
.dv-mic-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@keyframes dv-pulse { 50% { transform: scale(1.5); opacity: .6; } }
@media (prefers-reduced-motion: reduce) { .dv-mic-dot { animation: none !important; } }
`, $e = (e, n, t) => {
  const i = Number(e);
  return Number.isFinite(i) && i >= 1 ? Math.min(t, Math.floor(i)) : n;
};
function Te(e, n, t) {
  return {
    id: e,
    title: n,
    mount(i, s, o) {
      const r = new I(), u = a("div", { class: `ks-scope dv-widget ${e.replace(".", "-")}`, dataset: { noSwipe: "true", theme: "kiosk" } });
      S(i, u);
      let d = s;
      const l = R({
        host: u,
        load: (p) => $(o, "api/today", void 0, p),
        render: (p, m) => (se(p.timezone), t(p, m, d, o))
      });
      B(o, r, ["calendar", "reminders", "tasks"], () => l.refresh(), 400);
      const c = window.setInterval(() => l.refresh(), 6e4);
      return r.add(() => window.clearInterval(c)), r.add(() => l.dispose()), {
        update(p) {
          d = p, l.refresh();
        },
        dispose: () => r.dispose()
      };
    }
  };
}
function Ae(e) {
  const n = new Date(e.now).getTime();
  return e.events.filter((t) => t.all_day || new Date(t.end).getTime() > n);
}
const $n = [
  Te("domovoy.next-event", "Ближайшее событие", (e) => {
    const [n] = Ae(e).filter((s) => !s.all_day), [t] = Ae(e).filter((s) => s.all_day && J(s.start, e.timezone) === J(e.now, e.timezone)), i = n ?? t;
    return i ? a("div", { class: "dv-next" }, a("div", { class: "dv-next-when" }, i.all_day ? "сегодня" : `${ie(i.start, e.timezone)} · ${Pe(i.start, new Date(e.now).getTime())}`), a("div", { class: "dv-next-title" }, i.title), i.location ? a("div", { class: "ks-muted" }, i.location) : null) : a("div", { class: "dv-next" }, a("div", { class: "ks-muted" }, "Ближайших событий нет"));
  }),
  Te("domovoy.today", "Сегодня", (e, n, t) => {
    const i = Ae(e).slice(0, $e(t.maxEvents, 4, 10)), s = e.reminders.slice(0, $e(t.maxReminders, 4, 10));
    return a(
      "div",
      { class: "dv-today-widget" },
      i.length ? a("ul", { class: "ks-list" }, i.map((o) => a("li", null, a("span", { class: "dv-time" }, o.all_day ? "весь день" : ie(o.start, e.timezone)), " ", o.title))) : O("Событий нет"),
      s.length ? a("ul", { class: "ks-list dv-reminders" }, s.map((o) => a("li", { class: o.state === "fired" ? "dv-fired" : "" }, "🔔 ", o.text))) : null,
      e.review_count ? a("div", { class: "ks-muted" }, `Ждёт проверки: ${e.review_count}`) : null
    );
  }),
  Te("domovoy.shopping", "Покупки", (e, n, t, i) => {
    const s = e.shopping.slice(0, $e(t.max, 8, 30));
    return s.length ? a("ul", { class: "ks-list dv-shopping" }, s.map((o) => a("li", null, a("span", { class: "ks-grow" }, o.title), w("✓", async () => {
      (await A(i, "tasks.complete", { id: o.id })).ok && n();
    }, "ghost", "Куплено")))) : O("Список покупок пуст");
  }),
  {
    id: "domovoy.command",
    title: "Командная строка",
    mount(e, n, t) {
      const i = new I(), s = a("div", { class: "ks-scope dv-widget", dataset: { noSwipe: "true", theme: "kiosk" } }, ze(t, () => t.refresh()));
      return S(e, s), U(i);
    }
  }
];
let Ee = !1, Xe = 0;
function Tn(e) {
  if (Ee || Date.now() < Xe)
    return;
  Ee = !0, pe("Нужен токен доступа", (t) => {
    const i = me([{ name: "token", label: "API-токен", type: "password", required: !0, wide: !0 }], {
      submitLabel: g.save,
      extraActions: [T(g.cancel, { onClick: () => t(!1) })],
      onSubmit: (s) => {
        e(String(s.token).trim()), t(!0), window.location.reload();
      }
    });
    return a("div", null, a("p", null, "Сервер просит подтвердить, что это вы. Введите токен из раздела «Интеграции → Доступ» (или откройте страницу из панели Home Assistant — там токен не нужен)."), i.el);
  }).closed.then((t) => {
    Ee = !1, t !== !0 && (Xe = Date.now() + 5 * 6e4);
  });
}
const An = [
  { id: "domovoy.today", title: g.today, icon: "🏠", modes: ["admin", "kiosk"], order: 10, mount: sn },
  { id: "domovoy.search", title: g.search, icon: "🔎", modes: ["admin"], order: 20, mount: dn },
  { id: "domovoy.inventory", title: g.inventory, icon: "📦", modes: ["admin"], order: 30, group: "Дом", mount: Qt },
  { id: "domovoy.locations", title: g.locations, icon: "🗄️", modes: ["admin"], order: 40, group: "Дом", mount: tn },
  { id: "domovoy.calendar", title: g.calendar, icon: "📅", modes: ["admin"], order: 50, group: "Планы", mount: Ft },
  { id: "domovoy.tasks", title: g.tasks, icon: "✅", modes: ["admin"], order: 60, group: "Планы", mount: kn },
  { id: "domovoy.memory", title: g.memory, icon: "🧠", modes: ["admin"], order: 70, group: "Дом", mount: on },
  { id: "domovoy.review", title: g.review, icon: "🛡️", modes: ["admin"], order: 80, group: "Домовой", mount: ln },
  { id: "domovoy.activity", title: g.activity, icon: "📜", modes: ["admin"], order: 90, group: "Домовой", mount: Ut },
  { id: "domovoy.integrations", title: g.integrations, icon: "🔌", modes: ["admin"], order: 100, group: "Домовой", mount: Xt },
  { id: "domovoy.settings", title: g.settings, icon: "⚙️", modes: ["admin"], order: 110, group: "Домовой", mount: pn }
], En = {
  manifest: { id: "domovoy", title: "Домовой", version: "0.1.0", apiVersion: Ct },
  activate(e) {
    const n = typeof e.config.apiBase == "string" && e.config.apiBase ? e.config.apiBase : "../domovoy-api/";
    if (new URL(n, window.location.href).origin !== window.location.origin)
      throw new Error("Domovoy: apiBase must be on the same origin as the page");
    Et({ retry: g.retry, cancel: g.cancel, confirm: g.confirm, save: g.save, close: g.close, required: "Обязательное поле", loading: g.loading, nothingHere: g.empty, olderData: "Показаны прежние данные", renderFailed: "Не удалось показать этот раздел." }), Re("domovoy-ui-kit", Ot), Re("domovoy-ui", Sn);
    const t = /\/admin\.html$/.test(window.location.pathname), i = Mt({ baseUrl: n, onUnauthorized: () => {
      t && Tn(jt);
    } });
    i.http.request("api/state").then((s) => {
      s.ok && s.data.timezone && se(s.data.timezone);
    }), e.registerDataProvider(i.data), e.registerActionProvider(i.actions), e.registerRealtimeSource(Tt({ id: be, http: i.http, waitSeconds: 25, pauseWhenHidden: !0 }));
    for (const s of An)
      e.registerPage(s);
    for (const s of $n)
      e.registerWidget(s);
    for (const s of _n(i.http))
      e.registerService(s);
  }
};
export {
  An as PAGES,
  $n as WIDGETS,
  En as default
};
