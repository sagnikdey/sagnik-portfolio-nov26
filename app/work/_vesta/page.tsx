import type { Metadata } from "next";
import Image from "next/image";
import { Collage } from "@/components/collage";
import { CsIntro, CsSection, Prose, H3, NumberedCards, Figure, Callout, Ledger, NextCase } from "@/components/case-study";
import { projects } from "@/content/site";

export const metadata: Metadata = { title: "Vesta — a pantry intelligence app · Sagnik Dey" };

const vesta = projects.find((p) => p.slug === "vesta")!;

const phones = [
  { src: "/images/vesta/onboarding-welcome.png", alt: "Vesta onboarding welcome screen", h: 874, cap: "Onboarding" },
  { src: "/images/vesta/voice-logging.png", alt: "Voice logging: saying what was used updates inventory", h: 956, cap: "Voice logging" },
  { src: "/images/vesta/receipt-review-confirm.png", alt: "Receipt review: parsed items to confirm before saving", h: 953, cap: "Receipt confirm" },
  { src: "/images/vesta/scan-confirm-health-score.png", alt: "Barcode scan confirmation with a health score", h: 953, cap: "Scan + health score" },
];

export default function VestaCaseStudy() {
  return (
    <>
      <CsIntro
        tag={{ label: "Product", variant: "outline" }}
        title="Vesta: a pantry that keeps itself"
        accent="accurate."
        lead={
          <p>
            A home inventory app that tracks what&rsquo;s actually in your kitchen through voice, barcode scanning and receipt
            parsing instead of manual entry. Say &ldquo;used two cups of flour&rdquo; and inventory updates. A solo build, run
            deliberately through Design Thinking — which is what surfaced three major pivots.
          </p>
        }
        spec={[
          { label: "ROLE", value: "Product Designer & Solo Builder: research, strategy, IA, visual design, technical direction" },
          { label: "PLATFORM", value: "iOS · Swift / SwiftUI" },
          { label: "STATUS", value: "TestFlight beta; App Store submission planned" },
          { label: "TIMELINE", value: "July 2026 – ongoing" },
        ]}
        proof={[
          { value: "4", label: "Ways an item enters inventory" },
          { value: "4", label: "Competitor apps torn down" },
          { value: "2", label: "AI engine reversals, one interface" },
          { value: "≤ 5 pts", label: "Pre-registered accuracy bar" },
        ]}
      />

      <section aria-label="Cover" className="container-page pt-12">
        <div className="group border border-ink">
          <Collage images={vesta.images} className="h-[560px]" />
        </div>
      </section>

      <CsSection id="empathize" title="Empathize">
        <Prose>
          <p>
            I&rsquo;m the primary user — this began as a personal problem — but I treated that as a hypothesis to interrogate,
            not a shortcut past research.
          </p>
        </Prose>
        <NumberedCards
          items={[
            { title: "Competitive teardown", body: "A week of hands-on use with KitchenPal, Cooklist, Your Food and Pantry Check — documenting where logging gets skipped and inventory silently drifts, not comparing features." },
            { title: "Structured interviews", body: "A 10-interview protocol: how people track what's at home, when they discover they've run out, and for past pantry-app users, what broke the habit." },
          ]}
        />
        <Callout>
          Every competitor fails at the same point: the data-entry step, not the data-storage step. The product isn&rsquo;t a
          database with a nice UI — it&rsquo;s a <span className="text-inverse-accent">friction-removal problem.</span>
        </Callout>
      </CsSection>

      <CsSection id="define" title="Define">
        <Prose>
          <p className="text-lead">
            &ldquo;A person cooking regularly needs to know what&rsquo;s in their kitchen without spending effort keeping that record
            accurate — because the moment tracking becomes a chore, it&rsquo;s abandoned within days.&rdquo;
          </p>
          <p>
            That point of view ruled things out as much as it pointed things in: dozens of apps already store inventory well and
            still fail at retention. The need is <b>near-zero-friction logging</b>, which gave the principle that governed every
            later decision:
          </p>
        </Prose>
        <div className="border border-accent bg-accent p-8 text-title font-bold text-on-accent">
          If logging usage is as fast as saying it out loud — no unlocking, no searching, no typing a quantity — accuracy holds.
        </div>
        <Prose>
          <p>
            Voice isn&rsquo;t a novelty feature; it&rsquo;s the mechanism that makes the product viable. Barcode, receipt photo
            and health scoring exist to solve the cold start — getting the pantry populated — while voice solves ongoing accuracy.
          </p>
        </Prose>
      </CsSection>

      <CsSection id="ideate" title="Ideate">
        <Prose>
          <p>
            I pushed the idea as far as it would go before applying constraints — scoping down from an over-built idea is more
            honest than scoping up from a timid one.
          </p>
        </Prose>
        <NumberedCards
          min="240px"
          items={[
            { title: "Four-phase roadmap", body: "Core inventory → recipe matching with Instacart → full household categories → predictive auto-reorder." },
            { title: "IA by entry method", body: "Five tabs organised around the four ways an item enters or leaves inventory: barcode, voice, photo, manual." },
            { title: "A warm visual identity", body: "Kitchen-native, not clinical or cartoonish: off-white, terracotta / sage / amber tied to health states, mono numerals so quantities align." },
            { title: "Signature card", body: "A colored edge mapped to a computed health score, so a pantry's make-up is scannable without opening an item." },
          ]}
        />
        <Figure src="/images/vesta/home-screen-explorations.png" alt="Vesta home screen explorations side by side" caption="Home screen explorations before converging on one direction." width={1382} height={970} />
        <Ledger
          rows={[
            { label: "Killed on purpose", text: "A seven-screen guided onboarding tour. Good UX for a stranger downloading cold; wrong for the actual current user. Kept on file for a public launch — knowing which good ideas not to build yet is a design decision too." },
          ]}
        />
      </CsSection>

      <CsSection id="prototype" title="Prototype">
        <Prose>
          <p>
            The full-platform concept failed its feasibility test fast: a backend to run indefinitely, multi-user auth for a
            problem I didn&rsquo;t have, four API integrations before the core loop was proven for one person. So I prototyped
            down, twice.
          </p>
        </Prose>
        <NumberedCards
          items={[
            { title: "Round 1 — solo, on-device", body: "One person, iOS only, no backend: SwiftData, on-device speech and on-device AI parsing." },
            { title: "Round 2 — the engine swap", body: "On-device models were beta, hardware-locked and weaker on compound, ambiguous sentences — the exact input voice logging depends on. The AI layer moved behind swappable protocols with a hosted model as default.", highlight: true },
          ]}
        />
        <Callout>
          The protocol layer meant every later reversal touched one interface, not the whole app. In a solo build, a prototype
          that&rsquo;s cheap to unwind is worth more than one that&rsquo;s <span className="text-inverse-accent">polished.</span>
        </Callout>
        <H3>Confirm before commit</H3>
        <Prose>
          <p>
            Every model-driven action — barcode match, voice parse, receipt scan — shows a confirmation before anything is saved.
            Low-confidence results are flagged with inline edit, never a silent guess. The same pattern repeats across four entry
            points because it&rsquo;s the answer to &ldquo;how do you trust an app writing to your inventory from a transcription?&rdquo;
          </p>
        </Prose>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
          {phones.map((p) => (
            <li key={p.src} className="flex flex-col border border-ink bg-surface">
              <div className="bg-plate-dots p-5">
                <Image src={p.src} alt={p.alt} width={402} height={p.h} className="mx-auto h-auto w-full max-w-[220px] border border-ink shadow-back" />
              </div>
              <span className="border-t border-ink px-4 py-3 font-mono text-caption text-ink-muted">{p.cap}</span>
            </li>
          ))}
        </ul>
      </CsSection>

      <CsSection id="test" title="Test">
        <Ledger
          rows={[
            { label: "Pre-registered bar", text: "On-device parsing becomes default only if it lands within five points of the hosted model on a 50-transcript set, with manual corrections under 10% over two weeks of daily use — written down before building." },
            { label: "Security gate", text: "A key embedded in a client binary can be extracted, so a serverless proxy is a hard requirement before public release." },
            { label: "Platform review", text: "Permission copy, privacy disclosures and data-use declarations tested against App Store requirements for camera, microphone, speech and third-party AI." },
            { label: "In test now", text: "TestFlight on iOS 17+, hosted parser live behind the proxy." },
            { label: "Still to test", text: "Accuracy across other households' brands, receipt formats and kitchen noise — my own kitchen is a sample size of one." },
          ]}
        />
      </CsSection>

      <CsSection id="demonstrates" title="What this demonstrates">
        <NumberedCards
          min="240px"
          items={[
            { title: "A real Empathize → Define cycle", body: "The problem statement ruled out “a nicer list app” and pointed at voice." },
            { title: "Ideation disciplined by scope", body: "The visual system and IA held; the infrastructure was cut for a solo build." },
            { title: "Prototypes cheap to be wrong", body: "Two engine reversals cost an interface change, not a rewrite." },
            { title: "Pre-registered tests", body: "Pass/fail lines written before the code they judge." },
            { title: "Ownership of the whole loop", body: "Research, definition, IA, visuals and architecture as one continuous set of decisions.", highlight: true },
          ]}
        />
      </CsSection>

      <NextCase href="/work/sagui" label="SYSTEM" title="SagUI" />
    </>
  );
}
