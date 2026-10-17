import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'RDDSH 学习小组',
  description: 'AI 工具、Harness、Agent 与工作流实践交流',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '周报', link: '/weekly/' },
      { text: 'GitHub', link: 'https://github.com/Ri0n72Y/rd-dsh-agenda-team' },
    ],
    sidebar: {
      '/weekly/': [
        {
          text: '周报',
          items: [
            { text: '周报索引', link: '/weekly/' },
            { text: '2026-10-17 · 第一期', link: '/weekly/2026-10-17' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ri0n72Y/rd-dsh-agenda-team' },
    ],
    search: { provider: 'local' },
    outline: { label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    editLink: {
      pattern: 'https://github.com/Ri0n72Y/rd-dsh-agenda-team/edit/main/docs/:path',
      text: '在 GitHub 上编辑本页',
    },
  },
})
