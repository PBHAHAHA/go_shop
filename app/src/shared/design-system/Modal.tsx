/**
 * [INPUT]: 依赖 react 的 useEffect/useRef，依赖 shared/design-system 的 Title，依赖 app/src/index.css 的 modal z-index 与 container token
 * [OUTPUT]: 对外提供 Modal 组件
 * [POS]: shared/design-system 的模态容器，承载登录等需要聚焦的浮层交互
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useEffect, useRef, type ReactNode } from "react";
import { Title } from "./Text";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  title: string;
};

export function Modal({ children, onClose, open, title }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-panel-lg">
      <button
        aria-label="关闭"
        className="absolute inset-0 bg-canvas/80 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className="relative w-full max-w-modal rounded-3xl border border-border bg-background p-panel-lg shadow-lg outline-none"
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <Title className="text-center" id="modal-title" size="sm">
          {title}
        </Title>
        {children}
      </div>
    </div>
  );
}
