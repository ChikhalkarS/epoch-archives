# Flow prompts - असली सीन एपिसोड 2: समंदर से छीना गया शहर
<!-- Built by tools/build-shorts.mjs from shorts/mumbai/shorts.json + prompts/library.json v7. Edit those, not this file. -->

Tool: Google Flow (Veo for clips, Imagen for stills). Aspect ratio: 9:16 portrait. Clip length: 8 s (Flow default); use the first seconds listed per shot, they are the cleanest. Generate 2-4 takes per clip and pick one.
Audio: Non-speaking shots: ambient sound only, ending 'No music, no speech.' Speaking shots (SUTRADHAR on screen with a line): the exact Hindi line as dialogue, voice only. The edit mutes Flow's voice and lip-syncs the clip to the ElevenLabs line.
Timing: ESTIMATED from word count. After the ElevenLabs voice exists run `node tools/time-voice.mjs mumbai short2-sea` and rebuild; the seconds below then become exact.

## Order of work
1. Character references (once, reused every episode): SUTRADHAR -> prompts/characters/SUTRADHAR/sheet.png. Prompts in `prompts/LIBRARY.md`.
2. Stills (type `image`): generate in Flow, pick one each.
3. Clips: `ingredients` shots attach the listed sheets; `text` shots need nothing (or attach the still as first frame in Frames to Video for more control).
4. Name files by shot id (e.g. `short2-s01.mp4`) and drop them in `assets/mumbai/shorts/short2-sea/`.

| # | Line | Shot | Flow mode | Speaks on screen | Attach | Use (s, est.) |
|---|---|---|---|---|---|---|
| 1 | आप मुंबई की जिस सड़क पर खड़े हैं... | CU low | text | - | - | 3.2 |
| 2 | वो शायद कभी समंदर थी! | MS top | text | - | - | 2.1 |
| 3 | स्वागत है, असली सीन के दूसरे एपिसोड में। | WS low | ingredients | yes (lip-sync) | SUTRADHAR | 3.5 |
| 4 | मैं हूँ सूत्रधार, और आज की कहानी, मुंबई की। | MCU low | ingredients | yes (lip-sync) | SUTRADHAR | 3.8 |
| 5 | कभी मुंबई, सात अलग-अलग टापू थी। | EWS top | image | - | - | 2.7 |
| 6 | बीच में समंदर, और ज्वार में डूबती ज़मीन। | WS eye | text | - | - | 3.5 |
| 7 | मुंबई में रहते हैं? | MCU low | ingredients | yes (lip-sync) | SUTRADHAR | 1.8 |
| 8 | अपना इलाक़ा कमेंट में लिखिए। | CU top | image | - | SUTRADHAR | 2.1 |
| 9 | शायद वो भी, कभी समंदर था। | MS high | image | yes (lip-sync) | SUTRADHAR | 2.7 |
| 10 | सत्रह सौ बयासी में, गवर्नर हॉर्नबी ने वरली के पास, एक बड़ी समुद्री दीवार शुरू करवाई। | WS eye | text | - | - | 6.1 |
| 11 | हॉर्नबी वेलार्ड। | CU low | image | - | - | 1.2 |
| 12 | कहते हैं, दीवार बार-बार टूटती थी। | MS eye | image | - | - | 2.7 |
| 13 | फिर एक इंजीनियर के सपने के बाद, समंदर से देवी की मूर्तियाँ मिलीं, | MCU high | image | - | - | 5 |
| 14 | और बना महालक्ष्मी मंदिर। | WS low | image | - | - | 1.8 |
| 15 | ये एक लोक-कथा है। | CU eye | ingredients | yes (lip-sync) | SUTRADHAR | 1.8 |
| 16 | फिर बने कॉज़वे, | MS low | image | - | - | 1.4 |
| 17 | और उन्नीसवीं सदी के बीच तक, सात टापू, एक ज़मीन बन गए। | EWS top | text | - | - | 4.9 |
| 18 | और आज भी, कोस्टल रोड के लिए, समंदर से ज़मीन ली गई। | WS high | image | - | - | 4.6 |
| 19 | मुंबई बसाई नहीं गई। | MS low | ingredients | yes (lip-sync) | SUTRADHAR | 1.8 |
| 20 | समंदर से छीनी गई। | ECU high | ingredients | - | SUTRADHAR | 1.8 |
| 21 | समंदर से ज़मीन लेना, सही या ग़लत? | CU eye | text | - | - | 3.1 |
| 22 | कमेंट में लिखिए। | CU low | ingredients | yes (lip-sync) | SUTRADHAR | 1.4 |
| 23 | अगली कहानी: वो औरत, जिसने अपने पैसों से समंदर पर रास्ता बनवाया। | MS high | ingredients | yes (lip-sync) | SUTRADHAR | 4.9 |
| 24 | और फिर चलेंगे, हम्पी। | MS eye | ingredients | yes (lip-sync) | SUTRADHAR | 2 |
| 25 | फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए। | CU low | ingredients | yes (lip-sync) | SUTRADHAR | 3.2 |

