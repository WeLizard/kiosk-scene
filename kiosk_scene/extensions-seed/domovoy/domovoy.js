function Ee(e, a) {
  for (const t of a)
    t == null || t === !1 || (Array.isArray(t) ? Ee(e, t) : t instanceof Node ? e.appendChild(t) : e.appendChild(document.createTextNode(String(t))));
}
function n(e, a, ...t) {
  const s = document.createElement(e);
  for (const [o, i] of Object.entries(a ?? {}))
    if (!(i == null || i === !1))
      if (o === "class")
        s.className = String(i);
      else if (o === "style")
        typeof i == "string" ? s.setAttribute("style", i) : Object.assign(s.style, i);
      else if (o === "dataset")
        for (const [r, d] of Object.entries(i))
          d !== void 0 && (s.dataset[r] = String(d));
      else if (o === "aria")
        for (const [r, d] of Object.entries(i))
          d !== void 0 && s.setAttribute(`aria-${r}`, String(d));
      else o.startsWith("on") && typeof i == "function" ? s.addEventListener(o.slice(2).toLowerCase(), i) : o === "value" || o === "checked" || o === "disabled" || o === "selected" ? s[o] = i : i === !0 ? s.setAttribute(o, "") : s.setAttribute(o, String(i));
  return Ee(s, t), s;
}
function ct(e) {
  for (; e.firstChild; )
    e.removeChild(e.firstChild);
}
function x(e, ...a) {
  ct(e), Ee(e, a);
}
class I {
  callbacks = [];
  disposed = !1;
  add(a) {
    if (this.disposed) {
      a();
      return;
    }
    this.callbacks.push(a);
  }
  listen(a, t, s) {
    a.addEventListener(t, s), this.add(() => a.removeEventListener(t, s));
  }
  get isDisposed() {
    return this.disposed;
  }
  dispose() {
    if (!this.disposed) {
      this.disposed = !0;
      for (const a of this.callbacks.splice(0).reverse())
        try {
          a();
        } catch {
        }
    }
  }
}
function We(e, a) {
  let t = null;
  const s = (...o) => {
    t && clearTimeout(t), t = setTimeout(() => {
      t = null, e(...o);
    }, a);
  };
  return s.cancel = () => {
    t && (clearTimeout(t), t = null);
  }, s;
}
function ut(e) {
  return e.endsWith("/") ? e : `${e}/`;
}
function mt(e, a) {
  const t = a && typeof a == "object" ? a : {}, o = (t.error && typeof t.error == "object" ? t.error : null) ?? t, i = typeof o.message == "string" ? o.message : typeof t.error == "string" ? t.error : `Request failed (HTTP ${e})`, r = o.fields && typeof o.fields == "object" ? Object.fromEntries(Object.entries(o.fields).map(([d, u]) => [d, String(u)])) : void 0;
  return {
    code: typeof o.code == "string" ? o.code : `http_${e}`,
    message: i,
    fields: r,
    retryable: e >= 500 || e === 429 || e === 408
  };
}
function pt(e) {
  const a = e.fetchImpl ?? ((...i) => globalThis.fetch(...i)), t = ut(e.baseUrl);
  function s(i, r) {
    const d = new URL(i.replace(/^\/+/, ""), new URL(t, globalThis.location?.href ?? "http://localhost/"));
    for (const [u, l] of Object.entries(r ?? {}))
      l != null && l !== "" && d.searchParams.set(u, String(l));
    return d.toString();
  }
  async function o(i, r = {}) {
    const d = new AbortController(), u = r.timeoutMs ?? e.timeoutMs ?? 15e3, l = setTimeout(() => d.abort(new DOMException("Request timed out", "TimeoutError")), u), c = () => d.abort(r.signal?.reason);
    r.signal?.addEventListener("abort", c, { once: !0 }), r.signal?.aborted && c();
    try {
      const p = { Accept: "application/json", ...e.headers ?? {}, ...r.headers ?? {} }, m = e.getToken?.();
      m && (p.Authorization = `Bearer ${m}`);
      let g;
      r.rawBody !== void 0 ? g = r.rawBody : r.body !== void 0 && (p["Content-Type"] = "application/json", g = JSON.stringify(r.body));
      const v = await a(s(i, r.query), {
        method: r.method ?? (g === void 0 ? "GET" : "POST"),
        headers: p,
        body: g,
        cache: "no-store",
        signal: d.signal
      });
      let h = null;
      const y = await v.text();
      if (y)
        try {
          h = JSON.parse(y);
        } catch {
          h = { message: y.slice(0, 200) };
        }
      if (!v.ok) {
        const f = mt(v.status, h);
        return v.status === 401 && e.onUnauthorized?.(f), { ok: !1, error: f };
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
      clearTimeout(l), r.signal?.removeEventListener("abort", c);
    }
  }
  return { request: o, url: s };
}
const Se = "*";
function ft(e, a) {
  return e === Se || a === e || a.startsWith(`${e}.`);
}
function kt(e) {
  const a = e.path ?? "events", t = e.waitSeconds ?? 25, s = (e.graceSeconds ?? 10) * 1e3, o = e.minBackoffMs ?? 1e3, i = e.maxBackoffMs ?? 3e4, r = e.random ?? Math.random, d = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set();
  let l = "connecting", c = null, p = !1, m = !1, g = 0, v = null, h = null, y = !1;
  function f(E) {
    if (l !== E) {
      l = E;
      for (const R of Array.from(u))
        R(E);
    }
  }
  function j(E) {
    for (const [R, C] of Array.from(d.entries()))
      if (!(!ft(R, E.topic) && E.topic !== Se))
        for (const Z of Array.from(C))
          try {
            Z(E);
          } catch {
          }
  }
  function A(E) {
    return new Promise((R) => {
      const C = () => {
        clearTimeout(Z), h = null, R();
      }, Z = setTimeout(C, E);
      h = C;
    });
  }
  const b = () => {
    typeof document > "u" || document.hidden || (y = !0, !p && !m && e.pauseWhenHidden !== !1 && z(), h?.(), v?.abort(new DOMException("resume", "AbortError")));
  };
  async function T() {
    p = !0;
    try {
      for (; !m && !(e.pauseWhenHidden !== !1 && typeof document < "u" && document.hidden); ) {
        v = new AbortController();
        const E = setTimeout(() => v?.abort(new DOMException("poll timeout", "TimeoutError")), t * 1e3 + s), R = await e.http.request(a, {
          query: { since: c ?? void 0, timeout: c === null ? 0 : t },
          signal: v.signal,
          timeoutMs: t * 1e3 + s
        });
        if (clearTimeout(E), v = null, m)
          break;
        if (!R.ok) {
          if (R.error.code === "aborted")
            continue;
          g += 1, f(g >= 3 ? "offline" : "reconnecting");
          const Y = Math.min(i, o * 2 ** Math.min(g - 1, 10));
          await A(Y / 2 + r() * (Y / 2)), y = !0;
          continue;
        }
        const C = R.data, Z = c;
        c = typeof C.cursor == "number" ? C.cursor : c;
        const dt = g > 0;
        g = 0, f("live"), (C.reset || y || dt) && ((Z !== null || C.reset) && j({ topic: Se, payload: { resync: !0, reset: C.reset === !0 }, cursor: c ?? void 0 }), y = !1);
        for (const Y of C.events ?? [])
          j({ topic: Y.topic, payload: Y.payload, cursor: Y.seq });
      }
    } finally {
      p = !1;
    }
  }
  function z() {
    p || m || (typeof document < "u" && e.pauseWhenHidden !== !1 && (document.removeEventListener("visibilitychange", b), document.addEventListener("visibilitychange", b)), T());
  }
  return {
    id: e.id,
    status: () => l,
    start: z,
    subscribe(E, R) {
      let C = d.get(E);
      return C || (C = /* @__PURE__ */ new Set(), d.set(E, C)), C.add(R), !p && !m && z(), () => {
        C?.delete(R), C && C.size === 0 && d.delete(E);
      };
    },
    onStatus(E) {
      return u.add(E), () => u.delete(E);
    },
    close() {
      m = !0, v?.abort(new DOMException("closed", "AbortError")), h?.(), typeof document < "u" && document.removeEventListener("visibilitychange", b), d.clear(), u.clear();
    }
  };
}
const bt = {
  retry: "Retry",
  cancel: "Cancel",
  confirm: "Confirm",
  save: "Save",
  close: "Close",
  required: "Required",
  loading: "Loading…",
  nothingHere: "Nothing here yet",
  olderData: "Showing older data"
};
let U = { ...bt };
function vt(e) {
  U = { ...U, ...e };
}
function S(e, a = {}) {
  return n(
    "button",
    {
      class: `ks-btn ks-btn-${a.variant ?? "secondary"}`,
      type: a.type ?? "button",
      disabled: a.disabled,
      title: a.title,
      onClick: a.onClick
    },
    e
  );
}
function q(e, a = "neutral") {
  return n("span", { class: `ks-badge ks-badge-${a}` }, e);
}
function Ke(e, a, t) {
  return n("div", { class: "ks-empty" }, n("strong", null, e), a ? n("p", null, a) : null, t);
}
function Ge(e = U.loading) {
  return n("div", { class: "ks-loading", role: "status", aria: { live: "polite" } }, n("span", { class: "ks-spinner", aria: { hidden: !0 } }), e);
}
function gt(e, a) {
  return n(
    "div",
    { class: "ks-error", role: "alert" },
    n("strong", null, e.message),
    e.code ? n("small", null, e.code) : null,
    a && e.retryable !== !1 ? S(U.retry, { onClick: a }) : null
  );
}
let Je = 0;
function se(e) {
  const a = `ks-field-${Je += 1}`, t = e.type ?? "text";
  let s;
  if (t === "textarea")
    s = n("textarea", { id: a, name: e.name, rows: e.rows ?? 3, placeholder: e.placeholder, required: e.required, value: String(e.value ?? "") });
  else if (t === "select") {
    const d = n(
      "select",
      { id: a, name: e.name, required: e.required },
      (e.options ?? []).map((u) => n("option", { value: u.value, selected: String(e.value ?? "") === u.value }, u.label))
    );
    d.value = String(e.value ?? e.options?.[0]?.value ?? ""), s = d;
  } else t === "checkbox" ? s = n("input", { id: a, name: e.name, type: "checkbox", checked: e.value === !0 }) : s = n("input", {
    id: a,
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
  const o = n("small", { class: "ks-field-error", id: `${a}-error`, role: "alert" }), i = n("label", { for: a }, e.label, e.required ? n("span", { class: "ks-required", aria: { hidden: !0 } }, " *") : null), r = n(
    "div",
    { class: `ks-field${t === "checkbox" ? " ks-field-check" : ""}${e.wide ? " ks-field-wide" : ""}` },
    t === "checkbox" ? [s, i] : [i, s],
    e.hint ? n("small", { class: "ks-field-hint" }, e.hint) : null,
    o
  );
  return {
    el: r,
    input: s,
    name: e.name,
    value: () => t === "checkbox" ? s.checked : s.value,
    setError(d) {
      o.textContent = d ?? "", r.classList.toggle("has-error", !!d), d ? (s.setAttribute("aria-invalid", "true"), s.setAttribute("aria-describedby", o.id)) : (s.removeAttribute("aria-invalid"), s.removeAttribute("aria-describedby"));
    }
  };
}
function re(e, a) {
  const t = Object.fromEntries(e.map((d) => [d.name, se(d)])), s = n("div", { class: "ks-form-error", role: "alert", hidden: !0 }), o = S(a.submitLabel ?? U.save, { variant: "primary", type: "submit" }), i = n("form", { class: "ks-form", novalidate: !0 }, s, n("div", { class: "ks-form-grid" }, Object.values(t).map((d) => d.el)), n("div", { class: "ks-form-actions" }, o, a.extraActions)), r = {
    el: i,
    fields: t,
    values: () => Object.fromEntries(Object.values(t).map((d) => [d.name, d.value()])),
    showErrors(d) {
      for (const l of Object.values(t))
        l.setError(d?.fields?.[l.name] ?? null);
      const u = d && (!d.fields || Object.keys(d.fields).length === 0) ? d.message : "";
      s.textContent = u, s.hidden = !u;
    },
    setBusy(d) {
      o.disabled = d, i.toggleAttribute("aria-busy", d);
    }
  };
  return i.addEventListener("submit", (d) => {
    d.preventDefault();
    let u = !0;
    for (const l of e) {
      const c = t[l.name].value();
      l.required && (c === "" || c === !1) ? (t[l.name].setError(U.required), u = !1) : t[l.name].setError(null);
    }
    u && (r.showErrors(null), r.setBusy(!0), Promise.resolve(a.onSubmit(r.values(), r)).finally(() => r.setBusy(!1)));
  }), r;
}
function Ce(e, a, t) {
  return a.length ? n(
    "div",
    { class: "ks-table-wrap" },
    n(
      "table",
      { class: "ks-table" },
      n("thead", null, n("tr", null, e.map((s) => n("th", { scope: "col", class: s.className }, s.header)))),
      n("tbody", null, a.map((s) => n("tr", null, e.map((o) => n("td", { class: o.className, dataset: { label: o.header } }, o.render(s))))))
    )
  ) : t ?? Ke(U.nothingHere);
}
function le(e, a) {
  const t = document.activeElement;
  let s = () => {
  };
  const o = new Promise((m) => {
    s = m;
  }), i = new I(), r = (m) => {
    i.isDisposed || (i.dispose(), c.remove(), t?.focus?.(), s(m));
  }, d = typeof a == "function" ? a(r) : a, u = `ks-dialog-title-${Je += 1}`, l = n(
    "div",
    { class: "ks-dialog", role: "dialog", aria: { modal: !0, labelledby: u }, tabindex: -1 },
    n("div", { class: "ks-dialog-head" }, n("h2", { id: u }, e), S("×", { variant: "ghost", title: U.close, onClick: () => r(void 0) })),
    n("div", { class: "ks-dialog-body" }, d)
  ), c = n("div", { class: "ks-overlay" }, l);
  c.addEventListener("mousedown", (m) => {
    m.target === c && r(void 0);
  });
  const p = (m) => {
    if (m.key === "Escape") {
      m.stopPropagation(), r(void 0);
      return;
    }
    if (m.key === "Tab") {
      const g = Array.from(l.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")).filter((y) => !y.hasAttribute("disabled"));
      if (!g.length) {
        m.preventDefault();
        return;
      }
      const v = g[0], h = g[g.length - 1];
      m.shiftKey && document.activeElement === v ? (m.preventDefault(), h.focus()) : !m.shiftKey && document.activeElement === h && (m.preventDefault(), v.focus());
    }
  };
  return document.addEventListener("keydown", p, !0), i.add(() => document.removeEventListener("keydown", p, !0)), document.body.appendChild(c), (l.querySelector("input, select, textarea, button.ks-btn-primary") ?? l).focus(), { el: c, close: r, closed: o };
}
function Ze(e) {
  return le(
    e.title,
    (t) => n(
      "div",
      { class: "ks-confirm" },
      n("p", null, e.message),
      n(
        "div",
        { class: "ks-form-actions" },
        S(U.cancel, { onClick: () => t(!1) }),
        S(e.confirmLabel ?? U.confirm, { variant: e.destructive ? "danger" : "primary", onClick: () => t(!0) })
      )
    )
  ).closed.then((t) => t === !0);
}
let te = null;
function P(e, a = "neutral", t = 4500) {
  (!te || !te.isConnected) && (te = n("div", { class: "ks-toasts", role: "status", aria: { live: "polite" } }), document.body.appendChild(te));
  const s = n("div", { class: `ks-toast ks-toast-${a}` }, e);
  te.appendChild(s), setTimeout(() => s.remove(), t);
}
function N(e) {
  let a = 0, t = null, s = !1, o = !1;
  const i = n("div", { class: "ks-stale-banner", role: "alert", hidden: !0 }), r = n("div", { class: "ks-async-content" });
  x(e.host, i, r);
  const d = () => {
    if (o)
      return;
    t?.abort(), t = new AbortController();
    const u = a += 1;
    (!s || e.keepStale === !1) && x(r, Ge()), e.load(t.signal).then((l) => {
      if (!(o || u !== a)) {
        if (l.ok) {
          s = !0, i.hidden = !0, x(r, e.render(l.data, d));
          return;
        }
        l.error.code !== "aborted" && (s ? (i.hidden = !1, x(i, `${U.olderData} — ${l.error.message} `, S(U.retry, { variant: "ghost", onClick: d }))) : x(r, gt(l.error, d)));
      }
    });
  };
  return d(), {
    refresh: d,
    dispose() {
      o = !0, t?.abort();
    }
  };
}
function Me(e, a) {
  if (typeof document > "u" || document.getElementById(e))
    return;
  const t = document.createElement("style");
  t.id = e, t.textContent = a, document.head.appendChild(t);
}
const ht = 1, yt = '.ks-admin,.ks-dialog,.ks-toasts,.ks-scope{--ks-bg: #f5f7f9;--ks-surface: #ffffff;--ks-surface-2: #eef2f5;--ks-border: #d5dde4;--ks-text: #1c2833;--ks-muted: #5c6b78;--ks-accent: #2464a8;--ks-accent-text: #ffffff;--ks-good: #1f7a4d;--ks-warn: #9a6100;--ks-bad: #b3261e;--ks-info: #2464a8;--ks-radius: 10px;--ks-shadow: 0 1px 2px rgba(20, 30, 40, .06), 0 4px 14px rgba(20, 30, 40, .06);--ks-font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;font-family:var(--ks-font);color:var(--ks-text)}@media(prefers-color-scheme:dark){.ks-admin,.ks-dialog,.ks-toasts,.ks-scope:not([data-theme=kiosk]){--ks-bg: #12181e;--ks-surface: #1a222a;--ks-surface-2: #222c36;--ks-border: #33404c;--ks-text: #e6ecf1;--ks-muted: #96a5b2;--ks-accent: #5b9be0;--ks-accent-text: #0b1620;--ks-good: #5cc493;--ks-warn: #e0a84a;--ks-bad: #f08a83;--ks-info: #5b9be0;--ks-shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 4px 14px rgba(0, 0, 0, .35)}}.ks-admin *,.ks-dialog *,.ks-toasts *,.ks-scope *{box-sizing:border-box}.ks-scope[data-theme=kiosk]{--ks-bg: transparent;--ks-surface: rgba(255, 255, 255, .72);--ks-surface-2: rgba(32, 48, 65, .06);--ks-border: rgba(32, 48, 65, .12);--ks-text: #203041;--ks-muted: rgba(32, 48, 65, .66)}.ks-admin{display:grid;grid-template-columns:232px minmax(0,1fr);min-height:100vh;min-height:100dvh;background:var(--ks-bg);font-size:15px;line-height:1.45}.ks-sidebar{position:sticky;top:0;height:100vh;height:100dvh;display:flex;flex-direction:column;gap:8px;padding:16px 12px;background:var(--ks-surface);border-right:1px solid var(--ks-border);overflow-y:auto}.ks-brand{padding:4px 10px 12px;font-weight:700;font-size:17px;letter-spacing:-.01em}.ks-nav-list{display:flex;flex-direction:column;gap:2px}.ks-nav-group{margin:12px 10px 4px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ks-muted)}.ks-nav-item,.ks-bottom-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;color:var(--ks-text);text-decoration:none;min-height:40px}.ks-nav-item:hover{background:var(--ks-surface-2)}.ks-nav-item[aria-current=page]{background:color-mix(in srgb,var(--ks-accent) 14%,transparent);color:var(--ks-accent);font-weight:600}.ks-nav-icon{width:22px;text-align:center;flex:none}.ks-nav-footer{margin-top:auto;display:flex;flex-direction:column;gap:2px;padding-top:12px;border-top:1px solid var(--ks-border)}.ks-nav-footer-link{padding:6px 10px;color:var(--ks-muted);text-decoration:none;font-size:13px}.ks-content{min-width:0;display:flex;flex-direction:column}.ks-topbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;padding:12px 20px;background:color-mix(in srgb,var(--ks-bg) 88%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--ks-border)}.ks-topbar-title{margin:0;font-size:20px;font-weight:700;letter-spacing:-.01em;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ks-menu-button,.ks-bottom-nav,.ks-scrim{display:none}.ks-main-view{flex:1;padding:20px;outline:none;max-width:1200px;width:100%}.ks-conn{font-size:12px;padding:3px 10px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-muted);white-space:nowrap}.ks-conn[data-state=live]{color:var(--ks-good)}.ks-conn[data-state=reconnecting],.ks-conn[data-state=connecting]{color:var(--ks-warn)}.ks-conn[data-state=offline]{color:var(--ks-bad);border-color:var(--ks-bad)}@media(max-width:899px){.ks-admin{display:block;padding-bottom:64px}.ks-sidebar{position:fixed;inset:0 auto 0 0;z-index:30;width:min(84vw,300px);transform:translate(-102%);transition:transform .18s ease;box-shadow:var(--ks-shadow)}.ks-admin[data-menu=open] .ks-sidebar{transform:none}.ks-admin[data-menu=open] .ks-scrim{display:block;position:fixed;inset:0;z-index:20;background:#0006}.ks-menu-button{display:inline-flex}.ks-topbar{padding:10px 12px}.ks-topbar-title{font-size:17px}.ks-main-view{padding:14px 12px}.ks-bottom-nav{position:fixed;inset:auto 0 0;z-index:10;display:grid;grid-auto-flow:column;grid-auto-columns:1fr;background:var(--ks-surface);border-top:1px solid var(--ks-border);padding-bottom:env(safe-area-inset-bottom,0)}.ks-bottom-item{flex-direction:column;gap:2px;justify-content:center;padding:8px 4px;font-size:11px;border-radius:0;min-height:56px;color:var(--ks-muted)}.ks-bottom-item[aria-current=page]{color:var(--ks-accent);font-weight:600}.ks-bottom-item .ks-nav-label{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.ks-page{display:flex;flex-direction:column;gap:16px}.ks-card{background:var(--ks-surface);border:1px solid var(--ks-border);border-radius:var(--ks-radius);padding:16px;box-shadow:var(--ks-shadow);min-width:0}.ks-card>h2,.ks-card>header>h2{margin:0 0 10px;font-size:15px;font-weight:700}.ks-card>header{display:flex;align-items:center;justify-content:space-between;gap:8px}.ks-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}.ks-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ks-row-spread{justify-content:space-between}.ks-toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.ks-toolbar .ks-grow{flex:1;min-width:180px}.ks-muted{color:var(--ks-muted)}.ks-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}.ks-list>li{display:flex;align-items:center;gap:10px;padding:9px 2px;border-bottom:1px solid var(--ks-border);min-width:0}.ks-list>li:last-child{border-bottom:0}.ks-list .ks-grow{flex:1;min-width:0}.ks-list .ks-title{font-weight:600;overflow-wrap:anywhere}.ks-list .ks-sub{color:var(--ks-muted);font-size:13px;overflow-wrap:anywhere}.ks-done{text-decoration:line-through;color:var(--ks-muted)}.ks-tree{list-style:none;margin:0;padding-left:18px;border-left:1px dashed var(--ks-border)}.ks-tree.ks-tree-root{padding-left:0;border-left:0}.ks-tree-node{padding:3px 0}.ks-btn{font:inherit;font-size:14px;min-height:38px;padding:0 14px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer;touch-action:manipulation}.ks-btn:hover:not(:disabled){background:var(--ks-surface-2)}.ks-btn:focus-visible,.ks-field input:focus-visible,.ks-field select:focus-visible,.ks-field textarea:focus-visible,.ks-nav-item:focus-visible,.ks-bottom-item:focus-visible{outline:2px solid var(--ks-accent);outline-offset:1px}.ks-btn:disabled{opacity:.55;cursor:default}.ks-btn-primary{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text);font-weight:600}.ks-btn-primary:hover:not(:disabled){background:color-mix(in srgb,var(--ks-accent) 88%,black)}.ks-btn-danger{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 50%,var(--ks-border))}.ks-btn-ghost{border-color:transparent;background:transparent}.ks-btn-sm{min-height:30px;padding:0 10px;font-size:13px}.ks-form{display:flex;flex-direction:column;gap:12px}.ks-form-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}.ks-form-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}.ks-form-error,.ks-field-error{color:var(--ks-bad);font-size:13px}.ks-field{display:flex;flex-direction:column;gap:4px;min-width:0}.ks-field-wide{grid-column:1 / -1}.ks-field label{font-size:13px;font-weight:600;color:var(--ks-muted)}.ks-field input:not([type=checkbox]),.ks-field select,.ks-field textarea,.ks-input{font:inherit;font-size:16px;width:100%;min-height:40px;padding:8px 10px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text)}.ks-field-check{flex-direction:row;align-items:center;gap:8px}.ks-field.has-error input,.ks-field.has-error select,.ks-field.has-error textarea{border-color:var(--ks-bad)}.ks-field-hint{color:var(--ks-muted);font-size:12px}.ks-required{color:var(--ks-bad)}.ks-badge{display:inline-block;padding:1px 8px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid var(--ks-border);background:var(--ks-surface-2);color:var(--ks-muted);white-space:nowrap}.ks-badge-good{color:var(--ks-good);border-color:color-mix(in srgb,var(--ks-good) 40%,var(--ks-border))}.ks-badge-warn{color:var(--ks-warn);border-color:color-mix(in srgb,var(--ks-warn) 40%,var(--ks-border))}.ks-badge-bad{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 40%,var(--ks-border))}.ks-badge-info{color:var(--ks-info);border-color:color-mix(in srgb,var(--ks-info) 40%,var(--ks-border))}.ks-empty,.ks-loading,.ks-error{padding:28px 16px;text-align:center;color:var(--ks-muted)}.ks-empty strong,.ks-error strong{display:block;color:var(--ks-text);margin-bottom:4px}.ks-error{color:var(--ks-bad);display:flex;flex-direction:column;align-items:center;gap:8px}.ks-spinner{display:inline-block;width:16px;height:16px;margin-right:8px;vertical-align:-3px;border:2px solid var(--ks-border);border-top-color:var(--ks-accent);border-radius:50%;animation:ks-spin .8s linear infinite}@keyframes ks-spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.ks-spinner{animation-duration:3s}}.ks-stale-banner{padding:8px 12px;margin-bottom:10px;border-radius:8px;background:color-mix(in srgb,var(--ks-warn) 14%,var(--ks-surface));color:var(--ks-warn);font-size:13px}.ks-table-wrap{overflow-x:auto}.ks-table{width:100%;border-collapse:collapse;font-size:14px}.ks-table th,.ks-table td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--ks-border);vertical-align:top}.ks-table th{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--ks-muted)}@media(max-width:640px){.ks-table thead{display:none}.ks-table,.ks-table tbody,.ks-table tr,.ks-table td{display:block;width:100%}.ks-table tr{padding:8px 0;border-bottom:1px solid var(--ks-border)}.ks-table td{border:0;padding:2px 4px}.ks-table td:before{content:attr(data-label) ": ";color:var(--ks-muted);font-size:12px}.ks-table td[data-label=""]:before{content:none}}.ks-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;background:#00000073}.ks-dialog{width:min(560px,100%);max-height:92vh;overflow:auto;background:var(--ks-surface);border-radius:14px;box-shadow:var(--ks-shadow);border:1px solid var(--ks-border)}.ks-dialog-head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--ks-border)}.ks-dialog-head h2{margin:0;font-size:16px}.ks-dialog-body{padding:16px}.ks-toasts{position:fixed;z-index:120;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;max-width:min(360px,calc(100vw - 32px))}.ks-toast{padding:10px 14px;border-radius:10px;background:var(--ks-text);color:var(--ks-bg);box-shadow:var(--ks-shadow);font-size:14px}.ks-toast-good{background:var(--ks-good);color:#fff}.ks-toast-bad{background:var(--ks-bad);color:#fff}@media(max-width:899px){.ks-toasts{bottom:72px}}.ks-chip{font:inherit;font-size:14px;min-height:34px;padding:4px 12px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer}.ks-chip.is-active{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text)}.ks-link{font:inherit;padding:0;border:0;background:none;color:var(--ks-accent);cursor:pointer;text-align:left;text-decoration:underline;text-underline-offset:2px}.ks-filters{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end}.ks-filters .ks-field{flex:1 1 200px;min-width:0}.ks-list-click>li{cursor:pointer}.ks-list-click>li:hover,.ks-list-click>li:focus-visible{background:var(--ks-surface-2);outline:none}@media(max-width:640px){.ks-hide-narrow{display:none}}', wt = yt, Ye = "domovoy.api", Xe = "domovoy.actions", pe = "domovoy.events", V = (e, a = ["id"]) => Object.fromEntries(Object.entries(e).filter(([t]) => !a.includes(t))), B = (e) => (a) => `${e}/${encodeURIComponent(String(a.id))}`, De = {
  "command.send": { title: "Отправить команду", method: "POST", path: () => "api/command", body: (e) => e },
  "command.undo": { title: "Отменить команду", method: "POST", path: (e) => `api/commands/${e.id}/undo`, body: () => ({}) },
  "items.create": { title: "Добавить предмет", method: "POST", path: () => "api/items", body: (e) => e },
  "items.update": { title: "Изменить предмет", method: "PATCH", path: B("api/items"), body: (e) => V(e) },
  "items.delete": { title: "Удалить предмет", method: "DELETE", path: B("api/items"), destructive: !0 },
  "items.move": { title: "Переместить предмет", method: "POST", path: (e) => `api/items/${e.id}/move`, body: (e) => V(e) },
  "items.consume": { title: "Списать", method: "POST", path: (e) => `api/items/${e.id}/consume`, body: (e) => V(e) },
  "locations.create": { title: "Добавить место", method: "POST", path: () => "api/locations", body: (e) => e },
  "locations.update": { title: "Изменить место", method: "PATCH", path: B("api/locations"), body: (e) => V(e) },
  "locations.delete": { title: "Удалить место", method: "DELETE", path: B("api/locations"), destructive: !0 },
  "notes.create": { title: "Добавить заметку", method: "POST", path: () => "api/notes", body: (e) => e },
  "notes.update": { title: "Изменить заметку", method: "PATCH", path: B("api/notes"), body: (e) => V(e) },
  "notes.delete": { title: "Удалить заметку", method: "DELETE", path: B("api/notes"), destructive: !0 },
  "tasks.create": { title: "Добавить задачу", method: "POST", path: () => "api/tasks", body: (e) => e },
  "tasks.update": { title: "Изменить задачу", method: "PATCH", path: B("api/tasks"), body: (e) => V(e) },
  "tasks.complete": { title: "Отметить задачу", method: "POST", path: (e) => `api/tasks/${e.id}/complete`, body: (e) => ({ done: e.done ?? !0 }) },
  "tasks.delete": { title: "Удалить задачу", method: "DELETE", path: B("api/tasks"), destructive: !0 },
  "reminders.create": { title: "Добавить напоминание", method: "POST", path: () => "api/reminders", body: (e) => e },
  "reminders.update": { title: "Изменить напоминание", method: "PATCH", path: B("api/reminders"), body: (e) => V(e) },
  "reminders.done": { title: "Напоминание выполнено", method: "POST", path: (e) => `api/reminders/${e.id}/done`, body: () => ({}) },
  "reminders.snooze": { title: "Отложить напоминание", method: "POST", path: (e) => `api/reminders/${e.id}/snooze`, body: (e) => ({ minutes: e.minutes }) },
  "reminders.delete": { title: "Удалить напоминание", method: "DELETE", path: B("api/reminders"), destructive: !0 },
  "calendar.create": { title: "Добавить событие", method: "POST", path: () => "api/calendar/events", body: (e) => e },
  "calendar.update": { title: "Изменить событие", method: "PATCH", path: () => "api/calendar/event", body: (e) => V(e, ["ref"]), query: (e) => ({ ref: e.ref }) },
  "calendar.delete": { title: "Удалить событие", method: "DELETE", path: () => "api/calendar/event", query: (e) => ({ ref: e.ref }), destructive: !0 },
  "contacts.create": { title: "Добавить контакт", method: "POST", path: () => "api/contacts", body: (e) => e },
  "contacts.update": { title: "Изменить контакт", method: "PATCH", path: B("api/contacts"), body: (e) => V(e) },
  "contacts.delete": { title: "Удалить контакт", method: "DELETE", path: B("api/contacts"), destructive: !0 },
  "contacts.link": { title: "Привязать Telegram", method: "POST", path: () => "api/contacts/link", body: (e) => e },
  "review.approve": { title: "Подтвердить", method: "POST", path: (e) => `api/review/${e.id}/approve`, body: (e) => e.proposal ? { proposal: e.proposal } : {} },
  "review.reject": { title: "Отклонить", method: "POST", path: (e) => `api/review/${e.id}/reject`, body: () => ({}) },
  "audit.undo": { title: "Отменить изменение", method: "POST", path: (e) => `api/audit/${e.id}/undo`, body: (e) => ({ force: !!e.force }) },
  "outbox.retry": { title: "Повторить отправку", method: "POST", path: (e) => `api/outbox/${e.id}/retry`, body: () => ({}) },
  "outbox.cancel": { title: "Отменить отправку", method: "POST", path: (e) => `api/outbox/${e.id}/cancel`, body: () => ({}) },
  "settings.update": { title: "Сохранить настройки", method: "PUT", path: () => "api/settings", body: (e) => e },
  "secrets.set": { title: "Сохранить секрет", method: "PUT", path: () => "api/integrations/secrets", body: (e) => e },
  "integration.test": { title: "Проверить интеграцию", method: "POST", path: (e) => `api/integrations/${e.name}/test`, body: () => ({}) },
  "security.rotate": { title: "Сменить секрет", method: "POST", path: () => "api/security/rotate", body: (e) => ({ name: e.name }), destructive: !0 },
  "backup.create": { title: "Сделать резервную копию", method: "POST", path: () => "api/backup", body: () => ({}) },
  "data.import": { title: "Импортировать данные", method: "POST", path: () => "api/import", body: (e) => e.data, destructive: !0 },
  "voice.text": { title: "Голосовая команда (текст)", method: "POST", path: () => "api/voice/command", body: (e) => e }
}, $e = "domovoy.token";
function xt() {
  try {
    return window.localStorage.getItem($e);
  } catch {
    return null;
  }
}
function _t(e) {
  try {
    e ? window.localStorage.setItem($e, e) : window.localStorage.removeItem($e);
  } catch {
  }
}
function St(e) {
  const a = pt({
    baseUrl: e.baseUrl,
    fetchImpl: e.fetchImpl,
    getToken: xt,
    // The custom header is what turns a cross-site form post into something the server refuses (CSRF defence).
    headers: { "X-Domovoy-Client": "kiosk-scene" },
    onUnauthorized: () => e.onUnauthorized?.(),
    timeoutMs: 2e4
  });
  return { http: a, data: {
    id: Ye,
    async read(o, i) {
      const r = String(o?.path ?? "");
      return /^(api\/|events)/.test(r) ? a.request(r, { query: o.query, signal: i?.signal }) : { ok: !1, error: { code: "bad_path", message: `Refusing to read ${r}` } };
    }
  }, actions: {
    id: Xe,
    describe() {
      return Object.entries(De).map(([o, i]) => ({ id: o, title: i.title, destructive: i.destructive }));
    },
    async invoke(o, i, r) {
      const d = De[o];
      if (!d)
        return { ok: !1, error: { code: "unknown_action", message: `Unknown action ${o}` } };
      const u = i ?? {};
      return a.request(d.path(u), {
        method: d.method,
        body: d.body ? d.body(u) : void 0,
        query: d.query?.(u),
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
function X(e) {
  return k.statuses[e] ?? e;
}
function ie(e) {
  return ["applied", "answered", "done", "sent", "ok", "approved"].includes(e) ? "good" : ["clarify", "review", "pending", "queued", "sending", "partial", "degraded", "fired"].includes(e) ? "warn" : ["failed", "rejected", "down", "cancelled"].includes(e) ? "bad" : "neutral";
}
const Pe = ["ui", "telegram", "speak", "ha_notify"], ge = ["tasks", "shopping", "chores"], ve = {
  add_item: { title: "Запомнить вещь", fields: [{ name: "name", label: "Название", kind: "str" }, { name: "quantity", label: "Количество", kind: "num" }, { name: "unit", label: "Ед.", kind: "str" }, { name: "location_path", label: "Место (через →)", kind: "path" }, { name: "notes", label: "Заметки", kind: "str" }, { name: "mode", label: "Количество", kind: "enum", options: ["set", "add"] }] },
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
  create_reminder: { title: "Напоминание", fields: [{ name: "text", label: "О чём", kind: "str" }, { name: "when", label: "Когда", kind: "iso" }, { name: "channel", label: "Как", kind: "enum", options: Pe }, { name: "recipient", label: "Кому", kind: "str" }, { name: "trigger", label: "Условие", kind: "json" }, { name: "recurrence", label: "Повтор", kind: "json" }] },
  create_event: { title: "Событие в календаре", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "start", label: "Начало", kind: "iso" }, { name: "end", label: "Конец", kind: "iso" }, { name: "location", label: "Где", kind: "str" }] },
  update_event: { title: "Перенести/изменить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }, { name: "new_title", label: "Новое название", kind: "str" }, { name: "new_start", label: "Новое начало", kind: "iso" }, { name: "new_end", label: "Новый конец", kind: "iso" }] },
  delete_event: { title: "Удалить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }] },
  query_calendar: { title: "Что в календаре", fields: [{ name: "start", label: "С", kind: "iso" }, { name: "end", label: "По", kind: "iso" }] },
  send_message: { title: "Сообщение", fields: [{ name: "recipient", label: "Кому", kind: "str" }, { name: "text", label: "Текст", kind: "str" }, { name: "channel", label: "Как", kind: "enum", options: Pe }, { name: "when", label: "Когда", kind: "iso" }] },
  add_task: { title: "Задача", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: ge }, { name: "due_date", label: "Срок (ГГГГ-ММ-ДД)", kind: "str" }] },
  add_shopping: { title: "В список покупок", fields: [{ name: "items", label: "Что купить (через запятую)", kind: "list" }] },
  complete_task: { title: "Отметить задачу", fields: [{ name: "title", label: "Какая", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: ge }] },
  query_tasks: { title: "Показать задачи", fields: [{ name: "list", label: "Список", kind: "enum", options: ge }] },
  ha_control: { title: "Управление домом", fields: [{ name: "service", label: "Сервис", kind: "str" }, { name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }, { name: "data", label: "Параметры", kind: "json" }] },
  ha_query: { title: "Состояние устройства", fields: [{ name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }] },
  clarify: { title: "Вопрос", fields: [{ name: "question", label: "Вопрос", kind: "str" }] },
  undo: { title: "Отмена последнего", fields: [] },
  help: { title: "Справка", fields: [] }
};
function $t(e) {
  return ve[e]?.title ?? e;
}
function Qe(e, a) {
  return a == null ? "" : e.kind === "path" ? Array.isArray(a) ? a.join(" → ") : String(a) : e.kind === "list" ? Array.isArray(a) ? a.join(", ") : String(a) : e.kind === "json" ? JSON.stringify(a) : e.kind === "bool" ? a ? "да" : "нет" : String(a);
}
function et(e, a = (t) => t) {
  const t = ve[String(e.type)];
  if (!t)
    return String(e.type);
  const s = t.fields.filter((o) => e[o.name] !== void 0 && e[o.name] !== null && e[o.name] !== "" && e[o.name] !== !1).map((o) => `${o.label.replace(/ \(.*\)$/, "")}: ${o.kind === "iso" ? a(String(e[o.name])) : Qe(o, e[o.name])}`);
  return s.length ? `${t.title} — ${s.join("; ")}` : t.title;
}
function Tt(e, a, t) {
  const s = ve[String(e.type)], o = { ...e };
  for (const i of s?.fields ?? []) {
    if (!(i.name in a) || i.kind === "json")
      continue;
    const r = a[i.name];
    if (i.kind === "bool") {
      r === !0 ? o[i.name] = !0 : delete o[i.name];
      continue;
    }
    const d = String(r).trim();
    if (!d)
      delete o[i.name];
    else if (i.kind === "num") {
      const u = Number(d.replace(",", "."));
      o[i.name] = Number.isFinite(u) ? u : d;
    } else i.kind === "path" ? o[i.name] = d.split(/→|->|>/).map((u) => u.trim()).filter(Boolean) : i.kind === "list" ? o[i.name] = d.split(",").map((u) => u.trim()).filter(Boolean) : i.kind === "iso" ? o[i.name] = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(d) ? t(d) : d : o[i.name] = d;
  }
  return o;
}
let tt = "";
function de(e) {
  tt = e;
}
function J() {
  return tt || Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function at(e, a) {
  const t = new Intl.DateTimeFormat("en-CA", {
    timeZone: a,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  return Object.fromEntries(t.formatToParts(e).map((s) => [s.type, s.value]));
}
function fe(e, a = J()) {
  const t = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(e);
  if (!t)
    throw new Error(`Invalid local time: ${e}`);
  const [s, o, i, r, d] = t.slice(1).map(Number), u = Date.UTC(s, o - 1, i, r, d);
  let l = u;
  for (let c = 0; c < 2; c += 1) {
    const p = at(new Date(l), a), m = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute));
    l += u - m;
  }
  return new Date(l).toISOString().replace(/\.\d{3}Z$/, "Z");
}
function Q(e, a = J()) {
  const t = at(new Date(e), a);
  return `${t.year}-${t.month}-${t.day}T${t.hour}:${t.minute}`;
}
function L(e, a = J()) {
  return e ? new Intl.DateTimeFormat("ru-RU", { timeZone: a, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(e)) : "—";
}
function ee(e, a = J()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: a, hour: "2-digit", minute: "2-digit" }).format(new Date(e));
}
function At(e, a = J()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: a, weekday: "long", day: "numeric", month: "long" }).format(new Date(e));
}
function oe(e, a = J()) {
  return Q(e, a).slice(0, 10);
}
function Oe(e, a = Date.now()) {
  const t = new Date(e).getTime() - a, s = Math.abs(t), o = Math.round(s / 6e4), i = o < 1 ? "сейчас" : o < 60 ? `${o} мин` : o < 2880 ? `${Math.round(o / 60)} ч` : `${Math.round(o / 1440)} дн`;
  return o < 1 ? i : t < 0 ? `${i} назад` : `через ${i}`;
}
function nt(e) {
  if (!e)
    return "";
  const a = e.window ? ` (${e.window.from}–${e.window.to})` : "";
  return e.type === "presence" ? `когда буду дома${a}` : e.type === "room" ? `когда зайду: ${e.place}${a}` : e.type === "state" ? `когда ${e.entity_id} ${e.from ? `перестанет быть «${e.from}»` : `станет «${e.to}»`}` : "по условию";
}
function ke(e) {
  if (!e)
    return "";
  const a = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"], t = e.interval > 1 ? `каждые ${e.interval} ` : "каждый ";
  return e.freq === "weekly" && e.byweekday?.length ? `по ${e.byweekday.map((s) => a[s]).join(", ")}` : { daily: `${t}день`, weekly: `${t}неделю`, monthly: `${t}месяц`, yearly: `${t}год` }[e.freq] ?? "повторяется";
}
function qe(e, a = "") {
  return e == null ? "" : `${Number.isInteger(e) ? String(e) : String(Math.round(e * 1e3) / 1e3)} ${a}`.trim();
}
function _(e, a, t, s) {
  return e.readData(Ye, { path: a, query: t }, { signal: s });
}
function st(e, a, t) {
  return e.invokeAction(Xe, a, t);
}
async function $(e, a, t, s = {}) {
  if (s.confirm && !await Ze({ title: s.confirm.title, message: s.confirm.message, confirmLabel: s.confirm.label ?? k.delete, destructive: !0 }))
    return { ok: !1, error: { code: "cancelled", message: "cancelled" } };
  const o = await st(e, a, t);
  return o.ok ? s.success && P(s.success, "good") : P(o.error.message, "bad", 7e3), o;
}
function H(e, a, t, s, o = 250, i) {
  let r = !1;
  const d = () => {
    const c = document.activeElement;
    return !!(i && c && i.contains(c) && /^(INPUT|TEXTAREA|SELECT)$/.test(c.tagName));
  }, u = () => {
    if (d()) {
      r = !0;
      return;
    }
    r = !1, s();
  }, l = We(u, o);
  if (a.add(() => l.cancel()), i) {
    const c = () => {
      r && window.setTimeout(() => {
        r && !d() && u();
      }, 0);
    };
    i.addEventListener("focusout", c), a.add(() => i.removeEventListener("focusout", c));
  }
  for (const c of t)
    a.add(e.subscribe(pe, c, () => l()));
}
function F(e, a) {
  return {
    dispose() {
      e.dispose();
    }
  };
}
function M(e, a, t) {
  return n("section", { class: "ks-card" }, n("header", null, n("h2", null, e), null), a);
}
function be(e) {
  return q(X(e), ie(e));
}
function D(e, a, t, s = "") {
  return n("li", { class: s }, n("div", { class: "ks-grow" }, n("div", { class: "ks-title" }, e), a ? n("div", { class: "ks-sub" }, a) : null), t ?? null);
}
function w(e, a, t = "secondary", s) {
  const o = S(e, { variant: t, onClick: a, title: s });
  return o.classList.add("ks-btn-sm"), o;
}
function K(e, ...a) {
  return n("div", { class: "ks-row ks-row-spread dv-head" }, n("h2", { class: "dv-page-title" }, e), n("div", { class: "ks-row" }, a));
}
function O(e = k.empty) {
  return n("p", { class: "ks-muted" }, e);
}
function W(e, a, t, s = {}) {
  return le(e, (i) => {
    const r = re(a, {
      submitLabel: s.submitLabel ?? k.save,
      extraActions: [S(k.cancel, { onClick: () => i(!1) })],
      onSubmit: async (d, u) => {
        const l = await t(d);
        l.ok ? i(!0) : u.showErrors(l.error);
      }
    });
    return n("div", null, s.note ?? null, r.el);
  }).closed.then((i) => i === !0);
}
function Et(e) {
  const a = {};
  for (const t of e.split(/\r?\n/)) {
    const s = t.indexOf(":"), o = (s >= 0 ? t.slice(0, s) : t).trim(), i = s >= 0 ? t.slice(s + 1).trim() : "";
    o && (a[o] = i);
  }
  return a;
}
function Ct(e) {
  return Object.entries(e ?? {}).map(([a, t]) => `${a}: ${t}`).join(`
`);
}
function Ot(e) {
  return e.split(/→|->|>|\//).map((a) => a.trim()).filter(Boolean);
}
function qt(e) {
  if (typeof e != "string" || e.trim() === "")
    return null;
  const a = Number(e.replace(",", "."));
  return Number.isFinite(a) ? a : null;
}
async function ce(e, a) {
  const [t, s] = await Promise.all([e, a]);
  return t.ok ? s.ok ? { ok: !0, data: [t.data, s.data] } : s : t;
}
const jt = [["audit", "Изменения"], ["commands", "Команды"], ["outbox", "Отправка сообщений"]];
function Mt(e, a, t) {
  const s = new I(), o = n("div"), i = n("div", { class: "ks-row dv-chips", role: "tablist" });
  let r = "audit", d = null;
  const u = () => {
    d?.dispose(), x(i, jt.map(
      ([c, p]) => n("button", { type: "button", role: "tab", class: `ks-chip${r === c ? " is-active" : ""}`, "aria-selected": String(r === c), onClick: () => {
        r = c, u();
      } }, p)
    )), r === "audit" ? d = N({
      host: o,
      load: (c) => _(t, "api/audit", { limit: 100 }, c),
      render: ({ audit: c }, p) => c.length ? n("ul", { class: "ks-list" }, c.map(
        (m) => D(
          n("span", null, m.summary, " ", q(m.source, "neutral")),
          `${L(m.ts)} · ${m.actor}`,
          m.undoable ? w(k.undo, async () => {
            (await $(t, "audit.undo", { id: m.id }, { success: "Отменено" })).ok && p();
          }, "ghost") : null
        )
      )) : O("Изменений пока не было.")
    }) : r === "commands" ? d = N({
      host: o,
      load: (c) => _(t, "api/commands", { limit: 100 }, c),
      render: ({ commands: c }) => c.length ? n("ul", { class: "ks-list" }, c.map(
        (p) => D(
          n("span", null, `«${p.text}»`, " ", l(p.status)),
          [L(p.ts), p.frontend, p.interpreter ?? "", p.confidence !== null ? `${Math.round(p.confidence * 100)}%` : "", p.reply ?? p.error ?? ""].filter(Boolean).join(" · "),
          p.intents?.length ? n("details", null, n("summary", null, "Как я понял"), n("ul", null, p.intents.map((m) => n("li", null, et(m, (g) => L(g)))))) : null
        )
      )) : O("Команд пока не было.")
    }) : d = N({
      host: o,
      load: (c) => _(t, "api/outbox", { limit: 100 }, c),
      render: ({ messages: c }, p) => c.length ? n("ul", { class: "ks-list" }, c.map(
        (m) => D(
          n("span", null, m.text, " ", be(m.status)),
          `${k.channels[m.channel] ?? m.channel} → ${m.recipient || "—"} · ${L(m.created_at)}${m.attempts ? ` · попыток: ${m.attempts}` : ""}${m.last_error ? ` · ${m.last_error}` : ""}`,
          n(
            "div",
            { class: "ks-row" },
            m.status === "failed" || m.status === "queued" ? w("Повторить", async () => {
              (await $(t, "outbox.retry", { id: m.id })).ok && p();
            }, "primary") : null,
            m.status === "failed" || m.status === "queued" ? w(k.cancel, async () => {
              (await $(t, "outbox.cancel", { id: m.id })).ok && p();
            }, "danger") : null
          )
        )
      )) : O("Исходящих сообщений не было.")
    });
  }, l = (c) => be(c);
  return u(), x(e, n("div", { class: "ks-page" }, K(k.activity), i, M("", o))), H(t, s, ["audit", "commands", "outbox", "items", "locations", "notes", "tasks", "reminders", "calendar"], () => d?.refresh(), 500), s.add(() => d?.dispose()), F(s);
}
function Le(e, a, t, s) {
  const o = J(), i = Q(t ? t.start : new Date(Math.ceil(Date.now() / 36e5) * 36e5).toISOString(), o), r = t ? Q(t.end, o) : "", d = a.sources.filter((u) => u.capabilities.includes("create") && u.available);
  W(
    t ? `Изменить: ${t.title}` : "Новое событие",
    [
      { name: "title", label: k.title, required: !0, value: t?.title ?? "", wide: !0 },
      { name: "start", label: "Начало", type: "datetime-local", required: !0, value: i },
      { name: "end", label: "Конец", type: "datetime-local", value: r, hint: "Пусто — по умолчанию из настроек." },
      { name: "all_day", label: "Весь день", type: "checkbox", value: t?.all_day ?? !1 },
      { name: "location", label: "Где", value: t?.location ?? "", wide: !0 },
      { name: "notes", label: k.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 },
      ...t ? [] : [{ name: "calendar", label: "Календарь", type: "select", options: d.map((u) => ({ value: u.id, label: u.title })), value: a.default }]
    ],
    async (u) => {
      const l = {
        title: String(u.title).trim(),
        start: fe(String(u.start), o),
        all_day: u.all_day === !0,
        location: String(u.location ?? ""),
        notes: String(u.notes ?? "")
      };
      u.end && (l.end = fe(String(u.end), o));
      const c = t ? await e.invokeAction("domovoy.actions", "calendar.update", { ref: t.ref, ...l }) : await e.invokeAction("domovoy.actions", "calendar.create", { ...l, calendar: u.calendar });
      return c.ok && s(), c;
    }
  );
}
function Dt(e, a, t) {
  const s = new I(), o = n("div");
  let i = 14, r = { sources: [], default: "local" };
  const d = S(k.add, { variant: "primary" }), u = S("Показать ещё 2 недели", { variant: "ghost" }), l = N({
    host: o,
    load: (c) => {
      const p = /* @__PURE__ */ new Date();
      p.setHours(0, 0, 0, 0);
      const m = new Date(p.getTime() + i * 864e5);
      return ce(
        _(t, "api/calendar/events", { start: p.toISOString(), end: m.toISOString() }, c),
        _(t, "api/calendar/sources", void 0, c)
      );
    },
    render: ([{ events: c, warnings: p }, m], g) => {
      r = m, d.onclick = () => Le(t, r, null, g);
      const v = /* @__PURE__ */ new Map();
      for (const h of c) {
        const y = oe(h.start);
        v.set(y, [...v.get(y) ?? [], h]);
      }
      return n(
        "div",
        null,
        p.length ? n("div", { class: "ks-stale-banner", role: "alert" }, `Не удалось прочитать календарь: ${p.map((h) => `${h.source} (${h.message})`).join("; ")}. Показано то, что доступно.`) : null,
        v.size ? [...v.entries()].sort(([h], [y]) => h.localeCompare(y)).map(
          ([h, y]) => n(
            "section",
            { class: "ks-card" },
            n("header", null, n("h2", null, At(y[0].start))),
            n("ul", { class: "ks-list" }, y.sort((f, j) => f.start.localeCompare(j.start)).map(
              (f) => D(
                n("span", null, f.title, f.recurring ? n("span", { class: "ks-muted" }, " ↻") : null, f.read_only ? [" ", q("только чтение", "neutral")] : null),
                `${f.all_day ? "весь день" : `${ee(f.start)}–${ee(f.end)}`}${f.location ? ` · ${f.location}` : ""} · ${f.calendar}`,
                f.read_only ? null : n(
                  "div",
                  { class: "ks-row" },
                  w(k.edit, () => Le(t, r, f, g)),
                  w(k.delete, async () => {
                    (await $(t, "calendar.delete", { ref: f.ref }, { confirm: { title: "Удалить событие", message: `«${f.title}» будет удалено из календаря.` } })).ok && g();
                  }, "danger")
                )
              )
            ))
          )
        ) : O(`На ближайшие ${i} дней событий нет.`)
      );
    }
  });
  return u.onclick = () => {
    i += 14, l.refresh();
  }, e.replaceChildren(n("div", { class: "ks-page" }, K(k.calendar, d), o, n("div", { class: "ks-row" }, u))), t.readData("domovoy.api", { path: "api/state" }).then((c) => c.ok && de(c.data.timezone)), H(t, s, ["calendar"], () => l.refresh()), s.add(() => l.dispose()), F(s);
}
const Pt = {
  home_assistant: "Home Assistant",
  telegram: "Telegram",
  caldav: "Календарь CalDAV",
  llm: "Языковая модель",
  speak: "Голос через колонки",
  stt: "Распознавание речи"
}, Ie = (e) => Array.isArray(e) ? e.join(`
`) : "", Te = (e) => e.split(/[\n,]/).map((a) => a.trim()).filter(Boolean);
function ae(e, a, t, s) {
  return re(a, {
    onSubmit: async (i, r) => {
      const { settings: d, secrets: u } = t(i);
      if (d && Object.keys(d).length) {
        const c = await e.invokeAction("domovoy.actions", "settings.update", d);
        if (!c.ok) {
          r.showErrors(c.error);
          return;
        }
      }
      const l = Object.fromEntries(Object.entries(u ?? {}).filter(([, c]) => c !== ""));
      if (Object.keys(l).length) {
        const c = await e.invokeAction("domovoy.actions", "secrets.set", l);
        if (!c.ok) {
          r.showErrors(c.error);
          return;
        }
      }
      P("Сохранено", "good"), s();
    }
  }).el;
}
const ue = (e, a, t) => ({
  name: e,
  label: a,
  type: "password",
  value: "",
  autocomplete: "new-password",
  placeholder: t ? "сохранён — введите, чтобы заменить" : "не задан",
  wide: !0
});
function Lt(e, a, t) {
  return w("Проверить", async () => {
    const s = await e.invokeAction("domovoy.actions", "integration.test", { name: a });
    s.ok ? s.data.ok ? P("Связь есть", "good") : P(s.data.error?.message ?? "Не получилось", "bad", 7e3) : P(s.error.message, "bad", 7e3), t();
  });
}
function G(e, a, t, s) {
  return n("details", { class: "ks-card dv-section", id: `dv-${e}` }, n("summary", null, n("h2", null, a), t), s);
}
function he(e, a, t, s, o, i, r, d) {
  const u = async (c) => {
    const p = await e.invokeAction("domovoy.actions", "settings.update", { [a]: c });
    return p.ok ? d() : P(p.error.message, "bad", 7e3), p;
  }, l = (c) => {
    const p = c >= 0 ? t[c] : null;
    W(p ? `Изменить: ${r}` : `Добавить: ${r}`, o(p), async (m) => {
      const g = t.slice(), v = i(m, p);
      return c >= 0 ? g[c] = v : g.push(v), u(g);
    });
  };
  return n(
    "div",
    null,
    Ce(
      [
        ...s.map((c, p) => ({ key: `c${p}`, header: c.header, render: (m) => c.render(m) })),
        { key: "a", header: "", render: (c) => n("div", { class: "ks-row" }, w(k.edit, () => l(t.indexOf(c))), w(k.delete, async () => {
          await u(t.filter((p) => p !== c));
        }, "danger")) }
      ],
      t,
      O("Пока не задано.")
    ),
    n("div", { class: "ks-row" }, S(k.add, { onClick: () => l(-1) }))
  );
}
function It(e, a, t) {
  const s = (i) => {
    W(
      i ? `Изменить: ${i.name}` : "Новый контакт",
      [
        { name: "name", label: "Имя", required: !0, value: i?.name ?? "", wide: !0 },
        { name: "aliases", label: "Как ещё называют", value: (i?.aliases ?? []).join(", "), hint: "Через запятую: «жена, Маша»", wide: !0 },
        { name: "chat_id", label: "Telegram chat_id", value: i?.channels.telegram?.chat_id ?? "", hint: "Проще: пусть человек напишет боту, потом нажмите «Привязать» ниже.", wide: !0 },
        { name: "is_self", label: "Это я", type: "checkbox", value: i?.is_self ?? !1 }
      ],
      async (r) => {
        const d = { ...i?.channels ?? {} };
        String(r.chat_id).trim() ? d.telegram = { chat_id: String(r.chat_id).trim() } : delete d.telegram;
        const u = { name: String(r.name).trim(), aliases: Te(String(r.aliases)), channels: d, is_self: r.is_self === !0 }, l = i ? await e.invokeAction("domovoy.actions", "contacts.update", { id: i.id, ...u }) : await e.invokeAction("domovoy.actions", "contacts.create", u);
        return l.ok && t(), l;
      }
    );
  }, o = (i, r) => {
    W(
      `Привязать ${r}`,
      [{ name: "contact_id", label: "К контакту", type: "select", options: a.contacts.map((d) => ({ value: String(d.id), label: d.name })), required: !0 }],
      async (d) => {
        const u = await e.invokeAction("domovoy.actions", "contacts.link", { contact_id: Number(d.contact_id), chat_id: i });
        return u.ok && t(), u;
      }
    );
  };
  return n(
    "div",
    null,
    Ce(
      [
        { key: "name", header: "Имя", render: (i) => n("span", null, i.name, i.is_self ? [" ", q("это я", "info")] : null) },
        { key: "al", header: "Также", render: (i) => i.aliases.join(", ") || k.none },
        { key: "tg", header: "Telegram", render: (i) => i.channels.telegram?.chat_id ? q("привязан", "good") : q("не привязан", "warn") },
        { key: "a", header: "", render: (i) => n("div", { class: "ks-row" }, w(k.edit, () => s(i)), w(k.delete, async () => {
          (await $(e, "contacts.delete", { id: i.id }, { confirm: { title: "Удалить контакт", message: i.name } })).ok && t();
        }, "danger")) }
      ],
      a.contacts,
      O("Контактов нет. Добавьте себя и тех, кому Домовой будет писать.")
    ),
    a.linkRequests.length ? n(
      "div",
      { class: "dv-link-requests" },
      n("h3", null, "Кто-то написал боту"),
      n("ul", { class: "ks-list" }, a.linkRequests.map((i) => n("li", null, n("div", { class: "ks-grow" }, `${i.name || i.username || "Без имени"} · chat_id ${i.chat_id}`, i.text ? n("div", { class: "ks-sub" }, `«${i.text}»`) : null), w("Привязать…", () => o(i.chat_id, i.name || i.username || i.chat_id), "primary"))))
    ) : null,
    n("div", { class: "ks-row" }, S("Добавить контакт", { onClick: () => s(null) }))
  );
}
const zt = "http://127.0.0.1:48123/domovoy-api/", Nt = "<секрет Assist — нажмите «Показать»>";
function ze(e) {
  return [
    "# configuration.yaml — один раз",
    "rest_command:",
    "  domovoy_say:",
    `    url: "${zt}frontends/assist"`,
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
function Rt(e, a) {
  const t = async () => {
    const i = await _(e, "api/security");
    return i.ok ? i.data : (P(i.error.message, "bad", 7e3), null);
  }, s = async (i) => {
    try {
      await navigator.clipboard.writeText(i), P("Скопировано", "good");
    } catch {
      P("Не удалось скопировать — нажмите «Показать» и выделите вручную", "warn", 7e3);
    }
  }, o = (i, r, d) => {
    const u = n("code", { class: "dv-secret" }, "•".repeat(12));
    let l = !1;
    return n(
      "div",
      { class: "dv-secret-row" },
      n("strong", null, i),
      u,
      n(
        "div",
        { class: "ks-row" },
        w("Показать", async () => {
          if (l) {
            l = !1, u.textContent = "•".repeat(12);
            return;
          }
          const c = await t();
          c && (l = !0, u.textContent = r(c));
        }, "ghost"),
        w("Скопировать", async () => {
          const c = await t();
          c && await s(r(c));
        }, "ghost"),
        w("Сменить", async () => {
          (await $(e, "security.rotate", { name: d }, { confirm: { title: "Сменить секрет", message: "Старый перестанет работать: его нужно будет заменить везде, где он указан.", label: "Сменить" } })).ok && a();
        }, "danger")
      )
    );
  };
  return n(
    "div",
    null,
    n("p", { class: "ks-muted" }, "Из панели Home Assistant доступ уже открыт. Эти ключи нужны только для внешних клиентов: они не хранятся на странице, пока вы их не запросите."),
    o("API-токен (Bearer)", (i) => i.api_token, "api_token"),
    o("Секрет для Home Assistant (Assist)", (i) => i.assist_secret, "assist_secret"),
    o("Путь вебхука для навыка Алисы (добавьте ваш публичный https://-адрес перед ним)", (i) => i.alice_path, "alice_secret"),
    n("h3", null, "Голос через Home Assistant (фраза «домовой …»)"),
    n("p", { class: "ks-muted" }, "Если Home Assistant работает не на этом же устройстве, замените 127.0.0.1 на адрес, по которому он видит аддон."),
    n("pre", { class: "dv-code" }, ze(Nt)),
    w("Скопировать YAML с секретом", async () => {
      const i = await t();
      i && await s(ze(i.assist_secret));
    }, "secondary")
  );
}
function Bt(e, a, t) {
  const s = new I(), o = n("div"), i = N({
    host: o,
    load: async (r) => {
      const [d, u, l] = await Promise.all([
        _(t, "api/integrations", void 0, r),
        _(t, "api/settings", void 0, r),
        _(t, "api/contacts", void 0, r)
      ]), c = await ce(Promise.resolve(d), Promise.resolve(u));
      return c.ok ? l.ok ? { ok: !0, data: { integrations: c.data[0].integrations, secrets: c.data[0].secrets, settings: c.data[1].settings, contacts: l.data.contacts, linkRequests: l.data.link_requests ?? [] } } : l : c;
    },
    render: (r, d) => {
      const u = r.settings, l = (b) => {
        const T = r.integrations.find((z) => z.name === b);
        return T ? q(X(T.status), ie(T.status)) : null;
      }, c = (b) => {
        const T = r.integrations.find((z) => z.name === b);
        return T ? n("p", { class: "ks-muted" }, [T.detail, T.last_ok ? `Последний успех: ${L(T.last_ok)}.` : "", T.last_error ? `Последняя ошибка: ${T.last_error}` : ""].filter(Boolean).join(" "), " ", Lt(t, b, d)) : null;
      }, p = n("div", { class: "ks-grid dv-status-grid" }, r.integrations.map(
        (b) => n("div", { class: "ks-card dv-status" }, n("strong", null, Pt[b.name] ?? b.name), q(X(b.status), ie(b.status)), n("small", { class: "ks-muted" }, b.detail && b.detail.toLowerCase() !== X(b.status).toLowerCase() ? b.detail : ""))
      )), m = G("ha", "Home Assistant", l("home_assistant"), n("div", null, c("home_assistant"), ae(t, [
        { name: "url", label: "Адрес Home Assistant", type: "url", value: u.ha.url, placeholder: "http://homeassistant.local:8123", hint: "В аддоне обычно http://supervisor/core — оставьте пустым, если работаете внутри HA.", wide: !0 },
        ue("ha_token", "Долгоживущий токен доступа", r.secrets.ha_token),
        { name: "person_entity", label: "Ваш person", value: u.ha.person_entity, placeholder: "person.ivan", hint: "Для напоминаний «когда приду домой».", wide: !0 },
        { name: "allowed_services", label: "Разрешённые сервисы управления", type: "textarea", rows: 4, value: Ie(u.ha.allowed_services), placeholder: `light.turn_on
light.turn_off
script.turn_on`, hint: "Только эти сервисы Домовой может вызывать. Замки, сигнализация и оболочка запрещены всегда.", wide: !0 }
      ], (b) => ({ settings: { ha: { url: String(b.url).trim(), person_entity: String(b.person_entity).trim(), allowed_services: Te(String(b.allowed_services)) } }, secrets: { ha_token: String(b.ha_token) } }), d))), g = G("telegram", "Telegram", l("telegram"), n("div", null, c("telegram"), ae(t, [
        { name: "enabled", label: "Включён", type: "checkbox", value: u.telegram.enabled },
        ue("telegram_token", "Токен бота (от @BotFather)", r.secrets.telegram_token)
      ], (b) => ({ settings: { telegram: { enabled: b.enabled === !0 } }, secrets: { telegram_token: String(b.telegram_token) } }), d), n("h3", null, "Контакты"), It(t, r, d))), v = G("calendar", "Календарь", l("caldav"), n("div", null, c("caldav"), ae(t, [
        { name: "url", label: "CalDAV URL", type: "url", value: u.caldav.url, placeholder: "https://caldav.example.com/dav/user/calendar/", wide: !0 },
        { name: "username", label: "Логин", value: u.caldav.username },
        ue("caldav_password", "Пароль / пароль приложения", r.secrets.caldav_password),
        { name: "default", label: "Куда добавлять по умолчанию", type: "select", options: [{ value: "local", label: "Локальный календарь" }, { value: "caldav", label: "CalDAV" }], value: u.calendar.default },
        { name: "ha_calendars", label: "Календари из Home Assistant (только чтение)", type: "textarea", rows: 2, value: Ie(u.calendar.ha_calendars), placeholder: "calendar.family", wide: !0 }
      ], (b) => ({ settings: { caldav: { url: String(b.url).trim(), username: String(b.username).trim() }, calendar: { default: b.default, ha_calendars: Te(String(b.ha_calendars)) } }, secrets: { caldav_password: String(b.caldav_password) } }), d))), h = G("llm", "Языковая модель (необязательно)", l("llm"), n(
        "div",
        null,
        c("llm"),
        n("p", { class: "ks-muted" }, "Подойдёт любой OpenAI-совместимый сервер: локальный (Ollama, llama.cpp, LM Studio) или облачный. Без неё Домовой работает по правилам — быстро и без нагрузки на процессор. Модель ничего не решает сама: её предложения проходят проверку и попадают в «Проверку»."),
        ae(t, [
          { name: "enabled", label: "Включена", type: "checkbox", value: u.ai.enabled },
          { name: "base_url", label: "Адрес API", type: "url", value: u.ai.base_url, placeholder: "http://192.168.1.20:11434/v1", wide: !0 },
          { name: "model", label: "Модель для команд", value: u.ai.model, placeholder: "qwen2.5:3b-instruct" },
          { name: "embedding_model", label: "Модель для смыслового поиска", value: u.ai.embedding_model, placeholder: "nomic-embed-text", hint: "Пусто — поиск по словам и опечаткам, без модели." },
          ue("llm_api_key", "API-ключ (если нужен)", r.secrets.llm_api_key)
        ], (b) => ({ settings: { ai: { enabled: b.enabled === !0, base_url: String(b.base_url).trim(), model: String(b.model).trim(), embedding_model: String(b.embedding_model).trim() } }, secrets: { llm_api_key: String(b.llm_api_key) } }), d)
      )), y = G("speak", "Голос через колонки (Яндекс Станции)", l("speak"), n(
        "div",
        null,
        c("speak"),
        n("p", { class: "ks-muted" }, "Домовой говорит через колонки, подключённые к Home Assistant. Способ озвучки задаётся здесь, а не в коде."),
        he(t, "speakers", u.speakers, [
          { header: "Колонка", render: (b) => String(b.name || b.entity_id) },
          { header: "Комната", render: (b) => String(b.room ?? "") || k.none },
          { header: "Способ", render: (b) => ({ yandex_station_text: "Яндекс Станция (текст)", tts_speak: "TTS (tts.speak)", custom: "свой сервис" })[String(b.mode)] ?? String(b.mode ?? "Яндекс Станция (текст)") },
          { header: "", render: (b) => b.default ? "по умолчанию" : "" }
        ], (b) => [
          { name: "name", label: "Название", value: b?.name ?? "", placeholder: "Станция на кухне" },
          { name: "entity_id", label: "media_player", required: !0, value: b?.entity_id ?? "", placeholder: "media_player.yandex_station_kitchen", wide: !0 },
          { name: "room", label: "Комната", value: b?.room ?? "", placeholder: "кухня" },
          { name: "mode", label: "Способ озвучки", type: "select", options: [{ value: "yandex_station_text", label: "Яндекс Станция: media_player.play_media (text)" }, { value: "tts_speak", label: "tts.speak (нужна TTS-сущность)" }, { value: "custom", label: "Свой сервис" }], value: b?.mode ?? "yandex_station_text", wide: !0 },
          { name: "tts_entity", label: "TTS-сущность", value: b?.tts_entity ?? "", placeholder: "tts.yandex_station", hint: "Только для tts.speak." },
          { name: "service", label: "Свой сервис", value: b?.service ?? "", placeholder: "script.say", hint: "domain.service; в данных используйте {text} и {entity_id}." },
          { name: "default", label: "По умолчанию, если неизвестно, где человек", type: "checkbox", value: b?.default === !0, wide: !0 }
        ], (b, T) => ({ ...T ?? {}, id: T?.id ?? String(b.entity_id), name: String(b.name).trim(), entity_id: String(b.entity_id).trim(), room: String(b.room).trim(), mode: b.mode, tts_entity: String(b.tts_entity).trim(), service: String(b.service).trim(), default: b.default === !0 }), "колонка", d)
      )), f = G("rooms", "Где вы находитесь: комнаты и места", null, n(
        "div",
        null,
        n("p", { class: "ks-muted" }, "Датчик присутствия или устройство, по которому Домовой понимает, что вы в комнате, — для напоминаний «когда зайду на кухню» и чтобы отвечать в нужную колонку."),
        n("h3", null, "Комнаты"),
        he(
          t,
          "rooms",
          u.rooms,
          [{ header: "Комната", render: (b) => String(b.name || b.room) }, { header: "Датчик", render: (b) => `${b.entity_id ?? ""} = ${b.state ?? "on"}` }],
          (b) => [
            { name: "name", label: "Название", required: !0, value: b?.name ?? b?.room ?? "", placeholder: "кухня" },
            { name: "entity_id", label: "Сущность", required: !0, value: b?.entity_id ?? "", placeholder: "binary_sensor.kitchen_presence", wide: !0 },
            { name: "state", label: "Активна, когда состояние", value: b?.state ?? "on" }
          ],
          (b, T) => ({ ...T ?? {}, name: String(b.name).trim(), entity_id: String(b.entity_id).trim(), state: String(b.state).trim() || "on" }),
          "комната",
          d
        ),
        n("h3", null, "Другие места и устройства"),
        he(
          t,
          "places",
          u.places,
          [{ header: "Место", render: (b) => String(b.name) }, { header: "Сущность", render: (b) => `${b.entity_id ?? ""} = ${b.state ?? "on"}` }],
          (b) => [
            { name: "name", label: "Название", required: !0, value: b?.name ?? "", placeholder: "мастерская" },
            { name: "entity_id", label: "Сущность", required: !0, value: b?.entity_id ?? "", placeholder: "sensor.printer_status", wide: !0 },
            { name: "state", label: "Активно, когда состояние", value: b?.state ?? "on" }
          ],
          (b, T) => ({ ...T ?? {}, name: String(b.name).trim(), entity_id: String(b.entity_id).trim(), state: String(b.state).trim() || "on" }),
          "место",
          d
        )
      )), j = G("stt", "Распознавание речи (микрофон киоска)", l("stt"), n(
        "div",
        null,
        c("stt"),
        n("p", { class: "ks-muted" }, "Нужно только если вы говорите в микрофон киоска. Голос через Алису/Home Assistant приходит уже текстом. Подойдёт любой сервер с OpenAI-совместимым /audio/transcriptions (например, локальный faster-whisper)."),
        ae(t, [
          { name: "base_url", label: "Адрес STT-сервера", type: "url", value: u.voice.stt.base_url, placeholder: "http://127.0.0.1:8000/v1", wide: !0 },
          { name: "model", label: "Модель", value: u.voice.stt.model, placeholder: "small" },
          { name: "language", label: "Язык", value: u.voice.stt.language },
          { name: "max_seconds", label: "Максимум секунд записи", type: "number", min: 3, max: 60, value: u.voice.stt.max_seconds }
        ], (b) => ({ settings: { voice: { stt: { base_url: String(b.base_url).trim(), model: String(b.model).trim(), language: String(b.language).trim() || "ru", max_seconds: Number(b.max_seconds) || 15 } } } }), d)
      )), A = G("security", "Доступ, Алиса и Home Assistant", null, Rt(t, d));
      return n("div", { class: "dv-stack" }, p, m, g, v, y, f, h, j, A);
    }
  });
  return x(e, n("div", { class: "ks-page" }, K(k.integrations), o)), H(t, s, ["integrations", "contacts", "settings"], () => i.refresh(), 800, e), s.add(() => i.dispose()), F(s);
}
function it(e, a = !0) {
  const t = e.slice().sort((s, o) => s.path.join("/").localeCompare(o.path.join("/"), "ru")).map((s) => ({ value: String(s.id), label: s.path.join(" → ") }));
  return a ? [{ value: "", label: "— без места —" }, ...t] : t;
}
function Ae(e, a, t, s) {
  return W(
    t ? `Изменить: ${t.name}` : "Добавить вещь",
    [
      { name: "name", label: k.name, required: !0, value: t?.name ?? "", wide: !0 },
      { name: "quantity", label: k.quantity, type: "number", step: "any", min: 0, value: t?.quantity ?? "" },
      { name: "unit", label: k.unit, value: t?.unit ?? "", placeholder: "шт, кг, м…" },
      { name: "location_id", label: k.place, type: "select", options: it(a), value: t?.location_id ? String(t.location_id) : "", wide: !0 },
      { name: "new_path", label: "Или новое место", placeholder: "Нижний шкаф → Коробка 3", hint: "Создам недостающие уровни автоматически.", wide: !0 },
      { name: "category", label: "Категория", value: t?.category ?? "" },
      { name: "properties", label: "Свойства", type: "textarea", rows: 3, value: Ct(t?.properties), hint: "По строке: «номинал: 10 кОм»", wide: !0 },
      { name: "notes", label: k.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 }
    ],
    async (o) => {
      const i = Ot(String(o.new_path ?? "")), r = {
        name: String(o.name).trim(),
        quantity: qt(o.quantity),
        unit: String(o.unit ?? "").trim(),
        category: String(o.category ?? "").trim(),
        properties: Et(String(o.properties ?? "")),
        notes: String(o.notes ?? "")
      };
      i.length ? r.location_path = i : r.location_id = o.location_id ? Number(o.location_id) : null;
      const d = t ? await Ne(e, "items.update", { id: t.id, ...r }) : await Ne(e, "items.create", r);
      return d.ok && s(), d;
    }
  );
}
function Ne(e, a, t) {
  return e.invokeAction("domovoy.actions", a, t);
}
function ot(e, a, t) {
  const s = n("div", { class: "dv-item-detail" }, n("p", { class: "ks-muted" }, k.loading)), o = le("Вещь", s);
  (async () => {
    const [i, r, d] = await Promise.all([
      _(e, `api/items/${a}`),
      _(e, `api/items/${a}/history`),
      _(e, "api/locations")
    ]);
    if (!i.ok) {
      x(s, n("p", { class: "ks-error" }, i.error.message));
      return;
    }
    const u = i.data.item, l = () => {
      t(), o.close();
    };
    x(
      s,
      n("h3", null, u.name),
      n(
        "dl",
        { class: "dv-facts" },
        n("dt", null, k.quantity),
        n("dd", null, qe(u.quantity, u.unit) || k.none),
        n("dt", null, k.place),
        n("dd", null, u.location_text || "не указано"),
        u.category ? [n("dt", null, "Категория"), n("dd", null, u.category)] : null,
        ...Object.entries(u.properties ?? {}).flatMap(([c, p]) => [n("dt", null, c), n("dd", null, p)]),
        u.notes ? [n("dt", null, k.notes), n("dd", null, u.notes)] : null,
        n("dt", null, "Изменено"),
        n("dd", null, `${L(u.updated_at)} · ${u.source}`)
      ),
      n(
        "div",
        { class: "ks-row" },
        S(k.edit, { variant: "primary", onClick: () => d.ok && void Ae(e, d.data.locations, u, l) }),
        S("Списать 1", { onClick: async () => {
          (await $(e, "items.consume", { id: u.id, quantity: 1 })).ok && l();
        } }),
        S(k.delete, { variant: "danger", onClick: async () => {
          (await $(e, "items.delete", { id: u.id }, { confirm: { title: "Удалить вещь", message: `«${u.name}» будет удалена. Это можно отменить в журнале.` } })).ok && l();
        } })
      ),
      n("h4", null, "История"),
      r.ok && r.data.history.length ? n("ul", { class: "ks-list" }, r.data.history.slice(0, 12).map((c) => D(c.summary, `${L(c.ts)} · ${c.actor}/${c.source}`))) : O("Изменений не было.")
    );
  })();
}
function Ut(e, a, t) {
  const s = new I();
  let o = "", i = String(a.location_id ?? "");
  const r = n("div"), d = se({ name: "q", label: "Фильтр", placeholder: "название или заметка" }), u = se({ name: "loc", label: k.place, type: "select", options: [{ value: "", label: "Везде" }], value: i });
  let l = [];
  const c = N({
    host: r,
    load: (m) => ce(
      _(t, "api/items", { q: o || void 0, location_id: i || void 0, limit: 500 }, m),
      _(t, "api/locations", void 0, m)
    ),
    render: ([{ items: m }, { locations: g }], v) => {
      l = g;
      const h = u.input, y = [{ value: "", label: "Везде" }, ...it(g, !1)];
      return x(h, y.map((f) => n("option", { value: f.value, selected: f.value === i }, f.label))), h.value = i, n(
        "div",
        null,
        Ce(
          [
            { key: "name", header: k.name, render: (f) => n("button", { class: "ks-link", type: "button", onClick: () => ot(t, f.id, v) }, f.name) },
            { key: "qty", header: k.quantity, render: (f) => f.quantity === 0 ? q("нет", "warn") : qe(f.quantity, f.unit) || k.none },
            { key: "place", header: k.place, render: (f) => f.location_text || k.none },
            { key: "updated", header: "Изменено", render: (f) => L(f.updated_at), className: "ks-hide-narrow" },
            {
              key: "actions",
              header: "",
              render: (f) => n(
                "div",
                { class: "ks-row" },
                w(k.edit, () => void Ae(t, g, f, v)),
                w(k.delete, async () => {
                  (await $(t, "items.delete", { id: f.id }, { confirm: { title: "Удалить вещь", message: `«${f.name}» будет удалена. Это можно отменить в журнале.` } })).ok && v();
                }, "danger")
              )
            }
          ],
          m,
          n("div", { class: "ks-empty" }, n("strong", null, "Здесь пока пусто"), n("p", null, "Скажите «запомни: девять резисторов лежат в третьей коробке» или добавьте вручную."))
        ),
        n("p", { class: "ks-muted" }, `${m.length} шт.${m.length >= 500 ? " (показаны первые 500 — уточните фильтр)" : ""}`)
      );
    }
  }), p = () => c.refresh();
  return d.input.addEventListener("input", () => {
    o = d.input.value.trim(), p();
  }), u.input.addEventListener("change", () => {
    i = u.input.value, p();
  }), x(
    e,
    n(
      "div",
      { class: "ks-page" },
      K(k.inventory, S(k.add, { variant: "primary", onClick: () => void Ae(t, l, null, p) })),
      n("div", { class: "ks-card ks-filters" }, d.el, u.el),
      r
    )
  ), H(t, s, ["items", "locations"], p), s.add(() => c.dispose()), F(s);
}
const rt = { home: "дом", room: "комната", cabinet: "шкаф", shelf: "полка", box: "коробка", cell: "ячейка", place: "место" }, Ht = Object.entries(rt).map(([e, a]) => ({ value: e, label: a }));
function lt(e, a = []) {
  for (const t of e)
    a.push(t), lt(t.children, a);
  return a;
}
function Ft(e, a, t) {
  const s = new I(), o = n("div"), i = S(k.add, { variant: "primary" }), r = (l, c, p, m) => {
    const g = lt(p).filter((v) => !l || v.id !== l.id && !v.path.join("\0").startsWith(l.path.join("\0") + "\0"));
    W(
      l ? `Изменить: ${l.name}` : c ? `Новое место внутри «${c.name}»` : "Новое место",
      [
        { name: "name", label: k.name, required: !0, value: l?.name ?? "", wide: !0 },
        { name: "kind", label: "Тип", type: "select", options: Ht, value: l?.kind ?? (c ? "box" : "room") },
        { name: "parent_id", label: "Внутри", type: "select", options: [{ value: "", label: "— верхний уровень —" }, ...g.map((v) => ({ value: String(v.id), label: v.path.join(" → ") }))], value: String((l ? l.parent_id : c?.id) ?? ""), wide: !0 },
        { name: "notes", label: k.notes, type: "textarea", rows: 2, value: l?.notes ?? "", wide: !0 }
      ],
      async (v) => {
        const h = { name: String(v.name).trim(), kind: String(v.kind), notes: String(v.notes ?? ""), parent_id: v.parent_id ? Number(v.parent_id) : null }, y = l ? await t.invokeAction("domovoy.actions", "locations.update", { id: l.id, ...h }) : await t.invokeAction("domovoy.actions", "locations.create", h);
        return y.ok && m(), y;
      }
    );
  }, d = (l, c, p) => n(
    "li",
    { class: "dv-loc" },
    n(
      "div",
      { class: "dv-loc-row" },
      n("span", { class: "dv-loc-name" }, l.name, " ", q(rt[l.kind] ?? l.kind, "neutral")),
      n("span", { class: "ks-muted" }, l.item_count ? `${l.item_count} вещ.` : ""),
      n(
        "span",
        { class: "ks-row dv-loc-actions" },
        l.item_count ? w("Вещи", () => t.navigate("domovoy.inventory", { location_id: String(l.id) }), "ghost") : null,
        w("+ Внутрь", () => r(null, l, c, p), "ghost"),
        w(k.edit, () => r(l, null, c, p)),
        w(k.delete, async () => {
          (await $(t, "locations.delete", { id: l.id }, { confirm: { title: "Удалить место", message: `«${l.name}» будет удалено (только если оно пустое).` } })).ok && p();
        }, "danger")
      )
    ),
    l.children.length ? n("ul", { class: "dv-loc-tree" }, l.children.map((m) => d(m, c, p))) : null
  ), u = N({
    host: o,
    load: (l) => t.readData("domovoy.api", { path: "api/locations/tree" }, { signal: l }),
    render: ({ tree: l }, c) => (i.onclick = () => r(null, null, l, c), l.length ? n("ul", { class: "dv-loc-tree dv-loc-root" }, l.map((p) => d(p, l, c))) : n("div", { class: "ks-empty" }, n("strong", null, "Мест ещё нет"), n("p", null, "Они появятся сами, когда вы скажете «положил в третью коробку нижнего шкафа», или добавьте вручную.")))
  });
  return e.replaceChildren(n("div", { class: "ks-page" }, K(k.locations, i), n("div", { class: "ks-card" }, o))), H(t, s, ["locations", "items"], () => u.refresh()), s.add(() => u.dispose()), F(s);
}
const Re = "domovoy.session";
function Vt() {
  try {
    let e = window.sessionStorage.getItem(Re);
    return e || (e = `web-${Math.random().toString(36).slice(2, 10)}`, window.sessionStorage.setItem(Re, e)), e;
  } catch {
    return "web-anon";
  }
}
function je(e, a) {
  const t = n("input", { class: "ks-input dv-command", type: "text", placeholder: k.commandPlaceholder, "aria-label": "Команда", autocomplete: "off", enterkeyhint: "send" }), s = n("div", { class: "dv-reply", role: "status", "aria-live": "polite" }), o = S(k.send, { variant: "primary", type: "submit" }), i = n("form", { class: "dv-commandbar" }, t, o), r = async (u) => {
    const l = u.trim();
    if (!l)
      return;
    o.disabled = !0, x(s, n("span", { class: "ks-muted" }, k.loading));
    const c = await st(e, "command.send", { text: l, session_id: Vt() });
    if (o.disabled = !1, !c.ok) {
      x(s, n("span", { class: "ks-error" }, c.error.message));
      return;
    }
    t.value = "", d(c.data), a();
  }, d = (u) => {
    const l = (u.options ?? []).map((c, p) => w(`${p + 1}. ${c}`, () => void r(String(p + 1))));
    x(
      s,
      n("div", { class: "dv-reply-line" }, q(X(u.status), ie(u.status)), " ", u.reply),
      l.length ? n("div", { class: "ks-row dv-chips" }, l) : null,
      u.undoable && u.command_id ? w(k.undo, async () => {
        (await $(e, "command.undo", { id: u.command_id }, { success: "Отменено" })).ok && (x(s, n("span", { class: "ks-muted" }, "Отменено.")), a());
      }, "ghost") : null
    );
  };
  return i.addEventListener("submit", (u) => {
    u.preventDefault(), r(t.value);
  }), n("div", { class: "ks-card dv-command-card" }, i, s);
}
function Wt(e) {
  if (!e.events.length)
    return O("Сегодня и завтра событий нет.");
  const a = e.timezone;
  de(a);
  const t = oe(e.now, a);
  return n(
    "ul",
    { class: "ks-list" },
    e.events.map(
      (s) => D(
        s.title,
        `${oe(s.start, a) === t ? "сегодня" : "завтра"}, ${s.all_day ? "весь день" : `${ee(s.start, a)}–${ee(s.end, a)}`}${s.location ? ` · ${s.location}` : ""}`
      )
    )
  );
}
function Kt(e, a, t) {
  const s = new I(), o = t.mode === "kiosk", i = n("div", { class: `ks-page dv-today${o ? " ks-scope dv-kiosk" : ""}`, dataset: o ? { theme: "kiosk", noSwipe: "true" } : void 0 }), r = n("div", { class: "ks-page" }), d = je(t, () => u.refresh());
  x(e, i), x(i, d, r);
  const u = N({
    host: r,
    load: (l) => _(t, "api/today", void 0, l),
    render: (l, c) => {
      de(l.timezone);
      const p = (m, g) => n(
        "div",
        { class: "ks-row" },
        g === "fired" ? w("Готово", async () => {
          await $(t, "reminders.done", { id: m }), c();
        }, "primary") : null,
        w("+10 мин", async () => {
          await $(t, "reminders.snooze", { id: m, minutes: 10 }), c();
        })
      );
      return n(
        "div",
        { class: "ks-grid" },
        M("Календарь", Wt(l)),
        M(
          "Напоминания",
          l.reminders.length ? n("ul", { class: "ks-list" }, l.reminders.map((m) => D(
            m.text,
            [m.state === "fired" ? "сработало" : m.due_at ? `${L(m.due_at)} (${Oe(m.due_at)})` : nt(m.trigger), m.recurrence ? ` · ${ke(m.recurrence)}` : "", ` · ${k.channels[m.channel] ?? m.channel}`].join(""),
            p(m.id, m.state),
            m.state === "fired" ? "dv-fired" : ""
          ))) : O("Напоминаний нет.")
        ),
        M(
          "Список покупок",
          l.shopping.length ? n("ul", { class: "ks-list" }, l.shopping.map((m) => D(m.title, void 0, w("Куплено", async () => {
            await $(t, "tasks.complete", { id: m.id }), c();
          })))) : O("Список покупок пуст.")
        ),
        M(
          "Задачи",
          l.tasks.length ? n("ul", { class: "ks-list" }, l.tasks.map((m) => D(m.title, m.due_date ? `до ${m.due_date}${m.recurrence ? ` · ${ke(m.recurrence)}` : ""}` : "", w("Готово", async () => {
            await $(t, "tasks.complete", { id: m.id }), c();
          })))) : O("Задач нет.")
        ),
        l.review_count ? M("Ждёт проверки", n("div", null, n("p", null, `Есть неуверенные команды: ${l.review_count}. Я ничего не записал без вашего подтверждения.`), S("Открыть проверку", { variant: "primary", onClick: () => t.navigate("domovoy.review") }))) : null,
        l.warnings.length ? M("Календари", n("p", { class: "ks-stale-banner" }, `Не удалось прочитать: ${l.warnings.map((m) => m.source).join(", ")}`)) : null,
        o ? null : M(
          "Последние команды",
          l.recent.length ? n("ul", { class: "ks-list" }, l.recent.map((m) => D(m.text, m.reply ?? "", q(X(m.status), ie(m.status))))) : Ke("Команд ещё не было", "Скажите или напишите что-нибудь выше.")
        )
      );
    }
  });
  return H(t, s, ["calendar", "reminders", "tasks", "review", "commands", "outbox", "notification"], () => u.refresh()), s.add(() => u.dispose()), F(s);
}
function Be(e, a, t) {
  W(
    a ? "Изменить заметку" : "Новая заметка",
    [
      { name: "title", label: "Заголовок", value: a?.title ?? "", wide: !0 },
      { name: "body", label: "Текст", type: "textarea", rows: 6, required: !0, value: a?.body ?? "", wide: !0 },
      { name: "tags", label: "Теги", value: (a?.tags ?? []).join(", "), hint: "Через запятую", wide: !0 }
    ],
    async (s) => {
      const o = { title: String(s.title ?? "").trim(), body: String(s.body).trim(), tags: String(s.tags ?? "").split(",").map((r) => r.trim()).filter(Boolean) }, i = a ? await e.invokeAction("domovoy.actions", "notes.update", { id: a.id, ...o }) : await e.invokeAction("domovoy.actions", "notes.create", o);
      return i.ok && t(), i;
    }
  );
}
function Gt(e, a, t) {
  const s = new I(), o = n("div");
  let i = "";
  const r = se({ name: "q", label: "Поиск по заметкам", placeholder: "слово из заголовка или текста" }), d = S(k.add, { variant: "primary" }), u = N({
    host: o,
    load: (l) => ce(
      _(t, "api/notes", { q: i || void 0 }, l),
      _(t, "api/items", { limit: 8 }, l)
    ),
    render: ([{ notes: l }, { items: c }], p) => (d.onclick = () => Be(t, null, p), n(
      "div",
      { class: "ks-grid" },
      M(
        "Заметки",
        l.length ? n("ul", { class: "ks-list" }, l.map(
          (m) => D(
            m.title || m.body.slice(0, 60),
            n("span", null, m.title ? m.body.slice(0, 200) : "", m.tags.length ? ` · #${m.tags.join(" #")}` : "", ` · ${L(m.updated_at)}`),
            n(
              "div",
              { class: "ks-row" },
              w(k.edit, () => Be(t, m, p)),
              w(k.delete, async () => {
                (await $(t, "notes.delete", { id: m.id }, { confirm: { title: "Удалить заметку", message: m.title || m.body.slice(0, 80) } })).ok && p();
              }, "danger")
            )
          )
        )) : O(i ? "Ничего не найдено." : "Заметок пока нет. Скажите «запомни, что код домофона 4711».")
      ),
      M(
        "Недавно запомнено",
        c.length ? n("ul", { class: "ks-list" }, c.map((m) => D(`${m.name}${m.quantity !== null ? ` — ${qe(m.quantity, m.unit)}` : ""}`, `${m.location_text || "место не указано"} · ${L(m.updated_at)}`))) : O()
      )
    ))
  });
  return r.input.addEventListener("input", () => {
    i = r.input.value.trim(), u.refresh();
  }), x(e, n("div", { class: "ks-page" }, K(k.memory, d), je(t, () => u.refresh()), n("div", { class: "ks-card ks-filters" }, r.el), o)), H(t, s, ["notes", "items", "locations"], () => u.refresh()), s.add(() => u.dispose()), F(s);
}
function Jt(e, a, t) {
  le("Проверить и поправить", (s) => {
    const o = a.proposal.map((r) => {
      const u = (ve[String(r.type)]?.fields ?? []).filter((l) => l.kind !== "json").map((l) => {
        const c = r[l.name], p = l.kind === "iso" && typeof c == "string" ? Q(c) : l.kind === "bool" ? c === !0 : Qe(l, c);
        return {
          name: l.name,
          label: l.label,
          type: l.kind === "bool" ? "checkbox" : l.kind === "enum" ? "select" : l.kind === "iso" ? "datetime-local" : (l.kind === "num", "text"),
          value: p,
          options: l.options?.map((m) => ({ value: m, label: k.channels[m] ?? k.lists[m] ?? m })),
          wide: !0
        };
      });
      return { intent: r, fields: u, handle: re(u, { submitLabel: k.save, onSubmit: () => {
      } }) };
    }), i = async () => {
      const r = o.map(({ intent: u, handle: l }) => Tt(u, l.values(), (c) => fe(c)));
      (await $(e, "review.approve", { id: a.id, proposal: r })).ok && (P("Выполнено с вашими правками", "good"), s(!0), t());
    };
    return n(
      "div",
      null,
      n("p", { class: "ks-muted" }, `Вы сказали: «${a.command_text ?? ""}». ${a.reason}`),
      o.map(({ intent: r, handle: d }) => n("fieldset", { class: "dv-intent" }, n("legend", null, $t(String(r.type))), n("div", { class: "ks-form-grid" }, Object.values(d.fields).map((u) => u.el)))),
      n("div", { class: "ks-form-actions" }, S("Применить с правками", { variant: "primary", onClick: () => void i() }), S(k.cancel, { onClick: () => s(!1) }))
    );
  });
}
function Zt(e, a, t) {
  const s = new I(), o = n("div");
  let i = "pending";
  const r = n("div", { class: "ks-row dv-chips" }), d = () => {
    x(r, ["pending", "approved", "rejected"].map(
      (l) => n("button", { type: "button", class: `ks-chip${i === l ? " is-active" : ""}`, "aria-pressed": String(i === l), onClick: () => {
        i = l, d(), u.refresh();
      } }, l === "pending" ? "Ждут решения" : l === "approved" ? "Принятые" : "Отклонённые")
    ));
  }, u = N({
    host: o,
    load: (l) => _(t, "api/review", { status: i }, l),
    render: ({ items: l }, c) => l.length ? n("div", { class: "ks-grid" }, l.map(
      (p) => M(
        n("span", null, `«${p.command_text ?? "—"}»`),
        n(
          "div",
          null,
          n("p", { class: "ks-muted" }, `${L(p.ts)} · уверенность ${p.confidence === null ? "—" : Math.round(p.confidence * 100) + "%"} · ${p.reason}`),
          n("ul", { class: "ks-list" }, p.proposal.map((m) => n("li", null, et(m, (g) => L(g))))),
          i === "pending" ? n(
            "div",
            { class: "ks-row" },
            w("Подтвердить", async () => {
              (await $(t, "review.approve", { id: p.id }, { success: "Выполнено" })).ok && c();
            }, "primary"),
            w("Поправить…", () => Jt(t, p, c)),
            w(k.reject, async () => {
              (await $(t, "review.reject", { id: p.id })).ok && c();
            }, "danger")
          ) : be(p.status)
        )
      )
    )) : n("div", { class: "ks-empty" }, n("strong", null, i === "pending" ? "Всё проверено" : "Пусто"), n("p", null, i === "pending" ? "Неуверенные команды попадают сюда — я ничего не записываю без вашего подтверждения." : ""))
  });
  return d(), x(e, n("div", { class: "ks-page" }, K(k.review), n("p", { class: "ks-muted" }, "Здесь команды, в которых я не уверен, и всё, что предложила языковая модель. Пока вы не подтвердите, ничего не изменилось."), r, o)), H(t, s, ["review", "commands"], () => u.refresh()), s.add(() => u.dispose()), F(s);
}
const Ue = { location: "domovoy.locations", note: "domovoy.memory", task: "domovoy.tasks", event: "domovoy.calendar" };
function Yt(e, a, t) {
  const s = new I(), o = /* @__PURE__ */ new Set(), i = n("input", { class: "ks-input dv-command", type: "search", placeholder: k.search_placeholder, "aria-label": k.search, autocomplete: "off", value: String(a.q ?? "") }), r = n("div", { class: "ks-row dv-chips" }), d = n("div", { class: "dv-results", "aria-live": "polite" }), u = n("p", { class: "ks-muted dv-search-meta" });
  let l = 0, c = null;
  const p = () => {
    x(
      r,
      Object.entries(k.kinds).map(
        ([h, y]) => n("button", {
          type: "button",
          class: `ks-chip${o.has(h) ? " is-active" : ""}`,
          "aria-pressed": String(o.has(h)),
          onClick: () => {
            o.has(h) ? o.delete(h) : o.add(h), p(), g();
          }
        }, y)
      )
    );
  }, m = (h) => {
    h.kind === "item" ? ot(t, h.id, () => void g()) : Ue[h.kind] && t.navigate(Ue[h.kind], { id: String(h.id) });
  }, g = async () => {
    const h = i.value.trim();
    c?.abort();
    const y = l += 1;
    if (!h) {
      x(d, n("p", { class: "ks-muted" }, "Ищет по вещам, местам, заметкам, задачам и событиям — даже с опечатками.")), u.textContent = "";
      return;
    }
    c = new AbortController(), x(d, Ge());
    const f = await _(t, "api/search", { q: h, kinds: [...o].join(",") || void 0, limit: 30 }, c.signal);
    if (y !== l)
      return;
    if (!f.ok) {
      f.error.code !== "aborted" && x(d, n("p", { class: "ks-error" }, f.error.message));
      return;
    }
    const { hits: j, embedder: A, mode: b } = f.data;
    u.textContent = `${b === "hybrid" ? "Смысловой поиск" : "Поиск по словам и опечаткам"} · ${A}`, x(
      d,
      j.length ? n("ul", { class: "ks-list ks-list-click" }, j.map((T) => {
        const z = D(
          n("span", null, q(k.kinds[T.kind] ?? T.kind, "info"), " ", T.title),
          T.snippet
        );
        return z.tabIndex = 0, z.setAttribute("role", "button"), z.addEventListener("click", () => m(T)), z.addEventListener("keydown", (E) => {
          (E.key === "Enter" || E.key === " ") && (E.preventDefault(), m(T));
        }), z;
      })) : O(`Ничего не нашлось по «${h}». Возможно, я этого ещё не запоминал.`)
    );
  }, v = We(() => void g(), 250);
  return i.addEventListener("input", () => v()), s.add(() => v.cancel()), s.add(() => c?.abort()), p(), x(e, n("div", { class: "ks-page" }, n("div", { class: "ks-card" }, i, r, u), d)), g(), H(t, s, ["items", "locations", "notes", "tasks", "calendar"], () => void g(), 500), F(s);
}
const Xt = (e) => e.split(/[\n,]/).map((a) => a.trim()).filter(Boolean);
function Qt(e) {
  let a = [];
  try {
    a = Intl.supportedValuesOf?.("timeZone") ?? [];
  } catch {
    a = [];
  }
  return a.length || (a = ["Europe/Moscow", "Europe/Kaliningrad", "Europe/Samara", "Asia/Yekaterinburg", "Asia/Novosibirsk", "Asia/Vladivostok", "UTC"]), e && !a.includes(e) && (a = [e, ...a]), [{ value: "", label: "Как на сервере" }, ...a.map((t) => ({ value: t, label: t }))];
}
function ne(e, a, ...t) {
  return n("section", { class: "ks-card dv-section-card" }, n("header", null, n("h2", null, e)), a ? n("p", { class: "ks-muted" }, a) : null, t);
}
function me(e, a, t, s) {
  return re(a, {
    onSubmit: async (o, i) => {
      const r = await e.invokeAction("domovoy.actions", "settings.update", t(o));
      if (!r.ok) {
        i.showErrors(r.error);
        return;
      }
      P("Сохранено", "good"), s();
    }
  }).el;
}
function ea(e, a) {
  const t = URL.createObjectURL(new Blob([JSON.stringify(a, null, 2)], { type: "application/json" })), s = n("a", { href: t, download: e });
  document.body.appendChild(s), s.click(), s.remove(), window.setTimeout(() => URL.revokeObjectURL(t), 1e4);
}
function ta(e, a, t) {
  const s = new I(), o = n("div"), i = N({
    host: o,
    load: async (r) => {
      const [d, u, l, c] = await Promise.all([
        _(t, "api/settings", void 0, r),
        _(t, "api/voice/status", void 0, r),
        _(t, "api/state", void 0, r),
        _(t, "api/backups", void 0, r)
      ]);
      return d.ok ? u.ok ? l.ok ? { ok: !0, data: { settings: d.data.settings, voice: u.data, state: l.data, backups: c.ok ? c.data.backups : [] } } : l : u : d;
    },
    render: ({ settings: r, voice: d, state: u, backups: l }, c) => {
      de(u.timezone);
      const p = ne("Общие", null, me(t, [
        { name: "timezone", label: "Часовой пояс", type: "select", options: Qt(r.timezone), value: r.timezone, hint: `Сейчас на сервере: ${u.timezone}`, wide: !0 },
        { name: "default_reminder_hour", label: "Во сколько напоминать, если сказали только «завтра» (час)", type: "number", min: 0, max: 23, value: r.default_reminder_hour, wide: !0 },
        { name: "default_event_minutes", label: "Длительность события по умолчанию, минут", type: "number", min: 5, max: 1440, value: r.default_event_minutes, wide: !0 }
      ], (f) => ({ timezone: String(f.timezone), default_reminder_hour: Number(f.default_reminder_hour), default_event_minutes: Number(f.default_event_minutes) }), c)), m = ne("Насколько доверять пониманию команд", "Правила понимают привычные фразы сами. Если уверенность ниже порога — команда не выполняется, а ждёт вашего решения в «Проверке». Записи, предложенные языковой моделью, всегда идут на проверку, пока вы явно не разрешите иначе.", me(t, [
        { name: "auto_apply_confidence", label: "Выполнять сразу при уверенности от (0–1)", type: "number", min: 0, max: 1, step: 0.05, value: r.auto_apply_confidence, wide: !0 },
        { name: "review_confidence", label: "Отправлять на проверку от (ниже — переспрашивать)", type: "number", min: 0, max: 1, step: 0.05, value: r.review_confidence, wide: !0 },
        { name: "ai_auto_apply", label: "Выполнять записи языковой модели без проверки (при уверенности от 0,9)", type: "checkbox", value: r.ai.auto_apply, hint: "Не рекомендуется: модель может ошибаться. Всё можно отменить в «Журнале», но лучше сначала посмотреть.", wide: !0 }
      ], (f) => ({ auto_apply_confidence: Number(f.auto_apply_confidence), review_confidence: Number(f.review_confidence), ai: { auto_apply: f.ai_auto_apply === !0 } }), c)), g = ne(
        "Голос",
        "Обращение по слову-триггеру работает и с колонками через Home Assistant, и с микрофоном киоска. Разговор без слова-триггера не сохраняется.",
        n("p", null, "Микрофон киоска: ", d.enabled ? q("включён", "good") : q("выключен", "neutral"), " ", d.stt_configured ? q("распознавание настроено", "good") : q("распознавание не настроено", "warn")),
        me(t, [
          { name: "enabled", label: "Принимать голосовые команды с микрофона киоска", type: "checkbox", value: r.voice.enabled, wide: !0 },
          { name: "trigger_words", label: "Слова-триггеры", value: (r.voice.trigger_words ?? []).join(", "), hint: "Через запятую, все падежи, которые вы произносите: «домовой, домового, домовому».", wide: !0 },
          { name: "window_s", label: "После обращения слушать без повторного слова, секунд", type: "number", min: 5, max: 120, value: r.voice.window_s, wide: !0 },
          { name: "reply", label: "Как отвечать", type: "select", options: [{ value: "speak", label: "Голосом через колонки" }, { value: "text", label: "Только текстом на экране" }], value: r.voice.reply, wide: !0 },
          { name: "room", label: "Комната этого микрофона", value: r.voice.room, hint: "Чтобы ответ прозвучал в ближайшей колонке.", wide: !0 },
          { name: "speak_enabled", label: "Озвучивать напоминания и ответы", type: "checkbox", value: r.speak.enabled, wide: !0 },
          { name: "quiet_from", label: "Тихие часы с", type: "time", value: r.speak.quiet_from },
          { name: "quiet_to", label: "до", type: "time", value: r.speak.quiet_to },
          { name: "fallback", label: "Если колонка не ответила", type: "select", options: [{ value: "telegram", label: "Написать в Telegram" }, { value: "ui", label: "Показать на экране" }, { value: "none", label: "Ничего" }], value: r.speak.fallback, wide: !0 }
        ], (f) => ({ voice: { enabled: f.enabled === !0, trigger_words: Xt(String(f.trigger_words)), window_s: Number(f.window_s), reply: f.reply, room: String(f.room).trim() }, speak: { enabled: f.speak_enabled === !0, quiet_from: String(f.quiet_from), quiet_to: String(f.quiet_to), fallback: f.fallback } }), c)
      ), v = ne("Сообщения", null, me(t, [
        { name: "sandbox", label: "Тестовый режим: ничего не отправлять наружу (Telegram, HA-уведомления)", type: "checkbox", value: r.messaging.sandbox, hint: "Сообщения останутся в «Журнале → Отправка» — удобно проверять сценарии.", wide: !0 }
      ], (f) => ({ messaging: { sandbox: f.sandbox === !0 } }), c)), h = n("input", { type: "file", accept: "application/json,.json", hidden: !0 });
      h.addEventListener("change", async () => {
        const f = h.files?.[0];
        if (h.value = "", !f)
          return;
        let j;
        try {
          j = JSON.parse(await f.text());
        } catch {
          P("Это не JSON-файл", "bad");
          return;
        }
        await Ze({ title: "Заменить все данные?", message: "Все текущие данные (вещи, места, заметки, задачи, напоминания, журнал) будут заменены содержимым файла. Перед этим я сделаю резервную копию.", confirmLabel: "Заменить", destructive: !0 }) && (await $(t, "data.import", { data: j }, { success: "Данные импортированы" })).ok && c();
      });
      const y = ne(
        "Данные и резервные копии",
        `Версия ${u.version}. В базе: ${u.counts.items} вещей, ${u.counts.locations} мест, ${u.counts.notes} заметок. Пароли и токены в экспорт не попадают.`,
        n(
          "div",
          { class: "ks-row" },
          S("Сделать резервную копию", { variant: "primary", onClick: async () => {
            (await $(t, "backup.create", {}, { success: "Копия создана" })).ok && c();
          } }),
          S("Скачать экспорт (JSON)", { onClick: async () => {
            const f = await _(t, "api/export");
            f.ok ? ea(`domovoy-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, f.data) : P(f.error.message, "bad");
          } }),
          S("Импортировать…", { variant: "danger", onClick: () => h.click() }),
          h
        ),
        l.length ? n("ul", { class: "ks-list" }, l.slice(0, 8).map((f) => n("li", null, n("div", { class: "ks-grow" }, f.name, n("div", { class: "ks-sub" }, `${Math.max(1, Math.round(f.bytes / 1024))} КБ`))))) : O("Резервных копий пока нет — они создаются раз в сутки автоматически."),
        n("small", { class: "ks-muted" }, "Копии лежат в /config/kiosk-scene/domovoy/backups — они попадают и в общую резервную копию Home Assistant.")
      );
      return n("div", { class: "dv-stack" }, p, m, g, v, y);
    }
  });
  return x(e, n("div", { class: "ks-page" }, K(k.settings), o)), H(t, s, ["settings"], () => i.refresh(), 800, e), s.add(() => i.dispose()), F(s);
}
const aa = Object.entries(k.channels).map(([e, a]) => ({ value: e, label: a }));
function He(e, a, t, s) {
  const o = J(), i = t?.kind ?? "time", r = t?.trigger ?? {};
  W(
    t ? "Изменить напоминание" : "Новое напоминание",
    [
      { name: "text", label: "О чём напомнить", required: !0, value: t?.text ?? "", wide: !0 },
      { name: "mode", label: "Когда", type: "select", options: [{ value: "time", label: "В указанное время" }, { value: "presence", label: "Когда приду домой" }, { value: "room", label: "Когда зайду в комнату" }], value: i === "time" ? "time" : String(r.type ?? "presence") },
      { name: "due_at", label: "Дата и время", type: "datetime-local", value: t?.due_at ? Q(t.due_at, o) : "" },
      { name: "place", label: "Комната", value: r.place && r.type === "room" ? String(r.place) : "", hint: "Для «когда зайду в комнату»: как в настройках комнат, например «кухня»." },
      { name: "channel", label: "Как сообщить", type: "select", options: aa, value: t?.channel ?? "speak" },
      { name: "recipient", label: "Кому", type: "select", options: [{ value: "self", label: "Мне" }, ...a.filter((d) => !d.is_self).map((d) => ({ value: d.name, label: d.name }))], value: t?.recipient ?? "self" }
    ],
    async (d) => {
      const u = String(d.mode), l = { text: String(d.text).trim(), channel: d.channel, recipient: d.recipient };
      if (u === "time") {
        if (!d.due_at)
          return { ok: !1, error: { code: "validation", message: "Укажите время", fields: { due_at: "Укажите время" } } };
        l.due_at = fe(String(d.due_at), o), l.trigger = null;
      } else if (u === "room") {
        if (!String(d.place).trim())
          return { ok: !1, error: { code: "validation", message: "Укажите комнату", fields: { place: "Укажите комнату" } } };
        l.trigger = { type: "room", place: String(d.place).trim(), require_transition: !0 };
      } else {
        const p = await e.readData("domovoy.api", { path: "api/settings" }), m = p.ok ? p.data.settings.ha.person_entity : "";
        if (!m)
          return { ok: !1, error: { code: "validation", message: "Сначала укажите person-сущность в Интеграциях → Home Assistant." } };
        l.trigger = { type: "presence", person: m, place: "home", require_transition: !0 };
      }
      const c = t ? await e.invokeAction("domovoy.actions", "reminders.update", { id: t.id, ...l }) : await e.invokeAction("domovoy.actions", "reminders.create", l);
      return c.ok && s(), c;
    }
  );
}
function Fe(e, a, t, s) {
  W(
    a ? "Изменить задачу" : "Новая задача",
    [
      { name: "title", label: k.title, required: !0, value: a?.title ?? "", wide: !0 },
      { name: "list", label: "Список", type: "select", options: Object.entries(k.lists).map(([o, i]) => ({ value: o, label: i })), value: a?.list ?? t },
      { name: "due_date", label: "Срок", type: "date", value: a?.due_date ?? "" },
      { name: "notes", label: k.notes, type: "textarea", rows: 2, value: a?.notes ?? "", wide: !0 }
    ],
    async (o) => {
      const i = { title: String(o.title).trim(), list: o.list, due_date: o.due_date || null, notes: String(o.notes ?? "") }, r = a ? await e.invokeAction("domovoy.actions", "tasks.update", { id: a.id, ...i }) : await e.invokeAction("domovoy.actions", "tasks.create", i);
      return r.ok && s(), r;
    }
  );
}
function na(e, a, t) {
  const s = new I(), o = n("div");
  let i = !1, r = [];
  const d = S("Напоминание", { variant: "primary" }), u = S("Задача", { variant: "secondary" }), l = se({ name: "done", label: "Показывать выполненное", type: "checkbox", value: !1 }), c = N({
    host: o,
    load: async (p) => {
      const g = await ce(
        _(t, "api/reminders", { states: i ? "pending,fired,done,cancelled" : "pending,fired" }, p),
        _(t, "api/tasks", { include_done: i ? "1" : "0" }, p)
      );
      if (!g.ok)
        return g;
      const v = await _(t, "api/contacts", void 0, p);
      return { ok: !0, data: [g.data[0], g.data[1], v.ok ? v.data : { contacts: [] }] };
    },
    render: ([{ reminders: p }, { tasks: m }, g], v) => {
      r = g.contacts, d.onclick = () => He(t, r, null, v), u.onclick = () => Fe(t, null, "tasks", v);
      const h = (f) => D(
        n("span", null, f.text, " ", be(f.state)),
        `${f.kind === "time" && f.due_at ? `${L(f.due_at)}${f.state === "pending" ? ` (${Oe(f.due_at)})` : ""}` : nt(f.trigger)}${f.recurrence ? ` · ${ke(f.recurrence)}` : ""} · ${k.channels[f.channel] ?? f.channel}${f.recipient && f.recipient !== "self" ? ` → ${f.recipient}` : ""}`,
        n(
          "div",
          { class: "ks-row" },
          f.state === "fired" || f.state === "pending" ? w("Готово", async () => {
            (await $(t, "reminders.done", { id: f.id })).ok && v();
          }, "primary") : null,
          f.state === "pending" || f.state === "fired" ? w("+10 мин", async () => {
            (await $(t, "reminders.snooze", { id: f.id, minutes: 10 })).ok && v();
          }) : null,
          f.state === "pending" ? w(k.edit, () => He(t, r, f, v)) : null,
          w(k.delete, async () => {
            (await $(t, "reminders.delete", { id: f.id }, { confirm: { title: "Удалить напоминание", message: `«${f.text}»` } })).ok && v();
          }, "danger")
        ),
        f.state === "fired" ? "dv-fired" : ""
      ), y = (f) => {
        const j = m.filter((A) => A.list === f);
        return j.length ? n("ul", { class: "ks-list" }, j.map(
          (A) => D(
            n("span", { class: A.done ? "dv-done" : "" }, A.title),
            [A.due_date ? `срок ${A.due_date}` : "", A.recurrence ? ke(A.recurrence) : "", A.notes].filter(Boolean).join(" · "),
            n(
              "div",
              { class: "ks-row" },
              w(A.done ? "Вернуть" : f === "shopping" ? "Куплено" : "Готово", async () => {
                (await $(t, "tasks.complete", { id: A.id, done: !A.done })).ok && v();
              }, A.done ? "secondary" : "primary"),
              w(k.edit, () => Fe(t, A, f, v)),
              w(k.delete, async () => {
                (await $(t, "tasks.delete", { id: A.id }, { confirm: { title: "Удалить задачу", message: `«${A.title}»` } })).ok && v();
              }, "danger")
            )
          )
        )) : O();
      };
      return n(
        "div",
        { class: "ks-grid" },
        M("Напоминания", p.length ? n("ul", { class: "ks-list" }, p.map(h)) : O("Напоминаний нет.")),
        M(k.lists.tasks, y("tasks")),
        M(k.lists.shopping, y("shopping")),
        M(k.lists.chores, y("chores"))
      );
    }
  });
  return l.input.addEventListener("change", () => {
    i = l.input.checked, c.refresh();
  }), x(e, n("div", { class: "ks-page" }, K(k.tasks, d, u), n("div", { class: "ks-card ks-filters" }, l.el), o)), H(t, s, ["reminders", "tasks", "contacts"], () => c.refresh()), s.add(() => c.dispose()), F(s);
}
function Ve(e) {
  let a = 0;
  for (let t = 0; t < e.length; t += 1)
    a += e[t] * e[t];
  return Math.sqrt(a / Math.max(1, e.length));
}
class sa {
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
  constructor(a) {
    this.calibrated = (a.calibrateMs ?? 1e3) <= 0, this.o = { minRms: 0.012, ratio: 3, startMs: 120, hangoverMs: 800, prerollMs: 300, maxMs: 15e3, minMs: 350, calibrateMs: 1e3, ...a };
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
  push(a) {
    const t = [], s = a.length / this.o.sampleRate * 1e3, o = Ve(a), i = Math.max(this.o.minRms, this.noise * this.o.ratio), r = o >= i;
    if (this.state === "idle")
      return this.calibrated ? (this.noise = o < this.noise ? this.noise * 0.9 + o * 0.1 : this.noise * 0.995 + o * 5e-3, this.keepPreroll(a), this.loudMs = r ? this.loudMs + s : 0, this.loudMs >= this.o.startMs && (this.state = "speech", this.quietMs = 0, this.chunks = [...this.preroll], this.samples = this.prerollSamples, this.preroll = [], this.prerollSamples = 0, t.push({ type: "start" })), t) : (this.calibSum += o, this.calibFrames += 1, this.calibMs += s, this.calibMs >= this.o.calibrateMs && (this.noise = Math.max(2e-3, this.calibSum / this.calibFrames), this.calibrated = !0), this.keepPreroll(a), t);
    this.chunks.push(a), this.samples += a.length, this.quietMs = r ? 0 : this.quietMs + s;
    const d = this.samples / this.o.sampleRate * 1e3, u = d >= this.o.maxMs && this.quietMs < this.o.hangoverMs;
    if (this.quietMs >= this.o.hangoverMs || u) {
      const l = d - this.quietMs, c = this.collect(), p = Ve(c);
      this.reset(), u ? (this.noise = Math.max(this.noise, p), t.push({ type: "discard", reason: "continuous" })) : t.push(l < this.o.minMs ? { type: "discard", reason: "short" } : { type: "end", samples: c, durationMs: d });
    }
    return t;
  }
  keepPreroll(a) {
    this.preroll.push(a), this.prerollSamples += a.length;
    const t = this.o.prerollMs / 1e3 * this.o.sampleRate;
    for (; this.preroll.length > 1 && this.prerollSamples - this.preroll[0].length >= t; )
      this.prerollSamples -= this.preroll[0].length, this.preroll.shift();
  }
  collect() {
    const a = new Float32Array(this.samples);
    let t = 0;
    for (const s of this.chunks)
      a.set(s, t), t += s.length;
    return a;
  }
}
function ia(e, a, t) {
  if (t >= a)
    return e;
  const s = a / t, o = Math.floor(e.length / s), i = new Float32Array(o);
  for (let r = 0; r < o; r += 1) {
    const d = Math.floor(r * s), u = Math.min(e.length, Math.floor((r + 1) * s));
    let l = 0;
    for (let c = d; c < u; c += 1)
      l += e[c];
    i[r] = u > d ? l / (u - d) : 0;
  }
  return i;
}
function oa(e, a) {
  const t = new Uint8Array(44 + e.length * 2), s = new DataView(t.buffer), o = (i, r) => {
    for (let d = 0; d < r.length; d += 1)
      s.setUint8(i + d, r.charCodeAt(d));
  };
  o(0, "RIFF"), s.setUint32(4, 36 + e.length * 2, !0), o(8, "WAVE"), o(12, "fmt "), s.setUint32(16, 16, !0), s.setUint16(20, 1, !0), s.setUint16(22, 1, !0), s.setUint32(24, a, !0), s.setUint32(28, a * 2, !0), s.setUint16(32, 2, !0), s.setUint16(34, 16, !0), o(36, "data"), s.setUint32(40, e.length * 2, !0);
  for (let i = 0; i < e.length; i += 1) {
    const r = Math.max(-1, Math.min(1, e[i]));
    s.setInt16(44 + i * 2, r < 0 ? r * 32768 : r * 32767, !0);
  }
  return t;
}
function ra() {
  return typeof navigator > "u" || !navigator.mediaDevices?.getUserMedia ? window.isSecureContext === !1 ? "Браузер разрешает микрофон только на https:// или localhost. Откройте киоск по HTTPS или добавьте адрес в исключения браузера." : "В этом браузере нет доступа к микрофону." : null;
}
function la(e) {
  let a = null, t = null, s = null, o = null, i = null, r = !1, d = !1, u = !1, l;
  const c = (g) => e.onState(g), p = (g, v = 0) => {
    window.clearTimeout(l), v > 0 ? (c(g), l = window.setTimeout(() => d && !r && c({ kind: "listening" }), v)) : c(g);
  }, m = async (g, v) => {
    if (!u) {
      u = !0, c({ kind: "sending" });
      try {
        const h = oa(ia(g, v, 16e3), Math.min(v, 16e3)), y = await e.http.request("api/voice/command", {
          method: "POST",
          rawBody: new Blob([h.buffer], { type: "audio/wav" }),
          headers: { "Content-Type": "audio/wav", "X-Room": e.room },
          timeoutMs: 3e4
        });
        if (!d)
          return;
        y.ok ? y.data.handled && y.data.reply ? p({ kind: "heard", reply: y.data.reply, status: y.data.status ?? "" }, 6e3) : p({ kind: "listening" }) : p({ kind: "unavailable", reason: y.error.message }, 6e3);
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
      if (d)
        return;
      const g = ra();
      if (g && !e.mediaDevices) {
        c({ kind: "unavailable", reason: g });
        return;
      }
      c({ kind: "starting" });
      try {
        a = await (e.mediaDevices ?? navigator.mediaDevices).getUserMedia({ audio: { channelCount: 1, echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 } });
      } catch (h) {
        const y = h?.name;
        c({ kind: "unavailable", reason: y === "NotAllowedError" ? "Доступ к микрофону запрещён в браузере." : y === "NotFoundError" ? "Микрофон не найден." : "Не удалось открыть микрофон." });
        return;
      }
      if (t = e.audioContextFactory ? e.audioContextFactory() : new AudioContext(), t.state === "suspended") {
        const h = () => void t?.resume().catch(() => {
        });
        h(), document.addEventListener("pointerdown", h, { once: !0 });
      }
      const v = t.sampleRate;
      i = new sa({ sampleRate: v }), o = t.createMediaStreamSource(a), s = t.createScriptProcessor(4096, 1, 1), s.onaudioprocess = (h) => {
        if (r || !d || !i)
          return;
        const y = new Float32Array(h.inputBuffer.getChannelData(0));
        for (const f of i.push(y))
          f.type === "start" ? c({ kind: "hearing" }) : f.type === "discard" ? c({ kind: "listening" }) : m(f.samples, v);
      }, o.connect(s), s.connect(t.destination), d = !0, c({ kind: "listening" });
    },
    stop() {
      d = !1, window.clearTimeout(l), s?.disconnect(), o?.disconnect(), s && (s.onaudioprocess = null), a?.getTracks().forEach((g) => g.stop()), t?.close().catch(() => {
      }), a = t = s = o = null, i = null, c({ kind: "off" });
    },
    setMuted(g) {
      r = g, i?.reset(), a?.getAudioTracks().forEach((v) => {
        v.enabled = !g;
      }), c(g ? { kind: "muted" } : d ? { kind: "listening" } : { kind: "off" });
    }
  };
}
const da = {
  starting: "Запуск микрофона…",
  listening: "Слушаю: скажите «домовой …»",
  hearing: "Слышу…",
  sending: "Разбираю…",
  muted: "Микрофон выключен"
};
function ca(e) {
  const a = n("span", { class: "dv-mic-dot", "aria-hidden": "true" }), t = n("span", { class: "dv-mic-label" }), s = n("button", { class: "dv-mic", type: "button", "aria-live": "polite", title: "Включить или выключить микрофон", dataset: { noSwipe: "true" }, onClick: e }, a, t);
  return {
    el: s,
    render(o) {
      s.dataset.state = o.kind, s.hidden = o.kind === "off", t.textContent = o.kind === "unavailable" ? o.reason : o.kind === "heard" ? o.reply : da[o.kind] ?? "";
    }
  };
}
function ua(e) {
  return [
    {
      // The scene's avatar reads its state from the Domovoy state provider; a push from the server turns
      // "poll every few seconds" into "react immediately", so the mouth moves in step with the speakers.
      id: "domovoy.avatar-sync",
      title: "Аватар следует за ответами Домового",
      modes: ["kiosk"],
      start(a) {
        return a.subscribe(pe, "avatar", () => a.refresh());
      }
    },
    {
      id: "domovoy.notifications",
      title: "Уведомления на экране киоска",
      modes: ["kiosk"],
      start(a) {
        return a.subscribe(pe, "notification", (t) => {
          const s = t.payload?.text;
          typeof s == "string" && s.trim() && P(s, "info", 12e3);
        });
      }
    },
    {
      // Off unless the deployment asks for it (`config.mic` in extension.json): a kiosk that does not have a
      // microphone, or a secure origin, must not nag or fail.
      id: "domovoy.mic",
      title: "Микрофон киоска",
      modes: ["kiosk"],
      start(a) {
        const t = a.config.mic;
        if (t !== !0 && !(t && typeof t == "object"))
          return () => {
          };
        const s = typeof t.room == "string" ? String(t.room) : "", o = ca(() => i.setMuted(!i.muted));
        o.el.hidden = !0, document.body.appendChild(o.el);
        const i = la({ http: e, room: s, onState: o.render });
        return i.start(), () => {
          i.stop(), o.el.remove();
        };
      }
    }
  ];
}
const ma = `
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
`, ye = (e, a, t) => {
  const s = Number(e);
  return Number.isFinite(s) && s >= 1 ? Math.min(t, Math.floor(s)) : a;
};
function we(e, a, t) {
  return {
    id: e,
    title: a,
    mount(s, o, i) {
      const r = new I(), d = n("div", { class: `ks-scope dv-widget ${e.replace(".", "-")}`, dataset: { noSwipe: "true", theme: "kiosk" } });
      x(s, d);
      let u = o;
      const l = N({
        host: d,
        load: (p) => _(i, "api/today", void 0, p),
        render: (p, m) => (de(p.timezone), t(p, m, u, i))
      });
      H(i, r, ["calendar", "reminders", "tasks"], () => l.refresh(), 400);
      const c = window.setInterval(() => l.refresh(), 6e4);
      return r.add(() => window.clearInterval(c)), r.add(() => l.dispose()), {
        update(p) {
          u = p, l.refresh();
        },
        dispose: () => r.dispose()
      };
    }
  };
}
function xe(e) {
  const a = new Date(e.now).getTime();
  return e.events.filter((t) => t.all_day || new Date(t.end).getTime() > a);
}
const pa = [
  we("domovoy.next-event", "Ближайшее событие", (e) => {
    const [a] = xe(e).filter((o) => !o.all_day), [t] = xe(e).filter((o) => o.all_day && oe(o.start, e.timezone) === oe(e.now, e.timezone)), s = a ?? t;
    return s ? n("div", { class: "dv-next" }, n("div", { class: "dv-next-when" }, s.all_day ? "сегодня" : `${ee(s.start, e.timezone)} · ${Oe(s.start, new Date(e.now).getTime())}`), n("div", { class: "dv-next-title" }, s.title), s.location ? n("div", { class: "ks-muted" }, s.location) : null) : n("div", { class: "dv-next" }, n("div", { class: "ks-muted" }, "Ближайших событий нет"));
  }),
  we("domovoy.today", "Сегодня", (e, a, t) => {
    const s = xe(e).slice(0, ye(t.maxEvents, 4, 10)), o = e.reminders.slice(0, ye(t.maxReminders, 4, 10));
    return n(
      "div",
      { class: "dv-today-widget" },
      s.length ? n("ul", { class: "ks-list" }, s.map((i) => n("li", null, n("span", { class: "dv-time" }, i.all_day ? "весь день" : ee(i.start, e.timezone)), " ", i.title))) : O("Событий нет"),
      o.length ? n("ul", { class: "ks-list dv-reminders" }, o.map((i) => n("li", { class: i.state === "fired" ? "dv-fired" : "" }, "🔔 ", i.text))) : null,
      e.review_count ? n("div", { class: "ks-muted" }, `Ждёт проверки: ${e.review_count}`) : null
    );
  }),
  we("domovoy.shopping", "Покупки", (e, a, t, s) => {
    const o = e.shopping.slice(0, ye(t.max, 8, 30));
    return o.length ? n("ul", { class: "ks-list dv-shopping" }, o.map((i) => n("li", null, n("span", { class: "ks-grow" }, i.title), w("✓", async () => {
      (await $(s, "tasks.complete", { id: i.id })).ok && a();
    }, "ghost", "Куплено")))) : O("Список покупок пуст");
  }),
  {
    id: "domovoy.command",
    title: "Командная строка",
    mount(e, a, t) {
      const s = new I(), o = n("div", { class: "ks-scope dv-widget", dataset: { noSwipe: "true", theme: "kiosk" } }, je(t, () => t.refresh()));
      return x(e, o), F(s);
    }
  }
];
let _e = !1;
function fa(e) {
  if (_e)
    return;
  _e = !0, le("Нужен токен доступа", (t) => {
    const s = re([{ name: "token", label: "API-токен", type: "password", required: !0, wide: !0 }], {
      submitLabel: k.save,
      extraActions: [S(k.cancel, { onClick: () => t(!1) })],
      onSubmit: (o) => {
        e(String(o.token).trim()), t(!0), window.location.reload();
      }
    });
    return n("div", null, n("p", null, "Сервер просит подтвердить, что это вы. Введите токен из раздела «Интеграции → Доступ» (или откройте страницу из панели Home Assistant — там токен не нужен)."), s.el);
  }).closed.then(() => {
    _e = !1;
  });
}
const ka = [
  { id: "domovoy.today", title: k.today, icon: "🏠", modes: ["admin", "kiosk"], order: 10, mount: Kt },
  { id: "domovoy.search", title: k.search, icon: "🔎", modes: ["admin"], order: 20, mount: Yt },
  { id: "domovoy.inventory", title: k.inventory, icon: "📦", modes: ["admin"], order: 30, group: "Дом", mount: Ut },
  { id: "domovoy.locations", title: k.locations, icon: "🗄️", modes: ["admin"], order: 40, group: "Дом", mount: Ft },
  { id: "domovoy.calendar", title: k.calendar, icon: "📅", modes: ["admin"], order: 50, group: "Планы", mount: Dt },
  { id: "domovoy.tasks", title: k.tasks, icon: "✅", modes: ["admin"], order: 60, group: "Планы", mount: na },
  { id: "domovoy.memory", title: k.memory, icon: "🧠", modes: ["admin"], order: 70, group: "Дом", mount: Gt },
  { id: "domovoy.review", title: k.review, icon: "🛡️", modes: ["admin"], order: 80, group: "Домовой", mount: Zt },
  { id: "domovoy.activity", title: k.activity, icon: "📜", modes: ["admin"], order: 90, group: "Домовой", mount: Mt },
  { id: "domovoy.integrations", title: k.integrations, icon: "🔌", modes: ["admin"], order: 100, group: "Домовой", mount: Bt },
  { id: "domovoy.settings", title: k.settings, icon: "⚙️", modes: ["admin"], order: 110, group: "Домовой", mount: ta }
], ba = {
  manifest: { id: "domovoy", title: "Домовой", version: "0.1.0", apiVersion: ht },
  activate(e) {
    const a = typeof e.config.apiBase == "string" && e.config.apiBase ? e.config.apiBase : "../domovoy-api/";
    vt({ retry: k.retry, cancel: k.cancel, confirm: k.confirm, save: k.save, close: k.close, required: "Обязательное поле", loading: k.loading, nothingHere: k.empty, olderData: "Показаны прежние данные" }), Me("domovoy-ui-kit", wt), Me("domovoy-ui", ma);
    const t = St({ baseUrl: a, onUnauthorized: () => fa(_t) });
    e.registerDataProvider(t.data), e.registerActionProvider(t.actions), e.registerRealtimeSource(kt({ id: pe, http: t.http, waitSeconds: 25, pauseWhenHidden: !0 }));
    for (const s of ka)
      e.registerPage(s);
    for (const s of pa)
      e.registerWidget(s);
    for (const s of ua(t.http))
      e.registerService(s);
  }
};
export {
  ka as PAGES,
  pa as WIDGETS,
  ba as default
};
