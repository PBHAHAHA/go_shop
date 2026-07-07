/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 对外提供 IP 创作会话、Brief、任务与资产领域类型
 * [POS]: chat 模型边界，描述 IP 三视图生成工作流的内部语义对象
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
export type IpType =
  | "animal"
  | "fantasy"
  | "human"
  | "hybrid"
  | "mascot"
  | "objectMascot"
  | "unknown";

export type IpCreationState =
  | "asking_followup"
  | "brief_ready"
  | "collecting_intent"
  | "completed"
  | "failed"
  | "generating_turnaround"
  | "persisting_asset";

export type IpCreationMessageRole = "assistant" | "system" | "user";

export type IpCreationMessage = {
  content: string;
  createdAt: string;
  id: string;
  role: IpCreationMessageRole;
};

export type IpCharacterBrief = {
  bodyShapeOrSilhouette?: string;
  colorPalette?: string;
  coreIdentity?: string;
  faceOrHeadFeatures?: string;
  hairOrSurfaceFeatures?: string;
  ipType: IpType;
  mustAvoid: string[];
  mustKeep: string[];
  outfitOrMaterial?: string;
  personality?: string;
  referenceImages: string[];
  styleKeywords: string[];
  surfaceOrMaterialDetails?: string;
  useCase?: string;
  visualStyle?: string;
};

export type IpTurnaroundAsset = {
  brief: IpCharacterBrief;
  createdAt: string;
  id: string;
  imageUrl: string;
  kind: "ip_turnaround_board";
  prompt: string;
  providerTaskId?: string;
  sessionId: string;
};

export type IpCreationTask = {
  asset?: IpTurnaroundAsset;
  createdAt: string;
  error?: string;
  id: string;
  providerTaskId?: string;
  sessionId: string;
  state: IpCreationState;
  updatedAt: string;
};

export type IpCreationSession = {
  brief?: IpCharacterBrief;
  createdAt: string;
  id: string;
  messages: IpCreationMessage[];
  state: IpCreationState;
  taskId?: string;
  updatedAt: string;
  userId?: string;
};

export type CreativeDirectorDecision = {
  brief?: IpCharacterBrief;
  isReady: boolean;
  message: string;
  reasoningSummary?: string;
};
