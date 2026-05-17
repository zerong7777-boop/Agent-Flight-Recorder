import { AlertTriangle, Info } from "lucide-react";
import type { DriftWarning } from "../domain/mission";

export function DriftWarnings({ warnings }: { warnings: DriftWarning[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-black/20 p-3">
      <div className="mb-3 text-sm font-semibold text-white">漂移预警</div>
      <div className="space-y-2">
        {warnings.map((warning) => (
          <article key={warning.id} className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-start gap-2">
              {warning.severity === "warning" || warning.severity === "critical" ? (
                <AlertTriangle className="mt-0.5 text-signal-amber" size={15} />
              ) : (
                <Info className="mt-0.5 text-signal-cyan" size={15} />
              )}
              <div>
                <div className="text-sm font-medium text-white">{warning.title}</div>
                <p className="mt-1 text-xs leading-5 text-slate-400">{warning.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
