/**
 * Home Dashboard
 */
import { t } from '../i18n.js';
import { getState, getLevelInfo } from '../state.js';
import { getMasteryStats } from '../engine/mastery.js';
import { getDayContent } from '../content/curriculum.js';
import { navigate } from '../router.js';

export function render() {
  const state = getState();
  const levelInfo = getLevelInfo();
  const stats = getMasteryStats();
  const dayContent = getDayContent(state.currentDay);
  const lang = state.settings.language;
  const today = new Date().toDateString();
  const dailyDone = state.dailyChallengeDate === today;

  // Progress ring values
  const dailyGoal = 3; // games per day
  const todayGames = state.gameHistory.filter(g => new Date(g.date).toDateString() === today).length;
  const progress = Math.min(1, todayGames / dailyGoal);
  const circumference = 2 * Math.PI * 45;
  const strokeOffset = circumference * (1 - progress);

  return `
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <!-- Welcome + Level -->
      <div class="text-center">
        <h1 class="text-2xl font-black text-navy">${t('home.welcome')}</h1>
        <p class="text-coral font-bold">${levelInfo.name[lang]} · ${t('home.day', { n: state.currentDay })}</p>
      </div>

      <!-- Progress Ring + Stats -->
      <div class="flex items-center justify-center gap-8">
        <div class="relative">
          <svg width="120" height="120" class="transform -rotate-90">
            <circle cx="60" cy="60" r="45" fill="none" stroke="#F5EDE3" stroke-width="8"/>
            <circle cx="60" cy="60" r="45" fill="none" stroke="#FF6B4A" stroke-width="8"
              stroke-dasharray="${circumference}" stroke-dashoffset="${strokeOffset}"
              stroke-linecap="round" class="progress-ring-circle"/>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-2xl font-black text-navy">${todayGames}/${dailyGoal}</span>
            <span class="text-xs text-navy/50">${t('home.todayProgress')}</span>
          </div>
        </div>
        <div class="space-y-3">
          <div>
            <div class="text-2xl font-black text-navy">${stats.learning}</div>
            <div class="text-xs text-navy/50">${t('home.termsLearned')}</div>
          </div>
          <div>
            <div class="text-2xl font-black text-coral">🔥 ${state.streak}</div>
            <div class="text-xs text-navy/50">${t('topbar.streak')}</div>
          </div>
        </div>
      </div>

      <!-- XP Progress Bar -->
      <div class="bg-white rounded-2xl p-4 shadow-sm">
        <div class="flex justify-between text-sm mb-2">
          <span class="font-bold text-navy">${levelInfo.name[lang]}</span>
          <span class="text-navy/50">${state.xp} / ${levelInfo.nextThreshold || '∞'} XP</span>
        </div>
        <div class="h-3 bg-cream-dark rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-coral to-coral-light rounded-full transition-all duration-500" style="width: ${Math.round(levelInfo.progress * 100)}%"></div>
        </div>
      </div>

      <!-- Daily Challenge Card -->
      <button id="daily-challenge-btn" class="w-full bg-gradient-to-r from-coral to-coral-light rounded-2xl p-5 text-left text-white shadow-lg hover:shadow-xl transition-shadow ${dailyDone ? 'opacity-60' : ''}">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-lg">${dailyDone ? '✅ ' : '⚡ '}${t('home.dailyChallenge')}</h3>
            <p class="text-white/80 text-sm mt-1">${dailyDone ? t('daily.completed') : t('home.day', { n: state.currentDay })}</p>
          </div>
          ${!dailyDone ? '<span class="text-3xl">→</span>' : ''}
        </div>
      </button>

      <!-- Week Progress -->
      <div class="bg-white rounded-2xl p-4 shadow-sm">
        <h3 class="font-bold text-navy mb-3">${t('home.weekProgress')} — ${t('boss.week', { n: dayContent.week })}</h3>
        <div class="flex gap-1">
          ${Array.from({length: 7}, (_, i) => {
            const dayNum = (dayContent.week - 1) * 7 + i + 1;
            const dayInWeek = ((state.currentDay - 1) % 7);
            const isPast = i < dayInWeek;
            const isCurrent = i === dayInWeek;
            const isBoss = i === 6;
            return `
              <div class="flex-1 flex flex-col items-center gap-1">
                <div class="w-full h-2 rounded-full ${isPast ? 'bg-mint' : isCurrent ? 'bg-coral' : 'bg-cream-dark'}"></div>
                <span class="text-[10px] ${isCurrent ? 'font-bold text-coral' : 'text-navy/30'}">${isBoss ? '⚔️' : dayNum}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Game Cards Grid -->
      <div>
        <h3 class="font-bold text-navy mb-3">${t('games.title')}</h3>
        <div class="grid grid-cols-2 gap-3">
          ${renderGameCard('flash-match', '🃏', 'games.flashMatch', 'games.flashMatchDesc', dayContent)}
          ${renderGameCard('term-sprint', '⚡', 'games.termSprint', 'games.termSprintDesc', dayContent)}
          ${renderGameCard('command-quest', '🎯', 'games.commandQuest', 'games.commandQuestDesc', dayContent)}
          ${renderGameCard('prompt-lab', '✍️', 'games.promptLab', 'games.promptLabDesc', dayContent)}
          ${renderGameCard('workflow-puzzle', '🧩', 'games.workflowPuzzle', 'games.workflowPuzzleDesc', dayContent)}
          ${renderGameCard('boss-battle', '⚔️', 'games.bossBattle', 'games.bossBattleDesc', dayContent)}
        </div>
      </div>
    </div>
  `;
}

function renderGameCard(id, icon, nameKey, descKey, dayContent) {
  const unlocked = dayContent.unlockedGames.includes(id);
  const unlockDay = { 'flash-match': 1, 'term-sprint': 2, 'command-quest': 3, 'prompt-lab': 5, 'workflow-puzzle': 6, 'boss-battle': 7 }[id];
  return `
    <a href="${unlocked ? '#/game/' + id : '#/home'}" class="game-card rounded-2xl p-4 ${unlocked ? 'bg-white shadow-sm hover:shadow-md' : 'bg-cream-dark opacity-50 cursor-not-allowed'} transition-all no-underline">
      <span class="text-2xl">${icon}</span>
      <h4 class="font-bold text-navy text-sm mt-2">${t(nameKey)}</h4>
      <p class="text-[11px] text-navy/50 mt-1">${unlocked ? t(descKey) : t('games.locked', { n: unlockDay })}</p>
    </a>
  `;
}

export function init() {
  const btn = document.getElementById('daily-challenge-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const state = getState();
      const today = new Date().toDateString();
      if (state.dailyChallengeDate !== today) {
        navigate('/game/daily-challenge');
      }
    });
  }
}
