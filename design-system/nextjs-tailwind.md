# Next.js + Tailwind setup

Next.js App Router with Tailwind CSS v4 (CSS-first config). Fonts load through `next/font/google`.

## app/layout.tsx

```tsx
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-ground bg-dots font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
```

## app/globals.css

```css
@import "tailwindcss";

@theme {
  /* Fonts */
  --font-sans: var(--font-space-grotesk), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  /* Color */
  --color-ground: #e4e5e7;
  --color-dot: #b4b8be;
  --color-plate: #d4d6db;
  --color-dot-strong: #a7acb3;
  --color-surface: #f7f7f7;
  --color-surface-raised: #f4f5f6;
  --color-ink: #111214;
  --color-ink-body: #2d3034;
  --color-ink-muted: #45484d;
  --color-border-subtle: #c4c7cc;
  --color-accent: #3d3dff;
  --color-on-accent: #ffffff;
  --color-on-accent-muted: #e6e6ff;
  --color-on-accent-rule: #8f8fff;
  --color-inverse-text: #ffffff;
  --color-inverse-muted: #d6d7da;
  --color-inverse-accent: #9c9cff;
  --color-inverse-rule: #3a3d43;
  --color-console: #121a19;
  --color-console-line: #1d2726;
  --color-console-text: #e8eeed;
  --color-console-success: #7fd6c9;

  /* Type scale: text-display, text-section, … */
  --text-display: clamp(48px, 8vw, 112px);
  --text-display--line-height: 0.92;
  --text-display--letter-spacing: -0.05em;
  --text-section: clamp(40px, 5vw, 56px);
  --text-section--line-height: 0.95;
  --text-section--letter-spacing: -0.055em;
  --text-title-l: 40px;
  --text-title-l--line-height: 1.05;
  --text-title-l--letter-spacing: -0.03em;
  --text-title: 28px;
  --text-title--line-height: 1.1;
  --text-title--letter-spacing: -0.02em;
  --text-stat: 36px;
  --text-stat--line-height: 1;
  --text-stat--letter-spacing: -0.03em;
  --text-lead: 20px;
  --text-lead--line-height: 1.5;
  --text-body: 17px;
  --text-body--line-height: 1.6;
  --text-small: 15px;
  --text-small--line-height: 1.5;
  --text-label: 13px;
  --text-label--line-height: 1.4;
  --text-label--letter-spacing: 0.04em;
  --text-caption: 12px;
  --text-caption--line-height: 1.4;

  /* Shape and depth */
  --radius-*: initial;          /* removes every rounded-* except rounded-none */
  --radius-none: 0px;
  --shadow-*: initial;
  --shadow-back: 0 18px 40px rgba(17, 18, 20, 0.18);
  --shadow-front: 0 28px 60px rgba(17, 18, 20, 0.28);

  /* Motion */
  --ease-collage: cubic-bezier(0.2, 0.8, 0.2, 1);
}

@utility container-page {
  margin-inline: auto;
  max-width: 1360px;
  padding-inline: 2rem;
}

@utility bg-dots {
  background-image: radial-gradient(var(--color-dot) 1px, transparent 1.2px);
  background-size: 22px 22px;
}

@utility bg-plate-dots {
  background-color: var(--color-plate);
  background-image: radial-gradient(var(--color-dot-strong) 1px, transparent 1.2px);
  background-size: 18px 18px;
}
```

Resetting `--radius-*` and `--shadow-*` removes Tailwind's default rounded and shadow utilities, so a stray `rounded-lg` or `shadow-md` simply does nothing: the rule in `rules-for-ai.md` is enforced by the config.

## Suggested structure

```
app/
  layout.tsx, globals.css, page.tsx         ← homepage
  work/[slug]/page.tsx                      ← case studies (MDX or data files)
components/
  site-header.tsx  hero.tsx  proof-bar.tsx  approach-cards.tsx
  work-card.tsx  collage.tsx  quote-card.tsx  contact-strip.tsx
  section.tsx  spec-panel.tsx  ink-panel.tsx  console-block.tsx
content/
  projects.ts  testimonials.ts  case-studies/*.mdx
public/images/<project>/*.png
```

One component per pattern in `patterns.md`; pages only compose them.
