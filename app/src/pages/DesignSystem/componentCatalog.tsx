/**
 * [INPUT]: 依赖 shared/design-system 的 Avatar、Button、Icon、Surface、Eyebrow、Title、BodyText、MetricText、TextArea
 * [OUTPUT]: 对外提供 designSystemComponents 组件预览清单与 DesignSystemComponentPreview 类型
 * [POS]: pages/DesignSystem 的静态数据源，被 ComponentMatrix 消费以矩阵方式展示设计系统组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { ReactNode } from "react";
import {
  Avatar,
  BodyText,
  Button,
  Eyebrow,
  Icon,
  MetricText,
  Surface,
  TextArea,
  Title,
} from "../../shared/design-system";

export type DesignSystemComponentPreview = {
  name: string;
  render: () => ReactNode;
};

export const designSystemComponents: readonly DesignSystemComponentPreview[] = [
  {
    name: "Avatar",
    render: () => <Avatar initials="GS" />,
  },
  {
    name: "Button",
    render: () => (
      <div className="flex flex-wrap items-center gap-stack-sm">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    ),
  },
  {
    name: "Icon",
    render: () => (
      <div className="flex flex-wrap items-center gap-stack-md text-foreground">
        <Icon name="dashboard" />
        <Icon name="package" />
        <Icon name="content" />
        <Icon name="send" />
        <Icon name="subscription" />
        <Icon name="settings" />
      </div>
    ),
  },
  {
    name: "Surface",
    render: () => (
      <div className="grid gap-stack-sm">
        <Surface tone="card">Card surface</Surface>
        <Surface tone="muted">Muted surface</Surface>
        <Surface tone="primary">Primary surface</Surface>
      </div>
    ),
  },
  {
    name: "Text",
    render: () => (
      <div className="grid gap-stack-xs">
        <Eyebrow>Eyebrow</Eyebrow>
        <Title size="sm">Title</Title>
        <BodyText>BodyText renders readable interface copy.</BodyText>
        <MetricText>MetricText</MetricText>
      </div>
    ),
  },
  {
    name: "TextArea",
    render: () => (
      <TextArea
        aria-label="Design System TextArea preview"
        defaultValue="虚拟店长输入框预览"
      />
    ),
  },
] as const;
