const WINDOW = 0.04;

class Shifter {
  constructor(sampleRate, ratio) {
    this.size = Math.ceil(sampleRate * WINDOW);
    this.buf = new Float32Array(this.size * 2 + 4);
    this.ratio = ratio;
    this.write = 0;
    this.phase = 0;
  }

  read(delay) {
    const len = this.buf.length;
    let pos = this.write - delay;
    while (pos < 0) pos += len;
    const i = Math.floor(pos), f = pos - i;
    return this.buf[i % len] * (1 - f) + this.buf[(i + 1) % len] * f;
  }

  process(input, output) {
    const len = this.buf.length, step = (1 - this.ratio) / this.size;
    for (let n = 0; n < input.length; n++) {
      this.buf[this.write] = input[n];
      this.write = (this.write + 1) % len;
      this.phase += step;
      if (this.phase >= 1) this.phase -= 1;
      else if (this.phase < 0) this.phase += 1;
      const p2 = (this.phase + 0.5) % 1;
      const g1 = 0.5 - 0.5 * Math.cos(2 * Math.PI * this.phase);
      const g2 = 1 - g1;
      output[n] = this.read(this.phase * this.size + 1) * g1 + this.read(p2 * this.size + 1) * g2;
    }
  }
}

const VOICE_RATIO = 0.8;

export function voiceProcessor(AudioSample, ratio = VOICE_RATIO) {
  const shifters = [];
  let one = new Float32Array(0);
  return (sample) => {
    const frames = sample.numberOfFrames, channels = sample.numberOfChannels;
    const planar = new Float32Array(frames * channels);
    if (one.length < frames) one = new Float32Array(frames);
    const scratch = one.subarray(0, frames);
    for (let c = 0; c < channels; c++) {
      sample.copyTo(scratch, { planeIndex: c, format: 'f32-planar' });
      shifters[c] ||= new Shifter(sample.sampleRate, ratio);
      shifters[c].process(scratch, planar.subarray(c * frames, (c + 1) * frames));
    }
    return new AudioSample({ data: planar, format: 'f32-planar', numberOfChannels: channels, sampleRate: sample.sampleRate, timestamp: sample.timestamp });
  };
}

export { Shifter };
