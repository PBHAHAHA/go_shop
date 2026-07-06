/**
 * [INPUT]: 依赖 shared/design-system/Button 的统一按钮实现
 * [OUTPUT]: 对外转发 Button 组件与 ButtonVariant 类型
 * [POS]: shared/ui 的兼容出口；新代码必须直接使用 shared/design-system
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
export { Button } from "../design-system/Button";
export type { ButtonVariant } from "../design-system/Button";
