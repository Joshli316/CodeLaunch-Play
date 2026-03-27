/**
 * Game 1: Flash Match 闪卡配对 — Memory card matching
 */
import { t } from '../i18n.js';
import { getState } from '../state.js';
import { getDayContent } from '../content/curriculum.js';
import { glossaryTerms } from '../content/glossary-data.js';
import { createStopwatch, formatTime } from '../engine/timer.js';
import { awardGameCompletion, getStarRating } from '../engine/scoring.js';
import { reviewTerm } from '../engine/spaced-repetition.js';
import { checkAchievements } from '../engine/achievements.js';
import { playCorrect, playWrong, playComplete } from '../audio.js';
import { navigate } from '../router.js';
import { refreshNav } from './nav.js';
import { renderGameResult } from './game-result.js';

let gameState = null;

export function render() {
  return `
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-4">
        <button id="fm-back" class="text-navy/50 hover:text-navy">← ${t('game.back')}</button>
        <h2 class="font-bold text-navy">🃏 ${t('games.flashMatch')}</h2>
        <div id="fm-timer" class="font-mono text-sm text-navy/50">0:00</div>
      </div>
      <div id="fm-difficulty" class="flex gap-2 justify-center mb-6">
        <button data-diff="easy" class="px-4 py-2 rounded-xl bg-mint text-white font-bold text-sm">${t('game.easy')}</button>
        <button data-diff="medium" class="px-4 py-2 rounded-xl bg-cream-dark text-navy font-bold text-sm">${t('game.medium')}</button>
        <button data-diff="hard" class="px-4 py-2 rounded-xl bg-cream-dark text-navy font-bold text-sm">${t('game.hard')}</button>
      </div>
      <div id="fm-stats" class="flex justify-center gap-6 mb-4 text-sm text-navy/60 hidden">
        <span>${t('game.moves')}: <strong id="fm-moves">0</strong></span>
        <span>${t('game.streak')}: <strong id="fm-combo">0</strong></span>
      </div>
      <div id="fm-board" class="grid gap-2 mx-auto"></div>
      <div id="fm-result" class="hidden text-center py-8"></div>
    </div>
  `;
}

export function init() {
  document.getElementById('fm-back').addEventListener('click', () => navigate('/home'));

  document.getElementById('fm-difficulty').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-diff]');
    if (btn) startGame(btn.dataset.diff);
  });

  // Use single delegated listener on board (set once, survives innerHTML rebuilds)
  document.getElementById('fm-board').addEventListener('click', handleCardClick);

  // Default: start easy
  startGame('easy');

  return () => { gameState = null; };
}

function startGame(difficulty) {
  const state = getState();
  const dayContent = getDayContent(state.currentDay);
  const week = dayContent.week;

  // Select terms based on difficulty
  const pairCounts = { easy: 3, medium: 6, hard: 10 };
  const pairCount = pairCounts[difficulty];
  const weekTerms = glossaryTerms.filter(t => t.week <= week);

  // Ensure enough terms; fall back to fewer pairs
  const actualPairs = Math.min(pairCount, weekTerms.length);
  if (actualPairs === 0) {
    document.getElementById('fm-board').innerHTML = '<p class="text-center text-navy/50 col-span-full py-8">No terms available yet. Complete more days!</p>';
    return;
  }

  // Shuffle and pick
  const shuffled = [...weekTerms].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, actualPairs);

  // Create card pairs: EN card + CN card
  const cards = [];
  selected.forEach((term, i) => {
    cards.push({ id: `en-${i}`, pairId: i, text: term.en, type: 'en', termKey: `term:${term.en}` });
    cards.push({ id: `cn-${i}`, pairId: i, text: term.zh, type: 'cn', termKey: `term:${term.en}` });
  });

  // Shuffle cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Grid sizing
  const cols = pairCount <= 3 ? 3 : pairCount <= 6 ? 4 : 5;

  gameState = {
    difficulty,
    cards,
    flipped: [],
    matched: new Set(),
    moves: 0,
    combo: 0,
    maxCombo: 0,
    cols,
    stopwatch: createStopwatch(),
  };

  gameState.stopwatch.start();
  renderBoard();

  // Update difficulty buttons
  document.querySelectorAll('#fm-difficulty button').forEach(btn => {
    btn.className = btn.dataset.diff === difficulty
      ? 'px-4 py-2 rounded-xl bg-coral text-white font-bold text-sm'
      : 'px-4 py-2 rounded-xl bg-cream-dark text-navy font-bold text-sm';
  });

  document.getElementById('fm-stats').classList.remove('hidden');
  document.getElementById('fm-result').classList.add('hidden');

  // Timer display
  updateTimer();
}

