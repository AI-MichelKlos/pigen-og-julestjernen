#!/bin/bash
# Lav en testkopi af spillet (test/game.html) med three.js fra npm. Spillets egen importmap røres ikke.
# Brug:  bash test/prep.sh   og derefter   python3 -m http.server 8123 --bind 127.0.0.1   (fra test-mappen)
set -e
D=$(cd "$(dirname "$0")" && pwd)
[ -d "$D/node_modules/three" ] || (cd "$D" && npm install --no-save --silent three@0.170.0)
SRC=${1:-$D/../index.html}
sed -e 's#https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js#/node_modules/three/build/three.module.js#' \
    -e 's#https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/#/node_modules/three/examples/jsm/#' "$SRC" > "$D/${2:-game.html}"
echo "klar: $D/${2:-game.html}"
