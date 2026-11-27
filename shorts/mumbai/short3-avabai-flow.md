# Flow prompts - असली सीन एपिसोड 3: टोल-फ़्री रास्ते वाली अवाबाई
<!-- Built by tools/build-shorts.mjs from shorts/mumbai/shorts.json + prompts/library.json v7. Edit those, not this file. -->

Tool: Google Flow (Veo for clips, Imagen for stills). Aspect ratio: 9:16 portrait. Clip length: 8 s (Flow default); use the first seconds listed per shot, they are the cleanest. Generate 2-4 takes per clip and pick one.
Audio: Non-speaking shots: ambient sound only, ending 'No music, no speech.' Speaking shots (SUTRADHAR on screen with a line): the exact Hindi line as dialogue, voice only. The edit mutes Flow's voice and lip-syncs the clip to the ElevenLabs line.
Timing: ESTIMATED from word count. After the ElevenLabs voice exists run `node tools/time-voice.mjs mumbai short3-avabai` and rebuild; the seconds below then become exact.

## Order of work
1. Character references (once, reused every episode): MUMBAI_LADY -> prompts/characters/MUMBAI_LADY/sheet.png; SUTRADHAR -> prompts/characters/SUTRADHAR/sheet.png. Prompts in `prompts/LIBRARY.md`.
2. Stills (type `image`): generate in Flow, pick one each.
3. Clips: `ingredients` shots attach the listed sheets; `text` shots need nothing (or attach the still as first frame in Frames to Video for more control).
4. Name files by shot id (e.g. `short3-s01.mp4`) and drop them in `assets/mumbai/shorts/short3-avabai/`.

| # | Line | Shot | Flow mode | Speaks on screen | Attach | Use (s, est.) |
|---|---|---|---|---|---|---|
| 1 | एक औरत ने अपने पैसों से, समंदर पर रास्ता बनवाया... | WS low | ingredients | - | MUMBAI_LADY | 3.9 |
| 2 | और शर्त रखी, कोई टोल नहीं! | CU eye | ingredients | - | MUMBAI_LADY | 2.5 |
| 3 | स्वागत है, असली सीन के तीसरे एपिसोड में। | WS low | ingredients | yes (lip-sync) | SUTRADHAR | 3.5 |
| 4 | मैं हूँ सूत्रधार, और आज की कहानी, मुंबई की। | MCU low | ingredients | yes (lip-sync) | SUTRADHAR | 3.8 |
| 5 | माहिम और बांद्रा के बीच, एक खाड़ी थी। | EWS high | image | - | - | 3.2 |
| 6 | लोग नावों से पार करते थे। | MS eye | image | - | - | 2.5 |
| 7 | अठारह सौ चालीस-इकतालीस के आसपास, नावें पलटीं, | WS high | image | - | - | 3.1 |
| 8 | और कई लोगों की जान गई। | CU eye | image | - | - | 2.5 |
| 9 | तब आगे आईं, एक पारसी महिला। | MS low | image | - | MUMBAI_LADY | 2.5 |
| 10 | लेडी अवाबाई जमशेदजी जीजीभॉय। | CU eye | image | - | MUMBAI_LADY | 1.8 |
| 11 | उन्होंने डेढ़ लाख रुपये से ज़्यादा दान दिए। | ECU high | ingredients | - | MUMBAI_LADY | 3.2 |
| 12 | और बना, माहिम कॉज़वे। | WS high | image | - | - | 2 |
| 13 | बस एक शर्त। | CU eye | ingredients | yes (lip-sync) | SUTRADHAR | 1.4 |
| 14 | इस रास्ते पर, लोगों से कभी टोल नहीं लिया जाएगा। | MS eye | image | - | - | 4.2 |
| 15 | आपके शहर में भी, किसी ने ऐसा कोई रास्ता या पुल दान से बनवाया है? | MS high | ingredients | yes (lip-sync) | SUTRADHAR | 6 |
| 16 | कमेंट में बताइए। | CU low | ingredients | yes (lip-sync) | SUTRADHAR | 1.4 |
| 17 | अठारह सौ पैंतालीस में, ये रास्ता खुल गया। | EWS high | text | - | - | 3.2 |
| 18 | और उसकी एक सड़क, आज भी उनके नाम पर है। लेडी जमशेदजी रोड। | MS low | image | - | - | 5.2 |
| 19 | आज के ज़माने में, ऐसी शर्त कौन रखेगा? | CU eye | image | - | MUMBAI_LADY | 3.5 |
| 20 | आप बताइए। | MCU low | ingredients | yes (lip-sync) | SUTRADHAR | 1.2 |
| 21 | अगला शहर: हम्पी। | MS eye | ingredients | yes (lip-sync) | SUTRADHAR | 1.4 |
| 22 | एक बड़े साम्राज्य की राजधानी, जो आज खंडहर है। | EWS low | ingredients | - | SUTRADHAR | 3.8 |
| 23 | आख़िर हुआ क्या था? | CU eye | ingredients | yes (lip-sync) | SUTRADHAR | 1.8 |
| 24 | फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए। | CU low | ingredients | yes (lip-sync) | SUTRADHAR | 3.2 |

