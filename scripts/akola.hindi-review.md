# Akola - Hindi review (hindi-editor, 2026-11-28)

Script: `scripts/akola.md`. Only the narration was rewritten (Hook, Promise, Beats 1-9, Outro, Short 1). The title, the header lines, "Short candidates" and "Flags for owner" are unchanged. No facts were added and no fact IDs were dropped.

## Lint (`node tools/hindi-lint.mjs scripts/akola.md`)
| | Errors | Warnings | Narration words (lint) | Long script only | Short 1 voiced |
|---|---|---|---|---|---|
| Before | 3 | 11 | 1292 | 1188 | 97 |
| After | **0** | **0** | 1350 (+4.5%) | 1248 (+5.1%, within ±8%) | 95 (≤ 97) |

- The lint count for Short 1 also includes the 7-word end card, so lint shows 104 before and 102 after. The voiced text (without the end card and on-screen lines) went from 97 to 95 words. The new pauses add about 1.9 s, and there are 5 fewer commas, so the reel should stay at about 52 s.
- Fact IDs: every section has the same set of IDs. Beat 5 has one extra `[F28]` because the Waterloo claim is now two sentences: the victory, then the Duke title.
- Voice markup: the long script has 18 `[रुकें]` marks (about one per 70 words) and Short 1 has 3. There are 3 `{धीमे}` lines in the whole file: the queen vanishing in Beat 2, the last line of Beat 9, and the queen vanishing in Short 1. The queen's prayer is a `{रानी} “...”` line in Beat 2 and in Short 1. No real historical person speaks.
- Respect forms are the same everywhere. Real people get the आदरसूचक plural, so वेलेज़ली is always plural: "लड़ चुका था" became "लड़ चुके थे". The legend characters are plural too: अकोलसिंह is थे / उन्होंने / गए, and the queen is जाती थीं / समा गईं.

## The 12 most important changes (before -> after -> why)
1. **Hook**: "...अकोला की किस्मत बदल दी?" -> "...अकोला की क़िस्मत बदल दी? [रुकें]". Why: the words are unchanged. I added the nukta (क़िस्मत is used the same way across the script) and a pause so the question can land.
2. **Beat 3**: "फिर सत्रहवीं सदी का आख़िरी दौर आया। बादशाह औरंगज़ेब के मंत्री, असद ख़ान, ने..." -> "सत्रहवीं सदी ख़त्म होने को थी, जब औरंगज़ेब के मंत्री असद ख़ान ने...". Why: the comma before ने made the voice stop in the middle of a phrase. This also joins a choppy lead-in sentence.
3. **Beat 3**: "हैदराबाद के पहले निज़ाम, आसफ़ जाह, ने" -> "हैदराबाद के पहले निज़ाम आसफ़ जाह ने". Why: same comma-before-postposition error.
4. **Beat 3**: "ये नाम याद रखिए। निज़ाम। आगे चलकर, ... यही निज़ाम करेंगे।" -> "निज़ाम, ये नाम याद रखिएगा। [रुकें] आगे चलकर ... हैदराबाद के निज़ाम ही करेंगे।" Why: it removes a fragment. Also, "यही निज़ाम" implied that the Nizam of 1724 (आसफ़ जाह) also made the decision of 1853. The new line names the title, not the same man.
5. **Beat 4**: "पहला, नरनाला।" / "दूसरा, बालापुर का क़िला।" -> "इनमें पहला है नरनाला का क़िला।" / "दूसरा है मुग़ल दौर का बालापुर क़िला, जिसकी शुरुआत...". Why: these were verbless list fragments, and a list should not sound like it is being read out.
6. **Beat 5**: "अब कहानी में आती है एक बड़ी लड़ाई। अठारह सौ तीन। ... रघुजी दूसरे, की सेना" -> "और अब बारी है एक बड़ी लड़ाई की। [रुकें] सन् अठारह सौ तीन में ... जंग छिड़ी हुई थी। ... रघुजी द्वितीय की सेना". Why: the first line was translationese, the bare year was a fragment, the regnal number was wrong and there was a comma before की. "नवंबर, अठारह सौ तीन।" became "उसी साल नवंबर में...".
7. **Beat 5**: "अंग्रेज़ों की कमान थी एक जनरल के हाथ में। नाम था, आर्थर वेलेज़ली।" -> "अंग्रेज़ी फ़ौज की कमान एक जनरल के हाथ में थी, जिनका नाम था आर्थर वेलेज़ली।" Why: the old line had English word order.
8. **Beat 5 (twist)**: "...यही आर्थर वेलेज़ली, जो अब ड्यूक ऑफ़ वेलिंगटन बन चुके थे, वॉटरलू की लड़ाई में नेपोलियन को हराते हैं।" (26 words, mixed tense) -> "बारह साल बाद, सन् अठारह सौ पंद्रह में, वॉटरलू की लड़ाई में नेपोलियन को हराया इन्हीं आर्थर वेलेज़ली ने। तब तक वो ड्यूक ऑफ़ वेलिंगटन बन चुके थे।" Why: the tense is now consistent, and the reveal ends on the name. The recap line became "यानी वॉटरलू जीतने वाले जनरल ... लड़ चुके थे", which does not repeat "नेपोलियन को हराया" and fixes the respect form.
9. **कपास gender (Beats 1 and 7, Outro)**: "कपास ख़ूब उगता है" / "बहुत सारा कपास ... आता था" / "वो कपास आना बंद हो गया" / "बरार के कपास का व्यापार" / "अकोला का कपास ... जाता था" -> उगती है / बहुत सारी कपास ... आती थी / वहाँ से कपास आनी बंद हो गई / बरार की कपास का व्यापार / अकोला की कपास ... जाती थी. Why: कपास is feminine. The headings were left as they are.
10. **Beat 6**: "अठारह सौ तिरपन। ... इसका ख़र्च अंग्रेज़ों को चुकाना था, और ये बकाया बढ़ता जा रहा था।" -> "हुआ यूँ कि निज़ाम की एक फ़ौज थी, जिसे हैदराबाद कंटिंजेंट कहा जाता था। इस फ़ौज के ख़र्च के लिए निज़ाम पर अंग्रेज़ों का क़र्ज़ चढ़ता जा रहा था। तो सन् अठारह सौ तिरपन में, उन्होंने..." Why: it removes a fragment. Also, "अंग्रेज़ों को चुकाना था" could be heard as "the British had to pay". Now it is clear who owed whom (F29).
11. **Beat 7**: "जवाब मिला, भारत में। और भारत में, बरार में।" -> "[रुकें] इसका जवाब मिला भारत में, और भारत में भी ख़ास तौर पर बरार में।" Also, "...रेल लाइन बिछाई गई। ताकि कपास बंबई..." became one sentence. Why: the old lines were chopped fragments, and a sentence should not start with ताकि.
12. **"आज भी" 7 -> 2, and Beat 2 voice**: Beat 4 became "...ये दीवारें अब मौसम से जूझ रही हैं" and Beat 8 became "[रुकें] इसीलिए आज अकोला को कॉटन सिटी कहा जाता है", which pays off the Promise. In Beat 2, "अगर मैं निर्दोष हूँ..." was plain narration and is now `{रानी} “...”`, with `[रुकें 0.5]` before it and `[रुकें 1.0]` after it, and then `{धीमे}` on the vanishing line. Why: the phrase was repeated too often, and the legend now has a voice and a beat.

