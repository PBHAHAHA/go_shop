# Mallerai - AI 虚拟店长驱动的社交电商内容与代发 SaaS

为社交电商采购商、卖货用户和社交平台运营者提供从选货、图文与视频内容产出，到一键代发的 AI Native 工作台。

## 本质

Mallerai 不是单纯的选品工具，也不是普通内容生成器；它是面向社交电商经营链路的虚拟店长系统。产品把“选什么货、怎么表达、发到哪里”收敛成一条可由 AI 协同完成的经营流程。

## 商业模式

订阅制，按用户经营强度分层：

- 30 元档：轻量社交电商用户，满足基础选货与内容产出。
- 99 元档：稳定卖货用户，满足更高频的图文、视频与代发需求。
- 199 元档：重度运营用户，满足规模化内容生产与多平台分发。

## AI 角色

AI 是用户的虚拟店长。它帮助用户一键选货、一键生成社交平台图文内容、一键生成视频内容，并推进到最终代发，让用户把主要精力放在经营判断和成交结果上。

## 技术栈

全栈 TypeScript，顶层由 app/chat/api 三个 L1 模块组成：

- app: Bun + Vite + React + React Router + Tailwind CSS v4。
- chat: Bun + Hono + TypeScript + Mastra + zod。
- api: Bun + Hono + TypeScript + zod + Supabase client。

## 模块地图

| 模块 | 职责 | 文档 |
| --- | --- | --- |
| app | 用户端，承载选货、内容生成、代发等经营工作台交互。 | [app/CLAUDE.md](app/CLAUDE.md) |
| chat | AI 能力服务，承载虚拟店长的智能体、工作流、工具和提示词编排。 | [chat/CLAUDE.md](chat/CLAUDE.md) |
| api | 业务接口服务，承载用户、订阅、商品、内容、代发等业务 API 与数据访问。 | [api/CLAUDE.md](api/CLAUDE.md) |

法则: 产品定位先于功能堆砌；代码结构必须与经营链路同构。