## short3-s01 | ingredients | WS low | use first 3.9 s (estimate)
Line: एक औरत ने अपने पैसों से, समंदर पर रास्ता बनवाया...
On screen (added in edit): समंदर पर रास्ता?
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/MUMBAI_LADY/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. hook beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/MUMBAI_LADY/sheet.png) defines MUMBAI_LADY's face, hair and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Wide shot, low angle looking up: the LADY (1840s Parsi lady, white silk sari with maroon border worn over the head, kind determined face) standing at the start of a long stone causeway stretching away over the sea toward a far shore at the top of frame, people walking past her, golden hour.

[Event Script]
Stage 1: Opening state as described above. Slow push-in toward her. The sea breeze moves the sari end. End on her looking down the causeway. The video ends holding this final state.

[Visual and Camera Treatment]
Wide shot, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep MUMBAI_LADY identical to the ingredients in face, clothing and proportions in every frame. Character lock: the LADY always wears a white silk sari with a maroon embroidered border drawn over her head in the Parsi style, a long-sleeved white blouse, small gold earrings; kind dark-brown eyes with fine lines, black hair with some grey. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s02 | ingredients | CU eye | use first 2.5 s (estimate)
Line: और शर्त रखी, कोई टोल नहीं!
On screen (added in edit): शर्त: कोई टोल नहीं!
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/MUMBAI_LADY/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. hook beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/MUMBAI_LADY/sheet.png) defines MUMBAI_LADY's face, hair and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, eye level: the hand of the LADY (1840s Parsi lady, white silk sari with maroon border worn over the head, kind determined face) pushing up a wooden toll-gate barrier pole across the causeway.

[Event Script]
Stage 1: Opening state as described above. Locked camera. Her hand lifts the pole until it stands upright. End on the open way behind it. The video ends holding this final state.

