# Implementation Plan: CodeFu 码功

## Overview

A gamified learning app — "Duolingo for Claude Code" — that helps Chinese international students overcome the technical English barrier to learning Claude Code. The app transforms 86 glossary terms, 45 commands, and prompt-writing patterns into 6 addictive mini-games across a structured 30-day curriculum. Students play 10-15 minutes daily and achieve measurable mastery by month's end.

**Companion to**: [CodeLaunch 码上出发](https://claude-code-launch.pages.dev/) (the reference/tutorial app)
**This app's role**: Active recall + practice (learn by playing, not reading)

---

## Problem & Value Proposition

### The Problem
Chinese international students know Claude Code is a career advantage, but **technical English** is a major barrier:
- 86 technical terms (Terminal, Repository, API, MCP...) they've never encountered
- 45 slash commands with English descriptions they can't parse quickly
- Prompt-writing requires constructing English sentences with precise technical language
- Existing resources (docs, tutorials, YouTube) are all in English
- Daily English is hard enough — adding jargon, commands, and lingo makes it overwhelming

### The Pain Points
1. **Vocabulary gap**: Can't read docs or error messages without looking up every 3rd word
2. **Command confusion**: 45 commands look similar — /compact vs /context vs /config?
3. **Prompt paralysis**: Know what they want to say in Chinese, can't express it in English
4. **No muscle memory**: Reading a glossary once doesn't build recall under pressure
5. **Isolation**: Friends who code natively in English can't relate to the struggle

### The Value Proposition
> "Master Claude Code's technical language in 30 days — by playing games, not studying textbooks."

- **Active recall** beats passive reading (games force retrieval, not recognition)
- **Spaced repetition** ensures long-term retention (SM-2 algorithm schedules reviews)
- **Bilingual context** — always see Chinese and English together, never lost
- **Prompt practice** — build real prompts through drag-and-drop, not blank-page anxiety
- **Progress visibility** — watch your mastery stars fill up, streak grow, level rise

### The Main Draw
It's **fun**. Memory matching, speed quizzes, drag-and-drop puzzles, boss battles — it feels like a game, not homework. The 30-day structure creates momentum. The streak system creates habit. The mastery stars create satisfaction.

---

## 6 Game Modes

### Game 1: Flash Match 闪卡配对
**Type**: Memory card matching (concentration game)
**What**: Grid of face-down cards. Flip two at a time. Match English term ↔ Chinese translation.
**Levels**:
- Easy: 3 pairs (6 cards) — just terms
- Medium: 6 pairs (12 cards) — terms + commands
- Hard: 10 pairs (20 cards) — mixed content
**Scoring**: Stars (1-3) based on moves + time. Combo multiplier for consecutive matches.
**Learning goal**: Visual association between EN/CN pairs.

### Game 2: Command Quest 命令闯关
**Type**: Scenario-based multiple choice
**What**: Read a real-world scenario (bilingual). Pick the correct Claude Code command from 4 options.
**Example**:
> "你的会话占用了太多内存，需要释放空间。"
> "Your session is using too much memory and you need to free up space."
> A) /clear  B) /compact  C) /context  D) /export
> ✅ B) /compact
**Scoring**: 10 questions per round. XP per correct answer. Speed bonus. Streak multiplier.
**Learning goal**: Know which command to use in which situation.

### Game 3: Term Sprint 术语冲刺
**Type**: 60-second speed quiz
**What**: Term flashes on screen. 4 definitions shown. Tap the correct one. Go as fast as possible.
**Modes**:
- EN → CN: See English term, pick Chinese definition
- CN → EN: See Chinese term, pick English definition
- Mixed: Random direction
**Scoring**: Points per correct answer. Streak bonus (3x at 10-streak). Wrong answer breaks streak.
**Learning goal**: Speed recall — recognize terms instantly without translating in your head.

### Game 4: Prompt Lab 提示词工坊
**Type**: Drag-and-drop prompt construction
**What**: Given a goal in Chinese (e.g., "让Claude创建一个登录页面"), arrange English prompt fragments into a well-structured prompt.
**Fragments example**:
- "Create a" / "login page" / "with email and password fields" / "using Tailwind CSS" / "that validates input"
**Scoring**: Scored on structure (clear request → context → constraints), completeness, correctness.
**Levels**:
- Beginner: 3-4 fragments, simple tasks
- Intermediate: 5-6 fragments, multi-part tasks
- Advanced: 7-8 fragments, complex prompts with constraints
**Learning goal**: Build confidence constructing English prompts. Learn prompt patterns.

