# RDDSH 学习小组

本仓库通过 [VitePress](https://vitepress.dev/) 将 `docs/` 目录中的 Markdown 编译为静态网站，并由 Vercel 发布。

网站：https://rd-dsh-agenda-team.vercel.app/

- [第一期周报](docs/weekly/2026-10-17.md)
- [Project Team Skill](.agents/skills/project-team/SKILL.md)

## 本地预览

需要 Node.js 22 或更高版本。

```sh
npm install
npm run docs:dev
```

构建和预览静态网站：

```sh
npm run docs:build
npm run docs:preview
```

## 部署

Vercel 从 `main` 部署，仓库根目录的 `vercel.json` 指定：

- 构建命令：`npm run docs:build`
- 输出目录：`docs/.vitepress/dist`
- 清理 URL：`cleanUrls: true`（与 VitePress 配置保持一致）

网站部署在域名根路径 `/`，因此第一期周报地址为 https://rd-dsh-agenda-team.vercel.app/weekly/2026-10-17 。旧的 `/rd-dsh-agenda-team/` 路径由 Vercel 重定向到新路径。

GitHub Actions 负责检查构建结果，不再尝试部署到 GitHub Pages。

新增周报放在 `docs/weekly/`。如需列入网站目录，同时更新 `docs/weekly/index.md` 和 `docs/.vitepress/config.mts` 的侧边栏。
