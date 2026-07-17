import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "./questions";
import { isComplete, scoreAssessment } from "./scoring";
import type { AnswerMap } from "./types";

function answersByScore(pick: "best" | "worst"): AnswerMap {
  const answers: AnswerMap = {};
  for (const q of ALL_QUESTIONS) {
    let idx = 0;
    let extreme = q.options[0].score;
    q.options.forEach((opt, i) => {
      const better = pick === "best" ? opt.score > extreme : opt.score < extreme;
      if (better) {
        extreme = opt.score;
        idx = i;
      }
    });
    answers[q.id] = idx;
  }
  return answers;
}

describe("isComplete", () => {
  it("is false for an empty answer map", () => {
    expect(isComplete({})).toBe(false);
  });

  it("is true when every question is answered", () => {
    expect(isComplete(answersByScore("best"))).toBe(true);
  });
});

describe("scoreAssessment", () => {
  it("scores 100 overall when every answer is the healthiest option", () => {
    const result = scoreAssessment(answersByScore("best"));
    expect(result.overallScore).toBe(100);
    expect(result.weakest.score).toBe(100);
  });

  it("scores 0 overall when every answer is the weakest option", () => {
    const result = scoreAssessment(answersByScore("worst"));
    expect(result.overallScore).toBe(0);
  });

  it("returns one score per pillar (seven pillars)", () => {
    const result = scoreAssessment(answersByScore("best"));
    expect(result.pillarScores).toHaveLength(7);
    const ids = result.pillarScores.map((p) => p.pillar);
    expect(new Set(ids).size).toBe(7);
  });

  it("identifies the weakest pillar when one lags", () => {
    const answers = answersByScore("best");
    // Drag retention's health question to the weakest option.
    const retentionHealth = ALL_QUESTIONS.find((q) => q.id === "retention-1");
    expect(retentionHealth).toBeDefined();
    let worstIdx = 0;
    let worstScore = retentionHealth!.options[0].score;
    retentionHealth!.options.forEach((opt, i) => {
      if (opt.score < worstScore) {
        worstScore = opt.score;
        worstIdx = i;
      }
    });
    answers["retention-1"] = worstIdx;

    const result = scoreAssessment(answers);
    expect(result.weakest.pillar).toBe("retention");
  });
});
