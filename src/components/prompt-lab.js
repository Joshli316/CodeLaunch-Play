/**
 * Game 4: Prompt Lab 提示词工坊 — Drag-and-drop prompt builder
 */
import { t, bilingual } from '../i18n.js';
import { getState } from '../state.js';
import { getRandomExercise } from '../content/prompts-data.js';
import { getDayContent } from '../content/curriculum.js';
import { awardGameCompletion, getStarRating } from '../engine/scoring.js';
import { checkAchievements } from '../engine/achievements.js';
import { playWrong, playComplete } from '../audio.js';
import { createStopwatch, formatTime } from '../engine/timer.js';
import { navigate } from '../router.js';
import { refreshNav } from './nav.js';

let gameState = null;

export function render() {
  return `
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-4">
        <button id="pl-back" class="text-navy/50 hover:text-navy">← ${t('game.back')}</button>
        <h2 class="font-bold text-navy">✍️ ${t('games.promptLab')}</h2>
        <div id="pl-timer" class="font-mono text-sm text-navy/50">0:00</div>
      </div>
      <div id="pl-difficulty" class="flex gap-2 justify-center mb-6">
        <button data-diff="easy" class="px-4 py-2 rounded-xl bg-coral text-white font-bold text-sm">${t('game.easy')}</button>
        <button data-diff="medium" class="px-4 py-2 rounded-xl bg-cream-dark text-navy font-bold text-sm">${t('game.medium')}</button>
        <button data-diff="hard" class="px-4 py-2 rounded-xl bg-cream-dark text-navy font-bold text-sm">${t('game.hard')}</button>
      </div>
      <div id="pl-content"></div>
      <div id="pl-result" class="hidden text-center py-8"></div>
    </div>
  `;
}

export function init() {
  document.getElementById('pl-back').addEventListener('click', () => navigate('/home'));
  document.getElementById('pl-difficulty').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-diff]');
    if (btn) startGame(btn.dataset.diff);
  });
  startGame('easy');
}

function startGame(difficulty) {
  const state = getState();
  const dayContent = getDayContent(state.currentDay);
  const exercise = getRandomExercise(difficulty, dayContent.week);

  if (!exercise) {
    document.getElementById('pl-content').innerHTML = '<p class="text-center text-navy/50">No exercises available for this difficulty yet.</p>';
    return;
  }

  // Shuffle fragments
  const shuffledIndices = exercise.correctOrder.map((_, i) => i).sort(() => Math.random() - 0.5);

  gameState = {
    exercise,
    difficulty,
    placed: [],       // indices in drop zone
    available: shuffledIndices, // indices in source
    stopwatch: createStopwatch(),
    checked: false,
    roundsPlayed: 0,
    totalScore: 0,
  };

  gameState.stopwatch.start();

  // Update buttons
  document.querySelectorAll('#pl-difficulty button').forEach(btn => {
    btn.className = btn.dataset.diff === difficulty
      ? 'px-4 py-2 rounded-xl bg-coral text-white font-bold text-sm'
      : 'px-4 py-2 rounded-xl bg-cream-dark text-navy font-bold text-sm';
  });

  document.getElementById('pl-result').classList.add('hidden');
  updateTimer();
  renderExercise();
}

function updateTimer() {
  if (!gameState) return;
  const el = document.getElementById('pl-timer');
  if (el) {
    el.textContent = formatTime(gameState.stopwatch.getElapsed());
    if (!gameState.checked) requestAnimationFrame(updateTimer);
  }
}