Short 1 got the same fixes: queen in plural, `{रानी}` prayer, `{धीमे}` vanishing line, and 11 commas cut to 6. "आपके शहर की ऐसी कोई लोक-कथा? कमेंट में लिखिए।" became "अपने शहर की ऐसी कहानी कमेंट में लिखिए।", which is one sentence instead of a fragment and 2 words shorter.

## For the owner to decide (not applied)
1. **Hook wording (suggestion only)**: "क्या आपको पता है कि अमेरिका की एक लड़ाई ने अकोला की क़िस्मत कैसे बदल दी?" Putting "कैसे" up front follows English word order ("do you know how..."). In Hindi it more naturally comes just before the verb. If you approve, the same wording can go into Short candidate 2, which still spells it "किस्मत".
2. **Short 1 hook length**: the hook is 16 words, about 8 s, which is longer than its "0-5 s" label. The on-screen text covers the first 3 s. A shorter option is "क्या आप जानते हैं, अकोला की एक रानी शिवलिंग में समा गई थीं?" (12 words). The "लोक-कथा" label stays on screen and "कहते हैं" follows straight away.
3. **`{धीमे}` budget**: I counted all three across the file. If you count per video, the Beat 7 payoff ("...अकोला की कपास को सोने जैसा क़ीमती बना दिया।") is the next best line for it.
4. **Header**: the "Words: 1188" header line was left unchanged, as the rules require. The long script is now 1248 words, about 10.5 min plus about 12 s of pauses.
5. **Dates to check with the research (unchanged in the script)**: Beat 8 says Berar was leased in 1903, but the fact sheet (F35) gives the lease as 1902-03 and the merger as 1903. Beat 9 says "आज ... क़रीब अठारह लाख लोग"; the figure is from the 2011 Census (F36).

## Tool notes (for `tools/hindi-lint.mjs`, not the script)
- The lint reports the conjunction ", पर" ("but") as a comma before the postposition पर. After a comma I used "लेकिन" instead.
- The lint removes `**...**` before it checks which lines to skip, so the `**End card` line is counted as narration. That is why Short 1 shows 102 instead of 95.
