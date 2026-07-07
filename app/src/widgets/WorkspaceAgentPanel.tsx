/**
 * [INPUT]: 依赖 react 的 useEffect/useMemo/useState，依赖 ip-creation API client、CharacterAsset 类型与 shared/design-system 的 AgentComposer
 * [OUTPUT]: 对外提供 WorkspaceAgentPanel 组件
 * [POS]: widgets 的工作区右侧 Agent 区，调用 chat 后端进行 IP 主动追问与三视图产图，并同步到左侧 D3 画布
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useEffect, useMemo, useState } from "react";
import {
  createIpCreationSession,
  sendIpCreationMessage,
  type ChatGeneratedAsset,
  type IpCreationResponse,
} from "../features/ip-creation/api/ipCreationClient";
import { AgentComposer } from "../shared/design-system";
import type { CharacterAsset } from "./CharacterD3Canvas";

type WorkspaceAgentPanelProps = {
  assetCount: number;
  initialPrompt?: string;
  onGeneratedAsset: (asset: CharacterAsset) => void;
};

type AgentMessage = {
  asset?: CharacterAsset;
  id: string;
  role: "agent" | "user";
  text: string;
};

const imageWidth = 220;
const imageHeight = 260;
const boardWidth = 720;
const boardHeight = 420;
const generatedPositions = [
  { x: 260, y: 180 },
  { x: 360, y: 260 },
  { x: 180, y: 360 },
  { x: 460, y: 420 },
];

function getGeneratedAsset(
  asset: ChatGeneratedAsset,
  assetCount: number,
): CharacterAsset {
  const position =
    generatedPositions[assetCount % generatedPositions.length] ??
    generatedPositions[0];
  const createdAt = Date.now();
  const isTurnaround = asset.kind === "ip_turnaround_board";

  return {
    createdAt,
    height: isTurnaround ? boardHeight : imageHeight,
    id: asset.id || `generated-${createdAt}`,
    kind: "generated",
    prompt: asset.prompt,
    src: asset.imageUrl,
    title: isTurnaround ? "IP 三视图设定板" : `角色产图 ${assetCount + 1}`,
    width: isTurnaround ? boardWidth : imageWidth,
    x: position.x,
    y: position.y,
  };
}

export function WorkspaceAgentPanel({
  assetCount,
  initialPrompt = "",
  onGeneratedAsset,
}: WorkspaceAgentPanelProps) {
  const [draft, setDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: "agent-welcome",
      role: "agent",
      text: "告诉我你想打造什么 IP 形象，我会先追问关键风格信息，再生成一张专业三视图设定板放到左侧画布。",
    },
  ]);

  const placeholder = useMemo(
    () =>
      assetCount > 0
        ? "继续描述三视图、换装或表情包方向"
        : "例如：生成一个软萌但有主理人气质的原创 IP",
    [assetCount],
  );

  useEffect(() => {
    if (initialPrompt.trim()) {
      setDraft(initialPrompt);
    }
  }, [initialPrompt]);

  function handleIpCreationResponse(response: IpCreationResponse) {
    setSessionId(response.session.id);

    if (response.type === "generation_completed") {
      const chatAsset = response.task.asset;

      if (chatAsset) {
        const asset = getGeneratedAsset(chatAsset, assetCount);
        onGeneratedAsset(asset);
        setMessages((current) => [
          ...current,
          {
            asset,
            id: `agent-${asset.id}`,
            role: "agent",
            text:
              response.message ||
              "三视图设定板已生成，并同步到左侧画布。",
          },
        ]);
        return;
      }
    }

    setMessages((current) => [
      ...current,
      {
        id: `agent-${Date.now()}`,
        role: "agent",
        text: response.message,
      },
    ]);
  }

  async function sendDraft() {
    const prompt = draft.trim();

    if (!prompt || isGenerating) {
      return;
    }

    const userMessage: AgentMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: prompt,
    };

    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setIsGenerating(true);

    try {
      const response = sessionId
        ? await sendIpCreationMessage(sessionId, prompt)
        : await createIpCreationSession(prompt);
      handleIpCreationResponse(response);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `agent-error-${Date.now()}`,
          role: "agent",
          text:
            error instanceof Error
              ? error.message
              : "IP 创作服务暂时不可用，请稍后重试。",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <aside className="flex h-full min-h-0 w-agent-panel flex-col bg-background">
      <div className="min-h-0 flex-1 overflow-y-auto px-agent-composer-inset-x pb-stack-sm pt-stack-xl">
        <div className="flex flex-col gap-stack-sm">
          {messages.map((message) => (
            <div
              className={`max-w-[92%] rounded-lg border px-3 py-2 font-sans text-[12px] leading-ui-relaxed ${
                message.role === "user"
                  ? "ml-auto border-foreground/10 bg-foreground text-background"
                  : "border-border bg-muted/55 text-foreground"
              }`}
              key={message.id}
            >
              <p>{message.text}</p>
              {message.asset ? (
                <img
                  alt={message.asset.title}
                  className="mt-stack-sm aspect-[11/13] w-full rounded-lg border border-border bg-background object-cover"
                  src={message.asset.src}
                />
              ) : null}
            </div>
          ))}

          {isGenerating ? (
            <div className="max-w-[92%] rounded-lg border border-border bg-muted/55 px-3 py-2 font-sans text-[12px] leading-ui-relaxed text-muted-foreground">
              正在整理 IP 设定，必要时会继续追问；信息足够后会生成三视图...
            </div>
          ) : null}
        </div>
      </div>

      <div className="shrink-0 px-agent-composer-inset-x py-agent-composer-inset-y">
        <AgentComposer
          onChange={setDraft}
          onSubmit={sendDraft}
          placeholder={placeholder}
          value={draft}
        />
      </div>
    </aside>
  );
}
