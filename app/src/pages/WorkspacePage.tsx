/**
 * [INPUT]: 依赖 react-router-dom 的 useLocation，依赖 widgets/AppShell、widgets/WorkspaceLayout
 * [OUTPUT]: 对外提供 WorkspacePage 页面组件
 * [POS]: pages 的 /app 首页，呈现 IP 创作双栏工作区
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useLocation } from "react-router-dom";
import { AppShell } from "../widgets/AppShell";
import { WorkspaceLayout } from "../widgets/WorkspaceLayout";

type WorkspaceLocationState = {
  prompt?: string;
};

export function WorkspacePage() {
  const location = useLocation();
  const state = location.state as WorkspaceLocationState | null;
  const initialPrompt = state?.prompt ?? "";

  return (
    <AppShell edgeToEdge>
      <div className="h-screen min-h-0">
        <WorkspaceLayout initialPrompt={initialPrompt} />
      </div>
    </AppShell>
  );
}
