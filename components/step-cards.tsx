type Step = { title: string; text: string; output?: string; highlight?: boolean };

export function StepCards({ steps, minHeight = "min-h-[280px]" }: { steps: Step[]; minHeight?: string }) {
  return (
    <ol className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={`flex ${minHeight} flex-col gap-3.5 border p-6 ${
            s.highlight ? "border-accent bg-accent text-on-accent" : "border-ink bg-surface"
          }`}
        >
          <span className="font-mono text-label">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-title font-bold">{s.title}</h3>
          <p className={`text-small ${s.highlight ? "text-on-accent-muted" : "text-ink-muted"}`}>{s.text}</p>
          {s.output && (
            <span className={`mt-auto border-t pt-3.5 font-mono text-caption ${s.highlight ? "border-on-accent-rule" : "border-border-subtle"}`}>
              → {s.output}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
