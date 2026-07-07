/**
 * [INPUT]: 依赖 react 的 SVGProps，依赖 app/src/index.css 暴露的 sidebar icon 尺寸 token
 * [OUTPUT]: 对外提供 Icon 组件与 IconName 类型
 * [POS]: shared/design-system 的图标组件，为导航和工具入口提供统一线性图标
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { SVGProps } from "react";

export type IconName =
  | "content"
  | "dashboard"
  | "design-system"
  | "document"
  | "image"
  | "package"
  | "panel"
  | "panel-left-close"
  | "panel-left-open"
  | "plus"
  | "chevron-up"
  | "chevron-down"
  | "log-out"
  | "send"
  | "settings"
  | "subscription"
  | "upload";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

const iconPaths: Record<IconName, string[]> = {
  content: [
    "M5 6.5h14",
    "M5 11h14",
    "M5 15.5h8",
    "M4 3.5h16v17H4z",
  ],
  dashboard: [
    "M4 4.5h7v7H4z",
    "M13 4.5h7v4h-7z",
    "M13 10.5h7v9h-7z",
    "M4 13.5h7v6H4z",
  ],
  "design-system": [
    "M6 6h5v5H6z",
    "M13 6h5v5h-5z",
    "M6 13h5v5H6z",
    "M13 13h5v5h-5z",
  ],
  document: [
    "M7 4.5h7l3 3v12H7z",
    "M14 4.5v3h3",
    "M9.5 11h5",
    "M9.5 14.5h4",
  ],
  image: [
    "M5 5.5h14v13H5z",
    "M8.5 9.5a1.5 1.5 0 1 0 0.1 0",
    "M6.5 16l3.5-3.5 2.5 2.5 2-2 3 3",
  ],
  package: [
    "M4.5 8 12 4l7.5 4v8L12 20l-7.5-4z",
    "M4.5 8 12 12l7.5-4",
    "M12 12v8",
  ],
  panel: ["M5.5 6.5h13v11h-13z", "M8 9.5h8", "M8 12.5h8"],
  "panel-left-close": [
    "M4.5 5h15v14h-15z",
    "M9 5v14",
    "M15 9l-3 3 3 3",
  ],
  "panel-left-open": [
    "M4.5 5h15v14h-15z",
    "M9 5v14",
    "M12 9l3 3-3 3",
  ],
  plus: ["M12 5v14", "M5 12h14"],
  "chevron-up": ["M8 14l4-4 4 4"],
  "chevron-down": ["M8 10l4 4 4-4"],
  "log-out": [
    "M10 5h8v14h-8",
    "M6 12h8",
    "M8 9l-3 3 3 3",
  ],
  send: ["M4 12 20 4l-5 16-3.5-6.5z", "M11.5 13.5 20 4"],
  settings: [
    "M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z",
    "M4.5 12h2",
    "M17.5 12h2",
    "M12 4.5v2",
    "M12 17.5v2",
    "M6.7 6.7l1.4 1.4",
    "M15.9 15.9l1.4 1.4",
    "M17.3 6.7l-1.4 1.4",
    "M8.1 15.9l-1.4 1.4",
  ],
  subscription: [
    "M5 6.5h14v11H5z",
    "M8 10h8",
    "M8 14h5",
  ],
  upload: ["M12 16V5", "M8.5 8.5 12 5l3.5 3.5", "M5 18.5h14"],
};

export function Icon({ className = "", name, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`h-sidebar-icon w-sidebar-icon shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="var(--stroke-icon)"
      viewBox="0 0 24 24"
      {...props}
    >
      {iconPaths[name].map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}
