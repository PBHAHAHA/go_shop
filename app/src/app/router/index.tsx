/**
 * [INPUT]: 依赖 react-router-dom 的 BrowserRouter/Routes/Route，依赖 pages 的 LandingPage、AppDashboard 与 DEV-only DesignSystemPage
 * [OUTPUT]: 对外提供 AppRouter 组件
 * [POS]: app/src/app/router 的路由装配器，声明 /、/app 与开发态 /design-system 页面入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppDashboard } from "../../pages/AppDashboard";
import { DesignSystemPage } from "../../pages/DesignSystem";
import { LandingPage } from "../../pages/LandingPage";

const isDevelopment = import.meta.env.DEV;

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppDashboard />} />
        {isDevelopment ? (
          <Route path="/design-system" element={<DesignSystemPage />} />
        ) : null}
      </Routes>
    </BrowserRouter>
  );
}