### Game 5: Workflow Puzzle 工作流拼图
**Type**: Sequence ordering (drag to reorder)
**What**: Given a workflow goal (e.g., "Start a new project and deploy it"), drag Claude Code commands into the correct order.
**Example workflow — "New Project Setup"**:
1. `claude` (start session)
2. `/init` (generate CLAUDE.md)
3. Write code with prompts
4. `/commit` (save changes)
5. `/pr` (create pull request)
**Scoring**: Stars based on accuracy. Partial credit for close ordering.
**Learning goal**: Understand command workflows and when to use each command.

### Game 6: Boss Battle 终极挑战
**Type**: Comprehensive timed challenge (weekly)
**What**: 20 mixed questions pulling from all game types. Must score ≥80% to pass and unlock next week.
**Format**: Mix of matching, multiple choice, ordering, and prompt completion.
**Reward**: Special badge + XP bonus + unlock next week's content.
**Learning goal**: Prove comprehensive mastery of the week's material.

### Bonus: Daily Challenge 每日挑战
**Type**: One quick mixed mini-game per day (2-3 minutes)
**What**: Random selection from unlocked game types with that day's focus terms/commands.
**Reward**: Streak fire 🔥 + bonus XP.
**Purpose**: Build daily habit. Maintain streak.

---

## 30-Day Curriculum

### Week 1: Foundations 基础入门 (Days 1-7)
**Terms** (20): Terminal, Code, File, Folder, Command, Download, Install, Run, Error, Bug, Version, Open Source, Repository, IDE, Compiler, Prompt, AI Assistant, Context, Token, Session
**Commands** (8): `claude`, `claude "问题"`, `claude -p`, `/init`, `/help`, `/clear`, `/context`, `/memory`
**Prompt patterns**: Simple requests ("Create a...", "Fix the...", "Explain how...")
**Boss Battle 1**: Day 7

### Week 2: Navigation 导航探索 (Days 8-14)
**Terms** (22): CLI, Snippet, API, Git, Debugging, Memory/Context, Error Handling, Plan Mode, Permission, Hook, Flag, Markdown, Branch, Merge, Commit, Fork, Diff, Workspace, Configuration, Scope, Path, Directory
**Commands** (12): `/compact`, `/resume`, `/fork`, `/rename`, `/add-dir`, `/copy`, `/diff`, `/export`, `/usage`, `/cost`, `/effort`, `claude -c`
**Prompt patterns**: Adding context ("In the file...", "The current behavior is...", "I want it to...")
**Boss Battle 2**: Day 14

### Week 3: Building 构建实战 (Days 15-21)
**Terms** (22): Deploy, Endpoint, Framework, Compile, Dependency, Environment, Runtime, Syntax, Variable, Module, Interface, Callback, Middleware, Pipeline, Refactor, Iterate, Abstract, Concurrent, Serialize, Queue, Mutex, Sandbox
**Commands** (12): `/search`, `/commit`, `/pr`, `/vim`, `/plan`, `/fast`, `/model`, `/permissions`, `/config`, `/terminal-setup`, `claude -r "ID"`, `claude update`
**Prompt patterns**: Multi-step tasks ("First... then... finally..."), constraints ("Don't use...", "Keep it under...")
**Boss Battle 3**: Day 21

### Week 4: Mastery 精通认证 (Days 22-30)
**Terms** (22): MCP, CLAUDE.md, Worktree, Feedback, Curation, Contextualization, Deprecated, Binary Tree, Breakpoint, Network Pipeline, Promises, Hash, Payload, Latency, Throughput, Webhook, Schema, Migration, Linting, Transpile, Polyfill, Tree Shaking
**Commands** (13): `/tasks`, `/doctor`, `/stats`, `/debug`, `/mcp`, `/plugin`, `/review`, `/skills`, `/ide`, `/install-github-app`, `claude mcp add`, `claude mcp list`, `claude --from-pr`
**Prompt patterns**: Advanced ("Debug why...", "Refactor this to...", "Write tests for...", "Review this PR and...")
**Final Boss Battle**: Day 28
**Days 29-30**: Review weak areas + earn certification badge

---

## Gamification System

