/**
 * [INPUT]: 依赖 config/env、common/AppError，调用 DeepSeek OpenAI-compatible Chat Completions
 * [OUTPUT]: 对外提供 DeepSeekClient
 * [POS]: chat services 外部模型适配器，负责 IP 创作总监的对话与结构化 JSON 输出
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { AppError } from "../common/appError";
import { env } from "../config/env";

type ChatMessage = {
  content: string;
  role: "assistant" | "system" | "user";
};

type DeepSeekChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
    type?: string;
  };
};

export class DeepSeekClient {
  async completeJson(messages: ChatMessage[]) {
    if (!env.deepSeekApiKey) {
      throw new AppError(
        500,
        "deepseek_api_key_missing",
        "缺少 DEEPSEEK_API_KEY，无法调用 DeepSeek 对话模型。",
      );
    }

    const response = await fetch(`${env.deepSeekBaseUrl}/chat/completions`, {
      body: JSON.stringify({
        max_tokens: 1800,
        messages,
        model: env.deepSeekModel,
        response_format: { type: "json_object" },
        stream: false,
        temperature: 0.35,
      }),
      headers: {
        Authorization: `Bearer ${env.deepSeekApiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = (await response.json().catch(() => ({}))) as DeepSeekChatResponse;

    if (!response.ok) {
      throw new AppError(
        response.status,
        "deepseek_request_failed",
        data.error?.message ?? "DeepSeek 请求失败。",
        data,
      );
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new AppError(502, "deepseek_empty_response", "DeepSeek 返回为空。", data);
    }

    return content;
  }
}
