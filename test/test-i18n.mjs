import { readFileSync, readdirSync } from 'node:fs';
import { dictionary } from '../i18n.js';
import '../i18n-pages.js';
import '../i18n-how.js';

const root = new URL('../', import.meta.url);
const read = (f) => readFileSync(new URL(f, root), 'utf8');
let bad = 0;
const fail = (msg) => { console.log('FAIL', msg); bad++; };

for (const [key, row] of Object.entries(dictionary)) {
  if (row.length !== 5 || row.some((s) => typeof s !== 'string' || !s.trim())) fail(`${key}: needs 5 non-empty strings`);
  const vars = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
  const ref = vars(row[0]);
  row.forEach((s, i) => { if (vars(s) !== ref) fail(`${key}: placeholders differ in language ${i}`); });
  const tags = (s) => (s.match(/<\/?[a-z]+/g) || []).filter((x) => x !== '<br').sort().join(',');
  row.forEach((s, i) => { if (tags(s) !== tags(row[0])) fail(`${key}: markup differs in language ${i}`); });
}

const used = new Set();
for (const f of readdirSync(root).filter((n) => n.endsWith('.html'))) {
  for (const m of read(f).matchAll(/data-i18n(?:-html|-title|-aria|-alt|-content)?="([^"]+)"/g)) used.add(m[1]);
}
for (const m of read('app.js').matchAll(/'([a-z]+\.[A-Za-z.]*[A-Za-z])'/g)) if (dictionary[m[1]]) used.add(m[1]);
for (const key of ['audio.mute', 'audio.voice', 'audio.keep', 'mask.removeFrom', 'mask.restoreFrom']) used.add(key);
for (const key of used) if (!dictionary[key]) fail(`missing key: ${key}`);
const unused = Object.keys(dictionary).filter((k) => !used.has(k));
if (unused.length) console.log('unused keys:', unused.join(', '));
console.log(bad ? `${bad} problem(s)` : `i18n ok: ${Object.keys(dictionary).length} keys x 5 languages`);
process.exit(bad ? 1 : 0);
