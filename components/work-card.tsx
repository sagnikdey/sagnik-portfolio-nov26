import Link from "next/link";
import type { Project } from "@/content/site";
import { Collage } from "./collage";
import { CoverArt } from "./cover-art";
import { Tag } from "./tag";

export function WorkCard({ p, compact = false }: { p: Project; compact?: boolean }) {
  const flag = p.flagship && !compact;
  return (
    <article className={`group flex overflow-hidden border border-ink bg-surface ${flag ? "col-span-full flex-wrap" : "flex-col"}`}>
      {p.cover ? (
        <CoverArt src={p.cover.src} alt={p.cover.alt} className={flag ? "h-[460px] flex-[2_1_560px]" : "h-[340px]"} />
      ) : (
        <Collage images={p.images} caption={p.caption} className={flag ? "h-[460px] flex-[2_1_560px]" : "h-[340px]"} />
      )}
      <div className={`flex flex-col gap-3 ${flag ? "flex-[1_1_300px] p-7" : "flex-1 p-6"}`}>
        <p className="flex flex-wrap items-center gap-2.5 font-mono text-label">
          <Tag variant={p.tag.variant}>{p.tag.label}</Tag>
          {p.extraTags?.map((t) => <Tag key={t.label} variant={t.variant}>{t.label}</Tag>)}
        </p>
        <h3 className={`font-bold ${flag ? "text-title-l" : "text-title"}`}>{p.title}</h3>
        <p className="text-body text-ink-body">{p.description}</p>
        {p.meta && <p className="font-mono text-caption text-ink-muted">{p.meta}</p>}
        <div className="mt-auto flex flex-wrap gap-5 border-t border-border-subtle pt-3.5 font-medium">
          <Link href={`/work/${p.slug}`}>Case study →</Link>
          {p.live && <a href={p.live.href} target="_blank" rel="noopener noreferrer">{p.live.label} ↗</a>}
          {p.links?.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
        </div>
      </div>
    </article>
  );
}
