/**
 * [INPUT]: 依赖 features/auth/context/AuthProvider，依赖 app/providers/LoginModalProvider
 * [OUTPUT]: 对外提供 AppProviders 组件
 * [POS]: app 的全局 Provider 组合层，包裹 Auth 与登录模态状态
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { ReactNode } from "react";
import { AuthProvider } from "../../features/auth/context/AuthProvider";
import { LoginModalProvider } from "./LoginModalProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <LoginModalProvider>{children}</LoginModalProvider>
    </AuthProvider>
  );
}
