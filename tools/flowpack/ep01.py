# EP1 clip list. Each clip: id, section, kind ('cam' Sutradhar on camera | 'vo' voice-over | 'sil' silent),
# scene, action, camera, light, amb, sfx, hindi line, facts
S="SUTRADHAR"
ARCH="Inside the clay archive room: wooden shelves of rolled scrolls, a brass oil lamp on a worn wooden desk, a clay relief map of India on the back wall."
LAMP="Warm brass oil-lamp light from camera-left, soft amber fill, gentle indigo shadows on the shelves."
DAWN="Low golden sunrise light from the east (camera-right), long soft shadows, thin morning mist on the water."
DAY="Bright soft daylight from high camera-left, clear sky, gentle shadows."
MAP="A hand-sculpted clay relief map of central India on a wooden table: green clay hills, ochre plains, rivers as glossy blue clay ribbons."
ROOMTONE="faint lamp flame flicker, quiet room tone"
C=[]
def c(id,sec,kind,scene,action,camera,light,amb,sfx,line=None,facts=""):
    C.append(dict(id=id,sec=sec,kind=kind,scene=scene,action=action,camera=camera,light=light,amb=amb,sfx=sfx,line=line,facts=facts))

# ---------------- HOOK ----------------
c("C01","Hook","cam",ARCH+" On the desk sits a shallow wooden tray holding a miniature clay valley: green hills and deep indigo-blue clay water held back by a tiny brown clay embankment wall.",
 "Sutradhar stands behind the tray, pinches the tiny embankment wall between finger and thumb and lifts it out; the blue water slides out of the valley across the tray; he holds the little wall up toward the lens and stops.",
 "Medium close shot, eye level, 50mm, slow push-in toward Sutradhar and the tray.",LAMP,ROOMTONE,"a soft wet clay squelch as the wall lifts, water trickling across wood",
 "भोपाल की सबसे बड़ी झील, क़ुदरत ने नहीं बनाई।","F1")
c("C02","Hook","cam",ARCH+" The tray with the drained clay valley sits in front of him.",
 "Sutradhar lowers the little clay wall, peers over the top of his spectacles at the viewer, then sets the wall gently back into the valley and rests both hands on the tray.",
 "Close-up on Sutradhar's face and hands, eye level, 85mm, locked, the camera does not move.",LAMP,ROOMTONE,"a soft clay tap as the wall is set down",
 "उसे इंसानों ने बनाया था, क़रीब एक हज़ार साल पहले।","F1")
c("C03","Hook","vo",MAP+" A single blue clay river winds between the hills toward the left edge of the table.",
 "The blue clay river slowly bends in its middle like soft clay being pushed by an unseen thumb, and its flow turns to run toward the right edge instead; the new course settles and holds.",
 "Top-down shot, 35mm, slow descent toward the bending river.",DAY,"gentle trickling water","a soft rubbery clay stretch sound as the river bends",
 "और इसके लिए, एक नदी को अपना रास्ता बदलना पड़ा।","F4")
c("C04","Hook","cam",ARCH,
 "Sutradhar unties the red thread on his scroll and unrolls it toward the lens until it is fully open, then holds it still with both hands.",
 "Medium shot, slight low angle, 35mm, locked, the camera does not move.",LAMP,ROOMTONE,"dry parchment rustle",
 "किसने किया ये? और जो झील इससे भी बड़ी थी, वो कहाँ गई?","F10, F11")
c("C05","Logo","sil","A sheet of cream parchment on a dark wooden desk, a brass seal stamp and a disc of terracotta-red sealing wax beside it.",
 "A small clay hand presses the brass stamp into the soft red wax, lifts it away, and leaves a round wax seal with a raised abstract emblem; the seal glints and holds.",
 "Macro close-up, top-down, 100mm macro, locked.",LAMP,"quiet room","a firm wax press, then a single short warm brass chime")

# ---------------- SETUP ----------------
c("C06","Setup","vo","A clay miniature of Bhopal at dawn seen from above: a huge deep indigo-blue clay lake between green clay hills, white clay domes and terracotta rooftops along the eastern shore, tiny wooden boats on the water.",
 "Mist slowly drifts off the lake surface as the first sunlight touches the rooftops; the scene settles.",
 "Extreme wide aerial shot, high angle, 24mm, slow push-in toward the city shore.",DAWN,"birdsong, water lapping softly","",
 "भोपाल को झीलों का शहर कहते हैं।","")
c("C07","Setup","vo","A clay lakeside promenade at sunrise: tiny clay walkers in shawls, a clay tea stall, a wooden rowing boat tied at the steps; beside the promenade a small clay house with a brass water tap at the wall.",
 "A clay boatman unties his boat and pushes it off into the water; the boat glides out and slows to a stop.",
 "Wide shot, eye level, 35mm, slow pan from left to right along the promenade.",DAWN,"water lapping, distant birds, a wooden oar knocking","a rope sliding off a post",
 "सुबह की सैर, शाम की नाव, और घरों के नलों तक पहुँचता पानी।","F21")
c("C08","Setup","vo","The vast clay Upper Lake of Bhopal at midday, deep indigo-blue water stretching far between low green hills, one small island near the middle.",
 "A small flock of clay birds flies low across the water from right to left and disappears behind the hills; ripples settle.",
 "Extreme wide shot, high angle, 24mm, locked, the camera does not move.",DAY,"wind over water, distant bird calls","",
 "बड़ा तालाब, यानी भोजताल, क़रीब इकतीस वर्ग किलोमीटर में फैला है।","F3")
c("C09","Setup","vo","On the clay lakeshore, a small clay family of three in modern Indian clothes sits on the steps looking out at the water.",
 "The child points across the lake; the father nods and puts an arm around the child; they keep looking at the water.",
 "Medium-wide shot from behind the family, eye level, 35mm, slow push-in.",DAY,"water lapping on steps, light breeze","",
 "ज़्यादातर लोग मानते हैं, कि ये झील हमेशा से यहीं थी।","")
