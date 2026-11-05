export function InkPanel({ id, title, intro, rows }: { id: string; title: string; intro?: string; rows: { label: string; text: string }[] }) {
  return (
    <section aria-labelledby={`${id}-h`} className="container-page pt-24">
      <div className="bg-ink px-10 py-12 text-inverse-text">
        <h2 id={`${id}-h`} className="text-section font-bold">{title}</h2>
        {intro && <p className="mt-5 max-w-[760px] text-body text-inverse-muted">{intro}</p>}
        <ul className="mt-8">
          {rows.map((r, i) => (
            <li key={r.label} className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,140px),max-content))] gap-x-6 gap-y-1 py-3 sm:grid-cols-[160px_1fr] ${i < rows.length - 1 ? "border-b border-inverse-rule" : ""}`}>
              <span className="font-mono text-caption text-inverse-accent">{r.label}</span>
              <span className="text-body">{r.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
