// Full-Surface Growth self-assessment - the question bank.

import type {
  DiagnosticQuestion,
  PillarId,
  PillarMeta,
  QuestionOption,
} from "./types";

export const PILLARS: PillarMeta[] = [
  {
    id: "demand",
    name: "Demand",
    weight: 0.16,
    blurb: "Creating future buyers, not just harvesting today's.",
    term: "Everything that makes future buyers aware of you before they have a need.",
  },
  {
    id: "acquisition",
    name: "Acquisition",
    weight: 0.15,
    blurb: "Turning attention into qualified conversations.",
    term: "Turning attention into qualified sales conversations.",
  },
  {
    id: "activation",
    name: "Activation",
    weight: 0.12,
    blurb: "Getting new customers to first value fast.",
    term: "Getting a new customer to their first real result quickly.",
  },
  {
    id: "conversion",
    name: "Conversion",
    weight: 0.15,
    blurb: "Turning qualified interest into revenue.",
    term: "Turning qualified interest into paying customers.",
  },
  {
    id: "retention",
    name: "Retention",
    weight: 0.18,
    blurb: "Keeping the customers you already won.",
    term: "Keeping the customers and revenue you have already won.",
  },
  {
    id: "expansion",
    name: "Expansion",
    weight: 0.14,
    blurb: "Growing the accounts you keep.",
    term: "Growing revenue from customers you already have.",
  },
  {
    id: "referral",
    name: "Referral",
    weight: 0.10,
    blurb: "Turning happy customers into a channel.",
    term: "Turning happy customers into a source of new ones.",
  },
];
// weights sum to 1.00

// Best -> worst, 100/67/33/0. Used by every pillar's ownership question.
const OWNER_OPTIONS: QuestionOption[] = [
  { label: "One named person owns it end to end", score: 100 },
  { label: "A couple of people share it", score: 67 },
  { label: "It sits loosely inside someone's wider role", score: 33 },
  { label: "No one really owns it", score: 0 },
];

const OWNS_IT_TERM = {
  t: "Owns it end to end",
  d: "One person is accountable for the whole result of this pillar, not just a task inside it. Growth that is everyone's job tends to become no one's.",
};

function ownerQuestion(pillar: PillarMeta): DiagnosticQuestion {
  return {
    id: `${pillar.id}-owner`,
    pillar: pillar.id,
    kind: "owner",
    prompt: `Who owns ${pillar.name} end to end?`,
    options: OWNER_OPTIONS,
    terms: [{ t: pillar.name, d: pillar.term }, OWNS_IT_TERM],
  };
}

