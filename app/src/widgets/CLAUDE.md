# app/src/widgets/
> L2 | 父级: app/CLAUDE.md

成员清单
.gitkeep: 保持业务组件组合层目录存在，当前不承载业务实现。
Header.tsx: Landing 顶部导航，提供 Login 跳转 /app。
Sidebar.tsx: /app 左侧固定导航，承载 Mallerai Logo、丝滑展开收起图标按钮、带图标的工作台/选货/运营内容/代发任务/订阅/设置入口、DEV-only Design System 入口和底部用户头像昵称。
AgentPanel.tsx: AI 虚拟店长面板备用组件，提供本地模拟聊天输入，不直连模型；当前 /app 参考布局不挂载此组件。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
