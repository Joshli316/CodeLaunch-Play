/**
 * Sound Effect Manager
 * All sounds are synthesized using Web Audio API — no external files needed.
 */
import { getState } from './state.js';

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', volume = 0.3) {
  if (!getState().settings.sound) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

export function playCorrect() {
  playTone(523, 0.1, 'sine', 0.2);
  setTimeout(() => playTone(659, 0.1, 'sine', 0.2), 100);
  setTimeout(() => playTone(784, 0.15, 'sine', 0.2), 200);
}

export function playWrong() {
  playTone(200, 0.15, 'sawtooth', 0.15);
  setTimeout(() => playTone(180, 0.2, 'sawtooth', 0.15), 150);
}

export function playComplete() {
  [523, 587, 659, 784, 880].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.15, 'sine', 0.2), i * 100);
  });
}

export function playLevelUp() {
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.2, 'triangle', 0.25), i * 150);
  });
}

export function playClick() {
  playTone(800, 0.05, 'sine', 0.1);
}
