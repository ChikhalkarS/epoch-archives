# अच्छी हिंदी - narration style guide

The voice of the channel: a skilled Hindi storyteller - warm, clear, flowing, like a good radio कथावाचक or a documentary narrator who grew up speaking Hindi. Not a newsreader, not a translation, not a textbook.

Every script goes through `node tools/hindi-lint.mjs scripts/<slug>.md` and the `hindi-editor` agent (`.claude/agents/hindi-editor.md`) before Gate 1.

## 1. Register
- बोलचाल की हिंदुस्तानी: शहर, राजा, लड़ाई, फ़ौज, व्यापार, क़िला, ज़मीन. Avoid heavy Sanskrit (प्रारंभ, पश्चात्, अत्यधिक) and heavy Persian (मुतालबा, तहक़ीक़ात) unless explained.
- Spoken pronouns: ये / वो (not यह / वह). Spoken forms: "कहते हैं", "माना जाता है", "हुआ यूँ कि".
- Write natively. Never translate an English sentence word by word. If a line sounds like it was English first, rewrite the idea from scratch.

## 2. Sentence flow (the biggest problem)
- Vary length: most sentences 8-18 words, some short, an occasional longer one. A paragraph of only 4-6 word sentences sounds broken.
- **Fragments are spice, not food.** At most 2 verbless fragments per beat ("सोचिए।", "चार पीढ़ियाँ, चार औरतें।"), and only at a dramatic moment.
- Join related ideas with natural connectors instead of chopping them: और, लेकिन, क्योंकि, इसलिए, जिससे, तभी, उसी दौर में, इसके बाद, दरअसल, हुआ यूँ कि, बस फिर क्या था. Use each storyteller phrase at most once per script.
- Do not start 3 sentences in a row with the same word (और... और... और...).

## 3. Commas (they are pauses for the voice)
edge-tts stops at every comma, so a wrong comma breaks the sentence in the audio too.
- **Never** put a comma between a noun and its postposition or verb: ~~असद ख़ान, ने~~ -> असद ख़ान ने; ~~रघुजी दूसरे, की सेना~~ -> रघुजी द्वितीय की सेना.
- **Never** put a comma inside a normal phrase: ~~आज अकोला ज़िले में, क़रीब अठारह लाख लोग~~.
- Use a comma only where a speaker naturally breathes: after an opening phrase ("कहते हैं,", "उस दौर में,"), between two clauses, in a list, before a reveal.
- Roughly one comma per 8-10 words at most.

## 4. Grammar checks
- **Gender** (most common slips). Feminine: कपास, क़िस्मत, फ़ौज, सेना, जंग, लड़ाई, संधि, रेल लाइन, दीवार, झील, नदी, ज़मीन, सल्तनत, रियासत, कहानी, लोक-कथा. Masculine: क़िला, शहर, इलाक़ा, व्यापार, बंदरगाह, राज, दरवाज़ा, शिलालेख, क़र्ज़, ख़र्च, मुख्यालय, मंदिर. So: कपास उगती है, कपास आनी बंद हो गई, क़िस्मत बदल दी.
- **Respect forms**: real historical people get आदरसूचक plural (असद ख़ान ने करवाया, वेलेज़ली बन चुके थे, रानी जाती थीं). Pick one form per person and keep it for the whole script.
- **Tense**: tell history in past tense. Historical present ("वेलिंगटन नेपोलियन को हराते हैं") only for one dramatic reveal, never mixed inside a paragraph.
- Regnal numbers: रघुजी द्वितीय (not "रघुजी दूसरे").
- **Nukta**: use it consistently on Urdu-origin words (क़िला, क़िस्मत, ज़मीन, फ़ौज, ख़ान, क़र्ज़, ग़ायब, ज़्यादा). The same word must never appear both with and without it.

## 5. Numbers and names
- Years as words for the voice, with सन् when a year opens a sentence: "सन् अठारह सौ तीन में..." (not a bare "अठारह सौ तीन।").
- Big numbers in spoken form: "क़रीब अठारह लाख लोग".
- Foreign names in common Hindi spelling: आर्थर वेलेज़ली, नेपोलियन, वॉटरलू, ईस्ट इंडिया कंपनी.
- No Latin-script words in narration.

