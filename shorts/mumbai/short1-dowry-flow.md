# Flow prompts - असली सीन एपिसोड 1: दहेज में मिला शहर
<!-- Built by tools/build-shorts.mjs from shorts/mumbai/shorts.json + prompts/library.json v4. Edit those, not this file. -->

Tool: Google Flow (Veo for clips, Imagen for stills). Aspect ratio: 9:16 portrait. Clip length: 8 s (Flow default); use the first seconds listed per shot, they are the cleanest. Generate 2-4 takes per clip and pick one.
Audio: Audio is ambient sound only. Always end with 'No music, no speech.' The narration is ElevenLabs and music is added in the edit.
Timing: ESTIMATED from word count. After the ElevenLabs voice exists run `node tools/time-voice.mjs mumbai short1-dowry` and rebuild; the seconds below then become exact.

## Order of work
1. Character references (once, reused every episode): SUTRADHAR -> prompts/characters/SUTRADHAR/sheet.png; MUMBAI_PRINCESS -> prompts/characters/MUMBAI_PRINCESS/sheet.png; MUMBAI_KING -> prompts/characters/MUMBAI_KING/sheet.png; MUMBAI_MERCHANT -> prompts/characters/MUMBAI_MERCHANT/sheet.png. Prompts in `prompts/LIBRARY.md`.
2. Stills (type `image`): generate in Flow, pick one each.
3. Clips: `ingredients` shots attach the listed sheets; `text` shots need nothing (or attach the still as first frame in Frames to Video for more control).
4. Name files by shot id (e.g. `short1-s01.mp4`) and drop them in `assets/mumbai/shorts/short1-dowry/`.

| # | Line | Shot | Flow mode | Attach | Use (s, est.) |
|---|---|---|---|---|---|
| 1 | दहेज में सोना नहीं, घोड़े नहीं... | CU low | text | - | 2.5 |
| 2 | पूरा एक शहर! | MS top | text | - | 1.4 |
| 3 | स्वागत है, असली सीन के पहले एपिसोड में। | WS low | ingredients | SUTRADHAR | 3.5 |
| 4 | मैं हूँ भेड़िया, और आज की कहानी, मुंबई की। | MCU low | ingredients | SUTRADHAR | 3.8 |
| 5 | सोलह सौ इकसठ। | ECU eye | image | - | 1.4 |
| 6 | पुर्तगाल की राजकुमारी कैथरीन की शादी तय हुई, इंग्लैंड के राजा चार्ल्स द्वितीय से। | WS eye | image | MUMBAI_PRINCESS, MUMBAI_KING | 5.6 |
| 7 | तब मुंबई, सात छोटे टापू थी। | EWS top | image | - | 2.5 |
| 8 | और राज था पुर्तगालियों का। | MS low | image | - | 2.1 |
| 9 | शादी के समझौते में, दहेज की लिस्ट बनी। | ECU high | image | - | 3.2 |
| 10 | अफ़्रीका का टैंजियर। | MCU eye | image | - | 1.4 |
| 11 | और भारत का, बॉम्बे। | CU high | image | - | 2 |
| 12 | लेकिन ट्विस्ट यहाँ है। | CU eye | ingredients | SUTRADHAR | 1.8 |
| 13 | दहेज हाथ आने में ही, चार साल लग गए। | MS eye | image | MUMBAI_KING | 3.8 |
| 14 | और तब पता चला, ये तोहफ़ा नहीं, बहुत महँगा बोझ है। | WS high | image | MUMBAI_KING | 4.5 |
| 15 | सोचिए, आप राजा होते, तो क्या करते? | MCU low | ingredients | SUTRADHAR | 3.1 |
| 16 | राजा ने सोलह सौ अड़सठ में, पूरा बॉम्बे, ईस्ट इंडिया कंपनी को किराए पर दे दिया। | MS ots | ingredients | MUMBAI_KING, MUMBAI_MERCHANT | 6.3 |
| 17 | और किराया? | MCU low | ingredients | SUTRADHAR | 1.2 |
| 18 | साल का सिर्फ़ दस पाउंड! | ECU high | text | - | 2.4 |
| 19 | वही दहेज वाला टापू, आज भारत की आर्थिक राजधानी कहलाता है। मुंबई। | EWS low | text | - | 4.9 |
| 20 | अब बताइए, आज मुंबई का किराया कितना होना चाहिए? | MS high | ingredients | SUTRADHAR | 3.8 |
| 21 | कमेंट में लिखिए। | CU low | ingredients | SUTRADHAR | 1.4 |
| 22 | अगली कहानी: मुंबई की वो ज़मीन, जो कभी समंदर थी। | MS high | ingredients | SUTRADHAR | 4.2 |
| 23 | और फिर चलेंगे, हम्पी। | MS ots | ingredients | SUTRADHAR | 2 |
| 24 | फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए। | WS eye | ingredients | SUTRADHAR | 3.2 |

