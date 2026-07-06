# app/src/shared/design-system/
> L2 | 父级: app/src/shared/CLAUDE.md

模块定位: 用户端唯一设计系统组件目录，所有基础 UI 必须在这里实现，并且只能消费 app/src/index.css 暴露的语义 token。

成员清单
.gitkeep: 保持设计系统组件目录存在。
Avatar.tsx: 用户头像组件，提供 initials 文本头像并消费 user avatar 尺寸 token。
Button.tsx: 动作组件，提供 primary、secondary、ghost 三种按钮变体。
Icon.tsx: 线性图标组件，提供导航图标名称集合并消费 sidebar icon 尺寸与 stroke token。
Surface.tsx: 容器组件，提供 card、muted、accent、primary、sidebar 语义表面和 elevation。
Text.tsx: 排版组件，提供 Eyebrow、Title、BodyText、MetricText 文本层级。
TextArea.tsx: 多行输入组件，提供 Agent Panel 模拟聊天输入。
index.ts: 设计系统统一导出入口，页面和 widgets 应从这里消费基础 UI。

设计约束
app/src/index.css 是唯一设计系统真相源。
--container-sidebar 控制 /app 左侧菜单导航栏宽度，当前为 240px 语义宽度。
--text-sidebar-action、--height-sidebar-action 与 --spacing-sidebar-nav-gap 控制 /app 左侧菜单项字号、高度和项间距。
--spacing-sidebar-icon 控制 Sidebar 菜单图标尺寸，--stroke-icon 控制图标线宽，--spacing-user-avatar 控制用户头像尺寸。
layout-app-shell 是 /app 应用壳布局语义类，在大屏使用 --grid-app-shell 形成左侧固定导航和右侧全宽内容画布；/app 是 full-bleed 应用壳，禁止用居中 max-width 限制页面宽度。
--container-component-preview 与 layout-design-system-matrix 控制 DEV-only Design System 页面组件预览矩阵。
组件不得硬编码颜色值、像素值、阴影值、半径值或任意 Tailwind 值。
新增视觉参数必须先进入 app/src/index.css 的 :root 或 @theme inline，再通过语义 Tailwind class 使用。
页面和 widgets 不允许绕过 design-system 直接创造基础 UI。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
