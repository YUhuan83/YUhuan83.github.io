# Blog 自定义主题设计规格

## 概述

为 Gmeek 博客添加自定义暗色天蓝玻璃质感主题，包括背景图片、音乐播放器和响应式布局。

## 设计决策

- **框架**：保留 Gmeek（不迁移 Hugo），通过独立 CSS/JS 文件注入自定义样式
- **主题**：暗色天蓝底 (#0a1628) + 全玻璃融合（backdrop-filter: blur）
- **播放器**：固定底部迷你播放条（按钮 + 进度条 + 歌名）
- **响应式**：手机 ≤600px / 平板 600-900px / 桌面 ≥900px

## 架构

```
自定义资源（不会被 Gmeek 覆盖）:
  docs/custom.css  — 所有自定义样式
  docs/custom.js   — 音乐播放器逻辑 + 动态 DOM

Gmeek 生成（每次构建覆盖）:
  docs/index.html, tag.html, post/*.html

注入机制:
  Gmeek.yml 新增步骤 → Python 脚本在每个 HTML <head> 中
  插入 <link href="custom.css"> 和 <script src="custom.js">
```

## custom.css 内容

| 模块 | 内容 |
|------|------|
| CSS 变量 | --sky-blue, --glass-bg, --glass-border, --text-primary 等 |
| body 背景 | 深蓝渐变底 + 用户图片叠加 + 径向光晕装饰 |
| 玻璃卡片 | backdrop-filter: blur(20px) + 半透明边框 + border-radius |
| Header | 玻璃导航栏，天蓝色强调，flex 布局 |
| 文章列表 | 覆盖 .SideNav 样式，玻璃卡片替换 Primer 默认样式 |
| 播放器 | 固定底部 .music-bar，flex 布局，进度条渐变 |
| 响应式 | @media 三断点：内边距、字号、卡片圆角自适应 |

## custom.js 内容

| 模块 | 内容 |
|------|------|
| 资源链接配置 | ASSETS 对象：bgImage/audio 路径（本地 ↔ GitHub 切换） |
| 播放器 DOM 创建 | 动态创建底部播放条 HTML 并注入 body |
| Audio API | 播放/暂停切换、进度条更新、timeupdate 事件 |
| 按钮状态 | 播放时显示暂停图标，暂停时显示播放图标 |

## 链接切换策略

本地调试：相对路径（`8478e062921da586a4e88ef04e1cdde7.jpg`）
生产环境：GitHub raw URL（`https://raw.githubusercontent.com/YUhuan83/...`）
切换只需修改 ASSETS 对象顶部的两个 URL。

## 文件清单

| 操作 | 文件 |
|------|------|
| 新增 | docs/custom.css |
| 新增 | docs/custom.js |
| 修改 | .github/workflows/Gmeek.yml（新增注入步骤） |
