/**
 * [INPUT]: 依赖 react 的 useEffect/useRef，依赖 d3-selection/d3-zoom/d3-drag，依赖 shared/design-system 的 Icon
 * [OUTPUT]: 对外提供 CharacterD3Canvas 组件与 CharacterAsset 类型
 * [POS]: widgets 的角色资产 D3 画布，承载 Agent 产图的节点化预览、拖拽与缩放
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";
import { useEffect, useRef } from "react";

export type CharacterAssetKind = "generated" | "uploaded";

export type CharacterAsset = {
  createdAt: number;
  height: number;
  id: string;
  kind: CharacterAssetKind;
  prompt?: string;
  src: string;
  title: string;
  width: number;
  x: number;
  y: number;
};

type CharacterD3CanvasProps = {
  assets: CharacterAsset[];
  onMoveAsset: (id: string, position: { x: number; y: number }) => void;
};

const canvasWidth = 1440;
const canvasHeight = 980;
export function CharacterD3Canvas({
  assets,
  onMoveAsset,
}: CharacterD3CanvasProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const viewportRef = useRef<SVGGElement | null>(null);

  const hasAssets = assets.length > 0;

  useEffect(() => {
    const svgElement = svgRef.current;
    const viewportElement = viewportRef.current;

    if (!svgElement || !viewportElement) {
      return;
    }

    const svg = select(svgElement);
    const viewport = select(viewportElement);
    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.45, 2.3])
      .on("zoom", (event) => {
        viewport.attr("transform", event.transform.toString());
      });

    svg.call(zoomBehavior);

    if (!hasAssets) {
      svg.call(
        zoomBehavior.transform,
        zoomIdentity.translate(0, 0).scale(1),
      );
    }

    return () => {
      svg.on(".zoom", null);
    };
  }, [hasAssets]);

  useEffect(() => {
    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return;
    }

    const viewport = select(viewportElement);
    const nodes = viewport
      .selectAll<SVGGElement, CharacterAsset>("g.character-asset")
      .data(assets, (asset) => asset.id);

    nodes.exit().remove();

    const entered = nodes
      .enter()
      .append("g")
      .attr("class", "character-asset cursor-grab active:cursor-grabbing");

    entered
      .append("image")
      .attr("class", "asset-image")
      .attr("x", 0)
      .attr("y", 0)
      .attr("preserveAspectRatio", "xMidYMid slice");

    const merged = entered.merge(nodes);

    merged
      .attr("transform", (asset) => `translate(${asset.x}, ${asset.y})`)
      .call(
        drag<SVGGElement, CharacterAsset>()
          .on("start", function () {
            select(this).classed("is-dragging", true);
          })
          .on("drag", function (event, asset) {
            const nextX = asset.x + event.dx;
            const nextY = asset.y + event.dy;

            asset.x = nextX;
            asset.y = nextY;
            select(this).attr("transform", `translate(${nextX}, ${nextY})`);
          })
          .on("end", function (_event, asset) {
            select(this).classed("is-dragging", false);
            onMoveAsset(asset.id, { x: asset.x, y: asset.y });
          }),
      );

    merged
      .select<SVGImageElement>("image.asset-image")
      .attr("height", (asset) => asset.height)
      .attr("href", (asset) => asset.src)
      .attr("width", (asset) => asset.width);
  }, [assets, onMoveAsset]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg
        aria-label="角色 D3 资产画布"
        className="h-full w-full touch-none"
        ref={svgRef}
        role="img"
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      >
        <defs>
          <pattern
            height="36"
            id="character-grid"
            patternUnits="userSpaceOnUse"
            width="36"
          >
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="oklch(0.9037 0 0 / 0.62)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect fill="url(#character-grid)" height="100%" width="100%" />
        <g ref={viewportRef} />
      </svg>
    </div>
  );
}
