# Patterns

The only building blocks. Each one maps to one React component. Class lists are exact: copy them, change content only.

## Section

Every section: full-width heading on its own row, content below.

```tsx
<section aria-labelledby="work-h" className="container-page py-16">
  <h2 id="work-h" className="mb-8 text-section font-bold">Selected work</h2>
  {/* content */}
</section>
```

Optional right-aligned mono note on the heading row: wrap in `flex flex-wrap items-end justify-between gap-4 mb-8` and add `<span className="font-mono text-label">One system → the products built on it</span>`.

## Site header

Logo left, nav right, ink rule below. Mono 13px for the strip, sans 15px for nav links.

```tsx
<header className="container-page flex flex-wrap items-center justify-between gap-4 border-b border-ink py-6">
  <Link href="/" aria-label="Sagnik Dey — home" className="text-ink"><Logo className="h-8 w-auto" /></Link>
  <nav aria-label="Primary" className="flex flex-wrap items-center gap-6 text-small">
    <Link href="/work">Work</Link><Link href="/#approach">Approach</Link><Link href="/systems">Systems</Link>
    <a href="/resume.pdf">Resume ↗</a><a href="https://www.linkedin.com/in/deysagnik/">LinkedIn ↗</a>
    <a href="mailto:sagnikd@gmail.com" className="bg-ink px-4 py-3 font-medium text-on-accent">Work with me</a>
  </nav>
</header>
```

## Hero

Title line (mono) → `h1` (accent on the last words) → lead + buttons in a two-column wrap → proof bar.

```tsx
<p className="mb-6 font-mono text-label uppercase">Principal Product Designer · Systems thinking</p>
<h1 className="max-w-[1100px] text-display font-bold">I help teams turn complex products into <span className="text-accent">coherent ones.</span></h1>
<div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-end gap-8">
  <p className="max-w-[560px] text-lead">…</p>
  <div className="flex flex-wrap justify-end gap-3"><ButtonPrimary/><ButtonSecondary/></div>
</div>
```

## Buttons

Exactly two kinds. One primary per view.

- **Primary:** `bg-accent px-6 py-4 font-medium text-on-accent` — "Get in touch →"
- **Secondary:** `border border-ink px-6 py-4 font-medium text-ink` — "Selected work"
- **Header CTA** (nav only): `bg-ink px-4 py-3 font-medium text-on-accent`
- **Text link:** plain `font-medium` with `→` or `↗`; hover `hover:text-accent`.

## Proof bar

3–4 sourced numbers between two ink rules.

```tsx
<dl className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] border-y border-ink">
  <div className="flex flex-col-reverse gap-1.5 py-5 pr-4"><dt className="font-mono text-caption text-ink-muted">Enterprise SaaS design</dt><dd className="text-stat font-bold">16+ yrs</dd></div>
</dl>
```

## Step cards (How I work, principles)

Five equal cards; exactly one (Systematize) is the accent card.

```tsx
<ol className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
  <li className="flex min-h-[280px] flex-col gap-3.5 border border-ink bg-surface p-6">
    <span className="font-mono text-label">01</span>
    <h3 className="text-title font-bold">Understand</h3>
    <p className="text-small text-ink-muted">Research the people, the business and the constraints</p>
    <span className="mt-auto border-t border-border-subtle pt-3.5 font-mono text-caption">→ insight</span>
  </li>
  {/* accent card: border-accent bg-accent text-on-accent; muted → text-on-accent-muted; rule → border-on-accent-rule */}
</ol>
```

## Work card + collage

Flagship card spans the full row with the plate on the left (2/3) and text on the right; other cards split the row 50/50 with the plate on top.

```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-4">
  <article className="group col-span-full flex flex-wrap overflow-hidden border border-ink bg-surface">
    <Collage className="h-[460px] flex-[2_1_560px]" images={…} />
    <div className="flex flex-[1_1_300px] flex-col gap-3.5 p-7">
      <p className="flex items-center gap-2.5 font-mono text-label"><span>01</span><Tag variant="fill">System</Tag><span>2026</span></p>
      <h3 className="text-title-l font-bold">SagUI</h3>
      <p className="text-body text-ink-body">…</p>
      <div className="mt-auto flex flex-wrap gap-5 border-t border-border-subtle pt-3.5 font-medium"><Link href="/work/sagui">Case study →</Link><a href="…">Live docs ↗</a></div>
    </div>
  </article>
</div>
```

**Collage:** a `relative overflow-hidden bg-plate-dots` box. 2–3 `next/image` screenshots, `absolute`, each `border border-ink`:
- rear: `rotate-[-4deg] shadow-back` / `rotate-3 shadow-back`
- front: no rotation, `shadow-front`, may bleed past the edge
- hover (on the card's `group`): `motion-safe:transition-transform motion-safe:duration-500 ease-collage`, front `group-hover:-translate-y-2.5 group-hover:scale-[1.02]`, rear fans out a further 3°.
- optional caption chip bottom-left: `bg-ink px-2.5 py-1.5 font-mono text-[11px] text-on-accent` (the only arbitrary size allowed).

**Tags:** `fill` = `bg-accent text-on-accent px-2 py-0.5`; `outline` = `border border-ink px-2 py-0.5`; `accent-outline` = `border border-accent text-accent px-2 py-0.5`. Labels: System · Platform · Built on SagUI.

## Quote cards

Three across; the first is the ink lead quote. Real quotes only; the slot for a missing one is a dashed card.

```tsx
<figure className="flex flex-col gap-6 bg-ink p-7 text-inverse-text">
  <span aria-hidden className="text-[64px] leading-[0.6] text-inverse-accent">“</span>
  <blockquote className="text-[22px] leading-snug">…</blockquote>
  <figcaption className="mt-auto font-mono text-caption text-inverse-muted">EDDY RUZ<br/>Sr. Principal Lead, Bazaarvoice</figcaption>
</figure>
```
Light variant: `border border-ink bg-surface`, quote mark `text-accent`, caption `text-ink-muted`.

## Spec panel

Key–value facts (Role, Stack, Links) as a definition list.

```tsx
<dl className="border border-ink bg-surface-raised text-small">
  <div className="grid grid-cols-[110px_1fr] border-b border-border-subtle"><dt className="px-4 py-3 font-mono text-caption text-ink-muted">ROLE</dt><dd className="px-4 py-3">…</dd></div>
</dl>
```

## Ink panel

One emphasis block per screen height: Rules for AI, pull quotes. Heading full width inside, rows below with `border-inverse-rule`, labels `font-mono text-caption text-inverse-accent`.

## Ledger list

Rows between hairlines for steps or facts: `border-t border-ink` on the list, `border-b border-dot py-4 grid grid-cols-[48px_1fr] gap-3` per row, number in mono.

## Console block

For showing an agent or terminal: `bg-console text-console-text p-6 font-mono text-small`, prompt line `bg-console-line p-3`, success line `text-console-success`.

## Contact strip

Full-width accent block closing every page.

```tsx
<div className="flex flex-wrap items-center justify-between gap-6 bg-accent p-10 text-on-accent">
  <p className="max-w-[760px] text-title-l font-bold">Got a complex product that needs to hold together?</p>
  <a href="mailto:sagnikd@gmail.com" className="bg-surface px-6 py-4 font-medium text-ink">sagnikd@gmail.com →</a>
</div>
```
