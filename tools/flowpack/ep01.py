# EP1 clip list. Each clip: id, section, kind ('cam' Sutradhar on camera | 'vo' voice-over | 'sil' silent),
# scene, action, camera, light, amb, sfx, hindi line, facts
S="SUTRADHAR"
ARCH="Inside the old archive room: wooden shelves of rolled scrolls, a brass oil lamp on a worn wooden desk, an old painted map of India on the back wall."
LAMP="Warm amber oil-lamp glow from camera-left, deep soft shadows, dark vignette at the edges."
DAWN="Low amber sunrise light from camera-right, long deep shadows, thin glowing mist, dark vignette at the frame edges."
DAY="Warm golden daylight from camera-left with soft light beams, rich painted shadows and a dark vignette at the frame edges."
MAP="An old hand-painted map of central India spread on a wooden table: hills shaded in sepia and green, ochre plains, rivers drawn as indigo lines."
ROOMTONE="faint lamp flame flicker, quiet room tone"
C=[]
def c(id,sec,kind,scene,action,camera,light,amb,sfx,line=None,facts=""):
  C.append(dict(id=id,sec=sec,kind=kind,scene=scene,action=action,camera=camera,light=light,amb=amb,sfx=sfx,line=line,facts=facts))

# ---------------- HOOK ----------------
c("C01","Hook","cam",ARCH+" On the desk sits a shallow wooden tray holding a miniature model valley: green hills and deep indigo-blue water held back by a tiny earthen embankment wall.",
 "Sutradhar stands behind the tray, grips the tiny embankment wall with both paws and lifts it out; the blue water slides out of the valley across the tray; he holds the little wall up toward the lens and stops.",
 "Medium close shot, eye level, 50mm, slow push-in toward Sutradhar and the tray.",LAMP,ROOMTONE,"a soft wet squelch as the wall lifts, water trickling across wood",
 "सुनो, भोपाल की सबसे बड़ी झील, क़ुदरत ने नहीं बनाई।","F1")
c("C02","Hook","cam",ARCH+" The tray with the drained model valley sits in front of him.",
 "Sutradhar lowers the little wall, peers over the top of his low spectacles at the viewer with a smug smirk, then sets the wall gently back into the valley and rests both hands on the tray.",
 "Close-up on Sutradhar's face and hands, eye level, 85mm, locked, the camera does not move.",LAMP,ROOMTONE,"a soft wooden tap as the wall is set down",
 "इसे इंसानों ने बनाया था, क़रीब हज़ार साल पहले। और ये तो बस शुरुआत है।","F1")
c("C03","Hook","vo",MAP+" A single indigo river line winds between the hills toward the left edge of the table.",
 "The indigo river line slowly bends in its middle as if redrawn by an unseen brush, and its flow turns to run toward the right edge instead; the new course settles and holds.",
 "Top-down shot, 35mm, slow descent toward the bending river.",DAY,"gentle trickling water","a soft brush-stroke sound as the river bends",
 "इसके लिए, एक पूरी नदी का रास्ता ही बदल दिया गया।","F4")
c("C04","Hook","cam",ARCH,
 "Sutradhar unties the red thread on his scroll and unrolls it toward the lens until it is fully open, then holds it still with both hands.",
 "Medium shot, slight low angle, 35mm, locked, the camera does not move.",LAMP,ROOMTONE,"dry parchment rustle",
 "किसने किया ये? और इससे भी बड़ी एक झील थी, वो आख़िर ग़ायब कहाँ हो गई?","F10, F11")
c("C05","Welcome","vo","A thick old cardboard archive file folder tied with red string on a dark wooden desk, a big red wax seal on its cover, a brass seal stamp beside it.",
 "A small paw presses the brass stamp into the red wax, then snaps the string and flips the file folder open toward the lens; old papers inside catch the lamp light; it holds.",
 "Close-up, high angle, 50mm macro feel, slow push-in.",LAMP,"quiet room","a firm wax press, a string snap, a paper whoosh as the file opens, then a short deep brass chime",
 "स्वागत है आर्काइव फ़ाइल्स में! आज खुलेगा, भोपाल की झीलों का पूरा असली सीन।","")

# ---------------- SETUP ----------------
c("C06","Setup","vo","A painted bird's-eye view of Bhopal at dawn: a huge deep indigo-blue lake between green hills, white domes and terracotta rooftops along the eastern shore, tiny wooden boats on the water.",
 "Mist slowly drifts off the lake surface as the first sunlight touches the rooftops; the scene settles.",
 "Extreme wide aerial shot, high angle, 24mm, slow push-in toward the city shore.",DAWN,"birdsong, water lapping softly","",
 "भोपाल को सब झीलों का शहर बोलते हैं।","")
c("C07","Setup","vo","A lakeside promenade at sunrise: tiny anthropomorphic chital-deer and mongoose walkers in shawls, a tea stall, a wooden rowing boat tied at the steps; beside the promenade a small house with a brass water tap at the wall.",
 "A sambar-deer boatman unties his boat and pushes it off into the water; the boat glides out and slows to a stop.",
 "Wide shot, eye level, 35mm, slow pan from left to right along the promenade.",DAWN,"water lapping, distant birds, a wooden oar knocking","a rope sliding off a post",
 "सुबह की वॉक, शाम की बोटिंग, और घर के नल तक आता पानी।","F21")
c("C08","Setup","vo","The vast Upper Lake of Bhopal at midday, deep indigo-blue water stretching far between low green hills, one small island near the middle.",
 "A small flock of birds flies low across the water from right to left and disappears behind the hills; ripples settle.",
 "Extreme wide shot, high angle, 24mm, locked, the camera does not move.",DAY,"wind over water, distant bird calls","",
 "बड़ा तालाब, यानी भोजताल, क़रीब इकतीस वर्ग किलोमीटर में फैला है। सोचो, कितना बड़ा!","F3")
c("C09","Setup","vo","On the lakeshore, a small anthropomorphic chital-deer family of three (father, mother and a fawn child) in modern Indian clothes sits on the steps looking out at the water.",
 "The child stretches an open paw across the lake; the father nods and puts an arm around the child; they keep looking at the water.",
 "Medium-wide shot from behind the family, eye level, 35mm, slow push-in.",DAY,"water lapping on steps, light breeze","",
 "ज़्यादातर लोगों को लगता है, ये झील तो हमेशा से यहीं थी।","")
