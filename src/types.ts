// Full-Surface Growth self-assessment — shared types.

export type PillarId =
  | "demand"
  | "acquisition"
  | "activation"
  | "conversion"
  | "retention"
  | "expansion"
  | "referral";

export interface PillarMeta {
  id: PillarId;
  name: string;
  weight: number;
  blurb: string;
  term: string;
}

export interface QuestionOption {
  label: string;
  score: number; // 0..100 — higher is healthier
}

export interface QuestionTerm {
  t: string;
  d: string;
}

export interface DiagnosticQuestion {
  id: string;
  pillar: PillarId | "context";
  kind?: "health" | "owner";
  prompt: string;
  help?: string;
  options: QuestionOption[];
  terms?: QuestionTerm[];
}

export type AnswerMap = Record<string, number>;

export interface PillarScore {
  pillar: PillarId;
  name: string;
  weight: number;
  score: number;
  ownership: number;
}

export interface SelfAssessmentResult {
  overallScore: number; // 0..100
  pillarScores: PillarScore[];
  weakest: PillarScore;
}
