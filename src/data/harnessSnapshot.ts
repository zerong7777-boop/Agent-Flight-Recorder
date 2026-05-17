import type { Mission } from "../domain/mission";

const base = "/sample-data/agent-harness-task";

const files = {
  task: `${base}/task.md`,
  plan: `${base}/plan.md`,
  handoff: `${base}/memory/handoff.md`,
  evidence: `${base}/memory/evidence.md`,
  openLoops: `${base}/memory/open-loops.md`,
  restartBrief: `${base}/memory/restart-brief-short.md`,
  finding: `${base}/findings/finding-001-recovery-signal-coverage.md`,
  decision: `${base}/decisions/decision-001-resource-binding.md`,
  runtime: `${base}/runtime/status.md`
};

type Snapshot = Record<keyof typeof files, string>;

export async function loadHarnessSnapshotMission(): Promise<Mission> {
  const entries = await Promise.all(
    Object.entries(files).map(async ([key, path]) => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`无法读取公开演示快照：${path}`);
      }
      return [key, await response.text()] as const;
    })
  );
  return buildMission(Object.fromEntries(entries) as Snapshot);
}

function buildMission(snapshot: Snapshot): Mission {
  const title = frontmatter(snapshot.task, "title") || heading(snapshot.task) || "Vision Retrieval Demo Workflow Recovery";
  const recommended = extractAfter(snapshot.handoff, "## Next Recommended Action") ||
    "复核低证据产物，并重新生成续接包。";
  const currentState = extractAfter(snapshot.handoff, "## Confirmed Context") || summarize(snapshot.handoff);
  const openLoops = bulletsAfter(snapshot.openLoops, "## Needs Operator Input")
    .concat(bulletsAfter(snapshot.openLoops, "## Needs Evidence Later"))
    .slice(0, 5);
  const completed = bulletsAfter(snapshot.handoff, "## Completed").slice(0, 6);
  const findingSummary = extractAfter(snapshot.finding, "## Interpretation") || summarize(snapshot.finding);

  return {
    id: "demo-vision-retrieval-workflow",
    title,
    subtitle: "从 synthetic Agent Harness 快照中恢复任务地图、证据链、漂移预警和续接包。",
    sourceMode: "harness_snapshot",
    health: {
      missionHealth: 86,
      evidenceCoverage: 78,
      openLoopCount: Math.max(openLoops.length, 1),
      restartReady: true
    },
    stages: [
      {
        id: "align",
        label: "认知对齐",
        status: "verified",
        summary: "task.md 记录了公开演示目标、边界、成功标准和安全约束。",
        artifactIds: ["task-md", "decision-binding"],
        evidenceIds: ["evidence-task-boundary"]
      },
      {
        id: "research",
        label: "调研侦察",
        status: "verified",
        summary: "evidence.md 保存了 synthetic 来源、测试输出和任务边界证据。",
        artifactIds: ["evidence-md"],
        evidenceIds: ["evidence-sources", "evidence-task-boundary"]
      },
      {
        id: "macro-plan",
        label: "宏观计划",
        status: "draft",
        summary: "plan.md 给出了从任务理解到公开验收的依赖顺序。",
        artifactIds: ["plan-md"],
        evidenceIds: []
      },
      {
        id: "spec",
        label: "规格说明",
        status: "missing",
        summary: "fixture 没有单独 spec 文件，因此任务地图会显式标出结构缺口。",
        artifactIds: [],
        evidenceIds: []
      },
      {
        id: "implementation-plan",
        label: "实施计划",
        status: "ready",
        summary: "handoff.md 把当前状态、完成事项、开放问题和下一步压缩成可续接简报。",
        artifactIds: ["handoff-md"],
        evidenceIds: ["evidence-ui-smoke", "evidence-snapshot-load"]
      },
      {
        id: "execute",
        label: "执行",
        status: "verified",
        summary: "evidence.md 记录了测试、构建、快照读取和 restart packet 证据。",
        artifactIds: ["evidence-md", "runtime-status"],
        evidenceIds: ["evidence-build", "evidence-ui-smoke", "evidence-snapshot-load"]
      },
      {
        id: "findings",
        label: "发现记录",
        status: "ready",
        summary: findingSummary,
        artifactIds: ["artifact-finding-coverage"],
        evidenceIds: ["evidence-coverage-gap"],
        nextAction: recommended
      },
      {
        id: "knowledge-review",
        label: "知识复盘",
        status: "blocked",
        summary: "知识复盘要等公开安全扫描和演示验收完成后再提升。",
        artifactIds: ["open-loops-md"],
        evidenceIds: [],
        nextAction: "把公开安全检查和恢复模式沉淀成可复用 harness 规则。"
      }
    ],
    artifacts: [
      artifact("task-md", "task", "task.md", files.task, summarize(snapshot.task), "verified", ["evidence-task-boundary"], []),
      artifact("plan-md", "plan", "plan.md", files.plan, summarize(snapshot.plan), "draft", [], []),
      artifact("handoff-md", "memory", "memory/handoff.md", files.handoff, summarize(snapshot.handoff), "ready", ["evidence-build", "evidence-snapshot-load"], ["finding-coverage"]),
      artifact("evidence-md", "evidence", "memory/evidence.md", files.evidence, summarize(snapshot.evidence), "verified", ["evidence-build", "evidence-ui-smoke", "evidence-snapshot-load"], []),
      artifact("artifact-finding-coverage", "finding", "finding-001-recovery-signal-coverage.md", files.finding, summarize(snapshot.finding), "draft", ["evidence-coverage-gap"], ["finding-coverage"]),
      artifact("decision-binding", "decision", "decision-001-public-fixture-binding.md", files.decision, summarize(snapshot.decision), "accepted", ["evidence-task-boundary"], []),
      artifact("runtime-status", "runtime", "runtime/status.md", files.runtime, summarize(snapshot.runtime), "blocked", [], []),
      artifact("open-loops-md", "memory", "memory/open-loops.md", files.openLoops, summarize(snapshot.openLoops), "ready", [], [])
    ],
    evidence: [
      evidence("evidence-task-boundary", "operator_decision", "任务边界检查", "task.md / evidence.md", "公开快照记录了 synthetic fixture 的目标、边界和安全约束。", "high"),
      evidence("evidence-sources", "source", "公开样例来源", "memory/evidence.md", "evidence.md 说明该快照是 synthetic fixture，不是私人项目记录。", "medium"),
      evidence("evidence-build", "test", "本地构建通过", "memory/evidence.md", "生产构建可以生成静态演示资源。", "high"),
      evidence("evidence-ui-smoke", "test", "UI smoke 通过", "memory/evidence.md", "核心 cockpit 区块、任务地图、证据面板和续接包均可渲染。", "high"),
      evidence("evidence-snapshot-load", "file", "快照加载路径通过", "memory/evidence.md", "应用可以从 public/sample-data 中的 Markdown 产物恢复 mission map。", "high"),
      evidence("evidence-restart-packet", "file", "续接包可生成", "memory/restart-brief-short.md", "下一轮 agent 可以从压缩后的 restart packet 开始。", "high"),
      evidence("evidence-coverage-gap", "file", "证据覆盖缺口已记录", "finding-001-recovery-signal-coverage.md", "低证据产物被保留并标记，而不是被伪装成完成。", "medium")
    ],
    findings: [
      {
        id: "finding-coverage",
        title: frontmatter(snapshot.finding, "title") || "Recovery Signal Coverage Finding",
        stability: "draft",
        summary: findingSummary,
        evidenceIds: ["evidence-coverage-gap"]
      }
    ],
    decisions: [
      {
        id: "decision-binding",
        title: frontmatter(snapshot.decision, "title") || "Public Fixture Binding Decision",
        status: "accepted",
        selectedOption: extractAfter(snapshot.decision, "## Decision") || "使用 public/sample-data 下的 synthetic Markdown fixture。",
        consequence: extractAfter(snapshot.decision, "## Consequences") || "公开仓库可以展示任务恢复形状，同时避免泄露私人上下文。"
      }
    ],
    driftWarnings: [
      {
        id: "drift-runtime-stale",
        severity: "warning",
        title: "运行状态与 handoff 不一致",
        description: "runtime/status.md 保留的是演示运行元数据，handoff/evidence 记录的是任务恢复状态。",
        affectedArtifactIds: ["runtime-status", "handoff-md", "evidence-md"]
      },
      {
        id: "drift-spec-missing",
        severity: "info",
        title: "缺少独立 spec 产物",
        description: "fixture 包含 task、plan、handoff、finding 和 evidence，但没有单独 spec 文件。",
        affectedArtifactIds: ["plan-md"]
      },
      {
        id: "drift-knowledge-pending",
        severity: "info",
        title: "知识复盘尚未完成",
        description: "finding 已存在，但要等公开安全扫描完成后再进入 knowledge review。",
        affectedArtifactIds: ["artifact-finding-coverage", "open-loops-md"]
      }
    ],
    restartPacket: {
      title: "公开演示恢复简报",
      currentState,
      completed: completed.length ? completed : ["已从 synthetic handoff 中恢复当前上下文。"],
      openLoops: openLoops.length ? openLoops : ["继续执行 handoff 中的下一步。"],
      constraints: [
        "保持任务记录为 source-of-truth。",
        "公开样例必须保持 synthetic。",
        "后续结论必须绑定 evidence/finding。"
      ],
      nextAction: recommended
    }
  };
}

