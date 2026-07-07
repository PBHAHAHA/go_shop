/**
 * [INPUT]: 依赖 Hono、dto/ipCreation.dto、services/IpCreationSessionService
 * [OUTPUT]: 对外提供 ipCreationRoutes
 * [POS]: chat routes 边界，暴露 IP 创作会话、右侧 Agent 消息与三视图任务查询 HTTP API
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Hono } from "hono";
import {
  createIpCreationSessionRequestSchema,
  sendIpCreationMessageRequestSchema,
} from "../dto/ipCreation.dto";
import { IpCreationSessionService } from "../services/ipCreationSessionService";

const service = new IpCreationSessionService();

export const ipCreationRoutes = new Hono();

ipCreationRoutes.post("/sessions", async (c) => {
  const body = createIpCreationSessionRequestSchema.parse(await c.req.json());
  const result = await service.createSession(body);

  return c.json(result);
});

ipCreationRoutes.get("/sessions/:sessionId", (c) => {
  const session = service.getSession(c.req.param("sessionId"));

  return c.json({ session });
});

ipCreationRoutes.post("/sessions/:sessionId/messages", async (c) => {
  const body = sendIpCreationMessageRequestSchema.parse(await c.req.json());
  const result = await service.sendMessage(c.req.param("sessionId"), body);

  return c.json(result);
});

ipCreationRoutes.get("/tasks/:taskId", (c) => {
  const task = service.getTask(c.req.param("taskId"));

  return c.json({ task });
});
