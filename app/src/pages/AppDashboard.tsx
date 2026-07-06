/**
 * [INPUT]: 依赖 widgets/Sidebar 与 app/src/index.css 的应用壳尺寸 token
 * [OUTPUT]: 对外提供 AppDashboard 页面组件
 * [POS]: pages 的 /app 页面，呈现左侧导航 + 右侧留白内容画布的用户端产品壳
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Sidebar } from "../widgets/Sidebar";

export function AppDashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex w-full">
        <Sidebar />

        <section className="min-h-screen flex-1 bg-background text-foreground">
          <div className="min-h-screen" aria-label="工作台留白画布" />
        </section>
      </div>
    </main>
  );
}
