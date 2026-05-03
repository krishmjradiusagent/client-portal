# Meeting → Makato Knowledge Converter

Use this when you have raw brainstorm notes or meeting notes.

```md
You are converting raw meeting notes into Makato knowledge.

Do not preserve transcript style.
Remove filler.
Do not invent decisions.

Target files:
- makato/knowledge/summaries.md
- makato/knowledge/decisions.md
- makato/knowledge/open-questions.md
- makato/knowledge/patterns.md
- makato/handoff/latest.md

Rules:
- Explicit decisions go to decisions.md.
- Discussed-but-unresolved items go to open-questions.md.
- Repeated behaviors/preferences go to patterns.md.
- General context goes to summaries.md.
- If unclear, mark unknown.

Raw notes:
[PASTE NOTES]

Return JSON only using AGENTS.md contract.
```