## short1-s01 | text | CU low | use first 2.5 s (estimate)
Line: दहेज में सोना नहीं, घोड़े नहीं...
On screen (added in edit): दहेज में पूरा शहर?!
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. Open on the mystery: a royal dowry chest about to reveal its treasure.

[Subjects and Relationships]
Close-up, low angle looking up: an ornate wooden royal treasure chest with brass corners on a palace table, its lid starting to lift and blinding golden light leaking out of the gap, dark palace hall behind.

[Event Script]
Stage 1: Opening state as described above. Locked camera, slight push-in. The lid lifts open and golden light floods out. End with the lid fully open and the glow filling the upper frame. The video ends holding this final state.

[Visual and Camera Treatment]
Close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: a heavy wooden lid creaking open, a soft rising shimmer. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s02 | text | MS top | use first 1.4 s (estimate)
Line: पूरा एक शहर!
On screen (added in edit): पूरा शहर!
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. Reveal the twist of the hook: the treasure is a whole island city.

[Subjects and Relationships]
Medium shot, top-down overhead view: looking straight down into the open treasure chest: instead of gold coins a tiny island with palm trees, fishing huts and boats on turquoise water fills the chest, golden glow around the edges.

[Event Script]
Stage 1: Opening state as described above. Fast descending push straight down into the chest. Tiny palm trees sway and a boat bobs. End close over the island. The video ends holding this final state.

[Visual and Camera Treatment]
Medium shot, top-down overhead view, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: gentle sea waves lapping, a distant gull. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s03 | ingredients | WS low | use first 3.5 s (estimate)
Line: स्वागत है, असली सीन के पहले एपिसोड में।
On screen (added in edit): असली सीन 🐺
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. Introduce the narrator walking in to greet the viewer.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Wide shot, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) walking toward the camera down a narrow aisle of a lamp-lit stone archive, tall shelves of rolled scrolls on both sides rising to the top of frame, a small brass lantern he carries swinging gently at his hip, toward a reading table where a small treasure chest sits.

[Event Script]
Stage 1: Opening state as described above. Camera tracks slowly backward at his walking pace. He walks from mid-aisle toward the lens and stops in a medium shot, lifting his eyes to the viewer with his smug one-sided smirk. Lantern glow sways on the shelves. End on him standing still, facing camera. The video ends holding this final state.

[Visual and Camera Treatment]
Wide shot, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: his footsteps on stone, the lantern's handle creaking softly, quiet archive room tone. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s04 | ingredients | MCU low | use first 3.8 s (estimate)
Line: मैं हूँ भेड़िया, और आज की कहानी, मुंबई की।
On screen (added in edit): आज: मुंबई
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. The narrator presents today's city from his scroll.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) holding an old scroll open toward the camera, a small model of the seven small Bombay islands in a turquoise sea rising out of the parchment between his paws, warm lantern light from below-left, archive shelves softly blurred behind.

[Event Script]
Stage 1: Opening state as described above. Locked camera with a slow push-in. He unrolls the scroll; the tiny diorama rises out of it and settles. End with his eyes looking over the diorama straight into the lens. The video ends holding this final state.