c("C10","Setup","vo",ARCH+" On the desk lie three objects: a thick old bound gazetteer book, a weathered carved sandstone slab, and an open Persian-style manuscript with abstract squiggle script.",
 "One by one the three objects catch the lamp light as the flame flares slightly brighter; the light settles on the manuscript.",
 "Medium shot, high angle over the desk, 50mm, slow lateral move from left to right across the three objects.",LAMP,ROOMTONE,"a soft paper rustle",
 "पर पुराने गज़ेटियर, पत्थर, और फ़ारसी इतिहास-ग्रंथ, कुछ और कहानी सुनाते हैं।","F7, F16")
c("C11","Setup","cam",ARCH+" Three round clay wax seals lie in a row on the desk.",
 "Sutradhar picks up the first wax seal, holds it up beside his face toward the lens, and raises one bushy eyebrow; he holds the pose.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"a small clay click as the seal is lifted",
 "आज हम खोलेंगे तीन राज़। पहला, ये झील बनी कैसे।","")
c("C12","Setup","vo","A clay river gorge at Bhojpur at dawn: sandstone ridges, a wide dry valley, broken giant stone blocks lying in a shallow river, an unfinished stone temple on a ridge, all half hidden in mist.",
 "The mist slowly thins and reveals the broken stone blocks in the river; the view holds.",
 "Wide shot, low angle from the riverbank, 24mm, slow push-in.",DAWN,"slow river flow, wind over stone","",
 "दूसरा, राजा भोज की वो झील, जो इससे भी बड़ी थी, और आज ग़ायब है।","F10, F11")
c("C13","Setup","vo",ARCH+" A smooth clay tablet lies on the desk; above it, Sutradhar's clay hand holds a large clay stamp, not yet pressed.",
 "The hand lifts the stamp slightly higher and pauses in mid-air above the tablet; it stays hovering.",
 "Close-up on the hand and tablet, slight high angle, 85mm, locked.",LAMP,ROOMTONE,"a low rising whoosh that stops abruptly",
 "और तीसरा, उसे मिटाने की वो मशहूर कहानी, जो शायद पूरी सच नहीं।","F14, F16")

# ---------------- RAZ 1 ----------------
c("C14","राज़ 1: झील नहीं, बाँध","cam",ARCH,
 "Sutradhar breaks the first wax seal on his scroll with his thumb, unrolls it toward the lens, and holds it open.",
 "Medium shot, eye level, 35mm, slow push-in.",LAMP,ROOMTONE,"a crisp wax crack, parchment rustle",
 "राज़ नंबर एक। झील नहीं, बाँध।","")
c("C15","राज़ 1: झील नहीं, बाँध","vo",MAP+" A small terracotta clay fort marks a kingdom in the west of the map.",
 "A small clay flag in saffron and ochre pops up from the clay fort and unfurls; it holds steady.",
 "Top-down shot, 35mm, slow descent toward the fort.",DAY,"soft room tone","a soft pop and cloth flutter",
 "ग्यारहवीं सदी। मालवा पर परमार वंश के राजा भोज का राज था।","F2")
c("C16","राज़ 1: झील नहीं, बाँध","vo","A clay valley between low green hills in the 11th century: a narrow glossy blue clay river winding through grass and rocks, no buildings, wild and empty.",
 "The small river flows steadily through the valley from the hills toward the camera; a clay heron lands on a rock and folds its wings.",
 "Wide shot, eye level, 35mm, slow pan from right to left following the river.",DAY,"river babbling, birds","a soft flap of wings",
 "भोपाल के पास, कोलांस नाम की एक छोटी नदी बहती थी।","F4")
c("C17","राज़ 1: झील नहीं, बाँध",'vo',MAP+" The small river runs down and joins a second, wider blue clay river.",
 "A tiny clay boat floats along the small river and glides into the wider river, then drifts on and stops at the map edge.",
 "Top-down shot, 50mm, slow lateral move following the boat.",DAY,"trickling water","",
 "उसका पानी, आगे जाकर हलाली नदी में मिल जाता था।","F4")
c("C18","राज़ 1: झील नहीं, बाँध","vo","The same clay valley: dozens of small clay workers in 11th-century Indian dhotis and turbans carry baskets of brown earth on their heads and pile it into a long thick earthen embankment across the river.",
 "Workers in the front tip their baskets onto the embankment and walk back for more; the embankment grows a little higher and the river behind it begins to pool.",
 "Wide shot, high angle, 24mm, slow push-in toward the embankment.",DAY,"many feet on earth, baskets thudding, distant work calls","earth pouring from baskets",
 "फिर इस नदी के रास्ते में, मिट्टी का एक मोटा बाँध खड़ा किया गया।","F1")
c("C19","राज़ 1: झील नहीं, बाँध","vo","Behind the finished earthen embankment, the clay valley between the hills.",
 "Deep indigo-blue clay water rises behind the embankment and spreads outward across the valley floor until it forms a wide lake reaching the hills; the surface calms.",
 "Extreme wide shot, high angle, 24mm, slow pull-out to reveal the whole new lake.",DAY,"rising water, wind","a deep low swell of water",
 "पानी रुका, फैलता गया, और पहाड़ियों के बीच एक विशाल झील बन गई।","F1, F3")
c("C20","राज़ 1: झील नहीं, बाँध","vo",MAP+" A new blue clay lake now sits in the hills.",
 "A clay hand drags a small wooden tool through the clay at one edge of the lake, cutting a narrow channel toward the right; blue water begins to run into the new channel.",
 "Top-down shot, 50mm, locked, the camera does not move.",DAY,"soft room tone","a clay scrape, then a trickle",
 "फिर एक नहर काटकर, बहाव को दूसरी तरफ़ मोड़ा गया।","F4")
c("C21","राज़ 1: झील नहीं, बाँध","vo",MAP+" The lake with its new channel; the channel now leads into a third blue clay river on the right side of the map.",
 "Water flows steadily from the lake through the channel into the river on the right while the old course on the left lies dry and pale; the flow continues evenly.",
 "Top-down shot, 35mm, slow pull-out to show both the dry old course and the new flow.",DAY,"steady trickling water","a low rising whoosh ending in a soft drum hit as the full map comes into view",
 "आज कोलांस का ऊपरी पानी, हलाली नहीं, कलियासोत की तरफ़ बहता है।","F4")