function renderExercise() {
  const ex = gameState.exercise;
  const content = document.getElementById('pl-content');

  content.innerHTML = `
    <div class="bg-white rounded-2xl p-5 shadow-sm mb-4">
      <div class="text-xs text-navy/40 mb-1">${t('promptLab.goal')}</div>
      <p class="text-navy font-medium">${bilingual(ex.goal)}</p>
    </div>

    <div class="text-xs text-navy/40 mb-2">${t('promptLab.dropZone')}</div>
    <div id="pl-dropzone" class="min-h-[100px] bg-cream-dark/50 rounded-2xl p-3 mb-4 border-2 border-dashed border-navy/10 flex flex-wrap gap-2">
      ${gameState.placed.map(idx => `
        <button class="pl-chip px-3 py-2 bg-coral text-white rounded-lg text-sm font-medium" data-idx="${idx}" data-zone="drop">
          ${ex.fragments[idx]}
        </button>
      `).join('')}
      ${gameState.placed.length === 0 ? `<span class="text-navy/20 text-sm m-auto">${t('promptLab.fragments')}</span>` : ''}
    </div>

    <div class="text-xs text-navy/40 mb-2">${t('promptLab.fragments')}</div>
    <div id="pl-source" class="flex flex-wrap gap-2 mb-6">
      ${gameState.available.map(idx => `
        <button class="pl-chip px-3 py-2 bg-white border-2 border-cream-dark rounded-lg text-sm font-medium text-navy hover:border-coral transition-colors" data-idx="${idx}" data-zone="source">
          ${ex.fragments[idx]}
        </button>
      `).join('')}
    </div>

    <div class="flex gap-3 justify-center">
      <button id="pl-check" class="px-6 py-3 bg-coral text-white rounded-xl font-bold ${gameState.placed.length === 0 ? 'opacity-50' : ''}">${t('promptLab.check')}</button>
      <button id="pl-show" class="px-6 py-3 bg-cream-dark text-navy rounded-xl font-bold">${t('promptLab.showAnswer')}</button>
    </div>
  `;

  // Chip click handlers — tap to move between zones
  content.querySelectorAll('.pl-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const idx = parseInt(chip.dataset.idx);
      const zone = chip.dataset.zone;
      if (zone === 'source') {
        gameState.available = gameState.available.filter(i => i !== idx);
        gameState.placed.push(idx);
      } else {
        gameState.placed = gameState.placed.filter(i => i !== idx);
        gameState.available.push(idx);
      }
      renderExercise();
    });
  });

  document.getElementById('pl-check')?.addEventListener('click', checkAnswer);
  document.getElementById('pl-show')?.addEventListener('click', showAnswer);
}

function checkAnswer() {
  if (gameState.placed.length === 0) return;
  gameState.checked = true;
  gameState.stopwatch.pause();

  const ex = gameState.exercise;
  const correct = ex.correctOrder;
  let score = 0;

  // Score: count how many are in correct position
  for (let i = 0; i < correct.length; i++) {
    if (gameState.placed[i] === correct[i]) score++;
  }

  const pct = Math.round((score / correct.length) * 100);
  const stars = getStarRating(score, correct.length);

  const result = awardGameCompletion('prompt-lab', score, correct.length, 0, gameState.stopwatch.getElapsed());
  const badges = checkAchievements({ game: 'prompt-lab', difficulty: gameState.difficulty, scorePercent: pct });

  if (pct >= 70) playComplete(); else playWrong();
  refreshNav();

  const correctPrompt = correct.map(i => ex.fragments[i]).join(' ');

  document.getElementById('pl-content').classList.add('hidden');
  const resultEl = document.getElementById('pl-result');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `
    <div class="space-y-4">
      <h3 class="text-2xl font-black text-navy">${pct >= 70 ? t('game.correct') : t('game.wrong')}</h3>
      <div class="text-4xl">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
      <div class="text-sm text-navy/60">${t('game.accuracy')}: ${pct}%</div>
      <div class="bg-mint/10 rounded-xl p-4 text-left">
        <div class="text-xs text-mint font-bold mb-1">Correct prompt:</div>
        <p class="text-navy font-mono text-sm">${correctPrompt}</p>
      </div>
      <div class="bg-cream-dark rounded-xl p-4 text-left">
        <div class="text-xs text-navy/40 font-bold mb-1">Your prompt:</div>
        <p class="text-navy font-mono text-sm">${gameState.placed.map(i => ex.fragments[i]).join(' ')}</p>
      </div>
      ${result.levelUp ? '<div class="text-coral font-bold text-lg">🎉 Level Up!</div>' : ''}
      ${badges.length > 0 ? badges.map(b => `<div class="text-mint font-bold">${b.icon} ${bilingual(b.name)}</div>`).join('') : ''}
      <div class="flex gap-3 justify-center">
        <button onclick="location.hash='#/game/prompt-lab'" class="px-6 py-3 bg-coral text-white rounded-xl font-bold">${t('game.playAgain')}</button>
        <button onclick="location.hash='#/home'" class="px-6 py-3 bg-cream-dark text-navy rounded-xl font-bold">${t('game.back')}</button>
      </div>
    </div>
  `;
}

function showAnswer() {
  const ex = gameState.exercise;
  const correctPrompt = ex.correctOrder.map(i => ex.fragments[i]).join(' ');
  const content = document.getElementById('pl-content');
  const existing = document.getElementById('pl-answer-reveal');
  if (existing) return;
  content.insertAdjacentHTML('beforeend', `
    <div id="pl-answer-reveal" class="bg-mint/10 rounded-xl p-4 mt-4">
      <div class="text-xs text-mint font-bold mb-1">Correct prompt:</div>
      <p class="text-navy font-mono text-sm">${correctPrompt}</p>
    </div>
  `);
}
