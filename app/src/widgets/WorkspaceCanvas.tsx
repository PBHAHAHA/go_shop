/**
 * [INPUT]: 依赖 react 的 useState，依赖 shared/design-system 的 Icon，依赖 app/src/index.css 的 workspace-canvas token
 * [OUTPUT]: 对外提供 WorkspaceCanvas 组件
 * [POS]: widgets 的工作区左侧内容区，顶部仅保留无背景紧凑滑块 Tab，内容区暂留白
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react";
import { Icon, type IconName } from "../shared/design-system";

type WorkspaceTab = "character" | "operations" | "merch";

const tabs: Array<{ icon: IconName; id: WorkspaceTab; label: string }> = [
  { icon: "panel", id: "character", label: "角色" },
  { icon: "content", id: "operations", label: "运营" },
  { icon: "package", id: "merch", label: "周边" },
];

export function WorkspaceCanvas() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>(tabs[0].id);
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <section className="relative min-h-0 min-w-0 flex-1 bg-workspace-canvas">
      <div className="pointer-events-none absolute inset-x-0 top-stack-md z-10 flex justify-center px-panel">
        <div className="pointer-events-auto relative grid grid-cols-3 rounded-xl bg-muted p-0.5 shadow-sm ring-1 ring-border/80">
          <span
            aria-hidden="true"
            className="absolute bottom-0.5 left-0.5 top-0.5 z-0 w-[calc((100%-0.25rem)/3)] rounded-lg bg-white shadow-sm ring-1 ring-border/60 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${activeTabIndex * 100}%)` }}
          />

          {tabs.map((tab) => (
            <button
              className={`relative z-10 flex h-6 min-w-17 items-center justify-center gap-1 rounded-lg px-2 font-sans text-[11px] leading-none transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-[#6b7370] hover:text-foreground"
              }`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              <Icon className="h-3 w-3" name={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        aria-label={`${tabs.find((tab) => tab.id === activeTab)?.label}内容区`}
        className="h-full min-h-0 w-full"
      />
    </section>
  );
}
