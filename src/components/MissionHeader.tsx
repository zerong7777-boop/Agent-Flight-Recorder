import { Activity, RadioTower } from "lucide-react";
import type { Mission } from "../domain/mission";
import { getHealthLabel } from "../domain/mission-health";

export function MissionHeader({ mission }: { mission: Mission }) {
  const healthLabel = getHealthLabel(mission.health.missionHealth);
  const restartReadiness = mission.health.restartReady ? "就绪" : "受阻";
  const sourceMode = mission.sourceMode === "harness_snapshot" ? "Harness 快照" : mission.sourceMode;
  const healthLabelText = {
    critical: "高风险",
    recoverable: "可恢复",
    strong: "稳定"
  }[healthLabel];

  return (
    <header className="flex flex-col gap-4 rounded-lg border border-white/10 bg-cockpit-900/80 p-5 shadow-panel xl:flex-row xl:items-center xl:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-signal-cyan">
          <RadioTower size={15} />
          Agent Flight Recorder
        </div>
        <h1 className="text-2xl font-semibold text-white">{mission.title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{mission.subtitle}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 xl:min-w-[620px]">
        <Metric label="任务健康度" value={`${mission.health.missionHealth}%`} note={healthLabelText} />
        <Metric label="证据覆盖率" value={`${mission.health.evidenceCoverage}%`} note="已绑定" />
        <Metric label="开放问题" value={String(mission.health.openLoopCount)} note="待处理" />
        <Metric label="续接状态" value={restartReadiness} note="handoff" />
        <Metric label="输入来源" value={sourceMode} note="source" />
      </div>
    </header>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Activity size={13} />
        {label}
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-xl font-semibold text-white">{value}</span>
        <span className="text-xs uppercase text-slate-500">{note}</span>
      </div>
    </div>
  );
}
