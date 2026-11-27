---
name: hindi-script
description: Write the timed Hindi (Devanagari) narration script for an Epoch Archive episode or Short in the hidden-facts format (Sutradhar hook scene, three reveals, myth check, aaj bhi dikhta hai, fixed closer), with a fact tag on every claim. Use for stage 2 of /make-video or when the owner asks for a Hindi script.
---

# Hindi script → `episodes/<ep>/script_hi.md`

Load the vendor `scriptwriting` skill first and apply its doctrine, hook tracks, open loops and AI-tells scan. This file adds the channel and Hindi rules.

## Brief (top of the file)
Message (one repeatable line), viewer (who, believing what), feeling arc, structure + reason (default: **SCQA opening + escalating explainer**, stacked ABTs per reveal), runtime, word count.

## Structure (9–10 min ≈ 1,150–1,350 words at ~130 wpm)
| Time | Section | Rules |
|---|---|---|
| 0:00–0:15 | Hook | Sutradhar on camera acts out the belief, then says a 5–12-word line that breaks it, then the hook question. Picture track: one strong visual action in frame 1. |
| 0:15–0:17 | Logo sting | no VO |
| 0:17–1:15 | Setup | Stakes for the viewer ("जो पानी आप पीते हैं…"), why the obvious answer fails, promise: "तीन राज़". |
| 1:15–7:15 | राज़ 1, 2, 3 | Each: AND (context) → BUT (the flip) → THEREFORE (what it means) → open loop into the next. Signpost: "राज़ नंबर दो…". At least one evidence card per reveal. |
| inside राज़ 3 | सच या झूठ? | The myth spoken as people say it → `[beat]` → verdict with reason and sources. |
| 7:15–8:45 | आज भी दिखता है | Concrete places and objects to visit. |
| 8:45–9:30 | Closer | Answer the hook in one line → moral line → next-EP question → end line "अगली फ़ाइल किसकी खुलेगी, देखना है? तो सब्सक्राइब करना मत भूलना!" One ask only (subscribe *or* comment, not both). |

## Hindi for the ear
- **Tone (see `studio/VISION.md`):** casual everyday Hindi in तुम-form (सोचो, देखो, बताओ), light natural Hinglish (सीन, ट्विस्ट, लिस्ट), calm and cool, never slangy about people or faiths. Use the fixed lines: welcome, "पर असली सीन तो अब शुरू होता है!", "तो असली सीन क्या है?", and the end line "अगली फ़ाइल किसकी खुलेगी, देखना है? तो फ़ॉलो करना मत भूलना!"
- Simple spoken Hindustani a 14-year-old follows. Write in **clip lines of 14–18 words** (one Flow clip = 8 s at ~3 words/s; fill 6–7 s, never under 4 s of speech). Mostly 8–14 words, with one short line for each payoff.
- Numbers written as Hindi words ("सत्रह सौ चौरानवे"). One number per sentence. Sources are spoken ("इम्पीरियल गज़ेटियर, उन्नीस सौ आठ के मुताबिक़"), since Flow can't render on-screen text.
- Mark pauses `[beat]` before each reveal line. Use commas for breath (TTS reads them).
- Hindi AI tells to cut: "आइए जानते हैं", "क्या आप जानते हैं" as an opener, "दिलचस्प बात ये है", "सिर्फ़ X नहीं, बल्कि Y" (max once), "सोचिए…" (max once), stacked rhetorical question+answer, "एक नया अध्याय", "इतिहास के पन्नों में", "रोचक सफ़र".
- No invented dialogue for real people. Legends: "कहते हैं" / "लोक-कथा के मुताबिक़". Disputed: "कुछ शोधकर्ता मानते हैं…, पर दूसरे…".

## Cast
Also write `episodes/<ep>/cast.md`: the supporting animals for this episode, following the casting rules in `studio/STYLE_BIBLE.md` §3 (Sutradhar the wolf is always the narrator).

## Accuracy
`[F#]` after every factual sentence. Run the fact audit: every tag exists in `research.md` with a status that allows the wording used.

## File format
Brief, then the timed table `| Time | Section | Narration (one clip line per row) |`, then `## Short candidates` (3–4: shot range, standalone hook, why it works alone) and `## Flags for owner`.

## Short template (45–55 s, 8–9 clips)
Hook (surprising claim + action in frame 1) → welcome ("स्वागत है आर्काइव फ़ाइल्स में! फ़ाइल नंबर N…") → popular story with numbers → "पर असली सीन तो अब शुरू होता है!" → evidence → "तो असली सीन क्या है?" verdict → reusable end clip. The story must close: no step from cause to effect skipped.