[Visual and Camera Treatment]
Close-up, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep MUMBAI_LADY identical to the ingredients in face, clothing and proportions in every frame. Character lock: the LADY always wears a white silk sari with a maroon embroidered border drawn over her head in the Parsi style, a long-sleeved white blouse, small gold earrings; kind dark-brown eyes with fine lines, black hair with some grey. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s03 | ingredients | WS low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: स्वागत है, असली सीन के तीसरे एपिसोड में।
On screen (added in edit): असली सीन 🐺
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. brand beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Wide shot, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) walking toward the camera down a narrow aisle of a lamp-lit stone archive, tall shelves of rolled scrolls on both sides rising to the top of frame, a small brass lantern he carries swinging gently at his hip, toward a tabletop diorama of a creek between two shores.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {स्वागत है, असली सीन के तीसरे एपिसोड में।} While he speaks: Camera tracks slowly backward at his walking pace. He walks toward the lens, lifts his eyes to the viewer and stops in a medium shot, lantern glow swaying on the shelves. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Wide shot, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s04 | ingredients | MCU low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: मैं हूँ सूत्रधार, और आज की कहानी, मुंबई की।
On screen (added in edit): आज: मुंबई
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. brand beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) holding an old scroll open toward the camera, a small model of a stone causeway crossing a creek between two shores rising out of the parchment between his paws, warm lantern light from below-left, archive shelves softly blurred behind.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {मैं हूँ सूत्रधार, और आज की कहानी, मुंबई की।} While he speaks: Locked camera with a slow push-in. He unrolls the scroll toward the lens and the tiny model rises out of it, his eyes looking over it into the lens. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Medium close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s05 | image | EWS high | use first 3.2 s (estimate)
Line: माहिम और बांद्रा के बीच, एक खाड़ी थी।
On screen (added in edit): माहिम ↔ बांद्रा
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Extreme wide shot, high angle looking down: a wide creek of blue water between two palm-lined shores with small villages, 19th century Bombay, hazy morning light., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s06 | image | MS eye | use first 2.5 s (estimate)
Line: लोग नावों से पार करते थे।
On screen (added in edit): नाव से पार
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium shot, eye level: a small wooden ferry boat crowded with passengers and baskets crossing the creek, the boatman pushing with a long pole., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s07 | image | WS high | use first 3.1 s (estimate)
Line: अठारह सौ चालीस-इकतालीस के आसपास, नावें पलटीं,
On screen (added in edit): 1840-41
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Wide shot, high angle looking down: an empty overturned boat floating on dark stormy water, broken oars drifting, grey rain clouds, symbolic, no people shown., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s08 | image | CU eye | use first 2.5 s (estimate)
Line: और कई लोगों की जान गई।
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Close-up, eye level: a single small unlit lantern floating alone on dark rippling water, symbolic and quiet., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s09 | image | MS low | use first 2.5 s (estimate)
Line: तब आगे आईं, एक पारसी महिला।
On screen (added in edit): एक पारसी महिला
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan. Attach: prompts/characters/MUMBAI_LADY/sheet.png.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium shot, low angle looking up: the LADY (1840s Parsi lady, white silk sari with maroon border worn over the head, kind determined face) stepping out onto a wooden balcony overlooking the stormy creek. Character lock: the LADY always wears a white silk sari with a maroon embroidered border drawn over her head in the Parsi style, a long-sleeved white blouse, small gold earrings; kind dark-brown eyes with fine lines, black hair with some grey., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s10 | image | CU eye | use first 1.8 s (estimate)
Line: लेडी अवाबाई जमशेदजी जीजीभॉय।
On screen (added in edit): लेडी अवाबाई
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan. Attach: prompts/characters/MUMBAI_LADY/sheet.png.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Close-up, eye level: face of the LADY (1840s Parsi lady, white silk sari with maroon border worn over the head, kind determined face) lit by soft window light, rain-streaked glass behind her. Character lock: the LADY always wears a white silk sari with a maroon embroidered border drawn over her head in the Parsi style, a long-sleeved white blouse, small gold earrings; kind dark-brown eyes with fine lines, black hair with some grey., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s11 | ingredients | ECU high | use first 3.2 s (estimate)
Line: उन्होंने डेढ़ लाख रुपये से ज़्यादा दान दिए।
On screen (added in edit): ₹1.5 लाख+ दान
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/MUMBAI_LADY/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. story beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/MUMBAI_LADY/sheet.png) defines MUMBAI_LADY's face, hair and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Extreme close-up, high angle looking down: the hands of the LADY (1840s Parsi lady, white silk sari with maroon border worn over the head, kind determined face) placing a heavy embroidered cloth bag of coins into the hands of an engineer holding rolled drawings.

[Event Script]
Stage 1: Opening state as described above. Locked camera. The bag passes from her hands to his. End on his hands closing around it. The video ends holding this final state.

[Visual and Camera Treatment]
Extreme close-up, high angle looking down, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep MUMBAI_LADY identical to the ingredients in face, clothing and proportions in every frame. Character lock: the LADY always wears a white silk sari with a maroon embroidered border drawn over her head in the Parsi style, a long-sleeved white blouse, small gold earrings; kind dark-brown eyes with fine lines, black hair with some grey. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s12 | image | WS high | use first 2 s (estimate)
Line: और बना, माहिम कॉज़वे।
On screen (added in edit): माहिम कॉज़वे
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Wide shot, high angle looking down: workers laying big stones of a long causeway across the creek, carts of stone, bright daylight., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s13 | ingredients | CU eye | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: बस एक शर्त।
On screen (added in edit): एक शर्त
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. twist beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, eye level: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) snapping the scroll shut in one paw and raising one clawed finger of the other paw beside his muzzle, one eyebrow raised, dark archive background with a single warm rim light.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {बस एक शर्त।} While he speaks: Quick short push-in, then hold. He snaps the scroll shut and raises one finger beside his muzzle, one brow raised. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Close-up, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s14 | image | MS eye | use first 4.2 s (estimate)
Line: इस रास्ते पर, लोगों से कभी टोल नहीं लिया जाएगा।
On screen (added in edit): कोई टोल नहीं
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium shot, eye level: villagers, fishermen with baskets and a bullock cart passing freely over the stone causeway where a toll barrier has been removed and laid on the ground., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s15 | ingredients | MS high | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: आपके शहर में भी, किसी ने ऐसा कोई रास्ता या पुल दान से बनवाया है?
On screen (added in edit): आपके शहर में?
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. interaction beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium shot, high angle looking down: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) crouching beside a tabletop miniature model of a map of India dotted with tiny bridges, reaching out with one paw to touch one tiny bridge, which lights up, lantern set down beside him.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {आपके शहर में भी, किसी ने ऐसा कोई रास्ता या पुल दान से बनवाया है?} While he speaks: Slow descending crane toward him. He reaches out and touch one tiny bridge, which lights up, then lifts his face to the camera. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Medium shot, high angle looking down, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s16 | ingredients | CU low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: कमेंट में बताइए।
On screen (added in edit): कमेंट 👇
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. interaction beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) pointing one paw straight at the camera with his smug one-sided smirk, lantern glow on his fur, the glowing map of India in soft background.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {कमेंट में बताइए।} While he speaks: Locked camera, very slight push-in. His paw comes up and points straight at the lens. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s17 | text | EWS high | use first 3.2 s (estimate)
Line: अठारह सौ पैंतालीस में, ये रास्ता खुल गया।
On screen (added in edit): 1845 ✔
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. payoff beat.

