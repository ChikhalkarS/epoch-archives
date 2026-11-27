---
name: flow-prompts
description: Write the complete Google Flow (Veo 3) prompt pack for an Epoch Archive episode - a shot plan table plus one paste-ready prompt per 8-second clip with scene, Hindi dialogue or voice-over, camera, angle, lens, lighting, ambience and SFX, using the fixed style, Sutradhar and voice blocks. Use after Gate 1, or whenever the owner asks for Flow prompts.
---

# Flow prompts → `episodes/<ep>/flow_prompts.md`

Flow makes picture + voice + SFX. There is no other edit tool. Load the vendor skills first: `cinematic-director` (Veo adapter, motion budget, hard rules), `video-prompt-director` (staged action, R1–R14), `character-consistency` (Sutradhar sheet).

## File layout
1. Owner checklist (settings, ingredients, Scenebuilder order).
2. **Shot plan table:** `| Clip | Section | Mode | Dur | Picture (one line) | Hindi line |`. Joined in order, the Hindi lines = the approved script, word for word (fact tags removed).
3. One prompt block per clip.

## Prompt block (Flow syntax: labelled lines, English except the Hindi inside quotes)
```
### C07 · राज़ 1 · Text to Video · 16:9 · 8 s
STYLE: <STYLE block>
SCENE: <place, era, concrete materials and era props, what is in frame>.
ACTION: <opening state> → <one primary action> → <held end state>.
CAMERA: <shot size>, <angle>, <lens>, <one movement or "locked, does not move">.
LIGHTING: <source + direction + quality>.
VOICE-OVER (Sutradhar, off-screen, Hindi): "<≤ 16 Hindi words>"
VOICE: <VOICE block>
AMBIENCE: <1–2 sources>. SFX: <action sounds>.
CONSTRAINTS: <CONSTRAINTS block>
```
- Sutradhar on camera: mode `Ingredients to Video`, add the SUTRADHAR block + role line, and use `Sutradhar looks into the lens and says in Hindi: "…"` instead of VOICE-OVER.
- Continuations: mode `Frames to Video` with "first frame = last frame of C06" for seamless moves.
- Silent clips (logo, breath shots): drop the voice lines and say "No speech."

## Rules (from the vendor skills)
- One camera behaviour, one primary action, one environmental motion. Every action ends in a held state (R14).
- Behaviour, not emotion ("he lifts his spectacles and leans in", not "he is curious").
- Motion budget: ≤ 4 close-ups of a face, ≤ 6 medium/wide with figures, ≤ 8 environments and objects.
- Max 16 Hindi words per clip. Numbers as Hindi words. Sources spoken, never written on screen.
- Adjacent clips change shot size by 2 steps, or angle by 30°+ (no stutter cuts).
- Historical figures never speak. Only Sutradhar speaks.
- Pattern break every 6–8 clips: map, evidence object, Sutradhar, then-vs-now, myth stamp.

## Shorts
At the end: 3–4 Shorts, each 4–6 clips at 9:16, re-prompted natively in Portrait (cinematic-director: vertical is not cropped horizontal). Each one opens with a number/object hook line and ends with "पूरी कहानी, चैनल पर एपिसोड एक में।"
