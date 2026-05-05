# Codex prompt: link exact shadcn dark sidebar

Replace current sidebar with the provided files.

## Files to copy
- `components/app-sidebar.tsx` → `src/components/app-sidebar.tsx` or `components/app-sidebar.tsx`
- `components/app-shell.tsx` → same components folder
- `app/layout-example.tsx` → use as layout reference only
- `shadcn-sidebar-theme.css` → paste into globals.css only if sidebar variables are missing

## Install exact shadcn dependencies
Run:

```bash
npx shadcn@latest add sidebar dropdown-menu avatar collapsible
```

Ensure Lucide exists:

```bash
npm i lucide-react
```

## Hard rules
- Use exact shadcn `Sidebar` primitives.
- Keep `variant="floating"`.
- Keep `collapsible="icon"`.
- Keep `SidebarRail`.
- Keep `SidebarInset` around page content.
- Keep dark root wrapper: `<div className="dark min-h-screen bg-background text-foreground">`.
- Do not create custom sidebar CSS.
- Do not hardcode colors.
- Do not redesign spacing.
- Do not increase typography.
- Do not modify page content.

## Acceptance checks
- Sidebar appears dark.
- Sidebar has rounded floating panel.
- Header/footer match shadcn pattern.
- Collapsed icon mode works.
- Mobile sheet works.
- Active route uses `isActive`.
- No custom `SidebarItem` component exists.
- No old sidebar remains mounted.
