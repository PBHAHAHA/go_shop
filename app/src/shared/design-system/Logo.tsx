/**
 * [INPUT]: 依赖 /brand/mallerai-logo.png 品牌资产，依赖 app/src/index.css 暴露的 logo mark 尺寸 token
 * [OUTPUT]: 对外提供 Logo 组件与 LogoSize 类型
 * [POS]: shared/design-system 的品牌组件，被 Header、Sidebar 与 Design System 页面消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { HTMLAttributes } from "react";

export type LogoSize = "sm" | "md" | "lg";

type LogoProps = HTMLAttributes<HTMLDivElement> & {
  showWordmark?: boolean;
  size?: LogoSize;
};

const markSizes: Record<LogoSize, string> = {
  sm: "h-logo-mark-sm w-logo-mark-sm",
  md: "h-logo-mark-md w-logo-mark-md",
  lg: "h-logo-mark-lg w-logo-mark-lg",
};

export function Logo({
  className = "",
  showWordmark = true,
  size = "md",
  ...props
}: LogoProps) {
  return (
    <div
      className={`inline-flex items-center justify-center gap-stack-xs text-center font-sans text-foreground ${className}`}
      {...props}
    >
      <img
        alt=""
        aria-hidden="true"
        className={`${markSizes[size]} shrink-0 rounded-md object-contain`}
        src="/brand/mallerai-logo.png"
      />
      {showWordmark ? (
        <span className="font-serif text-logo-wordmark font-semibold tracking-tight">
          Mallerai
        </span>
      ) : null}
    </div>
  );
}
