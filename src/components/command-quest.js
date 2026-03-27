/**
 * Game 2: Command Quest 命令闯关 — Scenario-based multiple choice
 */
import { t, bilingual } from '../i18n.js';
import { getState, useHeart, getHearts } from '../state.js';
import { getRandomScenarios } from '../content/scenarios-data.js';
import { getDayContent } from '../content/curriculum.js';
import { awardGameCompletion, getStarRating } from '../engine/scoring.js';
import { reviewTerm } from '../engine/spaced-repetition.js';
import { checkAchievements } from '../engine/achievements.js';
import { playCorrect, playWrong, playComplete } from '../audio.js';
import { createStopwatch, formatTime } from '../engine/timer.js';
import { navigate } from '../router.js';
import { refreshNav } from './nav.js';
import { renderGameResult } from './game-result.js';

let gameState = null;

export function render() {
  return `
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-6">
        <button id="cq-back" class="text-navy/50 hover:text-navy">← ${t('game.back')}</button>
        <h2 class="font-bold text-navy">🎯 ${t('games.commandQuest')}</h2>
        <div id="cq-hearts" class="text-sm"></div>
      </div>
      <div id="cq-progress" class="h-2 bg-cream-dark rounded-full mb-6 overflow-hidden">
        <div id="cq-progress-bar" class="h-full bg-coral rounded-full transition-all duration-300" style="width: 0%"></div>
      </div>
      <div id="cq-content"></div>
      <div id="cq-result" class="hidden text-center py-8"></div>
    </div>
  `;
}

export function init() {
  document.getElementById('cq-back').addEventListener('click', () => navigate('/home'));
  startGame();
}

function startGame() {
  const state = getState();
  const dayContent = getDayContent(state.currentDay);
  const scenarios = getRandomScenarios(10, dayContent.week);

  gameState = {
    scenarios,
    currentIndex: 0,
    correct: 0,
    combo: 0,
    maxCombo: 0,
    stopwatch: createStopwatch(),
    answered: false,
  };

  gameState.stopwatch.start();
  updateHearts();
  renderQuestion();
}

function updateHearts() {
  const hearts = getHearts();
  document.getElementById('cq-hearts').innerHTML =
    Array.from({length: 5}, (_, i) => `<span class="${i < hearts ? 'text-red-500' : 'text-gray-300'}">♥</span>`).join('');
}

function renderQuestion() {
  if (gameState.currentIndex >= gameState.scenarios.length) {
    endGame();
    return;
  }

  const scenario = gameState.scenarios[gameState.currentIndex];
  const progress = ((gameState.currentIndex) / gameState.scenarios.length) * 100;
  document.getElementById('cq-progress-bar').style.width = `${progress}%`;

  // Shuffle options
  const options = [...scenario.options].sort(() => Math.random() - 0.5);

  const content = document.getElementById('cq-content');
  content.innerHTML = `
    <div class="bg-white rounded-2xl p-6 shadow-sm mb-4">
      <div class="text-xs text-navy/40 mb-2">${t('game.question', { a: gameState.currentIndex + 1, b: gameState.scenarios.length })}</div>
      <p class="text-navy font-medium leading-relaxed">${bilingual(scenario.scenario)}</p>
    </div>
    <div class="space-y-3" id="cq-options">
      ${options.map((opt, i) => `
        <button class="cq-option w-full text-left px-5 py-4 rounded-xl bg-white border-2 border-cream-dark hover:border-coral transition-all font-mono text-sm font-bold text-navy"
          data-answer="${opt}">
          ${String.fromCharCode(65 + i)}) ${opt}
        </button>
      `).join('')}
    </div>
    ${gameState.combo >= 3 ? `<div class="text-center mt-3 text-coral font-bold">${t('game.combo', { n: gameState.combo })}</div>` : ''}
  `;

  gameState.answered = false;

  document.getElementById('cq-options').addEventListener('click', (e) => {
    const btn = e.target.closest('.cq-option');
    if (!btn || gameState.answered) return;
    gameState.answered = true;

    const answer = btn.dataset.answer;
    const correct = answer === scenario.answer;

    // Highlight correct/wrong
    document.querySelectorAll('.cq-option').forEach(b => {
      if (b.dataset.answer === scenario.answer) {
        b.classList.remove('border-cream-dark');
        b.classList.add('border-mint', 'bg-mint/10');
      } else if (b === btn && !correct) {
        b.classList.remove('border-cream-dark');
        b.classList.add('border-red-400', 'bg-red-50', 'shake');
      }
      b.disabled = true;
    });

    if (correct) {
      gameState.correct++;
      gameState.combo++;
      if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
      playCorrect();
      reviewTerm(`cmd:${scenario.answer}`, true);
    } else {
      gameState.combo = 0;
      playWrong();
      useHeart();
      updateHearts();
      reviewTerm(`cmd:${scenario.answer}`, false);
    }

    setTimeout(() => {
      gameState.currentIndex++;
      renderQuestion();
    }, 1200);
  });
}

function endGame() {
  gameState.stopwatch.pause();
  const elapsed = gameState.stopwatch.getElapsed();
  const total = gameState.scenarios.length;
  const stars = getStarRating(gameState.correct, total);

  const result = awardGameCompletion('command-quest', gameState.correct, total, gameState.maxCombo, elapsed);
  const badges = checkAchievements({ game: 'command-quest', correct: gameState.correct, total, maxCombo: gameState.maxCombo });

  playComplete();
  refreshNav();

  document.getElementById('cq-content').classList.add('hidden');
  document.getElementById('cq-progress-bar').style.width = '100%';
  const resultEl = document.getElementById('cq-result');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = renderGameResult({
    title: t('game.complete'),
    stars,
    stats: [
      { label: t('game.accuracy'), value: `${Math.round((gameState.correct / total) * 100)}%` },
      { label: t('game.score'), value: `${gameState.correct}/${total}` },
      { label: t('game.time'), value: formatTime(elapsed) },
    ],
    result, badges,
    replayRoute: '#/game/command-quest',
  });
}
