import type { Edge, Node } from "reactflow";
import type { Mission, MissionStage } from "./mission";

export interface StageNodeData {
  label: string;
  status: MissionStage["status"];
  summary: string;
  artifactCount: number;
  evidenceCount: number;
}

export function toStageNodes(mission: Mission): Node<StageNodeData>[] {
  return mission.stages.map((stage, index) => ({
    id: stage.id,
    type: "default",
    position: {
      x: (index % 4) * 260,
      y: Math.floor(index / 4) * 190
    },
    data: {
      label: stage.label,
      status: stage.status,
      summary: stage.summary,
      artifactCount: stage.artifactIds.length,
      evidenceCount: stage.evidenceIds.length
    }
  }));
}

export function toStageEdges(mission: Mission): Edge[] {
  return mission.stages.slice(0, -1).map((stage, index) => {
    const nextStage = mission.stages[index + 1];
    return {
      id: `${stage.id}-${nextStage.id}`,
      source: stage.id,
      target: nextStage.id,
      animated: nextStage.status !== "missing",
      style: {
        stroke: nextStage.status === "blocked" ? "#f5b84b" : "#38d5ff",
        strokeWidth: 2
      }
    };
  });
}

export function findStageById(mission: Mission, stageId: string): MissionStage {
  const stage = mission.stages.find((item) => item.id === stageId);
  if (!stage) {
    throw new Error(`Unknown mission stage: ${stageId}`);
  }
  return stage;
}
