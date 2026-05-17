# Agent Flight Recorder Design Spec

## One-Line Pitch

Agent Flight Recorder turns chaotic AI coding sessions into an auditable, task-first mission map: what happened, why it happened, what evidence exists, what remains open, and how the next agent should continue.

## Product Positioning

This project is not another agent runtime, coding assistant, or project management board. It is a lightweight control-plane visualization for long-running agent work.

Most agent tools optimize execution: tools, runtime, multi-agent routing, chat, and automation. Agent Flight Recorder optimizes continuity: task definition, cognitive alignment, research, planning, specs, implementation plans, evidence-bound findings, and knowledge review.

The core claim:

> Most agent platforms optimize execution. Agent Flight Recorder optimizes continuity.

The demo should make one contrast obvious:

- Before: a long, messy transcript that is hard to resume.
- After: a structured task map with artifacts, evidence, open loops, and a restart packet.

## Audience

Primary audience:

- Hackathon judges who need to understand the product in under 60 seconds.
- AI developers who have used coding agents and experienced lost context, unclear handoffs, or unverified completion claims.

Secondary audience:

- Power users of Codex, Claude Code, OpenClaw, Hermes, Cursor, or other agentic coding workflows.
- Solo researchers and builders running multi-session technical tasks.

## Design Principles

1. Task-first, not chat-first.
   The task is the durable unit of work. Chat transcripts are raw material, not the product model.

2. Cognitive alignment before coding.
   The workflow should visibly guide an agent from task understanding to research, planning, spec writing, implementation planning, execution, findings, and knowledge review.

3. Local and document-native.
   The system should feel lightweight: Markdown-like artifacts, local files, simple indexes, and no heavy backend dependency for the demo.

4. Evidence-bound conclusions.
   Findings and completion claims should point to evidence: command outputs, file paths, test results, source notes, or operator decisions.

5. Recovery is the main output.
   A useful restart packet is the end of the demo. The next agent should know where to continue without replaying the full transcript.

6. Visual first.
   The main screen must communicate value before the user reads details. The structured task map is the hero surface.

## Source Constraints

The public demo uses a synthetic Markdown fixture under `public/sample-data/agent-harness-task/`.

The browser demo must not read or mutate a live harness root. Real harness integrations are out of scope for the public build and should be added later as an explicit opt-in path.

## Relationship To Existing Agent Harness

Agent Flight Recorder borrows the conceptual model from the local Agent Harness:

- `task.md`: durable task definition, constraints, success criteria, bindings.
- `plan.md`: macro plan and dependency graph.
- `memory/index.md`: compact current task state and recommended next step.
- `memory/handoff.md`: task-level continuation packet.
- `memory/evidence.md`: evidence log and verification references.
- `memory/open-loops.md`: unresolved questions and pending work.
- `findings/*.md`: evidence-bound conclusions.
- `decisions/*.md`: explicit operator or technical decisions.
- `knowledge-candidates/*.md`: reusable lessons pending review.
- `runtime/*.md`: execution state, primary session pointer, and runtime metadata.
- `sessions/*`: session-local summaries and handoffs when present.

The hackathon product should not expose this as an internal file tree first. It should translate the model into a general interface any coding-agent user can understand.

## Core Workflow

The product visualizes a long-running agent task as a workflow rail:

```text
Align -> Research -> Macro Plan -> Spec -> Implementation Plan -> Execute -> Findings -> Knowledge Review
```

Each step should show:

- status: missing, draft, ready, verified, blocked.
- linked artifacts.
- key evidence or risk.
- next action.

The workflow is intentionally lightweight. It does not require a database, background agent runtime, or live execution adapter for the MVP.

## Demo Narrative

The one-click demo should run as a staged transformation:

1. The user clicks `Recover Task From Black Box`.
2. The left pane loads a messy agent transcript or task record snapshot.
3. The system extracts or loads a structured mission model.
4. The center pane animates a structured task map.
5. The right pane shows artifact details, evidence cards, drift warnings, and open loops.
6. The bottom pane generates a restart packet.

The main contrast:

```text
Raw transcript: "I cannot tell what happened."
Structured task map: "I know the task, plan, evidence, risks, and next step."
```

## Main UI Surfaces

### 1. Mission Header

Purpose:

Show the task's current recoverability at a glance.

Elements:

- Product name: `Agent Flight Recorder`
- Task title
- Mission health score
- Evidence coverage
- Open loops count
- Restart readiness
- Source mode: `Sample Transcript`, `Harness Snapshot`, or `Manual Paste`

