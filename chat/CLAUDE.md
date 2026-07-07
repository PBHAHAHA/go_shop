# chat/
> L2 | 父级: /CLAUDE.md

模块定位: AI 能力服务，使用 Bun + Hono + TypeScript + Mastra + zod 承载 IP 形象生成、换装变体与运营内容产出的智能体编排。

成员清单
src/routes/: Hono 路由入口边界，描述 IP 生成与运营内容能力的 HTTP 暴露面。
src/dto/: zod DTO 边界，描述形象输入、三视图、换装、图文视频等输入输出契约。
src/models/: 领域模型边界，描述 IP 形象、变体、运营产物等内部语义对象。
src/services/: 应用服务边界，描述形象生成、扩展变体、内容产出等用例编排。
src/mastra/: Mastra 能力边界，描述 IP 创作 agents、workflows、tools、prompts 的组织入口。
src/middleware/: Hono 中间件边界，描述请求横切职责。
src/config/: 配置边界，描述环境变量与运行配置职责。
src/common/: 公共基础设施边界，描述共享工具、错误、常量与类型职责。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
