# Prompt library (v9, 2026-11-28)

<!-- Built from prompts/library.json by tools/build-shorts.mjs. Edit the JSON, not this file. -->

Single source of truth for every image/clip prompt. Always keep the latest best version here; bump the item's version and add a line to prompts/CHANGELOG.md. Episode files are built from this by tools/build-shorts.mjs.

## Style

**2D noir graphic-novel cartoon, master style v4 (owner 2026-11-27: one style in every frame)**

**Prefix:**
```
STYLE, identical in every shot: 2D hand-drawn digital cartoon in a modern noir graphic-novel look, like frames from one animated series. Every shape, including hands, faces, fur, objects and backgrounds, is drawn with bold, clean, uniform black ink outlines and filled with flat cel colour plus one or two hard-edged shadow tones; soft gradient only inside the deepest shadows. Fur and hair are crisp jagged ink strokes. Hands and skin are simple drawn shapes with ink outlines and flat colour, smooth, without pores or wrinkles. Materials such as wax, brass, wood, cloth and water are drawn as flat shapes with one hard white highlight, matte, never glossy. Lighting: one warm amber lamp key light, deep charcoal and sepia shadows, a thin warm rim light on edges, high contrast. Palette: amber, sepia, charcoal, maroon, indigo, brass and ochre, with turquoise only for sea water.
```
**Vertical suffix:**
```
. Vertical 9:16 frame. Every sign, page and banner is blank or carries unreadable squiggles. Same 2D noir graphic-novel cartoon style as the style reference: bold uniform black outlines, flat cel colour, hard-edged shadows, drawn hands and materials.
```
**Negative:**
```
photorealistic, real photograph, 3D render, CGI, claymation, plasticine, painterly oil texture, glossy highlights, realistic skin texture, wrinkles and pores, anime, chibi, watercolor wash, blurry lines, text, letters, words, names, watermark, logo, extra fingers, extra limbs, distorted faces, gore, blood
```

## Style key (make first, attach to every shot)

Generate 4 in Flow (image), pick the one whose look matches the approved wolf frame (bold outlines, flat colour). Save as prompts/style/style-key.png. Attach it to EVERY shot as the first ingredient/reference.
```
Style key frame for an animated noir graphic-novel series, vertical 9:16. STYLE, identical in every shot: 2D hand-drawn digital cartoon in a modern noir graphic-novel look, like frames from one animated series. Every shape, including hands, faces, fur, objects and backgrounds, is drawn with bold, clean, uniform black ink outlines and filled with flat cel colour plus one or two hard-edged shadow tones; soft gradient only inside the deepest shadows. Fur and hair are crisp jagged ink strokes. Hands and skin are simple drawn shapes with ink outlines and flat colour, smooth, without pores or wrinkles. Materials such as wax, brass, wood, cloth and water are drawn as flat shapes with one hard white highlight, matte, never glossy. Lighting: one warm amber lamp key light, deep charcoal and sepia shadows, a thin warm rim light on edges, high contrast. Palette: amber, sepia, charcoal, maroon, indigo, brass and ochre, with turquoise only for sea water. Scene: a candle-lit wooden desk at night; a man's hand in a dark coat sleeve presses a brass seal into red wax on a parchment covered in unreadable squiggles; an ornate wooden chest with brass corners and a small brass lantern stand beside it; behind, shelves of rolled scrolls fade into charcoal shadow. The hand, wax, brass and candle flame are drawn as flat outlined cartoon shapes, exactly like the rest of the frame. Every page is unreadable squiggles. Same 2D noir graphic-novel cartoon style as the style reference: bold uniform black outlines, flat cel colour, hard-edged shadows, drawn hands and materials.
```
Save as: prompts/style/style-key.png

## Framing words

- EWS: Extreme wide shot
- WS: Wide shot
- MS: Medium shot
- MCU: Medium close-up
- CU: Close-up
- ECU: Extreme close-up
- eye: eye level
- low: low angle looking up
- high: high angle looking down
- top: top-down overhead view
- ots: over-the-shoulder
- profile: side profile
- dutch: slightly canted dutch angle

native 9:16; subject's face in the upper-middle third; keep faces and key action out of the top 12% and bottom 20% (platform buttons); stage in depth, not side by side

## Characters

### SUTRADHAR (v4, channel (every episode))
the wolf narrator of आर्काइव फ़ाइल्स; says "मैं आपका भिड़ू" (SUTRADHAR is his prompt ID)
Exactly one pair of spectacles. Adult, sharp, detective attitude; never cute. Appears in the brand intro, cut-ins, viewer lines, comment ask and outro.

