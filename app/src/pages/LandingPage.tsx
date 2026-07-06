/**
 * [INPUT]: 依赖 widgets/Header 与 shared/design-system 组件，依赖用户提供的产品主题功能句
 * [OUTPUT]: 对外提供 LandingPage 页面组件
 * [POS]: pages 的 / 页面，展示 AI 虚拟店长产品壳并引导进入 /app
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useNavigate } from "react-router-dom";
import { Header } from "../widgets/Header";
import {
  BodyText,
  Button,
  Eyebrow,
  MetricText,
  Surface,
  Title,
} from "../shared/design-system";

const themeLine =
  "AI 虚拟店长帮助社交电商用户完成选货、内容生成与一键代发";

export function LandingPage() {
  const navigate = useNavigate();
  const scheduleBars = [
    "h-bar-1",
    "h-bar-2",
    "h-bar-3",
    "h-bar-4",
    "h-bar-5",
    "h-bar-6",
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="layout-landing mx-auto grid min-h-landing w-full max-w-page items-center gap-section-y px-page-x pb-section-y pt-panel-lg md:px-panel-lg">
        <div>
          <Eyebrow>Social commerce operating desk</Eyebrow>
          <Title className="mt-stack-lg max-w-copy lg:text-title-xl lg:leading-display" size="lg">
            把选货、内容和代发交给一位安静的
            <span className="italic"> AI 店长</span>
          </Title>
          <BodyText className="mt-panel max-w-copy">
            {themeLine}。用户不再在商品、文案、视频脚本和发布任务之间来回切换，经营链路被收束为一张清晰工作台。
          </BodyText>
          <div className="mt-stack-xl flex flex-wrap gap-stack-sm">
            <Button onClick={() => navigate("/app")}>进入工作台</Button>
            <Button onClick={() => navigate("/app")} variant="secondary">
              查看代发流程
            </Button>
          </div>
        </div>

        <div className="grid gap-stack-md">
          <Surface elevation="sm">
            <Eyebrow>今日选货</Eyebrow>
            <div className="mt-stack-md grid gap-stack-sm">
              {["家居清洁套装", "便携筋膜枪", "轻食代餐杯"].map(
                (item, index) => (
                  <div className="flex items-center justify-between" key={item}>
                    <span className="font-sans text-ui-md text-foreground">
                      {item}
                    </span>
                    <span className="font-sans text-ui-xs text-muted-foreground">
                      {42 + index * 17}.2%
                    </span>
                  </div>
                ),
              )}
            </div>
          </Surface>

          <Surface tone="primary">
            <p className="font-sans text-ui-xs leading-ui-relaxed">AI 建议</p>
            <MetricText className="mt-stack-sm text-primary-foreground">
              先推清洁套装，配三条朋友圈种草文案。
            </MetricText>
          </Surface>

          <Surface elevation="sm">
            <Eyebrow>代发排期</Eyebrow>
            <div className="mt-stack-md flex items-end gap-stack-xs">
              {scheduleBars.map((heightClass) => (
                <div
                  className="w-chart-bar rounded-full bg-muted"
                  key={heightClass}
                >
                  <div className={`rounded-full bg-chart-1 ${heightClass}`} />
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </section>
    </main>
  );
}