c("C22","राज़ 1: झील नहीं, बाँध","vo","Close on the clay river where it now leaves the lake: glossy blue clay water flowing over smooth pebbles.",
 "The water flows past the camera; a single clay leaf floats by on the current and drifts out of frame.",
 "Close-up, low angle at water level, 50mm, locked.",DAY,"close water flow","",
 "यानी इंसान के एक फ़ैसले ने, एक नदी की दिशा बदल दी।","F4")
c("C23","राज़ 1: झील नहीं, बाँध","vo",ARCH+" An old palm-leaf manuscript bundle tied with string lies open on the desk, its leaves covered in abstract squiggle script.",
 "A clay hand turns one palm leaf over and smooths it flat; the hand withdraws.",
 "Close-up, high angle, 85mm, slow push-in.",LAMP,ROOMTONE,"a dry palm-leaf rustle",
 "परंपरा, इस काम का श्रेय राजा भोज को देती है।","F1")
c("C24","राज़ 1: झील नहीं, बाँध","vo","An 11th-century clay palace chamber: a generic clay king in white and ochre royal robes lies on a carved wooden bed with a red bolster, a clay attendant fanning him with a peacock-feather fan.",
 "The king lifts his head weakly, then lets it sink back onto the bolster; the fan keeps moving slowly.",
 "Medium-wide shot, eye level, 35mm, locked, the camera does not move.","Soft daylight through a carved stone lattice window, patterned shadows on the floor.","fan swishing, quiet palace","",
 "कहते हैं, राजा भोज एक बार बहुत बीमार पड़े।","F5")
c("C25","राज़ 1: झील नहीं, बाँध","vo","The same clay palace chamber: a generic elderly clay sadhu in saffron with a wooden staff stands beside the king's bed and holds out a palm-leaf with many thin blue lines drawn on it like streams.",
 "The sadhu traces the blue lines with one finger from the edge of the leaf toward its centre, then holds the leaf still.",
 "Medium shot, slight low angle, 50mm, slow push-in on the leaf.","Soft daylight through the lattice window.","quiet palace, distant temple bell","",
 "एक साधु ने कहा, ऐसी झील में नहाइए, जिसमें तीन सौ पैंसठ धाराएँ मिलें।","F5")
c("C26","राज़ 1: झील नहीं, बाँध","vo","A clay hillside: three generic clay surveyors in turbans crouch beside a big heap of small white pebbles, moving pebbles one by one into a counting pile.",
 "The last surveyor drops one final pebble on the pile, sits back on his heels and scratches his head; they all look at the pile.",
 "Medium shot, high angle, 35mm, locked, the camera does not move.",DAY,"wind in grass","small pebbles clicking",
 "गिनती हुई, तो धाराएँ निकलीं, सिर्फ़ तीन सौ उनसठ।","F6")
c("C27","राज़ 1: झील नहीं, बाँध","vo","The clay hillside: a generic clay Gond chieftain with a feathered headdress, bow on his back and a striped cloth sash stands on a rock above the surveyors.",
 "The chieftain raises his arm and points across the hills toward a distant valley; the surveyors turn to look where he points and stay looking.",
 "Wide shot, low angle from behind the surveyors, 35mm, slow push-in toward the chieftain.",DAY,"wind over hills, a hawk cry","",
 "तब कालिया नाम के एक गोंड सरदार ने, बाक़ी धाराओं का रास्ता दिखाया।","F6")
c("C28","राज़ 1: झील नहीं, बाँध","cam",ARCH+" The small clay lake model in the wooden tray sits on the desk, its little embankment back in place and the water full.",
 "Sutradhar taps the tiny embankment with one finger, then looks up at the lens and gives a small knowing nod; he holds still.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"a soft clay tap",
 "ये एक लोक-कथा है। पर बाँध, और झील, दोनों असली हैं।","F5, F1")
c("C29","राज़ 1: झील नहीं, बाँध","vo",ARCH+" A thick old bound gazetteer book with a cracked leather spine lies on the desk.",
 "The heavy book cover swings open by itself and pages flutter forward, then settle open in the middle, showing pages of abstract squiggle text and a small map engraving.",
 "Close-up, high angle, 50mm, slow push-in.",LAMP,ROOMTONE,"a heavy book thud, pages fluttering",
 "और शहर का नाम? इम्पीरियल गज़ेटियर, उन्नीस सौ आठ के मुताबिक़, भोज और पाल, यानी बाँध।","F7")
c("C30","राज़ 1: झील नहीं, बाँध","vo","A clay medieval town growing on the shore of the big clay lake: terracotta houses, a small fort wall, a stone gateway facing the water.",
 "Tiny clay houses rise up out of the ground one after another in stop-motion along the shore until the town is complete; it settles.",
 "Wide shot, high angle, 24mm, locked, the camera does not move.",DAY,"wind, distant water","small clay pops as each house appears",
 "भोजपाल। जो धीरे-धीरे, भोपाल बन गया।","F7")
c("C31","राज़ 1: झील नहीं, बाँध","vo",ARCH+" A small gilded clay crown rests on a red velvet cushion on a shelf.",
 "The lamp light slowly sweeps across the crown and it glints once; the light settles.",
 "Close-up, eye level, 85mm, slow orbit of about 30 degrees around the crown.",LAMP,ROOMTONE,"",
 "हालाँकि कुछ लोग, इस नाम को भूपाल नाम के एक राजा से जोड़ते हैं।","F8")
c("C32","राज़ 1: झील नहीं, बाँध","vo","The clay earthen embankment at the edge of the big clay lake, grass on its slope, with the clay city of Bhopal spread behind the lake.",
 "Starting close on the grassy embankment, the view rises to reveal the whole lake and the whole city behind it; it holds on the full view.",
 "Starts as a close shot of the embankment, crane-style slow rise to an extreme wide high angle, 24mm.",DAY,"wind over water","",
 "अगर पहली बात सही है, तो इस शहर का नाम ही एक बाँध है।","F7")
