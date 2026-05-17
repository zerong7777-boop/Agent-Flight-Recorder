+++
object_kind = "task-decision"
title = "Public Fixture Binding Decision"
task_id = "demo-vision-retrieval-workflow"
decision_id = "decision-001-public-fixture-binding"
question = "What data source should the public demo use?"
options = [
  "Use a synthetic Markdown fixture under public/sample-data.",
  "Read from a live local harness root.",
  "Require users to paste a transcript before the demo works."
]
selected_option = "Use a synthetic Markdown fixture under public/sample-data."
status = "accepted"
linked_task_ids = ["demo-vision-retrieval-workflow"]
source_refs = ["tasks/demo-vision-retrieval-workflow/task.md"]
created_at = "2026-05-17T21:20:00+08:00"
updated_at = "2026-05-17T21:20:00+08:00"
+++
# Public Fixture Binding Decision

## Decision

Use a synthetic Markdown fixture under `public/sample-data/agent-harness-task` as the one-click demo input.

## Rationale

This preserves the shape of task-first harness records while keeping the public repository free of nonpublic task details.

## Consequences

- The public demo works without private files.
- The app remains static-host friendly.
- Future real integrations should be opt-in and clearly separated from the public fixture.
