# app/
> L1 | 父级: /CLAUDE.md

模块定位: 用户端，使用 Bun + Vite + React + React Router + Tailwind CSS v4 承载 SaaS 浏览器体验。

设计系统法则
src/index.css 是唯一设计系统真相源，颜色、字体、半径、阴影、间距、容器、网格和关键高度都必须由这里定义。
所有可复用 UI 必须写入 src/shared/design-system/，页面和 widgets 只能组合设计系统组件。
禁止在任意 UI 文件中硬编码颜色值、像素值、任意 Tailwind 值；新增视觉参数必须先进入 src/index.css，再由 Tailwind token class 消费。

成员清单
index.html: Vite HTML 入口，挂载 React 根节点并加载 src/main.tsx。
vite.config.ts: Vite 配置，接入 React 插件与 Tailwind CSS v4 Vite 插件。
src/main.tsx: React 浏览器挂载入口，加载唯一设计系统 src/index.css 与 AppRouter。
src/index.css: Tailwind CSS v4 入口，承载 Kumo source 配置、OKLCH 颜色系统和所有设计 token。
src/app/: 应用装配边界，放置前端运行时外壳、路由挂载与全局 Provider 职责说明。
src/pages/: 页面级路由边界，按 URL 组织 Landing Page、App Dashboard 与 DEV-only Design System。
src/widgets/: 业务组件组合层，承载 Header、Sidebar、Agent Panel 等产品壳组件。
src/shared/: 前端共享层，承载 design-system 组件、兼容 UI 出口、工具、常量与类型职责说明。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
