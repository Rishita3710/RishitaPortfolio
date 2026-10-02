// Sounds are generated in code with the Web Audio API — no audio files needed.

let ctx = null;
let on = (() => {
  try { return localStorage.getItem("sound") !== "off"; } catch { return true; }
})();
const listeners = new Set();

export const isSoundOn = () => on;
export const subscribeSound = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export function setSoundOn(value) {
  on = value;
  try { localStorage.setItem("sound", value ? "on" : "off"); } catch { /* private mode */ }
  listeners.forEach((fn) => fn());
  if (value) playPop();
}

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// one soft "bloop" that glides from one pitch to another
function tone(c, { from, to, start = 0, dur = 0.18, type = "sine", vol = 0.12 }) {
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

// airy whoosh that follows the circular reveal
function whoosh(c, up) {
  const t = c.currentTime;
  const len = c.sampleRate * 0.6;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.2;
  filter.frequency.setValueAtTime(up ? 400 : 2400, t);
  filter.frequency.exponentialRampToValueAtTime(up ? 2400 : 400, t + 0.55);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.06, t + 0.12);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
  src.connect(filter).connect(gain).connect(c.destination);
  src.start(t);
}

export function playThemeSound(toDark) {
  if (!on) return;
  const c = getCtx();
  if (!c) return;
  if (toDark) {            // to night: low and sleepy
    tone(c, { from: 520, to: 260, dur: 0.22 });
    tone(c, { from: 390, to: 196, start: 0.07, dur: 0.3, vol: 0.09 });
  } else {                 // to day: bright and sparkly
    tone(c, { from: 392, to: 784, dur: 0.2 });
    tone(c, { from: 784, to: 1175, start: 0.08, dur: 0.28, vol: 0.09 });
    tone(c, { from: 1175, to: 1568, start: 0.16, dur: 0.3, vol: 0.05, type: "triangle" });
  }
  whoosh(c, !toDark);
}

// tiny "click" when the rope is pulled far enough
export function playTick() {
  if (!on) return;
  const c = getCtx();
  if (!c) return;
  tone(c, { from: 1400, to: 700, dur: 0.05, type: "square", vol: 0.04 });
}

export function playPop() {
  if (!on) return;
  const c = getCtx();
  if (!c) return;
  tone(c, { from: 500, to: 1000, dur: 0.12, vol: 0.1 });
  tone(c, { from: 900, to: 1500, start: 0.06, dur: 0.14, vol: 0.06, type: "triangle" });
}

// ---------------------------------------------------------------
// Tech-stack hover sounds. Every tech gets its own note:
//   category  -> the "instrument" (timbre + octave)
//   position  -> which note of a pentatonic scale, so any run of hovers sounds musical.
// ---------------------------------------------------------------
const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];   // semitones above the base note
const VOICES = {
  Frontend: { base: 523.25, type: "sine",     dur: 0.38, vol: 0.10, overtone: 2 },      // clear bell
  Backend:  { base: 196.0,  type: "triangle", dur: 0.30, vol: 0.14, overtone: 0.5 },    // deep wood
  Design:   { base: 1046.5, type: "sine",     dur: 0.45, vol: 0.07, overtone: 1.5 },    // sparkle chime
  Tools:    { base: 349.23, type: "square",   dur: 0.12, vol: 0.035, overtone: 0 },     // short pluck
};
let lastStack = 0;

export function playStack(cat, index = 0) {
  if (!on) return;
  const now = performance.now();
  if (now - lastStack < 60) return;      // don't machine-gun when the mouse sweeps across
  lastStack = now;
  const c = getCtx();
  if (!c) return;
  const v = VOICES[cat] || VOICES.Frontend;
  const f = v.base * Math.pow(2, PENTA[index % PENTA.length] / 12);
  tone(c, { from: f * 1.01, to: f, dur: v.dur, type: v.type, vol: v.vol });
  if (v.overtone) tone(c, { from: f * v.overtone, to: f * v.overtone, start: 0.01, dur: v.dur * 0.7, type: "sine", vol: v.vol * 0.4 });
}