function updateTimer() {
  if (!gameState || gameState.matched.size === gameState.cards.length) return;
  const el = document.getElementById('fm-timer');
  if (el) {
    el.textContent = formatTime(gameState.stopwatch.getElapsed());
    requestAnimationFrame(updateTimer);
  }
}

function renderBoard() {
  const board = document.getElementById('fm-board');
  board.style.gridTemplateColumns = `repeat(${gameState.cols}, 1fr)`;
  board.style.maxWidth = `${gameState.cols * 80}px`;

  board.innerHTML = gameState.cards.map(card => {
    const isFlipped = gameState.flipped.includes(card.id) || gameState.matched.has(card.id);
    return `
      <button class="fm-card aspect-square rounded-xl text-sm font-bold flex items-center justify-center p-1 transition-all duration-200
        ${isFlipped
          ? (gameState.matched.has(card.id) ? 'bg-mint/20 text-mint border-2 border-mint' : 'bg-white text-navy border-2 border-coral')
          : 'bg-navy text-navy hover:bg-navy-light cursor-pointer card-back'}"
        data-id="${card.id}" ${isFlipped ? 'disabled' : ''}
        aria-label="${isFlipped ? card.text : 'Hidden card'}">
        ${isFlipped ? `<span class="${card.type === 'en' ? 'font-mono text-xs' : ''}">${card.text}</span>` : '<span class="text-coral text-lg">?</span>'}
      </button>
    `;
  }).join('');
}

function handleCardClick(e) {
  const btn = e.target.closest('.fm-card');
  if (!btn || !gameState) return;

  const cardId = btn.dataset.id;
  const card = gameState.cards.find(c => c.id === cardId);
  if (!card || gameState.flipped.includes(cardId) || gameState.matched.has(cardId)) return;
  if (gameState.flipped.length >= 2) return;

  gameState.flipped.push(cardId);
  renderBoard();

  if (gameState.flipped.length === 2) {
    gameState.moves++;
    document.getElementById('fm-moves').textContent = gameState.moves;

    const [id1, id2] = gameState.flipped;
    const card1 = gameState.cards.find(c => c.id === id1);
    const card2 = gameState.cards.find(c => c.id === id2);

    if (card1.pairId === card2.pairId) {
      // Match!
      gameState.matched.add(id1);
      gameState.matched.add(id2);
      gameState.combo++;
      if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
      document.getElementById('fm-combo').textContent = gameState.combo;
      gameState.flipped = [];
      playCorrect();
      reviewTerm(card1.termKey, true);
      renderBoard();

      if (gameState.matched.size === gameState.cards.length) {
        endGame();
      }
    } else {
      // No match
      gameState.combo = 0;
      document.getElementById('fm-combo').textContent = 0;
      playWrong();
      reviewTerm(card1.termKey, false);
      setTimeout(() => {
        gameState.flipped = [];
        renderBoard();
      }, 800);
    }
  }
}

function endGame() {
  gameState.stopwatch.pause();
  const elapsed = gameState.stopwatch.getElapsed();
  const pairCount = gameState.cards.length / 2;
  const perfectMoves = pairCount;
  const stars = getStarRating(perfectMoves, gameState.moves);
  const difficulty = gameState.difficulty;

  const result = awardGameCompletion('flash-match', pairCount, pairCount, gameState.maxCombo, elapsed);
  const badges = checkAchievements({ game: 'flash-match', difficulty, stars, maxCombo: gameState.maxCombo });

  playComplete();
  refreshNav();

  const resultEl = document.getElementById('fm-result');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = renderGameResult({
    title: t('game.complete'),
    stars,
    stats: [
      { label: t('game.moves'), value: gameState.moves },
      { label: t('game.time'), value: formatTime(elapsed) },
      { label: t('game.streak'), value: gameState.maxCombo },
    ],
    result, badges,
    replayRoute: '#/game/flash-match',
  });
}