c("C33","राज़ 1: झील नहीं, बाँध","vo",MAP+" Two clay pins: one at the big lake, one about a hand's width to the east beside another blue river.",
 "A small brass marker slides along the map from the lake pin to the eastern pin and stops beside it; the eastern pin glows softly.",
 "Top-down shot, 35mm, slow lateral move following the marker.",DAY,"soft room tone","a quick whoosh as the marker slides",
 "पर राजा भोज यहीं नहीं रुके। तीस किलोमीटर दूर, उन्होंने इससे भी बड़ा कुछ बनाया।","F9, F10")

# ---------------- RAZ 2 ----------------
c("C34","राज़ 2: वो झील जो ग़ायब है","cam",ARCH,
 "Sutradhar breaks the second wax seal on his scroll, unrolls it toward the lens, and looks over his spectacles.",
 "Medium shot, slight high angle, 35mm, slow push-in.",LAMP,ROOMTONE,"a crisp wax crack, parchment rustle",
 "राज़ नंबर दो। वो झील, जो ग़ायब हो गई।","")
c("C35","राज़ 2: वो झील जो ग़ायब है","vo","A clay river gorge between sandstone ridges at Bhojpur: a wide glossy blue clay river (the Betwa) flowing through a deep cut in the rock.",
 "The river flows steadily through the gorge; a flock of small clay birds lifts off the rocks and flies downstream.",
 "Wide shot, high angle, 24mm, slow push-in along the gorge.",DAY,"strong river flow, birds","wings flapping",
 "भोपाल से क़रीब तीस किलोमीटर दूर, बेतवा नदी के किनारे है, भोजपुर।","F9")
c("C36","राज़ 2: वो झील जो ग़ायब है","vo","A clay royal camp on a ridge at night: a generic clay king in white and ochre robes stands before a small fire with nine clay water pots in a row in front of him.",
 "The king pours water from a small brass vessel onto the ground before the pots as if taking a vow, then straightens and stands still.",
 "Medium-wide shot, low angle, 35mm, locked, the camera does not move.","Firelight from below, deep indigo night sky with clay stars.","crackling fire, night insects","water splashing on earth",
 "लोक-कथा है, राजा भोज ने नौ नदियों और निन्यानवे नालों को बाँधने की क़सम खाई।","F24")
c("C37","राज़ 2: वो झील जो ग़ायब है","vo","The Bhojpur gorge in the 11th century: clay workers in dhotis haul a giant rectangular dressed sandstone block on wooden rollers with ropes toward a rising wall of huge fitted stones across the river.",
 "The workers pull together; the giant block rolls forward over the logs and stops in place against the wall.",
 "Wide shot, eye level, 35mm, slow pan from left to right along the wall.",DAY,"river rushing, ropes creaking, work calls","a deep stone grinding thud",
 "यहाँ ग्यारहवीं सदी में, दो बड़े बाँध बने। मिट्टी के नहीं, विशाल तराशे पत्थरों के।","F10")
c("C38","राज़ 2: वो झील जो ग़ायब है","vo","Behind two massive clay stone dams, the Bhojpur valley.",
 "Indigo-blue clay water rises behind the stone dams and spreads far across the valley until a huge lake reaches the horizon; the surface calms.",
 "Extreme wide aerial shot, high angle, 24mm, slow pull-out to reveal the whole lake.",DAY,"rising water, wind","a deep water swell",
 "इन बाँधों ने बेतवा को रोका, और बन गई एक बहुत बड़ी झील।","F10")
c("C39","राज़ 2: वो झील जो ग़ायब है","vo","The same Bhojpur valley today, same framing as the lake shot: no lake, only green and ochre clay farm fields, a small river in the gorge, clay trees.",
 "A clay farmer drives a pair of clay bullocks across a field and stops at the field edge; dust settles.",
 "Extreme wide aerial shot, high angle, 24mm, locked, the camera does not move.",DAY,"wind over fields, bullock bells","",
 "आज वहाँ जाइए, तो झील नहीं मिलेगी।","F11")
c("C40","राज़ 2: वो झील जो ग़ायब है","vo","A long massive clay dam of giant fitted sandstone blocks (cyclopean masonry) standing intact across a dry valley, grass and small bushes growing on top.",
 "A clay goat walks along the top of the old dam and stops to look over the edge.",
 "Wide shot, low angle, 24mm, slow pan from left to right along the dam.",DAY,"wind, goat bell","",
 "उत्तर वाला बाँध, आज भी खड़ा है।","F11")
c("C41","राज़ 2: वो झील जो ग़ायब है","vo","Giant broken dressed sandstone blocks lie tumbled and scattered in a shallow glossy blue clay river below a ridge.",
 "River water flows around the fallen blocks; a small clay boy hops from one block to the next and stops on top of one.",
 "Medium-wide shot, high angle, 35mm, slow push-in.",DAY,"water flowing around stones","",
 "और दक्षिण वाले बाँध के टूटे पत्थर, बेतवा के पानी में बिखरे पड़े हैं।","F11")
c("C42","राज़ 2: वो झील जो ग़ायब है","vo","A clay sandstone Shiva temple on a high stone platform on a ridge: tall square sanctum with towering carved pillars, its roof incomplete and open to the sky.",
 "A slow beam of morning sunlight moves across the temple front and lights up the carved pillars; the light settles.",
 "Wide shot, low angle, 24mm, slow tilt up from the platform to the open top.",DAWN,"birds, a faint temple bell","",
 "उसी झील के किनारे, राजा भोज ने एक शिव मंदिर बनवाना शुरू किया। भोजेश्वर।","F12")
c("C43","राज़ 2: वो झील जो ग़ायब है","vo","Inside the clay temple: a huge polished dark stone Shiva lingam on a massive square base, with one tiny clay pilgrim in white standing at its foot for scale, marigold garlands on the base.",
 "The tiny pilgrim places a small marigold garland on the base, folds his hands and bows; he stays still.",
 "Wide shot, very low angle, 24mm, slow tilt up along the lingam.","Soft daylight falling from the open roof above, gentle glow on the polished stone.","quiet temple echo, a soft bell","",
 "इसका शिवलिंग, क़रीब साढ़े पाँच मीटर ऊँचा है। एक ही पत्थर से बना।","F12")
