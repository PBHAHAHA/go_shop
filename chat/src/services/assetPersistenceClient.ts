/**
 * [INPUT]: 依赖 config/env、models/ipCreation、dto/ipCreation.dto
 * [OUTPUT]: 对外提供 AssetPersistenceClient
 * [POS]: chat services 资产持久化适配器，负责把生成物交给 api/internal 记录并返回长期可访问资产
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { persistedAssetSchema } from "../dto/ipCreation.dto";
import type { IpCharacterBrief } from "../models/ipCreation";
import { env } from "../config/env";

type PersistAssetInput = {
  brief: IpCharacterBrief;
  imageUrl: string;
  prompt: string;
  providerMeta: Record<string, unknown>;
  sessionId: string;
  userId?: string;
};

function getResponseAsset(data: unknown) {
  if (typeof data === "object" && data !== null && "asset" in data) {
    return (data as { asset: unknown }).asset;
  }

  return data;
}

export class AssetPersistenceClient {
  async persist(input: PersistAssetInput) {
    if (!env.apiInternalAssetEndpoint) {
      return {
        id: `external-${input.sessionId}-${Date.now()}`,
        imageUrl: input.imageUrl,
        persisted: false,
      };
    }

    const response = await fetch(env.apiInternalAssetEndpoint, {
      body: JSON.stringify({
        brief: input.brief,
        imageUrl: input.imageUrl,
        kind: "ip_turnaround_board",
        prompt: input.prompt,
        providerMeta: input.providerMeta,
        sessionId: input.sessionId,
        userId: input.userId,
      }),
      headers: {
        ...(env.apiInternalToken
          ? { Authorization: `Bearer ${env.apiInternalToken}` }
          : {}),
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        id: `external-${input.sessionId}-${Date.now()}`,
        imageUrl: input.imageUrl,
        persisted: false,
        persistenceError: data,
      };
    }

    const asset = persistedAssetSchema.parse(getResponseAsset(data));

    return {
      ...asset,
      persisted: true,
    };
  }
}
