/**
 * [INPUT]: 依赖 react 的 TextareaHTMLAttributes，依赖 app/src/index.css 暴露的 input、ring、radius token
 * [OUTPUT]: 对外提供 TextArea 组件
 * [POS]: shared/design-system 的多行输入组件，被 AgentPanel 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      className={`min-h-agent-input w-full resize-none rounded-2xl border border-input bg-input p-panel font-sans text-ui-md leading-ui text-foreground outline-none placeholder:text-placeholder focus:border-ring ${className}`}
      {...props}
    />
  );
}
