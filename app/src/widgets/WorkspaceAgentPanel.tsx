/**
 * [INPUT]: 依赖 react 的 useEffect/useState，依赖 shared/design-system 的 AgentComposer
 * [OUTPUT]: 对外提供 WorkspaceAgentPanel 组件
 * [POS]: widgets 的工作区右侧 Agent 区，上方留白、底部紧凑输入卡片，无左侧分割边框
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useEffect, useState } from "react";
import { AgentComposer } from "../shared/design-system";

type WorkspaceAgentPanelProps = {
  initialPrompt?: string;
};

export function WorkspaceAgentPanel({
  initialPrompt = "",
}: WorkspaceAgentPanelProps) {
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (initialPrompt.trim()) {
      setDraft(initialPrompt);
    }
  }, [initialPrompt]);

  function sendDraft() {
    if (!draft.trim()) {
      return;
    }

    setDraft("");
  }

  return (
    <aside className="flex h-full min-h-0 w-agent-panel flex-col bg-background">
      <div aria-hidden="true" className="min-h-0 flex-1" />

      <div className="shrink-0 px-agent-composer-inset-x py-agent-composer-inset-y">
        <AgentComposer
          onChange={setDraft}
          onSubmit={sendDraft}
          placeholder="输入想法，或输入 @ 提及货品"
          value={draft}
        />
      </div>
    </aside>
  );
}
