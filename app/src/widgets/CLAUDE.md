# app/src/widgets/
> L2 | 父级: app/CLAUDE.md

成员清单
.gitkeep: 保持业务组件组合层目录存在，当前不承载业务实现。
Header.tsx: Landing 顶部导航，未登录唤起 LoginModal，已登录跳转 /app。
LoginModal.tsx: 全局登录模态，邮箱密码登录/注册，成功后进入 /app。
WorkspaceLayout.tsx: 工作区双栏布局，托管角色资产状态并同步左侧 D3 画布与右侧 Agent 产图。
WorkspaceCanvas.tsx: 工作区左侧内容区，顶部 Tab 切换角色/运营/周边，角色页承载 D3 图片资产画布。
CharacterD3Canvas.tsx: 角色资产 D3 画布，支持缩放画布、拖拽整理 Agent 产图节点。
WorkspaceAgentPanel.tsx: 工作区右侧 Agent 区，提供角色生成对话流并把产图同步到左侧 D3 画布。
AppShell.tsx: 应用壳，全宽内容区；/app 使用 edge-to-edge，Design System 使用内嵌圆角面板。
AgentPanel.tsx: AI 面板备用组件，提供本地模拟聊天输入，不直连模型；当前布局不挂载。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
