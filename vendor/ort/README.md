# ONNX Runtime Web, version 1.30.0 (MIT licence)

Engine that runs the detection model in the browser. Three files taken unmodified from the npm package
`onnxruntime-web@1.30.0` (`dist/` folder): `ort.wasm.min.mjs`, `ort-wasm-simd-threaded.mjs`, `ort-wasm-simd-threaded.wasm`.

Before any update, check that no data-sending address appears:
`grep -o "https\?://[a-zA-Z0-9./_-]*" ort.wasm.min.mjs ort-wasm-simd-threaded.mjs`
must return only a documentation link (web.dev).

## Optional: WebGPU

If these three files from the same npm package (`dist/`) are added next to the others, the detector uses the
graphics chip when the device supports it, and falls back to WebAssembly on any failure:

- `ort.webgpu.min.mjs`
- `ort-wasm-simd-threaded.jsep.mjs`
- `ort-wasm-simd-threaded.jsep.wasm`

Add `?cpu` to the page address to force WebAssembly. Measure before shipping: for a model this small, WebGPU is not always faster.
`tools/build.mjs` copies these files only when present.

Why not MediaPipe: its detector (BlazeFace) is made for selfies and misses crowds, and version 1.0.1 of the npm package sends statistics to Google.
