/**
 * [INPUT]: 依赖用户提供的 /app Sidebar 入口列表，依赖 react-router-dom 的 Link/useLocation，依赖 app/src/index.css 的 sidebar 菜单密度 token，依赖 shared/design-system 的 Avatar、Icon 组件
 * [OUTPUT]: 对外提供 Sidebar 组件
 * [POS]: widgets 的应用侧边导航，被 AppDashboard 消费并固定呈现用户端功能入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Link, useLocation } from "react-router-dom";
import { Avatar, Icon, type IconName } from "../shared/design-system";

const sidebarItems: Array<{ icon: IconName; label: string }> = [
  { icon: "dashboard", label: "工作台" },
  { icon: "package", label: "选货" },
  { icon: "content", label: "运营内容" },
  { icon: "send", label: "代发任务" },
  { icon: "subscription", label: "订阅" },
  { icon: "settings", label: "设置" },
];
const isDevelopment = import.meta.env.DEV;
const userProfile = {
  initials: "GS",
  name: "采购商用户",
};

export function Sidebar() {
  const { pathname } = useLocation();
  const isAppHome = pathname === "/app";

  return (
    <aside className="flex min-h-screen flex-col border-r border-sidebar-border bg-sidebar p-panel text-sidebar-foreground">
      <div className="flex items-center">
        <div className="flex items-center gap-stack-xs">
          <span className="flex h-stack-lg w-stack-lg items-center justify-center rounded-md bg-primary font-sans text-ui-xs font-medium text-primary-foreground">
            G
          </span>
          <span className="font-sans text-ui-lg font-medium tracking-tight text-foreground">
            go_shop
          </span>
        </div>
      </div>

      <nav className="mt-stack-xl flex flex-col gap-sidebar-nav-gap">
        {sidebarItems.map((item, index) => (
          <button
            className={`flex h-sidebar-action items-center gap-stack-sm rounded-lg px-stack-md text-left font-sans text-sidebar-action leading-ui-tight transition active:translate-y-px ${
              index === 0 && isAppHome
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
            key={item.label}
            type="button"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
        {isDevelopment ? (
          <Link
            className={`flex h-sidebar-action items-center gap-stack-sm rounded-lg px-stack-md text-left font-sans text-sidebar-action leading-ui-tight transition active:translate-y-px ${
              pathname === "/design-system"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
            to="/design-system"
          >
            <Icon name="design-system" />
            <span>Design System</span>
          </Link>
        ) : null}
      </nav>

      <div className="mt-auto flex items-center gap-stack-sm rounded-2xl border border-sidebar-border bg-sidebar-accent p-stack-sm text-sidebar-accent-foreground">
        <Avatar initials={userProfile.initials} />
        <div className="min-w-0">
          <p className="truncate font-sans text-sidebar-action leading-ui-tight text-foreground">
            {userProfile.name}
          </p>
        </div>
      </div>
    </aside>
  );
}
