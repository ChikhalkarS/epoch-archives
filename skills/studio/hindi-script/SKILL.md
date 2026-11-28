---
name: hindi-script
description: Write Hindi (Devanagari) narration scripts for Epoch Archive Studios city-history videos and Shorts, with a 5-second hook question, retention structure and source tags on every claim. Use for stage 2 of /make-video or when the owner asks for a Hindi script.
---

# Hindi script

Input: `research/<slug>/sources.md` + `notes.md`. Output: `scripts/<slug>.md`.

## Language
- **Follow `STYLE.md` in this folder** (natural flow, commas, grammar, nukta, voice markup). The draft must read like a native Hindi storyteller, not a translation.
- Devanagari, simple spoken Hindustani that a 14-year-old understands. Natural sentences of varied length (mostly 8-18 words); fragments only for drama, max 2 per beat.
- Use everyday words: "शहर", "राजा", "लड़ाई", "व्यापार". Avoid heavy Sanskrit/Persian unless explained.
- Numbers as words where the TTS reads them better (e.g. "सत्रह सौ सत्ताईस" or "1727" - test once per voice and note in channel.json).
- Write for the ear: questions, "सोचिए...", "अब यहाँ कहानी पलटती है...". No lists read aloud.

## Structure (8-12 min ≈ 1,000-1,400 Hindi words; Madhur at -5% measured ≈ 119 words/min)
1. **Hook (0-5 s)**: one curiosity question. Example: "क्या आप जानते हैं, इस शहर में इतनी झीलें क्यों हैं?"
2. **Promise (5-30 s)**: what we will find out + a hint of the twist. No channel intro, no "like and subscribe" here.
3. **Beats (5-7)**: founding -> rise -> conflict -> twist -> change -> today. Each beat ends with an open loop.
4. **Twist** around 40-60% of runtime.
5. **Outro (last 30-45 s)**: a question for comments + teaser for the next city + one-line subscribe ask.

## Accuracy
- After every factual sentence put the fact ID in brackets: `... बड़ा तालाब बना। [F3]`. These are removed from the narration text in the storyboard.
- Disputed: "कुछ इतिहासकार मानते हैं..., जबकि दूसरे कहते हैं...". Legend: "कहते हैं..." / "लोक-कथा के अनुसार...".
- Never state an unverified fact. Never invent dialogue for real people; use "शायद" only with a source that says so.

## Polish and voice (required before Gate 1)
1. `node tools/hindi-lint.mjs scripts/<slug>.md` - fix every ERROR.
2. Run the `hindi-editor` agent (`.claude/agents/hindi-editor.md`) on the script. It rewrites for natural Hindi, adds voice markup (`[रुकें]`, `{role} “...”`, `{धीमे}`) and writes `scripts/<slug>.hindi-review.md`.
3. Check its result: same `[F#]` IDs per beat, no new facts, lint 0 errors. Then show Gate 1.

## Shorts and Reels
Use the fixed order in `config/channel.json` -> `shorts_template` (hook, brand intro, story, mid interaction, payoff, comment question, next teaser, follow line). Full rules in the `make-short` skill.

## File format (`scripts/<slug>.md`)
```
# <City> - <working title>
Runtime target: X min | Words: N | Next city: <slug>
## Hook
## Promise
## Beat 1 - <name>
...
## Outro
## Short candidates (2-3): beat/lines, why it works alone, its own hook
## Flags for owner
```