c("C44","राज़ 2: वो झील जो ग़ायब है","vo","Looking straight up from inside the clay temple: the tall pillars rise toward an unfinished open roof, the clay sky visible through the gap.",
 "A small clay bird flies across the open roof gap from left to right; clouds drift slowly.",
 "Extreme low angle looking straight up, 24mm, slow rotation of about 20 degrees.",DAY,"wind through the open roof, bird call","",
 "पर ये मंदिर, कभी पूरा नहीं हुआ।","F12")
c("C45","राज़ 2: वो झील जो ग़ायब है","vo","A flat clay sandstone rock surface in an old quarry, engraved with fine line drawings of temple pillars, moulding profiles and a temple plan, like an architect's sketch carved into stone.",
 "A clay hand brushes dust off the engraved lines; the drawings become clear and the hand withdraws.",
 "Macro close-up, high angle, 100mm macro, slow lateral move across the engraved lines.","Low raking sunlight from camera-left that makes the engraved lines stand out.","wind, faint brushing","a soft brush sweep",
 "पास की चट्टानों पर, मंदिर के खंभों और नक़्शों की रेखाएँ, पत्थर पर उकेरी मिली हैं।","F13")
c("C46","राज़ 2: वो झील जो ग़ायब है","vo","Behind the clay temple, a long sloping earthen ramp rising to the top of the platform; 11th-century clay workers push a huge stone block up the ramp on rollers.",
 "The workers heave together and the block moves a short distance up the ramp, then they wedge it and pause.",
 "Wide shot, side angle, 35mm, slow tilt up along the ramp.",DAY,"rollers creaking, workers' calls","a heavy stone scrape",
 "मंदिर के पीछे, मिट्टी का लंबा ढलान, जिस पर भारी पत्थर ऊपर चढ़ाए जाते थे।","F13")
c("C47","राज़ 2: वो झील जो ग़ायब है","vo","An empty clay quarry at dusk: a half-cut stone block still attached to the rock, iron chisels and a wooden mallet lying abandoned beside it, dust in the air.",
 "A gust of wind blows dust across the abandoned tools and settles; the quarry stays empty.",
 "Medium shot, eye level, 50mm, slow push-in on the abandoned tools.","Fading orange dusk light from camera-right, long shadows.","wind whistling through the quarry","",
 "ऐसा लगता है, जैसे काम बीच में ही रुक गया हो।","F12")
c("C48","राज़ 2: वो झील जो ग़ायब है","cam",ARCH+" A small clay model of a dry valley with two little stone dams sits on the desk.",
 "Sutradhar leans over the dry valley model, lifts his spectacles onto his forehead, then looks up at the lens and lowers them again.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"",
 "तो इतनी बड़ी झील, गई कहाँ? इसका एक बहुत मशहूर जवाब है।","")

# ---------------- RAZ 3 ----------------
c("C49","राज़ 3: सच या झूठ?","cam",ARCH+" A smooth clay tablet and a large clay stamp lie on the desk.",
 "Sutradhar breaks the third wax seal on his scroll, sets the scroll aside, and lays one hand on the clay tablet; he looks at the lens.",
 "Medium shot, eye level, 35mm, slow push-in.",LAMP,ROOMTONE,"a crisp wax crack",
 "राज़ नंबर तीन। सच या झूठ?","")
c("C50","राज़ 3: सच या झूठ?","vo","A busy clay street market in old Bhopal at evening: tiny clay shopkeepers, lanterns, a clay storyteller sitting on a charpai telling a story to a small circle of listeners.",
 "The clay storyteller spreads his arms wide; the listeners lean in and stay leaning.",
 "Medium-wide shot, eye level, 35mm, slow push-in on the circle.","Warm lantern light, dusky indigo sky.","market murmur, a distant tea-glass clink","",
 "भोपाल में, ये कहानी आपको कई लोग सुनाएँगे।","F14")
c("C51","राज़ 3: सच या झूठ?","vo","The 15th century: a generic clay sultan in a green and gold robe and turban sits on a horse on a ridge overlooking the huge clay Bhojpur lake and its stone dam; clay soldiers with iron picks stand at the dam.",
 "The sultan raises one hand; the soldiers lift their picks and swing them down onto the stone dam; they freeze at the bottom of the swing.",
 "Wide shot, high angle from behind the sultan, 35mm, locked, the camera does not move.",DAY,"wind, horse snort","picks striking stone",
 "पंद्रहवीं सदी में, मालवा के सुल्तान होशंगशाह ने, भोजपुर का बाँध तुड़वा दिया।","F14")
c("C52","राज़ 3: सच या झूठ?","vo","Close on the clay stone dam face: a crack running through the giant blocks.",
 "The crack widens, two blocks shift apart, and a thin jet of indigo-blue clay water bursts through the gap and keeps pouring.",
 "Close-up, low angle, 50mm, locked, the camera does not move.",DAY,"","stone cracking, then rushing water",
 "बाँध तोड़ने में, तीन महीने लगे।","F14")
c("C53","राज़ 3: सच या झूठ?","vo","The huge clay Bhojpur lake seen from a ridge.",
 "In stop-motion time-lapse the water level drops steadily, exposing muddy clay banks and stranded clay boats, until only puddles remain; the scene settles.",
 "Extreme wide shot, high angle, 24mm, locked, the camera does not move.","Daylight shifting rapidly from morning to evening and back as days pass.","wind","a long draining gurgle",
 "झील को खाली होने में, तीन साल।","F14")
c("C54","राज़ 3: सच या झूठ?","vo","The drained clay lake bed, cracked dry ochre mud.",
 "Green clay shoots sprout across the cracked mud in time-lapse until a clay farmer with a wooden plough and bullocks crosses the new field and stops.",
 "Wide shot, eye level, 35mm, slow push-in.",DAY,"wind, bullock bells","",
 "और उस ज़मीन पर खेती होने में, पूरे तीस साल।","F14")
c("C55","राज़ 3: सच या झूठ?","cam",ARCH+" The smooth clay tablet lies on the desk; Sutradhar holds the large clay stamp.",
 "Sutradhar raises the clay stamp high above the tablet in one hand and looks at the lens over his spectacles; he holds the stamp in the air.",
 "Medium close shot, slight low angle, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"a low rising whoosh",
 "तो, ये कहानी सच है, या झूठ?","")
