export function Section({
  id, title, note, children, className = "py-16",
}: { id: string; title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`container-page ${className}`}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id={`${id}-h`} className="text-section font-bold">{title}</h2>
        {note && <span className="font-mono text-label">{note}</span>}
      </div>
      {children}
    </section>
  );
}
