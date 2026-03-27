/**
 * CodeFu 码功 — Main App Controller
 */
import { route, startRouter } from './router.js';
import { getState } from './state.js';
import { initNav, refreshNav } from './components/nav.js';

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
function renderGamesPage() {
  const state = getState();
  const dayContent = _getDayContent(state.currentDay);
  const lang = state.settings.language;

  const games = [
    { id: 'flash-match', icon: '🃏', name: { zh: '闪卡配对', en: 'Flash Match' }, desc: { zh: '翻转卡片，匹配中英文对', en: 'Flip cards, match EN/CN pairs' }, unlock: 1 },
    { id: 'term-sprint', icon: '⚡', name: { zh: '术语冲刺', en: 'Term Sprint' }, desc: { zh: '60秒极速术语测验', en: '60-second speed quiz' }, unlock: 2 },
    { id: 'command-quest', icon: '🎯', name: { zh: '命令闯关', en: 'Command Quest' }, desc: { zh: '根据场景选择正确命令', en: 'Pick the right command' }, unlock: 3 },
    { id: 'prompt-lab', icon: '✍️', name: { zh: '提示词工坊', en: 'Prompt Lab' }, desc: { zh: '拖拽拼接提示词', en: 'Build prompts' }, unlock: 5 },
    { id: 'workflow-puzzle', icon: '🧩', name: { zh: '工作流拼图', en: 'Workflow Puzzle' }, desc: { zh: '排列命令的正确顺序', en: 'Order commands correctly' }, unlock: 6 },
    { id: 'boss-battle', icon: '⚔️', name: { zh: '终极挑战', en: 'Boss Battle' }, desc: { zh: '综合测试', en: 'Comprehensive test' }, unlock: 7 },
  ];

  return `
    <div class="max-w-2xl mx-auto px-4 py-6">
      <h2 class="text-2xl font-black text-navy mb-6">🎮 ${lang === 'zh' ? '游戏' : 'Games'}</h2>
      <div class="grid grid-cols-2 gap-4">
        ${games.map(g => {
          const unlocked = state.currentDay >= g.unlock;
          return `
            <a href="${unlocked ? '#/game/' + g.id : '#/games'}" class="game-card rounded-2xl p-5 ${unlocked ? 'bg-white shadow-sm hover:shadow-md' : 'bg-cream-dark opacity-50 cursor-not-allowed'} transition-all no-underline">
              <div class="text-3xl mb-2">${g.icon}</div>
              <h3 class="font-bold text-navy">${g.name[lang]}</h3>
              <p class="text-xs text-navy/50 mt-1">${unlocked ? g.desc[lang] : (lang === 'zh' ? `第${g.unlock}天解锁` : `Unlocks Day ${g.unlock}`)}</p>
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
    refreshNav();
    if (component.init) component.init();
  };
}

// Init app
async function initApp() {
  // Preload curriculum
  const { getDayContent } = await import('./content/curriculum.js');
  _getDayContent = getDayContent;

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