// Two questions per pillar: a health question (how well is this run today)
// and an ownership question (who is accountable for it). Health questions
// carry a `terms` glossary for the jargon in their own prompt/options; the
// pillar score is computed from the health question alone (see scoring.ts).
export const PILLAR_QUESTIONS: DiagnosticQuestion[] = [
  // Demand
  {
    id: "demand-1",
    pillar: "demand",
    kind: "health",
    prompt: "How much of your growth activity creates future demand vs. chasing buyers who are already in-market?",
    options: [
      { label: "A deliberate mix: we invest in being remembered later, not just captured now", score: 100 },
      { label: "Mostly lead-gen, with some brand/education work", score: 67 },
      { label: "Almost entirely lead-gen / bottom-of-funnel", score: 33 },
      { label: "We don't really distinguish the two", score: 0 },
    ],
    terms: [
      { t: "Future demand", d: "Interest you build now in people who are not ready to buy yet, so they think of you when they are." },
      { t: "In-market", d: "Buyers who are actively shopping for what you sell right now." },
      { t: "Lead generation", d: "Activity aimed at capturing buyers who are ready now: forms, ads, outbound." },
    ],
  },
  ownerQuestion(PILLARS[0]),
  // Acquisition
  {
    id: "acquisition-1",
    pillar: "acquisition",
    kind: "health",
    prompt: "How predictable is the top of your funnel month to month?",
    options: [
      { label: "Predictable: we can forecast qualified conversations within a reasonable range", score: 100 },
      { label: "Somewhat: good months and bad months, roughly averaging out", score: 67 },
      { label: "Lumpy and hard to predict", score: 33 },
      { label: "Mostly referral or luck; we can't turn it up or down", score: 0 },
    ],
    terms: [
      { t: "Top of the funnel", d: "The first stage of your pipeline, where new leads and conversations come in." },
      { t: "Qualified conversation", d: "A talk with someone who fits your buyer and has a real need, not just any lead." },
    ],
  },
  ownerQuestion(PILLARS[1]),
  // Activation
  {
    id: "activation-1",
    pillar: "activation",
    kind: "health",
    prompt: "How reliably do new customers reach their first real result with you?",
    options: [
      { label: "There's a defined first-value moment and most customers hit it quickly", score: 100 },
      { label: "Most get there eventually, timing varies a lot", score: 67 },
      { label: "Many stall early and we chase them manually", score: 33 },
      { label: "We don't track a first-value moment", score: 0 },
    ],
    terms: [
      { t: "Activation", d: "The point a new customer first gets the result they signed up for." },
      { t: "First-value moment", d: "The specific moment value lands for them, the early sign they are set up to stay." },
    ],
  },
  ownerQuestion(PILLARS[2]),
  // Conversion
  {
    id: "conversion-1",
    pillar: "conversion",
    kind: "health",
    prompt: "Do you know where qualified opportunities most often stall or drop?",
    options: [
      { label: "Yes, we have named stages and see the leak points", score: 100 },
      { label: "Broadly, from memory", score: 67 },
      { label: "We know the win rate but not where losses happen", score: 33 },
      { label: "No visibility into the middle", score: 0 },
    ],
    terms: [
      { t: "Qualified opportunity", d: "A deal worth pursuing: right fit, real need, budget within reach." },
      { t: "Win rate", d: "The share of qualified deals that end up closing." },
      { t: "Stall or drop", d: "Where deals go quiet or fall out before they close." },
    ],
  },
  ownerQuestion(PILLARS[3]),
  // Retention
  {
    id: "retention-1",
    pillar: "retention",
    kind: "health",
    prompt: "How early do you see a customer heading for the exit?",
    options: [
      { label: "Early: we track leading signals and intervene before renewal", score: 100 },
      { label: "We usually sense it a month or two out", score: 67 },
      { label: "Often only at renewal", score: 33 },
      { label: "We find out when they leave", score: 0 },
    ],
    terms: [
      { t: "Retention", d: "Keeping existing customers rather than losing them." },
      { t: "Renewal", d: "The point a customer decides whether to continue, and pay again." },
      { t: "Leading signal", d: "An early warning that a customer is drifting, visible before they actually leave." },
    ],
  },
  ownerQuestion(PILLARS[4]),
  // Expansion
  {
    id: "expansion-1",
    pillar: "expansion",
    kind: "health",
    prompt: "Is there a repeatable way accounts grow after the first sale?",
    options: [
      { label: "Yes, a known second step we actively drive", score: 100 },
      { label: "It happens, but reactively", score: 67 },
      { label: "Occasionally, by accident", score: 33 },
      { label: "Rarely; the first sale is usually the last", score: 0 },
    ],
    terms: [
      { t: "Expansion", d: "Existing customers buying more: upgrades, more seats, a second product." },
      { t: "Account", d: "An existing customer organization." },
    ],
  },
  ownerQuestion(PILLARS[5]),
  // Referral
  {
    id: "referral-1",
    pillar: "referral",
    kind: "health",
    prompt: "Do happy customers reliably send you new ones?",
    options: [
      { label: "Yes, referral is a deliberate, measured channel", score: 100 },
      { label: "We get them, but don't ask systematically", score: 67 },
      { label: "Rarely, and never on purpose", score: 33 },
      { label: "No", score: 0 },
    ],
    terms: [
      { t: "Referral", d: "A new customer introduced to you by an existing happy one." },
      { t: "Channel", d: "A repeatable, deliberate source of new customers, versus one-off luck." },
    ],
  },
  ownerQuestion(PILLARS[6]),
];

export const ALL_QUESTIONS: DiagnosticQuestion[] = [...PILLAR_QUESTIONS];

export const QUESTION_COUNT = ALL_QUESTIONS.length;

export function getQuestion(id: string): DiagnosticQuestion | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

export function pillarMeta(id: PillarId): PillarMeta {
  const m = PILLARS.find((p) => p.id === id);
  if (!m) throw new Error(`[growth-self-assessment] unknown pillar ${id}`);
  return m;
}