[Visual and Camera Treatment]
Medium close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: parchment unrolling, a faint magical shimmer as the model rises. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s05 | image | ECU eye | use first 1.4 s (estimate)
Line: सोलह सौ इकसठ।
On screen (added in edit): 1661
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Extreme close-up, eye level: a hand pressing a brass seal into hot red wax on the corner of a parchment treaty, candle flame beside it, vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short1-s06 | image | WS eye | use first 5.6 s (estimate)
Line: पुर्तगाल की राजकुमारी कैथरीन की शादी तय हुई, इंग्लैंड के राजा चार्ल्स द्वितीय से।
On screen (added in edit): कैथरीन 👑 चार्ल्स
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan. Attach: prompts/characters/MUMBAI_PRINCESS/sheet.png, prompts/characters/MUMBAI_KING/sheet.png.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Wide shot, eye level: staged in depth down a long candle-lit table in a royal hall: the PRINCESS (young woman, dark ringlets with pearl pins, pale rose court gown with white lace collar, pearl necklace) near camera in the lower half of frame, the KING (thin moustache, long black curly wig, deep crimson velvet coat with gold trim, white lace cravat) at the far end higher in frame, the sealed treaty scroll in the middle of the table, tall arched windows behind him, vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short1-s07 | image | EWS top | use first 2.5 s (estimate)
Line: तब मुंबई, सात छोटे टापू थी।
On screen (added in edit): 7 टापू
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Extreme wide shot, top-down overhead view: seven small separate green islands scattered in a turquoise sea, tiny fishing sailboats between them, bright morning light, vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short1-s08 | image | MS low | use first 2.1 s (estimate)
Line: और राज था पुर्तगालियों का।
On screen (added in edit): पुर्तगाली राज
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium shot, low angle looking up: a generic 16th century Portuguese soldier in a steel morion helmet and breastplate standing guard on a stone fort rampart above the sea, a plain red-and-white banner on a pole beside him, fishing boats far below, vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short1-s09 | image | ECU high | use first 3.2 s (estimate)
Line: शादी के समझौते में, दहेज की लिस्ट बनी।
On screen (added in edit): दहेज की लिस्ट
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Extreme close-up, high angle looking down: a hand with a feather quill writing lines of unreadable squiggles on a long parchment list that unrolls off the desk edge, ink pot and candle, vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short1-s10 | image | MCU eye | use first 1.4 s (estimate)
Line: अफ़्रीका का टैंजियर।
On screen (added in edit): टैंजियर 🌍
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium close-up, eye level: a tiny model of a walled white North African port town with a harbour and sailing ships, sitting on the candle-lit desk next to the list, vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short1-s11 | image | CU high | use first 2 s (estimate)
Line: और भारत का, बॉम्बे।
On screen (added in edit): + बॉम्बे 🏝️
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Close-up, high angle looking down: a clerk's hand placing a tiny palm-tree island model on the desk right beside the port town model, candle light, vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short1-s12 | ingredients | CU eye | use first 1.8 s (estimate)
Line: लेकिन ट्विस्ट यहाँ है।
On screen (added in edit): ट्विस्ट!
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. The narrator cuts in to flag the twist.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, eye level: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) snapping the scroll shut in one paw and raising one clawed finger of the other paw beside his muzzle, one eyebrow raised, dark archive background with a single warm rim light.

[Event Script]
Stage 1: Opening state as described above. Quick short push-in, then hold. He snaps the scroll shut and raises one finger. End frozen on the raised finger and raised brow. The video ends holding this final state.

[Visual and Camera Treatment]
Close-up, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: a scroll snapping shut, a soft whoosh. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s13 | image | MS eye | use first 3.8 s (estimate)
Line: दहेज हाथ आने में ही, चार साल लग गए।
On screen (added in edit): 4 साल ⏳
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan. Attach: prompts/characters/MUMBAI_KING/sheet.png.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Medium shot, eye level: the KING (thin moustache, long black curly wig, deep crimson velvet coat with gold trim, white lace cravat) sitting at a window drumming his fingers on the sill beside a hourglass, a waiting sailing ship visible on the sea outside, evening light, vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short1-s14 | image | WS high | use first 4.5 s (estimate)
Line: और तब पता चला, ये तोहफ़ा नहीं, बहुत महँगा बोझ है।
On screen (added in edit): तोहफ़ा या बोझ?
Flow: Image (still): generate in Flow with the image prompt; the edit adds a slow push or pan. Attach: prompts/characters/MUMBAI_KING/sheet.png.
```
2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes for fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, strong rim light on edges, accent colours maroon, indigo, brass and ochre, Wide shot, high angle looking down: the KING (thin moustache, long black curly wig, deep crimson velvet coat with gold trim, white lace cravat) slumped on his throne holding his forehead, surrounded by tall piles of bills and empty coin bags, the tiny island model on a velvet cushion at his feet, dim moody light, vertical 9:16 composition, 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution, every sign, page and banner is blank or carries unreadable squiggles, clean uncaptioned image
```

## short1-s15 | ingredients | MCU low | use first 3.1 s (estimate)
Line: सोचिए, आप राजा होते, तो क्या करते?
On screen (added in edit): आप क्या करते? 🤔
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. The narrator asks the viewer what they would do as king.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) leaning toward the camera, sitting on the empty royal throne with the tiny island model balanced on one paw, the piles of royal bills softly blurred behind him, warm rim light.

[Event Script]
Stage 1: Opening state as described above. Locked camera. He leans in toward the lens, one ear twitches, the raised brow lifts. End with his face close, waiting for an answer. The video ends holding this final state.

