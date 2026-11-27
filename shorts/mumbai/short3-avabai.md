# Mumbai Short - टोल-फ़्री रास्ते वाली अवाबाई
Format: 9:16, 1080x1920 | Words: 163 | ~63-68 s at fast pace (speed 1.1-1.15) | Platforms: YouTube Shorts + Instagram Reels
Template: `config/channel.json` -> shorts_template (hook, brand intro, story, viewer line, payoff, comment question, next teaser, follow) | Status: waiting on Gate 1

## Voice settings (ElevenLabs)
- Model v3, voice Viraj, old-radio filter, speed about 1.1-1.15.
- Audio tags ([excited], [curious], [sighs], [whispers]) are optional; delete any that sound odd. "..." = short pause.
- Over 65 s? Raise speed slightly or drop one story scene, never the intro, viewer line, teaser or follow line.

## On-screen hook (first 2 s)
शर्त: कोई टोल नहीं!

## Narration with fact IDs (for checking)
- (hook) एक औरत ने अपने पैसों से, समंदर पर रास्ता बनवाया... और शर्त रखी, कोई टोल नहीं! [F21]
- (brand) नमस्ते, एपॉक आर्काइव्स में आपका स्वागत है। आज की कहानी, मुंबई की। (viewer/channel line, no fact)
- (story) माहिम और बांद्रा के बीच, एक खाड़ी थी। लोग नावों से पार करते थे। [F21]
- (story) अठारह सौ चालीस-इकतालीस के आसपास, नावें पलटीं, और कई लोगों की जान गई। [F21]
- (story) तब आगे आईं, एक पारसी महिला। लेडी अवाबाई जमशेदजी जीजीभॉय। [F21]
- (story) उन्होंने डेढ़ लाख रुपये से ज़्यादा दान दिए। और बना, माहिम कॉज़वे। [F21]
- (payoff) बस एक शर्त। इस रास्ते पर, लोगों से कभी टोल नहीं लिया जाएगा। [F21]
- (interaction) आपके शहर में भी, किसी ने ऐसा कोई रास्ता या पुल दान से बनवाया है? कमेंट में बताइए। (viewer/channel line, no fact)
- (payoff) अठारह सौ पैंतालीस में, ये रास्ता खुल गया। और उसकी एक सड़क, आज भी उनके नाम पर है। लेडी जमशेदजी रोड। [F21][F36]
- (comment) आज के ज़माने में, ऐसी शर्त कौन रखेगा? आप बताइए। (viewer/channel line, no fact)
- (outro) अगला शहर: हम्पी। एक बड़े साम्राज्य की राजधानी, जो आज खंडहर है। आख़िर हुआ क्या था? फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए। (viewer/channel line, no fact)

## ElevenLabs text (paste this)
```
एक औरत ने अपने पैसों से, समंदर पर रास्ता बनवाया... [excited] और शर्त रखी, कोई टोल नहीं!
नमस्ते... एपॉक आर्काइव्स में आपका स्वागत है। आज की कहानी... मुंबई की।
माहिम और बांद्रा के बीच, एक खाड़ी थी। लोग नावों से पार करते थे।
अठारह सौ चालीस-इकतालीस के आसपास... नावें पलटीं, और कई लोगों की जान गई।
तब आगे आईं, एक पारसी महिला। लेडी अवाबाई जमशेदजी जीजीभॉय।
उन्होंने डेढ़ लाख रुपये से ज़्यादा दान दिए। और बना... माहिम कॉज़वे।
बस एक शर्त। [whispers] इस रास्ते पर... लोगों से कभी टोल नहीं लिया जाएगा।
आपके शहर में भी... किसी ने ऐसा कोई रास्ता या पुल, दान से बनवाया है? कमेंट में बताइए।
अठारह सौ पैंतालीस में, ये रास्ता खुल गया। और उसकी एक सड़क... आज भी उनके नाम पर है। लेडी जमशेदजी रोड।
आज के ज़माने में... ऐसी शर्त कौन रखेगा? आप बताइए।
अगला शहर: हम्पी। एक बड़े साम्राज्य की राजधानी... जो आज खंडहर है। [curious] आख़िर हुआ क्या था? फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए।
```

