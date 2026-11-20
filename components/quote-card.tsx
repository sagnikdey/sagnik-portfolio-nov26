import type { Quote } from "@/content/site";

export function QuoteCard({ q }: { q: Quote }) {
  const box = q.lead
    ? "bg-ink text-inverse-text"
    : q.placeholder
      ? "border border-dashed border-ink-muted bg-surface"
      : "border border-ink bg-surface";
  return (
    <figure className={`flex flex-col gap-6 p-7 ${box}`}>
      <span aria-hidden className={`text-section leading-none ${q.lead ? "text-inverse-accent" : "text-accent"}`}>“</span>
      <blockquote className={q.lead ? "text-quote" : `text-lead ${q.placeholder ? "text-ink-muted" : ""}`}>{q.quote}</blockquote>
      <figcaption className={`mt-auto font-mono text-caption ${q.lead ? "text-inverse-muted" : "text-ink-muted"}`}>
        <span className="uppercase">{q.name}</span>
        <br />
        {q.role}
      </figcaption>
    </figure>
  );
}
