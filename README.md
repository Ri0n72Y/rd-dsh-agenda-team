# RDDSH 学习小组

小组文档与公开展示站点，使用 [VitePress](https://vitepress.dev/) 从 `docs/` 目录生成静态页面。

- [最新周报](docs/weekly/2026-10-17.md)
- [Project Team Skill](.agents/skills/project-team/SKILL.md)

## 本地预览

需要 Node.js 20 或更高版本。

```sh
npm install
npm run docs:dev
```

构建和预览静态站点：

```sh
npm run docs:build
npm run docs:preview
```

## 网站发布

合并到 `main` 后，GitHub Actions 自动构建并发布 `docs/.vitepress/dist`。首次部署前，需在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。

预期地址：https://ri0n72y.github.io/rd-dsh-agenda-team/

新增周报放在 `docs/weekly/`。如需展示在网站目录中，请同时更新 `docs/weekly/index.md` 和 `docs/.vitepress/config.mts` 的侧边栏导航。
