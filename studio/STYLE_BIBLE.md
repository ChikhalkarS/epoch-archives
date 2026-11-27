# Style bible: Epoch Archive Studios (Google Flow)

This is the single source for look, character, voice and sound. Every Flow prompt is built from the blocks below, pasted **verbatim**. Changing a word changes the result.

## 1. Look: "museum clay"
Handmade claymation miniatures, as if an archive keeper built each scene on his desk.

**STYLE block** (first line of every prompt):
```
STYLE: Claymation stop-motion animation, handcrafted plasticine miniatures with visible fingerprints and tool marks, matte clay textures, slightly stepped stop-motion movement, warm soft studio lighting with gentle shadows, shallow depth of field, tilt-shift miniature diorama feel, muted earthy palette of terracotta, ochre, sandstone, indigo blue and leaf green.
```
**CONSTRAINTS block** (last line of every prompt):
```
CONSTRAINTS: No subtitles, no captions, no on-screen text; any paper, sign or stone carries only abstract clay squiggles. No music. One continuous shot, no cuts.
```

## 2. Palette
Terracotta #B5553C (Sutradhar's shawl) · Ochre #D89B2B (highlights) · Sandstone #E8D3B0 (paper, stone) · Indigo #2E3A66 (water, night) · Leaf green #5F7F3F (land). Lake water is always "deep indigo-blue clay water with glossy ripples".

## 3. Sutradhar (recurring narrator character)
He speaks on camera in the hook, the myth check and the closer (max 5 shots per EP). Everywhere else his voice is **off-screen voice-over** over the scene.

**SUTRADHAR block** (whenever he is in frame):
```
SUTRADHAR: a small elderly clay storyteller, round warm-brown face, thick white bushy eyebrows, short neat white beard, round brass-rimmed spectacles, terracotta-red shawl over a cream kurta, faded indigo cloth satchel across his chest, holds a rolled parchment scroll tied with red thread, slightly hunched.
```
**VOICE block** (in every prompt with speech, unchanged):
```
VOICE: Sutradhar's voice, a warm, slightly husky elderly Indian man, medium-low pitch, unhurried storyteller pace, clear standard Hindi.
```
- Ingredient: `Sutradhar sheet` (see `studio/ref/README.md`). Role line: `The Sutradhar ingredient defines his face, beard, spectacles, shawl and satchel only; ignore its grey background and panel layout.`
- His room (`Archive room` ingredient): a cluttered clay archive with wooden shelves of scrolls, a brass oil lamp, and a large clay relief map of India on the back wall.
- Historical people: generic clay figures dressed for the era. Never a real likeness. No speech from historical figures (no invented dialogue).

## 4. Dialogue syntax (Veo)
- On camera: `Sutradhar looks into the lens and says in Hindi: "…"`
- Voice-over: `VOICE-OVER (Sutradhar, off-screen, Hindi): "…"`
- Max **16 Hindi words per 8 s clip** (≈ 2 words/s), with 0.5–1 s of room at the start and end. Devanagari inside the quotes, everything else in English.
- Numbers are spelled out as Hindi words inside the quotes (Veo reads "1794" unreliably).

## 5. Visual devices (all made inside Flow)
| Device | How to prompt it |
|---|---|
| Map reveal | "a hand-sculpted clay relief map of central India on a wooden table, rivers as glossy blue clay ribbons", slow top-down push-in, a small clay pin pops up at the place |
| Evidence card | The object itself on the archive desk (old parchment, gazetteer book, carved stone, chronicle page) with squiggle text. The **source is spoken** in the VO |
| Then vs now | Two consecutive clips with the same framing and lens: clay past → clay present |
| सच या झूठ? (myth check) | Sutradhar holds up a clay tablet, then presses a big clay stamp on it. The stamp colour signals the verdict: green = सच, red = झूठ, **amber = विवादित**. The verdict word is spoken |
| Chapter / "राज़ #1" | Sutradhar unrolls a scroll toward the camera, a clay wax seal with a number shape. The chapter is spoken |
| Logo sting | Clay wax seal pressed onto parchment, warm light, short brass chime |

## 6. Sound (in every prompt)
- `AMBIENCE:` 1–2 sources tied to what is visible (water lapping, birds, wind over stone).
- `SFX:` the action sounds (stone scrape, clay thud, stamp thump, paper rustle).
- Reveal moments: `SFX: a low rising whoosh ending in a soft drum hit as <the reveal action> happens`.
- Always "No music". The score is added once in YouTube Studio.

## 7. Camera grammar (cinematic-director rules)
One camera behaviour per clip: `locked`, `slow push-in`, `slow pull-out`, `slow pan left/right`, `slow tilt up/down`, `top-down slow descent`, `slow orbit 30°`. Lens words: `24mm wide`, `35mm`, `50mm`, `85mm close-up`, `macro`. Angles: eye level, low angle, high angle, top-down. One primary action per clip, ending in a held state.

## 8. Respect rules
Temples, mosques and deities: respectful, no caricature. Violence and tragedy: symbols only. Disputed history: amber stamp + neutral words.
