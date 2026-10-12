function Oe(e, n) {
  for (const t of n)
    t == null || t === !1 || (Array.isArray(t) ? Oe(e, t) : t instanceof Node ? e.appendChild(t) : e.appendChild(document.createTextNode(String(t))));
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
  return Oe(i, t), i;
}
function ht(e) {
  for (; e.firstChild; )
    e.removeChild(e.firstChild);
}
function S(e, ...n) {
  ht(e), Oe(e, n);
}
class L {
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
function Xe(e, n) {
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
function vt(e) {
  return e.endsWith("/") ? e : `${e}/`;
}
function yt(e, n) {
  const t = n && typeof n == "object" ? n : {}, s = (t.error && typeof t.error == "object" ? t.error : null) ?? t, o = typeof s.message == "string" ? s.message : typeof t.error == "string" ? t.error : `Request failed (HTTP ${e})`, r = s.fields && typeof s.fields == "object" ? Object.fromEntries(Object.entries(s.fields).map(([u, d]) => [u, String(d)])) : void 0;
  return {
    code: typeof s.code == "string" ? s.code : `http_${e}`,
    message: o,
    fields: r,
    retryable: e >= 500 || e === 429 || e === 408
  };
}
function wt(e) {
  const n = e.fetchImpl ?? ((...o) => globalThis.fetch(...o)), t = vt(e.baseUrl);
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
      let g = null;
      const y = await h.text();
      if (y)
        try {
          g = JSON.parse(y);
        } catch {
          g = { message: y.slice(0, 200) };
        }
      if (!h.ok) {
        const f = yt(h.status, g);
        return h.status === 401 && e.onUnauthorized?.(f), { ok: !1, error: f };
      }
      return { ok: !0, data: g };
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
const Ee = "*";
function xt(e) {
  return !!e && typeof e == "object" && typeof e.cursor == "number";
}
function _t(e, n) {
  return e === Ee || n === e || n.startsWith(`${e}.`);
}
function St(e) {
  const n = e.path ?? "events", t = e.waitSeconds ?? 25, i = (e.graceSeconds ?? 10) * 1e3, s = e.minBackoffMs ?? 1e3, o = e.maxBackoffMs ?? 3e4, r = e.random ?? Math.random, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set();
  let l = "connecting", c = null, p = !1, m = !1, v = 0, h = null, g = null, y = !1;
  function f(C) {
    if (l !== C) {
      l = C;
      for (const V of Array.from(d))
        V(C);
    }
  }
  function A(C) {
    for (const [V, O] of Array.from(u.entries()))
      if (!(!_t(V, C.topic) && C.topic !== Ee))
        for (const F of Array.from(O))
          try {
            F(C);
          } catch {
          }
  }
  function _(C) {
    return new Promise((V) => {
      const O = () => {
        clearTimeout(F), g = null, V();
      }, F = setTimeout(O, C);
      g = O;
    });
  }
  const k = () => {
    typeof document > "u" || document.hidden || (y = !0, !p && !m && e.pauseWhenHidden !== !1 && z(), g?.(), h?.abort(new DOMException("resume", "AbortError")));
  };
  async function x() {
    p = !0;
    try {
      for (; !m && !(e.pauseWhenHidden !== !1 && typeof document < "u" && document.hidden); ) {
        h = new AbortController();
        let C = !1;
        const V = setTimeout(() => {
          C = !0, h?.abort(new DOMException("poll timeout", "TimeoutError"));
        }, t * 1e3 + i), O = await e.http.request(n, {
          query: { since: c ?? void 0, timeout: c === null ? 0 : t },
          signal: h.signal,
          timeoutMs: t * 1e3 + i
        });
        if (clearTimeout(V), h = null, m)
          break;
        if (!O.ok && O.error.code === "aborted" && !C)
          continue;
        if (!O.ok || !xt(O.data)) {
          v += 1, f(v >= 3 ? "offline" : "reconnecting");
          const X = Math.min(o, s * 2 ** Math.min(v - 1, 10));
          await _(X / 2 + r() * (X / 2)), y = !0;
          continue;
        }
        const F = O.data, bt = c;
        c = typeof F.cursor == "number" ? F.cursor : c;
        const gt = v > 0;
        v = 0, f("live"), (F.reset || y || gt) && ((bt !== null || F.reset) && A({ topic: Ee, payload: { resync: !0, reset: F.reset === !0 }, cursor: c ?? void 0 }), y = !1);
        for (const X of F.events ?? [])
          A({ topic: X.topic, payload: X.payload, cursor: X.seq });
      }
    } finally {
      p = !1;
    }
  }
  function z() {
    p || m || (typeof document < "u" && e.pauseWhenHidden !== !1 && (document.removeEventListener("visibilitychange", k), document.addEventListener("visibilitychange", k)), x());
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
      return d.add(C), () => d.delete(C);
    },
    close() {
      m = !0, h?.abort(new DOMException("closed", "AbortError")), g?.(), typeof document < "u" && document.removeEventListener("visibilitychange", k), u.clear(), d.clear();
    }
  };
}
const $t = {
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
let N = { ...$t };
function Tt(e) {
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
function j(e, n = "neutral") {
  return a("span", { class: `ks-badge ks-badge-${n}` }, e);
}
function Qe(e, n, t) {
  return a("div", { class: "ks-empty" }, a("strong", null, e), n ? a("p", null, n) : null, t);
}
function et(e = N.loading) {
  return a("div", { class: "ks-loading", role: "status", aria: { live: "polite" } }, a("span", { class: "ks-spinner", aria: { hidden: !0 } }), e);
}
function Le(e, n) {
  return a(
    "div",
    { class: "ks-error", role: "alert" },
    a("strong", null, e.message),
    e.code ? a("small", null, e.code) : null,
    n && e.retryable !== !1 ? T(N.retry, { onClick: n }) : null
  );
}
let tt = 0;
function ce(e) {
  const n = `ks-field-${tt += 1}`, t = e.type ?? "text";
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
function je(e, n, t) {
  return n.length ? a(
    "div",
    { class: "ks-table-wrap" },
    a(
      "table",
      { class: "ks-table" },
      a("thead", null, a("tr", null, e.map((i) => a("th", { scope: "col", class: i.className }, i.header)))),
      a("tbody", null, n.map((i) => a("tr", null, e.map((s) => a("td", { class: s.className, dataset: { label: s.header } }, s.render(i))))))
    )
  ) : t ?? Qe(N.nothingHere);
}
const se = [];
function pe(e, n) {
  const t = document.activeElement;
  let i = () => {
  };
  const s = new Promise((m) => {
    i = m;
  }), o = new L(), r = (m) => {
    if (o.isDisposed)
      return;
    o.dispose();
    const v = se.indexOf(c);
    v >= 0 && se.splice(v, 1), c.remove(), t?.focus?.(), i(m);
  }, u = typeof n == "function" ? n(r) : n, d = `ks-dialog-title-${tt += 1}`, l = a(
    "div",
    { class: "ks-dialog", role: "dialog", aria: { modal: !0, labelledby: d }, tabindex: -1 },
    a("div", { class: "ks-dialog-head" }, a("h2", { id: d }, e), T("×", { variant: "ghost", title: N.close, onClick: () => r(void 0) })),
    a("div", { class: "ks-dialog-body" }, u)
  ), c = a("div", { class: "ks-overlay" }, l);
  c.addEventListener("mousedown", (m) => {
    m.target === c && r(void 0);
  });
  const p = (m) => {
    if (se[se.length - 1] === c) {
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
        const h = v[0], g = v[v.length - 1];
        m.shiftKey && document.activeElement === h ? (m.preventDefault(), g.focus()) : !m.shiftKey && document.activeElement === g && (m.preventDefault(), h.focus());
      }
    }
  };
  return document.addEventListener("keydown", p, !0), o.add(() => document.removeEventListener("keydown", p, !0)), document.body.appendChild(c), se.push(c), (l.querySelector("input, select, textarea, button.ks-btn-primary") ?? l).focus(), { el: c, close: r, closed: s };
}
function nt(e) {
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
let oe = null;
function D(e, n = "neutral", t = 4500) {
  (!oe || !oe.isConnected) && (oe = a("div", { class: "ks-toasts", role: "status", aria: { live: "polite" } }), document.body.appendChild(oe));
  const i = a("div", { class: `ks-toast ks-toast-${n}` }, e);
  oe.appendChild(i), setTimeout(() => i.remove(), t);
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
    (!i || e.keepStale === !1) && S(r, et()), e.load(t.signal).then((l) => {
      if (!(s || d !== n)) {
        if (l.ok) {
          try {
            const c = e.render(l.data, u);
            i = !0, o.hidden = !0, S(r, c);
          } catch (c) {
            console.error("View render failed", c), S(r, Le({ code: "render_failed", message: N.renderFailed, retryable: !0 }, u));
          }
          return;
        }
        l.error.code !== "aborted" && (i ? (o.hidden = !1, S(o, `${N.olderData} — ${l.error.message} `, T(N.retry, { variant: "ghost", onClick: u }))) : S(r, Le(l.error, u)));
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
function ze(e, n) {
  if (typeof document > "u" || document.getElementById(e))
    return;
  const t = document.createElement("style");
  t.id = e, t.textContent = n, document.head.appendChild(t);
}
const Et = 1, At = '.ks-admin,.ks-dialog,.ks-toasts,.ks-scope{--ks-bg: #f5f7f9;--ks-surface: #ffffff;--ks-surface-2: #eef2f5;--ks-border: #d5dde4;--ks-text: #1c2833;--ks-muted: #5c6b78;--ks-accent: #2464a8;--ks-accent-text: #ffffff;--ks-good: #1f7a4d;--ks-warn: #9a6100;--ks-bad: #b3261e;--ks-info: #2464a8;--ks-radius: 10px;--ks-shadow: 0 1px 2px rgba(20, 30, 40, .06), 0 4px 14px rgba(20, 30, 40, .06);--ks-font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;font-family:var(--ks-font);color:var(--ks-text)}@media(prefers-color-scheme:dark){.ks-admin,.ks-dialog,.ks-toasts,.ks-scope:not([data-theme=kiosk]){--ks-bg: #12181e;--ks-surface: #1a222a;--ks-surface-2: #222c36;--ks-border: #33404c;--ks-text: #e6ecf1;--ks-muted: #96a5b2;--ks-accent: #5b9be0;--ks-accent-text: #0b1620;--ks-good: #5cc493;--ks-warn: #e0a84a;--ks-bad: #f08a83;--ks-info: #5b9be0;--ks-shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 4px 14px rgba(0, 0, 0, .35)}}.ks-admin *,.ks-dialog *,.ks-toasts *,.ks-scope *{box-sizing:border-box}.ks-scope[data-theme=kiosk]{--ks-bg: transparent;--ks-surface: rgba(255, 255, 255, .72);--ks-surface-2: rgba(32, 48, 65, .06);--ks-border: rgba(32, 48, 65, .12);--ks-text: #203041;--ks-muted: rgba(32, 48, 65, .66)}.ks-admin{display:grid;grid-template-columns:232px minmax(0,1fr);min-height:100vh;min-height:100dvh;background:var(--ks-bg);font-size:15px;line-height:1.45}.ks-sidebar{position:sticky;top:0;height:100vh;height:100dvh;display:flex;flex-direction:column;gap:8px;padding:16px 12px;background:var(--ks-surface);border-right:1px solid var(--ks-border);overflow-y:auto}.ks-brand{padding:4px 10px 12px;font-weight:700;font-size:17px;letter-spacing:-.01em}.ks-nav-list{display:flex;flex-direction:column;gap:2px}.ks-nav-group{margin:12px 10px 4px;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ks-muted)}.ks-nav-item,.ks-bottom-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;color:var(--ks-text);text-decoration:none;min-height:40px}.ks-nav-item:hover{background:var(--ks-surface-2)}.ks-nav-item[aria-current=page]{background:color-mix(in srgb,var(--ks-accent) 14%,transparent);color:var(--ks-accent);font-weight:600}.ks-nav-icon{width:22px;text-align:center;flex:none}.ks-nav-footer{margin-top:auto;display:flex;flex-direction:column;gap:2px;padding-top:12px;border-top:1px solid var(--ks-border)}.ks-nav-footer-link{padding:6px 10px;color:var(--ks-muted);text-decoration:none;font-size:13px}.ks-content{min-width:0;display:flex;flex-direction:column}.ks-topbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;padding:12px 20px;background:color-mix(in srgb,var(--ks-bg) 88%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--ks-border)}.ks-topbar-title{margin:0;font-size:20px;font-weight:700;letter-spacing:-.01em;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ks-menu-button,.ks-bottom-nav,.ks-scrim{display:none}.ks-main-view{flex:1;padding:20px;outline:none;max-width:1200px;width:100%}.ks-conn{font-size:12px;padding:3px 10px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-muted);white-space:nowrap}.ks-conn[data-state=live]{color:var(--ks-good)}.ks-conn[data-state=reconnecting],.ks-conn[data-state=connecting]{color:var(--ks-warn)}.ks-conn[data-state=offline]{color:var(--ks-bad);border-color:var(--ks-bad)}@media(max-width:899px){.ks-admin{display:block;padding-bottom:64px}.ks-sidebar{position:fixed;inset:0 auto 0 0;z-index:30;width:min(84vw,300px);transform:translate(-102%);transition:transform .18s ease;box-shadow:var(--ks-shadow)}.ks-admin:not([data-menu=open]) .ks-sidebar{visibility:hidden;transition:transform .18s ease,visibility 0s linear .18s}.ks-admin[data-menu=open] .ks-sidebar{transform:none}.ks-admin[data-menu=open] .ks-scrim{display:block;position:fixed;inset:0;z-index:20;background:#0006}.ks-menu-button{display:inline-flex}.ks-topbar{padding:10px 12px}.ks-topbar-title{font-size:17px}.ks-main-view{padding:14px 12px}.ks-bottom-nav{position:fixed;inset:auto 0 0;z-index:10;display:grid;grid-auto-flow:column;grid-auto-columns:1fr;background:var(--ks-surface);border-top:1px solid var(--ks-border);padding-bottom:env(safe-area-inset-bottom,0)}.ks-bottom-item{flex-direction:column;gap:2px;justify-content:center;padding:8px 4px;font-size:11px;border-radius:0;min-height:56px;color:var(--ks-muted)}.ks-bottom-item[aria-current=page]{color:var(--ks-accent);font-weight:600}.ks-bottom-item .ks-nav-label{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.ks-page{display:flex;flex-direction:column;gap:16px}.ks-card{background:var(--ks-surface);border:1px solid var(--ks-border);border-radius:var(--ks-radius);padding:16px;box-shadow:var(--ks-shadow);min-width:0}.ks-card>h2,.ks-card>header>h2{margin:0 0 10px;font-size:15px;font-weight:700}.ks-card>header{display:flex;align-items:center;justify-content:space-between;gap:8px}.ks-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}.ks-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ks-row-spread{justify-content:space-between}.ks-toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.ks-toolbar .ks-grow{flex:1;min-width:180px}.ks-muted{color:var(--ks-muted)}.ks-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}.ks-list>li{display:flex;align-items:center;gap:10px;padding:9px 2px;border-bottom:1px solid var(--ks-border);min-width:0}.ks-list>li:last-child{border-bottom:0}.ks-list .ks-grow{flex:1;min-width:0}.ks-list .ks-title{font-weight:600;overflow-wrap:anywhere}.ks-list .ks-sub{color:var(--ks-muted);font-size:13px;overflow-wrap:anywhere}.ks-done{text-decoration:line-through;color:var(--ks-muted)}.ks-tree{list-style:none;margin:0;padding-left:18px;border-left:1px dashed var(--ks-border)}.ks-tree.ks-tree-root{padding-left:0;border-left:0}.ks-tree-node{padding:3px 0}.ks-btn{display:inline-flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;font:inherit;font-size:14px;min-height:38px;padding:0 14px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer;touch-action:manipulation}.ks-btn:hover:not(:disabled){background:var(--ks-surface-2)}.ks-btn:focus-visible,.ks-field input:focus-visible,.ks-field select:focus-visible,.ks-field textarea:focus-visible,.ks-nav-item:focus-visible,.ks-bottom-item:focus-visible{outline:2px solid var(--ks-accent);outline-offset:1px}.ks-btn:disabled{opacity:.55;cursor:default}.ks-btn-primary{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text);font-weight:600}.ks-btn-primary:hover:not(:disabled){background:color-mix(in srgb,var(--ks-accent) 88%,black)}.ks-btn-danger{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 50%,var(--ks-border))}.ks-btn-ghost{border-color:transparent;background:transparent}.ks-btn-sm{min-height:30px;padding:0 10px;font-size:13px}.ks-form{display:flex;flex-direction:column;gap:12px}.ks-form-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}.ks-form-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}.ks-form-error,.ks-field-error{color:var(--ks-bad);font-size:13px}.ks-field{display:flex;flex-direction:column;gap:4px;min-width:0}.ks-field-wide{grid-column:1 / -1}.ks-field label{font-size:13px;font-weight:600;color:var(--ks-muted)}.ks-field input:not([type=checkbox]),.ks-field select,.ks-field textarea,.ks-input{font:inherit;font-size:16px;width:100%;min-height:40px;padding:8px 10px;border-radius:8px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text)}.ks-field-check{flex-direction:row;align-items:center;gap:8px}.ks-field.has-error input,.ks-field.has-error select,.ks-field.has-error textarea{border-color:var(--ks-bad)}.ks-field-hint{color:var(--ks-muted);font-size:12px}.ks-required{color:var(--ks-bad)}.ks-badge{display:inline-block;padding:1px 8px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid var(--ks-border);background:var(--ks-surface-2);color:var(--ks-muted);white-space:nowrap}.ks-badge-good{color:var(--ks-good);border-color:color-mix(in srgb,var(--ks-good) 40%,var(--ks-border))}.ks-badge-warn{color:var(--ks-warn);border-color:color-mix(in srgb,var(--ks-warn) 40%,var(--ks-border))}.ks-badge-bad{color:var(--ks-bad);border-color:color-mix(in srgb,var(--ks-bad) 40%,var(--ks-border))}.ks-badge-info{color:var(--ks-info);border-color:color-mix(in srgb,var(--ks-info) 40%,var(--ks-border))}.ks-empty,.ks-loading,.ks-error{padding:28px 16px;text-align:center;color:var(--ks-muted)}.ks-empty strong,.ks-error strong{display:block;color:var(--ks-text);margin-bottom:4px}.ks-error{color:var(--ks-bad);display:flex;flex-direction:column;align-items:center;gap:8px}.ks-spinner{display:inline-block;width:16px;height:16px;margin-right:8px;vertical-align:-3px;border:2px solid var(--ks-border);border-top-color:var(--ks-accent);border-radius:50%;animation:ks-spin .8s linear infinite}@keyframes ks-spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.ks-spinner{animation-duration:3s}}.ks-stale-banner{padding:8px 12px;margin-bottom:10px;border-radius:8px;background:color-mix(in srgb,var(--ks-warn) 14%,var(--ks-surface));color:var(--ks-warn);font-size:13px}.ks-table-wrap{overflow-x:auto}.ks-table{width:100%;border-collapse:collapse;font-size:14px}.ks-table th,.ks-table td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--ks-border);vertical-align:top}.ks-table th{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--ks-muted)}@media(max-width:640px){.ks-table thead{display:none}.ks-table,.ks-table tbody,.ks-table tr,.ks-table td{display:block;width:100%}.ks-table tr{padding:8px 0;border-bottom:1px solid var(--ks-border)}.ks-table td{border:0;padding:2px 4px}.ks-table td:before{content:attr(data-label) ": ";color:var(--ks-muted);font-size:12px}.ks-table td[data-label=""]:before{content:none}}.ks-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;background:#00000073}.ks-dialog{width:min(560px,100%);max-height:92vh;overflow:auto;background:var(--ks-surface);border-radius:14px;box-shadow:var(--ks-shadow);border:1px solid var(--ks-border)}.ks-dialog-head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--ks-border)}.ks-dialog-head h2{margin:0;font-size:16px}.ks-dialog-body{padding:16px}.ks-toasts{position:fixed;z-index:120;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;max-width:min(360px,calc(100vw - 32px))}.ks-toast{padding:10px 14px;border-radius:10px;background:var(--ks-text);color:var(--ks-bg);box-shadow:var(--ks-shadow);font-size:14px}.ks-toast-good{background:var(--ks-good);color:#fff}.ks-toast-bad{background:var(--ks-bad);color:#fff}@media(max-width:899px){.ks-toasts{bottom:72px}}.ks-chip{font:inherit;font-size:14px;min-height:34px;padding:4px 12px;border-radius:999px;border:1px solid var(--ks-border);background:var(--ks-surface);color:var(--ks-text);cursor:pointer}.ks-chip.is-active{background:var(--ks-accent);border-color:var(--ks-accent);color:var(--ks-accent-text)}.ks-link{font:inherit;padding:0;border:0;background:none;color:var(--ks-accent);cursor:pointer;text-align:left;text-decoration:underline;text-underline-offset:2px}.ks-filters{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end}.ks-filters .ks-field{flex:1 1 200px;min-width:0}.ks-list-click>li{cursor:pointer}.ks-list-click>li:hover,.ks-list-click>li:focus-visible{background:var(--ks-surface-2);outline:none}@media(max-width:640px){.ks-hide-narrow{display:none}}', Ct = At, at = "domovoy.api", it = "domovoy.actions", ge = "domovoy.events", W = (e, n = ["id"]) => Object.fromEntries(Object.entries(e).filter(([t]) => !n.includes(t))), B = (e) => (n) => `${e}/${encodeURIComponent(String(n.id))}`, Ne = {
  "command.send": { title: "Отправить команду", method: "POST", path: () => "api/command", body: (e) => e },
  "command.undo": { title: "Отменить команду", method: "POST", path: (e) => `api/commands/${e.id}/undo`, body: () => ({}) },
  "items.create": { title: "Добавить предмет", method: "POST", path: () => "api/items", body: (e) => e },
  "items.update": { title: "Изменить предмет", method: "PATCH", path: B("api/items"), body: (e) => W(e) },
  "items.delete": { title: "Удалить предмет", method: "DELETE", path: B("api/items"), destructive: !0 },
  "items.move": { title: "Переместить предмет", method: "POST", path: (e) => `api/items/${e.id}/move`, body: (e) => W(e) },
  "items.consume": { title: "Списать", method: "POST", path: (e) => `api/items/${e.id}/consume`, body: (e) => W(e) },
  "locations.create": { title: "Добавить место", method: "POST", path: () => "api/locations", body: (e) => e },
  "locations.update": { title: "Изменить место", method: "PATCH", path: B("api/locations"), body: (e) => W(e) },
  "locations.delete": { title: "Удалить место", method: "DELETE", path: B("api/locations"), destructive: !0 },
  "notes.create": { title: "Добавить заметку", method: "POST", path: () => "api/notes", body: (e) => e },
  "notes.update": { title: "Изменить заметку", method: "PATCH", path: B("api/notes"), body: (e) => W(e) },
  "notes.delete": { title: "Удалить заметку", method: "DELETE", path: B("api/notes"), destructive: !0 },
  "tasks.create": { title: "Добавить задачу", method: "POST", path: () => "api/tasks", body: (e) => e },
  "tasks.update": { title: "Изменить задачу", method: "PATCH", path: B("api/tasks"), body: (e) => W(e) },
  "tasks.complete": { title: "Отметить задачу", method: "POST", path: (e) => `api/tasks/${e.id}/complete`, body: (e) => ({ done: e.done ?? !0 }) },
  "tasks.delete": { title: "Удалить задачу", method: "DELETE", path: B("api/tasks"), destructive: !0 },
  "reminders.create": { title: "Добавить напоминание", method: "POST", path: () => "api/reminders", body: (e) => e },
  "reminders.update": { title: "Изменить напоминание", method: "PATCH", path: B("api/reminders"), body: (e) => W(e) },
  "reminders.done": { title: "Напоминание выполнено", method: "POST", path: (e) => `api/reminders/${e.id}/done`, body: () => ({}) },
  "reminders.snooze": { title: "Отложить напоминание", method: "POST", path: (e) => `api/reminders/${e.id}/snooze`, body: (e) => ({ minutes: e.minutes }) },
  "reminders.delete": { title: "Удалить напоминание", method: "DELETE", path: B("api/reminders"), destructive: !0 },
  "calendar.create": { title: "Добавить событие", method: "POST", path: () => "api/calendar/events", body: (e) => e },
  "calendar.update": { title: "Изменить событие", method: "PATCH", path: () => "api/calendar/event", body: (e) => W(e, ["ref"]), query: (e) => ({ ref: e.ref }) },
  "calendar.delete": { title: "Удалить событие", method: "DELETE", path: () => "api/calendar/event", query: (e) => ({ ref: e.ref }), destructive: !0 },
  "contacts.create": { title: "Добавить контакт", method: "POST", path: () => "api/contacts", body: (e) => e },
  "contacts.update": { title: "Изменить контакт", method: "PATCH", path: B("api/contacts"), body: (e) => W(e) },
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
}, Ae = "domovoy.token";
function qt() {
  try {
    return window.localStorage.getItem(Ae);
  } catch {
    return null;
  }
}
function Ot(e) {
  try {
    e ? window.localStorage.setItem(Ae, e) : window.localStorage.removeItem(Ae);
  } catch {
  }
}
function jt(e) {
  const n = wt({
    baseUrl: e.baseUrl,
    fetchImpl: e.fetchImpl,
    getToken: qt,
    // The custom header is what turns a cross-site form post into something the server refuses (CSRF defence).
    headers: { "X-Domovoy-Client": "kiosk-scene" },
    onUnauthorized: () => e.onUnauthorized?.(),
    timeoutMs: 2e4
  });
  return { http: n, data: {
    id: at,
    async read(s, o) {
      const r = String(s?.path ?? "");
      return /^(api\/|events)/.test(r) ? n.request(r, { query: s.query, signal: o?.signal }) : { ok: !1, error: { code: "bad_path", message: `Refusing to read ${r}` } };
    }
  }, actions: {
    id: it,
    describe() {
      return Object.entries(Ne).map(([s, o]) => ({ id: s, title: o.title, destructive: o.destructive }));
    },
    async invoke(s, o, r) {
      const u = Ne[s];
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
function ee(e) {
  return b.statuses[e] ?? e;
}
function ue(e) {
  return ["applied", "answered", "done", "sent", "ok", "approved"].includes(e) ? "good" : ["clarify", "review", "pending", "queued", "sending", "partial", "degraded", "fired"].includes(e) ? "warn" : ["failed", "rejected", "down", "cancelled"].includes(e) ? "bad" : "neutral";
}
let st = "";
function ie(e) {
  st = e;
}
function Z() {
  return st || Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function ot(e, n) {
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
function ne(e, n = Z()) {
  const t = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(e);
  if (!t)
    throw new Error(`Invalid local time: ${e}`);
  const [i, s, o, r, u] = t.slice(1).map(Number), d = Date.UTC(i, s - 1, o, r, u);
  let l = d;
  for (let c = 0; c < 2; c += 1) {
    const p = ot(new Date(l), n), m = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute));
    l += d - m;
  }
  return new Date(l).toISOString().replace(/\.\d{3}Z$/, "Z");
}
function te(e, n = Z()) {
  const t = ot(new Date(e), n);
  return `${t.year}-${t.month}-${t.day}T${t.hour}:${t.minute}`;
}
function I(e, n = Z()) {
  return e ? new Intl.DateTimeFormat("ru-RU", { timeZone: n, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(e)) : "—";
}
function ae(e, n = Z()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: n, hour: "2-digit", minute: "2-digit" }).format(new Date(e));
}
function Dt(e, n = Z()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: n, weekday: "long", day: "numeric", month: "long" }).format(new Date(e));
}
function Y(e, n = Z()) {
  return te(e, n).slice(0, 10);
}
function De(e, n = Date.now()) {
  const t = new Date(e).getTime() - n, i = Math.abs(t), s = Math.round(i / 6e4), o = s < 1 ? "сейчас" : s < 60 ? `${s} мин` : s < 2880 ? `${Math.round(s / 60)} ч` : `${Math.round(s / 1440)} дн`;
  return s < 1 ? o : t < 0 ? `${o} назад` : `через ${o}`;
}
function rt(e) {
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
function Me(e, n = "") {
  return e == null ? "" : `${Number.isInteger(e) ? String(e) : String(Math.round(e * 1e3) / 1e3)} ${n}`.trim();
}
const Re = ["ui", "telegram", "speak", "ha_notify"], we = ["tasks", "shopping", "chores"], ye = {
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
  create_reminder: { title: "Напоминание", fields: [{ name: "text", label: "О чём", kind: "str" }, { name: "when", label: "Когда", kind: "iso" }, { name: "channel", label: "Как", kind: "enum", options: Re }, { name: "recipient", label: "Кому", kind: "str" }, { name: "trigger", label: "Условие", kind: "json" }, { name: "recurrence", label: "Повтор", kind: "json" }] },
  query_reminders: { title: "Активные напоминания", fields: [] },
  complete_reminder: { title: "Выполнить напоминание", fields: [{ name: "reminder_id", label: "Номер", kind: "num" }] },
  snooze_reminder: { title: "Отложить напоминание", fields: [{ name: "reminder_id", label: "Номер", kind: "num" }, { name: "minutes", label: "Минут", kind: "num" }] },
  delete_reminder: { title: "Удалить напоминание", fields: [{ name: "reminder_id", label: "Номер", kind: "num" }] },
  create_event: { title: "Событие в календаре", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "start", label: "Начало", kind: "iso" }, { name: "end", label: "Конец", kind: "iso" }, { name: "location", label: "Где", kind: "str" }] },
  update_event: { title: "Перенести/изменить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }, { name: "new_title", label: "Новое название", kind: "str" }, { name: "new_start", label: "Новое начало", kind: "iso" }, { name: "new_end", label: "Новый конец", kind: "iso" }] },
  delete_event: { title: "Удалить событие", fields: [{ name: "title", label: "Какое событие", kind: "str" }] },
  query_calendar: { title: "Что в календаре", fields: [{ name: "start", label: "С", kind: "iso" }, { name: "end", label: "По", kind: "iso" }] },
  send_message: { title: "Сообщение", fields: [{ name: "recipient", label: "Кому", kind: "str" }, { name: "text", label: "Текст", kind: "str" }, { name: "channel", label: "Как", kind: "enum", options: Re }, { name: "when", label: "Когда", kind: "iso" }] },
  add_task: { title: "Задача", fields: [{ name: "title", label: "Название", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: we }, { name: "due_date", label: "Срок (ГГГГ-ММ-ДД)", kind: "str" }] },
  add_shopping: { title: "В список покупок", fields: [{ name: "items", label: "Что купить (через запятую)", kind: "list" }] },
  complete_task: { title: "Отметить задачу", fields: [{ name: "title", label: "Какая", kind: "str" }, { name: "list", label: "Список", kind: "enum", options: we }] },
  query_tasks: { title: "Показать задачи", fields: [{ name: "list", label: "Список", kind: "enum", options: we }] },
  ha_control: { title: "Управление домом", fields: [{ name: "service", label: "Сервис", kind: "str" }, { name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }, { name: "data", label: "Параметры", kind: "json" }] },
  ha_query: { title: "Состояние устройства", fields: [{ name: "entity_hint", label: "Устройство", kind: "str" }, { name: "entity_id", label: "entity_id", kind: "str" }] },
  clarify: { title: "Вопрос", fields: [{ name: "question", label: "Вопрос", kind: "str" }] },
  undo: { title: "Отмена последнего", fields: [] },
  help: { title: "Справка", fields: [] }
};
function Mt(e) {
  return ye[e]?.title ?? e;
}
function lt(e, n) {
  return n == null ? "" : e.kind === "path" ? Array.isArray(n) ? n.join(" → ") : String(n) : e.kind === "list" ? Array.isArray(n) ? n.join(", ") : String(n) : e.kind === "json" ? JSON.stringify(n) : e.kind === "bool" ? n ? "да" : "нет" : String(n);
}
function dt(e, n = (t) => t) {
  const t = ye[String(e.type)];
  if (!t)
    return String(e.type);
  const i = t.fields.filter((s) => e[s.name] !== void 0 && e[s.name] !== null && e[s.name] !== "" && e[s.name] !== !1).map((s) => `${s.label.replace(/ \(.*\)$/, "")}: ${s.kind === "iso" ? n(String(e[s.name])) : lt(s, e[s.name])}`);
  return i.length ? `${t.title} — ${i.join("; ")}` : t.title;
}
function Pt(e, n, t) {
  const i = ye[String(e.type)], s = { ...e };
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
  return e.readData(at, { path: n, query: t }, { signal: i });
}
function ct(e, n, t) {
  return e.invokeAction(it, n, t);
}
async function E(e, n, t, i = {}) {
  if (i.confirm && !await nt({ title: i.confirm.title, message: i.confirm.message, confirmLabel: i.confirm.label ?? b.delete, destructive: !0 }))
    return { ok: !1, error: { code: "cancelled", message: "cancelled" } };
  const s = await ct(e, n, t);
  return s.ok ? i.success && D(i.success, "good") : D(s.error.message, "bad", 7e3), s;
}
function U(e, n, t, i, s = 250, o) {
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
  }, l = Xe(d, s);
  if (n.add(() => l.cancel()), o) {
    const c = (p) => {
      !r || p.relatedTarget instanceof Node && o.contains(p.relatedTarget) || window.setTimeout(() => {
        r && !u() && d();
      }, 150);
    };
    o.addEventListener("focusout", c), n.add(() => o.removeEventListener("focusout", c));
  }
  for (const c of t)
    n.add(e.subscribe(ge, c, () => l()));
}
function Pe(e, n) {
  const t = document.activeElement instanceof HTMLElement && e.contains(document.activeElement) ? document.activeElement.dataset.key : void 0;
  n(), t && e.querySelector(`[data-key="${CSS.escape(t)}"]`)?.focus();
}
function H(e, n) {
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
  return j(ee(e), ue(e));
}
function P(e, n, t, i = "") {
  return a("li", { class: i }, a("div", { class: "ks-grow" }, a("div", { class: "ks-title" }, e), n ? a("div", { class: "ks-sub" }, n) : null), t ?? null);
}
function w(e, n, t = "secondary", i) {
  const s = T(e, { variant: t, onClick: n, title: i });
  return s.classList.add("ks-btn-sm"), s;
}
function G(e, ...n) {
  return a("div", { class: "ks-row ks-row-spread dv-head" }, a("h2", { class: "dv-page-title" }, e), a("div", { class: "ks-row" }, n));
}
function q(e = b.empty) {
  return a("p", { class: "ks-muted" }, e);
}
function K(e, n, t, i = {}) {
  return pe(e, (o) => {
    const r = me(n, {
      submitLabel: i.submitLabel ?? b.save,
      extraActions: [T(b.cancel, { onClick: () => o(!1) })],
      onSubmit: async (u, d) => {
        const l = await t(u);
        l.ok ? o(!0) : d.showErrors(l.error);
      }
    });
    return a("div", null, i.note ?? null, r.el);
  }).closed.then((o) => o === !0);
}
function It(e) {
  const n = {};
  for (const t of e.split(/\r?\n/)) {
    const i = t.indexOf(":"), s = (i >= 0 ? t.slice(0, i) : t).trim(), o = i >= 0 ? t.slice(i + 1).trim() : "";
    s && (n[s] = o);
  }
  return n;
}
function Lt(e) {
  return Object.entries(e ?? {}).map(([n, t]) => `${n}: ${t}`).join(`
`);
}
function zt(e) {
  return e.split(/→|->|>|\//).map((n) => n.trim()).filter(Boolean);
}
function Nt(e) {
  if (typeof e != "string" || e.trim() === "")
    return null;
  const n = Number(e.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}
async function fe(e, n) {
  const [t, i] = await Promise.all([e, n]);
  return t.ok ? i.ok ? { ok: !0, data: [t.data, i.data] } : i : t;
}
const Rt = [["audit", "Изменения"], ["commands", "Команды"], ["outbox", "Отправка сообщений"]];
function Bt(e, n, t) {
  const i = new L(), s = a("div"), o = a("div", { class: "ks-row dv-chips", role: "tablist" });
  let r = "audit", u = null;
  const d = () => {
    u?.dispose(), Pe(o, () => S(o, Rt.map(
      ([c, p]) => a("button", { type: "button", role: "tab", dataset: { key: c }, class: `ks-chip${r === c ? " is-active" : ""}`, "aria-selected": String(r === c), onClick: () => {
        r = c, d();
      } }, p)
    ))), r === "audit" ? u = R({
      host: s,
      load: (c) => $(t, "api/audit", { limit: 100 }, c),
      render: ({ audit: c }, p) => c.length ? a("ul", { class: "ks-list" }, c.map(
        (m) => P(
          a("span", null, m.summary, " ", j(m.source, "neutral")),
          `${I(m.ts)} · ${m.actor}`,
          m.undoable ? w(b.undo, async () => {
            (await E(t, "audit.undo", { id: m.id }, { success: "Отменено" })).ok && p();
          }, "ghost") : null
        )
      )) : q("Изменений пока не было.")
    }) : r === "commands" ? u = R({
      host: s,
      load: (c) => $(t, "api/commands", { limit: 100 }, c),
      render: ({ commands: c }) => c.length ? a("ul", { class: "ks-list" }, c.map(
        (p) => P(
          a("span", null, `«${p.text}»`, " ", l(p.status)),
          [I(p.ts), p.frontend, p.interpreter ?? "", p.confidence !== null ? `${Math.round(p.confidence * 100)}%` : "", p.reply ?? p.error ?? ""].filter(Boolean).join(" · "),
          p.intents?.length ? a("details", null, a("summary", null, "Как я понял"), a("ul", null, p.intents.map((m) => a("li", null, dt(m, (v) => I(v)))))) : null
        )
      )) : q("Команд пока не было.")
    }) : u = R({
      host: s,
      load: (c) => $(t, "api/outbox", { limit: 100 }, c),
      render: ({ messages: c }, p) => c.length ? a("ul", { class: "ks-list" }, c.map(
        (m) => P(
          a("span", null, m.text, " ", ve(m.status)),
          `${b.channels[m.channel] ?? m.channel} → ${m.recipient || "—"} · ${I(m.created_at)}${m.attempts ? ` · попыток: ${m.attempts}` : ""}${m.last_error ? ` · ${m.last_error}` : ""}`,
          a(
            "div",
            { class: "ks-row" },
            m.status === "failed" || m.status === "queued" ? w("Повторить", async () => {
              (await E(t, "outbox.retry", { id: m.id })).ok && p();
            }, "primary") : null,
            m.status === "failed" || m.status === "queued" ? w(b.cancel, async () => {
              (await E(t, "outbox.cancel", { id: m.id })).ok && p();
            }, "danger") : null
          )
        )
      )) : q("Исходящих сообщений не было.")
    });
  }, l = (c) => ve(c);
  return d(), S(e, a("div", { class: "ks-page" }, G(b.activity), o, M("", s))), U(t, i, ["audit", "commands", "outbox", "items", "locations", "notes", "tasks", "reminders", "calendar"], () => u?.refresh(), 500), i.add(() => u?.dispose()), H(i);
}
function Be(e, n, t, i) {
  const s = Z(), o = te(t ? t.start : new Date(Math.ceil(Date.now() / 36e5) * 36e5).toISOString(), s), r = t ? te(t.end, s) : "", u = n.sources.filter((d) => d.capabilities.includes("create") && d.available);
  K(
    t ? `Изменить: ${t.title}` : "Новое событие",
    [
      { name: "title", label: b.title, required: !0, value: t?.title ?? "", wide: !0 },
      { name: "start", label: "Начало", type: "datetime-local", required: !0, value: o },
      { name: "end", label: "Конец", type: "datetime-local", value: r, hint: "Пусто — по умолчанию из настроек." },
      { name: "all_day", label: "Весь день", type: "checkbox", value: t?.all_day ?? !1 },
      { name: "location", label: "Где", value: t?.location ?? "", wide: !0 },
      { name: "notes", label: b.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 },
      ...t ? [] : [{ name: "calendar", label: "Календарь", type: "select", options: u.map((d) => ({ value: d.id, label: d.title })), value: n.default }]
    ],
    async (d) => {
      const l = {
        title: String(d.title).trim(),
        start: ne(String(d.start), s),
        all_day: d.all_day === !0,
        location: String(d.location ?? ""),
        notes: String(d.notes ?? "")
      };
      d.end && (l.end = ne(String(d.end), s));
      const c = t ? await e.invokeAction("domovoy.actions", "calendar.update", { ref: t.ref, ...l }) : await e.invokeAction("domovoy.actions", "calendar.create", { ...l, calendar: d.calendar });
      return c.ok && i(), c;
    }
  );
}
function Ut(e, n, t) {
  const i = new L(), s = a("div");
  let o = 14, r = { sources: [], default: "local" };
  const u = T(b.add, { variant: "primary" }), d = T("Показать ещё 2 недели", { variant: "ghost" }), l = R({
    host: s,
    load: (c) => {
      const p = Z(), m = Y((/* @__PURE__ */ new Date()).toISOString(), p), v = ne(`${m}T00:00`, p), h = ne(`${Y(new Date(Date.parse(`${m}T12:00:00Z`) + o * 864e5).toISOString(), "UTC")}T00:00`, p);
      return fe(
        $(t, "api/calendar/events", { start: v, end: h }, c),
        $(t, "api/calendar/sources", void 0, c)
      );
    },
    render: ([{ events: c, warnings: p }, m], v) => {
      r = m, u.onclick = () => Be(t, r, null, v);
      const h = /* @__PURE__ */ new Map();
      for (const g of c) {
        const y = Y(g.start);
        h.set(y, [...h.get(y) ?? [], g]);
      }
      return a(
        "div",
        null,
        p.length ? a("div", { class: "ks-stale-banner", role: "alert" }, `Не удалось прочитать календарь: ${p.map((g) => `${g.source} (${g.message})`).join("; ")}. Показано то, что доступно.`) : null,
        h.size ? [...h.entries()].sort(([g], [y]) => g.localeCompare(y)).map(
          ([g, y]) => a(
            "section",
            { class: "ks-card" },
            a("header", null, a("h2", null, Dt(y[0].start))),
            a("ul", { class: "ks-list" }, y.sort((f, A) => f.start.localeCompare(A.start)).map(
              (f) => P(
                a("span", null, f.title, f.recurring ? a("span", { class: "ks-muted" }, " ↻") : null, f.read_only ? [" ", j("только чтение", "neutral")] : null),
                `${f.all_day ? "весь день" : `${ae(f.start)}–${ae(f.end)}`}${f.location ? ` · ${f.location}` : ""} · ${f.calendar}`,
                f.read_only ? null : a(
                  "div",
                  { class: "ks-row" },
                  w(b.edit, () => Be(t, r, f, v)),
                  w(b.delete, async () => {
                    (await E(t, "calendar.delete", { ref: f.ref }, { confirm: { title: "Удалить событие", message: `«${f.title}» будет удалено из календаря.` } })).ok && v();
                  }, "danger")
                )
              )
            ))
          )
        ) : q(`На ближайшие ${o} дней событий нет.`)
      );
    }
  });
  return d.onclick = () => {
    o += 14, l.refresh();
  }, e.replaceChildren(a("div", { class: "ks-page" }, G(b.calendar, u), s, a("div", { class: "ks-row" }, d))), t.readData("domovoy.api", { path: "api/state" }).then((c) => c.ok && ie(c.data.timezone)), U(t, i, ["calendar"], () => l.refresh()), i.add(() => l.dispose()), H(i);
}
const Ht = {
  home_assistant: "Home Assistant",
  telegram: "Telegram",
  caldav: "Календарь CalDAV",
  llm: "Языковая модель",
  speak: "Голос через колонки",
  stt: "Распознавание речи"
};
function re(e, n, t, i, s, o = !1) {
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
const Ue = (e) => Array.isArray(e) ? e.join(`
`) : "", Ce = (e) => e.split(/[\n,]/).map((n) => n.trim()).filter(Boolean);
function le(e, n, t, i) {
  return me(n, {
    onSubmit: async (o, r) => {
      const { settings: u, secrets: d } = t(o), l = Object.fromEntries(Object.entries(d ?? {}).filter(([, c]) => c !== ""));
      if (u && Object.keys(u).length) {
        const c = await e.invokeAction("domovoy.actions", "settings.update", u);
        if (!c.ok) {
          r.showErrors(c.error);
          return;
        }
        (c.data.secrets_cleared ?? []).filter((m) => !(m in l)).length && D("Адрес изменён, поэтому сохранённый ключ сброшен — введите его заново.", "warn", 9e3);
      }
      if (Object.keys(l).length) {
        const c = await e.invokeAction("domovoy.actions", "secrets.set", l);
        if (!c.ok) {
          r.showErrors(c.error);
          return;
        }
      }
      D("Сохранено", "good"), i();
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
function Ft(e, n, t) {
  return w("Проверить", async () => {
    const i = await e.invokeAction("domovoy.actions", "integration.test", { name: n });
    i.ok ? i.data.ok ? D("Связь есть", "good") : D(i.data.error?.message ?? "Не получилось", "bad", 7e3) : D(i.error.message, "bad", 7e3), t();
  });
}
function J(e, n, t, i) {
  return a("details", { class: "ks-card dv-section", id: `dv-${e}` }, a("summary", null, a("h2", null, n), t), i);
}
function xe(e, n, t, i, s, o, r, u) {
  const d = async (c) => {
    const p = await e.invokeAction("domovoy.actions", "settings.update", { [n]: c });
    return p.ok ? u() : D(p.error.message, "bad", 7e3), p;
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
    je(
      [
        ...i.map((c, p) => ({ key: `c${p}`, header: c.header, render: (m) => c.render(m) })),
        { key: "a", header: "", render: (c) => a("div", { class: "ks-row" }, w(b.edit, () => l(t.indexOf(c))), w(b.delete, async () => {
          await d(t.filter((p) => p !== c));
        }, "danger")) }
      ],
      t,
      q("Пока не задано.")
    ),
    a("div", { class: "ks-row" }, T(b.add, { onClick: () => l(-1) }))
  );
}
function Vt(e, n, t) {
  const i = (o) => {
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
        const d = { name: String(r.name).trim(), aliases: Ce(String(r.aliases)), channels: u, is_self: r.is_self === !0 }, l = o ? await e.invokeAction("domovoy.actions", "contacts.update", { id: o.id, ...d }) : await e.invokeAction("domovoy.actions", "contacts.create", d);
        return l.ok && t(), l;
      }
    );
  }, s = (o, r) => {
    K(
      `Привязать ${r}`,
      [{ name: "contact_id", label: "К контакту", type: "select", options: n.contacts.map((u) => ({ value: String(u.id), label: u.name })), required: !0 }],
      async (u) => {
        const d = await e.invokeAction("domovoy.actions", "contacts.link", { contact_id: Number(u.contact_id), chat_id: o });
        return d.ok && t(), d;
      }
    );
  };
  return a(
    "div",
    null,
    je(
      [
        { key: "name", header: "Имя", render: (o) => a("span", null, o.name, o.is_self ? [" ", j("это я", "info")] : null) },
        { key: "al", header: "Также", render: (o) => o.aliases.join(", ") || b.none },
        { key: "tg", header: "Telegram", render: (o) => o.channels.telegram?.chat_id ? j("привязан", "good") : j("не привязан", "warn") },
        { key: "a", header: "", render: (o) => a("div", { class: "ks-row" }, w(b.edit, () => i(o)), w(b.delete, async () => {
          (await E(e, "contacts.delete", { id: o.id }, { confirm: { title: "Удалить контакт", message: o.name } })).ok && t();
        }, "danger")) }
      ],
      n.contacts,
      q("Контактов нет. Добавьте себя и тех, кому Домовой будет писать.")
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
const Wt = "http://127.0.0.1:48123/domovoy-api/", Kt = "<секрет Assist — нажмите «Показать»>";
function He(e) {
  return [
    "# configuration.yaml — один раз",
    "rest_command:",
    "  domovoy_say:",
    `    url: "${Wt}frontends/assist"`,
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
function Zt(e, n) {
  const t = async () => {
    const o = await $(e, "api/security");
    return o.ok ? o.data : (D(o.error.message, "bad", 7e3), null);
  }, i = async (o) => {
    try {
      await navigator.clipboard.writeText(o), D("Скопировано", "good");
    } catch {
      D("Не удалось скопировать — нажмите «Показать» и выделите вручную", "warn", 7e3);
    }
  }, s = (o, r, u) => {
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
          (await E(e, "security.rotate", { name: u }, { confirm: { title: "Сменить секрет", message: "Старый перестанет работать: его нужно будет заменить везде, где он указан.", label: "Сменить" } })).ok && n();
        }, "danger")
      )
    );
  };
  return a(
    "div",
    null,
    a("p", { class: "ks-muted" }, "Из панели Home Assistant доступ уже открыт. Эти ключи нужны только для внешних клиентов: они не хранятся на странице, пока вы их не запросите."),
    s("API-токен (Bearer)", (o) => o.api_token, "api_token"),
    s("Секрет для Home Assistant (Assist)", (o) => o.assist_secret, "assist_secret"),
    s("Путь вебхука для навыка Алисы (добавьте ваш публичный https://-адрес перед ним)", (o) => o.alice_path, "alice_secret"),
    a("h3", null, "Голос через Home Assistant (фраза «домовой …»)"),
    a("p", { class: "ks-muted" }, "Если Home Assistant работает не на этом же устройстве, замените 127.0.0.1 на адрес, по которому он видит аддон."),
    a("pre", { class: "dv-code" }, He(Kt)),
    w("Скопировать YAML с секретом", async () => {
      const o = await t();
      o && await i(He(o.assist_secret));
    }, "secondary")
  );
}
function Gt(e, n, t) {
  const i = new L(), s = a("div"), o = R({
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
      const d = r.settings, l = (k) => {
        const x = r.integrations.find((z) => z.name === k);
        return x ? j(ee(x.status), ue(x.status)) : null;
      }, c = (k) => {
        const x = r.integrations.find((z) => z.name === k);
        return x ? a("p", { class: "ks-muted" }, [x.detail, x.last_ok ? `Последний успех: ${I(x.last_ok)}.` : "", x.last_error ? `Последняя ошибка: ${x.last_error}` : ""].filter(Boolean).join(" "), " ", Ft(t, k, u)) : null;
      }, p = a("div", { class: "ks-grid dv-status-grid" }, r.integrations.map(
        (k) => a("div", { class: "ks-card dv-status" }, a("strong", null, Ht[k.name] ?? k.name), j(ee(k.status), ue(k.status)), a("small", { class: "ks-muted" }, k.detail && k.detail.toLowerCase() !== ee(k.status).toLowerCase() ? k.detail : ""))
      )), m = J("ha", "Home Assistant", l("home_assistant"), a(
        "div",
        null,
        c("home_assistant"),
        r.haEntitiesAvailable ? null : a("p", { class: "ks-muted" }, "Список сущностей недоступен. Можно указать ID вручную."),
        le(t, [
          { name: "url", label: "Адрес Home Assistant", type: "url", value: d.ha.url, placeholder: "http://homeassistant.local:8123", hint: "В аддоне обычно http://supervisor/core — оставьте пустым, если работаете внутри HA.", wide: !0 },
          ke("ha_token", "Долгоживущий токен доступа", r.secrets.ha_token),
          ...re("person_entity", "Ваш person", d.ha.person_entity, r.haEntities, ["person"]),
          { name: "allowed_services", label: "Разрешённые сервисы управления", type: "textarea", rows: 4, value: Ue(d.ha.allowed_services), placeholder: `light.turn_on
light.turn_off
script.turn_on`, hint: "Дополнительно к базовым (свет, розетки, вентиляторы, шторы, сцены). Замки, сигнализация, скрипты и Supervisor запрещены всегда.", wide: !0 }
        ], (k) => ({ settings: { ha: { url: String(k.url).trim(), person_entity: Q(k, "person_entity", d.ha.person_entity), allowed_services: Ce(String(k.allowed_services)) } }, secrets: { ha_token: String(k.ha_token) } }), u)
      )), v = J("telegram", "Telegram", l("telegram"), a("div", null, c("telegram"), le(t, [
        { name: "enabled", label: "Включён", type: "checkbox", value: d.telegram.enabled },
        ke("telegram_token", "Токен бота (от @BotFather)", r.secrets.telegram_token)
      ], (k) => ({ settings: { telegram: { enabled: k.enabled === !0 } }, secrets: { telegram_token: String(k.telegram_token) } }), u), a("h3", null, "Контакты"), Vt(t, r, u))), h = J("calendar", "Календарь", l("caldav"), a("div", null, c("caldav"), le(t, [
        { name: "url", label: "CalDAV URL", type: "url", value: d.caldav.url, placeholder: "https://caldav.example.com/dav/user/calendar/", wide: !0 },
        { name: "username", label: "Логин", value: d.caldav.username },
        ke("caldav_password", "Пароль / пароль приложения", r.secrets.caldav_password),
        { name: "default", label: "Куда добавлять по умолчанию", type: "select", options: [{ value: "local", label: "Локальный календарь" }, { value: "caldav", label: "CalDAV" }], value: d.calendar.default },
        { name: "ha_calendar_pick", label: "Добавить календарь HA", type: "select", value: "", options: [
          { value: "", label: "Выбрать из Home Assistant" },
          ...r.haEntities.filter((k) => k.domain === "calendar").map((k) => ({ value: k.id, label: `${k.name} (${k.id})` }))
        ], wide: !0 },
        { name: "ha_calendars", label: "Календари из Home Assistant", type: "textarea", rows: 2, value: Ue(d.calendar.ha_calendars), placeholder: "calendar.family", hint: "По одному на строку. События из них видны; добавлять можно, менять и удалять — нет.", wide: !0 }
      ], (k) => ({
        settings: { caldav: { url: String(k.url).trim(), username: String(k.username).trim() }, calendar: {
          default: k.default,
          ha_calendars: [...new Set([...Ce(String(k.ha_calendars)), String(k.ha_calendar_pick || "").trim()].filter(Boolean))]
        } },
        secrets: { caldav_password: String(k.caldav_password) }
      }), u))), g = J("llm", "Языковая модель (необязательно)", l("llm"), a(
        "div",
        null,
        c("llm"),
        a("p", { class: "ks-muted" }, "Подойдёт любой OpenAI-совместимый сервер: локальный (Ollama, llama.cpp, LM Studio) или облачный. Без неё Домовой работает по правилам — быстро и без нагрузки на процессор. Модель ничего не решает сама: её предложения проходят проверку и попадают в «Проверку»."),
        le(t, [
          { name: "enabled", label: "Включена", type: "checkbox", value: d.ai.enabled },
          { name: "base_url", label: "Адрес API", type: "url", value: d.ai.base_url, placeholder: "http://192.168.1.20:11434/v1", wide: !0 },
          { name: "model", label: "Модель для команд", value: d.ai.model, placeholder: "qwen2.5:3b-instruct" },
          { name: "embedding_model", label: "Модель для смыслового поиска", value: d.ai.embedding_model, placeholder: "nomic-embed-text", hint: "Пусто — поиск по словам и опечаткам, без модели." },
          ke("llm_api_key", "API-ключ (если нужен)", r.secrets.llm_api_key)
        ], (k) => ({ settings: { ai: { enabled: k.enabled === !0, base_url: String(k.base_url).trim(), model: String(k.model).trim(), embedding_model: String(k.embedding_model).trim() } }, secrets: { llm_api_key: String(k.llm_api_key) } }), u)
      )), y = J("speak", "Голос через колонки (Яндекс Станции)", l("speak"), a(
        "div",
        null,
        c("speak"),
        a("p", { class: "ks-muted" }, "Домовой говорит через колонки, подключённые к Home Assistant. Способ озвучки задаётся здесь, а не в коде."),
        xe(t, "speakers", d.speakers, [
          { header: "Колонка", render: (k) => String(k.name || k.entity_id) },
          { header: "Комната", render: (k) => String(k.room ?? "") || b.none },
          { header: "Способ", render: (k) => ({ yandex_station_text: "Яндекс Станция (текст)", tts_speak: "TTS (tts.speak)", custom: "свой сервис" })[String(k.mode)] ?? String(k.mode ?? "Яндекс Станция (текст)") },
          { header: "", render: (k) => k.default ? "по умолчанию" : "" }
        ], (k) => [
          { name: "name", label: "Название", value: k?.name ?? "", placeholder: "Станция на кухне" },
          ...re("entity_id", "media_player", String(k?.entity_id ?? ""), r.haEntities, ["media_player"], !0),
          { name: "room", label: "Комната", value: k?.room ?? "", placeholder: "кухня" },
          { name: "mode", label: "Способ озвучки", type: "select", options: [{ value: "yandex_station_text", label: "Яндекс Станция: media_player.play_media (text)" }, { value: "tts_speak", label: "tts.speak (нужна TTS-сущность)" }, { value: "custom", label: "Свой сервис" }], value: k?.mode ?? "yandex_station_text", wide: !0 },
          ...re("tts_entity", "TTS-сущность (для tts.speak)", String(k?.tts_entity ?? ""), r.haEntities, ["tts"]),
          { name: "service", label: "Свой сервис", value: k?.service ?? "", placeholder: "script.say", hint: "domain.service; в данных используйте {text} и {entity_id}." },
          { name: "default", label: "По умолчанию, если неизвестно, где человек", type: "checkbox", value: k?.default === !0, wide: !0 }
        ], (k, x) => ({
          ...x ?? {},
          id: x?.id ?? Q(k, "entity_id", String(x?.entity_id ?? "")),
          name: String(k.name).trim(),
          entity_id: Q(k, "entity_id", String(x?.entity_id ?? "")),
          room: String(k.room).trim(),
          mode: k.mode,
          tts_entity: Q(k, "tts_entity", String(x?.tts_entity ?? "")),
          service: String(k.service).trim(),
          default: k.default === !0
        }), "колонка", u)
      )), f = J("rooms", "Где вы находитесь: комнаты и места", null, a(
        "div",
        null,
        a("p", { class: "ks-muted" }, "Датчик присутствия или устройство, по которому Домовой понимает, что вы в комнате, — для напоминаний «когда зайду на кухню» и чтобы отвечать в нужную колонку."),
        a("h3", null, "Комнаты"),
        xe(
          t,
          "rooms",
          d.rooms,
          [{ header: "Комната", render: (k) => String(k.name || k.room) }, { header: "Датчик", render: (k) => `${k.entity_id ?? ""} = ${k.state ?? "on"}` }],
          (k) => [
            { name: "name", label: "Название", required: !0, value: k?.name ?? k?.room ?? "", placeholder: "кухня" },
            ...re(
              "entity_id",
              "Сущность",
              String(k?.entity_id ?? ""),
              r.haEntities,
              ["binary_sensor", "sensor", "device_tracker", "person", "zone", "input_boolean"],
              !0
            ),
            { name: "state", label: "Активна, когда состояние", value: k?.state ?? "on" }
          ],
          (k, x) => ({
            ...x ?? {},
            name: String(k.name).trim(),
            entity_id: Q(k, "entity_id", String(x?.entity_id ?? "")),
            state: String(k.state).trim() || "on"
          }),
          "комната",
          u
        ),
        a("h3", null, "Другие места и устройства"),
        xe(
          t,
          "places",
          d.places,
          [{ header: "Место", render: (k) => String(k.name) }, { header: "Сущность", render: (k) => `${k.entity_id ?? ""} = ${k.state ?? "on"}` }],
          (k) => [
            { name: "name", label: "Название", required: !0, value: k?.name ?? "", placeholder: "мастерская" },
            ...re("entity_id", "Сущность", String(k?.entity_id ?? ""), r.haEntities, void 0, !0),
            { name: "state", label: "Активно, когда состояние", value: k?.state ?? "on" }
          ],
          (k, x) => ({
            ...x ?? {},
            name: String(k.name).trim(),
            entity_id: Q(k, "entity_id", String(x?.entity_id ?? "")),
            state: String(k.state).trim() || "on"
          }),
          "место",
          u
        )
      )), A = J("stt", "Распознавание речи (микрофон киоска)", l("stt"), a(
        "div",
        null,
        c("stt"),
        a("p", { class: "ks-muted" }, "Нужно только если вы говорите в микрофон киоска. Голос через Алису/Home Assistant приходит уже текстом. Подойдёт любой сервер с OpenAI-совместимым /audio/transcriptions (например, локальный faster-whisper)."),
        le(t, [
          { name: "base_url", label: "Адрес STT-сервера", type: "url", value: d.voice.stt.base_url, placeholder: "http://127.0.0.1:8000/v1", wide: !0 },
          { name: "model", label: "Модель", value: d.voice.stt.model, placeholder: "small" },
          { name: "language", label: "Язык", value: d.voice.stt.language },
          { name: "max_seconds", label: "Максимум секунд записи", type: "number", min: 3, max: 60, value: d.voice.stt.max_seconds }
        ], (k) => ({ settings: { voice: { stt: { base_url: String(k.base_url).trim(), model: String(k.model).trim(), language: String(k.language).trim() || "ru", max_seconds: Number(k.max_seconds) || 15 } } } }), u)
      )), _ = J("security", "Доступ, Алиса и Home Assistant", null, Zt(t, u));
      return a("div", { class: "dv-stack" }, p, m, v, h, y, f, g, A, _);
    }
  });
  return S(e, a("div", { class: "ks-page" }, G(b.integrations), s)), U(t, i, ["integrations", "contacts", "settings"], () => o.refresh(), 800, e), i.add(() => o.dispose()), H(i);
}
function ut(e, n = !0) {
  const t = e.slice().sort((i, s) => i.path.join("/").localeCompare(s.path.join("/"), "ru")).map((i) => ({ value: String(i.id), label: i.path.join(" → ") }));
  return n ? [{ value: "", label: "— без места —" }, ...t] : t;
}
function qe(e, n, t, i) {
  return K(
    t ? `Изменить: ${t.name}` : "Добавить вещь",
    [
      { name: "name", label: b.name, required: !0, value: t?.name ?? "", wide: !0 },
      { name: "quantity", label: b.quantity, type: "number", step: "any", min: 0, value: t?.quantity ?? "" },
      { name: "unit", label: b.unit, value: t?.unit ?? "", placeholder: "шт, кг, м…" },
      { name: "location_id", label: b.place, type: "select", options: ut(n), value: t?.location_id ? String(t.location_id) : "", wide: !0 },
      { name: "new_path", label: "Или новое место", placeholder: "Нижний шкаф → Коробка 3", hint: "Создам недостающие уровни автоматически.", wide: !0 },
      { name: "category", label: "Категория", value: t?.category ?? "" },
      { name: "properties", label: "Свойства", type: "textarea", rows: 3, value: Lt(t?.properties), hint: "По строке: «номинал: 10 кОм»", wide: !0 },
      { name: "notes", label: b.notes, type: "textarea", rows: 2, value: t?.notes ?? "", wide: !0 }
    ],
    async (s) => {
      const o = zt(String(s.new_path ?? "")), r = {
        name: String(s.name).trim(),
        quantity: Nt(s.quantity),
        unit: String(s.unit ?? "").trim(),
        category: String(s.category ?? "").trim(),
        properties: It(String(s.properties ?? "")),
        notes: String(s.notes ?? "")
      };
      o.length ? r.location_path = o : r.location_id = s.location_id ? Number(s.location_id) : null;
      const u = t ? await Fe(e, "items.update", { id: t.id, ...r }) : await Fe(e, "items.create", r);
      return u.ok && i(), u;
    }
  );
}
function Fe(e, n, t) {
  return e.invokeAction("domovoy.actions", n, t);
}
function mt(e, n, t) {
  const i = a("div", { class: "dv-item-detail" }, a("p", { class: "ks-muted" }, b.loading)), s = pe("Вещь", i);
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
        a("dt", null, b.quantity),
        a("dd", null, Me(d.quantity, d.unit) || b.none),
        a("dt", null, b.place),
        a("dd", null, d.location_text || "не указано"),
        d.category ? [a("dt", null, "Категория"), a("dd", null, d.category)] : null,
        ...Object.entries(d.properties ?? {}).flatMap(([c, p]) => [a("dt", null, c), a("dd", null, p)]),
        d.notes ? [a("dt", null, b.notes), a("dd", null, d.notes)] : null,
        a("dt", null, "Изменено"),
        a("dd", null, `${I(d.updated_at)} · ${d.source}`)
      ),
      a(
        "div",
        { class: "ks-row" },
        T(b.edit, { variant: "primary", onClick: () => u.ok && void qe(e, u.data.locations, d, l) }),
        T("Списать 1", { onClick: async () => {
          (await E(e, "items.consume", { id: d.id, quantity: 1 })).ok && l();
        } }),
        T(b.delete, { variant: "danger", onClick: async () => {
          (await E(e, "items.delete", { id: d.id }, { confirm: { title: "Удалить вещь", message: `«${d.name}» будет удалена. Это можно отменить в журнале.` } })).ok && l();
        } })
      ),
      a("h4", null, "История"),
      r.ok && r.data.history.length ? a("ul", { class: "ks-list" }, r.data.history.slice(0, 12).map((c) => P(c.summary, `${I(c.ts)} · ${c.actor}/${c.source}`))) : q("Изменений не было.")
    );
  })();
}
function Jt(e, n, t) {
  const i = new L();
  let s = "", o = String(n.location_id ?? "");
  const r = a("div"), u = ce({ name: "q", label: "Фильтр", placeholder: "название или заметка" }), d = ce({ name: "loc", label: b.place, type: "select", options: [{ value: "", label: "Везде" }], value: o });
  let l = [];
  const c = R({
    host: r,
    load: (m) => fe(
      $(t, "api/items", { q: s || void 0, location_id: o || void 0, limit: 500 }, m),
      $(t, "api/locations", void 0, m)
    ),
    render: ([{ items: m }, { locations: v }], h) => {
      l = v;
      const g = d.input, y = [{ value: "", label: "Везде" }, ...ut(v, !1)];
      return S(g, y.map((f) => a("option", { value: f.value, selected: f.value === o }, f.label))), g.value = o, a(
        "div",
        null,
        je(
          [
            { key: "name", header: b.name, render: (f) => a("button", { class: "ks-link", type: "button", onClick: () => mt(t, f.id, h) }, f.name) },
            { key: "qty", header: b.quantity, render: (f) => f.quantity === 0 ? j("нет", "warn") : Me(f.quantity, f.unit) || b.none },
            { key: "place", header: b.place, render: (f) => f.location_text || b.none },
            { key: "updated", header: "Изменено", render: (f) => I(f.updated_at), className: "ks-hide-narrow" },
            {
              key: "actions",
              header: "",
              render: (f) => a(
                "div",
                { class: "ks-row" },
                w(b.edit, () => void qe(t, v, f, h)),
                w(b.delete, async () => {
                  (await E(t, "items.delete", { id: f.id }, { confirm: { title: "Удалить вещь", message: `«${f.name}» будет удалена. Это можно отменить в журнале.` } })).ok && h();
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
      G(b.inventory, T(b.add, { variant: "primary", onClick: () => void qe(t, l, null, p) })),
      a("div", { class: "ks-card ks-filters" }, u.el, d.el),
      r
    )
  ), U(t, i, ["items", "locations"], p), i.add(() => c.dispose()), H(i);
}
const pt = { home: "дом", room: "комната", cabinet: "шкаф", shelf: "полка", box: "коробка", cell: "ячейка", place: "место" }, Yt = Object.entries(pt).map(([e, n]) => ({ value: e, label: n }));
function ft(e, n = []) {
  for (const t of e)
    n.push(t), ft(t.children, n);
  return n;
}
function Xt(e, n, t) {
  const i = new L(), s = a("div"), o = T(b.add, { variant: "primary" }), r = (l, c, p, m) => {
    const v = ft(p).filter((h) => !l || h.id !== l.id && !h.path.join("\0").startsWith(l.path.join("\0") + "\0"));
    K(
      l ? `Изменить: ${l.name}` : c ? `Новое место внутри «${c.name}»` : "Новое место",
      [
        { name: "name", label: b.name, required: !0, value: l?.name ?? "", wide: !0 },
        { name: "kind", label: "Тип", type: "select", options: Yt, value: l?.kind ?? (c ? "box" : "room") },
        { name: "parent_id", label: "Внутри", type: "select", options: [{ value: "", label: "— верхний уровень —" }, ...v.map((h) => ({ value: String(h.id), label: h.path.join(" → ") }))], value: String((l ? l.parent_id : c?.id) ?? ""), wide: !0 },
        { name: "notes", label: b.notes, type: "textarea", rows: 2, value: l?.notes ?? "", wide: !0 }
      ],
      async (h) => {
        const g = { name: String(h.name).trim(), kind: String(h.kind), notes: String(h.notes ?? ""), parent_id: h.parent_id ? Number(h.parent_id) : null }, y = l ? await t.invokeAction("domovoy.actions", "locations.update", { id: l.id, ...g }) : await t.invokeAction("domovoy.actions", "locations.create", g);
        return y.ok && m(), y;
      }
    );
  }, u = (l, c, p) => a(
    "li",
    { class: "dv-loc" },
    a(
      "div",
      { class: "dv-loc-row" },
      a("span", { class: "dv-loc-name" }, l.name, " ", j(pt[l.kind] ?? l.kind, "neutral")),
      a("span", { class: "ks-muted" }, l.item_count ? `${l.item_count} вещ.` : ""),
      a(
        "span",
        { class: "ks-row dv-loc-actions" },
        l.item_count ? w("Вещи", () => t.navigate("domovoy.inventory", { location_id: String(l.id) }), "ghost") : null,
        w("+ Внутрь", () => r(null, l, c, p), "ghost"),
        w(b.edit, () => r(l, null, c, p)),
        w(b.delete, async () => {
          (await E(t, "locations.delete", { id: l.id }, { confirm: { title: "Удалить место", message: `«${l.name}» будет удалено (только если оно пустое).` } })).ok && p();
        }, "danger")
      )
    ),
    l.children.length ? a("ul", { class: "dv-loc-tree" }, l.children.map((m) => u(m, c, p))) : null
  ), d = R({
    host: s,
    load: (l) => t.readData("domovoy.api", { path: "api/locations/tree" }, { signal: l }),
    render: ({ tree: l }, c) => (o.onclick = () => r(null, null, l, c), l.length ? a("ul", { class: "dv-loc-tree dv-loc-root" }, l.map((p) => u(p, l, c))) : a("div", { class: "ks-empty" }, a("strong", null, "Мест ещё нет"), a("p", null, "Они появятся сами, когда вы скажете «положил в третью коробку нижнего шкафа», или добавьте вручную.")))
  });
  return e.replaceChildren(a("div", { class: "ks-page" }, G(b.locations, o), a("div", { class: "ks-card" }, s))), U(t, i, ["locations", "items"], () => d.refresh()), i.add(() => d.dispose()), H(i);
}
const Ve = "domovoy.session";
function Qt() {
  try {
    let e = window.sessionStorage.getItem(Ve);
    return e || (e = `web-${Math.random().toString(36).slice(2, 10)}`, window.sessionStorage.setItem(Ve, e)), e;
  } catch {
    return "web-anon";
  }
}
function Ie(e, n) {
  const t = a("input", { class: "ks-input dv-command", type: "text", placeholder: b.commandPlaceholder, "aria-label": "Команда", autocomplete: "off", enterkeyhint: "send" }), i = a("div", { class: "dv-reply", role: "status", "aria-live": "polite" }), s = T(b.send, { variant: "primary", type: "submit" }), o = a("form", { class: "dv-commandbar" }, t, s), r = async (d) => {
    const l = d.trim();
    if (!l)
      return;
    s.disabled = !0, S(i, a("span", { class: "ks-muted" }, b.loading));
    const c = await ct(e, "command.send", { text: l, session_id: Qt() });
    if (s.disabled = !1, !c.ok) {
      S(i, a("span", { class: "ks-error" }, c.error.message));
      return;
    }
    t.value = "", u(c.data), n();
  }, u = (d) => {
    const l = (d.options ?? []).map((c, p) => w(`${p + 1}. ${c}`, () => void r(String(p + 1))));
    S(
      i,
      a("div", { class: "dv-reply-line" }, j(ee(d.status), ue(d.status)), " ", d.reply),
      l.length ? a("div", { class: "ks-row dv-chips" }, l) : null,
      d.undoable && d.command_id ? w(b.undo, async () => {
        (await E(e, "command.undo", { id: d.command_id }, { success: "Отменено" })).ok && (S(i, a("span", { class: "ks-muted" }, "Отменено.")), n());
      }, "ghost") : null
    );
  };
  return o.addEventListener("submit", (d) => {
    d.preventDefault(), r(t.value);
  }), a("div", { class: "ks-card dv-command-card" }, o, i);
}
function en(e) {
  if (!e.events.length)
    return q("Сегодня и завтра событий нет.");
  const n = e.timezone;
  ie(n);
  const t = Y(e.now, n);
  return a(
    "ul",
    { class: "ks-list" },
    e.events.map(
      (i) => P(
        i.title,
        `${Y(i.start, n) === t ? "сегодня" : "завтра"}, ${i.all_day ? "весь день" : `${ae(i.start, n)}–${ae(i.end, n)}`}${i.location ? ` · ${i.location}` : ""}`
      )
    )
  );
}
function tn(e, n, t) {
  const i = new L(), s = t.mode === "kiosk", o = a("div", { class: `ks-page dv-today${s ? " ks-scope dv-kiosk" : ""}`, dataset: s ? { theme: "kiosk", noSwipe: "true" } : void 0 }), r = a("div", { class: "ks-page" }), u = Ie(t, () => d.refresh());
  S(e, o), S(o, u, r);
  const d = R({
    host: r,
    load: (l) => $(t, "api/today", void 0, l),
    render: (l, c) => {
      ie(l.timezone);
      const p = (m, v) => a(
        "div",
        { class: "ks-row" },
        v === "fired" ? w("Готово", async () => {
          await E(t, "reminders.done", { id: m }), c();
        }, "primary") : null,
        w("+10 мин", async () => {
          await E(t, "reminders.snooze", { id: m, minutes: 10 }), c();
        })
      );
      return a(
        "div",
        { class: "ks-grid" },
        M("Календарь", en(l)),
        M(
          "Напоминания",
          l.reminders.length ? a("ul", { class: "ks-list" }, l.reminders.map((m) => P(
            m.text,
            [m.state === "fired" ? "сработало" : m.due_at ? `${I(m.due_at)} (${De(m.due_at)})` : rt(m.trigger), m.recurrence ? ` · ${he(m.recurrence)}` : "", ` · ${b.channels[m.channel] ?? m.channel}`].join(""),
            p(m.id, m.state),
            m.state === "fired" ? "dv-fired" : ""
          ))) : q("Напоминаний нет.")
        ),
        M(
          "Список покупок",
          l.shopping.length ? a("ul", { class: "ks-list" }, l.shopping.map((m) => P(m.title, void 0, w("Куплено", async () => {
            await E(t, "tasks.complete", { id: m.id }), c();
          })))) : q("Список покупок пуст.")
        ),
        M(
          "Задачи",
          l.tasks.length ? a("ul", { class: "ks-list" }, l.tasks.map((m) => P(m.title, m.due_date ? `до ${m.due_date}${m.recurrence ? ` · ${he(m.recurrence)}` : ""}` : "", w("Готово", async () => {
            await E(t, "tasks.complete", { id: m.id }), c();
          })))) : q("Задач нет.")
        ),
        l.review_count ? M("Ждёт проверки", a(
          "div",
          null,
          a("p", null, `Есть неуверенные команды: ${l.review_count}. Я ничего не записал без вашего подтверждения.`),
          // the review page exists in the admin UI only; on the kiosk there is nothing to open
          s ? a("p", { class: "ks-muted" }, "Откройте администрирование на телефоне или компьютере, чтобы решить.") : T("Открыть проверку", { variant: "primary", onClick: () => t.navigate("domovoy.review") })
        )) : null,
        l.warnings.length ? M("Календари", a("p", { class: "ks-stale-banner" }, `Не удалось прочитать: ${l.warnings.map((m) => m.source).join(", ")}`)) : null,
        s ? null : M(
          "Последние команды",
          l.recent.length ? a("ul", { class: "ks-list" }, l.recent.map((m) => P(m.text, m.reply ?? "", j(ee(m.status), ue(m.status))))) : Qe("Команд ещё не было", "Скажите или напишите что-нибудь выше.")
        )
      );
    }
  });
  return U(t, i, ["calendar", "reminders", "tasks", "review", "commands", "outbox", "notification"], () => d.refresh()), i.add(() => d.dispose()), H(i);
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
function nn(e, n, t) {
  const i = new L(), s = a("div");
  let o = "";
  const r = ce({ name: "q", label: "Поиск по заметкам", placeholder: "слово из заголовка или текста" }), u = T(b.add, { variant: "primary" }), d = R({
    host: s,
    load: (l) => fe(
      $(t, "api/notes", { q: o || void 0 }, l),
      $(t, "api/items", { limit: 8 }, l)
    ),
    render: ([{ notes: l }, { items: c }], p) => (u.onclick = () => We(t, null, p), a(
      "div",
      { class: "ks-grid" },
      M(
        "Заметки",
        l.length ? a("ul", { class: "ks-list" }, l.map(
          (m) => P(
            m.title || m.body.slice(0, 60),
            a("span", null, m.title ? m.body.slice(0, 200) : "", m.tags.length ? ` · #${m.tags.join(" #")}` : "", ` · ${I(m.updated_at)}`),
            a(
              "div",
              { class: "ks-row" },
              w(b.edit, () => We(t, m, p)),
              w(b.delete, async () => {
                (await E(t, "notes.delete", { id: m.id }, { confirm: { title: "Удалить заметку", message: m.title || m.body.slice(0, 80) } })).ok && p();
              }, "danger")
            )
          )
        )) : q(o ? "Ничего не найдено." : "Заметок пока нет. Скажите «запомни, что код домофона 4711».")
      ),
      M(
        "Недавно запомнено",
        c.length ? a("ul", { class: "ks-list" }, c.map((m) => P(`${m.name}${m.quantity !== null ? ` — ${Me(m.quantity, m.unit)}` : ""}`, `${m.location_text || "место не указано"} · ${I(m.updated_at)}`))) : q()
      )
    ))
  });
  return r.input.addEventListener("input", () => {
    o = r.input.value.trim(), d.refresh();
  }), S(e, a("div", { class: "ks-page" }, G(b.memory, u), Ie(t, () => d.refresh()), a("div", { class: "ks-card ks-filters" }, r.el), s)), U(t, i, ["notes", "items", "locations"], () => d.refresh()), i.add(() => d.dispose()), H(i);
}
async function kt(e, n, t, i) {
  const s = await E(e, "review.approve", t ? { id: n, proposal: t } : { id: n });
  if (!s.ok)
    return !1;
  const o = s.data.results.filter((r) => !r.ok).map((r) => r.message);
  return s.data.still_pending ? (D(`Не выполнено, осталось в очереди: ${o.join(" ")}`, "bad", 9e3), !1) : (D(o.length ? `Выполнено частично. ${o.join(" ")}` : i, o.length ? "warn" : "good", o.length ? 9e3 : 4500), !0);
}
function an(e, n, t) {
  pe("Проверить и поправить", (i) => {
    const s = n.proposal.map((r) => {
      const d = (ye[String(r.type)]?.fields ?? []).filter((l) => l.kind !== "json").map((l) => {
        const c = r[l.name], p = l.kind === "iso" && typeof c == "string" ? te(c) : l.kind === "bool" ? c === !0 : lt(l, c);
        return {
          name: l.name,
          label: l.label,
          type: l.kind === "bool" ? "checkbox" : l.kind === "enum" ? "select" : l.kind === "iso" ? "datetime-local" : (l.kind === "num", "text"),
          value: p,
          options: l.options?.map((m) => ({ value: m, label: b.channels[m] ?? b.lists[m] ?? { set: "заменить на это число", add: "прибавить к имеющемуся" }[m] ?? m })),
          wide: !0
        };
      });
      return { intent: r, fields: d, handle: me(d, { submitLabel: b.save, onSubmit: () => {
      } }) };
    }), o = async () => {
      const r = s.map(({ intent: u, handle: d }) => Pt(u, d.values(), (l) => ne(l)));
      await kt(e, n.id, r, "Выполнено с вашими правками") && (i(!0), t());
    };
    return a(
      "div",
      null,
      a("p", { class: "ks-muted" }, `Вы сказали: «${n.command_text ?? ""}». ${n.reason}`),
      s.map(({ intent: r, handle: u }) => a("fieldset", { class: "dv-intent" }, a("legend", null, Mt(String(r.type))), a("div", { class: "ks-form-grid" }, Object.values(u.fields).map((d) => d.el)))),
      a("div", { class: "ks-form-actions" }, T("Применить с правками", { variant: "primary", onClick: () => void o() }), T(b.cancel, { onClick: () => i(!1) }))
    );
  });
}
function sn(e, n, t) {
  const i = new L(), s = a("div"), o = async (c, p, m) => {
    await kt(t, c, p, "Выполнено") && m();
  };
  let r = "pending";
  const u = a("div", { class: "ks-row dv-chips" }), d = () => Pe(u, () => {
    S(u, ["pending", "approved", "rejected"].map(
      (c) => a("button", { type: "button", dataset: { key: c }, class: `ks-chip${r === c ? " is-active" : ""}`, "aria-pressed": String(r === c), onClick: () => {
        r = c, d(), l.refresh();
      } }, c === "pending" ? "Ждут решения" : c === "approved" ? "Принятые" : "Отклонённые")
    ));
  }), l = R({
    host: s,
    load: (c) => $(t, "api/review", { status: r }, c),
    render: ({ items: c }, p) => c.length ? a("div", { class: "ks-grid" }, c.map(
      (m) => M(
        a("span", null, `«${m.command_text ?? "—"}»`),
        a(
          "div",
          null,
          a("p", { class: "ks-muted" }, `${I(m.ts)} · уверенность ${m.confidence === null ? "—" : Math.round(m.confidence * 100) + "%"} · ${m.reason}`),
          a("ul", { class: "ks-list" }, m.proposal.map((v) => a("li", null, dt(v, (h) => I(h))))),
          r === "pending" ? a(
            "div",
            { class: "ks-row" },
            w("Подтвердить", async () => {
              await o(m.id, void 0, p);
            }, "primary"),
            w("Поправить…", () => an(t, m, p)),
            w(b.reject, async () => {
              (await E(t, "review.reject", { id: m.id })).ok && p();
            }, "danger")
          ) : ve(m.status)
        )
      )
    )) : a("div", { class: "ks-empty" }, a("strong", null, r === "pending" ? "Всё проверено" : "Пусто"), a("p", null, r === "pending" ? "Неуверенные команды попадают сюда — я ничего не записываю без вашего подтверждения." : ""))
  });
  return d(), S(e, a("div", { class: "ks-page" }, G(b.review), a("p", { class: "ks-muted" }, "Здесь команды, в которых я не уверен, и всё, что предложила языковая модель. Пока вы не подтвердите, ничего не изменилось."), u, s)), U(t, i, ["review", "commands"], () => l.refresh()), i.add(() => l.dispose()), H(i);
}
const Ke = { location: "domovoy.locations", note: "domovoy.memory", task: "domovoy.tasks", event: "domovoy.calendar" };
function on(e, n, t) {
  const i = new L(), s = /* @__PURE__ */ new Set(), o = a("input", { class: "ks-input dv-command", type: "search", placeholder: b.search_placeholder, "aria-label": b.search, autocomplete: "off", value: String(n.q ?? "") }), r = a("div", { class: "ks-row dv-chips" }), u = a("div", { class: "dv-results", "aria-live": "polite" }), d = a("p", { class: "ks-muted dv-search-meta" });
  let l = 0, c = null;
  const p = () => Pe(r, () => {
    S(
      r,
      Object.entries(b.kinds).map(
        ([g, y]) => a("button", {
          type: "button",
          dataset: { key: g },
          class: `ks-chip${s.has(g) ? " is-active" : ""}`,
          "aria-pressed": String(s.has(g)),
          onClick: () => {
            s.has(g) ? s.delete(g) : s.add(g), p(), v();
          }
        }, y)
      )
    );
  }), m = (g) => {
    g.kind === "item" ? mt(t, g.id, () => void v()) : Ke[g.kind] && t.navigate(Ke[g.kind], { id: String(g.id) });
  }, v = async () => {
    const g = o.value.trim();
    c?.abort();
    const y = l += 1;
    if (!g) {
      S(u, a("p", { class: "ks-muted" }, "Ищет по вещам, местам, заметкам, задачам и событиям — даже с опечатками.")), d.textContent = "";
      return;
    }
    c = new AbortController(), S(u, et());
    const f = await $(t, "api/search", { q: g, kinds: [...s].join(",") || void 0, limit: 30 }, c.signal);
    if (y !== l)
      return;
    if (!f.ok) {
      f.error.code !== "aborted" && S(u, a("p", { class: "ks-error" }, f.error.message));
      return;
    }
    const { hits: A, embedder: _, mode: k } = f.data;
    d.textContent = `${k === "hybrid" ? "Смысловой поиск" : "Поиск по словам и опечаткам"} · ${_}`, S(
      u,
      A.length ? a("ul", { class: "ks-list ks-list-click" }, A.map((x) => {
        const z = P(
          a("span", null, j(b.kinds[x.kind] ?? x.kind, "info"), " ", x.title),
          x.snippet
        );
        return z.tabIndex = 0, z.setAttribute("role", "button"), z.addEventListener("click", () => m(x)), z.addEventListener("keydown", (C) => {
          (C.key === "Enter" || C.key === " ") && (C.preventDefault(), m(x));
        }), z;
      })) : q(`Ничего не нашлось по «${g}». Возможно, я этого ещё не запоминал.`)
    );
  }, h = Xe(() => void v(), 250);
  return o.addEventListener("input", () => h()), i.add(() => h.cancel()), i.add(() => c?.abort()), p(), S(e, a("div", { class: "ks-page" }, a("div", { class: "ks-card" }, o, r, d), u)), v(), U(t, i, ["items", "locations", "notes", "tasks", "calendar"], () => void v(), 500), H(i);
}
const rn = (e) => e.split(/[\n,]/).map((n) => n.trim()).filter(Boolean);
function ln(e) {
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
function be(e, n, t, i) {
  return me(n, {
    onSubmit: async (s, o) => {
      const r = await e.invokeAction("domovoy.actions", "settings.update", t(s));
      if (!r.ok) {
        o.showErrors(r.error);
        return;
      }
      D("Сохранено", "good"), i();
    }
  }).el;
}
function dn(e, n) {
  const t = URL.createObjectURL(new Blob([JSON.stringify(n, null, 2)], { type: "application/json" })), i = a("a", { href: t, download: e });
  document.body.appendChild(i), i.click(), i.remove(), window.setTimeout(() => URL.revokeObjectURL(t), 1e4);
}
function cn(e, n, t) {
  const i = new L(), s = a("div"), o = R({
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
      ie(d.timezone);
      const p = de("Общие", null, be(t, [
        { name: "timezone", label: "Часовой пояс", type: "select", options: ln(r.timezone), value: r.timezone, hint: `Сейчас на сервере: ${d.timezone}`, wide: !0 },
        { name: "default_reminder_hour", label: "Во сколько напоминать, если сказали только «завтра» (час)", type: "number", min: 0, max: 23, required: !0, value: r.default_reminder_hour, wide: !0 },
        { name: "default_event_minutes", label: "Длительность события по умолчанию, минут", type: "number", min: 5, max: 1440, required: !0, value: r.default_event_minutes, wide: !0 }
      ], (f) => ({ timezone: String(f.timezone), default_reminder_hour: Number(f.default_reminder_hour), default_event_minutes: Number(f.default_event_minutes) }), c)), m = de("Насколько доверять пониманию команд", "Правила понимают привычные фразы сами. Если уверенность ниже порога — команда не выполняется, а ждёт вашего решения в «Проверке». Записи, предложенные языковой моделью, всегда идут на проверку, пока вы явно не разрешите иначе.", be(t, [
        { name: "auto_apply_confidence", label: "Выполнять сразу при уверенности от (0–1)", type: "number", min: 0, max: 1, step: 0.05, required: !0, value: r.auto_apply_confidence, wide: !0 },
        { name: "review_confidence", label: "Отправлять на проверку от (ниже — переспрашивать)", type: "number", min: 0, max: 1, step: 0.05, required: !0, value: r.review_confidence, wide: !0 },
        { name: "ai_auto_apply", label: "Выполнять записи языковой модели без проверки (при уверенности от 0,9)", type: "checkbox", value: r.ai.auto_apply, hint: "Не рекомендуется: модель может ошибаться. Всё можно отменить в «Журнале», но лучше сначала посмотреть.", wide: !0 }
      ], (f) => ({ auto_apply_confidence: Number(f.auto_apply_confidence), review_confidence: Number(f.review_confidence), ai: { auto_apply: f.ai_auto_apply === !0 } }), c)), v = de(
        "Голос",
        "Обращение по слову-триггеру работает и с колонками через Home Assistant, и с микрофоном киоска. Разговор без слова-триггера не сохраняется.",
        a("p", null, "Микрофон киоска: ", u.enabled ? j("включён", "good") : j("выключен", "neutral"), " ", u.stt_configured ? j("распознавание настроено", "good") : j("распознавание не настроено", "warn")),
        be(t, [
          { name: "enabled", label: "Принимать голосовые команды с микрофона киоска", type: "checkbox", value: r.voice.enabled, wide: !0 },
          { name: "trigger_words", label: "Слова-триггеры", value: (r.voice.trigger_words ?? []).join(", "), hint: "Через запятую, все падежи, которые вы произносите: «домовой, домового, домовому».", wide: !0 },
          { name: "window_s", label: "После обращения слушать без повторного слова, секунд", type: "number", min: 5, max: 120, required: !0, value: r.voice.window_s, wide: !0 },
          { name: "reply", label: "Как отвечать", type: "select", options: [{ value: "speak", label: "Голосом через колонки" }, { value: "text", label: "Только текстом на экране" }], value: r.voice.reply, wide: !0 },
          { name: "room", label: "Комната этого микрофона", value: r.voice.room, hint: "Чтобы ответ прозвучал в ближайшей колонке.", wide: !0 },
          { name: "speak_enabled", label: "Озвучивать напоминания и ответы", type: "checkbox", value: r.speak.enabled, wide: !0 },
          { name: "quiet_from", label: "Тихие часы с", type: "time", value: r.speak.quiet_from },
          { name: "quiet_to", label: "до", type: "time", value: r.speak.quiet_to },
          { name: "fallback", label: "Если колонка не ответила", type: "select", options: [{ value: "telegram", label: "Написать в Telegram" }, { value: "ui", label: "Показать на экране" }, { value: "none", label: "Ничего" }], value: r.speak.fallback, wide: !0 }
        ], (f) => ({ voice: { enabled: f.enabled === !0, trigger_words: rn(String(f.trigger_words)), window_s: Number(f.window_s), reply: f.reply, room: String(f.room).trim() }, speak: { enabled: f.speak_enabled === !0, quiet_from: String(f.quiet_from), quiet_to: String(f.quiet_to), fallback: f.fallback } }), c)
      ), h = de("Сообщения", null, be(t, [
        { name: "sandbox", label: "Тестовый режим: ничего не отправлять наружу (Telegram, HA-уведомления)", type: "checkbox", value: r.messaging.sandbox, hint: "Сообщения останутся в «Журнале → Отправка» — удобно проверять сценарии.", wide: !0 }
      ], (f) => ({ messaging: { sandbox: f.sandbox === !0 } }), c)), g = a("input", { type: "file", accept: "application/json,.json", hidden: !0 });
      g.addEventListener("change", async () => {
        const f = g.files?.[0];
        if (g.value = "", !f)
          return;
        let A;
        try {
          A = JSON.parse(await f.text());
        } catch {
          D("Это не JSON-файл", "bad");
          return;
        }
        await nt({ title: "Заменить все данные?", message: "Все текущие данные (вещи, места, заметки, задачи, напоминания, журнал) будут заменены содержимым файла. Перед этим я сделаю резервную копию.", confirmLabel: "Заменить", destructive: !0 }) && (await E(t, "data.import", { data: A }, { success: "Данные импортированы" })).ok && c();
      });
      const y = de(
        "Данные и резервные копии",
        `Версия ${d.version}. В базе: ${d.counts.items} вещей, ${d.counts.locations} мест, ${d.counts.notes} заметок. Пароли и токены в экспорт не попадают.`,
        a(
          "div",
          { class: "ks-row" },
          T("Сделать резервную копию", { variant: "primary", onClick: async () => {
            (await E(t, "backup.create", {}, { success: "Копия создана" })).ok && c();
          } }),
          T("Скачать экспорт (JSON)", { onClick: async () => {
            const f = await $(t, "api/export");
            f.ok ? dn(`domovoy-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, f.data) : D(f.error.message, "bad");
          } }),
          T("Импортировать…", { variant: "danger", onClick: () => g.click() }),
          g
        ),
        l.length ? a("ul", { class: "ks-list" }, l.slice(0, 8).map((f) => a("li", null, a("div", { class: "ks-grow" }, f.name, a("div", { class: "ks-sub" }, `${Math.max(1, Math.round(f.bytes / 1024))} КБ`))))) : q("Резервных копий пока нет — они создаются раз в сутки автоматически."),
        a("small", { class: "ks-muted" }, "Копии лежат в /config/kiosk-scene/domovoy/backups — они попадают и в общую резервную копию Home Assistant.")
      );
      return a("div", { class: "dv-stack" }, p, m, v, h, y);
    }
  });
  return S(e, a("div", { class: "ks-page" }, G(b.settings), s)), U(t, i, ["settings"], () => o.refresh(), 800, e), i.add(() => o.dispose()), H(i);
}
const un = Object.entries(b.channels).map(([e, n]) => ({ value: e, label: n }));
function Ze(e, n, t, i) {
  const s = Z(), o = t?.kind ?? "time", r = t?.trigger ?? {}, u = o !== "time" && r.type === "state", d = r.window ? { window: r.window } : {};
  K(
    t ? "Изменить напоминание" : "Новое напоминание",
    [
      { name: "text", label: "О чём напомнить", required: !0, value: t?.text ?? "", wide: !0 },
      { name: "mode", label: "Когда", type: "select", options: [...u ? [{ value: "keep", label: "Условие устройства (не меняется)" }] : [], { value: "time", label: "В указанное время" }, { value: "presence", label: "Когда приду домой" }, { value: "room", label: "Когда зайду в комнату" }], value: u ? "keep" : o === "time" ? "time" : String(r.type ?? "presence") },
      { name: "due_at", label: "Дата и время", type: "datetime-local", value: t?.due_at ? te(t.due_at, s) : "" },
      { name: "place", label: "Комната", value: r.place && r.type === "room" ? String(r.place) : "", hint: "Для «когда зайду в комнату»: как в настройках комнат, например «кухня»." },
      { name: "channel", label: "Как сообщить", type: "select", options: un, value: t?.channel ?? "speak" },
      { name: "recipient", label: "Кому", type: "select", options: [{ value: "self", label: "Мне" }, ...n.filter((l) => !l.is_self).map((l) => ({ value: l.name, label: l.name }))], value: t?.recipient ?? "self" }
    ],
    async (l) => {
      const c = String(l.mode), p = { text: String(l.text).trim(), channel: l.channel, recipient: l.recipient };
      if (c !== "keep") if (c === "time") {
        if (!l.due_at)
          return { ok: !1, error: { code: "validation", message: "Укажите время", fields: { due_at: "Укажите время" } } };
        p.due_at = ne(String(l.due_at), s), p.trigger = null;
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
      { name: "title", label: b.title, required: !0, value: n?.title ?? "", wide: !0 },
      { name: "list", label: "Список", type: "select", options: Object.entries(b.lists).map(([s, o]) => ({ value: s, label: o })), value: n?.list ?? t },
      { name: "due_date", label: "Срок", type: "date", value: n?.due_date ?? "" },
      { name: "notes", label: b.notes, type: "textarea", rows: 2, value: n?.notes ?? "", wide: !0 }
    ],
    async (s) => {
      const o = { title: String(s.title).trim(), list: s.list, due_date: s.due_date || null, notes: String(s.notes ?? "") }, r = n ? await e.invokeAction("domovoy.actions", "tasks.update", { id: n.id, ...o }) : await e.invokeAction("domovoy.actions", "tasks.create", o);
      return r.ok && i(), r;
    }
  );
}
function mn(e, n, t) {
  const i = new L(), s = a("div");
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
      const g = (f) => P(
        a("span", null, f.text, " ", ve(f.state)),
        `${f.kind === "time" && f.due_at ? `${I(f.due_at)}${f.state === "pending" ? ` (${De(f.due_at)})` : ""}` : rt(f.trigger)}${f.recurrence ? ` · ${he(f.recurrence)}` : ""} · ${b.channels[f.channel] ?? f.channel}${f.recipient && f.recipient !== "self" ? ` → ${f.recipient}` : ""}`,
        a(
          "div",
          { class: "ks-row" },
          f.state === "fired" || f.state === "pending" ? w("Готово", async () => {
            (await E(t, "reminders.done", { id: f.id })).ok && h();
          }, "primary") : null,
          f.state === "pending" || f.state === "fired" ? w("+10 мин", async () => {
            (await E(t, "reminders.snooze", { id: f.id, minutes: 10 })).ok && h();
          }) : null,
          f.state === "pending" ? w(b.edit, () => Ze(t, r, f, h)) : null,
          w(b.delete, async () => {
            (await E(t, "reminders.delete", { id: f.id }, { confirm: { title: "Удалить напоминание", message: `«${f.text}»` } })).ok && h();
          }, "danger")
        ),
        f.state === "fired" ? "dv-fired" : ""
      ), y = (f) => {
        const A = m.filter((_) => _.list === f);
        return A.length ? a("ul", { class: "ks-list" }, A.map(
          (_) => P(
            a("span", { class: _.done ? "dv-done" : "" }, _.title),
            [_.due_date ? `срок ${_.due_date}` : "", _.recurrence ? he(_.recurrence) : "", _.notes].filter(Boolean).join(" · "),
            a(
              "div",
              { class: "ks-row" },
              w(_.done ? "Вернуть" : f === "shopping" ? "Куплено" : "Готово", async () => {
                (await E(t, "tasks.complete", { id: _.id, done: !_.done })).ok && h();
              }, _.done ? "secondary" : "primary"),
              w(b.edit, () => Ge(t, _, f, h)),
              w(b.delete, async () => {
                (await E(t, "tasks.delete", { id: _.id }, { confirm: { title: "Удалить задачу", message: `«${_.title}»` } })).ok && h();
              }, "danger")
            )
          )
        )) : q();
      };
      return a(
        "div",
        { class: "ks-grid" },
        M("Напоминания", p.length ? a("ul", { class: "ks-list" }, p.map(g)) : q("Напоминаний нет.")),
        M(b.lists.tasks, y("tasks")),
        M(b.lists.shopping, y("shopping")),
        M(b.lists.chores, y("chores"))
      );
    }
  });
  return l.input.addEventListener("change", () => {
    o = l.input.checked, c.refresh();
  }), S(e, a("div", { class: "ks-page" }, G(b.tasks, u, d), a("div", { class: "ks-card ks-filters" }, l.el), s)), U(t, i, ["reminders", "tasks", "contacts"], () => c.refresh()), i.add(() => c.dispose()), H(i);
}
function Je(e) {
  let n = 0;
  for (let t = 0; t < e.length; t += 1)
    n += e[t] * e[t];
  return Math.sqrt(n / Math.max(1, e.length));
}
class pn {
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
function fn(e, n, t) {
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
function kn(e, n) {
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
function bn() {
  return typeof navigator > "u" || !navigator.mediaDevices?.getUserMedia ? window.isSecureContext === !1 ? "Браузер разрешает микрофон только на https:// или localhost. Откройте киоск по HTTPS или добавьте адрес в исключения браузера." : "В этом браузере нет доступа к микрофону." : null;
}
function gn(e) {
  let n = null, t = null, i = null, s = null, o = null, r = !1, u = !1, d = !1, l = 0, c = !1, p;
  const m = (g) => e.onState(g), v = (g, y = 0) => {
    window.clearTimeout(p), y > 0 ? (m(g), p = window.setTimeout(() => u && !r && m({ kind: "listening" }), y)) : m(g);
  }, h = async (g, y) => {
    if (!c) {
      c = !0, m({ kind: "sending" });
      try {
        const f = kn(fn(g, y, 16e3), Math.min(y, 16e3)), A = await e.http.request("api/voice/command", {
          method: "POST",
          rawBody: new Blob([f.buffer], { type: "audio/wav" }),
          headers: { "Content-Type": "audio/wav", "X-Room": e.room },
          timeoutMs: 3e4
        });
        if (!u)
          return;
        A.ok ? A.data.handled && A.data.reply ? v({ kind: "heard", reply: A.data.reply, status: A.data.status ?? "" }, 6e3) : v({ kind: "listening" }) : v({ kind: "unavailable", reason: A.error.message }, 6e3);
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
      const g = bn();
      if (g && !e.mediaDevices) {
        m({ kind: "unavailable", reason: g });
        return;
      }
      const y = l;
      d = !0, m({ kind: "starting" });
      let f;
      try {
        f = await (e.mediaDevices ?? navigator.mediaDevices).getUserMedia({ audio: { channelCount: 1, echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 } });
      } catch (_) {
        if (d = !1, y !== l)
          return;
        const k = _?.name;
        m({ kind: "unavailable", reason: k === "NotAllowedError" ? "Доступ к микрофону запрещён в браузере." : k === "NotFoundError" ? "Микрофон не найден." : "Не удалось открыть микрофон." });
        return;
      }
      if (y !== l) {
        f.getTracks().forEach((_) => _.stop()), d = !1;
        return;
      }
      if (n = f, t = e.audioContextFactory ? e.audioContextFactory() : new AudioContext(), t.state === "suspended") {
        const _ = () => void t?.resume().catch(() => {
        });
        _(), document.addEventListener("pointerdown", _, { once: !0 });
      }
      const A = t.sampleRate;
      o = new pn({ sampleRate: A }), s = t.createMediaStreamSource(n), i = t.createScriptProcessor(4096, 1, 1), i.onaudioprocess = (_) => {
        if (r || !u || !o)
          return;
        const k = new Float32Array(_.inputBuffer.getChannelData(0));
        for (const x of o.push(k))
          x.type === "start" ? m({ kind: "hearing" }) : x.type === "discard" ? m({ kind: "listening" }) : h(x.samples, A);
      }, s.connect(i), i.connect(t.destination), u = !0, d = !1, n.getAudioTracks().forEach((_) => {
        _.enabled = !r;
      }), m(r ? { kind: "muted" } : { kind: "listening" });
    },
    stop() {
      l += 1, d = !1, u = !1, window.clearTimeout(p), i?.disconnect(), s?.disconnect(), i && (i.onaudioprocess = null), n?.getTracks().forEach((g) => g.stop()), t?.close().catch(() => {
      }), n = t = i = s = null, o = null, m({ kind: "off" });
    },
    setMuted(g) {
      r = g, o?.reset(), n?.getAudioTracks().forEach((y) => {
        y.enabled = !g;
      }), m(g ? { kind: "muted" } : u ? { kind: "listening" } : d ? { kind: "starting" } : { kind: "off" });
    }
  };
}
const hn = {
  starting: "Запуск микрофона…",
  listening: "Слушаю: скажите «домовой …»",
  hearing: "Слышу…",
  sending: "Разбираю…",
  muted: "Микрофон выключен"
};
function vn(e) {
  const n = a("span", { class: "dv-mic-dot", "aria-hidden": "true" }), t = a("span", { class: "dv-mic-label" }), i = a("button", { class: "dv-mic", type: "button", "aria-live": "polite", title: "Включить или выключить микрофон", dataset: { noSwipe: "true" }, onClick: e }, n, t);
  return {
    el: i,
    render(s) {
      i.dataset.state = s.kind, i.hidden = s.kind === "off", t.textContent = s.kind === "unavailable" ? s.reason : s.kind === "heard" ? s.reply : hn[s.kind] ?? "";
    }
  };
}
function yn(e) {
  return [
    {
      // The scene's avatar reads its state from the Domovoy state provider; a push from the server turns
      // "poll every few seconds" into "react immediately", so the mouth moves in step with the speakers.
      id: "domovoy.avatar-sync",
      title: "Аватар следует за ответами Домового",
      modes: ["kiosk"],
      start(n) {
        return n.subscribe(ge, "avatar", () => n.refresh());
      }
    },
    {
      id: "domovoy.notifications",
      title: "Уведомления на экране киоска",
      modes: ["kiosk"],
      start(n) {
        return n.subscribe(ge, "notification", (t) => {
          const i = t.payload?.text;
          typeof i == "string" && i.trim() && D(i, "info", 12e3);
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
        const i = typeof t.room == "string" ? String(t.room) : "", s = vn(() => o.setMuted(!o.muted));
        s.el.hidden = !0, document.body.appendChild(s.el);
        const o = gn({ http: e, room: i, onState: s.render });
        return o.start(), () => {
          o.stop(), s.el.remove();
        };
      }
    }
  ];
}
const wn = `
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
`, _e = (e, n, t) => {
  const i = Number(e);
  return Number.isFinite(i) && i >= 1 ? Math.min(t, Math.floor(i)) : n;
};
function Se(e, n, t) {
  return {
    id: e,
    title: n,
    mount(i, s, o) {
      const r = new L(), u = a("div", { class: `ks-scope dv-widget ${e.replace(".", "-")}`, dataset: { noSwipe: "true", theme: "kiosk" } });
      S(i, u);
      let d = s;
      const l = R({
        host: u,
        load: (p) => $(o, "api/today", void 0, p),
        render: (p, m) => (ie(p.timezone), t(p, m, d, o))
      });
      U(o, r, ["calendar", "reminders", "tasks"], () => l.refresh(), 400);
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
function $e(e) {
  const n = new Date(e.now).getTime();
  return e.events.filter((t) => t.all_day || new Date(t.end).getTime() > n);
}
const xn = [
  Se("domovoy.next-event", "Ближайшее событие", (e) => {
    const [n] = $e(e).filter((s) => !s.all_day), [t] = $e(e).filter((s) => s.all_day && Y(s.start, e.timezone) === Y(e.now, e.timezone)), i = n ?? t;
    return i ? a("div", { class: "dv-next" }, a("div", { class: "dv-next-when" }, i.all_day ? "сегодня" : `${ae(i.start, e.timezone)} · ${De(i.start, new Date(e.now).getTime())}`), a("div", { class: "dv-next-title" }, i.title), i.location ? a("div", { class: "ks-muted" }, i.location) : null) : a("div", { class: "dv-next" }, a("div", { class: "ks-muted" }, "Ближайших событий нет"));
  }),
  Se("domovoy.today", "Сегодня", (e, n, t) => {
    const i = $e(e).slice(0, _e(t.maxEvents, 4, 10)), s = e.reminders.slice(0, _e(t.maxReminders, 4, 10));
    return a(
      "div",
      { class: "dv-today-widget" },
      i.length ? a("ul", { class: "ks-list" }, i.map((o) => a("li", null, a("span", { class: "dv-time" }, o.all_day ? "весь день" : ae(o.start, e.timezone)), " ", o.title))) : q("Событий нет"),
      s.length ? a("ul", { class: "ks-list dv-reminders" }, s.map((o) => a("li", { class: o.state === "fired" ? "dv-fired" : "" }, "🔔 ", o.text))) : null,
      e.review_count ? a("div", { class: "ks-muted" }, `Ждёт проверки: ${e.review_count}`) : null
    );
  }),
  Se("domovoy.shopping", "Покупки", (e, n, t, i) => {
    const s = e.shopping.slice(0, _e(t.max, 8, 30));
    return s.length ? a("ul", { class: "ks-list dv-shopping" }, s.map((o) => a("li", null, a("span", { class: "ks-grow" }, o.title), w("✓", async () => {
      (await E(i, "tasks.complete", { id: o.id })).ok && n();
    }, "ghost", "Куплено")))) : q("Список покупок пуст");
  }),
  {
    id: "domovoy.command",
    title: "Командная строка",
    mount(e, n, t) {
      const i = new L(), s = a("div", { class: "ks-scope dv-widget", dataset: { noSwipe: "true", theme: "kiosk" } }, Ie(t, () => t.refresh()));
      return S(e, s), H(i);
    }
  }
];
let Te = !1, Ye = 0;
function _n(e) {
  if (Te || Date.now() < Ye)
    return;
  Te = !0, pe("Нужен токен доступа", (t) => {
    const i = me([{ name: "token", label: "API-токен", type: "password", required: !0, wide: !0 }], {
      submitLabel: b.save,
      extraActions: [T(b.cancel, { onClick: () => t(!1) })],
      onSubmit: (s) => {
        e(String(s.token).trim()), t(!0), window.location.reload();
      }
    });
    return a("div", null, a("p", null, "Сервер просит подтвердить, что это вы. Введите токен из раздела «Интеграции → Доступ» (или откройте страницу из панели Home Assistant — там токен не нужен)."), i.el);
  }).closed.then((t) => {
    Te = !1, t !== !0 && (Ye = Date.now() + 5 * 6e4);
  });
}
const Sn = [
  { id: "domovoy.today", title: b.today, icon: "🏠", modes: ["admin", "kiosk"], order: 10, mount: tn },
  { id: "domovoy.search", title: b.search, icon: "🔎", modes: ["admin"], order: 20, mount: on },
  { id: "domovoy.inventory", title: b.inventory, icon: "📦", modes: ["admin"], order: 30, group: "Дом", mount: Jt },
  { id: "domovoy.locations", title: b.locations, icon: "🗄️", modes: ["admin"], order: 40, group: "Дом", mount: Xt },
  { id: "domovoy.calendar", title: b.calendar, icon: "📅", modes: ["admin"], order: 50, group: "Планы", mount: Ut },
  { id: "domovoy.tasks", title: b.tasks, icon: "✅", modes: ["admin"], order: 60, group: "Планы", mount: mn },
  { id: "domovoy.memory", title: b.memory, icon: "🧠", modes: ["admin"], order: 70, group: "Дом", mount: nn },
  { id: "domovoy.review", title: b.review, icon: "🛡️", modes: ["admin"], order: 80, group: "Домовой", mount: sn },
  { id: "domovoy.activity", title: b.activity, icon: "📜", modes: ["admin"], order: 90, group: "Домовой", mount: Bt },
  { id: "domovoy.integrations", title: b.integrations, icon: "🔌", modes: ["admin"], order: 100, group: "Домовой", mount: Gt },
  { id: "domovoy.settings", title: b.settings, icon: "⚙️", modes: ["admin"], order: 110, group: "Домовой", mount: cn }
], $n = {
  manifest: { id: "domovoy", title: "Домовой", version: "0.1.0", apiVersion: Et },
  activate(e) {
    const n = typeof e.config.apiBase == "string" && e.config.apiBase ? e.config.apiBase : "../domovoy-api/";
    if (new URL(n, window.location.href).origin !== window.location.origin)
      throw new Error("Domovoy: apiBase must be on the same origin as the page");
    Tt({ retry: b.retry, cancel: b.cancel, confirm: b.confirm, save: b.save, close: b.close, required: "Обязательное поле", loading: b.loading, nothingHere: b.empty, olderData: "Показаны прежние данные", renderFailed: "Не удалось показать этот раздел." }), ze("domovoy-ui-kit", Ct), ze("domovoy-ui", wn);
    const t = /\/admin\.html$/.test(window.location.pathname), i = jt({ baseUrl: n, onUnauthorized: () => {
      t && _n(Ot);
    } });
    i.http.request("api/state").then((s) => {
      s.ok && s.data.timezone && ie(s.data.timezone);
    }), e.registerDataProvider(i.data), e.registerActionProvider(i.actions), e.registerRealtimeSource(St({ id: ge, http: i.http, waitSeconds: 25, pauseWhenHidden: !0 }));
    for (const s of Sn)
      e.registerPage(s);
    for (const s of xn)
      e.registerWidget(s);
    for (const s of yn(i.http))
      e.registerService(s);
  }
};
export {
  Sn as PAGES,
  xn as WIDGETS,
  $n as default
};
