/**
 * Game 6: Boss Battle 终极挑战 — Weekly comprehensive test
 */
import { t, bilingual } from '../i18n.js';
import { getState, updateState } from '../state.js';
import { glossaryTerms } from '../content/glossary-data.js';
import { commands } from '../content/commands-data.js';
import { getRandomScenarios } from '../content/scenarios-data.js';
import { createTimer, formatTime } from '../engine/timer.js';
import { awardGameCompletion } from '../engine/scoring.js';
import { reviewTerm } from '../engine/spaced-repetition.js';
import { checkAchievements } from '../engine/achievements.js';
import { playCorrect, playWrong, playLevelUp } from '../audio.js';
import { navigate } from '../router.js';
import { refreshNav } from './nav.js';
import { renderGameResult } from './game-result.js';

let gameState = null;

export function render() {
  return `
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div id="bb-content"></div>
    </div>
  `;
}

export function init() {
  showIntro();
  return () => {
    if (gameState?.timer) gameState.timer.stop();
    gameState = null;
  };
}

function showIntro() {
  const state = getState();
  const week = Math.ceil(state.currentDay / 7);

  document.getElementById('bb-content').innerHTML = `
    <div class="text-center py-12 space-y-6">
      <div class="text-6xl">⚔️</div>
      <h2 class="text-3xl font-black text-navy">${t('boss.title')}</h2>
      <p class="text-coral font-bold text-xl">${t('boss.week', { n: week })}</p>
      <p class="text-navy/50">${t('boss.passRate')}</p>
      <div class="text-sm text-navy/40">${t('boss.questionCount')}</div>
      <div class="flex gap-3 justify-center">
        <button id="bb-start" class="px-8 py-4 bg-coral text-white rounded-xl font-bold text-lg boss-glow">${t('game.start')}</button>
        <button id="bb-back" class="px-6 py-4 bg-cream-dark text-navy rounded-xl font-bold">${t('game.back')}</button>
      </div>
    </div>
  `;

  document.getElementById('bb-start').addEventListener('click', startBattle);
  document.getElementById('bb-back').addEventListener('click', () => navigate('/home'));
}

function startBattle() {
  const state = getState();
  const week = Math.ceil(state.currentDay / 7);
  const weekTerms = glossaryTerms.filter(t => t.week <= week);
  const weekCommands = commands.filter(c => c.week <= week);
  const scenarios = getRandomScenarios(6, week);

  // Generate 20 questions: mix of types
  const questions = [];

  // 7 term definition questions
  const shuffledTerms = [...weekTerms].sort(() => Math.random() - 0.5).slice(0, 7);
  shuffledTerms.forEach(term => {
    const wrongTerms = weekTerms.filter(t => t.en !== term.en).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [term.definition.zh, ...wrongTerms.map(t => t.definition.zh)].sort(() => Math.random() - 0.5);
    questions.push({
      type: 'term',
      question: term.en,
      options,
      answer: term.definition.zh,
      termKey: `term:${term.en}`,
    });
  });

  // 7 scenario questions
  scenarios.forEach(s => {
    const opts = [...s.options].sort(() => Math.random() - 0.5);
    questions.push({
      type: 'scenario',
      question: bilingual(s.scenario),
      options: opts,
      answer: s.answer,
      termKey: `cmd:${s.answer}`,
    });
  });

  // 6 command description matching
  const shuffledCmds = [...weekCommands].sort(() => Math.random() - 0.5).slice(0, 6);
  shuffledCmds.forEach(cmd => {
    const wrongCmds = weekCommands.filter(c => c.command !== cmd.command).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [cmd.command, ...wrongCmds.map(c => c.command)].sort(() => Math.random() - 0.5);
    questions.push({
      type: 'command',
      question: bilingual(cmd.description),
      options,
      answer: cmd.command,
      termKey: `cmd:${cmd.command}`,
    });
  });

  // Shuffle all questions
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  gameState = {
    week,
    questions: questions.slice(0, 20),
    currentIndex: 0,
    correct: 0,
    timer: null,
    answered: false,
  };

  gameState.timer = createTimer(600000,
    (remaining) => renderTimerDisplay(remaining),
    () => endBattle()
  );
  gameState.timer.start();
  renderQuestion();
}