## Characters (clay people, not animals; make each reference once in Flow and attach it in every scene with that character)
**SUTRADHAR:**
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, character reference sheet of the clay SUTRADHAR (small elderly storyteller, white beard, saffron-brown shawl, round spectacles, holding an old scroll), full body front view and close-up of face side by side, plain warm grey studio background, even soft light, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
**LADY:**
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, character reference sheet of the clay LADY (1840s Parsi lady, graceful white-and-maroon sari worn in Parsi style with the end over the head, calm determined face; generic, not a real likeness), full body front view and close-up of face side by side, plain warm grey studio background, even soft light, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Historical figures are generic clay figures dressed for the era; names appear only in captions.

## Scenes (one Flow clip each, ~5-6 s)
Negative prompt (if supported): `photorealistic, real photograph, 3D CGI render, glossy plastic, anime, cartoon line art, animals as main characters, text, letters, watermark, logo, extra fingers, distorted faces, gore, blood`

### short3-s01 (hook) | on-screen: शर्त: कोई टोल नहीं!
VO: एक औरत ने अपने पैसों से, समंदर पर रास्ता बनवाया... और शर्त रखी, कोई टोल नहीं!
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, the clay LADY (1840s Parsi lady, graceful white-and-maroon sari worn in Parsi style with the end over the head, calm determined face; generic, not a real likeness) standing at the start of a long stone causeway over the sea, people walking past her, warm golden hour light, low angle, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: slow push-in on the lady, sea breeze moves her sari edge.

### short3-s02 (brand) | on-screen: एपॉक आर्काइव्स | मुंबई
VO: नमस्ते, एपॉक आर्काइव्स में आपका स्वागत है। आज की कहानी, मुंबई की।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, the clay SUTRADHAR (small elderly storyteller, white beard, saffron-brown shawl, round spectacles, holding an old scroll) sitting on a wooden stool in a cosy lamp-lit archive room full of scrolls, he unrolls a scroll and a small clay map of the seven Bombay islands pops up from it, warm lamplight, medium shot facing camera, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: slow push-in as the scroll opens and the map rises; Sutradhar smiles at the viewer.

### short3-s03 (story) | on-screen: माहिम ↔ बांद्रा
VO: माहिम और बांद्रा के बीच, एक खाड़ी थी। लोग नावों से पार करते थे।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, small wooden clay ferry boats crowded with clay passengers crossing a wide creek between two shores with palm trees, 19th century Bombay, hazy morning light, wide shot, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: boats rock gently as they cross.

### short3-s04 (story) | on-screen: 1840-41
VO: अठारह सौ चालीस-इकतालीस के आसपास, नावें पलटीं, और कई लोगों की जान गई।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, an empty overturned clay boat floating on dark stormy clay water, broken oars, grey rain clouds, symbolic not violent, no people in danger shown, moody blue light, medium shot, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: rain falls, the boat drifts slowly.

### short3-s05 (story) | on-screen: लेडी अवाबाई
VO: तब आगे आईं, एक पारसी महिला। लेडी अवाबाई जमशेदजी जीजीभॉय।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, the clay LADY (1840s Parsi lady, graceful white-and-maroon sari worn in Parsi style with the end over the head, calm determined face; generic, not a real likeness) looking out at the stormy creek from a balcony with a determined expression, soft window light, medium close shot, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: slow push-in on her face, clouds move behind.

