# Builds SCRIPT.md (numbered lines + visual notes, tagged ElevenLabs copy, clean copy, word count) from one list.
import re
PARTS = [
("B + O — Beginning curiosity and open loop (0:00-0:45)", [
("curious", "सोचिए... सिर्फ़ सात साल का एक बालक, पूरे सात दिन तक, एक हाथ पर पूरा पहाड़ उठाए खड़ा है।",
 "Storm over Vrindavan. Start on tiny Krishna's raised hand, crane up the rock face to the whole Govardhan hill held overhead, rain bouncing off it."),
("dramatic", "और जिस इंद्र ने ये प्रलय जैसी बारिश भेजी थी... उसे कृष्ण ने कोई सज़ा नहीं दी।",
 "Whip pan up through the rain into black clouds: Indra on white Airavata, vajra crackling, furious face."),
("mysterious", "उल्टा, उसी इंद्र ने कृष्ण को एक नया नाम दिया... गोविंद।",
 "Soft golden light breaks through; Krishna's face in the glow; a single cow bell rings."),
("curious", "भगवान ने अपने अपमान का बदला क्यों नहीं लिया? और इंद्र ने ही उन्हें ये नाम क्यों दिया? जवाब भागवत पुराण में है... और ये कहानी शुरू होती है एक छोटे से सवाल से।",
 "Camera flies back down through the clouds; planned cut with a golden dissolve to a sunny Vrindavan morning (time jump back)."),
("warm", "वृंदावन में उस सुबह बड़ी चहल-पहल थी। हर घर से पकवानों की खुशबू आ रही थी।",
 "Glide over thatched roofs; gopis carrying matkis; smoke from chulhas; follow a gopi's tray of sweets down the lane."),
("warm", "नंद बाबा और सारे ग्वाले एक बड़े यज्ञ की तैयारी कर रहे थे।",
 "The tray lands at a yajna altar; Nanda Baba directing gwal-bal stacking offerings; truck along the busy line."),
("curious, childlike", "तभी नन्हे कन्हैया ने पूछा... बाबा, ये यज्ञ किसके लिए है?",
 "Push in from behind the offerings: little Krishna tugs Nanda Baba's angavastram, head tilted."),
("calm, fatherly", "नंद बाबा मुस्कुराए। बेटा, ये इंद्र देव के लिए है। वही बादलों के राजा हैं। उन्हीं की बारिश से हमारी घास, हमारी फसल और हमारी गायें जीती हैं।",
 "Nanda kneels to Krishna's height; Nanda points to the sky; follow his finger up to clouds, then down along rain onto grass and grazing cows."),
]),
("R1 — Stage 1: a child questions Indra's worship (0:45-1:50)", [
("thoughtful", "कृष्ण कुछ देर चुप रहे... फिर बोले, बाबा, हम तो ग्वाले हैं। हमारा घर ये जंगल हैं, ये पहाड़ हैं।",
 "Krishna looks away from the sky toward the green hill on the horizon; glide past him to Govardhan in morning light."),
("warm", "हमें घास कौन देता है? ये गोवर्धन। पानी कौन देता है? इसके झरने। तो पूजा गायों की, ब्राह्मणों की और गोवर्धन पर्वत की क्यों न करें?",
 "Fast beats: grass on the slopes, a waterfall, cows drinking, a brahmana with a kalash; land back on Krishna with open arms."),
("surprised", "सबने एक-दूसरे की तरफ़ देखा। इतना छोटा बच्चा... और इतनी बड़ी बात!",
 "Quick glide across surprised gwal-bal faces and gopis; Yashoda covers a smile."),
("happy", "और पूरे गाँव ने वही किया जो कन्हैया ने कहा। इंद्र के लिए बने सारे पकवान गोवर्धन के सामने सजा दिए गए, गायों को हरी घास खिलाई गई, और सबने मिलकर पर्वत की परिक्रमा की।",
 "Procession: carts of food to the hill (annakut mound), cows eating fresh grass, villagers circling the hill with cows in front; aerial orbit."),
("mysterious", "लेकिन असली हैरानी अभी बाकी थी...",
 "Music drops; slow push toward the hill; light dims slightly."),
("amazed", "भागवत पुराण कहता है, उसी पल कृष्ण ने एक विशाल रूप धारण किया और बोले... मैं गोवर्धन हूँ! और सारा भोग स्वीकार कर लिया।",
 "A huge glowing divine form rises from the hill (emissive aura, bloom); tilt up its full height; offerings glow and vanish."),
("softly, smiling", "और मज़े की बात? नन्हे कृष्ण ख़ुद भी सबके साथ उस रूप को प्रणाम कर रहे थे। यानी भगवान... अपनी ही पूजा में शामिल थे।",
 "Pull back down to the crowd bowing; find little Krishna bowing too, then he peeks up with a mischievous wink."),
("serious", "पर ये सब कोई और भी देख रहा था... स्वर्ग में बैठा देवराज इंद्र।",
 "Fly-through upward past the clouds into Indra's golden court; Indra watching, his smile freezing."),
]),
("R2 — Stage 2: Indra's storm and the lifted hill (1:50-3:20)", [
("angry, loud", "अपनी पूजा रुकती देखकर इंद्र आग-बबूला हो गया। एक ग्वाले के बच्चे की बात सुनकर इन्होंने मेरा अपमान किया?",
 "Indra slams his throne arm; the vajra sparks; camera kick on the slam."),
("dramatic", "उसने प्रलय के संवर्तक मेघों को हुक्म दिया... जाओ, पूरे व्रज को बहा दो!",
 "Indra points down; giant dark clouds roll forward like an army; follow them down toward Vrindavan."),
("intense", "आसमान काला पड़ गया। बिजली कड़कने लगी। मूसलाधार बारिश के साथ ओले बरसने लगे।",
 "Night-dark grade; lightning flashes (planned white flash windows); hail bouncing; wind bending trees."),
("sad", "गायें ठंड से काँपने लगीं। बछड़े अपनी माँओं से चिपक गए। सब एक ही नाम पुकार रहे थे... कृष्ण, हमें बचाओ!",
 "Shivering cows, a calf pressed to its mother, gopis shielding children; glide to the crowd running toward Krishna."),
("calm, confident", "कृष्ण समझ गए... ये इंद्र का घमंड बोल रहा है।",
 "Close on Krishna in the rain: calm eyes looking up, a faint smile."),
("powerful", "और उन्होंने गोवर्धन पर्वत को एक हाथ से ऐसे उठा लिया... जैसे कोई बच्चा खेल-खेल में ज़मीन से छोटा सा कुकुरमुत्ता उठा लेता है।",
 "Krishna walks to the hill, raises one hand; the ground cracks; the hill rises; crane up with it; rain now hitting the hill's underside."),
("warm", "आइए सब, अपनी गायों और सामान के साथ इस पर्वत के नीचे आ जाइए। डरिए मत... ये पर्वत गिरेगा नहीं।",
 "Under the hill: dry and warm; truck along carts, cows and families streaming in; Krishna waving them in."),
("amazed", "एक दिन बीता... दो दिन... पूरे सात दिन! कृष्ण अपनी जगह से हिले तक नहीं। न भूख, न प्यास, न थकान।",
 "Time passage under the hill: lamps lit and burning down, children sleeping, gopis feeding cows; Krishna unchanged, smiling."),
("dramatic", "आख़िर इंद्र के बादल भी खाली हो गए। उसका घमंड, बादलों के साथ ही बिखर गया।",
 "Clouds thin and break apart; Indra on Airavata lowering the vajra, stunned."),
("softly", "बारिश थमी, धूप निकली। सबके बाहर आ जाने के बाद, कृष्ण ने पर्वत को धीरे से वापस उसी जगह रख दिया।",
 "Golden sunlight returns; villagers walk out; the hill descends gently into place; birds take off."),
]),
("R3 — Stage 3: who is this child, and what about Indra? (3:20-4:20)", [
("curious", "अब ग्वालों के मन में एक सवाल था... ये बच्चा आख़िर है कौन?",
 "Gwal-bal huddle whispering, glancing at Krishna playing with calves."),
("amazed", "सात साल का बालक... और पहाड़ को ऐसे उठा लिया, जैसे हाथी अपनी सूंड से कमल का फूल उठा लेता है!",
 "Quick visual comparison: an elephant lifting a lotus with its trunk; match-move back to the hill."),
("wise", "तब नंद बाबा ने गर्ग ऋषि की कही बात याद दिलाई... ये बालक गुणों में स्वयं नारायण के समान होगा, और हर संकट से तुम्हारी रक्षा करेगा।",
 "Planned cut into a flashback (push into Nanda's eyes, golden dissolve): Garga Rishi at the naming ceremony with baby Krishna; dissolve back."),
("tense", "लेकिन अब असली सवाल... इंद्र का क्या होगा? जिसने पूरे व्रज को डुबोने की कोशिश की, क्या भगवान उसे माफ़ करेंगे?",
 "Tension music; slow push on Krishna sitting alone by Govardhan at dusk."),
("softly", "फिर एक दिन, जब कृष्ण अकेले थे... आसमान से कोई चुपचाप उतरा।",
 "A soft light descends behind the trees; follow it down to the ground near Krishna."),
("ashamed", "वो इंद्र था। न ऐरावत की शान, न बादलों की गर्जना। सिर झुका हुआ, आँखें नम।",
 "Indra on foot, crown in hand, head lowered; glide around him."),
("emotional", "इंद्र अपने मुकुट समेत कृष्ण के चरणों में गिर पड़ा। प्रभु, मैं अपनी शक्ति के नशे में आपको भूल गया था। मुझे क्षमा कर दीजिए।",
 "Indra kneels and bows; his crown touches the ground before Krishna's feet; camera low behind Krishna."),
]),
("E — End: the real answer (4:20-5:25)", [
("serious", "अब सोचिए... आप कृष्ण की जगह होते, तो क्या करते? सज़ा देते?",
 "Hold the two of them in one frame, slow creep in; the pause is part of the story."),
("gentle, wise", "कृष्ण मुस्कुराए और बोले... इंद्र, तुम्हारा यज्ञ मैंने तुम्हें सज़ा देने के लिए नहीं रोका था। तुम पर कृपा करने के लिए रोका था।",
 "Krishna smiles and lifts Indra by the shoulder; warm key light on both faces."),
("wise", "तुम अपनी शक्ति और ऐश्वर्य में इतने डूब गए थे कि मुझे भूल गए। मैं चाहता था कि तुम मुझे याद रखो।",
 "Quick memory beats behind Indra (painted, warm-graded): his golden court, Airavata, him laughing on the throne."),
("deep", "और जिसका मैं सच में भला चाहता हूँ... उसका घमंड मैं ख़ुद तोड़ देता हूँ।",
 "Close on Krishna's eyes; the vajra in Indra's hand lowers to the ground."),
("revealing", "यही है जवाब। इंद्र का असली रोग उसका घमंड था। सात दिन की बारिश ने वो रोग तोड़ दिया... इलाज पूरा हो चुका था। अब सज़ा की कोई ज़रूरत ही नहीं थी।",
 "Callback montage: the storm, the hill, the breaking clouds; land on Indra smiling for the first time."),
("joyful", "और तभी गोलोक से दिव्य गाय सुरभि आईं, और अपने दूध से कृष्ण का अभिषेक किया।",
 "A glowing white divine cow descends on light; milk pours over Krishna in a soft arc; bloom only on the divine glow."),
("grand", "फिर इंद्र ने ऐरावत की सूंड से आकाशगंगा का जल लेकर कृष्ण को स्नान कराया... और उन्हें नाम दिया... गोविंद।",
 "Airavata lifts its trunk; a sparkling stream of heavenly water arcs over Krishna; Indra joins his palms."),
("proud, emotional", "यानी गायों के इंद्र। गायों के रक्षक।",
 "Pull back: every cow of Vrindavan gathered around Krishna; bells ringing."),
("awe", "सोचिए... जिस इंद्र की पूजा कृष्ण ने रुकवाई थी, उसी इंद्र ने कृष्ण का अभिषेक किया। भगवान ने बदला नहीं लिया... उन्होंने अपने भक्त को फिर से जीत लिया।",
 "Wide golden-hour tableau: Govardhan, Krishna, Indra bowing, Surabhi, the village; slow crane up."),
]),
("D — Direct (5:25-5:45)", [
("warm", "आज भी दिवाली के अगले दिन जो गोवर्धन पूजा और अन्नकूट होता है... वो इसी दिन की याद है।",
 "Match dissolve from the tableau to a present-day-style annakut: a mound of food shaped like a hill with diyas."),
("warm, inviting", "अगर आपको ये कथा अच्छी लगी, तो वीडियो को लाइक कीजिए, और कमेंट में लिखिए... जय गोविंद।",
 "Krishna (chibi) waves at the camera beside the annakut; cows peek in."),
("curious", "और चैनल को सब्सक्राइब कर लीजिए, क्योंकि अगली कहानी में जानेंगे... जिसे पूरा ब्रह्मांड नहीं बाँध सका, उसे माँ यशोदा ने एक रस्सी से कैसे बाँध लिया?",
 "Teaser: Yashoda holding a rope behind her back, little Krishna with a butter-smeared face freezes; end-screen space on the right."),
]),
]

