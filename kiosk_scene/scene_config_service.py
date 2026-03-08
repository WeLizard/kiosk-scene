#!/usr/bin/env python3
from __future__ import annotations

import json
import logging
import os
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit


HOST = os.environ.get("SCENE_EDITOR_HOST", "127.0.0.1")
PORT = int(os.environ.get("SCENE_EDITOR_PORT", "48098"))
PATH_PREFIX = "/scene-editor"
SCENE_ROOT = Path(os.environ.get("SCENE_ROOT", "/config/kiosk-scene"))
PACKS_DIR = Path(os.environ.get("SCENE_PACKS_DIR", str(SCENE_ROOT / "scene-packs")))
ACTIVE_PACK_FILE = Path(
    os.environ.get("SCENE_ACTIVE_PACK_FILE", str(SCENE_ROOT / "active-pack.json"))
)
DEFAULT_PACK_ID = os.environ.get("SCENE_DEFAULT_PACK_ID", "neiri").strip() or "neiri"
EXPLICIT_SCENE_CONFIG_PATH = os.environ.get("SCENE_EDITOR_CONFIG_PATH", "").strip()
LEGACY_SCENE_CONFIG_PATHS = (
    Path("/config/www/neiri-scene/scene.default.json"),
    Path("/config/www/live2d/neiri-slides.json"),
    Path("/config/haoskiosk/display-config.json"),
)

DEFAULT_SCENE_CONFIG: dict[str, Any] = {
    "version": 1,
    "rotation": {
        "order": ["page-1"],
        "defaultDwellSeconds": 18,
    },
    "display": {
        "safeArea": {
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0,
        },
        "layoutPaddingPx": 16,
        "layoutGapPx": 16,
        "globalScale": 1,
    },
    "pages": [
        {
            "id": "page-1",
            "kind": "cards",
            "title": "Overview",
            "subtitle": "Add dashboard cards here",
            "cards": [],
        }
    ],
}

