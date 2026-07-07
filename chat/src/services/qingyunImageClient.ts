/**
 * [INPUT]: 依赖 config/env、common/AppError，调用青云 AI 聚合 /v1/media/generate 与 /v1/skills/task-status
 * [OUTPUT]: 对外提供 QingyunImageClient 与 QingyunTaskStatus 类型
 * [POS]: chat services 图片生成适配器，负责提交三视图设定板图片任务和轮询结果
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { AppError } from "../common/appError";
import { env } from "../config/env";

type QingyunGenerateResponse = {
  code?: number;
  data?: {
    task_id?: number | string;
    任务ids?: Array<number | string>;
  };
  msg?: string;
};

export type QingyunTaskStatus = {
  cost?: number;
  error?: string | null;
  is_final?: boolean;
  model?: string;
  progress?: string;
  refunded?: boolean;
  refunded_amount?: number;
  result_type?: string;
  result_url?: string;
  state?: string;
  status?: string;
  status_group?: string;
  task_id?: number | string;
};

export class QingyunImageClient {
  async assertBalanceAvailable() {
    if (!env.qingyunApiKey) {
      throw new AppError(
        500,
        "qingyun_api_key_missing",
        "缺少 API_KEY，无法调用青云图片生成能力。",
      );
    }

    const response = await fetch(`${env.qingyunApiBaseUrl}/v1/skills/balance`, {
      headers: {
        Authorization: `Bearer ${env.qingyunApiKey}`,
      },
      method: "GET",
    });

    if (response.status === 402) {
      throw new AppError(
        402,
        "qingyun_insufficient_balance",
        "青云账户算力余额不足，请前往 https://qingyun.lk666.ai 充值算力。",
      );
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new AppError(
        response.status,
        "qingyun_balance_failed",
        "查询青云算力余额失败。",
        data,
      );
    }
  }

  async submitTurnaroundTask(prompt: string, referenceImageUrls: string[]) {
    await this.assertBalanceAvailable();

    const params: Record<string, unknown> = {
      ...env.imageGenerationParams,
    };

    if (referenceImageUrls.length > 0) {
      params.images = referenceImageUrls;
    }

    const response = await fetch(`${env.qingyunApiBaseUrl}/v1/media/generate`, {
      body: JSON.stringify({
        count: 1,
        model: env.imageGenerationModel,
        params,
        prompt,
      }),
      headers: {
        Authorization: `Bearer ${env.qingyunApiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = (await response.json().catch(() => ({}))) as QingyunGenerateResponse;

    if (!response.ok || data.code !== 200) {
      throw new AppError(
        response.status || 502,
        "qingyun_media_generate_failed",
        data.msg ?? "青云图片生成任务提交失败。",
        data,
      );
    }

    const taskId = data.data?.task_id ?? data.data?.任务ids?.[0];

    if (!taskId) {
      throw new AppError(
        502,
        "qingyun_missing_task_id",
        "青云图片生成任务未返回 task_id。",
        data,
      );
    }

    return String(taskId);
  }

  async getTaskStatus(taskId: string) {
    if (!env.qingyunApiKey) {
      throw new AppError(
        500,
        "qingyun_api_key_missing",
        "缺少 API_KEY，无法查询青云任务状态。",
      );
    }

    const url = new URL(`${env.qingyunApiBaseUrl}/v1/skills/task-status`);
    url.searchParams.set("task_id", taskId);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${env.qingyunApiKey}`,
      },
      method: "GET",
    });
    const data = (await response.json().catch(() => ({}))) as QingyunTaskStatus;

    if (!response.ok) {
      throw new AppError(
        response.status,
        "qingyun_task_status_failed",
        "查询青云图片任务状态失败。",
        data,
      );
    }

    return data;
  }

  async waitForResult(taskId: string) {
    const startedAt = Date.now();

    while (Date.now() - startedAt < env.qingyunTaskTimeoutMs) {
      const status = await this.getTaskStatus(taskId);

      if (status.is_final) {
        if (status.state === "success" && status.result_url) {
          return status;
        }

        throw new AppError(
          502,
          "qingyun_task_failed",
          status.error ?? status.status ?? "青云图片生成任务失败。",
          status,
        );
      }

      await new Promise((resolve) =>
        setTimeout(resolve, env.qingyunPollIntervalMs),
      );
    }

    throw new AppError(
      504,
      "qingyun_task_timeout",
      "青云图片生成任务等待超时。",
      { taskId },
    );
  }
}
