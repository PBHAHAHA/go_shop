# chat/
> L1 | 父级: /CLAUDE.md

模块定位: AI 能力服务，使用 Bun + Hono + TypeScript + Mastra + zod 承载智能体能力与对话编排。

成员清单
src/routes/: Hono 路由入口边界，描述 AI 能力服务的 HTTP 暴露面。
src/dto/: zod DTO 边界，描述输入输出数据契约。
src/models/: 领域模型边界，描述 AI 能力服务内部语义对象。
src/services/: 应用服务边界，描述用例编排与能力协调。
src/mastra/: Mastra 能力边界，描述 agents、workflows、tools、prompts 的组织入口。
src/middleware/: Hono 中间件边界，描述请求横切职责。
src/config/: 配置边界，描述环境变量与运行配置职责。
src/common/: 公共基础设施边界，描述共享工具、错误、常量与类型职责。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
