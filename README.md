# Growth Self-Assessment

**Open-source self-assessment across the seven pillars of a full growth system** — demand, acquisition, activation, conversion, retention, expansion, referral. Fourteen questions produce a 0–100 score per pillar, an overall score, and your weakest link. For founders and growth leaders who want a fast, structured read on where their growth motion actually leaks.

▶ **Use the live tool:** [tools.langoptima.com/growth-diagnostic](https://tools.langoptima.com/growth-diagnostic)

This repo is the open **self-assessment framework** — the questions, the pillar model, and the transparent scorer. The live hosted version adds a modelled revenue-opportunity estimate and a guided report; this is the open scoring layer underneath.

## What it does

- Two questions per pillar — how well it's run today (health) and who's accountable for it (ownership) — plus a plain-language glossary for the jargon.
- A deterministic 0–100 score per pillar, an overall score, and the weakest pillar (tie-broken toward the higher-leverage one).
- No dependencies, no tracking, no server required — pure TypeScript.

## Install & use

```bash
npm install
npm run typecheck && npm test
```

```ts
import { ALL_QUESTIONS, scoreAssessment, isComplete } from "@langoptima/growth-self-assessment";

// answers: { [questionId]: chosenOptionIndex }
const result = scoreAssessment(answers);
// → { overallScore, pillarScores, weakest }
```

Framework-agnostic TypeScript, zero runtime dependencies.

## Built by LangOptima

LangOptima builds AI-ready data and knowledge-graph systems for enterprises, and runs the full-surface growth model behind this assessment. This is one of our open-source [free tools](https://tools.langoptima.com) — [langoptima.com](https://www.langoptima.com).

## License

[Apache-2.0](./LICENSE). Free to use, modify, and redistribute. The **LangOptima name and marks are not licensed** — a fork may not imply endorsement (see [`NOTICE`](./NOTICE)). Contributions: [`CONTRIBUTING.md`](./CONTRIBUTING.md) · Support: [`SUPPORT.md`](./SUPPORT.md).
