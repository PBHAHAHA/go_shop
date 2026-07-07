# app/src/app/router/
> L2 | 父级: app/src/app/CLAUDE.md

成员清单
.gitkeep: 保持 React Router 装配目录存在。
index.tsx: 声明 /、/auth/callback、受保护 /app 与 DEV-only /design-system 路由，连接 LandingPage、AuthCallbackPage、WorkspacePage 与 DesignSystemPage。
guards/RequireAuth.tsx: 未登录重定向至 /?login=1 并唤起登录模态。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
