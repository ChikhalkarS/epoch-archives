# Standalone Short SH01 "30 साल" - single source for prompts, script, captions.
import re, math, sys
ROOT='/home/user/epoch-archives'
SB=open(ROOT+'/studio/STYLE_BIBLE.md').read()
blk=lambda k: re.search(r"```\n("+k+r":.*?)\n```",SB,re.S).group(1)
STY,CON,SUT,VOI=blk("STYLE"),blk("CONSTRAINTS"),blk("SUTRADHAR"),blk("VOICE")
ROLE="The Sutradhar ingredient defines his face, fur, ears, spectacles, tail, waistcoat and satchel only; ignore its grey background and panel layout."
FRAME="FRAMING: Vertical 9:16 portrait composition; keep the main subject centred and large in frame, stage depth from bottom to top, nothing important in the top 10% or bottom 20% (reserved for captions and the YouTube interface)."
ARCH="Inside the old archive room: wooden shelves of rolled scrolls, a brass oil lamp on a worn wooden desk, an old painted map of India on the back wall."
LAMP="Warm amber oil-lamp glow from camera-left, deep soft shadows, dark vignette at the edges."
DAY="Warm golden daylight from camera-left with soft light beams, rich painted shadows and a dark vignette at the frame edges."
SULTAN="the SULTAN, an anthropomorphic lion with a dark brown mane in an emerald-green robe with gold embroidery and a white turban with a gold jewel"
C=[
dict(id="S1",kind="cam",use=4.5,ing="Sutradhar sheet + Archive room",
 scene=ARCH+" On the desk sits a shallow wooden tray holding a miniature model valley: green hills and a deep indigo-blue lake held back by a tiny earthen embankment wall.",
 action="From the very first frame Sutradhar already grips the tiny embankment wall with both paws; he yanks it out of the model and the blue water gushes out of the valley across the tray; he holds the little wall up beside his face and looks straight into the lens.",
 camera="Medium close shot, eye level, 50mm, quick short push-in in the first second, then locked.",light=LAMP,
 amb="faint lamp flame flicker",sfx="a wet earthy squelch and a rush of spilling water at the very start",
 line="कहते हैं, एक झील को मिटाने में, तीस साल लगे।",facts="F14"),
dict(id="S2",kind="vo",use=6,ing="none (Text to Video)",
 scene="The 15th century: "+SULTAN+", sits on a horse on a rocky ridge overlooking a huge indigo lake held back by a massive dam of giant fitted sandstone blocks; leopard soldiers with iron picks stand on top of the dam.",
 action="The sultan raises one open paw; the leopard soldiers lift their picks and swing them down onto the stone dam together; they freeze at the bottom of the swing.",
 camera="Wide shot, high angle from behind the sultan's shoulder, 35mm, locked, the camera does not move.",light=DAY,
 amb="wind over the water, a horse snorting",sfx="iron picks striking stone in unison",
 line="कहानी पंद्रहवीं सदी की है। सुल्तान होशंगशाह ने, भोजपुर का बाँध तुड़वाया।",facts="F14"),
dict(id="S3",kind="vo",use=3.5,ing="none (Text to Video)",
 scene="Extreme close on the face of the massive sandstone dam: a dark crack running through two giant fitted blocks.",
 action="The crack splits wider, the two blocks grind apart, and a hard jet of indigo water bursts out through the gap toward the camera and keeps pouring.",
 camera="Close-up, low angle, 35mm, locked, the camera does not move.",light=DAY,
 amb="wind over the dam",sfx="stone cracking, then a roaring burst of water",
 line="बाँध तोड़ने में, तीन महीने।",facts="F14"),
dict(id="S4",kind="vo",use=3.5,ing="none (Text to Video)",
 scene="The huge Bhojpur lake seen from a high ridge, wooden boats on the water, sandstone hills around it.",
 action="In a fast time-lapse the water level sinks steadily, leaving muddy banks and boats stranded on dry ground, until only a few puddles shine; the scene settles.",
 camera="Extreme wide shot, high angle, 24mm, locked, the camera does not move.",light="Daylight flickering quickly from day to night and back as many days pass, painted shadows sweeping across the valley.",
 amb="wind",sfx="a long deep draining gurgle",
 line="झील खाली होने में, तीन साल।",facts="F14"),
dict(id="S5",kind="vo",use=5,ing="none (Text to Video)",
 scene="The drained lake bed: cracked dry ochre mud stretching to the hills, a stranded wooden boat in the foreground.",
 action="Green shoots sprout across the cracked mud in a time-lapse until the land becomes a field, and a nilgai farmer in a dhoti guides a wooden plough pulled by two bullocks across it and stops.",
 camera="Wide shot, eye level, 35mm, slow push-in.",light=DAY,
 amb="wind over fields, bullock bells",sfx="",
 line="और उस ज़मीन पर खेती होने में, पूरे तीस साल।",facts="F14"),
dict(id="S6",kind="vo",use=6.5,ing="none (Text to Video)",
 scene="A study in the 1880s lit by a kerosene lamp: an anthropomorphic badger scholar in a brown tweed jacket and Victorian waistcoat sits at a desk with a large open Persian-style manuscript covered in abstract scribble script.",
 action="The badger runs his pen along a line of the manuscript, stops, and confidently writes a note in his notebook; the camera reveals that the manuscript's small ink drawing shows a lake with an island; he keeps writing.",
 camera="Medium shot, eye level, 50mm, slow push-in past the badger's shoulder onto the manuscript.",light="Warm kerosene lamp light from camera-right, deep shadows, dark vignette.",
 amb="clock ticking",sfx="a pen nib scratching",
 line="पर एक शोध कहता है, ये कहानी, एक फ़ारसी ग्रंथ को ग़लत पढ़ने से बनी।",facts="F16"),
dict(id="S7",kind="cam",use=7,ing="Sutradhar sheet + Archive room",
 scene=ARCH+" An open paper ledger lies on the desk; Sutradhar holds a large rubber stamp above it.",
 action="Sutradhar brings the stamp down firmly onto the ledger page and lifts it, leaving a large round amber-orange ink stamp mark; then he leans toward the lens with one eyebrow raised and an open paw turned up, inviting an answer; he holds the pose.",
 camera="Medium close shot framing Sutradhar's face and the ledger together, slight high angle, 50mm, locked, the camera does not move.",light=LAMP,
 amb="faint lamp flame flicker",sfx="a heavy stamp thump, then a soft drum hit",
 line="सच या झूठ? जवाब है, विवादित। आप क्या मानते हैं? कमेंट में लिखिए।",facts="F14, F15, F16"),
]
def block(c):
    L=[f"### {c['id']} · {'Ingredients to Video' if c['kind']=='cam' else 'Text to Video'} · ingredients: {c['ing']} · 9:16 · 8 s · keep ~{c['use']} s","","```",STY,FRAME]
    if c['kind']=='cam': L+= [SUT,ROLE]
    L+= ["SCENE: "+c['scene'],"ACTION: "+c['action'],"CAMERA: "+c['camera'],"LIGHTING: "+c['light']]
    L.append(f'DIALOGUE: Sutradhar looks into the lens and says in Hindi: "{c["line"]}"' if c['kind']=='cam' else f'VOICE-OVER (Sutradhar, off-screen, Hindi): "{c["line"]}"')
    L.append(VOI)
    L.append(" ".join(x for x in [f"AMBIENCE: {c['amb']}." if c['amb'] else "", f"SFX: {c['sfx']}." if c['sfx'] else ""] if x))
    L+= [CON,"```"]; return "\n".join(L)