[Subjects and Relationships]
Extreme wide shot, high angle looking down: the finished stone causeway at sunset with horse carriages and people crossing, lanterns lit along its edge, calm golden sea.

[Event Script]
Stage 1: Opening state as described above. Slow pull-back over the causeway. End with the full causeway shore to shore. The video ends holding this final state.

[Visual and Camera Treatment]
Extreme wide shot, high angle looking down, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s18 | image | MS low | use first 5.2 s (estimate)
Line: और उसकी एक सड़क, आज भी उनके नाम पर है। लेडी जमशेदजी रोड।
On screen (added in edit): एल. जे. रोड
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium shot, low angle looking up: a busy modern Mumbai street with buses, taxis and old trees, an old stone building at the corner, warm afternoon light, no readable signs (modern vehicles allowed in this shot)., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s19 | image | CU eye | use first 3.5 s (estimate)
Line: आज के ज़माने में, ऐसी शर्त कौन रखेगा?
On screen (added in edit): आज कौन रखेगा?
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan. Attach: prompts/characters/MUMBAI_LADY/sheet.png.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Close-up, eye level: the LADY (1840s Parsi lady, white silk sari with maroon border worn over the head, kind determined face) smiling softly at the end of the causeway, lanterns glowing behind her, warm evening light. Character lock: the LADY always wears a white silk sari with a maroon embroidered border drawn over her head in the Parsi style, a long-sleeved white blouse, small gold earrings; kind dark-brown eyes with fine lines, black hair with some grey., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short3-s20 | ingredients | MCU low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: आप बताइए।
On screen (added in edit): आप बताइए 👇
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. comment beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) leaning toward the camera, both paws resting on his lantern, the lantern-lit causeway softly blurred behind him, warm rim light.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {आप बताइए।} While he speaks: Locked camera. He leans in toward the lens, one ear twitching, the raised brow lifting. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Medium close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s21 | ingredients | MS eye | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: अगला शहर: हम्पी।
On screen (added in edit): अगला शहर: हम्पी 🏛️
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. outro beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium shot, eye level: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) standing beside a large carved relief map of India on the archive wall, body turned toward the camera, one paw resting on the map at a single glowing marker in Karnataka among tiny boulders and ruined temples, the lantern hanging from his other paw.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {अगला शहर: हम्पी।} While he speaks: Locked camera. Facing the lens, he taps the marker on the map; it pulses brighter while he keeps his eyes on the viewer. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Medium shot, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s22 | ingredients | EWS low | use first 3.8 s (estimate)
Line: एक बड़े साम्राज्य की राजधानी, जो आज खंडहर है।
On screen (added in edit): खंडहर क्यों?
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. outro beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Extreme wide shot, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) as a small figure walking between giant rounded boulders and ruined stone temple pillars rising to the top of frame, warm dusk light.

[Event Script]
Stage 1: Opening state as described above. Slow tilt up from the wolf to the tops of the boulders. End on the ruins against the sky. The video ends holding this final state.

[Visual and Camera Treatment]
Extreme wide shot, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s23 | ingredients | CU eye | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: आख़िर हुआ क्या था?
On screen (added in edit): आख़िर क्या हुआ?
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. outro beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, eye level: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel)'s face close to the camera, lit only by the lantern held just below frame, golden-amber eyes over the brass rims of his spectacles, deep shadow on one side of his face.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {आख़िर हुआ क्या था?} While he speaks: Very slow push-in. He leans a little closer, eyes narrowing as if sharing a secret. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Close-up, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short3-s24 | ingredients | CU low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए।
On screen (added in edit): फ़ॉलो करें ➕
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. follow beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) close to the camera at the end of a dark archive aisle, lantern held low so its warm light catches his spectacles and the underside of his muzzle, giant boulders at dusk receding into shadow behind him.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए।} While he speaks: Locked camera. He looks into the lens; when he finishes he gives a slow knowing nod, turns and steps away into the shadows, his lantern glowing. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```