c("C10","Setup","vo",ARCH+" On the desk lie three objects: a thick old bound gazetteer book, a weathered carved sandstone slab, and an open Persian-style manuscript with abstract squiggle script.",
 "One by one the three objects catch the lamp light as the flame flares slightly brighter; the light settles on the manuscript.",
 "Medium shot, high angle over the desk, 50mm, slow lateral move from left to right across the three objects.",LAMP,ROOMTONE,"a soft paper rustle",
 "पर पुराने गज़ेटियर, पत्थर, और फ़ारसी किताबें, कुछ और ही सीन बताते हैं।","F7, F16")
c("C11","Setup","cam",ARCH+" Three round red wax seals lie in a row on the desk.",
 "Sutradhar picks up the first wax seal, holds it up beside his face toward the lens, and raises one bushy eyebrow; he holds the pose.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"a small click as the seal is lifted",
 "तो आज खोलते हैं तीन राज़। पहला, ये झील बनी कैसे?","")
c("C12","Setup","vo","A river gorge at Bhojpur at dawn: sandstone ridges, a wide dry valley, broken giant stone blocks lying in a shallow river, an unfinished stone temple on a ridge, all half hidden in mist.",
 "The mist slowly thins and reveals the broken stone blocks in the river; the view holds.",
 "Wide shot, low angle from the riverbank, 24mm, slow push-in.",DAWN,"slow river flow, wind over stone","",
 "दूसरा, राजा भोज की वो झील, जो इससे भी बड़ी थी, और आज ग़ायब है।","F10, F11")
c("C13","Setup","vo",ARCH+" An open paper ledger lies on the desk; above it, Sutradhar's hand holds a large rubber stamp, not yet pressed.",
 "The hand lifts the stamp slightly higher and pauses in mid-air above the tablet; it stays hovering.",
 "Close-up on the hand and tablet, slight high angle, 85mm, locked.",LAMP,ROOMTONE,"a low rising whoosh that stops abruptly",
 "और तीसरा, उसे मिटाने वाली वो मशहूर कहानी, जो शायद पूरी सच नहीं।","F14, F16")

# ---------------- RAZ 1 ----------------
c("C14","राज़ 1: झील नहीं, बाँध","cam",ARCH,
 "Sutradhar breaks the first wax seal on his scroll with his thumb, unrolls it toward the lens, and holds it open.",
 "Medium shot, eye level, 35mm, slow push-in.",LAMP,ROOMTONE,"a crisp wax crack, parchment rustle",
 "राज़ नंबर एक। ये झील नहीं, बाँध है!","")
c("C15","राज़ 1: झील नहीं, बाँध","vo",MAP+" A small terracotta fort marks a kingdom in the west of the map.",
 "A small flag in saffron and ochre pops up from the fort and unfurls; it holds steady.",
 "Top-down shot, 35mm, slow descent toward the fort.",DAY,"soft room tone","a soft pop and cloth flutter",
 "ग्यारहवीं सदी। मालवा पर परमार वंश के राजा भोज का राज था।","F2")
c("C16","राज़ 1: झील नहीं, बाँध","vo","A valley between low green hills in the 11th century: a narrow glossy blue river winding through grass and rocks, no buildings, wild and empty.",
 "The small river flows steadily through the valley from the hills toward the camera; a heron lands on a rock and folds its wings.",
 "Wide shot, eye level, 35mm, slow pan from right to left following the river.",DAY,"river babbling, birds","a soft flap of wings",
 "भोपाल के पास, कोलांस नाम की एक छोटी सी नदी बहती थी।","F4")
c("C17","राज़ 1: झील नहीं, बाँध",'vo',MAP+" The small river runs down and joins a second, wider blue river.",
 "A tiny boat floats along the small river and glides into the wider river, then drifts on and stops at the map edge.",
 "Top-down shot, 50mm, slow lateral move following the boat.",DAY,"trickling water","",
 "उसका पानी आगे जाकर, हलाली नदी में मिल जाता था।","F4")
c("C18","राज़ 1: झील नहीं, बाँध","vo","The same valley: dozens of anthropomorphic nilgai and sambar-deer workers in 11th-century Indian dhotis and turbans carry baskets of brown earth on their heads and pile it into a long thick earthen embankment across the river.",
 "Workers in the front tip their baskets onto the embankment and walk back for more; the embankment grows a little higher and the river behind it begins to pool.",
 "Wide shot, high angle, 24mm, slow push-in toward the embankment.",DAY,"many feet on earth, baskets thudding, distant work calls","earth pouring from baskets",
 "फिर इस नदी के रास्ते में, मिट्टी का एक मोटा बाँध खड़ा कर दिया गया।","F1")
c("C19","राज़ 1: झील नहीं, बाँध","vo","Behind the finished earthen embankment, the valley between the hills.",
 "Deep indigo-blue water rises behind the embankment and spreads outward across the valley floor until it forms a wide lake reaching the hills; the surface calms.",
 "Extreme wide shot, high angle, 24mm, slow pull-out to reveal the whole new lake.",DAY,"rising water, wind","a deep low swell of water",
 "पानी रुका, फैलता गया, और पहाड़ियों के बीच एक ज़बरदस्त झील बन गई।","F1, F3")
c("C20","राज़ 1: झील नहीं, बाँध","vo",MAP+" A new blue lake now sits in the hills.",
 "A hand draws a short ink line from one edge of the lake toward the right with a quill; indigo water begins to flow along the new line.",
 "Top-down shot, 50mm, locked, the camera does not move.",DAY,"soft room tone","a quill scratch, then a trickle",
 "फिर एक नहर काटकर, पानी को दूसरी तरफ़ मोड़ दिया गया।","F4")
