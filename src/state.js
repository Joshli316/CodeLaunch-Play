/**
 * localStorage State Management
 */
const STORAGE_KEY = 'codefu_state';

const defaultState = {
  xp: 0,
  level: 1,
  streak: 0,
  lastPlayDate: null,
  streakFreezes: 0,
  hearts: 5,
  heartsLastRefill: Date.now(),
  currentDay: 1,
  bossesCompleted: [],
  badges: [],
  gamesPlayed: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  bestStreak: 0,
  timeSpent: 0,
  mastery: {},       // { termKey: { stars: 0, interval: 0, ease: 2.5, nextReview: null, lastCorrect: null } }
  gameHistory: [],   // [{ game, score, date, duration }]
  settings: {
    language: 'zh',
    sound: false,
    darkMode: false,
  },
  dailyChallengeToday: null,
  dailyChallengeDate: null,
};

let state = null;

function load() {
  if (state) return state;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    state = saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
  } catch {
    state = { ...defaultState };
  }
  // Refill hearts
  refillHearts();
  return state;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function refillHearts() {
  const now = Date.now();
  const elapsed = now - (state.heartsLastRefill || now);
  const heartsToAdd = Math.floor(elapsed / (30 * 60 * 1000)); // 1 per 30 min
  if (heartsToAdd > 0 && state.hearts < 5) {
    state.hearts = Math.min(5, state.hearts + heartsToAdd);
    state.heartsLastRefill = now;
  }
  if (elapsed >= 4 * 60 * 60 * 1000) {
    state.hearts = 5;
    state.heartsLastRefill = now;
  }
}

export function getState() {
  return load();
}

export function updateState(updates) {
  load();
  Object.assign(state, updates);
  save();
  return state;
}

export function addXP(amount) {
  load();
  state.xp += amount;
  // Level thresholds
  const thresholds = [0, 200, 600, 1500, 3000, 5000];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (state.xp >= thresholds[i]) {
      const newLevel = i + 1;
      if (newLevel > state.level) {
        state.level = newLevel;
        save();
        return { levelUp: true, newLevel };
      }
      break;
    }
  }
  save();
  return { levelUp: false };
}

export function useHeart() {
  load();
  refillHearts();
  if (state.hearts > 0) {
    state.hearts--;
    save();
    return true;
  }
  return false;
}

export function getHearts() {
  load();
  refillHearts();
  save();
  return state.hearts;
}

export function updateStreak() {
  load();
  const today = new Date().toDateString();
  if (state.lastPlayDate === today) return state.streak;

  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.lastPlayDate === yesterday) {
    state.streak++;
  } else if (state.lastPlayDate !== today) {
    if (state.streakFreezes > 0) {
      state.streakFreezes--;
    } else {
      state.streak = 1;
    }
  }
  state.lastPlayDate = today;
  if (state.streak > state.bestStreak) state.bestStreak = state.streak;

  // Earn streak freeze every 7 days
  if (state.streak > 0 && state.streak % 7 === 0 && state.streakFreezes < 3) {
    state.streakFreezes++;
  }
  save();
  return state.streak;
}

export function getMastery(key) {
  load();
  return state.mastery[key] || { stars: 0, interval: 0, ease: 2.5, nextReview: null, lastCorrect: null };
}

export function setMastery(key, data) {
  load();
  state.mastery[key] = data;
  save();
}

export function recordGame(game, score, duration) {
  load();
  state.gamesPlayed++;
  state.gameHistory.push({ game, score, date: new Date().toISOString(), duration });
  if (state.gameHistory.length > 200) state.gameHistory = state.gameHistory.slice(-200);
  save();
}

export function resetState() {
  state = { ...defaultState };
  save();
}

export function exportState() {
  return JSON.stringify(load(), null, 2);
}

export function getLevelInfo() {
  load();
  const levels = [
    { name: { zh: '新手', en: 'Beginner' }, threshold: 0 },
    { name: { zh: '学徒', en: 'Apprentice' }, threshold: 200 },
    { name: { zh: '探索者', en: 'Explorer' }, threshold: 600 },
    { name: { zh: '建造者', en: 'Builder' }, threshold: 1500 },
    { name: { zh: '创造者', en: 'Creator' }, threshold: 3000 },
    { name: { zh: '发布者', en: 'Shipper' }, threshold: 5000 },
  ];
  const current = levels[state.level - 1];
  const next = levels[state.level] || null;
  const progress = next ? (state.xp - current.threshold) / (next.threshold - current.threshold) : 1;
  return { level: state.level, name: current.name, xp: state.xp, nextThreshold: next?.threshold, progress: Math.min(1, Math.max(0, progress)) };
}
