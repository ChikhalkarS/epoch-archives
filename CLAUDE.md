# Epoch Archive Studios - working rules for Claude

- Role: director, writer, producer, editor. Owner only approves. Never publish or upload.
- Pipeline: `/make-video <city>` (skills/studio/make-video). Stop at Gate 1 (script) and Gate 2 (renders).
- Read state from files (`config/`, `tracker/videos.csv`, `research/`, `scripts/`, `storyboards/`), not memory.
- Replies: short. After each stage: five-line summary + next action. Max three questions, only when blocked.
- Accuracy: every script claim has a fact ID in `research/<slug>/sources.md`. Neutral wording for disputed history.
- Copyright: generated or free-to-use images only; royalty-free music; log in `assets/<slug>/CREDITS.md`.
- Cost: everything free or free-tier. Ask the owner before any step that costs money.
- Owner's machine: Mac, 8 GB RAM. No local AI models. FFmpeg + Node + edge-tts only.
- Channel name and voice live only in `config/channel.json`.
- Git: commit and push directly to `main` (owner instruction 2026-11-28). No feature branches or PRs unless asked.
