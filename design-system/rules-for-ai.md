# Rules for AI agents

These rules are always on. Any agent generating pages, components or content for sagnikdey.com must follow them exactly. When something isn't covered, **ask rather than improvise.**

## 1. Build only from the patterns

- Every section is assembled from a pattern in `patterns.md`. Do not invent a new card, button, tag, panel or layout. If nothing fits, compose existing patterns and say which you combined.
- Every section heading is a full-width `<h2>` on its own row. Never put a heading in a side column next to content.
- No numbered eyebrow labels above headings ("01 — WHY", "02 — PRINCIPLES"). Numbers live inside cards and lists only.
- One `<h1>` per page.

## 2. Color

- Use only the token utilities (`bg-ground`, `bg-surface`, `text-ink`, `text-ink-muted`, `border-ink`, `bg-accent`, `text-on-accent`, …). Never write hex, rgb or arbitrary values like `bg-[#3d3dff]` or `text-[#45484d]`.
- **One accent per group:** at most one filled accent card per card set, one primary (accent) button per view, and accent only on the last two or three words of a headline.
- `inverse-accent` (#9c9cff) is for ink panels only. Never on ground or surface.
- The page background is always `bg-ground` with the dot grid (`.bg-dots`). Never white.

## 3. Type

- Space Grotesk (`font-sans`) for all readable text; JetBrains Mono (`font-mono`) for labels, captions, list numbers, code and nav arrows only. No third font. No serif.
- Use the type utilities only: `text-display`, `text-section`, `text-title-l`, `text-title`, `text-stat`, `text-lead`, `text-body`, `text-small`, `text-label`, `text-caption`. No arbitrary sizes (`text-[44px]`).
- Mono labels are uppercase and under ~6 words.

## 4. Shape, space, depth

- Square corners only. Never use `rounded-*` (except `rounded-none`).
- Cards: `bg-surface border border-ink`. Hairlines between rows: `border-dot`. Dividers inside a card: `border-border-subtle`.
- Shadows only on collage screenshots (`shadow-back`, `shadow-front`). No shadows on cards, buttons or panels.
- Spacing from the Tailwind scale (4px base) only; no arbitrary `p-[13px]`. Card gap 16px (`gap-4`), card padding 24px (`p-6`), side gutter 32px (`px-8`).
- Container: `mx-auto max-w-[1360px] px-8` via the `.container-page` utility.

## 5. Images

- Real product screenshots only. No stock photos, illustrations, mockups, device frames or AI-generated images.
- Product images always appear in the **collage** pattern on a plate. Every `<img>` has a descriptive `alt` and uses `next/image`.

## 6. Content

- Never invent metrics, client names, quotes or titles. Use `[PLACEHOLDER]` brackets and flag them.
- Quotes are verbatim; shorten only with an ellipsis.
- The approach is always the five steps in this order: Understand, Structure, Design, Systematize, Scale. "Systematize" is the highlighted step.
- Title: "Principal Product Designer". Tenure: "16+ years". Use these exact strings everywhere.

## 7. Links and navigation

- Nav order: Work · Approach · Systems · Resume ↗ · LinkedIn ↗ · **Work with me** (ink button, last).
- Internal links end with `→`; external links end with `↗` and open in the same tab unless they are a PDF.
- Use `<Link>` for internal routes, `<a>` for external. Never `onClick` on a div.

## 8. Accessibility (non-negotiable)

- Text contrast ≥ 4.5:1 (the tokens are already tuned; don't put `ink-muted` on `plate` or `accent` on `ink`).
- Visible focus: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` on every interactive element.
- Icon-only controls (the logo link) need `aria-label`.
- Respect `prefers-reduced-motion`: the collage hover uses `motion-safe:` only.
- Sections use `<section aria-labelledby>` pointing at their `<h2>`.

## 9. Before you finish

Check: no hex or arbitrary values, no `rounded-*`, no shadow outside a collage, one accent per group, every heading full width, every image has alt text, no invented numbers.
