import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "../App";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = ResizeObserverMock;
}

describe("Agent Flight Recorder app", () => {
  const forbiddenVisibleCopy = {
    rankingGoal: /lead(?:er)board/i,
    splitMetric: new RegExp(`private/${"general"}`, "i"),
    externalRoot: new RegExp(`${"remote"} root`, "i"),
    modelArtifact: new RegExp(`check${"point"}`, "i")
  };

  it("renders the core demo surfaces", () => {
    render(<App />);

    expect(screen.getByText("Agent Flight Recorder")).toBeInTheDocument();
    expect(screen.getByText("原始 Agent 黑箱")).toBeInTheDocument();
    expect(screen.getByText("结构化任务地图")).toBeInTheDocument();
    expect(screen.getByText("产物检查器")).toBeInTheDocument();
    expect(screen.getByText("证据面板")).toBeInTheDocument();
    expect(screen.getByText("续接包")).toBeInTheDocument();
    expect(screen.getByText("续接状态")).toBeInTheDocument();
    expect(screen.getByText("就绪")).toBeInTheDocument();
    expect(screen.getByText("输入来源")).toBeInTheDocument();
    expect(screen.getByText("Harness 快照")).toBeInTheDocument();
    expect(screen.getByText("加载公开演示快照")).toBeInTheDocument();
  });

  it("renders public-safe demo copy", () => {
    render(<App />);

    expect(screen.getByText("Agent Flight Recorder")).toBeInTheDocument();
    expect(screen.getByText(/Vision Retrieval Demo/i)).toBeInTheDocument();
    expect(screen.queryByText(forbiddenVisibleCopy.rankingGoal)).not.toBeInTheDocument();
    expect(screen.queryByText(forbiddenVisibleCopy.splitMetric)).not.toBeInTheDocument();
    expect(screen.queryByText(forbiddenVisibleCopy.externalRoot)).not.toBeInTheDocument();
    expect(screen.queryByText(forbiddenVisibleCopy.modelArtifact)).not.toBeInTheDocument();
  });
});
