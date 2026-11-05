import Link from "next/link";
import { ButtonPrimary, ButtonSecondary } from "@/components/buttons";
import { ProofBar } from "@/components/proof-bar";
import { Section } from "@/components/section";
import { StepCards } from "@/components/step-cards";
import { WorkCard } from "@/components/work-card";
import { QuoteCard } from "@/components/quote-card";
import { ContactStrip } from "@/components/contact-strip";
import { approach, projects, proof, quotes, site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section aria-label="Introduction" className="container-page pt-16">
        <p className="mb-6 font-mono text-label uppercase">{site.title} · Systems thinking</p>
        <h1 className="max-w-[1100px] text-display font-bold">
          I help teams turn complex products into <span className="text-accent">coherent ones.</span>
        </h1>
        <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-end gap-8">
          <p className="max-w-[560px] text-lead">
            I&rsquo;m Sagnik. For {site.tenure} I&rsquo;ve untangled data-heavy enterprise products. I find the structure
            underneath, design the experience on top, and leave behind a system — patterns, components, rules — that keeps
            it clear as the product and the team grow.
          </p>
          <div className="flex flex-wrap justify-end gap-3">
            <ButtonPrimary href={`mailto:${site.email}`}>Get in touch →</ButtonPrimary>
            <ButtonSecondary href="#work">Selected work</ButtonSecondary>
          </div>
        </div>
        <ProofBar items={proof} />
      </section>

      <Section id="approach" title="How I work">
        <StepCards steps={approach} />
      </Section>

      <Section id="work" title="Selected work" note="One system → the products built on it">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-4">
          {projects.filter((p) => p.featured).map((p) => (
            <WorkCard key={p.slug} p={p} />
          ))}
        </div>
        <div className="mt-8 flex justify-end"><Link href="/work" className="font-medium">All work →</Link></div>
      </Section>

      <Section id="testimonials" title="What people say">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {quotes.map((q) => (
            <QuoteCard key={q.name} q={q} />
          ))}
        </div>
      </Section>

      <ContactStrip />
    </>
  );
}
