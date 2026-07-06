/**
 * [INPUT]: 依赖 react 的 ButtonHTMLAttributes，依赖 app/src/index.css 暴露的 button 语义 token
 * [OUTPUT]: 对外提供 Button 组件与 ButtonVariant 类型
 * [POS]: shared/design-system 的动作组件，所有页面按钮必须通过此文件创建
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
  secondary:
    "border-border bg-secondary text-secondary-foreground hover:bg-accent",
  ghost:
    "border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
};

export function Button({
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full border px-panel py-stack-sm font-sans text-ui-md leading-ui-tight tracking-normal transition duration-200 active:translate-y-px ${variants[variant]} ${className}`}
      type={type}
      {...props}
    />
  );
}
