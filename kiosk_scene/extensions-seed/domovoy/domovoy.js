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
        for (const [r, l] of Object.entries(o))
          l !== void 0 && (i.dataset[r] = String(l));
      else if (s === "aria")
        for (const [r, l] of Object.entries(o))
          l !== void 0 && i.setAttribute(`aria-${r}`, String(l));
      else s.startsWith("on") && typeof o == "function" ? i.addEventListener(s.slice(2).toLowerCase(), o) : s === "value" || s === "checked" || s === "disabled" || s === "selected" ? i[s] = o : o === !0 ? i.setAttribute(s, "") : i.setAttribute(s, String(o));
  return je(i, t), i;
}
function wt(e) {
  for (; e.firstChild; )
    e.removeChild(e.firstChild);
}
function $(e, ...n) {
  wt(e), je(e, n);
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
function et(e, n) {
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
function xt(e) {
  return e.endsWith("/") ? e : `${e}/`;
}
function _t(e, n) {
  const t = n && typeof n == "object" ? n : {}, s = (t.error && typeof t.error == "object" ? t.error : null) ?? t, o = typeof s.message == "string" ? s.message : typeof t.error == "string" ? t.error : `Request failed (HTTP ${e})`, r = s.fields && typeof s.fields == "object" ? Object.fromEntries(Object.entries(s.fields).map(([l, c]) => [l, String(c)])) : void 0;
  return {
    code: typeof s.code == "string" ? s.code : `http_${e}`,
    message: o,
    fields: r,
    retryable: e >= 500 || e === 429 || e === 408
  };
}
function St(e) {
  const n = e.fetchImpl ?? ((...o) => globalThis.fetch(...o)), t = xt(e.baseUrl);
  function i(o, r) {
    const l = new URL(o.replace(/^\/+/, ""), new URL(t, globalThis.location?.href ?? "http://localhost/"));
    for (const [c, d] of Object.entries(r ?? {}))
      d != null && d !== "" && l.searchParams.set(c, String(d));
    return l.toString();
  }
  async function s(o, r = {}) {
    const l = new AbortController(), c = r.timeoutMs ?? e.timeoutMs ?? 15e3, d = setTimeout(() => l.abort(new DOMException("Request timed out", "TimeoutError")), c), u = () => l.abort(r.signal?.reason);
    r.signal?.addEventListener("abort", u, { once: !0 }), r.signal?.aborted && u();
    try {
      const p = { Accept: "application/json", ...e.headers ?? {}, ...r.headers ?? {} }, m = e.getToken?.();
      m && (p.Authorization = `Bearer ${m}`);
      let v;
      r.rawBody !== void 0 ? v = r.rawBody : r.body !== void 0 && (p["Content-Type"] = "application/json", v = JSON.stringify(r.body));
      const b = await n(i(o, r.query), {
        method: r.method ?? (v === void 0 ? "GET" : "POST"),
        headers: p,
        body: v,
        cache: "no-store",
        signal: l.signal
      });
      let h = null;
      const w = await b.text();
      if (w)
        try {
          h = JSON.parse(w);
        } catch {
          h = { message: w.slice(0, 200) };
        }
      if (!b.ok) {
        const g = _t(b.status, h);
        return b.status === 401 && e.onUnauthorized?.(g), { ok: !1, error: g };
      }
      return { ok: !0, data: h };
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
      clearTimeout(d), r.signal?.removeEventListener("abort", u);
    }
  }
  return { request: s, url: i };
}
const Ce = "*";
function $t(e) {
  return !!e && typeof e == "object" && typeof e.cursor == "number";
}
function Tt(e, n) {
  return e === Ce || n === e || n.startsWith(`${e}.`);
}
function At(e) {
  const n = e.path ?? "events", t = e.waitSeconds ?? 25, i = (e.graceSeconds ?? 10) * 1e3, s = e.minBackoffMs ?? 1e3, o = e.maxBackoffMs ?? 3e4, r = e.random ?? Math.random, l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
  let d = "connecting", u = null, p = !1, m = !1, v = 0, b = null, h = null, w = !1;
  function g(f) {
    if (d !== f) {
      d = f;
      for (const S of Array.from(c))
        S(f);
    }
  }
  function y(f) {
    for (const [S, q] of Array.from(l.entries()))
      if (!(!Tt(S, f.topic) && f.topic !== Ce))
        for (const V of Array.from(q))
          try {
            V(f);
          } catch {
          }
  }
  function _(f) {
    return new Promise((S) => {
      const q = () => {
        clearTimeout(V), h = null, S();
      }, V = setTimeout(q, f);
      h = q;
    });
  }
  const z = () => {
    typeof document > "u" || document.hidden || (w = !0, !p && !m && e.pauseWhenHidden !== !1 && F(), h?.(), b?.abort(new DOMException("resume", "AbortError")));
  };
  async function j() {
    p = !0;
    try {
      for (; !m && !(e.pauseWhenHidden !== !1 && typeof document < "u" && document.hidden); ) {
        b = new AbortController();
        let f = !1;
        const S = setTimeout(() => {
          f = !0, b?.abort(new DOMException("poll timeout", "TimeoutError"));
        }, t * 1e3 + i), q = await e.http.request(n, {
          query: { since: u ?? void 0, timeout: u === null ? 0 : t },
          signal: b.signal,
          timeoutMs: t * 1e3 + i
        });
        if (clearTimeout(S), b = null, m)
          break;
        if (!q.ok && q.error.code === "aborted" && !f)
          continue;
        if (!q.ok || !$t(q.data)) {
          v += 1, g(v >= 3 ? "offline" : "reconnecting");
          const X = Math.min(o, s * 2 ** Math.min(v - 1, 10));
          await _(X / 2 + r() * (X / 2)), w = !0;
          continue;
        }
        const V = q.data, vt = u;
        u = typeof V.cursor == "number" ? V.cursor : u;
        const yt = v > 0;
        v = 0, g("live"), (V.reset || w || yt) && ((vt !== null || V.reset) && y({ topic: Ce, payload: { resync: !0, reset: V.reset === !0 }, cursor: u ?? void 0 }), w = !1);
        for (const X of V.events ?? [])
          y({ topic: X.topic, payload: X.payload, cursor: X.seq });
      }
    } finally {
      p = !1;
    }
  }
  function F() {
    p || m || (typeof document < "u" && e.pauseWhenHidden !== !1 && (document.removeEventListener("visibilitychange", z), document.addEventListener("visibilitychange", z)), j());
  }
  return {
    id: e.id,
    status: () => d,
    start: F,
    subscribe(f, S) {
      let q = l.get(f);
      return q || (q = /* @__PURE__ */ new Set(), l.set(f, q)), q.add(S), !p && !m && F(), () => {
        q?.delete(S), q && q.size === 0 && l.delete(f);
      };
    },
    onStatus(f) {
      return c.add(f), () => c.delete(f);
    },
    close() {
      m = !0, b?.abort(new DOMException("closed", "AbortError")), h?.(), typeof document < "u" && document.removeEventListener("visibilitychange", z), l.clear(), c.clear();
    }
  };
}
const Et = {
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
let N = { ...Et };
function Ct(e) {
  N = { ...N, ...e };
}
function A(e, n = {}) {
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
function tt(e, n, t) {
  return a("div", { class: "ks-empty" }, a("strong", null, e), n ? a("p", null, n) : null, t);
}
function nt(e = N.loading) {
  return a("div", { class: "ks-loading", role: "status", aria: { live: "polite" } }, a("span", { class: "ks-spinner", aria: { hidden: !0 } }), e);
}
function Ne(e, n) {
  return a(
    "div",
    { class: "ks-error", role: "alert" },
    a("strong", null, e.message),
    e.code ? a("small", null, e.code) : null,
    n && e.retryable !== !1 ? A(N.retry, { onClick: n }) : null
  );
}
let at = 0;
function ue(e) {
  const n = `ks-field-${at += 1}`, t = e.type ?? "text";
  let i;
  if (t === "textarea")
    i = a("textarea", { id: n, name: e.name, rows: e.rows ?? 3, placeholder: e.placeholder, required: e.required, value: String(e.value ?? "") });
  else if (t === "select") {
    const l = a(
      "select",
      { id: n, name: e.name, required: e.required },
      (e.options ?? []).map((c) => a("option", { value: c.value, selected: String(e.value ?? "") === c.value }, c.label))
    );
    l.value = String(e.value ?? e.options?.[0]?.value ?? ""), i = l;
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
    setError(l) {
      s.textContent = l ?? "", r.classList.toggle("has-error", !!l), l ? (i.setAttribute("aria-invalid", "true"), i.setAttribute("aria-describedby", s.id)) : (i.removeAttribute("aria-invalid"), i.removeAttribute("aria-describedby"));
    }
  };
}
function pe(e, n) {
  const t = Object.fromEntries(e.map((l) => [l.name, ue(l)])), i = a("div", { class: "ks-form-error", role: "alert", hidden: !0 }), s = A(n.submitLabel ?? N.save, { variant: "primary", type: "submit" }), o = a("form", { class: "ks-form", novalidate: !0 }, i, a("div", { class: "ks-form-grid" }, Object.values(t).map((l) => l.el)), a("div", { class: "ks-form-actions" }, s, n.extraActions)), r = {
    el: o,
    fields: t,
    values: () => Object.fromEntries(Object.values(t).map((l) => [l.name, l.value()])),
    showErrors(l) {
      for (const d of Object.values(t))
        d.setError(l?.fields?.[d.name] ?? null);
      const c = l && (!l.fields || Object.keys(l.fields).length === 0) ? l.message : "";
      i.textContent = c, i.hidden = !c;
    },
    setBusy(l) {
      s.disabled = l, o.toggleAttribute("aria-busy", l);
    }
  };
  return o.addEventListener("submit", (l) => {
    l.preventDefault();
    let c = !0;
    for (const d of e) {
      const u = t[d.name].value();
      d.required && (u === "" || u === !1) ? (t[d.name].setError(N.required), c = !1) : t[d.name].setError(null);
    }
    c && (r.showErrors(null), r.setBusy(!0), Promise.resolve(n.onSubmit(r.values(), r)).finally(() => r.setBusy(!1)));
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
  ) : t ?? tt(N.nothingHere);
}
const re = [];
function fe(e, n) {
  const t = document.activeElement;
  let i = () => {
  };
  const s = new Promise((m) => {
    i = m;
  }), o = new I(), r = (m) => {
    if (o.isDisposed)
      return;
    o.dispose();
    const v = re.indexOf(u);
    v >= 0 && re.splice(v, 1), u.remove(), t?.focus?.(), i(m);
  }, l = typeof n == "function" ? n(r) : n, c = `ks-dialog-title-${at += 1}`, d = a(
    "div",
    { class: "ks-dialog", role: "dialog", aria: { modal: !0, labelledby: c }, tabindex: -1 },
    a("div", { class: "ks-dialog-head" }, a("h2", { id: c }, e), A("×", { variant: "ghost", title: N.close, onClick: () => r(void 0) })),
    a("div", { class: "ks-dialog-body" }, l)
  ), u = a("div", { class: "ks-overlay" }, d);
  u.addEventListener("mousedown", (m) => {
    m.target === u && r(void 0);
  });
  const p = (m) => {
    if (re[re.length - 1] === u) {
      if (m.key === "Escape") {
        m.stopPropagation(), r(void 0);
        return;
      }
      if (m.key === "Tab") {
        const v = Array.from(d.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")).filter((w) => !w.hasAttribute("disabled"));
        if (!v.length) {
          m.preventDefault();
          return;
        }
        const b = v[0], h = v[v.length - 1];
        m.shiftKey && document.activeElement === b ? (m.preventDefault(), h.focus()) : !m.shiftKey && document.activeElement === h && (m.preventDefault(), b.focus());
      }
    }
  };
  return document.addEventListener("keydown", p, !0), o.add(() => document.removeEventListener("keydown", p, !0)), document.body.appendChild(u), re.push(u), (d.querySelector("input, select, textarea, button.ks-btn-primary") ?? d).focus(), { el: u, close: r, closed: s };
}
function it(e) {
  return fe(
    e.title,
    (t) => a(
      "div",
      { class: "ks-confirm" },
      a("p", null, e.message),
      a(
        "div",
        { class: "ks-form-actions" },
        A(N.cancel, { onClick: () => t(!1) }),
        A(e.confirmLabel ?? N.confirm, { variant: e.destructive ? "danger" : "primary", onClick: () => t(!0) })
      )
    )
  ).closed.then((t) => t === !0);
}
let le = null;
function C(e, n = "neutral", t = 4500) {
  (!le || !le.isConnected) && (le = a("div", { class: "ks-toasts", role: "status", aria: { live: "polite" } }), document.body.appendChild(le));
  const i = a("div", { class: `ks-toast ks-toast-${n}` }, e);
  le.appendChild(i), setTimeout(() => i.remove(), t);
}
function R(e) {
  let n = 0, t = null, i = !1, s = !1;
  const o = a("div", { class: "ks-stale-banner", role: "alert", hidden: !0 }), r = a("div", { class: "ks-async-content" });
  $(e.host, o, r);
  const l = () => {
    if (s)
      return;
    t?.abort(), t = new AbortController();
    const c = n += 1;
    (!i || e.keepStale === !1) && $(r, nt()), e.load(t.signal).then((d) => {
      if (!(s || c !== n)) {
        if (d.ok) {
          try {
            const u = e.render(d.data, l);
            i = !0, o.hidden = !0, $(r, u);
          } catch (u) {
            console.error("View render failed", u), $(r, Ne({ code: "render_failed", message: N.renderFailed, retryable: !0 }, l));
          }
          return;
        }
        d.error.code !== "aborted" && (i ? (o.hidden = !1, $(o, `${N.olderData} — ${d.error.message} `, A(N.retry, { variant: "ghost", onClick: l }))) : $(r, Ne(d.error, l)));
      }
    });
  };
  return l(), {
    refresh: l,
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
const qt = 1, Ot = '.ks-admin,.ks-dialog,.ks-toasts,.ks-scope{--ks-bg: #f5f7f9;--ks-surface: #ffffff;--ks-surface-2: #eef2f5;--ks-border: #d5dde4;--ks-text: #1c2833;--ks-muted: #5c6b78;--ks-accent: #2464a8;--ks-accent-text: #ffffff;--ks-good: #1f7a4d;--ks-warn: #9a6100;--ks-bad: #b3261e;--ks-info: #2464a8;--ks-radius: 10px;--ks-shadow: 0 1px 2px rgba(20, 30, 40, .06), 0 4px 14px rgba(20, 30, 40, .06);--ks-font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;font-family:var(--ks-font);color:var(--ks-text)}@media(prefers-color-scheme:dark){.ks-admin,.ks-dialog,.ks-toasts,.ks-scope:not([data-theme=kiosk]){--ks-bg: #12181e;--ks-surface: #1a222a;--ks-surface-2: #222c36;--ks-border: #33404c;--ks-text: #e6ecf1;--ks-muted: #96a5b2;--ks-accent: #5b9be0;--ks-accent-text: #0b1620;--ks-good: #5cc493;--ks-warn: #e0a84a;--ks-bad: #f08a83;--ks-info: #5b9be0;--ks-shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 4px 14px rgba(0, 0, 0, .35)}}.ks-admin *,.ks-dialog *,.ks-toasts *,.ks-scope *{box-sizing:border-box}.ks-scope[data-theme=kiosk]{--ks-bg: transparent;--ks-surface: rgba(255, 255, 255, .72);--ks-surface-2: rgba(32, 48, 65, .06);--ks-border: rgba(32, 48, 65, .12);--ks-text: #203041;--ks-muted: rgba(32, 48, 65, .66)}.ks-admin{display:grid;grid-template-columns:232px minmax(0,1fr);min-height:100vh;min-height:100dvh;background:var(--ks-bg);font-size:15px;line-height:1.45}.ks-sidebar{position:sticky;top:0;height:100vh;height:100dvh;display:flex;flex-direction:column;gap:8px;padding:16px 12px;background:var(--ks-surface);border-right:1px solid var(--ks-border);overflow-y:auto}.ks-brand{padding:4px 10px 12px;font-weight:700;font-size:17px;letter-spacing:-.01em}.ks-nav-list{display:flex;flex-direction:column;gap:2px}.ks-nav-group{margin:12px 10px 4px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ks-muted)}.ks-nav-item,.ks-bottom-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;color:var(--ks-text);text-decoration:none;min-height:40px}.ks-nav-item:hover{background:var(--ks-surface-2)}.ks-nav-item[aria-current=page]{background:color-mix(in srgb,var(--ks-accent) 14%,transparent);color:var(--ks-accent);font-weight:600}.ks-nav-icon{width:22px;text-align:center;flex:none}.ks-nav-footer{margin-top:auto;display:flex;flex-direction:column;gap:2px;padding-top:12px;border-top:1px solid var(--ks-border)}.ks-nav-footer-link{padding:6px 10px;color:var(--ks-muted);text-decoration:none;font-size:13px}.ks-content{min-width:0;display:flex;flex-direction:column}.ks-topbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;padding:12px 20px;background:color-mix(in srgb,var(--ks-bg) 88%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--ks-border)}.ks-topbar-title{margin:0;font-size:20px;font-weight:700;letter-spacing:-.01em;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ks-menu-button,.ks-bottom-nav,.ks-scrim{display:none}.ks-main-view{flex:1;padding:20px;outline:none;max-width:1200px;width:100%}.ks-conn{font-size:12px;padding:3px 10px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-muted);white-space:nowrap}.ks-conn[data-state=live]{color:var(--ks-good)}.ks-conn[data-state=reconnecting],.ks-conn[data-state=connecting]{color:var(--ks-warn)}.ks-conn[data-state=offline]{color:var(--ks-bad);border-color:var(--ks-bad)}@media(max-width:899px){.ks-admin{display:block;padding-bottom:64px}.ks-sidebar{position:fixed;inset:0 auto 0 0;z-index:30;width:min(84vw,300px);transform:translate(-102%);transition:transform .18s ease;box-shadow:var(--ks-shadow)}.ks-admin:not([data-menu=open]) .ks-sidebar{visibility:hidden;transition:transform .18s ease,visibility 0s linear .18s}.ks-admin[data-menu=open] .ks-sidebar{transform:none}.ks-admin[data-menu=open] .ks-scrim{display:block;position:fixed;inset:0;z-index:20;background:#0006}.ks-menu-button{display:inline-flex}.ks-topbar{padding:10px 12px}.ks-topbar-title{font-size:17px}.ks-main-view{padding:14px 12px}.ks-bottom-nav{position:fixed;inset:auto 0 0;z-index:10;display:grid;grid-auto-flow:column;grid-auto-columns:1fr;background:var(--ks-surface);border-top:1px solid var(--ks-border);padding-bottom:env(safe-area-inset-bottom,0)}.ks-bottom-item{flex-direction:column;gap:2px;justify-content:center;padding:8px 4px;font-size:11px;border-radius:0;min-height:56px;color:var(--ks-muted)}.ks-bottom-item[aria-current=page]{color:var(--ks-accent);font-weight:600}.ks-bottom-item .ks-nav-label{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.ks-page{display:flex;flex-direction:column;gap:16px}.ks-card{background:var(--ks-surface);border:1px solid var(--ks-border);border-radius:var(--ks-radius);padding:16px;box-shadow:var(--ks-shadow);min-width:0}.ks-card>h2,.ks-card>header>h2{margin:0 0 10px;font-size:15px;font-weight:700}.ks-card>header{display:flex;align-items:center;justify-content:space-between;gap:8px}.ks-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}.ks-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ks-row-spread{justify-content:space-between}.ks-toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.ks-toolbar .ks-grow{flex:1;min-width:180px}.ks-muted{color:var(--ks-muted)}.ks-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}.ks-list>li{display:flex;align-items:center;gap:10px;padding:9px 2px;border-bottom:1px solid var(--ks-border);min-width:0}.ks-list>li:last-child{border-bottom:0}.ks-list .ks-grow{flex:1;min-width:0}.ks-list .ks-title{font-weight:600;overflow-wrap:anywhere}.ks-list .ks-sub{color:var(--ks-muted);font-size:13px;overflow-wrap:anywhere}.ks-done{text-decoration:line-through;color:var(--ks-muted)}.ks-tree{list-style:none;margin:0;padding-left:18px;border-left:1px dashed var(--ks-border)}.ks-tree.ks-tree-root{padding-left:0;border-left:0}.ks-tree-node{padding:3px 0}.ks-btn{display:inline-flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;font:inherit;font-size:14px;min-height:38px;padding:0 14px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer;touch-action:manipulation}.ks-btn:hover:not(:disabled){background:var(--ks-surface-2)}.ks-btn:focus-visible,.ks-field input:focus-visible,.ks-field select:focus-visible,.ks-field textarea:focus-visible,.ks-nav-item:focus-visible,.ks-bottom-item:focus-visible{outline:2px solid var(--ks-accent);outline-offset:1px}.ks-btn:disabled{opacity:.55;cursor:default}.ks-btn-primary{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text);font-weight:600}.ks-btn-primary:hover:not(:disabled){background:color-mix(in srgb,var(--ks-accent) 88%,black)}.ks-btn-danger{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 50%,var(--ks-border))}.ks-btn-ghost{border-color:transparent;background:transparent}.ks-btn-sm{min-height:30px;padding:0 10px;font-size:13px}.ks-form{display:flex;flex-direction:column;gap:12px}.ks-form-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}.ks-form-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}.ks-form-error,.ks-field-error{color:var(--ks-bad);font-size:13px}.ks-field{display:flex;flex-direction:column;gap:4px;min-width:0}.ks-field-wide{grid-column:1 / -1}.ks-field label{font-size:13px;font-weight:600;color:var(--ks-muted)}.ks-field input:not([type=checkbox]),.ks-field select,.ks-field textarea,.ks-input{font:inherit;font-size:16px;width:100%;min-height:40px;padding:8px 10px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text)}.ks-field-check{flex-direction:row;align-items:center;gap:8px}.ks-field.has-error input,.ks-field.has-error select,.ks-field.has-error textarea{border-color:var(--ks-bad)}.ks-field-hint{color:var(--ks-muted);font-size:12px}.ks-required{color:var(--ks-bad)}.ks-badge{display:inline-block;padding:1px 8px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid var(--ks-border);background:var(--ks-surface-2);color:var(--ks-muted);white-space:nowrap}.ks-badge-good{color:var(--ks-good);border-color:color-mix(in srgb,var(--ks-good) 40%,var(--ks-border))}.ks-badge-warn{color:var(--ks-warn);border-color:color-mix(in srgb,var(--ks-warn) 40%,var(--ks-border))}.ks-badge-bad{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 40%,var(--ks-border))}.ks-badge-info{color:var(--ks-info);border-color:color-mix(in srgb,var(--ks-info) 40%,var(--ks-border))}.ks-empty,.ks-loading,.ks-error{padding:28px 16px;text-align:center;color:var(--ks-muted)}.ks-empty strong,.ks-error strong{display:block;color:var(--ks-text);margin-bottom:4px}.ks-error{color:var(--ks-bad);display:flex;flex-direction:column;align-items:center;gap:8px}.ks-spinner{display:inline-block;width:16px;height:16px;margin-right:8px;vertical-align:-3px;border:2px solid var(--ks-border);border-top-color:var(--ks-accent);border-radius:50%;animation:ks-spin .8s linear infinite}@keyframes ks-spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.ks-spinner{animation-duration:3s}}.ks-stale-banner{padding:8px 12px;margin-bottom:10px;border-radius:8px;background:color-mix(in srgb,var(--ks-warn) 14%,var(--ks-surface));color:var(--ks-warn);font-size:13px}.ks-table-wrap{overflow-x:auto}.ks-table{width:100%;border-collapse:collapse;font-size:14px}.ks-table th,.ks-table td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--ks-border);vertical-align:top}.ks-table th{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--ks-muted)}@media(max-width:640px){.ks-table thead{display:none}.ks-table,.ks-table tbody,.ks-table tr,.ks-table td{display:block;width:100%}.ks-table tr{padding:8px 0;border-bottom:1px solid var(--ks-border)}.ks-table td{border:0;padding:2px 4px}.ks-table td:before{content:attr(data-label) ": ";color:var(--ks-muted);font-size:12px}.ks-table td[data-label=""]:before{content:none}}.ks-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;background:#00000073}.ks-dialog{width:min(560px,100%);max-height:92vh;overflow:auto;background:var(--ks-surface);border-radius:14px;box-shadow:var(--ks-shadow);border:1px solid var(--ks-border)}.ks-dialog-head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--ks-border)}.ks-dialog-head h2{margin:0;font-size:16px}.ks-dialog-body{padding:16px}.ks-toasts{position:fixed;z-index:120;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;max-width:min(360px,calc(100vw - 32px))}.ks-toast{padding:10px 14px;border-radius:10px;background:var(--ks-text);color:var(--ks-bg);box-shadow:var(--ks-shadow);font-size:14px}.ks-toast-good{background:var(--ks-good);color:#fff}.ks-toast-bad{background:var(--ks-bad);color:#fff}@media(max-width:899px){.ks-toasts{bottom:72px}}.ks-chip{font:inherit;font-size:14px;min-height:34px;padding:4px 12px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer}.ks-chip.is-active{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text)}.ks-link{font:inherit;padding:0;border:0;background:none;color:var(--ks-accent);cursor:pointer;text-align:left;text-decoration:underline;text-underline-offset:2px}.ks-filters{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end}.ks-filters .ks-field{flex:1 1 200px;min-width:0}.ks-list-click>li{cursor:pointer}.ks-list-click>li:hover,.ks-list-click>li:focus-visible{background:var(--ks-surface-2);outline:none}@media(max-width:640px){.ks-hide-narrow{display:none}}', Dt = Ot, st = "domovoy.api", ot = "domovoy.actions", be = "domovoy.events", Y = (e, n = ["id"]) => Object.fromEntries(Object.entries(e).filter(([t]) => !n.includes(t))), H = (e) => (n) => `${e}/${encodeURIComponent(String(n.id))}`, He = {
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
function jt() {
  try {
    return window.localStorage.getItem(qe);
  } catch {
    return null;
  }
}
function Mt(e) {
  try {
    e ? window.localStorage.setItem(qe, e) : window.localStorage.removeItem(qe);
  } catch {
  }
}
function Pt(e) {
  const n = St({
    baseUrl: e.baseUrl,
    fetchImpl: e.fetchImpl,
    getToken: jt,
    // The custom header is what turns a cross-site form post into something the server refuses (CSRF defence).
    headers: { "X-Domovoy-Client": "kiosk-scene" },
    onUnauthorized: () => e.onUnauthorized?.(),
    timeoutMs: 2e4
  });
  return { http: n, data: {
    id: st,
    async read(s, o) {
      const r = String(s?.path ?? "");
      return /^(api\/|events)/.test(r) ? n.request(r, { query: s.query, signal: o?.signal }) : { ok: !1, error: { code: "bad_path", message: `Refusing to read ${r}` } };
    }
  }, actions: {
    id: ot,
    describe() {
      return Object.entries(He).map(([s, o]) => ({ id: s, title: o.title, destructive: o.destructive }));
    },
    async invoke(s, o, r) {
      const l = He[s];
      if (!l)
        return { ok: !1, error: { code: "unknown_action", message: `Unknown action ${s}` } };
      const c = o ?? {};
      return n.request(l.path(c), {
        method: l.method,
        body: l.body ? l.body(c) : void 0,
        query: l.query?.(c),
        signal: r?.signal
      });
    }
  } };
}
const k = {
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
function ne(e) {
  return k.statuses[e] ?? e;
}
function me(e) {
  return ["applied", "answered", "done", "sent", "ok", "approved"].includes(e) ? "good" : e === "configured" ? "info" : ["clarify", "review", "pending", "queued", "sending", "partial", "degraded", "fired"].includes(e) ? "warn" : ["failed", "rejected", "down", "cancelled"].includes(e) ? "bad" : "neutral";
}
let rt = "";
function oe(e) {
  rt = e;
}
function Z() {
  return rt || Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function lt(e, n) {
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
function ie(e, n = Z()) {
  const t = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(e);
  if (!t)
    throw new Error(`Invalid local time: ${e}`);
  const [i, s, o, r, l] = t.slice(1).map(Number), c = Date.UTC(i, s - 1, o, r, l);
  let d = c;
  for (let u = 0; u < 2; u += 1) {
    const p = lt(new Date(d), n), m = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute));
    d += c - m;
  }
  return new Date(d).toISOString().replace(/\.\d{3}Z$/, "Z");
}
function ae(e, n = Z()) {
  const t = lt(new Date(e), n);
  return `${t.year}-${t.month}-${t.day}T${t.hour}:${t.minute}`;
}
function L(e, n = Z()) {
  return e ? new Intl.DateTimeFormat("ru-RU", { timeZone: n, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(e)) : "—";
}
function se(e, n = Z()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: n, hour: "2-digit", minute: "2-digit" }).format(new Date(e));
}
function Lt(e, n = Z()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: n, weekday: "long", day: "numeric", month: "long" }).format(new Date(e));
}
function J(e, n = Z()) {
  return ae(e, n).slice(0, 10);
}
function Pe(e, n = Date.now()) {
  const t = new Date(e).getTime() - n, i = Math.abs(t), s = Math.round(i / 6e4), o = s < 1 ? "сейчас" : s < 60 ? `${s} мин` : s < 2880 ? `${Math.round(s / 60)} ч` : `${Math.round(s / 1440)} дн`;
  return s < 1 ? o : t < 0 ? `${o} назад` : `через ${o}`;
}
function dt(e) {
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
function It(e) {
  return we[e]?.title ?? e;
}
function ct(e, n) {
  return n == null ? "" : e.kind === "path" ? Array.isArray(n) ? n.join(" → ") : String(n) : e.kind === "list" ? Array.isArray(n) ? n.join(", ") : String(n) : e.kind === "json" ? JSON.stringify(n) : e.kind === "bool" ? n ? "да" : "нет" : String(n);
}
function ut(e, n = (t) => t) {
  const t = we[String(e.type)];
  if (!t)
    return String(e.type);
  const i = t.fields.filter((s) => e[s.name] !== void 0 && e[s.name] !== null && e[s.name] !== "" && e[s.name] !== !1).map((s) => `${s.label.replace(/ \(.*\)$/, "")}: ${s.kind === "iso" ? n(String(e[s.name])) : ct(s, e[s.name])}`);
  return i.length ? `${t.title} — ${i.join("; ")}` : t.title;
}
function zt(e, n, t) {
  const i = we[String(e.type)], s = { ...e };
  for (const o of i?.fields ?? []) {
    if (!(o.name in n) || o.kind === "json")
      continue;
    const r = n[o.name];
    if (o.kind === "bool") {
      r === !0 ? s[o.name] = !0 : delete s[o.name];
      continue;
    }
    const l = String(r).trim();
    if (!l)
      delete s[o.name];
    else if (o.kind === "num") {
      const c = Number(l.replace(",", "."));
      s[o.name] = Number.isFinite(c) ? c : l;
    } else o.kind === "path" ? s[o.name] = l.split(/→|->|>/).map((c) => c.trim()).filter(Boolean) : o.kind === "list" ? s[o.name] = l.split(",").map((c) => c.trim()).filter(Boolean) : o.kind === "iso" ? s[o.name] = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(l) ? t(l) : l : s[o.name] = l;
  }
  return s;
}
function T(e, n, t, i) {
  return e.readData(st, { path: n, query: t }, { signal: i });
}
function mt(e, n, t) {
  return e.invokeAction(ot, n, t);
}
async function E(e, n, t, i = {}) {
  if (i.confirm && !await it({ title: i.confirm.title, message: i.confirm.message, confirmLabel: i.confirm.label ?? k.delete, destructive: !0 }))
    return { ok: !1, error: { code: "cancelled", message: "cancelled" } };
  const s = await mt(e, n, t);
  return s.ok ? i.success && C(i.success, "good") : C(s.error.message, "bad", 7e3), s;
}
function B(e, n, t, i, s = 250, o) {
  let r = !1;
  const l = () => {
    const u = document.activeElement;
    return !o || !u || !o.contains(u) ? !1 : /^(INPUT|TEXTAREA|SELECT)$/.test(u.tagName) || u.tagName === "BUTTON" && u.closest("form") !== null;
  }, c = () => {
    if (l()) {
      r = !0;
      return;
    }
    r = !1, i();
  }, d = et(c, s);
  if (n.add(() => d.cancel()), o) {
    const u = (p) => {
      !r || p.relatedTarget instanceof Node && o.contains(p.relatedTarget) || window.setTimeout(() => {
        r && !l() && c();
      }, 150);
    };
    o.addEventListener("focusout", u), n.add(() => o.removeEventListener("focusout", u));
  }
  for (const u of t)
    n.add(e.subscribe(be, u, () => d()));
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
function M(e, n, t) {
  return a("section", { class: "ks-card" }, a("header", null, a("h2", null, e), null), n);
}
function ve(e) {
  return D(ne(e), me(e));
}
function P(e, n, t, i = "") {
  return a("li", { class: i }, a("div", { class: "ks-grow" }, a("div", { class: "ks-title" }, e), n ? a("div", { class: "ks-sub" }, n) : null), t ?? null);
}
function x(e, n, t = "secondary", i) {
  const s = A(e, { variant: t, onClick: n, title: i });
  return s.classList.add("ks-btn-sm"), s;
}
function G(e, ...n) {
  return a("div", { class: "ks-row ks-row-spread dv-head" }, a("h2", { class: "dv-page-title" }, e), a("div", { class: "ks-row" }, n));
}
function O(e = k.empty) {
  return a("p", { class: "ks-muted" }, e);
}
function K(e, n, t, i = {}) {
  return fe(e, (o) => {
    const r = pe(n, {
      submitLabel: i.submitLabel ?? k.save,
      extraActions: [A(k.cancel, { onClick: () => o(!1) })],
      onSubmit: async (l, c) => {
        const d = await t(l);
        d.ok ? o(!0) : c.showErrors(d.error);
      }
    });
    return a("div", null, i.note ?? null, r.el);
  }).closed.then((o) => o === !0);
}
function Nt(e) {
  const n = {};
  for (const t of e.split(/\r?\n/)) {
    const i = t.indexOf(":"), s = (i >= 0 ? t.slice(0, i) : t).trim(), o = i >= 0 ? t.slice(i + 1).trim() : "";
    s && (n[s] = o);
  }
  return n;
}
function Rt(e) {
  return Object.entries(e ?? {}).map(([n, t]) => `${n}: ${t}`).join(`
`);
}
function Ht(e) {
  return e.split(/→|->|>|\//).map((n) => n.trim()).filter(Boolean);
}
function Bt(e) {
  if (typeof e != "string" || e.trim() === "")
    return null;
  const n = Number(e.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}
async function ke(e, n) {
  const [t, i] = await Promise.all([e, n]);
  return t.ok ? i.ok ? { ok: !0, data: [t.data, i.data] } : i : t;
}
const Ut = [["audit", "Изменения"], ["commands", "Команды"], ["outbox", "Отправка сообщений"]];
function Ft(e, n, t) {
  const i = new I(), s = a("div"), o = a("div", { class: "ks-row dv-chips", role: "tablist" });
  let r = "audit", l = null;
  const c = () => {
    l?.dispose(), Ie(o, () => $(o, Ut.map(
      ([u, p]) => a("button", { type: "button", role: "tab", dataset: { key: u }, class: `ks-chip${r === u ? " is-active" : ""}`, "aria-selected": String(r === u), onClick: () => {
        r = u, c();
      } }, p)
    ))), r === "audit" ? l = R({
      host: s,
      load: (u) => T(t, "api/audit", { limit: 100 }, u),
      render: ({ audit: u }, p) => u.length ? a("ul", { class: "ks-list" }, u.map(
        (m) => P(
          a("span", null, m.summary, " ", D(m.source, "neutral")),
          `${L(m.ts)} · ${m.actor}`,
          m.undoable ? x(k.undo, async () => {
            (await E(t, "audit.undo", { id: m.id }, { success: "Отменено" })).ok && p();
          }, "ghost") : null
        )
      )) : O("Изменений пока не было.")
    }) : r === "commands" ? l = R({
      host: s,
      load: (u) => T(t, "api/commands", { limit: 100 }, u),
      render: ({ commands: u }) => u.length ? a("ul", { class: "ks-list" }, u.map(
        (p) => P(
          a("span", null, `«${p.text}»`, " ", d(p.status)),
          [L(p.ts), p.frontend, p.interpreter ?? "", p.confidence !== null ? `${Math.round(p.confidence * 100)}%` : "", p.reply ?? p.error ?? ""].filter(Boolean).join(" · "),
          p.intents?.length ? a("details", null, a("summary", null, "Как я понял"), a("ul", null, p.intents.map((m) => a("li", null, ut(m, (v) => L(v)))))) : null
        )
      )) : O("Команд пока не было.")
    }) : l = R({
      host: s,
      load: (u) => T(t, "api/outbox", { limit: 100 }, u),
      render: ({ messages: u }, p) => u.length ? a("ul", { class: "ks-list" }, u.map(
        (m) => P(
          a("span", null, m.text, " ", ve(m.status)),
          `${k.channels[m.channel] ?? m.channel} → ${m.recipient || "—"} · ${L(m.created_at)}${m.attempts ? ` · попыток: ${m.attempts}` : ""}${m.last_error ? ` · ${m.last_error}` : ""}`,
          a(
            "div",
            { class: "ks-row" },
            m.status === "failed" || m.status === "queued" ? x("Повторить", async () => {
              (await E(t, "outbox.retry", { id: m.id })).ok && p();
            }, "primary") : null,
            m.status === "failed" || m.status === "queued" ? x(k.cancel, async () => {
              (await E(t, "outbox.cancel", { id: m.id })).ok && p();
            }, "danger") : null
          )
        )
      )) : O("Исходящих сообщений не было.")
    });
  }, d = (u) => ve(u);
  return c(), $(e, a("div", { class: "ks-page" }, G(k.activity), o, M("", s))), B(t, i, ["audit", "commands", "outbox", "items", "locations", "notes", "tasks", "reminders", "calendar"], () => l?.refresh(), 500), i.add(() => l?.dispose()), U(i);
}
function Ue(e, n, t, i) {
  const s = Z(), o = ae(t ? t.start : new Date(Math.ceil(Date.now() / 36e5) * 36e5).toISOString(), s), r = t ? ae(t.end, s) : "", l = n.sources.filter((c) => c.capabilities.includes("create") && c.available);
  K(
    t ? `Изменить: ${t.title}` : "Новое событие",
    [
      { name: "title", label: k.title, required: !0, value: t?.title ?? "", wide: !0 },
      { name: "start", label: "Начало", type: "datetime-local", required: !0, value: o },
      { name: "end", label: "Конец", type: "datetime-local", value: r, hint: "Пусто — по умолчанию из настроек." },
      { name: "all_day", label: "Весь день", type: "checkbox", value: t?.all_day ?? !1 },
      { name: "location", label: "Где", value: t?.location ?? "", wide: !0 },
      { name: "notes", label: k.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 },
      ...t ? [] : [{ name: "calendar", label: "Календарь", type: "select", options: l.map((c) => ({ value: c.id, label: c.title })), value: n.default }]
    ],
    async (c) => {
      const d = {
        title: String(c.title).trim(),
        start: ie(String(c.start), s),
        all_day: c.all_day === !0,
        location: String(c.location ?? ""),
        notes: String(c.notes ?? "")
      };
      c.end && (d.end = ie(String(c.end), s));
      const u = t ? await e.invokeAction("domovoy.actions", "calendar.update", { ref: t.ref, ...d }) : await e.invokeAction("domovoy.actions", "calendar.create", { ...d, calendar: c.calendar });
      return u.ok && i(), u;
    }
  );
}
function Vt(e, n, t) {
  const i = new I(), s = a("div");
  let o = 14, r = { sources: [], default: "local" };
  const l = A(k.add, { variant: "primary" }), c = A("Показать ещё 2 недели", { variant: "ghost" }), d = R({
    host: s,
    load: (u) => {
      const p = Z(), m = J((/* @__PURE__ */ new Date()).toISOString(), p), v = ie(`${m}T00:00`, p), b = ie(`${J(new Date(Date.parse(`${m}T12:00:00Z`) + o * 864e5).toISOString(), "UTC")}T00:00`, p);
      return ke(
        T(t, "api/calendar/events", { start: v, end: b }, u),
        T(t, "api/calendar/sources", void 0, u)
      );
    },
    render: ([{ events: u, warnings: p }, m], v) => {
      r = m, l.onclick = () => Ue(t, r, null, v);
      const b = /* @__PURE__ */ new Map();
      for (const h of u) {
        const w = J(h.start);
        b.set(w, [...b.get(w) ?? [], h]);
      }
      return a(
        "div",
        null,
        p.length ? a("div", { class: "ks-stale-banner", role: "alert" }, `Не удалось прочитать календарь: ${p.map((h) => `${h.source} (${h.message})`).join("; ")}. Показано то, что доступно.`) : null,
        b.size ? [...b.entries()].sort(([h], [w]) => h.localeCompare(w)).map(
          ([h, w]) => a(
            "section",
            { class: "ks-card" },
            a("header", null, a("h2", null, Lt(w[0].start))),
            a("ul", { class: "ks-list" }, w.sort((g, y) => g.start.localeCompare(y.start)).map(
              (g) => P(
                a("span", null, g.title, g.recurring ? a("span", { class: "ks-muted" }, " ↻") : null, g.read_only ? [" ", D("только чтение", "neutral")] : null),
                `${g.all_day ? "весь день" : `${se(g.start)}–${se(g.end)}`}${g.location ? ` · ${g.location}` : ""} · ${g.calendar}`,
                g.read_only ? null : a(
                  "div",
                  { class: "ks-row" },
                  x(k.edit, () => Ue(t, r, g, v)),
                  x(k.delete, async () => {
                    (await E(t, "calendar.delete", { ref: g.ref }, { confirm: { title: "Удалить событие", message: `«${g.title}» будет удалено из календаря.` } })).ok && v();
                  }, "danger")
                )
              )
            ))
          )
        ) : O(`На ближайшие ${o} дней событий нет.`)
      );
    }
  });
  return c.onclick = () => {
    o += 14, d.refresh();
  }, e.replaceChildren(a("div", { class: "ks-page" }, G(k.calendar, l), s, a("div", { class: "ks-row" }, c))), t.readData("domovoy.api", { path: "api/state" }).then((u) => u.ok && oe(u.data.timezone)), B(t, i, ["calendar"], () => d.refresh()), i.add(() => d.dispose()), U(i);
}
const Yt = {
  home_assistant: "Home Assistant",
  telegram: "Telegram",
  alice: "Алиса",
  caldav: "Календарь CalDAV",
  llm: "Языковая модель",
  speak: "Голос через колонки",
  stt: "Распознавание речи"
};
function de(e, n, t, i, s, o = !1) {
  const r = i.filter((c) => !s || s.includes(c.domain)), l = [
    { value: "", label: "Выбрать из Home Assistant" },
    ...r.map((c) => ({ value: c.id, label: `${c.name} (${c.id})` }))
  ];
  return t && !r.some((c) => c.id === t) && l.push({ value: t, label: `${t} (сейчас не найдено)` }), [
    { name: `${e}_pick`, label: n, type: "select", options: l, value: t, wide: !0 },
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
function te(e, n, t, i) {
  return pe(n, {
    onSubmit: async (o, r) => {
      const { settings: l, secrets: c } = t(o), d = Object.fromEntries(Object.entries(c ?? {}).filter(([, u]) => u !== ""));
      if (l && Object.keys(l).length) {
        const u = await e.invokeAction("domovoy.actions", "settings.update", l);
        if (!u.ok) {
          r.showErrors(u.error);
          return;
        }
        (u.data.secrets_cleared ?? []).filter((m) => !(m in d)).length && C("Адрес изменён, поэтому сохранённый ключ сброшен — введите его заново.", "warn", 9e3);
      }
      if (Object.keys(d).length) {
        const u = await e.invokeAction("domovoy.actions", "secrets.set", d);
        if (!u.ok) {
          r.showErrors(u.error);
          return;
        }
      }
      C("Сохранено", "good"), i();
    }
  }).el;
}
const ge = (e, n, t) => ({
  name: e,
  label: n,
  type: "password",
  value: "",
  autocomplete: "new-password",
  placeholder: t ? "сохранён — введите, чтобы заменить" : "не задан",
  wide: !0
});
function Wt(e, n, t) {
  return x("Проверить", async () => {
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
function Se(e, n, t, i, s, o, r, l) {
  const c = async (u) => {
    const p = await e.invokeAction("domovoy.actions", "settings.update", { [n]: u });
    return p.ok ? l() : C(p.error.message, "bad", 7e3), p;
  }, d = (u) => {
    const p = u >= 0 ? t[u] : null;
    K(p ? `Изменить: ${r}` : `Добавить: ${r}`, s(p), async (m) => {
      const v = t.slice(), b = o(m, p);
      return u >= 0 ? v[u] = b : v.push(b), c(v);
    });
  };
  return a(
    "div",
    null,
    Me(
      [
        ...i.map((u, p) => ({ key: `c${p}`, header: u.header, render: (m) => u.render(m) })),
        { key: "a", header: "", render: (u) => a("div", { class: "ks-row" }, x(k.edit, () => d(t.indexOf(u))), x(k.delete, async () => {
          await c(t.filter((p) => p !== u));
        }, "danger")) }
      ],
      t,
      O("Пока не задано.")
    ),
    a("div", { class: "ks-row" }, A(k.add, { onClick: () => d(-1) }))
  );
}
function Kt(e, n, t) {
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
        const l = { ...o?.channels ?? {} };
        String(r.chat_id).trim() ? l.telegram = { chat_id: String(r.chat_id).trim() } : delete l.telegram;
        const c = { name: String(r.name).trim(), aliases: ye(String(r.aliases)), channels: l, is_self: r.is_self === !0 }, d = o ? await e.invokeAction("domovoy.actions", "contacts.update", { id: o.id, ...c }) : await e.invokeAction("domovoy.actions", "contacts.create", c);
        return d.ok && t(), d;
      }
    );
  }, s = (o, r) => {
    const l = n.contacts.map((c) => ({ value: String(c.id), label: c.name }));
    l.push({ value: "__new__", label: "Создать новый контакт…" }), K(
      `Привязать ${r}`,
      [
        { name: "contact_id", label: "К контакту", type: "select", options: l, required: !0, value: n.contacts[0]?.id ? String(n.contacts[0].id) : "__new__", wide: !0 },
        { name: "is_self", label: "Это я (владелец) — разрешить команды", type: "checkbox", value: !1, hint: "Команды принимает только контакт с этой галочкой." }
      ],
      async (c) => {
        const d = c.is_self === !0;
        if (c.contact_id === "__new__") {
          const p = await e.invokeAction("domovoy.actions", "contacts.create", {
            name: r,
            aliases: [],
            channels: { telegram: { chat_id: o } },
            is_self: d
          });
          if (!p.ok)
            return p;
          const m = await e.invokeAction("domovoy.actions", "contacts.link", {
            contact_id: p.data.contact.id,
            chat_id: o,
            is_self: d
          });
          return m.ok && t(), m;
        }
        const u = await e.invokeAction("domovoy.actions", "contacts.link", {
          contact_id: Number(c.contact_id),
          chat_id: o,
          is_self: d
        });
        return u.ok && t(), u;
      }
    );
  };
  return a(
    "div",
    null,
    Me(
      [
        { key: "name", header: "Имя", render: (o) => a("span", null, o.name, o.is_self ? [" ", D("это я", "info")] : null) },
        { key: "al", header: "Также", render: (o) => o.aliases.join(", ") || k.none },
        { key: "tg", header: "Telegram", render: (o) => o.channels.telegram?.chat_id ? D("привязан", "good") : D("не привязан", "warn") },
        { key: "a", header: "", render: (o) => a("div", { class: "ks-row" }, x(k.edit, () => i(o)), x(k.delete, async () => {
          (await E(e, "contacts.delete", { id: o.id }, { confirm: { title: "Удалить контакт", message: o.name } })).ok && t();
        }, "danger")) }
      ],
      n.contacts,
      O("Контактов нет. Добавьте себя и тех, кому Домовой будет писать.")
    ),
    n.linkRequests.length ? a(
      "div",
      { class: "dv-link-requests" },
      a("h3", null, "Кто-то написал боту"),
      a("ul", { class: "ks-list" }, n.linkRequests.map((o) => a("li", null, a("div", { class: "ks-grow" }, `${o.name || o.username || "Без имени"} · chat_id ${o.chat_id}`, o.text ? a("div", { class: "ks-sub" }, `«${o.text}»`) : null), x("Привязать…", () => s(o.chat_id, o.name || o.username || o.chat_id), "primary"))))
    ) : null,
    a("div", { class: "ks-row" }, A("Добавить контакт", { onClick: () => i(null) }))
  );
}
const Zt = "http://127.0.0.1:48123/domovoy-api/", Gt = "<секрет Assist — нажмите «Показать»>";
function Fe(e, n = "Домовой") {
  const t = n.trim() || "Домовой", i = t.toLowerCase();
  return [
    "# configuration.yaml — один раз",
    "rest_command:",
    "  domovoy_say:",
    `    url: "${Zt}frontends/assist"`,
    "    method: POST",
    "    headers:",
    `      X-Domovoy-Secret: "${e}"`,
    "      Content-Type: application/json",
    `    payload: '{"text": {{ text | tojson }}, "room": {{ room | default("") | tojson }}, "speak": true}'`,
    "",
    `# автоматизация: фраза в Assist / на Яндекс Станции через HA: «${i} …»`,
    "automation:",
    `  - alias: ${t} — голосовая команда`,
    "    trigger:",
    "      - platform: conversation",
    "        command:",
    `          - "${i} {text}"`,
    "    action:",
    "      - service: rest_command.domovoy_say",
    "        data:",
    '          text: "{{ trigger.slots.text }}"',
    `    # ответ озвучит сам ${t} через колонки из раздела «Голос через колонки»`
  ].join(`
`);
}
function pt(e, n) {
  const t = async () => {
    const o = await T(e, "api/security");
    return o.ok ? o.data : (C(o.error.message, "bad", 7e3), null);
  }, i = async (o) => {
    try {
      await navigator.clipboard.writeText(o), C("Скопировано", "good");
    } catch {
      C("Не удалось скопировать — нажмите «Показать» и выделите вручную", "warn", 7e3);
    }
  };
  return { secretRow: (o, r, l) => {
    const c = a("code", { class: "dv-secret" }, "•".repeat(12));
    let d = !1;
    return a(
      "div",
      { class: "dv-secret-row" },
      a("strong", null, o),
      c,
      a(
        "div",
        { class: "ks-row" },
        x("Показать", async () => {
          if (d) {
            d = !1, c.textContent = "•".repeat(12);
            return;
          }
          const u = await t();
          u && (d = !0, c.textContent = r(u));
        }, "ghost"),
        x("Скопировать", async () => {
          const u = await t();
          u && await i(r(u));
        }, "ghost"),
        x("Сменить", async () => {
          (await E(e, "security.rotate", { name: l }, { confirm: { title: "Сменить секрет", message: "Старый перестанет работать: его нужно будет заменить везде, где он указан.", label: "Сменить" } })).ok && n();
        }, "danger")
      )
    );
  }, fetchSecurity: t, copy: i };
}
function Jt(e, n, t) {
  const { secretRow: i, fetchSecurity: s, copy: o } = pt(e, n), r = t.identity?.name || "Домовой";
  return a(
    "div",
    null,
    a("p", { class: "ks-muted" }, "Из панели Home Assistant доступ уже открыт. Эти ключи нужны только для внешних клиентов: они не хранятся на странице, пока вы их не запросите."),
    i("API-токен (Bearer)", (l) => l.api_token, "api_token"),
    i("Секрет для Home Assistant (Assist)", (l) => l.assist_secret, "assist_secret"),
    a("h3", null, `Голос через Home Assistant (фраза «${r.toLowerCase()} …»)`),
    a("p", { class: "ks-muted" }, "Если Home Assistant работает не на этом же устройстве, замените 127.0.0.1 на адрес, по которому он видит аддон."),
    a("pre", { class: "dv-code" }, Fe(Gt, r)),
    x("Скопировать YAML с секретом", async () => {
      const l = await s();
      l && await o(Fe(l.assist_secret, r));
    }, "secondary")
  );
}
function Xt(e, n, t) {
  const { secretRow: i } = pt(e, n), s = x("Проверить настройку", async () => {
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
    te(e, [
      { name: "allowed_user_ids", label: "Yandex user id", type: "textarea", rows: 3, value: Oe(t.alice?.allowed_user_ids), placeholder: "1234567890", hint: "Посмотреть id можно в профиле пользователя в консоли Yandex Dialogs.", wide: !0 }
    ], (o) => ({ settings: { alice: { allowed_user_ids: ye(String(o.allowed_user_ids)) } } }), n),
    a("div", { class: "ks-row" }, s)
  );
}
function Qt(e, n, t) {
  const i = new I(), s = a("div"), o = R({
    host: s,
    load: async (r) => {
      const [l, c, d, u] = await Promise.all([
        T(t, "api/integrations", void 0, r),
        T(t, "api/settings", void 0, r),
        T(t, "api/contacts", void 0, r),
        T(t, "api/ha/entities", { limit: 1e3 }, r)
      ]), p = await ke(Promise.resolve(l), Promise.resolve(c));
      return p.ok ? d.ok ? { ok: !0, data: {
        integrations: p.data[0].integrations,
        secrets: p.data[0].secrets,
        settings: p.data[1].settings,
        contacts: d.data.contacts,
        linkRequests: d.data.link_requests ?? [],
        haEntities: u.ok ? u.data.entities : [],
        haEntitiesAvailable: u.ok
      } } : d : p;
    },
    render: (r, l) => {
      const c = r.settings, d = (f) => {
        const S = r.integrations.find((q) => q.name === f);
        return S ? D(ne(S.status), me(S.status)) : null;
      }, u = (f) => {
        const S = r.integrations.find((q) => q.name === f);
        return S ? a("p", { class: "ks-muted" }, [S.detail, S.last_ok ? `Последний успех: ${L(S.last_ok)}.` : "", S.last_error ? `Последняя ошибка: ${S.last_error}` : ""].filter(Boolean).join(" "), " ", Wt(t, f, l)) : null;
      }, p = a("div", { class: "ks-grid dv-status-grid" }, r.integrations.map(
        (f) => a("div", { class: "ks-card dv-status" }, a("strong", null, Yt[f.name] ?? f.name), D(ne(f.status), me(f.status)), a("small", { class: "ks-muted" }, f.detail && f.detail.toLowerCase() !== ne(f.status).toLowerCase() ? f.detail : ""))
      )), m = W("ha", "Home Assistant", d("home_assistant"), a(
        "div",
        null,
        u("home_assistant"),
        r.haEntitiesAvailable ? null : a("p", { class: "ks-muted" }, "Список сущностей недоступен. Можно указать ID вручную."),
        te(t, [
          { name: "url", label: "Адрес Home Assistant", type: "url", value: c.ha.url, placeholder: "http://homeassistant.local:8123", hint: "В аддоне обычно http://supervisor/core — оставьте пустым, если работаете внутри HA.", wide: !0 },
          ge("ha_token", "Долгоживущий токен доступа", r.secrets.ha_token),
          ...de("person_entity", "Ваш person", c.ha.person_entity, r.haEntities, ["person"]),
          { name: "allowed_services", label: "Разрешённые сервисы управления", type: "textarea", rows: 4, value: Oe(c.ha.allowed_services), placeholder: `light.turn_on
light.turn_off
script.turn_on`, hint: "Дополнительно к базовым (свет, розетки, вентиляторы, шторы, сцены). Замки, сигнализация, скрипты и Supervisor запрещены всегда.", wide: !0 }
        ], (f) => ({ settings: { ha: { url: String(f.url).trim(), person_entity: Q(f, "person_entity", c.ha.person_entity), allowed_services: ye(String(f.allowed_services)) } }, secrets: { ha_token: String(f.ha_token) } }), l)
      )), v = a(
        "span",
        { class: "ks-row" },
        d("telegram"),
        r.linkRequests.length ? D(`${r.linkRequests.length} запрос(а)`, "warn") : null
      ), b = x("Отправить тестовое сообщение", async () => {
        const f = await t.invokeAction(
          "domovoy.actions",
          "telegram.test_message"
        );
        f.ok ? f.data.ok ? C("Тестовое сообщение отправлено в Telegram", "good") : C(f.data.detail?.last_error ?? "Не удалось отправить: сообщение осталось в очереди", "bad", 9e3) : C(f.error.message, "bad", 8e3), l();
      }, "secondary"), h = W("telegram", "Telegram", v, a(
        "div",
        null,
        a("p", { class: "ks-muted" }, "Бот принимает команды только в личном чате владельца — контакта с галочкой «Это я». Группы и другие контакты могут только получать сообщения."),
        u("telegram"),
        a("div", { class: "ks-row" }, b),
        te(t, [
          { name: "enabled", label: "Включён", type: "checkbox", value: c.telegram.enabled },
          ge("telegram_token", "Токен бота (от @BotFather)", r.secrets.telegram_token),
          { name: "proxy", label: "HTTP-прокси для Telegram", type: "url", value: c.telegram.proxy ?? "", placeholder: "http://127.0.0.1:9080", hint: "Только для Telegram. Для Tor add-on включите http_tunnel: true и укажите http://127.0.0.1:9080. Пусто — прямое подключение.", wide: !0 }
        ], (f) => ({ settings: { telegram: { enabled: f.enabled === !0, proxy: String(f.proxy).trim() } }, secrets: { telegram_token: String(f.telegram_token) } }), l),
        a("h3", null, "Контакты"),
        Kt(t, r, l)
      )), w = W("calendar", "Календарь", d("caldav"), a("div", null, u("caldav"), te(t, [
        { name: "url", label: "CalDAV URL", type: "url", value: c.caldav.url, placeholder: "https://caldav.example.com/dav/user/calendar/", wide: !0 },
        { name: "username", label: "Логин", value: c.caldav.username },
        ge("caldav_password", "Пароль / пароль приложения", r.secrets.caldav_password),
        { name: "default", label: "Куда добавлять по умолчанию", type: "select", options: [{ value: "local", label: "Локальный календарь" }, { value: "caldav", label: "CalDAV" }], value: c.calendar.default },
        { name: "ha_calendar_pick", label: "Добавить календарь HA", type: "select", value: "", options: [
          { value: "", label: "Выбрать из Home Assistant" },
          ...r.haEntities.filter((f) => f.domain === "calendar").map((f) => ({ value: f.id, label: `${f.name} (${f.id})` }))
        ], wide: !0 },
        { name: "ha_calendars", label: "Календари из Home Assistant", type: "textarea", rows: 2, value: Oe(c.calendar.ha_calendars), placeholder: "calendar.family", hint: "По одному на строку. События из них видны; добавлять можно, менять и удалять — нет.", wide: !0 }
      ], (f) => ({
        settings: { caldav: { url: String(f.url).trim(), username: String(f.username).trim() }, calendar: {
          default: f.default,
          ha_calendars: [...new Set([...ye(String(f.ha_calendars)), String(f.ha_calendar_pick || "").trim()].filter(Boolean))]
        } },
        secrets: { caldav_password: String(f.caldav_password) }
      }), l))), g = W("llm", "Языковая модель (необязательно)", d("llm"), a(
        "div",
        null,
        u("llm"),
        a("p", { class: "ks-muted" }, "Подойдёт любой OpenAI-совместимый сервер: локальный (Ollama, llama.cpp, LM Studio) или облачный. Без неё Домовой работает по правилам — быстро и без нагрузки на процессор. Модель ничего не решает сама: её предложения проходят проверку и попадают в «Проверку»."),
        te(t, [
          { name: "enabled", label: "Включена", type: "checkbox", value: c.ai.enabled },
          { name: "base_url", label: "Адрес API", type: "url", value: c.ai.base_url, placeholder: "http://192.168.1.20:11434/v1", wide: !0 },
          { name: "model", label: "Модель для команд", value: c.ai.model, placeholder: "qwen2.5:3b-instruct" },
          { name: "embedding_model", label: "Модель для смыслового поиска", value: c.ai.embedding_model, placeholder: "nomic-embed-text", hint: "Пусто — поиск по словам и опечаткам, без модели." },
          ge("llm_api_key", "API-ключ (если нужен)", r.secrets.llm_api_key)
        ], (f) => ({ settings: { ai: { enabled: f.enabled === !0, base_url: String(f.base_url).trim(), model: String(f.model).trim(), embedding_model: String(f.embedding_model).trim() } }, secrets: { llm_api_key: String(f.llm_api_key) } }), l)
      )), y = W("speak", "Голос через колонки (Яндекс Станции)", d("speak"), a(
        "div",
        null,
        u("speak"),
        a("p", { class: "ks-muted" }, "Домовой говорит через колонки, подключённые к Home Assistant. Способ озвучки задаётся здесь, а не в коде."),
        Se(t, "speakers", c.speakers, [
          { header: "Колонка", render: (f) => String(f.name || f.entity_id) },
          { header: "Комната", render: (f) => String(f.room ?? "") || k.none },
          { header: "Способ", render: (f) => ({ yandex_station_text: "Яндекс Станция (текст)", tts_speak: "TTS (tts.speak)", custom: "свой сервис" })[String(f.mode)] ?? String(f.mode ?? "Яндекс Станция (текст)") },
          { header: "", render: (f) => f.default ? "по умолчанию" : "" }
        ], (f) => [
          { name: "name", label: "Название", value: f?.name ?? "", placeholder: "Станция на кухне" },
          ...de("entity_id", "media_player", String(f?.entity_id ?? ""), r.haEntities, ["media_player"], !0),
          { name: "room", label: "Комната", value: f?.room ?? "", placeholder: "кухня" },
          { name: "mode", label: "Способ озвучки", type: "select", options: [{ value: "yandex_station_text", label: "Яндекс Станция: media_player.play_media (text)" }, { value: "tts_speak", label: "tts.speak (нужна TTS-сущность)" }, { value: "custom", label: "Свой сервис" }], value: f?.mode ?? "yandex_station_text", wide: !0 },
          ...de("tts_entity", "TTS-сущность (для tts.speak)", String(f?.tts_entity ?? ""), r.haEntities, ["tts"]),
          { name: "service", label: "Свой сервис", value: f?.service ?? "", placeholder: "script.say", hint: "domain.service; в данных используйте {text} и {entity_id}." },
          { name: "default", label: "По умолчанию, если неизвестно, где человек", type: "checkbox", value: f?.default === !0, wide: !0 }
        ], (f, S) => ({
          ...S ?? {},
          id: S?.id ?? Q(f, "entity_id", String(S?.entity_id ?? "")),
          name: String(f.name).trim(),
          entity_id: Q(f, "entity_id", String(S?.entity_id ?? "")),
          room: String(f.room).trim(),
          mode: f.mode,
          tts_entity: Q(f, "tts_entity", String(S?.tts_entity ?? "")),
          service: String(f.service).trim(),
          default: f.default === !0
        }), "колонка", l)
      )), _ = W("rooms", "Где вы находитесь: комнаты и места", null, a(
        "div",
        null,
        a("p", { class: "ks-muted" }, "Датчик присутствия или устройство, по которому Домовой понимает, что вы в комнате, — для напоминаний «когда зайду на кухню» и чтобы отвечать в нужную колонку."),
        a("h3", null, "Комнаты"),
        Se(
          t,
          "rooms",
          c.rooms,
          [{ header: "Комната", render: (f) => String(f.name || f.room) }, { header: "Датчик", render: (f) => `${f.entity_id ?? ""} = ${f.state ?? "on"}` }],
          (f) => [
            { name: "name", label: "Название", required: !0, value: f?.name ?? f?.room ?? "", placeholder: "кухня" },
            ...de(
              "entity_id",
              "Сущность",
              String(f?.entity_id ?? ""),
              r.haEntities,
              ["binary_sensor", "sensor", "device_tracker", "person", "zone", "input_boolean"],
              !0
            ),
            { name: "state", label: "Активна, когда состояние", value: f?.state ?? "on" }
          ],
          (f, S) => ({
            ...S ?? {},
            name: String(f.name).trim(),
            entity_id: Q(f, "entity_id", String(S?.entity_id ?? "")),
            state: String(f.state).trim() || "on"
          }),
          "комната",
          l
        ),
        a("h3", null, "Другие места и устройства"),
        Se(
          t,
          "places",
          c.places,
          [{ header: "Место", render: (f) => String(f.name) }, { header: "Сущность", render: (f) => `${f.entity_id ?? ""} = ${f.state ?? "on"}` }],
          (f) => [
            { name: "name", label: "Название", required: !0, value: f?.name ?? "", placeholder: "мастерская" },
            ...de("entity_id", "Сущность", String(f?.entity_id ?? ""), r.haEntities, void 0, !0),
            { name: "state", label: "Активно, когда состояние", value: f?.state ?? "on" }
          ],
          (f, S) => ({
            ...S ?? {},
            name: String(f.name).trim(),
            entity_id: Q(f, "entity_id", String(S?.entity_id ?? "")),
            state: String(f.state).trim() || "on"
          }),
          "место",
          l
        )
      )), z = W("stt", "Распознавание речи (микрофон киоска)", d("stt"), a(
        "div",
        null,
        u("stt"),
        a("p", { class: "ks-muted" }, "Нужно только если вы говорите в микрофон киоска. Голос через Алису/Home Assistant приходит уже текстом. Подойдёт любой сервер с OpenAI-совместимым /audio/transcriptions (например, локальный faster-whisper)."),
        te(t, [
          { name: "base_url", label: "Адрес STT-сервера", type: "url", value: c.voice.stt.base_url, placeholder: "http://127.0.0.1:8000/v1", wide: !0 },
          { name: "model", label: "Модель", value: c.voice.stt.model, placeholder: "small" },
          { name: "language", label: "Язык", value: c.voice.stt.language },
          { name: "max_seconds", label: "Максимум секунд записи", type: "number", min: 3, max: 60, value: c.voice.stt.max_seconds }
        ], (f) => ({ settings: { voice: { stt: { base_url: String(f.base_url).trim(), model: String(f.model).trim(), language: String(f.language).trim() || "ru", max_seconds: Number(f.max_seconds) || 15 } } } }), l)
      )), j = W("alice", "Алиса", d("alice"), Xt(t, l, c)), F = W("security", "Доступ и Home Assistant", null, Jt(t, l, c));
      return a("div", { class: "dv-stack" }, p, m, h, j, w, y, _, g, z, F);
    }
  });
  return $(e, a("div", { class: "ks-page" }, G(k.integrations), s)), B(t, i, ["integrations", "contacts", "settings"], () => o.refresh(), 800, e), i.add(() => o.dispose()), U(i);
}
function ft(e, n = !0) {
  const t = e.slice().sort((i, s) => i.path.join("/").localeCompare(s.path.join("/"), "ru")).map((i) => ({ value: String(i.id), label: i.path.join(" → ") }));
  return n ? [{ value: "", label: "— без места —" }, ...t] : t;
}
function De(e, n, t, i) {
  return K(
    t ? `Изменить: ${t.name}` : "Добавить вещь",
    [
      { name: "name", label: k.name, required: !0, value: t?.name ?? "", wide: !0 },
      { name: "quantity", label: k.quantity, type: "number", step: "any", min: 0, value: t?.quantity ?? "" },
      { name: "unit", label: k.unit, value: t?.unit ?? "", placeholder: "шт, кг, м…" },
      { name: "location_id", label: k.place, type: "select", options: ft(n), value: t?.location_id ? String(t.location_id) : "", wide: !0 },
      { name: "new_path", label: "Или новое место", placeholder: "Нижний шкаф → Коробка 3", hint: "Создам недостающие уровни автоматически.", wide: !0 },
      { name: "category", label: "Категория", value: t?.category ?? "" },
      { name: "properties", label: "Свойства", type: "textarea", rows: 3, value: Rt(t?.properties), hint: "По строке: «номинал: 10 кОм»", wide: !0 },
      { name: "notes", label: k.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 }
    ],
    async (s) => {
      const o = Ht(String(s.new_path ?? "")), r = {
        name: String(s.name).trim(),
        quantity: Bt(s.quantity),
        unit: String(s.unit ?? "").trim(),
        category: String(s.category ?? "").trim(),
        properties: Nt(String(s.properties ?? "")),
        notes: String(s.notes ?? "")
      };
      o.length ? r.location_path = o : r.location_id = s.location_id ? Number(s.location_id) : null;
      const l = t ? await Ve(e, "items.update", { id: t.id, ...r }) : await Ve(e, "items.create", r);
      return l.ok && i(), l;
    }
  );
}
function Ve(e, n, t) {
  return e.invokeAction("domovoy.actions", n, t);
}
function kt(e, n, t) {
  const i = a("div", { class: "dv-item-detail" }, a("p", { class: "ks-muted" }, k.loading)), s = fe("Вещь", i);
  (async () => {
    const [o, r, l] = await Promise.all([
      T(e, `api/items/${n}`),
      T(e, `api/items/${n}/history`),
      T(e, "api/locations")
    ]);
    if (!o.ok) {
      $(i, a("p", { class: "ks-error" }, o.error.message));
      return;
    }
    const c = o.data.item, d = () => {
      t(), s.close();
    };
    $(
      i,
      a("h3", null, c.name),
      a(
        "dl",
        { class: "dv-facts" },
        a("dt", null, k.quantity),
        a("dd", null, Le(c.quantity, c.unit) || k.none),
        a("dt", null, k.place),
        a("dd", null, c.location_text || "не указано"),
        c.category ? [a("dt", null, "Категория"), a("dd", null, c.category)] : null,
        ...Object.entries(c.properties ?? {}).flatMap(([u, p]) => [a("dt", null, u), a("dd", null, p)]),
        c.notes ? [a("dt", null, k.notes), a("dd", null, c.notes)] : null,
        a("dt", null, "Изменено"),
        a("dd", null, `${L(c.updated_at)} · ${c.source}`)
      ),
      a(
        "div",
        { class: "ks-row" },
        A(k.edit, { variant: "primary", onClick: () => l.ok && void De(e, l.data.locations, c, d) }),
        A("Списать 1", { onClick: async () => {
          (await E(e, "items.consume", { id: c.id, quantity: 1 })).ok && d();
        } }),
        A(k.delete, { variant: "danger", onClick: async () => {
          (await E(e, "items.delete", { id: c.id }, { confirm: { title: "Удалить вещь", message: `«${c.name}» будет удалена. Это можно отменить в журнале.` } })).ok && d();
        } })
      ),
      a("h4", null, "История"),
      r.ok && r.data.history.length ? a("ul", { class: "ks-list" }, r.data.history.slice(0, 12).map((u) => P(u.summary, `${L(u.ts)} · ${u.actor}/${u.source}`))) : O("Изменений не было.")
    );
  })();
}
function en(e, n, t) {
  const i = new I();
  let s = "", o = String(n.location_id ?? "");
  const r = a("div"), l = ue({ name: "q", label: "Фильтр", placeholder: "название или заметка" }), c = ue({ name: "loc", label: k.place, type: "select", options: [{ value: "", label: "Везде" }], value: o });
  let d = [];
  const u = R({
    host: r,
    load: (m) => ke(
      T(t, "api/items", { q: s || void 0, location_id: o || void 0, limit: 500 }, m),
      T(t, "api/locations", void 0, m)
    ),
    render: ([{ items: m }, { locations: v }], b) => {
      d = v;
      const h = c.input, w = [{ value: "", label: "Везде" }, ...ft(v, !1)];
      return $(h, w.map((g) => a("option", { value: g.value, selected: g.value === o }, g.label))), h.value = o, a(
        "div",
        null,
        Me(
          [
            { key: "name", header: k.name, render: (g) => a("button", { class: "ks-link", type: "button", onClick: () => kt(t, g.id, b) }, g.name) },
            { key: "qty", header: k.quantity, render: (g) => g.quantity === 0 ? D("нет", "warn") : Le(g.quantity, g.unit) || k.none },
            { key: "place", header: k.place, render: (g) => g.location_text || k.none },
            { key: "updated", header: "Изменено", render: (g) => L(g.updated_at), className: "ks-hide-narrow" },
            {
              key: "actions",
              header: "",
              render: (g) => a(
                "div",
                { class: "ks-row" },
                x(k.edit, () => void De(t, v, g, b)),
                x(k.delete, async () => {
                  (await E(t, "items.delete", { id: g.id }, { confirm: { title: "Удалить вещь", message: `«${g.name}» будет удалена. Это можно отменить в журнале.` } })).ok && b();
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
  }), p = () => u.refresh();
  return l.input.addEventListener("input", () => {
    s = l.input.value.trim(), p();
  }), c.input.addEventListener("change", () => {
    o = c.input.value, p();
  }), $(
    e,
    a(
      "div",
      { class: "ks-page" },
      G(k.inventory, A(k.add, { variant: "primary", onClick: () => void De(t, d, null, p) })),
      a("div", { class: "ks-card ks-filters" }, l.el, c.el),
      r
    )
  ), B(t, i, ["items", "locations"], p), i.add(() => u.dispose()), U(i);
}
const gt = { home: "дом", room: "комната", cabinet: "шкаф", shelf: "полка", box: "коробка", cell: "ячейка", place: "место" }, tn = Object.entries(gt).map(([e, n]) => ({ value: e, label: n }));
function bt(e, n = []) {
  for (const t of e)
    n.push(t), bt(t.children, n);
  return n;
}
function nn(e, n, t) {
  const i = new I(), s = a("div"), o = A(k.add, { variant: "primary" }), r = (d, u, p, m) => {
    const v = bt(p).filter((b) => !d || b.id !== d.id && !b.path.join("\0").startsWith(d.path.join("\0") + "\0"));
    K(
      d ? `Изменить: ${d.name}` : u ? `Новое место внутри «${u.name}»` : "Новое место",
      [
        { name: "name", label: k.name, required: !0, value: d?.name ?? "", wide: !0 },
        { name: "kind", label: "Тип", type: "select", options: tn, value: d?.kind ?? (u ? "box" : "room") },
        { name: "parent_id", label: "Внутри", type: "select", options: [{ value: "", label: "— верхний уровень —" }, ...v.map((b) => ({ value: String(b.id), label: b.path.join(" → ") }))], value: String((d ? d.parent_id : u?.id) ?? ""), wide: !0 },
        { name: "notes", label: k.notes, type: "textarea", rows: 2, value: d?.notes ?? "", wide: !0 }
      ],
      async (b) => {
        const h = { name: String(b.name).trim(), kind: String(b.kind), notes: String(b.notes ?? ""), parent_id: b.parent_id ? Number(b.parent_id) : null }, w = d ? await t.invokeAction("domovoy.actions", "locations.update", { id: d.id, ...h }) : await t.invokeAction("domovoy.actions", "locations.create", h);
        return w.ok && m(), w;
      }
    );
  }, l = (d, u, p) => a(
    "li",
    { class: "dv-loc" },
    a(
      "div",
      { class: "dv-loc-row" },
      a("span", { class: "dv-loc-name" }, d.name, " ", D(gt[d.kind] ?? d.kind, "neutral")),
      a("span", { class: "ks-muted" }, d.item_count ? `${d.item_count} вещ.` : ""),
      a(
        "span",
        { class: "ks-row dv-loc-actions" },
        d.item_count ? x("Вещи", () => t.navigate("domovoy.inventory", { location_id: String(d.id) }), "ghost") : null,
        x("+ Внутрь", () => r(null, d, u, p), "ghost"),
        x(k.edit, () => r(d, null, u, p)),
        x(k.delete, async () => {
          (await E(t, "locations.delete", { id: d.id }, { confirm: { title: "Удалить место", message: `«${d.name}» будет удалено (только если оно пустое).` } })).ok && p();
        }, "danger")
      )
    ),
    d.children.length ? a("ul", { class: "dv-loc-tree" }, d.children.map((m) => l(m, u, p))) : null
  ), c = R({
    host: s,
    load: (d) => t.readData("domovoy.api", { path: "api/locations/tree" }, { signal: d }),
    render: ({ tree: d }, u) => (o.onclick = () => r(null, null, d, u), d.length ? a("ul", { class: "dv-loc-tree dv-loc-root" }, d.map((p) => l(p, d, u))) : a("div", { class: "ks-empty" }, a("strong", null, "Мест ещё нет"), a("p", null, "Они появятся сами, когда вы скажете «положил в третью коробку нижнего шкафа», или добавьте вручную.")))
  });
  return e.replaceChildren(a("div", { class: "ks-page" }, G(k.locations, o), a("div", { class: "ks-card" }, s))), B(t, i, ["locations", "items"], () => c.refresh()), i.add(() => c.dispose()), U(i);
}
const Ye = "domovoy.session";
function an() {
  try {
    let e = window.sessionStorage.getItem(Ye);
    return e || (e = `web-${Math.random().toString(36).slice(2, 10)}`, window.sessionStorage.setItem(Ye, e)), e;
  } catch {
    return "web-anon";
  }
}
function ze(e, n) {
  const t = a("input", { class: "ks-input dv-command", type: "text", placeholder: k.commandPlaceholder, "aria-label": "Команда", autocomplete: "off", enterkeyhint: "send" }), i = a("div", { class: "dv-reply", role: "status", "aria-live": "polite" }), s = A(k.send, { variant: "primary", type: "submit" }), o = a("form", { class: "dv-commandbar" }, t, s), r = async (c) => {
    const d = c.trim();
    if (!d)
      return;
    s.disabled = !0, $(i, a("span", { class: "ks-muted" }, k.loading));
    const u = await mt(e, "command.send", { text: d, session_id: an() });
    if (s.disabled = !1, !u.ok) {
      $(i, a("span", { class: "ks-error" }, u.error.message));
      return;
    }
    t.value = "", l(u.data), n();
  }, l = (c) => {
    const d = (c.options ?? []).map((u, p) => x(`${p + 1}. ${u}`, () => void r(String(p + 1))));
    $(
      i,
      a("div", { class: "dv-reply-line" }, D(ne(c.status), me(c.status)), " ", c.reply),
      d.length ? a("div", { class: "ks-row dv-chips" }, d) : null,
      c.undoable && c.command_id ? x(k.undo, async () => {
        (await E(e, "command.undo", { id: c.command_id }, { success: "Отменено" })).ok && ($(i, a("span", { class: "ks-muted" }, "Отменено.")), n());
      }, "ghost") : null
    );
  };
  return o.addEventListener("submit", (c) => {
    c.preventDefault(), r(t.value);
  }), a("div", { class: "ks-card dv-command-card" }, o, i);
}
function sn(e) {
  if (!e.events.length)
    return O("Сегодня и завтра событий нет.");
  const n = e.timezone;
  oe(n);
  const t = J(e.now, n);
  return a(
    "ul",
    { class: "ks-list" },
    e.events.map(
      (i) => P(
        i.title,
        `${J(i.start, n) === t ? "сегодня" : "завтра"}, ${i.all_day ? "весь день" : `${se(i.start, n)}–${se(i.end, n)}`}${i.location ? ` · ${i.location}` : ""}`
      )
    )
  );
}
function on(e, n, t) {
  const i = new I(), s = t.mode === "kiosk", o = a("div", { class: `ks-page dv-today${s ? " ks-scope dv-kiosk" : ""}`, dataset: s ? { theme: "kiosk", noSwipe: "true" } : void 0 }), r = a("div", { class: "ks-page" }), l = ze(t, () => c.refresh());
  $(e, o), $(o, l, r);
  const c = R({
    host: r,
    load: (d) => T(t, "api/today", void 0, d),
    render: (d, u) => {
      oe(d.timezone);
      const p = (m, v) => a(
        "div",
        { class: "ks-row" },
        v === "fired" ? x("Готово", async () => {
          await E(t, "reminders.done", { id: m }), u();
        }, "primary") : null,
        x("+10 мин", async () => {
          await E(t, "reminders.snooze", { id: m, minutes: 10 }), u();
        })
      );
      return a(
        "div",
        { class: "ks-grid" },
        M("Календарь", sn(d)),
        M(
          "Напоминания",
          d.reminders.length ? a("ul", { class: "ks-list" }, d.reminders.map((m) => P(
            m.text,
            [m.state === "fired" ? "сработало" : m.due_at ? `${L(m.due_at)} (${Pe(m.due_at)})` : dt(m.trigger), m.recurrence ? ` · ${he(m.recurrence)}` : "", ` · ${k.channels[m.channel] ?? m.channel}`].join(""),
            p(m.id, m.state),
            m.state === "fired" ? "dv-fired" : ""
          ))) : O("Напоминаний нет.")
        ),
        M(
          "Список покупок",
          d.shopping.length ? a("ul", { class: "ks-list" }, d.shopping.map((m) => P(m.title, void 0, x("Куплено", async () => {
            await E(t, "tasks.complete", { id: m.id }), u();
          })))) : O("Список покупок пуст.")
        ),
        M(
          "Задачи",
          d.tasks.length ? a("ul", { class: "ks-list" }, d.tasks.map((m) => P(m.title, m.due_date ? `до ${m.due_date}${m.recurrence ? ` · ${he(m.recurrence)}` : ""}` : "", x("Готово", async () => {
            await E(t, "tasks.complete", { id: m.id }), u();
          })))) : O("Задач нет.")
        ),
        d.review_count ? M("Ждёт проверки", a(
          "div",
          null,
          a("p", null, `Есть неуверенные команды: ${d.review_count}. Я ничего не записал без вашего подтверждения.`),
          // the review page exists in the admin UI only; on the kiosk there is nothing to open
          s ? a("p", { class: "ks-muted" }, "Откройте администрирование на телефоне или компьютере, чтобы решить.") : A("Открыть проверку", { variant: "primary", onClick: () => t.navigate("domovoy.review") })
        )) : null,
        d.warnings.length ? M("Календари", a("p", { class: "ks-stale-banner" }, `Не удалось прочитать: ${d.warnings.map((m) => m.source).join(", ")}`)) : null,
        s ? null : M(
          "Последние команды",
          d.recent.length ? a("ul", { class: "ks-list" }, d.recent.map((m) => P(m.text, m.reply ?? "", D(ne(m.status), me(m.status))))) : tt("Команд ещё не было", "Скажите или напишите что-нибудь выше.")
        )
      );
    }
  });
  return B(t, i, ["calendar", "reminders", "tasks", "review", "commands", "outbox", "notification"], () => c.refresh()), i.add(() => c.dispose()), U(i);
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
function rn(e, n, t) {
  const i = new I(), s = a("div");
  let o = "";
  const r = ue({ name: "q", label: "Поиск по заметкам", placeholder: "слово из заголовка или текста" }), l = A(k.add, { variant: "primary" }), c = R({
    host: s,
    load: (d) => ke(
      T(t, "api/notes", { q: o || void 0 }, d),
      T(t, "api/items", { limit: 8 }, d)
    ),
    render: ([{ notes: d }, { items: u }], p) => (l.onclick = () => We(t, null, p), a(
      "div",
      { class: "ks-grid" },
      M(
        "Заметки",
        d.length ? a("ul", { class: "ks-list" }, d.map(
          (m) => P(
            m.title || m.body.slice(0, 60),
            a("span", null, m.title ? m.body.slice(0, 200) : "", m.tags.length ? ` · #${m.tags.join(" #")}` : "", ` · ${L(m.updated_at)}`),
            a(
              "div",
              { class: "ks-row" },
              x(k.edit, () => We(t, m, p)),
              x(k.delete, async () => {
                (await E(t, "notes.delete", { id: m.id }, { confirm: { title: "Удалить заметку", message: m.title || m.body.slice(0, 80) } })).ok && p();
              }, "danger")
            )
          )
        )) : O(o ? "Ничего не найдено." : "Заметок пока нет. Скажите «запомни, что код домофона 4711».")
      ),
      M(
        "Недавно запомнено",
        u.length ? a("ul", { class: "ks-list" }, u.map((m) => P(`${m.name}${m.quantity !== null ? ` — ${Le(m.quantity, m.unit)}` : ""}`, `${m.location_text || "место не указано"} · ${L(m.updated_at)}`))) : O()
      )
    ))
  });
  return r.input.addEventListener("input", () => {
    o = r.input.value.trim(), c.refresh();
  }), $(e, a("div", { class: "ks-page" }, G(k.memory, l), ze(t, () => c.refresh()), a("div", { class: "ks-card ks-filters" }, r.el), s)), B(t, i, ["notes", "items", "locations"], () => c.refresh()), i.add(() => c.dispose()), U(i);
}
async function ht(e, n, t, i) {
  const s = await E(e, "review.approve", t ? { id: n, proposal: t } : { id: n });
  if (!s.ok)
    return !1;
  const o = s.data.results.filter((r) => !r.ok).map((r) => r.message);
  return s.data.still_pending ? (C(`Не выполнено, осталось в очереди: ${o.join(" ")}`, "bad", 9e3), !1) : (C(o.length ? `Выполнено частично. ${o.join(" ")}` : i, o.length ? "warn" : "good", o.length ? 9e3 : 4500), !0);
}
function ln(e, n, t) {
  fe("Проверить и поправить", (i) => {
    const s = n.proposal.map((r) => {
      const c = (we[String(r.type)]?.fields ?? []).filter((d) => d.kind !== "json").map((d) => {
        const u = r[d.name], p = d.kind === "iso" && typeof u == "string" ? ae(u) : d.kind === "bool" ? u === !0 : ct(d, u);
        return {
          name: d.name,
          label: d.label,
          type: d.kind === "bool" ? "checkbox" : d.kind === "enum" ? "select" : d.kind === "iso" ? "datetime-local" : (d.kind === "num", "text"),
          value: p,
          options: d.options?.map((m) => ({ value: m, label: k.channels[m] ?? k.lists[m] ?? { set: "заменить на это число", add: "прибавить к имеющемуся" }[m] ?? m })),
          wide: !0
        };
      });
      return { intent: r, fields: c, handle: pe(c, { submitLabel: k.save, onSubmit: () => {
      } }) };
    }), o = async () => {
      const r = s.map(({ intent: l, handle: c }) => zt(l, c.values(), (d) => ie(d)));
      await ht(e, n.id, r, "Выполнено с вашими правками") && (i(!0), t());
    };
    return a(
      "div",
      null,
      a("p", { class: "ks-muted" }, `Вы сказали: «${n.command_text ?? ""}». ${n.reason}`),
      s.map(({ intent: r, handle: l }) => a("fieldset", { class: "dv-intent" }, a("legend", null, It(String(r.type))), a("div", { class: "ks-form-grid" }, Object.values(l.fields).map((c) => c.el)))),
      a("div", { class: "ks-form-actions" }, A("Применить с правками", { variant: "primary", onClick: () => void o() }), A(k.cancel, { onClick: () => i(!1) }))
    );
  });
}
function dn(e, n, t) {
  const i = new I(), s = a("div"), o = async (u, p, m) => {
    await ht(t, u, p, "Выполнено") && m();
  };
  let r = "pending";
  const l = a("div", { class: "ks-row dv-chips" }), c = () => Ie(l, () => {
    $(l, ["pending", "approved", "rejected"].map(
      (u) => a("button", { type: "button", dataset: { key: u }, class: `ks-chip${r === u ? " is-active" : ""}`, "aria-pressed": String(r === u), onClick: () => {
        r = u, c(), d.refresh();
      } }, u === "pending" ? "Ждут решения" : u === "approved" ? "Принятые" : "Отклонённые")
    ));
  }), d = R({
    host: s,
    load: (u) => T(t, "api/review", { status: r }, u),
    render: ({ items: u }, p) => u.length ? a("div", { class: "ks-grid" }, u.map(
      (m) => M(
        a("span", null, `«${m.command_text ?? "—"}»`),
        a(
          "div",
          null,
          a("p", { class: "ks-muted" }, `${L(m.ts)} · уверенность ${m.confidence === null ? "—" : Math.round(m.confidence * 100) + "%"} · ${m.reason}`),
          a("ul", { class: "ks-list" }, m.proposal.map((v) => a("li", null, ut(v, (b) => L(b))))),
          r === "pending" ? a(
            "div",
            { class: "ks-row" },
            x("Подтвердить", async () => {
              await o(m.id, void 0, p);
            }, "primary"),
            x("Поправить…", () => ln(t, m, p)),
            x(k.reject, async () => {
              (await E(t, "review.reject", { id: m.id })).ok && p();
            }, "danger")
          ) : ve(m.status)
        )
      )
    )) : a("div", { class: "ks-empty" }, a("strong", null, r === "pending" ? "Всё проверено" : "Пусто"), a("p", null, r === "pending" ? "Неуверенные команды попадают сюда — я ничего не записываю без вашего подтверждения." : ""))
  });
  return c(), $(e, a("div", { class: "ks-page" }, G(k.review), a("p", { class: "ks-muted" }, "Здесь команды, в которых я не уверен, и всё, что предложила языковая модель. Пока вы не подтвердите, ничего не изменилось."), l, s)), B(t, i, ["review", "commands"], () => d.refresh()), i.add(() => d.dispose()), U(i);
}
const Ke = { location: "domovoy.locations", note: "domovoy.memory", task: "domovoy.tasks", event: "domovoy.calendar" };
function cn(e, n, t) {
  const i = new I(), s = /* @__PURE__ */ new Set(), o = a("input", { class: "ks-input dv-command", type: "search", placeholder: k.search_placeholder, "aria-label": k.search, autocomplete: "off", value: String(n.q ?? "") }), r = a("div", { class: "ks-row dv-chips" }), l = a("div", { class: "dv-results", "aria-live": "polite" }), c = a("p", { class: "ks-muted dv-search-meta" });
  let d = 0, u = null;
  const p = () => Ie(r, () => {
    $(
      r,
      Object.entries(k.kinds).map(
        ([h, w]) => a("button", {
          type: "button",
          dataset: { key: h },
          class: `ks-chip${s.has(h) ? " is-active" : ""}`,
          "aria-pressed": String(s.has(h)),
          onClick: () => {
            s.has(h) ? s.delete(h) : s.add(h), p(), v();
          }
        }, w)
      )
    );
  }), m = (h) => {
    h.kind === "item" ? kt(t, h.id, () => void v()) : Ke[h.kind] && t.navigate(Ke[h.kind], { id: String(h.id) });
  }, v = async () => {
    const h = o.value.trim();
    u?.abort();
    const w = d += 1;
    if (!h) {
      $(l, a("p", { class: "ks-muted" }, "Ищет по вещам, местам, заметкам, задачам и событиям — даже с опечатками.")), c.textContent = "";
      return;
    }
    u = new AbortController(), $(l, nt());
    const g = await T(t, "api/search", { q: h, kinds: [...s].join(",") || void 0, limit: 30 }, u.signal);
    if (w !== d)
      return;
    if (!g.ok) {
      g.error.code !== "aborted" && $(l, a("p", { class: "ks-error" }, g.error.message));
      return;
    }
    const { hits: y, embedder: _, mode: z } = g.data;
    c.textContent = `${z === "hybrid" ? "Смысловой поиск" : "Поиск по словам и опечаткам"} · ${_}`, $(
      l,
      y.length ? a("ul", { class: "ks-list ks-list-click" }, y.map((j) => {
        const F = P(
          a("span", null, D(k.kinds[j.kind] ?? j.kind, "info"), " ", j.title),
          j.snippet
        );
        return F.tabIndex = 0, F.setAttribute("role", "button"), F.addEventListener("click", () => m(j)), F.addEventListener("keydown", (f) => {
          (f.key === "Enter" || f.key === " ") && (f.preventDefault(), m(j));
        }), F;
      })) : O(`Ничего не нашлось по «${h}». Возможно, я этого ещё не запоминал.`)
    );
  }, b = et(() => void v(), 250);
  return o.addEventListener("input", () => b()), i.add(() => b.cancel()), i.add(() => u?.abort()), p(), $(e, a("div", { class: "ks-page" }, a("div", { class: "ks-card" }, o, r, c), l)), v(), B(t, i, ["items", "locations", "notes", "tasks", "calendar"], () => void v(), 500), U(i);
}
const Ze = (e) => e.split(/[\n,]/).map((n) => n.trim()).filter(Boolean), un = (e) => Array.isArray(e) ? e.join(", ") : "";
function mn(e) {
  let n = [];
  try {
    n = Intl.supportedValuesOf?.("timeZone") ?? [];
  } catch {
    n = [];
  }
  return n.length || (n = ["Europe/Moscow", "Europe/Kaliningrad", "Europe/Samara", "Asia/Yekaterinburg", "Asia/Novosibirsk", "Asia/Vladivostok", "UTC"]), e && !n.includes(e) && (n = [e, ...n]), [{ value: "", label: "Как на сервере" }, ...n.map((t) => ({ value: t, label: t }))];
}
function ee(e, n, ...t) {
  return a("section", { class: "ks-card dv-section-card" }, a("header", null, a("h2", null, e)), n ? a("p", { class: "ks-muted" }, n) : null, t);
}
function ce(e, n, t, i) {
  return pe(n, {
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
function pn(e, n) {
  const t = URL.createObjectURL(new Blob([JSON.stringify(n, null, 2)], { type: "application/json" })), i = a("a", { href: t, download: e });
  document.body.appendChild(i), i.click(), i.remove(), window.setTimeout(() => URL.revokeObjectURL(t), 1e4);
}
function fn(e, n, t) {
  const i = new I(), s = a("div"), o = R({
    host: s,
    load: async (r) => {
      const [l, c, d, u] = await Promise.all([
        T(t, "api/settings", void 0, r),
        T(t, "api/voice/status", void 0, r),
        T(t, "api/state", void 0, r),
        T(t, "api/backups", void 0, r)
      ]);
      return l.ok ? c.ok ? d.ok ? { ok: !0, data: { settings: l.data.settings, voice: c.data, state: d.data, backups: u.ok ? u.data.backups : [] } } : d : c : l;
    },
    render: ({ settings: r, voice: l, state: c, backups: d }, u) => {
      oe(c.timezone);
      const p = ee("Имя ассистента", "Так к нему обращаются и так он представляется в ответах. Имя распознаётся всегда; в «Других обращениях» можно добавить падежи, старое имя и ники.", ce(t, [
        { name: "identity_name", label: "Имя", required: !0, value: r.identity?.name ?? "Домовой", wide: !0 },
        { name: "identity_aliases", label: "Другие обращения", type: "textarea", rows: 3, value: un(r.identity?.aliases), hint: "Через запятую или с новой строки. Например: нейри, нейрия, нейрию. Для «домового» падежи уже добавлены.", wide: !0 }
      ], (y) => ({ identity: { name: String(y.identity_name).trim(), aliases: Ze(String(y.identity_aliases)) } }), u)), m = ee("Общие", null, ce(t, [
        { name: "timezone", label: "Часовой пояс", type: "select", options: mn(r.timezone), value: r.timezone, hint: `Сейчас на сервере: ${c.timezone}`, wide: !0 },
        { name: "default_reminder_hour", label: "Во сколько напоминать, если сказали только «завтра» (час)", type: "number", min: 0, max: 23, required: !0, value: r.default_reminder_hour, wide: !0 },
        { name: "default_event_minutes", label: "Длительность события по умолчанию, минут", type: "number", min: 5, max: 1440, required: !0, value: r.default_event_minutes, wide: !0 }
      ], (y) => ({ timezone: String(y.timezone), default_reminder_hour: Number(y.default_reminder_hour), default_event_minutes: Number(y.default_event_minutes) }), u)), v = ee("Насколько доверять пониманию команд", "Правила понимают привычные фразы сами. Если уверенность ниже порога — команда не выполняется, а ждёт вашего решения в «Проверке». Записи, предложенные языковой моделью, всегда идут на проверку, пока вы явно не разрешите иначе.", ce(t, [
        { name: "auto_apply_confidence", label: "Выполнять сразу при уверенности от (0–1)", type: "number", min: 0, max: 1, step: 0.05, required: !0, value: r.auto_apply_confidence, wide: !0 },
        { name: "review_confidence", label: "Отправлять на проверку от (ниже — переспрашивать)", type: "number", min: 0, max: 1, step: 0.05, required: !0, value: r.review_confidence, wide: !0 },
        { name: "ai_auto_apply", label: "Выполнять записи языковой модели без проверки (при уверенности от 0,9)", type: "checkbox", value: r.ai.auto_apply, hint: "Не рекомендуется: модель может ошибаться. Всё можно отменить в «Журнале», но лучше сначала посмотреть.", wide: !0 }
      ], (y) => ({ auto_apply_confidence: Number(y.auto_apply_confidence), review_confidence: Number(y.review_confidence), ai: { auto_apply: y.ai_auto_apply === !0 } }), u)), b = ee(
        "Голос",
        "Обращение по слову-триггеру работает и с колонками через Home Assistant, и с микрофоном киоска. Разговор без слова-триггера не сохраняется.",
        a("p", null, "Микрофон киоска: ", l.enabled ? D("включён", "good") : D("выключен", "neutral"), " ", l.stt_configured ? D("распознавание настроено", "good") : D("распознавание не настроено", "warn")),
        ce(t, [
          { name: "enabled", label: "Принимать голосовые команды с микрофона киоска", type: "checkbox", value: r.voice.enabled, wide: !0 },
          { name: "trigger_words", label: "Дополнительные слова-триггеры", value: (r.voice.trigger_words ?? []).join(", "), hint: "Можно оставить пустым: имя и «Другие обращения» уже работают. Сюда добавьте слова, которые не хотите вносить в имя.", wide: !0 },
          { name: "window_s", label: "После обращения слушать без повторного слова, секунд", type: "number", min: 5, max: 120, required: !0, value: r.voice.window_s, wide: !0 },
          { name: "reply", label: "Как отвечать", type: "select", options: [{ value: "speak", label: "Голосом через колонки" }, { value: "text", label: "Только текстом на экране" }], value: r.voice.reply, wide: !0 },
          { name: "room", label: "Комната этого микрофона", value: r.voice.room, hint: "Чтобы ответ прозвучал в ближайшей колонке.", wide: !0 },
          { name: "speak_enabled", label: "Озвучивать напоминания и ответы", type: "checkbox", value: r.speak.enabled, wide: !0 },
          { name: "quiet_from", label: "Тихие часы с", type: "time", value: r.speak.quiet_from },
          { name: "quiet_to", label: "до", type: "time", value: r.speak.quiet_to },
          { name: "fallback", label: "Если колонка не ответила", type: "select", options: [{ value: "telegram", label: "Написать в Telegram" }, { value: "ui", label: "Показать на экране" }, { value: "none", label: "Ничего" }], value: r.speak.fallback, wide: !0 }
        ], (y) => ({ voice: { enabled: y.enabled === !0, trigger_words: Ze(String(y.trigger_words)), window_s: Number(y.window_s), reply: y.reply, room: String(y.room).trim() }, speak: { enabled: y.speak_enabled === !0, quiet_from: String(y.quiet_from), quiet_to: String(y.quiet_to), fallback: y.fallback } }), u)
      ), h = ee("Сообщения", null, ce(t, [
        { name: "sandbox", label: "Тестовый режим: ничего не отправлять наружу (Telegram, HA-уведомления)", type: "checkbox", value: r.messaging.sandbox, hint: "Сообщения останутся в «Журнале → Отправка» — удобно проверять сценарии.", wide: !0 }
      ], (y) => ({ messaging: { sandbox: y.sandbox === !0 } }), u)), w = a("input", { type: "file", accept: "application/json,.json", hidden: !0 });
      w.addEventListener("change", async () => {
        const y = w.files?.[0];
        if (w.value = "", !y)
          return;
        let _;
        try {
          _ = JSON.parse(await y.text());
        } catch {
          C("Это не JSON-файл", "bad");
          return;
        }
        await it({ title: "Заменить все данные?", message: "Все текущие данные (вещи, места, заметки, задачи, напоминания, журнал) будут заменены содержимым файла. Перед этим я сделаю резервную копию.", confirmLabel: "Заменить", destructive: !0 }) && (await E(t, "data.import", { data: _ }, { success: "Данные импортированы" })).ok && u();
      });
      const g = ee(
        "Данные и резервные копии",
        `Версия ${c.version}. В базе: ${c.counts.items} вещей, ${c.counts.locations} мест, ${c.counts.notes} заметок. Пароли и токены в экспорт не попадают.`,
        a(
          "div",
          { class: "ks-row" },
          A("Сделать резервную копию", { variant: "primary", onClick: async () => {
            (await E(t, "backup.create", {}, { success: "Копия создана" })).ok && u();
          } }),
          A("Скачать экспорт (JSON)", { onClick: async () => {
            const y = await T(t, "api/export");
            y.ok ? pn(`domovoy-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, y.data) : C(y.error.message, "bad");
          } }),
          A("Импортировать…", { variant: "danger", onClick: () => w.click() }),
          w
        ),
        d.length ? a("ul", { class: "ks-list" }, d.slice(0, 8).map((y) => a("li", null, a("div", { class: "ks-grow" }, y.name, a("div", { class: "ks-sub" }, `${Math.max(1, Math.round(y.bytes / 1024))} КБ`))))) : O("Резервных копий пока нет — они создаются раз в сутки автоматически."),
        a("small", { class: "ks-muted" }, "Копии лежат в /config/kiosk-scene/domovoy/backups — они попадают и в общую резервную копию Home Assistant.")
      );
      return a("div", { class: "dv-stack" }, p, m, v, b, h, g);
    }
  });
  return $(e, a("div", { class: "ks-page" }, G(k.settings), s)), B(t, i, ["settings"], () => o.refresh(), 800, e), i.add(() => o.dispose()), U(i);
}
const kn = Object.entries(k.channels).map(([e, n]) => ({ value: e, label: n }));
function Ge(e, n, t, i) {
  const s = Z(), o = t?.kind ?? "time", r = t?.trigger ?? {}, l = o !== "time" && r.type === "state", c = r.window ? { window: r.window } : {};
  K(
    t ? "Изменить напоминание" : "Новое напоминание",
    [
      { name: "text", label: "О чём напомнить", required: !0, value: t?.text ?? "", wide: !0 },
      { name: "mode", label: "Когда", type: "select", options: [...l ? [{ value: "keep", label: "Условие устройства (не меняется)" }] : [], { value: "time", label: "В указанное время" }, { value: "presence", label: "Когда приду домой" }, { value: "room", label: "Когда зайду в комнату" }], value: l ? "keep" : o === "time" ? "time" : String(r.type ?? "presence") },
      { name: "due_at", label: "Дата и время", type: "datetime-local", value: t?.due_at ? ae(t.due_at, s) : "" },
      { name: "place", label: "Комната", value: r.place && r.type === "room" ? String(r.place) : "", hint: "Для «когда зайду в комнату»: как в настройках комнат, например «кухня»." },
      { name: "channel", label: "Как сообщить", type: "select", options: kn, value: t?.channel ?? "speak" },
      { name: "recipient", label: "Кому", type: "select", options: [{ value: "self", label: "Мне" }, ...n.filter((d) => !d.is_self).map((d) => ({ value: d.name, label: d.name }))], value: t?.recipient ?? "self" }
    ],
    async (d) => {
      const u = String(d.mode), p = { text: String(d.text).trim(), channel: d.channel, recipient: d.recipient };
      if (u !== "keep") if (u === "time") {
        if (!d.due_at)
          return { ok: !1, error: { code: "validation", message: "Укажите время", fields: { due_at: "Укажите время" } } };
        p.due_at = ie(String(d.due_at), s), p.trigger = null;
      } else if (u === "room") {
        if (!String(d.place).trim())
          return { ok: !1, error: { code: "validation", message: "Укажите комнату", fields: { place: "Укажите комнату" } } };
        p.trigger = { type: "room", place: String(d.place).trim(), require_transition: !0, ...c };
      } else {
        const v = await e.readData("domovoy.api", { path: "api/settings" }), b = v.ok ? v.data.settings.ha.person_entity : "";
        if (!b)
          return { ok: !1, error: { code: "validation", message: "Сначала укажите person-сущность в Интеграциях → Home Assistant." } };
        p.trigger = { type: "presence", person: b, place: "home", require_transition: !0, ...c };
      }
      const m = t ? await e.invokeAction("domovoy.actions", "reminders.update", { id: t.id, ...p }) : await e.invokeAction("domovoy.actions", "reminders.create", p);
      return m.ok && i(), m;
    }
  );
}
function Je(e, n, t, i) {
  K(
    n ? "Изменить задачу" : "Новая задача",
    [
      { name: "title", label: k.title, required: !0, value: n?.title ?? "", wide: !0 },
      { name: "list", label: "Список", type: "select", options: Object.entries(k.lists).map(([s, o]) => ({ value: s, label: o })), value: n?.list ?? t },
      { name: "due_date", label: "Срок", type: "date", value: n?.due_date ?? "" },
      { name: "notes", label: k.notes, type: "textarea", rows: 2, value: n?.notes ?? "", wide: !0 }
    ],
    async (s) => {
      const o = { title: String(s.title).trim(), list: s.list, due_date: s.due_date || null, notes: String(s.notes ?? "") }, r = n ? await e.invokeAction("domovoy.actions", "tasks.update", { id: n.id, ...o }) : await e.invokeAction("domovoy.actions", "tasks.create", o);
      return r.ok && i(), r;
    }
  );
}
function gn(e, n, t) {
  const i = new I(), s = a("div");
  let o = !1, r = [];
  const l = A("Напоминание", { variant: "primary" }), c = A("Задача", { variant: "secondary" }), d = ue({ name: "done", label: "Показывать выполненное", type: "checkbox", value: !1 }), u = R({
    host: s,
    load: async (p) => {
      const v = await ke(
        T(t, "api/reminders", { states: o ? "pending,fired,done,cancelled" : "pending,fired" }, p),
        T(t, "api/tasks", { include_done: o ? "1" : "0" }, p)
      );
      if (!v.ok)
        return v;
      const b = await T(t, "api/contacts", void 0, p);
      return { ok: !0, data: [v.data[0], v.data[1], b.ok ? b.data : { contacts: [] }] };
    },
    render: ([{ reminders: p }, { tasks: m }, v], b) => {
      r = v.contacts, l.onclick = () => Ge(t, r, null, b), c.onclick = () => Je(t, null, "tasks", b);
      const h = (g) => P(
        a("span", null, g.text, " ", ve(g.state)),
        `${g.kind === "time" && g.due_at ? `${L(g.due_at)}${g.state === "pending" ? ` (${Pe(g.due_at)})` : ""}` : dt(g.trigger)}${g.recurrence ? ` · ${he(g.recurrence)}` : ""} · ${k.channels[g.channel] ?? g.channel}${g.recipient && g.recipient !== "self" ? ` → ${g.recipient}` : ""}`,
        a(
          "div",
          { class: "ks-row" },
          g.state === "fired" || g.state === "pending" ? x("Готово", async () => {
            (await E(t, "reminders.done", { id: g.id })).ok && b();
          }, "primary") : null,
          g.state === "pending" || g.state === "fired" ? x("+10 мин", async () => {
            (await E(t, "reminders.snooze", { id: g.id, minutes: 10 })).ok && b();
          }) : null,
          g.state === "pending" ? x(k.edit, () => Ge(t, r, g, b)) : null,
          x(k.delete, async () => {
            (await E(t, "reminders.delete", { id: g.id }, { confirm: { title: "Удалить напоминание", message: `«${g.text}»` } })).ok && b();
          }, "danger")
        ),
        g.state === "fired" ? "dv-fired" : ""
      ), w = (g) => {
        const y = m.filter((_) => _.list === g);
        return y.length ? a("ul", { class: "ks-list" }, y.map(
          (_) => P(
            a("span", { class: _.done ? "dv-done" : "" }, _.title),
            [_.due_date ? `срок ${_.due_date}` : "", _.recurrence ? he(_.recurrence) : "", _.notes].filter(Boolean).join(" · "),
            a(
              "div",
              { class: "ks-row" },
              x(_.done ? "Вернуть" : g === "shopping" ? "Куплено" : "Готово", async () => {
                (await E(t, "tasks.complete", { id: _.id, done: !_.done })).ok && b();
              }, _.done ? "secondary" : "primary"),
              x(k.edit, () => Je(t, _, g, b)),
              x(k.delete, async () => {
                (await E(t, "tasks.delete", { id: _.id }, { confirm: { title: "Удалить задачу", message: `«${_.title}»` } })).ok && b();
              }, "danger")
            )
          )
        )) : O();
      };
      return a(
        "div",
        { class: "ks-grid" },
        M("Напоминания", p.length ? a("ul", { class: "ks-list" }, p.map(h)) : O("Напоминаний нет.")),
        M(k.lists.tasks, w("tasks")),
        M(k.lists.shopping, w("shopping")),
        M(k.lists.chores, w("chores"))
      );
    }
  });
  return d.input.addEventListener("change", () => {
    o = d.input.checked, u.refresh();
  }), $(e, a("div", { class: "ks-page" }, G(k.tasks, l, c), a("div", { class: "ks-card ks-filters" }, d.el), s)), B(t, i, ["reminders", "tasks", "contacts"], () => u.refresh()), i.add(() => u.dispose()), U(i);
}
function Xe(e) {
  let n = 0;
  for (let t = 0; t < e.length; t += 1)
    n += e[t] * e[t];
  return Math.sqrt(n / Math.max(1, e.length));
}
class bn {
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
    const t = [], i = n.length / this.o.sampleRate * 1e3, s = Xe(n), o = Math.max(this.o.minRms, this.noise * this.o.ratio), r = s >= o;
    if (this.state === "idle")
      return this.calibrated ? (this.noise = s < this.noise ? this.noise * 0.9 + s * 0.1 : this.noise * 0.995 + s * 5e-3, this.keepPreroll(n), this.loudMs = r ? this.loudMs + i : 0, this.loudMs >= this.o.startMs && (this.state = "speech", this.quietMs = 0, this.chunks = [...this.preroll], this.samples = this.prerollSamples, this.preroll = [], this.prerollSamples = 0, t.push({ type: "start" })), t) : (this.calibSum += s, this.calibFrames += 1, this.calibMs += i, this.calibMs >= this.o.calibrateMs && (this.noise = Math.max(2e-3, this.calibSum / this.calibFrames), this.calibrated = !0), this.keepPreroll(n), t);
    this.chunks.push(n), this.samples += n.length, this.quietMs = r ? 0 : this.quietMs + i;
    const l = this.samples / this.o.sampleRate * 1e3, c = l >= this.o.maxMs && this.quietMs < this.o.hangoverMs;
    if (this.quietMs >= this.o.hangoverMs || c) {
      const d = l - this.quietMs, u = this.collect(), p = Xe(u);
      this.reset(), c ? (this.noise = Math.max(this.noise, p), t.push({ type: "discard", reason: "continuous" })) : t.push(d < this.o.minMs ? { type: "discard", reason: "short" } : { type: "end", samples: u, durationMs: l });
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
function hn(e, n, t) {
  if (t >= n)
    return e;
  const i = n / t, s = Math.floor(e.length / i), o = new Float32Array(s);
  for (let r = 0; r < s; r += 1) {
    const l = Math.floor(r * i), c = Math.min(e.length, Math.floor((r + 1) * i));
    let d = 0;
    for (let u = l; u < c; u += 1)
      d += e[u];
    o[r] = c > l ? d / (c - l) : 0;
  }
  return o;
}
function vn(e, n) {
  const t = new Uint8Array(44 + e.length * 2), i = new DataView(t.buffer), s = (o, r) => {
    for (let l = 0; l < r.length; l += 1)
      i.setUint8(o + l, r.charCodeAt(l));
  };
  s(0, "RIFF"), i.setUint32(4, 36 + e.length * 2, !0), s(8, "WAVE"), s(12, "fmt "), i.setUint32(16, 16, !0), i.setUint16(20, 1, !0), i.setUint16(22, 1, !0), i.setUint32(24, n, !0), i.setUint32(28, n * 2, !0), i.setUint16(32, 2, !0), i.setUint16(34, 16, !0), s(36, "data"), i.setUint32(40, e.length * 2, !0);
  for (let o = 0; o < e.length; o += 1) {
    const r = Math.max(-1, Math.min(1, e[o]));
    i.setInt16(44 + o * 2, r < 0 ? r * 32768 : r * 32767, !0);
  }
  return t;
}
function yn() {
  return typeof navigator > "u" || !navigator.mediaDevices?.getUserMedia ? window.isSecureContext === !1 ? "Браузер разрешает микрофон только на https:// или localhost. Откройте киоск по HTTPS или добавьте адрес в исключения браузера." : "В этом браузере нет доступа к микрофону." : null;
}
function wn(e) {
  let n = null, t = null, i = null, s = null, o = null, r = !1, l = !1, c = !1, d = 0, u = !1, p;
  const m = (h) => e.onState(h), v = (h, w = 0) => {
    window.clearTimeout(p), w > 0 ? (m(h), p = window.setTimeout(() => l && !r && m({ kind: "listening" }), w)) : m(h);
  }, b = async (h, w) => {
    if (!u) {
      u = !0, m({ kind: "sending" });
      try {
        const g = vn(hn(h, w, 16e3), Math.min(w, 16e3)), y = await e.http.request("api/voice/command", {
          method: "POST",
          rawBody: new Blob([g.buffer], { type: "audio/wav" }),
          headers: { "Content-Type": "audio/wav", "X-Room": e.room },
          timeoutMs: 3e4
        });
        if (!l)
          return;
        y.ok ? y.data.handled && y.data.reply ? v({ kind: "heard", reply: y.data.reply, status: y.data.status ?? "" }, 6e3) : v({ kind: "listening" }) : v({ kind: "unavailable", reason: y.error.message }, 6e3);
      } finally {
        u = !1;
      }
    }
  };
  return {
    get muted() {
      return r;
    },
    async start() {
      if (l || c)
        return;
      const h = yn();
      if (h && !e.mediaDevices) {
        m({ kind: "unavailable", reason: h });
        return;
      }
      const w = d;
      c = !0, m({ kind: "starting" });
      let g;
      try {
        g = await (e.mediaDevices ?? navigator.mediaDevices).getUserMedia({ audio: { channelCount: 1, echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 } });
      } catch (_) {
        if (c = !1, w !== d)
          return;
        const z = _?.name;
        m({ kind: "unavailable", reason: z === "NotAllowedError" ? "Доступ к микрофону запрещён в браузере." : z === "NotFoundError" ? "Микрофон не найден." : "Не удалось открыть микрофон." });
        return;
      }
      if (w !== d) {
        g.getTracks().forEach((_) => _.stop()), c = !1;
        return;
      }
      if (n = g, t = e.audioContextFactory ? e.audioContextFactory() : new AudioContext(), t.state === "suspended") {
        const _ = () => void t?.resume().catch(() => {
        });
        _(), document.addEventListener("pointerdown", _, { once: !0 });
      }
      const y = t.sampleRate;
      o = new bn({ sampleRate: y }), s = t.createMediaStreamSource(n), i = t.createScriptProcessor(4096, 1, 1), i.onaudioprocess = (_) => {
        if (r || !l || !o)
          return;
        const z = new Float32Array(_.inputBuffer.getChannelData(0));
        for (const j of o.push(z))
          j.type === "start" ? m({ kind: "hearing" }) : j.type === "discard" ? m({ kind: "listening" }) : b(j.samples, y);
      }, s.connect(i), i.connect(t.destination), l = !0, c = !1, n.getAudioTracks().forEach((_) => {
        _.enabled = !r;
      }), m(r ? { kind: "muted" } : { kind: "listening" });
    },
    stop() {
      d += 1, c = !1, l = !1, window.clearTimeout(p), i?.disconnect(), s?.disconnect(), i && (i.onaudioprocess = null), n?.getTracks().forEach((h) => h.stop()), t?.close().catch(() => {
      }), n = t = i = s = null, o = null, m({ kind: "off" });
    },
    setMuted(h) {
      r = h, o?.reset(), n?.getAudioTracks().forEach((w) => {
        w.enabled = !h;
      }), m(h ? { kind: "muted" } : l ? { kind: "listening" } : c ? { kind: "starting" } : { kind: "off" });
    }
  };
}
const xn = {
  starting: "Запуск микрофона…",
  hearing: "Слышу…",
  sending: "Разбираю…",
  muted: "Микрофон выключен"
};
function _n(e) {
  const n = a("span", { class: "dv-mic-dot", "aria-hidden": "true" }), t = a("span", { class: "dv-mic-label" }), i = a("button", { class: "dv-mic", type: "button", "aria-live": "polite", title: "Включить или выключить микрофон", dataset: { noSwipe: "true" }, onClick: e }, n, t);
  let s = "домовой", o = null;
  const r = (l) => {
    o = l, i.dataset.state = l.kind, i.hidden = l.kind === "off", t.textContent = l.kind === "unavailable" ? l.reason : l.kind === "heard" ? l.reply : l.kind === "listening" ? `Слушаю: скажите «${s} …»` : xn[l.kind] ?? "";
  };
  return {
    el: i,
    render: r,
    setName(l) {
      s = l.trim() || "домовой", o && r(o);
    }
  };
}
function Sn(e) {
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
        const i = typeof t.room == "string" ? String(t.room) : "", s = _n(() => o.setMuted(!o.muted));
        s.el.hidden = !0, document.body.appendChild(s.el), n.readData("domovoy.api", { path: "api/settings" }).then((r) => {
          const l = r.ok ? r.data?.settings?.identity?.name : "";
          typeof l == "string" && l.trim() && s.setName(l);
        });
        const o = wn({ http: e, room: i, onState: s.render });
        return o.start(), () => {
          o.stop(), s.el.remove();
        };
      }
    }
  ];
}
const $n = `
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
      const r = new I(), l = a("div", { class: `ks-scope dv-widget ${e.replace(".", "-")}`, dataset: { noSwipe: "true", theme: "kiosk" } });
      $(i, l);
      let c = s;
      const d = R({
        host: l,
        load: (p) => T(o, "api/today", void 0, p),
        render: (p, m) => (oe(p.timezone), t(p, m, c, o))
      });
      B(o, r, ["calendar", "reminders", "tasks"], () => d.refresh(), 400);
      const u = window.setInterval(() => d.refresh(), 6e4);
      return r.add(() => window.clearInterval(u)), r.add(() => d.dispose()), {
        update(p) {
          c = p, d.refresh();
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
const Tn = [
  Te("domovoy.next-event", "Ближайшее событие", (e) => {
    const [n] = Ae(e).filter((s) => !s.all_day), [t] = Ae(e).filter((s) => s.all_day && J(s.start, e.timezone) === J(e.now, e.timezone)), i = n ?? t;
    return i ? a("div", { class: "dv-next" }, a("div", { class: "dv-next-when" }, i.all_day ? "сегодня" : `${se(i.start, e.timezone)} · ${Pe(i.start, new Date(e.now).getTime())}`), a("div", { class: "dv-next-title" }, i.title), i.location ? a("div", { class: "ks-muted" }, i.location) : null) : a("div", { class: "dv-next" }, a("div", { class: "ks-muted" }, "Ближайших событий нет"));
  }),
  Te("domovoy.today", "Сегодня", (e, n, t) => {
    const i = Ae(e).slice(0, $e(t.maxEvents, 4, 10)), s = e.reminders.slice(0, $e(t.maxReminders, 4, 10));
    return a(
      "div",
      { class: "dv-today-widget" },
      i.length ? a("ul", { class: "ks-list" }, i.map((o) => a("li", null, a("span", { class: "dv-time" }, o.all_day ? "весь день" : se(o.start, e.timezone)), " ", o.title))) : O("Событий нет"),
      s.length ? a("ul", { class: "ks-list dv-reminders" }, s.map((o) => a("li", { class: o.state === "fired" ? "dv-fired" : "" }, "🔔 ", o.text))) : null,
      e.review_count ? a("div", { class: "ks-muted" }, `Ждёт проверки: ${e.review_count}`) : null
    );
  }),
  Te("domovoy.shopping", "Покупки", (e, n, t, i) => {
    const s = e.shopping.slice(0, $e(t.max, 8, 30));
    return s.length ? a("ul", { class: "ks-list dv-shopping" }, s.map((o) => a("li", null, a("span", { class: "ks-grow" }, o.title), x("✓", async () => {
      (await E(i, "tasks.complete", { id: o.id })).ok && n();
    }, "ghost", "Куплено")))) : O("Список покупок пуст");
  }),
  {
    id: "domovoy.command",
    title: "Командная строка",
    mount(e, n, t) {
      const i = new I(), s = a("div", { class: "ks-scope dv-widget", dataset: { noSwipe: "true", theme: "kiosk" } }, ze(t, () => t.refresh()));
      return $(e, s), U(i);
    }
  }
];
let Ee = !1, Qe = 0;
function An(e) {
  if (Ee || Date.now() < Qe)
    return;
  Ee = !0, fe("Нужен токен доступа", (t) => {
    const i = pe([{ name: "token", label: "API-токен", type: "password", required: !0, wide: !0 }], {
      submitLabel: k.save,
      extraActions: [A(k.cancel, { onClick: () => t(!1) })],
      onSubmit: (s) => {
        e(String(s.token).trim()), t(!0), window.location.reload();
      }
    });
    return a("div", null, a("p", null, "Сервер просит подтвердить, что это вы. Введите токен из раздела «Интеграции → Доступ» (или откройте страницу из панели Home Assistant — там токен не нужен)."), i.el);
  }).closed.then((t) => {
    Ee = !1, t !== !0 && (Qe = Date.now() + 5 * 6e4);
  });
}
const En = [
  { id: "domovoy.today", title: k.today, icon: "🏠", modes: ["admin", "kiosk"], order: 10, mount: on },
  { id: "domovoy.search", title: k.search, icon: "🔎", modes: ["admin"], order: 20, mount: cn },
  { id: "domovoy.inventory", title: k.inventory, icon: "📦", modes: ["admin"], order: 30, group: "Дом", mount: en },
  { id: "domovoy.locations", title: k.locations, icon: "🗄️", modes: ["admin"], order: 40, group: "Дом", mount: nn },
  { id: "domovoy.calendar", title: k.calendar, icon: "📅", modes: ["admin"], order: 50, group: "Планы", mount: Vt },
  { id: "domovoy.tasks", title: k.tasks, icon: "✅", modes: ["admin"], order: 60, group: "Планы", mount: gn },
  { id: "domovoy.memory", title: k.memory, icon: "🧠", modes: ["admin"], order: 70, group: "Дом", mount: rn },
  { id: "domovoy.review", title: k.review, icon: "🛡️", modes: ["admin"], order: 80, group: "Домовой", mount: dn },
  { id: "domovoy.activity", title: k.activity, icon: "📜", modes: ["admin"], order: 90, group: "Домовой", mount: Ft },
  { id: "domovoy.integrations", title: k.integrations, icon: "🔌", modes: ["admin"], order: 100, group: "Домовой", mount: Qt },
  { id: "domovoy.settings", title: k.settings, icon: "⚙️", modes: ["admin"], order: 110, group: "Домовой", mount: fn }
], Cn = {
  manifest: { id: "domovoy", title: "Домовой", version: "0.1.0", apiVersion: qt },
  activate(e) {
    const n = typeof e.config.apiBase == "string" && e.config.apiBase ? e.config.apiBase : "../domovoy-api/";
    if (new URL(n, window.location.href).origin !== window.location.origin)
      throw new Error("Domovoy: apiBase must be on the same origin as the page");
    Ct({ retry: k.retry, cancel: k.cancel, confirm: k.confirm, save: k.save, close: k.close, required: "Обязательное поле", loading: k.loading, nothingHere: k.empty, olderData: "Показаны прежние данные", renderFailed: "Не удалось показать этот раздел." }), Re("domovoy-ui-kit", Dt), Re("domovoy-ui", $n);
    const t = /\/admin\.html$/.test(window.location.pathname), i = Pt({ baseUrl: n, onUnauthorized: () => {
      t && An(Mt);
    } });
    i.http.request("api/state").then((s) => {
      s.ok && s.data.timezone && oe(s.data.timezone);
    }), e.registerDataProvider(i.data), e.registerActionProvider(i.actions), e.registerRealtimeSource(At({ id: be, http: i.http, waitSeconds: 25, pauseWhenHidden: !0 }));
    for (const s of En)
      e.registerPage(s);
    for (const s of Tn)
      e.registerWidget(s);
    for (const s of Sn(i.http))
      e.registerService(s);
  }
};
export {
  En as PAGES,
  Tn as WIDGETS,
  Cn as default
};
