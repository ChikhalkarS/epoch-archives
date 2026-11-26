#!/usr/bin/env bash
# Single render mode: one job at a time (for 8GB MacBook Air M2)
# usage: tools/render3d.sh <first> <last> <job_name>   (resumable)
set -uo pipefail

cd "$(dirname "$0")/.."

FIRST=$1
LAST=$2
JOB_NAME=$3
OUT_DIR="out/frames3d/$JOB_NAME"
mkdir -p "$OUT_DIR"

# Single resumeable render job with concurrency=1 for 8GB memory
npx remotion render src/index.ts Govinda "$OUT_DIR" \
  --sequence --image-format=jpeg --jpeg-quality=93 \
  --frames=$FIRST-$LAST --gl=swangle --concurrency=1 --log=error 2>&1 | grep -v "^Rendered\|^Stitched" | tail -5

echo "$JOB_NAME complete: frames $FIRST-$LAST"
