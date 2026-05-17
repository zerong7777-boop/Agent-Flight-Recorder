import { FileText } from "lucide-react";
import type { Artifact, EvidenceCard, Finding, MissionStage } from "../domain/mission";
import { StatusBadge } from "./StatusBadge";

export function ArtifactInspector({
  stage,
  artifacts,
  evidence,
  findings
}: {
  stage: MissionStage;
  artifacts: Artifact[];
  evidence: EvidenceCard[];
  findings: Finding[];
}) {
  const stageArtifacts = artifacts.filter((artifact) => stage.artifactIds.includes(artifact.id));
  const stageEvidence = evidence.filter((card) => stage.evidenceIds.includes(card.id));
  const stageFindings = findings.filter((finding) =>
    stageArtifacts.some((artifact) => artifact.linkedFindingIds.includes(finding.id))
  );

  return (
    <section className="flex min-h-[520px] flex-col rounded-lg border border-white/10 bg-cockpit-900/80 shadow-panel">
      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-white">产物检查器</div>
            <div className="mt-1 text-xs text-slate-500">{stage.label}</div>
          </div>
          <StatusBadge status={stage.status} />
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-auto p-4">
        <p className="text-sm leading-6 text-slate-300">{stage.summary}</p>
        {stage.nextAction ? (
          <div className="rounded-md border border-signal-cyan/20 bg-signal-cyan/10 p-3 text-sm text-cyan-100">
            下一步：{stage.nextAction}
          </div>
        ) : null}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">产物</div>
          <div className="space-y-2">
            {stageArtifacts.length === 0 ? (
              <div className="rounded-md border border-dashed border-white/10 p-3 text-sm text-slate-500">
                这个阶段尚未恢复出产物。
              </div>
            ) : (
              stageArtifacts.map((artifact) => (
                <article key={artifact.id} className="rounded-md border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <FileText size={15} />
                    {artifact.title}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-slate-500">{artifact.path}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{artifact.summary}</p>
                </article>
              ))
            )}
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">证据</div>
          <div className="space-y-2">
            {stageEvidence.length === 0 ? (
              <div className="rounded-md border border-dashed border-white/10 p-3 text-sm text-slate-500">
                这个阶段尚未绑定直接证据。
              </div>
            ) : (
              stageEvidence.map((card) => (
                <article key={card.id} className="rounded-md border border-signal-green/20 bg-signal-green/10 p-3">
                  <div className="text-sm font-medium text-signal-green">{card.title}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{card.summary}</p>
                </article>
              ))
            )}
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">发现</div>
          <div className="space-y-2">
            {stageFindings.length === 0 ? (
              <div className="rounded-md border border-dashed border-white/10 p-3 text-sm text-slate-500">
                这个阶段尚未绑定发现记录。
              </div>
            ) : (
              stageFindings.map((finding) => (
                <article key={finding.id} className="rounded-md border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-sm font-medium text-white">{finding.title}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{finding.summary}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