c("C56","राज़ 3: सच या झूठ?","cam",ARCH+" The smooth clay tablet on the desk under the raised clay stamp.",
 "Sutradhar brings the stamp down firmly onto the tablet and lifts it, leaving a large round amber-orange clay imprint with a raised abstract emblem; he taps the imprint once.",
 "Close shot on the tablet and his hands, high angle, 50mm, locked.",LAMP,ROOMTONE,"a heavy stamp thump, then a soft drum hit",
 "जवाब है, विवादित।","F14, F15, F16")
c("C57","राज़ 3: सच या झूठ?","vo",ARCH+" An old 19th-century clay journal volume with a faded maroon cloth cover lies under the lamp.",
 "The journal opens slowly and its pages fan to a page of dense abstract squiggle text; the lamp flame flickers and steadies.",
 "Close-up, high angle, 50mm, slow push-in.",LAMP,ROOMTONE,"pages turning",
 "एक शोध के मुताबिक़, ये कहानी, अठारह सौ अठासी की एक ग़लतफ़हमी से फैली।","F16")
c("C58","राज़ 3: सच या झूठ?","vo","A clay study in the 1880s: a generic clay Englishman with mutton-chop whiskers in a brown tweed jacket sits at a desk reading a Persian-style manuscript with abstract squiggle script, a pen in hand.",
 "He runs his finger along a line of the manuscript, then writes a quick note in his notebook and nods to himself.",
 "Medium shot, eye level, 50mm, locked, the camera does not move.","Warm kerosene lamp light from camera-right.","clock ticking","a pen nib scratching",
 "एक अंग्रेज़ लेखक, विलियम किनकेड ने, एक फ़ारसी इतिहास-ग्रंथ को, भोजपुर की कहानी मान लिया।","F16")
c("C59","राज़ 3: सच या झूठ?","vo","A clay study in the 1960s: a generic clay Indian scholar with black-rimmed glasses in a white kurta sits at a desk piled with books, a Persian manuscript open beside a typewriter.",
 "He reads a line of the manuscript, turns to the typewriter and types a short line, then pauses with his fingers on the keys.",
 "Medium shot, slight high angle, 50mm, slow push-in.","Daylight from a window at camera-left.","ceiling fan whirring","typewriter keys clacking",
 "बाद में, इतिहासकार यू. एन. डे ने, उस ग्रंथ का अनुवाद किया।","F16")
c("C60","राज़ 3: सच या झूठ?","vo","A 15th-century clay court: a generic clay sultan in green and gold seated on a low throne; a small group of clay merchants in turbans with bundles and a laden camel stand before him.",
 "The lead merchant bows and gestures back toward the distant hills; the sultan listens and gives one slow nod.",
 "Wide shot, eye level, 35mm, locked, the camera does not move.","Warm daylight through arches from camera-left.","court murmur","",
 "उसके मुताबिक़, सुल्तान ने एक बाँध, भोपाल और विदिशा के व्यापारियों के कहने पर तुड़वाया था।","F16")
c("C61","राज़ 3: सच या झूठ?","vo","Night on a clay lake: a small wooded island in the middle of dark indigo water; on the island, a few clay bandits in dark turbans around a small campfire, a rowing boat pulled up on the shore.",
 "One bandit pushes the boat off toward the shore and climbs in; the boat glides away into the dark and the fire keeps flickering.",
 "Wide shot, high angle, 35mm, slow push-in toward the island.","Moonlight from above, small orange campfire glow.","water lapping, crickets","an oar dipping",
 "क्योंकि डाकू, झील से घिरी एक जगह पर छिपते थे, जहाँ तक पहुँचना मुश्किल था।","F16")
c("C62","राज़ 3: सच या झूठ?","vo",MAP+" Two clay pins: Bhojpur in the east and the big Bhopal lake in the west.",
 "A clay hand lifts a small clay bandit figure from the Bhojpur pin, carries it across the map and sets it down on the island in the Bhopal lake.",
 "Top-down shot, 35mm, locked, the camera does not move.",DAY,"soft room tone","a small clay click as the figure is placed",
 "इस शोध के मुताबिक़, वो झील भोजपुर की नहीं, भोपाल की ही थी।","F16")
c("C63","राज़ 3: सच या झूठ?","vo","Today's clay Bhojtal at golden hour: a small green island with trees and a small white structure in the middle of the vast indigo-blue lake.",
 "Small clay birds circle the island once and land in its trees; the water shimmers.",
 "Wide aerial shot, high angle, 35mm, slow orbit of about 30 degrees around the island.","Golden late-afternoon sunlight from camera-right.","birds, gentle water","",
 "और भोपाल की झील के बीच, आज भी एक टापू है। तकिया टापू।","F17")
c("C64","राज़ 3: सच या झूठ?","vo","The 11th-century Bhojpur gorge under a violent monsoon storm: dark indigo clay clouds, heavy rain, the river swollen and brown.",
 "Lightning flashes once and the river surges higher against the stone dam below the temple; the water keeps rising.",
 "Wide shot, low angle, 24mm, locked, the camera does not move.","Dark storm light with one bright lightning flash.","heavy rain, roaring river","a thunderclap",
 "भोजपुर के बाँध पर, यही शोध, ग्यारहवीं सदी के एक असाधारण मानसून की बात करता है।","F15")
c("C65","राज़ 3: सच या झूठ?","vo","The stone dam below the clay temple during the flood.",
 "A huge brown wave of clay floodwater hits the dam; the top blocks tip over and tumble into the river one by one, and the water rushes through the gap.",
 "Medium-wide shot, eye level, 35mm, locked, the camera does not move.","Dark storm light, rain streaks.","roaring flood","stone blocks crashing",
 "जिसकी बाढ़ ने, मंदिर के नीचे वाला बाँध गिरा दिया।","F15")
