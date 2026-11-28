# फ़ाइल 001: ElevenLabs voice test

**Free plan = testing only** (no commercial use, needs credit to ElevenLabs). Publishing on the channel needs a paid plan, so ask the owner first.

## 1. Pick a voice (once, reuse forever)
ElevenLabs → **Voices → Voice Library** → search `Hindi deep male narrator` or `Hindi storyteller`. Pick a voice that sounds **heavy, soft, calm**. Test 2–3 voices with the S1 line, then keep one. Note its name in `config/channel.json` (voice).

## 2. Settings
| Setting | Value | Why |
|---|---|---|
| Model | **Eleven v3** (supports the [tags] below and Hindi). Fallback: Multilingual v2 (remove the [tags]) | v3 follows emotion tags |
| Stability | 40–50% | Expressive but steady |
| Similarity | 75% | Keeps the voice consistent |
| Style | 20–30% | A little attitude |
| Speed | 1.05–1.1 | Brisk, ~3 words/s |

## 3a. Option A: whole Short in one go (best flow)
Paste everything below into Text to Speech and generate. Download the MP3.

```
[curious] भोपाल के पास एक बड़ी झील हुआ करती थी। आज वहाँ बस टूटे पत्थर बचे हैं। तो झील गई कहाँ?
[warm] स्वागत है आर्काइव फ़ाइल्स में। फ़ाइल नंबर एक। चलो, इस गुम झील का असली सीन खोलते हैं।
[storytelling] भोपाल में लोग बड़े यक़ीन से सुनाते हैं, पंद्रहवीं सदी में सुल्तान होशंगशाह ने इसका बाँध तुड़वा दिया।
[skeptical] बाँध टूटने में तीन महीने, झील खाली होने में तीन साल, खेती में तीस साल। बड़ी परफ़ेक्ट कहानी है ना?
[suspicious, low] इतनी परफ़ेक्ट, कि शक होता है। तो मैंने फ़ाइल खोली। कहानी अठारह सौ अठासी में, एक अंग्रेज़ से शुरू हुई।
[curious] उसने एक पुरानी फ़ारसी किताब पढ़ी, और मान लिया कि बात भोजपुर की है। पर क्या सच में?
[intrigued] ठीक से अनुवाद हुआ, तो कुछ और निकला। डाकू झील से घिरी एक जगह छिपकर, व्यापारियों को लूटते थे।
[matter-of-fact] परेशान व्यापारी सुल्तान के पास गए, और डाकुओं का अड्डा ख़त्म करने के लिए, बाँध तुड़वाया गया।
[softly] और शोध के हिसाब से, वो झील भोपाल की अपनी झील थी। उसका टापू? आज भी वहीं है।
[smug, confident] तो असली सीन? सुल्तान ने बाँध तोड़ा, पर शायद भोपाल का। भोजपुर की झील, शायद बाढ़ ले गई। विवादित!
[playful] अगली फ़ाइल किसकी खुलेगी, देखना है? तो फ़ॉलो करना मत भूलना!
```

## 3b. Option B: one clip at a time (easiest to line up with the video)
Generate each line separately and name the files `S01.mp3`…`S11.mp3`. Each one should be shorter than its "keep" time.