out=ROOT+'/episodes/ep01-bhopal-jheel/shorts/sh01-30-saal'
tot=sum(c['use'] for c in C)
P=[f"""# Short SH01 · "3 महीने, 3 साल, 30 साल" · Google Flow prompts
Standalone Short (no EP1 dependency) · 7 clips · ≈ {tot:.0f} s after trimming · ≈ 70 credits + retakes.

## Settings (every clip)
Veo 3.1 - Lite · Video · 9:16 · 8 sec · x1 · prompt enhancer off. Clips S1 and S7: **Ingredients** with *Sutradhar sheet* + *Archive room*. Others: plain Text to Video (no ingredients).

## Quality check per take (keep only if all pass)
1. The Hindi line is complete, clear, and in the fox voice (deep, soft, curious, slightly brisk). Same voice as your best S1.
2. Hands: paws open or holding props. No odd fingers (regenerate if any finger gesture appears).
3. No text, letters or garbled writing anywhere.
4. The fox matches his sheet (spectacles, red waistcoat, satchel, black-tipped tail).
5. The action ends in a held pose (no extra random movement).

## Assembly in Scenebuilder
Order S1 → S7. Trim each to its "keep ~N s" (cut silence before and after the line). Hard cuts, no transitions. Export.
"""]
for c in C: P.append(block(c)+"\n")
open(out+'/flow_prompts.md','w').write("\n".join(P))
# captions SRT from planned trims
def ts(s): h=int(s//3600); m=int(s%3600//60); return f"{h:02d}:{m:02d}:{s%60:06.3f}".replace('.',',')
t=0; srt=[]
for i,c in enumerate(C,1):
    srt.append(f"{i}\n{ts(t+0.2)} --> {ts(t+c['use']-0.1)}\n{c['line']}\n"); t+=c['use']
open(out+'/captions_hi.srt','w').write("\n".join(srt))
rows="\n".join(f"| {c['id']} | {c['use']} s | {'कैमरे पर' if c['kind']=='cam' else 'VO'} | {c['line']} [{c['facts'].replace(', ','][')}] |" for c in C)
open(out+'/script_hi.md','w').write(f"""# SH01 script · 3 महीने, 3 साल, 30 साल
≈ {tot:.0f} s · {sum(len(c['line'].split()) for c in C)} words · Source facts: `../../research.md`

**Message:** The famous "sultan drained the lake" story is disputed, and you decide.
**Structure:** hook → retain (number ladder 3 / 3 / 30) → twist (the research) → reward (verdict) → comment ask.
**Hook (3 tracks):** picture = the fox yanks a dam out of a lake model in frame 1 and water gushes; spoken = "कहते हैं, एक झील को मिटाने में, तीस साल लगे।"; text = burned caption of the same line, with "तीस साल" highlighted.

| Clip | Keep | Who | Line |
|---|---|---|---|
{rows}

**Accuracy:** the popular account is framed as a story ("कहते हैं", "कहानी… की है"). The counter-view is a single research view (F16), framed as "एक शोध कहता है". The verdict is विवादित.
""")
print("ok",tot)
