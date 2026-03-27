/**
 * 30-Day Curriculum Schedule
 */
import { glossaryTerms } from './glossary-data.js';
import { commands } from './commands-data.js';

export function getWeekTerms(week) {
  return glossaryTerms.filter(t => t.week === week);
}

export function getWeekCommands(week) {
  return commands.filter(c => c.week === week);
}

export function getDayContent(day) {
  const week = Math.ceil(day / 7);
  const weekTerms = getWeekTerms(week);
  const weekCommands = getWeekCommands(week);
  const dayInWeek = ((day - 1) % 7);

  // Distribute terms across the week (roughly 3 terms per day)
  const termsPerDay = Math.ceil(weekTerms.length / 7);
  const startIdx = dayInWeek * termsPerDay;
  const dayTerms = weekTerms.slice(startIdx, startIdx + termsPerDay);

  // Distribute commands similarly
  const cmdsPerDay = Math.ceil(weekCommands.length / 7);
  const cmdStartIdx = dayInWeek * cmdsPerDay;
  const dayCommands = weekCommands.slice(cmdStartIdx, cmdStartIdx + cmdsPerDay);

  // Boss Battle days
  const isBossBattle = day === 7 || day === 14 || day === 21 || day === 28;

  // Games unlock schedule
  const unlockedGames = ['flash-match']; // Always available
  if (day >= 2) unlockedGames.push('term-sprint');
  if (day >= 3) unlockedGames.push('command-quest');
  if (day >= 5) unlockedGames.push('prompt-lab');
  if (day >= 6) unlockedGames.push('workflow-puzzle');
  if (isBossBattle) unlockedGames.push('boss-battle');

  return {
    day,
    week,
    terms: dayTerms,
    commands: dayCommands,
    allWeekTerms: weekTerms,
    allWeekCommands: weekCommands,
    isBossBattle,
    unlockedGames,
  };
}

// Single source of truth for game definitions
export const GAMES = [
  { id: 'flash-match', icon: '🃏', nameKey: 'games.flashMatch', descKey: 'games.flashMatchDesc', unlock: 1 },
  { id: 'term-sprint', icon: '⚡', nameKey: 'games.termSprint', descKey: 'games.termSprintDesc', unlock: 2 },
  { id: 'command-quest', icon: '🎯', nameKey: 'games.commandQuest', descKey: 'games.commandQuestDesc', unlock: 3 },
  { id: 'prompt-lab', icon: '✍️', nameKey: 'games.promptLab', descKey: 'games.promptLabDesc', unlock: 5 },
  { id: 'workflow-puzzle', icon: '🧩', nameKey: 'games.workflowPuzzle', descKey: 'games.workflowPuzzleDesc', unlock: 6 },
  { id: 'boss-battle', icon: '⚔️', nameKey: 'games.bossBattle', descKey: 'games.bossBattleDesc', unlock: 7 },
];

export function getGameUnlockDay(gameId) {
  const map = {
    'flash-match': 1,
    'term-sprint': 2,
    'command-quest': 3,
    'prompt-lab': 5,
    'workflow-puzzle': 6,
    'boss-battle': 7,
  };
  return map[gameId] || 1;
}

export function isGameUnlocked(gameId, currentDay) {
  return currentDay >= getGameUnlockDay(gameId);
}
