/**
 * Workflow Puzzle Sequences — 15+ workflow ordering challenges
 */
export const workflows = [
  {
    title: { zh: '新项目启动', en: 'New Project Setup' },
    description: { zh: '启动一个新项目并设置 Claude Code', en: 'Start a new project and set up Claude Code' },
    steps: [
      { command: 'claude', description: { zh: '启动交互式会话', en: 'Start interactive session' } },
      { command: '/init', description: { zh: '生成 CLAUDE.md', en: 'Generate CLAUDE.md' } },
      { command: '编写代码', description: { zh: '用提示词编写代码', en: 'Write code with prompts' } },
      { command: '/commit', description: { zh: '保存更改到 Git', en: 'Save changes to Git' } },
      { command: '/pr', description: { zh: '创建 Pull Request', en: 'Create Pull Request' } },
    ],
    week: 1,
    difficulty: 'easy',
  },
  {
    title: { zh: '恢复并继续工作', en: 'Resume and Continue Work' },
    description: { zh: '恢复之前的会话并继续开发', en: 'Resume a past session and continue developing' },
    steps: [
      { command: 'claude -c', description: { zh: '恢复最近的会话', en: 'Resume most recent session' } },
      { command: '/context', description: { zh: '检查上下文状态', en: 'Check context status' } },
      { command: '/compact', description: { zh: '压缩上下文释放空间', en: 'Compress context to free space' } },
      { command: '继续编码', description: { zh: '继续开发工作', en: 'Continue coding' } },
      { command: '/commit', description: { zh: '提交更改', en: 'Commit changes' } },
    ],
    week: 2,
    difficulty: 'easy',
  },
  {
    title: { zh: '代码审查流程', en: 'Code Review Flow' },
    description: { zh: '审查并合并同事的代码', en: 'Review and merge a colleague\'s code' },
    steps: [
      { command: '/diff', description: { zh: '查看代码更改', en: 'View code changes' } },
      { command: '/review', description: { zh: '进行代码审查', en: 'Perform code review' } },
      { command: '修复问题', description: { zh: '根据反馈修复问题', en: 'Fix issues based on feedback' } },
      { command: '/commit', description: { zh: '提交修复', en: 'Commit fixes' } },
      { command: '/pr', description: { zh: '更新 Pull Request', en: 'Update Pull Request' } },
    ],
    week: 3,
    difficulty: 'medium',
  },
  {
    title: { zh: '调试错误', en: 'Debug an Error' },
    description: { zh: '发现并修复代码中的错误', en: 'Find and fix a bug in your code' },
    steps: [
      { command: '/search', description: { zh: '搜索相关代码', en: 'Search for related code' } },
      { command: '/debug', description: { zh: '获取故障排除信息', en: 'Get troubleshooting info' } },
      { command: '定位问题', description: { zh: '让 Claude 分析错误', en: 'Let Claude analyze the error' } },
      { command: '修复代码', description: { zh: '实施修复方案', en: 'Implement the fix' } },
      { command: '/diff', description: { zh: '检查修改内容', en: 'Review the changes' } },
      { command: '/commit', description: { zh: '提交修复', en: 'Commit the fix' } },
    ],
    week: 3,
    difficulty: 'medium',
  },
  {
    title: { zh: '规划大型功能', en: 'Plan a Major Feature' },
    description: { zh: '使用计划模式设计然后实现新功能', en: 'Use Plan Mode to design then implement a new feature' },
    steps: [
      { command: '/plan', description: { zh: '进入计划模式', en: 'Enter Plan Mode' } },
      { command: '设计方案', description: { zh: '让 Claude 规划实现方案', en: 'Let Claude design the approach' } },
      { command: '/plan', description: { zh: '退出计划模式', en: 'Exit Plan Mode' } },
      { command: '实现代码', description: { zh: '按照方案编写代码', en: 'Write code following the plan' } },
      { command: '/diff', description: { zh: '检查更改', en: 'Review changes' } },
      { command: '/commit', description: { zh: '提交代码', en: 'Commit code' } },
    ],
    week: 3,
    difficulty: 'medium',
  },
  {
    title: { zh: '环境诊断', en: 'Environment Diagnostics' },
    description: { zh: '排查 Claude Code 环境问题', en: 'Troubleshoot Claude Code environment issues' },
    steps: [
      { command: '/doctor', description: { zh: '运行环境诊断', en: 'Run diagnostics' } },
      { command: '/debug', description: { zh: '查看详细排错信息', en: 'View detailed debug info' } },
      { command: '/config', description: { zh: '检查配置设置', en: 'Check configuration' } },
      { command: '/permissions', description: { zh: '验证权限设置', en: 'Verify permissions' } },
    ],
    week: 4,
    difficulty: 'easy',
  },
  {
    title: { zh: '设置 MCP 服务器', en: 'Set Up MCP Server' },
    description: { zh: '添加并验证 MCP 服务器连接', en: 'Add and verify an MCP server connection' },
    steps: [
      { command: 'claude mcp add', description: { zh: '添加 MCP 服务器', en: 'Add MCP server' } },
      { command: 'claude mcp list', description: { zh: '查看已配置的服务器', en: 'List configured servers' } },
      { command: '/mcp', description: { zh: '检查 MCP 状态', en: 'Check MCP status' } },
      { command: '测试连接', description: { zh: '测试服务器连接', en: 'Test the connection' } },
    ],
    week: 4,
    difficulty: 'medium',
  },
  {
    title: { zh: '优化长对话', en: 'Optimize a Long Session' },
    description: { zh: '管理一个很长的开发会话', en: 'Manage a lengthy development session' },
    steps: [
      { command: '/usage', description: { zh: '检查 token 使用量', en: 'Check token usage' } },
      { command: '/context', description: { zh: '查看上下文占用', en: 'See context consumption' } },
      { command: '/compact', description: { zh: '压缩上下文', en: 'Compress context' } },
      { command: '/export', description: { zh: '导出重要内容', en: 'Export important content' } },
      { command: '/rename', description: { zh: '给会话命名', en: 'Name the session' } },
    ],
    week: 2,
    difficulty: 'medium',
  },
  {
    title: { zh: '分支探索', en: 'Branch Exploration' },
    description: { zh: '在不同方向探索解决方案', en: 'Explore solutions in different directions' },
    steps: [
      { command: '描述问题', description: { zh: '向 Claude 描述问题', en: 'Describe the problem to Claude' } },
      { command: '/fork', description: { zh: '分支会话尝试方案A', en: 'Fork session for approach A' } },
      { command: '实现方案A', description: { zh: '尝试第一种方案', en: 'Try first approach' } },
      { command: '/resume', description: { zh: '回到原始会话', en: 'Return to original session' } },
      { command: '对比选择', description: { zh: '选择最好的方案', en: 'Compare and choose best approach' } },
    ],
    week: 2,
    difficulty: 'hard',
  },
  {
    title: { zh: '完整部署流程', en: 'Full Deploy Workflow' },
    description: { zh: '从代码完成到上线部署', en: 'From code completion to live deployment' },
    steps: [
      { command: '/diff', description: { zh: '检查所有更改', en: 'Review all changes' } },
      { command: '/commit', description: { zh: '提交代码', en: 'Commit code' } },
      { command: '/pr', description: { zh: '创建 Pull Request', en: 'Create Pull Request' } },
      { command: '/review', description: { zh: '自审代码', en: 'Self-review code' } },
      { command: '合并部署', description: { zh: '合并并部署', en: 'Merge and deploy' } },
    ],
    week: 3,
    difficulty: 'medium',
  },
  {
    title: { zh: '性能调优', en: 'Performance Tuning' },
    description: { zh: '调整 Claude Code 以获得最佳性能', en: 'Tune Claude Code for best performance' },
    steps: [
      { command: '/model', description: { zh: '选择合适的模型', en: 'Choose the right model' } },
      { command: '/fast', description: { zh: '开启快速模式', en: 'Enable Fast Mode' } },
      { command: '/effort', description: { zh: '调整思考深度', en: 'Adjust thinking depth' } },
      { command: '/cost', description: { zh: '检查费用', en: 'Check costs' } },
    ],
    week: 3,
    difficulty: 'easy',
  },
  {
    title: { zh: '团队协作', en: 'Team Collaboration' },
    description: { zh: '与团队成员协同开发', en: 'Collaborate with team members' },
    steps: [
      { command: '/init', description: { zh: '统一项目配置', en: 'Standardize project config' } },
      { command: '/install-github-app', description: { zh: '设置自动审查', en: 'Set up auto-review' } },
      { command: '编写代码', description: { zh: '开发新功能', en: 'Develop new feature' } },
      { command: '/commit', description: { zh: '提交更改', en: 'Commit changes' } },
      { command: '/pr', description: { zh: '创建 PR', en: 'Create PR' } },
      { command: '/review', description: { zh: '请求代码审查', en: 'Request code review' } },
    ],
    week: 4,
    difficulty: 'hard',
  },
  {
    title: { zh: '会话管理', en: 'Session Management' },
    description: { zh: '高效管理多个开发会话', en: 'Efficiently manage multiple dev sessions' },
    steps: [
      { command: '/rename', description: { zh: '命名当前会话', en: 'Name current session' } },
      { command: '/export', description: { zh: '导出会话记录', en: 'Export session log' } },
      { command: '/fork', description: { zh: '创建分支会话', en: 'Fork into new session' } },
      { command: 'claude -r "ID"', description: { zh: '切换到其他会话', en: 'Switch to another session' } },
    ],
    week: 2,
    difficulty: 'medium',
  },
  {
    title: { zh: '插件生态', en: 'Plugin Ecosystem' },
    description: { zh: '扩展 Claude Code 的能力', en: 'Extend Claude Code capabilities' },
    steps: [
      { command: '/plugin', description: { zh: '浏览插件市场', en: 'Browse plugin marketplace' } },
      { command: '/skills', description: { zh: '查看已安装技能', en: 'View installed skills' } },
      { command: 'claude mcp add', description: { zh: '添加 MCP 工具', en: 'Add MCP tool' } },
      { command: '/ide', description: { zh: '配置 IDE 集成', en: 'Configure IDE integration' } },
      { command: '/doctor', description: { zh: '验证一切正常', en: 'Verify everything works' } },
    ],
    week: 4,
    difficulty: 'hard',
  },
];

export function getWorkflowsForWeek(week) {
  return workflows.filter(w => w.week <= week);
}

export function getRandomWorkflow(week = null, difficulty = null) {
  let pool = [...workflows];
  if (week) pool = pool.filter(w => w.week <= week);
  if (difficulty) pool = pool.filter(w => w.difficulty === difficulty);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
