# Anonyx

**Anonyx**, by NovaPulse Studio, part of the NVP app suite. No data collection, no trace.

Hide the faces in a video or photo before posting it, right in the phone's browser.
Nothing is sent to a server: no account, no analytics, no third-party file loaded from another site.

Live at [anonyx.pages.dev](https://anonyx.pages.dev).

## Origin

Anonyx is a rework of **[vesky](https://github.com/Nctrn17/vesky)** (Nctrn17), released under the same AGPL-3.0 licence.
Detection, tracking, export and the privacy guarantees come from that project.

## Why

Videos of protests and blockades are used to identify the people filmed. A blur or a mosaic
can be undone by AI. A solid box cannot: there is no image left underneath.

## What it does

1. You pick one or several videos and photos.
2. The video is analysed 30 times per second, and a black box (or an emoji on a black box) is placed on every face, on every frame.
3. You check: add a mask where a face was missed, remove one placed by mistake.
4. The file is fully re-encoded: the location, date and phone model stored in the original file are gone.

## What it does not do

- It does not hide clothes, tattoos, voices or places.
- It can miss a face. Checking by eye before posting is still required.
- It does not promise complete protection.

## How to verify it

You don't have to take our word for it. Each point below can be checked without special tools.

- **Website: airplane mode.** Open anonyx.pages.dev once with a connection, switch to airplane mode, then process a video:
  everything works. With no network, nothing can leave.
- **Website: the browser's Network tab.** On a computer, open the developer tools (F12), Network tab, then process a video.
  Once the page has loaded, no request appears during analysis or export.
- **Website: the security policy.** Every file is served with a `Content-Security-Policy` header (`_headers`),
  visible in the Network tab. `connect-src 'self'` forbids the browser from connecting to any other site.
  anonyx.pages.dev itself only serves static files: there is no server-side code that could receive a video.
- **The automated test** (see "Testing") fails if a single request goes out after the page has loaded.
- **The code is public.** Network calls can be found in seconds: `grep -rn "fetch(" app.js`.
- **The website serves this code.** `bash tools/verify-site.sh` downloads every file from anonyx.pages.dev and compares it,
  byte for byte, with the latest commit of the repository (see "Testing").

## How it works

- Static site, no compilation: `index.html`, `style.css`, `app.js` are served as written. `tools/build.mjs` only copies files to `dist/` for deployment. A step-by-step explanation for visitors is on `how.html`.
- Face detection: the YuNet_n model, retrained to see better at night (`models/README.md`), run by ONNX Runtime Web (`detector.js`, `detect-worker.js`),
  on several cores in parallel. Very dark frames are analysed twice, as is and brightened, and the results are merged.
- Tracking: one box per face from frame to frame, in both directions (a confirmed face also pulls in the weaker detections just before it), enlarged by 30%, extended a few frames before and after.
- Fast export: the original file is decoded frame by frame, each frame is masked then re-encoded
  by the device's encoder (WebCodecs, through Mediabunny): H.264 in MP4, or VP9 in WebM when there is no H.264 encoder.
  Faster than real time.
- Fallback export, when the browser cannot do the fast one: the masked image is recorded while it plays
  (canvas + MediaRecorder). Add `?slow` to the URL to force this mode.
- Tracking: smoothed with no delay, computed at the exact time of each output image, with an optional slower "Best tracking" mode that searches gaps again.
- Mask size: a slider from 100% to 200% of the detected face (130% by default), changeable in the review step without losing manual edits.
- Sound: off by default (a voice can identify someone). Three choices: mute, changed voice (pitch and tone shifted down about 20%, `voice.js`, fast export only), original sound.
- Keep only one face: select a face and press ◉ to unmask it and mask every other detected face (interviews, reporting).
- Export size: resolution cap (1080p, 720p, 480p) and size limit (WhatsApp 16 MB, Signal 100 MB). Bitrate, then resolution, are lowered to fit and the estimated size is shown.
- Languages: English, Français, Español, العربية (right-to-left), Türkçe. Detected from the browser, or `?lang=fr` in the address. Nothing is stored. Strings live in `i18n.js`, `i18n-pages.js`, `i18n-how.js`.
- Optional head pass: with `models/head.onnx` present (see `models/README.md`), a second model catches profiles, backs of heads, helmets and masks.
- Optional WebGPU: with the WebGPU files of ONNX Runtime added to `vendor/ort/` (see its README), the detector uses the graphics chip and falls back to WebAssembly.
- Several files: up to 20 per batch, reviewed one by one, exported together (a `.zip` when there are several).
- Compare: a draggable split between the masked picture (left) and the original (right), shown on screen only.
- Mask style: a solid black square (default), one of 24 emojis painted on top of the black square (the face never shows through), or an optional blur (a grid of 3 by 3 to 11 by 11 cells, 6 by 6 by default, set with a strength slider, labelled as less safe).
- Scan report: faces tracked, faces to double-check with a jump button, masks added or edited, share of frames with a mask. Shown in the review step and again at the end.
- Photos: JPEG (92%) or PNG, chosen in the review step. HEIC photos are read when the browser can decode them (Safari, iPhone); otherwise a clear message asks for a JPEG.

## Testing

```
node tools/dev-server.mjs                               # http://localhost:5173
node test/test-i18n.mjs                                 # every string exists in 5 languages, same placeholders
node test/test-voice.mjs                                # voice change: pitch ratio and level
node test/test-heads.mjs                                # head model output decoder
CHROME=/path/to/chrome node test/run-test.mjs test2.mp4 # full scan + export in Chrome, fails on any request after load
CHROME=/path/to/chrome node test/test-no-trace.mjs      # two videos differing only by faces give identical output
bash test/verify-vendor.sh                              # vendor/ files equal the official npm releases
bash tools/verify-site.sh                               # deployed site equals the latest commit
```

Test videos are made by `python3 test/make-test-video.py` and `python3 test/make-faces-pair.py` (ffmpeg and scikit-image needed).

## Known limitations

- With the fallback export, exporting takes as long as the video.
- Analysis is slow on long videos.
- Changed voice needs the fast export. In the fallback export the video is silent.
- The head model and the WebGPU build are not bundled: the tool works without them (see `models/README.md`, `vendor/ort/README.md`).
- Face and head detectors can miss people. Check the whole result before posting.
- Automated test on desktop Chrome. Tested by hand on Android and iPhone browsers.

## Third-party components

- [YuNet_n](https://github.com/ShiqiYu/libfacedetection.train), BSD-3 licence, retrained on WIDER FACE and DARK FACE (`models/`).
- [ONNX Runtime Web](https://github.com/microsoft/onnxruntime), MIT licence (`vendor/ort/`).
- [Mediabunny](https://github.com/Vanilagy/mediabunny), MPL-2.0 licence (`vendor/mediabunny/`).
- Archivo and JetBrains Mono fonts, SIL OFL 1.1 licence (`vendor/fonts/`).
- [vesky](https://github.com/Nctrn17/vesky)

## Licence

Code under the [AGPL-3.0](LICENSE). You may copy, modify and host it,
as long as you publish the code of your version under the same licence, even if it is only served as a website.

**Do not load anything from another site.** People use this tool to protect faces, sometimes at protests.
A Google Fonts stylesheet, an analytics script or an image hosted elsewhere is enough to send their IP address
to a third party as soon as they open the page. Keep everything on your own server, as in `vendor/`,
and do not loosen the security policy in `_headers`. If you change `app.js` or `_headers`, say so clearly.
