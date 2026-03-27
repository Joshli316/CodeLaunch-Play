/**
 * Game 3: Term Sprint 术语冲刺 — 60-second speed quiz
 */
import { t, bilingual } from '../i18n.js';
import { getState, useHeart, getHearts } from '../state.js';
import { glossaryTerms } from '../content/glossary-data.js';
import { getDayContent } from '../content/curriculum.js';
import { createTimer, formatTime } from '../engine/timer.js';
import { awardGameCompletion, getComboMultiplier } from '../engine/scoring.js';
import { reviewTerm } from '../engine/spaced-repetition.js';
import { checkAchievements } from '../engine/achievements.js';
import { playCorrect, playWrong, playComplete } from '../audio.js';
import { navigate } from '../router.js';
import { refreshNav } from './nav.js';

let gameState = null;

export function render() {
  return `
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-4">
        <button id="ts-back" class="text-navy/50 hover:text-navy">← ${t('game.back')}</button>
        <h2 class="font-bold text-navy">⚡ ${t('games.termSprint')}</h2>
        <div id="ts-timer" class="font-mono text-xl font-bold text-coral">60s</div>
      </div>
      <!-- Mode selection -->
      <div id="ts-modes" class="flex gap-2 justify-center mb-6">
        <button data-mode="en2cn" class="px-3 py-1.5 rounded-lg bg-coral text-white font-bold text-sm">EN → 中</button>
        <button data-mode="cn2en" class="px-3 py-1.5 rounded-lg bg-cream-dark text-navy font-bold text-sm">中 → EN</button>
        <button data-mode="mixed" class="px-3 py-1.5 rounded-lg bg-cream-dark text-navy font-bold text-sm">Mixed</button>
      </div>
      <div id="ts-stats" class="flex justify-center gap-6 mb-4 text-sm text-navy/60 hidden">
        <span>${t('game.score')}: <strong id="ts-score">0</strong></span>
        <span>${t('game.streak')}: <strong id="ts-combo">0</strong></span>
      </div>
      <div id="ts-content"></div>
      <div id="ts-result" class="hidden text-center py-8"></div>
    </div>
  `;
}

export function init() {
  document.getElementById('ts-back').addEventListener('click', () => {
    if (gameState?.timer) gameState.timer.stop();
    navigate('/home');
  });

  document.getElementById('ts-modes').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-mode]');
    if (btn) startGame(btn.dataset.mode);
  });

  startGame('en2cn');
}

function startGame(mode) {
  if (gameState?.timer) gameState.timer.stop();

  const state = getState();
  const dayContent = getDayContent(state.currentDay);
  const weekTerms = glossaryTerms.filter(t => t.week <= dayContent.week);

  gameState = {
    mode,
    terms: weekTerms,
    correct: 0,
    wrong: 0,
    combo: 0,
    maxCombo: 0,
    totalAnswered: 0,
    timer: null,
    active: true,
  };

  // Update mode buttons
  document.querySelectorAll('#ts-modes button').forEach(btn => {
    btn.className = btn.dataset.mode === mode
      ? 'px-3 py-1.5 rounded-lg bg-coral text-white font-bold text-sm'
      : 'px-3 py-1.5 rounded-lg bg-cream-dark text-navy font-bold text-sm';
  });

  document.getElementById('ts-stats').classList.remove('hidden');
  document.getElementById('ts-result').classList.add('hidden');
  document.getElementById('ts-content').classList.remove('hidden');
  document.getElementById('ts-score').textContent = '0';
  document.getElementById('ts-combo').textContent = '0';

  gameState.timer = createTimer(60000,
    (remaining) => {
      const el = document.getElementById('ts-timer');
      if (el) {
        el.textContent = formatTime(remaining);
        if (remaining < 10000) el.classList.add('text-red-500', 'timer-pulse');
      }
    },
    () => endGame()
  );
  gameState.timer.start();
  showQuestion();
}

