import type { StageStatus } from "../domain/mission";

const statusStyles: Record<StageStatus, string> = {
  verified: "border-signal-green/30 bg-signal-green/10 text-signal-green",
  ready: "border-signal-cyan/30 bg-signal-cyan/10 text-signal-cyan",
  draft: "border-signal-amber/30 bg-signal-amber/10 text-signal-amber",
  blocked: "border-signal-red/30 bg-signal-red/10 text-signal-red",
  missing: "border-white/10 bg-white/5 text-slate-400"
};

export function StatusBadge({ status }: { status: StageStatus }) {
  const label: Record<StageStatus, string> = {
    verified: "已验证",
    ready: "就绪",
    draft: "草稿",
    blocked: "受阻",
    missing: "缺失"
  };

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase ${statusStyles[status]}`}>
      {label[status]}
    </span>
  );
}
