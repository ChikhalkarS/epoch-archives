#!/usr/bin/env python3
"""Original score + SFX + final mix for "Krishna Ne Indra Ko Saza Kyun Nahi Di?" (all own synthesis).

Reads ../voice/lines.json (line start/end) and ../app/out/events.json (whips, flashes, lift, cows, etc. from the
picture timeline). Writes music.wav, sfx.wav, mix.wav (48 kHz stereo, exact voice length), cues.md.
Palette: tanpura drone, bansuri (breathy flute: Krishna's motif), tabla (dayan/bayan strokes, keherwa theka),
manjira, temple bell, low drums for the storm. Raag: Bhupali (S R G P D), Sa = D4.
"""
import json, sys
import numpy as np
from dsp import SR, TAU, rng, lp, hp, bp, reson, colored, fades, modal, place, st, pan, make_ir, convolve_st, integrated, true_peak, read_wav, write_wav, ramp
from instruments import m2f, whistle, pluck, pad, timpani, cymbal

LINES = json.load(open("../voice/lines.json"))
EV = json.load(open("../app/out/events.json")) if len(sys.argv) < 2 else json.load(open(sys.argv[1]))
T = {l["id"]: (l["start"], l["end"]) for l in LINES}
voice = read_wav("voice48.wav")[0].mean(axis=0)
DUR = len(voice) / SR
N = len(voice)
R = rng(7)
SA = 62  # D4
BHUP = [0, 2, 4, 7, 9]

