# app/src/features/auth/
> L2 | 父级: app/CLAUDE.md

模块定位: 前端 Supabase Auth 能力层，承载浏览器 SDK 单例、会话状态与用户展示工具。

成员清单
lib/supabase.ts: createClient 单例，读取 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY。
lib/user.ts: getUserDisplayName、getUserInitials 用户展示派生。
context/AuthProvider.tsx: 监听 onAuthStateChange，向全应用广播 session/user/loading。
hooks/useAuth.ts: 消费 AuthContext 的会话 hook。
types.ts: AuthContextValue 类型契约。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
