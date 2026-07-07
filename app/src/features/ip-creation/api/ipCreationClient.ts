/**
 * [INPUT]: 依赖 Vite 环境变量 VITE_CHAT_API_BASE_URL 与浏览器 fetch
 * [OUTPUT]: 对外提供 createIpCreationSession、sendIpCreationMessage 与 Chat IP 创作响应类型
 * [POS]: features/ip-creation 的 API 客户端，连接 app 右侧 Agent 与 chat 后端 IP 三视图生成工作流
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
const chatApiBaseUrl =
  import.meta.env.VITE_CHAT_API_BASE_URL ?? "http://127.0.0.1:8788";

export type ChatGeneratedAsset = {
  id: string;
  imageUrl: string;
  kind: "ip_turnaround_board";
  prompt?: string;
};

export type IpCreationSession = {
  id: string;
  state: string;
};

export type IpCreationTask = {
  asset?: ChatGeneratedAsset;
  id: string;
  state: string;
};

export type IpCreationResponse =
  | {
      message: string;
      session: IpCreationSession;
      state: string;
      type: "assistant_question";
    }
  | {
      message: string;
      session: IpCreationSession;
      state: string;
      task: IpCreationTask;
      taskId: string;
      type: "generation_completed" | "generation_started";
    };

type ChatApiErrorBody = {
  error?: {
    code?: string;
    message?: string;
  };
};

async function requestIpCreation(path: string, body: unknown) {
  const response = await fetch(`${chatApiBaseUrl}${path}`, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data = (await response.json().catch(() => ({}))) as
    | ChatApiErrorBody
    | IpCreationResponse;

  if (!response.ok) {
    const errorBody = data as ChatApiErrorBody;
    throw new Error(errorBody.error?.message ?? "IP 创作服务请求失败。");
  }

  return data as IpCreationResponse;
}

export function createIpCreationSession(content: string) {
  return requestIpCreation("/v1/ip-creation/sessions", {
    initialMessage: content,
  });
}

export function sendIpCreationMessage(sessionId: string, content: string) {
  return requestIpCreation(`/v1/ip-creation/sessions/${sessionId}/messages`, {
    content,
  });
}
