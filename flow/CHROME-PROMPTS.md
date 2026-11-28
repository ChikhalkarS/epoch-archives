# Claude in Chrome: Flow prompts

Run these in **Claude Code on the Mac**, opened in `~/epoch-archives` with Chrome connected (`claude --chrome`, or `/chrome` inside a session). A cloud session cannot see your Chrome.

Before each run: `git pull origin main`. After it: Claude commits and pushes to `main`.

---

## A. Build the ingredient library (once per series, plus once per new city)

```
Read flow/README.md and flow/library/ingredients.json.
In Chrome, open Google Flow (labs.google/flow). Use (or create) the project "EAS Library".
For every ingredient whose image is missing from flow/library/images/ (scope "global", plus scope "<CITY>"):
  1. Generate it as an IMAGE with its create_prompt (16:9; character sheets may be any landscape ratio).
  2. Show me the candidates and wait for me to pick one. Do not pick for me.
  3. Download the picked image and move it from ~/Downloads to flow/library/images/<id>.png.
  4. In Flow, save it as an ingredient named exactly its flow_name.
Stop after each ingredient for my pick. Never buy credits or upgrade a plan; if Flow asks for payment or credits are low, stop and tell me.
When done: list what was built, then commit and push to main.
```

## B. Set up a city project (once per city)

```
In Google Flow, create the project "EAS <CITY>" if it does not exist.
Add as ingredients every image in flow/library/images/ whose id is scope "global" or "<CITY>" in flow/library/ingredients.json,
each named by its flow_name. Tell me which ingredients the project now has.
```

## C. Generate one pack (the daily one)

```
Run: node tools/flow-pack.mjs <CITY> <PACK>        (PACK = short1, short2, long or stills)
Open flow/projects/<CITY>/<PACK>.md. In Chrome, open the Flow project "EAS <CITY>".
For each shot that is still [ ], in order:
  1. Video shots: Ingredients to Video, attach exactly the listed ingredients (max 3), aspect as listed.
     Image shots: image mode, attach the listed ingredients, aspect as listed.
  2. Paste the prompt block exactly. Generate ONE output (lowest count Flow allows).
  3. When it finishes, show me the result and wait for "keep" or "redo: <note>".
     On redo, adjust only the scene part of the prompt as I say and regenerate.
  4. On keep: download it, move the newest file from ~/Downloads to the "Save as" path, and confirm the file exists.
Rules: at most <N> generations this run. Stop and tell me if Flow shows an error, a policy block, a credit warning or a payment screen.
Never publish or share anything from Flow.
At the end: re-run the flow-pack command, report done/remaining, then commit and push to main (clips and images included).
```

## D. Put it together

```
Run: node tools/assemble.mjs <CITY> --preview --shorts-only
Tell me the Short durations and which scenes are still placeholders. Do not render the final until I approve.
```

---

### Quick test (no credits)

```
Chrome test, read-only. Open labs.google/flow in a new tab and tell me: am I logged in, the names of my Flow projects,
and where the prompt box, the Ingredients button and Scenebuilder are. Do not generate anything.
```
