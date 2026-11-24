const STRIDES = [8, 16, 32];
const NMS_IOU = 0.3;

const DARK = 40;
const NIGHT_LUT = Float32Array.from({ length: 256 }, (_, v) => Math.floor(Math.sqrt(v / 255) * 255));

function nested(big, small) {
  const ix = Math.max(0, Math.min(big.x + big.w, small.x + small.w) - Math.max(big.x, small.x));
  const iy = Math.max(0, Math.min(big.y + big.h, small.y + small.h) - Math.max(big.y, small.y));
  const area = small.w * small.h;
  return ix * iy > 0.8 * area && area > 0.2 * big.w * big.h && area < big.w * big.h;
}

function overlap(a, b) {
  const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const inter = ix * iy;
  return inter / (a.w * a.h + b.w * b.h - inter);
}

export function neededScore(d, short, r) {
  if (d.w / short < r.from) return r.small;
  return r.min + (r.big - r.min) * Math.min(1, Math.max(0, (d.w / short - r.from) / (r.to - r.from)));
}

const LOW_FACTOR = 3;
const CHECK_BELOW = 0.5, CHECK_DROP = 0.25, CHECK_KEEP = 0.7, CHECK_MAX = 12;

async function checkSmall(detect, source, boxes, short, r) {
  const todo = boxes.filter((d) => d.s < (r.checkBelow || CHECK_BELOW) && d.w / short < r.from).sort((a, b) => b.s - a.s).slice(0, CHECK_MAX);
  const dropped = new Set();
  for (const d of todo) {
    const z = await detect.zoom(source, d);
    if (z < CHECK_DROP) dropped.add(d);
    else if (z >= CHECK_KEEP) d.s = Math.max(d.s, r.min);
  }
  return boxes.filter((d) => !dropped.has(d));
}

const HEAD_SIDE = 640, HEAD_MIN = 0.45, HEAD_NMS = 0.5, HEAD_SHRINK = 0.8;

export function decodeHeads(data, dims, scale, minScore) {
  const rows = dims[dims.length - 2], cols = dims[dims.length - 1];
  const channelsFirst = rows < cols;
  const channels = channelsFirst ? rows : cols, count = channelsFirst ? cols : rows;
  if (channels < 5) return [];
  const at = (i, c) => (channelsFirst ? data[c * count + i] : data[i * channels + c]);
  const found = [];
  for (let i = 0; i < count; i++) {
    let s = 0;
    for (let c = 4; c < channels; c++) s = Math.max(s, at(i, c));
    if (s < minScore) continue;
    const w = at(i, 2) / scale, h = at(i, 3) / scale;
    found.push({ x: at(i, 0) / scale - w / 2, y: at(i, 1) / scale - h / 2, w, h, s });
  }
  found.sort((a, b) => b.s - a.s);
  const kept = [];
  for (const b of found) if (!kept.some((k) => overlap(k, b) > HEAD_NMS)) kept.push(b);
  return kept;
}

export async function detectBoth(detect, source, sw, sh, maxSide, minScore, always, r, head) {
  let boxes = await detect(source, sw, sh, maxSide, minScore);
  const short = Math.min(sw, sh);
  if (detect.zoom && r.check !== false) boxes = await checkSmall(detect, source, boxes, short, r);
  let extra = [];
  if (head && always && detect.heads) {
    for (const h of await detect.heads(source, sw, sh, HEAD_MIN)) {
      const cx = h.x + h.w / 2, cy = h.y + h.h / 2;
      if (boxes.some((d) => d.s >= r.min && d.x + d.w / 2 > h.x && d.x + d.w / 2 < h.x + h.w && d.y + d.h / 2 > h.y && d.y + d.h / 2 < h.y + h.h)) continue;
      extra.push({ x: cx - h.w * HEAD_SHRINK / 2, y: cy - h.h * HEAD_SHRINK / 2, w: h.w * HEAD_SHRINK, h: h.h * HEAD_SHRINK, s: h.s, head: true });
    }
  }
  if (!always && !boxes.some((d) => d.s >= r.min && d.s < neededScore(d, short, r))) return boxes;
  const low = await detect(source, sw, sh, Math.round(Math.min(maxSide, Math.max(sw, sh)) / LOW_FACTOR), minScore);
  return boxes.concat(low.map((b) => ({ ...b, lo: true })), extra);
}

