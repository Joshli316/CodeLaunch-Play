/**
 * Prompt Lab Exercises — 30+ prompt construction exercises
 */
export const promptExercises = [
  // ── Beginner (3-4 fragments) ──
  {
    goal: { zh: '让 Claude 创建一个简单的 HTML 页面', en: 'Ask Claude to create a simple HTML page' },
    fragments: ['Create', 'a simple HTML page', 'with a title and heading'],
    correctOrder: [0, 1, 2],
    difficulty: 'easy',
    week: 1,
  },
  {
    goal: { zh: '让 Claude 修复一个按钮的错误', en: 'Ask Claude to fix a bug in a button' },
    fragments: ['Fix the bug', 'in the submit button', 'that prevents form submission'],
    correctOrder: [0, 1, 2],
    difficulty: 'easy',
    week: 1,
  },
  {
    goal: { zh: '让 Claude 解释一段代码', en: 'Ask Claude to explain a piece of code' },
    fragments: ['Explain how', 'the login function', 'works in app.js'],
    correctOrder: [0, 1, 2],
    difficulty: 'easy',
    week: 1,
  },
  {
    goal: { zh: '让 Claude 添加一个导航栏', en: 'Ask Claude to add a navigation bar' },
    fragments: ['Add a navigation bar', 'at the top of the page', 'with links to Home and About'],
    correctOrder: [0, 1, 2],
    difficulty: 'easy',
    week: 1,
  },
  {
    goal: { zh: '让 Claude 写一个 JavaScript 函数', en: 'Ask Claude to write a JavaScript function' },
    fragments: ['Write a function', 'that calculates', 'the total price', 'of items in the cart'],
    correctOrder: [0, 1, 2, 3],
    difficulty: 'easy',
    week: 1,
  },

  // ── Intermediate (5-6 fragments) ──
  {
    goal: { zh: '让 Claude 创建一个登录页面', en: 'Ask Claude to create a login page' },
    fragments: ['Create a login page', 'with email and password fields', 'using Tailwind CSS', 'that validates input', 'before submitting'],
    correctOrder: [0, 1, 2, 3, 4],
    difficulty: 'medium',
    week: 2,
  },
  {
    goal: { zh: '让 Claude 给页面添加深色模式', en: 'Ask Claude to add dark mode to the page' },
    fragments: ['Add a dark mode toggle', 'to the settings page', 'that saves the preference', 'in localStorage', 'and applies it on page load'],
    correctOrder: [0, 1, 2, 3, 4],
    difficulty: 'medium',
    week: 2,
  },
  {
    goal: { zh: '让 Claude 创建一个响应式卡片组件', en: 'Ask Claude to create a responsive card component' },
    fragments: ['Create a responsive card', 'with an image, title, and description', 'that uses CSS grid', 'displays 3 columns on desktop', 'and 1 column on mobile'],
    correctOrder: [0, 1, 2, 3, 4],
    difficulty: 'medium',
    week: 2,
  },
  {
    goal: { zh: '让 Claude 添加表单验证', en: 'Ask Claude to add form validation' },
    fragments: ['Add validation', 'to the registration form', 'check that email is valid', 'password is at least 8 characters', 'and show error messages', 'below each field'],
    correctOrder: [0, 1, 2, 3, 4, 5],
    difficulty: 'medium',
    week: 2,
  },
  {
    goal: { zh: '让 Claude 实现搜索功能', en: 'Ask Claude to implement search functionality' },
    fragments: ['Implement a search feature', 'that filters the product list', 'as the user types', 'matching both name and description', 'with debounced input'],
    correctOrder: [0, 1, 2, 3, 4],
    difficulty: 'medium',
    week: 2,
  },
  {
    goal: { zh: '让 Claude 优化页面加载速度', en: 'Ask Claude to optimize page load speed' },
    fragments: ['Optimize the page', 'by lazy loading images', 'minifying CSS and JavaScript', 'and adding proper caching headers', 'to reduce load time'],
    correctOrder: [0, 1, 2, 3, 4],
    difficulty: 'medium',
    week: 3,
  },
  {
    goal: { zh: '让 Claude 创建一个数据展示仪表盘', en: 'Ask Claude to create a data dashboard' },
    fragments: ['Create a dashboard page', 'that shows key metrics', 'with bar charts and line graphs', 'using the Chart.js library', 'responsive for mobile', 'with a date range picker'],
    correctOrder: [0, 1, 2, 3, 4, 5],
    difficulty: 'medium',
    week: 3,
  },

  // ── Advanced (7-8 fragments) ──
  {
    goal: { zh: '让 Claude 构建一个完整的待办事项应用', en: 'Ask Claude to build a complete todo app' },
    fragments: ['Build a todo app', 'with add, edit, and delete functionality', 'that stores data in localStorage', 'supports drag-and-drop reordering', 'has filter options for all, active, and completed', 'uses smooth animations', 'and is fully responsive'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    difficulty: 'hard',
    week: 3,
  },
  {
    goal: { zh: '让 Claude 重构一个复杂的组件', en: 'Ask Claude to refactor a complex component' },
    fragments: ['Refactor the UserProfile component', 'in src/components/profile.js', 'to separate concerns', 'extract the avatar logic into its own module', 'add error handling for API calls', 'use async/await instead of callbacks', 'and add JSDoc comments'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    difficulty: 'hard',
    week: 3,
  },
  {
    goal: { zh: '让 Claude 创建一个多步骤表单', en: 'Ask Claude to create a multi-step form' },
    fragments: ['Create a multi-step registration form', 'with 3 steps: personal info, preferences, and confirmation', 'include a progress indicator at the top', 'validate each step before allowing next', 'save progress so users can go back', 'add smooth transition animations between steps', 'and submit all data on the final step'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    difficulty: 'hard',
    week: 3,
  },
  {
    goal: { zh: '让 Claude 调试并修复性能问题', en: 'Ask Claude to debug and fix performance issues' },
    fragments: ['Debug why', 'the product listing page', 'takes over 5 seconds to load', 'check for unnecessary re-renders', 'optimize the data fetching logic', 'add pagination instead of loading all items', 'implement virtual scrolling for the list', 'and cache API responses'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    difficulty: 'hard',
    week: 4,
  },
  {
    goal: { zh: '让 Claude 为项目添加测试', en: 'Ask Claude to add tests for the project' },
    fragments: ['Write tests', 'for the authentication module', 'covering login, logout, and session refresh', 'use the testing library of your choice', 'mock the API responses', 'test both success and error cases', 'ensure coverage above 80%'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    difficulty: 'hard',
    week: 4,
  },
  {
    goal: { zh: '让 Claude 审查一个 Pull Request', en: 'Ask Claude to review a Pull Request' },
    fragments: ['Review this PR', 'and check for security vulnerabilities', 'verify the code follows our style guide', 'suggest performance improvements', 'check that all edge cases are handled', 'and confirm test coverage is adequate', 'provide feedback as inline comments'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    difficulty: 'hard',
    week: 4,
  },
  {
    goal: { zh: '让 Claude 设计一个 REST API', en: 'Ask Claude to design a REST API' },
    fragments: ['Design a REST API', 'for a blog platform', 'with endpoints for posts, comments, and users', 'include proper HTTP methods', 'add authentication middleware', 'use pagination for list endpoints', 'return consistent error responses', 'and document with OpenAPI spec'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    difficulty: 'hard',
    week: 4,
  },
];

export function getExercisesForDifficulty(difficulty) {
  return promptExercises.filter(e => e.difficulty === difficulty);
}

export function getRandomExercise(difficulty, week = null) {
  let pool = promptExercises.filter(e => e.difficulty === difficulty);
  if (week) pool = pool.filter(e => e.week <= week);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
