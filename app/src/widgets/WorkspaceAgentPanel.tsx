/**
 * [INPUT]: 依赖 react 的 useEffect/useMemo/useState，依赖 CharacterAsset 类型，依赖 shared/design-system 的 AgentComposer
 * [OUTPUT]: 对外提供 WorkspaceAgentPanel 组件
 * [POS]: widgets 的工作区右侧 Agent 区，提供角色生成对话流并把产图同步到左侧 D3 画布
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useEffect, useMemo, useState } from "react";
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
const generatedPositions = [
  { x: 500, y: 180 },
  { x: 760, y: 220 },
  { x: 560, y: 520 },
  { x: 830, y: 540 },
];

function escapeSvgText(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function createGeneratedImage(prompt: string, index: number) {
  const palettes = [
    ["#f6fbf6", "#7ed7b2", "#1f5f50", "#f2c14e"],
    ["#fff7f0", "#ff9b71", "#3d405b", "#81b29a"],
    ["#f6f3ff", "#9b8cff", "#2f245f", "#f7c8e0"],
    ["#f3fbff", "#72c6ef", "#14394f", "#ffcf56"],
  ];
  const palette = palettes[index % palettes.length] ?? palettes[0];
  const label = escapeSvgText(prompt.slice(0, 18) || "IP 角色");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="${imageHeight}" viewBox="0 0 ${imageWidth} ${imageHeight}">
      <rect width="220" height="260" rx="18" fill="${palette[0]}"/>
      <path d="M30 205 C58 170, 76 156, 110 158 C146 160, 170 176, 192 207 L192 228 L30 228 Z" fill="${palette[1]}"/>
      <circle cx="110" cy="100" r="58" fill="${palette[1]}"/>
      <path d="M62 91 C70 42, 95 37, 110 62 C126 37, 152 43, 158 91" fill="${palette[3]}"/>
      <circle cx="88" cy="101" r="6" fill="${palette[2]}"/>
      <circle cx="132" cy="101" r="6" fill="${palette[2]}"/>
      <path d="M91 128 C104 139, 121 139, 134 128" fill="none" stroke="${palette[2]}" stroke-width="6" stroke-linecap="round"/>
      <path d="M56 151 C36 149, 28 131, 41 118" fill="none" stroke="${palette[2]}" stroke-width="8" stroke-linecap="round"/>
      <path d="M164 151 C184 149, 192 131, 179 118" fill="none" stroke="${palette[2]}" stroke-width="8" stroke-linecap="round"/>
      <rect x="43" y="24" width="134" height="28" rx="14" fill="white" opacity="0.88"/>
      <text x="110" y="43" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="${palette[2]}">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getGeneratedAsset(prompt: string, assetCount: number): CharacterAsset {
  const position =
    generatedPositions[assetCount % generatedPositions.length] ??
    generatedPositions[0];
  const createdAt = Date.now();

  return {
    createdAt,
    height: imageHeight,
    id: `generated-${createdAt}`,
    kind: "generated",
    prompt,
    src: createGeneratedImage(prompt, assetCount),
    title: `角色产图 ${assetCount + 1}`,
    width: imageWidth,
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
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: "agent-welcome",
      role: "agent",
      text: "把角色设定、草图描述或想要的换装方向发给我，我会生成图片并放到左侧 D3 画布。",
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

  function sendDraft() {
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

    window.setTimeout(() => {
      const asset = getGeneratedAsset(prompt, assetCount);
      onGeneratedAsset(asset);
      setMessages((current) => [
        ...current,
        {
          asset,
          id: `agent-${asset.id}`,
          role: "agent",
          text: "已生成一张角色图，并同步到左侧画布。你可以继续要求三视图、换装或运营图文。",
        },
      ]);
      setIsGenerating(false);
    }, 620);
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
              正在生成角色图片...
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