## short2-s01 | text | CU low | use first 3.2 s (estimate)
Line: आप मुंबई की जिस सड़क पर खड़े हैं...
On screen (added in edit): ये ज़मीन कभी समंदर थी!
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. hook beat.

[Subjects and Relationships]
Close-up, low angle looking up: a tiny person's shoes standing on an old city road, thin cracks starting to spread across the road surface around the feet, dusk light.

[Event Script]
Stage 1: Opening state as described above. Locked camera, ground level. Cracks spread outward from the feet. End with a crack reaching the frame edge. The video ends holding this final state.

[Visual and Camera Treatment]
Close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s02 | text | MS top | use first 2.1 s (estimate)
Line: वो शायद कभी समंदर थी!
On screen (added in edit): समंदर!
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. hook beat.

[Subjects and Relationships]
Medium shot, top-down overhead view: looking straight down at the road splitting open to reveal deep blue sea water with small fish swimming beneath it.

[Event Script]
Stage 1: Opening state as described above. Fast push straight down into the opening; fish dart. End with the frame full of blue water. The video ends holding this final state.

[Visual and Camera Treatment]
Medium shot, top-down overhead view, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s03 | ingredients | WS low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: स्वागत है, असली सीन के दूसरे एपिसोड में।
On screen (added in edit): असली सीन 🐺
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. brand beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Wide shot, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) walking toward the camera down a narrow aisle of a lamp-lit stone archive, tall shelves of rolled scrolls on both sides rising to the top of frame, a small brass lantern he carries swinging gently at his hip, toward a tabletop sea diorama where seven islands float.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {स्वागत है, असली सीन के दूसरे एपिसोड में।} While he speaks: Camera tracks slowly backward at his walking pace. He walks toward the lens, lifts his eyes to the viewer and stops in a medium shot, lantern glow swaying on the shelves. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Wide shot, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s04 | ingredients | MCU low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: मैं हूँ सूत्रधार, और आज की कहानी, मुंबई की।
On screen (added in edit): आज: मुंबई
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. brand beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) holding an old scroll open toward the camera, a small model of seven separate islands slowly drifting together rising out of the parchment between his paws, warm lantern light from below-left, archive shelves softly blurred behind.

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

## short2-s05 | image | EWS top | use first 2.7 s (estimate)
Line: कभी मुंबई, सात अलग-अलग टापू थी।
On screen (added in edit): 7 टापू
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Extreme wide shot, top-down overhead view: seven separate green islands in a turquoise sea, small fishing boats with sails between them, tiny palm trees and huts, bright morning light., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short2-s06 | text | WS eye | use first 3.5 s (estimate)
Line: बीच में समंदर, और ज्वार में डूबती ज़मीन।
On screen (added in edit): ज्वार = बाढ़
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. story beat.

[Subjects and Relationships]
Wide shot, eye level: sea water flowing over low swampy land between two islands, small huts standing in the water, fishermen lifting their nets, overcast grey-blue light.

[Event Script]
Stage 1: Opening state as described above. Locked camera. The water level rises around the huts. End with water at the hut doors. The video ends holding this final state.

[Visual and Camera Treatment]
Wide shot, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s07 | ingredients | MCU low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: मुंबई में रहते हैं?
On screen (added in edit): मुंबई में हैं? 📍
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. interaction beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) leaning toward the camera, one paw raised with a tiny map pin between his claws, a map of today's Mumbai softly blurred behind him, warm rim light.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {मुंबई में रहते हैं?} While he speaks: Locked camera. He leans in toward the lens, one ear twitching, the raised brow lifting. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Medium close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s08 | image | CU top | use first 2.1 s (estimate)
Line: अपना इलाक़ा कमेंट में लिखिए।
On screen (added in edit): अपना इलाक़ा 👇
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Close-up, top-down overhead view: a grey-tawny wolf paw (SUTRADHAR) pushing small red map pins one by one into a map of today's Mumbai neighbourhoods. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short2-s09 | image | MS high | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: शायद वो भी, कभी समंदर था।
On screen (added in edit): शायद समंदर था!
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium shot, high angle looking down: the same Mumbai map with red pins, now a glowing blue outline of the old seven-island coastline lighting up over it, several pins standing inside the blue sea area, SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) at the map edge looking down. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short2-s10 | text | WS eye | use first 6.1 s (estimate)
Line: सत्रह सौ बयासी में, गवर्नर हॉर्नबी ने वरली के पास, एक बड़ी समुद्री दीवार शुरू करवाई।
On screen (added in edit): 1782
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. story beat.

