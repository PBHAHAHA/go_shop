/**
 * [INPUT]: 依赖 react 的 InputHTMLAttributes，依赖 app/src/index.css 暴露的 input、placeholder、ring token
 * [OUTPUT]: 对外提供 Input 组件
 * [POS]: shared/design-system 的单行输入组件，被 LoginModal 等表单场景消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`h-input w-full rounded-xl border border-input bg-input px-stack-md font-sans text-ui-md leading-ui text-foreground outline-none placeholder:text-placeholder focus:border-ring ${className}`}
      {...props}
    />
  );
}
