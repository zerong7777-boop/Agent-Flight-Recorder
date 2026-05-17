import { CheckCircle2, FileSearch, HelpCircle } from "lucide-react";
import type { EvidenceCard } from "../domain/mission";

export function EvidenceBoard({ evidence }: { evidence: EvidenceCard[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-cockpit-900/80 p-4 shadow-panel">
      <div className="mb-3 text-sm font-semibold text-white">证据面板</div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
        {evidence.slice(0, 4).map((card) => (
          <article key={card.id} className="rounded-md border border-white/10 bg-black/20 p-3">
            <div className="flex items-start gap-2">
              {card.signal === "supports" ? (
                <CheckCircle2 className="mt-0.5 text-signal-green" size={15} />
              ) : card.signal === "contradicts" ? (
                <FileSearch className="mt-0.5 text-signal-red" size={15} />
              ) : (
                <HelpCircle className="mt-0.5 text-signal-amber" size={15} />
              )}
              <div>
                <div className="text-sm font-medium text-white">{card.title}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-500">
                  {card.kind} / {card.confidence}
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{card.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
