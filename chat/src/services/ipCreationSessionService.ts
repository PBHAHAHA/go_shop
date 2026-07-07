/**
 * [INPUT]: 依赖 DeepSeekClient、QingyunImageClient、AssetPersistenceClient、Prompt builders 与 DTO/模型类型
 * [OUTPUT]: 对外提供 IpCreationSessionService
 * [POS]: chat services 应用编排边界，完成右侧 Agent 追问、Brief 抽取、三视图生成、任务与资产返回
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { AppError } from "../common/appError";
import { ipCharacterBriefSchema } from "../dto/ipCreation.dto";
import {
  buildIpCreativeDirectorSystemPrompt,
  buildIpCreativeDirectorUserPrompt,
} from "../mastra/prompts/ipCreativeDirectorPrompt";
import { buildTurnaroundBoardPrompt } from "../mastra/prompts/turnaroundBoardPrompt";
import type {
  CreativeDirectorDecision,
  IpCharacterBrief,
  IpCreationMessage,
  IpCreationSession,
  IpCreationState,
  IpCreationTask,
  IpTurnaroundAsset,
} from "../models/ipCreation";
import { AssetPersistenceClient } from "./assetPersistenceClient";
import { CosStorageClient } from "./cosStorageClient";
import { DeepSeekClient } from "./deepSeekClient";
import { QingyunImageClient } from "./qingyunImageClient";

type CreateSessionInput = {
  initialMessage?: string;
  referenceImageUrls: string[];
  userId?: string;
};

type SendMessageInput = {
  content: string;
  referenceImageUrls: string[];
  userId?: string;
};

type ServiceResponse =
  | {
      message: string;
      session: IpCreationSession;
      state: IpCreationState;
      type: "assistant_question";
    }
  | {
      message: string;
      session: IpCreationSession;
      state: IpCreationState;
      task: IpCreationTask;
      taskId: string;
      type: "generation_completed" | "generation_started";
    };

const sessions = new Map<string, IpCreationSession>();
const tasks = new Map<string, IpCreationTask>();

function now() {
  return new Date().toISOString();
}

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function createMessage(role: IpCreationMessage["role"], content: string) {
  return {
    content,
    createdAt: now(),
    id: createId("msg"),
    role,
  };
}

function normalizeBrief(brief: unknown): IpCharacterBrief {
  return ipCharacterBriefSchema.parse({
    mustAvoid: [],
    mustKeep: [],
    referenceImages: [],
    styleKeywords: [],
    ...(typeof brief === "object" && brief !== null ? brief : {}),
  });
}

function parseDecision(raw: string): CreativeDirectorDecision {
  try {
    const parsed = JSON.parse(raw) as CreativeDirectorDecision;

    if (typeof parsed.isReady !== "boolean" || typeof parsed.message !== "string") {
      throw new Error("Invalid decision shape");
    }

    return {
      ...parsed,
      brief: parsed.brief ? normalizeBrief(parsed.brief) : undefined,
    };
  } catch (error) {
    throw new AppError(
      502,
      "creative_director_invalid_json",
      "DeepSeek 未返回有效的 IP 创作决策 JSON。",
      { raw, error },
    );
  }
}

export class IpCreationSessionService {
  private readonly assetClient = new AssetPersistenceClient();
  private readonly cosStorage = new CosStorageClient();
  private readonly creativeDirector = new DeepSeekClient();
  private readonly imageClient = new QingyunImageClient();

  async createSession(input: CreateSessionInput): Promise<ServiceResponse> {
    const session: IpCreationSession = {
      createdAt: now(),
      id: createId("ip_session"),
      messages: [],
      state: "collecting_intent",
      updatedAt: now(),
      userId: input.userId,
    };

    sessions.set(session.id, session);

    if (!input.initialMessage) {
      const message =
        "先告诉我你想打造什么 IP 形象：它是谁、给人什么感觉、准备用在哪个平台或场景。我会根据你的描述继续追问关键视觉信息。";
      session.messages.push(createMessage("assistant", message));
      session.state = "asking_followup";
      session.updatedAt = now();

      return {
        message,
        session,
        state: session.state,
        type: "assistant_question",
      };
    }

    return this.handleUserMessage(session, {
      content: input.initialMessage,
      referenceImageUrls: input.referenceImageUrls,
      userId: input.userId,
    });
  }

  getSession(sessionId: string) {
    const session = sessions.get(sessionId);

    if (!session) {
      throw new AppError(404, "session_not_found", "IP 创作会话不存在。");
    }

    return session;
  }

  getTask(taskId: string) {
    const task = tasks.get(taskId);

    if (!task) {
      throw new AppError(404, "task_not_found", "IP 三视图生成任务不存在。");
    }

    return task;
  }

  async sendMessage(sessionId: string, input: SendMessageInput) {
    return this.handleUserMessage(this.getSession(sessionId), input);
  }

  private async handleUserMessage(
    session: IpCreationSession,
    input: SendMessageInput,
  ): Promise<ServiceResponse> {
    const referenceImageUrls = Array.from(
      new Set([
        ...input.referenceImageUrls,
        ...(session.brief?.referenceImages ?? []),
      ]),
    );

    session.messages.push(createMessage("user", input.content));
    session.updatedAt = now();

    const decision = await this.decideNextStep(session, referenceImageUrls);
    session.messages.push(createMessage("assistant", decision.message));

    if (!decision.isReady || !decision.brief) {
      session.state = "asking_followup";
      session.updatedAt = now();

      return {
        message: decision.message,
        session,
        state: session.state,
        type: "assistant_question",
      };
    }

    const brief = {
      ...decision.brief,
      referenceImages: referenceImageUrls,
    };

    session.brief = brief;
    session.state = "brief_ready";
    session.updatedAt = now();

    return this.generateTurnaround(session, brief, decision.message);
  }

  private async decideNextStep(
    session: IpCreationSession,
    referenceImageUrls: string[],
  ) {
    const raw = await this.creativeDirector.completeJson([
      {
        content: buildIpCreativeDirectorSystemPrompt(),
        role: "system",
      },
      {
        content: buildIpCreativeDirectorUserPrompt(
          session.messages,
          referenceImageUrls,
        ),
        role: "user",
      },
    ]);

    return parseDecision(raw);
  }

  private async generateTurnaround(
    session: IpCreationSession,
    brief: IpCharacterBrief,
    assistantMessage: string,
  ): Promise<ServiceResponse> {
    const task: IpCreationTask = {
      createdAt: now(),
      id: createId("task"),
      sessionId: session.id,
      state: "generating_turnaround",
      updatedAt: now(),
    };
    tasks.set(task.id, task);
    session.taskId = task.id;
    session.state = "generating_turnaround";
    session.updatedAt = now();

    const prompt = buildTurnaroundBoardPrompt(brief);

    try {
      const providerTaskId = await this.imageClient.submitTurnaroundTask(
        prompt,
        brief.referenceImages,
      );
      task.providerTaskId = providerTaskId;
      task.updatedAt = now();

      const result = await this.imageClient.waitForResult(providerTaskId);
      session.state = "persisting_asset";
      task.state = "persisting_asset";
      task.updatedAt = now();

      const generatedImageUrl = result.result_url;

      if (!generatedImageUrl) {
        throw new AppError(
          502,
          "qingyun_missing_result_url",
          "青云图片生成任务完成但未返回 result_url。",
          result,
        );
      }

      const storageAssetId = createId("asset");
      const storedImage = await this.cosStorage.uploadRemoteImage({
        assetId: storageAssetId,
        imageUrl: generatedImageUrl,
        sessionId: session.id,
        userId: session.userId,
      });

      const persisted = await this.assetClient.persist({
        brief,
        imageUrl: storedImage.imageUrl,
        prompt,
        providerMeta: {
          cosKey: storedImage.key,
          cosStored: storedImage.stored,
          qingyun: result,
        },
        sessionId: session.id,
        userId: session.userId,
      });

      const asset: IpTurnaroundAsset = {
        brief,
        createdAt: now(),
        id: persisted.persisted ? persisted.id : storageAssetId,
        imageUrl: persisted.imageUrl,
        kind: "ip_turnaround_board",
        prompt,
        providerTaskId,
        sessionId: session.id,
      };

      task.asset = asset;
      task.state = "completed";
      task.updatedAt = now();
      session.state = "completed";
      session.updatedAt = now();

      return {
        message: assistantMessage,
        session,
        state: session.state,
        task,
        taskId: task.id,
        type: "generation_completed",
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "IP 三视图生成失败。";
      task.error = message;
      task.state = "failed";
      task.updatedAt = now();
      session.state = "failed";
      session.updatedAt = now();
      throw error;
    }
  }
}
