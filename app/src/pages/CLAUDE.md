# app/src/pages/
> L2 | 父级: app/CLAUDE.md

成员清单
.gitkeep: 保持页面级路由边界目录存在，当前不承载业务实现。
LandingPage.tsx: / 页面，展示产品壳，未登录时唤起 LoginModal，登录后引导进入 /app。
AuthCallbackPage.tsx: /auth/callback 页面，处理 Supabase 邮件验证与 OAuth 回跳。
WorkspacePage.tsx: /app 首页，以 edge-to-edge 方式呈现左侧三 Tab 画布 + 右侧 Agent 对话的双栏工作区。
DesignSystem/: DEV-only /design-system 页面目录，以矩阵方式展示 shared/design-system 当前所有组件。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
