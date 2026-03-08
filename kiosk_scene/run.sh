#!/usr/bin/env bash
set -euo pipefail

OPTIONS_FILE="/data/options.json"

if [ ! -f "$OPTIONS_FILE" ]; then
  echo "Missing $OPTIONS_FILE"
  exit 1
fi

TZNAME=$(jq -r '.timezone // "Europe/Sofia"' "$OPTIONS_FILE")
DEFAULT_PACK_ID=$(jq -r '.active_pack_id // "neiri"' "$OPTIONS_FILE")
if [ -z "$DEFAULT_PACK_ID" ] || [ "$DEFAULT_PACK_ID" = "null" ]; then
  DEFAULT_PACK_ID="neiri"
fi

export TZ="$TZNAME"
export PYTHONUNBUFFERED=1

export SCENE_ROOT="/config/kiosk-scene"
export SCENE_RUNTIME_DIR="${SCENE_ROOT}/scene-runtime"
export SCENE_PACKS_DIR="${SCENE_ROOT}/scene-packs"
export SCENE_ACTIVE_PACK_FILE="${SCENE_ROOT}/active-pack.json"
export SCENE_DEFAULT_PACK_ID="$DEFAULT_PACK_ID"
export SCENE_HOST_BIND="127.0.0.1"
export SCENE_HOST_PORT="48097"
export SCENE_EDITOR_HOST="127.0.0.1"
export SCENE_EDITOR_PORT="48098"

IMAGE_SCENE_RUNTIME_SEED_DIR="/opt/kiosk-scene/scene-runtime-seed"
LEGACY_SCENE_ROOT="/config/openclaw-scene"
LEGACY_NEIRI_SCENE_DIR="/config/www/neiri-scene"
LEGACY_LIVE2D_DIR="/config/www/live2d"
DEFAULT_PACK_DIR="${SCENE_PACKS_DIR}/${SCENE_DEFAULT_PACK_ID}"

mkdir -p "$SCENE_RUNTIME_DIR" "$SCENE_PACKS_DIR" "$DEFAULT_PACK_DIR"

if [ -d "${LEGACY_SCENE_ROOT}/scene-runtime" ] && [ ! -f "${SCENE_RUNTIME_DIR}/index.html" ]; then
  rsync -a --ignore-existing "${LEGACY_SCENE_ROOT}/scene-runtime/" "${SCENE_RUNTIME_DIR}/" 2>/dev/null || true
fi

if [ -d "${LEGACY_SCENE_ROOT}/scene-packs" ]; then
  rsync -a --ignore-existing "${LEGACY_SCENE_ROOT}/scene-packs/" "${SCENE_PACKS_DIR}/" 2>/dev/null || true
fi

if [ -f "${LEGACY_SCENE_ROOT}/active-pack.json" ] && [ ! -f "${SCENE_ACTIVE_PACK_FILE}" ]; then
  cp "${LEGACY_SCENE_ROOT}/active-pack.json" "${SCENE_ACTIVE_PACK_FILE}"
fi

if [ ! -f "$SCENE_ACTIVE_PACK_FILE" ]; then
  printf '{\n  "id": "%s"\n}\n' "$SCENE_DEFAULT_PACK_ID" > "$SCENE_ACTIVE_PACK_FILE"
fi

if [ -d "$IMAGE_SCENE_RUNTIME_SEED_DIR" ]; then
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete "$IMAGE_SCENE_RUNTIME_SEED_DIR/" "$SCENE_RUNTIME_DIR/" 2>/dev/null || true
  else
    rm -rf "${SCENE_RUNTIME_DIR:?}/"*
    cp -r "$IMAGE_SCENE_RUNTIME_SEED_DIR/." "$SCENE_RUNTIME_DIR/" 2>/dev/null || true
  fi
fi

for scene_file in renderer.kiosk-scene.json scene.default.json entity-map.json avatar.manifest.json neiri-control.json; do
  if [ -f "${LEGACY_NEIRI_SCENE_DIR}/${scene_file}" ] && [ ! -f "${DEFAULT_PACK_DIR}/${scene_file}" ]; then
    cp "${LEGACY_NEIRI_SCENE_DIR}/${scene_file}" "${DEFAULT_PACK_DIR}/${scene_file}"
  fi
done

if [ -f "${LEGACY_LIVE2D_DIR}/neiri-control.json" ] && [ ! -f "${DEFAULT_PACK_DIR}/neiri-control.json" ]; then
  cp "${LEGACY_LIVE2D_DIR}/neiri-control.json" "${DEFAULT_PACK_DIR}/neiri-control.json"
fi

echo "INFO: Kiosk Scene root: ${SCENE_ROOT}"
echo "INFO: Active pack file: ${SCENE_ACTIVE_PACK_FILE}"
echo "INFO: Default pack id: ${SCENE_DEFAULT_PACK_ID}"
echo "INFO: Direct scene URL: http://homeassistant.local:48123/scene/"

python3 /scene_host_service.py &
SCENE_HOST_PID=$!

python3 /scene_config_service.py &
SCENE_EDITOR_PID=$!

nginx -g 'daemon off;' &
NGINX_PID=$!

cleanup() {
  kill "$SCENE_HOST_PID" "$SCENE_EDITOR_PID" "$NGINX_PID" 2>/dev/null || true
  wait "$SCENE_HOST_PID" "$SCENE_EDITOR_PID" "$NGINX_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

wait -n "$SCENE_HOST_PID" "$SCENE_EDITOR_PID" "$NGINX_PID"
exit $?
