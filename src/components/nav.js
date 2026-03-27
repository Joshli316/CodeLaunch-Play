/**
 * Navigation — Bottom Tab Bar + Top Bar
 */
import { t } from '../i18n.js';
import { getState, getLevelInfo, getHearts } from '../state.js';
import { currentRoute } from '../router.js';

export function renderTopBar() {
  const state = getState();
  const levelInfo = getLevelInfo();
  const hearts = getHearts();
  const lang = state.settings.language;
  const levelName = levelInfo.name[lang] || levelInfo.name.zh;

  return `
    <div class="flex items-center justify-between px-4 py-2 max-w-4xl mx-auto w-full">
      <a href="#/home" class="flex items-center gap-1 no-underline">
        <span class="font-mono text-2xl font-bold text-coral">{</span>
        <span class="text-lg font-black text-navy">Code</span><span class="text-lg font-black text-coral">Fu</span>
        <span class="font-mono text-2xl font-bold text-coral">}</span>
      </a>
      <div class="flex items-center gap-3 text-sm">
        <div class="flex items-center gap-1" title="${t('topbar.streak')}">
          <span class="streak-fire">🔥</span>
          <span class="font-bold text-coral">${state.streak}</span>
        </div>
        <div class="flex items-center gap-1 bg-coral/10 rounded-full px-2 py-0.5">
          <span class="text-xs font-bold text-coral">${levelName}</span>
          <span class="font-bold text-navy">${state.xp} XP</span>
        </div>
        <div class="flex items-center gap-0.5" title="${t('topbar.hearts')}">
          ${Array.from({length: 5}, (_, i) => `<span class="${i < hearts ? 'text-red-500' : 'text-gray-300'} text-sm">♥</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderBottomNav() {
  const route = currentRoute();
  const tabs = [
    { path: '/home', icon: '🏠', label: 'nav.home' },
    { path: '/games', icon: '🎮', label: 'nav.games' },
    { path: '/learn', icon: '📚', label: 'nav.learn' },
    { path: '/profile', icon: '🏆', label: 'nav.profile' },
    { path: '/settings', icon: '⚙️', label: 'nav.settings' },
  ];

  const mobileNav = `
    <div class="fixed bottom-0 left-0 right-0 bg-cream/95 backdrop-blur-sm border-t border-cream-dark z-50 md:hidden">
      <div class="flex justify-around py-1">
        ${tabs.map(tab => {
          const isActive = route === tab.path || (tab.path === '/games' && route.startsWith('/game'));
          return `
            <a href="#${tab.path}" class="flex flex-col items-center py-1 px-3 no-underline ${isActive ? 'text-coral' : 'text-navy/50'} transition-colors" ${isActive ? 'aria-current="page"' : ''}>
              <span class="text-xl" aria-hidden="true">${tab.icon}</span>
              <span class="text-[10px] font-medium mt-0.5">${t(tab.label)}</span>
            </a>
          `;
        }).join('')}
      </div>
    </div>
  `;

  const desktopSidebar = `
    <div class="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-navy flex-col z-40">
      <div class="flex items-center gap-1 p-6">
        <span class="font-mono text-3xl font-bold text-coral">{</span>
        <div class="flex flex-col">
          <span class="text-xl font-black text-white">Code<span class="text-coral">Fu</span></span>
          <span class="text-xs text-gray-400 font-bold tracking-widest">码 功</span>
        </div>
        <span class="font-mono text-3xl font-bold text-coral">}</span>
      </div>
      <nav class="flex flex-col gap-1 px-3 flex-1">
        ${tabs.map(tab => {
          const isActive = route === tab.path || (tab.path === '/games' && route.startsWith('/game'));
          return `
            <a href="#${tab.path}" class="flex items-center gap-3 px-4 py-3 rounded-xl no-underline transition-all ${isActive ? 'bg-coral text-white' : 'text-gray-400 hover:bg-navy-light hover:text-white'}" ${isActive ? 'aria-current="page"' : ''}>
              <span class="text-xl" aria-hidden="true">${tab.icon}</span>
              <span class="font-medium">${t(tab.label)}</span>
            </a>
          `;
        }).join('')}
      </nav>
      <div class="p-4 border-t border-navy-light">
        <a href="https://claude-code-launch.pages.dev/" target="_blank" rel="noopener" class="text-sm text-gray-500 hover:text-coral no-underline flex items-center gap-2">
          📖 CodeLaunch 码上出发
        </a>
      </div>
    </div>
  `;

  return mobileNav + desktopSidebar;
}

export function initNav() {
  document.getElementById('top-bar').innerHTML = renderTopBar();
  document.getElementById('bottom-nav').innerHTML = renderBottomNav();
}

export function refreshNav() {
  initNav();
}
