#!/usr/bin/env bash
# Single job assemble: join single render job frames + mix into final 1080p mp4
# Usage: tools/assemble3d.sh <start_frame> <end_frame> <job_name>

set -euo pipefail

cd "$(dirname "$0")/../out"
mkdir -p seg3d

FIRST=$1
LAST=$2
JOB_NAME=$3
FRAME_DIR="frames3d/$JOB_NAME"
N=$(( LAST - FIRST + 1 ))
HAVE=$(ls "$FRAME_DIR" 2>/dev/null | wc -l)

[ "$HAVE" -ge "$N" ] || { echo "MISSING frames in $FRAME_DIR: $HAVE of $N"; exit 1; }

first=$(ls "$FRAME_DIR" | sort | head -1 || true)
pad=$(( ${#first} - 13 ))

ffmpeg -v error -y -framerate 30 -start_number $FIRST -i "$FRAME_DIR/element-%0${pad}d.jpeg" -frames:v $N -c:v libx264 -crf 16 -preset medium -pix_fmt yuv420p -r 30 seg3d/final.mp4

ffmpeg -v error -y -i seg3d/final.mp4 -i ../public/mix.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 256k -ar 48000 -af volume=-0.6dB -movflags +faststart -shortest epoch_1080p.mp4
ffprobe -v error -count_frames -select_streams v -show_entries stream=nb_read_frames,width,height -show_entries format=duration -of compact epoch_1080p.mp4
