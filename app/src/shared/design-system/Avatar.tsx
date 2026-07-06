/**
 * [INPUT]: 依赖 react 的 HTMLAttributes，依赖 app/src/index.css 暴露的 user avatar 尺寸 token
 * [OUTPUT]: 对外提供 Avatar 组件
 * [POS]: shared/design-system 的用户头像组件，被 Sidebar 用户区消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { HTMLAttributes } from "react";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  initials: string;
};

export function Avatar({ className = "", initials, ...props }: AvatarProps) {
  return (
    <div
      className={`flex h-user-avatar w-user-avatar shrink-0 items-center justify-center rounded-full bg-primary font-sans text-ui-xs font-medium leading-ui-tight text-primary-foreground ${className}`}
      {...props}
    >
      {initials}
    </div>
  );
}
