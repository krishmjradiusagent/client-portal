# Knowledge Summaries

Use this for compressed meeting or brainstorm summaries.

Do not paste raw transcripts.

## Template

### YYYY-MM-DD — Topic

Context:
-

Key Points:
-

Product / UX Implications:
-

Relevant Screens / Flows:
-

Related Decisions:
-

### 2026-05-04 — RealScout client portal reverse engineering

Context:
- Walked the logged-in RealScout client portal from search to listing detail, matches, interested, messages, home value, saved searches, overflow menu, and settings.

Key Points:
- Main experience is a map-plus-card listing browser with persistent agent branding.
- Listing detail is a modal with MLS facts plus embedded agent messaging and buyer-intent prompts.
- `My Matches`, `Interested`, and `Messages` each expose distinct collection or communication states.

Product / UX Implications:
- The product is agent-managed, not self-contained consumer search.
- Interest capture and message intake are first-class conversion paths.
- Settings are mostly email and alert preferences.

Relevant Screens / Flows:
- `/homesearch/map`
- `/homesearch/listings/...`
- `/homesearch/matches`
- `/homesearch/interested`
- `/homesearch/conversations`
- `/homesearch/home-reports`
- `/profile/settings?`

Related Decisions:
- unknown
