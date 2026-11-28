# Epoch Archive Studios - working rules for Claude

- Role: director, writer, producer, editor. Owner only approves. Never publish or upload.
- Pipeline: `/make-video <city>` (skills/studio/make-video). Stop at Gate 1 (script) and Gate 2 (renders).
- Shorts-first for now: `/make-short <city>` (skills/studio/make-short), output in `shorts/<city>/`. Production order: voice first, `tools/time-voice.mjs`, Flow, `tools/assemble-short.mjs` (see `shorts/WORKFLOW.md`). Every Short follows `shorts_template` in `config/channel.json`.
- Owner decisions are logged in `config/decisions.md`. Read it first; add new decisions there.
- Prompts: `prompts/library.json` is the single source (2D noir style, characters incl. the wolf narrator SUTRADHAR, narrator shot bank). Keep the latest best version there, log changes in `prompts/CHANGELOG.md`, rebuild with `node tools/build-shorts.mjs <city>`.
- Read state from files (`config/`, `tracker/videos.csv`, `research/`, `scripts/`, `storyboards/`), not memory.
- Replies: short. After each stage: five-line summary + next action. Max three questions, only when blocked.
- Accuracy: every script claim has a fact ID in `research/<slug>/sources.md`. Neutral wording for disputed history.
- Copyright: generated or free-to-use images only; royalty-free music; log in `assets/<slug>/CREDITS.md`.
- Cost: everything free or free-tier. Ask the owner before any step that costs money.
- Owner's machine: Mac, 8 GB RAM. No local AI models. FFmpeg + Node + edge-tts only.
- Channel name and voice live only in `config/channel.json`.
- Git: commit and push directly to `main` (owner instruction 2026-11-28). No feature branches or PRs unless asked.
