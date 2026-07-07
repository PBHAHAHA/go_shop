/**
 * [INPUT]: 依赖 @supabase/supabase-js 的 createClient，依赖 Vite 环境变量 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY
 * [OUTPUT]: 对外提供 supabase 浏览器端单例客户端
 * [POS]: features/auth 的 Supabase SDK 入口，全应用唯一 createClient 实例
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[auth] 缺少 VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY，请复制 app/.env.example 为 .env 并填写。",
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
  },
});
