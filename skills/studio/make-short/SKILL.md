---
name: make-short
description: Write Epoch Archive Studios Shorts and Instagram Reels (show "असली सीन", narrated by the wolf SUTRADHAR, 2D noir graphic-novel cartoon look) for one Indian city - about 60-70 s Hindi script with the fixed hook, brand intro, viewer lines, comment question, next-city teaser and follow line, one shot per narration line with directed camera angles, prompts from the repo prompt library, clean ElevenLabs text and publish copy. Use when the owner types /make-short <city>, asks for Shorts or Reels, or edits an existing Short.
---

# /make-short <city>

Shorts-first mode (`config/decisions.md`). Output only in `shorts/<slug>/`. Never publish or upload.

Read first: `config/channel.json` (`voice`, `show`, `shorts_template`), `config/decisions.md`, `prompts/library.json`, `config/style-guide.md`, `tracker/videos.csv`, `research/<slug>/sources.md`. No research yet: run `city-research` first. Use the `cinematic-director` skill for shot planning (vertical grammar, size ladder, one move per clip, end states) and `character-consistency` for any new recurring character.

## 1. Pick 2-3 Short topics
Self-contained, own hook, surprising payoff. Only `verified`, `disputed` (both views) or `legend` ("कहते हैं") facts.

## 2. Script: fixed order (default, enforced by the build)
1. **Hook (0-3 s)**, 1-2 lines. Never start with the welcome.
2. **Brand intro**, two lines from `shorts_template.intro_line` (`@intro1`, `@intro2` in the JSON): "स्वागत है, असली सीन के <ordinal> एपिसोड में।" / "मैं आपका भिड़ू, और आज की कहानी, <city> की।" Episode = position of the Short in posting order across all cities (check `shorts/SCHEDULE.md`).
3. **Story**, fact ID on every claim, a turn every few lines ("लेकिन ट्विस्ट यहाँ है।" as a narrator cut-in).
4. **Viewer line** (40-60%): talks to the viewer.
5. **Payoff**.
6. **Comment question** + "कमेंट में लिखिए/बताइए।"
7. **Outro** (owner's default, two lines, always the same): `@follow` "ऐसी ही अनसुनी कहानियों के लिए, फ़ॉलो कीजिए।" then `@cityask` "और कमेंट में बताइए, अगली कहानी किस शहर की हो?" No next-story or next-city teaser. Shots: `map_present` (markers glowing on cities across India) then `sign_off`.

Length 150-170 spoken words (build warns outside 140-175). One line = 1-18 words.

## 3. Shots: one narration line = one shot
- Look: 2D noir graphic-novel cartoon only (`prompts/library.json` -> `style`). Never write claymation, 3D or photoreal words into a shot.
- New characters: write them in the owner's format (`Ultra-detailed 2D digital cartoon portrait of <ID>` + framing, EYES, FUR or SKIN AND HAIR, EXPRESSION, CLOTHING, TECHNICAL, BUILD) as `blocks` in the library; the build makes the close-up and sheet prompts.
- Story lines show **people as people** (generic period figures; recurring ones defined in `prompts/library.json` -> `characters`, scoped to the city).
- **SUTRADHAR**, the wolf narrator, appears on the brand intro, twist cut-ins, viewer lines, comment ask and outro. Use the shot bank `narrator_shots` (shots.json key `"narrator"`) (walk_in, scroll_reveal, cut_in_finger, lean_in_question, point_at_viewer, touch_diorama, eye_ecu, map_tap_ots, walk_off). Never the same template twice in a row; vary walking, touching, pointing, close-ups.
- Every shot has `size` (EWS/WS/MS/MCU/CU/ECU), `angle` (eye/low/high/top/ots/profile/dutch), `asset` (clip or still), a scene line, and a motion line with a start, one move and an **end state**.
- Adjacent shots: change size by 2 steps or change angle (build warns). Vertical: face in the upper-middle third, stage in depth, keep top 12% / bottom 20% clear.
- Clips for the narrator and key action beats; stills (edit adds a slow push/pan) where nothing needs to move. Aim for about 15 clips per Short to save Flow credits.
- Lip-sync: when SUTRADHAR is on screen with his face visible and says the line, the shot speaks (narrator templates with `speaks: true`, or `"speaks": true` on a custom shot). The Flow prompt carries his exact line as `{dialogue}` with a voice-only audio line; `assemble-short.mjs` mutes Flow's voice and retimes the clip so his mouth matches the ElevenLabs line (needs `speech_start/speech_end` from `time-voice.mjs`). Shots where his face is hidden (back, eye close-up, paw) keep his mouth closed. Story shots never speak.
- Character consistency (default): every shot that shows a character gets, verbatim and automatically from the library: the reference sheet to attach, the role line, the scene_tag and the `lock`. The per-character sheet file is `prompts/characters/<ID>/CHARACTER.md` (built). Never hand-write character details into a shot.
- Character placeholders in prompts: `{SUTRADHAR}`, `{MUMBAI_KING}` etc. Never retype a character description; the build inserts the library version.

## 4. Files
- Write `shorts/<slug>/shorts.json` (see `shorts/mumbai/shorts.json` for the shape: city, next_city, shorts[] with id, episode, title, hook_onscreen, twist, teaser, shots[], publish{yt_titles, yt_description, ig_caption}).
- New recurring character: add it to `prompts/library.json` with full identity fields, bump `library_version`, log it in `prompts/CHANGELOG.md`, create `prompts/characters/<ID>/`.
- Give every shot a `goal` (one English sentence: what the shot does for the story) and `sfx` (ambient sounds tied to the visible action) for the Flow pack.
- Run `node tools/build-shorts.mjs <slug>`. Fix every warning. It writes per Short: `<id>.md` (script, voice text, shot list, publish copy) and `<id>-flow.md` (paste-ready Google Flow prompts: mode, attachments, Generation Goal / Reference roles / Subjects / Event Script / Camera / Audio 'No music, no speech.' / Consistency), plus `prompts/LIBRARY.md`.
- Flow prompt craft follows the `video-prompt-director` rules: positive states instead of negations, one primary change per stage with an end state, references reinforced in words, audio as its own line.
- Update `shorts/SCHEDULE.md` (default 18:00 IST, 2-3 a week), `shorts/<slug>/CREDITS.md`, `tracker/videos.csv`. New owner decisions go in `config/decisions.md`.
- When the owner reports a better prompt or a new reference image: update the library (version + changelog) and rebuild. The library always holds the latest best prompt.

## 5. After Gate 1: production (see `shorts/WORKFLOW.md`)
1. Owner makes the ElevenLabs voice from `<id>-voice.txt` (one take, one line per line) -> `assets/<slug>/shorts/<id>/voice.mp3`.
2. `node tools/time-voice.mjs <slug> <id>` measures every line from the pauses (segmentation against word counts and '...' marks). Fix every warning: total over 70 s, a line over 8 s (split it), uncertain cuts (listen). Never adjust the script silently; agree cuts with the owner.
3. `node tools/build-shorts.mjs <slug>` again: the Flow pack now shows measured seconds.
4. Owner generates the Flow shots and saves them by shot id in `assets/<slug>/shorts/<id>/`.
5. `node tools/assemble-short.mjs <slug> <id> --preview`, then without `--preview`. Report missing shots and held frames.

## GATE 1 - STOP (script)
Show the owner, in under 15 lines: each Short's hook, word count and timing, shot and clip count, the twist, the teaser, and any disputed/legend flags. Wait for "approved" or edits.

## GATE 2 - STOP (render)
Give the owner the render path, measured length, and any missing shots or held frames. Wait for "approved" or notes; redo only affected shots.
