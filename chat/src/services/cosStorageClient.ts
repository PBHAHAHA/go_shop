/**
 * [INPUT]: 依赖 cos-nodejs-sdk-v5、config/env、common/AppError
 * [OUTPUT]: 对外提供 CosStorageClient
 * [POS]: chat services 存储适配器，负责把青云生成结果下载后上传到腾讯云 COS 并返回持久 URL
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { AppError } from "../common/appError";
import { env } from "../config/env";

type CosConstructor = new (options: {
  SecretId: string;
  SecretKey: string;
}) => {
  putObject: (
    params: {
      Body: Buffer;
      Bucket: string;
      ContentLength: number;
      Key: string;
      Region: string;
      Headers: Record<string, string>;
    },
    callback: (
      error: unknown,
      data?: {
        Location?: string;
      },
    ) => void,
  ) => void;
};

type CosModule = {
  default?: CosConstructor;
} & CosConstructor;

type UploadRemoteImageInput = {
  assetId: string;
  imageUrl: string;
  sessionId: string;
  userId?: string;
};

function isCosConfigured() {
  return Boolean(
    env.cosSecretId &&
      env.cosSecretKey &&
      env.cosBucket &&
      env.cosRegion,
  );
}

function getExtension(contentType: string | null, url: string) {
  if (contentType?.includes("png")) {
    return "png";
  }

  if (contentType?.includes("webp")) {
    return "webp";
  }

  if (contentType?.includes("jpeg") || contentType?.includes("jpg")) {
    return "jpg";
  }

  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.([a-zA-Z0-9]+)$/);

  return match?.[1]?.toLowerCase() ?? "png";
}

function buildObjectKey(input: UploadRemoteImageInput, extension: string) {
  const owner = input.userId ?? "anonymous";

  return [
    "users",
    owner,
    "sessions",
    input.sessionId,
    "turnaround",
    `${input.assetId}.${extension}`,
  ].join("/");
}

function buildPublicUrl(location: string | undefined, key: string) {
  if (env.cosPublicBaseUrl) {
    return `${env.cosPublicBaseUrl.replace(/\/$/, "")}/${key}`;
  }

  if (location) {
    return location.startsWith("http") ? location : `https://${location}`;
  }

  return `https://${env.cosBucket}.cos.${env.cosRegion}.myqcloud.com/${key}`;
}

export class CosStorageClient {
  async uploadRemoteImage(input: UploadRemoteImageInput) {
    if (!isCosConfigured()) {
      return {
        imageUrl: input.imageUrl,
        key: "",
        stored: false,
      };
    }

    const response = await fetch(input.imageUrl);

    if (!response.ok) {
      throw new AppError(
        response.status,
        "remote_image_download_failed",
        "下载青云生成图片失败，无法上传到 COS。",
      );
    }

    const contentType = response.headers.get("content-type") ?? "image/png";
    const bytes = Buffer.from(await response.arrayBuffer());
    const extension = getExtension(contentType, input.imageUrl);
    const key = buildObjectKey(input, extension);
    const cosModule = (await import("cos-nodejs-sdk-v5")) as unknown as CosModule;
    const COS = cosModule.default ?? cosModule;
    const cos = new COS({
      SecretId: env.cosSecretId,
      SecretKey: env.cosSecretKey,
    });

    const result = await new Promise<{ Location?: string }>((resolve, reject) => {
      cos.putObject(
        {
          Body: bytes,
          Bucket: env.cosBucket,
          ContentLength: bytes.byteLength,
          Headers: {
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Type": contentType,
          },
          Key: key,
          Region: env.cosRegion,
        },
        (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(data ?? {});
        },
      );
    }).catch((error) => {
      throw new AppError(502, "cos_upload_failed", "上传图片到腾讯云 COS 失败。", error);
    });

    return {
      imageUrl: buildPublicUrl(result.Location, key),
      key,
      stored: true,
    };
  }
}
