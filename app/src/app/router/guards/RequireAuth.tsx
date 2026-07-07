/**
 * [INPUT]: 依赖 react 的 useEffect，依赖 react-router-dom 的 useNavigate，依赖 features/auth/hooks/useAuth
 * [OUTPUT]: 对外提供 RequireAuth 路由守卫组件
 * [POS]: app/router 的鉴权边界，未登录时重定向到首页并唤起登录模态
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { BodyText } from "../../../shared/design-system";

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const navigate = useNavigate();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/?login=1", { replace: true });
    }
  }, [loading, navigate, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <BodyText>加载中...</BodyText>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}
