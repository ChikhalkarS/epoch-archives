# Mumbai Short - समंदर से छीना गया शहर
Format: 9:16, 1080x1920 | Words: 173 | ~67-72 s at fast pace (speed 1.1-1.15) | Platforms: YouTube Shorts + Instagram Reels
Template: `config/channel.json` -> shorts_template (hook, brand intro, story, viewer line, payoff, comment question, next teaser, follow) | Status: waiting on Gate 1

## Voice settings (ElevenLabs)
- Model v3, voice Viraj, old-radio filter, speed about 1.1-1.15.
- Audio tags ([excited], [curious], [sighs], [whispers]) are optional; delete any that sound odd. "..." = short pause.
- Over 65 s? Raise speed slightly or drop one story scene, never the intro, viewer line, teaser or follow line.

## On-screen hook (first 2 s)
ये ज़मीन कभी समंदर थी!

## Narration with fact IDs (for checking)
- (hook) आप मुंबई की जिस सड़क पर खड़े हैं... वो शायद कभी समंदर थी! [F16][F18]
- (brand) नमस्ते, एपॉक आर्काइव्स में आपका स्वागत है। आज की कहानी, मुंबई की। (viewer/channel line, no fact)
- (story) कभी मुंबई, सात अलग-अलग टापू थी। [F7]
- (story) बीच में समंदर था। और ज्वार आते ही, निचली ज़मीन डूब जाती थी। [F16]
- (interaction) मुंबई में रहते हैं? अपना इलाक़ा कमेंट में लिखिए। शायद वो भी, कभी समंदर था। (viewer/channel line, no fact)
- (story) सत्रह सौ बयासी में, गवर्नर हॉर्नबी ने वरली के पास, एक बड़ी समुद्री दीवार शुरू करवाई। हॉर्नबी वेलार्ड। [F16]
- (story) कहते हैं, दीवार बार-बार टूटती थी। फिर एक इंजीनियर के सपने के बाद, समंदर से देवी की मूर्तियाँ मिलीं, और बना महालक्ष्मी मंदिर। ये एक लोक-कथा है। [F20]
- (payoff) फिर बने कॉज़वे, और उन्नीसवीं सदी के बीच तक, सात टापू, एक ज़मीन बन गए। [F19][F18]
- (payoff) और आज भी, कोस्टल रोड के लिए, समंदर से ज़मीन ली गई। मुंबई बसाई नहीं गई। समंदर से छीनी गई। [F33][F34]
- (comment) समंदर से ज़मीन लेना, सही या ग़लत? कमेंट में लिखिए। (viewer/channel line, no fact)
- (outro) अगली कहानी: वो औरत, जिसने अपने पैसों से समंदर पर रास्ता बनवाया। और फिर चलेंगे, हम्पी। फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए। (viewer/channel line, no fact)

## ElevenLabs text (paste this)
```
[curious] आप मुंबई की जिस सड़क पर खड़े हैं... वो शायद कभी समंदर थी!
नमस्ते... एपॉक आर्काइव्स में आपका स्वागत है। आज की कहानी... मुंबई की।
कभी मुंबई... सात अलग-अलग टापू थी।
बीच में समंदर था। और ज्वार आते ही... निचली ज़मीन डूब जाती थी।
मुंबई में रहते हैं? अपना इलाक़ा कमेंट में लिखिए। शायद वो भी... कभी समंदर था।
सत्रह सौ बयासी में, गवर्नर हॉर्नबी ने वरली के पास, एक बड़ी समुद्री दीवार शुरू करवाई। हॉर्नबी वेलार्ड।
कहते हैं... दीवार बार-बार टूटती थी। फिर एक इंजीनियर के सपने के बाद, समंदर से देवी की मूर्तियाँ मिलीं... और बना महालक्ष्मी मंदिर। ये एक लोक-कथा है।
फिर बने कॉज़वे... और उन्नीसवीं सदी के बीच तक, सात टापू, एक ज़मीन बन गए!
और आज भी, कोस्टल रोड के लिए, समंदर से ज़मीन ली गई। मुंबई बसाई नहीं गई... समंदर से छीनी गई।
समंदर से ज़मीन लेना... सही या ग़लत? कमेंट में लिखिए।
अगली कहानी: वो औरत... जिसने अपने पैसों से समंदर पर रास्ता बनवाया। और फिर चलेंगे... हम्पी। फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए।
```

