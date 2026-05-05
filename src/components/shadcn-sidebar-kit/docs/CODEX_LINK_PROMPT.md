# Codex Prompt — Link Exact shadcn Sidebar

```txt
TASK
Integrate provided sidebar kit into current app.

SOURCE FILES
- components/app-sidebar.tsx
- components/app-shell.tsx
- app/layout-example.tsx

SOURCE OF TRUTH
Use official shadcn/ui Sidebar component API.
Do not build a custom sidebar.
Do not redesign anything.

INSTALL REQUIRED SHADCN COMPONENTS
Run only missing installs:
npx shadcn@latest add sidebar avatar dropdown-menu collapsible separator

HARD RULES
- Keep all styling from shadcn tokens.
- Do not hardcode colors.
- Do not hardcode spacing outside Tailwind utility classes already used.
- Do not modify Radius page content.
- Do not change card/table/form components.
- Replace only sidebar shell and app layout wrapper.
- Use current routing library correctly.
- If project uses Next Link, replace <a> with <Link>.
- If project uses React Router, replace <a> with <NavLink>.
- Preserve existing nav labels and URLs where available.
- Preserve existing icons where available.
- Delete old custom sidebar only after new sidebar works.

IMPLEMENTATION STEPS
1. Add shadcn sidebar dependencies.
2. Copy app-sidebar.tsx into components/app-sidebar.tsx.
3. Copy app-shell.tsx into components/app-shell.tsx.
4. Wrap existing root layout with <AppShell>{children}</AppShell>.
5. Move current sidebar nav data into app-sidebar.tsx.
6. Replace <a> tags with project router links.
7. Ensure active route maps to SidebarMenuButton isActive.
8. Confirm SidebarProvider, SidebarInset, SidebarTrigger, SidebarRail exist.
9. Remove old sidebar imports.
10. Run typecheck/build.

ACCEPTANCE CRITERIA
- App uses shadcn Sidebar primitives.
- Collapsed icon mode works.
- Mobile sheet mode works.
- Sidebar rail works.
- Cmd/Ctrl+B shortcut works.
- Existing pages remain visually unchanged.
- No custom sidebar CSS remains.
- No hallucinated components exist.

OUTPUT
Return changed files list and verification result only.
```
