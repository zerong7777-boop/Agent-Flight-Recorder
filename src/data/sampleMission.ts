import type { Mission } from "../domain/mission";

export const sampleMission: Mission = {
  id: "demo-vision-retrieval-workflow",
  title: "Vision Retrieval Demo Workflow Recovery",
  subtitle: "从一段混乱的 agent 工作记录中恢复任务地图、证据链、风险漂移和续接包。",
  sourceMode: "harness_snapshot",
  health: {
    missionHealth: 82,
    evidenceCoverage: 68,
    openLoopCount: 3,
    restartReady: true
  },
  stages: [
    {
      id: "align",
      label: "认知对齐",
      status: "verified",
      summary: "task.md 明确了演示目标、边界、成功标准和公开安全约束。",
      artifactIds: ["task-md", "decision-binding"],
      evidenceIds: ["evidence-task-boundary"],
      nextAction: "继续把公开安全和可恢复性作为最高优先级。"
    },
    {
      id: "research",
      label: "调研侦察",
      status: "verified",
      summary: "evidence.md 保存了 UI 截图、测试输出和用户确认，不包含私人机器记录。",
      artifactIds: ["asset-intake", "evidence-sources"],
      evidenceIds: ["evidence-sources"]
    },
    {
      id: "macro-plan",
      label: "宏观计划",
      status: "draft",
      summary: "plan.md 给出了从任务理解到演示验收的依赖顺序。",
      artifactIds: ["plan-md"],
      evidenceIds: []
    },
    {
      id: "spec",
      label: "规格说明",
      status: "missing",
      summary: "真实 spec 已存在，当前演示用它解释为什么任务地图比长聊天更容易恢复。",
      artifactIds: [],
      evidenceIds: []
    },
    {
      id: "implementation-plan",
      label: "实施计划",
      status: "ready",
      summary: "handoff.md 把当前状态压缩成下一位 agent 可以直接执行的续接包。",
      artifactIds: ["handoff-md"],
      evidenceIds: ["evidence-ui-smoke", "evidence-snapshot-load"]
    },
    {
      id: "execute",
      label: "执行",
      status: "verified",
      summary: "测试和构建记录证明 demo 可以本地运行并加载快照。",
      artifactIds: ["evidence-md"],
      evidenceIds: [
        "evidence-build",
        "evidence-ui-smoke",
        "evidence-snapshot-load",
        "evidence-restart-packet"
      ]
    },
    {
      id: "findings",
      label: "发现记录",
      status: "ready",
      summary: "发现记录指出证据覆盖仍不均匀，部分产物需要补充来源。",
      artifactIds: ["artifact-finding-coverage"],
      evidenceIds: ["evidence-coverage-gap"],
      nextAction: "复核低证据产物，并重新生成续接包。"
    },
    {
      id: "knowledge-review",
      label: "知识复盘",
      status: "blocked",
      summary: "知识复盘准备把可复用经验提升为轻量 harness 规则。",
      artifactIds: ["knowledge-links"],
      evidenceIds: [],
      nextAction: "等公开安全扫描和演示验收完成后，再提升成知识条目。"
    }
  ],
  artifacts: [
    {
      id: "task-md",
      kind: "task",
      title: "task.md",
      path: "tasks/demo/task.md",
      summary: "定义公开演示任务、边界、验收标准和不泄露私人上下文的约束。",
      status: "verified",
      linkedEvidenceIds: ["evidence-task-boundary"],
      linkedFindingIds: []
    },
    {
      id: "plan-md",
      kind: "plan",
      title: "plan.md",
      path: "tasks/demo/plan.md",
      summary: "包含从任务理解、证据检查到一键恢复演示的依赖图。",
      status: "draft",
      linkedEvidenceIds: [],
      linkedFindingIds: []
    },
    {
      id: "handoff-md",
      kind: "memory",
      title: "memory/handoff.md",
      path: "tasks/demo/memory/handoff.md",
      summary: "压缩当前状态、已完成事项、开放问题和下一步，便于下一位 agent 续接。",
      status: "ready",
      linkedEvidenceIds: [
        "evidence-build",
        "evidence-ui-smoke",
        "evidence-snapshot-load"
      ],
      linkedFindingIds: ["finding-coverage"]
    },
    {
      id: "evidence-md",
      kind: "evidence",
      title: "memory/evidence.md",
      path: "tasks/demo/memory/evidence.md",
      summary: "以测试、构建和用户确认记录支撑任务恢复结论。",
      status: "verified",
      linkedEvidenceIds: [
        "evidence-build",
        "evidence-ui-smoke",
        "evidence-snapshot-load",
        "evidence-restart-packet"
      ],
      linkedFindingIds: []
    },
    {
      id: "artifact-finding-coverage",
      kind: "finding",
      title: "finding-001-recovery-signal-coverage.md",
      path: "tasks/demo/findings/finding-001-recovery-signal-coverage.md",
      summary: "恢复信号已经足够驱动演示，但部分产物仍需要更清晰的证据来源。",
      status: "draft",
      linkedEvidenceIds: ["evidence-coverage-gap"],
      linkedFindingIds: ["finding-coverage"]
    },
    {
      id: "decision-binding",
      kind: "decision",
      title: "decision-001-public-fixture-binding.md",
      path: "tasks/demo/decisions/decision-001-public-fixture-binding.md",
      summary: "把演示绑定到 synthetic Markdown fixture，而不是任何私人工作目录。",
      status: "accepted",
      linkedEvidenceIds: ["evidence-task-boundary"],
      linkedFindingIds: []
    },
    {
      id: "asset-intake",
      kind: "memory",
      title: "assets/intake.md",
      path: "tasks/demo/assets/intake.md",
      summary: "收集公开演示所需的文案、界面截图和测试输出。",
      status: "ready",
      linkedEvidenceIds: ["evidence-sources"],
      linkedFindingIds: []
    },
    {
      id: "knowledge-links",
      kind: "knowledge",
      title: "memory/knowledge-links.md",
      path: "tasks/demo/memory/knowledge-links.md",
      summary: "等待公开安全扫描完成后，再把经验提升为可复用规则。",
      status: "blocked",
      linkedEvidenceIds: [],
      linkedFindingIds: []
    }
  ],
  evidence: [
    {
      id: "evidence-task-boundary",
      kind: "operator_decision",
      title: "任务边界已确认",
      source: "user-approved demo scope",
      summary: "公开演示只展示任务恢复工作流，不包含私人基础设施或真实项目进展。",
      confidence: "high",
      signal: "supports"
    },
    {
      id: "evidence-sources",
      kind: "source",
      title: "公开样例来源已脱敏",
      source: "synthetic fixture review",
      summary: "样例保留 harness 结构，但内容替换为 synthetic workflow。",
      confidence: "medium",
      signal: "supports"
    },
    {
      id: "evidence-build",
      kind: "test",
      title: "本地构建通过",
      source: "npm.cmd run build",
      summary: "生产构建可以生成静态演示资源。",
      confidence: "high",
      signal: "supports"
    },
    {
      id: "evidence-ui-smoke",
      kind: "test",
      title: "UI smoke 测试通过",
      source: "npm.cmd test",
      summary: "核心 cockpit 区块、任务地图、证据面板和续接包均可渲染。",
      confidence: "high",
      signal: "supports"
    },
    {
      id: "evidence-snapshot-load",
      kind: "file",
      title: "快照加载路径通过",
      source: "public/sample-data/agent-harness-task",
      summary: "一键恢复可以从 Markdown fixture 构建 mission map。",
      confidence: "high",
      signal: "supports"
    },
    {
      id: "evidence-restart-packet",
      kind: "file",
      title: "续接包可生成",
      source: "memory/restart-brief-short.md",
      summary: "下一轮 agent 可以从压缩后的 restart packet 开始。",
      confidence: "high",
      signal: "supports"
    },
    {
      id: "evidence-coverage-gap",
      kind: "file",
      title: "证据覆盖缺口已记录",
      source: "finding-001-recovery-signal-coverage.md",
      summary: "部分产物的证据来源仍需补充，系统会把它显示为 drift warning。",
      confidence: "medium",
      signal: "supports",
      relatedFindingId: "finding-coverage"
    }
  ],
  findings: [
    {
      id: "finding-coverage",
      title: "恢复信号覆盖不均匀",
      stability: "draft",
      summary: "任务地图、证据面板和续接包已形成闭环，但部分计划产物仍缺少直接证据。",
      evidenceIds: ["evidence-coverage-gap"]
    }
  ],
  decisions: [
    {
      id: "decision-binding",
      title: "公开样例绑定",
      status: "accepted",
      selectedOption: "使用 synthetic Markdown fixture 作为一键恢复输入。",
      consequence: "公开仓库可以展示真实工作流形状，同时避免泄露私人任务内容。"
    }
  ],
  driftWarnings: [
    {
      id: "drift-runtime-stale",
      severity: "warning",
      title: "运行状态与 handoff 不一致",
      description: "runtime/status.md 保留的是演示运行元数据，handoff/evidence 记录的是任务恢复状态。",
      affectedArtifactIds: ["handoff-md", "evidence-md"]
    },
    {
      id: "drift-spec-missing",
      severity: "info",
      title: "Spec 产物缺少直接证据",
      description: "任务地图能恢复 spec 阶段，但当前 fixture 没有单独的 spec 文件。",
      affectedArtifactIds: ["plan-md"]
    },
    {
      id: "drift-knowledge-blocked",
      severity: "info",
      title: "知识复盘待处理",
      description: "发现记录已存在，但要等公开安全扫描完成后再提升成可复用知识。",
      affectedArtifactIds: ["artifact-finding-coverage", "knowledge-links"]
    }
  ],
  restartPacket: {
    title: "任务恢复简报",
    currentState: "当前 demo 已经具备任务地图、证据面板、漂移预警和续接包。核心问题是公开样例需要持续保持 synthetic，避免把私人任务细节带入仓库。",
    completed: [
      "已确认公开演示边界。",
      "已建立 synthetic Markdown fixture。",
      "已让任务地图、产物检查器和证据面板读取同一份 mission 数据。",
      "已记录恢复信号覆盖不均匀的 finding。"
    ],
    openLoops: [
      "复核低证据产物。",
      "补充公开安全扫描记录。",
      "重新生成一版可展示的 restart packet。"
    ],
    constraints: [
      "把任务文档视为 source-of-truth。",
      "公开样例必须保持 synthetic。",
      "每个完成声明都要绑定证据。"
    ],
    nextAction: "复核低证据产物，并重新生成续接包。"
  }
};
