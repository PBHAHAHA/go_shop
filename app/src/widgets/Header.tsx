/**
 * [INPUT]: 依赖 react-router-dom 的 useNavigate，依赖 shared/design-system 的 Button 组件
 * [OUTPUT]: 对外提供 Header 组件
 * [POS]: widgets 的全站顶部导航，被 LandingPage 消费并负责 Login 进入 /app
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useNavigate } from "react-router-dom";
import { Button } from "../shared/design-system";

const navItems = ["产品", "内容", "代发", "价格"];

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="mx-auto flex w-full max-w-page items-center justify-between px-page-x py-panel-lg font-sans text-ui-md text-foreground md:px-panel-lg">
      <button
        className="rounded-full text-ui-lg font-medium tracking-normal text-foreground transition hover:text-primary-foreground active:translate-y-px"
        onClick={() => navigate("/")}
        type="button"
      >
        go_shop
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
        <Button
          onClick={() => navigate("/app")}
          variant="ghost"
        >
          Login →
        </Button>
        <Button className="hidden sm:inline-flex">开始经营</Button>
      </div>
    </header>
  );
}
