/**
 * [INPUT]: 依赖 react 的 ReactNode，依赖 app/src/index.css 暴露的 surface、radius、shadow 语义 token
 * [OUTPUT]: 对外提供 Surface 组件
 * [POS]: shared/design-system 的容器组件，所有卡片、面板、浮层必须通过此文件创建
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { ReactNode } from "react";

type SurfaceTone = "card" | "muted" | "accent" | "primary" | "sidebar";
type SurfaceElevation = "none" | "sm" | "md";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
  elevation?: SurfaceElevation;
  tone?: SurfaceTone;
};

const tones: Record<SurfaceTone, string> = {
  card: "bg-card text-card-foreground",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
  primary: "bg-primary text-primary-foreground",
  sidebar: "bg-sidebar text-sidebar-foreground",
};

const elevations: Record<SurfaceElevation, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
};

export function Surface({
  children,
  className = "",
  elevation = "none",
  tone = "card",
}: SurfaceProps) {
  return (
    <div
      className={`rounded-3xl border border-border p-panel ${tones[tone]} ${elevations[elevation]} ${className}`}
    >
      {children}
    </div>
  );
}
