/**
 * [INPUT]: 依赖 widgets/WorkspaceCanvas、widgets/WorkspaceAgentPanel
 * [OUTPUT]: 对外提供 WorkspaceLayout 组件
 * [POS]: widgets 的工作区双栏布局，左侧画布 + 右侧 Agent 对话
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { WorkspaceAgentPanel } from "./WorkspaceAgentPanel";
import { WorkspaceCanvas } from "./WorkspaceCanvas";

type WorkspaceLayoutProps = {
  initialPrompt?: string;
};

export function WorkspaceLayout({ initialPrompt = "" }: WorkspaceLayoutProps) {
  return (
    <div className="flex h-full min-h-0 w-full">
      <WorkspaceCanvas />
      <WorkspaceAgentPanel initialPrompt={initialPrompt} />
    </div>
  );
}
