# app/src/shared/design-system/
> L2 | 父级: app/src/shared/CLAUDE.md

模块定位: 用户端唯一设计系统组件目录，所有基础 UI 必须在这里实现，并且只能消费 app/src/index.css 暴露的语义 token。

成员清单
.gitkeep: 保持设计系统组件目录存在。
Avatar.tsx: 用户头像组件，提供 initials 文本头像并消费 user avatar 尺寸 token。
Button.tsx: 动作组件，提供 primary、secondary、ghost 三种按钮变体。
Icon.tsx: 线性图标组件，提供导航和 Sidebar 展开收起图标名称集合并消费 sidebar icon 尺寸与 stroke token。
Logo.tsx: 品牌组件，基于 public/brand/mallerai-logo.png 渲染 Mallerai 图形与字标。
Surface.tsx: 容器组件，提供 card、muted、accent、primary、sidebar 语义表面和 elevation。
Text.tsx: 排版组件，提供 Eyebrow、Title、BodyText、MetricText 文本层级。
TextArea.tsx: 多行输入组件，提供 Agent Panel 模拟聊天输入。
index.ts: 设计系统统一导出入口，页面和 widgets 应从这里消费基础 UI。

设计约束
app/src/index.css 是唯一设计系统真相源。
--container-sidebar 与 --container-sidebar-collapsed 控制 /app 左侧菜单导航栏展开与收起宽度，当前展开为 240px。
--sidebar-frost 与 --sidebar-frost-border 控制 Sidebar 磨砂背景和半透明边框。
--text-sidebar-action、--height-sidebar-action 与 --spacing-sidebar-nav-gap 控制 /app 左侧菜单项字号、高度和项间距。
--spacing-sidebar-icon 控制 Sidebar 菜单图标尺寸，--stroke-icon 控制图标线宽，--spacing-user-avatar 控制用户头像尺寸。
--spacing-logo-mark-sm、--spacing-logo-mark-md、--spacing-logo-mark-lg 控制品牌图形在不同场景的尺寸，--text-logo-wordmark 控制 Mallerai 字标标题字号。
/app 与 DEV-only Design System 使用 flex 应用壳；Sidebar 通过 --width-sidebar-expanded 与 --width-sidebar-collapsed 在展开/收起状态之间过渡，右侧内容区使用 flex-1 自适应。
--container-component-preview 与 layout-design-system-matrix 控制 DEV-only Design System 页面组件预览矩阵。
组件不得硬编码颜色值、像素值、阴影值、半径值或任意 Tailwind 值。
新增视觉参数必须先进入 app/src/index.css 的 :root 或 @theme inline，再通过语义 Tailwind class 使用。
页面和 widgets 不允许绕过 design-system 直接创造基础 UI。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
