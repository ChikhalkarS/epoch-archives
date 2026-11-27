# Shorts & Reels (current focus)

Show: **असली सीन**, narrated by **भेड़िया** (Bhediya). Long videos come later from `scripts/`.

- Source per city: `shorts/<city>/shorts.json` (lines, fact IDs, shots). One narration line = one shot.
- Build: `node tools/build-shorts.mjs <city>` writes one `shortN-<topic>.md` per Short (ElevenLabs text, shot list, image + motion prompts, publish copy) and refreshes `prompts/LIBRARY.md`. Do not edit the `.md` files by hand.
- Prompts come only from `prompts/library.json`. Reference images: `prompts/characters/<ID>/`.
- Structure (default, enforced by the build): hook, brand intro, story, viewer line, payoff, comment question, next teaser, follow line. See `config/channel.json` -> `shorts_template`.
- Format: 1080x1920, about 60-70 s. Music and visual credits: `shorts/<city>/CREDITS.md`. Schedule: `shorts/SCHEDULE.md`.
