/**
 * Bilingual Translation System
 */
import { getState } from './state.js';

const translations = {
  // Navigation
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.games': { zh: '游戏', en: 'Games' },
  'nav.learn': { zh: '学习', en: 'Learn' },
  'nav.profile': { zh: '我的', en: 'Profile' },
  'nav.settings': { zh: '设置', en: 'Settings' },

  // Top bar
  'topbar.streak': { zh: '连续', en: 'Streak' },
  'topbar.hearts': { zh: '生命', en: 'Hearts' },

  // Home
  'home.welcome': { zh: '欢迎回来！', en: 'Welcome back!' },
  'home.dailyChallenge': { zh: '每日挑战', en: 'Daily Challenge' },
  'home.continue': { zh: '继续学习', en: 'Continue' },
  'home.todayProgress': { zh: '今日进度', en: "Today's Progress" },
  'home.termsLearned': { zh: '已学术语', en: 'Terms Learned' },
  'home.commandsLearned': { zh: '已学命令', en: 'Commands Learned' },
  'home.weekProgress': { zh: '本周进度', en: 'Weekly Progress' },
  'home.day': { zh: '第{n}天', en: 'Day {n}' },

  // Games
  'games.title': { zh: '游戏', en: 'Games' },
  'games.flashMatch': { zh: '闪卡配对', en: 'Flash Match' },
  'games.flashMatchDesc': { zh: '翻转卡片，匹配中英文对', en: 'Flip cards, match EN/CN pairs' },
  'games.commandQuest': { zh: '命令闯关', en: 'Command Quest' },
  'games.commandQuestDesc': { zh: '根据场景选择正确命令', en: 'Pick the right command for each scenario' },
  'games.termSprint': { zh: '术语冲刺', en: 'Term Sprint' },
  'games.termSprintDesc': { zh: '60秒极速术语测验', en: '60-second speed definition quiz' },
  'games.promptLab': { zh: '提示词工坊', en: 'Prompt Lab' },
  'games.promptLabDesc': { zh: '拖拽拼接提示词', en: 'Drag & drop to build prompts' },
  'games.workflowPuzzle': { zh: '工作流拼图', en: 'Workflow Puzzle' },
  'games.workflowPuzzleDesc': { zh: '排列命令的正确顺序', en: 'Order commands in the right sequence' },
  'games.bossBattle': { zh: '终极挑战', en: 'Boss Battle' },
  'games.bossBattleDesc': { zh: '综合测试，证明你的实力', en: 'Comprehensive test of your skills' },
  'games.locked': { zh: '第{n}天解锁', en: 'Unlocks Day {n}' },

  // In-game
  'game.score': { zh: '得分', en: 'Score' },
  'game.time': { zh: '时间', en: 'Time' },
  'game.correct': { zh: '正确！', en: 'Correct!' },
  'game.wrong': { zh: '再想想', en: 'Try again' },
  'game.complete': { zh: '完成！', en: 'Complete!' },
  'game.playAgain': { zh: '再来一次', en: 'Play Again' },
  'game.next': { zh: '下一个', en: 'Next' },
  'game.back': { zh: '返回', en: 'Back' },
  'game.start': { zh: '开始', en: 'Start' },
  'game.pause': { zh: '暂停', en: 'Pause' },
  'game.resume': { zh: '继续', en: 'Resume' },
  'game.xpEarned': { zh: '获得 {n} XP', en: '{n} XP earned' },
  'game.stars': { zh: '{n} 星', en: '{n} Stars' },
  'game.moves': { zh: '步数', en: 'Moves' },
  'game.streak': { zh: '连击', en: 'Streak' },
  'game.combo': { zh: '连击 x{n}', en: 'Combo x{n}' },
  'game.question': { zh: '第 {a}/{b} 题', en: 'Q {a}/{b}' },
  'game.easy': { zh: '简单', en: 'Easy' },
  'game.medium': { zh: '中等', en: 'Medium' },
  'game.hard': { zh: '困难', en: 'Hard' },
  'game.passed': { zh: '通过！', en: 'Passed!' },
  'game.failed': { zh: '未通过', en: 'Not Passed' },
  'game.tryAgain': { zh: '再试一次', en: 'Try Again' },
  'game.accuracy': { zh: '正确率', en: 'Accuracy' },

  // Boss Battle
  'boss.title': { zh: '终极挑战', en: 'Boss Battle' },
  'boss.week': { zh: '第{n}周', en: 'Week {n}' },
  'boss.passRate': { zh: '需要 80% 才能通过', en: 'Need 80% to pass' },
  'boss.unlockNext': { zh: '解锁下一周内容！', en: 'Next week unlocked!' },

  // Daily Challenge
  'daily.title': { zh: '每日挑战', en: 'Daily Challenge' },
  'daily.completed': { zh: '今日已完成！', en: 'Completed today!' },
  'daily.streakKept': { zh: '连续打卡保持！', en: 'Streak maintained!' },

  // Learn
  'learn.title': { zh: '学习', en: 'Learn' },
  'learn.allTerms': { zh: '所有术语', en: 'All Terms' },
  'learn.allCommands': { zh: '所有命令', en: 'All Commands' },
  'learn.needsReview': { zh: '需要复习', en: 'Needs Review' },
  'learn.mastered': { zh: '已掌握', en: 'Mastered' },

  // Profile
  'profile.title': { zh: '我的', en: 'Profile' },
  'profile.level': { zh: '等级', en: 'Level' },
  'profile.totalXP': { zh: '总经验值', en: 'Total XP' },
  'profile.gamesPlayed': { zh: '游戏次数', en: 'Games Played' },
  'profile.accuracy': { zh: '正确率', en: 'Accuracy' },
  'profile.bestStreak': { zh: '最长连续', en: 'Best Streak' },
  'profile.badges': { zh: '成就徽章', en: 'Badges' },
  'profile.mastery': { zh: '掌握概览', en: 'Mastery Overview' },
  'profile.certification': { zh: '认证状态', en: 'Certification' },
  'profile.certReady': { zh: 'Claude Code Ready 认证通过', en: 'Claude Code Ready Certified' },

  // Settings
  'settings.title': { zh: '设置', en: 'Settings' },
  'settings.language': { zh: '界面语言', en: 'Language' },
  'settings.sound': { zh: '音效', en: 'Sound Effects' },
  'settings.darkMode': { zh: '深色模式', en: 'Dark Mode' },
  'settings.reset': { zh: '重置进度', en: 'Reset Progress' },
  'settings.resetConfirm': { zh: '确定要重置所有进度吗？此操作不可撤销。', en: 'Are you sure you want to reset all progress? This cannot be undone.' },
  'settings.export': { zh: '导出数据', en: 'Export Data' },
  'settings.about': { zh: '关于', en: 'About' },
  'settings.version': { zh: '版本', en: 'Version' },

  // Levels
  'level.1': { zh: '新手', en: 'Beginner' },
  'level.2': { zh: '学徒', en: 'Apprentice' },
  'level.3': { zh: '探索者', en: 'Explorer' },
  'level.4': { zh: '建造者', en: 'Builder' },
  'level.5': { zh: '创造者', en: 'Creator' },
  'level.6': { zh: '发布者', en: 'Shipper' },

  // Prompt Lab
  'promptLab.goal': { zh: '目标', en: 'Goal' },
  'promptLab.fragments': { zh: '拖拽下方碎片组成提示词', en: 'Drag fragments below to build the prompt' },
  'promptLab.dropZone': { zh: '将碎片拖到这里', en: 'Drop fragments here' },
  'promptLab.check': { zh: '检查答案', en: 'Check Answer' },
  'promptLab.showAnswer': { zh: '查看答案', en: 'Show Answer' },

  // Workflow Puzzle
  'workflow.goal': { zh: '目标', en: 'Goal' },
  'workflow.instructions': { zh: '拖拽排列正确的命令顺序', en: 'Drag to arrange commands in the correct order' },
  'workflow.submit': { zh: '提交', en: 'Submit' },
  'workflow.correctOrder': { zh: '正确顺序', en: 'Correct Order' },

  // Empty states
  'empty.noTerms': { zh: '暂无可用术语，完成更多天数！', en: 'No terms available yet. Complete more days!' },
  'empty.notEnoughTerms': { zh: '可用术语不足', en: 'Not enough terms available yet.' },
  'empty.noExercises': { zh: '该难度暂无练习', en: 'No exercises available for this difficulty yet.' },
  'empty.noWorkflows': { zh: '暂无可用工作流', en: 'No workflows available yet.' },
  'empty.noTermsMatch': { zh: '没有匹配的术语', en: 'No terms match this filter.' },
  'empty.noCommandsMatch': { zh: '没有匹配的命令', en: 'No commands match this filter.' },

  // Learn
  'learn.reviewDue': { zh: '待复习', en: 'Review Due' },
  'learn.week': { zh: '第{n}周', en: 'W{n}' },

  // Boss Battle
  'boss.questionCount': { zh: '20题 · 10分钟', en: '20 questions · 10 minutes' },
  'boss.typeTerm': { zh: '📝 术语', en: '📝 Term' },
  'boss.typeScenario': { zh: '🎯 场景', en: '🎯 Scenario' },
  'boss.typeCommand': { zh: '⌨️ 命令', en: '⌨️ Command' },
  'boss.correct': { zh: '答对', en: 'correct' },

  // Prompt Lab
  'promptLab.correctPrompt': { zh: '正确的提示词：', en: 'Correct prompt:' },
  'promptLab.yourPrompt': { zh: '你的提示词：', en: 'Your prompt:' },

  // Profile
  'profile.levelShort': { zh: 'Lv.{n}', en: 'Lv.{n}' },
  'profile.bossStatus': { zh: 'Boss Battle {n}', en: 'Boss Battle {n}' },
  'profile.passed': { zh: '已通过', en: 'passed' },

  // Misc
  'game.hiddenCard': { zh: '隐藏卡片', en: 'Hidden card' },
  'game.moveUp': { zh: '上移 {cmd}', en: 'Move {cmd} up' },
  'game.moveDown': { zh: '下移 {cmd}', en: 'Move {cmd} down' },
};

export function t(key, params = {}) {
  const lang = getState().settings.language;
  const entry = translations[key];
  if (!entry) return key;
  let text = entry[lang] || entry.zh || key;
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

export function setLanguage(lang) {
  // handled via state.settings.language
}

export function bilingual(zhOrObj, en) {
  if (typeof zhOrObj === 'object' && zhOrObj !== null) {
    const lang = getState().settings.language;
    return zhOrObj[lang] || zhOrObj.zh || '';
  }
  const lang = getState().settings.language;
  return lang === 'en' ? (en || zhOrObj) : zhOrObj;
}
