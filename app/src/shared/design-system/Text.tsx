/**
 * [INPUT]: 依赖 react 的 HTMLAttributes，依赖 app/src/index.css 暴露的 typography 语义 token
 * [OUTPUT]: 对外提供 Eyebrow、Title、BodyText、MetricText 组件
 * [POS]: shared/design-system 的排版组件，页面文字层级必须优先通过此文件表达
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { HTMLAttributes, ReactNode } from "react";

type TextProps<T extends HTMLElement> = HTMLAttributes<T> & {
  children: ReactNode;
};

type TitleSize = "sm" | "md" | "lg" | "xl";

const titleSizes: Record<TitleSize, string> = {
  sm: "text-title-sm leading-title",
  md: "text-title-md leading-title",
  lg: "text-title-lg leading-title",
  xl: "text-title-xl leading-display",
};

export function Eyebrow({
  children,
  className = "",
  ...props
}: TextProps<HTMLParagraphElement>) {
  return (
    <p
      className={`font-sans text-ui-sm leading-ui-relaxed text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function Title({
  children,
  className = "",
  size = "md",
  ...props
}: TextProps<HTMLHeadingElement> & { size?: TitleSize }) {
  return (
    <h1
      className={`font-sans font-medium tracking-tight text-foreground ${titleSizes[size]} ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function BodyText({
  children,
  className = "",
  ...props
}: TextProps<HTMLParagraphElement>) {
  return (
    <p
      className={`font-sans text-ui-md leading-ui text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function MetricText({
  children,
  className = "",
  ...props
}: TextProps<HTMLParagraphElement>) {
  return (
    <p
      className={`font-sans text-title-sm font-medium leading-title tracking-tight text-foreground ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
