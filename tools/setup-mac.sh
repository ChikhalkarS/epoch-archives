#!/usr/bin/env bash
# One-time setup on the owner's Mac. All free. Needs Homebrew (https://brew.sh).
set -euo pipefail
brew install ffmpeg node pipx
pipx ensurepath
pipx install edge-tts
pipx install gTTS
echo "Done. Test: node tools/voice.mjs <slug>  (after a storyboard exists)"
