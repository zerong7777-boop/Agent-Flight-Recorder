export interface RawBlackBoxEvent {
  id: string;
  sequence: number;
  time: string;
  speaker: "user" | "agent" | "shell" | "system";
  text: string;
  recoveredTags: Array<"decision" | "evidence" | "failure" | "finding" | "open-loop" | "handoff">;
}

export const rawBlackBoxEvents: RawBlackBoxEvent[] = [
  {
    id: "raw-1",
    sequence: 1,
    time: "18:49",
    speaker: "user",
    text: "我先把任务边界写进 task.md，再决定是否需要真实样例。",
    recoveredTags: ["decision"]
  },
  {
    id: "raw-2",
    sequence: 2,
    time: "19:12",
    speaker: "agent",
    text: "计划里缺少证据检查，先补一个 evidence board。",
    recoveredTags: ["evidence", "open-loop"]
  },
  {
    id: "raw-3",
    sequence: 3,
    time: "20:04",
    speaker: "agent",
    text: "这个结论不能只靠聊天记录，要绑定到测试输出。",
    recoveredTags: ["evidence"]
  },
  {
    id: "raw-4",
    sequence: 4,
    time: "21:31",
    speaker: "system",
    text: "runtime 状态和 handoff 有冲突，需要标成 drift warning。",
    recoveredTags: ["failure", "open-loop"]
  },
  {
    id: "raw-5",
    sequence: 5,
    time: "23:58",
    speaker: "agent",
    text: "恢复信号已经足够驱动演示，但部分产物仍缺少直接证据。",
    recoveredTags: ["finding", "open-loop"]
  },
  {
    id: "raw-6",
    sequence: 6,
    time: "00:05",
    speaker: "agent",
    text: "下一轮 agent 应该从 restart packet 开始，而不是重读整段聊天。",
    recoveredTags: ["handoff"]
  }
];
