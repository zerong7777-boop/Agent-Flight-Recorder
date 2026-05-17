+++
object_kind = "task-finding"
title = "Recovery Signal Coverage Finding"
task_id = "demo-vision-retrieval-workflow"
finding_id = "finding-001-recovery-signal-coverage"
status = "draft"
linked_task_ids = ["demo-vision-retrieval-workflow"]
source_refs = ["tasks/demo-vision-retrieval-workflow/memory/evidence.md"]
created_at = "2026-05-17T21:25:00+08:00"
updated_at = "2026-05-17T21:25:00+08:00"
+++
# Recovery Signal Coverage Finding

## Finding

Agent Flight Recorder can recover a useful mission map from a small set of task-first documents, but the quality of the restart packet depends on evidence coverage.

## Evidence

- `task.md` provides the durable task boundary.
- `plan.md` provides the intended sequence.
- `memory/evidence.md` provides verification signals.
- `memory/handoff.md` provides current state and next action.
- `runtime/status.md` can be stale, so it should not be treated as the only source of truth.

## Interpretation

The task map is useful when every major claim has at least one evidence link. Low-evidence artifacts should remain visible, but they should be marked as draft, missing, or blocked instead of appearing complete.

## Next Step

Review low-evidence artifacts, add missing verification notes, then regenerate the restart packet.