| File | Keep ≤ | Paste this |
|---|---|---|
| S1.mp3 | 6.5 s | `[curious] भोपाल के पास एक बड़ी झील हुआ करती थी। आज वहाँ बस टूटे पत्थर बचे हैं। तो झील गई कहाँ?` |
| S2.mp3 | 5.5 s | `[warm] स्वागत है आर्काइव फ़ाइल्स में। फ़ाइल नंबर एक। चलो, इस गुम झील का असली सीन खोलते हैं।` |
| S3.mp3 | 6 s | `[storytelling] भोपाल में लोग बड़े यक़ीन से सुनाते हैं, पंद्रहवीं सदी में सुल्तान होशंगशाह ने इसका बाँध तुड़वा दिया।` |
| S4.mp3 | 6.5 s | `[skeptical] बाँध टूटने में तीन महीने, झील खाली होने में तीन साल, खेती में तीस साल। बड़ी परफ़ेक्ट कहानी है ना?` |
| S5.mp3 | 6.5 s | `[suspicious, low] इतनी परफ़ेक्ट, कि शक होता है। तो मैंने फ़ाइल खोली। कहानी अठारह सौ अठासी में, एक अंग्रेज़ से शुरू हुई।` |
| S6.mp3 | 6 s | `[curious] उसने एक पुरानी फ़ारसी किताब पढ़ी, और मान लिया कि बात भोजपुर की है। पर क्या सच में?` |
| S7.mp3 | 6 s | `[intrigued] ठीक से अनुवाद हुआ, तो कुछ और निकला। डाकू झील से घिरी एक जगह छिपकर, व्यापारियों को लूटते थे।` |
| S8.mp3 | 6 s | `[matter-of-fact] परेशान व्यापारी सुल्तान के पास गए, और डाकुओं का अड्डा ख़त्म करने के लिए, बाँध तुड़वाया गया।` |
| S9.mp3 | 6 s | `[softly] और शोध के हिसाब से, वो झील भोपाल की अपनी झील थी। उसका टापू? आज भी वहीं है।` |
| S10.mp3 | 6.5 s | `[smug, confident] तो असली सीन? सुल्तान ने बाँध तोड़ा, पर शायद भोपाल का। भोजपुर की झील, शायद बाढ़ ले गई। विवादित!` |
| S11.mp3 | 4 s | `[playful] अगली फ़ाइल किसकी खुलेगी, देखना है? तो फ़ॉलो करना मत भूलना!` |

## 4. Video for this voice
With an ElevenLabs voice, the Flow clips must be **silent of speech** (otherwise two voices clash): tell Claude "make silent version" and the prompts get `No speech` + Sutradhar with his mouth closed, smirking and gesturing. Then join the voice + clips in Clipchamp/iMovie (or one ffmpeg command).

Full text, no tags (for Multilingual v2):

```
भोपाल के पास एक बड़ी झील हुआ करती थी। आज वहाँ बस टूटे पत्थर बचे हैं। तो झील गई कहाँ? स्वागत है आर्काइव फ़ाइल्स में। फ़ाइल नंबर एक। चलो, इस गुम झील का असली सीन खोलते हैं। भोपाल में लोग बड़े यक़ीन से सुनाते हैं, पंद्रहवीं सदी में सुल्तान होशंगशाह ने इसका बाँध तुड़वा दिया। बाँध टूटने में तीन महीने, झील खाली होने में तीन साल, खेती में तीस साल। बड़ी परफ़ेक्ट कहानी है ना? इतनी परफ़ेक्ट, कि शक होता है। तो मैंने फ़ाइल खोली। कहानी अठारह सौ अठासी में, एक अंग्रेज़ से शुरू हुई। उसने एक पुरानी फ़ारसी किताब पढ़ी, और मान लिया कि बात भोजपुर की है। पर क्या सच में? ठीक से अनुवाद हुआ, तो कुछ और निकला। डाकू झील से घिरी एक जगह छिपकर, व्यापारियों को लूटते थे। परेशान व्यापारी सुल्तान के पास गए, और डाकुओं का अड्डा ख़त्म करने के लिए, बाँध तुड़वाया गया। और शोध के हिसाब से, वो झील भोपाल की अपनी झील थी। उसका टापू? आज भी वहीं है। तो असली सीन? सुल्तान ने बाँध तोड़ा, पर शायद भोपाल का। भोजपुर की झील, शायद बाढ़ ले गई। विवादित! अगली फ़ाइल किसकी खुलेगी, देखना है? तो फ़ॉलो करना मत भूलना!
```