async function loadRuntime(base, wantGpu) {
  const exists = async (file) => {
    try { return (await fetch(base + file, { method: 'HEAD' })).ok; } catch { return false; }
  };
  const open = async (module, providers) => {
    const ort = await import(base + 'vendor/ort/' + module);
    ort.env.wasm.wasmPaths = base + 'vendor/ort/';
    ort.env.wasm.numThreads = 1;
    const session = await ort.InferenceSession.create(base + 'models/yunet.onnx', { executionProviders: providers });
    await session.run({ input: new ort.Tensor('float32', new Float32Array(3 * 64 * 64), [1, 3, 64, 64]) });
    return { ort, session };
  };
  if (wantGpu && typeof navigator !== 'undefined' && navigator.gpu && await exists('vendor/ort/ort.webgpu.min.mjs')) {
    try { return { ...await open('ort.webgpu.min.mjs', ['webgpu']), provider: 'webgpu', exists }; } catch (e) { console.warn('WebGPU unavailable, using WebAssembly', e); }
  }
  return { ...await open('ort.wasm.min.mjs', ['wasm']), provider: 'wasm', exists };
}

async function createHeadModel(runtime, base) {
  if (!await runtime.exists('models/head.onnx')) return null;
  const { ort } = runtime;
  let session;
  try { session = await ort.InferenceSession.create(base + 'models/head.onnx', { executionProviders: ['wasm'] }); } catch (e) { console.warn('Head model not loaded', e); return null; }
  const canvas = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(HEAD_SIDE, HEAD_SIDE) : Object.assign(document.createElement('canvas'), { width: HEAD_SIDE, height: HEAD_SIDE });
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const buffer = new Float32Array(3 * HEAD_SIDE * HEAD_SIDE);
  const input = session.inputNames[0], output = session.outputNames[0];
  return async (source, sw, sh, minScore) => {
    const scale = HEAD_SIDE / Math.max(sw, sh);
    ctx.fillStyle = 'rgb(114,114,114)';
    ctx.fillRect(0, 0, HEAD_SIDE, HEAD_SIDE);
    ctx.drawImage(source, 0, 0, Math.round(sw * scale), Math.round(sh * scale));
    const rgba = ctx.getImageData(0, 0, HEAD_SIDE, HEAD_SIDE).data;
    const n = HEAD_SIDE * HEAD_SIDE;
    for (let i = 0, p = 0; i < n; i++, p += 4) {
      buffer[i] = rgba[p] / 255;
      buffer[n + i] = rgba[p + 1] / 255;
      buffer[2 * n + i] = rgba[p + 2] / 255;
    }
    const out = (await session.run({ [input]: new ort.Tensor('float32', buffer, [1, 3, HEAD_SIDE, HEAD_SIDE]) }))[output];
    return decodeHeads(out.data, out.dims, scale, minScore);
  };
}

