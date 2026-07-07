/**
 * [INPUT]: 依赖 react 的 useEffect，依赖 react-router-dom 的 useNavigate，依赖 features/auth/lib/supabase
 * [OUTPUT]: 对外提供 AuthCallbackPage 页面组件
 * [POS]: pages 的 /auth/callback 页面，处理 Supabase OAuth 与邮件验证回跳
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../features/auth/lib/supabase";
import { BodyText } from "../shared/design-system";

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/app", { replace: true });
        return;
      }

      navigate("/", { replace: true });
    });
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <BodyText>正在完成登录...</BodyText>
    </main>
  );
}