## Characters (clay people, not animals; make each reference once in Flow and attach it in every scene with that character)
**SUTRADHAR:**
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, character reference sheet of the clay SUTRADHAR (small elderly storyteller, white beard, saffron-brown shawl, round spectacles, holding an old scroll), full body front view and close-up of face side by side, plain warm grey studio background, even soft light, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Historical figures are generic clay figures dressed for the era; names appear only in captions.

## Scenes (one Flow clip each, ~5-6 s)
Negative prompt (if supported): `photorealistic, real photograph, 3D CGI render, glossy plastic, anime, cartoon line art, animals as main characters, text, letters, watermark, logo, extra fingers, distorted faces, gore, blood`

### short2-s01 (hook) | on-screen: ये ज़मीन कभी समंदर थी!
VO: आप मुंबई की जिस सड़क पर खड़े हैं... वो शायद कभी समंदर थी!
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, a tiny clay person standing on a city road, the road surface cracking open to reveal blue clay sea water and fish underneath, dusk light, low angle close shot, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: camera pushes down through the road into the water.

### short2-s02 (brand) | on-screen: एपॉक आर्काइव्स | मुंबई
VO: नमस्ते, एपॉक आर्काइव्स में आपका स्वागत है। आज की कहानी, मुंबई की।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, the clay SUTRADHAR (small elderly storyteller, white beard, saffron-brown shawl, round spectacles, holding an old scroll) sitting on a wooden stool in a cosy lamp-lit archive room full of scrolls, he unrolls a scroll and a small clay map of the seven Bombay islands pops up from it, warm lamplight, medium shot facing camera, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: slow push-in as the scroll opens and the map rises; Sutradhar smiles at the viewer.

### short2-s03 (story) | on-screen: 7 टापू
VO: कभी मुंबई, सात अलग-अलग टापू थी।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, seven separate green clay islands in a turquoise clay sea, small fishing boats with sails between them, tiny palm trees and huts, bright morning light, top-down aerial view, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: slow rotating aerial drift; each island lights up one by one.

### short2-s04 (story) | on-screen: ज्वार = बाढ़
VO: बीच में समंदर था। और ज्वार आते ही, निचली ज़मीन डूब जाती थी।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, clay sea water rushing over low swampy land between two islands, small huts standing in water, clay fishermen lifting their nets, overcast grey-blue light, wide shot, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: water level rises slowly, ripples spread.

### short2-s05 (interaction) | on-screen: आपका इलाक़ा? 📍
VO: मुंबई में रहते हैं? अपना इलाक़ा कमेंट में लिखिए। शायद वो भी, कभी समंदर था।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, a clay map of today's Mumbai with tiny clay pins popping up in different neighbourhoods, the old coastline of the seven islands drawn over it as a glowing blue outline, warm desk light, top-down shot, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: pins pop up one by one, the blue outline glows.

### short2-s06 (story) | on-screen: 1782: हॉर्नबी वेलार्ड
VO: सत्रह सौ बयासी में, गवर्नर हॉर्नबी ने वरली के पास, एक बड़ी समुद्री दीवार शुरू करवाई। हॉर्नबी वेलार्ड।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, many clay workers in 18th century Indian clothing carrying stones and baskets of earth to build a long stone sea wall across a creek, a generic clay British official in a 1780s coat watching with a plan, golden afternoon light, wide high angle, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: workers move along the wall, waves hit the stones.

