export function SpecPanel({ rows }: { rows: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="border border-ink bg-surface-raised text-small">
      {rows.map((r, i) => (
        <div key={r.label} className={`grid grid-cols-[110px_1fr] ${i < rows.length - 1 ? "border-b border-border-subtle" : ""}`}>
          <dt className="px-4 py-3 font-mono text-caption text-ink-muted">{r.label}</dt>
          <dd className="px-4 py-3">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
