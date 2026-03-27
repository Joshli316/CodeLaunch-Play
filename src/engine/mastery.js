/**
 * Per-term Mastery Tracking
 */
import { getMastery } from '../state.js';
import { glossaryTerms } from '../content/glossary-data.js';
import { commands } from '../content/commands-data.js';

export function getAllTermKeys() {
  return glossaryTerms.map(t => `term:${t.en}`);
}

export function getAllCommandKeys() {
  return commands.map(c => `cmd:${c.command}`);
}

export function getAllKeys() {
  return [...getAllTermKeys(), ...getAllCommandKeys()];
}

export function getMasteryStats() {
  const allKeys = getAllKeys();
  let total = allKeys.length;
  let stars = [0, 0, 0, 0, 0, 0];
  allKeys.forEach(key => {
    const m = getMastery(key);
    stars[m.stars]++;
  });
  const mastered = stars[5];
  const learning = total - stars[0];
  const percentage = Math.round((mastered / total) * 100);
  return { total, stars, mastered, learning, percentage };
}

export function getTermMasteryGrid() {
  return glossaryTerms.map(term => ({
    key: `term:${term.en}`,
    label: term.en,
    zh: term.zh,
    mastery: getMastery(`term:${term.en}`),
  }));
}

export function getCommandMasteryGrid() {
  return commands.map(cmd => ({
    key: `cmd:${cmd.command}`,
    label: cmd.command,
    zh: cmd.description.zh,
    mastery: getMastery(`cmd:${cmd.command}`),
  }));
}

export function getOverallMasteryPercent() {
  const keys = getAllKeys();
  if (keys.length === 0) return 0;
  const at4Plus = keys.filter(k => getMastery(k).stars >= 4).length;
  return Math.round((at4Plus / keys.length) * 100);
}
