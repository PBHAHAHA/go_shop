/**
 * [INPUT]: 依赖 app/src/index.css 的 canvas 背景、app-panel 内容区背景、圆角与 inset token
 * [OUTPUT]: 对外提供 AppShell 组件
 * [POS]: widgets 的应用壳，全宽内容区；/app 使用 edge-to-edge，Design System 使用内嵌面板
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  edgeToEdge?: boolean;
};

export function AppShell({ children, edgeToEdge = false }: AppShellProps) {
  const contentInset = edgeToEdge ? "p-0" : "p-app-inset";
  const panelShape = edgeToEdge ? "rounded-none" : "rounded-app-panel";

  return (
    <main className="flex min-h-screen bg-canvas text-foreground">
      <div
        className={`flex min-h-screen min-w-0 flex-1 flex-col ${contentInset}`}
      >
        <section
          className={`min-h-0 flex-1 overflow-auto bg-app-panel text-foreground ${panelShape}`}
        >
          {children}
        </section>
      </div>
    </main>
  );
}
