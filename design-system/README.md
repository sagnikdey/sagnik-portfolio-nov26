# Sagnik Portfolio

The design system for sagnikdey.com: an editorial, Swiss-futurist look built from square cards, black hairlines, a grey dotted grid and one electric-blue accent. It is written for AI agents to follow when building the site in **Next.js (App Router) + Tailwind CSS v4**, so every page comes out consistent without new design decisions.

Read this file first, then `rules-for-ai.md` (the non-negotiable rules), then `patterns.md` (the exact building blocks), then `nextjs-tailwind.md` (setup).

## Voice and content

- **First person, plain and confident.** "I help teams turn complex products into coherent ones." Not "Passionate designer who…".
- **Lead with the outcome or the idea, then the detail.** Headlines state a point of view; body text explains it in one or two sentences.
- **Systems thinking is the frame; design systems are one part of it.** The approach is always shown as five steps: Understand → Structure → Design → Systematize → Scale.
- **Numbers only when they can be sourced.** Placeholders look like `[X%]` and must be replaced or removed before publishing. Never invent a metric.
- **Mono labels are short, uppercase and factual:** `PRINCIPAL PRODUCT DESIGNER · SYSTEMS THINKING`, `01 · SYSTEM · 2026`, `→ insight`.
- **No numbered eyebrow labels above section headings** (no "01 — WHY"). Numbers appear only inside cards and lists.
- Use real quotes word for word; shorten with an ellipsis only, never paraphrase inside quote marks.

## Visual foundations

- **Ground:** every page sits on `ground` (#e4e5e7) with a 1px `dot` grid at a 22px pitch. Never a white page.
- **Type:** Space Grotesk for everything readable; JetBrains Mono only for labels, captions, numbers in lists, code and nav in the header strip. Two families, no third (no serif).
- **Headings are always full width.** A section heading sits on its own row above its content, never in a side column beside it.
- **Square corners everywhere** (`radius-none`). Borders do the work shadows would: cards are `surface` with a 1px `ink` border.
- **One accent per view group.** In any set of cards, exactly one may be filled with `accent`. In a headline, only the final two or three words take `accent`.
- **Ink panels** (`ink` fill, white text, `inverse-accent` labels) are used for emphasis blocks: the Rules for AI panel, the lead testimonial, pull quotes. At most one per screen height.
- **Images are real product screenshots**, never mockups or device frames, shown as collages on a `plate` with an 18px `dot-strong` grid: rear images rotated ±3–4° with `shadow-back`, one front image upright with `shadow-front`, images may bleed off the plate edge.
- **Motion is quiet:** only the collage hover (front lifts 10px, rear images fan out ~3°) over 500ms with `cubic-bezier(.2,.8,.2,1)`, disabled under `prefers-reduced-motion`.

## Iconography

No icon set. Direction is shown with text arrows in the running font: `→` for internal links and steps, `↗` for external links, `←` for back. The only graphic is the logo mark (a rounded square frame with an "S"), rendered in `currentColor` so it takes `ink`.

## Layout

- Container `max-width: 1360px`, centred, 32px side gutter.
- Grids use `repeat(auto-fit, minmax(min(100%, N), 1fr))` with a 16px gap, so they collapse to one column on phones without breakpoints.
- Section rhythm: 64px between homepage sections, 96px between case-study sections.
- Headlines scale with `clamp(48px, 8vw, 112px)`; never set fixed pixel widths or heights on text containers.

## Page inventory

Homepage: header → hero (title line, headline, lead, buttons) → proof bar → How I work (5 approach cards) → Selected work (1 flagship card full width + 2 half-width cards) → What people say (3 quote cards) → contact strip.

Case study: header with back link → intro (tags, headline, lead + spec panel) → at-a-glance proof bar → cover collage → full-width sections → outcomes & learnings → next case study strip.
