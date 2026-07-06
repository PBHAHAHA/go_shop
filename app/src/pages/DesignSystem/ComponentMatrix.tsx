/**
 * [INPUT]: 依赖 componentCatalog 的 DesignSystemComponentPreview 清单与 ComponentPreviewCard
 * [OUTPUT]: 对外提供 ComponentMatrix 组件
 * [POS]: pages/DesignSystem 的矩阵布局层，负责高性能展示多个设计系统组件预览
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { memo } from "react";
import type { DesignSystemComponentPreview } from "./componentCatalog";
import { ComponentPreviewCard } from "./ComponentPreviewCard";

type ComponentMatrixProps = {
  components: readonly DesignSystemComponentPreview[];
};

export const ComponentMatrix = memo(function ComponentMatrix({
  components,
}: ComponentMatrixProps) {
  return (
    <section className="layout-design-system-matrix grid gap-panel">
      {components.map((component) => (
        <ComponentPreviewCard component={component} key={component.name} />
      ))}
    </section>
  );
});
