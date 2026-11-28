# Run: Akola Short 1 in Google Flow (one paste)

On the Mac:
```bash
cd ~/epoch-archives && git pull origin main && claude --chrome
```
Then paste everything in the box below into that Claude Code session.

```
Produce Akola Short 1 (the queen legend) in Google Flow. Read flow/README.md, flow/library/ingredients.json,
flow/projects/akola/short1.md and config/style-guide.md first.

Step 1 - Ingredients (only these 6): STY-clay, CHR-sutradhar, SET-scroll-desk, CHR-akola-rani, CHR-akola-raja, SET-rajeshwar-shrine.
For each one missing from flow/library/images/: in Chrome open Google Flow, project "EAS Library", generate an IMAGE
with its create_prompt, show me the candidates and WAIT for my pick. Download my pick and move it from ~/Downloads to
flow/library/images/<id>.png. Save it in Flow as an ingredient named its flow_name.

Step 2 - Project: create or open the Flow project "EAS akola" and add those 6 as ingredients.

Step 3 - Shots: run `node tools/flow-pack.mjs akola short1`, then for each shot still [ ] in flow/projects/akola/short1.md, in order:
  a. Video mode, Ingredients to Video, attach exactly the listed ingredients, aspect 9:16.
  b. Paste the prompt block exactly. Generate ONE output.
  c. Show me the result and wait for "keep" or "redo: <note>". On redo, change only the scene part of the prompt.
  d. On keep: download it and move the newest file from ~/Downloads to the "Save as" path. Confirm the file exists.
Respect rules: the Shivling always whole and treated with reverence; the king's sword never raised at the queen; no text in frame.

Limits: at most 12 generations in this run (7 shots + redos). Stop and tell me if Flow shows an error, a policy block,
a credit warning or any payment screen. Never buy credits, never publish or share anything from Flow.

Step 4 - Voice and preview:
  node tools/voice.mjs akola
  node tools/assemble.mjs akola --preview --shorts-only
Tell me the Short's duration and any placeholder shots.

Step 5 - Commit and push to main (ingredient images, clips, voice). Do not render the final; that waits for my Gate 2 approval.
```

If credits run out mid-way, re-run the same paste later: `flow-pack` ticks finished shots from the files on disk and only the open ones are generated.