Example metrics:

- `Mission Health: 82%`
- `Evidence Coverage: 68%`
- `Open Loops: 3`
- `Restart Ready: Yes`

### 2. Raw Agent Black Box

Purpose:

Show the messy input that creates the before/after contrast.

Content:

- transcript fragments
- user interruptions
- command summaries
- failed attempts
- file change summaries
- ambiguous completion claims

Design:

- left column
- compact log stream
- tags added after recovery: `decision`, `evidence`, `failure`, `finding`, `open-loop`

### 3. Structured Task Map

Purpose:

This is the hero visual. It shows that the system has recovered a task-first structure from chaos.

Recommended representation:

- node graph or workflow rail
- central large surface
- nodes for workflow stages
- edges showing dependency or progression
- node badges for status and artifact count

Core nodes:

- Cognitive Alignment
- Research Scout
- Macro Plan
- Spec
- Implementation Plan
- Execution
- Findings
- Evidence Audit
- Knowledge Review

Node details:

- title
- status
- short summary
- artifact links
- evidence count
- risk flag

### 4. Artifact Inspector

Purpose:

Clicking a node should reveal the documents and reasoning behind it.

Content:

- artifact name
- compact summary
- source path or virtual path
- status
- linked decisions
- linked findings
- linked evidence
- recommended next action

Example:

```text
Artifact: memory/handoff.md
Summary: The demo fixture has a task boundary, evidence notes, a finding, and a next action.
Risk: runtime status is stale relative to task memory.
```

### 5. Evidence Board

Purpose:

Make evidence binding visible.

Cards:

- command verification
- test result
- file path
- remote artifact
- source document
- operator decision

Each evidence card should show:

- evidence kind
- confidence or stability
- source
- related finding
- whether it supports, contradicts, or leaves open a claim

### 6. Drift Warnings

Purpose:

Show that the tool is more than a pretty summarizer. It detects inconsistencies across task, memory, runtime, and derived records.

Example warnings:

- `Runtime says not-started, but handoff records substantial completed work.`
- `Restart brief is stale relative to memory/handoff.md.`
- `Findings exist without experiment records.`
- `Derived index is missing or older than source records.`

These warnings are valuable because they demonstrate real control-plane thinking.

### 7. Restart Packet

Purpose:

The final output of recovery.

Content:

- current task state
- what has been done
- evidence-backed conclusions
- unresolved open loops
- recommended next action
- constraints the next agent must obey

The restart packet should be copyable.

## MVP Scope For A Three-Hour Build

Must have:

- polished single-page app
- one-click sample demo
- raw log / raw artifact input pane
- structured task map
- artifact inspector
- evidence board
- drift warnings
- restart packet output

Should have:

- animated recovery sequence
- sample data based on a sanitized Agent Harness task snapshot
- simple health scoring
- graph node hover or click interactions
- visually distinct statuses: missing, draft, ready, verified, blocked

Could have:

- paste-your-own transcript mode
- LLM-powered extraction into structured JSON
- export recovered mission as Markdown
- compare ordinary agent transcript vs task-first record

Out of scope:

- full Agent Harness GUI
- real Codex runtime attachment
- modifying `<agent-harness-root>`
- generating or updating live harness indexes
- multi-user collaboration
- persistent database
- authentication
- production-grade parser for every harness file type

## Data Model

The frontend can use a compact mission model:

```ts
type Mission = {
  id: string;
  title: string;
  sourceMode: "sample" | "harness_snapshot" | "manual";
  health: {
    missionHealth: number;
    evidenceCoverage: number;
    openLoopCount: number;
    restartReady: boolean;
  };
  stages: MissionStage[];
  artifacts: Artifact[];
  evidence: EvidenceCard[];
  findings: Finding[];
  decisions: Decision[];
  driftWarnings: DriftWarning[];
  restartPacket: RestartPacket;
};
```

```ts
type MissionStage = {
  id: string;
  label: string;
  status: "missing" | "draft" | "ready" | "verified" | "blocked";
  summary: string;
  artifactIds: string[];
  evidenceIds: string[];
  nextAction?: string;
};
```

```ts
type Artifact = {
  id: string;
  kind: "task" | "plan" | "spec" | "implementation_plan" | "memory" | "runtime" | "decision" | "finding" | "evidence" | "knowledge";
  title: string;
  path: string;
  summary: string;
  status: string;
  linkedEvidenceIds: string[];
  linkedFindingIds: string[];
};
```