function artifact(
  id: string,
  kind: Mission["artifacts"][number]["kind"],
  title: string,
  path: string,
  summary: string,
  status: Mission["artifacts"][number]["status"],
  linkedEvidenceIds: string[],
  linkedFindingIds: string[]
) {
  return { id, kind, title, path, summary, status, linkedEvidenceIds, linkedFindingIds };
}

function evidence(
  id: string,
  kind: Mission["evidence"][number]["kind"],
  title: string,
  source: string,
  summary: string,
  confidence: Mission["evidence"][number]["confidence"]
) {
  return { id, kind, title, source, summary, confidence, signal: "supports" as const };
}

function frontmatter(text: string, key: string) {
  const match = text.match(new RegExp(`^${key}\\s*=\\s*"([^"]+)"`, "m"));
  return match?.[1] ?? "";
}

function heading(text: string) {
  return text.match(/^#\s+(.+)$/m)?.[1] ?? "";
}

function summarize(text: string) {
  const body = text.replace(/\+\+\+[\s\S]*?\+\+\+/, "").replace(/^#.+$/m, "").trim();
  return body.split(/\n\s*\n/)[0]?.replace(/\s+/g, " ").slice(0, 260) || "已从 synthetic fixture 读取该产物。";
}

function extractAfter(text: string, headingText: string) {
  const start = text.indexOf(headingText);
  if (start < 0) return "";
  const rest = text.slice(start + headingText.length);
  const next = rest.search(/\n##\s+/);
  return (next >= 0 ? rest.slice(0, next) : rest).trim().replace(/\s+/g, " ").slice(0, 520);
}

function bulletsAfter(text: string, headingText: string) {
  const section = extractAfter(text, headingText);
  return Array.from(section.matchAll(/-\s+([^-.][^-]*?)(?=\s+-\s+|$)/g))
    .map((match) => match[1].trim())
    .filter(Boolean);
}
