/**
 * [INPUT]: 依赖 react 的 TextareaHTMLAttributes，依赖 Icon 与 app/src/index.css 的 agent-composer token
 * [OUTPUT]: 对外提供 AgentComposer 组件
 * [POS]: shared/design-system 的 Agent 底部输入卡片，被 WorkspaceAgentPanel 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { KeyboardEvent, TextareaHTMLAttributes } from "react";
import { Icon } from "./Icon";

type AgentComposerProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange" | "onSubmit" | "value"
> & {
  onChange: (value: string) => void;
  onSubmit: () => void;
  value: string;
};

export function AgentComposer({
  className = "",
  onChange,
  onSubmit,
  placeholder = "输入想法，或输入 @ 提及货品",
  value,
  ...props
}: AgentComposerProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div
      className={`rounded-agent-composer border border-border bg-background p-agent-composer-pad ${className}`}
    >
      <textarea
        className="min-h-agent-composer-input w-full resize-none border-0 bg-transparent p-0 font-sans text-ui-sm leading-ui text-foreground outline-none placeholder:text-placeholder placeholder:text-ui-xs"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={value}
        {...props}
      />

      <div className="flex items-center justify-between">
        <button
          aria-label="添加附件"
          className="flex h-agent-chip w-agent-chip items-center justify-center rounded-full text-muted-foreground transition duration-200 hover:text-foreground active:translate-y-px"
          type="button"
        >
          <Icon className="h-ui-icon-compact w-ui-icon-compact" name="plus" />
        </button>

        <button
          aria-label="发送"
          className="flex h-agent-chip w-agent-chip items-center justify-center rounded-full text-muted-foreground transition duration-200 hover:text-foreground active:translate-y-px disabled:opacity-40"
          disabled={!value.trim()}
          onClick={onSubmit}
          type="button"
        >
          <Icon className="h-ui-icon-compact w-ui-icon-compact" name="send" />
        </button>
      </div>
    </div>
  );
}
