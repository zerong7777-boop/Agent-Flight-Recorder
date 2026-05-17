import { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap, type NodeMouseHandler } from "reactflow";
import type { Mission } from "../domain/mission";
import { toStageEdges, toStageNodes } from "../domain/mission-graph";

export function StructuredTaskMap({
  mission,
  recovered,
  selectedStageId,
  onSelectStage
}: {
  mission: Mission;
  recovered: boolean;
  selectedStageId: string;
  onSelectStage: (stageId: string) => void;
}) {
  const nodes = useMemo(() => {
    return toStageNodes(mission).map((node) => ({
      ...node,
      className: [
        "rounded-lg border bg-cockpit-800 px-3 py-2 text-white shadow-panel transition-opacity",
        node.id === selectedStageId ? "border-signal-cyan" : "border-white/10",
        recovered ? "opacity-100" : "opacity-45"
      ].join(" ")
    }));
  }, [mission, recovered, selectedStageId]);

  const edges = useMemo(() => toStageEdges(mission), [mission]);

  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    onSelectStage(node.id);
  };

  return (
    <section className="flex min-h-[520px] flex-col rounded-lg border border-white/10 bg-cockpit-900/80 shadow-panel">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-white">结构化任务地图</div>
          <div className="mt-1 text-xs text-slate-500">
            对齐 -&gt; 调研 -&gt; 计划 -&gt; 规格 -&gt; 执行 -&gt; 发现 -&gt; 知识复盘
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-signal-cyan/30 bg-signal-cyan/10 px-2 py-0.5 text-xs text-signal-cyan">
          {recovered ? "已恢复" : "等待恢复"}
        </span>
      </div>
      <div className="h-[560px] flex-1">
        <ReactFlow
          nodes={nodes}
          edges={recovered ? edges : []}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          onNodeClick={handleNodeClick}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
        >
          <Background color="#1b2a3d" gap={18} />
          <MiniMap pannable zoomable nodeColor="#38d5ff" maskColor="rgba(7, 11, 18, 0.65)" />
          <Controls />
        </ReactFlow>
      </div>
    </section>
  );
}
