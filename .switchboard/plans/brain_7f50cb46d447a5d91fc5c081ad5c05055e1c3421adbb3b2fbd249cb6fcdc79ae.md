# Implementation Plan - Refining Client Portal Sidebar and Navigation

Elevate the client portal's sidebar and navigation to premium, Airbnb-standard visual and interaction quality. This includes implementing tactile motion feedback, semantic design tokens, and route-based transitions.

## User Review Required

> [!IMPORTANT]
> This plan involves migrating the main content area (ResultsPanel, SearchHeader) to semantic design tokens. This will improve dark mode support but might slightly shift visual appearance if existing 'slate' colors don't perfectly map to current shadcn tokens.

## Proposed Changes

---

### Sidebar Refinement

#### [MODIFY] [app-sidebar.tsx](file:///Users/radius/Downloads/Client%20portal/src/components/app-sidebar.tsx)
- Apply consistent `whileHover` and `whileTap` interactions to all `SidebarMenuButton` and `SidebarMenuSubButton` elements.
- Use the standard `transition` constant `[0.32, 0.72, 0, 1]` for all motion.
- Ensure the `Saved Searches` sub-labels have refined hover states.

---

### Main Content Area Standardization

#### [MODIFY] [ClientPortal.tsx](file:///Users/radius/Downloads/Client%20portal/src/components/ClientPortal.tsx)
- Replace all hardcoded `slate` and `white` colors with semantic tokens:
  - `bg-white` -> `bg-background`
  - `border-slate-200` -> `border-border`
  - `text-slate-900` -> `text-foreground`
  - `text-slate-500` -> `text-muted-foreground`
- Wrap route content in `AnimatePresence` and `motion.div` for smooth entry/exit transitions.

#### [MODIFY] [SearchHeader.tsx](file:///Users/radius/Downloads/Client%20portal/src/components/SearchHeader.tsx)
- Standardize colors and borders using semantic tokens.
- Refine input focus states and button tactile feedback.

#### [MODIFY] [ResultsPanel.tsx](file:///Users/radius/Downloads/Client%20portal/src/components/ResultsPanel.tsx)
- Standardize colors and borders.
- Improve empty state visualization with a more premium, centered layout.

---

### Navigation & Transitions

#### [MODIFY] [app-shell.tsx](file:///Users/radius/Downloads/Client%20portal/src/components/app-shell.tsx)
- Ensure `SidebarInset` has consistent background transitions.

## Verification Plan

### Automated Tests
- N/A (Visual/Interaction focus)

### Manual Verification
- Verify tactile feedback (scale down on press, spring up on release) on all sidebar buttons.
- Check dark mode toggle consistency (Sidebar vs Content).
- Validate smooth route transitions when clicking different navigation items.
