# app/src/pages/DesignSystem/
> L2 | 父级: app/src/pages/CLAUDE.md

成员清单
index.tsx: DEV-only /design-system 页面入口，组合标题与组件矩阵。
componentCatalog.tsx: 设计系统组件预览清单，集中声明组件名称与预览渲染函数。
ComponentMatrix.tsx: 高性能矩阵容器，按清单渲染所有组件预览卡片。
ComponentPreviewCard.tsx: 单个组件预览卡片，使用 React memo 降低矩阵重复渲染成本。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
