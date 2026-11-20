"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type FlowStep = {
  src: string;
  alt: string;
  title: string;
  note: string;
  /** Tap point in the 390 × 844 screen, or null for a screen that only holds. */
  tap: { x: number; y: number } | null;
};

const W = 390;
const H = 844;
const HOLD = 2600; // ms on each screen before the tap
const TAP = 700; // ms the tap marker shows before the next screen

/**
 * Self-playing prototype: real screenshots of the flow, played in order with a tap marker.
 * Autoplays only when visible and when motion is allowed; every step is also a button.
 */
export function FlowPlayer({ steps, label }: { steps: FlowStep[]; label: string }) {
  const [i, setI] = useState(0);
  const [tapping, setTapping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Start playing on first view unless the visitor prefers reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    if (!reduce) setPlaying(true);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const step = steps[i];
    const t1 = setTimeout(() => setTapping(Boolean(step.tap)), HOLD);
    const t2 = setTimeout(() => { setTapping(false); setI((n) => (n + 1) % steps.length); }, HOLD + (step.tap ? TAP : 0) + (i === steps.length - 1 ? 1600 : 0));
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [i, playing, visible, steps]);

  const step = steps[i];

  return (
    <div ref={root} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] border border-ink bg-surface">
      <div className="flex items-center justify-center bg-plate-dots px-6 py-10">
        <div className="relative w-full max-w-80 overflow-hidden border border-ink bg-surface shadow-front" style={{ aspectRatio: `${W} / ${H}` }}>
          {steps.map((s, n) => (
            <Image
              key={s.src}
              src={s.src}
              alt={n === i ? s.alt : ""}
              aria-hidden={n !== i}
              fill
              sizes="320px"
              priority={n < 2}
              className={`object-cover motion-safe:transition-opacity motion-safe:duration-500 ${n === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {step.tap && (
            <span
              aria-hidden
              className={`pointer-events-none absolute size-10 -translate-x-1/2 -translate-y-1/2 border-4 border-accent motion-safe:transition-all motion-safe:duration-300 ${tapping ? "scale-100 opacity-100" : "scale-150 opacity-0"}`}
              style={{ left: `${(step.tap.x / W) * 100}%`, top: `${(step.tap.y / H) * 100}%` }}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col border-t border-ink md:border-t-0 md:border-l">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-6 py-4">
          <p className="font-mono text-label uppercase">{label}</p>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            className="border border-ink px-4 py-2 font-mono text-label uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>
        <ol className="flex-1">
          {steps.map((s, n) => (
            <li key={s.src} className="border-b border-dot last:border-b-0">
              <button
                type="button"
                onClick={() => { setI(n); setTapping(false); }}
                aria-current={n === i ? "step" : undefined}
                className={`grid w-full grid-cols-[40px_1fr] gap-3 px-6 py-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${n === i ? "bg-ink text-inverse-text" : "hover:bg-surface-raised"}`}
              >
                <span className={`font-mono text-label ${n === i ? "text-inverse-accent" : ""}`}>{String(n + 1).padStart(2, "0")}</span>
                <span className="flex flex-col">
                  <span className="text-small font-bold">{s.title}</span>
                  {n === i && <span className="text-small text-inverse-muted">{s.note}</span>}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
