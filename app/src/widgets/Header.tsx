/**
 * [INPUT]: 依赖 react-router-dom 的 useNavigate，依赖 features/auth/hooks/useAuth，依赖 app/providers/LoginModalProvider 的 useLoginModal，依赖 shared/design-system 的 Button 与 Logo 组件
 * [OUTPUT]: 对外提供 Header 组件
 * [POS]: widgets 的全站顶部导航，被 LandingPage 消费并负责唤起登录模态或进入 /app
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useNavigate } from "react-router-dom";
import { useLoginModal } from "../app/providers/LoginModalProvider";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Button, Logo } from "../shared/design-system";

const navItems = ["产品", "内容", "代发", "价格"];

export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();

  const handleEnterApp = () => {
    if (user) {
      navigate("/app");
      return;
    }

    openLoginModal();
  };

  return (
    <header className="mx-auto flex w-full max-w-page items-center justify-between px-page-x py-panel-lg font-sans text-ui-md text-foreground md:px-panel-lg">
      <button
        className="rounded-full transition hover:text-primary-foreground active:translate-y-px"
        onClick={() => navigate("/")}
        type="button"
      >
        <Logo size="sm" />
      </button>

      <nav className="hidden items-center gap-stack-xl md:flex">
        {navItems.map((item) => (
          <a
            className="text-foreground transition hover:text-muted-foreground"
            href="/"
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-stack-xs">
        <Button onClick={handleEnterApp} variant="ghost">
          {user ? "进入工作台 →" : "Login →"}
        </Button>
        <Button className="hidden sm:inline-flex" onClick={handleEnterApp}>
          开始经营
        </Button>
      </div>
    </header>
  );
}
