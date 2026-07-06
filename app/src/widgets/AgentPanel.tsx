/**
 * [INPUT]: 依赖 react 的 useState，依赖 shared/design-system 的 Button、Surface、TextArea 与排版组件
 * [OUTPUT]: 对外提供 AgentPanel 组件
 * [POS]: widgets 的右侧 AI 虚拟店长面板，被 AppDashboard 消费，提供本地模拟聊天输入
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react";
import {
  BodyText,
  Button,
  Eyebrow,
  Surface,
  TextArea,
  Title,
} from "../shared/design-system";

const initialMessages = [
  "我已根据近 7 天热度筛出 12 个适合社群转化的货品。",
  "下一步可以生成图文种草稿、短视频脚本，或直接排入代发任务。",
];

export function AgentPanel() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  function sendDraft() {
    const nextMessage = draft.trim();

    if (!nextMessage) {
      return;
    }

    setMessages((current) => [...current, nextMessage]);
    setDraft("");
  }

  return (
    <aside className="flex min-h-agent-panel flex-col rounded-3xl bg-foreground p-panel text-background">
      <div>
        <Eyebrow className="text-background/70">AI Agent</Eyebrow>
        <Title className="mt-stack-xs text-background" size="md">
          虚拟店长
        </Title>
        <BodyText className="mt-stack-sm max-w-agent-copy text-background/70">
          只做模拟对话，不连接模型。用于承载选货、内容和代发的工作指令。
        </BodyText>
      </div>

      <div className="mt-stack-xl flex flex-1 flex-col gap-stack-sm overflow-y-auto">
        {messages.map((message, index) => (
          <Surface
            className={
              index === messages.length - 1
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card text-card-foreground"
            }
            key={`${message}-${index}`}
          >
            <p className="font-sans text-ui-sm leading-ui-relaxed">{message}</p>
          </Surface>
        ))}
      </div>

      <Surface className="mt-stack-lg rounded-2xl" tone="card">
        <label
          className="block font-sans text-ui-xs leading-ui-relaxed text-muted-foreground"
          htmlFor="agent-input"
        >
          给虚拟店长一个任务
        </label>
        <TextArea
          className="mt-stack-xs"
          id="agent-input"
          onChange={(event) => setDraft(event.target.value)}
          placeholder="例如：把今日热卖商品生成三条朋友圈文案"
          value={draft}
        />
        <div className="mt-stack-sm flex justify-end">
          <Button onClick={sendDraft}>
            发送 →
          </Button>
        </div>
      </Surface>
    </aside>
  );
}