HEAD = """# Krishna Ne Indra Ko Saza Kyun Nahi Di? — SCRIPT v1 (2026-11-25)

## 1. The curiosity (B)
- **Question:** जिस इंद्र ने पूरे व्रज को डुबोने की कोशिश की, कृष्ण ने उसे सज़ा क्यों नहीं दी, और उसी इंद्र ने कृष्ण को "गोविंद" नाम क्यों दिया?
- **Titles (Hinglish, pick one):**
  1. ⭐ Krishna Ne Indra Ko Saza Kyun Nahi Di?
  2. Krishna Ka Naam 'Govinda' Kisne Rakha? Jawab Chaunka Dega
  3. 7 Din Tak Govardhan Uthaya — Phir Indra Ke Saath Kya Kiya?
- **Thumbnail concepts (1280x720, rendered from our own scenes, ≤ 4 words):**
  1. Chibi Krishna calmly holding Govardhan on one hand, rain all around; furious Indra on Airavata in the storm clouds, top right. Text: **"INDRA KO SAZA?"**
  2. Indra kneeling with his crown on the ground at Krishna's feet, golden light. Text: **"INDRA HAAR GAYA"**
  3. Surabhi cow pouring milk over smiling Krishna, Indra with folded hands. Text: **"GOVINDA KAISE BANE?"**

## 2. Sources
| # | Story beat | Text | Section | Type |
|---|---|---|---|---|
| S1 | Vraja prepares Indra's yajna; Krishna asks Nanda; Nanda: Indra controls the rain | Bhagavata Purana | 10.24 (Nanda's reply 10.24.8) | scripture |
| S2 | Krishna: we live in forests and hills; worship the cows, brahmanas and Govardhan; offerings, grass for cows, parikrama | Bhagavata Purana | 10.24 | scripture |
| S3 | Krishna takes a huge form, says "I am Govardhan", eats the offerings; bows to it with the people | Bhagavata Purana | 10.24.35-36 | scripture |
| S4 | Indra's anger; samvartaka clouds; rain, hail, wind; Vraja calls on Krishna | Bhagavata Purana | 10.25 | scripture |
| S5 | Lifts Govardhan with one hand "as a child holds up a mushroom"; everyone shelters under it | Bhagavata Purana | 10.25.19 | scripture |
| S6 | Holds it for seven days without moving, hunger or fatigue; clouds withdraw; hill put back | Bhagavata Purana | 10.25 (end of chapter) | scripture |
| S7 | Gopas amazed: a seven-year-old lifting a hill like an elephant lifts a lotus; Nanda recalls Garga's words ("like Narayana in qualities") | Bhagavata Purana | 10.26 (age: 10.26.3); Garga's words 10.8.19 / 10.26 | scripture |
| S8 | Indra comes to Krishna in a secluded place, bows, apologises | Bhagavata Purana | 10.27.1-13 | scripture |
| S9 | Krishna: "I stopped your sacrifice as mercy, so you would remember Me"; "whom I truly favour, I bring down from his position" | Bhagavata Purana | 10.27.15-16 | scripture |
| S10 | Surabhi comes from Goloka, bathes Krishna with milk; Indra bathes him with heavenly Ganga water from Airavata's trunk and names him Govinda | Bhagavata Purana | 10.27.22-23 | scripture |
| S11 | Govardhan Puja / Annakut the day after Diwali commemorates this | living tradition | — | festival practice |

**Notes for you (honesty checks):**
- The famous "little finger" (कनिष्ठा उँगली) image is popular art; the Bhagavata says **one hand** (Harivamsha says the left hand). The script follows the Bhagavata.
- Krishna's words in L35-L37 paraphrase 10.27.15-16 in simple Hindi; nothing is added that the text doesn't say.
- "Govinda" is explained as "Indra of the cows / protector of the cows", following the coronation in 10.27.
- To double-check before voicing: the exact verse numbers of 10.25.23 (seven days) and 10.26.3 (age seven). The events themselves are in those chapters.

## 3. Script (numbered lines: tagged line for ElevenLabs, then the visual note)
"""

