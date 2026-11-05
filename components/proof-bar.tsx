export function ProofBar({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] border-y border-ink">
      {items.map((i, n) => (
        <div key={i.label} className={`flex flex-col-reverse gap-1.5 py-5 ${n === 0 ? "pr-4" : "px-4"}`}>
          <dt className="font-mono text-caption text-ink-muted">{i.label}</dt>
          <dd className="text-stat font-bold">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