c("C21","राज़ 1: झील नहीं, बाँध","vo",MAP+" The lake with its new channel; the channel now leads into a third blue river on the right side of the map.",
 "Water flows steadily from the lake through the channel into the river on the right while the old course on the left lies dry and pale; the flow continues evenly.",
 "Top-down shot, 35mm, slow pull-out to show both the dry old course and the new flow.",DAY,"steady trickling water","a low rising whoosh ending in a soft drum hit as the full map comes into view",
 "आज कोलांस का ऊपरी पानी, हलाली नहीं, कलियासोत की तरफ़ बहता है।","F4")
c("C22","राज़ 1: झील नहीं, बाँध","vo","Close on the river where it now leaves the lake: glossy blue water flowing over smooth pebbles.",
 "The water flows past the camera; a single leaf floats by on the current and drifts out of frame.",
 "Close-up, low angle at water level, 50mm, locked.",DAY,"close water flow","",
 "मतलब, इंसान के एक फ़ैसले ने, एक नदी की दिशा ही बदल दी।","F4")
c("C23","राज़ 1: झील नहीं, बाँध","vo",ARCH+" An old palm-leaf manuscript bundle tied with string lies open on the desk, its leaves covered in abstract squiggle script.",
 "A hand turns one palm leaf over and smooths it flat; the hand withdraws.",
 "Close-up, high angle, 85mm, slow push-in.",LAMP,ROOMTONE,"a dry palm-leaf rustle",
 "और परंपरा कहती है, ये काम राजा भोज ने करवाया था।","F1")
c("C24","राज़ 1: झील नहीं, बाँध","vo","An 11th-century palace chamber: KING BHOJ, an anthropomorphic lion with a golden mane in white and saffron silk royal robes and a gold crown with a single ruby, lies on a carved wooden bed with a red bolster, a young chital-deer attendant fanning him with a peacock-feather fan.",
 "The king lifts his head weakly, then lets it sink back onto the bolster; the fan keeps moving slowly.",
 "Medium-wide shot, eye level, 35mm, locked, the camera does not move.","Soft daylight through a carved stone lattice window, patterned shadows on the floor.","fan swishing, quiet palace","",
 "कहते हैं, एक बार राजा भोज बहुत बीमार पड़ गए।","F5")
c("C25","राज़ 1: झील नहीं, बाँध","vo","The same palace chamber: an elderly sarus-crane sage in saffron robes with a wooden staff stands beside the king's bed and holds out a palm-leaf with many thin blue lines drawn on it like streams.",
 "The sadhu traces the blue lines with the tip of his wooden staff from the edge of the leaf toward its centre, then holds the leaf still.",
 "Medium shot, slight low angle, 50mm, slow push-in on the leaf.","Soft daylight through the lattice window.","quiet palace, distant temple bell","",
 "एक साधु ने कहा, ऐसी झील में नहाओ, जिसमें तीन सौ पैंसठ धाराएँ मिलती हों।","F5")
c("C26","राज़ 1: झील नहीं, बाँध","vo","A hillside: three anthropomorphic mongoose surveyors in turbans crouch beside a big heap of small white pebbles, moving pebbles one by one into a counting pile.",
 "The last surveyor drops one final pebble on the pile, sits back on his heels and scratches his head; they all look at the pile.",
 "Medium shot, high angle, 35mm, locked, the camera does not move.",DAY,"wind in grass","small pebbles clicking",
 "गिनती हुई, तो धाराएँ निकलीं, सिर्फ़ तीन सौ उनसठ।","F6")
c("C27","राज़ 1: झील नहीं, बाँध","vo","The hillside: a dignified anthropomorphic tiger Gond chieftain in a turban with a single peacock feather, a bow on his back and a striped cloth sash stands on a rock above the surveyors.",
 "The chieftain sweeps his open paw across the hills toward a distant valley; the surveyors turn to look where he gestures and stay looking.",
 "Wide shot, low angle from behind the surveyors, 35mm, slow push-in toward the chieftain.",DAY,"wind over hills, a hawk cry","",
 "तब कालिया नाम के एक गोंड सरदार ने, बाक़ी धाराओं का रास्ता दिखाया।","F6")
c("C28","राज़ 1: झील नहीं, बाँध","cam",ARCH+" The small lake model in the wooden tray sits on the desk, its little embankment back in place and the water full.",
 "Sutradhar pats the tiny embankment with his open paw, then looks up over his spectacles with a smug knowing smirk; he holds still.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"a soft wooden tap",
 "ये लोक-कथा है। पर बाँध और झील, दोनों एकदम असली हैं।","F5, F1")
c("C29","राज़ 1: झील नहीं, बाँध","vo",ARCH+" A thick old bound gazetteer book with a cracked leather spine lies on the desk.",
 "The heavy book cover swings open by itself and pages flutter forward, then settle open in the middle, showing pages of abstract squiggle text and a small map engraving.",
 "Close-up, high angle, 50mm, slow push-in.",LAMP,ROOMTONE,"a heavy book thud, pages fluttering",
 "और शहर का नाम? इम्पीरियल गज़ेटियर, उन्नीस सौ आठ के हिसाब से, भोज और पाल, यानी बाँध।","F7")
c("C30","राज़ 1: झील नहीं, बाँध","vo","A medieval town growing on the shore of the big lake: terracotta houses, a small fort wall, a stone gateway facing the water.",
 "Tiny houses pop up one after another along the shore until the town is complete; it settles.",
 "Wide shot, high angle, 24mm, locked, the camera does not move.",DAY,"wind, distant water","small pops as each house appears",
 "भोजपाल। जो धीरे-धीरे, भोपाल बन गया।","F7")
c("C31","राज़ 1: झील नहीं, बाँध","vo",ARCH+" A small gilded crown rests on a red velvet cushion on a shelf.",
 "The lamp light slowly sweeps across the crown and it glints once; the light settles.",
 "Close-up, eye level, 85mm, slow orbit of about 30 degrees around the crown.",LAMP,ROOMTONE,"",
 "वैसे कुछ लोग, इस नाम को भूपाल नाम के एक राजा से भी जोड़ते हैं।","F8")
c("C32","राज़ 1: झील नहीं, बाँध","vo","The earthen embankment at the edge of the big lake, grass on its slope, with the city of Bhopal spread behind the lake.",
 "Starting close on the grassy embankment, the view rises to reveal the whole lake and the whole city behind it; it holds on the full view.",
 "Starts as a close shot of the embankment, crane-style slow rise to an extreme wide high angle, 24mm.",DAY,"wind over water","",
 "अगर पहली बात सही है, तो इस शहर का नाम ही एक बाँध है। कमाल है ना?","F7")
