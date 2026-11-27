# Making a Short, step by step (owner)

Claude writes everything in steps 0, 2 and 5; you do steps 1, 3 and 4 in ElevenLabs and Flow. Terminal commands run on the Mac in the repo folder.

## 0. Claude: script + prompts (Gate 1)
`shorts/<city>/<short-id>.md` (script, shot list, publish copy), `<short-id>-voice.txt` (voice text), `<short-id>-flow.md` (Flow prompts). Approve or send changes.

## 1. You: voice FIRST (ElevenLabs)
Voice comes first because it decides how long every shot is.
1. Model **v3**, voice **Viraj**, stability **Natural** (audio tags work best there), speed **1.1-1.15**.
2. Paste the whole `<short-id>-voice.txt` as **one** generation. Keep one line per line: every line break becomes a pause, and the tools use those pauses to find where each shot starts. Do not paste the `[F#]` fact tags (the voice file has none).
3. If a tag like `[whispers]` sounds wrong, delete it and regenerate. Listen once end to end.
4. Apply the old-radio filter, download **MP3**, save as `assets/<city>/shorts/<short-id>/voice.mp3`.

## 2. Measure the voice (30 seconds)
```bash
node tools/time-voice.mjs <city> <short-id>
node tools/build-shorts.mjs <city>
```
The first command prints every line's real start and length and warns if the total is over the limit (75 s, `config/channel.json`), a line is longer than one 8 s Flow clip, or a cut point is uncertain. The second rewrites the Flow file with the **measured** seconds per shot. Over the limit: tell Claude, or regenerate the voice slightly faster.

## 3. You: visuals (Google Flow)
Open `<short-id>-flow.md`.
1. Character sheets first (once per character, reused every episode): prompts in `prompts/LIBRARY.md`, save to `prompts/characters/<ID>/sheet.png`.
2. Settings: 9:16 portrait. For each shot use the mode it says (Ingredients / Text / Image), attach the listed sheets, paste the prompt in the box.
3. Make 2-4 takes, keep the best. Save as `assets/<city>/shorts/<short-id>/<shot-id>.mp4` (clips) or `.png` (stills), e.g. `short1-s03.mp4`.
4. Sync: the narration is voice-over. Flow clips carry no speech and Sutradhar's mouth stays closed; the assembly lines every clip up with its line.
5. You do not need to trim anything: the assembly cuts each clip to its line. A clip shorter than its line holds its last frame.

## 4. Optional: music
Royalty-free bed (YouTube Audio Library / Pixabay) saved as `assets/<city>/shorts/<short-id>/music.mp3`. Log it in `shorts/<city>/CREDITS.md`.

## 5. Assemble (Claude or you)
```bash
node tools/assemble-short.mjs <city> <short-id> --preview   # fast 540x960 check, missing shots show as labelled cards
node tools/assemble-short.mjs <city> <short-id>             # final 1080x1920
```
Output: `renders/<city>/shorts/<short-id>.mp4` + `.srt`. The voice runs at full level, each clip's own sound at 20% for atmosphere, music at 12%, then the mix is levelled to -14 LUFS (YouTube/Instagram loudness). Hindi captions (2-4 words at a time) and the on-screen labels are burned in, inside the safe zone. Cuts land on the voice pauses, within one frame.

## 6. Gate 2
Watch the final. Notes go to Claude; only the affected shots get redone. Then upload with the publish copy from `<short-id>.md` (Audience: "No, it's not made for kids").