def deg(d, octave=0):
    """Bhupali scale degree (0 = Sa) -> midi"""
    return SA + 12 * (octave + d // 5) + BHUP[d % 5]

def buf():
    return np.zeros((2, N))

def add(b, x, t, gain=1.0, p=0.0):
    if x.ndim == 1: x = pan(x, p)
    place(b, x, t, gain)

# ---------------------------------------------------------------- instruments
def tabla(stroke, vel=0.8, r=R):
    n = int(0.7 * SR); t = np.arange(n) / SR
    f0 = m2f(SA + 12)  # dayan tuned to Sa (D5)
    if stroke in ("na", "ta"):
        y = modal(0.5, [(f0, 1.0, 0.18), (f0 * 2.0, 0.5, 0.12), (f0 * 3.01, 0.3, 0.08), (f0 * 4.1, 0.15, 0.05)], r)
        y = y + bp(r.standard_normal(len(y)), 2000, 6000) * np.exp(-np.arange(len(y)) / SR / 0.01) * 0.3
    elif stroke == "tin":
        y = modal(0.8, [(f0, 1.0, 0.45), (f0 * 2.0, 0.4, 0.25), (f0 * 3.0, 0.2, 0.15)], r)
    elif stroke in ("ge", "ghe"):
        f = 95 * (1 + 0.35 * np.exp(-t / 0.08))
        y = np.sin(np.cumsum(TAU * f / SR)) * np.exp(-t / 0.32) + lp(r.standard_normal(n), 300) * np.exp(-t / 0.03) * 0.4
    elif stroke in ("ka", "ke"):
        y = lp(r.standard_normal(int(0.12 * SR)), 900) * np.exp(-np.arange(int(0.12 * SR)) / SR / 0.025)
    elif stroke == "dha":
        a, b = tabla("na", vel, r), tabla("ge", vel, r); m = max(len(a), len(b)); y = np.zeros(m); y[:len(a)] += a; y[:len(b)] += b * 0.9; return y * vel
    elif stroke == "dhin":
        a, b = tabla("tin", vel, r), tabla("ge", vel, r); m = max(len(a), len(b)); y = np.zeros(m); y[:len(a)] += a; y[:len(b)] += b * 0.9; return y * vel
    else:
        return np.zeros(10)
    return fades(y / (np.max(np.abs(y)) + 1e-9)) * vel

def manjira(vel=0.5, r=R):
    return modal(1.4, [(3150, 1.0, 0.9), (4720, 0.7, 0.6), (6340, 0.5, 0.4), (8100, 0.3, 0.3)], r) * vel

def temple_bell(vel=0.7, f0=520, r=R):
    return modal(4.5, [(f0, 1.0, 3.8), (f0 * 2.32, 0.6, 2.5), (f0 * 4.25, 0.4, 1.6), (f0 * 6.63, 0.25, 1.0), (f0 * 0.5, 0.4, 2.8)], r) * vel

def tanpura_cycle(t0, t1, b, gain=0.22):
    """repeating tanpura pattern Pa-Sa-Sa-Sa(low) with long buzzy strings, every ~3.6 s"""
    notes = [SA - 5, SA, SA, SA - 12]
    t = t0
    while t < t1:
        for k, m in enumerate(notes):
            s = pluck(m2f(m), vel=0.6, r=R, dur=3.2, bright=0.85, pos=0.11)
            s = s + 0.25 * hp(s, 1800)                      # jawari buzz
            add(b, s, t + k * 0.9, gain, p=-0.25 + 0.15 * k)
        t += 3.6

def drone(t0, t1, b, notes=(SA - 12, SA - 5), gain=0.16, dark=False):
    d = t1 - t0
    if d <= 0.2: return
    x = pad([m2f(m) for m in notes], d, vel=0.6, r=R, att=min(1.5, d / 3), rel=min(1.8, d / 3), warm=500 if dark else 1100, detune=6, trem=(lambda t: 1 - 0.15 * (0.5 + 0.5 * np.sin(TAU * 4.0 * t))) if dark else None)
    add(b, x, t0, gain)

def bansuri(phrase, t0, b, gain=0.34, octave=1, p=0.12):
    """phrase = [(beat_offset, beats, degree)], beat = 0.36 s"""
    notes = [(t0 + bo * 0.36, bl * 0.36, deg(dg, octave), 0.8) for bo, bl, dg in phrase]
    s, y = whistle(notes, R, breath=0.12, bright=0.09, vib_depth=22, vib_rate=5.2, scoop=-55)
    add(b, y, s, gain, p)

def keherwa(t0, t1, b, gain=0.5, beat=0.36):
    theka = ["dha", "ge", "na", "tin", "na", "ka", "dhin", "na"]
    t, k = t0, 0
    while t < t1 - 0.05:
        add(b, tabla(theka[k % 8], 0.9 if k % 8 == 0 else 0.7), t, gain, p=0.1)
        if k % 4 == 0: add(b, manjira(0.5), t, gain * 0.35, p=-0.3)
        t += beat; k += 1

def storm_drums(t0, t1, b, gain=0.5):
    t = t0
    while t < t1:
        add(b, timpani(m2f(SA - 24), vel=0.7, r=R, dur=1.6), t, gain)
        add(b, timpani(m2f(SA - 17), vel=0.5, r=R, dur=1.2), t + 0.72, gain * 0.8)
        t += 1.44

# ---------------------------------------------------------------- SFX
def rain_bed(t0, t1, gain, muffled=False):
    n = int((t1 - t0) * SR)
    if n <= 0: return np.zeros((2, 1))
    x = np.stack([bp(colored(n, R, slope=-0.6), 400, 9000), bp(colored(n, R, slope=-0.6), 400, 9000)])
    if muffled: x = np.stack([lp(x[0], 1200), lp(x[1], 1200)])
    env = np.minimum(1, np.minimum(np.arange(n) / (0.8 * SR), (n - np.arange(n)) / (0.8 * SR)))[None, :]
    return x * env * gain

def thunder(vel=1.0):
    n = int(4.0 * SR); t = np.arange(n) / SR
    crack = hp(R.standard_normal(n), 1500) * np.exp(-t / 0.06) * 0.6
    rumble = lp(colored(n, R, slope=-1.2), 180) * (np.exp(-t / 1.4) * (1 - np.exp(-t / 0.08)))
    y = crack + rumble * 3
    return fades(y / (np.max(np.abs(y)) + 1e-9)) * vel

def whoosh(d=0.4, up=True):
    n = int(d * SR); t = np.arange(n) / SR; x = R.standard_normal(n)
    out = np.zeros(n); seg = 512
    for i in range(0, n, seg):
        u = i / n; fc = 300 + (2500 if up else 900) * (u if up else 1 - u)
        out[i:i + seg] = bp(x[i:i + seg + 256], fc * 0.7, fc * 1.4)[:len(out[i:i + seg])]
    return fades(out * np.sin(np.pi * t / d) ** 1.5, 0.01, 0.05) * 0.8

def cowbell(vel=0.4):
    f = 820 + 60 * R.random()
    return modal(0.9, [(f, 1.0, 0.5), (f * 1.52, 0.6, 0.35), (f * 2.4, 0.4, 0.2)], R) * vel

def bird(vel=0.25):
    n = int(0.22 * SR); t = np.arange(n) / SR
    f = 3200 + 1400 * np.sin(np.pi * t / 0.22) + 300 * np.sin(TAU * 28 * t)
    return fades(np.sin(np.cumsum(TAU * f / SR)) * np.sin(np.pi * t / 0.22) ** 2) * vel

def rumble(d=2.5, vel=1.0):
    n = int(d * SR); t = np.arange(n) / SR
    y = lp(colored(n, R, slope=-1.4), 120) * (1 - np.exp(-t / 0.3)) * np.exp(-np.maximum(0, t - d * 0.6) / 0.5)
    return fades(y / (np.max(np.abs(y)) + 1e-9)) * vel

def chime(vel=0.4):
    out = np.zeros(int(2.5 * SR))
    for k, m in enumerate([SA + 24, SA + 28, SA + 31, SA + 36]):
        s = modal(2.0, [(m2f(m), 1.0, 1.2), (m2f(m) * 2.76, 0.3, 0.5)], R)
        o = int(k * 0.07 * SR); out[o:o + len(s)] += s[:len(out) - o]
    return out * vel

def pour(d=2.0, vel=0.35):
    n = int(d * SR); t = np.arange(n) / SR
    y = bp(R.standard_normal(n), 600, 3000) * (0.6 + 0.4 * np.sin(TAU * 7 * t + np.sin(TAU * 1.3 * t)))
    return fades(y * np.minimum(1, t / 0.2) * np.minimum(1, (d - t) / 0.4), 0.02, 0.1) * vel

# ---------------------------------------------------------------- arrangement by line
music, sfx, cues = buf(), buf(), []
def L(i): return T[f"L{i:02d}"]
def cue(t, what): cues.append(f"{int(t // 60)}:{t % 60:05.2f}  {what}")

# B+O cold open: storm (L01-L02), golden reveal (L03), questions (L04)
a, b_ = L(1)[0], L(2)[1]
drone(0, L(4)[1] + 0.5, music, notes=(SA - 24, SA - 17), gain=0.22, dark=True); storm_drums(0.2, L(2)[1], music, 0.32); cue(0, "storm drone + low drums")
bansuri([(0, 2, 2), (2, 1, 3), (3, 3, 4), (6, 1, 3), (7, 4, 2)], L(3)[0] + 0.2, music, 0.30); add(music, temple_bell(0.5), L(3)[1] - 0.8, 0.35); cue(L(3)[0], "bansuri: first golden light; bell on Govinda")
# village morning + R1 (L05-L12): cheerful
v0, v1 = L(5)[0] - 0.4, L(12)[1]
tanpura_cycle(v0, v1, music, 0.16); drone(v0, v1, music, gain=0.08)
keherwa(L(6)[0], v1, music, 0.33); cue(v0, "morning: tanpura + keherwa tabla")
motif = [(0, 1, 0), (1, 1, 1), (2, 2, 2), (4, 1, 3), (5, 1, 2), (6, 2, 1), (8, 3, 0)]
t = v0 + 0.5
while t < v1 - 3.5:
    bansuri(motif if int((t - v0) / 3.4) % 2 == 0 else [(0, 1, 3), (1, 1, 4), (2, 2, 5), (4, 2, 4), (6, 3, 2)], t, music, 0.24); t += 6.8
# L13 hush -> L14 divine form -> L15 smile -> L16 Indra watching
add(music, chime(0.5), L(14)[0], 0.5); drone(L(13)[0], L(15)[1], music, notes=(SA - 12, SA - 5, SA + 4), gain=0.14); add(music, temple_bell(0.6), L(14)[0] + 1.2, 0.4)
bansuri([(0, 2, 4), (2, 2, 3), (4, 4, 2)], L(15)[0] + 0.3, music, 0.22); cue(L(13)[0], "hush, chime + bells for the divine form")
drone(L(16)[0], L(18)[1], music, notes=(SA - 24, SA - 23), gain=0.2, dark=True); cue(L(16)[0], "Indra: dark cluster drone")
# storm (L17-L22)
storm_drums(L(17)[0], L(22)[0], music, 0.42); add(music, cymbal(0.5, R, 3.0, 0.6), L(19)[0], 0.25); cue(L(17)[0], "storm drums")
drone(L(19)[0], L(22)[1], music, notes=(SA - 24, SA - 17), gain=0.18, dark=True)
# lift (L22) swell, shelter calm (L23-L24), clouds empty + sunrise (L25-L26)
drone(L(22)[0], L(23)[0] + 1, music, notes=(SA - 12, SA - 5, SA, SA + 4), gain=0.2); cue(L(22)[0], "lift: rising chord")
tanpura_cycle(L(23)[0], L(26)[1], music, 0.13)
bansuri([(0, 2, 0), (2, 2, 2), (4, 3, 3), (7, 1, 2), (8, 4, 1)], L(23)[0] + 0.3, music, 0.22)
bansuri([(0, 2, 4), (2, 1, 5), (3, 3, 4), (6, 2, 2), (8, 4, 3)], L(26)[0] + 0.2, music, 0.26); add(music, temple_bell(0.5), L(26)[0], 0.3); cue(L(23)[0], "shelter: tanpura + soft bansuri; sunrise bansuri")
# R3 (L27-L33): wonder, flashback, tension, Indra comes
keherwa(L(27)[0], L(28)[1], music, 0.22, beat=0.42); add(music, chime(0.4), L(29)[0], 0.4); drone(L(29)[0], L(29)[1], music, notes=(SA, SA + 7), gain=0.1)
drone(L(30)[0], L(33)[1], music, notes=(SA - 12, SA - 9, SA - 5), gain=0.17); cue(L(30)[0], "tension -> Indra arrives: minor-ish pad")
# E (L34-L42): answer, abhishek, Govinda
drone(L(34)[0], L(42)[1] + 1, music, notes=(SA - 12, SA - 5), gain=0.1); tanpura_cycle(L(35)[0], L(42)[1], music, 0.14)
bansuri([(0, 3, 2), (3, 2, 3), (5, 3, 4), (8, 4, 2)], L(35)[0] + 0.3, music, 0.2); bansuri([(0, 2, 4), (2, 2, 5), (4, 4, 4), (8, 4, 2)], L(38)[0] + 0.2, music, 0.24)
for i in (39, 40): add(music, chime(0.5), L(i)[0] + 0.2, 0.45)
add(music, temple_bell(0.8), L(40)[1] - 1.2, 0.5); add(music, temple_bell(0.7, 650), L(41)[0] + 0.3, 0.4)
keherwa(L(41)[0], L(42)[1], music, 0.3); bansuri(motif, L(42)[0] + 0.3, music, 0.26); cue(L(39)[0], "abhishek chimes, bells on Govinda, tabla returns")
# D (L43-L45)
keherwa(L(43)[0], DUR - 0.5, music, 0.28); tanpura_cycle(L(43)[0], DUR - 1, music, 0.12); bansuri(motif, L(44)[0], music, 0.22)
add(music, temple_bell(0.5), DUR - 2.2, 0.3); cue(L(43)[0], "outro: tabla + bansuri")

# ---------------------------------------------------------------- SFX from picture events
fps = 30
for kind, spans in EV.get("rain", {}).items():
    for a_, b2 in spans:
        add(sfx, rain_bed(a_ / fps, b2 / fps, 0.10 if kind == "out" else 0.05, muffled=(kind == "under")), a_ / fps, 1.0)
for fl in EV.get("flashes", []): add(sfx, thunder(0.9), fl / fps + 0.05, 0.55, p=0.2 * np.sin(fl))
for a_, b2 in EV.get("whips", []): add(sfx, whoosh((b2 - a_) / fps + 0.25, up=True), a_ / fps - 0.05, 0.35)
for f in EV.get("cowbells", []): add(sfx, cowbell(0.5), f / fps, 0.35, p=R.uniform(-0.5, 0.5))
for f in EV.get("birds", []): add(sfx, bird(0.3), f / fps, 0.3, p=R.uniform(-0.6, 0.6))
for f in EV.get("rumbles", []): add(sfx, rumble(2.6, 1.0), f / fps, 0.6)
for f in EV.get("chimes", []): add(sfx, chime(0.4), f / fps, 0.35)
for a_, b2 in EV.get("pours", []): add(sfx, pour((b2 - a_) / fps, 0.4), a_ / fps, 0.4)
for f in EV.get("slams", []): add(sfx, timpani(m2f(SA - 24), vel=1.0, r=R, dur=1.4), f / fps, 0.6)

# ---------------------------------------------------------------- mix: voice dominant, music ducked under speech
ir = make_ir(1.6, 3)
music = 0.75 * music + 0.25 * convolve_st(music, ir)[:, :N]
words = json.load(open("../voice/words.json"))
spans = []
for w in words:
    if spans and w["start"] - spans[-1][1] < 0.3: spans[-1][1] = max(spans[-1][1], w["end"])
    else: spans.append([w["start"], w["end"]])
duck = np.ones(N)
for s0, s1 in spans:
    a_, b2 = int(max(0, s0 - 0.08) * SR), int(min(DUR, s1 + 0.12) * SR); duck[a_:b2] = 10 ** (-7 / 20)
k = int(0.12 * SR); duck = np.convolve(duck, np.ones(k) / k, mode="same")
music *= duck[None, :]
v = st(voice)
def lufs(x): return integrated(x)
mus_gain = 10 ** ((lufs(v) - 19 - lufs(music)) / 20)       # music ~19 LU under the voice before ducking
sfx_gain = 10 ** ((lufs(v) - 16 - lufs(sfx)) / 20) if np.any(sfx) else 0
mix = v + music * mus_gain + sfx * sfx_gain
g = 10 ** ((-14.0 - lufs(mix)) / 20); mix *= g
tp = true_peak(mix)
if tp > -1.0:   # simple look-ahead limiter: gain envelope from the peak envelope
    env = np.maximum(np.abs(mix).max(axis=0), 1e-9); lim = 10 ** (-1.3 / 20)
    gr = np.minimum(1, lim / env)
    w_ = int(0.004 * SR)                                   # spread each gain dip over +-4 ms (look-ahead) then smooth
    from scipy.ndimage import minimum_filter1d
    gr = minimum_filter1d(gr, 2 * w_ + 1); gr = np.convolve(gr, np.ones(w_) / w_, mode="same")
    mix *= gr[None, :]
write_wav("music.wav", music * mus_gain); write_wav("sfx.wav", sfx * sfx_gain if np.any(sfx) else sfx); write_wav("mix.wav", mix)
open("cues.md", "w").write("# Score and SFX cues\n\n" + "\n".join(f"- {c}" for c in cues) + "\n")
print(f"mix: {lufs(mix):.1f} LUFS, true peak {true_peak(mix):.1f} dBTP, {DUR:.2f} s")
