/**
 * Settings
 */
import { t } from '../i18n.js';
import { getState, updateState, resetState, exportState } from '../state.js';
import { navigate } from '../router.js';

export function render() {
  const state = getState();
  const s = state.settings;

  return `
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <h2 class="text-2xl font-black text-navy">⚙️ ${t('settings.title')}</h2>

      <!-- Language -->
      <div class="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
        <span class="font-medium text-navy">${t('settings.language')}</span>
        <select id="set-lang" class="bg-cream-dark rounded-lg px-3 py-1.5 text-sm text-navy font-bold border-0">
          <option value="zh" ${s.language === 'zh' ? 'selected' : ''}>中文</option>
          <option value="en" ${s.language === 'en' ? 'selected' : ''}>English</option>
        </select>
      </div>

      <!-- Sound -->
      <div class="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
        <span class="font-medium text-navy">${t('settings.sound')}</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="set-sound" class="sr-only peer" ${s.sound ? 'checked' : ''}>
          <div class="w-11 h-6 bg-cream-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
        </label>
      </div>

      <!-- Dark Mode -->
      <div class="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
        <span class="font-medium text-navy">${t('settings.darkMode')}</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="set-dark" class="sr-only peer" ${s.darkMode ? 'checked' : ''}>
          <div class="w-11 h-6 bg-cream-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
        </label>
      </div>

      <!-- Export Data -->
      <button id="set-export" class="w-full bg-white rounded-xl p-4 shadow-sm text-left font-medium text-navy hover:bg-cream-dark transition-colors">
        📦 ${t('settings.export')}
      </button>

      <!-- Reset Progress -->
      <button id="set-reset" class="w-full bg-white rounded-xl p-4 shadow-sm text-left font-medium text-red-500 hover:bg-red-50 transition-colors">
        ⚠️ ${t('settings.reset')}
      </button>

      <!-- About -->
      <div class="bg-white rounded-xl p-4 shadow-sm space-y-2">
        <h3 class="font-bold text-navy">${t('settings.about')}</h3>
        <p class="text-sm text-navy/60">CodeFu 码功 — Master the Language of Code</p>
        <p class="text-sm text-navy/60">${t('settings.version')} 1.0.0</p>
        <a href="https://claude-code-launch.pages.dev/" target="_blank" rel="noopener" class="text-sm text-coral hover:underline block">📖 CodeLaunch 码上出发 →</a>
      </div>
    </div>
  `;
}

export function init() {
  document.getElementById('set-lang').addEventListener('change', (e) => {
    const state = getState();
    state.settings.language = e.target.value;
    updateState(state);
    document.documentElement.lang = e.target.value === 'zh' ? 'zh-CN' : 'en';
    // Re-render entire app
    navigate(window.location.hash.slice(1) || '/settings');
  });

  document.getElementById('set-sound').addEventListener('change', (e) => {
    const state = getState();
    state.settings.sound = e.target.checked;
    updateState(state);
  });

  document.getElementById('set-dark').addEventListener('change', (e) => {
    const state = getState();
    state.settings.darkMode = e.target.checked;
    updateState(state);
    document.documentElement.classList.toggle('dark', e.target.checked);
  });

  document.getElementById('set-export').addEventListener('click', () => {
    const data = exportState();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codefu-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('set-reset').addEventListener('click', () => {
    if (confirm(t('settings.resetConfirm'))) {
      resetState();
      navigate('/home');
    }
  });
}