### XP & Levels
- **XP sources**: Game completion (10-50 XP), correct answers (5 XP each), streak bonus (2x at 7 days, 3x at 14, 5x at 30), Boss Battle pass (100 XP), Daily Challenge (20 XP)
- **6 Levels** (same progression as CodeLaunch):
  1. 新手 Beginner (0 XP)
  2. 学徒 Apprentice (200 XP)
  3. 探索者 Explorer (600 XP)
  4. 建造者 Builder (1500 XP)
  5. 创造者 Creator (3000 XP)
  6. 发布者 Shipper (5000 XP)

### Streak System
- Daily streak counter (fire icon 🔥)
- Must complete at least 1 Daily Challenge or game session per day
- Streak freeze: earn 1 free freeze per 7-day streak (bank up to 3)
- Streak milestones: 7, 14, 21, 30 days — each triggers a special badge

### Hearts / Lives
- 5 hearts per session
- Lose 1 heart per wrong answer in Term Sprint and Command Quest
- Hearts regenerate: 1 per 30 minutes, or full refill after 4 hours
- Unlimited hearts in Flash Match and Prompt Lab (practice modes)
- Purpose: Creates stakes, prevents mindless tapping

### Mastery Stars (per term/command)
- Each term and command tracked individually (0-5 stars)
- Star progression driven by SM-2 spaced repetition:
  - ⭐ First correct recall
  - ⭐⭐ Correct after 1 day
  - ⭐⭐⭐ Correct after 3 days
  - ⭐⭐⭐⭐ Correct after 7 days
  - ⭐⭐⭐⭐⭐ Correct after 14 days (mastered!)
- Wrong answer drops 1 star and resets interval
- Profile page shows mastery overview grid

### Badges (16 achievements)
1. **First Steps 初次尝试** — Complete your first game
2. **Sharp Mind 思维敏捷** — Get 10 correct in a row in Term Sprint
3. **Perfect Match 完美配对** — Complete Flash Match Hard with 3 stars
4. **Commander 指挥官** — Get 100% on a Command Quest round
5. **Prompt Master 提示大师** — Score 90%+ in Prompt Lab Advanced
6. **Flow State 心流状态** — Complete Workflow Puzzle in under 30 seconds
7. **Week 1 Champion** — Pass Boss Battle 1
8. **Week 2 Champion** — Pass Boss Battle 2
9. **Week 3 Champion** — Pass Boss Battle 3
10. **Week 4 Champion** — Pass Final Boss Battle
11. **On Fire 连续7天** — 7-day streak
12. **Unstoppable 势不可挡** — 14-day streak
13. **Legendary 传奇** — 30-day streak
14. **Half Way 半程达人** — 50% of all terms at mastery (5 stars)
15. **Claude Code Ready 认证通过** — 80% mastery + all Boss Battles passed
16. **Perfectionist 完美主义者** — 100% of all terms at 5-star mastery

---

## Success Metrics

### User Success Criteria (How do you know the user achieved the goal?)

| Metric | Target | How Measured |
|--------|--------|-------------|
| **Term Mastery Rate** | ≥80% of 86 terms at 4+ stars | Spaced repetition tracker |
| **Command Accuracy** | ≥85% correct in Command Quest | Rolling average last 20 games |
| **Prompt Proficiency** | Average ≥80% in Prompt Lab | Score across all completed prompts |
| **Workflow Fluency** | Can order 8+ commands correctly | Workflow Puzzle completion rate |
| **Speed Improvement** | ≥40% faster term recognition | Compare Week 1 vs Week 4 avg response time |
| **Boss Battle Pass Rate** | All 4 battles passed | Binary pass/fail per battle |
| **30-Day Completion** | Finished curriculum | Reached Day 30 |
| **Certification Badge** | Earned "Claude Code Ready" | 80% mastery + all bosses passed |

**A user has "mastered Claude Code's language" when they earn the Claude Code Ready 认证通过 badge** — meaning ≥80% of terms at mastery, all Boss Battles passed, and demonstrated prompt-building ability.

### App Success Criteria (How do you know the app is good?)