c("C33","राज़ 1: झील नहीं, बाँध","vo",MAP+" Two pins: one at the big lake, one about a hand's width to the east beside another blue river.",
 "A small brass marker slides along the map from the lake pin to the eastern pin and stops beside it; the eastern pin glows softly.",
 "Top-down shot, 35mm, slow lateral move following the marker.",DAY,"soft room tone","a quick whoosh as the marker slides",
 "पर राजा भोज यहीं नहीं रुके। तीस किलोमीटर दूर, उन्होंने इससे भी बड़ा कुछ बनाया।","F9, F10")

# ---------------- RAZ 2 ----------------
c("C34","राज़ 2: वो झील जो ग़ायब है","cam",ARCH,
 "Sutradhar breaks the second wax seal on his scroll, unrolls it toward the lens, and looks over his spectacles.",
 "Medium shot, slight high angle, 35mm, slow push-in.",LAMP,ROOMTONE,"a crisp wax crack, parchment rustle",
 "राज़ नंबर दो। वो झील, जो ग़ायब हो गई।","")
c("C35","राज़ 2: वो झील जो ग़ायब है","vo","A river gorge between sandstone ridges at Bhojpur: a wide glossy blue river (the Betwa) flowing through a deep cut in the rock.",
 "The river flows steadily through the gorge; a flock of small birds lifts off the rocks and flies downstream.",
 "Wide shot, high angle, 24mm, slow push-in along the gorge.",DAY,"strong river flow, birds","wings flapping",
 "भोपाल से क़रीब तीस किलोमीटर दूर, बेतवा नदी के किनारे है, भोजपुर।","F9")
c("C36","राज़ 2: वो झील जो ग़ायब है","vo","A royal camp on a ridge at night: KING BHOJ, the golden-maned lion king in white and saffron silk robes and a gold crown, stands before a small fire with nine water pots in a row in front of him.",
 "The king pours water from a small brass vessel onto the ground before the pots as if taking a vow, then straightens and stands still.",
 "Medium-wide shot, low angle, 35mm, locked, the camera does not move.","Firelight from below, deep indigo night sky with painted stars.","crackling fire, night insects","water splashing on earth",
 "लोक-कथा है, राजा भोज ने नौ नदियों और निन्यानवे नालों को बाँधने की क़सम खाई।","F24")
c("C37","राज़ 2: वो झील जो ग़ायब है","vo","The Bhojpur gorge in the 11th century: nilgai and sambar-deer workers in dhotis haul a giant rectangular dressed sandstone block on wooden rollers with ropes toward a rising wall of huge fitted stones across the river.",
 "The workers pull together; the giant block rolls forward over the logs and stops in place against the wall.",
 "Wide shot, eye level, 35mm, slow pan from left to right along the wall.",DAY,"river rushing, ropes creaking, work calls","a deep stone grinding thud",
 "यहाँ ग्यारहवीं सदी में, दो बड़े बाँध बने। मिट्टी के नहीं, विशाल तराशे पत्थरों के।","F10")
c("C38","राज़ 2: वो झील जो ग़ायब है","vo","Behind two massive stone dams, the Bhojpur valley.",
 "Indigo-blue water rises behind the stone dams and spreads far across the valley until a huge lake reaches the horizon; the surface calms.",
 "Extreme wide aerial shot, high angle, 24mm, slow pull-out to reveal the whole lake.",DAY,"rising water, wind","a deep water swell",
 "इन बाँधों ने बेतवा को रोका, और बन गई एक बहुत बड़ी झील।","F10")
c("C39","राज़ 2: वो झील जो ग़ायब है","vo","The same Bhojpur valley today, same framing as the lake shot: no lake, only green and ochre farm fields, a small river in the gorge, trees.",
 "A nilgai farmer drives a pair of bullocks across a field and stops at the field edge; dust settles.",
 "Extreme wide aerial shot, high angle, 24mm, locked, the camera does not move.",DAY,"wind over fields, bullock bells","",
 "पर आज वहाँ जाओ, तो झील मिलेगी ही नहीं।","F11")
c("C40","राज़ 2: वो झील जो ग़ायब है","vo","A long massive dam of giant fitted sandstone blocks (cyclopean masonry) standing intact across a dry valley, grass and small bushes growing on top.",
 "A goat walks along the top of the old dam and stops to look over the edge.",
 "Wide shot, low angle, 24mm, slow pan from left to right along the dam.",DAY,"wind, goat bell","",
 "उत्तर वाला बाँध, आज भी खड़ा है।","F11")
c("C41","राज़ 2: वो झील जो ग़ायब है","vo","Giant broken dressed sandstone blocks lie tumbled and scattered in a shallow glossy blue river below a ridge.",
 "River water flows around the fallen blocks; a small palm-squirrel boy hops from one block to the next and stops on top of one.",
 "Medium-wide shot, high angle, 35mm, slow push-in.",DAY,"water flowing around stones","",
 "और दक्षिण वाले बाँध के टूटे पत्थर, बेतवा के पानी में बिखरे पड़े हैं।","F11")
c("C42","राज़ 2: वो झील जो ग़ायब है","vo","A sandstone Shiva temple on a high stone platform on a ridge: tall square sanctum with towering carved pillars, its roof incomplete and open to the sky.",
 "A slow beam of morning sunlight moves across the temple front and lights up the carved pillars; the light settles.",
 "Wide shot, low angle, 24mm, slow tilt up from the platform to the open top.",DAWN,"birds, a faint temple bell","",
 "उसी झील के किनारे, राजा भोज ने एक शिव मंदिर बनवाना शुरू किया। भोजेश्वर।","F12")
c("C43","राज़ 2: वो झील जो ग़ायब है","vo","Inside the temple: a huge polished dark stone Shiva lingam on a massive square base, with one tiny chital-deer pilgrim in white standing at its foot for scale, marigold garlands on the base.",
 "The tiny pilgrim places a small marigold garland on the base, folds his hands and bows; he stays still.",
 "Wide shot, very low angle, 24mm, slow tilt up along the lingam.","Soft daylight falling from the open roof above, gentle glow on the polished stone.","quiet temple echo, a soft bell","",
 "इसका शिवलिंग, क़रीब साढ़े पाँच मीटर ऊँचा है। एक ही पत्थर से बना।","F12")
