#!/usr/bin/env python3
"""Align Whisper word timestamps to the script lines (L01-L45).

Whisper misspells names and sometimes splits/merges words, so the script tokens and Whisper tokens are aligned with
a Needleman-Wunsch pass that scores token pairs by character similarity. Each script token then gets the time of its
matched Whisper word; unmatched tokens are interpolated. Output:
  words.json  [{"w": script word, "heard": whisper word, "start": s, "end": s, "line": n}, ...]
  lines.json  [{"line": n, "id": "L01", "start": s, "end": s, "text": ...}, ...]
Usage: python align.py voice16k.json ../make_script.py
"""
import difflib, json, re, sys, importlib.util

wj, script_py = sys.argv[1], sys.argv[2]
spec = importlib.util.spec_from_file_location("ms", script_py); ms = importlib.util.module_from_spec(spec); spec.loader.exec_module(ms)
lines = [hi for _, part in ms.PARTS for _, hi, _ in part]

norm = lambda t: re.sub(r"[^ऀ-ॿ]", "", t).replace("़", "")          # Devanagari only, drop nukta
script = [(i, w) for i, l in enumerate(lines) for w in l.split() if norm(w)]
heard = [w for seg in json.load(open(wj))["segments"] for w in seg.get("words", []) if norm(w["word"])]
A, B = [norm(w) for _, w in script], [norm(w["word"]) for w in heard]

def sim(a, b):
    return difflib.SequenceMatcher(None, a, b).ratio()

n, m, GAP = len(A), len(B), -0.45
S = [[0.0] * (m + 1) for _ in range(n + 1)]; T = [[0] * (m + 1) for _ in range(n + 1)]
for i in range(1, n + 1): S[i][0] = i * GAP; T[i][0] = 1
for j in range(1, m + 1): S[0][j] = j * GAP; T[0][j] = 2
for i in range(1, n + 1):
    for j in range(1, m + 1):
        d = S[i - 1][j - 1] + (sim(A[i - 1], B[j - 1]) * 2 - 0.8)
        u, l = S[i - 1][j] + GAP, S[i][j - 1] + GAP
        S[i][j], T[i][j] = max((d, 0), (u, 1), (l, 2))
match, i, j = [None] * n, n, m
while i > 0 and j > 0:
    if T[i][j] == 0: match[i - 1] = j - 1; i -= 1; j -= 1
    elif T[i][j] == 1: i -= 1
    else: j -= 1

out = []
for k, (li, w) in enumerate(script):
    h = heard[match[k]] if match[k] is not None else None
    out.append({"w": w, "heard": h["word"].strip() if h else None, "start": h["start"] if h else None, "end": h["end"] if h else None, "line": li + 1})
# interpolate unmatched tokens between their matched neighbours
for k, o in enumerate(out):
    if o["start"] is None:
        p = next((out[q] for q in range(k - 1, -1, -1) if out[q]["start"] is not None), None)
        nx = next((out[q] for q in range(k + 1, len(out)) if out[q]["start"] is not None), None)
        a = p["end"] if p else 0.0; b = nx["start"] if nx else a + 0.3
        o["start"], o["end"], o["interp"] = a, b, True
json.dump(out, open("words.json", "w"), ensure_ascii=False, indent=0)
L = []
for li in range(len(lines)):
    ws = [o for o in out if o["line"] == li + 1]
    L.append({"line": li + 1, "id": f"L{li + 1:02d}", "start": round(ws[0]["start"], 3), "end": round(ws[-1]["end"], 3), "text": lines[li]})
json.dump(L, open("lines.json", "w"), ensure_ascii=False, indent=1)
matched = sum(1 for x in match if x is not None)
print(f"script tokens {n}, heard {m}, matched {matched} ({matched / n:.0%})")
for l in L: print(f'{l["id"]} {l["start"]:7.2f} - {l["end"]:7.2f}  {l["text"][:46]}')