| Metric | Target | Industry Benchmark |
|--------|--------|--------------------|
| **D1 Retention** | ≥60% | Avg mobile game: 35% |
| **D7 Retention** | ≥35% | Avg mobile game: 15% |
| **D30 Retention** | ≥20% | Avg mobile game: 5% |
| **DAU/MAU Ratio** | ≥35% | Duolingo: ~45% |
| **Avg Session Length** | 8-15 min | Sweet spot for learning games |
| **Game Completion Rate** | ≥70% | Started games that get finished |
| **30-Day Program Completion** | ≥25% | Online course avg: 5-15% |
| **NPS Score** | ≥50 | Above "excellent" threshold |
| **Organic Sharing** | ≥10% share rate | Track share button usage |
| **Certification Rate** | ≥30% of Day-14+ users | Meaningful mastery achievement |

### Leading Indicators (Early signals the app works)
- Users return Day 2 (hook worked)
- Average 3+ games played per session (engaging enough)
- Streak > 3 days (habit forming)
- Boss Battle 1 pass rate > 70% (difficulty calibrated right)
- Prompt Lab engagement (not skipped — hardest game to get right)

### Lagging Indicators (Long-term success)
- Users reference the app when using actual Claude Code
- Cross-traffic to CodeLaunch tutorial app
- Word-of-mouth referrals among Chinese student communities
- LinkedIn/WeChat posts about "Claude Code Ready" certification

---

## UI/UX Design

### Navigation
- **Bottom tab bar** (mobile-first, 5 tabs):
  1. 🏠 Home (dashboard + daily challenge)
  2. 🎮 Games (6 game modes grid)
  3. 📚 Learn (study/review cards)
  4. 🏆 Profile (stats, badges, mastery)
  5. ⚙️ Settings
- **Top bar**: App logo + streak counter + XP display + hearts

