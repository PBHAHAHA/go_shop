# app/src/shared/ui/
> L2 | 父级: app/src/shared/CLAUDE.md

成员清单
.gitkeep: 保持通用 UI 组件目录存在。
Button.tsx: 兼容出口，转发 shared/design-system/Button，不承载真实样式实现。
ProductArtifact.tsx: 兼容出口，基于 shared/design-system/Surface 转发旧 ProductArtifact 名称。

设计约束
ui/ 只保留兼容转发；新组件、新样式、新变体必须写入 shared/design-system/。
禁止在此目录新增硬编码颜色、像素、阴影、半径或任意 Tailwind 值。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
