import { RotateCcw, ScanSearch } from "lucide-react";

export function RecoveryControls({
  recovered,
  loading,
  error,
  onRecover,
  onReset
}: {
  recovered: boolean;
  loading: boolean;
  error: string;
  onRecover: () => void;
  onReset: () => void;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-white/10 bg-cockpit-900/80 p-4 shadow-panel lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="text-sm font-semibold text-white">任务恢复</div>
        <div className="mt-1 text-xs text-slate-500">
          {loading
            ? "正在读取公开演示 harness 快照..."
            : recovered
              ? "已从公开演示快照恢复任务地图、证据链和 handoff。"
              : "读取项目内的 synthetic harness 快照，恢复任务地图，并生成续接包。"}
        </div>
        {error ? <div className="mt-2 text-xs text-signal-amber">{error}</div> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-signal-cyan/30 bg-signal-cyan/10 px-3 py-2 text-sm font-medium text-signal-cyan transition hover:bg-signal-cyan/20"
          onClick={onRecover}
          disabled={loading}
        >
          <ScanSearch size={16} />
          {loading ? "读取中" : "加载公开演示快照"}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          onClick={onReset}
        >
          <RotateCcw size={16} />
          重置
        </button>
      </div>
    </section>
  );
}
