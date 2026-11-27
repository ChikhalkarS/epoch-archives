import math, re, sys, importlib.util
spec=importlib.util.spec_from_file_location("ep",sys.argv[1]); ep=importlib.util.module_from_spec(spec); spec.loader.exec_module(ep)
out=sys.argv[2]
STYLE=open('/home/user/epoch-archives/studio/STYLE_BIBLE.md').read()
blk=lambda k: re.search(r"```\n("+k+r":.*?)\n```",STYLE,re.S).group(1)
STY,CON,SUT,VOI=blk("STYLE"),blk("CONSTRAINTS"),blk("SUTRADHAR"),blk("VOICE")
ROLE="The Sutradhar ingredient defines his face, fur, ears, spectacles, tail, waistcoat and satchel only; ignore its grey background and panel layout."
wc=lambda s: len(s.replace("...","").split()) if s else 0
def dur(c):
    if c['kind']=='sil': return 3 if c['sec']=='Logo' else 8
    return min(8,max(4,math.ceil(wc(c['line'])/2+1.5)))
bad=[(c['id'],wc(c['line'])) for c in ep.C if wc(c['line'])>16]
assert not bad, bad
def block(c,vertical=False,cid=None,line=None,sec=None):
    line=line if line is not None else c['line']; cid=cid or c['id']; sec=sec or c['sec']
    mode="Ingredients to Video (Sutradhar sheet + Archive room)" if c['kind']=='cam' else ("Ingredients to Video (Archive room)" if "archive room" in c['scene'].lower() else "Text to Video")
    ar="9:16" if vertical else "16:9"
    L=[f"### {cid} · {sec} · {mode} · {ar} · use ~{dur(dict(c,line=line))} s","","```"]
    L.append(STY)
    if vertical: L.append("FRAMING: Vertical 9:16 portrait composition; keep the main subject centred and large in frame, stage depth from bottom to top.")
    if c['kind']=='cam': L.append(SUT); L.append(ROLE)
    L.append("SCENE: "+c['scene']); L.append("ACTION: "+c['action'])
    L.append("CAMERA: "+c['camera']); L.append("LIGHTING: "+c['light'])
    if c['kind']=='cam':
        L.append(f'DIALOGUE: Sutradhar looks into the lens and says in Hindi, calmly: "{line}"'); L.append(VOI)
    elif c['kind']=='vo' and line:
        L.append(f'VOICE-OVER (Sutradhar, off-screen, Hindi): "{line}"'); L.append(VOI)
    else: L.append("No speech.")
    L.append(" ".join(x for x in [f"AMBIENCE: {c['amb']}." if c['amb'] else "", f"SFX: {c['sfx']}." if c['sfx'] else ""] if x))
    L.append(CON); L.append("```"); return "\n".join(L)
# ---- script
t=0; rows=[]; subs=[]; words=0
for c in ep.C:
    d=dur(c); mm=f"{int(t//60)}:{int(t%60):02d}"
    if c['line']:
        tag=f" [{c['facts'].replace(', ','][')}]" if c['facts'] else ""
        rows.append(f"| {mm} | {c['id']} | {c['sec']} | {'(कैमरे पर) ' if c['kind']=='cam' else ''}{c['line']}{tag} |"); subs.append(c['line']); words+=wc(c['line'])
    else: rows.append(f"| {mm} | {c['id']} | {c['sec']} | *(no speech: {c['sec'].lower()})* |")
    t+=d
total=t
open(out+'/subtitles_hi.txt','w').write("\n".join(subs)+"\n")
hdr=open(sys.argv[3]+'/_script_head.md').read().replace("{WORDS}",str(words)).replace("{RUNTIME}",f"{int(total//60)}:{int(total%60):02d}").replace("{CLIPS}",str(len(ep.C)))
open(out+'/script_hi.md','w').write(hdr+"\n| Time | Clip | Section | Narration (Hindi, fact tags removed before Flow) |\n|---|---|---|---|\n"+"\n".join(rows)+"\n\n"+open(sys.argv[3]+'/_script_tail.md').read())
# ---- prompts
P=[open(sys.argv[3]+'/_prompts_head.md').read().replace("{CLIPS}",str(len(ep.C))).replace("{RUNTIME}",f"{int(total//60)}:{int(total%60):02d}")]
P.append("\n## Shot plan\n| Clip | Section | Mode | Use | Picture | Hindi line |\n|---|---|---|---|---|---|")
for c in ep.C:
    mode={"cam":"Ingr: Sutradhar+Room","vo":"Text","sil":"Text"}[c['kind']]
    if c['kind']!='cam' and "archive room" in c['scene'].lower(): mode="Ingr: Room"
    pic=c['action'].split(';')[0][:90]
    P.append(f"| {c['id']} | {c['sec']} | {mode} | {dur(c)} s | {pic} | {c['line'] or '—'} |")
P.append("\n## Prompts (16:9)\n")
for c in ep.C: P.append(block(c)+"\n")
# ---- shorts
byid={c['id']:c for c in ep.C}
P.append("\n## Shorts (9:16, re-prompted natively in Portrait)\nEach Short: generate these blocks in Portrait, stitch in a new Scenebuilder project, 30-45 s. Title and description are in `youtube.md`.\n")
for s in ep.SHORTS:
    P.append(f"### {s['id']} · \"{s['title']}\"\n")
    hook=dict(byid['C55']); hook.update(line=s['hook'], scene=ep.ARCH, action=s['hook_action'], camera="Medium close shot, eye level, 50mm, slow push-in.", sfx="a low rising whoosh")
    P.append(block(hook,True,f"{s['id']}-a","{}".format(s['hook']),"Short hook")+"\n")
    for i,cid in enumerate(s['clips']):
        P.append(block(byid[cid],True,f"{s['id']}-{chr(98+i)}")+"\n")
    end=dict(byid['C86']); end.update(line=s['end'], action="Sutradhar taps his rolled scroll twice against his palm and points it toward the lens; he holds the point.", camera="Medium shot, eye level, 35mm, locked, the camera does not move.", sfx="")
    P.append(block(end,True,f"{s['id']}-z",s['end'],"Short end")+"\n")
open(out+'/flow_prompts.md','w').write("\n".join(P))
print("clips",len(ep.C),"words",words,"runtime",f"{total/60:.1f} min")
