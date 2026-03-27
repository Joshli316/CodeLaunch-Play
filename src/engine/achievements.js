/**
 * Badge / Achievement System
 */
import { getState, updateState } from '../state.js';
import { getMasteryStats, getOverallMasteryPercent } from './mastery.js';

export const BADGES = [
  { id: 'first-steps', name: { zh: '初次尝试', en: 'First Steps' }, icon: '🎯', desc: { zh: '完成第一个游戏', en: 'Complete your first game' } },
  { id: 'sharp-mind', name: { zh: '思维敏捷', en: 'Sharp Mind' }, icon: '🧠', desc: { zh: '术语冲刺连续答对10题', en: '10 correct in a row in Term Sprint' } },
  { id: 'perfect-match', name: { zh: '完美配对', en: 'Perfect Match' }, icon: '🃏', desc: { zh: '困难模式闪卡配对获3星', en: 'Flash Match Hard with 3 stars' } },
  { id: 'commander', name: { zh: '指挥官', en: 'Commander' }, icon: '🎖️', desc: { zh: '命令闯关100%正确', en: '100% on a Command Quest round' } },
  { id: 'prompt-master', name: { zh: '提示大师', en: 'Prompt Master' }, icon: '✍️', desc: { zh: '提示词工坊高级90%+', en: 'Prompt Lab Advanced 90%+' } },
  { id: 'flow-state', name: { zh: '心流状态', en: 'Flow State' }, icon: '⚡', desc: { zh: '30秒内完成工作流拼图', en: 'Workflow Puzzle under 30 seconds' } },
  { id: 'week1-champion', name: { zh: '第一周冠军', en: 'Week 1 Champion' }, icon: '🏆', desc: { zh: '通过第一周Boss Battle', en: 'Pass Boss Battle 1' } },
  { id: 'week2-champion', name: { zh: '第二周冠军', en: 'Week 2 Champion' }, icon: '🏆', desc: { zh: '通过第二周Boss Battle', en: 'Pass Boss Battle 2' } },
  { id: 'week3-champion', name: { zh: '第三周冠军', en: 'Week 3 Champion' }, icon: '🏆', desc: { zh: '通过第三周Boss Battle', en: 'Pass Boss Battle 3' } },
  { id: 'week4-champion', name: { zh: '第四周冠军', en: 'Week 4 Champion' }, icon: '👑', desc: { zh: '通过最终Boss Battle', en: 'Pass Final Boss Battle' } },
  { id: 'on-fire', name: { zh: '连续7天', en: 'On Fire' }, icon: '🔥', desc: { zh: '连续打卡7天', en: '7-day streak' } },
  { id: 'unstoppable', name: { zh: '势不可挡', en: 'Unstoppable' }, icon: '💪', desc: { zh: '连续打卡14天', en: '14-day streak' } },
  { id: 'legendary', name: { zh: '传奇', en: 'Legendary' }, icon: '🌟', desc: { zh: '连续打卡30天', en: '30-day streak' } },
  { id: 'half-way', name: { zh: '半程达人', en: 'Half Way' }, icon: '🎯', desc: { zh: '50%术语达到5星', en: '50% of terms at 5-star mastery' } },
  { id: 'claude-ready', name: { zh: '认证通过', en: 'Claude Code Ready' }, icon: '🎓', desc: { zh: '80%掌握+所有Boss通过', en: '80% mastery + all Boss Battles passed' } },
  { id: 'perfectionist', name: { zh: '完美主义者', en: 'Perfectionist' }, icon: '💎', desc: { zh: '100%术语达到5星', en: '100% of all terms at 5-star mastery' } },
];

export function checkAchievements(context = {}) {
  const state = getState();
  const newBadges = [];

  function award(id) {
    if (!state.badges.includes(id)) {
      state.badges.push(id);
      newBadges.push(BADGES.find(b => b.id === id));
    }
  }

  // First Steps
  if (state.gamesPlayed >= 1) award('first-steps');

  // Sharp Mind
  if (context.game === 'term-sprint' && context.maxStreak >= 10) award('sharp-mind');

  // Perfect Match
  if (context.game === 'flash-match' && context.difficulty === 'hard' && context.stars >= 3) award('perfect-match');

  // Commander
  if (context.game === 'command-quest' && context.correct === context.total && context.total >= 10) award('commander');

  // Prompt Master
  if (context.game === 'prompt-lab' && context.difficulty === 'hard' && context.scorePercent >= 90) award('prompt-master');

  // Flow State
  if (context.game === 'workflow-puzzle' && context.duration < 30000) award('flow-state');

  // Boss Battle badges
  if (context.game === 'boss-battle' && context.passed) {
    if (context.week === 1) award('week1-champion');
    if (context.week === 2) award('week2-champion');
    if (context.week === 3) award('week3-champion');
    if (context.week === 4) award('week4-champion');
  }

  // Streak badges
  if (state.streak >= 7) award('on-fire');
  if (state.streak >= 14) award('unstoppable');
  if (state.streak >= 30) award('legendary');

  // Mastery badges
  const stats = getMasteryStats();
  if (stats.percentage >= 50) award('half-way');
  if (stats.percentage >= 100) award('perfectionist');

  // Claude Code Ready
  const allBosses = [1, 2, 3, 4].every(w => state.bossesCompleted.includes(w));
  if (getOverallMasteryPercent() >= 80 && allBosses) award('claude-ready');

  if (newBadges.length > 0) updateState(state);
  return newBadges;
}

export function hasBadge(id) {
  return getState().badges.includes(id);
}
