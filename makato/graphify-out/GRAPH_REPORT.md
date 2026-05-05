# Graph Report - /Users/radius/Downloads/Client portal/makato  (2026-05-04)

## Corpus Check
- Corpus is ~3,507 words - fits in a single context window. You may not need a graph.

## Summary
- 26 nodes · 30 edges · 5 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Radius sidebar revamp|Radius sidebar revamp]]
- [[_COMMUNITY_Radius Agent|Radius Agent]]
- [[_COMMUNITY_Master JSON prompt|Master JSON prompt]]
- [[_COMMUNITY_Kata task|Kata task]]
- [[_COMMUNITY_RealScout portal and match logic|RealScout portal and match logic]]

## God Nodes (most connected - your core abstractions)
1. `Radius sidebar revamp` - 8 edges
2. `Kata task` - 5 edges
3. `Radius Agent` - 4 edges
4. `Radius patterns` - 4 edges
5. `Master JSON prompt` - 4 edges
6. `Quiet premium` - 3 edges
7. `shadcn/ui` - 3 edges
8. `RealScout portal and match logic` - 3 edges
9. `RealScout client portal reverse engineering` - 3 edges
10. `Role matrix` - 2 edges

## Surprising Connections (you probably didn't know these)
- `shadcn/ui` --implementation_target--> `Radius sidebar revamp`  [EXTRACTED]
  truth/shadcn.md → kata/task.md
- `Role matrix` --scopes_permissions--> `Radius sidebar revamp`  [EXTRACTED]
  truth/roles.md → kata/task.md
- `Radius patterns` --guides_layout--> `Radius sidebar revamp`  [EXTRACTED]
  truth/radius-patterns.md → kata/task.md
- `Figma truth` --visual_constraints--> `Radius sidebar revamp`  [EXTRACTED]
  truth/figma.md → kata/task.md
- `MA prune` --scopes_context--> `Radius sidebar revamp`  [EXTRACTED]
  ma/prune.md → kata/task.md

## Communities

### Community 0 - "Radius sidebar revamp"
Cohesion: 0.33
Nodes (7): Figma truth, Handoff latest, Kaizen lessons, Kaizen rules, MA prune, Role matrix, Radius sidebar revamp

### Community 1 - "Radius Agent"
Cohesion: 0.6
Nodes (5): Project patterns, Quiet premium, Radius Agent, Radius patterns, shadcn/ui

### Community 2 - "Master JSON prompt"
Cohesion: 0.4
Nodes (5): ChatGPT tool prompt, Claude tool prompt, Codex tool prompt, Master JSON prompt, Meeting converter prompt

### Community 3 - "Kata task"
Cohesion: 0.4
Nodes (5): Kata audit, Kata build, Kata handoff, Kata plan, Kata task

### Community 4 - "RealScout portal and match logic"
Cohesion: 0.83
Nodes (4): Map pin sync, RealScout portal and match logic, RealScout client portal reverse engineering, RealScout UX map browser

## Knowledge Gaps
- **11 isolated node(s):** `Figma truth`, `Project patterns`, `MA prune`, `Meeting converter prompt`, `ChatGPT tool prompt` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Radius sidebar revamp` connect `Radius sidebar revamp` to `Radius Agent`, `Kata task`?**
  _High betweenness centrality (0.316) - this node is a cross-community bridge._
- **Why does `Kata task` connect `Kata task` to `Radius sidebar revamp`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **Why does `Radius patterns` connect `Radius Agent` to `Radius sidebar revamp`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **What connects `Figma truth`, `Project patterns`, `MA prune` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._