/**
 * [INPUT]: 依赖 react 的 createContext/useContext/useMemo/useState，依赖 widgets/LoginModal
 * [OUTPUT]: 对外提供 LoginModalProvider、useLoginModal
 * [POS]: app 的登录模态全局状态，供 Header、Landing 与 RequireAuth 唤起登录
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LoginModal } from "../../widgets/LoginModal";

type LoginModalContextValue = {
  closeLoginModal: () => void;
  openLoginModal: () => void;
};

const LoginModalContext = createContext<LoginModalContextValue | null>(null);

type LoginModalProviderProps = {
  children: ReactNode;
};

export function LoginModalProvider({ children }: LoginModalProviderProps) {
  const [open, setOpen] = useState(false);

  const value = useMemo<LoginModalContextValue>(
    () => ({
      closeLoginModal: () => setOpen(false),
      openLoginModal: () => setOpen(true),
    }),
    [],
  );

  return (
    <LoginModalContext.Provider value={value}>
      {children}
      <LoginModal onClose={value.closeLoginModal} open={open} />
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  const context = useContext(LoginModalContext);

  if (!context) {
    throw new Error("useLoginModal 必须在 LoginModalProvider 内使用");
  }

  return context;
}
