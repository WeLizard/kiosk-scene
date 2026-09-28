/** Domovoy-specific styles, on top of the shared kit (`KIT_CSS`). Everything is prefixed `dv-`. */
export const DOMOVOY_CSS = `
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
`;
