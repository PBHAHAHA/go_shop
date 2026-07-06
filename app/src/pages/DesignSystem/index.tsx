/**
 * [INPUT]: 依赖 widgets/Sidebar、DesignSystem/componentCatalog 与 ComponentMatrix，依赖 shared/design-system 的 Title 与 BodyText
 * [OUTPUT]: 对外提供 DesignSystemPage 页面组件
 * [POS]: pages 的 DEV-only /design-system 页面，用矩阵展示当前已实现的设计系统组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { BodyText, Title } from "../../shared/design-system";
import { Sidebar } from "../../widgets/Sidebar";
import { ComponentMatrix } from "./ComponentMatrix";
import { designSystemComponents } from "./componentCatalog";

export function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex w-full">
        <Sidebar />

        <section className="min-h-screen flex-1 px-panel-lg py-panel-lg">
          <div className="grid gap-panel-lg">
            <header>
              <Title size="sm">Design System</Title>
              <BodyText className="mt-stack-xs">
                开发环境组件矩阵，集中检查当前设计系统组件的名称与渲染状态。
              </BodyText>
            </header>

            <ComponentMatrix components={designSystemComponents} />
          </div>
        </section>
      </div>
    </main>
  );
}
