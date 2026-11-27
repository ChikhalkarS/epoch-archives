# Style bible: Epoch Archive Studios (Google Flow)
Art style decided by owner 2026-11-27: same *style family* as Quiet Wolf (2D vintage noir cartoon), with our own characters and Indian settings.

This is the single source for look, character, voice and sound. Every Flow prompt is built from the blocks below, pasted **verbatim**. Changing a word changes the result.

## 1. Look: "vintage noir storybook" (2D)
Hand-drawn 2D cartoon with bold ink lines, lit like an old detective film: one warm lamp, deep shadows. Indian settings and costumes, drawn with care.

**STYLE block** (first line of every prompt):
```
STYLE: 2D hand-drawn cartoon animation in a vintage noir storybook style, bold clean black ink outlines, cel-shaded characters with soft painted shading, expressive slightly exaggerated faces, richly painted textured backgrounds with subtle paper grain, dramatic warm chiaroscuro lighting with amber lamp glow and deep soft shadows, gentle dark vignette, palette of sepia brown, charcoal black, warm amber, cream and deep red accents, with indigo blue for water and night skies.
```
**CONSTRAINTS block** (last line of every prompt):
```
CONSTRAINTS: No subtitles, no captions, no on-screen text; any paper, sign or stone carries only abstract scribbles. No music. One continuous shot, no cuts. Keep the 2D hand-drawn cartoon look throughout, never photoreal or 3D.
```

## 2. Palette
Sepia brown #6B4A2E (backgrounds) · Charcoal #1E1A17 (shadows, outlines) · Amber #E0A040 (lamp glow, highlights) · Cream #F1E3C6 (paper, thumbnail text) · Deep red #9E2B25 (Sutradhar's shawl, accents) · Indigo #2E3A66 (water, night). Lake water is always "deep indigo-blue water with painted amber reflections".

## 3. Sutradhar (recurring narrator character)
He speaks on camera in the hook, the myth check and the closer (max 5 shots per EP). Everywhere else his voice is **off-screen voice-over** over the scene.

**SUTRADHAR block** (whenever he is in frame):
```
SUTRADHAR: an elderly Indian storyteller drawn as a 2D cartoon character with bold ink outlines, round warm-brown face, thick white bushy eyebrows, short neat white beard, round brass-rimmed spectacles, a knowing half-smile, deep red shawl over a cream kurta, faded indigo cloth satchel across his chest, holds a rolled parchment scroll tied with red thread, slightly hunched, small and expressive.
```
**VOICE block** (in every prompt with speech, unchanged):
```
VOICE: Sutradhar's voice, a warm, slightly husky elderly Indian man, medium-low pitch, unhurried storyteller pace, clear standard Hindi.
```
- Ingredient: `Sutradhar sheet` (see `studio/ref/README.md`). Role line: `The Sutradhar ingredient defines his face, beard, spectacles, shawl and satchel only; ignore its grey background and panel layout.`
- His room (`Archive room` ingredient): a cluttered old archive with wooden shelves of scrolls, a brass oil lamp, and a large old painted map of India on the back wall.
- Historical people: generic cartoon figures dressed for the era. Never a real likeness. No speech from historical figures (no invented dialogue).

## 4. Dialogue syntax (Veo)
- On camera: `Sutradhar looks into the lens and says in Hindi: "…"`
- Voice-over: `VOICE-OVER (Sutradhar, off-screen, Hindi): "…"`
- Max **16 Hindi words per 8 s clip** (≈ 2 words/s), with 0.5–1 s of room at the start and end. Devanagari inside the quotes, everything else in English.
- Numbers are spelled out as Hindi words inside the quotes (Veo reads "1794" unreliably).

## 5. Visual devices (all made inside Flow)
| Device | How to prompt it |
|---|---|
| Map reveal | "an old hand-painted map of central India on a wooden table, hills shaded in sepia, rivers as indigo lines", slow top-down push-in, a small red pin drops in at the place |
| Evidence card | The object itself on the archive desk under the lamp (old parchment, gazetteer book, carved stone, chronicle page) with scribble text. The **source is spoken** in the VO |
| Then vs now | Two consecutive clips with the same framing and lens: past → present |
| सच या झूठ? (myth check) | Sutradhar holds up a paper ledger, then presses a big rubber stamp on it. The stamp colour signals the verdict: green = सच, red = झूठ, **amber = विवादित**. The verdict word is spoken |
| Chapter / "राज़ #1" | Sutradhar unrolls a scroll toward the camera, breaking a red wax seal. The chapter is spoken |
| Logo sting | A red wax seal pressed onto parchment under the lamp, short brass chime |

## 6. Sound (in every prompt)
- `AMBIENCE:` 1–2 sources tied to what is visible (water lapping, birds, wind over stone).
- `SFX:` the action sounds (stone scrape, book thud, stamp thump, paper rustle).
- Reveal moments: `SFX: a low rising whoosh ending in a soft drum hit as <the reveal action> happens`.
- Always "No music". The score is added once in YouTube Studio.

## 6b. Thumbnails
One character + one object, dark vignette, amber rim light. Big condensed vintage display text (2–4 Hindi words) in cream with a thick charcoal outline, one keyword in amber. Make the image in Flow (no text), then add the Hindi text in a free editor (Canva free) with an OFL Devanagari font (e.g. Mukta ExtraBold / Rozha One).

## 7. Camera grammar (cinematic-director rules)
One camera behaviour per clip: `locked`, `slow push-in`, `slow pull-out`, `slow pan left/right`, `slow tilt up/down`, `top-down slow descent`, `slow orbit 30°`. Lens words: `24mm wide`, `35mm`, `50mm`, `85mm close-up`, `macro`. Angles: eye level, low angle, high angle, top-down. One primary action per clip, ending in a held state.

## 8. Respect rules
Temples, mosques and deities: respectful, no caricature. Violence and tragedy: symbols only. Disputed history: amber stamp + neutral words.
