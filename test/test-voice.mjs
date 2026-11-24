import { Shifter } from '../voice.js';

const rate = 48000, fails = [];
for (const [ratio, hz] of [[0.8, 440], [0.8, 200], [1.25, 300]]) {
  const shifter = new Shifter(rate, ratio);
  const total = rate * 2, input = new Float32Array(total), output = new Float32Array(total);
  for (let i = 0; i < total; i++) input[i] = 0.5 * Math.sin(2 * Math.PI * hz * i / rate);
  for (let i = 0; i < total; i += 1024) shifter.process(input.subarray(i, i + 1024), output.subarray(i, i + 1024));
  let crossings = 0, peak = 0;
  for (let i = rate / 2 + 1; i < total; i++) {
    if (output[i - 1] < 0 && output[i] >= 0) crossings++;
    peak = Math.max(peak, Math.abs(output[i]));
  }
  const measured = crossings / ((total - rate / 2) / rate);
  if (Math.abs(measured - hz * ratio) > hz * ratio * 0.02) fails.push(`${hz} Hz x ${ratio}: got ${measured.toFixed(1)} Hz`);
  if (peak > 0.55) fails.push(`${hz} Hz x ${ratio}: peak ${peak.toFixed(2)} too high`);
}
console.log(fails.length ? 'FAIL ' + fails.join('; ') : 'voice shifter ok');
process.exit(fails.length ? 1 : 0);
