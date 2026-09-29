// src/js/audio.js
// Cyberpunk Web Audio API Synthesizer

let soundEnabled = true;
let audioCtx = null;

// Initialize preference from localStorage
try {
  const savedPref = localStorage.getItem('ayush_sound_pref');
  if (savedPref !== null) {
    soundEnabled = savedPref === 'true';
  }
} catch (e) {}

function getAudioContext() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(enabled) {
  soundEnabled = !!enabled;
  try {
    localStorage.setItem('ayush_sound_pref', soundEnabled ? 'true' : 'false');
  } catch (e) {}
}

export function toggleSound() {
  setSoundEnabled(!soundEnabled);
  return soundEnabled;
}

export function playUiSound(freq = 800, duration = 0.05, type = 'sine') {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {}
}

export function playChimeSound() {
  if (!soundEnabled) return;
  playUiSound(600, 0.04);
  setTimeout(() => playUiSound(1000, 0.07), 45);
}
