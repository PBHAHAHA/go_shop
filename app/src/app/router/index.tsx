/**
 * [INPUT]: 依赖 react-router-dom、app/providers/AppProviders、pages、app/router/guards/RequireAuth
 * [OUTPUT]: 对外提供 AppRouter 组件
 * [POS]: app/src/app/router 的路由装配器，BrowserRouter 包裹 AppProviders 以让 LoginModal 可使用 useNavigate
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProviders } from "../providers/AppProviders";
import { RequireAuth } from "./guards/RequireAuth";
import { AuthCallbackPage } from "../../pages/AuthCallbackPage";
import { DesignSystemPage } from "../../pages/DesignSystem";
import { LandingPage } from "../../pages/LandingPage";
import { WorkspacePage } from "../../pages/WorkspacePage";

const isDevelopment = import.meta.env.DEV;

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route
            path="/app"
            element={
              <RequireAuth>
                <WorkspacePage />
              </RequireAuth>
            }
          />
          {isDevelopment ? (
            <Route path="/design-system" element={<DesignSystemPage />} />
          ) : null}
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}
