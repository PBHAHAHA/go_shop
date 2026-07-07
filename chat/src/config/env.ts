/**
 * [INPUT]: 依赖 Bun.env / process.env 的运行环境变量
 * [OUTPUT]: 对外提供 env 运行配置对象
 * [POS]: chat 配置边界，集中描述 DeepSeek、青云图片生成、资产持久化与 HTTP 服务配置
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
const runtimeEnv =
  typeof Bun !== "undefined" ? Bun.env : (process.env as Record<string, string | undefined>);

function readEnv(name: string, fallback = "") {
  return runtimeEnv[name] ?? fallback;
}

function readNumberEnv(name: string, fallback: number) {
  const raw = readEnv(name);
  const value = Number(raw);

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export const env = {
  allowedOrigins: readEnv(
    "CHAT_ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  apiInternalAssetEndpoint: readEnv("API_INTERNAL_ASSET_ENDPOINT"),
  apiInternalToken: readEnv("API_INTERNAL_TOKEN"),
  cosBucket: readEnv("COS_BUCKET"),
  cosPublicBaseUrl: readEnv("COS_PUBLIC_BASE_URL"),
  cosRegion: readEnv("COS_REGION"),
  cosSecretId: readEnv("COS_SECRET_ID"),
  cosSecretKey: readEnv("COS_SECRET_KEY"),
  deepSeekApiKey: readEnv("DEEPSEEK_API_KEY"),
  deepSeekBaseUrl: readEnv("DEEPSEEK_BASE_URL", "https://api.deepseek.com"),
  deepSeekModel: readEnv("DEEPSEEK_MODEL", "deepseek-v4-flash"),
  imageGenerationModel: readEnv(
    "QINGYUN_IMAGE_MODEL",
    "gpt-image-2",
  ),
  imageGenerationParams: {
    aspectRatio: readEnv("QINGYUN_IMAGE_ASPECT_RATIO", "16:9"),
    imageSize: readEnv("QINGYUN_IMAGE_SIZE", "2K"),
  },
  port: readNumberEnv("PORT", 8788),
  qingyunApiBaseUrl: readEnv("QINGYUN_API_BASE_URL", "https://api.lk888.ai/api"),
  qingyunApiKey: readEnv("API_KEY"),
  qingyunPollIntervalMs: readNumberEnv("QINGYUN_POLL_INTERVAL_MS", 5000),
  qingyunTaskTimeoutMs: readNumberEnv(
    "QINGYUN_TASK_TIMEOUT_MS",
    30 * 60 * 1000,
  ),
};