c("C44","राज़ 2: वो झील जो ग़ायब है","vo","Looking straight up from inside the temple: the tall pillars rise toward an unfinished open roof, the sky visible through the gap.",
 "A small bird flies across the open roof gap from left to right; clouds drift slowly.",
 "Extreme low angle looking straight up, 24mm, slow rotation of about 20 degrees.",DAY,"wind through the open roof, bird call","",
 "पर ये मंदिर, कभी पूरा हुआ ही नहीं।","F12")
c("C45","राज़ 2: वो झील जो ग़ायब है","vo","A flat sandstone rock surface in an old quarry, engraved with fine line drawings of temple pillars, moulding profiles and a temple plan, like an architect's sketch carved into stone.",
 "A hand brushes dust off the engraved lines; the drawings become clear and the hand withdraws.",
 "Macro close-up, high angle, 100mm macro, slow lateral move across the engraved lines.","Low raking sunlight from camera-left that makes the engraved lines stand out.","wind, faint brushing","a soft brush sweep",
 "पास की चट्टानों पर, मंदिर के खंभों और नक़्शों की लाइनें, पत्थर पर उकेरी मिली हैं।","F13")
c("C46","राज़ 2: वो झील जो ग़ायब है","vo","Behind the temple, a long sloping earthen ramp rising to the top of the platform; 11th-century nilgai and sambar-deer workers push a huge stone block up the ramp on rollers.",
 "The workers heave together and the block moves a short distance up the ramp, then they wedge it and pause.",
 "Wide shot, side angle, 35mm, slow tilt up along the ramp.",DAY,"rollers creaking, workers' calls","a heavy stone scrape",
 "मंदिर के पीछे, मिट्टी का लंबा ढलान, जिस पर भारी पत्थर ऊपर चढ़ाए जाते थे।","F13")
c("C47","राज़ 2: वो झील जो ग़ायब है","vo","An empty quarry at dusk: a half-cut stone block still attached to the rock, iron chisels and a wooden mallet lying abandoned beside it, dust in the air.",
 "A gust of wind blows dust across the abandoned tools and settles; the quarry stays empty.",
 "Medium shot, eye level, 50mm, slow push-in on the abandoned tools.","Fading orange dusk light from camera-right, long shadows.","wind whistling through the quarry","",
 "ऐसा लगता है, जैसे काम बीच में ही अचानक रुक गया हो।","F12")
c("C48","राज़ 2: वो झील जो ग़ायब है","cam",ARCH+" A small model of a dry valley with two little stone dams sits on the desk.",
 "Sutradhar leans over the dry valley model, lifts his spectacles onto his forehead, then looks up at the lens and lowers them again.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"",
 "तो इतनी बड़ी झील, आख़िर गई कहाँ? इसका एक बड़ा मशहूर जवाब है।","")

# ---------------- RAZ 3 ----------------
c("C49","राज़ 3: सच या झूठ?","cam",ARCH+" An open paper ledger and a large rubber stamp lie on the desk.",
 "Sutradhar breaks the third wax seal on his scroll, sets the scroll aside, and lays one hand on the ledger; he looks at the lens.",
 "Medium shot, eye level, 35mm, slow push-in.",LAMP,ROOMTONE,"a crisp wax crack",
 "राज़ नंबर तीन। सच या झूठ?","")
c("C50","राज़ 3: सच या झूठ?","vo","A busy street market in old Bhopal at evening: tiny mongoose and deer shopkeepers, lanterns, an old langur storyteller sitting on a charpai telling a story to a small circle of squirrel and deer listeners.",
 "The storyteller spreads his arms wide; the listeners lean in and stay leaning.",
 "Medium-wide shot, eye level, 35mm, slow push-in on the circle.","Warm lantern light, dusky indigo sky.","market murmur, a distant tea-glass clink","",
 "भोपाल में ये कहानी, तुम्हें कई लोग सुनाएँगे।","F14")
c("C51","राज़ 3: सच या झूठ?","vo","The 15th century: the SULTAN, an anthropomorphic lion with a dark brown mane in an emerald-green robe with gold embroidery and a white turban with a gold jewel, sits on a horse on a ridge overlooking the huge Bhojpur lake and its stone dam; leopard soldiers with iron picks stand at the dam.",
 "The sultan raises one hand; the soldiers lift their picks and swing them down onto the stone dam; they freeze at the bottom of the swing.",
 "Wide shot, high angle from behind the sultan, 35mm, locked, the camera does not move.",DAY,"wind, horse snort","picks striking stone",
 "पंद्रहवीं सदी में, मालवा के सुल्तान होशंगशाह ने, भोजपुर का बाँध तुड़वा दिया।","F14")
c("C52","राज़ 3: सच या झूठ?","vo","Close on the stone dam face: a crack running through the giant blocks.",
 "The crack widens, two blocks shift apart, and a thin jet of indigo-blue water bursts through the gap and keeps pouring.",
 "Close-up, low angle, 50mm, locked, the camera does not move.",DAY,"wind over the dam","stone cracking, then rushing water",
 "बाँध तोड़ने में, तीन महीने लगे।","F14")
c("C53","राज़ 3: सच या झूठ?","vo","The huge Bhojpur lake seen from a ridge.",
 "In a time-lapse the water level drops steadily, exposing muddy banks and stranded boats, until only puddles remain; the scene settles.",
 "Extreme wide shot, high angle, 24mm, locked, the camera does not move.","Daylight shifting rapidly from morning to evening and back as days pass.","wind","a long draining gurgle",
 "झील को खाली होने में, तीन साल।","F14")
c("C54","राज़ 3: सच या झूठ?","vo","The drained lake bed, cracked dry ochre mud.",
 "Green shoots sprout across the cracked mud in time-lapse until a nilgai farmer with a wooden plough and bullocks crosses the new field and stops.",
 "Wide shot, eye level, 35mm, slow push-in.",DAY,"wind, bullock bells","",
 "और उस ज़मीन पर खेती होने में, पूरे तीस साल।","F14")
