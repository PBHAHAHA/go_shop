# go_shop - AI Native 全栈 SaaS 工程骨架

Bun + TypeScript + Vite + React + React Router + Tailwind CSS v4 + Hono + Mastra + zod + Supabase client。

<directory>
app/ - 用户端，承载浏览器交互与前端路由 (1子目录: src)
chat/ - AI 能力服务，承载智能体、工作流、工具与提示词编排 (1子目录: src)
api/ - 业务接口服务，承载业务 HTTP 接口、数据访问与外部服务适配 (1子目录: src)
</directory>

<config>
app/package.json - app 依赖与 Bun 包元数据
chat/package.json - chat 依赖与 Bun 包元数据
api/package.json - api 依赖与 Bun 包元数据
app/tsconfig.json - app TypeScript 编辑器配置
chat/tsconfig.json - chat TypeScript 编辑器配置
api/tsconfig.json - api TypeScript 编辑器配置
</config>

法则: 极简·稳定·导航·版本精确
