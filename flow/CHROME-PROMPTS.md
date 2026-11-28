# Claude in Chrome: Google Flow prompts (2D noir pipeline)

Run in **Claude Code on the Mac**, in `~/epoch-archives`, with Chrome connected (`claude --chrome`, or `/chrome` in a session). A cloud session cannot see your Chrome.

Each Short has its own ready-made file with these prompts filled in: `shorts/<city>/NEXT-STEPS.md` (example: `shorts/akola/NEXT-STEPS.md`). Use that. The generic versions:

1. **Test (no credits):** open labs.google/flow, report login, projects and where the prompt box, aspect ratio, modes and upload button are. Generate nothing.
2. **Library images (once):** project "Archive Files - Library". Make only the missing ones from `prompts/LIBRARY.md`: style key → `prompts/style/style-key.png`, then each needed character sheet → `prompts/characters/<ID>/sheet.png` (style key attached). Wait for the owner's pick each time. Commit and push the PNGs.
3. **Shots:** project "फ़ाइल 00N - <City>", 9:16. Follow `shorts/<city>/<short-id>-flow.md` shot by shot: mode from the heading, attachments in the listed order (style key first, max 3), paste the prompt box exactly, one take, wait for keep/redo, save as `assets/<city>/shorts/<short-id>/<shot-id>.mp4|.png`. Skip shots already on disk. Cap generations per run; stop on errors, policy blocks, credit warnings or payment screens.
4. **Preview:** `node tools/assemble-short.mjs <city> <short-id> --preview`, report length, missing shots, held frames. Final only after Gate 2.

Always: never buy credits, never publish or share from Flow, 2D noir only, respect rules from `studio/PLAYBOOK.md`.

(The earlier claymation ingredient library in `flow/library/` is superseded by `prompts/library.json` and kept only as history.)