[Subjects and Relationships]
Wide shot, eye level: many workers in 18th century Indian clothing carrying stones and baskets of earth along a half-built stone sea wall across a creek, a generic British official in a 1780s coat and tricorn hat watching with a rolled plan, golden afternoon light.

[Event Script]
Stage 1: Opening state as described above. Slow lateral track along the wall. Workers pass stones hand to hand. End on the official unrolling his plan. The video ends holding this final state.

[Visual and Camera Treatment]
Wide shot, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s11 | image | CU low | use first 1.2 s (estimate)
Line: हॉर्नबी वेलार्ड।
On screen (added in edit): हॉर्नबी वेलार्ड
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Close-up, low angle looking up: a wave crashing against new grey stones of the sea wall, spray rising into the light., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short2-s12 | image | MS eye | use first 2.7 s (estimate)
Line: कहते हैं, दीवार बार-बार टूटती थी।
On screen (added in edit): कहते हैं...
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium shot, eye level: a section of the unfinished stone sea wall slumping and sliding into the sea while workers step back safely on the shore, grey sky., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short2-s13 | image | MCU high | use first 5 s (estimate)
Line: फिर एक इंजीनियर के सपने के बाद, समंदर से देवी की मूर्तियाँ मिलीं,
On screen (added in edit): लोक-कथा ✨
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium close-up, high angle looking down: a engineer in 18th century Indian clothing sleeping on a mat by a small oil lamp, a soft golden glow from the calm night sea visible through the open doorway, respectful and serene, no deity faces shown., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short2-s14 | image | WS low | use first 1.8 s (estimate)
Line: और बना महालक्ष्मी मंदिर।
On screen (added in edit): महालक्ष्मी मंदिर
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Wide shot, low angle looking up: a small seaside temple with a saffron flag on rocks beside the finished stone sea wall, calm sea at sunrise, tiny respectful devotees on the steps, respectful depiction, no deity close-up., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short2-s15 | ingredients | CU eye | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: ये एक लोक-कथा है।
On screen (added in edit): लोक-कथा
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. story beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, eye level: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) snapping the scroll shut in one paw and raising one clawed finger of the other paw beside his muzzle, one eyebrow raised, dark archive background with a single warm rim light.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {ये एक लोक-कथा है।} While he speaks: Quick short push-in, then hold. He snaps the scroll shut and raises one finger beside his muzzle, one brow raised. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Close-up, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s16 | image | MS low | use first 1.4 s (estimate)
Line: फिर बने कॉज़वे,
On screen (added in edit): कॉज़वे
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium shot, low angle looking up: a horse cart rolling across a new stone causeway over shallow water, 19th century, soft morning light., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short2-s17 | text | EWS top | use first 4.9 s (estimate)
Line: और उन्नीसवीं सदी के बीच तक, सात टापू, एक ज़मीन बन गए।
On screen (added in edit): 7 ➜ 1
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. payoff beat.

[Subjects and Relationships]
Extreme wide shot, top-down overhead view: the seven islands from the earlier shot, now joined into one long landmass by stone causeways and filled land, colonial buildings appearing, warm light.

[Event Script]
Stage 1: Opening state as described above. Slow rise straight up. The last gaps fill with land. End on the single landmass. The video ends holding this final state.

[Visual and Camera Treatment]
Extreme wide shot, top-down overhead view, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s18 | image | WS high | use first 4.6 s (estimate)
Line: और आज भी, कोस्टल रोड के लिए, समंदर से ज़मीन ली गई।
On screen (added in edit): आज भी: कोस्टल रोड
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Wide shot, high angle looking down: miniature model of a modern coastal highway curving along the sea beside a city skyline, a seawall of big stones holding back waves, sunset light (modern road and buildings allowed in this shot)., vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short2-s19 | ingredients | MS low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: मुंबई बसाई नहीं गई।
On screen (added in edit): बसाई नहीं...
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. payoff beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium shot, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) standing on top of the stone seawall of the miniature model, waves breaking below his feet, city lights behind him.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {मुंबई बसाई नहीं गई।} While he speaks: Locked low camera. A wave breaks below; his indigo stole moves in the wind. End with him looking down at the sea. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Medium shot, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s20 | ingredients | ECU high | use first 1.8 s (estimate)
Line: समंदर से छीनी गई।
On screen (added in edit): समंदर से छीनी गई 🌊
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. payoff beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Extreme close-up, high angle looking down: a grey-tawny wolf paw (SUTRADHAR) pressing down on wet land at the waterline, pushing the blue water back.

