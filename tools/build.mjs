import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const readdirCount = (dir) => readdirSync(dir).reduce((n, name) => n + (statSync(join(dir, name)).isDirectory() ? readdirCount(join(dir, name)) : 1), 0);
const files = [
  'robots.txt', 'sitemap.xml', 'index.html', 'legal.html', 'verify.html', 'how.html', '404.html', '_headers', 'favicon.ico',
  'style.css', 'app.js', 'detector.js', 'detect-worker.js', 'voice.js', 'page.js', 'i18n.js', 'i18n-pages.js', 'i18n-how.js', 'icons/mark.png',
  'models/yunet.onnx', 'models/LICENSE-yunet.txt',
  'vendor/fonts/fonts.css', 'vendor/fonts/archivo-latin.woff2', 'vendor/fonts/archivo-latin-ext.woff2',
  'vendor/fonts/jetbrains-mono-latin.woff2', 'vendor/fonts/jetbrains-mono-latin-ext.woff2', 'vendor/fonts/LICENSE.txt',
  'vendor/ort/ort.wasm.min.mjs', 'vendor/ort/ort-wasm-simd-threaded.mjs', 'vendor/ort/ort-wasm-simd-threaded.wasm', 'vendor/ort/LICENSE.txt',
  'vendor/mediabunny/mediabunny.min.mjs', 'vendor/mediabunny/LICENSE.txt',
];

const optional = [
  'models/head.onnx', 'vendor/ort/ort.webgpu.min.mjs', 'vendor/ort/ort-wasm-simd-threaded.jsep.mjs', 'vendor/ort/ort-wasm-simd-threaded.jsep.wasm',
];

rmSync(dist, { recursive: true, force: true });
for (const f of new Set([...files, ...optional.filter((o) => existsSync(join(root, o)))])) {
  const from = join(root, f);
  if (!existsSync(from)) throw new Error('missing file: ' + f);
  mkdirSync(dirname(join(dist, f)), { recursive: true });
  cpSync(from, join(dist, f));
}
console.log(`${readdirCount(dist)} files copied to dist/`);
