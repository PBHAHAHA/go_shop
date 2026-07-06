/**
 * [INPUT]: 依赖 react-dom/client 的 createRoot，依赖 app/router 的 AppRouter，依赖 ./index.css 的主题 token
 * [OUTPUT]: 对外提供浏览器端 React 挂载入口
 * [POS]: app/src 的运行时入口，连接 Vite HTML 根节点与应用路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./app/router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
