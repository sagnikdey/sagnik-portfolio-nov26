export function ConsoleBlock({ prompt, lines, success }: { prompt: string; lines: { text: string; accent?: boolean }[]; success: string }) {
  return (
    <div className="flex flex-col gap-2.5 bg-console p-6 font-mono text-small text-console-text">
      <span className="text-caption text-console-muted">PROMPT</span>
      <span className="bg-console-line p-3">&gt; {prompt}</span>
      <span className="mt-2 text-caption text-console-muted">ASSEMBLED FROM</span>
      {lines.map((l) => (
        <span key={l.text} className={l.accent ? "text-inverse-accent" : ""}>{l.text}</span>
      ))}
      <span className="mt-2 text-console-success">✓ {success}</span>
    </div>
  );
}
