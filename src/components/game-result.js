/**
 * Shared Game Result Screen
 * Eliminates duplication across all game components.
 */
import { t, bilingual } from '../i18n.js';

export function renderStars(count, max = 3) {
  return '⭐'.repeat(count) + '☆'.repeat(max - count);
}

/**
 * Render a game result screen.
 * @param {Object} opts
 * @param {string} opts.title - Heading text
 * @param {number} [opts.stars] - Star rating (0-3)
 * @param {string} [opts.heroContent] - Custom large display (replaces stars)
 * @param {Array<{label: string, value: string}>} [opts.stats] - Stat items
 * @param {string} [opts.extraHTML] - Game-specific HTML inserted before badges
 * @param {{levelUp: boolean}} opts.result - From awardGameCompletion
 * @param {Array} opts.badges - From checkAchievements
 * @param {string} [opts.replayRoute] - Hash route for "Play Again" (omit to hide)
 * @param {string} [opts.replayLabel] - Label for replay button
 */
export function renderGameResult({
  title,
  stars,
  heroContent,
  stats = [],
  extraHTML = '',
  result = {},
  badges = [],
  replayRoute,
  replayLabel,
}) {
  return `
    <div class="space-y-4">
      <h3 class="text-2xl font-black text-navy">${title}</h3>
      ${heroContent
        ? heroContent
        : stars != null ? `<div class="text-4xl">${renderStars(stars)}</div>` : ''}
      ${stats.length > 0 ? `
        <div class="flex justify-center gap-6 text-sm">
          ${stats.map(s => `<div><span class="text-navy/50">${s.label}</span><br><strong>${s.value}</strong></div>`).join('')}
        </div>
      ` : ''}
      ${extraHTML}
      ${result.levelUp ? '<div class="text-coral font-bold text-lg level-up-text">🎉 Level Up!</div>' : ''}
      ${badges.length > 0 ? badges.map(b => `<div class="text-mint font-bold">${b.icon} ${bilingual(b.name)}</div>`).join('') : ''}
      <div class="flex gap-3 justify-center">
        ${replayRoute ? `<button onclick="location.hash='${replayRoute}'" class="px-6 py-3 bg-coral text-white rounded-xl font-bold">${replayLabel || t('game.playAgain')}</button>` : ''}
        <button onclick="location.hash='#/home'" class="px-6 py-3 bg-cream-dark text-navy rounded-xl font-bold">${t('game.back')}</button>
      </div>
    </div>
  `;
}
