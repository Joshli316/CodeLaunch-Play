/**
 * Profile & Stats
 */
import { t, bilingual } from '../i18n.js';
import { getState, getLevelInfo } from '../state.js';
import { getMasteryStats, getTermMasteryGrid, getCommandMasteryGrid, getOverallMasteryPercent } from '../engine/mastery.js';
import { BADGES } from '../engine/achievements.js';

export function render() {
  const state = getState();
  const levelInfo = getLevelInfo();
  const stats = getMasteryStats();
  const lang = state.settings.language;
  const accuracy = state.totalAnswered > 0 ? Math.round((state.totalCorrect / state.totalAnswered) * 100) : 0;
  const allBosses = [1, 2, 3, 4].every(w => state.bossesCompleted.includes(w));
  const masteryPct = getOverallMasteryPercent();
  const isReady = masteryPct >= 80 && allBosses;

  return `
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h2 class="text-2xl font-black text-navy">🏆 ${t('profile.title')}</h2>

      <!-- Level Card -->
      <div class="bg-gradient-to-r from-coral to-coral-light rounded-2xl p-5 text-white">
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold text-lg">${levelInfo.name[lang]}</span>
          <span class="text-white/80 text-sm">Lv.${state.level}</span>
        </div>
        <div class="h-2 bg-white/20 rounded-full overflow-hidden mb-1">
          <div class="h-full bg-white rounded-full" style="width: ${Math.round(levelInfo.progress * 100)}%"></div>
        </div>
        <div class="text-xs text-white/60">${state.xp} / ${levelInfo.nextThreshold || '∞'} XP</div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-xl p-4 shadow-sm text-center">
          <div class="text-2xl font-black text-navy">${state.gamesPlayed}</div>
          <div class="text-xs text-navy/40">${t('profile.gamesPlayed')}</div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm text-center">
          <div class="text-2xl font-black text-navy">${accuracy}%</div>
          <div class="text-xs text-navy/40">${t('profile.accuracy')}</div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm text-center">
          <div class="text-2xl font-black text-coral">🔥 ${state.bestStreak}</div>
          <div class="text-xs text-navy/40">${t('profile.bestStreak')}</div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm text-center">
          <div class="text-2xl font-black text-navy">${state.xp}</div>
          <div class="text-xs text-navy/40">${t('profile.totalXP')}</div>
        </div>
      </div>

      <!-- Certification Status -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <h3 class="font-bold text-navy mb-3">🎓 ${t('profile.certification')}</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="${masteryPct >= 80 ? 'text-mint' : 'text-navy/20'}">${masteryPct >= 80 ? '✅' : '⬜'}</span>
            <span class="text-sm text-navy">80%+ mastery (${masteryPct}%)</span>
          </div>
          ${[1,2,3,4].map(w => `
            <div class="flex items-center gap-2">
              <span class="${state.bossesCompleted.includes(w) ? 'text-mint' : 'text-navy/20'}">${state.bossesCompleted.includes(w) ? '✅' : '⬜'}</span>
              <span class="text-sm text-navy">Boss Battle ${w} ${state.bossesCompleted.includes(w) ? 'passed' : ''}</span>
            </div>
          `).join('')}
        </div>
        ${isReady ? `<div class="mt-3 p-3 bg-mint/10 rounded-xl text-center text-mint font-bold">🎓 ${t('profile.certReady')}</div>` : ''}
      </div>

      <!-- Badges -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <h3 class="font-bold text-navy mb-3">${t('profile.badges')} (${state.badges.length}/${BADGES.length})</h3>
        <div class="grid grid-cols-4 gap-3">
          ${BADGES.map(badge => {
            const earned = state.badges.includes(badge.id);
            return `
              <div class="flex flex-col items-center gap-1 ${earned ? '' : 'opacity-30'}" title="${bilingual(badge.desc)}">
                <span class="text-2xl">${badge.icon}</span>
                <span class="text-[10px] text-center text-navy/60 leading-tight">${bilingual(badge.name)}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Mastery Grid -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <h3 class="font-bold text-navy mb-3">${t('profile.mastery')} (${stats.mastered}/${stats.total})</h3>
        <div class="flex flex-wrap gap-1">
          ${getTermMasteryGrid().map(item => {
            const colors = ['bg-gray-200', 'bg-yellow-200', 'bg-yellow-300', 'bg-orange-300', 'bg-coral-light', 'bg-mint'];
            return `<div class="w-4 h-4 rounded-sm ${colors[item.mastery.stars]}" title="${item.label} (${item.zh}) — ${item.mastery.stars}⭐"></div>`;
          }).join('')}
          ${getCommandMasteryGrid().map(item => {
            const colors = ['bg-gray-200', 'bg-yellow-200', 'bg-yellow-300', 'bg-orange-300', 'bg-coral-light', 'bg-mint'];
            return `<div class="w-4 h-4 rounded-sm ${colors[item.mastery.stars]}" title="${item.label} — ${item.mastery.stars}⭐"></div>`;
          }).join('')}
        </div>
        <div class="flex gap-3 mt-3 text-[10px] text-navy/40">
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-gray-200 inline-block"></span> 0⭐</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-orange-300 inline-block"></span> 3⭐</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-mint inline-block"></span> 5⭐</span>
        </div>
      </div>
    </div>
  `;
}

export function init() {}
