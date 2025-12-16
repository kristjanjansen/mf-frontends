#!/usr/bin/env bash
set -euo pipefail

APPS=(mf-layout mf-navigation mf-billing mf-dashboard mf-cookiebot)
PORTS=(3000 3001 3002 3003 3004)

BUILD_PIDS=()
PREVIEW_PIDS=()

cleanup() {
  kill "${BUILD_PIDS[@]:-}" "${PREVIEW_PIDS[@]:-}" 2>/dev/null || true
}
trap cleanup EXIT

for app in "${APPS[@]}"; do
  APP="$app" vite build --watch &
  BUILD_PIDS+=("$!")
done

# Give the first build a moment to output initial artifacts
sleep 2

for i in "${!APPS[@]}"; do
  APP="${APPS[$i]}" vite preview --port "${PORTS[$i]}" &
  PREVIEW_PIDS+=("$!")
done

wait