c("C66","राज़ 3: सच या झूठ?","cam",ARCH+" The clay tablet with the amber stamp imprint lies on the desk beside a stack of old books.",
 "Sutradhar places one hand flat on the stack of books, then points at the amber imprint and looks at the lens.",
 "Medium shot, eye level, 35mm, locked, the camera does not move.",LAMP,ROOMTONE,"a soft tap on the books",
 "होशंगशाह वाली कहानी, आज भी कई किताबों में दोहराई जाती है। इसलिए, फ़ैसला विवादित।","F14")
c("C67","राज़ 3: सच या झूठ?","vo",ARCH+" The clay tablet with the amber imprint on the desk.",
 "A clay hand flips the tablet over to its back side, which shows a small relief of a lake with an island; the hand withdraws.",
 "Close-up, high angle, 85mm, locked.",LAMP,ROOMTONE,"a clay flip, a low rising whoosh",
 "पर अगर नया शोध सही है, तो कहानी पलट जाती है।","")
c("C68","राज़ 3: सच या झूठ?","vo","The 15th century: the long earthen embankment of the clay Bhopal lake with a broken gap in the middle, water pouring out through the gap.",
 "Water rushes out through the gap in the embankment and spreads downstream; the flow continues.",
 "Wide shot, high angle, 35mm, slow push-in toward the gap.","Overcast grey daylight.","rushing water","",
 "जो झील तोड़ी गई थी, वो भोपाल की थी।","F16")
c("C69","राज़ 3: सच या झूठ?","vo","The 18th century: clay workers in angarkha jackets and turbans rebuild and raise the earthen embankment of the Bhopal lake; a small clay palace with arched windows stands on the bank above.",
 "Workers tip baskets of earth onto the embankment and tamp it down with wooden rammers; the embankment stands complete and higher.",
 "Wide shot, eye level, 35mm, slow pan from left to right along the embankment.",DAY,"rammers thudding, work calls","earth pouring",
 "और अठारहवीं सदी में, उसी बाँध की मरम्मत हुई, और उसे ऊँचा किया गया।","F18")
c("C70","राज़ 3: सच या झूठ?","vo","Today's clay Bhojtal at sunset: the full indigo lake reflecting orange sky, the city lights beginning to glow along the shore.",
 "The sun sinks behind the hills and the city lights come on one by one along the shore; the lake goes calm.",
 "Extreme wide shot, eye level from the water, 24mm, slow pull-out.","Orange sunset from behind the hills, glowing reflections.","evening birds, gentle water","",
 "यानी आज का भोजताल, शायद एक बार टूटी, और फिर से बनाई गई झील है।","F16, F18")

# ---------------- AAJ BHI ----------------
c("C71","आज भी दिखता है","cam",ARCH+" A small clay model of the present-day lake with a tiny statue on a pillar sits on the desk.",
 "Sutradhar sweeps one open hand over the lake model toward the lens, palm up, inviting; he holds the gesture.",
 "Medium shot, eye level, 35mm, slow push-in.",LAMP,ROOMTONE,"",
 "और ये सब, सिर्फ़ किताबों में नहीं। आज भी दिखता है।","")
c("C72","आज भी दिखता है","vo","Today's clay Bhojtal: a tall slender pillar rising from the water near the shore, topped by a bronze-coloured clay statue of a generic king holding a sword, boats passing.",
 "A clay tourist boat passes in front of the pillar from left to right; the statue stands still against the sky.",
 "Wide shot, low angle from the water, 35mm, slow tilt up to the statue.","Bright midday light from high camera-left.","boat motor hum, water","",
 "झील के एक कोने में, ऊँचे खंभे पर, राजा भोज की मूर्ति। दो हज़ार ग्यारह से।","F23")
c("C73","आज भी दिखता है","vo","The clay lake shore with a long promenade, families walking, a clay ice-cream cart.",
 "A clay child releases a small blue balloon that floats up over the lake; the child waves at it.",
 "Medium-wide shot, eye level, 35mm, locked, the camera does not move.",DAY,"promenade chatter, water","",
 "उसी साल, बड़े तालाब का नाम रखा गया, भोजताल।","F23")
c("C74","आज भी दिखता है","vo","A clay concrete dam with a row of eleven sluice gates; water spilling white through the open gates into a river channel below, green hills around.",
 "The gates hold steady as foamy clay water pours through them and churns in the channel below.",
 "Wide shot, low angle from the channel, 24mm, slow push-in.",DAY,"roaring water through gates","",
 "भदभदा पर ग्यारह गेट वाला बाँध, उन्नीस सौ पैंसठ में बना।","F20")
c("C75","आज भी दिखता है","vo","The water channel below the sluice gates leading away into a river valley.",
 "The released water rushes down the channel and away into the valley; spray hangs in the air.",
 "Wide shot, high angle, 35mm, slow pan following the flow downstream.",DAY,"rushing water","",
 "यही गेट तय करते हैं, कि झील का कितना पानी कलियासोत में जाए।","F20")
c("C76","आज भी दिखता है","vo","A second smaller clay lake inside the old city: domes and minarets and old houses around the water, a narrow embankment separating it from the big lake.",
 "A small clay rowing boat crosses the small lake and reaches the far bank.",
 "Wide shot, high angle, 35mm, slow push-in.","Soft late-afternoon light.","old city sounds, water","",
 "छोटा तालाब, सत्रह सौ चौरानवे में, नवाब के मंत्री छोटे ख़ान ने बनवाया।","F19")
c("C77","आज भी दिखता है","vo","Clay wetland at the lake edge: reeds, lotus leaves, and many clay water birds (painted storks, egrets, ducks).",
 "A flock of clay birds lifts off the water together and circles over the reeds before landing again.",
 "Wide shot, eye level from the reeds, 35mm, slow pan from right to left.",DAWN,"many bird calls, wings","",
 "दोनों झीलें मिलकर, भोज वेटलैंड हैं। दो हज़ार दो से, रामसर सूची में दर्ज।","F22")
c("C78","आज भी दिखता है","vo","A clay globe on the archive desk with tiny glowing blue dots scattered across continents, one dot in central India.",
 "The globe turns slowly until the central India dot faces the camera and glows brighter; the globe stops.",
 "Close-up, eye level, 85mm, locked, the camera does not move.",LAMP,ROOMTONE,"a soft chime as the dot glows",
 "रामसर, यानी दुनिया की अहम आर्द्रभूमियों की सूची।","F22")
