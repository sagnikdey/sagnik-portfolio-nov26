<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Sagnik Portfolio design system — read before any UI change

This site follows a strict design system. Before writing or changing any page or component:

1. Read `design-system/rules-for-ai.md` — always-on rules (no hex or arbitrary values, square corners, one accent per group, full-width section headings, no invented metrics).
2. Build only from the patterns in `design-system/patterns.md`. Each pattern already exists as a component in `components/`; reuse it instead of writing new markup.
3. Tokens live in `app/globals.css` (`@theme`). Default Tailwind colors, radii and shadows are removed on purpose — don't add them back.
4. Content (projects, quotes, proof numbers) lives in `content/site.ts`. Bracketed `[PLACEHOLDER]` values must be replaced with sourced facts or removed — never filled with invented ones.
