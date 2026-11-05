import Link from "next/link";
import Image from "next/image";
import { Tag } from "./tag";
import { SpecPanel } from "./spec-panel";
import { ProofBar } from "./proof-bar";

type TagVariant = "fill" | "outline" | "accent-outline";

/** Intro block for every case study: back link, tags, h1, lead + spec panel, proof bar. */
export function CsIntro({
  number, tag, year, title, accent, lead, spec, proof,
}: {
  number: string;
  tag: { label: string; variant: TagVariant };
  year: string;
  title: string;
  accent: string;
  lead: React.ReactNode;
  spec: { label: string; value: React.ReactNode }[];
  proof?: { value: string; label: string }[];
}) {
  return (
    <section aria-label="Introduction" className="container-page pt-14">
      <Link href="/work" className="font-mono text-label">← Work</Link>
      <p className="mt-6 mb-5 flex flex-wrap items-center gap-2.5 font-mono text-label">
        <span>CASE STUDY {number}</span>
        <Tag variant={tag.variant}>{tag.label}</Tag>
        <span>{year}</span>
      </p>
      <h1 className="max-w-[1150px] text-display font-bold">
        {title} <span className="text-accent">{accent}</span>
      </h1>
      <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-8">
        <div className="max-w-[620px] text-lead">{lead}</div>
        <SpecPanel rows={spec} />
      </div>
      {proof && <ProofBar items={proof} />}
    </section>
  );
}

/** A case-study section: full-width h2 on its own row, content below. */
export function CsSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="container-page pt-24">
      <h2 id={id} className="mb-8 text-section font-bold">{title}</h2>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="flex max-w-[820px] flex-col gap-5 text-body">{children}</div>;
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-4 text-title font-bold">{children}</h3>;
}

/** Numbered surface cards. At most one may be highlighted (accent). */
export function NumberedCards({
  items, min = "300px",
}: { items: { title: string; body: string; highlight?: boolean; kicker?: string }[]; min?: string }) {
  return (
    <ol className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))` }}>
      {items.map((it, i) => (
        <li
          key={it.title}
          className={`flex flex-col gap-2.5 border p-6 ${it.highlight ? "border-accent bg-accent text-on-accent" : "border-ink bg-surface"}`}
        >
          <span className="font-mono text-label">{it.kicker ?? String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-lead font-bold">{it.title}</h3>
          <p className={`text-small ${it.highlight ? "text-on-accent-muted" : "text-ink-muted"}`}>{it.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** A framed screenshot with a mono caption. */
export function Figure({
  src, alt, caption, width, height, className = "",
}: { src: string; alt: string; caption: string; width: number; height: number; className?: string }) {
  return (
    <figure className={`border border-ink bg-surface ${className}`}>
      <div className="bg-plate-dots p-4 md:p-8">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 70vw, 95vw" className="h-auto w-full border border-ink shadow-back" />
      </div>
      <figcaption className="border-t border-ink px-4 py-3 font-mono text-caption text-ink-muted">{caption}</figcaption>
    </figure>
  );
}

/** Ink pull quote. One per screen height. */
export function Callout({ children }: { children: React.ReactNode }) {
  return <blockquote className="bg-ink px-7 py-6 text-title text-inverse-text">{children}</blockquote>;
}

/** Rows between hairlines: label + text. */
export function Ledger({ rows, labelWidth = "200px" }: { rows: { label: string; text: React.ReactNode }[]; labelWidth?: string }) {
  return (
    <ul className="border-t border-ink">
      {rows.map((r) => (
        <li key={r.label} className="grid gap-x-6 gap-y-1 border-b border-dot py-4 md:grid-cols-[var(--lw)_1fr]" style={{ ["--lw" as string]: labelWidth }}>
          <b>{r.label}</b>
          <span className="text-ink-muted">{r.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Simple data table on a surface. */
export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-ink bg-surface">
      <table className="w-full min-w-[560px] text-left text-small">
        <thead>
          <tr className="border-b border-ink font-mono text-caption">
            {head.map((h) => <th key={h} className="px-4 py-3 font-medium">{h.toUpperCase()}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-border-subtle last:border-b-0">
              {r.map((c, i) => <td key={i} className={`px-4 py-3 ${i === 0 ? "font-bold" : "text-ink-muted"}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Mono diagram / code block. */
export function Diagram({ children }: { children: string }) {
  return <pre className="overflow-x-auto border border-ink bg-surface p-6 font-mono text-caption leading-relaxed">{children}</pre>;
}

/** Two side-by-side surface cards with lists. */
export function SplitLists({ left, right }: { left: { title: string; items: string[] }; right: { title: string; items: string[] } }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
      {[left, right].map((c) => (
        <div key={c.title} className="flex flex-col gap-4 border border-ink bg-surface p-8">
          <h3 className="text-title font-bold">{c.title}</h3>
          <ul className="list-disc pl-5 text-body">{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

/** Closing link to the next case study. */
export function NextCase({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <section aria-label="Next case study" className="container-page py-16">
      <Link href={href} className="flex flex-wrap items-center justify-between gap-4 bg-accent px-10 py-8 text-on-accent hover:text-on-accent">
        <span className="font-mono text-label">NEXT CASE STUDY · {label}</span>
        <span className="text-title-l font-bold">{title} →</span>
      </Link>
    </section>
  );
}
