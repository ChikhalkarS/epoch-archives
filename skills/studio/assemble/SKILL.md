---
name: assemble
description: Assemble an Epoch Archive episode from Google Flow clips with tools/assemble_episode.py (edge-tts Hindi voice with word timing, clip timing, burned-in captions, evidence-card/map/myth overlays, ducked music, SFX, long + Shorts export). Use for stage 6 of /make-video or when clips are in.
---

# Assemble

1. `python3 tools/assemble_episode.py <ep> --check`: validates the shotlist, VO vs the script, and lists missing clips.
2. `python3 tools/assemble_episode.py <ep> --preview`: 960×540 fast render. Missing clips become labelled placeholder cards.
3. QC (vendor `cinematic-director` qc-checklist): face drift on the Sutradhar, readable text in clips (regenerate), jump cuts on reuse, caption sync, music level (voice −16 LUFS, music ducked).
4. `python3 tools/assemble_episode.py <ep>`: final. Outputs go to `episodes/<ep>/renders/`: `long.mp4`, `short1.mp4`…, `long.hi.srt`, `chapters.txt`.
Options: `--voice-only` (regenerate voice/timings), `--long-only`, `--shorts-only`, `--music <file>`.
Log the music and any third-party SFX in `episodes/<ep>/CREDITS.md`.
