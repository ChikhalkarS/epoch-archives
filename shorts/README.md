# Shorts & Reels (current focus)

Show: **असली सीन**, narrated by the wolf (**SUTRADHAR**, introduces himself as भेड़िया). Look: 2D noir graphic-novel cartoon. Long videos come later from `scripts/`.

- Source per city: `shorts/<city>/shorts.json` (lines, fact IDs, shots). One narration line = one shot.
- Build: `node tools/build-shorts.mjs <city>` writes per Short `shortN-<topic>.md` (ElevenLabs text, shot list, publish copy) and `shortN-<topic>-flow.md` (paste-ready Google Flow prompts per shot) and refreshes `prompts/LIBRARY.md`. Do not edit the `.md` files by hand.
- Prompts come only from `prompts/library.json`. Reference images: `prompts/characters/<ID>/`.
- Structure (default, enforced by the build): hook, brand intro, story, viewer line, payoff, comment question, next teaser, follow line. See `config/channel.json` -> `shorts_template`.
- Step-by-step for the owner (voice first, measure, Flow, assemble): `shorts/WORKFLOW.md`.
- Tools: `tools/time-voice.mjs` (measures each line in the ElevenLabs take), `tools/assemble-short.mjs` (cuts the Flow shots to the voice, adds captions, ambient, music, -14 LUFS).
- Format: 1080x1920, about 60-70 s. Music and visual credits: `shorts/<city>/CREDITS.md`. Schedule: `shorts/SCHEDULE.md`.