def strip_tags(t): return re.sub(r"\[[^\]]*\]\s*", "", t)
out, tagged, clean, n, words = [HEAD], [], [], 0, 0
for title, lines in PARTS:
    out.append(f"\n### {title}\n")
    for tag, hi, vis in lines:
        n += 1
        out.append(f"**L{n:02d}** `[{tag}] {hi}`\n> visual: {vis}\n")
        tagged.append(f"[{tag}] {hi}"); clean.append(hi)
        words += len(hi.split())
    out.append("")
secs = words / 2.8
out.append("\n## 4. Voice copy for ElevenLabs (Eleven v3 reads the [tags] as directions)\n```\n" + "\n\n".join(tagged) + "\n```\n")
out.append("\n## 4b. Clean copy (no tags) for other voices or a human narrator\n```\n" + "\n\n".join(clean) + "\n```\n")
out.append(f"\n## 5. Numbers\n- Lines: {n} · Hindi words: {words} (target 800-1,000) · estimated duration at ~2.8 words/s: {int(secs // 60)}:{int(secs % 60):02d} (the real length comes from your voiceover)\n"
           f"- Loops: B question opened in L01-L04 → R1 ends on Indra watching (L16) → R2 ends with the hill put back but Indra's fate open → R3 asks 'will he be punished?' (L30) → E answers it (L35-L38) and pays off 'Govinda' (L40-L42).\n"
           f"- New characters needed (not on the sheet yet): Nanda Baba, Indra, Airavata (elephant), Surabhi (divine cow), cows and calves, Garga Rishi (flashback), Govardhan's giant divine form, a brahmana.\n")
open("/home/user/videos/04-govinda/SCRIPT.md", "w").write("\n".join(out))
print("lines", n, "words", words, "est", f"{int(secs // 60)}:{int(secs % 60):02d}")
