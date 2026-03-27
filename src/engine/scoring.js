/**
 * XP Calculation, Combo, Streak Management
 */
import { addXP, getState, updateState, updateStreak } from '../state.js';

export function calculateGameXP(baseXP, correctCount, totalCount, comboMax) {
  let xp = baseXP;
  // Accuracy bonus
  const accuracy = totalCount > 0 ? correctCount / totalCount : 0;
  if (accuracy >= 1) xp += 20;
  else if (accuracy >= 0.8) xp += 10;

  // Combo bonus
  if (comboMax >= 10) xp += 15;
  else if (comboMax >= 5) xp += 5;

  // Streak multiplier
  const streak = getState().streak;
  if (streak >= 30) xp = Math.round(xp * 5);
  else if (streak >= 14) xp = Math.round(xp * 3);
  else if (streak >= 7) xp = Math.round(xp * 2);

  return xp;
}

export function awardXP(amount) {
  const result = addXP(amount);
  return result;
}

export function awardGameCompletion(game, correct, total, combo, duration) {
  const state = getState();
  state.totalCorrect += correct;
  state.totalAnswered += total;
  state.timeSpent += duration;
  updateState(state);

  updateStreak();

  const baseXP = game === 'boss-battle' ? 50 : game === 'daily-challenge' ? 20 : 30;
  const xp = calculateGameXP(baseXP, correct, total, combo);
  return awardXP(xp);
}

export function getStarRating(score, maxScore) {
  const pct = maxScore > 0 ? score / maxScore : 0;
  if (pct >= 0.95) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.4) return 1;
  return 0;
}

export function getComboMultiplier(streak) {
  if (streak >= 15) return 4;
  if (streak >= 10) return 3;
  if (streak >= 5) return 2;
  if (streak >= 3) return 1.5;
  return 1;
}
