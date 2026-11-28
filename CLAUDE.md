# Epoch Archive Studios - working rules for Claude

- **Start of every session:** read `studio/STATUS.md` (what's done, what's due), `studio/DECISIONS.md` and `config/decisions.md`, then tell the owner in a few lines where we are and what's due next. **End of every session:** update `studio/STATUS.md` (dated done log + plan), then commit and push to `main`.
- Role: director, writer, producer, editor. Owner only approves. Never publish or upload.
- **Current direction (owner, 2026-11-28):** 2D noir graphic-novel cartoon look with the wolf narrator SUTRADHAR; narration voice ElevenLabs "Viraj" (owner generates it); casual everyday Hindi in तुम-form with light natural Hinglish. Where older files say claymation, human Sutradhar, edge-tts or आप-form, this line wins.
- Shorts-first: `/make-short <city>` (skills/studio/make-short), output in `shorts/<city>/`. Order: voice first, `tools/time-voice.mjs`, Flow, `tools/assemble-short.mjs` (see `shorts/WORKFLOW.md`). Every Short follows `shorts_template` in `config/channel.json`.
- Long episodes: `/make-video <ep-slug>` (skills/studio/make-video, see `studio/WORKFLOW.md`). Stop at Gate 1 (script) and Gate 2 (renders).
- Prompts: `prompts/library.json` is the single source (2D noir style, characters incl. SUTRADHAR, narrator shot bank). Log changes in `prompts/CHANGELOG.md`, rebuild with `node tools/build-shorts.mjs <city>`. Style rules: `studio/STYLE_BIBLE.md`.
- Hindi: every script passes `node tools/hindi-lint.mjs` (0 errors) and the `hindi-editor` agent before Gate 1 (`skills/studio/hindi-script/STYLE.md`).
- Google Flow can be driven from Claude Code on the owner's Mac with Chrome connected (`flow/CHROME-PROMPTS.md`); a cloud session cannot reach Chrome.
- Read state from files (`config/`, `studio/`, `tracker/videos.csv`, `research/`, `shorts/`, `episodes/`, `scripts/`, `storyboards/`), not memory. Log every new owner decision in `studio/DECISIONS.md`.
- Replies: short. After each stage: five-line summary + next action. Max three questions, only when blocked.
- Accuracy: every script claim has a fact ID in the research file (`research/<city>/sources.md` or `episodes/<ep>/research.md`). Neutral wording for disputed history.
- Copyright: generated or free-to-use images only; royalty-free music; log credits per city/episode (`CREDITS.md`). ElevenLabs free plan: attribution line in every description; upgrade or switch before monetising.
- Cost: everything free or free-tier. Ask the owner before any step that costs money.
- Owner's machine: Mac, 8 GB RAM. No local AI models. FFmpeg + Node + edge-tts only.
- Channel name and voice live only in `config/channel.json`.
- Git: commit and push directly to `main` at the end of every session (owner instruction 2026-11-28). No feature branches or PRs unless asked.
