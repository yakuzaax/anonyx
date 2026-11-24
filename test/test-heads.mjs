import { decodeHeads } from '../detector.js';
// channels-first [1,5,N]: two overlapping boxes + one low score + one far box
const N = 6;
const cf = new Float32Array(5 * N);
const set = (i, cx, cy, w, h, s) => { [cx, cy, w, h, s].forEach((v, c) => { cf[c * N + i] = v; }); };
set(0, 320, 200, 100, 120, 0.9);
set(1, 324, 204, 98, 118, 0.8);   // dup of 0 -> NMS
set(2, 100, 100, 40, 50, 0.2);    // below threshold
set(3, 500, 400, 60, 70, 0.6);
const a = decodeHeads(cf, [1, 5, N], 0.5, 0.45);
const round = (list) => list.map((b) => [Math.round(b.x), Math.round(b.y), Math.round(b.w), Math.round(b.h)].join(','));
const fails = [];
if (round(a).join(' ') !== '540,280,200,240 940,730,120,140') fails.push('channels-first decode: ' + round(a).join(' '));
// channels-last [1,N,5]
const cl = new Float32Array(N * 5);
for (let i = 0; i < N; i++) for (let c = 0; c < 5; c++) cl[i * 5 + c] = cf[c * N + i];
const b = decodeHeads(cl, [1, N, 5], 0.5, 0.45);
if (JSON.stringify(a) !== JSON.stringify(b)) fails.push('channels-last differs');
console.log(fails.length ? 'FAIL ' + fails.join('; ') : 'heads decoder ok');
process.exit(fails.length ? 1 : 0);
