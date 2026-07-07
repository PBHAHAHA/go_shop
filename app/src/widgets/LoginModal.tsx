/**
 * [INPUT]: 依赖 react-router-dom 的 useNavigate，依赖 features/auth/lib/supabase、features/auth/hooks/useAuth，依赖 shared/design-system 的 BodyText、Button、Input、Modal
 * [OUTPUT]: 对外提供 LoginModal 组件
 * [POS]: widgets 的登录模态，承载邮箱密码登录与注册，成功后跳转 /app
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../features/auth/lib/supabase";
import { useAuth } from "../features/auth/hooks/useAuth";
import { BodyText, Button, Input, Modal } from "../shared/design-system";

type LoginModalProps = {
  onClose: () => void;
  open: boolean;
};

type AuthMode = "sign-in" | "sign-up";

export function LoginModal({ onClose, open }: LoginModalProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && user) {
      onClose();
      navigate("/app", { replace: true });
    }
  }, [navigate, onClose, open, user]);

  const resetForm = () => {
    setError(null);
    setNotice(null);
    setEmail("");
    setPassword("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setSubmitting(true);

    const authAction =
      mode === "sign-in"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { error: authError } = await authAction;

    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (mode === "sign-up") {
      setPassword("");
      setNotice("注册成功，请查收验证邮件后登录。");
      setMode("sign-in");
      return;
    }

    handleClose();
    navigate("/app", { replace: true });
  };

  return (
    <Modal
      onClose={handleClose}
      open={open}
      title={mode === "sign-in" ? "登录 Mallerai" : "注册 Mallerai"}
    >
      <BodyText className="mt-stack-sm text-center">
        登录后即可使用 AI 虚拟店长，完成选货、内容与代发。
      </BodyText>

      <form className="mt-panel grid gap-stack-md" onSubmit={handleSubmit}>
        <label className="grid gap-stack-xs">
          <span className="font-sans text-ui-sm text-muted-foreground">邮箱</span>
          <Input
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={email}
          />
        </label>

        <label className="grid gap-stack-xs">
          <span className="font-sans text-ui-sm text-muted-foreground">密码</span>
          <Input
            autoComplete={
              mode === "sign-in" ? "current-password" : "new-password"
            }
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="至少 6 位"
            required
            type="password"
            value={password}
          />
        </label>

        {notice ? (
          <p className="font-sans text-ui-sm leading-ui text-primary">{notice}</p>
        ) : null}

        {error ? (
          <p className="font-sans text-ui-sm leading-ui text-destructive">{error}</p>
        ) : null}

        <Button className="w-full" disabled={submitting} type="submit">
          {submitting
            ? "处理中..."
            : mode === "sign-in"
              ? "登录"
              : "注册"}
        </Button>
      </form>

      <div className="mt-stack-md text-center">
        <Button
          onClick={() => {
            setError(null);
            setNotice(null);
            setMode(mode === "sign-in" ? "sign-up" : "sign-in");
          }}
          type="button"
          variant="ghost"
        >
          {mode === "sign-in" ? "没有账号？注册" : "已有账号？登录"}
        </Button>
      </div>
    </Modal>
  );
}
