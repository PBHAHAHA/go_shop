/**
 * [INPUT]: 依赖 react 的 useCallback/useState，依赖 widgets/WorkspaceCanvas、widgets/WorkspaceAgentPanel 与 CharacterAsset 类型
 * [OUTPUT]: 对外提供 WorkspaceLayout 组件
 * [POS]: widgets 的工作区双栏布局，托管角色资产状态并同步左侧 D3 画布与右侧 Agent 产图
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useCallback, useState } from "react";
import type { CharacterAsset } from "./CharacterD3Canvas";
import { WorkspaceAgentPanel } from "./WorkspaceAgentPanel";
import { WorkspaceCanvas } from "./WorkspaceCanvas";

type WorkspaceLayoutProps = {
  initialPrompt?: string;
};

export function WorkspaceLayout({ initialPrompt = "" }: WorkspaceLayoutProps) {
  const [characterAssets, setCharacterAssets] = useState<CharacterAsset[]>([]);

  const addCharacterAsset = useCallback((asset: CharacterAsset) => {
    setCharacterAssets((current) => [...current, asset]);
  }, []);

  const moveCharacterAsset = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setCharacterAssets((current) =>
        current.map((asset) =>
          asset.id === id ? { ...asset, ...position } : asset,
        ),
      );
    },
    [],
  );

  return (
    <div className="flex h-full min-h-0 w-full">
      <WorkspaceCanvas
        characterAssets={characterAssets}
        onMoveCharacterAsset={moveCharacterAsset}
      />
      <WorkspaceAgentPanel
        assetCount={characterAssets.length}
        initialPrompt={initialPrompt}
        onGeneratedAsset={addCharacterAsset}
      />
    </div>
  );
}
