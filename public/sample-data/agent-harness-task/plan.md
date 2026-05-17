+++
object_kind = "task-plan"
title = "Public Demo Recovery Plan"
task_id = "demo-vision-retrieval-workflow"
status = "draft"
linked_task_ids = ["demo-vision-retrieval-workflow"]
source_refs = ["tasks/demo-vision-retrieval-workflow/task.md"]
created_at = "2026-05-17T21:05:00+08:00"
updated_at = "2026-05-17T21:05:00+08:00"
+++
# Public Demo Recovery Plan

## Goal

Recover a structured mission map from a synthetic Agent Harness task fixture and present it as a compelling public demo.

## Dependency Order

1. Confirm the public-safe task boundary.
2. Build the mission map from Markdown artifacts.
3. Bind artifacts to synthetic evidence records.
4. Surface drift warnings where task state and runtime state differ.
5. Generate a restart packet that lets the next agent continue without rereading a long transcript.
6. Run tests, build, and leak scans before publishing.

## Acceptance Checks

- The app renders the cockpit layout.
- The one-click snapshot loader reads files under `public/sample-data/agent-harness-task`.
- The sample fixture uses synthetic task, machine, and workspace names.
- The public repository history contains only sanitized content.