EDITOR_HTML_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kiosk Scene Editor</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #08131d;
      --paper: #102131;
      --paper-2: #15293c;
      --line: rgba(255,255,255,0.11);
      --text: #e9f2f7;
      --muted: #a8bac7;
      --accent: #68c3a3;
      --bad: #ef8e8e;
      --ok: #88d69e;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font: 14px/1.5 "Aptos", "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top, rgba(104,195,163,0.14), transparent 34%),
        linear-gradient(180deg, #07111a 0%, #0d1b29 100%);
    }
    .wrap {
      max-width: 1160px;
      margin: 0 auto;
      padding: 28px 20px 40px;
      display: grid;
      gap: 18px;
    }
    .panel {
      background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03));
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 18px;
      box-shadow: 0 18px 50px rgba(0,0,0,0.18);
    }
    h1, h2 { margin: 0; line-height: 1.05; }
    h1 { font-size: 30px; letter-spacing: -0.04em; }
    h2 { font-size: 16px; margin-bottom: 10px; }
    p { margin: 0; color: var(--muted); }
    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }
    button, textarea {
      font: inherit;
    }
    textarea {
      width: 100%;
      min-height: 180px;
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 12px 14px;
      color: var(--text);
      background: var(--paper);
      resize: vertical;
      font-family: "Cascadia Code", "Consolas", monospace;
      line-height: 1.45;
    }
    button {
      border: 1px solid rgba(104,195,163,0.3);
      background: linear-gradient(180deg, rgba(104,195,163,0.18), rgba(104,195,163,0.08));
      color: var(--text);
      border-radius: 12px;
      padding: 10px 14px;
      cursor: pointer;
    }
    button:hover { border-color: rgba(104,195,163,0.5); }
    code {
      background: rgba(255,255,255,0.06);
      border-radius: 6px;
      padding: 2px 6px;
    }
    .status {
      min-height: 20px;
      font-size: 13px;
      color: var(--muted);
    }
    .status.ok { color: var(--ok); }
    .status.bad { color: var(--bad); }
    .meta {
      display: grid;
      gap: 6px;
      font-size: 13px;
      color: var(--muted);
    }
    .layout {
      display: grid;
      grid-template-columns: minmax(420px, 0.95fr) minmax(400px, 1.05fr);
      gap: 18px;
      align-items: start;
    }
    .column {
      display: grid;
      gap: 18px;
      min-width: 0;
    }
    .overview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    }
    .stat {
      padding: 14px;
      border-radius: 14px;
      border: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
    }
    .stat-label {
      display: block;
      margin-bottom: 6px;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .stat-value {
      font-size: 17px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    .visual-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }
    .field-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 12px;
    }
    .field {
      display: grid;
      gap: 6px;
      min-width: 0;
    }
    .field label {
      font-size: 12px;
      color: var(--muted);
    }
    input, select {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 10px 12px;
      color: var(--text);
      background: var(--paper);
    }
    input:focus, select:focus, textarea:focus {
      outline: 1px solid rgba(104,195,163,0.45);
      border-color: rgba(104,195,163,0.45);
    }
    .pages {
      display: grid;
      gap: 14px;
    }
    .page-card {
      border: 1px solid var(--line);
      border-radius: 16px;
      background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02));
      overflow: hidden;
    }
    .page-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
    }
    .page-title {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .page-order {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background: rgba(104,195,163,0.14);
      border: 1px solid rgba(104,195,163,0.28);
      color: var(--accent);
      font-weight: 700;
    }
    .page-title-text {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .page-title-text strong,
    .page-title-text span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .page-title-text span {
      font-size: 12px;
      color: var(--muted);
    }
    .page-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .page-body {
      display: grid;
      gap: 14px;
      padding: 16px;
    }
    .section-note {
      font-size: 12px;
      color: var(--muted);
      margin: 0 0 12px;
    }
    .details {
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 12px;
      background: rgba(255,255,255,0.02);
    }
    details.advanced {
      display: grid;
      gap: 12px;
    }
    details.advanced summary {
      cursor: pointer;
      font-weight: 600;
      color: var(--text);
      list-style: none;
    }
    details.advanced summary::-webkit-details-marker {
      display: none;
    }
    details.advanced summary::before {
      content: '▸';
      margin-right: 8px;
      color: var(--accent);
    }
    details.advanced[open] summary::before {
      content: '▾';
    }
    .cards-toolbar {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 10px;
      align-items: end;
    }
    .card-stack {
      display: grid;
      gap: 12px;
    }
    .card-editor {
      border: 1px solid var(--line);
      border-radius: 14px;
      background: rgba(255,255,255,0.025);
      overflow: hidden;
    }
    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-bottom: 1px solid var(--line);
      background: rgba(255,255,255,0.03);
    }
    .card-body {
      display: grid;
      gap: 12px;
      padding: 14px;
    }
    .subsection-label {
      font-size: 12px;
      color: var(--muted);
    }
    #editor {
      min-height: 360px;
    }
    @media (max-width: 1180px) {
      .layout {
        grid-template-columns: 1fr;
      }
      #editor {
        min-height: 420px;
      }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="panel">
      <h1>Kiosk Scene Editor</h1>
      <p>Ingress-owned editor for the renderer scene config. This belongs to the dedicated Kiosk Scene add-on, not HAOS-kiosk.</p>
    </section>
    <section class="panel">
      <div class="row">
        <button id="loadBtn" type="button">Load</button>
        <button id="applyVisualBtn" type="button">Apply Visual -> JSON</button>
        <button id="jsonToVisualBtn" type="button">Reload Visual from JSON</button>
        <button id="validateBtn" type="button">Validate JSON</button>
        <button id="formatBtn" type="button">Format</button>
        <button id="newPageBtn" type="button">+ Page</button>
        <button id="starterBtn" type="button">Template</button>
        <button id="saveBtn" type="button">Save</button>
      </div>
      <div id="status" class="status"></div>
    </section>
    <section class="panel">
      <div class="overview-grid">
        <div class="stat">
          <span class="stat-label">Active pack</span>
          <div class="stat-value"><code>__ACTIVE_PACK_ID__</code></div>
        </div>
        <div class="stat">
          <span class="stat-label">Primary path</span>
          <div class="stat-value"><code>__SCENE_EDITOR_CONFIG_PATH__</code></div>
        </div>
        <div class="stat">
          <span class="stat-label">Legacy fallback</span>
          <div class="stat-value"><code>__LEGACY_SCENE_EDITOR_CONFIG_PATHS__</code></div>
        </div>
      </div>
    </section>
    <div class="layout">
      <div class="column">
        <section class="panel">
          <div class="visual-header">
            <div>
              <h2>Page Composer</h2>
              <p>Build the carousel from reusable page templates and card blocks instead of editing raw JSON.</p>
            </div>
            <button id="visualSyncBtn" type="button">Sync Form</button>
          </div>
          <div class="field-grid">
            <div class="field">
              <label for="dwellInput">Default dwell seconds</label>
              <input id="dwellInput" type="number" min="5" step="1">
            </div>
          </div>
          <p class="section-note">Page order follows the visual stack below and is mirrored into <code>rotation.order</code>.</p>
          <div class="details">
            <h2>Display Fit</h2>
            <p class="section-note">Use these values to compensate for HDMI overscan, bezel crop or kiosk scaling without changing the page template itself.</p>
            <div class="field-grid">
              <div class="field">
                <label for="safeTopInput">Safe top (px)</label>
                <input id="safeTopInput" type="number" min="0" step="1">
              </div>
              <div class="field">
                <label for="safeRightInput">Safe right (px)</label>
                <input id="safeRightInput" type="number" min="0" step="1">
              </div>
              <div class="field">
                <label for="safeBottomInput">Safe bottom (px)</label>
                <input id="safeBottomInput" type="number" min="0" step="1">
              </div>
              <div class="field">
                <label for="safeLeftInput">Safe left (px)</label>
                <input id="safeLeftInput" type="number" min="0" step="1">
              </div>
              <div class="field">
                <label for="layoutPaddingInput">Layout padding (px)</label>
                <input id="layoutPaddingInput" type="number" min="0" step="1">
              </div>
              <div class="field">
                <label for="layoutGapInput">Layout gap (px)</label>
                <input id="layoutGapInput" type="number" min="0" step="1">
              </div>
              <div class="field">
                <label for="globalScaleInput">Global scale</label>
                <input id="globalScaleInput" type="number" min="0.75" max="1" step="0.01">
              </div>
            </div>
          </div>
        </section>
        <section class="panel">
          <h2>Pages</h2>
          <div id="pages" class="pages"></div>
        </section>
      </div>
      <div class="column">
        <section class="panel">
          <details class="advanced">
            <summary>Advanced root fields</summary>
            <p class="section-note">Unknown top-level fields are preserved here so the visual composer does not strip them.</p>
            <textarea id="rootExtras" spellcheck="false"></textarea>
          </details>
        </section>
        <section class="panel">
          <details class="advanced">
            <summary>Advanced JSON</summary>
            <p class="section-note">Optional raw access for migration and debugging. The main editing path should stay in the visual composer.</p>
            <textarea id="editor" spellcheck="false"></textarea>
          </details>
        </section>
        <section class="panel meta">
          <div>Saving always writes to the primary path so the hosted scene app and editor share one source of truth.</div>
          <div>The visual composer is the main workflow for carousel pages and cards. Raw JSON stays only as an advanced fallback.</div>
        </section>
      </div>
    </div>
  </div>
  <script>
    const editorEl = document.getElementById('editor');
    const statusEl = document.getElementById('status');
    const loadBtn = document.getElementById('loadBtn');
    const applyVisualBtn = document.getElementById('applyVisualBtn');
    const jsonToVisualBtn = document.getElementById('jsonToVisualBtn');
    const saveBtn = document.getElementById('saveBtn');
    const validateBtn = document.getElementById('validateBtn');
    const formatBtn = document.getElementById('formatBtn');
    const newPageBtn = document.getElementById('newPageBtn');
    const starterBtn = document.getElementById('starterBtn');
    const visualSyncBtn = document.getElementById('visualSyncBtn');
    const dwellInput = document.getElementById('dwellInput');
    const safeTopInput = document.getElementById('safeTopInput');
    const safeRightInput = document.getElementById('safeRightInput');
    const safeBottomInput = document.getElementById('safeBottomInput');
    const safeLeftInput = document.getElementById('safeLeftInput');
    const layoutPaddingInput = document.getElementById('layoutPaddingInput');
    const layoutGapInput = document.getElementById('layoutGapInput');
    const globalScaleInput = document.getElementById('globalScaleInput');
    const pagesEl = document.getElementById('pages');
    const rootExtrasEl = document.getElementById('rootExtras');

    let lastEditedMode = 'visual';

    function setStatus(text, kind) {
      statusEl.textContent = text || '';
      statusEl.className = `status${kind ? ` ${kind}` : ''}`;
    }

    function apiUrl() {
      return new URL('./api/config', window.location.href).toString();
    }

    function starterConfig() {
      return {
        version: 1,
        rotation: {
          order: ['page-1'],
          defaultDwellSeconds: 18
        },
        pages: [
          {
            id: 'page-1',
            kind: 'cards',
            title: 'Overview',
            subtitle: 'Add dashboard cards here',
            cards: []
          }
        ]
      };
    }

    function escapeHtml(value) {
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function trimText(value, fallback = '') {
      const text = String(value ?? '').trim();
      return text || fallback;
    }

    function readNumber(value, fallback, minimum = 0) {
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) {
        return fallback;
      }
      return Math.max(minimum, parsed);
    }

    function readClampedNumber(value, fallback, minimum, maximum) {
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) {
        return fallback;
      }
      return Math.min(maximum, Math.max(minimum, parsed));
    }

    function parseJsonObject(text, label) {
      const trimmed = String(text || '').trim();
      if (!trimmed) {
        return {};
      }
      const parsed = JSON.parse(trimmed);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error(`${label} must be a JSON object.`);
      }
      return parsed;
    }

    function parseCardsJson(text, pageId) {
      const trimmed = String(text || '').trim();
      if (!trimmed) {
        return [];
      }
      const parsed = JSON.parse(trimmed);
      if (!Array.isArray(parsed)) {
        throw new Error(`Cards for ${pageId} must be a JSON array.`);
      }
      return parsed;
    }

    function pageExtras(page) {
      const extras = {};
      if (!page || typeof page !== 'object' || Array.isArray(page)) {
        return extras;
      }
      for (const [key, value] of Object.entries(page)) {
        if ([
          'id',
          'kind',
          'layout',
          'slot',
          'cardStyle',
          'title',
          'subtitle',
          'stampCaption',
          'stampValue',
          'cards'
        ].includes(key)) {
          continue;
        }
        extras[key] = value;
      }
      return extras;
    }

    function rootExtras(config) {
      const extras = {};
      if (!config || typeof config !== 'object' || Array.isArray(config)) {
        return extras;
      }
      for (const [key, value] of Object.entries(config)) {
        if (['version', 'rotation', 'display', 'pages'].includes(key)) {
          continue;
        }
        extras[key] = value;
      }
      return extras;
    }

    function normalizeVisualDisplay(config) {
      const source = config && typeof config === 'object' && !Array.isArray(config) ? config : {};
      const display = source.display && typeof source.display === 'object' && !Array.isArray(source.display)
        ? source.display
        : {};
      const safeArea = display.safeArea && typeof display.safeArea === 'object' && !Array.isArray(display.safeArea)
        ? display.safeArea
        : {};
      return {
        safeTop: readNumber(safeArea.top, 0, 0),
        safeRight: readNumber(safeArea.right, 0, 0),
        safeBottom: readNumber(safeArea.bottom, 0, 0),
        safeLeft: readNumber(safeArea.left, 0, 0),
        layoutPaddingPx: readNumber(display.layoutPaddingPx, 16, 0),
        layoutGapPx: readNumber(display.layoutGapPx, 16, 0),
        globalScale: readClampedNumber(display.globalScale, 1, 0.75, 1),
      };
    }

    function cardExtras(card) {
      const extras = {};
      if (!card || typeof card !== 'object' || Array.isArray(card)) {
        return extras;
      }
      for (const [key, value] of Object.entries(card)) {
        if ([
          'type',
          'caption',
          'hint',
          'entity',
          'stateEntity',
          'downEntity',
          'upEntity',
          'onText',
          'offText',
          'value',
          'unit',
          'digits'
        ].includes(key)) {
          continue;
        }
        extras[key] = value;
      }
      return extras;
    }

    const CARD_TYPE_OPTIONS = [
      'entity',
      'text',
      'todo',
      'onoff',
      'battery',
      'network',
      'time',
      'percent',
      'number'
    ];

    function defaultCardForType(type, index) {
      const normalizedType = trimText(type, 'entity');
      const card = {
        type: normalizedType,
        caption: `Card ${index + 1}`,
        hint: '',
        entity: '',
        stateEntity: '',
        downEntity: '',
        upEntity: '',
        onText: 'On',
        offText: 'Off',
        value: '',
        unit: '',
        digits: normalizedType === 'number' || normalizedType === 'percent' ? '0' : '',
        extrasText: '',
      };
      if (normalizedType === 'todo') {
        card.caption = 'To-do';
      } else if (normalizedType === 'onoff') {
        card.caption = 'Device';
      } else if (normalizedType === 'battery') {
        card.caption = 'Battery';
      } else if (normalizedType === 'network') {
        card.caption = 'Network';
      } else if (normalizedType === 'time') {
        card.caption = 'Time';
      } else if (normalizedType === 'percent') {
        card.caption = 'Percent';
      } else if (normalizedType === 'number') {
        card.caption = 'Number';
      } else if (normalizedType === 'text') {
        card.caption = 'Note';
        card.value = '—';
      }
      return card;
    }

    function normalizeVisualCard(card, index) {
      const source = card && typeof card === 'object' && !Array.isArray(card) ? card : {};
      const type = CARD_TYPE_OPTIONS.includes(trimText(source.type, 'entity'))
        ? trimText(source.type, 'entity')
        : 'entity';
      const defaults = defaultCardForType(type, index);
      return {
        ...defaults,
        type,
        caption: trimText(source.caption, defaults.caption),
        hint: trimText(source.hint),
        entity: trimText(source.entity),
        stateEntity: trimText(source.stateEntity),
        downEntity: trimText(source.downEntity),
        upEntity: trimText(source.upEntity),
        onText: trimText(source.onText, defaults.onText),
        offText: trimText(source.offText, defaults.offText),
        value: trimText(source.value, defaults.value),
        unit: trimText(source.unit),
        digits: source.digits == null || source.digits === '' ? defaults.digits : String(source.digits),
        extrasText: JSON.stringify(cardExtras(source), null, 2),
      };
    }

    function normalizeVisualPage(page, index) {
      const source = page && typeof page === 'object' && !Array.isArray(page) ? page : {};
      const kindSource = trimText(source.kind || source.layout, 'cards');
      const kind = ['overview', 'cards', 'forecast+cards'].includes(kindSource) ? kindSource : 'cards';
      return {
        id: trimText(source.id, `page-${index + 1}`),
        kind,
        slot: source.slot === '' || source.slot == null ? '' : String(readNumber(source.slot, 0, 0)),
        cardStyle: trimText(source.cardStyle, 'full') === 'mini' ? 'mini' : 'full',
        title: trimText(source.title, `Page ${index + 1}`),
        subtitle: trimText(source.subtitle),
        stampCaption: trimText(source.stampCaption),
        stampValue: trimText(source.stampValue),
        cards: Array.isArray(source.cards)
          ? source.cards.map((card, cardIndex) => normalizeVisualCard(card, cardIndex))
          : [],
        extrasText: JSON.stringify(pageExtras(source), null, 2),
      };
    }

    function normalizeVisualConfig(config) {
      const source = config && typeof config === 'object' && !Array.isArray(config) ? config : starterConfig();
      const pages = Array.isArray(source.pages) && source.pages.length
        ? source.pages.map((page, index) => normalizeVisualPage(page, index))
        : starterConfig().pages.map((page, index) => normalizeVisualPage(page, index));
      return {
        dwell: readNumber(source.rotation && source.rotation.defaultDwellSeconds, 18, 5),
        display: normalizeVisualDisplay(source),
        pages,
        rootExtrasText: JSON.stringify(rootExtras(source), null, 2),
      };
    }

    function parseConfig() {
      return JSON.parse(editorEl.value);
    }

    function readConfigOrDefault() {
      if (!editorEl.value.trim()) {
        return starterConfig();
      }
      return parseConfig();
    }

    function writeEditorJson(config) {
      editorEl.value = JSON.stringify(config, null, 2);
    }

    function renderField(label, field, value, options = {}) {
      const type = options.type || 'text';
      const min = options.min != null ? ` min="${escapeHtml(options.min)}"` : '';
      const step = options.step != null ? ` step="${escapeHtml(options.step)}"` : '';
      if (type === 'select') {
        const choices = Array.isArray(options.choices) ? options.choices : [];
        return `
          <div class="field">
            <label>${escapeHtml(label)}</label>
            <select data-card-field="${escapeHtml(field)}">
              ${choices.map((choice) => `
                <option value="${escapeHtml(choice)}" ${String(value) === String(choice) ? 'selected' : ''}>${escapeHtml(choice)}</option>
              `).join('')}
            </select>
          </div>
        `;
      }
      return `
        <div class="field">
          <label>${escapeHtml(label)}</label>
          <input type="${escapeHtml(type)}" data-card-field="${escapeHtml(field)}" value="${escapeHtml(value || '')}"${min}${step}>
        </div>
      `;
    }

    function renderCardSpecificFields(card) {
      const sections = [];
      if (['entity', 'todo', 'onoff', 'battery', 'time', 'percent', 'number'].includes(card.type)) {
        sections.push(renderField('Entity', 'entity', card.entity));
      }
      if (card.type === 'battery') {
        sections.push(renderField('State entity', 'stateEntity', card.stateEntity));
      }
      if (card.type === 'network') {
        sections.push(renderField('Down entity', 'downEntity', card.downEntity));
        sections.push(renderField('Up entity', 'upEntity', card.upEntity));
      }
      if (card.type === 'onoff') {
        sections.push(renderField('On text', 'onText', card.onText));
        sections.push(renderField('Off text', 'offText', card.offText));
      }
      if (card.type === 'text') {
        sections.push(renderField('Static value', 'value', card.value));
      }
      if (card.type === 'number') {
        sections.push(renderField('Unit', 'unit', card.unit));
        sections.push(renderField('Digits', 'digits', card.digits, { type: 'number', min: 0, step: 1 }));
      }
      if (card.type === 'percent') {
        sections.push(renderField('Digits', 'digits', card.digits, { type: 'number', min: 0, step: 1 }));
      }
      if (card.type === 'entity') {
        sections.push(renderField('Fallback value', 'value', card.value));
      }
      return sections.join('');
    }

    function renderCardEditor(card, cardIndex, totalCards) {
      return `
        <article class="card-editor" data-card-index="${cardIndex}">
          <div class="card-top">
            <div class="page-title-text">
              <strong>${escapeHtml(card.caption || `Card ${cardIndex + 1}`)}</strong>
              <span>${escapeHtml(card.type)}</span>
            </div>
            <div class="page-actions">
              <button type="button" data-action="card-up" ${cardIndex === 0 ? 'disabled' : ''}>Up</button>
              <button type="button" data-action="card-down" ${cardIndex === totalCards - 1 ? 'disabled' : ''}>Down</button>
              <button type="button" data-action="card-remove">Remove</button>
            </div>
          </div>
          <div class="card-body">
            <div class="field-grid">
              ${renderField('Type', 'type', card.type, { type: 'select', choices: CARD_TYPE_OPTIONS })}
              ${renderField('Caption', 'caption', card.caption)}
              ${renderField('Hint', 'hint', card.hint)}
              ${renderCardSpecificFields(card)}
            </div>
            <details class="advanced">
              <summary>Advanced card fields</summary>
              <textarea data-card-field="extras" spellcheck="false">${escapeHtml(card.extrasText && card.extrasText !== '{}' ? card.extrasText : '')}</textarea>
            </details>
          </div>
        </article>
      `;
    }

    function renderVisualEditor(config) {
      dwellInput.value = String(config.dwell);
      safeTopInput.value = String(config.display.safeTop);
      safeRightInput.value = String(config.display.safeRight);
      safeBottomInput.value = String(config.display.safeBottom);
      safeLeftInput.value = String(config.display.safeLeft);
      layoutPaddingInput.value = String(config.display.layoutPaddingPx);
      layoutGapInput.value = String(config.display.layoutGapPx);
      globalScaleInput.value = String(config.display.globalScale);
      rootExtrasEl.value = config.rootExtrasText && config.rootExtrasText !== '{}' ? config.rootExtrasText : '';
      pagesEl.innerHTML = config.pages.map((page, index) => `
        <article class="page-card" data-page-index="${index}">
          <div class="page-top">
            <div class="page-title">
              <div class="page-order">${index + 1}</div>
              <div class="page-title-text">
                <strong>${escapeHtml(page.title || page.id)}</strong>
                <span>${escapeHtml(page.kind)}${page.slot !== '' ? ` · slot ${escapeHtml(page.slot)}` : ''}</span>
              </div>
            </div>
            <div class="page-actions">
              <button type="button" data-action="move-up" ${index === 0 ? 'disabled' : ''}>Up</button>
              <button type="button" data-action="move-down" ${index === config.pages.length - 1 ? 'disabled' : ''}>Down</button>
              <button type="button" data-action="remove" ${config.pages.length <= 1 ? 'disabled' : ''}>Remove</button>
            </div>
          </div>
          <div class="page-body">
            <div class="field-grid">
              <div class="field">
                <label>Page ID</label>
                <input type="text" data-field="id" value="${escapeHtml(page.id)}">
              </div>
              <div class="field">
                <label>Kind</label>
                <select data-field="kind">
                  <option value="overview" ${page.kind === 'overview' ? 'selected' : ''}>overview</option>
                  <option value="cards" ${page.kind === 'cards' ? 'selected' : ''}>cards</option>
                  <option value="forecast+cards" ${page.kind === 'forecast+cards' ? 'selected' : ''}>forecast+cards</option>
                </select>
              </div>
              <div class="field">
                <label>Slot</label>
                <input type="number" min="0" step="1" data-field="slot" value="${escapeHtml(page.slot)}">
              </div>
              <div class="field">
                <label>Card style</label>
                <select data-field="cardStyle">
                  <option value="full" ${page.cardStyle === 'full' ? 'selected' : ''}>full</option>
                  <option value="mini" ${page.cardStyle === 'mini' ? 'selected' : ''}>mini</option>
                </select>
              </div>
              <div class="field">
                <label>Title</label>
                <input type="text" data-field="title" value="${escapeHtml(page.title)}">
              </div>
              <div class="field">
                <label>Subtitle</label>
                <input type="text" data-field="subtitle" value="${escapeHtml(page.subtitle)}">
              </div>
              <div class="field">
                <label>Stamp caption</label>
                <input type="text" data-field="stampCaption" value="${escapeHtml(page.stampCaption)}">
              </div>
              <div class="field">
                <label>Stamp value</label>
                <input type="text" data-field="stampValue" value="${escapeHtml(page.stampValue)}">
              </div>
            </div>
            <div class="cards-toolbar">
              <div>
                <div class="subsection-label">Cards</div>
                <p class="section-note">Fill the page with typed card blocks. The renderer template stays the same; you only control content.</p>
              </div>
              <div class="row">
                <select data-field="newCardType">
                  ${CARD_TYPE_OPTIONS.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join('')}
                </select>
                <button type="button" data-action="add-card">+ Card</button>
              </div>
            </div>
            <div class="card-stack">
              ${page.kind === 'overview'
                ? `<p class="section-note">Overview pages use the built-in weather/assistant template and usually do not need manual cards.</p>`
                : (page.cards.length
                    ? page.cards.map((card, cardIndex) => renderCardEditor(card, cardIndex, page.cards.length)).join('')
                    : `<p class="section-note">No cards yet. Add the first block for this page.</p>`)}
            </div>
            <details class="advanced">
              <summary>Advanced page fields</summary>
              <textarea data-field="extras" spellcheck="false">${escapeHtml(page.extrasText && page.extrasText !== '{}' ? page.extrasText : '')}</textarea>
            </details>
          </div>
        </article>
      `).join('');
    }

    function readVisualConfig() {
      const root = parseJsonObject(rootExtrasEl.value, 'Extra root fields');
      const pages = Array.from(pagesEl.querySelectorAll('[data-page-index]')).map((pageNode, index) => {
        const getValue = (name) => pageNode.querySelector(`[data-field="${name}"]`).value;
        const id = trimText(getValue('id'), `page-${index + 1}`);
        const kindValue = trimText(getValue('kind'), 'cards');
        const kind = ['overview', 'cards', 'forecast+cards'].includes(kindValue) ? kindValue : 'cards';
        const slotRaw = trimText(getValue('slot'));
        const extras = parseJsonObject(getValue('extras'), `Extra page fields for ${id}`);
        const cards = Array.from(pageNode.querySelectorAll('[data-card-index]')).map((cardNode, cardIndex) => {
          const getCardValue = (name) => {
            const field = cardNode.querySelector(`[data-card-field="${name}"]`);
            return field ? field.value : '';
          };
          const typeValue = trimText(getCardValue('type'), 'entity');
          const type = CARD_TYPE_OPTIONS.includes(typeValue) ? typeValue : 'entity';
          const caption = trimText(getCardValue('caption'));
          const hint = trimText(getCardValue('hint'));
          const extras = parseJsonObject(getCardValue('extras'), `Advanced card fields for ${id}/${cardIndex + 1}`);
          const card = {
            ...extras,
            type,
          };
          if (caption) {
            card.caption = caption;
          }
          if (hint) {
            card.hint = hint;
          }
          const entity = trimText(getCardValue('entity'));
          const stateEntity = trimText(getCardValue('stateEntity'));
          const downEntity = trimText(getCardValue('downEntity'));
          const upEntity = trimText(getCardValue('upEntity'));
          const onText = trimText(getCardValue('onText'));
          const offText = trimText(getCardValue('offText'));
          const value = trimText(getCardValue('value'));
          const unit = trimText(getCardValue('unit'));
          const digits = trimText(getCardValue('digits'));
          if (entity) {
            card.entity = entity;
          }
          if (stateEntity) {
            card.stateEntity = stateEntity;
          }
          if (downEntity) {
            card.downEntity = downEntity;
          }
          if (upEntity) {
            card.upEntity = upEntity;
          }
          if (onText) {
            card.onText = onText;
          }
          if (offText) {
            card.offText = offText;
          }
          if (value) {
            card.value = value;
          }
          if (unit) {
            card.unit = unit;
          }
          if (digits) {
            card.digits = readNumber(digits, 0, 0);
          }
          return card;
        });
        const page = {
          ...extras,
          id,
          kind,
          title: trimText(getValue('title'), `Page ${index + 1}`),
        };
        const subtitle = trimText(getValue('subtitle'));
        const stampCaption = trimText(getValue('stampCaption'));
        const stampValue = trimText(getValue('stampValue'));
        if (slotRaw) {
          page.slot = readNumber(slotRaw, 0, 0);
        }
        if (kind !== 'overview' || 'cardStyle' in extras || getValue('cardStyle')) {
          page.cardStyle = trimText(getValue('cardStyle'), 'full') === 'mini' ? 'mini' : 'full';
        }
        if (subtitle) {
          page.subtitle = subtitle;
        }
        if (stampCaption) {
          page.stampCaption = stampCaption;
        }
        if (stampValue) {
          page.stampValue = stampValue;
        }
        if (cards.length && kind !== 'overview') {
          page.cards = cards;
        }
        return page;
      });

      if (!pages.length) {
        throw new Error('At least one page is required.');
      }

      const seen = new Set();
      for (const page of pages) {
        if (seen.has(page.id)) {
          throw new Error(`Duplicate page id: ${page.id}`);
        }
        seen.add(page.id);
      }

      return {
        ...root,
        version: 1,
        rotation: {
          order: pages.map((page) => page.id),
          defaultDwellSeconds: readNumber(dwellInput.value, 18, 5),
        },
        display: {
          safeArea: {
            top: readNumber(safeTopInput.value, 0, 0),
            right: readNumber(safeRightInput.value, 0, 0),
            bottom: readNumber(safeBottomInput.value, 0, 0),
            left: readNumber(safeLeftInput.value, 0, 0),
          },
          layoutPaddingPx: readNumber(layoutPaddingInput.value, 16, 0),
          layoutGapPx: readNumber(layoutGapInput.value, 16, 0),
          globalScale: readClampedNumber(globalScaleInput.value, 1, 0.75, 1),
        },
        pages,
      };
    }

    function applyConfigToEditors(config, statusMessage) {
      writeEditorJson(config);
      renderVisualEditor(normalizeVisualConfig(config));
      lastEditedMode = 'visual';
      if (statusMessage) {
        setStatus(statusMessage, 'ok');
      }
    }

    function syncVisualToJson(statusMessage) {
      const config = readVisualConfig();
      writeEditorJson(config);
      lastEditedMode = 'visual';
      if (statusMessage) {
        setStatus(statusMessage, 'ok');
      }
      return config;
    }

    function syncJsonToVisual(statusMessage) {
      renderVisualEditor(normalizeVisualConfig(readConfigOrDefault()));
      lastEditedMode = 'json';
      if (statusMessage) {
        setStatus(statusMessage, 'ok');
      }
    }

    function formatJsonInEditor() {
      writeEditorJson(readConfigOrDefault());
      lastEditedMode = 'json';
      setStatus('JSON formatted.', 'ok');
    }

    function addPage() {
      const config = normalizeVisualConfig(lastEditedMode === 'json' ? readConfigOrDefault() : readVisualConfig());
      const nextIndex = config.pages.length + 1;
      config.pages.push({
        id: `page-${nextIndex}`,
        kind: 'cards',
        slot: '',
        cardStyle: 'full',
        title: `Page ${nextIndex}`,
        subtitle: 'New scene section',
        stampCaption: '',
        stampValue: '',
        cards: [],
        extrasText: '',
      });
      renderVisualEditor(config);
      syncVisualToJson(`Added page-${nextIndex}.`);
    }

    function addCard(pageIndex, type) {
      const config = normalizeVisualConfig(readVisualConfig());
      const page = config.pages[pageIndex];
      if (!page || page.kind === 'overview') {
        return;
      }
      page.cards.push(defaultCardForType(type, page.cards.length));
      renderVisualEditor(config);
      syncVisualToJson(`Added ${type} card.`);
    }

    function movePage(index, direction) {
      const config = normalizeVisualConfig(readVisualConfig());
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= config.pages.length) {
        return;
      }
      const pages = config.pages.slice();
      const current = pages[index];
      pages[index] = pages[nextIndex];
      pages[nextIndex] = current;
      config.pages = pages;
      renderVisualEditor(config);
      syncVisualToJson('Updated page order.');
    }

    function removePage(index) {
      const config = normalizeVisualConfig(readVisualConfig());
      if (config.pages.length <= 1) {
        throw new Error('At least one page must remain.');
      }
      const removed = config.pages[index];
      config.pages = config.pages.filter((_, pageIndex) => pageIndex !== index);
      renderVisualEditor(config);
      syncVisualToJson(`Removed ${removed.id}.`);
    }

    function moveCard(pageIndex, cardIndex, direction) {
      const config = normalizeVisualConfig(readVisualConfig());
      const page = config.pages[pageIndex];
      if (!page) {
        return;
      }
      const nextIndex = cardIndex + direction;
      if (nextIndex < 0 || nextIndex >= page.cards.length) {
        return;
      }
      const cards = page.cards.slice();
      const current = cards[cardIndex];
      cards[cardIndex] = cards[nextIndex];
      cards[nextIndex] = current;
      page.cards = cards;
      renderVisualEditor(config);
      syncVisualToJson('Updated card order.');
    }

    function removeCard(pageIndex, cardIndex) {
      const config = normalizeVisualConfig(readVisualConfig());
      const page = config.pages[pageIndex];
      if (!page) {
        return;
      }
      page.cards = page.cards.filter((_, index) => index !== cardIndex);
      renderVisualEditor(config);
      syncVisualToJson('Removed card.');
    }

    async function loadConfig() {
      setStatus('Loading...');
      const response = await fetch(apiUrl(), { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      if (data.loadedFrom && data.loadedFrom !== data.path) {
        applyConfigToEditors(data.config, `Loaded legacy config from ${data.loadedFrom}. Save to migrate into ${data.path}.`);
      } else {
        applyConfigToEditors(data.config, `Loaded ${data.path}.`);
      }
    }

    async function saveConfig() {
      const parsed = lastEditedMode === 'visual' ? syncVisualToJson() : parseConfig();
      setStatus('Saving...');
      const response = await fetch(apiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      applyConfigToEditors(data.config, `Saved ${data.path}.`);
    }

    loadBtn.addEventListener('click', async () => {
      try { await loadConfig(); } catch (error) { setStatus(String(error), 'bad'); }
    });

    applyVisualBtn.addEventListener('click', () => {
      try { syncVisualToJson('Visual editor synced into JSON.'); } catch (error) { setStatus(String(error), 'bad'); }
    });

    visualSyncBtn.addEventListener('click', () => {
      try { syncVisualToJson('Visual editor synced into JSON.'); } catch (error) { setStatus(String(error), 'bad'); }
    });

    jsonToVisualBtn.addEventListener('click', () => {
      try { syncJsonToVisual('Visual editor reloaded from JSON.'); } catch (error) { setStatus(String(error), 'bad'); }
    });

    validateBtn.addEventListener('click', () => {
      try {
        parseConfig();
        setStatus('JSON is valid.', 'ok');
      } catch (error) {
        setStatus(String(error), 'bad');
      }
    });

    formatBtn.addEventListener('click', () => {
      try { formatJsonInEditor(); } catch (error) { setStatus(String(error), 'bad'); }
    });

    newPageBtn.addEventListener('click', () => {
      try { addPage(); } catch (error) { setStatus(String(error), 'bad'); }
    });

    starterBtn.addEventListener('click', () => {
      try { applyConfigToEditors(starterConfig(), 'Applied starter template.'); } catch (error) { setStatus(String(error), 'bad'); }
    });

    saveBtn.addEventListener('click', async () => {
      try { await saveConfig(); } catch (error) { setStatus(String(error), 'bad'); }
    });

    editorEl.addEventListener('input', () => {
      lastEditedMode = 'json';
    });

    dwellInput.addEventListener('input', () => {
      try { syncVisualToJson('Visual changes mirrored into JSON.'); } catch (error) { setStatus(String(error), 'bad'); }
    });

    [safeTopInput, safeRightInput, safeBottomInput, safeLeftInput, layoutPaddingInput, layoutGapInput, globalScaleInput]
      .forEach((input) => {
        input.addEventListener('input', () => {
          try { syncVisualToJson('Visual changes mirrored into JSON.'); } catch (error) { setStatus(String(error), 'bad'); }
        });
      });

    rootExtrasEl.addEventListener('change', () => {
      try { syncVisualToJson('Visual changes mirrored into JSON.'); } catch (error) { setStatus(String(error), 'bad'); }
    });

    pagesEl.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      lastEditedMode = 'visual';
      if (target.matches('input, select')) {
        try { syncVisualToJson('Visual changes mirrored into JSON.'); } catch (error) { setStatus(String(error), 'bad'); }
      }
    });

    pagesEl.addEventListener('change', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      lastEditedMode = 'visual';
      if (target.matches('textarea, input, select')) {
        try {
          if (target.matches('[data-card-field="type"], [data-field="kind"]')) {
            const config = normalizeVisualConfig(readVisualConfig());
            renderVisualEditor(config);
          }
          syncVisualToJson('Visual changes mirrored into JSON.');
        } catch (error) {
          setStatus(String(error), 'bad');
        }
      }
    });

    pagesEl.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      const button = target.closest('button[data-action]');
      if (!button) {
        return;
      }
      const pageNode = button.closest('[data-page-index]');
      if (!pageNode) {
        return;
      }
      const index = Number(pageNode.dataset.pageIndex);
      if (!Number.isFinite(index)) {
        return;
      }
      const cardNode = button.closest('[data-card-index]');
      const cardIndex = cardNode ? Number(cardNode.dataset.cardIndex) : -1;
      try {
        if (button.dataset.action === 'move-up') {
          movePage(index, -1);
        } else if (button.dataset.action === 'move-down') {
          movePage(index, 1);
        } else if (button.dataset.action === 'remove') {
          removePage(index);
        } else if (button.dataset.action === 'add-card') {
          const typeField = pageNode.querySelector('[data-field="newCardType"]');
          addCard(index, typeField ? typeField.value : 'entity');
        } else if (button.dataset.action === 'card-up' && cardIndex >= 0) {
          moveCard(index, cardIndex, -1);
        } else if (button.dataset.action === 'card-down' && cardIndex >= 0) {
          moveCard(index, cardIndex, 1);
        } else if (button.dataset.action === 'card-remove' && cardIndex >= 0) {
          removeCard(index, cardIndex);
        }
      } catch (error) {
        setStatus(String(error), 'bad');
      }
    });

    loadConfig().catch((error) => setStatus(String(error), 'bad'));
  </script>