[Event Script]
Stage 1: Opening state as described above. Locked camera. The paw presses and the water retreats. End with dry land under the paw. The video ends holding this final state.

[Visual and Camera Treatment]
Extreme close-up, high angle looking down, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s21 | text | CU eye | use first 3.1 s (estimate)
Line: समंदर से ज़मीन लेना, सही या ग़लत?
On screen (added in edit): सही या ग़लत?
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. comment beat.

[Subjects and Relationships]
Close-up, eye level: a balance scale on a rock by the sea: one pan holds a tiny city block, the other a tiny wave with fish, dusk light.

[Event Script]
Stage 1: Opening state as described above. Locked camera. The scale tips one way, then the other. End balanced. The video ends holding this final state.

[Visual and Camera Treatment]
Close-up, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: quiet ambient room tone. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s22 | ingredients | CU low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: कमेंट में लिखिए।
On screen (added in edit): कमेंट 👇
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. comment beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) pointing one paw straight at the camera with his smug one-sided smirk, lantern glow on his fur, the balance scale by the sea in soft background.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {कमेंट में लिखिए।} While he speaks: Locked camera, very slight push-in. His paw comes up and points straight at the lens. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s23 | ingredients | MS high | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: अगली कहानी: वो औरत, जिसने अपने पैसों से समंदर पर रास्ता बनवाया।
On screen (added in edit): अगला: अवाबाई
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. outro beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium shot, high angle looking down: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) crouching beside a tabletop miniature model of a long stone causeway across a creek, reaching out with one paw to set a tiny lantern down at the start of the causeway, lantern set down beside him.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {अगली कहानी: वो औरत, जिसने अपने पैसों से समंदर पर रास्ता बनवाया।} While he speaks: Slow descending crane toward him. He reaches out and set a tiny lantern down at the start of the causeway, then lifts his face to the camera. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Medium shot, high angle looking down, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s24 | ingredients | MS eye | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: और फिर चलेंगे, हम्पी।
On screen (added in edit): फिर: हम्पी
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. outro beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium shot, eye level: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) standing beside a large carved relief map of India on the archive wall, body turned toward the camera, one paw resting on the map at a glowing marker on the Mumbai coast and a second marker in Karnataka among tiny boulders, the lantern hanging from his other paw.

[Event Script]
Stage 1 - line: Opening state as described above. From the first second, SUTRADHAR looks into the lens and says in Hindi, in a deep, calm, slightly smug storyteller voice: {और फिर चलेंगे, हम्पी।} While he speaks: Locked camera. Facing the lens, he taps the marker on the map; it pulses brighter while he keeps his eyes on the viewer. His mouth moves clearly and naturally with every syllable, jaw and lips shaping each word; when the line ends his mouth closes into his smirk. Only SUTRADHAR speaks.
Stage 2 - hold: Continue from the previous stage. The line is finished; he holds the final pose with his mouth closed in his smirk, and the video ends holding this state.

[Visual and Camera Treatment]
Medium shot, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: only SUTRADHAR's voice speaking the line, over near-silent room tone. No music, no sound effects.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, spectacles, clothing and proportions in every frame. Character lock: SUTRADHAR is clearly a wolf, not a fox or jackal: broad skull, long heavy muzzle, thick grey-tawny fur ruff at cheeks and neck, grey crown; sharp golden-amber heavy-lidded eyes; exactly one pair of round brass-rimmed spectacles worn low on the snout; maroon bandhgala jacket with high band collar and small brass buttons; cream kurta collar at the neck; indigo angavastram stole over the LEFT shoulder; faded indigo cloth satchel strap across the chest; smug one-sided smirk. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short2-s25 | ingredients | CU low | SPEAKS (lip-sync) | keep the whole 8 s clip
Line: फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए।
On screen (added in edit): फ़ॉलो करें ➕
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. follow beat.

[Reference Material Roles]
Ingredient 1 (prompts/characters/SUTRADHAR/sheet.png) defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) close to the camera at the end of a dark archive aisle, lantern held low so its warm light catches his spectacles and the underside of his muzzle, the sea wall at dusk receding into shadow behind him.

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
