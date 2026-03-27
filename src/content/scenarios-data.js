/**
 * Command Quest Scenarios — 60+ bilingual scenarios
 */
export const scenarios = [
  // ── Week 1: Basics ──
  { scenario: { zh: '你想开始使用 Claude Code，需要启动一个交互式会话。', en: 'You want to start using Claude Code and need to begin an interactive session.' }, answer: 'claude', options: ['claude', 'claude -p', '/init', '/help'], week: 1 },
  { scenario: { zh: '你想快速问 Claude 一个问题，不需要持续对话。', en: 'You want to quickly ask Claude a question without a full conversation.' }, answer: 'claude -p', options: ['claude -p', 'claude', '/clear', '/help'], week: 1 },
  { scenario: { zh: '你刚开始一个新项目，想让 Claude Code 了解你的项目规则。', en: 'You just started a new project and want Claude Code to know your project rules.' }, answer: '/init', options: ['/init', '/memory', '/config', '/help'], week: 1 },
  { scenario: { zh: '你不记得有哪些命令可以用了。', en: 'You forgot what commands are available.' }, answer: '/help', options: ['/help', '/context', '/clear', '/doctor'], week: 1 },
  { scenario: { zh: '对话变得太长了，你想重新开始。', en: 'The conversation has gotten too long and you want to start fresh.' }, answer: '/clear', options: ['/clear', '/compact', '/context', '/fork'], week: 1 },
  { scenario: { zh: '你想查看当前上下文窗口里有什么内容。', en: 'You want to see what is in your current context window.' }, answer: '/context', options: ['/context', '/compact', '/clear', '/usage'], week: 1 },
  { scenario: { zh: '你想编辑项目的 CLAUDE.md 文件。', en: 'You want to edit your project\'s CLAUDE.md file.' }, answer: '/memory', options: ['/memory', '/init', '/config', '/context'], week: 1 },
  { scenario: { zh: '你想带一个具体的问题开始新的会话。', en: 'You want to start a new session with a specific question.' }, answer: 'claude "问题"', options: ['claude "问题"', 'claude', 'claude -p', '/init'], week: 1 },

  // ── Week 2: Navigation ──
  { scenario: { zh: '你的会话占用了太多内存，需要释放空间。', en: 'Your session is using too much memory and you need to free up space.' }, answer: '/compact', options: ['/compact', '/clear', '/context', '/export'], week: 2 },
  { scenario: { zh: '你想继续昨天的工作。', en: 'You want to continue where you left off yesterday.' }, answer: '/resume', options: ['/resume', 'claude -c', '/fork', '/clear'], week: 2 },
  { scenario: { zh: '你想在当前对话的基础上开一个新的分支方向。', en: 'You want to branch off the current conversation in a new direction.' }, answer: '/fork', options: ['/fork', '/resume', '/clear', '/rename'], week: 2 },
  { scenario: { zh: '你想给当前的会话起一个有意义的名字。', en: 'You want to give the current session a meaningful name.' }, answer: '/rename', options: ['/rename', '/fork', '/memory', '/init'], week: 2 },
  { scenario: { zh: '你需要让 Claude Code 也能访问另一个项目的文件。', en: 'You need Claude Code to also access files from another project.' }, answer: '/add-dir', options: ['/add-dir', '/context', '/search', '/init'], week: 2 },
  { scenario: { zh: '你想把 Claude Code 生成的代码复制到剪贴板。', en: 'You want to copy code that Claude Code generated to your clipboard.' }, answer: '/copy', options: ['/copy', '/export', '/diff', '/search'], week: 2 },
  { scenario: { zh: '你想看看 Claude 对项目做了哪些修改。', en: 'You want to see what changes Claude made to your project.' }, answer: '/diff', options: ['/diff', '/search', '/commit', '/context'], week: 2 },
  { scenario: { zh: '你想把整个对话保存下来分享给同事。', en: 'You want to save the entire conversation to share with a colleague.' }, answer: '/export', options: ['/export', '/copy', '/diff', '/rename'], week: 2 },
  { scenario: { zh: '你想知道这个会话用了多少 token。', en: 'You want to know how many tokens this session has used.' }, answer: '/usage', options: ['/usage', '/cost', '/context', '/stats'], week: 2 },
  { scenario: { zh: '你想看看当前会话花了多少钱。', en: 'You want to check how much the current session costs.' }, answer: '/cost', options: ['/cost', '/usage', '/stats', '/context'], week: 2 },
  { scenario: { zh: '你想调整 Claude 的思考深度。', en: 'You want to adjust how deeply Claude thinks.' }, answer: '/effort', options: ['/effort', '/model', '/fast', '/config'], week: 2 },
  { scenario: { zh: '你想快速恢复最近一次的会话。', en: 'You want to quickly resume your most recent session.' }, answer: 'claude -c', options: ['claude -c', '/resume', 'claude -r "ID"', 'claude'], week: 2 },

  // ── Week 3: Building ──
  { scenario: { zh: '你想在项目中搜索某个函数的定义。', en: 'You want to search for a function definition in your project.' }, answer: '/search', options: ['/search', '/diff', '/vim', '/context'], week: 3 },
  { scenario: { zh: '你的代码改好了，想保存到 Git。', en: 'Your code changes are ready and you want to save them to Git.' }, answer: '/commit', options: ['/commit', '/pr', '/diff', '/export'], week: 3 },
  { scenario: { zh: '你想把改好的代码提交为 Pull Request。', en: 'You want to submit your changes as a Pull Request.' }, answer: '/pr', options: ['/pr', '/commit', '/diff', '/review'], week: 3 },
  { scenario: { zh: '你想用 Vim 编辑器快速修改一个文件。', en: 'You want to quickly edit a file with the Vim editor.' }, answer: '/vim', options: ['/vim', '/search', '/diff', '/copy'], week: 3 },
  { scenario: { zh: '你想让 Claude 只规划方案而不写代码。', en: 'You want Claude to only plan a solution without writing code.' }, answer: '/plan', options: ['/plan', '/model', '/fast', '/config'], week: 3 },
  { scenario: { zh: '你需要 Claude 加快输出速度。', en: 'You need Claude to output faster.' }, answer: '/fast', options: ['/fast', '/model', '/effort', '/plan'], week: 3 },
  { scenario: { zh: '你想切换到更强大的 Claude 模型。', en: 'You want to switch to a more powerful Claude model.' }, answer: '/model', options: ['/model', '/fast', '/effort', '/config'], week: 3 },
  { scenario: { zh: '你想检查和修改 Claude Code 的工具权限。', en: 'You want to check and modify Claude Code\'s tool permissions.' }, answer: '/permissions', options: ['/permissions', '/config', '/model', '/plan'], week: 3 },
  { scenario: { zh: '你想打开 Claude Code 的配置界面。', en: 'You want to open Claude Code\'s configuration settings.' }, answer: '/config', options: ['/config', '/permissions', '/model', '/init'], week: 3 },
  { scenario: { zh: '你想配置终端的状态栏。', en: 'You want to configure the terminal status line.' }, answer: '/terminal-setup', options: ['/terminal-setup', '/config', '/permissions', '/init'], week: 3 },
  { scenario: { zh: '你想通过特定的会话 ID 恢复之前的对话。', en: 'You want to resume a specific past session by its ID.' }, answer: 'claude -r "ID"', options: ['claude -r "ID"', 'claude -c', '/resume', 'claude'], week: 3 },
  { scenario: { zh: '你想把 Claude Code 更新到最新版本。', en: 'You want to update Claude Code to the latest version.' }, answer: 'claude update', options: ['claude update', '/doctor', '/config', '/help'], week: 3 },

  // ── Week 4: Mastery ──
  { scenario: { zh: '你想看看后台有哪些任务在运行。', en: 'You want to check what tasks are running in the background.' }, answer: '/tasks', options: ['/tasks', '/stats', '/debug', '/usage'], week: 4 },
  { scenario: { zh: '你的 Claude Code 出了问题，想运行诊断。', en: 'Claude Code is having issues and you want to run diagnostics.' }, answer: '/doctor', options: ['/doctor', '/debug', '/stats', '/help'], week: 4 },
  { scenario: { zh: '你想生成一份使用统计报告。', en: 'You want to generate a usage statistics report.' }, answer: '/stats', options: ['/stats', '/usage', '/cost', '/debug'], week: 4 },
  { scenario: { zh: '你遇到了问题，需要查看故障排除信息。', en: 'You have a problem and need troubleshooting info.' }, answer: '/debug', options: ['/debug', '/doctor', '/stats', '/help'], week: 4 },
  { scenario: { zh: '你想查看已配置的 MCP 服务器状态。', en: 'You want to check the status of configured MCP servers.' }, answer: '/mcp', options: ['/mcp', '/plugin', '/config', '/doctor'], week: 4 },
  { scenario: { zh: '你想管理 Claude Code 的插件。', en: 'You want to manage Claude Code\'s plugins.' }, answer: '/plugin', options: ['/plugin', '/mcp', '/skills', '/config'], week: 4 },
  { scenario: { zh: '你想让 Claude 审查一个 Pull Request。', en: 'You want Claude to review a Pull Request.' }, answer: '/review', options: ['/review', '/pr', '/diff', '/commit'], week: 4 },
  { scenario: { zh: '你想查看和管理已安装的技能。', en: 'You want to view and manage installed skills.' }, answer: '/skills', options: ['/skills', '/plugin', '/mcp', '/help'], week: 4 },
  { scenario: { zh: '你想管理 IDE 集成设置。', en: 'You want to manage IDE integration settings.' }, answer: '/ide', options: ['/ide', '/config', '/terminal-setup', '/plugin'], week: 4 },
  { scenario: { zh: '你想设置 GitHub 的自动 PR 审查。', en: 'You want to set up automatic PR reviews on GitHub.' }, answer: '/install-github-app', options: ['/install-github-app', '/review', '/pr', '/mcp'], week: 4 },
  { scenario: { zh: '你想添加一个新的 MCP 服务器。', en: 'You want to add a new MCP server.' }, answer: 'claude mcp add', options: ['claude mcp add', 'claude mcp list', '/mcp', '/plugin'], week: 4 },
  { scenario: { zh: '你想查看已配置的 MCP 服务器列表。', en: 'You want to see the list of configured MCP servers.' }, answer: 'claude mcp list', options: ['claude mcp list', 'claude mcp add', '/mcp', '/config'], week: 4 },
  { scenario: { zh: '你想恢复与某个 PR 关联的会话。', en: 'You want to resume a session linked to a specific PR.' }, answer: 'claude --from-pr', options: ['claude --from-pr', 'claude -r "ID"', '/review', '/pr'], week: 4 },

  // ── Extra scenarios for variety ──
  { scenario: { zh: '你的项目对话太杂乱了，想压缩后继续。', en: 'Your project conversation is cluttered and you want to compress it.' }, answer: '/compact', options: ['/compact', '/clear', '/resume', '/fork'], week: 2 },
  { scenario: { zh: '你想让 Claude Code 少做确认，多自动执行。', en: 'You want Claude Code to auto-execute more with fewer confirmations.' }, answer: '/permissions', options: ['/permissions', '/config', '/fast', '/plan'], week: 3 },
  { scenario: { zh: '你改完代码后想先看看改了什么再提交。', en: 'After editing code, you want to review changes before committing.' }, answer: '/diff', options: ['/diff', '/commit', '/search', '/export'], week: 3 },
  { scenario: { zh: '你想减少思考时间让 Claude 回复更快。', en: 'You want to reduce thinking time for faster Claude replies.' }, answer: '/effort', options: ['/effort', '/fast', '/model', '/compact'], week: 2 },
  { scenario: { zh: '项目结构复杂，你想让 Claude 先规划再动手。', en: 'The project is complex and you want Claude to plan before coding.' }, answer: '/plan', options: ['/plan', '/init', '/memory', '/model'], week: 3 },
  { scenario: { zh: '你想在不退出当前会话的情况下编辑文件。', en: 'You want to edit a file without leaving the current session.' }, answer: '/vim', options: ['/vim', '/search', '/copy', '/diff'], week: 3 },
  { scenario: { zh: '你想检查 Claude Code 环境是否配置正确。', en: 'You want to verify your Claude Code environment is set up correctly.' }, answer: '/doctor', options: ['/doctor', '/debug', '/config', '/stats'], week: 4 },
  { scenario: { zh: '你想用低成本模型处理简单任务。', en: 'You want to use a cheaper model for simple tasks.' }, answer: '/model', options: ['/model', '/fast', '/effort', '/cost'], week: 3 },
  { scenario: { zh: '你完成了代码改动，想一次性暂存并提交。', en: 'You finished code changes and want to stage and commit at once.' }, answer: '/commit', options: ['/commit', '/diff', '/pr', '/export'], week: 3 },
  { scenario: { zh: '你想让 Claude 审查代码质量。', en: 'You want Claude to review code quality.' }, answer: '/review', options: ['/review', '/diff', '/commit', '/search'], week: 4 },
];

export function getScenariosForWeek(week) {
  return scenarios.filter(s => s.week === week);
}

export function getRandomScenarios(count, week = null) {
  let pool = week ? scenarios.filter(s => s.week <= week) : [...scenarios];
  const result = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}
