import { TerminalSquare } from "lucide-react";
import type { RawBlackBoxEvent } from "../data/rawBlackBox";

export function RawBlackBox({ events, recovered }: { events: RawBlackBoxEvent[]; recovered: boolean }) {
  return (
    <section className="flex min-h-[520px] flex-col rounded-lg border border-white/10 bg-cockpit-900/80 shadow-panel">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <TerminalSquare size={16} />
          原始 Agent 黑箱
        </div>
        <span className="text-xs text-slate-500">{events.length} 条事件</span>
      </div>
      <div className="flex-1 space-y-3 overflow-auto p-4">
        {events.map((event) => (
          <article key={event.id} className="rounded-md border border-white/10 bg-black/20 p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="font-mono text-[11px] uppercase text-slate-500">
                {event.sequence.toString().padStart(2, "0")} / {event.time} / {event.speaker}
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-300">{event.text}</p>
            {recovered ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {event.recoveredTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-signal-cyan/20 bg-signal-cyan/10 px-2 py-0.5 text-[11px] text-signal-cyan"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