c("C55","राज़ 3: सच या झूठ?","cam",ARCH+" The open paper ledger lies on the desk; Sutradhar holds the large rubber stamp.",
 "Sutradhar raises the rubber stamp high above the ledger in one hand and looks at the lens over his spectacles; he holds the stamp in the air.",
 "Medium close shot, slight low angle, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"a low rising whoosh",
 "तो, ये कहानी सच है, या झूठ?","")
c("C56","राज़ 3: सच या झूठ?","cam",ARCH+" The open paper ledger on the desk under the raised rubber stamp.",
 "Sutradhar brings the stamp down firmly onto the ledger page and lifts it, leaving a large round amber-orange ink stamp mark with an abstract emblem; he taps the mark once and looks up at the lens.",
 "Medium close shot framing Sutradhar's face and the ledger together, slight high angle, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"a heavy stamp thump, then a soft drum hit",
 "जवाब है, विवादित।","F14, F15, F16")
c("C57","राज़ 3: सच या झूठ?","vo",ARCH+" An old 19th-century journal volume with a faded maroon cloth cover lies under the lamp.",
 "The journal opens slowly and its pages fan to a page of dense abstract squiggle text; the lamp flame flickers and steadies.",
 "Close-up, high angle, 50mm, slow push-in.",LAMP,ROOMTONE,"pages turning",
 "पर असली सीन अब शुरू होता है। एक शोध कहता है, ये अठारह सौ अठासी की ग़लतफ़हमी है।","F16")
c("C58","राज़ 3: सच या झूठ?","vo","A study in the 1880s: an anthropomorphic badger scholar in a brown tweed jacket and Victorian waistcoat sits at a desk reading a Persian-style manuscript with abstract squiggle script, a pen in hand.",
 "He runs his pen along a line of the manuscript, then writes a quick note in his notebook and nods to himself.",
 "Medium shot, eye level, 50mm, locked, the camera does not move.","Warm kerosene lamp light from camera-right.","clock ticking","a pen nib scratching",
 "एक अंग्रेज़ लेखक, विलियम किनकेड ने, एक फ़ारसी किताब को, भोजपुर की कहानी समझ लिया।","F16")
c("C59","राज़ 3: सच या झूठ?","vo","A study in the 1960s: an anthropomorphic grey-heron scholar with black-rimmed glasses in a white kurta sits at a desk piled with books, a Persian manuscript open beside a typewriter.",
 "He reads a line of the manuscript, turns to the typewriter and types a short line, then pauses with his fingers on the keys.",
 "Medium shot, slight high angle, 50mm, slow push-in.","Daylight from a window at camera-left.","ceiling fan whirring","typewriter keys clacking",
 "बाद में इतिहासकार यू. एन. डे ने, उस किताब का अनुवाद किया।","F16")
c("C60","राज़ 3: सच या झूठ?","vo","A 15th-century court: the lion SULTAN in his emerald-green and gold robe and white turban, seated on a low throne; a small group of camel merchants in turbans with bundles and a laden pack donkey stand before him.",
 "The lead merchant bows and gestures back toward the distant hills; the sultan listens and gives one slow nod.",
 "Wide shot, eye level, 35mm, locked, the camera does not move.","Warm daylight through arches from camera-left.","court murmur","",
 "उसके हिसाब से, सुल्तान ने बाँध, भोपाल और विदिशा के व्यापारियों के कहने पर तुड़वाया था।","F16")
c("C61","राज़ 3: सच या झूठ?","vo","Night on a lake: a small wooded island in the middle of dark indigo water; on the island, a few jackal bandits in dark turbans around a small campfire, a rowing boat pulled up on the shore.",
 "One bandit pushes the boat off toward the shore and climbs in; the boat glides away into the dark and the fire keeps flickering.",
 "Wide shot, high angle, 35mm, slow push-in toward the island.","Moonlight from above, small orange campfire glow.","water lapping, crickets","an oar dipping",
 "क्योंकि डाकू, झील से घिरी एक जगह पर छिपते थे, जहाँ तक पहुँचना मुश्किल था।","F16")
c("C62","राज़ 3: सच या झूठ?","vo",MAP+" Two pins: Bhojpur in the east and the big Bhopal lake in the west.",
 "A hand lifts a small jackal-bandit figurine from the Bhojpur pin, carries it across the map and sets it down on the island in the Bhopal lake.",
 "Top-down shot, 35mm, locked, the camera does not move.",DAY,"soft room tone","a small click as the figure is placed",
 "इस शोध के हिसाब से, वो झील भोजपुर की नहीं, भोपाल की ही थी।","F16")
c("C63","राज़ 3: सच या झूठ?","vo","Today's Bhojtal at golden hour: a small green island with trees and a small white structure in the middle of the vast indigo-blue lake.",
 "Small birds circle the island once and land in its trees; the water shimmers.",
 "Wide aerial shot, high angle, 35mm, slow orbit of about 30 degrees around the island.","Golden late-afternoon sunlight from camera-right.","birds, gentle water","",
 "और भोपाल की झील के बीच, आज भी एक टापू है। तकिया टापू।","F17")
c("C64","राज़ 3: सच या झूठ?","vo","The 11th-century Bhojpur gorge under a violent monsoon storm: dark indigo clouds, heavy rain, the river swollen and brown.",
 "Lightning flashes once and the river surges higher against the stone dam below the temple; the water keeps rising.",
 "Wide shot, low angle, 24mm, locked, the camera does not move.","Dark storm light with one bright lightning flash.","heavy rain, roaring river","a thunderclap",
 "और भोजपुर का बाँध? यही शोध, ग्यारहवीं सदी के एक ज़बरदस्त मानसून की बात करता है।","F15")
c("C65","राज़ 3: सच या झूठ?","vo","The stone dam below the temple during the flood.",
 "A huge brown wave of floodwater hits the dam; the top blocks tip over and tumble into the river one by one, and the water rushes through the gap.",
 "Medium-wide shot, eye level, 35mm, locked, the camera does not move.","Dark storm light, rain streaks.","roaring flood","stone blocks crashing",
 "जिसकी बाढ़ ने, मंदिर के नीचे वाला बाँध गिरा दिया।","F15")