[Visual and Camera Treatment]
Medium close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: a throne creaking as he leans forward, quiet room tone. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s16 | ingredients | MS ots | use first 6.3 s (estimate)
Line: राजा ने सोलह सौ अड़सठ में, पूरा बॉम्बे, ईस्ट इंडिया कंपनी को किराए पर दे दिया।
On screen (added in edit): 1668: किराए पर!
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/MUMBAI_KING/sheet.png, prompts/characters/MUMBAI_MERCHANT/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. The king hands Bombay to the East India Company on lease.

[Reference Material Roles]
Ingredient 1 defines MUMBAI_KING's face, hair and clothing. Do not use its grey background or panel layout.
Ingredient 2 defines MUMBAI_MERCHANT's face, hair and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium shot, over-the-shoulder: staged in depth in a lamp-lit office: the KING (thin moustache, long black curly wig, deep crimson velvet coat with gold trim, white lace cravat) near camera at the lower left, seen from behind his shoulder, holding out a rolled royal charter with a red wax seal; the MERCHANT (stocky English trader, short brown beard, brown 17th century coat, wide-brimmed black hat, leather ledger) a step further back and higher in frame, facing the king and reaching for it, tall sailing ships through the window behind the merchant.

[Event Script]
Stage 1: Opening state as described above. Locked camera. The charter passes from the king's hand into the merchant's; the merchant tucks it under his arm. End on the merchant's satisfied smile over the king's shoulder. The video ends holding this final state.

[Visual and Camera Treatment]
Medium shot, over-the-shoulder, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: parchment passing hand to hand, ships' rigging creaking outside. No music, no speech.

[Maintain Consistency]
Keep MUMBAI_KING, MUMBAI_MERCHANT identical to the ingredients in face, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s17 | ingredients | MCU low | use first 1.2 s (estimate)
Line: और किराया?
On screen (added in edit): किराया?
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. The narrator teases the rent amount.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) leaning toward the camera, holding a single small gold coin up beside his eye in the lantern light, dark archive shelves softly blurred behind him, warm rim light.

[Event Script]
Stage 1: Opening state as described above. Locked camera. He leans in toward the lens, one ear twitches, the raised brow lifts. End with his face close, waiting for an answer. The video ends holding this final state.

[Visual and Camera Treatment]
Medium close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: a single coin ringing softly as he lifts it. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s18 | text | ECU high | use first 2.4 s (estimate)
Line: साल का सिर्फ़ दस पाउंड!
On screen (added in edit): सिर्फ़ £10 / साल 😳
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. Payoff: the rent was just ten pounds a year.

[Subjects and Relationships]
Extreme close-up, high angle looking down: a single small gold coin dropping onto a big parchment map of the seven islands on a wooden table, warm spotlight, extreme shallow depth of field.

[Event Script]
Stage 1: Opening state as described above. Locked camera. The coin drops into frame, spins and settles flat on the islands. End on the still coin. The video ends holding this final state.

[Visual and Camera Treatment]
Extreme close-up, high angle looking down, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: one coin dropping, spinning and settling on paper. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s19 | text | EWS low | use first 4.9 s (estimate)
Line: वही दहेज वाला टापू, आज भारत की आर्थिक राजधानी कहलाता है। मुंबई।
On screen (added in edit): दहेज ➜ मुंबई
Flow: Text to Video: paste the prompt, no attachments.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. Payoff: that dowry island is today's Mumbai.

[Subjects and Relationships]
Extreme wide shot, low angle looking up: miniature model of a dense modern Mumbai skyline, tall towers rising to the top of frame, a curved seafront promenade with street lights in the lower third, Arabian Sea at dusk (modern buildings allowed in this shot).

[Event Script]
Stage 1: Opening state as described above. Slow crane up from the seafront to the tower tops as the city lights switch on. End on the lit skyline. The video ends holding this final state.

[Visual and Camera Treatment]
Extreme wide shot, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: evening city hum, distant traffic and sea. No music, no speech.

[Maintain Consistency]
Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s20 | ingredients | MS high | use first 3.8 s (estimate)
Line: अब बताइए, आज मुंबई का किराया कितना होना चाहिए?
On screen (added in edit): आज का किराया?
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. The narrator invites the viewer's guess at Mumbai's rent today.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium shot, high angle looking down: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) crouching beside a tabletop miniature model of the modern Mumbai skyline at night, reaching out with one paw to tap the top of the tallest tower with one claw, lantern set down beside him.

[Event Script]
Stage 1: Opening state as described above. Slow descending crane toward his paw. He reaches out and tap the top of the tallest tower with one claw. End with the paw resting on the diorama and his eyes lifting to the camera. The video ends holding this final state.

