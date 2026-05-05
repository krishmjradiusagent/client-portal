# Kaizen Lessons

Add lessons after errors, mismatch, or repeated corrections.

## Template

Date:
Tool:
Project:
Mistake:
Correction:
New rule:
Applies to:

Date: 2026-05-04
Tool: Codex
Project: Radius client portal
Mistake: Treated shadcn Sidebar request as HTML mimic because the current scope said HTML prototype.
Correction: Created a React/Next.js TSX build and installed the official shadcn Sidebar registry component.
New rule: When user explicitly says shadcn components, use real shadcn/React components unless they explicitly ask for static HTML.
Applies to: shadcn UI work, sidebar work, design-system overrides

Date: 2026-05-04
Tool: Codex
Project: Radius client portal
Mistake: Verified `next build` but missed that Tailwind v4 theme utilities were not generated in-browser.
Correction: Switched to Tailwind 3.4 pipeline, restored `@tailwind` directives, restarted dev server, and verified computed utility styles plus screenshot.
New rule: For UI verification, check computed styles or screenshot, not build success alone.
Applies to: React UI, Tailwind, shadcn verification

Date: 2026-05-04
Tool: Codex
Project: Radius client portal
Mistake: Trusted shadcn CLI output without checking generated Tailwind tokens for duplicate sidebar keys.
Correction: Cleaned `tailwind.config.ts` to use one set of sidebar color tokens and matched the CSS variable names from `globals.css`.
New rule: After shadcn installs, run TypeScript build and fix config collisions before shipping.
Applies to: shadcn setup, Tailwind config, Next build
