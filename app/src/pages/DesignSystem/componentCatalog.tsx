/**
 * [INPUT]: 依赖 shared/design-system 的 Avatar、Button、Icon、Logo、Sneak、Surface、Eyebrow、Title、BodyText、MetricText、TextArea
 * [OUTPUT]: 对外提供 designSystemComponents 组件预览清单与 DesignSystemComponentPreview 类型
 * [POS]: pages/DesignSystem 的静态数据源，被 ComponentMatrix 消费以矩阵方式展示设计系统组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { ReactNode } from "react";
import {
  AgentComposer,
  Avatar,
  BodyText,
  Button,
  Eyebrow,
  Icon,
  Logo,
  MetricText,
  Sneak,
  SneakItem,
  SneakPanel,
  SneakTrigger,
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
        <Icon name="panel-left-close" />
        <Icon name="panel-left-open" />
      </div>
    ),
  },
  {
    name: "Logo",
    render: () => <Logo />,
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
  {
    name: "AgentComposer",
    render: () => (
      <AgentComposer
        onChange={() => undefined}
        onSubmit={() => undefined}
        placeholder="输入想法，或输入 @ 提及货品"
        value=""
      />
    ),
  },
  {
    name: "Sneak",
    render: () => (
      <Sneak>
        <SneakTrigger className="flex w-full max-w-sneak-menu items-center gap-stack-sm rounded-2xl border border-border bg-background p-stack-sm text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Avatar initials="GS" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-sans text-sidebar-action leading-ui-tight text-foreground">
              采购商用户
            </p>
            <p className="truncate font-sans text-ui-xs leading-ui text-muted-foreground">
              buyer@mallerai.com
            </p>
          </div>
          <Icon className="h-stack-md w-stack-md shrink-0 text-muted-foreground" name="chevron-up" />
        </SneakTrigger>
        <SneakPanel side="bottom">
          <SneakItem icon="settings">账户设置</SneakItem>
          <SneakItem icon="subscription">订阅管理</SneakItem>
          <SneakItem icon="log-out" variant="destructive">
            退出登录
          </SneakItem>
        </SneakPanel>
      </Sneak>
    ),
  },
] as const;
