# CodeFu 码功

A gamified companion app to [CodeLaunch 码上出发](https://claude-code-launch.pages.dev/) — the "Duolingo for Claude Code" that helps Chinese international students master technical English vocabulary, Claude Code commands, and prompt-writing through fun, addictive mini-games. Goal: mastery within 30 days.

## Brand
- **Name**: CodeFu 码功 — "The craft of code." Kung Fu mastery reference.
- **Logo**: Style B (Bold Modern) — curly braces `{ CodeFu }` with 码功 underneath
- **Logo fonts**: JetBrains Mono for braces, Inter 900 for "Code", coral Inter 900 for "Fu", Noto Sans SC 700 for 码功
- **Tagline**: "Master the Language of Code"

## Tech Stack
- Vanilla JavaScript/HTML single-page app on Cloudflare Pages
- Tailwind CSS v4 via @tailwindcss/cli (same as CodeLaunch)
- No framework, no backend — localStorage for all state
- Bilingual: Chinese primary, English secondary (with language toggle)
- PWA-ready (manifest.json for mobile install)
- Mobile-first responsive design

## Structure
```
CodeLaunch-Play/
├── index.html                  # Entry point — app shell
├── 404.html                    # SPA fallback
├── manifest.json               # PWA manifest
├── robots.txt
├── _headers                    # Cloudflare security headers
├── package.json                # Tailwind CLI only
├── tailwind.config.js          # Shared palette with CodeLaunch
├── CLAUDE.md
├── plan.md
│
├── src/
│   ├── app.js                  # Main controller, routing, init
│   ├── router.js               # Hash-based SPA router
│   ├── state.js                # localStorage state management
│   ├── i18n.js                 # Bilingual translation system
│   ├── audio.js                # Sound effects (toggleable)
│   │
│   ├── components/
│   │   ├── nav.js              # Top nav + mobile drawer
│   │   ├── home.js             # Dashboard: progress, streak, daily challenge
│   │   ├── flash-match.js      # Game 1: Memory card matching
│   │   ├── command-quest.js    # Game 2: Scenario → pick correct command
│   │   ├── term-sprint.js      # Game 3: Speed definition quiz
│   │   ├── prompt-lab.js       # Game 4: Drag-and-drop prompt builder
│   │   ├── workflow-puzzle.js  # Game 5: Order commands in sequence
│   │   ├── boss-battle.js      # Game 6: Weekly comprehensive test
│   │   ├── daily-challenge.js  # Daily mixed mini-challenge
│   │   ├── profile.js          # Stats, badges, mastery overview
│   │   ├── learn.js            # Study/review mode (reference cards)
│   │   └── settings.js         # Language, sound, theme, data mgmt
│   │
│   ├── content/
│   │   ├── glossary-data.js    # 86 bilingual tech terms (from CodeLaunch)
│   │   ├── commands-data.js    # 45 Claude Code commands (from CodeLaunch)
│   │   ├── prompts-data.js     # Prompt patterns & exercises
│   │   ├── scenarios-data.js   # Command Quest scenario scripts
│   │   ├── workflows-data.js   # Workflow Puzzle sequences
│   │   └── curriculum.js       # 30-day learning path schedule
│   │
│   ├── engine/
│   │   ├── spaced-repetition.js  # SM-2 algorithm for term review
│   │   ├── scoring.js            # XP, combo, streak calculation
│   │   ├── mastery.js            # Per-term mastery tracking (0-5 stars)
│   │   ├── timer.js              # Game timer utilities
│   │   └── achievements.js       # Badge unlock logic
│   │
│   └── styles/
│       ├── tailwind.css          # Tailwind directives
│       └── custom.css            # Game animations, card flips, confetti
│
├── dist/
│   └── tailwind.css              # Built CSS
│
└── assets/
    └── icons/                    # PWA icons, favicon
```

## Entry Point
`index.html` — loads dist/tailwind.css, custom.css, and app.js as ES module.

## Deployment
```bash
npm run build:css && wrangler pages deploy .
```

## Conventions
- **Same design language as CodeLaunch**: coral (#FF6B4A), navy (#1A1A2E), cream (#FFF8F0), mint (#4ECDC4)
- **Typography**: Inter (EN), Noto Sans SC (CN), JetBrains Mono (code)
- **Component pattern**: Each component exports `render()` → HTML string and `init()` → event listeners
- **Routing**: Hash-based (`#/home`, `#/flash-match`, `#/profile`)
- **State**: Single state object in localStorage via `state.js` helpers
- **Bilingual**: Chinese primary. All UI strings through `i18n.js`. Terms show both languages always.
- **Mobile-first**: Touch-friendly tap targets (min 44px), swipe gestures where appropriate
- **Tone**: Fun, encouraging, game-like. Celebrate wins with confetti/sounds. Never punitive.
- **Game feel**: Snappy animations (<200ms), satisfying feedback on correct answers, gentle shake on wrong
- **Sound**: All sounds optional, off by default, toggle in settings
- **Accessibility**: Focus management, ARIA labels, reduced-motion support
- **No grids with empty slots**: All card grids must have complete rows
- **100% free**: No payments, no pricing tiers, no premium gates, no paywalls. All games and content fully accessible. No "upgrade" CTAs or pricing references anywhere.
