/**
 * [INPUT]: 依赖 @supabase/supabase-js 的 Session 与 User 类型
 * [OUTPUT]: 对外提供 AuthContextValue 类型
 * [POS]: features/auth 的类型契约，被 AuthProvider 与 useAuth 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { Session, User } from "@supabase/supabase-js";

export type AuthContextValue = {
  loading: boolean;
  session: Session | null;
  user: User | null;
};
