+++
object_kind = "task-memory-block"
title = "Evidence Log"
task_id = "demo-vision-retrieval-workflow"
block_kind = "evidence"
snapshot_at = "2026-05-17T21:12:00+08:00"
source_session_ids = []
tags = ["task-memory", "evidence"]
linked_task_ids = ["demo-vision-retrieval-workflow"]
source_refs = ["tasks/demo-vision-retrieval-workflow/task.md"]
created_at = "2026-05-17T21:12:00+08:00"
updated_at = "2026-05-17T21:12:00+08:00"
+++
# Evidence Log

## Task Boundary Evidence

- Source: user-approved demo scope.
- Signal: the task is a public visualization demo, not a private project record.
- Result: the bundled fixture uses synthetic names and synthetic progress.

## Local Build Evidence

Command:

```text
npm.cmd run build
```

Result:

- TypeScript build completed.
- Static Vite bundle was generated.
- The demo can be hosted as a static site.

## Test Evidence

Command:

```text
npm.cmd test
```

Result:

- Mission graph helpers passed.
- Mission health helpers passed.
- App smoke rendering passed.

## Snapshot Loading Evidence

- Source: `public/sample-data/agent-harness-task`
- Signal: the app can recover a mission map from Markdown artifacts.
- Result: task, plan, evidence, handoff, finding, decision, runtime status, and restart brief are available as local fixture files.

## Drift Evidence

- Source: `runtime/status.md` and `memory/handoff.md`
- Signal: runtime metadata is not the same thing as task recovery state.
- Result: the UI flags this as a warning instead of treating one file as the only truth.

## Restart Packet Evidence

- Source: `memory/restart-brief-short.md`
- Signal: a future agent can continue from a compact brief.
- Result: the final demo output is recovery, not just visualization.
