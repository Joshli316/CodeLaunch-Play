/**
 * Game 5: Workflow Puzzle 工作流拼图 — Drag-to-reorder commands
 */
import { t, bilingual } from '../i18n.js';
import { getState } from '../state.js';
import { getRandomWorkflow } from '../content/workflows-data.js';
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
        <button id="wp-back" class="text-navy/50 hover:text-navy">← ${t('game.back')}</button>
        <h2 class="font-bold text-navy">🧩 ${t('games.workflowPuzzle')}</h2>
        <div id="wp-timer" class="font-mono text-sm text-navy/50">0:00</div>
      </div>
      <div id="wp-content"></div>
      <div id="wp-result" class="hidden text-center py-8"></div>
    </div>
  `;
}

export function init() {
  document.getElementById('wp-back').addEventListener('click', () => navigate('/home'));
  startGame();
}

function startGame() {
  const state = getState();
  const dayContent = getDayContent(state.currentDay);
  const workflow = getRandomWorkflow(dayContent.week);

  if (!workflow) {
    document.getElementById('wp-content').innerHTML = '<p class="text-center text-navy/50">No workflows available yet.</p>';
    return;
  }

  // Shuffle steps
  const shuffled = workflow.steps.map((step, i) => ({ ...step, originalIndex: i }));
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  gameState = {
    workflow,
    items: shuffled,
    stopwatch: createStopwatch(),
    submitted: false,
  };

  gameState.stopwatch.start();
  document.getElementById('wp-result').classList.add('hidden');
  updateTimer();
  renderPuzzle();
}

function updateTimer() {
  if (!gameState || gameState.submitted) return;
  const el = document.getElementById('wp-timer');
  if (el) {
    el.textContent = formatTime(gameState.stopwatch.getElapsed());
    requestAnimationFrame(updateTimer);
  }
}

function renderPuzzle() {
  const wf = gameState.workflow;
  const content = document.getElementById('wp-content');
  const lang = getState().settings.language;

  content.innerHTML = `
    <div class="bg-white rounded-2xl p-5 shadow-sm mb-4">
      <div class="text-xs text-navy/40 mb-1">${t('workflow.goal')}</div>
      <h3 class="text-navy font-bold">${bilingual(wf.title)}</h3>
      <p class="text-navy/60 text-sm mt-1">${bilingual(wf.description)}</p>
    </div>

    <div class="text-xs text-navy/40 mb-2">${t('workflow.instructions')}</div>
    <div id="wp-list" class="space-y-2 mb-6">
      ${gameState.items.map((step, i) => `
        <div class="wp-item flex items-center gap-3 bg-white rounded-xl px-4 py-3 border-2 border-cream-dark cursor-move select-none" data-index="${i}">
          <span class="text-navy/30 font-bold text-lg">${i + 1}</span>
          <div class="flex-1">
            <span class="font-mono text-coral text-sm font-bold">${step.command}</span>
            <span class="text-navy/50 text-xs ml-2">${bilingual(step.description)}</span>
          </div>
          <div class="flex flex-col gap-1">
            <button class="wp-up text-navy/30 hover:text-coral text-lg leading-none" data-dir="up" data-index="${i}" aria-label="Move ${step.command} up">▲</button>
            <button class="wp-down text-navy/30 hover:text-coral text-lg leading-none" data-dir="down" data-index="${i}" aria-label="Move ${step.command} down">▼</button>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="flex justify-center">
      <button id="wp-submit" class="px-8 py-3 bg-coral text-white rounded-xl font-bold text-lg">${t('workflow.submit')}</button>
    </div>
  `;

  // Arrow button handlers
  content.querySelectorAll('.wp-up, .wp-down').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.index);
      const dir = btn.dataset.dir;
      if (dir === 'up' && idx > 0) {
        [gameState.items[idx], gameState.items[idx - 1]] = [gameState.items[idx - 1], gameState.items[idx]];
      } else if (dir === 'down' && idx < gameState.items.length - 1) {
        [gameState.items[idx], gameState.items[idx + 1]] = [gameState.items[idx + 1], gameState.items[idx]];
      }
      renderPuzzle();
    });
  });

  document.getElementById('wp-submit')?.addEventListener('click', submitAnswer);
}

function submitAnswer() {
  gameState.submitted = true;
  gameState.stopwatch.pause();
  const elapsed = gameState.stopwatch.getElapsed();

  const wf = gameState.workflow;
  let correctCount = 0;
  const totalSteps = wf.steps.length;

  gameState.items.forEach((step, i) => {
    if (step.originalIndex === i) correctCount++;
  });

  const pct = Math.round((correctCount / totalSteps) * 100);
  const stars = getStarRating(correctCount, totalSteps);
  const allCorrect = correctCount === totalSteps;

  const result = awardGameCompletion('workflow-puzzle', correctCount, totalSteps, 0, elapsed);
  const badges = checkAchievements({ game: 'workflow-puzzle', duration: elapsed, correct: allCorrect });

  if (allCorrect) playComplete(); else playWrong();
  refreshNav();

  const lang = getState().settings.language;

  document.getElementById('wp-content').classList.add('hidden');
  const resultEl = document.getElementById('wp-result');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `
    <div class="space-y-4">
      <h3 class="text-2xl font-black text-navy">${allCorrect ? t('game.correct') : t('game.complete')}</h3>
      <div class="text-4xl">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
      <div class="text-sm text-navy/60">${t('game.accuracy')}: ${pct}% · ${formatTime(elapsed)}</div>

      <div class="bg-mint/10 rounded-xl p-4 text-left">
        <div class="text-xs text-mint font-bold mb-2">${t('workflow.correctOrder')}</div>
        ${wf.steps.map((step, i) => `
          <div class="flex items-center gap-2 py-1">
            <span class="text-mint font-bold text-sm">${i + 1}.</span>
            <span class="font-mono text-coral text-sm">${step.command}</span>
            <span class="text-navy/40 text-xs">${bilingual(step.description)}</span>
          </div>
        `).join('')}
      </div>

      ${result.levelUp ? '<div class="text-coral font-bold text-lg">🎉 Level Up!</div>' : ''}
      ${badges.length > 0 ? badges.map(b => `<div class="text-mint font-bold">${b.icon} ${bilingual(b.name)}</div>`).join('') : ''}
      <div class="flex gap-3 justify-center">
        <button onclick="location.hash='#/game/workflow-puzzle'" class="px-6 py-3 bg-coral text-white rounded-xl font-bold">${t('game.playAgain')}</button>
        <button onclick="location.hash='#/home'" class="px-6 py-3 bg-cream-dark text-navy rounded-xl font-bold">${t('game.back')}</button>
      </div>
    </div>
  `;
}
