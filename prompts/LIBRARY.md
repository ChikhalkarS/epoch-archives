# Prompt library (v2, 2026-11-27)

<!-- Built from prompts/library.json by tools/build-shorts.mjs. Edit the JSON, not this file. -->

Single source of truth for every image/clip prompt. Always keep the latest best version here; bump the item's version and add a line to prompts/CHANGELOG.md. Episode files are built from this by tools/build-shorts.mjs.

## Style

**Prefix:**
```
Claymation stop-motion style, handcrafted plasticine miniature diorama, warm clay textures with visible fingerprints and tool marks, soft warm studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature feel, matte surfaces, muted earthy palette of terracotta, ochre, sandstone, indigo and leaf green,
```
**Vertical suffix:**
```
vertical 9:16 composition, no text, no letters, no watermark, no logos, no modern objects unless stated
```
**Negative:**
```
photorealistic, real photograph, 3D CGI render, glossy plastic, anime, cartoon line art, chibi, cute baby proportions, text, letters, watermark, logo, extra fingers, extra limbs, distorted faces, gore, blood
```

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

### BHEDIYA (v1, channel (every episode))
भेड़िया (Bhediya), lead narrator and host of असली सीन

Step 1 - close-up (generate several, pick the best):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Ultra-detailed portrait of BHEDIYA: a wise, adult anthropomorphic grey wolf storyteller who stands upright like a man. mature adult male wolf, stands upright on two legs, lean and strong, human-height impression, calm upright storyteller posture. Chest-up framing, front view, facing camera, plain cool grey background, even soft studio light.
EYES: deep amber-gold irises with fine darker flecks and a thin black rim, round dark pupils with one small warm catchlight each, heavy dark-grey brow ridges, the left brow ridge crossed by a thin pale healed scar
SKIN/FUR: clay-sculpted fur: silver-grey head and back with two charcoal streaks running from the forehead down between the eyes, cream-white muzzle, throat and chest, black leathery nose, the tip of the right ear slightly notched, fur strands pressed into the clay with visible tool marks
HAIR: thicker ruff of silver-grey fur around the neck and shoulders, ears upright and alert
OUTFIT: a knee-length dark terracotta cotton kurta, plain and slightly worn at the hem; a weathered indigo cotton shawl draped over the left shoulder with a thin ochre border; a brown leather satchel strap across the chest; a small brass oil lantern hanging at the right hip; an old rolled parchment scroll held in the right paw; bare wolf feet, no shoes
EXPRESSION: calm knowing half-smile with the mouth closed, right brow slightly raised, gaze direct and steady into the camera; wise and a little mischievous, never snarling, never showing fangs
NOTES: adult cinematic tone. Not cute, not cartoonish, no baby proportions. He appears in the brand intro, viewer-line scenes and the outro of every Short; story scenes show human figures. Sharp focus on the eyes.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Character reference sheet of the same character, 16:9 landscape, three panels side by side on one seamless cool grey studio background. Left panel (about 45% of width): bust-up portrait from the chest up, front view, facing camera. Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height. Right panel: full body standing straight, rear view from directly behind, heels visible. Even studio lighting, identical look across all three panels.
IDENTITY:
EYES: deep amber-gold irises with fine darker flecks and a thin black rim, round dark pupils with one small warm catchlight each, heavy dark-grey brow ridges, the left brow ridge crossed by a thin pale healed scar
SKIN/FUR: clay-sculpted fur: silver-grey head and back with two charcoal streaks running from the forehead down between the eyes, cream-white muzzle, throat and chest, black leathery nose, the tip of the right ear slightly notched, fur strands pressed into the clay with visible tool marks
HAIR: thicker ruff of silver-grey fur around the neck and shoulders, ears upright and alert
OUTFIT: a knee-length dark terracotta cotton kurta, plain and slightly worn at the hem; a weathered indigo cotton shawl draped over the left shoulder with a thin ochre border; a brown leather satchel strap across the chest; a small brass oil lantern hanging at the right hip; an old rolled parchment scroll held in the right paw; bare wolf feet, no shoes
```
Role line for every later prompt:
```
Image 1 defines BHEDIYA's face, fur and clothing. Do not use the grey background or the panel layout.
```
Save as: prompts/characters/BHEDIYA/closeup.png, prompts/characters/BHEDIYA/sheet.png

### MUMBAI_PRINCESS (v1, mumbai)
Princess (generic 1661 Portuguese royal, captioned as Catherine)

Step 1 - close-up (generate several, pick the best):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Ultra-detailed portrait of MUMBAI_PRINCESS: a young 17th century Portuguese princess. woman in her early twenties, slim, medium height. Chest-up framing, front view, facing camera, plain cool grey background, even soft studio light.
EYES: large dark-brown almond eyes, soft upper lids, gentle arched dark brows
SKIN/FUR: warm olive clay skin, smooth, a small beauty mark under the left eye
HAIR: dark brown hair parted in the centre, falling in tight ringlets at both sides of the face, small pearl pins
OUTFIT: pale rose silk court gown with a wide white lace collar, fitted bodice with small pearl buttons, full skirt to the floor; a short single-strand pearl necklace; no crown
EXPRESSION: poised, polite closed-lip smile, curious eyes
NOTES: generic figure, not a real likeness; name only in captions Sharp focus on the eyes.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Character reference sheet of the same character, 16:9 landscape, three panels side by side on one seamless cool grey studio background. Left panel (about 45% of width): bust-up portrait from the chest up, front view, facing camera. Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height. Right panel: full body standing straight, rear view from directly behind, heels visible. Even studio lighting, identical look across all three panels.
IDENTITY:
EYES: large dark-brown almond eyes, soft upper lids, gentle arched dark brows
SKIN/FUR: warm olive clay skin, smooth, a small beauty mark under the left eye
HAIR: dark brown hair parted in the centre, falling in tight ringlets at both sides of the face, small pearl pins
OUTFIT: pale rose silk court gown with a wide white lace collar, fitted bodice with small pearl buttons, full skirt to the floor; a short single-strand pearl necklace; no crown
```
Role line for every later prompt:
```
Image 1 defines MUMBAI_PRINCESS's face, hair and clothing. Do not use the grey background or the panel layout.
```
Save as: prompts/characters/MUMBAI_PRINCESS/sheet.png

