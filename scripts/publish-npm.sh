#!/usr/bin/env bash
# Publish to npm using NPM_TOKEN (Automation token recommended; enable "Bypass 2FA" on npmjs.com).
# Usage: NPM_TOKEN=npm_xxx ./scripts/publish-npm.sh
set -euo pipefail

if [[ -z "${NPM_TOKEN:-}" ]]; then
  echo "Error: NPM_TOKEN is not set." >&2
  echo "Example: NPM_TOKEN=npm_your_automation_token ./scripts/publish-npm.sh" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npm run build

CFG="$(mktemp)"
chmod 600 "$CFG"
# Scoped package still uses registry.npmjs.org for publish
printf '//registry.npmjs.org/:_authToken=%s\n' "$NPM_TOKEN" > "$CFG"
trap 'rm -f "$CFG"' EXIT

npm publish --access public --userconfig "$CFG"
