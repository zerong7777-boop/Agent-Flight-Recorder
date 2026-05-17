+++
object_kind = "task-runtime-status"
title = "Demo Runtime Status"
task_id = "demo-vision-retrieval-workflow"
runtime_status = "static-demo"
updated_at = "2026-05-17T21:22:00+08:00"
machine_id = "local-demo-runner"
working_directory = "local-demo-runner:/demo/workspace/vision-retrieval"
linked_task_ids = ["demo-vision-retrieval-workflow"]
source_refs = ["tasks/demo-vision-retrieval-workflow/task.md"]
+++
# Demo Runtime Status

## Current State

The runtime record represents static demo metadata. It is intentionally separate from the handoff state so the UI can show how Agent Flight Recorder detects stale or partial runtime signals.

## Notes

- No live service is required for the bundled fixture.
- No private workspace is read by the browser.
- The app recovers the mission map from static Markdown files.