Step 1 - close-up (owner's prompt, verbatim). Generate several, pick the best:
```
Ultra-detailed 2D digital cartoon portrait of SUTRADHAR, an anthropomorphic Indian grey wolf, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, fur drawn with crisp jagged strokes.
Chest-up framing, three-quarter view turned slightly toward camera, plain cool grey background, even soft studio light.
EYES: sharp golden-amber eyes, heavy-lidded and knowing, looking over round brass-rimmed spectacles worn low on the snout, one eyebrow cocked higher than the other.
FUR: slim Indian wolf face, sandy-tawny coat with grey on the crown and back of the neck, cream muzzle, cheeks and throat, a dark nose, pointed ears with tawny backs.
EXPRESSION: a smug, confident smirk with one corner of the mouth raised, chin slightly up, the calm look of someone who already knows the answer.
CLOTHING: maroon bandhgala jacket with a high band collar and small brass buttons, cream kurta collar showing at the neck, an indigo angavastram stole draped over the left shoulder, the strap of a faded indigo cloth satchel across the chest.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
WOLF BUILD: clearly a wolf, not a fox or jackal: broader skull, longer and heavier muzzle, thick fur ruff around the cheeks and neck, ears smaller in proportion to the head, a slightly heavier brow ridge, grey-tawny coat with more grey on the head.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Character reference sheet of the same character as the reference image, 2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, 16:9 landscape, three panels side by side on one seamless cool grey studio background, identical grey across all panels.
Left panel (about 45% of width): bust-up portrait from the chest up, three-quarter view toward camera.
Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height.
Right panel: full body standing straight, rear view from directly behind, heels visible.
Even studio light, identical face, fur and clothing in all three panels.
IDENTITY:
EYES: sharp golden-amber eyes, heavy-lidded and knowing, looking over round brass-rimmed spectacles worn low on the snout, one eyebrow cocked higher than the other.
FUR: slim Indian wolf face, sandy-tawny coat with grey on the crown and back of the neck, cream muzzle, cheeks and throat, a dark nose, pointed ears with tawny backs.
EXPRESSION: a smug, confident smirk with one corner of the mouth raised, chin slightly up, the calm look of someone who already knows the answer.
CLOTHING: maroon bandhgala jacket with a high band collar and small brass buttons, cream kurta collar showing at the neck, an indigo angavastram stole draped over the left shoulder, the strap of a faded indigo cloth satchel across the chest.
WOLF BUILD: clearly a wolf, not a fox or jackal: broader skull, longer and heavier muzzle, thick fur ruff around the cheeks and neck, ears smaller in proportion to the head, a slightly heavier brow ridge, grey-tawny coat with more grey on the head.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
```
Role line for every later prompt:
```
Image 1 defines the wolf narrator's face, fur, spectacles and clothing. Do not use its grey background or panel layout.
```
Save as: prompts/characters/SUTRADHAR/closeup.png, prompts/characters/SUTRADHAR/sheet.png, prompts/characters/SUTRADHAR/profile.png

### MUMBAI_PRINCESS (v4, mumbai)
Princess (generic 1661 Portuguese royal, captioned as Catherine)
Generic figure, not a real likeness; name only in captions.

Step 1 - close-up (generate several, pick the best):
```
Ultra-detailed 2D digital cartoon portrait of MUMBAI_PRINCESS, a young 17th century Portuguese princess, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, hair drawn with crisp flowing ink strokes.
Chest-up framing, three-quarter view turned slightly toward camera, plain cool grey background, even soft studio light.
EYES: large dark-brown almond eyes, soft upper lids, gentle arched dark brows.
SKIN AND HAIR: warm olive skin, a small beauty mark under the left eye; dark brown hair parted in the centre, falling in tight ringlets at both sides of the face, small pearl pins.
EXPRESSION: poised, polite closed-lip smile, curious eyes.
CLOTHING: pale rose silk court gown with a wide white lace collar, fitted bodice with small pearl buttons, full skirt to the floor, a short single-strand pearl necklace, no crown.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
BUILD: woman in her early twenties, slim, medium height.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Character reference sheet of the same character as the reference image, 2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, 16:9 landscape, three panels side by side on one seamless cool grey studio background, identical grey across all panels.
Left panel (about 45% of width): bust-up portrait from the chest up, three-quarter view toward camera.
Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height.
Right panel: full body standing straight, rear view from directly behind, heels visible.
Even studio light, identical face, hair and clothing in all three panels.
IDENTITY:
EYES: large dark-brown almond eyes, soft upper lids, gentle arched dark brows.
SKIN AND HAIR: warm olive skin, a small beauty mark under the left eye; dark brown hair parted in the centre, falling in tight ringlets at both sides of the face, small pearl pins.
EXPRESSION: poised, polite closed-lip smile, curious eyes.
CLOTHING: pale rose silk court gown with a wide white lace collar, fitted bodice with small pearl buttons, full skirt to the floor, a short single-strand pearl necklace, no crown.
BUILD: woman in her early twenties, slim, medium height.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
```
Role line for every later prompt:
```
Image 1 defines the princess's face, hair and clothing. Do not use its grey background or panel layout.
```
Save as: prompts/characters/MUMBAI_PRINCESS/sheet.png

### MUMBAI_KING (v4, mumbai)
King (generic 1660s English monarch, captioned as Charles II)
Generic figure, not a real likeness; name only in captions.

Step 1 - close-up (generate several, pick the best):
```
Ultra-detailed 2D digital cartoon portrait of MUMBAI_KING, a 1660s English king, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, wig curls drawn with crisp ink strokes.
Chest-up framing, three-quarter view turned slightly toward camera, plain cool grey background, even soft studio light.
EYES: dark heavy-lidded brown eyes, thick dark brows.
SKIN AND HAIR: pale skin, long face, thin black moustache; long black curly wig falling past the shoulders.
EXPRESSION: worldly, slightly tired, one raised eyebrow.
CLOTHING: deep crimson velvet knee-length coat with gold trim and gold buttons, white lace cravat, dark breeches, white stockings, black buckled shoes; a small gold crown only in throne scenes.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
BUILD: man in his early thirties, tall and slim.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Character reference sheet of the same character as the reference image, 2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, 16:9 landscape, three panels side by side on one seamless cool grey studio background, identical grey across all panels.
Left panel (about 45% of width): bust-up portrait from the chest up, three-quarter view toward camera.
Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height.
Right panel: full body standing straight, rear view from directly behind, heels visible.
Even studio light, identical face, hair and clothing in all three panels.
IDENTITY:
EYES: dark heavy-lidded brown eyes, thick dark brows.
SKIN AND HAIR: pale skin, long face, thin black moustache; long black curly wig falling past the shoulders.
EXPRESSION: worldly, slightly tired, one raised eyebrow.
CLOTHING: deep crimson velvet knee-length coat with gold trim and gold buttons, white lace cravat, dark breeches, white stockings, black buckled shoes; a small gold crown only in throne scenes.
BUILD: man in his early thirties, tall and slim.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
```
Role line for every later prompt:
```
Image 1 defines the king's face, hair and clothing. Do not use its grey background or panel layout.
```
Save as: prompts/characters/MUMBAI_KING/sheet.png

### MUMBAI_MERCHANT (v4, mumbai)
East India Company merchant (generic 1660s)
Generic figure.

Step 1 - close-up (generate several, pick the best):
```
Ultra-detailed 2D digital cartoon portrait of MUMBAI_MERCHANT, a middle-aged English trader of the 1660s, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, beard drawn with crisp ink strokes.
Chest-up framing, three-quarter view turned slightly toward camera, plain cool grey background, even soft studio light.
EYES: small pale-blue eyes, bushy brown brows.
SKIN AND HAIR: ruddy skin, short brown beard, shoulder-length straight brown hair.
EXPRESSION: shrewd, pleased, a small satisfied smile.
CLOTHING: plain brown wool knee-length coat with pewter buttons, white linen collar, dark breeches, black boots, wide-brimmed black hat, a leather-bound ledger under the left arm.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
BUILD: man in his forties, stocky.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Character reference sheet of the same character as the reference image, 2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, 16:9 landscape, three panels side by side on one seamless cool grey studio background, identical grey across all panels.
Left panel (about 45% of width): bust-up portrait from the chest up, three-quarter view toward camera.
Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height.
Right panel: full body standing straight, rear view from directly behind, heels visible.
Even studio light, identical face, hair and clothing in all three panels.
IDENTITY:
EYES: small pale-blue eyes, bushy brown brows.
SKIN AND HAIR: ruddy skin, short brown beard, shoulder-length straight brown hair.
EXPRESSION: shrewd, pleased, a small satisfied smile.
CLOTHING: plain brown wool knee-length coat with pewter buttons, white linen collar, dark breeches, black boots, wide-brimmed black hat, a leather-bound ledger under the left arm.
BUILD: man in his forties, stocky.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
```
Role line for every later prompt:
```
Image 1 defines the merchant's face, hair and clothing. Do not use its grey background or panel layout.
```
Save as: prompts/characters/MUMBAI_MERCHANT/sheet.png

### MUMBAI_LADY (v4, mumbai)
Parsi lady of the 1840s (generic, captioned as Lady Avabai Jamsetjee Jeejeebhoy)
Generic figure, not a real likeness; name only in captions.

Step 1 - close-up (generate several, pick the best):
```
Ultra-detailed 2D digital cartoon portrait of MUMBAI_LADY, a dignified Parsi lady of 1840s Bombay, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, sari folds drawn with crisp ink strokes.
Chest-up framing, three-quarter view turned slightly toward camera, plain cool grey background, even soft studio light.
EYES: kind dark-brown eyes, fine lines at the corners, soft grey-black brows.
SKIN AND HAIR: fair-wheat skin, gentle smile lines; black hair with some grey, covered by the sari end.
EXPRESSION: calm and determined, a soft closed-lip smile.
CLOTHING: white silk sari with a maroon embroidered border, worn in the Parsi style with the end drawn over the head, long-sleeved white blouse, small gold earrings, simple dark slippers.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
BUILD: woman in her fifties, medium build, upright posture.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Character reference sheet of the same character as the reference image, 2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, 16:9 landscape, three panels side by side on one seamless cool grey studio background, identical grey across all panels.
Left panel (about 45% of width): bust-up portrait from the chest up, three-quarter view toward camera.
Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height.
Right panel: full body standing straight, rear view from directly behind, heels visible.
Even studio light, identical face, hair and clothing in all three panels.
IDENTITY:
EYES: kind dark-brown eyes, fine lines at the corners, soft grey-black brows.
SKIN AND HAIR: fair-wheat skin, gentle smile lines; black hair with some grey, covered by the sari end.
EXPRESSION: calm and determined, a soft closed-lip smile.
CLOTHING: white silk sari with a maroon embroidered border, worn in the Parsi style with the end drawn over the head, long-sleeved white blouse, small gold earrings, simple dark slippers.
BUILD: woman in her fifties, medium build, upright posture.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
```
Role line for every later prompt:
```
Image 1 defines the Parsi lady's face, hair and clothing. Do not use its grey background or panel layout.
```
Save as: prompts/characters/MUMBAI_LADY/sheet.png

### AKOLA_RANI (v1, akola)
Queen (generic folk-tale queen of the Akola legend)
Legend character, not a historical likeness. Always dignified and devotional.

Step 1 - close-up (generate several, pick the best):
```
Ultra-detailed 2D digital cartoon portrait of AKOLA_RANI, a young medieval central Indian queen from a folk tale, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, sari folds and hair drawn with crisp flowing ink strokes.
Chest-up framing, three-quarter view turned slightly toward camera, plain cool grey background, even soft studio light.
EYES: large dark-brown almond eyes with long lashes, gentle arched black brows, calm devotional gaze.
SKIN AND HAIR: warm brown skin, a small round red bindi, a small gold nose ring; long black hair in a low braid under her veil.
EXPRESSION: serene and steady, lips softly closed, quiet courage.
CLOTHING: deep maroon silk sari with a thin gold border, its end draped over her head as a veil, gold bangles on both wrists, silver anklets, bare feet; carries a small brass oil lamp only in night walking shots.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
BUILD: woman in her mid-twenties, slender, medium height, graceful upright posture.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Character reference sheet of the same character as the reference image, 2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, 16:9 landscape, three panels side by side on one seamless cool grey studio background, identical grey across all panels.
Left panel (about 45% of width): bust-up portrait from the chest up, three-quarter view toward camera.
Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height.
Right panel: full body standing straight, rear view from directly behind, heels visible.
Even studio light, identical face, hair and clothing in all three panels.
IDENTITY:
EYES: large dark-brown almond eyes with long lashes, gentle arched black brows, calm devotional gaze.
SKIN AND HAIR: warm brown skin, a small round red bindi, a small gold nose ring; long black hair in a low braid under her veil.
EXPRESSION: serene and steady, lips softly closed, quiet courage.
CLOTHING: deep maroon silk sari with a thin gold border, its end draped over her head as a veil, gold bangles on both wrists, silver anklets, bare feet; carries a small brass oil lamp only in night walking shots.
BUILD: woman in her mid-twenties, slender, medium height, graceful upright posture.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
```
Role line for every later prompt:
```
Image 1 defines the queen's face, hair and clothing. Do not use its grey background or panel layout.
```
Save as: prompts/characters/AKOLA_RANI/sheet.png

### AKOLA_RAJA (v1, akola)
King (generic folk-tale king Akolsingh of the Akola legend)
Legend character, not a historical likeness. His sword stays sheathed in every shot; never raised at the queen.

Step 1 - close-up (generate several, pick the best):
```
Ultra-detailed 2D digital cartoon portrait of AKOLA_RAJA, a medieval central Indian king from a folk tale, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, moustache and turban folds drawn with crisp ink strokes.
Chest-up framing, three-quarter view turned slightly toward camera, plain cool grey background, even soft studio light.
EYES: dark narrow brown eyes under heavy black brows, suspicious sideways glance.
SKIN AND HAIR: wheat-brown skin, strong jaw, thick black upturned moustache, short black sideburns under the turban.
EXPRESSION: brooding and suspicious, jaw set, brows drawn together.
CLOTHING: saffron turban with a single pearl string and a small plume, long cream angarkha tied at the side, deep red waist sash, curved sword in a black scabbard at his left hip (always sheathed), brown leather mojaris.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
BUILD: man in his mid-thirties, broad-shouldered, tall.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Character reference sheet of the same character as the reference image, 2D digital cartoon, modern noir graphic-novel style, thick clean black outlines, smooth cel shading with soft gradient shadows, 16:9 landscape, three panels side by side on one seamless cool grey studio background, identical grey across all panels.
Left panel (about 45% of width): bust-up portrait from the chest up, three-quarter view toward camera.
Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height.
Right panel: full body standing straight, rear view from directly behind, heels visible.
Even studio light, identical face, hair and clothing in all three panels.
IDENTITY:
EYES: dark narrow brown eyes under heavy black brows, suspicious sideways glance.
SKIN AND HAIR: wheat-brown skin, strong jaw, thick black upturned moustache, short black sideburns under the turban.
EXPRESSION: brooding and suspicious, jaw set, brows drawn together.
CLOTHING: saffron turban with a single pearl string and a small plume, long cream angarkha tied at the side, deep red waist sash, curved sword in a black scabbard at his left hip (always sheathed), brown leather mojaris.
BUILD: man in his mid-thirties, broad-shouldered, tall.
TECHNICAL: 2D cartoon illustration, cel colours with soft painted shading, sharp lines, high resolution.
```
Role line for every later prompt:
```
Image 1 defines the king's face, hair and clothing. Do not use its grey background or panel layout.
```
Save as: prompts/characters/AKOLA_RAJA/sheet.png

## Branding

### profile_picture (v1, owner 2026-11-27)
Attach: prompts/characters/SUTRADHAR/closeup.png
```
Channel profile picture, square 1:1, of SUTRADHAR, the same anthropomorphic Indian grey wolf as the reference image, 2D digital cartoon in a modern noir graphic-novel style, thick clean black outlines, smooth cel shading, fur drawn with crisp jagged strokes.
FRAMING: head and upper shoulders only, centred, the face filling about 70% of the frame, with a little empty space around the ears so it survives a circular crop.
EXPRESSION: suspicious detective attitude: eyes narrowed and heavy-lidded, sharp golden-amber eyes looking straight at the viewer over round brass-rimmed spectacles worn low on his snout, one eyebrow raised high, a slow smug one-sided smirk, chin slightly lowered as if he has just caught you lying.
DETAILS: broad wolf skull, heavy muzzle, thick grey-tawny fur ruff at the neck, maroon bandhgala collar with brass buttons, indigo stole on one shoulder, exactly one pair of spectacles.
LIGHTING: single warm amber lamp light from the lower left, a strong rim light on the fur edges, deep shadow on the right side of the face.
BACKGROUND: plain deep charcoal-to-sepia gradient with a soft dark vignette, nothing else.
High contrast, bold and readable at small sizes. No text, no letters, no watermark.
```
Save as: prompts/characters/SUTRADHAR/profile.png

## Narrator shot bank

Reusable narrator (SUTRADHAR) shots. Vary them: never the same template twice in a row. Templates with speaks=true show his face and get his exact line as dialogue so Flow animates his mouth (the Flow voice is discarded; assemble-short retimes the clip to the ElevenLabs line). Templates with speaks=false keep his mouth closed (voice-over over that shot). Props (lantern, scroll) are carried in a shot, not part of his fixed design.

### walk_in (v4) - WS / low / clip
```
{SUTRADHAR} walking toward the camera down a narrow aisle of a lamp-lit stone archive, tall shelves of rolled scrolls on both sides rising to the top of frame, a small brass lantern he carries swinging gently at his hip, {extra}
```
Motion: Camera tracks slowly backward at his walking pace. He walks toward the lens, lifts his eyes to the viewer and stops in a medium shot, lantern glow swaying on the shelves.

### scroll_reveal (v4) - MCU / low / clip
```
{SUTRADHAR} holding an old scroll open toward the camera, a small model of {topic_visual} rising out of the parchment between his paws, warm lantern light from below-left, archive shelves softly blurred behind
```
Motion: Locked camera with a slow push-in. He unrolls the scroll toward the lens and the tiny model rises out of it, his eyes looking over it into the lens.

### cut_in_finger (v4) - CU / eye / clip
```
{SUTRADHAR} snapping the scroll shut in one paw and raising one clawed finger of the other paw beside his muzzle, one eyebrow raised, dark archive background with a single warm rim light
```
Motion: Quick short push-in, then hold. He snaps the scroll shut and raises one finger beside his muzzle, one brow raised.

### lean_in_question (v4) - MCU / low / clip
```
{SUTRADHAR} leaning toward the camera, {pose}, {context_visual} softly blurred behind him, warm rim light
```
Motion: Locked camera. He leans in toward the lens, one ear twitching, the raised brow lifting.

### point_at_viewer (v4) - CU / low / clip
```
{SUTRADHAR} pointing one paw straight at the camera with his smug one-sided smirk, lantern glow on his fur, {context_visual} in soft background
```
Motion: Locked camera, very slight push-in. His paw comes up and points straight at the lens.

### touch_diorama (v4) - MS / high / clip
```
{SUTRADHAR} crouching beside a tabletop miniature model of {topic_visual}, reaching out with one paw to {touch_action}, lantern set down beside him
```
Motion: Slow descending crane toward him. He reaches out and {touch_action}, then lifts his face to the camera.

### eye_ecu (v2) - ECU / eye / clip
```
extreme close-up of one golden-amber eye of {SUTRADHAR} peering over the brass rim of his round spectacles, flickering lantern light reflected in the iris, grey-tawny inked fur strokes filling the frame
```
Motion: Slow push-in toward the eye. The pupil narrows slightly as the lantern flickers. End on the reflection in the iris. His mouth stays closed in his smirk the whole time; his face and body carry the beat (brow, eyes, head tilt, paws).

### map_tap_ots (v3) - MS / ots / clip
```
over-the-shoulder view from behind {SUTRADHAR} as he stands before a large carved relief map of India on the archive wall, {map_note}, the lantern raised in one paw
```
Motion: Locked camera behind his shoulder. He reaches up and taps the glowing marker; it pulses brighter. End with his paw on the marker and his head turning halfway back toward camera. His mouth stays closed in his smirk the whole time; his face and body carry the beat (brow, eyes, head tilt, paws).

### walk_off (v3) - WS / eye / clip
```
{SUTRADHAR} seen from behind walking away from camera {where}, the lantern the only warm light, long shadow stretching toward the lens
```
Motion: Locked camera. He walks away into the dark, stops, and looks back over his shoulder at the viewer for a beat. End on the over-the-shoulder glance with the lantern glowing. His mouth stays closed in his smirk the whole time; his face and body carry the beat (brow, eyes, head tilt, paws).

### map_present (v1) - MS / eye / clip
```
{SUTRADHAR} standing beside a large carved relief map of India on the archive wall, body turned toward the camera, one paw resting on the map at {map_note}, the lantern hanging from his other paw
```
Motion: Locked camera. Facing the lens, he taps the marker on the map; it pulses brighter while he keeps his eyes on the viewer.

### sign_off (v1) - CU / low / clip
```
{SUTRADHAR} close to the camera at the end of a dark archive aisle, lantern held low so its warm light catches his spectacles and the underside of his muzzle, {where} receding into shadow behind him
```
Motion: Locked camera. He looks into the lens; when he finishes he gives a slow knowing nod, turns and steps away into the shadows, his lantern glowing.

### close_whisper (v1) - CU / eye / clip
```
{SUTRADHAR}'s face close to the camera, lit only by the lantern held just below frame, golden-amber eyes over the brass rims of his spectacles, deep shadow on one side of his face
```
Motion: Very slow push-in. He leans a little closer, eyes narrowing as if sharing a secret.
