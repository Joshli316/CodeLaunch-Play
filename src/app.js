/**
 * CodeFu 码功 — Main App Controller
 */
import { route, startRouter } from './router.js';
import { getState } from './state.js';
import { initNav, refreshNav } from './components/nav.js';
import * as _i18n from './i18n.js';

// Component imports
import * as home from './components/home.js';
import * as flashMatch from './components/flash-match.js';
import * as commandQuest from './components/command-quest.js';
import * as termSprint from './components/term-sprint.js';
import * as promptLab from './components/prompt-lab.js';
import * as workflowPuzzle from './components/workflow-puzzle.js';
import * as bossBattle from './components/boss-battle.js';
import * as dailyChallenge from './components/daily-challenge.js';
import * as learn from './components/learn.js';
import * as profile from './components/profile.js';
import * as settings from './components/settings.js';

// Games list page
let _GAMES = null;
function renderGamesPage() {
  const state = getState();
  const { t } = _i18n;

  return `
    <div class="max-w-2xl mx-auto px-4 py-6">
      <h2 class="text-2xl font-black text-navy mb-6">🎮 ${t('games.title')}</h2>
      <div class="grid grid-cols-2 gap-4">
        ${_GAMES.map(g => {
          const unlocked = state.currentDay >= g.unlock;
          return `
            <a href="${unlocked ? '#/game/' + g.id : '#/games'}" class="game-card rounded-2xl p-5 ${unlocked ? 'bg-white shadow-sm hover:shadow-md' : 'bg-cream-dark opacity-50 cursor-not-allowed'} transition-all no-underline">
              <div class="text-3xl mb-2">${g.icon}</div>
              <h3 class="font-bold text-navy">${t(g.nameKey)}</h3>
              <p class="text-xs text-navy/50 mt-1">${unlocked ? t(g.descKey) : t('games.locked', { n: g.unlock })}</p>
            </a>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// Curriculum reference (set in initApp)
let _getDayContent = null;

// Route handler factory
function pageHandler(component) {
  return () => {
    const main = document.getElementById('main-content');
    main.innerHTML = component.render();
    // Move focus to main content for accessibility
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
    refreshNav();
    if (component.init) {
      const cleanup = component.init();
      return cleanup; // Propagate cleanup function to router
    }
  };
}

// Init app
async function initApp() {
  // Preload curriculum
  const { getDayContent, GAMES } = await import('./content/curriculum.js');
  _getDayContent = getDayContent;
  _GAMES = GAMES;

  // Register routes
  route('/home', pageHandler(home));
  route('/games', () => {
    document.getElementById('main-content').innerHTML = renderGamesPage();
    refreshNav();
  });
  route('/game/flash-match', pageHandler(flashMatch));
  route('/game/command-quest', pageHandler(commandQuest));
  route('/game/term-sprint', pageHandler(termSprint));
  route('/game/prompt-lab', pageHandler(promptLab));
  route('/game/workflow-puzzle', pageHandler(workflowPuzzle));
  route('/game/boss-battle', pageHandler(bossBattle));
  route('/game/daily-challenge', pageHandler(dailyChallenge));
  route('/learn', pageHandler(learn));
  route('/profile', pageHandler(profile));
  route('/settings', pageHandler(settings));

  // Dark mode from settings
  const state = getState();
  if (state.settings.darkMode) {
    document.documentElement.classList.add('dark');
  }

  // Initialize navigation
  initNav();

  // Start router
  startRouter();
}

initApp().catch(console.error);
