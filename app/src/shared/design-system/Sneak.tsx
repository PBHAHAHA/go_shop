/**
 * [INPUT]: 依赖 react 的 createContext/useContext/useEffect/useId/useRef/useState，依赖 createPortal，依赖 Icon 与 app/src/index.css 的 sneak 布局 token
 * [OUTPUT]: 对外提供 Sneak、SneakTrigger、SneakPanel、SneakItem 组件与 SneakItemVariant 类型
 * [POS]: shared/design-system 的弹出菜单原语，点击触发器后 sneak 出浮层菜单，被 Sidebar 用户区消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { Icon, type IconName } from "./Icon";

type SneakSide = "top" | "bottom";

type SneakContextValue = {
  open: boolean;
  panelId: string;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  triggerId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const SneakContext = createContext<SneakContextValue | null>(null);

function useSneakContext() {
  const context = useContext(SneakContext);

  if (!context) {
    throw new Error("Sneak 子组件必须在 Sneak 内使用");
  }

  return context;
}

type SneakProps = {
  children: ReactNode;
};

export function Sneak({ children }: SneakProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerId = useId();
  const panelId = useId();

  const value: SneakContextValue = {
    open,
    panelId,
    setOpen,
    toggle: () => setOpen((current) => !current),
    triggerId,
    triggerRef,
  };

  return (
    <SneakContext.Provider value={value}>
      <div className="relative w-full">{children}</div>
    </SneakContext.Provider>
  );
}

type SneakTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function SneakTrigger({
  children,
  className = "",
  onClick,
  ...props
}: SneakTriggerProps) {
  const { open, panelId, toggle, triggerId, triggerRef } = useSneakContext();

  return (
    <button
      aria-controls={panelId}
      aria-expanded={open}
      aria-haspopup="menu"
      className={`w-full transition duration-200 active:translate-y-px ${className}`}
      id={triggerId}
      onClick={(event) => {
        onClick?.(event);
        toggle();
      }}
      ref={triggerRef}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

type SneakPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  side?: SneakSide;
};

export function SneakPanel({
  children,
  className = "",
  side = "top",
  ...props
}: SneakPanelProps) {
  const { open, panelId, setOpen, triggerId, triggerRef } = useSneakContext();
  const [position, setPosition] = useState<CSSProperties>({});

  useEffect(() => {
    if (!open) {
      return;
    }

    const updatePosition = () => {
      const trigger = triggerRef.current;

      if (!trigger) {
        return;
      }

      const rect = trigger.getBoundingClientRect();
      const gap = 8;

      setPosition(
        side === "top"
          ? {
              bottom: window.innerHeight - rect.top + gap,
              left: rect.left,
              minWidth: rect.width,
              position: "fixed",
            }
          : {
              left: rect.left,
              minWidth: rect.width,
              position: "fixed",
              top: rect.bottom + gap,
            },
      );
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, side, triggerRef]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const trigger = triggerRef.current;
      const panel = document.getElementById(panelId);

      if (trigger?.contains(target) || panel?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, panelId, setOpen, triggerId, triggerRef]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      aria-labelledby={triggerId}
      className={`z-sneak min-w-sneak-menu rounded-2xl border border-border bg-background p-stack-xs shadow-md outline-none ${className}`}
      id={panelId}
      role="menu"
      style={position}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}

export type SneakItemVariant = "default" | "destructive";

type SneakItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconName;
  variant?: SneakItemVariant;
};

const itemVariants: Record<SneakItemVariant, string> = {
  default:
    "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  destructive:
    "text-destructive hover:bg-destructive/10 hover:text-destructive",
};

export function SneakItem({
  children,
  className = "",
  icon,
  onClick,
  variant = "default",
  ...props
}: SneakItemProps) {
  const { setOpen } = useSneakContext();

  return (
    <button
      className={`flex h-sneak-item w-full items-center gap-stack-sm rounded-lg px-stack-sm text-left font-sans text-sidebar-action leading-ui-tight transition duration-200 active:translate-y-px ${itemVariants[variant]} ${className}`}
      onClick={(event) => {
        onClick?.(event);
        setOpen(false);
      }}
      role="menuitem"
      type="button"
      {...props}
    >
      {icon ? <Icon className="h-stack-md w-stack-md" name={icon} /> : null}
      <span className="truncate">{children}</span>
    </button>
  );
}
