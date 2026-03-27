/**
 * Game Timer Utilities
 */
export function createTimer(durationMs, onTick, onComplete) {
  let startTime = null;
  let remaining = durationMs;
  let totalDuration = durationMs;
  let rafId = null;
  let paused = false;
  let stopped = false;

  function tick() {
    if (paused || stopped) return;
    const elapsed = Date.now() - startTime;
    remaining = Math.max(0, totalDuration - elapsed);
    onTick(remaining);
    if (remaining <= 0) {
      if (!stopped) onComplete();
      return;
    }
    rafId = requestAnimationFrame(tick);
  }

  return {
    start() {
      startTime = Date.now();
      paused = false;
      stopped = false;
      tick();
    },
    pause() {
      paused = true;
      if (rafId) cancelAnimationFrame(rafId);
      totalDuration = remaining;
    },
    resume() {
      startTime = Date.now();
      paused = false;
      tick();
    },
    stop() {
      stopped = true;
      paused = true;
      if (rafId) cancelAnimationFrame(rafId);
    },
    getRemaining() {
      return remaining;
    },
  };
}

export function createStopwatch() {
  let startTime = Date.now();
  let paused = false;
  let elapsed = 0;

  return {
    start() { startTime = Date.now(); paused = false; },
    pause() { elapsed += Date.now() - startTime; paused = true; },
    resume() { startTime = Date.now(); paused = false; },
    getElapsed() {
      return paused ? elapsed : elapsed + (Date.now() - startTime);
    },
  };
}

export function formatTime(ms) {
  const totalSec = Math.ceil(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return min > 0 ? `${min}:${String(sec).padStart(2, '0')}` : `${sec}s`;
}
