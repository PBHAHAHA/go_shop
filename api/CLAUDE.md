# api/
> L2 | 父级: /CLAUDE.md

模块定位: 业务接口服务，使用 Bun + Hono + TypeScript + zod + Supabase client 承载 IP 资产、订阅与生成物等业务 API。

成员清单
src/router/: Hono 路由聚合边界，描述业务接口服务的路由装配职责。
src/api/: HTTP 接口边界，描述用户、订阅、IP 资产、生成物、周边等资源级 API 处理职责。
src/dto/: zod DTO 边界，描述请求响应数据契约。
src/model/: 业务模型边界，描述 IP、形象变体、运营内容、订阅等核心业务对象。
src/service/: 应用服务边界，描述业务用例编排。
src/repository/: 数据访问边界，描述 Supabase 持久化适配职责。
src/middleware/: Hono 中间件边界，描述认证、上下文与请求横切职责。
src/common/: 公共基础设施边界，描述共享工具、错误、常量与类型职责。
src/config/: 配置边界，描述环境变量与运行配置职责。
src/lib/: 第三方客户端边界，描述 Supabase client 等外部库适配职责。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
