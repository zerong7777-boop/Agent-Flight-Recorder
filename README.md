# Agent Flight Recorder

把混乱的 AI Agent 长任务记录恢复成结构化任务地图，呈现计划、证据、发现、风险漂移和续接包，让任务可审计、可恢复、可交接。

## Demo

Agent Flight Recorder 是一个轻量、本地文档驱动的工作流可视化 demo。它把 Agent Harness 风格的任务文档恢复为：

- 结构化任务地图
- 证据绑定的产物检查器
- 漂移和缺口预警
- 可交接的 restart packet
- 原始黑箱记录与结构化恢复结果对比

页面默认展示内置样例，点击“加载公开演示快照”后，会读取 `public/sample-data/agent-harness-task/` 中的 synthetic Agent Harness 任务快照。

## Local Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

如果部署到 GitHub Pages 的项目子路径，可以指定 Vite base path：

```bash
VITE_BASE_PATH=/agent-flight-recorder/ npm run build
```

PowerShell:

```powershell
$env:VITE_BASE_PATH="/agent-flight-recorder/"; npm.cmd run build
```

## Project Shape

- `src/domain/`: mission model, health scoring, graph conversion
- `src/data/`: built-in demo data and synthetic snapshot loader
- `src/components/`: cockpit UI surfaces
- `public/sample-data/agent-harness-task/`: synthetic task snapshot for one-click demo
- `docs/superpowers/`: design spec and implementation plan

## Public Snapshot Note

The bundled snapshot is a synthetic public fixture. It preserves the shape of an Agent Harness task without exposing private infrastructure, private project context, or operator-specific data.
