export type SourceMode = "sample" | "harness_snapshot" | "manual";

export type StageStatus = "missing" | "draft" | "ready" | "verified" | "blocked";

export type ArtifactStatus = "missing" | "draft" | "ready" | "verified" | "blocked" | "accepted";

export type ArtifactKind =
  | "task"
  | "plan"
  | "spec"
  | "implementation_plan"
  | "memory"
  | "runtime"
  | "decision"
  | "finding"
  | "evidence"
  | "knowledge";

export type EvidenceKind =
  | "command"
  | "test"
  | "file"
  | "remote_artifact"
  | "source"
  | "operator_decision";

export type EvidenceSignal = "supports" | "contradicts" | "open";

export interface MissionHealth {
  missionHealth: number;
  evidenceCoverage: number;
  openLoopCount: number;
  restartReady: boolean;
}

export interface MissionStage {
  id: string;
  label: string;
  status: StageStatus;
  summary: string;
  artifactIds: string[];
  evidenceIds: string[];
  nextAction?: string;
}

export interface Artifact {
  id: string;
  kind: ArtifactKind;
  title: string;
  path: string;
  summary: string;
  status: ArtifactStatus;
  linkedEvidenceIds: string[];
  linkedFindingIds: string[];
}

export interface EvidenceCard {
  id: string;
  kind: EvidenceKind;
  title: string;
  source: string;
  summary: string;
  confidence: "low" | "medium" | "high";
  signal: EvidenceSignal;
  relatedFindingId?: string;
}

export interface Finding {
  id: string;
  title: string;
  stability: "draft" | "reviewed" | "promoted";
  summary: string;
  evidenceIds: string[];
}

export interface Decision {
  id: string;
  title: string;
  status: "proposed" | "accepted" | "rejected";
  selectedOption: string;
  consequence: string;
}

export interface DriftWarning {
  id: string;
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  affectedArtifactIds: string[];
}

export interface RestartPacket {
  title: string;
  currentState: string;
  completed: string[];
  openLoops: string[];
  constraints: string[];
  nextAction: string;
}

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  sourceMode: SourceMode;
  health: MissionHealth;
  stages: MissionStage[];
  artifacts: Artifact[];
  evidence: EvidenceCard[];
  findings: Finding[];
  decisions: Decision[];
  driftWarnings: DriftWarning[];
  restartPacket: RestartPacket;
}