### MUMBAI_KING (v1, mumbai)
King (generic 1660s English monarch, captioned as Charles II)

Step 1 - close-up (generate several, pick the best):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Ultra-detailed portrait of MUMBAI_KING: a 1660s English king. man in his early thirties, tall and slim. Chest-up framing, front view, facing camera, plain cool grey background, even soft studio light.
EYES: dark heavy-lidded brown eyes, thick dark brows
SKIN/FUR: pale clay skin, long face, thin black moustache
HAIR: long black curly wig falling past the shoulders
OUTFIT: deep crimson velvet knee-length coat with gold trim and gold buttons, white lace cravat, dark breeches, white stockings, black buckled shoes; a small gold crown only in throne scenes
EXPRESSION: worldly, slightly tired, a raised eyebrow
NOTES: generic figure, not a real likeness; name only in captions Sharp focus on the eyes.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Character reference sheet of the same character, 16:9 landscape, three panels side by side on one seamless cool grey studio background. Left panel (about 45% of width): bust-up portrait from the chest up, front view, facing camera. Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height. Right panel: full body standing straight, rear view from directly behind, heels visible. Even studio lighting, identical look across all three panels.
IDENTITY:
EYES: dark heavy-lidded brown eyes, thick dark brows
SKIN/FUR: pale clay skin, long face, thin black moustache
HAIR: long black curly wig falling past the shoulders
OUTFIT: deep crimson velvet knee-length coat with gold trim and gold buttons, white lace cravat, dark breeches, white stockings, black buckled shoes; a small gold crown only in throne scenes
```
Role line for every later prompt:
```
Image 1 defines MUMBAI_KING's face, hair and clothing. Do not use the grey background or the panel layout.
```
Save as: prompts/characters/MUMBAI_KING/sheet.png

### MUMBAI_MERCHANT (v1, mumbai)
East India Company merchant (generic 1660s)

Step 1 - close-up (generate several, pick the best):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Ultra-detailed portrait of MUMBAI_MERCHANT: a middle-aged English trader of the 1660s. man in his forties, stocky. Chest-up framing, front view, facing camera, plain cool grey background, even soft studio light.
EYES: small pale-blue eyes, bushy brown brows
SKIN/FUR: ruddy clay skin, short brown beard
HAIR: shoulder-length straight brown hair under the hat
OUTFIT: plain brown wool knee-length coat with pewter buttons, white linen collar, dark breeches, black boots, wide-brimmed black hat, a leather-bound ledger under the left arm
EXPRESSION: shrewd, pleased, a small satisfied smile
NOTES: generic figure Sharp focus on the eyes.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Character reference sheet of the same character, 16:9 landscape, three panels side by side on one seamless cool grey studio background. Left panel (about 45% of width): bust-up portrait from the chest up, front view, facing camera. Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height. Right panel: full body standing straight, rear view from directly behind, heels visible. Even studio lighting, identical look across all three panels.
IDENTITY:
EYES: small pale-blue eyes, bushy brown brows
SKIN/FUR: ruddy clay skin, short brown beard
HAIR: shoulder-length straight brown hair under the hat
OUTFIT: plain brown wool knee-length coat with pewter buttons, white linen collar, dark breeches, black boots, wide-brimmed black hat, a leather-bound ledger under the left arm
```
Role line for every later prompt:
```
Image 1 defines MUMBAI_MERCHANT's face, hair and clothing. Do not use the grey background or the panel layout.
```
Save as: prompts/characters/MUMBAI_MERCHANT/sheet.png

