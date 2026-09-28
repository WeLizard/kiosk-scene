function Ce(e, a) {
  for (const t of a)
    t == null || t === !1 || (Array.isArray(t) ? Ce(e, t) : t instanceof Node ? e.appendChild(t) : e.appendChild(document.createTextNode(String(t))));
}
function n(e, a, ...t) {
  const s = document.createElement(e);
  for (const [i, o] of Object.entries(a ?? {}))
    if (!(o == null || o === !1))
      if (i === "class")
        s.className = String(o);
      else if (i === "style")
        typeof o == "string" ? s.setAttribute("style", o) : Object.assign(s.style, o);
      else if (i === "dataset")
        for (const [r, u] of Object.entries(o))
          u !== void 0 && (s.dataset[r] = String(u));
      else if (i === "aria")
        for (const [r, u] of Object.entries(o))
          u !== void 0 && s.setAttribute(`aria-${r}`, String(u));
      else i.startsWith("on") && typeof o == "function" ? s.addEventListener(i.slice(2).toLowerCase(), o) : i === "value" || i === "checked" || i === "disabled" || i === "selected" ? s[i] = o : o === !0 ? s.setAttribute(i, "") : s.setAttribute(i, String(o));
  return Ce(s, t), s;
}
function bt(e) {
  for (; e.firstChild; )
    e.removeChild(e.firstChild);
}
function _(e, ...a) {
  bt(e), Ce(e, a);
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
function Je(e, a) {
  let t = null;
  const s = (...i) => {
    t && clearTimeout(t), t = setTimeout(() => {
      t = null, e(...i);
    }, a);
  };
  return s.cancel = () => {
    t && (clearTimeout(t), t = null);
  }, s;
}
function vt(e) {
  return e.endsWith("/") ? e : `${e}/`;
}
function gt(e, a) {
  const t = a && typeof a == "object" ? a : {}, i = (t.error && typeof t.error == "object" ? t.error : null) ?? t, o = typeof i.message == "string" ? i.message : typeof t.error == "string" ? t.error : `Request failed (HTTP ${e})`, r = i.fields && typeof i.fields == "object" ? Object.fromEntries(Object.entries(i.fields).map(([u, c]) => [u, String(c)])) : void 0;
  return {
    code: typeof i.code == "string" ? i.code : `http_${e}`,
    message: o,
    fields: r,
    retryable: e >= 500 || e === 429 || e === 408
  };
}
function ht(e) {
  const a = e.fetchImpl ?? ((...o) => globalThis.fetch(...o)), t = vt(e.baseUrl);
  function s(o, r) {
    const u = new URL(o.replace(/^\/+/, ""), new URL(t, globalThis.location?.href ?? "http://localhost/"));
    for (const [c, l] of Object.entries(r ?? {}))
      l != null && l !== "" && u.searchParams.set(c, String(l));
    return u.toString();
  }
  async function i(o, r = {}) {
    const u = new AbortController(), c = r.timeoutMs ?? e.timeoutMs ?? 15e3, l = setTimeout(() => u.abort(new DOMException("Request timed out", "TimeoutError")), c), d = () => u.abort(r.signal?.reason);
    r.signal?.addEventListener("abort", d, { once: !0 }), r.signal?.aborted && d();
    try {
      const p = { Accept: "application/json", ...e.headers ?? {}, ...r.headers ?? {} }, m = e.getToken?.();
      m && (p.Authorization = `Bearer ${m}`);
      let h;
      r.rawBody !== void 0 ? h = r.rawBody : r.body !== void 0 && (p["Content-Type"] = "application/json", h = JSON.stringify(r.body));
      const g = await a(s(o, r.query), {
        method: r.method ?? (h === void 0 ? "GET" : "POST"),
        headers: p,
        body: h,
        cache: "no-store",
        signal: u.signal
      });
      let v = null;
      const y = await g.text();
      if (y)
        try {
          v = JSON.parse(y);
        } catch {
          v = { message: y.slice(0, 200) };
        }
      if (!g.ok) {
        const f = gt(g.status, v);
        return g.status === 401 && e.onUnauthorized?.(f), { ok: !1, error: f };
      }
      return { ok: !0, data: v };
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
      clearTimeout(l), r.signal?.removeEventListener("abort", d);
    }
  }
  return { request: i, url: s };
}
const $e = "*";
function yt(e) {
  return !!e && typeof e == "object" && typeof e.cursor == "number";
}
function wt(e, a) {
  return e === $e || a === e || a.startsWith(`${e}.`);
}
function xt(e) {
  const a = e.path ?? "events", t = e.waitSeconds ?? 25, s = (e.graceSeconds ?? 10) * 1e3, i = e.minBackoffMs ?? 1e3, o = e.maxBackoffMs ?? 3e4, r = e.random ?? Math.random, u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
  let l = "connecting", d = null, p = !1, m = !1, h = 0, g = null, v = null, y = !1;
  function f(C) {
    if (l !== C) {
      l = C;
      for (const V of Array.from(c))
        V(C);
    }
  }
  function E(C) {
    for (const [V, O] of Array.from(u.entries()))
      if (!(!wt(V, C.topic) && C.topic !== $e))
        for (const F of Array.from(O))
          try {
            F(C);
          } catch {
          }
  }
  function x(C) {
    return new Promise((V) => {
      const O = () => {
        clearTimeout(F), v = null, V();
      }, F = setTimeout(O, C);
      v = O;
    });
  }
  const k = () => {
    typeof document > "u" || document.hidden || (y = !0, !p && !m && e.pauseWhenHidden !== !1 && z(), v?.(), g?.abort(new DOMException("resume", "AbortError")));
  };
  async function S() {
    p = !0;
    try {
      for (; !m && !(e.pauseWhenHidden !== !1 && typeof document < "u" && document.hidden); ) {
        g = new AbortController();
        let C = !1;
        const V = setTimeout(() => {
          C = !0, g?.abort(new DOMException("poll timeout", "TimeoutError"));
        }, t * 1e3 + s), O = await e.http.request(a, {
          query: { since: d ?? void 0, timeout: d === null ? 0 : t },
          signal: g.signal,
          timeoutMs: t * 1e3 + s
        });
        if (clearTimeout(V), g = null, m)
          break;
        if (!O.ok && O.error.code === "aborted" && !C)
          continue;
        if (!O.ok || !yt(O.data)) {
          h += 1, f(h >= 3 ? "offline" : "reconnecting");
          const X = Math.min(o, i * 2 ** Math.min(h - 1, 10));
          await x(X / 2 + r() * (X / 2)), y = !0;
          continue;
        }
        const F = O.data, ft = d;
        d = typeof F.cursor == "number" ? F.cursor : d;
        const kt = h > 0;
        h = 0, f("live"), (F.reset || y || kt) && ((ft !== null || F.reset) && E({ topic: $e, payload: { resync: !0, reset: F.reset === !0 }, cursor: d ?? void 0 }), y = !1);
        for (const X of F.events ?? [])
          E({ topic: X.topic, payload: X.payload, cursor: X.seq });
      }
    } finally {
      p = !1;
    }
  }
  function z() {
    p || m || (typeof document < "u" && e.pauseWhenHidden !== !1 && (document.removeEventListener("visibilitychange", k), document.addEventListener("visibilitychange", k)), S());
  }
  return {
    id: e.id,
    status: () => l,
    start: z,
    subscribe(C, V) {
      let O = u.get(C);
      return O || (O = /* @__PURE__ */ new Set(), u.set(C, O)), O.add(V), !p && !m && z(), () => {
        O?.delete(V), O && O.size === 0 && u.delete(C);
      };
    },
    onStatus(C) {
      return c.add(C), () => c.delete(C);
    },
    close() {
      m = !0, g?.abort(new DOMException("closed", "AbortError")), v?.(), typeof document < "u" && document.removeEventListener("visibilitychange", k), u.clear(), c.clear();
    }
  };
}
const _t = {
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
let N = { ..._t };
function St(e) {
  N = { ...N, ...e };
}
function T(e, a = {}) {
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
function j(e, a = "neutral") {
  return n("span", { class: `ks-badge ks-badge-${a}` }, e);
}
function Ye(e, a, t) {
  return n("div", { class: "ks-empty" }, n("strong", null, e), a ? n("p", null, a) : null, t);
}
function Xe(e = N.loading) {
  return n("div", { class: "ks-loading", role: "status", aria: { live: "polite" } }, n("span", { class: "ks-spinner", aria: { hidden: !0 } }), e);
}
function Pe(e, a) {
  return n(
    "div",
    { class: "ks-error", role: "alert" },
    n("strong", null, e.message),
    e.code ? n("small", null, e.code) : null,
    a && e.retryable !== !1 ? T(N.retry, { onClick: a }) : null
  );
}
let Qe = 0;
function le(e) {
  const a = `ks-field-${Qe += 1}`, t = e.type ?? "text";
  let s;
  if (t === "textarea")
    s = n("textarea", { id: a, name: e.name, rows: e.rows ?? 3, placeholder: e.placeholder, required: e.required, value: String(e.value ?? "") });
  else if (t === "select") {
    const u = n(
      "select",
      { id: a, name: e.name, required: e.required },
      (e.options ?? []).map((c) => n("option", { value: c.value, selected: String(e.value ?? "") === c.value }, c.label))
    );
    u.value = String(e.value ?? e.options?.[0]?.value ?? ""), s = u;
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
  const i = n("small", { class: "ks-field-error", id: `${a}-error`, role: "alert" }), o = n("label", { for: a }, e.label, e.required ? n("span", { class: "ks-required", aria: { hidden: !0 } }, " *") : null), r = n(
    "div",
    { class: `ks-field${t === "checkbox" ? " ks-field-check" : ""}${e.wide ? " ks-field-wide" : ""}` },
    t === "checkbox" ? [s, o] : [o, s],
    e.hint ? n("small", { class: "ks-field-hint" }, e.hint) : null,
    i
  );
  return {
    el: r,
    input: s,
    name: e.name,
    value: () => t === "checkbox" ? s.checked : s.value,
    setError(u) {
      i.textContent = u ?? "", r.classList.toggle("has-error", !!u), u ? (s.setAttribute("aria-invalid", "true"), s.setAttribute("aria-describedby", i.id)) : (s.removeAttribute("aria-invalid"), s.removeAttribute("aria-describedby"));
    }
  };
}
function ce(e, a) {
  const t = Object.fromEntries(e.map((u) => [u.name, le(u)])), s = n("div", { class: "ks-form-error", role: "alert", hidden: !0 }), i = T(a.submitLabel ?? N.save, { variant: "primary", type: "submit" }), o = n("form", { class: "ks-form", novalidate: !0 }, s, n("div", { class: "ks-form-grid" }, Object.values(t).map((u) => u.el)), n("div", { class: "ks-form-actions" }, i, a.extraActions)), r = {
    el: o,
    fields: t,
    values: () => Object.fromEntries(Object.values(t).map((u) => [u.name, u.value()])),
    showErrors(u) {
      for (const l of Object.values(t))
        l.setError(u?.fields?.[l.name] ?? null);
      const c = u && (!u.fields || Object.keys(u.fields).length === 0) ? u.message : "";
      s.textContent = c, s.hidden = !c;
    },
    setBusy(u) {
      i.disabled = u, o.toggleAttribute("aria-busy", u);
    }
  };
  return o.addEventListener("submit", (u) => {
    u.preventDefault();
    let c = !0;
    for (const l of e) {
      const d = t[l.name].value();
      l.required && (d === "" || d === !1) ? (t[l.name].setError(N.required), c = !1) : t[l.name].setError(null);
    }
    c && (r.showErrors(null), r.setBusy(!0), Promise.resolve(a.onSubmit(r.values(), r)).finally(() => r.setBusy(!1)));
  }), r;
}
function qe(e, a, t) {
  return a.length ? n(
    "div",
    { class: "ks-table-wrap" },
    n(
      "table",
      { class: "ks-table" },
      n("thead", null, n("tr", null, e.map((s) => n("th", { scope: "col", class: s.className }, s.header)))),
      n("tbody", null, a.map((s) => n("tr", null, e.map((i) => n("td", { class: i.className, dataset: { label: i.header } }, i.render(s))))))
    )
  ) : t ?? Ye(N.nothingHere);
}
const se = [];
function ue(e, a) {
  const t = document.activeElement;
  let s = () => {
  };
  const i = new Promise((m) => {
    s = m;
  }), o = new I(), r = (m) => {
    if (o.isDisposed)
      return;
    o.dispose();
    const h = se.indexOf(d);
    h >= 0 && se.splice(h, 1), d.remove(), t?.focus?.(), s(m);
  }, u = typeof a == "function" ? a(r) : a, c = `ks-dialog-title-${Qe += 1}`, l = n(
    "div",
    { class: "ks-dialog", role: "dialog", aria: { modal: !0, labelledby: c }, tabindex: -1 },
    n("div", { class: "ks-dialog-head" }, n("h2", { id: c }, e), T("×", { variant: "ghost", title: N.close, onClick: () => r(void 0) })),
    n("div", { class: "ks-dialog-body" }, u)
  ), d = n("div", { class: "ks-overlay" }, l);
  d.addEventListener("mousedown", (m) => {
    m.target === d && r(void 0);
  });
  const p = (m) => {
    if (se[se.length - 1] === d) {
      if (m.key === "Escape") {
        m.stopPropagation(), r(void 0);
        return;
      }
      if (m.key === "Tab") {
        const h = Array.from(l.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")).filter((y) => !y.hasAttribute("disabled"));
        if (!h.length) {
          m.preventDefault();
          return;
        }
        const g = h[0], v = h[h.length - 1];
        m.shiftKey && document.activeElement === g ? (m.preventDefault(), v.focus()) : !m.shiftKey && document.activeElement === v && (m.preventDefault(), g.focus());
      }
    }
  };
  return document.addEventListener("keydown", p, !0), o.add(() => document.removeEventListener("keydown", p, !0)), document.body.appendChild(d), se.push(d), (l.querySelector("input, select, textarea, button.ks-btn-primary") ?? l).focus(), { el: d, close: r, closed: i };
}
function et(e) {
  return ue(
    e.title,
    (t) => n(
      "div",
      { class: "ks-confirm" },
      n("p", null, e.message),
      n(
        "div",
        { class: "ks-form-actions" },
        T(N.cancel, { onClick: () => t(!1) }),
        T(e.confirmLabel ?? N.confirm, { variant: e.destructive ? "danger" : "primary", onClick: () => t(!0) })
      )
    )
  ).closed.then((t) => t === !0);
}
let ie = null;
function D(e, a = "neutral", t = 4500) {
  (!ie || !ie.isConnected) && (ie = n("div", { class: "ks-toasts", role: "status", aria: { live: "polite" } }), document.body.appendChild(ie));
  const s = n("div", { class: `ks-toast ks-toast-${a}` }, e);
  ie.appendChild(s), setTimeout(() => s.remove(), t);
}
function R(e) {
  let a = 0, t = null, s = !1, i = !1;
  const o = n("div", { class: "ks-stale-banner", role: "alert", hidden: !0 }), r = n("div", { class: "ks-async-content" });
  _(e.host, o, r);
  const u = () => {
    if (i)
      return;
    t?.abort(), t = new AbortController();
    const c = a += 1;
    (!s || e.keepStale === !1) && _(r, Xe()), e.load(t.signal).then((l) => {
      if (!(i || c !== a)) {
        if (l.ok) {
          try {
            const d = e.render(l.data, u);
            s = !0, o.hidden = !0, _(r, d);
          } catch (d) {
            console.error("View render failed", d), _(r, Pe({ code: "render_failed", message: N.renderFailed, retryable: !0 }, u));
          }
          return;
        }
        l.error.code !== "aborted" && (s ? (o.hidden = !1, _(o, `${N.olderData} — ${l.error.message} `, T(N.retry, { variant: "ghost", onClick: u }))) : _(r, Pe(l.error, u)));
      }
    });
  };
  return u(), {
    refresh: u,
    dispose() {
      i = !0, t?.abort();
    }
  };
}
function Le(e, a) {
  if (typeof document > "u" || document.getElementById(e))
    return;
  const t = document.createElement("style");
  t.id = e, t.textContent = a, document.head.appendChild(t);
}
const $t = 1, Tt = '.ks-admin,.ks-dialog,.ks-toasts,.ks-scope{--ks-bg: #f5f7f9;--ks-surface: #ffffff;--ks-surface-2: #eef2f5;--ks-border: #d5dde4;--ks-text: #1c2833;--ks-muted: #5c6b78;--ks-accent: #2464a8;--ks-accent-text: #ffffff;--ks-good: #1f7a4d;--ks-warn: #9a6100;--ks-bad: #b3261e;--ks-info: #2464a8;--ks-radius: 10px;--ks-shadow: 0 1px 2px rgba(20, 30, 40, .06), 0 4px 14px rgba(20, 30, 40, .06);--ks-font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;font-family:var(--ks-font);color:var(--ks-text)}@media(prefers-color-scheme:dark){.ks-admin,.ks-dialog,.ks-toasts,.ks-scope:not([data-theme=kiosk]){--ks-bg: #12181e;--ks-surface: #1a222a;--ks-surface-2: #222c36;--ks-border: #33404c;--ks-text: #e6ecf1;--ks-muted: #96a5b2;--ks-accent: #5b9be0;--ks-accent-text: #0b1620;--ks-good: #5cc493;--ks-warn: #e0a84a;--ks-bad: #f08a83;--ks-info: #5b9be0;--ks-shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 4px 14px rgba(0, 0, 0, .35)}}.ks-admin *,.ks-dialog *,.ks-toasts *,.ks-scope *{box-sizing:border-box}.ks-scope[data-theme=kiosk]{--ks-bg: transparent;--ks-surface: rgba(255, 255, 255, .72);--ks-surface-2: rgba(32, 48, 65, .06);--ks-border: rgba(32, 48, 65, .12);--ks-text: #203041;--ks-muted: rgba(32, 48, 65, .66)}.ks-admin{display:grid;grid-template-columns:232px minmax(0,1fr);min-height:100vh;min-height:100dvh;background:var(--ks-bg);font-size:15px;line-height:1.45}.ks-sidebar{position:sticky;top:0;height:100vh;height:100dvh;display:flex;flex-direction:column;gap:8px;padding:16px 12px;background:var(--ks-surface);border-right:1px solid var(--ks-border);overflow-y:auto}.ks-brand{padding:4px 10px 12px;font-weight:700;font-size:17px;letter-spacing:-.01em}.ks-nav-list{display:flex;flex-direction:column;gap:2px}.ks-nav-group{margin:12px 10px 4px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ks-muted)}.ks-nav-item,.ks-bottom-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;color:var(--ks-text);text-decoration:none;min-height:40px}.ks-nav-item:hover{background:var(--ks-surface-2)}.ks-nav-item[aria-current=page]{background:color-mix(in srgb,var(--ks-accent) 14%,transparent);color:var(--ks-accent);font-weight:600}.ks-nav-icon{width:22px;text-align:center;flex:none}.ks-nav-footer{margin-top:auto;display:flex;flex-direction:column;gap:2px;padding-top:12px;border-top:1px solid var(--ks-border)}.ks-nav-footer-link{padding:6px 10px;color:var(--ks-muted);text-decoration:none;font-size:13px}.ks-content{min-width:0;display:flex;flex-direction:column}.ks-topbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;padding:12px 20px;background:color-mix(in srgb,var(--ks-bg) 88%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--ks-border)}.ks-topbar-title{margin:0;font-size:20px;font-weight:700;letter-spacing:-.01em;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ks-menu-button,.ks-bottom-nav,.ks-scrim{display:none}.ks-main-view{flex:1;padding:20px;outline:none;max-width:1200px;width:100%}.ks-conn{font-size:12px;padding:3px 10px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-muted);white-space:nowrap}.ks-conn[data-state=live]{color:var(--ks-good)}.ks-conn[data-state=reconnecting],.ks-conn[data-state=connecting]{color:var(--ks-warn)}.ks-conn[data-state=offline]{color:var(--ks-bad);border-color:var(--ks-bad)}@media(max-width:899px){.ks-admin{display:block;padding-bottom:64px}.ks-sidebar{position:fixed;inset:0 auto 0 0;z-index:30;width:min(84vw,300px);transform:translate(-102%);transition:transform .18s ease;box-shadow:var(--ks-shadow)}.ks-admin:not([data-menu=open]) .ks-sidebar{visibility:hidden;transition:transform .18s ease,visibility 0s linear .18s}.ks-admin[data-menu=open] .ks-sidebar{transform:none}.ks-admin[data-menu=open] .ks-scrim{display:block;position:fixed;inset:0;z-index:20;background:#0006}.ks-menu-button{display:inline-flex}.ks-topbar{padding:10px 12px}.ks-topbar-title{font-size:17px}.ks-main-view{padding:14px 12px}.ks-bottom-nav{position:fixed;inset:auto 0 0;z-index:10;display:grid;grid-auto-flow:column;grid-auto-columns:1fr;background:var(--ks-surface);border-top:1px solid var(--ks-border);padding-bottom:env(safe-area-inset-bottom,0)}.ks-bottom-item{flex-direction:column;gap:2px;justify-content:center;padding:8px 4px;font-size:11px;border-radius:0;min-height:56px;color:var(--ks-muted)}.ks-bottom-item[aria-current=page]{color:var(--ks-accent);font-weight:600}.ks-bottom-item .ks-nav-label{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.ks-page{display:flex;flex-direction:column;gap:16px}.ks-card{background:var(--ks-surface);border:1px solid var(--ks-border);border-radius:var(--ks-radius);padding:16px;box-shadow:var(--ks-shadow);min-width:0}.ks-card>h2,.ks-card>header>h2{margin:0 0 10px;font-size:15px;font-weight:700}.ks-card>header{display:flex;align-items:center;justify-content:space-between;gap:8px}.ks-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}.ks-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ks-row-spread{justify-content:space-between}.ks-toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.ks-toolbar .ks-grow{flex:1;min-width:180px}.ks-muted{color:var(--ks-muted)}.ks-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}.ks-list>li{display:flex;align-items:center;gap:10px;padding:9px 2px;border-bottom:1px solid var(--ks-border);min-width:0}.ks-list>li:last-child{border-bottom:0}.ks-list .ks-grow{flex:1;min-width:0}.ks-list .ks-title{font-weight:600;overflow-wrap:anywhere}.ks-list .ks-sub{color:var(--ks-muted);font-size:13px;overflow-wrap:anywhere}.ks-done{text-decoration:line-through;color:var(--ks-muted)}.ks-tree{list-style:none;margin:0;padding-left:18px;border-left:1px dashed var(--ks-border)}.ks-tree.ks-tree-root{padding-left:0;border-left:0}.ks-tree-node{padding:3px 0}.ks-btn{font:inherit;font-size:14px;min-height:38px;padding:0 14px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer;touch-action:manipulation}.ks-btn:hover:not(:disabled){background:var(--ks-surface-2)}.ks-btn:focus-visible,.ks-field input:focus-visible,.ks-field select:focus-visible,.ks-field textarea:focus-visible,.ks-nav-item:focus-visible,.ks-bottom-item:focus-visible{outline:2px solid var(--ks-accent);outline-offset:1px}.ks-btn:disabled{opacity:.55;cursor:default}.ks-btn-primary{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text);font-weight:600}.ks-btn-primary:hover:not(:disabled){background:color-mix(in srgb,var(--ks-accent) 88%,black)}.ks-btn-danger{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 50%,var(--ks-border))}.ks-btn-ghost{border-color:transparent;background:transparent}.ks-btn-sm{min-height:30px;padding:0 10px;font-size:13px}.ks-form{display:flex;flex-direction:column;gap:12px}.ks-form-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}.ks-form-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}.ks-form-error,.ks-field-error{color:var(--ks-bad);font-size:13px}.ks-field{display:flex;flex-direction:column;gap:4px;min-width:0}.ks-field-wide{grid-column:1 / -1}.ks-field label{font-size:13px;font-weight:600;color:var(--ks-muted)}.ks-field input:not([type=checkbox]),.ks-field select,.ks-field textarea,.ks-input{font:inherit;font-size:16px;width:100%;min-height:40px;padding:8px 10px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text)}.ks-field-check{flex-direction:row;align-items:center;gap:8px}.ks-field.has-error input,.ks-field.has-error select,.ks-field.has-error textarea{border-color:var(--ks-bad)}.ks-field-hint{color:var(--ks-muted);font-size:12px}.ks-required{color:var(--ks-bad)}.ks-badge{display:inline-block;padding:1px 8px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid var(--ks-border);background:var(--ks-surface-2);color:var(--ks-muted);white-space:nowrap}.ks-badge-good{color:var(--ks-good);border-color:color-mix(in srgb,var(--ks-good) 40%,var(--ks-border))}.ks-badge-warn{color:var(--ks-warn);border-color:color-mix(in srgb,var(--ks-warn) 40%,var(--ks-border))}.ks-badge-bad{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 40%,var(--ks-border))}.ks-badge-info{color:var(--ks-info);border-color:color-mix(in srgb,var(--ks-info) 40%,var(--ks-border))}.ks-empty,.ks-loading,.ks-error{padding:28px 16px;text-align:center;color:var(--ks-muted)}.ks-empty strong,.ks-error strong{display:block;color:var(--ks-text);margin-bottom:4px}.ks-error{color:var(--ks-bad);display:flex;flex-direction:column;align-items:center;gap:8px}.ks-spinner{display:inline-block;width:16px;height:16px;margin-right:8px;vertical-align:-3px;border:2px solid var(--ks-border);border-top-color:var(--ks-accent);border-radius:50%;animation:ks-spin .8s linear infinite}@keyframes ks-spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.ks-spinner{animation-duration:3s}}.ks-stale-banner{padding:8px 12px;margin-bottom:10px;border-radius:8px;background:color-mix(in srgb,var(--ks-warn) 14%,var(--ks-surface));color:var(--ks-warn);font-size:13px}.ks-table-wrap{overflow-x:auto}.ks-table{width:100%;border-collapse:collapse;font-size:14px}.ks-table th,.ks-table td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--ks-border);vertical-align:top}.ks-table th{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--ks-muted)}@media(max-width:640px){.ks-table thead{display:none}.ks-table,.ks-table tbody,.ks-table tr,.ks-table td{display:block;width:100%}.ks-table tr{padding:8px 0;border-bottom:1px solid var(--ks-border)}.ks-table td{border:0;padding:2px 4px}.ks-table td:before{content:attr(data-label) ": ";color:var(--ks-muted);font-size:12px}.ks-table td[data-label=""]:before{content:none}}.ks-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;background:#00000073}.ks-dialog{width:min(560px,100%);max-height:92vh;overflow:auto;background:var(--ks-surface);border-radius:14px;box-shadow:var(--ks-shadow);border:1px solid var(--ks-border)}.ks-dialog-head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--ks-border)}.ks-dialog-head h2{margin:0;font-size:16px}.ks-dialog-body{padding:16px}.ks-toasts{position:fixed;z-index:120;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;max-width:min(360px,calc(100vw - 32px))}.ks-toast{padding:10px 14px;border-radius:10px;background:var(--ks-text);color:var(--ks-bg);box-shadow:var(--ks-shadow);font-size:14px}.ks-toast-good{background:var(--ks-good);color:#fff}.ks-toast-bad{background:var(--ks-bad);color:#fff}@media(max-width:899px){.ks-toasts{bottom:72px}}.ks-chip{font:inherit;font-size:14px;min-height:34px;padding:4px 12px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer}.ks-chip.is-active{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text)}.ks-link{font:inherit;padding:0;border:0;background:none;color:var(--ks-accent);cursor:pointer;text-align:left;text-decoration:underline;text-underline-offset:2px}.ks-filters{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end}.ks-filters .ks-field{flex:1 1 200px;min-width:0}.ks-list-click>li{cursor:pointer}.ks-list-click>li:hover,.ks-list-click>li:focus-visible{background:var(--ks-surface-2);outline:none}@media(max-width:640px){.ks-hide-narrow{display:none}}', At = Tt, tt = "domovoy.api", at = "domovoy.actions", ke = "domovoy.events", W = (e, a = ["id"]) => Object.fromEntries(Object.entries(e).filter(([t]) => !a.includes(t))), U = (e) => (a) => `${e}/${encodeURIComponent(String(a.id))}`, Ie = {
  "command.send": { title: "Отправить команду", method: "POST", path: () => "api/command", body: (e) => e },
  "command.undo": { title: "Отменить команду", method: "POST", path: (e) => `api/commands/${e.id}/undo`, body: () => ({}) },
  "items.create": { title: "Добавить предмет", method: "POST", path: () => "api/items", body: (e) => e },
  "items.update": { title: "Изменить предмет", method: "PATCH", path: U("api/items"), body: (e) => W(e) },
  "items.delete": { title: "Удалить предмет", method: "DELETE", path: U("api/items"), destructive: !0 },
  "items.move": { title: "Переместить предмет", method: "POST", path: (e) => `api/items/${e.id}/move`, body: (e) => W(e) },
  "items.consume": { title: "Списать", method: "POST", path: (e) => `api/items/${e.id}/consume`, body: (e) => W(e) },
  "locations.create": { title: "Добавить место", method: "POST", path: () => "api/locations", body: (e) => e },
  "locations.update": { title: "Изменить место", method: "PATCH", path: U("api/locations"), body: (e) => W(e) },
  "locations.delete": { title: "Удалить место", method: "DELETE", path: U("api/locations"), destructive: !0 },
  "notes.create": { title: "Добавить заметку", method: "POST", path: () => "api/notes", body: (e) => e },
  "notes.update": { title: "Изменить заметку", method: "PATCH", path: U("api/notes"), body: (e) => W(e) },
  "notes.delete": { title: "Удалить заметку", method: "DELETE", path: U("api/notes"), destructive: !0 },
  "tasks.create": { title: "Добавить задачу", method: "POST", path: () => "api/tasks", body: (e) => e },
  "tasks.update": { title: "Изменить задачу", method: "PATCH", path: U("api/tasks"), body: (e) => W(e) },
  "tasks.complete": { title: "Отметить задачу", method: "POST", path: (e) => `api/tasks/${e.id}/complete`, body: (e) => ({ done: e.done ?? !0 }) },
  "tasks.delete": { title: "Удалить задачу", method: "DELETE", path: U("api/tasks"), destructive: !0 },
  "reminders.create": { title: "Добавить напоминание", method: "POST", path: () => "api/reminders", body: (e) => e },
  "reminders.update": { title: "Изменить напоминание", method: "PATCH", path: U("api/reminders"), body: (e) => W(e) },
  "reminders.done": { title: "Напоминание выполнено", method: "POST", path: (e) => `api/reminders/${e.id}/done`, body: () => ({}) },
  "reminders.snooze": { title: "Отложить напоминание", method: "POST", path: (e) => `api/reminders/${e.id}/snooze`, body: (e) => ({ minutes: e.minutes }) },
  "reminders.delete": { title: "Удалить напоминание", method: "DELETE", path: U("api/reminders"), destructive: !0 },
  "calendar.create": { title: "Добавить событие", method: "POST", path: () => "api/calendar/events", body: (e) => e },
  "calendar.update": { title: "Изменить событие", method: "PATCH", path: () => "api/calendar/event", body: (e) => W(e, ["ref"]), query: (e) => ({ ref: e.ref }) },
  "calendar.delete": { title: "Удалить событие", method: "DELETE", path: () => "api/calendar/event", query: (e) => ({ ref: e.ref }), destructive: !0 },
  "contacts.create": { title: "Добавить контакт", method: "POST", path: () => "api/contacts", body: (e) => e },
  "contacts.update": { title: "Изменить контакт", method: "PATCH", path: U("api/contacts"), body: (e) => W(e) },
  "contacts.delete": { title: "Удалить контакт", method: "DELETE", path: U("api/contacts"), destructive: !0 },
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
}, Te = "domovoy.token";
function Et() {
  try {
    return window.localStorage.getItem(Te);
  } catch {
    return null;
  }
}
function Ct(e) {
  try {
    e ? window.localStorage.setItem(Te, e) : window.localStorage.removeItem(Te);
  } catch {
  }
}
function qt(e) {
  const a = ht({
    baseUrl: e.baseUrl,
    fetchImpl: e.fetchImpl,
    getToken: Et,
    // The custom header is what turns a cross-site form post into something the server refuses (CSRF defence).
    headers: { "X-Domovoy-Client": "kiosk-scene" },
    onUnauthorized: () => e.onUnauthorized?.(),
    timeoutMs: 2e4
  });
  return { http: a, data: {
    id: tt,
    async read(i, o) {
      const r = String(i?.path ?? "");
      return /^(api\/|events)/.test(r) ? a.request(r, { query: i.query, signal: o?.signal }) : { ok: !1, error: { code: "bad_path", message: `Refusing to read ${r}` } };
    }
  }, actions: {
    id: at,
    describe() {
      return Object.entries(Ie).map(([i, o]) => ({ id: i, title: o.title, destructive: o.destructive }));
    },
    async invoke(i, o, r) {
      const u = Ie[i];
      if (!u)
        return { ok: !1, error: { code: "unknown_action", message: `Unknown action ${i}` } };
      const c = o ?? {};
      return a.request(u.path(c), {
        method: u.method,
        body: u.body ? u.body(c) : void 0,
        query: u.query?.(c),
        signal: r?.signal
      });
    }
  } };
}
const b = {
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
function Q(e) {
  return b.statuses[e] ?? e;
}
function de(e) {
  return ["applied", "answered", "done", "sent", "ok", "approved"].includes(e) ? "good" : ["clarify", "review", "pending", "queued", "sending", "partial", "degraded", "fired"].includes(e) ? "warn" : ["failed", "rejected", "down", "cancelled"].includes(e) ? "bad" : "neutral";
}
let nt = "";
function ne(e) {
  nt = e;
}
function Z() {
  return nt || Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function st(e, a) {
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
function te(e, a = Z()) {
  const t = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(e);
  if (!t)
    throw new Error(`Invalid local time: ${e}`);
  const [s, i, o, r, u] = t.slice(1).map(Number), c = Date.UTC(s, i - 1, o, r, u);
  let l = c;
  for (let d = 0; d < 2; d += 1) {
    const p = st(new Date(l), a), m = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute));
    l += c - m;
  }
  return new Date(l).toISOString().replace(/\.\d{3}Z$/, "Z");
}
function ee(e, a = Z()) {
  const t = st(new Date(e), a);
  return `${t.year}-${t.month}-${t.day}T${t.hour}:${t.minute}`;
}
function L(e, a = Z()) {
  return e ? new Intl.DateTimeFormat("ru-RU", { timeZone: a, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(e)) : "—";
}
function ae(e, a = Z()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: a, hour: "2-digit", minute: "2-digit" }).format(new Date(e));
}
function Ot(e, a = Z()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: a, weekday: "long", day: "numeric", month: "long" }).format(new Date(e));
}
function Y(e, a = Z()) {
  return ee(e, a).slice(0, 10);
}
function Oe(e, a = Date.now()) {
  const t = new Date(e).getTime() - a, s = Math.abs(t), i = Math.round(s / 6e4), o = i < 1 ? "сейчас" : i < 60 ? `${i} мин` : i < 2880 ? `${Math.round(i / 60)} ч` : `${Math.round(i / 1440)} дн`;
  return i < 1 ? o : t < 0 ? `${o} назад` : `через ${o}`;
}
function it(e) {
  if (!e)
    return "";
  const a = e.window ? ` (${e.window.from}–${e.window.to})` : "";
  return e.type === "presence" ? `когда буду дома${a}` : e.type === "room" ? `когда зайду: ${e.place}${a}` : e.type === "state" ? `когда ${e.entity_id} ${e.from ? `перестанет быть «${e.from}»` : `станет «${e.to}»`}` : "по условию";
}
function be(e) {
  if (!e)
    return "";
  const a = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"], t = e.interval > 1 ? `каждые ${e.interval} ` : "каждый ";
  return e.freq === "weekly" && e.byweekday?.length ? `по ${e.byweekday.map((s) => a[s]).join(", ")}` : { daily: `${t}день`, weekly: `${t}неделю`, monthly: `${t}месяц`, yearly: `${t}год` }[e.freq] ?? "повторяется";
}
function je(e, a = "") {
  return e == null ? "" : `${Number.isInteger(e) ? String(e) : String(Math.round(e * 1e3) / 1e3)} ${a}`.trim();
}
const ze = ["ui", "telegram", "speak", "ha_notify"], he = ["tasks", "shopping", "chores"], ge = {
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
  create_reminder: { title: "Напоминание", fields: [{ name: "text", label: "О чём", kind: "str" }, { name: "when", label: "Когда", kind: "iso" }, { name: "channel", label: "Как", kind: "enum", options: ze }, { name: "recipient", label: "Кому", kind: "str" }, { name: "trigger", label: "Условие", kind: "json" }, { name: "recurrence", label: "Повтор", kind: "json" }] },
  create_event: { title: "Событие в календаре", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "start", label: "Начало", kind: "iso" }, { name: "end", label: "Конец", kind: "iso" }, { name: "location", label: "Где", kind: "str" }] },
  update_event: { title: "Перенести/изменить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }, { name: "new_title", label: "Новое название", kind: "str" }, { name: "new_start", label: "Новое начало", kind: "iso" }, { name: "new_end", label: "Новый конец", kind: "iso" }] },
  delete_event: { title: "Удалить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }] },
  query_calendar: { title: "Что в календаре", fields: [{ name: "start", label: "С", kind: "iso" }, { name: "end", label: "По", kind: "iso" }] },
  send_message: { title: "Сообщение", fields: [{ name: "recipient", label: "Кому", kind: "str" }, { name: "text", label: "Текст", kind: "str" }, { name: "channel", label: "Как", kind: "enum", options: ze }, { name: "when", label: "Когда", kind: "iso" }] },
  add_task: { title: "Задача", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: he }, { name: "due_date", label: "Срок (ГГГГ-ММ-ДД)", kind: "str" }] },
  add_shopping: { title: "В список покупок", fields: [{ name: "items", label: "Что купить (через запятую)", kind: "list" }] },
  complete_task: { title: "Отметить задачу", fields: [{ name: "title", label: "Какая", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: he }] },
  query_tasks: { title: "Показать задачи", fields: [{ name: "list", label: "Список", kind: "enum", options: he }] },
  ha_control: { title: "Управление домом", fields: [{ name: "service", label: "Сервис", kind: "str" }, { name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }, { name: "data", label: "Параметры", kind: "json" }] },
  ha_query: { title: "Состояние устройства", fields: [{ name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }] },
  clarify: { title: "Вопрос", fields: [{ name: "question", label: "Вопрос", kind: "str" }] },
  undo: { title: "Отмена последнего", fields: [] },
  help: { title: "Справка", fields: [] }
};
function jt(e) {
  return ge[e]?.title ?? e;
}
function ot(e, a) {
  return a == null ? "" : e.kind === "path" ? Array.isArray(a) ? a.join(" → ") : String(a) : e.kind === "list" ? Array.isArray(a) ? a.join(", ") : String(a) : e.kind === "json" ? JSON.stringify(a) : e.kind === "bool" ? a ? "да" : "нет" : String(a);
}
function rt(e, a = (t) => t) {
  const t = ge[String(e.type)];
  if (!t)
    return String(e.type);
  const s = t.fields.filter((i) => e[i.name] !== void 0 && e[i.name] !== null && e[i.name] !== "" && e[i.name] !== !1).map((i) => `${i.label.replace(/ \(.*\)$/, "")}: ${i.kind === "iso" ? a(String(e[i.name])) : ot(i, e[i.name])}`);
  return s.length ? `${t.title} — ${s.join("; ")}` : t.title;
}
function Dt(e, a, t) {
  const s = ge[String(e.type)], i = { ...e };
  for (const o of s?.fields ?? []) {
    if (!(o.name in a) || o.kind === "json")
      continue;
    const r = a[o.name];
    if (o.kind === "bool") {
      r === !0 ? i[o.name] = !0 : delete i[o.name];
      continue;
    }
    const u = String(r).trim();
    if (!u)
      delete i[o.name];
    else if (o.kind === "num") {
      const c = Number(u.replace(",", "."));
      i[o.name] = Number.isFinite(c) ? c : u;
    } else o.kind === "path" ? i[o.name] = u.split(/→|->|>/).map((c) => c.trim()).filter(Boolean) : o.kind === "list" ? i[o.name] = u.split(",").map((c) => c.trim()).filter(Boolean) : o.kind === "iso" ? i[o.name] = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(u) ? t(u) : u : i[o.name] = u;
  }
  return i;
}
function $(e, a, t, s) {
  return e.readData(tt, { path: a, query: t }, { signal: s });
}
function lt(e, a, t) {
  return e.invokeAction(at, a, t);
}
async function A(e, a, t, s = {}) {
  if (s.confirm && !await et({ title: s.confirm.title, message: s.confirm.message, confirmLabel: s.confirm.label ?? b.delete, destructive: !0 }))
    return { ok: !1, error: { code: "cancelled", message: "cancelled" } };
  const i = await lt(e, a, t);
  return i.ok ? s.success && D(s.success, "good") : D(i.error.message, "bad", 7e3), i;
}
function B(e, a, t, s, i = 250, o) {
  let r = !1;
  const u = () => {
    const d = document.activeElement;
    return !o || !d || !o.contains(d) ? !1 : /^(INPUT|TEXTAREA|SELECT)$/.test(d.tagName) || d.tagName === "BUTTON" && d.closest("form") !== null;
  }, c = () => {
    if (u()) {
      r = !0;
      return;
    }
    r = !1, s();
  }, l = Je(c, i);
  if (a.add(() => l.cancel()), o) {
    const d = (p) => {
      !r || p.relatedTarget instanceof Node && o.contains(p.relatedTarget) || window.setTimeout(() => {
        r && !u() && c();
      }, 150);
    };
    o.addEventListener("focusout", d), a.add(() => o.removeEventListener("focusout", d));
  }
  for (const d of t)
    a.add(e.subscribe(ke, d, () => l()));
}
function De(e, a) {
  const t = document.activeElement instanceof HTMLElement && e.contains(document.activeElement) ? document.activeElement.dataset.key : void 0;
  a(), t && e.querySelector(`[data-key="${CSS.escape(t)}"]`)?.focus();
}
function H(e, a) {
  return {
    dispose() {
      e.dispose();
    }
  };
}
function M(e, a, t) {
  return n("section", { class: "ks-card" }, n("header", null, n("h2", null, e), null), a);
}
function ve(e) {
  return j(Q(e), de(e));
}
function P(e, a, t, s = "") {
  return n("li", { class: s }, n("div", { class: "ks-grow" }, n("div", { class: "ks-title" }, e), a ? n("div", { class: "ks-sub" }, a) : null), t ?? null);
}
function w(e, a, t = "secondary", s) {
  const i = T(e, { variant: t, onClick: a, title: s });
  return i.classList.add("ks-btn-sm"), i;
}
function G(e, ...a) {
  return n("div", { class: "ks-row ks-row-spread dv-head" }, n("h2", { class: "dv-page-title" }, e), n("div", { class: "ks-row" }, a));
}
function q(e = b.empty) {
  return n("p", { class: "ks-muted" }, e);
}
function K(e, a, t, s = {}) {
  return ue(e, (o) => {
    const r = ce(a, {
      submitLabel: s.submitLabel ?? b.save,
      extraActions: [T(b.cancel, { onClick: () => o(!1) })],
      onSubmit: async (u, c) => {
        const l = await t(u);
        l.ok ? o(!0) : c.showErrors(l.error);
      }
    });
    return n("div", null, s.note ?? null, r.el);
  }).closed.then((o) => o === !0);
}
function Mt(e) {
  const a = {};
  for (const t of e.split(/\r?\n/)) {
    const s = t.indexOf(":"), i = (s >= 0 ? t.slice(0, s) : t).trim(), o = s >= 0 ? t.slice(s + 1).trim() : "";
    i && (a[i] = o);
  }
  return a;
}
function Pt(e) {
  return Object.entries(e ?? {}).map(([a, t]) => `${a}: ${t}`).join(`
`);
}
function Lt(e) {
  return e.split(/→|->|>|\//).map((a) => a.trim()).filter(Boolean);
}
function It(e) {
  if (typeof e != "string" || e.trim() === "")
    return null;
  const a = Number(e.replace(",", "."));
  return Number.isFinite(a) ? a : null;
}
async function me(e, a) {
  const [t, s] = await Promise.all([e, a]);
  return t.ok ? s.ok ? { ok: !0, data: [t.data, s.data] } : s : t;
}
const zt = [["audit", "Изменения"], ["commands", "Команды"], ["outbox", "Отправка сообщений"]];
function Nt(e, a, t) {
  const s = new I(), i = n("div"), o = n("div", { class: "ks-row dv-chips", role: "tablist" });
  let r = "audit", u = null;
  const c = () => {
    u?.dispose(), De(o, () => _(o, zt.map(
      ([d, p]) => n("button", { type: "button", role: "tab", dataset: { key: d }, class: `ks-chip${r === d ? " is-active" : ""}`, "aria-selected": String(r === d), onClick: () => {
        r = d, c();
      } }, p)
    ))), r === "audit" ? u = R({
      host: i,
      load: (d) => $(t, "api/audit", { limit: 100 }, d),
      render: ({ audit: d }, p) => d.length ? n("ul", { class: "ks-list" }, d.map(
        (m) => P(
          n("span", null, m.summary, " ", j(m.source, "neutral")),
          `${L(m.ts)} · ${m.actor}`,
          m.undoable ? w(b.undo, async () => {
            (await A(t, "audit.undo", { id: m.id }, { success: "Отменено" })).ok && p();
          }, "ghost") : null
        )
      )) : q("Изменений пока не было.")
    }) : r === "commands" ? u = R({
      host: i,
      load: (d) => $(t, "api/commands", { limit: 100 }, d),
      render: ({ commands: d }) => d.length ? n("ul", { class: "ks-list" }, d.map(
        (p) => P(
          n("span", null, `«${p.text}»`, " ", l(p.status)),
          [L(p.ts), p.frontend, p.interpreter ?? "", p.confidence !== null ? `${Math.round(p.confidence * 100)}%` : "", p.reply ?? p.error ?? ""].filter(Boolean).join(" · "),
          p.intents?.length ? n("details", null, n("summary", null, "Как я понял"), n("ul", null, p.intents.map((m) => n("li", null, rt(m, (h) => L(h)))))) : null
        )
      )) : q("Команд пока не было.")
    }) : u = R({
      host: i,
      load: (d) => $(t, "api/outbox", { limit: 100 }, d),
      render: ({ messages: d }, p) => d.length ? n("ul", { class: "ks-list" }, d.map(
        (m) => P(
          n("span", null, m.text, " ", ve(m.status)),
          `${b.channels[m.channel] ?? m.channel} → ${m.recipient || "—"} · ${L(m.created_at)}${m.attempts ? ` · попыток: ${m.attempts}` : ""}${m.last_error ? ` · ${m.last_error}` : ""}`,
          n(
            "div",
            { class: "ks-row" },
            m.status === "failed" || m.status === "queued" ? w("Повторить", async () => {
              (await A(t, "outbox.retry", { id: m.id })).ok && p();
            }, "primary") : null,
            m.status === "failed" || m.status === "queued" ? w(b.cancel, async () => {
              (await A(t, "outbox.cancel", { id: m.id })).ok && p();
            }, "danger") : null
          )
        )
      )) : q("Исходящих сообщений не было.")
    });
  }, l = (d) => ve(d);
  return c(), _(e, n("div", { class: "ks-page" }, G(b.activity), o, M("", i))), B(t, s, ["audit", "commands", "outbox", "items", "locations", "notes", "tasks", "reminders", "calendar"], () => u?.refresh(), 500), s.add(() => u?.dispose()), H(s);
}
function Ne(e, a, t, s) {
  const i = Z(), o = ee(t ? t.start : new Date(Math.ceil(Date.now() / 36e5) * 36e5).toISOString(), i), r = t ? ee(t.end, i) : "", u = a.sources.filter((c) => c.capabilities.includes("create") && c.available);
  K(
    t ? `Изменить: ${t.title}` : "Новое событие",
    [
      { name: "title", label: b.title, required: !0, value: t?.title ?? "", wide: !0 },
      { name: "start", label: "Начало", type: "datetime-local", required: !0, value: o },
      { name: "end", label: "Конец", type: "datetime-local", value: r, hint: "Пусто — по умолчанию из настроек." },
      { name: "all_day", label: "Весь день", type: "checkbox", value: t?.all_day ?? !1 },
      { name: "location", label: "Где", value: t?.location ?? "", wide: !0 },
      { name: "notes", label: b.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 },
      ...t ? [] : [{ name: "calendar", label: "Календарь", type: "select", options: u.map((c) => ({ value: c.id, label: c.title })), value: a.default }]
    ],
    async (c) => {
      const l = {
        title: String(c.title).trim(),
        start: te(String(c.start), i),
        all_day: c.all_day === !0,
        location: String(c.location ?? ""),
        notes: String(c.notes ?? "")
      };
      c.end && (l.end = te(String(c.end), i));
      const d = t ? await e.invokeAction("domovoy.actions", "calendar.update", { ref: t.ref, ...l }) : await e.invokeAction("domovoy.actions", "calendar.create", { ...l, calendar: c.calendar });
      return d.ok && s(), d;
    }
  );
}
function Rt(e, a, t) {
  const s = new I(), i = n("div");
  let o = 14, r = { sources: [], default: "local" };
  const u = T(b.add, { variant: "primary" }), c = T("Показать ещё 2 недели", { variant: "ghost" }), l = R({
    host: i,
    load: (d) => {
      const p = Z(), m = Y((/* @__PURE__ */ new Date()).toISOString(), p), h = te(`${m}T00:00`, p), g = te(`${Y(new Date(Date.parse(`${m}T12:00:00Z`) + o * 864e5).toISOString(), "UTC")}T00:00`, p);
      return me(
        $(t, "api/calendar/events", { start: h, end: g }, d),
        $(t, "api/calendar/sources", void 0, d)
      );
    },
    render: ([{ events: d, warnings: p }, m], h) => {
      r = m, u.onclick = () => Ne(t, r, null, h);
      const g = /* @__PURE__ */ new Map();
      for (const v of d) {
        const y = Y(v.start);
        g.set(y, [...g.get(y) ?? [], v]);
      }
      return n(
        "div",
        null,
        p.length ? n("div", { class: "ks-stale-banner", role: "alert" }, `Не удалось прочитать календарь: ${p.map((v) => `${v.source} (${v.message})`).join("; ")}. Показано то, что доступно.`) : null,
        g.size ? [...g.entries()].sort(([v], [y]) => v.localeCompare(y)).map(
          ([v, y]) => n(
            "section",
            { class: "ks-card" },
            n("header", null, n("h2", null, Ot(y[0].start))),
            n("ul", { class: "ks-list" }, y.sort((f, E) => f.start.localeCompare(E.start)).map(
              (f) => P(
                n("span", null, f.title, f.recurring ? n("span", { class: "ks-muted" }, " ↻") : null, f.read_only ? [" ", j("только чтение", "neutral")] : null),
                `${f.all_day ? "весь день" : `${ae(f.start)}–${ae(f.end)}`}${f.location ? ` · ${f.location}` : ""} · ${f.calendar}`,
                f.read_only ? null : n(
                  "div",
                  { class: "ks-row" },
                  w(b.edit, () => Ne(t, r, f, h)),
                  w(b.delete, async () => {
                    (await A(t, "calendar.delete", { ref: f.ref }, { confirm: { title: "Удалить событие", message: `«${f.title}» будет удалено из календаря.` } })).ok && h();
                  }, "danger")
                )
              )
            ))
          )
        ) : q(`На ближайшие ${o} дней событий нет.`)
      );
    }
  });
  return c.onclick = () => {
    o += 14, l.refresh();
  }, e.replaceChildren(n("div", { class: "ks-page" }, G(b.calendar, u), i, n("div", { class: "ks-row" }, c))), t.readData("domovoy.api", { path: "api/state" }).then((d) => d.ok && ne(d.data.timezone)), B(t, s, ["calendar"], () => l.refresh()), s.add(() => l.dispose()), H(s);
}
const Ut = {
  home_assistant: "Home Assistant",
  telegram: "Telegram",
  caldav: "Календарь CalDAV",
  llm: "Языковая модель",
  speak: "Голос через колонки",
  stt: "Распознавание речи"
}, Re = (e) => Array.isArray(e) ? e.join(`
`) : "", Ae = (e) => e.split(/[\n,]/).map((a) => a.trim()).filter(Boolean);
function oe(e, a, t, s) {
  return ce(a, {
    onSubmit: async (o, r) => {
      const { settings: u, secrets: c } = t(o), l = Object.fromEntries(Object.entries(c ?? {}).filter(([, d]) => d !== ""));
      if (u && Object.keys(u).length) {
        const d = await e.invokeAction("domovoy.actions", "settings.update", u);
        if (!d.ok) {
          r.showErrors(d.error);
          return;
        }
        (d.data.secrets_cleared ?? []).filter((m) => !(m in l)).length && D("Адрес изменён, поэтому сохранённый ключ сброшен — введите его заново.", "warn", 9e3);
      }
      if (Object.keys(l).length) {
        const d = await e.invokeAction("domovoy.actions", "secrets.set", l);
        if (!d.ok) {
          r.showErrors(d.error);
          return;
        }
      }
      D("Сохранено", "good"), s();
    }
  }).el;
}
const pe = (e, a, t) => ({
  name: e,
  label: a,
  type: "password",
  value: "",
  autocomplete: "new-password",
  placeholder: t ? "сохранён — введите, чтобы заменить" : "не задан",
  wide: !0
});
function Bt(e, a, t) {
  return w("Проверить", async () => {
    const s = await e.invokeAction("domovoy.actions", "integration.test", { name: a });
    s.ok ? s.data.ok ? D("Связь есть", "good") : D(s.data.error?.message ?? "Не получилось", "bad", 7e3) : D(s.error.message, "bad", 7e3), t();
  });
}
function J(e, a, t, s) {
  return n("details", { class: "ks-card dv-section", id: `dv-${e}` }, n("summary", null, n("h2", null, a), t), s);
}
function ye(e, a, t, s, i, o, r, u) {
  const c = async (d) => {
    const p = await e.invokeAction("domovoy.actions", "settings.update", { [a]: d });
    return p.ok ? u() : D(p.error.message, "bad", 7e3), p;
  }, l = (d) => {
    const p = d >= 0 ? t[d] : null;
    K(p ? `Изменить: ${r}` : `Добавить: ${r}`, i(p), async (m) => {
      const h = t.slice(), g = o(m, p);
      return d >= 0 ? h[d] = g : h.push(g), c(h);
    });
  };
  return n(
    "div",
    null,
    qe(
      [
        ...s.map((d, p) => ({ key: `c${p}`, header: d.header, render: (m) => d.render(m) })),
        { key: "a", header: "", render: (d) => n("div", { class: "ks-row" }, w(b.edit, () => l(t.indexOf(d))), w(b.delete, async () => {
          await c(t.filter((p) => p !== d));
        }, "danger")) }
      ],
      t,
      q("Пока не задано.")
    ),
    n("div", { class: "ks-row" }, T(b.add, { onClick: () => l(-1) }))
  );
}
function Ht(e, a, t) {
  const s = (o) => {
    K(
      o ? `Изменить: ${o.name}` : "Новый контакт",
      [
        { name: "name", label: "Имя", required: !0, value: o?.name ?? "", wide: !0 },
        { name: "aliases", label: "Как ещё называют", value: (o?.aliases ?? []).join(", "), hint: "Через запятую: «жена, Маша»", wide: !0 },
        { name: "chat_id", label: "Telegram chat_id", value: o?.channels.telegram?.chat_id ?? "", hint: "Проще: пусть человек напишет боту, потом нажмите «Привязать» ниже.", wide: !0 },
        { name: "is_self", label: "Это я", type: "checkbox", value: o?.is_self ?? !1 }
      ],
      async (r) => {
        const u = { ...o?.channels ?? {} };
        String(r.chat_id).trim() ? u.telegram = { chat_id: String(r.chat_id).trim() } : delete u.telegram;
        const c = { name: String(r.name).trim(), aliases: Ae(String(r.aliases)), channels: u, is_self: r.is_self === !0 }, l = o ? await e.invokeAction("domovoy.actions", "contacts.update", { id: o.id, ...c }) : await e.invokeAction("domovoy.actions", "contacts.create", c);
        return l.ok && t(), l;
      }
    );
  }, i = (o, r) => {
    K(
      `Привязать ${r}`,
      [{ name: "contact_id", label: "К контакту", type: "select", options: a.contacts.map((u) => ({ value: String(u.id), label: u.name })), required: !0 }],
      async (u) => {
        const c = await e.invokeAction("domovoy.actions", "contacts.link", { contact_id: Number(u.contact_id), chat_id: o });
        return c.ok && t(), c;
      }
    );
  };
  return n(
    "div",
    null,
    qe(
      [
        { key: "name", header: "Имя", render: (o) => n("span", null, o.name, o.is_self ? [" ", j("это я", "info")] : null) },
        { key: "al", header: "Также", render: (o) => o.aliases.join(", ") || b.none },
        { key: "tg", header: "Telegram", render: (o) => o.channels.telegram?.chat_id ? j("привязан", "good") : j("не привязан", "warn") },
        { key: "a", header: "", render: (o) => n("div", { class: "ks-row" }, w(b.edit, () => s(o)), w(b.delete, async () => {
          (await A(e, "contacts.delete", { id: o.id }, { confirm: { title: "Удалить контакт", message: o.name } })).ok && t();
        }, "danger")) }
      ],
      a.contacts,
      q("Контактов нет. Добавьте себя и тех, кому Домовой будет писать.")
    ),
    a.linkRequests.length ? n(
      "div",
      { class: "dv-link-requests" },
      n("h3", null, "Кто-то написал боту"),
      n("ul", { class: "ks-list" }, a.linkRequests.map((o) => n("li", null, n("div", { class: "ks-grow" }, `${o.name || o.username || "Без имени"} · chat_id ${o.chat_id}`, o.text ? n("div", { class: "ks-sub" }, `«${o.text}»`) : null), w("Привязать…", () => i(o.chat_id, o.name || o.username || o.chat_id), "primary"))))
    ) : null,
    n("div", { class: "ks-row" }, T("Добавить контакт", { onClick: () => s(null) }))
  );
}
const Ft = "http://127.0.0.1:48123/domovoy-api/", Vt = "<секрет Assist — нажмите «Показать»>";
function Ue(e) {
  return [
    "# configuration.yaml — один раз",
    "rest_command:",
    "  domovoy_say:",
    `    url: "${Ft}frontends/assist"`,
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
function Wt(e, a) {
  const t = async () => {
    const o = await $(e, "api/security");
    return o.ok ? o.data : (D(o.error.message, "bad", 7e3), null);
  }, s = async (o) => {
    try {
      await navigator.clipboard.writeText(o), D("Скопировано", "good");
    } catch {
      D("Не удалось скопировать — нажмите «Показать» и выделите вручную", "warn", 7e3);
    }
  }, i = (o, r, u) => {
    const c = n("code", { class: "dv-secret" }, "•".repeat(12));
    let l = !1;
    return n(
      "div",
      { class: "dv-secret-row" },
      n("strong", null, o),
      c,
      n(
        "div",
        { class: "ks-row" },
        w("Показать", async () => {
          if (l) {
            l = !1, c.textContent = "•".repeat(12);
            return;
          }
          const d = await t();
          d && (l = !0, c.textContent = r(d));
        }, "ghost"),
        w("Скопировать", async () => {
          const d = await t();
          d && await s(r(d));
        }, "ghost"),
        w("Сменить", async () => {
          (await A(e, "security.rotate", { name: u }, { confirm: { title: "Сменить секрет", message: "Старый перестанет работать: его нужно будет заменить везде, где он указан.", label: "Сменить" } })).ok && a();
        }, "danger")
      )
    );
  };
  return n(
    "div",
    null,
    n("p", { class: "ks-muted" }, "Из панели Home Assistant доступ уже открыт. Эти ключи нужны только для внешних клиентов: они не хранятся на странице, пока вы их не запросите."),
    i("API-токен (Bearer)", (o) => o.api_token, "api_token"),
    i("Секрет для Home Assistant (Assist)", (o) => o.assist_secret, "assist_secret"),
    i("Путь вебхука для навыка Алисы (добавьте ваш публичный https://-адрес перед ним)", (o) => o.alice_path, "alice_secret"),
    n("h3", null, "Голос через Home Assistant (фраза «домовой …»)"),
    n("p", { class: "ks-muted" }, "Если Home Assistant работает не на этом же устройстве, замените 127.0.0.1 на адрес, по которому он видит аддон."),
    n("pre", { class: "dv-code" }, Ue(Vt)),
    w("Скопировать YAML с секретом", async () => {
      const o = await t();
      o && await s(Ue(o.assist_secret));
    }, "secondary")
  );
}
function Kt(e, a, t) {
  const s = new I(), i = n("div"), o = R({
    host: i,
    load: async (r) => {
      const [u, c, l] = await Promise.all([
        $(t, "api/integrations", void 0, r),
        $(t, "api/settings", void 0, r),
        $(t, "api/contacts", void 0, r)
      ]), d = await me(Promise.resolve(u), Promise.resolve(c));
      return d.ok ? l.ok ? { ok: !0, data: { integrations: d.data[0].integrations, secrets: d.data[0].secrets, settings: d.data[1].settings, contacts: l.data.contacts, linkRequests: l.data.link_requests ?? [] } } : l : d;
    },
    render: (r, u) => {
      const c = r.settings, l = (k) => {
        const S = r.integrations.find((z) => z.name === k);
        return S ? j(Q(S.status), de(S.status)) : null;
      }, d = (k) => {
        const S = r.integrations.find((z) => z.name === k);
        return S ? n("p", { class: "ks-muted" }, [S.detail, S.last_ok ? `Последний успех: ${L(S.last_ok)}.` : "", S.last_error ? `Последняя ошибка: ${S.last_error}` : ""].filter(Boolean).join(" "), " ", Bt(t, k, u)) : null;
      }, p = n("div", { class: "ks-grid dv-status-grid" }, r.integrations.map(
        (k) => n("div", { class: "ks-card dv-status" }, n("strong", null, Ut[k.name] ?? k.name), j(Q(k.status), de(k.status)), n("small", { class: "ks-muted" }, k.detail && k.detail.toLowerCase() !== Q(k.status).toLowerCase() ? k.detail : ""))
      )), m = J("ha", "Home Assistant", l("home_assistant"), n("div", null, d("home_assistant"), oe(t, [
        { name: "url", label: "Адрес Home Assistant", type: "url", value: c.ha.url, placeholder: "http://homeassistant.local:8123", hint: "В аддоне обычно http://supervisor/core — оставьте пустым, если работаете внутри HA.", wide: !0 },
        pe("ha_token", "Долгоживущий токен доступа", r.secrets.ha_token),
        { name: "person_entity", label: "Ваш person", value: c.ha.person_entity, placeholder: "person.ivan", hint: "Для напоминаний «когда приду домой».", wide: !0 },
        { name: "allowed_services", label: "Разрешённые сервисы управления", type: "textarea", rows: 4, value: Re(c.ha.allowed_services), placeholder: `light.turn_on
light.turn_off
script.turn_on`, hint: "Дополнительно к базовым (свет, розетки, вентиляторы, шторы, сцены). Замки, сигнализация, скрипты и Supervisor запрещены всегда.", wide: !0 }
      ], (k) => ({ settings: { ha: { url: String(k.url).trim(), person_entity: String(k.person_entity).trim(), allowed_services: Ae(String(k.allowed_services)) } }, secrets: { ha_token: String(k.ha_token) } }), u))), h = J("telegram", "Telegram", l("telegram"), n("div", null, d("telegram"), oe(t, [
        { name: "enabled", label: "Включён", type: "checkbox", value: c.telegram.enabled },
        pe("telegram_token", "Токен бота (от @BotFather)", r.secrets.telegram_token)
      ], (k) => ({ settings: { telegram: { enabled: k.enabled === !0 } }, secrets: { telegram_token: String(k.telegram_token) } }), u), n("h3", null, "Контакты"), Ht(t, r, u))), g = J("calendar", "Календарь", l("caldav"), n("div", null, d("caldav"), oe(t, [
        { name: "url", label: "CalDAV URL", type: "url", value: c.caldav.url, placeholder: "https://caldav.example.com/dav/user/calendar/", wide: !0 },
        { name: "username", label: "Логин", value: c.caldav.username },
        pe("caldav_password", "Пароль / пароль приложения", r.secrets.caldav_password),
        { name: "default", label: "Куда добавлять по умолчанию", type: "select", options: [{ value: "local", label: "Локальный календарь" }, { value: "caldav", label: "CalDAV" }], value: c.calendar.default },
        { name: "ha_calendars", label: "Календари из Home Assistant", type: "textarea", rows: 2, value: Re(c.calendar.ha_calendars), placeholder: "calendar.family", hint: "По одному на строку. События из них видны; добавлять можно, менять и удалять — нет.", wide: !0 }
      ], (k) => ({ settings: { caldav: { url: String(k.url).trim(), username: String(k.username).trim() }, calendar: { default: k.default, ha_calendars: Ae(String(k.ha_calendars)) } }, secrets: { caldav_password: String(k.caldav_password) } }), u))), v = J("llm", "Языковая модель (необязательно)", l("llm"), n(
        "div",
        null,
        d("llm"),
        n("p", { class: "ks-muted" }, "Подойдёт любой OpenAI-совместимый сервер: локальный (Ollama, llama.cpp, LM Studio) или облачный. Без неё Домовой работает по правилам — быстро и без нагрузки на процессор. Модель ничего не решает сама: её предложения проходят проверку и попадают в «Проверку»."),
        oe(t, [
          { name: "enabled", label: "Включена", type: "checkbox", value: c.ai.enabled },
          { name: "base_url", label: "Адрес API", type: "url", value: c.ai.base_url, placeholder: "http://192.168.1.20:11434/v1", wide: !0 },
          { name: "model", label: "Модель для команд", value: c.ai.model, placeholder: "qwen2.5:3b-instruct" },
          { name: "embedding_model", label: "Модель для смыслового поиска", value: c.ai.embedding_model, placeholder: "nomic-embed-text", hint: "Пусто — поиск по словам и опечаткам, без модели." },
          pe("llm_api_key", "API-ключ (если нужен)", r.secrets.llm_api_key)
        ], (k) => ({ settings: { ai: { enabled: k.enabled === !0, base_url: String(k.base_url).trim(), model: String(k.model).trim(), embedding_model: String(k.embedding_model).trim() } }, secrets: { llm_api_key: String(k.llm_api_key) } }), u)
      )), y = J("speak", "Голос через колонки (Яндекс Станции)", l("speak"), n(
        "div",
        null,
        d("speak"),
        n("p", { class: "ks-muted" }, "Домовой говорит через колонки, подключённые к Home Assistant. Способ озвучки задаётся здесь, а не в коде."),
        ye(t, "speakers", c.speakers, [
          { header: "Колонка", render: (k) => String(k.name || k.entity_id) },
          { header: "Комната", render: (k) => String(k.room ?? "") || b.none },
          { header: "Способ", render: (k) => ({ yandex_station_text: "Яндекс Станция (текст)", tts_speak: "TTS (tts.speak)", custom: "свой сервис" })[String(k.mode)] ?? String(k.mode ?? "Яндекс Станция (текст)") },
          { header: "", render: (k) => k.default ? "по умолчанию" : "" }
        ], (k) => [
          { name: "name", label: "Название", value: k?.name ?? "", placeholder: "Станция на кухне" },
          { name: "entity_id", label: "media_player", required: !0, value: k?.entity_id ?? "", placeholder: "media_player.yandex_station_kitchen", wide: !0 },
          { name: "room", label: "Комната", value: k?.room ?? "", placeholder: "кухня" },
          { name: "mode", label: "Способ озвучки", type: "select", options: [{ value: "yandex_station_text", label: "Яндекс Станция: media_player.play_media (text)" }, { value: "tts_speak", label: "tts.speak (нужна TTS-сущность)" }, { value: "custom", label: "Свой сервис" }], value: k?.mode ?? "yandex_station_text", wide: !0 },
          { name: "tts_entity", label: "TTS-сущность", value: k?.tts_entity ?? "", placeholder: "tts.yandex_station", hint: "Только для tts.speak." },
          { name: "service", label: "Свой сервис", value: k?.service ?? "", placeholder: "script.say", hint: "domain.service; в данных используйте {text} и {entity_id}." },
          { name: "default", label: "По умолчанию, если неизвестно, где человек", type: "checkbox", value: k?.default === !0, wide: !0 }
        ], (k, S) => ({ ...S ?? {}, id: S?.id ?? String(k.entity_id), name: String(k.name).trim(), entity_id: String(k.entity_id).trim(), room: String(k.room).trim(), mode: k.mode, tts_entity: String(k.tts_entity).trim(), service: String(k.service).trim(), default: k.default === !0 }), "колонка", u)
      )), f = J("rooms", "Где вы находитесь: комнаты и места", null, n(
        "div",
        null,
        n("p", { class: "ks-muted" }, "Датчик присутствия или устройство, по которому Домовой понимает, что вы в комнате, — для напоминаний «когда зайду на кухню» и чтобы отвечать в нужную колонку."),
        n("h3", null, "Комнаты"),
        ye(
          t,
          "rooms",
          c.rooms,
          [{ header: "Комната", render: (k) => String(k.name || k.room) }, { header: "Датчик", render: (k) => `${k.entity_id ?? ""} = ${k.state ?? "on"}` }],
          (k) => [
            { name: "name", label: "Название", required: !0, value: k?.name ?? k?.room ?? "", placeholder: "кухня" },
            { name: "entity_id", label: "Сущность", required: !0, value: k?.entity_id ?? "", placeholder: "binary_sensor.kitchen_presence", wide: !0 },
            { name: "state", label: "Активна, когда состояние", value: k?.state ?? "on" }
          ],
          (k, S) => ({ ...S ?? {}, name: String(k.name).trim(), entity_id: String(k.entity_id).trim(), state: String(k.state).trim() || "on" }),
          "комната",
          u
        ),
        n("h3", null, "Другие места и устройства"),
        ye(
          t,
          "places",
          c.places,
          [{ header: "Место", render: (k) => String(k.name) }, { header: "Сущность", render: (k) => `${k.entity_id ?? ""} = ${k.state ?? "on"}` }],
          (k) => [
            { name: "name", label: "Название", required: !0, value: k?.name ?? "", placeholder: "мастерская" },
            { name: "entity_id", label: "Сущность", required: !0, value: k?.entity_id ?? "", placeholder: "sensor.printer_status", wide: !0 },
            { name: "state", label: "Активно, когда состояние", value: k?.state ?? "on" }
          ],
          (k, S) => ({ ...S ?? {}, name: String(k.name).trim(), entity_id: String(k.entity_id).trim(), state: String(k.state).trim() || "on" }),
          "место",
          u
        )
      )), E = J("stt", "Распознавание речи (микрофон киоска)", l("stt"), n(
        "div",
        null,
        d("stt"),
        n("p", { class: "ks-muted" }, "Нужно только если вы говорите в микрофон киоска. Голос через Алису/Home Assistant приходит уже текстом. Подойдёт любой сервер с OpenAI-совместимым /audio/transcriptions (например, локальный faster-whisper)."),
        oe(t, [
          { name: "base_url", label: "Адрес STT-сервера", type: "url", value: c.voice.stt.base_url, placeholder: "http://127.0.0.1:8000/v1", wide: !0 },
          { name: "model", label: "Модель", value: c.voice.stt.model, placeholder: "small" },
          { name: "language", label: "Язык", value: c.voice.stt.language },
          { name: "max_seconds", label: "Максимум секунд записи", type: "number", min: 3, max: 60, value: c.voice.stt.max_seconds }
        ], (k) => ({ settings: { voice: { stt: { base_url: String(k.base_url).trim(), model: String(k.model).trim(), language: String(k.language).trim() || "ru", max_seconds: Number(k.max_seconds) || 15 } } } }), u)
      )), x = J("security", "Доступ, Алиса и Home Assistant", null, Wt(t, u));
      return n("div", { class: "dv-stack" }, p, m, h, g, y, f, v, E, x);
    }
  });
  return _(e, n("div", { class: "ks-page" }, G(b.integrations), i)), B(t, s, ["integrations", "contacts", "settings"], () => o.refresh(), 800, e), s.add(() => o.dispose()), H(s);
}
function dt(e, a = !0) {
  const t = e.slice().sort((s, i) => s.path.join("/").localeCompare(i.path.join("/"), "ru")).map((s) => ({ value: String(s.id), label: s.path.join(" → ") }));
  return a ? [{ value: "", label: "— без места —" }, ...t] : t;
}
function Ee(e, a, t, s) {
  return K(
    t ? `Изменить: ${t.name}` : "Добавить вещь",
    [
      { name: "name", label: b.name, required: !0, value: t?.name ?? "", wide: !0 },
      { name: "quantity", label: b.quantity, type: "number", step: "any", min: 0, value: t?.quantity ?? "" },
      { name: "unit", label: b.unit, value: t?.unit ?? "", placeholder: "шт, кг, м…" },
      { name: "location_id", label: b.place, type: "select", options: dt(a), value: t?.location_id ? String(t.location_id) : "", wide: !0 },
      { name: "new_path", label: "Или новое место", placeholder: "Нижний шкаф → Коробка 3", hint: "Создам недостающие уровни автоматически.", wide: !0 },
      { name: "category", label: "Категория", value: t?.category ?? "" },
      { name: "properties", label: "Свойства", type: "textarea", rows: 3, value: Pt(t?.properties), hint: "По строке: «номинал: 10 кОм»", wide: !0 },
      { name: "notes", label: b.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 }
    ],
    async (i) => {
      const o = Lt(String(i.new_path ?? "")), r = {
        name: String(i.name).trim(),
        quantity: It(i.quantity),
        unit: String(i.unit ?? "").trim(),
        category: String(i.category ?? "").trim(),
        properties: Mt(String(i.properties ?? "")),
        notes: String(i.notes ?? "")
      };
      o.length ? r.location_path = o : r.location_id = i.location_id ? Number(i.location_id) : null;
      const u = t ? await Be(e, "items.update", { id: t.id, ...r }) : await Be(e, "items.create", r);
      return u.ok && s(), u;
    }
  );
}
function Be(e, a, t) {
  return e.invokeAction("domovoy.actions", a, t);
}
function ct(e, a, t) {
  const s = n("div", { class: "dv-item-detail" }, n("p", { class: "ks-muted" }, b.loading)), i = ue("Вещь", s);
  (async () => {
    const [o, r, u] = await Promise.all([
      $(e, `api/items/${a}`),
      $(e, `api/items/${a}/history`),
      $(e, "api/locations")
    ]);
    if (!o.ok) {
      _(s, n("p", { class: "ks-error" }, o.error.message));
      return;
    }
    const c = o.data.item, l = () => {
      t(), i.close();
    };
    _(
      s,
      n("h3", null, c.name),
      n(
        "dl",
        { class: "dv-facts" },
        n("dt", null, b.quantity),
        n("dd", null, je(c.quantity, c.unit) || b.none),
        n("dt", null, b.place),
        n("dd", null, c.location_text || "не указано"),
        c.category ? [n("dt", null, "Категория"), n("dd", null, c.category)] : null,
        ...Object.entries(c.properties ?? {}).flatMap(([d, p]) => [n("dt", null, d), n("dd", null, p)]),
        c.notes ? [n("dt", null, b.notes), n("dd", null, c.notes)] : null,
        n("dt", null, "Изменено"),
        n("dd", null, `${L(c.updated_at)} · ${c.source}`)
      ),
      n(
        "div",
        { class: "ks-row" },
        T(b.edit, { variant: "primary", onClick: () => u.ok && void Ee(e, u.data.locations, c, l) }),
        T("Списать 1", { onClick: async () => {
          (await A(e, "items.consume", { id: c.id, quantity: 1 })).ok && l();
        } }),
        T(b.delete, { variant: "danger", onClick: async () => {
          (await A(e, "items.delete", { id: c.id }, { confirm: { title: "Удалить вещь", message: `«${c.name}» будет удалена. Это можно отменить в журнале.` } })).ok && l();
        } })
      ),
      n("h4", null, "История"),
      r.ok && r.data.history.length ? n("ul", { class: "ks-list" }, r.data.history.slice(0, 12).map((d) => P(d.summary, `${L(d.ts)} · ${d.actor}/${d.source}`))) : q("Изменений не было.")
    );
  })();
}
function Zt(e, a, t) {
  const s = new I();
  let i = "", o = String(a.location_id ?? "");
  const r = n("div"), u = le({ name: "q", label: "Фильтр", placeholder: "название или заметка" }), c = le({ name: "loc", label: b.place, type: "select", options: [{ value: "", label: "Везде" }], value: o });
  let l = [];
  const d = R({
    host: r,
    load: (m) => me(
      $(t, "api/items", { q: i || void 0, location_id: o || void 0, limit: 500 }, m),
      $(t, "api/locations", void 0, m)
    ),
    render: ([{ items: m }, { locations: h }], g) => {
      l = h;
      const v = c.input, y = [{ value: "", label: "Везде" }, ...dt(h, !1)];
      return _(v, y.map((f) => n("option", { value: f.value, selected: f.value === o }, f.label))), v.value = o, n(
        "div",
        null,
        qe(
          [
            { key: "name", header: b.name, render: (f) => n("button", { class: "ks-link", type: "button", onClick: () => ct(t, f.id, g) }, f.name) },
            { key: "qty", header: b.quantity, render: (f) => f.quantity === 0 ? j("нет", "warn") : je(f.quantity, f.unit) || b.none },
            { key: "place", header: b.place, render: (f) => f.location_text || b.none },
            { key: "updated", header: "Изменено", render: (f) => L(f.updated_at), className: "ks-hide-narrow" },
            {
              key: "actions",
              header: "",
              render: (f) => n(
                "div",
                { class: "ks-row" },
                w(b.edit, () => void Ee(t, h, f, g)),
                w(b.delete, async () => {
                  (await A(t, "items.delete", { id: f.id }, { confirm: { title: "Удалить вещь", message: `«${f.name}» будет удалена. Это можно отменить в журнале.` } })).ok && g();
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
  }), p = () => d.refresh();
  return u.input.addEventListener("input", () => {
    i = u.input.value.trim(), p();
  }), c.input.addEventListener("change", () => {
    o = c.input.value, p();
  }), _(
    e,
    n(
      "div",
      { class: "ks-page" },
      G(b.inventory, T(b.add, { variant: "primary", onClick: () => void Ee(t, l, null, p) })),
      n("div", { class: "ks-card ks-filters" }, u.el, c.el),
      r
    )
  ), B(t, s, ["items", "locations"], p), s.add(() => d.dispose()), H(s);
}
const ut = { home: "дом", room: "комната", cabinet: "шкаф", shelf: "полка", box: "коробка", cell: "ячейка", place: "место" }, Gt = Object.entries(ut).map(([e, a]) => ({ value: e, label: a }));
function mt(e, a = []) {
  for (const t of e)
    a.push(t), mt(t.children, a);
  return a;
}
function Jt(e, a, t) {
  const s = new I(), i = n("div"), o = T(b.add, { variant: "primary" }), r = (l, d, p, m) => {
    const h = mt(p).filter((g) => !l || g.id !== l.id && !g.path.join("\0").startsWith(l.path.join("\0") + "\0"));
    K(
      l ? `Изменить: ${l.name}` : d ? `Новое место внутри «${d.name}»` : "Новое место",
      [
        { name: "name", label: b.name, required: !0, value: l?.name ?? "", wide: !0 },
        { name: "kind", label: "Тип", type: "select", options: Gt, value: l?.kind ?? (d ? "box" : "room") },
        { name: "parent_id", label: "Внутри", type: "select", options: [{ value: "", label: "— верхний уровень —" }, ...h.map((g) => ({ value: String(g.id), label: g.path.join(" → ") }))], value: String((l ? l.parent_id : d?.id) ?? ""), wide: !0 },
        { name: "notes", label: b.notes, type: "textarea", rows: 2, value: l?.notes ?? "", wide: !0 }
      ],
      async (g) => {
        const v = { name: String(g.name).trim(), kind: String(g.kind), notes: String(g.notes ?? ""), parent_id: g.parent_id ? Number(g.parent_id) : null }, y = l ? await t.invokeAction("domovoy.actions", "locations.update", { id: l.id, ...v }) : await t.invokeAction("domovoy.actions", "locations.create", v);
        return y.ok && m(), y;
      }
    );
  }, u = (l, d, p) => n(
    "li",
    { class: "dv-loc" },
    n(
      "div",
      { class: "dv-loc-row" },
      n("span", { class: "dv-loc-name" }, l.name, " ", j(ut[l.kind] ?? l.kind, "neutral")),
      n("span", { class: "ks-muted" }, l.item_count ? `${l.item_count} вещ.` : ""),
      n(
        "span",
        { class: "ks-row dv-loc-actions" },
        l.item_count ? w("Вещи", () => t.navigate("domovoy.inventory", { location_id: String(l.id) }), "ghost") : null,
        w("+ Внутрь", () => r(null, l, d, p), "ghost"),
        w(b.edit, () => r(l, null, d, p)),
        w(b.delete, async () => {
          (await A(t, "locations.delete", { id: l.id }, { confirm: { title: "Удалить место", message: `«${l.name}» будет удалено (только если оно пустое).` } })).ok && p();
        }, "danger")
      )
    ),
    l.children.length ? n("ul", { class: "dv-loc-tree" }, l.children.map((m) => u(m, d, p))) : null
  ), c = R({
    host: i,
    load: (l) => t.readData("domovoy.api", { path: "api/locations/tree" }, { signal: l }),
    render: ({ tree: l }, d) => (o.onclick = () => r(null, null, l, d), l.length ? n("ul", { class: "dv-loc-tree dv-loc-root" }, l.map((p) => u(p, l, d))) : n("div", { class: "ks-empty" }, n("strong", null, "Мест ещё нет"), n("p", null, "Они появятся сами, когда вы скажете «положил в третью коробку нижнего шкафа», или добавьте вручную.")))
  });
  return e.replaceChildren(n("div", { class: "ks-page" }, G(b.locations, o), n("div", { class: "ks-card" }, i))), B(t, s, ["locations", "items"], () => c.refresh()), s.add(() => c.dispose()), H(s);
}
const He = "domovoy.session";
function Yt() {
  try {
    let e = window.sessionStorage.getItem(He);
    return e || (e = `web-${Math.random().toString(36).slice(2, 10)}`, window.sessionStorage.setItem(He, e)), e;
  } catch {
    return "web-anon";
  }
}
function Me(e, a) {
  const t = n("input", { class: "ks-input dv-command", type: "text", placeholder: b.commandPlaceholder, "aria-label": "Команда", autocomplete: "off", enterkeyhint: "send" }), s = n("div", { class: "dv-reply", role: "status", "aria-live": "polite" }), i = T(b.send, { variant: "primary", type: "submit" }), o = n("form", { class: "dv-commandbar" }, t, i), r = async (c) => {
    const l = c.trim();
    if (!l)
      return;
    i.disabled = !0, _(s, n("span", { class: "ks-muted" }, b.loading));
    const d = await lt(e, "command.send", { text: l, session_id: Yt() });
    if (i.disabled = !1, !d.ok) {
      _(s, n("span", { class: "ks-error" }, d.error.message));
      return;
    }
    t.value = "", u(d.data), a();
  }, u = (c) => {
    const l = (c.options ?? []).map((d, p) => w(`${p + 1}. ${d}`, () => void r(String(p + 1))));
    _(
      s,
      n("div", { class: "dv-reply-line" }, j(Q(c.status), de(c.status)), " ", c.reply),
      l.length ? n("div", { class: "ks-row dv-chips" }, l) : null,
      c.undoable && c.command_id ? w(b.undo, async () => {
        (await A(e, "command.undo", { id: c.command_id }, { success: "Отменено" })).ok && (_(s, n("span", { class: "ks-muted" }, "Отменено.")), a());
      }, "ghost") : null
    );
  };
  return o.addEventListener("submit", (c) => {
    c.preventDefault(), r(t.value);
  }), n("div", { class: "ks-card dv-command-card" }, o, s);
}
function Xt(e) {
  if (!e.events.length)
    return q("Сегодня и завтра событий нет.");
  const a = e.timezone;
  ne(a);
  const t = Y(e.now, a);
  return n(
    "ul",
    { class: "ks-list" },
    e.events.map(
      (s) => P(
        s.title,
        `${Y(s.start, a) === t ? "сегодня" : "завтра"}, ${s.all_day ? "весь день" : `${ae(s.start, a)}–${ae(s.end, a)}`}${s.location ? ` · ${s.location}` : ""}`
      )
    )
  );
}
function Qt(e, a, t) {
  const s = new I(), i = t.mode === "kiosk", o = n("div", { class: `ks-page dv-today${i ? " ks-scope dv-kiosk" : ""}`, dataset: i ? { theme: "kiosk", noSwipe: "true" } : void 0 }), r = n("div", { class: "ks-page" }), u = Me(t, () => c.refresh());
  _(e, o), _(o, u, r);
  const c = R({
    host: r,
    load: (l) => $(t, "api/today", void 0, l),
    render: (l, d) => {
      ne(l.timezone);
      const p = (m, h) => n(
        "div",
        { class: "ks-row" },
        h === "fired" ? w("Готово", async () => {
          await A(t, "reminders.done", { id: m }), d();
        }, "primary") : null,
        w("+10 мин", async () => {
          await A(t, "reminders.snooze", { id: m, minutes: 10 }), d();
        })
      );
      return n(
        "div",
        { class: "ks-grid" },
        M("Календарь", Xt(l)),
        M(
          "Напоминания",
          l.reminders.length ? n("ul", { class: "ks-list" }, l.reminders.map((m) => P(
            m.text,
            [m.state === "fired" ? "сработало" : m.due_at ? `${L(m.due_at)} (${Oe(m.due_at)})` : it(m.trigger), m.recurrence ? ` · ${be(m.recurrence)}` : "", ` · ${b.channels[m.channel] ?? m.channel}`].join(""),
            p(m.id, m.state),
            m.state === "fired" ? "dv-fired" : ""
          ))) : q("Напоминаний нет.")
        ),
        M(
          "Список покупок",
          l.shopping.length ? n("ul", { class: "ks-list" }, l.shopping.map((m) => P(m.title, void 0, w("Куплено", async () => {
            await A(t, "tasks.complete", { id: m.id }), d();
          })))) : q("Список покупок пуст.")
        ),
        M(
          "Задачи",
          l.tasks.length ? n("ul", { class: "ks-list" }, l.tasks.map((m) => P(m.title, m.due_date ? `до ${m.due_date}${m.recurrence ? ` · ${be(m.recurrence)}` : ""}` : "", w("Готово", async () => {
            await A(t, "tasks.complete", { id: m.id }), d();
          })))) : q("Задач нет.")
        ),
        l.review_count ? M("Ждёт проверки", n(
          "div",
          null,
          n("p", null, `Есть неуверенные команды: ${l.review_count}. Я ничего не записал без вашего подтверждения.`),
          // the review page exists in the admin UI only; on the kiosk there is nothing to open
          i ? n("p", { class: "ks-muted" }, "Откройте администрирование на телефоне или компьютере, чтобы решить.") : T("Открыть проверку", { variant: "primary", onClick: () => t.navigate("domovoy.review") })
        )) : null,
        l.warnings.length ? M("Календари", n("p", { class: "ks-stale-banner" }, `Не удалось прочитать: ${l.warnings.map((m) => m.source).join(", ")}`)) : null,
        i ? null : M(
          "Последние команды",
          l.recent.length ? n("ul", { class: "ks-list" }, l.recent.map((m) => P(m.text, m.reply ?? "", j(Q(m.status), de(m.status))))) : Ye("Команд ещё не было", "Скажите или напишите что-нибудь выше.")
        )
      );
    }
  });
  return B(t, s, ["calendar", "reminders", "tasks", "review", "commands", "outbox", "notification"], () => c.refresh()), s.add(() => c.dispose()), H(s);
}
function Fe(e, a, t) {
  K(
    a ? "Изменить заметку" : "Новая заметка",
    [
      { name: "title", label: "Заголовок", value: a?.title ?? "", wide: !0 },
      { name: "body", label: "Текст", type: "textarea", rows: 6, required: !0, value: a?.body ?? "", wide: !0 },
      { name: "tags", label: "Теги", value: (a?.tags ?? []).join(", "), hint: "Через запятую", wide: !0 }
    ],
    async (s) => {
      const i = { title: String(s.title ?? "").trim(), body: String(s.body).trim(), tags: String(s.tags ?? "").split(",").map((r) => r.trim()).filter(Boolean) }, o = a ? await e.invokeAction("domovoy.actions", "notes.update", { id: a.id, ...i }) : await e.invokeAction("domovoy.actions", "notes.create", i);
      return o.ok && t(), o;
    }
  );
}
function ea(e, a, t) {
  const s = new I(), i = n("div");
  let o = "";
  const r = le({ name: "q", label: "Поиск по заметкам", placeholder: "слово из заголовка или текста" }), u = T(b.add, { variant: "primary" }), c = R({
    host: i,
    load: (l) => me(
      $(t, "api/notes", { q: o || void 0 }, l),
      $(t, "api/items", { limit: 8 }, l)
    ),
    render: ([{ notes: l }, { items: d }], p) => (u.onclick = () => Fe(t, null, p), n(
      "div",
      { class: "ks-grid" },
      M(
        "Заметки",
        l.length ? n("ul", { class: "ks-list" }, l.map(
          (m) => P(
            m.title || m.body.slice(0, 60),
            n("span", null, m.title ? m.body.slice(0, 200) : "", m.tags.length ? ` · #${m.tags.join(" #")}` : "", ` · ${L(m.updated_at)}`),
            n(
              "div",
              { class: "ks-row" },
              w(b.edit, () => Fe(t, m, p)),
              w(b.delete, async () => {
                (await A(t, "notes.delete", { id: m.id }, { confirm: { title: "Удалить заметку", message: m.title || m.body.slice(0, 80) } })).ok && p();
              }, "danger")
            )
          )
        )) : q(o ? "Ничего не найдено." : "Заметок пока нет. Скажите «запомни, что код домофона 4711».")
      ),
      M(
        "Недавно запомнено",
        d.length ? n("ul", { class: "ks-list" }, d.map((m) => P(`${m.name}${m.quantity !== null ? ` — ${je(m.quantity, m.unit)}` : ""}`, `${m.location_text || "место не указано"} · ${L(m.updated_at)}`))) : q()
      )
    ))
  });
  return r.input.addEventListener("input", () => {
    o = r.input.value.trim(), c.refresh();
  }), _(e, n("div", { class: "ks-page" }, G(b.memory, u), Me(t, () => c.refresh()), n("div", { class: "ks-card ks-filters" }, r.el), i)), B(t, s, ["notes", "items", "locations"], () => c.refresh()), s.add(() => c.dispose()), H(s);
}
async function pt(e, a, t, s) {
  const i = await A(e, "review.approve", t ? { id: a, proposal: t } : { id: a });
  if (!i.ok)
    return !1;
  const o = i.data.results.filter((r) => !r.ok).map((r) => r.message);
  return i.data.still_pending ? (D(`Не выполнено, осталось в очереди: ${o.join(" ")}`, "bad", 9e3), !1) : (D(o.length ? `Выполнено частично. ${o.join(" ")}` : s, o.length ? "warn" : "good", o.length ? 9e3 : 4500), !0);
}
function ta(e, a, t) {
  ue("Проверить и поправить", (s) => {
    const i = a.proposal.map((r) => {
      const c = (ge[String(r.type)]?.fields ?? []).filter((l) => l.kind !== "json").map((l) => {
        const d = r[l.name], p = l.kind === "iso" && typeof d == "string" ? ee(d) : l.kind === "bool" ? d === !0 : ot(l, d);
        return {
          name: l.name,
          label: l.label,
          type: l.kind === "bool" ? "checkbox" : l.kind === "enum" ? "select" : l.kind === "iso" ? "datetime-local" : (l.kind === "num", "text"),
          value: p,
          options: l.options?.map((m) => ({ value: m, label: b.channels[m] ?? b.lists[m] ?? { set: "заменить на это число", add: "прибавить к имеющемуся" }[m] ?? m })),
          wide: !0
        };
      });
      return { intent: r, fields: c, handle: ce(c, { submitLabel: b.save, onSubmit: () => {
      } }) };
    }), o = async () => {
      const r = i.map(({ intent: u, handle: c }) => Dt(u, c.values(), (l) => te(l)));
      await pt(e, a.id, r, "Выполнено с вашими правками") && (s(!0), t());
    };
    return n(
      "div",
      null,
      n("p", { class: "ks-muted" }, `Вы сказали: «${a.command_text ?? ""}». ${a.reason}`),
      i.map(({ intent: r, handle: u }) => n("fieldset", { class: "dv-intent" }, n("legend", null, jt(String(r.type))), n("div", { class: "ks-form-grid" }, Object.values(u.fields).map((c) => c.el)))),
      n("div", { class: "ks-form-actions" }, T("Применить с правками", { variant: "primary", onClick: () => void o() }), T(b.cancel, { onClick: () => s(!1) }))
    );
  });
}
function aa(e, a, t) {
  const s = new I(), i = n("div"), o = async (d, p, m) => {
    await pt(t, d, p, "Выполнено") && m();
  };
  let r = "pending";
  const u = n("div", { class: "ks-row dv-chips" }), c = () => De(u, () => {
    _(u, ["pending", "approved", "rejected"].map(
      (d) => n("button", { type: "button", dataset: { key: d }, class: `ks-chip${r === d ? " is-active" : ""}`, "aria-pressed": String(r === d), onClick: () => {
        r = d, c(), l.refresh();
      } }, d === "pending" ? "Ждут решения" : d === "approved" ? "Принятые" : "Отклонённые")
    ));
  }), l = R({
    host: i,
    load: (d) => $(t, "api/review", { status: r }, d),
    render: ({ items: d }, p) => d.length ? n("div", { class: "ks-grid" }, d.map(
      (m) => M(
        n("span", null, `«${m.command_text ?? "—"}»`),
        n(
          "div",
          null,
          n("p", { class: "ks-muted" }, `${L(m.ts)} · уверенность ${m.confidence === null ? "—" : Math.round(m.confidence * 100) + "%"} · ${m.reason}`),
          n("ul", { class: "ks-list" }, m.proposal.map((h) => n("li", null, rt(h, (g) => L(g))))),
          r === "pending" ? n(
            "div",
            { class: "ks-row" },
            w("Подтвердить", async () => {
              await o(m.id, void 0, p);
            }, "primary"),
            w("Поправить…", () => ta(t, m, p)),
            w(b.reject, async () => {
              (await A(t, "review.reject", { id: m.id })).ok && p();
            }, "danger")
          ) : ve(m.status)
        )
      )
    )) : n("div", { class: "ks-empty" }, n("strong", null, r === "pending" ? "Всё проверено" : "Пусто"), n("p", null, r === "pending" ? "Неуверенные команды попадают сюда — я ничего не записываю без вашего подтверждения." : ""))
  });
  return c(), _(e, n("div", { class: "ks-page" }, G(b.review), n("p", { class: "ks-muted" }, "Здесь команды, в которых я не уверен, и всё, что предложила языковая модель. Пока вы не подтвердите, ничего не изменилось."), u, i)), B(t, s, ["review", "commands"], () => l.refresh()), s.add(() => l.dispose()), H(s);
}
const Ve = { location: "domovoy.locations", note: "domovoy.memory", task: "domovoy.tasks", event: "domovoy.calendar" };
function na(e, a, t) {
  const s = new I(), i = /* @__PURE__ */ new Set(), o = n("input", { class: "ks-input dv-command", type: "search", placeholder: b.search_placeholder, "aria-label": b.search, autocomplete: "off", value: String(a.q ?? "") }), r = n("div", { class: "ks-row dv-chips" }), u = n("div", { class: "dv-results", "aria-live": "polite" }), c = n("p", { class: "ks-muted dv-search-meta" });
  let l = 0, d = null;
  const p = () => De(r, () => {
    _(
      r,
      Object.entries(b.kinds).map(
        ([v, y]) => n("button", {
          type: "button",
          dataset: { key: v },
          class: `ks-chip${i.has(v) ? " is-active" : ""}`,
          "aria-pressed": String(i.has(v)),
          onClick: () => {
            i.has(v) ? i.delete(v) : i.add(v), p(), h();
          }
        }, y)
      )
    );
  }), m = (v) => {
    v.kind === "item" ? ct(t, v.id, () => void h()) : Ve[v.kind] && t.navigate(Ve[v.kind], { id: String(v.id) });
  }, h = async () => {
    const v = o.value.trim();
    d?.abort();
    const y = l += 1;
    if (!v) {
      _(u, n("p", { class: "ks-muted" }, "Ищет по вещам, местам, заметкам, задачам и событиям — даже с опечатками.")), c.textContent = "";
      return;
    }
    d = new AbortController(), _(u, Xe());
    const f = await $(t, "api/search", { q: v, kinds: [...i].join(",") || void 0, limit: 30 }, d.signal);
    if (y !== l)
      return;
    if (!f.ok) {
      f.error.code !== "aborted" && _(u, n("p", { class: "ks-error" }, f.error.message));
      return;
    }
    const { hits: E, embedder: x, mode: k } = f.data;
    c.textContent = `${k === "hybrid" ? "Смысловой поиск" : "Поиск по словам и опечаткам"} · ${x}`, _(
      u,
      E.length ? n("ul", { class: "ks-list ks-list-click" }, E.map((S) => {
        const z = P(
          n("span", null, j(b.kinds[S.kind] ?? S.kind, "info"), " ", S.title),
          S.snippet
        );
        return z.tabIndex = 0, z.setAttribute("role", "button"), z.addEventListener("click", () => m(S)), z.addEventListener("keydown", (C) => {
          (C.key === "Enter" || C.key === " ") && (C.preventDefault(), m(S));
        }), z;
      })) : q(`Ничего не нашлось по «${v}». Возможно, я этого ещё не запоминал.`)
    );
  }, g = Je(() => void h(), 250);
  return o.addEventListener("input", () => g()), s.add(() => g.cancel()), s.add(() => d?.abort()), p(), _(e, n("div", { class: "ks-page" }, n("div", { class: "ks-card" }, o, r, c), u)), h(), B(t, s, ["items", "locations", "notes", "tasks", "calendar"], () => void h(), 500), H(s);
}
const sa = (e) => e.split(/[\n,]/).map((a) => a.trim()).filter(Boolean);
function ia(e) {
  let a = [];
  try {
    a = Intl.supportedValuesOf?.("timeZone") ?? [];
  } catch {
    a = [];
  }
  return a.length || (a = ["Europe/Moscow", "Europe/Kaliningrad", "Europe/Samara", "Asia/Yekaterinburg", "Asia/Novosibirsk", "Asia/Vladivostok", "UTC"]), e && !a.includes(e) && (a = [e, ...a]), [{ value: "", label: "Как на сервере" }, ...a.map((t) => ({ value: t, label: t }))];
}
function re(e, a, ...t) {
  return n("section", { class: "ks-card dv-section-card" }, n("header", null, n("h2", null, e)), a ? n("p", { class: "ks-muted" }, a) : null, t);
}
function fe(e, a, t, s) {
  return ce(a, {
    onSubmit: async (i, o) => {
      const r = await e.invokeAction("domovoy.actions", "settings.update", t(i));
      if (!r.ok) {
        o.showErrors(r.error);
        return;
      }
      D("Сохранено", "good"), s();
    }
  }).el;
}
function oa(e, a) {
  const t = URL.createObjectURL(new Blob([JSON.stringify(a, null, 2)], { type: "application/json" })), s = n("a", { href: t, download: e });
  document.body.appendChild(s), s.click(), s.remove(), window.setTimeout(() => URL.revokeObjectURL(t), 1e4);
}
function ra(e, a, t) {
  const s = new I(), i = n("div"), o = R({
    host: i,
    load: async (r) => {
      const [u, c, l, d] = await Promise.all([
        $(t, "api/settings", void 0, r),
        $(t, "api/voice/status", void 0, r),
        $(t, "api/state", void 0, r),
        $(t, "api/backups", void 0, r)
      ]);
      return u.ok ? c.ok ? l.ok ? { ok: !0, data: { settings: u.data.settings, voice: c.data, state: l.data, backups: d.ok ? d.data.backups : [] } } : l : c : u;
    },
    render: ({ settings: r, voice: u, state: c, backups: l }, d) => {
      ne(c.timezone);
      const p = re("Общие", null, fe(t, [
        { name: "timezone", label: "Часовой пояс", type: "select", options: ia(r.timezone), value: r.timezone, hint: `Сейчас на сервере: ${c.timezone}`, wide: !0 },
        { name: "default_reminder_hour", label: "Во сколько напоминать, если сказали только «завтра» (час)", type: "number", min: 0, max: 23, required: !0, value: r.default_reminder_hour, wide: !0 },
        { name: "default_event_minutes", label: "Длительность события по умолчанию, минут", type: "number", min: 5, max: 1440, required: !0, value: r.default_event_minutes, wide: !0 }
      ], (f) => ({ timezone: String(f.timezone), default_reminder_hour: Number(f.default_reminder_hour), default_event_minutes: Number(f.default_event_minutes) }), d)), m = re("Насколько доверять пониманию команд", "Правила понимают привычные фразы сами. Если уверенность ниже порога — команда не выполняется, а ждёт вашего решения в «Проверке». Записи, предложенные языковой моделью, всегда идут на проверку, пока вы явно не разрешите иначе.", fe(t, [
        { name: "auto_apply_confidence", label: "Выполнять сразу при уверенности от (0–1)", type: "number", min: 0, max: 1, step: 0.05, required: !0, value: r.auto_apply_confidence, wide: !0 },
        { name: "review_confidence", label: "Отправлять на проверку от (ниже — переспрашивать)", type: "number", min: 0, max: 1, step: 0.05, required: !0, value: r.review_confidence, wide: !0 },
        { name: "ai_auto_apply", label: "Выполнять записи языковой модели без проверки (при уверенности от 0,9)", type: "checkbox", value: r.ai.auto_apply, hint: "Не рекомендуется: модель может ошибаться. Всё можно отменить в «Журнале», но лучше сначала посмотреть.", wide: !0 }
      ], (f) => ({ auto_apply_confidence: Number(f.auto_apply_confidence), review_confidence: Number(f.review_confidence), ai: { auto_apply: f.ai_auto_apply === !0 } }), d)), h = re(
        "Голос",
        "Обращение по слову-триггеру работает и с колонками через Home Assistant, и с микрофоном киоска. Разговор без слова-триггера не сохраняется.",
        n("p", null, "Микрофон киоска: ", u.enabled ? j("включён", "good") : j("выключен", "neutral"), " ", u.stt_configured ? j("распознавание настроено", "good") : j("распознавание не настроено", "warn")),
        fe(t, [
          { name: "enabled", label: "Принимать голосовые команды с микрофона киоска", type: "checkbox", value: r.voice.enabled, wide: !0 },
          { name: "trigger_words", label: "Слова-триггеры", value: (r.voice.trigger_words ?? []).join(", "), hint: "Через запятую, все падежи, которые вы произносите: «домовой, домового, домовому».", wide: !0 },
          { name: "window_s", label: "После обращения слушать без повторного слова, секунд", type: "number", min: 5, max: 120, required: !0, value: r.voice.window_s, wide: !0 },
          { name: "reply", label: "Как отвечать", type: "select", options: [{ value: "speak", label: "Голосом через колонки" }, { value: "text", label: "Только текстом на экране" }], value: r.voice.reply, wide: !0 },
          { name: "room", label: "Комната этого микрофона", value: r.voice.room, hint: "Чтобы ответ прозвучал в ближайшей колонке.", wide: !0 },
          { name: "speak_enabled", label: "Озвучивать напоминания и ответы", type: "checkbox", value: r.speak.enabled, wide: !0 },
          { name: "quiet_from", label: "Тихие часы с", type: "time", value: r.speak.quiet_from },
          { name: "quiet_to", label: "до", type: "time", value: r.speak.quiet_to },
          { name: "fallback", label: "Если колонка не ответила", type: "select", options: [{ value: "telegram", label: "Написать в Telegram" }, { value: "ui", label: "Показать на экране" }, { value: "none", label: "Ничего" }], value: r.speak.fallback, wide: !0 }
        ], (f) => ({ voice: { enabled: f.enabled === !0, trigger_words: sa(String(f.trigger_words)), window_s: Number(f.window_s), reply: f.reply, room: String(f.room).trim() }, speak: { enabled: f.speak_enabled === !0, quiet_from: String(f.quiet_from), quiet_to: String(f.quiet_to), fallback: f.fallback } }), d)
      ), g = re("Сообщения", null, fe(t, [
        { name: "sandbox", label: "Тестовый режим: ничего не отправлять наружу (Telegram, HA-уведомления)", type: "checkbox", value: r.messaging.sandbox, hint: "Сообщения останутся в «Журнале → Отправка» — удобно проверять сценарии.", wide: !0 }
      ], (f) => ({ messaging: { sandbox: f.sandbox === !0 } }), d)), v = n("input", { type: "file", accept: "application/json,.json", hidden: !0 });
      v.addEventListener("change", async () => {
        const f = v.files?.[0];
        if (v.value = "", !f)
          return;
        let E;
        try {
          E = JSON.parse(await f.text());
        } catch {
          D("Это не JSON-файл", "bad");
          return;
        }
        await et({ title: "Заменить все данные?", message: "Все текущие данные (вещи, места, заметки, задачи, напоминания, журнал) будут заменены содержимым файла. Перед этим я сделаю резервную копию.", confirmLabel: "Заменить", destructive: !0 }) && (await A(t, "data.import", { data: E }, { success: "Данные импортированы" })).ok && d();
      });
      const y = re(
        "Данные и резервные копии",
        `Версия ${c.version}. В базе: ${c.counts.items} вещей, ${c.counts.locations} мест, ${c.counts.notes} заметок. Пароли и токены в экспорт не попадают.`,
        n(
          "div",
          { class: "ks-row" },
          T("Сделать резервную копию", { variant: "primary", onClick: async () => {
            (await A(t, "backup.create", {}, { success: "Копия создана" })).ok && d();
          } }),
          T("Скачать экспорт (JSON)", { onClick: async () => {
            const f = await $(t, "api/export");
            f.ok ? oa(`domovoy-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, f.data) : D(f.error.message, "bad");
          } }),
          T("Импортировать…", { variant: "danger", onClick: () => v.click() }),
          v
        ),
        l.length ? n("ul", { class: "ks-list" }, l.slice(0, 8).map((f) => n("li", null, n("div", { class: "ks-grow" }, f.name, n("div", { class: "ks-sub" }, `${Math.max(1, Math.round(f.bytes / 1024))} КБ`))))) : q("Резервных копий пока нет — они создаются раз в сутки автоматически."),
        n("small", { class: "ks-muted" }, "Копии лежат в /config/kiosk-scene/domovoy/backups — они попадают и в общую резервную копию Home Assistant.")
      );
      return n("div", { class: "dv-stack" }, p, m, h, g, y);
    }
  });
  return _(e, n("div", { class: "ks-page" }, G(b.settings), i)), B(t, s, ["settings"], () => o.refresh(), 800, e), s.add(() => o.dispose()), H(s);
}
const la = Object.entries(b.channels).map(([e, a]) => ({ value: e, label: a }));
function We(e, a, t, s) {
  const i = Z(), o = t?.kind ?? "time", r = t?.trigger ?? {}, u = o !== "time" && r.type === "state", c = r.window ? { window: r.window } : {};
  K(
    t ? "Изменить напоминание" : "Новое напоминание",
    [
      { name: "text", label: "О чём напомнить", required: !0, value: t?.text ?? "", wide: !0 },
      { name: "mode", label: "Когда", type: "select", options: [...u ? [{ value: "keep", label: "Условие устройства (не меняется)" }] : [], { value: "time", label: "В указанное время" }, { value: "presence", label: "Когда приду домой" }, { value: "room", label: "Когда зайду в комнату" }], value: u ? "keep" : o === "time" ? "time" : String(r.type ?? "presence") },
      { name: "due_at", label: "Дата и время", type: "datetime-local", value: t?.due_at ? ee(t.due_at, i) : "" },
      { name: "place", label: "Комната", value: r.place && r.type === "room" ? String(r.place) : "", hint: "Для «когда зайду в комнату»: как в настройках комнат, например «кухня»." },
      { name: "channel", label: "Как сообщить", type: "select", options: la, value: t?.channel ?? "speak" },
      { name: "recipient", label: "Кому", type: "select", options: [{ value: "self", label: "Мне" }, ...a.filter((l) => !l.is_self).map((l) => ({ value: l.name, label: l.name }))], value: t?.recipient ?? "self" }
    ],
    async (l) => {
      const d = String(l.mode), p = { text: String(l.text).trim(), channel: l.channel, recipient: l.recipient };
      if (d !== "keep") if (d === "time") {
        if (!l.due_at)
          return { ok: !1, error: { code: "validation", message: "Укажите время", fields: { due_at: "Укажите время" } } };
        p.due_at = te(String(l.due_at), i), p.trigger = null;
      } else if (d === "room") {
        if (!String(l.place).trim())
          return { ok: !1, error: { code: "validation", message: "Укажите комнату", fields: { place: "Укажите комнату" } } };
        p.trigger = { type: "room", place: String(l.place).trim(), require_transition: !0, ...c };
      } else {
        const h = await e.readData("domovoy.api", { path: "api/settings" }), g = h.ok ? h.data.settings.ha.person_entity : "";
        if (!g)
          return { ok: !1, error: { code: "validation", message: "Сначала укажите person-сущность в Интеграциях → Home Assistant." } };
        p.trigger = { type: "presence", person: g, place: "home", require_transition: !0, ...c };
      }
      const m = t ? await e.invokeAction("domovoy.actions", "reminders.update", { id: t.id, ...p }) : await e.invokeAction("domovoy.actions", "reminders.create", p);
      return m.ok && s(), m;
    }
  );
}
function Ke(e, a, t, s) {
  K(
    a ? "Изменить задачу" : "Новая задача",
    [
      { name: "title", label: b.title, required: !0, value: a?.title ?? "", wide: !0 },
      { name: "list", label: "Список", type: "select", options: Object.entries(b.lists).map(([i, o]) => ({ value: i, label: o })), value: a?.list ?? t },
      { name: "due_date", label: "Срок", type: "date", value: a?.due_date ?? "" },
      { name: "notes", label: b.notes, type: "textarea", rows: 2, value: a?.notes ?? "", wide: !0 }
    ],
    async (i) => {
      const o = { title: String(i.title).trim(), list: i.list, due_date: i.due_date || null, notes: String(i.notes ?? "") }, r = a ? await e.invokeAction("domovoy.actions", "tasks.update", { id: a.id, ...o }) : await e.invokeAction("domovoy.actions", "tasks.create", o);
      return r.ok && s(), r;
    }
  );
}
function da(e, a, t) {
  const s = new I(), i = n("div");
  let o = !1, r = [];
  const u = T("Напоминание", { variant: "primary" }), c = T("Задача", { variant: "secondary" }), l = le({ name: "done", label: "Показывать выполненное", type: "checkbox", value: !1 }), d = R({
    host: i,
    load: async (p) => {
      const h = await me(
        $(t, "api/reminders", { states: o ? "pending,fired,done,cancelled" : "pending,fired" }, p),
        $(t, "api/tasks", { include_done: o ? "1" : "0" }, p)
      );
      if (!h.ok)
        return h;
      const g = await $(t, "api/contacts", void 0, p);
      return { ok: !0, data: [h.data[0], h.data[1], g.ok ? g.data : { contacts: [] }] };
    },
    render: ([{ reminders: p }, { tasks: m }, h], g) => {
      r = h.contacts, u.onclick = () => We(t, r, null, g), c.onclick = () => Ke(t, null, "tasks", g);
      const v = (f) => P(
        n("span", null, f.text, " ", ve(f.state)),
        `${f.kind === "time" && f.due_at ? `${L(f.due_at)}${f.state === "pending" ? ` (${Oe(f.due_at)})` : ""}` : it(f.trigger)}${f.recurrence ? ` · ${be(f.recurrence)}` : ""} · ${b.channels[f.channel] ?? f.channel}${f.recipient && f.recipient !== "self" ? ` → ${f.recipient}` : ""}`,
        n(
          "div",
          { class: "ks-row" },
          f.state === "fired" || f.state === "pending" ? w("Готово", async () => {
            (await A(t, "reminders.done", { id: f.id })).ok && g();
          }, "primary") : null,
          f.state === "pending" || f.state === "fired" ? w("+10 мин", async () => {
            (await A(t, "reminders.snooze", { id: f.id, minutes: 10 })).ok && g();
          }) : null,
          f.state === "pending" ? w(b.edit, () => We(t, r, f, g)) : null,
          w(b.delete, async () => {
            (await A(t, "reminders.delete", { id: f.id }, { confirm: { title: "Удалить напоминание", message: `«${f.text}»` } })).ok && g();
          }, "danger")
        ),
        f.state === "fired" ? "dv-fired" : ""
      ), y = (f) => {
        const E = m.filter((x) => x.list === f);
        return E.length ? n("ul", { class: "ks-list" }, E.map(
          (x) => P(
            n("span", { class: x.done ? "dv-done" : "" }, x.title),
            [x.due_date ? `срок ${x.due_date}` : "", x.recurrence ? be(x.recurrence) : "", x.notes].filter(Boolean).join(" · "),
            n(
              "div",
              { class: "ks-row" },
              w(x.done ? "Вернуть" : f === "shopping" ? "Куплено" : "Готово", async () => {
                (await A(t, "tasks.complete", { id: x.id, done: !x.done })).ok && g();
              }, x.done ? "secondary" : "primary"),
              w(b.edit, () => Ke(t, x, f, g)),
              w(b.delete, async () => {
                (await A(t, "tasks.delete", { id: x.id }, { confirm: { title: "Удалить задачу", message: `«${x.title}»` } })).ok && g();
              }, "danger")
            )
          )
        )) : q();
      };
      return n(
        "div",
        { class: "ks-grid" },
        M("Напоминания", p.length ? n("ul", { class: "ks-list" }, p.map(v)) : q("Напоминаний нет.")),
        M(b.lists.tasks, y("tasks")),
        M(b.lists.shopping, y("shopping")),
        M(b.lists.chores, y("chores"))
      );
    }
  });
  return l.input.addEventListener("change", () => {
    o = l.input.checked, d.refresh();
  }), _(e, n("div", { class: "ks-page" }, G(b.tasks, u, c), n("div", { class: "ks-card ks-filters" }, l.el), i)), B(t, s, ["reminders", "tasks", "contacts"], () => d.refresh()), s.add(() => d.dispose()), H(s);
}
function Ze(e) {
  let a = 0;
  for (let t = 0; t < e.length; t += 1)
    a += e[t] * e[t];
  return Math.sqrt(a / Math.max(1, e.length));
}
class ca {
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
    const t = [], s = a.length / this.o.sampleRate * 1e3, i = Ze(a), o = Math.max(this.o.minRms, this.noise * this.o.ratio), r = i >= o;
    if (this.state === "idle")
      return this.calibrated ? (this.noise = i < this.noise ? this.noise * 0.9 + i * 0.1 : this.noise * 0.995 + i * 5e-3, this.keepPreroll(a), this.loudMs = r ? this.loudMs + s : 0, this.loudMs >= this.o.startMs && (this.state = "speech", this.quietMs = 0, this.chunks = [...this.preroll], this.samples = this.prerollSamples, this.preroll = [], this.prerollSamples = 0, t.push({ type: "start" })), t) : (this.calibSum += i, this.calibFrames += 1, this.calibMs += s, this.calibMs >= this.o.calibrateMs && (this.noise = Math.max(2e-3, this.calibSum / this.calibFrames), this.calibrated = !0), this.keepPreroll(a), t);
    this.chunks.push(a), this.samples += a.length, this.quietMs = r ? 0 : this.quietMs + s;
    const u = this.samples / this.o.sampleRate * 1e3, c = u >= this.o.maxMs && this.quietMs < this.o.hangoverMs;
    if (this.quietMs >= this.o.hangoverMs || c) {
      const l = u - this.quietMs, d = this.collect(), p = Ze(d);
      this.reset(), c ? (this.noise = Math.max(this.noise, p), t.push({ type: "discard", reason: "continuous" })) : t.push(l < this.o.minMs ? { type: "discard", reason: "short" } : { type: "end", samples: d, durationMs: u });
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
function ua(e, a, t) {
  if (t >= a)
    return e;
  const s = a / t, i = Math.floor(e.length / s), o = new Float32Array(i);
  for (let r = 0; r < i; r += 1) {
    const u = Math.floor(r * s), c = Math.min(e.length, Math.floor((r + 1) * s));
    let l = 0;
    for (let d = u; d < c; d += 1)
      l += e[d];
    o[r] = c > u ? l / (c - u) : 0;
  }
  return o;
}
function ma(e, a) {
  const t = new Uint8Array(44 + e.length * 2), s = new DataView(t.buffer), i = (o, r) => {
    for (let u = 0; u < r.length; u += 1)
      s.setUint8(o + u, r.charCodeAt(u));
  };
  i(0, "RIFF"), s.setUint32(4, 36 + e.length * 2, !0), i(8, "WAVE"), i(12, "fmt "), s.setUint32(16, 16, !0), s.setUint16(20, 1, !0), s.setUint16(22, 1, !0), s.setUint32(24, a, !0), s.setUint32(28, a * 2, !0), s.setUint16(32, 2, !0), s.setUint16(34, 16, !0), i(36, "data"), s.setUint32(40, e.length * 2, !0);
  for (let o = 0; o < e.length; o += 1) {
    const r = Math.max(-1, Math.min(1, e[o]));
    s.setInt16(44 + o * 2, r < 0 ? r * 32768 : r * 32767, !0);
  }
  return t;
}
function pa() {
  return typeof navigator > "u" || !navigator.mediaDevices?.getUserMedia ? window.isSecureContext === !1 ? "Браузер разрешает микрофон только на https:// или localhost. Откройте киоск по HTTPS или добавьте адрес в исключения браузера." : "В этом браузере нет доступа к микрофону." : null;
}
function fa(e) {
  let a = null, t = null, s = null, i = null, o = null, r = !1, u = !1, c = !1, l = 0, d = !1, p;
  const m = (v) => e.onState(v), h = (v, y = 0) => {
    window.clearTimeout(p), y > 0 ? (m(v), p = window.setTimeout(() => u && !r && m({ kind: "listening" }), y)) : m(v);
  }, g = async (v, y) => {
    if (!d) {
      d = !0, m({ kind: "sending" });
      try {
        const f = ma(ua(v, y, 16e3), Math.min(y, 16e3)), E = await e.http.request("api/voice/command", {
          method: "POST",
          rawBody: new Blob([f.buffer], { type: "audio/wav" }),
          headers: { "Content-Type": "audio/wav", "X-Room": e.room },
          timeoutMs: 3e4
        });
        if (!u)
          return;
        E.ok ? E.data.handled && E.data.reply ? h({ kind: "heard", reply: E.data.reply, status: E.data.status ?? "" }, 6e3) : h({ kind: "listening" }) : h({ kind: "unavailable", reason: E.error.message }, 6e3);
      } finally {
        d = !1;
      }
    }
  };
  return {
    get muted() {
      return r;
    },
    async start() {
      if (u || c)
        return;
      const v = pa();
      if (v && !e.mediaDevices) {
        m({ kind: "unavailable", reason: v });
        return;
      }
      const y = l;
      c = !0, m({ kind: "starting" });
      let f;
      try {
        f = await (e.mediaDevices ?? navigator.mediaDevices).getUserMedia({ audio: { channelCount: 1, echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 } });
      } catch (x) {
        if (c = !1, y !== l)
          return;
        const k = x?.name;
        m({ kind: "unavailable", reason: k === "NotAllowedError" ? "Доступ к микрофону запрещён в браузере." : k === "NotFoundError" ? "Микрофон не найден." : "Не удалось открыть микрофон." });
        return;
      }
      if (y !== l) {
        f.getTracks().forEach((x) => x.stop()), c = !1;
        return;
      }
      if (a = f, t = e.audioContextFactory ? e.audioContextFactory() : new AudioContext(), t.state === "suspended") {
        const x = () => void t?.resume().catch(() => {
        });
        x(), document.addEventListener("pointerdown", x, { once: !0 });
      }
      const E = t.sampleRate;
      o = new ca({ sampleRate: E }), i = t.createMediaStreamSource(a), s = t.createScriptProcessor(4096, 1, 1), s.onaudioprocess = (x) => {
        if (r || !u || !o)
          return;
        const k = new Float32Array(x.inputBuffer.getChannelData(0));
        for (const S of o.push(k))
          S.type === "start" ? m({ kind: "hearing" }) : S.type === "discard" ? m({ kind: "listening" }) : g(S.samples, E);
      }, i.connect(s), s.connect(t.destination), u = !0, c = !1, a.getAudioTracks().forEach((x) => {
        x.enabled = !r;
      }), m(r ? { kind: "muted" } : { kind: "listening" });
    },
    stop() {
      l += 1, c = !1, u = !1, window.clearTimeout(p), s?.disconnect(), i?.disconnect(), s && (s.onaudioprocess = null), a?.getTracks().forEach((v) => v.stop()), t?.close().catch(() => {
      }), a = t = s = i = null, o = null, m({ kind: "off" });
    },
    setMuted(v) {
      r = v, o?.reset(), a?.getAudioTracks().forEach((y) => {
        y.enabled = !v;
      }), m(v ? { kind: "muted" } : u ? { kind: "listening" } : c ? { kind: "starting" } : { kind: "off" });
    }
  };
}
const ka = {
  starting: "Запуск микрофона…",
  listening: "Слушаю: скажите «домовой …»",
  hearing: "Слышу…",
  sending: "Разбираю…",
  muted: "Микрофон выключен"
};
function ba(e) {
  const a = n("span", { class: "dv-mic-dot", "aria-hidden": "true" }), t = n("span", { class: "dv-mic-label" }), s = n("button", { class: "dv-mic", type: "button", "aria-live": "polite", title: "Включить или выключить микрофон", dataset: { noSwipe: "true" }, onClick: e }, a, t);
  return {
    el: s,
    render(i) {
      s.dataset.state = i.kind, s.hidden = i.kind === "off", t.textContent = i.kind === "unavailable" ? i.reason : i.kind === "heard" ? i.reply : ka[i.kind] ?? "";
    }
  };
}
function va(e) {
  return [
    {
      // The scene's avatar reads its state from the Domovoy state provider; a push from the server turns
      // "poll every few seconds" into "react immediately", so the mouth moves in step with the speakers.
      id: "domovoy.avatar-sync",
      title: "Аватар следует за ответами Домового",
      modes: ["kiosk"],
      start(a) {
        return a.subscribe(ke, "avatar", () => a.refresh());
      }
    },
    {
      id: "domovoy.notifications",
      title: "Уведомления на экране киоска",
      modes: ["kiosk"],
      start(a) {
        return a.subscribe(ke, "notification", (t) => {
          const s = t.payload?.text;
          typeof s == "string" && s.trim() && D(s, "info", 12e3);
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
        const s = typeof t.room == "string" ? String(t.room) : "", i = ba(() => o.setMuted(!o.muted));
        i.el.hidden = !0, document.body.appendChild(i.el);
        const o = fa({ http: e, room: s, onState: i.render });
        return o.start(), () => {
          o.stop(), i.el.remove();
        };
      }
    }
  ];
}
const ga = `
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
`, we = (e, a, t) => {
  const s = Number(e);
  return Number.isFinite(s) && s >= 1 ? Math.min(t, Math.floor(s)) : a;
};
function xe(e, a, t) {
  return {
    id: e,
    title: a,
    mount(s, i, o) {
      const r = new I(), u = n("div", { class: `ks-scope dv-widget ${e.replace(".", "-")}`, dataset: { noSwipe: "true", theme: "kiosk" } });
      _(s, u);
      let c = i;
      const l = R({
        host: u,
        load: (p) => $(o, "api/today", void 0, p),
        render: (p, m) => (ne(p.timezone), t(p, m, c, o))
      });
      B(o, r, ["calendar", "reminders", "tasks"], () => l.refresh(), 400);
      const d = window.setInterval(() => l.refresh(), 6e4);
      return r.add(() => window.clearInterval(d)), r.add(() => l.dispose()), {
        update(p) {
          c = p, l.refresh();
        },
        dispose: () => r.dispose()
      };
    }
  };
}
function _e(e) {
  const a = new Date(e.now).getTime();
  return e.events.filter((t) => t.all_day || new Date(t.end).getTime() > a);
}
const ha = [
  xe("domovoy.next-event", "Ближайшее событие", (e) => {
    const [a] = _e(e).filter((i) => !i.all_day), [t] = _e(e).filter((i) => i.all_day && Y(i.start, e.timezone) === Y(e.now, e.timezone)), s = a ?? t;
    return s ? n("div", { class: "dv-next" }, n("div", { class: "dv-next-when" }, s.all_day ? "сегодня" : `${ae(s.start, e.timezone)} · ${Oe(s.start, new Date(e.now).getTime())}`), n("div", { class: "dv-next-title" }, s.title), s.location ? n("div", { class: "ks-muted" }, s.location) : null) : n("div", { class: "dv-next" }, n("div", { class: "ks-muted" }, "Ближайших событий нет"));
  }),
  xe("domovoy.today", "Сегодня", (e, a, t) => {
    const s = _e(e).slice(0, we(t.maxEvents, 4, 10)), i = e.reminders.slice(0, we(t.maxReminders, 4, 10));
    return n(
      "div",
      { class: "dv-today-widget" },
      s.length ? n("ul", { class: "ks-list" }, s.map((o) => n("li", null, n("span", { class: "dv-time" }, o.all_day ? "весь день" : ae(o.start, e.timezone)), " ", o.title))) : q("Событий нет"),
      i.length ? n("ul", { class: "ks-list dv-reminders" }, i.map((o) => n("li", { class: o.state === "fired" ? "dv-fired" : "" }, "🔔 ", o.text))) : null,
      e.review_count ? n("div", { class: "ks-muted" }, `Ждёт проверки: ${e.review_count}`) : null
    );
  }),
  xe("domovoy.shopping", "Покупки", (e, a, t, s) => {
    const i = e.shopping.slice(0, we(t.max, 8, 30));
    return i.length ? n("ul", { class: "ks-list dv-shopping" }, i.map((o) => n("li", null, n("span", { class: "ks-grow" }, o.title), w("✓", async () => {
      (await A(s, "tasks.complete", { id: o.id })).ok && a();
    }, "ghost", "Куплено")))) : q("Список покупок пуст");
  }),
  {
    id: "domovoy.command",
    title: "Командная строка",
    mount(e, a, t) {
      const s = new I(), i = n("div", { class: "ks-scope dv-widget", dataset: { noSwipe: "true", theme: "kiosk" } }, Me(t, () => t.refresh()));
      return _(e, i), H(s);
    }
  }
];
let Se = !1, Ge = 0;
function ya(e) {
  if (Se || Date.now() < Ge)
    return;
  Se = !0, ue("Нужен токен доступа", (t) => {
    const s = ce([{ name: "token", label: "API-токен", type: "password", required: !0, wide: !0 }], {
      submitLabel: b.save,
      extraActions: [T(b.cancel, { onClick: () => t(!1) })],
      onSubmit: (i) => {
        e(String(i.token).trim()), t(!0), window.location.reload();
      }
    });
    return n("div", null, n("p", null, "Сервер просит подтвердить, что это вы. Введите токен из раздела «Интеграции → Доступ» (или откройте страницу из панели Home Assistant — там токен не нужен)."), s.el);
  }).closed.then((t) => {
    Se = !1, t !== !0 && (Ge = Date.now() + 5 * 6e4);
  });
}
const wa = [
  { id: "domovoy.today", title: b.today, icon: "🏠", modes: ["admin", "kiosk"], order: 10, mount: Qt },
  { id: "domovoy.search", title: b.search, icon: "🔎", modes: ["admin"], order: 20, mount: na },
  { id: "domovoy.inventory", title: b.inventory, icon: "📦", modes: ["admin"], order: 30, group: "Дом", mount: Zt },
  { id: "domovoy.locations", title: b.locations, icon: "🗄️", modes: ["admin"], order: 40, group: "Дом", mount: Jt },
  { id: "domovoy.calendar", title: b.calendar, icon: "📅", modes: ["admin"], order: 50, group: "Планы", mount: Rt },
  { id: "domovoy.tasks", title: b.tasks, icon: "✅", modes: ["admin"], order: 60, group: "Планы", mount: da },
  { id: "domovoy.memory", title: b.memory, icon: "🧠", modes: ["admin"], order: 70, group: "Дом", mount: ea },
  { id: "domovoy.review", title: b.review, icon: "🛡️", modes: ["admin"], order: 80, group: "Домовой", mount: aa },
  { id: "domovoy.activity", title: b.activity, icon: "📜", modes: ["admin"], order: 90, group: "Домовой", mount: Nt },
  { id: "domovoy.integrations", title: b.integrations, icon: "🔌", modes: ["admin"], order: 100, group: "Домовой", mount: Kt },
  { id: "domovoy.settings", title: b.settings, icon: "⚙️", modes: ["admin"], order: 110, group: "Домовой", mount: ra }
], xa = {
  manifest: { id: "domovoy", title: "Домовой", version: "0.1.0", apiVersion: $t },
  activate(e) {
    const a = typeof e.config.apiBase == "string" && e.config.apiBase ? e.config.apiBase : "../domovoy-api/";
    if (new URL(a, window.location.href).origin !== window.location.origin)
      throw new Error("Domovoy: apiBase must be on the same origin as the page");
    St({ retry: b.retry, cancel: b.cancel, confirm: b.confirm, save: b.save, close: b.close, required: "Обязательное поле", loading: b.loading, nothingHere: b.empty, olderData: "Показаны прежние данные", renderFailed: "Не удалось показать этот раздел." }), Le("domovoy-ui-kit", At), Le("domovoy-ui", ga);
    const t = /\/admin\.html$/.test(window.location.pathname), s = qt({ baseUrl: a, onUnauthorized: () => {
      t && ya(Ct);
    } });
    s.http.request("api/state").then((i) => {
      i.ok && i.data.timezone && ne(i.data.timezone);
    }), e.registerDataProvider(s.data), e.registerActionProvider(s.actions), e.registerRealtimeSource(xt({ id: ke, http: s.http, waitSeconds: 25, pauseWhenHidden: !0 }));
    for (const i of wa)
      e.registerPage(i);
    for (const i of ha)
      e.registerWidget(i);
    for (const i of va(s.http))
      e.registerService(i);
  }
};
export {
  wa as PAGES,
  ha as WIDGETS,
  xa as default
};