For the MVP, this model can be loaded from static JSON. LLM extraction can be added after the visual demo is stable.

## Sample Data Strategy

Preferred MVP path:

1. Build a static sanitized sample mission JSON inside this project.
2. Base its shape on a real Agent Harness task, but remove private or unnecessary details.
3. Keep the sample small enough to understand in one minute.
4. Include one real-feeling drift warning to prove the value of the system.

Potential sample story:

- A coding agent works on a public visualization demo.
- It starts from task boundary clarification.
- It builds a local static fixture.
- It binds UI claims to evidence notes.
- It detects that runtime metadata and handoff state are not the same.
- It records the next action: review low-evidence artifacts and regenerate the restart packet.
- But runtime metadata still says `not-started`, showing source drift.

This story is strong because it has planning, execution, evidence, findings, and a concrete next action without exposing private project details.

## Visual Direction

Recommended style:

Flight recorder / control tower shell, developer task map core.

The interface should feel like a serious technical cockpit, not a generic SaaS dashboard and not a decorative sci-fi screen.

Visual language:

- dark neutral background
- restrained cyan or blue for active signals
- amber for warnings
- green for verified evidence
- red only for blocked or severe drift
- compact panels
- crisp typography
- graph or rail as the main visual anchor

Avoid:

- marketing hero page
- oversized decorative cards
- pure purple gradients
- generic project-management board look
- excessive sci-fi ornamentation that obscures the task map

## Recommended UI Template Direction

The implementation should start from a polished dashboard/template only if it accelerates the build.

Useful template categories:

- Next.js + shadcn dashboard starter for layout, sidebar, cards, tables, and theme.
- React Flow or Reaflow for the structured task map.
- A timeline component for replaying recovered events.
- Simple chart or progress components for health metrics.

The chosen template must be copied into `<project-root>` or installed as a dependency. It must not be placed in or modify `<agent-harness-root>`.

## LLM Usage

For the hackathon MVP, LLM use should be optional rather than blocking.

Mode A: static demo

- Uses prebuilt sample mission JSON.
- Most reliable for judging.
- Shows full visual product.

Mode B: assisted recovery

- User pastes a raw transcript.
- LLM extracts stages, artifacts, evidence, findings, warnings, and restart packet.
- If API fails, the app falls back to static demo.

The structured output schema should be strict. The LLM should not generate executable code, shell commands, or modify files. It only produces mission JSON.

## Success Criteria

The project is successful if a judge can understand the value in under one minute:

- The before/after contrast is obvious.
- The structured task map is visually impressive.
- The artifact graph makes the local document-native workflow credible.
- Evidence binding is visible.
- Drift warnings demonstrate control-plane intelligence.
- The restart packet feels useful enough for a real next agent.

MVP acceptance checklist:

- One-click demo works locally.
- No write operations occur under `<agent-harness-root>`.
- The main UI has four clear zones: raw black box, structured task map, artifact inspector/evidence, restart packet.
- At least one stage can be clicked and inspected.
- At least one drift warning is shown.
- Restart packet is generated or loaded and copyable.

## Differentiation Against Existing Agent Workflows

OpenClaw, Hermes, generic harness CLI tools, and multi-agent orchestrators tend to focus on execution substrate: agents, tools, channels, runtime, message routing, and persistence.

Agent Flight Recorder focuses on continuity substrate:

- task-first framing
- cognitive alignment
- research/scouting before implementation
- macro plan and spec separation
- implementation plan before execution
- evidence-bound findings
- open-loop tracking
- knowledge review after completion
- local document-native memory

The demo should explicitly say:

```text
This does not replace your coding agent.
It makes your agent's work recoverable.
```

## Open Questions

1. Should the first demo use a fully synthetic task or a sanitized snapshot inspired by the real Agent Harness task?
2. Should the project include live LLM extraction in the first version, or keep extraction static for reliability?
3. Which UI template should be adopted for fastest high-quality visual output?
4. Should the final exported artifact be called `Restart Packet`, `Mission Recovery Brief`, or `Agent Handoff`?
5. Should the product emphasize individual power-user workflow or team auditability?

## Recommended Next Step

Choose the visual implementation base:

1. Next.js + shadcn + React Flow, best for polished dashboard and task map.
2. Vite + React + React Flow, fastest for a local hackathon demo.
3. Static HTML + bundled sample data, lowest setup risk but less polished.

Recommended choice:

Use Vite + React + React Flow + Tailwind/shadcn-style components. It is fast enough for a three-hour build and gives enough visual power for the structured task map.