c("C79","आज भी दिखता है","vo","Today's Bhojpur in clay: the long old stone dam standing, broken blocks in the river, the stone temple on the ridge, a small group of clay visitors with a guide.",
 "The clay guide points from the river stones up to the temple; the visitors follow his gesture and look up.",
 "Wide shot, high angle, 24mm, slow pan from the river up to the temple.",DAY,"river, visitors murmuring","",
 "भोजपुर में खड़ा बाँध, बिखरे पत्थर, और उकेरे नक़्शे, आज भी देखे जा सकते हैं।","F11, F13")
c("C80","आज भी दिखता है","vo","A modern clay kitchen in a Bhopal home: a steel tap over a sink, a small clay girl holding a steel tumbler.",
 "The girl turns the tap, fills the tumbler with clear water, turns it off and takes a sip.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.","Soft window daylight from camera-left.","kitchen room tone","water filling a steel glass",
 "भोपाल के पीने के पानी का एक बड़ा ज़रिया, आज भी यही झील है।","F21")

# ---------------- CLOSER ----------------
c("C81","Closer","cam",ARCH+" The clay lake model with its tiny embankment sits on the desk.",
 "Sutradhar rests one finger on the tiny embankment and looks at the lens; he keeps his finger there.",
 "Medium close shot, eye level, 50mm, slow push-in.",LAMP,ROOMTONE,"",
 "तो, भोपाल की झील किसने बनाई? क़ुदरत ने नहीं। एक बाँध ने।","F1")
c("C82","Closer","cam",ARCH,
 "Sutradhar takes off his spectacles, polishes them on his shawl, and puts them back on, looking at the lens.",
 "Close-up, eye level, 85mm, locked, the camera does not move.",LAMP,ROOMTONE,"",
 "जिसे परंपरा राजा भोज से जोड़ती है। और वो बाँध, आज भी पानी दे रहा है।","F1, F21")
c("C83","Closer","vo","The clay Bhopal lake at dusk from the embankment, the city lights reflecting on still water.",
 "A single clay lantern boat drifts slowly across the still water and leaves a thin ripple line; it keeps drifting.",
 "Wide shot, eye level, 35mm, locked, the camera does not move.","Deep blue dusk, warm city lights.","evening crickets, faint water","",
 "शहर अपने आप नहीं बसते। कोई, कभी, पानी को रुकने की वजह देता है।","")
c("C84","Closer","vo","A 19th-century clay palace by the lake: an arched window lit warmly from inside; four ornate jewelled clay crowns of different designs rest side by side on a velvet cushion on the window ledge.",
 "The lamp inside the window brightens and the four crowns glint one after another from left to right; the light holds.",
 "Medium shot, slight low angle, 50mm, slow push-in on the crowns.","Warm interior lamp light through the arch, blue dusk outside.","evening birds","a soft shimmer as each crown glints",
 "इसी झील के किनारे, एक सौ सात साल, एक रियासत पर सिर्फ़ औरतों ने राज किया।","F25")
c("C85","Closer","cam",ARCH,
 "Sutradhar raises one finger beside his face as if telling a secret, then points it toward the lens; he holds the point.",
 "Medium close shot, eye level, 50mm, locked, the camera does not move.",LAMP,ROOMTONE,"",
 "कैसे? अगले एपिसोड में। आपके शहर में कौन सा राज़ छिपा है? कमेंट में लिखिए।","")
c("C86","Closer","cam",ARCH,
 "Sutradhar rolls up his scroll, ties the red thread, tucks it under his arm, and gives a small bow toward the lens; he stays in the bow.",
 "Medium shot, eye level, 35mm, slow pull-out.",LAMP,ROOMTONE,"parchment rolling",
 "इतिहास याद रखिए... सवाल पूछते रहिए।","")
c("C87","End screen","sil",ARCH+" On the desk stand two empty wooden picture frames side by side, with plain sandstone-coloured backs inside them, and the brass lamp between them.",
 "The lamp flame flickers gently; everything else stays still.",
 "Wide shot, eye level, 35mm, locked, the camera does not move.",LAMP,"quiet room tone, faint flame flicker","")
END="विवादित क्यों? पूरी कहानी, चैनल पर एपिसोड एक में।"
SHORTS=[
 dict(id="SH1",title="3 महीने, 3 साल, 30 साल",hook="एक झील को मिटाने में, तीस साल लगे? ये कहानी, सच है या नहीं?",hook_action="Sutradhar holds up three fingers toward the lens, then lowers them one by one; he holds a closed fist.",clips=["C51","C52","C53","C54","C56"],end=END),
 dict(id="SH2",title="भोपाल की नदी, जिसकी दिशा बदल दी गई",hook="भोपाल में एक नदी, हज़ार साल से, दूसरी दिशा में बह रही है।",hook_action="Sutradhar traces a curving line in the air with one finger and then points it to his right; he holds the point.",clips=["C16","C17","C18","C19","C20","C21"],end="ये किसने किया? पूरी कहानी, चैनल पर एपिसोड एक में।"),
 dict(id="SH3",title="365 धाराओं वाली झील",hook="एक राजा की बीमारी, और तीन सौ पैंसठ धाराओं वाली झील। ये लोक-कथा सुनिए।",hook_action="Sutradhar opens his hand and lets a small stream of white clay pebbles pour from his palm onto the desk; he looks at the lens.",clips=["C24","C25","C26","C27","C28"],end="पूरी कहानी, चैनल पर एपिसोड एक में।"),
 dict(id="SH4",title="झील का टापू, जहाँ डाकू छिपते थे?",hook="एक शोध के मुताबिक़, भोपाल की झील के टापू पर, कभी डाकू छिपते थे।",hook_action="Sutradhar lifts a tiny clay boat from the desk and sets it down beside a small clay island; he looks up at the lens.",clips=["C60","C61","C62","C63"],end="सुल्तान ने क्या किया? पूरी कहानी, चैनल पर एपिसोड एक में।"),
]
