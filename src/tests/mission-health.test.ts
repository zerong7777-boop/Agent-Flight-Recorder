import { describe, expect, it } from "vitest";
import { sampleMission } from "../data/sampleMission";
import { calculateStageCoverage, getHealthLabel, getPrimaryNextAction } from "../domain/mission-health";

describe("mission health helpers", () => {
  it("labels mission health bands", () => {
    expect(getHealthLabel(20)).toBe("critical");
    expect(getHealthLabel(65)).toBe("recoverable");
    expect(getHealthLabel(82)).toBe("strong");
  });

  it("calculates stage coverage from stage statuses", () => {
    expect(calculateStageCoverage(sampleMission)).toBe(69);
  });

  it("uses the restart packet next action as the primary action", () => {
    expect(getPrimaryNextAction(sampleMission)).toBe(
      "复核低证据产物，并重新生成续接包。"
    );
  });
});
