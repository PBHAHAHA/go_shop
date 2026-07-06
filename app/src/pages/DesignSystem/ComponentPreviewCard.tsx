/**
 * [INPUT]: 依赖 react 的 memo 与 pages/DesignSystem/componentCatalog 的 DesignSystemComponentPreview 类型
 * [OUTPUT]: 对外提供 ComponentPreviewCard 组件
 * [POS]: pages/DesignSystem 的矩阵单元，被 ComponentMatrix 批量渲染并隔离预览卡片重渲染
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { memo } from "react";
import type { DesignSystemComponentPreview } from "./componentCatalog";

type ComponentPreviewCardProps = {
  component: DesignSystemComponentPreview;
};

export const ComponentPreviewCard = memo(function ComponentPreviewCard({
  component,
}: ComponentPreviewCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card p-panel text-card-foreground shadow-sm">
      <p className="font-sans text-ui-sm leading-ui-relaxed text-muted-foreground">
        {component.name}
      </p>
      <div className="mt-stack-md">{component.render()}</div>
    </article>
  );
});