[Visual and Camera Treatment]
Medium shot, high angle looking down, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: a fingertip tap on a model tower, faint city hum. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s21 | ingredients | CU low | use first 1.4 s (estimate)
Line: कमेंट में लिखिए।
On screen (added in edit): कमेंट 👇
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. Ask for a comment.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Close-up, low angle looking up: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) pointing one paw straight at the camera with his smug one-sided smirk, lantern glow on his fur, the glowing city diorama in soft background.

[Event Script]
Stage 1: Opening state as described above. Locked camera, very slight push-in. His paw comes up and points at the lens. End on the point, paw sharp, face just behind it. The video ends holding this final state.

[Visual and Camera Treatment]
Close-up, low angle looking up, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: a soft whoosh as he points. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s22 | ingredients | MS high | use first 4.2 s (estimate)
Line: अगली कहानी: मुंबई की वो ज़मीन, जो कभी समंदर थी।
On screen (added in edit): अगला: समंदर वाली ज़मीन 🌊
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. Tease the next story: land that was once sea.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium shot, high angle looking down: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) crouching beside a tabletop miniature model of a city street, reaching out with one paw to press the road, which cracks open to show blue sea water underneath, lantern set down beside him.

[Event Script]
Stage 1: Opening state as described above. Slow descending crane toward his paw. He reaches out and press the road, which cracks open to show blue sea water underneath. End with the paw resting on the diorama and his eyes lifting to the camera. The video ends holding this final state.

[Visual and Camera Treatment]
Medium shot, high angle looking down, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: a road surface cracking, water bubbling up beneath. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s23 | ingredients | MS ots | use first 2 s (estimate)
Line: और फिर चलेंगे, हम्पी।
On screen (added in edit): फिर: हम्पी
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. Tease the next city: Hampi.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Medium shot, over-the-shoulder: over-the-shoulder view from behind SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) as he stands before a large carved relief map of India on the archive wall, a glowing marker on the Mumbai coast and a second marker in Karnataka among tiny boulders, the lantern raised in one paw.

[Event Script]
Stage 1: Opening state as described above. Locked camera behind his shoulder. He reaches up and taps the glowing marker; it pulses brighter. End with his paw on the marker and his head turning halfway back toward camera. The video ends holding this final state.

[Visual and Camera Treatment]
Medium shot, over-the-shoulder, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: a map marker humming softly as it glows. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```

## short1-s24 | ingredients | WS eye | use first 3.2 s (estimate)
Line: फ़ॉलो कीजिए, ताकि अगली कहानी छूट न जाए।
On screen (added in edit): फ़ॉलो करें ➕
Flow: Ingredients to Video: attach the listed reference sheets (max 3) and paste the prompt. Attach: prompts/characters/SUTRADHAR/sheet.png.
```
[Generation Goal]
A vertical 9:16 shot in a 2D noir graphic-novel cartoon style for a Hindi history Short. Sign off and ask the viewer to follow.

[Reference Material Roles]
Ingredient 1 defines SUTRADHAR's face, fur, spectacles and clothing. Do not use its grey background or panel layout.

[Subjects and Relationships]
Wide shot, eye level: SUTRADHAR, the anthropomorphic Indian grey wolf narrator (broad wolf skull, heavy muzzle, grey-tawny fur with a thick neck ruff, golden-amber eyes over round brass-rimmed spectacles low on the snout, smug one-sided smirk, maroon bandhgala with brass buttons, indigo stole over the left shoulder, faded indigo satchel) seen from behind walking away from camera down the archive aisle into the shadows, the lantern the only warm light, long shadow stretching toward the lens.

[Event Script]
Stage 1: Opening state as described above. Locked camera. He walks away into the dark, stops, and looks back over his shoulder at the viewer for a beat. End on the over-the-shoulder glance with the lantern glowing. The video ends holding this final state.

[Visual and Camera Treatment]
Wide shot, eye level, native vertical framing with the main face or subject in the upper-middle third and the top and bottom edges kept calm. 2D digital cartoon in a modern noir graphic-novel style: thick clean black outlines, smooth cel shading with soft gradient shadows, crisp jagged ink strokes on fur and hair, high contrast, warm amber lamp light against deep charcoal and sepia shadows, rim light on edges. Every sign, page and banner is blank or carries unreadable squiggles.

[Audio]
Audio: footsteps fading down the aisle, lantern creak. No music, no speech.

[Maintain Consistency]
Keep SUTRADHAR identical to the ingredients in face, fur, exactly one pair of spectacles, clothing and proportions. Keep the 2D noir cel-shaded line style, the light direction and the camera's side of the action the same from first frame to last.
```
