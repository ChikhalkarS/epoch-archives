#!/usr/bin/env python3
"""Check every Flow prompt block against studio/DECISIONS.md rules. Usage: python3 tools/flowpack/validate.py <flow_prompts.md>..."""
import re, sys
ROOT='/home/user/epoch-archives'
SB=open(ROOT+'/studio/STYLE_BIBLE.md').read()
blk=lambda k: re.search(r"```\n("+k+r":.*?)\n```",SB,re.S).group(1)
STY,CON,SUT,VOI=blk("STYLE"),blk("CONSTRAINTS"),blk("SUTRADHAR"),blk("VOICE")
ROLE="The Sutradhar ingredient defines his face, fur, ears, spectacles, smirk, bandhgala, stole and satchel only"
BAN=[(r"\bfox\b","old fox character"),(r"\bclay\b|plasticine|claymation|stop-motion","old claymation style"),
     (r"\bfinger\b(?! on the keys)|\bpoints? (?:it|at|his finger)","single-finger gesture"),
     (r"\b(grin|grins|wink|winks|big smile|smiles)\b","Sutradhar must smirk, not grin/wink"),
     (r"\bsuit\b|\bnecktie\b|white gloves","Western attire"),(r"एपिसोड","old 'episode' wording (use फ़ाइल)"),
     (r"कीजिए|लिखिए|बताइए|(?<!अपने )आप ","polite आप-form (tone is casual तुम-form)"),(r"इतिहास याद रखिए","old catchphrase")]
def check(path):
    txt=open(path).read(); errs=[]; n=0
    for m in re.finditer(r"^### (\S+)[^\n]*\n\n```\n(.*?)\n```",txt,re.S|re.M):
        n+=1; cid,b=m.group(1),m.group(2); hdr=txt[m.start():txt.index("\n",m.start())]
        e=[]
        if not b.startswith(STY): e.append("STYLE block missing/outdated")
        if not b.rstrip().endswith(CON): e.append("CONSTRAINTS block missing/outdated")
        speech=re.search(r'(?:DIALOGUE|VOICE-OVER)[^"]*"([^"]+)"',b)
        if speech:
            if VOI not in b: e.append("VOICE block missing/outdated")
            w=len(speech.group(1).replace("...","").split())
            if w>20: e.append(f"line too long ({w} words)")
            if w<5 and "use ~3" not in hdr: e.append(f"line very short ({w} words)")
        elif "No speech" not in b: e.append("no speech line and no 'No speech.'")
        if "SUTRADHAR:" in b or "Sutradhar looks into the lens" in b:
            if SUT not in b: e.append("SUTRADHAR block missing/outdated")
            if ROLE not in b: e.append("Sutradhar role line missing/outdated")
        if "Sultan" in hdr and "Sultan ingredient defines" not in b: e.append("Sultan role line missing")
        if "9:16" in hdr and "FRAMING: Vertical 9:16" not in b: e.append("9:16 framing line missing")
        for rx,why in BAN:
            if re.search(rx,b,re.I): e.append(why)
        if e: errs.append(f"  {cid}: "+"; ".join(sorted(set(e))))
    if '/shorts/' in path:
        for must,why in [("स्वागत है आर्काइव फ़ाइल्स","welcome line"),("असली सीन","असली सीन format"),("तो असली सीन क्या है","verdict line"),("अगली फ़ाइल किसकी खुलेगी, देखना है? तो फ़ॉलो करना मत भूलना!","end line"),("FRAMING: Vertical 9:16","vertical framing")]:
            if must not in txt: errs.append(f"  SHORT: missing {why}")
    print(f"{path}: {n} prompts, {len(errs)} with issues"); print("\n".join(errs))
    return not errs
ok=all([check(p) for p in sys.argv[1:]])
sys.exit(0 if ok else 1)
