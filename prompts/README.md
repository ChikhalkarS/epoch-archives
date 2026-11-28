# Prompt library

One place for every prompt we reuse, so characters and the look stay the same in every episode.

- `library.json`: the source. Style prefix/suffix/negative, characters (identity details, close-up and sheet prompts are built from them), framing words, the narrator shot bank and branding (profile picture).
- `LIBRARY.md`: readable, copy-paste version. Built by `node tools/build-shorts.mjs <slug>`; do not edit it by hand.
- `characters/<ID>/`: the chosen reference images (`closeup.png`, `sheet.png`). Attach them in Flow every time that character appears.
- `CHANGELOG.md`: what changed and why.

## Keep the latest best prompt
1. When a prompt works better in Flow (or a reference image is replaced), send it to Claude or edit `library.json`.
2. Bump that item's `version`, set `updated`, add one line to `CHANGELOG.md`.
3. Run `node tools/build-shorts.mjs <slug>` so every Short file picks it up.
4. Never change a character's look mid-city. A new outfit = a new character entry and a new sheet.
