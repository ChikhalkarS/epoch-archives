# Channel playbook: how we make every video from now on

**This page is the current rulebook. Read it before any work. If an older file says something different, this page wins.**
Every new owner decision: add a dated row to `studio/DECISIONS.md` **and** update the matching section here in the same commit.
Last updated: 2026-11-28 (decisions 30-35).

## 1. Brand
| Item | Rule |
|---|---|
| Channel | Epoch Archive. Spoken brand: **आर्काइव फ़ाइल्स**. YouTube: "Wolfy Files", @BhediyaFiles (name to align, see Open) |
| Numbering | Every published video is a **file**: **फ़ाइल 001, 002, 003…**, one continuous count across Shorts and long videos, in posting order. Spoken "फ़ाइल नंबर दो", shown "फ़ाइल 002" |
| Dropped | "असली सीन" as a show/format name (2026-11-28). Not in intros, titles, captions or hashtags |
| Host | **SUTRADHAR**, the wolf narrator (Indian grey wolf, brass spectacles, maroon bandhgala, indigo stole). Design only in `prompts/library.json` |
| Niche | Hidden stories behind Indian cities first (then wars, leaders, numbers, empires), told like a mystery, every claim sourced |

## 2. Brand values (what we never compromise)
1. **True and sourced.** Every claim has a fact ID. Legends are told as legends ("कहते हैं", "लोक-कथा"), disputes give both sides.
2. **Curious, not sensational.** Mystery tone, but no fake shock, no invented numbers or dialogue for real people.
3. **Respect.** Faiths, temples, deities, communities shown with reverence; no caricature, no stereotypes, no gore (symbols instead).
4. **Casual but careful.** Friendly तुम-form Hindi, never careless with facts or mocking anyone.
5. **Original look.** Our own characters and style; never copy another channel's characters, art or labels.
6. **Free first.** Free or free-tier tools; the owner approves any cost.

## 3. Video formats
**Shorts / Reels (current focus)**
- 9:16, 1080x1920, about 60-75 s, **150-175 spoken words**, one narration line = one shot (1-18 words), about 15 Flow clips + stills.
- Fixed order: **Hook** (0-3 s, never the welcome) → **Intro**: "स्वागत है आर्काइव फ़ाइल्स में, ये है फ़ाइल नंबर <N>।" + "आज की कहानी, <city> की।" → **Story** (a turn every few lines, "लेकिन ट्विस्ट तो यहाँ है।") → **Viewer line** (40-60%) → **Payoff** → **Comment question** + "कमेंट में लिखो" → **Outro**: "ऐसी ही अनसुनी कहानियों के लिए, फ़ॉलो कीजिए।" + "और कमेंट में बताइए, अगली कहानी किस शहर की हो?" (form under review, see Open). No next-city teaser.
- SUTRADHAR on intro, twist cut-ins, viewer line, comment ask and outro (shot bank, never the same template twice in a row). Story shots show people as people.
- Post at **18:00 IST**, order in `shorts/SCHEDULE.md`. Upload as "not made for kids".
- Built with `/make-short <city>` → `shorts/<city>/`.

**Long videos (later)**: 9-10 min, `/make-video <ep-slug>` → `episodes/<ep>/`, same brand, look, voice and file numbering.

## 4. Look (video)
- **2D noir graphic-novel cartoon** only: thick black ink outlines, flat cel colour, amber lamp light vs charcoal/sepia. Never claymation, 3D or photoreal.
- Every prompt: master style first + style anchor last (`prompts/library.json` → `style`). The style key image `prompts/style/style-key.png` is attachment 1 on every shot; max 3 attachments (style key + 2 characters). No Text-to-Video.
- Characters only from the library (sheet + lock line inserted by the build). Never write a character ID in prompt text.
- Vertical framing: face in the upper-middle third, top 12% / bottom 20% clear for captions. Adjacent shots change size by 2 steps or change angle.

## 5. Audio
| Layer | Rule |
|---|---|
| Narration | **ElevenLabs v3, voice "Viraj"**, stability Natural, speed 1.1-1.15, old-radio filter. Owner generates it from `<id>-voice.txt` as one take, one line per line. **Voice first**, then shots |
| Timing | `tools/time-voice.mjs` measures each line; the Flow pack uses the measured seconds |
| Lip-sync | When SUTRADHAR's face is on screen saying his line, Flow gets the exact line; assembly mutes Flow's voice and retimes the clip to the ElevenLabs line |
| Mix | Voice full, Flow ambience 20%, royalty-free music 12%, master -14 LUFS |
| Licence | ElevenLabs FREE plan = non-commercial: attribution "Voice: ElevenLabs (elevenlabs.io)" in every description; upgrade or switch before monetising |
| Captions | Burned-in Hindi, Noto Sans Devanagari Bold (SIL OFL) |

## 6. Language
- **Casual everyday Hindi in तुम-form** (सोचो, देखो, याद रखो, लिखो), light natural Hinglish (ट्विस्ट, सीन, लिस्ट). Simple enough for a 14-year-old.
- Every script passes `node tools/hindi-lint.mjs` with 0 errors and a review by the `hindi-editor` agent before Gate 1 (`skills/studio/hindi-script/STYLE.md`).
- Numbers spoken as words; legend and dispute markers always kept.

## 7. Research and accuracy
- Fact sheet per city: `research/<city>/sources.md` (verified / disputed / legend / unverified; unverified is never used).
- Prefer government, gazetteer, academic, museum and reputable press sources; Wikipedia only as a pointer.

## 8. Production flow and gates
1. Claude: research → script → shots and Flow prompts (`/make-short`). **Gate 1**: owner approves the script.
2. Owner: ElevenLabs voice → Claude measures timing → owner generates Flow shots (or Claude drives Flow from the Mac with Chrome: `flow/CHROME-PROMPTS.md`).
3. Claude: `tools/assemble-short.mjs` → **Gate 2**: owner approves the render → owner uploads with the publish copy.
- Published Shorts are **frozen** (`"published"` in `shorts.json`); their files are never rebuilt or edited.

## 9. Working rules for Claude
- Owner approves; Claude never publishes or uploads.
- Read state from files; start each session with `studio/STATUS.md`, this playbook and `studio/DECISIONS.md`.
- End every session: update `studio/STATUS.md`, commit and **push to `main`**. No branches or PRs unless asked.
- Replies short; max three questions, only when blocked. Ask before anything that costs money.

## 10. Published
| File | Video | Date | Notes |
|---|---|---|---|
| 001 | Mumbai Short 1 "दहेज में मिला शहर" | 2026-11-28 | Old "असली सीन" intro; frozen |
| 002 | Akola Short 1 "शिवलिंग में समा गई रानी" | next | Gate 1 pending |

## 11. Open (owner to decide)
- Outro form: keep "फ़ॉलो कीजिए / बताइए" or switch to तुम-form "फ़ॉलो करो / बताओ" to match the story lines.
- One brand name everywhere (channel name, banner, description vs spoken आर्काइव फ़ाइल्स).
- ElevenLabs paid plan (or another voice) before monetising.
- Style key image and character sheets (AKOLA_RANI, AKOLA_RAJA) to generate and approve in Flow.
