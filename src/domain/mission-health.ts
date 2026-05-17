import type { Mission, StageStatus } from "./mission";

export function getHealthLabel(score: number): "critical" | "recoverable" | "strong" {
  if (score < 50) return "critical";
  if (score < 80) return "recoverable";
  return "strong";
}

export function getStatusWeight(status: StageStatus): number {
  switch (status) {
    case "verified":
      return 1;
    case "ready":
      return 0.85;
    case "draft":
      return 0.55;
    case "blocked":
      return 0.25;
    case "missing":
      return 0;
  }
}

export function calculateStageCoverage(mission: Mission): number {
  if (mission.stages.length === 0) return 0;
  const total = mission.stages.reduce((sum, stage) => sum + getStatusWeight(stage.status), 0);
  return Math.round((total / mission.stages.length) * 100);
}

export function getPrimaryNextAction(mission: Mission): string {
  return mission.restartPacket.nextAction;
}
