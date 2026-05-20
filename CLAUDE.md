# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 [Gmeek](https://github.com/Meekdai/Gmeek) 的 GitHub Pages 博客。博客文章以 GitHub Issues 形式撰写，通过 GitHub Actions 自动生成静态 HTML 并部署到 GitHub Pages。

博客地址: https://YUhuan83.github.io

## 架构

```
GitHub Issues (文章源) 
    → Gmeek workflow (.github/workflows/Gmeek.yml) 
    → Python 脚本 (Gmeek.py) 生成 HTML 
    → docs/ (静态站点) 
    → GitHub Pages 部署
```

- **config.json** — 博客基础配置（标题、副标题、头像、Gmeek 版本），会被 workflow 读取
- **blogBase.json** — Gmeek 自动维护的完整元数据（文章列表、主题设置、标签颜色等），每次构建时更新
- **docs/** — 生成的静态站点目录，GitHub Pages 部署源
- **backup/** — 文章的 Markdown 备份，由 workflow 自动同步
- **.github/workflows/Gmeek.yml** — 核心流水线：Issue 触发或每日定时（UTC 16:00）构建

## 写文章

直接在仓库的 GitHub Issues 中创建新 Issue，workflow 会自动触发生成。文章标签通过 Issue 的 labels 控制。编辑 Issue 同样会触发重新生成。

## 修改博客配置

编辑 `config.json` 后提交即可。下次构建时会读取新配置。主题、颜色、分页等更细致的设置位于 `blogBase.json` 中（由 Gmeek 管理，手动修改会在下次构建时被覆盖，永久性修改应在 Gmeek 模板层面进行）。
