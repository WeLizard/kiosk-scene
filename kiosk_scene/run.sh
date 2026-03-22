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
export SCENE_AVATAR_PACKS_DIR="${SCENE_ROOT}/avatar-packs"
export SCENE_ACTIVE_PACK_FILE="${SCENE_ROOT}/active-pack.json"
export SCENE_DEFAULT_PACK_ID="$DEFAULT_PACK_ID"
export SCENE_HOST_BIND="127.0.0.1"
export SCENE_HOST_PORT="48097"
export SCENE_EDITOR_HOST="127.0.0.1"
export SCENE_EDITOR_PORT="48098"
export SCENE_EDITOR_PATH_PREFIX="/scene-editor-form"

IMAGE_SCENE_RUNTIME_SEED_DIR="/opt/kiosk-scene/scene-runtime-seed"
IMAGE_SCENE_PACKS_SEED_DIR="/opt/kiosk-scene/scene-packs-seed"
LEGACY_SCENE_ROOT="/config/openclaw-scene"
LEGACY_NEIRI_SCENE_DIR="/config/www/neiri-scene"
LEGACY_LIVE2D_DIR="/config/www/live2d"
DEFAULT_PACK_DIR="${SCENE_PACKS_DIR}/${SCENE_DEFAULT_PACK_ID}"

mkdir -p "$SCENE_RUNTIME_DIR" "$SCENE_PACKS_DIR" "$DEFAULT_PACK_DIR"
mkdir -p "$SCENE_AVATAR_PACKS_DIR"

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

# Seed scene-packs from Docker image (--ignore-existing preserves user edits)
if [ -d "$IMAGE_SCENE_PACKS_SEED_DIR" ]; then
  rsync -a --ignore-existing "$IMAGE_SCENE_PACKS_SEED_DIR/" "$SCENE_PACKS_DIR/" 2>/dev/null || true
fi

for scene_file in renderer.kiosk-scene.json scene.default.json entity-map.json avatar.manifest.json neiri-control.json weather.json; do
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
if [ -f "${SCENE_RUNTIME_DIR}/index.html" ]; then
  echo "INFO: Runtime seed ready: ${SCENE_RUNTIME_DIR}/index.html"
else
  echo "WARNING: Runtime seed missing: ${SCENE_RUNTIME_DIR}/index.html"
fi

python3 /scene_host_service.py &
SCENE_HOST_PID=$!
echo "INFO: scene_host_service.py started (PID=${SCENE_HOST_PID})"

python3 /scene_config_service.py &
SCENE_EDITOR_PID=$!
echo "INFO: scene_config_service.py started (PID=${SCENE_EDITOR_PID})"

nginx -g 'daemon off;' &
NGINX_PID=$!
echo "INFO: nginx started (PID=${NGINX_PID})"

SHUTTING_DOWN=0
SCENE_HOST_EXIT_REPORTED=0
SCENE_EDITOR_EXIT_REPORTED=0

refresh_live_pids() {
  LIVE_PIDS=()
  for pid in "$SCENE_HOST_PID" "$SCENE_EDITOR_PID" "$NGINX_PID"; do
    if kill -0 "$pid" 2>/dev/null; then
      LIVE_PIDS+=("$pid")
    fi
  done
}

cleanup() {
  SHUTTING_DOWN=1
  kill "$SCENE_HOST_PID" "$SCENE_EDITOR_PID" "$NGINX_PID" 2>/dev/null || true
  wait "$SCENE_HOST_PID" "$SCENE_EDITOR_PID" "$NGINX_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

refresh_live_pids
while [ ${#LIVE_PIDS[@]} -gt 0 ]; do
  if wait -n "${LIVE_PIDS[@]}"; then
    EXIT_STATUS=0
  else
    EXIT_STATUS=$?
  fi

  refresh_live_pids

  if ! kill -0 "$SCENE_HOST_PID" 2>/dev/null && [ "$SHUTTING_DOWN" -eq 0 ] && [ "$SCENE_HOST_EXIT_REPORTED" -eq 0 ]; then
    echo "ERROR: scene_host_service.py exited with status ${EXIT_STATUS}; keeping nginx alive so /scene/ stays reachable"
    SCENE_HOST_EXIT_REPORTED=1
  fi

  if ! kill -0 "$SCENE_EDITOR_PID" 2>/dev/null && [ "$SHUTTING_DOWN" -eq 0 ] && [ "$SCENE_EDITOR_EXIT_REPORTED" -eq 0 ]; then
    echo "ERROR: scene_config_service.py exited with status ${EXIT_STATUS}; keeping nginx alive so /scene/ stays reachable"
    SCENE_EDITOR_EXIT_REPORTED=1
  fi

  if ! kill -0 "$NGINX_PID" 2>/dev/null; then
    if [ "$SHUTTING_DOWN" -eq 0 ]; then
      echo "ERROR: nginx exited with status ${EXIT_STATUS}; stopping Kiosk Scene"
    fi
    exit "$EXIT_STATUS"
  fi
done
