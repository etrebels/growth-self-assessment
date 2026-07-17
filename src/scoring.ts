// Full-Surface Growth self-assessment — deterministic 0..100 scoring.

import { ALL_QUESTIONS, PILLARS, PILLAR_QUESTIONS } from "./questions";
import type { AnswerMap, PillarScore, SelfAssessmentResult } from "./types";

function optionScore(questionId: string, answers: AnswerMap): number {
  const q = ALL_QUESTIONS.find((x) => x.id === questionId);
  if (!q) return 0;
  const idx = answers[questionId];
  if (idx === undefined) return 0;
  const opt = q.options[idx];
  return opt ? opt.score : 0;
}

export function isComplete(answers: AnswerMap): boolean {
  return ALL_QUESTIONS.every((q) => typeof answers[q.id] === "number");
}

export function scoreAssessment(answers: AnswerMap): SelfAssessmentResult {
  const pillarScores: PillarScore[] = PILLARS.map((p) => {
    const healthQ = PILLAR_QUESTIONS.find(
      (q) => q.pillar === p.id && q.kind === "health",
    );
    const ownerQ = PILLAR_QUESTIONS.find(
      (q) => q.pillar === p.id && q.kind === "owner",
    );
    const score = healthQ ? optionScore(healthQ.id, answers) : 0;
    const ownership = ownerQ ? optionScore(ownerQ.id, answers) : 0;
    return { pillar: p.id, name: p.name, weight: p.weight, score, ownership };
  });

  const overallScore = Math.round(
    pillarScores.reduce((s, p) => s + p.score, 0) / pillarScores.length,
  );

  // Weakest = lowest score; tie-break toward the higher-leverage pillar.
  const weakest = pillarScores.reduce((worst, p) => {
    if (p.score < worst.score) return p;
    if (p.score === worst.score && p.weight > worst.weight) return p;
    return worst;
  }, pillarScores[0]);

  return { overallScore, pillarScores, weakest };
}
