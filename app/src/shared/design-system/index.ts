/**
 * [INPUT]: 依赖同目录 Avatar、Button、Icon、Surface、Text、TextArea 的导出
 * [OUTPUT]: 对外集中导出当前产品壳使用的设计系统组件
 * [POS]: shared/design-system 的公共入口，页面和 widgets 只能从这里消费基础 UI
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
export { Avatar } from "./Avatar";
export { Button } from "./Button";
export type { ButtonVariant } from "./Button";
export { Icon } from "./Icon";
export type { IconName } from "./Icon";
export { Surface } from "./Surface";
export { BodyText, Eyebrow, MetricText, Title } from "./Text";
export { TextArea } from "./TextArea";
