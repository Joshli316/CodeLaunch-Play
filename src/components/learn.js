/**
 * Learn / Study Mode — Browseable card deck
 */
import { t, bilingual } from '../i18n.js';
import { getState, getMastery } from '../state.js';
import { glossaryTerms } from '../content/glossary-data.js';
import { commands } from '../content/commands-data.js';
import { getDueTerms } from '../engine/spaced-repetition.js';
import { navigate } from '../router.js';

let currentFilter = 'all';
let currentTab = 'terms';

export function render() {
  return `
    <div class="max-w-2xl mx-auto px-4 py-6">
      <h2 class="text-2xl font-black text-navy mb-4">📚 ${t('learn.title')}</h2>

      <!-- Tab toggle -->
      <div class="flex gap-2 mb-4">
        <button id="learn-terms-tab" class="px-4 py-2 rounded-xl bg-coral text-white font-bold text-sm">${t('learn.allTerms')}</button>
        <button id="learn-cmds-tab" class="px-4 py-2 rounded-xl bg-cream-dark text-navy font-bold text-sm">${t('learn.allCommands')}</button>
      </div>

      <!-- Filters -->
      <div class="flex gap-2 mb-4 flex-wrap">
        <button data-filter="all" class="learn-filter px-3 py-1 rounded-lg bg-coral text-white text-xs font-bold">All</button>
        <button data-filter="review" class="learn-filter px-3 py-1 rounded-lg bg-cream-dark text-navy text-xs font-bold">${t('learn.needsReview')}</button>
        <button data-filter="mastered" class="learn-filter px-3 py-1 rounded-lg bg-cream-dark text-navy text-xs font-bold">${t('learn.mastered')}</button>
        <button data-filter="week1" class="learn-filter px-3 py-1 rounded-lg bg-cream-dark text-navy text-xs font-bold">W1</button>
        <button data-filter="week2" class="learn-filter px-3 py-1 rounded-lg bg-cream-dark text-navy text-xs font-bold">W2</button>
        <button data-filter="week3" class="learn-filter px-3 py-1 rounded-lg bg-cream-dark text-navy text-xs font-bold">W3</button>
        <button data-filter="week4" class="learn-filter px-3 py-1 rounded-lg bg-cream-dark text-navy text-xs font-bold">W4</button>
      </div>

      <div id="learn-cards" class="space-y-3"></div>
    </div>
  `;
}

export function init() {
  document.getElementById('learn-terms-tab').addEventListener('click', () => { currentTab = 'terms'; updateTabs(); renderCards(); });
  document.getElementById('learn-cmds-tab').addEventListener('click', () => { currentTab = 'commands'; updateTabs(); renderCards(); });

  document.querySelectorAll('.learn-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      document.querySelectorAll('.learn-filter').forEach(b => {
        b.className = b.dataset.filter === currentFilter
          ? 'learn-filter px-3 py-1 rounded-lg bg-coral text-white text-xs font-bold'
          : 'learn-filter px-3 py-1 rounded-lg bg-cream-dark text-navy text-xs font-bold';
      });
      renderCards();
    });
  });

  renderCards();
}

function updateTabs() {
  document.getElementById('learn-terms-tab').className = currentTab === 'terms'
    ? 'px-4 py-2 rounded-xl bg-coral text-white font-bold text-sm'
    : 'px-4 py-2 rounded-xl bg-cream-dark text-navy font-bold text-sm';
  document.getElementById('learn-cmds-tab').className = currentTab === 'commands'
    ? 'px-4 py-2 rounded-xl bg-coral text-white font-bold text-sm'
    : 'px-4 py-2 rounded-xl bg-cream-dark text-navy font-bold text-sm';
}

function renderCards() {
  const container = document.getElementById('learn-cards');
  const now = Date.now();

  if (currentTab === 'terms') {
    let items = glossaryTerms.map(term => {
      const m = getMastery(`term:${term.en}`);
      return { ...term, mastery: m, key: `term:${term.en}` };
    });

    items = applyFilter(items, now);

    container.innerHTML = items.length === 0
      ? '<p class="text-center text-navy/40 py-8">No terms match this filter.</p>'
      : items.map(term => `
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <span class="font-mono font-bold text-coral">${term.en}</span>
              <span class="text-navy/40 mx-2">·</span>
              <span class="font-bold text-navy">${term.zh}</span>
              <span class="text-navy/30 text-xs ml-1">${term.pinyin}</span>
            </div>
            <div class="text-xs">${renderStars(term.mastery.stars)}</div>
          </div>
          <p class="text-sm text-navy/60 mt-2">${bilingual(term.definition)}</p>
          <p class="text-xs text-navy/30 mt-1 italic">${term.example || ''}</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-[10px] px-2 py-0.5 rounded bg-cream-dark text-navy/40">W${term.week}</span>
            ${term.mastery.nextReview && term.mastery.nextReview <= now ? '<span class="text-[10px] px-2 py-0.5 rounded bg-coral/10 text-coral">Review Due</span>' : ''}
          </div>
        </div>
      `).join('');
  } else {
    let items = commands.map(cmd => {
      const m = getMastery(`cmd:${cmd.command}`);
      return { ...cmd, mastery: m, key: `cmd:${cmd.command}` };
    });

    items = applyFilter(items, now);

    container.innerHTML = items.length === 0
      ? '<p class="text-center text-navy/40 py-8">No commands match this filter.</p>'
      : items.map(cmd => `
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <span class="font-mono font-bold text-coral">${cmd.command}</span>
            <div class="text-xs">${renderStars(cmd.mastery.stars)}</div>
          </div>
          <p class="text-sm text-navy/60 mt-2">${bilingual(cmd.description)}</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-[10px] px-2 py-0.5 rounded bg-cream-dark text-navy/40">W${cmd.week}</span>
            ${cmd.mastery.nextReview && cmd.mastery.nextReview <= now ? '<span class="text-[10px] px-2 py-0.5 rounded bg-coral/10 text-coral">Review Due</span>' : ''}
          </div>
        </div>
      `).join('');
  }
}

function applyFilter(items, now) {
  switch (currentFilter) {
    case 'review':
      return items.filter(i => !i.mastery.nextReview || i.mastery.nextReview <= now);
    case 'mastered':
      return items.filter(i => i.mastery.stars >= 5);
    case 'week1':
      return items.filter(i => i.week === 1);
    case 'week2':
      return items.filter(i => i.week === 2);
    case 'week3':
      return items.filter(i => i.week === 3);
    case 'week4':
      return items.filter(i => i.week === 4);
    default:
      return items;
  }
}

function renderStars(count) {
  return '⭐'.repeat(count) + '☆'.repeat(5 - count);
}
