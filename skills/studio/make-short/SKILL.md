---
name: make-short
description: Write Epoch Archive Studios Shorts and Instagram Reels for one Indian city - about 60 s Hindi script with the channel's fixed hook, brand intro, viewer interaction, comment question, next-city teaser and follow line, plus clean ElevenLabs text, Google Flow scene prompts and publish copy. Use when the owner types /make-short <city>, asks for Shorts or Reels, or edits an existing Short.
---

# /make-short <city>

Shorts-first mode (see `config/decisions.md`). Output goes only to `shorts/<slug>/`. Never publish or upload.

Read first: `config/channel.json` (`voice`, `shorts_template`), `config/decisions.md`, `config/style-guide.md`, `tracker/videos.csv`, `research/<slug>/sources.md`. If there is no research yet, run the `city-research` skill first.

## 1. Pick 2-3 Short topics
Each one self-contained, with its own hook and a surprising payoff. Use only `verified`, `disputed` (both views) or `legend` ("कहते हैं") facts.

## 2. Script every Short with this fixed order (default, do not skip)
1. **Hook (0-3 s)**: shock line or question, 5-12 words. Never start with the welcome.
2. **Brand intro (3-6 s)**: `shorts_template.intro_line` with the city name, e.g. "नमस्ते, एपॉक आर्काइव्स में आपका स्वागत है। आज की कहानी, मुंबई की।"
3. **Story**: one idea per scene (5-6 s, 10-20 words), fact ID after each claim. A turn ("लेकिन ट्विस्ट यहाँ है...") every 2-3 scenes.
4. **Mid interaction (40-60%)**: one line that speaks to the viewer ("सोचिए, आप राजा होते, तो क्या करते?", "अगर आप <city> से हैं...").
5. **Payoff**: answer the hook.
6. **Comment question**: easy to answer in a word or a number.
7. **Next teaser**: name what comes next. Not the last Short of the city: next Short's topic + "और फिर चलेंगे, <next city>". Last Short of the city: the next city from the tracker, one curiosity line.
8. **Follow line**: `shorts_template.follow_line`, joined to the teaser (one ask only).

Length: 140-165 spoken words (about 60 s at speed 1.1-1.15). Count words without fact IDs, audio tags or "...". Hindi rules from the `hindi-script` skill (simple Hindustani, years in words).

## 3. File per Short: `shorts/<slug>/shortN-<topic>.md`
Sections, in order:
- Header: format, word count, timing, status `waiting on Gate 1`
- Voice settings (from `config/channel.json`)
- On-screen hook (≤ 6 words)
- Narration with fact IDs (for checking; every line, or "(viewer line, no fact)")
- ElevenLabs text (paste-ready): no fact IDs; v3 audio tags allowed sparingly ([excited], [curious], [whispers], [sighs]); "..." for pauses
- Characters: clay people only (no animal characters). The Sutradhar (style guide) in the brand-intro scene and the outro scene; one reference prompt per recurring historical figure, generic likeness, names only in captions
- Scenes: one per sentence group, each with on-screen text, VO, full prompt = style-guide PREFIX + scene + vertical SUFFIX, and a motion line for Flow/Veo clips
- Edit notes: captions (Mukta / Noto Sans Devanagari), big numbers, royalty-free music at ~12%, loopable last frame
- Publish pack: 2 YouTube Shorts titles, description with short sources line and 3 hashtags, Instagram caption ending with the comment question and hashtags

## 4. Bookkeeping
- `shorts/SCHEDULE.md`: date and time (default 18:00 IST, 2-3 Shorts a week).
- `shorts/<slug>/CREDITS.md`: voice, visual tool, music and licence.
- `tracker/videos.csv`: status and notes for the city.
- New owner decisions go in `config/decisions.md`.

## GATE - STOP
Show the owner, in under 15 lines: each Short's hook, word count, timing, the twist, the teaser, and any disputed/legend flags. Wait for "approved" or edits.
