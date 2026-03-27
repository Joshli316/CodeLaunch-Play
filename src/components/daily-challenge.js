/**
 * Daily Challenge — Quick mixed mini-game
 */
import { t, bilingual } from '../i18n.js';
import { getState, updateState } from '../state.js';
import { glossaryTerms } from '../content/glossary-data.js';
import { commands } from '../content/commands-data.js';
import { getRandomScenarios } from '../content/scenarios-data.js';
import { getDayContent } from '../content/curriculum.js';
import { awardGameCompletion } from '../engine/scoring.js';
import { reviewTerm } from '../engine/spaced-repetition.js';
import { checkAchievements } from '../engine/achievements.js';
import { playCorrect, playWrong, playComplete } from '../audio.js';
import { createStopwatch, formatTime } from '../engine/timer.js';
import { navigate } from '../router.js';
import { refreshNav } from './nav.js';
import { renderGameResult } from './game-result.js';
import { updateStreak } from '../state.js';

let gameState = null;

export function render() {
  return `
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-6">
        <button id="dc-back" class="text-navy/50 hover:text-navy">← ${t('game.back')}</button>
        <h2 class="font-bold text-navy">⚡ ${t('daily.title')}</h2>
        <div id="dc-progress" class="text-sm text-navy/50"></div>
      </div>
      <div id="dc-content"></div>
    </div>
  `;
}

export function init() {
  document.getElementById('dc-back').addEventListener('click', () => navigate('/home'));

  const state = getState();
  const today = new Date().toDateString();

  if (state.dailyChallengeDate === today) {
    document.getElementById('dc-content').innerHTML = `
      <div class="text-center py-12 space-y-4">
        <div class="text-5xl">✅</div>
        <h3 class="text-2xl font-black text-navy">${t('daily.completed')}</h3>
        <p class="text-coral font-bold">${t('daily.streakKept')} 🔥 ${state.streak}</p>
        <button onclick="location.hash='#/home'" class="px-6 py-3 bg-coral text-white rounded-xl font-bold">${t('game.back')}</button>
      </div>
    `;
    return;
  }

  startChallenge();
}

function startChallenge() {
  const state = getState();
  const dayContent = getDayContent(state.currentDay);
  const week = dayContent.week;
  const weekTerms = glossaryTerms.filter(t => t.week <= week);
  const scenarios = getRandomScenarios(2, week);

  // Generate 5 mixed questions
  const questions = [];

  // 2 term questions
  const shuffledTerms = [...weekTerms].sort(() => Math.random() - 0.5).slice(0, 2);
  shuffledTerms.forEach(term => {
    const wrongs = weekTerms.filter(t => t.en !== term.en).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [term.zh, ...wrongs.map(t => t.zh)].sort(() => Math.random() - 0.5);
    questions.push({ question: term.en, options, answer: term.zh, termKey: `term:${term.en}`, type: 'term' });
  });

  // 2 scenario questions
  scenarios.forEach(s => {
    const opts = [...s.options].sort(() => Math.random() - 0.5);
    questions.push({ question: bilingual(s.scenario), options: opts, answer: s.answer, termKey: `cmd:${s.answer}`, type: 'scenario' });
  });

  // 1 command description question
  const weekCmds = commands.filter(c => c.week <= week);
  const cmd = weekCmds[Math.floor(Math.random() * weekCmds.length)];
  const wrongCmds = weekCmds.filter(c => c.command !== cmd.command).sort(() => Math.random() - 0.5).slice(0, 3);
  const cmdOpts = [cmd.command, ...wrongCmds.map(c => c.command)].sort(() => Math.random() - 0.5);
  questions.push({ question: bilingual(cmd.description), options: cmdOpts, answer: cmd.command, termKey: `cmd:${cmd.command}`, type: 'command' });

  // Shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  gameState = {
    questions,
    currentIndex: 0,
    correct: 0,
    stopwatch: createStopwatch(),
    answered: false,
  };

  gameState.stopwatch.start();
  renderQuestion();
}

function renderQuestion() {
  if (gameState.currentIndex >= gameState.questions.length) {
    endChallenge();
    return;
  }

  const q = gameState.questions[gameState.currentIndex];
  document.getElementById('dc-progress').textContent = `${gameState.currentIndex + 1}/${gameState.questions.length}`;

  document.getElementById('dc-content').innerHTML = `
    <div class="bg-white rounded-2xl p-5 shadow-sm mb-4">
      <p class="text-navy font-medium ${q.type === 'term' ? 'text-2xl font-mono' : ''}">${q.question}</p>
    </div>
    <div class="space-y-3" id="dc-options">
      ${q.options.map(opt => `
        <button class="dc-option w-full text-left px-5 py-3 rounded-xl bg-white border-2 border-cream-dark hover:border-coral transition-all text-sm font-bold text-navy"
          data-answer="${opt}">${opt}</button>
      `).join('')}
    </div>
  `;

  gameState.answered = false;

  document.getElementById('dc-options').addEventListener('click', (e) => {
    const btn = e.target.closest('.dc-option');
    if (!btn || gameState.answered) return;
    gameState.answered = true;

    const correct = btn.dataset.answer === q.answer;

    document.querySelectorAll('.dc-option').forEach(b => {
      if (b.dataset.answer === q.answer) b.classList.add('border-mint', 'bg-mint/10');
      else if (b === btn && !correct) b.classList.add('border-red-400', 'bg-red-50', 'shake');
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

function endChallenge() {
  gameState.stopwatch.pause();
  const elapsed = gameState.stopwatch.getElapsed();
  const total = gameState.questions.length;

  // Mark daily challenge as completed
  const state = getState();
  state.dailyChallengeDate = new Date().toDateString();
  updateState(state);
  updateStreak();

  awardGameCompletion('daily-challenge', gameState.correct, total, 0, elapsed);
  const badges = checkAchievements({});
  playComplete();
  refreshNav();

  document.getElementById('dc-content').innerHTML = renderGameResult({
    title: t('daily.completed'),
    heroContent: `
      <div class="text-5xl">🎉</div>
      <p class="text-coral font-bold">${t('daily.streakKept')} 🔥 ${getState().streak}</p>
      <div class="text-navy/50 text-sm">${gameState.correct}/${total} correct · ${formatTime(elapsed)}</div>
    `,
    result: {}, badges,
  });
}
