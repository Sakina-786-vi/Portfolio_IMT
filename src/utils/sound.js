// Web Audio API Synthesizer for a sci-fi HUD interface.
// Everything here is generated procedurally (oscillators + filtered
// noise + a short algorithmic reverb tail) — no sampled or licensed
// audio is used anywhere.

class SoundFX {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.reverbNode = null;
    this.isMuted = true; // Default MUTED per specification
  }

  // ---------------------------------------------------------------
  // Setup
  // ---------------------------------------------------------------

  init() {
    if (this.audioCtx || typeof window === "undefined") return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.audioCtx = new AudioContext();

    // Master bus so every sound gets a touch of the same "room"
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.value = 1;

    this.reverbNode = this.audioCtx.createConvolver();
    this.reverbNode.buffer = this._buildImpulseResponse(1.4, 2.2);

    const reverbSend = this.audioCtx.createGain();
    reverbSend.gain.value = 0.22;

    this.masterGain.connect(this.audioCtx.destination);
    this.masterGain.connect(reverbSend);
    reverbSend.connect(this.reverbNode);
    this.reverbNode.connect(this.audioCtx.destination);
  }

  // Synthesized impulse response — a short metallic/plate-style tail,
  // not a recorded space, so nothing here is copyrightable source audio.
  _buildImpulseResponse(duration = 1.5, decay = 2) {
    const rate = this.audioCtx.sampleRate;
    const length = Math.max(1, Math.floor(rate * duration));
    const impulse = this.audioCtx.createBuffer(2, length, rate);

    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }
    return impulse;
  }

  setMuted(muted) {
    this.isMuted = muted;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) this.playHoverBeep();
    return this.isMuted;
  }

  _out(node) {
    if (this.masterGain) node.connect(this.masterGain);
    else node.connect(this.audioCtx.destination);
  }

  // ---------------------------------------------------------------
  // Small synthesis helpers
  // ---------------------------------------------------------------

  _tone({ type = "sine", freq, endFreq, start, dur, peak = 0.15, attack = 0.01, curve = "exponential" }) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (endFreq) {
      if (curve === "linear") osc.frequency.linearRampToValueAtTime(endFreq, start + dur);
      else osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 0.0001), start + dur);
    }
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    this._out(gain);
    osc.start(start);
    osc.stop(start + dur + 0.05);
    return { osc, gain };
  }

  // Short burst of filtered white noise — used for "air", clicks, and texture
  _noiseBurst({ start, dur, peak = 0.1, filterType = "highpass", filterFreq = 2000, q = 1 }) {
    const bufferSize = Math.max(1, Math.floor(this.audioCtx.sampleRate * dur));
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const src = this.audioCtx.createBufferSource();
    src.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;
    filter.Q.value = q;

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(peak, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    src.connect(filter);
    filter.connect(gain);
    this._out(gain);
    src.start(start);
    src.stop(start + dur + 0.02);
  }

  // ---------------------------------------------------------------
  // Sound events
  // ---------------------------------------------------------------

  // Full "system online" boot sequence: sub rumble -> rising sweep ->
  // a bright three-note power-up chord -> a soft resonant shimmer.
  playBootChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // 1. Sub-bass power-up rumble
      this._tone({ type: "sine", freq: 45, endFreq: 90, start: now, dur: 1.1, peak: 0.22, attack: 0.05 });

      // 2. A second detuned sub layer for weight
      this._tone({ type: "sine", freq: 42, endFreq: 85, start: now + 0.02, dur: 1.1, peak: 0.16, attack: 0.05 });

      // 3. Rising energizing sweep (sawtooth through a filter would be
      // ideal but we keep pure oscillators + gain for portability)
      this._tone({ type: "sine", freq: 160, endFreq: 1200, start: now + 0.15, dur: 0.9, peak: 0.13, attack: 0.05 });
      this._tone({ type: "triangle", freq: 320, endFreq: 2400, start: now + 0.15, dur: 0.9, peak: 0.07, attack: 0.05 });

      // 4. Filtered "charge" noise riser under the sweep
      this._noiseBurst({ start: now + 0.1, dur: 1.0, peak: 0.05, filterType: "bandpass", filterFreq: 1800, q: 0.8 });

      // 5. Power-up chord — three clean tones landing together, like a
      // system confirming "online" (perfect fifth + octave, bright but resolved)
      const chordStart = now + 1.05;
      this._tone({ type: "sine", freq: 523.25, start: chordStart, dur: 0.9, peak: 0.14, attack: 0.02 }); // C5
      this._tone({ type: "sine", freq: 783.99, start: chordStart + 0.02, dur: 0.9, peak: 0.1, attack: 0.02 }); // G5
      this._tone({ type: "sine", freq: 1046.5, start: chordStart + 0.04, dur: 1.0, peak: 0.08, attack: 0.02 }); // C6

      // 6. High shimmer tail that fades into the reverb
      this._tone({ type: "triangle", freq: 2093, start: chordStart + 0.05, dur: 1.3, peak: 0.03, attack: 0.05 });
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }
  }

  // Crisp two-tone confirmation beep, brighter and more "HUD" than a
  // single blip — quick upward interval like a UI acknowledging focus.
  playHoverBeep() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      this._tone({ type: "sine", freq: 1500, endFreq: 1900, start: now, dur: 0.06, peak: 0.05, attack: 0.005 });
      this._tone({ type: "triangle", freq: 2400, start: now + 0.035, dur: 0.05, peak: 0.02, attack: 0.005 });
    } catch (e) {
      // Ignore audio errors on un-interacted browsers
    }
  }

  // Punchy "repulsor" style click: a tight noise transient for the
  // attack, layered with two falling tones for body, so it reads as a
  // solid mechanical/energy confirmation rather than a plain beep.
  playClickSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Transient "snap"
      this._noiseBurst({ start: now, dur: 0.035, peak: 0.16, filterType: "highpass", filterFreq: 3000, q: 1.2 });

      // Body — falling square + sawtooth pair
      this._tone({ type: "square", freq: 800, endFreq: 180, start: now, dur: 0.09, peak: 0.09, attack: 0.002 });
      this._tone({ type: "sawtooth", freq: 1200, endFreq: 320, start: now, dur: 0.09, peak: 0.06, attack: 0.002 });

      // A short sub thump underneath for weight
      this._tone({ type: "sine", freq: 150, endFreq: 60, start: now, dur: 0.12, peak: 0.1, attack: 0.002 });
    } catch (e) {
      // Ignore audio errors
    }
  }

  // A quiet, precise tick for minor UI events (toggles, tab changes)
  playTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      this._tone({ type: "square", freq: 2200, start: now, dur: 0.02, peak: 0.03, attack: 0.001 });
    } catch (e) {
      // Ignore
    }
  }

  // Descending tone for errors / invalid actions — clearly different
  // shape from the click/hover sounds so it reads as negative feedback.
  playErrorTone() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      this._tone({ type: "sawtooth", freq: 400, endFreq: 140, start: now, dur: 0.28, peak: 0.1, attack: 0.005 });
      this._tone({ type: "square", freq: 380, endFreq: 130, start: now + 0.02, dur: 0.26, peak: 0.06, attack: 0.005 });
    } catch (e) {
      // Ignore
    }
  }

  // Mirror of the boot chime for a graceful "power down" moment
  playShutdownChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      this._tone({ type: "sine", freq: 1046.5, start: now, dur: 0.7, peak: 0.1, attack: 0.02 });
      this._tone({ type: "sine", freq: 783.99, start: now + 0.05, dur: 0.8, peak: 0.09, attack: 0.02 });
      this._tone({ type: "sine", freq: 523.25, endFreq: 220, start: now + 0.1, dur: 1.0, peak: 0.12, attack: 0.02 });
      this._tone({ type: "sine", freq: 90, endFreq: 40, start: now + 0.15, dur: 1.0, peak: 0.15, attack: 0.05 });
    } catch (e) {
      // Ignore
    }
  }
}

export const soundFx = new SoundFX();