c("C66","राज़ 3: सच या झूठ?","cam",ARCH+" The ledger with the amber stamp mark lies on the desk beside a stack of old books.",
 "Sutradhar places one hand flat on the stack of books, then lays his open paw beside the amber stamp mark and looks at the lens.",
 "Medium shot, eye level, 35mm, locked, the camera does not move.",LAMP,ROOMTONE,"a soft tap on the books",
 "होशंगशाह वाली कहानी, आज भी कई किताबों में मिलती है। इसलिए, फ़ैसला विवादित।","F14")
c("C67","राज़ 3: सच या झूठ?","vo",ARCH+" The ledger with the amber stamp mark on the desk.",
 "A hand turns the ledger page, revealing a small ink drawing of a lake with an island; the hand withdraws.",
 "Close-up, high angle, 85mm, locked.",LAMP,ROOMTONE,"a page turn, a low rising whoosh",
 "पर अगर नया शोध सही है, तो पूरी कहानी ही पलट जाती है।","")
c("C68","राज़ 3: सच या झूठ?","vo","The 15th century: the long earthen embankment of the Bhopal lake with a broken gap in the middle, water pouring out through the gap.",
 "Water rushes out through the gap in the embankment and spreads downstream; the flow continues.",
 "Wide shot, high angle, 35mm, slow push-in toward the gap.","Overcast grey daylight.","rushing water","",
 "जो झील तोड़ी गई थी, वो भोपाल की थी।","F16")
c("C69","राज़ 3: सच या झूठ?","vo","The 18th century: nilgai and sambar-deer workers in angarkha jackets and turbans rebuild and raise the earthen embankment of the Bhopal lake; a small palace with arched windows stands on the bank above.",
 "Workers tip baskets of earth onto the embankment and tamp it down with wooden rammers; the embankment stands complete and higher.",
 "Wide shot, eye level, 35mm, slow pan from left to right along the embankment.",DAY,"rammers thudding, work calls","earth pouring",
 "और अठारहवीं सदी में, उसी बाँध की मरम्मत हुई, और उसे ऊँचा किया गया।","F18")
c("C70","राज़ 3: सच या झूठ?","vo","Today's Bhojtal at sunset: the full indigo lake reflecting orange sky, the city lights beginning to glow along the shore.",
 "The sun sinks behind the hills and the city lights come on one by one along the shore; the lake goes calm.",
 "Extreme wide shot, eye level from the water, 24mm, slow pull-out.","Orange sunset from behind the hills, glowing reflections.","evening birds, gentle water","",
 "मतलब आज का भोजताल, शायद एक बार टूटी, और फिर से बनी झील है।","F16, F18")

# ---------------- AAJ BHI ----------------
c("C71","आज भी दिखता है","cam",ARCH+" A small model of the present-day lake with a tiny statue on a pillar sits on the desk.",
 "Sutradhar sweeps one open hand over the lake model toward the lens, palm up, inviting; he holds the gesture.",
 "Medium shot, eye level, 35mm, slow push-in.",LAMP,ROOMTONE,"",
 "और ये सब सिर्फ़ किताबों में नहीं है। आज भी दिखता है।","")
c("C72","आज भी दिखता है","vo","Today's Bhojtal: a tall slender pillar rising from the water near the shore, topped by a bronze statue of a lion king holding a sword, boats passing.",
 "A tourist boat passes in front of the pillar from left to right; the statue stands still against the sky.",
 "Wide shot, low angle from the water, 35mm, slow tilt up to the statue.","Bright midday light from high camera-left.","boat motor hum, water","",
 "झील के एक कोने में, ऊँचे खंभे पर, राजा भोज की मूर्ति। दो हज़ार ग्यारह से।","F23")
c("C73","आज भी दिखता है","vo","The lake shore with a long promenade, chital-deer and mongoose families walking, an ice-cream cart.",
 "A palm-squirrel child releases a small blue balloon that floats up over the lake; the child waves at it.",
 "Medium-wide shot, eye level, 35mm, locked, the camera does not move.",DAY,"promenade chatter, water","",
 "उसी साल, बड़े तालाब का नाम रखा गया, भोजताल।","F23")
c("C74","आज भी दिखता है","vo","A concrete dam with a row of eleven sluice gates; water spilling white through the open gates into a river channel below, green hills around.",
 "The gates hold steady as foamy water pours through them and churns in the channel below.",
 "Wide shot, low angle from the channel, 24mm, slow push-in.",DAY,"roaring water through gates","",
 "भदभदा पर ग्यारह गेट वाला बाँध, उन्नीस सौ पैंसठ में बना।","F20")
c("C75","आज भी दिखता है","vo","The water channel below the sluice gates leading away into a river valley.",
 "The released water rushes down the channel and away into the valley; spray hangs in the air.",
 "Wide shot, high angle, 35mm, slow pan following the flow downstream.",DAY,"rushing water","",
 "यही गेट तय करते हैं, कि झील का कितना पानी कलियासोत में जाए।","F20")
c("C76","आज भी दिखता है","vo","A second smaller lake inside the old city: domes and minarets and old houses around the water, a narrow embankment separating it from the big lake.",
 "A small rowing boat crosses the small lake and reaches the far bank.",
 "Wide shot, high angle, 35mm, slow push-in.","Soft late-afternoon light.","old city sounds, water","",
 "छोटा तालाब, सत्रह सौ चौरानवे में, नवाब के मंत्री छोटे ख़ान ने बनवाया।","F19")
c("C77","आज भी दिखता है","vo","wetland at the lake edge: reeds, lotus leaves, and many water birds (painted storks, egrets, ducks).",
 "A flock of birds lifts off the water together and circles over the reeds before landing again.",
 "Wide shot, eye level from the reeds, 35mm, slow pan from right to left.",DAWN,"many bird calls, wings","",
 "दोनों झीलें मिलकर, भोज वेटलैंड हैं। दो हज़ार दो से, रामसर सूची में दर्ज।","F22")
