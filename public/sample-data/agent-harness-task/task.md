+++
object_kind = "task"
title = "Vision Retrieval Demo Workflow Recovery"
task_id = "demo-vision-retrieval-workflow"
status = "active"
created_at = "2026-05-17T21:00:00+08:00"
updated_at = "2026-05-17T21:00:00+08:00"
short_restart_brief_ref = "tasks/demo-vision-retrieval-workflow/memory/restart-brief-short.md"
default_session_start_packet_ref = "tasks/demo-vision-retrieval-workflow/memory/restart-brief-short.md"
primary_repo = "local-demo-runner:/demo/workspace/vision-retrieval"
machine_ids = ["local-demo-runner"]
binding_machine_id = "local-demo-runner"
tags = ["public-demo", "agent-harness", "workflow-recovery"]
+++
# Vision Retrieval Demo Workflow Recovery

Build a public-safe Agent Flight Recorder demo that turns a long agent session into a structured task map. The demo must show task definition, planning, evidence, drift warnings, findings, and restart packet generation without exposing nonpublic operator data.

## Success Criteria

- A judge can understand the value in under one minute.
- The app loads a bundled Markdown fixture with one click.
- The mission map shows task alignment, planning, execution, finding, and knowledge review stages.
- Every completion claim shown in the demo points to a synthetic evidence record.
- The restart packet gives a clear next action for a future agent.
- Public files contain no real infrastructure, account, task, or experiment details.

## Constraints

- Use only synthetic fixture data.
- Keep the demo fully local and static-host friendly.
- Do not read a live harness root at runtime.
- Do not include private command transcripts or environment details.

## Knowledge Sink

Reusable lessons should be promoted into a lightweight harness rule only after public-safety scans and demo verification pass.