### short2-s07 (story) | on-screen: लोक-कथा ✨ महालक्ष्मी मंदिर
VO: कहते हैं, दीवार बार-बार टूटती थी। फिर एक इंजीनियर के सपने के बाद, समंदर से देवी की मूर्तियाँ मिलीं, और बना महालक्ष्मी मंदिर। ये एक लोक-कथा है।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, a small clay seaside temple with a saffron flag on rocks beside a stone sea wall, a soft golden glow rising from calm sea water nearby, tiny respectful clay devotees, sunrise light, wide shot, respectful depiction, no deity faces shown, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: slow push-in toward the temple, the golden glow on the water fades gently.

### short2-s08 (payoff) | on-screen: 7 ➜ 1
VO: फिर बने कॉज़वे, और उन्नीसवीं सदी के बीच तक, सात टापू, एक ज़मीन बन गए।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, the seven clay islands now joined into one long landmass by stone causeways, green land where sea used to be, colonial buildings appearing, warm light, top-down aerial view, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: camera slowly rises, causeways fill in, land looks complete.

### short2-s09 (payoff) | on-screen: समंदर से छीनी गई 🌊
VO: और आज भी, कोस्टल रोड के लिए, समंदर से ज़मीन ली गई। मुंबई बसाई नहीं गई। समंदर से छीनी गई।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, clay miniature of a modern coastal highway curving along the sea beside a city skyline, a seawall of stones holding back clay waves, sunset light, wide aerial shot (modern road and buildings allowed in this scene), vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: slow pull-back, waves crash on the seawall.

### short2-s10 (comment) | on-screen: सही या ग़लत? 👇
VO: समंदर से ज़मीन लेना, सही या ग़लत? कमेंट में लिखिए।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, a clay balance scale on a rock by the sea, one pan holds a tiny clay city block, the other holds a tiny clay wave with fish, dusk light, centred close shot, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: scale tips gently back and forth.

### short2-s11 (outro) | on-screen: अगला: अवाबाई ➜ हम्पी
VO: अगली कहानी: वो औरत, जिसने अपने पैसों से समंदर पर रास्ता बनवाया। और फिर चलेंगे, हम्पी। फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, the clay SUTRADHAR (small elderly storyteller, white beard, saffron-brown shawl, round spectacles, holding an old scroll) rolling up his scroll and pointing at a clay relief map of India on the archive wall, a glowing marker on the Mumbai coast and a second small marker far south-east in Karnataka among clay boulders, warm lamplight, medium shot facing camera, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: Sutradhar points, the glowing marker pulses, then he waves goodbye.

## Edit notes
- Cut on every sentence; no shot longer than 6 s. Whoosh on the hook, the twist and the payoff.
- Word-by-word Hindi captions (Mukta / Noto Sans Devanagari, white with dark outline), lower third, clear of the Shorts/Reels buttons.
- Brand intro scene: small channel name lower-third "एपॉक आर्काइव्स" for 2 s.
- Music: royalty-free, about 12% under voice; log it in `shorts/mumbai/CREDITS.md`.
- Last frame loops back into the first.

## Publish pack
**YouTube Shorts titles:**
- मुंबई की ज़मीन कभी समंदर थी! 🌊 | 7 Islands of Bombay #shorts
- 7 टापू कैसे बने एक मुंबई? | Mumbai Reclamation History #shorts

**YouTube description:**
मुंबई कभी सात अलग टापू थी। हॉर्नबी वेलार्ड (1782-84), कॉज़वे और भराई से ये एक ज़मीन बनी, और कोस्टल रोड (2024) के लिए आज भी समंदर से ज़मीन ली गई। महालक्ष्मी मंदिर की कहानी लोक-कथा है।
Sources: Harvard Hornby Vellard exhibit; Ministry of Culture (Indian Culture portal); MCGM heritage record.
#mumbai #history #shorts

**Instagram Reel caption:**
आप मुंबई की जिस सड़क पर खड़े हैं, वो शायद कभी समंदर थी 🌊
सात टापू कैसे बने एक शहर।
आपका इलाक़ा कौन सा है? और समंदर से ज़मीन लेना, सही या ग़लत? 👇
अगली कहानी: टोल-फ़्री रास्ते वाली अवाबाई। फ़ॉलो करें!

#mumbai #bombay #sevenislands #indianhistory #historyinhindi #reels #epocharchives
