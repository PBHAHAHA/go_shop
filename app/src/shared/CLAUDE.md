# app/src/shared/
> L2 | 父级: app/CLAUDE.md

成员清单
.gitkeep: 保持前端共享层目录存在，当前不承载业务实现。
design-system/: 唯一设计系统组件目录，承载 Avatar、Button、Icon、Logo、Surface、Text、TextArea 等基础 UI；所有新组件必须进入此目录。
ui/: 旧 UI 兼容出口，只能转发 design-system，不允许新增真实实现。

设计约束
未来所有组件必须写到 design-system/ 或其子目录中。
未来所有设计参数禁止在 UI 文件中硬编码像素、颜色、阴影、半径或任意 Tailwind 值。
新增颜色、间距、容器、字号、半径、阴影、网格必须先进入 app/src/index.css，再通过语义 token class 使用。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