function showQuestion() {
  if (!gameState.active) return;

  const terms = gameState.terms;
  const idx = Math.floor(Math.random() * terms.length);
  const term = terms[idx];

  // Determine direction
  let direction = gameState.mode;
  if (direction === 'mixed') direction = Math.random() > 0.5 ? 'en2cn' : 'cn2en';

  const questionText = direction === 'en2cn' ? term.en : term.zh;
  const correctAnswer = direction === 'en2cn' ? term.definition.zh : term.definition.en;

  // Generate wrong options
  const wrongTerms = terms.filter(t => t.en !== term.en).sort(() => Math.random() - 0.5).slice(0, 3);
  const wrongOptions = wrongTerms.map(t => direction === 'en2cn' ? t.definition.zh : t.definition.en);

  const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);

  const content = document.getElementById('ts-content');
  content.innerHTML = `
    <div class="text-center mb-6">
      <div class="text-3xl font-black text-navy ${direction === 'en2cn' ? 'font-mono' : ''}">${questionText}</div>
      ${gameState.combo >= 3 ? `<div class="text-coral font-bold text-sm mt-2">${t('game.combo', { n: gameState.combo })} x${getComboMultiplier(gameState.combo)}</div>` : ''}
    </div>
    <div class="space-y-3" id="ts-options">
      ${allOptions.map(opt => `
        <button class="ts-option w-full text-left px-5 py-3 rounded-xl bg-white border-2 border-cream-dark hover:border-coral transition-all text-sm text-navy slide-in"
          data-correct="${opt === correctAnswer}">${opt}</button>
      `).join('')}
    </div>
  `;

  document.getElementById('ts-options').addEventListener('click', (e) => {
    const btn = e.target.closest('.ts-option');
    if (!btn || !gameState.active) return;

    const isCorrect = btn.dataset.correct === 'true';
    gameState.totalAnswered++;

    document.querySelectorAll('.ts-option').forEach(b => {
      if (b.dataset.correct === 'true') b.classList.add('border-mint', 'bg-mint/10');
      else if (b === btn && !isCorrect) b.classList.add('border-red-400', 'bg-red-50', 'shake');
      b.disabled = true;
    });

    if (isCorrect) {
      gameState.correct++;
      gameState.combo++;
      if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
      playCorrect();
      reviewTerm(`term:${term.en}`, true);
    } else {
      gameState.wrong++;
      gameState.combo = 0;
      playWrong();
      useHeart();
      reviewTerm(`term:${term.en}`, false);
    }

    document.getElementById('ts-score').textContent = gameState.correct;
    document.getElementById('ts-combo').textContent = gameState.combo;

    setTimeout(showQuestion, 600);
  });
}

function endGame() {
  gameState.active = false;
  playComplete();

  const result = awardGameCompletion('term-sprint', gameState.correct, gameState.totalAnswered, gameState.maxCombo, 60000);
  const badges = checkAchievements({ game: 'term-sprint', maxStreak: gameState.maxCombo });

  refreshNav();

  document.getElementById('ts-content').classList.add('hidden');
  document.getElementById('ts-timer').textContent = '0s';
  const resultEl = document.getElementById('ts-result');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `
    <div class="space-y-4">
      <h3 class="text-2xl font-black text-navy">${t('game.complete')}</h3>
      <div class="text-5xl font-black text-coral">${gameState.correct}</div>
      <div class="text-navy/50 text-sm">${t('game.accuracy')}: ${gameState.totalAnswered > 0 ? Math.round((gameState.correct / gameState.totalAnswered) * 100) : 0}%</div>
      <div class="flex justify-center gap-6 text-sm">
        <div><span class="text-navy/50">${t('game.streak')}</span><br><strong>${gameState.maxCombo}</strong></div>
        <div><span class="text-navy/50">Total</span><br><strong>${gameState.totalAnswered}</strong></div>
      </div>
      ${result.levelUp ? '<div class="text-coral font-bold text-lg">🎉 Level Up!</div>' : ''}
      ${badges.length > 0 ? badges.map(b => `<div class="text-mint font-bold">${b.icon} ${bilingual(b.name)}</div>`).join('') : ''}
      <div class="flex gap-3 justify-center">
        <button onclick="location.hash='#/game/term-sprint'" class="px-6 py-3 bg-coral text-white rounded-xl font-bold">${t('game.playAgain')}</button>
        <button onclick="location.hash='#/home'" class="px-6 py-3 bg-cream-dark text-navy rounded-xl font-bold">${t('game.back')}</button>
      </div>
    </div>
  `;
}
