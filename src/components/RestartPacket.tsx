import { Clipboard, Route } from "lucide-react";
import type { RestartPacket as RestartPacketModel } from "../domain/mission";

export function RestartPacket({ packet }: { packet: RestartPacketModel }) {
  const text = [
    `# ${packet.title}`,
    "",
    `当前状态：${packet.currentState}`,
    "",
    "已完成：",
    ...packet.completed.map((item) => `- ${item}`),
    "",
    "开放问题：",
    ...packet.openLoops.map((item) => `- ${item}`),
    "",
    "约束：",
    ...packet.constraints.map((item) => `- ${item}`),
    "",
    `下一步：${packet.nextAction}`
  ].join("\n");

  async function copyPacket() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <section className="rounded-lg border border-white/10 bg-cockpit-900/80 p-4 shadow-panel">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Route size={16} />
          续接包
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10"
          onClick={copyPacket}
        >
          <Clipboard size={14} />
          复制
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <p className="text-sm leading-6 text-slate-300">{packet.currentState}</p>
        <div className="rounded-md border border-signal-cyan/20 bg-signal-cyan/10 p-3 text-sm text-cyan-100">
          下一步：{packet.nextAction}
        </div>
      </div>
    </section>
  );
}