c("C78","आज भी दिखता है","vo","A old globe on the archive desk with tiny glowing blue dots scattered across continents, one dot in central India.",
 "The globe turns slowly until the central India dot faces the camera and glows brighter; the globe stops.",
 "Close-up, eye level, 85mm, locked, the camera does not move.",LAMP,ROOMTONE,"a soft chime as the dot glows",
 "रामसर, मतलब दुनिया के अहम वेटलैंड्स की लिस्ट।","F22")
c("C79","आज भी दिखता है","vo","Today's Bhojpur: the long old stone dam standing, broken blocks in the river, the stone temple on the ridge, a small group of deer and squirrel visitors with a mongoose guide.",
 "The guide sweeps his open paw from the river stones up to the temple; the visitors follow his gesture and look up.",
 "Wide shot, high angle, 24mm, slow pan from the river up to the temple.",DAY,"river, visitors murmuring","",
 "भोजपुर में खड़ा बाँध, बिखरे पत्थर, और उकेरे नक़्शे, आज भी देखे जा सकते हैं।","F11, F13")
c("C80","आज भी दिखता है","vo","A modern kitchen in a Bhopal home: a steel tap over a sink, a small palm-squirrel girl holding a steel tumbler.",
 "The girl turns the tap, fills the tumbler with clear water, turns it off and takes a sip.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.","Soft window daylight from camera-left.","kitchen room tone","water filling a steel glass",
 "भोपाल के पीने के पानी का एक बड़ा ज़रिया, आज भी यही झील है।","F21")

# ---------------- CLOSER ----------------
c("C81","Closer","cam",ARCH+" The lake model with its tiny embankment sits on the desk.",
 "Sutradhar rests his open paw on the tiny embankment and looks at the lens; he keeps his paw there.",
 "Medium close shot, eye level, 50mm, slow push-in.",LAMP,ROOMTONE,"",
 "तो, भोपाल की झील किसने बनाई? क़ुदरत ने नहीं। एक बाँध ने।","F1")
c("C82","Closer","cam",ARCH,
 "Sutradhar takes off his spectacles, polishes them on his shawl, and puts them back on, looking at the lens.",
 "Close-up, eye level, 85mm, locked, the camera does not move.",LAMP,ROOMTONE,"",
 "जिसे परंपरा राजा भोज से जोड़ती है। और वो बाँध, आज भी पानी दे रहा है।","F1, F21")
c("C83","Closer","vo","The Bhopal lake at dusk from the embankment, the city lights reflecting on still water.",
 "A single lantern boat drifts slowly across the still water and leaves a thin ripple line; it keeps drifting.",
 "Wide shot, eye level, 35mm, locked, the camera does not move.","Deep blue dusk, warm city lights.","evening crickets, faint water","",
 "शहर अपने आप नहीं बसते। कोई, कभी, पानी को रुकने की वजह देता है।","")
c("C84","Closer","vo","A 19th-century palace by the lake: an arched window lit warmly from inside; four ornate jewelled crowns of different designs rest side by side on a velvet cushion on the window ledge.",
 "The lamp inside the window brightens and the four crowns glint one after another from left to right; the light holds.",
 "Medium shot, slight low angle, 50mm, slow push-in on the crowns.","Warm interior lamp light through the arch, blue dusk outside.","evening birds","a soft shimmer as each crown glints",
 "इसी झील के किनारे, एक सौ सात साल, एक रियासत पर सिर्फ़ औरतों ने राज किया।","F25")
c("C85","Closer","cam",ARCH,
 "Sutradhar raises his open paw beside his muzzle as if sharing a secret, then leans slightly toward the lens; he holds the pose.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"",
 "कैसे? वो अगली फ़ाइल में। तुम्हारे शहर में कौन सा राज़ छिपा है? कमेंट में बताओ।","")
c("C86","Closer","cam",ARCH,
 "Sutradhar rolls up his scroll, ties the red thread, tucks it under his arm, and gives a small bow toward the lens; he stays in the bow.",
 "Medium shot, eye level, 35mm, slow pull-out.",LAMP,ROOMTONE,"parchment rolling",
 "अगली फ़ाइल किसकी खुलेगी, देखना है? तो सब्सक्राइब करना मत भूलना!","")
c("C87","End screen","sil",ARCH+" On the desk stand two empty wooden picture frames side by side, with plain sandstone-coloured backs inside them, and the brass lamp between them.",
 "The lamp flame flickers gently; everything else stays still.",
 "Wide shot, eye level, 35mm, locked, the camera does not move.",LAMP,"quiet room tone, faint flame flicker","")
END="अगली फ़ाइल किसकी खुलेगी, देखना है? तो फ़ॉलो करना मत भूलना!"
SHORTS=[
 dict(id="SH1",title="3 महीने, 3 साल, 30 साल",hook="एक झील को मिटाने में, तीस साल लगे? ये कहानी, सच है या नहीं?",hook_action="Sutradhar taps his rolled scroll three times against his open paw, then holds the scroll still and raises one eyebrow at the lens.",clips=["C51","C52","C53","C54","C56"],end=END),
 dict(id="SH2",title="भोपाल की नदी, जिसकी दिशा बदल दी गई",hook="भोपाल में एक नदी, हज़ार साल से, दूसरी दिशा में बह रही है।",hook_action="Sutradhar draws a slow curving line in the air with his rolled scroll and ends with the scroll pointing to his right; he holds the pose.",clips=["C16","C17","C18","C19","C20","C21"],end=END),
 dict(id="SH3",title="365 धाराओं वाली झील",hook="एक राजा की बीमारी, और तीन सौ पैंसठ धाराओं वाली झील। ये लोक-कथा सुनिए।",hook_action="Sutradhar opens his hand and lets a small stream of white pebbles pour from his palm onto the desk; he looks at the lens.",clips=["C24","C25","C26","C27","C28"],end=END),
 dict(id="SH4",title="झील का टापू, जहाँ डाकू छिपते थे?",hook="एक शोध के मुताबिक़, भोपाल की झील के टापू पर, कभी डाकू छिपते थे।",hook_action="Sutradhar lifts a tiny boat from the desk and sets it down beside a small island; he looks up at the lens.",clips=["C60","C61","C62","C63"],end=END),
]