### short3-s06 (story) | on-screen: ₹1.5 लाख+ दान
VO: उन्होंने डेढ़ लाख रुपये से ज़्यादा दान दिए। और बना, माहिम कॉज़वे।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, clay workers building a long stone causeway across the creek with carts of stone, the clay LADY (1840s Parsi lady, graceful white-and-maroon sari worn in Parsi style with the end over the head, calm determined face; generic, not a real likeness) handing a cloth bag of coins to an engineer holding drawings, bright daylight, wide high angle, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: workers place stones, the causeway extends forward.

### short3-s07 (payoff) | on-screen: कोई टोल नहीं
VO: बस एक शर्त। इस रास्ते पर, लोगों से कभी टोल नहीं लिया जाएगा।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, a clay toll gate barrier being lifted and removed from a stone causeway while clay villagers, fishermen and carts pass freely, cheerful morning light, eye-level shot, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: barrier lifts, people walk through.

### short3-s08 (interaction) | on-screen: आपके शहर में? 👇
VO: आपके शहर में भी, किसी ने ऐसा कोई रास्ता या पुल दान से बनवाया है? कमेंट में बताइए।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, a clay map of India with tiny glowing bridges and roads appearing in different places, a few small clay people pointing at them, warm desk light, top-down shot, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: little bridges light up one by one across the map.

### short3-s09 (payoff) | on-screen: 1845 ✔ | एल. जे. रोड
VO: अठारह सौ पैंतालीस में, ये रास्ता खुल गया। और उसकी एक सड़क, आज भी उनके नाम पर है। लेडी जमशेदजी रोड।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, the finished stone causeway at sunset with horse carriages and people crossing, lanterns lit along the edge, the sea calm and golden, wide aerial three-quarter view, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: slow pull-back over the causeway at sunset.

### short3-s10 (comment) | on-screen: आप बताइए 👇
VO: आज के ज़माने में, ऐसी शर्त कौन रखेगा? आप बताइए।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, the clay LADY (1840s Parsi lady, graceful white-and-maroon sari worn in Parsi style with the end over the head, calm determined face; generic, not a real likeness) smiling softly at the camera at the end of the causeway, lanterns glowing behind her, warm evening light, close-up, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
Motion: gentle push-in, lantern light flickers on her face.

### short3-s11 (outro) | on-screen: अगला शहर: हम्पी 🏛️
VO: अगला शहर: हम्पी। एक बड़े साम्राज्य की राजधानी, जो आज खंडहर है। आख़िर हुआ क्या था? फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए।
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green, the clay SUTRADHAR (small elderly storyteller, white beard, saffron-brown shawl, round spectacles, holding an old scroll) rolling up his scroll and pointing at a clay relief map of India on the archive wall, a single glowing marker in Karnataka among clay boulders and tiny ruined stone temples, warm lamplight, medium shot facing camera, vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
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
- एक औरत ने समंदर पर रास्ता बनवाया, शर्त: कोई टोल नहीं! | Mahim Causeway #shorts
- Lady Avabai की अनोखी शर्त | Mumbai History in Hindi #shorts

**YouTube description:**
1840-41 के आसपास माहिम की खाड़ी में नावें पलटीं। लेडी अवाबाई जमशेदजी जीजीभॉय ने डेढ़ लाख रुपये से ज़्यादा देकर माहिम कॉज़वे बनवाया (1845), इस शर्त पर कि कभी टोल नहीं लगेगा। सड़क आज भी लेडी जमशेदजी रोड कहलाती है।
Sources: see research/mumbai/sources.md (F21, F36).
#mumbai #history #shorts

**Instagram Reel caption:**
एक औरत ने अपने पैसों से समंदर पर रास्ता बनवाया, और शर्त रखी: कोई टोल नहीं 🙏
लेडी अवाबाई और माहिम कॉज़वे की कहानी।
आपके शहर में भी ऐसा कोई दान वाला पुल है? 👇
अगला शहर: हम्पी 🏛️ फ़ॉलो करें!

#mumbai #mahim #bandra #indianhistory #historyinhindi #reels #epocharchives