## 6. Bad -> good (from real drafts)
| Broken | Good Hindi |
|---|---|
| बादशाह औरंगज़ेब के मंत्री, असद ख़ान, ने अकोला के क़िले को मज़बूत करवाया। | औरंगज़ेब के मंत्री असद ख़ान ने अकोला के क़िले को नए सिरे से मज़बूत करवाया। |
| अठारह सौ तीन। अंग्रेज़ों और मराठों के बीच, दूसरी बड़ी जंग चल रही थी। | सन् अठारह सौ तीन। अंग्रेज़ों और मराठों के बीच दूसरी बड़ी जंग छिड़ी हुई थी। |
| अंग्रेज़ों की कमान थी एक जनरल के हाथ में। नाम था, आर्थर वेलेज़ली। | अंग्रेज़ी फ़ौज की कमान एक जनरल के हाथ में थी, जिनका नाम था आर्थर वेलेज़ली। |
| यहाँ समतल मैदान है, और इन खेतों में कपास ख़ूब उगता है। | यहाँ दूर-दूर तक समतल मैदान फैले हैं, और इन खेतों में कपास ख़ूब उगती है। |
| पहला, नरनाला। | इनमें पहला है नरनाला का क़िला। |
| अब कहानी में आती है एक बड़ी लड़ाई। | और अब बारी है एक बड़ी लड़ाई की। |
| जवाब मिला, भारत में। और भारत में, बरार में। | इसका जवाब मिला भारत में, और भारत में भी ख़ास तौर पर बरार में। |
| वो कपास आना बंद हो गया। | वहाँ से कपास आनी बंद हो गई। |

## 7. Read-aloud test
Read each paragraph aloud at narration speed. If you stumble, run out of breath, or it sounds like a news bulletin or a translation, rewrite it. The goal: a listener should never notice the language, only the story.

## 8. Things the editor must never change
Facts, names, dates, numbers, fact IDs `[F#]`, legend markers ("कहते हैं", "लोक-कथा के अनुसार"), disputed markers ("कुछ लोग मानते हैं... जबकि..."), and owner-approved hook lines (suggest changes in the review file instead).

## 9. Voice script: punctuation, pauses, dialogue, narration
The script is read by edge-tts (`config/channel.json`). It cannot hear meaning, only marks, so the marks are the direction.

| Mark | What the voice does | Use it for |
|---|---|---|
| `।` | full stop, falls and pauses | end of every thought |
| `,` | short breath | only where a speaker breathes (section 3) |
| `?` | rising question tone | real questions, the hook |
| `!` | stronger tone | rarely, at most 2 per script |
| `'शब्द'` | not read aloud | a word being explained ('अकोल') |
| `“ ”` | not read aloud | dialogue only, always with a `{role}` |
| `…` `—` `-` (as pause) | unreliable: skipped, read out, or a random pause | never; use `[रुकें]` |

**Pauses** (`tools/voice.mjs` inserts real silence):
- `[रुकें]` = 0.6 s. `[रुकें 1.2]` = any length up to 3 s.
- Put one after the hook question, before a reveal, after a dramatic line, between a question and its answer, at a chapter turn (`[रुकें 1.0]`).
- Around one per 40-60 words. Never two in a row, never inside a phrase, never at the very end of a scene (scenes already get a gap).

**Dialogue** (`{role} “...”`, its own sentence):
- Only for legend or folk-tale characters, or a documented quote with a source. Never invent words for real historical people; tell those in narration ("असद ख़ान ने हुक्म दिया कि...").
- The narrator sets it up in the sentence before ("रानी ने भगवान शिव से प्रार्थना की।"), then the line. Keep it under 15 words.
- Roles are defined in `config/channel.json` -> `voice.cast`: `रानी`, `स्त्री` (female voice), `राजा`, `पुरुष` (deeper male voice), `धीमे` (narrator, slower). Add a role there before using it.

**Narration tone**:
- `{धीमे} ...।` slows the narrator for that one sentence. Use it for the line that must land: the legend's climax, the twist, the last line. At most 3 per script.
- The narrator talks to one person: "सोचिए", "आपको पता है", "अब आप बताइए". Warm, never shouting.

**Voice-ready example** (Akola, Short 1):
```
क्या आपको पता है, अकोला की एक लोक-कथा में एक रानी शिवलिंग में समा गई थीं? [रुकें]
...
रानी ने भगवान शिव से प्रार्थना की। [रुकें 0.5]
{रानी} “अगर मैं निर्दोष हूँ, तो मुझे अपने में समा लो।” [रुकें 1.0]
{धीमे} और कहते हैं, रानी शिवलिंग में समा गईं।
```
Subtitles, word counts and Flow packs see the text without the markup (`plainVO` in `tools/lib.mjs`).
