class ArcadeAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmInterval: NodeJS.Timeout | null = null;
  private step: number = 0;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Called on the user's very first interaction anywhere on the page
  public unlockAndStart() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx && ctx.state === "running" && !this.bgmInterval) {
      this.startMusic();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Crisp upward arcade pop for Player X
  public playPlaceX() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(340, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.09);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  // Playful bubbly chime for Player O
  public playPlaceO() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.11);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.11);
  }

  // Classic 4-note arcade victory fanfare
  public playWin() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      const startTime = ctx.currentTime + i * 0.09;
      const duration = i === notes.length - 1 ? 0.35 : 0.08;

      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  // Comedy "wah-wah" slide for a draw
  public playDraw() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [392.0, 369.99, 349.23, 329.63];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      const startTime = ctx.currentTime + i * 0.16;
      const duration = i === notes.length - 1 ? 0.4 : 0.14;

      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.05, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  // Quirky bouncy background chiptune loop
  public startMusic() {
    if (this.isMuted || this.bgmInterval) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const melody = [
      261.63, 329.63, 392.0, 329.63,
      293.66, 349.23, 440.0, 349.23,
      329.63, 392.0, 493.88, 392.0,
      349.23, 329.63, 293.66, 246.94,
    ];

    this.bgmInterval = setInterval(() => {
      if (this.isMuted) return;
      const currentCtx = this.getContext();
      if (!currentCtx || currentCtx.state !== "running") return;

      const freq = melody[this.step % melody.length];
      this.step++;

      const osc = currentCtx.createOscillator();
      const gain = currentCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, currentCtx.currentTime);

      gain.gain.setValueAtTime(0.035, currentCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, currentCtx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(currentCtx.destination);
      osc.start();
      osc.stop(currentCtx.currentTime + 0.18);
    }, 240);
  }

  public stopMusic() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const arcadeAudio = new ArcadeAudio();