export async function createDetector(base, options = {}) {
  const runtime = await loadRuntime(base, options.gpu !== false);
  const { ort, session } = runtime;
  const sizes = new Map();
  const space = (pw, ph) => {
    const key = pw + 'x' + ph;
    let sp = sizes.get(key);
    if (sp) sizes.delete(key);
    else {
      const canvas = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(pw, ph) : Object.assign(document.createElement('canvas'), { width: pw, height: ph });
      sp = { canvas, ctx: canvas.getContext('2d', { willReadFrequently: true }), buffer: new Float32Array(3 * pw * ph) };
    }
    sizes.set(key, sp);
    for (const [k, old] of sizes) {
      if (sizes.size <= 3) break;
      old.canvas.width = old.canvas.height = 0;
      sizes.delete(k);
    }
    return sp;
  };
  const ZOOM = 192;
  const zoomCanvas = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(ZOOM, ZOOM) : Object.assign(document.createElement('canvas'), { width: ZOOM, height: ZOOM });
  const zoomCtx = zoomCanvas.getContext('2d', { willReadFrequently: true });
  zoomCtx.imageSmoothingQuality = 'high';

  async function zoomFind(source, d, k, reach) {
    const side = Math.max(d.w, d.h) * k;
    const cx = d.x + d.w / 2, cy = d.y + d.h / 2;
    zoomCtx.fillStyle = '#777';
    zoomCtx.fillRect(0, 0, ZOOM, ZOOM);
    zoomCtx.drawImage(source, cx - side / 2, cy - side / 2, side, side, 0, 0, ZOOM, ZOOM);
    let best = null;
    for (const f of await detect(zoomCanvas, ZOOM, ZOOM, ZOOM, 0.05)) {
      const fw = f.w / ZOOM * side / d.w;
      if (Math.hypot((f.x + f.w / 2) / ZOOM - 0.5, (f.y + f.h / 2) / ZOOM - 0.5) < reach && fw > 0.5 && fw < 2 && (!best || f.s > best.s)) best = f;
    }
    if (!best) return null;
    const m = side / ZOOM;
    return { x: cx - side / 2 + best.x * m, y: cy - side / 2 + best.y * m, w: best.w * m, h: best.h * m, s: best.s };
  }

  async function zoom(source, d) {
    const f = await zoomFind(source, d, 3, 0.15);
    return f ? f.s : 0;
  }

  async function detect(source, sw, sh, maxSide, minScore) {
    const scale = Math.min(1, maxSide / Math.max(sw, sh));
    const dw = Math.max(1, Math.round(sw * scale)), dh = Math.max(1, Math.round(sh * scale));
    const pw = Math.ceil(dw / 32) * 32, ph = Math.ceil(dh / 32) * 32;
    const { ctx, buffer } = space(pw, ph);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, pw, ph);
    ctx.drawImage(source, 0, 0, dw, dh);
    const rgba = ctx.getImageData(0, 0, pw, ph).data;
    const n = pw * ph;
    let sum = 0, count = 0;
    for (let y = 0; y < dh; y += 4) for (let x = 0, p = y * pw * 4; x < dw; x += 4, p += 16) { sum += rgba[p] + rgba[p + 1] + rgba[p + 2]; count++; }
    const passes = sum / (3 * count) < DARK ? [null, NIGHT_LUT] : [null];
    const found = [];
    for (const lut of passes) {
      if (lut) {
        for (let i = 0, p = 0; i < n; i++, p += 4) {
          buffer[i] = lut[rgba[p + 2]];
          buffer[n + i] = lut[rgba[p + 1]];
          buffer[2 * n + i] = lut[rgba[p]];
        }
      } else {
        for (let i = 0, p = 0; i < n; i++, p += 4) {
          buffer[i] = rgba[p + 2];
          buffer[n + i] = rgba[p + 1];
          buffer[2 * n + i] = rgba[p];
        }
      }
      const out = await session.run({ input: new ort.Tensor('float32', buffer, [1, 3, ph, pw]) });
      for (const st of STRIDES) {
        const cols = pw / st;
        const cls = out['cls_' + st].data, obj = out['obj_' + st].data, box = out['bbox_' + st].data;
        for (let i = 0; i < cls.length; i++) {
          const s = Math.sqrt(Math.min(1, Math.max(0, cls[i])) * Math.min(1, Math.max(0, obj[i])));
          if (s < minScore) continue;
          const w = Math.exp(box[i * 4 + 2]) * st, h = Math.exp(box[i * 4 + 3]) * st;
          const cx = ((i % cols) + box[i * 4]) * st, cy = (Math.floor(i / cols) + box[i * 4 + 1]) * st;
          found.push({ x: (cx - w / 2) / scale, y: (cy - h / 2) / scale, w: w / scale, h: h / scale, s });
        }
      }
    }
    found.sort((a, b) => b.s - a.s);
    const kept = [];
    for (const b of found) if (!kept.some((k) => overlap(k, b) > NMS_IOU || nested(k, b))) kept.push(b);
    return kept;
  }

  detect.zoom = zoom;
  detect.zoomFind = zoomFind;
  detect.provider = runtime.provider;
  detect.heads = await createHeadModel(runtime, base);
  return detect;
}