### Home Dashboard
- Today's progress ring (% of daily goal)
- Streak fire counter
- Daily Challenge card (tap to play)
- "Continue" button (resume where you left off in curriculum)
- Weekly progress bar (which day of the week you're on)
- Quick stats: terms mastered, commands learned, level

### Game Selection Screen
- 6 game cards in 2×3 grid
- Each card shows: game icon, name (bilingual), brief description, lock/unlock state
- Locked games show "Unlocks Day X" label
- Currently recommended game highlighted with glow

### In-Game UI
- **Top bar**: Timer (if timed), score, hearts remaining, pause button
- **Center**: Game-specific content area
- **Bottom**: Action buttons / answer options
- **Feedback**: Green flash + "✓ 正确!" for correct, red shake + "✗" for wrong
- **End screen**: Stars earned, XP gained, new mastery progress, "Play Again" / "Next Game"

### Visual Design
- Same CodeLaunch palette: coral primary, navy dark, cream background, mint success
- **Game cards**: Rounded corners (16px), subtle shadows, hover/tap scale effect
- **Correct answer**: Mint green flash + confetti particles
- **Wrong answer**: Gentle red shake + subtle pulse
- **Level up**: Full-screen celebration with confetti cannon
- **Boss Battle**: Dark dramatic background, epic feel, pulsing timer

### Animations & Micro-interactions
- Card flip (Flash Match): 3D CSS transform, 300ms
- Slide-in answers (Term Sprint): staggered entrance, 150ms each
- Drag-and-drop (Prompt Lab, Workflow): smooth with snap-to-grid
- Progress ring fill: animated arc on dashboard
- XP counter: counting-up animation when earned
- Streak fire: subtle flame flicker animation
- Confetti: canvas-based particle burst on achievements

---

## Implementation Steps

### Step 1: Project Scaffolding
- Create `index.html` with app shell (meta tags, fonts, PWA manifest link, CSS/JS imports)
- Create `404.html` (SPA fallback)
- Create `manifest.json` (PWA)
- Create `package.json` (tailwindcss + @tailwindcss/cli)
- Create `tailwind.config.js` (match CodeLaunch palette)
- Create `_headers` (Cloudflare security headers)
- Create `robots.txt`
- Run `npm install` and `npm run build:css`

### Step 2: Core Architecture
- Create `src/router.js` — hash-based SPA router with route matching
- Create `src/state.js` — localStorage state management (XP, level, streak, hearts, mastery, badges, settings, game history)
- Create `src/i18n.js` — bilingual translation system with `t()` function
- Create `src/audio.js` — sound effect manager (correct, wrong, levelup, complete — all toggleable)
- Create `src/app.js` — main controller: init, routing, nav rendering, error boundary

### Step 3: Engine Layer
- Create `src/engine/spaced-repetition.js` — SM-2 algorithm: schedule reviews, track intervals per term
- Create `src/engine/scoring.js` — XP calculation, combo multiplier, streak management, level thresholds
- Create `src/engine/mastery.js` — per-term star tracking (0-5), mastery percentage calculations
- Create `src/engine/timer.js` — countdown timer, elapsed timer, pause/resume utilities
- Create `src/engine/achievements.js` — badge unlock conditions, check after each game

### Step 4: Content Data
- Create `src/content/glossary-data.js` — copy 86 terms from CodeLaunch, add game metadata (difficulty tier, week assignment)
- Create `src/content/commands-data.js` — copy 45 commands from CodeLaunch, add game metadata
- Create `src/content/curriculum.js` — 30-day schedule: which terms, commands, and games unlock each day
- Create `src/content/scenarios-data.js` — 60+ Command Quest scenarios (bilingual situation → correct command)
- Create `src/content/prompts-data.js` — 30+ Prompt Lab exercises (goal + fragments + correct assembly)
- Create `src/content/workflows-data.js` — 15+ Workflow Puzzle sequences (goal + correct command order)

### Step 5: Navigation & Layout
- Create `src/components/nav.js` — bottom tab bar (5 tabs) + top bar (streak, XP, hearts)
- Style with mobile-first layout: fixed bottom nav, scrollable content area, fixed top bar
- Active tab highlight, badge count indicators
- Responsive: bottom tabs on mobile, sidebar on desktop (≥768px)

### Step 6: Home Dashboard
- Create `src/components/home.js` — daily progress ring, streak display, daily challenge card, continue button, weekly progress bar, quick stats grid
- Daily challenge: random game type with today's curriculum terms
- Progress ring: animated SVG arc showing daily completion %
- Streak: fire icon with counter + milestone celebration

### Step 7: Game 1 — Flash Match 闪卡配对
- Create `src/components/flash-match.js`
- Card grid layout (responsive: 3×2, 4×3, 5×4)
- Card flip animation (3D CSS transform)
- Match logic: flip 2 cards, check pair, animate match or flip back
- 3 difficulty levels with appropriate card counts
- Timer display, move counter, star rating calculation
- End screen with results + XP earned
- Terms sourced from current curriculum week

### Step 8: Game 2 — Command Quest 命令闯关
- Create `src/components/command-quest.js`
- Scenario display (bilingual text)
- 4 answer buttons with command names
- Correct/wrong feedback with explanation
- 10 questions per round
- Score tracking, streak multiplier
- Heart deduction on wrong answer
- Progress indicator (question 3/10)
- End screen with detailed results

### Step 9: Game 3 — Term Sprint 术语冲刺
- Create `src/components/term-sprint.js`
- 60-second countdown timer (prominent display)
- Term display (large, centered)
- 4 definition options (slide in with stagger)
- Direction toggle: EN→CN, CN→EN, Mixed
- Streak counter with multiplier display
- Speed feedback (response time per question)
- End screen: total correct, best streak, XP

### Step 10: Game 4 — Prompt Lab 提示词工坊
- Create `src/components/prompt-lab.js`
- Goal display in Chinese (what the prompt should achieve)
- Draggable prompt fragment chips
- Drop zone for assembling the prompt
- Snap-to-position with reorder support
- Score breakdown: structure, completeness, correctness
- "Example prompt" reveal button (shows ideal answer)
- 3 difficulty levels with varying fragment counts
- Touch-friendly drag on mobile

### Step 11: Game 5 — Workflow Puzzle 工作流拼图
- Create `src/components/workflow-puzzle.js`
- Workflow goal display (bilingual)
- Draggable command cards (vertical list)
- Drag-to-reorder with visual insertion indicator
- Submit button → grade the ordering
- Partial credit for close-but-not-perfect order
- Correct order reveal with explanations
- Animated "pipeline" visualization on success

### Step 12: Game 6 — Boss Battle 终极挑战
- Create `src/components/boss-battle.js`
- Dramatic dark UI theme
- 20 mixed questions from all game types
- 10-minute time limit
- No hearts consumed (but must score ≥80% to pass)
- Question types cycle: matching → multiple choice → ordering → prompt completion
- Pass/fail screen with detailed breakdown
- Pass: epic celebration + badge + unlock next week
- Fail: show weak areas + "Try Again" button

### Step 13: Daily Challenge
- Create `src/components/daily-challenge.js`
- Auto-generated mini-game from today's curriculum content
- 5 questions, mixed types
- Quick play (2-3 minutes)
- Streak maintenance: completing = keeps streak alive
- Share result card (for social/WeChat sharing)

### Step 14: Learn / Study Mode
- Create `src/components/learn.js`
- Browseable card deck of all terms and commands
- Filter by: week, category, mastery level, needs review
- Each card shows: EN term, CN translation, pinyin, definition, example, mastery stars
- Flip animation to see definition
- "Mark as known" / "Need to study" manual override
- Spaced repetition review queue: cards due for review highlighted

### Step 15: Profile & Stats
- Create `src/components/profile.js`
- Level display with XP progress bar
- Mastery overview: colored grid (86 terms + 45 commands) showing star level
- Badge showcase (earned + locked with requirements)
- Stats: total games played, accuracy rate, best streak, total XP, time spent
- Weekly progress chart (bar chart, games per day)
- Certification status: checklist of requirements for "Claude Code Ready" badge

### Step 16: Settings
- Create `src/components/settings.js`
- Language toggle (Chinese primary / English primary)
- Sound effects toggle
- Dark mode toggle
- Daily reminder notification preference
- Reset progress (with confirmation)
- Export data (JSON)
- About / Credits / Link to CodeLaunch tutorial
- App version

### Step 17: Custom CSS & Animations
- Create `src/styles/custom.css`
- Card flip 3D transform
- Confetti canvas animation
- Shake animation (wrong answer)
- Pulse animation (correct answer)
- Progress ring SVG animation
- Slide-in / slide-out transitions
- Fire flicker animation (streak)
- Drag-and-drop hover states
- Responsive breakpoints fine-tuning
- Boss Battle dramatic glow/pulse effects

### Step 18: Integration & Polish
- Wire up spaced repetition: after each game, update term mastery and schedule reviews
- Wire up achievements: check badge conditions after each game completion
- Cross-link to CodeLaunch tutorial app (nav link, "Learn more" buttons)
- Add SEO meta tags (OG tags, structured data)
- Test all game modes end-to-end
- Verify mobile touch interactions
- Check bilingual content completeness
- Performance: lazy load game components
- Final CSS build

### Step 19: PWA & Deploy
- Finalize manifest.json (icons, theme color, display: standalone)
- Test PWA install on mobile
- Create GitHub repository
- `npm run build:css`
- `wrangler pages deploy .`
- Verify live site

---

## Files to Create/Modify

### New files (30 files):
- `index.html` — App shell, meta tags, font imports
- `404.html` — SPA fallback
- `manifest.json` — PWA manifest
- `package.json` — Dependencies
- `tailwind.config.js` — Theme config
- `_headers` — Security headers
- `robots.txt` — SEO
- `src/app.js` — Main controller
- `src/router.js` — SPA router
- `src/state.js` — State management
- `src/i18n.js` — Translations
- `src/audio.js` — Sound effects
- `src/engine/spaced-repetition.js` — SM-2 algorithm
- `src/engine/scoring.js` — XP/combo/streak
- `src/engine/mastery.js` — Star tracking
- `src/engine/timer.js` — Game timers
- `src/engine/achievements.js` — Badge logic
- `src/content/glossary-data.js` — 86 terms
- `src/content/commands-data.js` — 45 commands
- `src/content/curriculum.js` — 30-day schedule
- `src/content/scenarios-data.js` — Command Quest data
- `src/content/prompts-data.js` — Prompt Lab data
- `src/content/workflows-data.js` — Workflow Puzzle data
- `src/components/nav.js` — Navigation
- `src/components/home.js` — Dashboard
- `src/components/flash-match.js` — Game 1
- `src/components/command-quest.js` — Game 2
- `src/components/term-sprint.js` — Game 3
- `src/components/prompt-lab.js` — Game 4
- `src/components/workflow-puzzle.js` — Game 5
- `src/components/boss-battle.js` — Game 6
- `src/components/daily-challenge.js` — Daily challenge
- `src/components/learn.js` — Study mode
- `src/components/profile.js` — Stats & badges
- `src/components/settings.js` — Preferences
- `src/styles/tailwind.css` — Tailwind directives
- `src/styles/custom.css` — Game animations

## Open Questions
None — ready to build. Content data (scenarios, prompt exercises, workflow sequences) will be authored during the build step alongside the game components.
