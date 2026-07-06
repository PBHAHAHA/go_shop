/**
 * [INPUT]: 依赖 shared/design-system/Surface 的统一容器实现
 * [OUTPUT]: 对外转发 ProductArtifact 兼容组件
 * [POS]: shared/ui 的兼容出口；新代码必须直接使用 shared/design-system
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { ComponentProps } from "react";
import { Surface } from "../design-system/Surface";

type ProductArtifactProps = Omit<ComponentProps<typeof Surface>, "elevation">;

export function ProductArtifact(props: ProductArtifactProps) {
  return <Surface elevation="sm" {...props} />;
}
