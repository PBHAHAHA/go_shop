/**
 * [INPUT]: 依赖 features/auth/context/AuthProvider 的 AuthContext
 * [OUTPUT]: 对外提供 useAuth hook
 * [POS]: features/auth 的会话消费入口，被路由守卫与 LoginModal 使用
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 内使用");
  }

  return context;
}