### MUMBAI_LADY (v1, mumbai)
Parsi lady of the 1840s (generic, captioned as Lady Avabai Jamsetjee Jeejeebhoy)

Step 1 - close-up (generate several, pick the best):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Ultra-detailed portrait of MUMBAI_LADY: a dignified Parsi lady of 1840s Bombay. woman in her fifties, medium build, upright posture. Chest-up framing, front view, facing camera, plain cool grey background, even soft studio light.
EYES: kind dark-brown eyes, fine lines at the corners, soft grey-black brows
SKIN/FUR: fair-wheat clay skin, gentle smile lines
HAIR: black hair with some grey, covered by the sari end
OUTFIT: white silk sari with a maroon embroidered border, worn in the Parsi style with the end drawn over the head, long-sleeved white blouse, small gold earrings, simple dark slippers
EXPRESSION: calm and determined, a soft closed-lip smile
NOTES: generic figure, not a real likeness; name only in captions Sharp focus on the eyes.
```
Step 2 - three-panel sheet (attach the chosen close-up):
```
Claymation stop-motion plasticine figure, handcrafted clay with visible fingerprints and tool marks, matte surfaces. Character reference sheet of the same character, 16:9 landscape, three panels side by side on one seamless cool grey studio background. Left panel (about 45% of width): bust-up portrait from the chest up, front view, facing camera. Center panel: full body standing straight, front view, arms relaxed, feet visible, filling about 90% of panel height. Right panel: full body standing straight, rear view from directly behind, heels visible. Even studio lighting, identical look across all three panels.
IDENTITY:
EYES: kind dark-brown eyes, fine lines at the corners, soft grey-black brows
SKIN/FUR: fair-wheat clay skin, gentle smile lines
HAIR: black hair with some grey, covered by the sari end
OUTFIT: white silk sari with a maroon embroidered border, worn in the Parsi style with the end drawn over the head, long-sleeved white blouse, small gold earrings, simple dark slippers
```
Role line for every later prompt:
```
Image 1 defines MUMBAI_LADY's face, hair and clothing. Do not use the grey background or the panel layout.
```
Save as: prompts/characters/MUMBAI_LADY/sheet.png

## Bhediya shot bank

Reusable narrator shots. Vary them: never use the same template twice in a row. Story lines show people; Bhediya appears on brand intro, cut-ins, viewer lines, comment ask and outro.

### walk_in (v1) - WS / low / clip
```
{BHEDIYA} walking toward the camera down a narrow aisle of a lamp-lit stone archive, tall shelves of rolled scrolls on both sides rising to the top of frame, his brass lantern swinging gently at his hip, {extra}
```
Motion: Camera tracks slowly backward at his walking pace. He walks from mid-aisle toward the lens and stops in a medium shot, lifting his eyes to the viewer with a knowing half-smile. Lantern glow sways on the shelves. End on him standing still, facing camera.

### scroll_reveal (v1) - MCU / low / clip
```
{BHEDIYA} holding his old scroll open toward the camera, a small clay diorama of {topic_visual} rising out of the parchment between his paws, warm lantern light from below-left, archive shelves softly blurred behind
```
Motion: Locked camera with a slow push-in. He unrolls the scroll; the tiny diorama rises out of it and settles. End with his eyes looking over the diorama straight into the lens.

### cut_in_finger (v1) - CU / eye / clip
```
{BHEDIYA} snapping his scroll shut in one paw and raising one clawed finger of the other paw beside his muzzle, one eyebrow raised, dark archive background with a single warm rim light
```
Motion: Quick short push-in, then hold. He snaps the scroll shut and raises one finger. End frozen on the raised finger and raised brow.

### lean_in_question (v1) - MCU / low / clip
```
{BHEDIYA} leaning toward the camera, {pose}, {context_visual} softly blurred behind him, warm rim light
```
Motion: Locked camera. He leans in toward the lens, one ear twitches, the raised brow lifts. End with his face close, waiting for an answer.

### point_at_viewer (v1) - CU / low / clip
```
{BHEDIYA} pointing one paw straight at the camera with a playful half-smile, lantern glow on his fur, {context_visual} in soft background
```
Motion: Locked camera, very slight push-in. His paw comes up and points at the lens. End on the point, paw sharp, face just behind it.

### touch_diorama (v1) - MS / high / clip
```
{BHEDIYA} crouching beside a tabletop clay diorama of {topic_visual}, reaching out with one paw to {touch_action}, lantern set down beside him
```
Motion: Slow descending crane toward his paw. He reaches out and {touch_action}. End with the paw resting on the diorama and his eyes lifting to the camera.

### eye_ecu (v1) - ECU / eye / clip
```
extreme close-up of one deep amber-gold eye of {BHEDIYA} with the thin pale scar above the brow, flickering lantern light reflected in the iris, grey clay fur texture filling the frame
```
Motion: Slow push-in toward the eye. The pupil narrows slightly as the lantern flickers. End on the reflection in the iris.

### map_tap_ots (v1) - MS / ots / clip
```
over-the-shoulder view from behind {BHEDIYA} as he stands before a large clay relief map of India on the archive wall, {map_note}, his lantern raised in one paw
```
Motion: Locked camera behind his shoulder. He reaches up and taps the glowing marker; it pulses brighter. End with his paw on the marker and his head turning halfway back toward camera.

### walk_off (v1) - WS / eye / clip
```
{BHEDIYA} seen from behind walking away from camera {where}, his lantern the only warm light, long shadow stretching toward the lens
```
Motion: Locked camera. He walks away into the dark, stops, and looks back over his shoulder at the viewer for a beat. End on the over-the-shoulder glance with the lantern glowing.
