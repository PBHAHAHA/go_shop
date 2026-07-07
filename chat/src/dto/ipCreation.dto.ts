/**
 * [INPUT]: 依赖 zod，依赖 models/ipCreation 的类型枚举语义
 * [OUTPUT]: 对外提供 IP 创作 HTTP 请求与响应 DTO schema
 * [POS]: chat DTO 边界，约束右侧 Agent 对话、三视图生成任务与资产响应契约
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { z } from "zod";

export const ipTypeSchema = z.enum([
  "animal",
  "fantasy",
  "human",
  "hybrid",
  "mascot",
  "objectMascot",
  "unknown",
]);

export const ipCreationStateSchema = z.enum([
  "asking_followup",
  "brief_ready",
  "collecting_intent",
  "completed",
  "failed",
  "generating_turnaround",
  "persisting_asset",
]);

export const ipCharacterBriefSchema = z.object({
  bodyShapeOrSilhouette: z.string().optional(),
  colorPalette: z.string().optional(),
  coreIdentity: z.string().optional(),
  faceOrHeadFeatures: z.string().optional(),
  hairOrSurfaceFeatures: z.string().optional(),
  ipType: ipTypeSchema,
  mustAvoid: z.array(z.string()).default([]),
  mustKeep: z.array(z.string()).default([]),
  outfitOrMaterial: z.string().optional(),
  personality: z.string().optional(),
  referenceImages: z.array(z.string().url()).default([]),
  styleKeywords: z.array(z.string()).default([]),
  surfaceOrMaterialDetails: z.string().optional(),
  useCase: z.string().optional(),
  visualStyle: z.string().optional(),
});

export const createIpCreationSessionRequestSchema = z.object({
  initialMessage: z.string().min(1).max(4000).optional(),
  referenceImageUrls: z.array(z.string().url()).default([]),
  userId: z.string().min(1).optional(),
});

export const sendIpCreationMessageRequestSchema = z.object({
  content: z.string().min(1).max(4000),
  referenceImageUrls: z.array(z.string().url()).default([]),
  userId: z.string().min(1).optional(),
});

export const persistedAssetSchema = z.object({
  id: z.string(),
  imageUrl: z.string().url(),
});

export type CreateIpCreationSessionRequest = z.infer<
  typeof createIpCreationSessionRequestSchema
>;

export type SendIpCreationMessageRequest = z.infer<
  typeof sendIpCreationMessageRequestSchema
>;
