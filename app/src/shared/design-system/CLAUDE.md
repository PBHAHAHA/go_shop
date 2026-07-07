# app/src/shared/design-system/
> L2 | 父级: app/src/shared/CLAUDE.md

模块定位: 用户端唯一设计系统组件目录，所有基础 UI 必须在这里实现，并且只能消费 app/src/index.css 暴露的语义 token。

成员清单
.gitkeep: 保持设计系统组件目录存在。
Avatar.tsx: 用户头像组件，提供 initials 文本头像并消费 user avatar 尺寸 token。
Button.tsx: 动作组件，提供 primary、secondary、ghost 三种按钮变体。
AgentComposer.tsx: Agent 底部输入卡片，提供紧凑 textarea、无边框图标式附件与发送按钮。
Input.tsx: 单行输入组件，提供表单输入并消费 input、placeholder 语义 token。
Modal.tsx: 模态容器组件，提供遮罩、圆角面板与 Esc 关闭。
Sneak.tsx: 弹出菜单原语，提供 SneakTrigger、SneakPanel、SneakItem，点击后 sneak 出浮层 User Menu。
Icon.tsx: 线性图标组件，提供导航、workspace tab、chevron-up、chevron-down、log-out、plus 与 Sidebar 展开收起图标名称集合并消费 sidebar icon 尺寸与 stroke token。
Logo.tsx: 品牌组件，基于 public/brand/mallerai-logo.png 渲染 Mallerai 图形与字标。
Surface.tsx: 容器组件，提供 card、muted、accent、primary、sidebar 语义表面和 elevation。
Text.tsx: 排版组件，提供 Eyebrow、Title、BodyText、MetricText 文本层级。
TextArea.tsx: 多行输入组件，提供 Agent Panel 模拟聊天输入。
index.ts: 设计系统统一导出入口，页面和 widgets 应从这里消费基础 UI。

设计约束
app/src/index.css 是唯一设计系统真相源。
--container-sidebar 与 --container-sidebar-collapsed 控制 /app 左侧菜单导航栏展开与收起宽度，当前展开为 240px。
--sidebar-frost 与 --sidebar-frost-border 控制 Sidebar 磨砂背景和半透明边框。
--spacing-sidebar-icon 控制 Sidebar 菜单图标尺寸（20px），--stroke-icon 控制图标线宽，--spacing-user-avatar 控制用户头像尺寸。
--text-sidebar-action 控制 /app 左侧菜单项字号（14px），--height-sidebar-action 与 --spacing-sidebar-nav-gap 控制菜单项高度和项间距。
--spacing-logo-mark-sm、--spacing-logo-mark-md、--spacing-logo-mark-lg、--spacing-logo-mark-xl 控制品牌图形在不同场景的尺寸，--text-logo-wordmark 控制 Mallerai 字标标题字号，--text-workbench-greeting 控制工作台问候语字号（44px）。
--canvas 控制 /app 应用壳灰色画布背景（#f3f4f5），--app-panel 控制右侧内容区背景（#ffffff），--placeholder 控制输入占位符颜色（#babebd），--spacing-app-inset 控制右侧内容面板与视口上/右/下间距（12px），--radius-app-panel 控制内容面板圆角（16px）。
--container-workbench 控制工作台输入卡片最大宽度（628px），--height-workbench-composer 控制输入卡片整体高度（148px），--text-workbench-placeholder 控制占位符字号（14px），--height-workbench-action 控制添加素材按钮高度（28px），--text-workbench-action 控制添加素材按钮字号（14px），--radius-workbench-card 控制输入卡片圆角（24px），--spacing-workbench-input-b 控制输入区底部内边距（4px）。
--container-agent 控制工作区 Agent 栏宽度（312px），--radius-agent-composer 控制 Agent 输入卡片圆角（20px），--min-height-agent-composer-input 控制输入区最小高度（56px），--height-agent-chip 控制工具栏按钮高度（28px），--spacing-ui-icon-compact 控制紧凑图标尺寸（14px），--spacing-agent-composer-inset-x 控制 Agent 输入区左右外边距（16px），--spacing-agent-composer-inset-y 控制 Agent 输入区上下外边距（12px），--spacing-agent-composer-pad 控制 Agent 输入卡片内边距（12px）。
--container-modal 控制模态最大宽度（384px），--height-input 控制单行输入高度（40px），--z-index-modal 控制模态层级。
--container-sneak-menu 控制 Sneak 菜单宽度（208px），--height-sneak-item 控制菜单项高度（36px），--z-index-sneak 控制 Sneak 浮层层级。
/app 与 DEV-only Design System 使用 AppShell 应用壳；Sidebar 通过 --width-sidebar-expanded 与 --width-sidebar-collapsed 在展开/收起状态之间过渡，右侧嵌套白面板使用 flex-1 自适应。
--container-component-preview 与 layout-design-system-matrix 控制 DEV-only Design System 页面组件预览矩阵。
组件不得硬编码颜色值、像素值、阴影值、半径值或任意 Tailwind 值。
新增视觉参数必须先进入 app/src/index.css 的 :root 或 @theme inline，再通过语义 Tailwind class 使用。
页面和 widgets 不允许绕过 design-system 直接创造基础 UI。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
