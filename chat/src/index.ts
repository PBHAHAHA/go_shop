/**
 * [INPUT]: 依赖 Hono、hono/cors、routes/ipCreationRoutes、common/AppError、config/env
 * [OUTPUT]: 启动 chat HTTP 服务
 * [POS]: chat 服务入口，装配健康检查、IP 创作路由与统一错误响应
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { AppError, isAppError } from "./common/appError";
import { env } from "./config/env";
import { ipCreationRoutes } from "./routes/ipCreationRoutes";

const app = new Hono();

app.use(
  "*",
  cors({
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    origin: (origin) =>
      env.allowedOrigins.includes(origin) ? origin : env.allowedOrigins[0] ?? origin,
  }),
);

app.get("/health", (c) =>
  c.json({
    ok: true,
    service: "chat",
  }),
);

app.route("/v1/ip-creation", ipCreationRoutes);

app.onError((error, c) => {
  if (error instanceof ZodError) {
    return c.json(
      {
        error: {
          code: "validation_error",
          details: error.issues,
          message: "请求参数不合法。",
        },
      },
      400,
    );
  }

  if (isAppError(error)) {
    return c.json(
      {
        error: {
          code: error.code,
          details: error.details,
          message: error.message,
        },
      },
      error.status as never,
    );
  }

  if (error instanceof HTTPException) {
    return c.json(
      {
        error: {
          code: "http_exception",
          message: error.message,
        },
      },
      error.status,
    );
  }

  const fallback = new AppError(
    500,
    "internal_error",
    error instanceof Error ? error.message : "chat 服务内部错误。",
  );

  return c.json(
    {
      error: {
        code: fallback.code,
        message: fallback.message,
      },
    },
    fallback.status as never,
  );
});

export { app };

if (import.meta.main) {
  Bun.serve({
    fetch: app.fetch,
    port: env.port,
  });

  console.log(`chat service listening on http://127.0.0.1:${env.port}`);
}
