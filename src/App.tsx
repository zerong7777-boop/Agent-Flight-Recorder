import { useMemo, useState } from "react";
import { ArtifactInspector } from "./components/ArtifactInspector";
import { DriftWarnings } from "./components/DriftWarnings";
import { EvidenceBoard } from "./components/EvidenceBoard";
import { MissionHeader } from "./components/MissionHeader";
import { RawBlackBox } from "./components/RawBlackBox";
import { RecoveryControls } from "./components/RecoveryControls";
import { RestartPacket } from "./components/RestartPacket";
import { StructuredTaskMap } from "./components/StructuredTaskMap";
import { loadHarnessSnapshotMission } from "./data/harnessSnapshot";
import { rawBlackBoxEvents } from "./data/rawBlackBox";
import { sampleMission } from "./data/sampleMission";
import type { Mission } from "./domain/mission";

export function App() {
  const [mission, setMission] = useState<Mission>(sampleMission);
  const [recovered, setRecovered] = useState(false);
  const [loadingSnapshot, setLoadingSnapshot] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [selectedStageId, setSelectedStageId] = useState(mission.stages[0]?.id ?? "");

  const selectedStage = useMemo(() => {
    return mission.stages.find((stage) => stage.id === selectedStageId) ?? mission.stages[0];
  }, [mission.stages, selectedStageId]);

  async function recoverFromSnapshot() {
    setLoadingSnapshot(true);
    setLoadError("");
    try {
      const snapshotMission = await loadHarnessSnapshotMission();
      setMission(snapshotMission);
      setSelectedStageId(snapshotMission.stages[0]?.id ?? "");
      setRecovered(true);
    } catch (error) {
      setMission(sampleMission);
      setSelectedStageId(sampleMission.stages[0]?.id ?? "");
      setRecovered(true);
      setLoadError(error instanceof Error ? error.message : "公开演示快照读取失败，已回退到内置样例。");
    } finally {
      setLoadingSnapshot(false);
    }
  }

  return (
    <main className="cockpit-grid min-h-screen text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col gap-4 p-4 lg:p-6">
        <MissionHeader mission={mission} />
        <RecoveryControls
          recovered={recovered}
          loading={loadingSnapshot}
          error={loadError}
          onRecover={recoverFromSnapshot}
          onReset={() => {
            setMission(sampleMission);
            setRecovered(false);
            setLoadError("");
            setSelectedStageId(sampleMission.stages[0]?.id ?? "");
          }}
        />
        <section className="grid flex-1 grid-cols-1 gap-4 xl:grid-cols-[360px_minmax(520px,1fr)_420px]">
          <RawBlackBox events={rawBlackBoxEvents} recovered={recovered} />
          <StructuredTaskMap
            mission={mission}
            recovered={recovered}
            selectedStageId={selectedStage.id}
            onSelectStage={setSelectedStageId}
          />
          <ArtifactInspector
            stage={selectedStage}
            artifacts={mission.artifacts}
            evidence={mission.evidence}
            findings={mission.findings}
          />
        </section>
        <section className="grid gap-4 xl:grid-cols-[1fr_420px]">
          <EvidenceBoard evidence={mission.evidence} />
          <DriftWarnings warnings={mission.driftWarnings} />
        </section>
        <RestartPacket packet={mission.restartPacket} />
      </div>
    </main>
  );
}
