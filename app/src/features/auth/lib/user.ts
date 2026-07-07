/**
 * [INPUT]: 依赖 @supabase/supabase-js 的 User 类型
 * [OUTPUT]: 对外提供 getUserDisplayName、getUserInitials 函数
 * [POS]: features/auth 的用户展示工具，被 Sidebar 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { User } from "@supabase/supabase-js";

export function getUserDisplayName(user: User): string {
  const metadataName = user.user_metadata?.full_name;

  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  const emailPrefix = user.email?.split("@")[0];

  if (emailPrefix) {
    return emailPrefix;
  }

  return "用户";
}

export function getUserInitials(user: User): string {
  const name = getUserDisplayName(user);
  return name.slice(0, 2).toUpperCase();
}
