---
name: make-video
description: Run the Epoch Archive Studios production pipeline for one Indian city - research, Hindi script, owner gate, storyboard, voiceover, visuals, assembly of long video and Shorts, owner gate, publish pack. Use when the owner types /make-video <city> or asks to produce, continue or resume a city episode.
argument-hint: "<city> [from <stage>]"
---

# /make-video <city>

You are the studio's director, writer, producer and editor. The owner only approves. Work from files, keep replies short (five-line summary + next action after each stage). Never publish anything.

`<slug>` = city in lowercase, dashes (e.g. `bhopal`). Read first: `config/channel.json`, `config/style-guide.md`, `tracker/videos.csv` row for the slug. Resume from the tracker status unless the owner says `from <stage>`.

Shorts-first mode (current, see `config/decisions.md`): for Shorts/Reels use the `make-short` skill instead; it writes to `shorts/<slug>/`.

Update `tracker/videos.csv` (status, updated, notes) at the end of every stage.

## Stage 1 - Research -> status `researched`
Follow `skills/studio/city-research/SKILL.md`. Output `research/<slug>/sources.md` and `research/<slug>/notes.md` from `research/_template/`. Never invent history. Flag anything disputed, legendary or unverified.

## Stage 2 - Script -> status `scripted`
Follow `skills/studio/hindi-script/SKILL.md` (and the vendor `scriptwriting` skill for hooks and retention craft). Output `scripts/<slug>.md`. Then `node tools/hindi-lint.mjs scripts/<slug>.md` and the `hindi-editor` agent (natural Hindi + voice markup) before Gate 1.

## GATE 1 - STOP
Show the owner, in under 15 lines: the hook line, the 5-7 beat arc, runtime estimate, the twist, the outro teaser, and every disputed/legend flag. Wait for "approved" or edits. Do not continue without approval. Record `gate1=approved` in tracker notes.

## Stage 3 - Storyboard
Run `node tools/split-script.mjs <slug>` to cut the script into scenes, then fill each scene's `prompt` (scene line only; the style prefix/suffix is added by `node tools/prompts.mjs <slug>`, which writes `assets/<slug>/PROMPTS.md` and `storyboards/<slug>.md`). Use `"reuse": "s19"` to show another scene's image with a new motion (cuts image work), and `"short_only": true` scenes for a Short's own hook/outro. Use the `cinematic-director` skill for shot thinking and `character-consistency` for the wolf narrator (SUTRADHAR). Look and prompts: `prompts/library.json`. JSON format:
```json
{ "slug": "bhopal", "music": "assets/music/<file>.mp3",
  "scenes": [ { "id": "s01", "chapter": "Hook", "motion": "zoom-in", "type": "image|clip",
                "vo": "<exact Hindi narration for this scene>", "prompt": "<PREFIX + scene + SUFFIX>", "sources": ["F1"] } ],
  "shorts": [ { "id": "short1", "scenes": ["s01","s05","s06"], "mode": "blur|fill", "hook": "<on-screen hook text>" } ] }
```
Rules: one scene = one visual = 4 to 8 s of narration (about 12 to 25 Hindi words). `vo` across scenes must equal the approved script word for word. Max 5 scenes of `type: clip`. Each Short is 30-55 s, starts with its own hook, and stands alone. `motion`: zoom-in, zoom-out, pan-left, pan-right, static.

## Stage 4 - Voiceover -> status `voiced`
`node tools/voice.mjs <slug>`. Report total minutes. If outside 8-12 min, adjust the script with the owner, not silently.

## Stage 5 - Visuals -> status `visuals`
Google Flow is the main tool. Add the city's ingredients to `flow/library/ingredients.json` (reuse global ones), then `node tools/flow-pack.mjs <slug> short1|long|stills` and hand the owner `flow/CHROME-PROMPTS.md` (A, B, C) to run in Claude Code with Chrome on the Mac. See `flow/README.md`.
Images go to `assets/<slug>/images/<sceneId>.png`, clips to `assets/<slug>/clips/<sceneId>.mp4`. Write `assets/<slug>/PROMPTS.md`: one block per scene with the full prompt, ready to paste into the free tools in `config/style-guide.md`. If no image tool is reachable from the session, hand the owner PROMPTS.md and wait for files; render with placeholders meanwhile. Log every image/clip/music source and licence in `assets/<slug>/CREDITS.md`. Ask before anything that costs money.

## Stage 6 - Assembly -> status `rendered`
1. `node tools/assemble.mjs <slug> --preview` and check durations/warnings.
2. `node tools/assemble.mjs <slug>` for the final.
Outputs in `renders/<slug>/`: `<slug>-long.mp4`, `<slug>-short1.mp4`..., `<slug>-long.hi.srt`, `<slug>-chapters.txt`.

## GATE 2 - STOP
Give the owner the render paths, durations, and the list of placeholder scenes (if any). Wait for "approved" or notes. Notes -> fix and re-render only affected parts. Record `gate2=approved`, status `approved`.

## Stage 7 - Publish pack
Write `publish/<slug>.md`:
- 3 title options (Hindi + English keywords, under 70 chars, curiosity first). Example: `भोपाल में इतनी झीलें क्यों? | Bhopal History in Hindi`
- Description: 2-line hook, summary, chapters (from `renders/<slug>/<slug>-chapters.txt`), sources list (short), credits (music/images), 3 hashtags.
- Tags (15-20, Hindi + English + Hinglish).
- 3 thumbnail concepts: image prompt (style-guide prefix) + 3-4 word text + layout.
- One title + description + hashtags per Short.
Status stays `approved`; the owner uploads and changes it to `uploaded`.