function renderTimerDisplay(remaining) {
  const timerEl = document.querySelector('#bb-timer');
  if (timerEl) {
    timerEl.textContent = formatTime(remaining);
    if (remaining < 60000) timerEl.classList.add('text-red-500');
  }
}

function renderQuestion() {
  if (gameState.currentIndex >= gameState.questions.length) {
    endBattle();
    return;
  }

  const q = gameState.questions[gameState.currentIndex];
  const progress = (gameState.currentIndex / gameState.questions.length) * 100;

  const typeLabel = { term: t('boss.typeTerm'), scenario: t('boss.typeScenario'), command: t('boss.typeCommand') }[q.type];

  document.getElementById('bb-content').innerHTML = `
    <div class="boss-bg rounded-2xl p-6">
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs text-white/60">${t('game.question', { a: gameState.currentIndex + 1, b: gameState.questions.length })}</span>
        <span id="bb-timer" class="font-mono text-white font-bold">10:00</span>
      </div>
      <div class="h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
        <div class="h-full bg-coral rounded-full transition-all" style="width: ${progress}%"></div>
      </div>
      <div class="text-xs text-coral font-bold mb-2">${typeLabel}</div>
      <p class="text-white font-medium text-lg mb-6 ${q.type === 'term' ? 'font-mono' : ''}">${q.question}</p>
      <div class="space-y-3" id="bb-options">
        ${q.options.map(opt => `
          <button class="bb-option w-full text-left px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all font-mono text-sm"
            data-answer="${opt}">${opt}</button>
        `).join('')}
      </div>
      <div class="text-center mt-4">
        <span class="text-white/40 text-sm">${t('game.score')}: ${gameState.correct}/${gameState.currentIndex}</span>
      </div>
    </div>
  `;

  gameState.answered = false;

  document.getElementById('bb-options').addEventListener('click', (e) => {
    const btn = e.target.closest('.bb-option');
    if (!btn || gameState.answered) return;
    gameState.answered = true;

    const answer = btn.dataset.answer;
    const correct = answer === q.answer;

    document.querySelectorAll('.bb-option').forEach(b => {
      if (b.dataset.answer === q.answer) b.classList.add('bg-mint/30', 'border-mint');
      else if (b === btn && !correct) b.classList.add('bg-red-500/30', 'border-red-400', 'shake');
      b.disabled = true;
    });

    if (correct) {
      gameState.correct++;
      playCorrect();
      reviewTerm(q.termKey, true);
    } else {
      playWrong();
      reviewTerm(q.termKey, false);
    }

    setTimeout(() => {
      gameState.currentIndex++;
      renderQuestion();
    }, 1000);
  });
}

function endBattle() {
  if (gameState.timer) gameState.timer.stop();

  const total = gameState.questions.length;
  const pct = Math.round((gameState.correct / total) * 100);
  const passed = pct >= 80;
  const week = gameState.week;

  if (passed) {
    const state = getState();
    if (!state.bossesCompleted.includes(week)) {
      state.bossesCompleted.push(week);
      // Unlock next week
      const newDay = Math.max(state.currentDay, week * 7 + 1);
      if (newDay <= 30) state.currentDay = newDay;
      updateState(state);
    }
    playLevelUp();
  } else {
    playWrong();
  }

  const result = awardGameCompletion('boss-battle', gameState.correct, total, 0, 600000);
  const badges = checkAchievements({ game: 'boss-battle', passed, week });
  refreshNav();

  document.getElementById('bb-content').innerHTML = renderGameResult({
    title: passed ? t('game.passed') : t('game.failed'),
    heroContent: `
      <div class="text-6xl">${passed ? '🏆' : '💪'}</div>
      <div class="text-5xl font-black text-coral">${pct}%</div>
      <p class="text-navy/50">${gameState.correct}/${total} ${t('boss.correct')}</p>
      ${passed ? `<p class="text-mint font-bold">${t('boss.unlockNext')}</p>` : `<p class="text-navy/50">${t('boss.passRate')}</p>`}
    `,
    result, badges,
    replayRoute: !passed ? '#/game/boss-battle' : null,
    replayLabel: t('game.tryAgain'),
  });
}
