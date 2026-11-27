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
COURT="A 15th-century Malwa court with carved stone arches"
C=[
dict(id="S1",kind="cam",use=6.5,ing="Sutradhar sheet + Archive room",
 scene=ARCH+" On the desk sits a shallow wooden tray holding a miniature model valley: green hills and a deep indigo-blue lake held back by a tiny earthen embankment wall.",
 action="From the very first frame Sutradhar already grips the tiny embankment wall with both paws; he yanks it out of the model and the blue water gushes out of the valley across the tray; he holds the little wall up beside his face and looks straight into the lens.",
 camera="Medium close shot, eye level, 50mm, quick short push-in in the first second, then locked.",light=LAMP,
 amb="faint lamp flame flicker, a distant clock ticking",sfx="at the start a wet earthy squelch as the wall comes out, then a rushing gush of water across the tray and droplets pattering onto the wooden desk",
 line="कहते हैं, भोपाल के पास एक झील को मिटाने में, पूरे तीस साल लग गए। सोचो ज़रा!",facts="F10, F14"),
dict(id="S2",kind="cam",use=5,ing="Sutradhar sheet + Archive room",
 scene=ARCH+" A thick old cardboard archive file folder tied with red string lies on the desk, a big red wax seal on its cover.",
 action="Sutradhar snaps the red string, cracks the wax seal with his thumb and flips the file folder open toward the lens in one quick move; the lamp flame flares brighter; he looks up over the open file with a calm half-smile.",
 camera="Medium shot, slight low angle, 35mm, quick push-in, then locked.",light=LAMP,
 amb="lamp flame flicker",sfx="a string snap, a crisp wax crack, a quick paper whoosh as the file opens, then a short deep brass chime",
 line="स्वागत है आर्काइव फ़ाइल्स में! फ़ाइल नंबर एक, आज खुलेगा भोपाल की गुम झील का असली सीन।",facts=""),
dict(id="S3",kind="vo",use=6,ing="none (Text to Video)",
 scene="The 15th century: "+SULTAN+", sits on a horse on a rocky ridge overlooking a huge indigo lake held back by a massive dam of giant fitted sandstone blocks; leopard soldiers with iron picks stand on top of the dam.",
 action="The sultan raises one open paw; the leopard soldiers lift their picks and swing them down onto the stone dam together; they freeze at the bottom of the swing.",
 camera="Wide shot, high angle from behind the sultan's shoulder, 35mm, locked, the camera does not move.",light=DAY,
 amb="wind over the water, distant birds",sfx="a horse snorting and stamping, metal clinking as the picks are raised, then a sharp chorus of iron picks striking stone on the swing",
 line="कहानी पंद्रहवीं सदी की है। सुल्तान होशंगशाह ने ऑर्डर दिया, और भोजपुर का बड़ा बाँध तोड़ दिया गया।",facts="F14"),
dict(id="S4",kind="vo",use=6,ing="none (Text to Video)",
 scene="Close on the face of the massive sandstone dam: a dark crack running through two giant fitted blocks, the huge lake behind it.",
 action="The crack splits wide, the two blocks grind apart, and a hard jet of indigo water bursts through the gap and grows into a roaring torrent pouring down the valley.",
 camera="Close-up, low angle, 35mm, slow pull-out to reveal the torrent.",light=DAY,
 amb="wind over the dam",sfx="a deep stone crack, heavy blocks grinding, then a roaring torrent and splashing debris",
 line="बाँध तोड़ने में तीन महीने, झील खाली होने में तीन साल, और खेती शुरू होने में पूरे तीस साल!",facts="F14"),
dict(id="S5",kind="vo",use=6.5,ing="none (Text to Video)",
 scene="A study in the 1880s lit by a kerosene lamp: an anthropomorphic badger scholar in a brown tweed jacket and Victorian waistcoat sits at a desk with a large open Persian-style manuscript covered in abstract scribble script.",
 action="The badger runs his pen along a line of the manuscript, stops, nods with confidence and writes a quick note in his notebook; he keeps writing.",
 camera="Medium shot, eye level, 50mm, slow push-in past the badger's shoulder onto the manuscript.",light="Warm kerosene lamp light from camera-right, deep shadows, dark vignette.",
 amb="a clock ticking, the soft hiss of a kerosene lamp",sfx="a sharp record-scratch at the very start, then a pen nib scratching, a page turning, and a low dramatic riser at the end",
 line="पर असली सीन तो अब शुरू होता है! शोध कहता है, अठारह सौ अठासी में एक अंग्रेज़ ने किताब ग़लत पढ़ी।",facts="F16"),
dict(id="S6",kind="vo",use=6,ing="none (Text to Video)",
 scene="Night on a lake: a small wooded hideout surrounded by dark indigo water; a few anthropomorphic jackal bandits in dark turbans sit around a campfire; on the far shore road a caravan of camel merchants with lanterns passes.",
 action="Two jackal bandits push a rowing boat off from the hideout and row quickly toward the caravan on the shore; the boat glides across the dark water and the campfire keeps flickering behind them.",
 camera="Wide shot, high angle, 35mm, slow pan from the hideout toward the caravan.",light="Cold moonlight from above, small orange campfire glow and warm lantern dots on the far shore.",
 amb="night crickets, water lapping",sfx="a crackling campfire, oars splashing quickly, distant camel bells",
 line="अनुवाद के हिसाब से, डाकू झील से घिरी एक जगह पर छिपकर, व्यापारियों को लूटते थे।",facts="F16"),
dict(id="S7",kind="vo",use=6,ing="none (Text to Video)",
 scene=COURT+": the lion SULTAN in his emerald-green and gold robe and white turban sits on a low throne; a small group of anthropomorphic camel merchants in turbans with bundles stand before him.",
 action="The lead camel merchant bows and sweeps his open hand toward a window that shows a lake with a small island; the sultan looks out at it, then gives one firm nod.",
 camera="Wide shot, eye level, 35mm, locked, the camera does not move.",light="Warm daylight falling through the stone arches from camera-left, deep painted shadows, dark vignette.",
 amb="a quiet murmur of the court, a camel grunting outside",sfx="rustling robes as the merchant bows, then a single deep drum hit on the sultan's nod",
 line="व्यापारियों ने शिकायत की, सुल्तान ने बाँध तुड़वाया, और शोध कहता है, वो झील भोपाल की ही थी!",facts="F16, F17"),
dict(id="S8",kind="cam",use=5.5,ing="Sutradhar sheet + Archive room",
 scene=ARCH+" An open paper ledger lies on the desk; Sutradhar holds a large rubber stamp above it.",
 action="Sutradhar brings the stamp down firmly onto the ledger page and lifts it, leaving a large round amber-orange ink stamp mark; then he looks up at the lens with one eyebrow raised and taps the stamp mark once; he holds the pose.",
 camera="Medium close shot framing Sutradhar's face and the ledger together, slight high angle, 50mm, locked, the camera does not move.",light=LAMP,
 amb="faint lamp flame flicker",sfx="a heavy stamp thump with a deep drum hit on the final word",
 line="तो असली सीन क्या है? भोजपुर की झील शायद बाढ़ ले गई, और सुल्तान वाली कहानी? विवादित!",facts="F14, F15, F16"),
dict(id="S9",kind="cam",use=4,ing="Sutradhar sheet + Archive room",
 scene=ARCH+" An old globe stands on the desk.",
 action="Sutradhar gives the old globe a quick spin with one open paw, then turns to the lens, taps his rolled scroll against his open paw and gives a playful wink; he holds the pose.",
 camera="Medium close shot, eye level, 50mm, locked, the camera does not move.",light=LAMP,
 amb="lamp flame flicker",sfx="a quick whirring globe spin, then a soft playful pluck as he winks",
 line="अगली फ़ाइल किसकी खुलेगी, देखना है? तो फ़ॉलो करना मत भूलना!",facts=""),
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
P=[f"""# फ़ाइल 001 · भोपाल की गुम झील का असली सीन · Google Flow prompts
Short · फ़ाइल 001 (series format: `studio/VISION.md`) · 9 clips · ≈ {tot:.0f} s after trimming · ≈ 90 credits + retakes (S9 = reusable end clip: generate once, add to every future Short).

## Settings (every clip)
Veo 3.1 - Lite · Video · 9:16 · 8 sec · x1 · prompt enhancer off. Clips S1, S2, S8, S9: **Ingredients** with *Sutradhar sheet* + *Archive room*. Others: plain Text to Video (no ingredients).

## Quality check per take (keep only if all pass)
1. The Hindi line is complete, clear, and in the fox voice (deep, soft, curious, slightly brisk). Same voice as your best S1.
2. Hands: paws open or holding props. No odd fingers (regenerate if any finger gesture appears).
3. No text, letters or garbled writing anywhere.
4. The fox matches his sheet (spectacles, red waistcoat, satchel, black-tipped tail).
5. The action ends in a held pose (no extra random movement).

## Assembly in Scenebuilder
Order S1 → S9. Trim each to its "keep ~N s" (cut silence before and after the line). Hard cuts, no transitions. Export.
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
open(out+'/script_hi.md','w').write(f"""# फ़ाइल 001 script · भोपाल की गुम झील का असली सीन
≈ {tot:.0f} s · {sum(len(c['line'].split()) for c in C)} words · Source facts: `../../research.md`

**Message:** The famous "sultan drained the lake" story is disputed, and you decide.
**Structure:** hook → popular story (order, 3 months + 3 years, 30 years) → \"पर ठहरिए\" (1888 misreading) → what the chronicle really says (bandits, merchants) → the dam was Bhopal's → what broke Bhojpur's dam (flood) → verdict + comment question. Lines 15–18 words, brisk voice, layered SFX per clip (owner feedback v3).
**Hook (3 tracks):** picture = the fox yanks a dam out of a lake model in frame 1 and water gushes; spoken = "कहते हैं, भोपाल के पास एक विशाल झील थी, जिसे मिटाने में पूरे तीस साल लगे।"; text = burned caption of the same line, with "तीस साल" highlighted.

| Clip | Keep | Who | Line |
|---|---|---|---|
{rows}

**Accuracy:** the popular account is framed as a story ("कहते हैं", "कहानी… की है"). The counter-view is a single research view (F16), framed as "एक शोध कहता है". The verdict is विवादित.
""")
print("ok",tot)