</body>
</html>
"""


def normalize_scene_config(config: Any) -> dict[str, Any]:
    if not isinstance(config, dict):
        raise ValueError("Scene config must be a JSON object")
    return config


def load_active_pack_id() -> str:
    if ACTIVE_PACK_FILE.exists():
        try:
            payload = json.loads(ACTIVE_PACK_FILE.read_text(encoding="utf-8"))
            value = str(payload.get("id", "")).strip()
            if value:
                return value
        except Exception as exc:
            logging.warning("Failed to read %s: %s", ACTIVE_PACK_FILE, exc)
    return DEFAULT_PACK_ID


def resolve_primary_scene_config_path() -> Path:
    if EXPLICIT_SCENE_CONFIG_PATH:
        return Path(EXPLICIT_SCENE_CONFIG_PATH)
    return PACKS_DIR / load_active_pack_id() / "scene.default.json"


def resolve_legacy_scene_config_paths(primary_path: Path) -> tuple[Path, ...]:
    paths: list[Path] = []
    for candidate in LEGACY_SCENE_CONFIG_PATHS:
        if candidate == primary_path or candidate in paths:
            continue
        paths.append(candidate)
    return tuple(paths)


def render_editor_html() -> bytes:
    primary_path = resolve_primary_scene_config_path()
    legacy_paths = ", ".join(
        str(path) for path in resolve_legacy_scene_config_paths(primary_path)
    )
    html_text = EDITOR_HTML_TEMPLATE.replace(
        "__ACTIVE_PACK_ID__",
        load_active_pack_id(),
    ).replace(
        "__SCENE_EDITOR_CONFIG_PATH__",
        str(primary_path),
    ).replace(
        "__LEGACY_SCENE_EDITOR_CONFIG_PATHS__",
        legacy_paths,
    )
    return html_text.encode("utf-8")


def load_scene_config() -> tuple[dict[str, Any], Path, str | None]:
    primary_path = resolve_primary_scene_config_path()
    if primary_path.exists():
        return normalize_scene_config(
            json.loads(primary_path.read_text(encoding="utf-8"))
        ), primary_path, None

    for legacy_path in resolve_legacy_scene_config_paths(primary_path):
        if legacy_path.exists():
            return normalize_scene_config(
                json.loads(legacy_path.read_text(encoding="utf-8"))
            ), primary_path, str(legacy_path)

    return (
        normalize_scene_config(json.loads(json.dumps(DEFAULT_SCENE_CONFIG))),
        primary_path,
        None,
    )


def save_scene_config(config: Any) -> tuple[dict[str, Any], Path]:
    normalized = normalize_scene_config(config)
    primary_path = resolve_primary_scene_config_path()
    primary_path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = primary_path.with_suffix(primary_path.suffix + ".tmp")
    temp_path.write_text(
        json.dumps(normalized, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    os.replace(temp_path, primary_path)
    return normalized, primary_path


class SceneConfigHandler(BaseHTTPRequestHandler):
    server_version = "KioskSceneEditor/1.0"

    def log_message(self, fmt: str, *args: Any) -> None:
        logging.info("%s - %s", self.address_string(), fmt % args)

    def send_json(self, payload: dict[str, Any], status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_html(self, body: bytes) -> None:
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self) -> Any:
        length = int(self.headers.get("Content-Length", "0") or "0")
        raw = self.rfile.read(length) if length else b"{}"
        if not raw:
            raw = b"{}"
        return json.loads(raw.decode("utf-8"))

    def do_GET(self) -> None:
        path = urlsplit(self.path).path
        if path == "/health":
            primary_path = resolve_primary_scene_config_path()
            self.send_json(
                {
                    "status": "ok",
                    "path": str(primary_path),
                    "activePackId": load_active_pack_id(),
                }
            )
            return
        if path in (PATH_PREFIX, PATH_PREFIX + "/"):
            self.send_html(render_editor_html())
            return
        if path == PATH_PREFIX + "/api/config":
            try:
                config, primary_path, loaded_from = load_scene_config()
                self.send_json(
                    {
                        "success": True,
                        "config": config,
                        "path": str(primary_path),
                        "packId": load_active_pack_id(),
                        "loadedFrom": loaded_from,
                    }
                )
            except Exception as exc:
                logging.exception("Failed to load scene config: %s", exc)
                self.send_json(
                    {"success": False, "error": str(exc)},
                    status=HTTPStatus.INTERNAL_SERVER_ERROR,
                )
            return
        self.send_json(
            {"success": False, "error": f"Endpoint not found: {path}"},
            status=HTTPStatus.NOT_FOUND,
        )

    def do_POST(self) -> None:
        path = urlsplit(self.path).path
        if path != PATH_PREFIX + "/api/config":
            self.send_json(
                {"success": False, "error": f"Endpoint not found: {path}"},
                status=HTTPStatus.NOT_FOUND,
            )
            return
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json(
                {"success": False, "error": "Invalid JSON payload"},
                status=HTTPStatus.BAD_REQUEST,
            )
            return

        try:
            config, primary_path = save_scene_config(payload)
            self.send_json(
                {
                    "success": True,
                    "config": config,
                    "path": str(primary_path),
                    "packId": load_active_pack_id(),
                }
            )
        except ValueError as exc:
            self.send_json(
                {"success": False, "error": str(exc)},
                status=HTTPStatus.BAD_REQUEST,
            )
        except Exception as exc:
            logging.exception("Failed to save scene config: %s", exc)
            self.send_json(
                {"success": False, "error": str(exc)},
                status=HTTPStatus.INTERNAL_SERVER_ERROR,
            )


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(levelname)s: %(message)s",
        datefmt="%H:%M:%S",
    )
    server = ThreadingHTTPServer((HOST, PORT), SceneConfigHandler)
    logging.info(
        "Starting scene config service on http://%s:%s for %s",
        HOST,
        PORT,
        resolve_primary_scene_config_path(),
    )
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
