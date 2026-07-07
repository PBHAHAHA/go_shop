# chat/src/services/
> L2 | 父级: chat/CLAUDE.md

成员清单
assetPersistenceClient.ts: 生成资产持久化适配器，向 api/internal 提交三视图资产，未配置时返回外部 URL 降级结果。
cosStorageClient.ts: 腾讯云 COS 存储适配器，下载青云生成结果并上传为项目持久图片 URL。
deepSeekClient.ts: DeepSeek OpenAI-compatible 对话模型适配器，用于创作总监 JSON 决策。
ipCreationSessionService.ts: IP 创作主编排服务，串联主动追问、Brief 抽取、三视图 prompt、青云图片生成与资产持久化。
qingyunImageClient.ts: 青云 AI 聚合图片生成适配器，负责余额检查、提交 /v1/media/generate 与轮询 /v1/skills/task-status。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
