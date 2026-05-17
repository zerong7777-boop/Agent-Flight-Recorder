import { describe, expect, it } from "vitest";
import { sampleMission } from "../data/sampleMission";
import { findStageById, toStageEdges, toStageNodes } from "../domain/mission-graph";

describe("mission graph helpers", () => {
  it("creates one node per mission stage", () => {
    const nodes = toStageNodes(sampleMission);
    expect(nodes).toHaveLength(sampleMission.stages.length);
    expect(nodes[0].id).toBe("align");
    expect(nodes[0].data).toMatchObject({
      artifactCount: 2,
      evidenceCount: 1,
      status: "verified"
    });
  });

  it("creates sequential edges between stages", () => {
    const edges = toStageEdges(sampleMission);
    expect(edges).toHaveLength(sampleMission.stages.length - 1);
    expect(edges[0].source).toBe("align");
    expect(edges[0].target).toBe("research");
  });

  it("marks missing-stage edges as static and blocked-stage edges as amber", () => {
    const edges = toStageEdges(sampleMission);
    const missingTargetEdge = edges.find((edge) => edge.target === "spec");
    const blockedTargetEdge = edges.find((edge) => edge.target === "knowledge-review");

    expect(missingTargetEdge?.animated).toBe(false);
    expect(blockedTargetEdge?.style).toMatchObject({ stroke: "#f5b84b", strokeWidth: 2 });
  });

  it("throws on unknown stage ids", () => {
    expect(() => findStageById(sampleMission, "missing-stage")).toThrow("Unknown mission stage");
  });
});
