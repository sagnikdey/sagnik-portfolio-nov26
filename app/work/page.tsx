import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/content/site";
import { Tag } from "@/components/tag";
import { WorkCard } from "@/components/work-card";
import { Section } from "@/components/section";
import { ContactStrip } from "@/components/contact-strip";

export const metadata: Metadata = { title: "Work · Sagnik Dey" };

export default function WorkIndex() {
  return (
    <>
      <section aria-labelledby="work-index-h" className="container-page pt-16">
        <p className="mb-6 font-mono text-label uppercase">Work · {projects.length} projects</p>
        <h1 id="work-index-h" className="max-w-[1100px] text-display font-bold">
          Systems, platforms and the <span className="text-accent">products built on them.</span>
        </h1>
        <p className="mt-9 max-w-[620px] text-lead">
          Each project follows the same approach — understand, structure, design, systematize, scale — at a different
          size, from a design system for AI agents to a solo-built iOS app.
        </p>

        <ol aria-label="Project index" className="mt-12 border-t border-ink">
          {projects.map((p) => (
            <li key={p.slug} className="border-b border-dot">
              <Link
                href={`/work/${p.slug}`}
                className="grid grid-cols-[48px_1fr_auto] items-baseline gap-x-4 gap-y-1 py-5 md:grid-cols-[64px_1.2fr_auto_1.4fr_120px_32px]"
              >
                <span className="font-mono text-label">{p.number}</span>
                <span className="text-title font-bold">{p.title}</span>
                <span className="font-mono text-label"><Tag variant={p.tag.variant}>{p.tag.label}</Tag></span>
                <span className="col-span-full text-small text-ink-muted md:col-span-1">{p.role}</span>
                <span className="hidden font-mono text-caption md:block">{p.year}</span>
                <span aria-hidden className="hidden text-right md:block">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <Section id="projects" title="All projects">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-4">
          {projects.map((p) => (
            <WorkCard key={p.slug} p={p} compact />
          ))}
        </div>
      </Section>

      <ContactStrip />
    </>
  );
}
