import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Tag } from "@/components/tag";
import { SpecPanel } from "@/components/spec-panel";
import { ProofBar } from "@/components/proof-bar";
import { StepCards } from "@/components/step-cards";
import { InkPanel } from "@/components/ink-panel";
import { ConsoleBlock } from "@/components/console-block";
import { CoverArt } from "@/components/cover-art";
import { PosterRow } from "@/components/case-study";
import { projects } from "@/content/site";

export const metadata: Metadata = { title: "SagUI — a design system built for AI agents · Sagnik Dey" };

const sagui = projects.find((p) => p.slug === "sagui")!;

const failures = [
  ["It invents things", "Components, variants and props that don't exist."],
  ["It hardcodes values", "Hex colors and p-[13px] break theming."],
  ["It drifts", "Every screen looks slightly different."],
  ["It forgets accessibility", "Missing labels, removed focus rings."],
  ["It can't tell “when not to”", "A Dialog where a Confirm morph fits."],
];

const principles = [
  { title: "Constrain, then compose", text: "A finite, well-named set of parts, so assembling always beats inventing." },
  { title: "Semantic over raw", text: "Every decision goes through a token that says what it's for." },
  { title: "One source, many surfaces", text: "Figma, CSS, Storybook and MCP all come from the same structure." },
  { title: "Write for the literal reader", text: "Explicit, testable, always-on rules. When in doubt: ask, don't improvise.", highlight: true },
  { title: "Quality is built in", text: "Accessibility, keyboard and reduced motion live inside components." },
];

const pipeline = [
  ["SOURCE", "tokens.json", "One structure, matches Figma"],
  ["DESIGN →", "Figma variables", "AI GUIDELINES in every component"],
  ["CODE →", "@sagui/ui", "85 React components"],
  ["VISUAL →", "Storybook", "127 stories · 32 docs pages"],
];

const tokenDetails = [
  ["Hand-tuned contrast", "Accent uses brand-1-700 in light, 400 in dark."],
  ["Solid tints", "Not transparency, so they hold on any background."],
  ["Paired text-on-fill", "Each fg-on-* keeps contrast in both themes."],
  ["Radius by role", "control · container · overlay · pill — corners stay concentric."],
  ["Fixed scales", "4 elevation levels, motion tokens, 4px spacing, one type scale."],
  ["Safe migration", "Old token names still map to new ones."],
];

const groups = [
  ["BUTTONS", "Button, Split, Button group, Copy, Confirm morph"],
  ["INPUTS", "Input, Password, Inline edit, Money, Phone, Tag input, Form"],
  ["SELECTION", "Checkbox, Radio cards, Select, Combobox, Switch, Segmented"],
  ["APP SHELL", "AppShell, AppTopBar, Page, Tabs, Stepper, Command palette"],
  ["DATA & CHARTS", "Data table, Timeline, Line / Bar / Donut / Treemap, Sparkline"],
  ["CARDS & FEEDBACK", "Card, Metric card, Empty state, Alert, Toast"],
  ["OVERLAYS", "Dialog, Drawer, Bottom sheet, Popover, Tooltip"],
];

const steps = [
  ["Discover", "search_components", "finds the part by job."],
  ["Learn", "get_component", "returns usage, props, a11y notes."],
  ["Style", "get_tokens", "for anything custom."],
  ["Check", "validate_usage", "catches invented props and raw colors."],
  ["Set up", "get_install", "one package, one stylesheet."],
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-8 text-section font-bold">{children}</h2>;
}

export default function SagUICaseStudy() {
  return (
    <>
      <section aria-label="Introduction" className="container-page pt-14">
        <Link href="/#work" className="font-mono text-label">← Work</Link>
        <p className="mt-6 mb-5 flex flex-wrap items-center gap-2.5 font-mono text-label">
          <span>CASE STUDY 01</span><Tag variant="fill">System</Tag><span>2026</span>
        </p>
        <h1 className="max-w-[1150px] text-display font-bold">
          SagUI: a design system built for <span className="text-accent">AI agents.</span>
        </h1>
        <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-8">
          <p className="max-w-[620px] text-lead">
            A design system with two kinds of user: people and AI agents. When an agent builds a new app, it should{" "}
            <em>assemble</em> SagUI instead of <em>inventing</em> a UI — so the result looks designed, stays accessible, and
            needs almost no design work afterwards.
          </p>
          <SpecPanel
            rows={[
              { label: "ROLE", value: "Designer & builder: design, tokens, components, docs, MCP server" },
              { label: "STACK", value: "Figma variables · React · Tailwind v4 · Radix · Motion · Storybook · MCP" },
              {
                label: "LINKS",
                value: (
                  <span className="flex flex-wrap gap-4">
                    <a href="https://www.figma.com/design/kNksgXgWFkl9ejS9RVm2Hq/SagUI-Design-System">Figma ↗</a>
                    <a href="https://sagnikdey.github.io/sagui/">Storybook ↗</a>
                    <a href="https://sagui-docs.vercel.app/components">Docs ↗</a>
                  </span>
                ),
              },
            ]}
          />
        </div>
        <ProofBar
          items={[
            { value: "85", label: "Production components" },
            { value: "2-tier", label: "Primitive → semantic tokens" },
            { value: "127", label: "Storybook stories" },
            { value: "Light + dark", label: "Themes from one token set" },
          ]}
        />
      </section>

      <section aria-label="Cover" className="container-page pt-12">
        <div className="group border border-ink">
          <CoverArt src={sagui.cover!.src} alt={sagui.cover!.alt} className="h-[420px] md:h-[620px]" />
        </div>
      </section>

      <section aria-labelledby="why" className="container-page pt-24">
        <H2 id="why">Why I built it</H2>
        <div className="flex flex-col gap-5 text-body">
          <p className="max-w-[820px]">
            I&rsquo;ve spent 16+ years designing enterprise SaaS. At 7-Eleven I built 7-UI, which taught me that a design
            system succeeds or fails on adoption. Tokens and components only matter if the people building products use them
            correctly.
          </p>
          <p className="max-w-[820px]">That &ldquo;people&rdquo; now includes AI. More and more UI is generated, not hand-coded — and it fails in predictable ways:</p>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
            {failures.map(([t, d]) => (
              <li key={t} className="flex flex-col gap-1.5 border border-ink bg-surface p-4">
                <b>{t}</b>
                <span className="text-small text-ink-muted">{d}</span>
              </li>
            ))}
          </ul>
          <blockquote className="mt-2 bg-ink px-7 py-6 text-title text-inverse-text">
            Agents don&rsquo;t browse docs; they follow whatever context they&rsquo;re given, literally. So I designed SagUI so
            that its documentation is also its <span className="text-inverse-accent">instructions.</span>
          </blockquote>
        </div>
      </section>

      <section aria-labelledby="principles" className="container-page pt-24">
        <H2 id="principles">Five principles</H2>
        <StepCards steps={principles} minHeight="min-h-[220px]" />
        <div className="mt-4" />
        <PosterRow
          posters={[
            { src: "/images/sagui/posters/poster-2.jpg", alt: "Poster: We are Agent-ready — SagUI's approval card, framed in a pale ring on navy" },
            { src: "/images/sagui/posters/poster-3.jpg", alt: "Poster: We are Tokenized — SagUI's theming docs, framed in a yellow ring on teal" },
            { src: "/images/sagui/posters/poster-4.jpg", alt: "Poster: We are In motion — SagUI's line chart, framed in a teal ring on cream" },
          ]}
        />
      </section>

      <section aria-labelledby="architecture" className="container-page pt-24">
        <H2 id="architecture">How it&rsquo;s structured</H2>
        <div className="flex flex-wrap border border-ink bg-surface">
          {pipeline.map(([k, t, d]) => (
            <div key={t} className="flex flex-[1_1_180px] flex-col gap-1.5 border-r border-border-subtle p-5">
              <span className="font-mono text-caption text-ink-muted">{k}</span>
              <b className="text-lead">{t}</b>
              <span className="text-small text-ink-muted">{d}</span>
            </div>
          ))}
          <div className="flex flex-[1_1_180px] flex-col gap-1.5 bg-accent p-5 text-on-accent">
            <span className="font-mono text-caption text-on-accent-muted">AGENTS →</span>
            <b className="text-lead">MCP server</b>
            <span className="text-small text-on-accent-muted">search → get → validate</span>
          </div>
        </div>
        <p className="mt-3 font-mono text-caption text-ink-muted">All five surfaces share one contract: the &ldquo;Rules for AI&rdquo; page.</p>
        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-8">
          <div className="flex flex-col gap-3.5 text-body">
            <h3 className="text-title font-bold">Two layers of tokens</h3>
            <p><b>Primitives</b> are raw values with no meaning — color ramps, sizes, radii. Brand 1 is a deep teal that drives the accent; Brand 2 is raspberry for highlights.</p>
            <p><b>Semantic tokens</b> say what a value is for — <code className="font-mono text-small">bg-canvas</code>, <code className="font-mono text-small">fg-muted</code>, <code className="font-mono text-small">accent-default</code>. Components only read these, so a rebrand is a handful of pointer changes.</p>
          </div>
          <ul className="border-t border-ink">
            {tokenDetails.map(([t, d]) => (
              <li key={t} className="grid grid-cols-[180px_1fr] gap-3 border-b border-dot py-3.5">
                <b>{t}</b><span className="text-ink-muted">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="components" className="container-page pt-24">
        <H2 id="components">85 components, grouped by job</H2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {groups.map(([g, d]) => (
            <div key={g} className="border border-ink bg-surface p-5">
              <b className="font-mono text-caption">{g}</b>
              <p className="mt-2 text-small text-ink-muted">{d}</p>
            </div>
          ))}
          <div className="border border-ink bg-ink p-5 text-inverse-text">
            <b className="font-mono text-caption text-inverse-accent">AGENT-NATIVE</b>
            <p className="mt-2 text-small text-inverse-muted">Approval card — human-in-the-loop questions before an agent acts · Text shimmer · Text morph</p>
          </div>
        </div>
        <div className="mt-8">
        <PosterRow
          posters={[
            { src: "/images/sagui/posters/poster-1.jpg", alt: "Poster: We are Composable — SagUI's radio cards, framed in a blue ring on salmon" },
            { src: "/images/sagui/posters/poster-5.jpg", alt: "Poster: We are Accessible — SagUI's app shell overview, framed in a navy ring on pink" },
            { src: "/images/sagui/posters/poster-6.jpg", alt: "Poster: We are Themeable — SagUI's donut chart in dark mode, framed in a pink ring on teal" },
          ]}
        />
        </div>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-8">
          <div className="flex flex-col gap-3.5 text-body">
            <h3 className="text-title font-bold">Documentation as instructions</h3>
            <p>Every component is documented the same way — in Figma, Storybook and the MCP response: what it maps to in code, when to use it, <b>when not to</b> and what to use instead, its API, and keyboard, accessibility and motion notes.</p>
            <p className="text-ink-muted">&ldquo;When not to use&rdquo; turns a list of components into a decision tree.</p>
          </div>
          <Image src="/images/sagui/docs-button.png" alt="SagUI component documentation page" width={1600} height={1000} className="h-auto w-full border border-ink shadow-back" />
        </div>
      </section>

      <InkPanel
        id="rules"
        title="Rules for AI"
        intro="The first page of the Figma file. Always on, and enforced the same way in Figma, in code and through the MCP server."
        rows={[
          { label: "COMPONENTS", text: "Use existing first. Never invent a component, variant or prop. One primary button per view." },
          { label: "COLOR", text: "Semantic tokens only. No hex. Dark mode is automatic. Status never by color alone." },
          { label: "SCALES", text: "No arbitrary sizes, spacing or shadows. Radius by role." },
          { label: "MOTION · ICONS", text: "Token durations, reduced motion respected. Tabler icons; icon-only controls get a label." },
          { label: "ACCESSIBILITY", text: "Real labels, announced errors, visible focus. Non-negotiable." },
        ]}
      />

      <section aria-labelledby="practice" className="container-page pt-24">
        <H2 id="practice">How an agent builds with SagUI</H2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
          <ol className="border-t border-ink">
            {steps.map(([t, tool, d], i) => (
              <li key={t} className="grid grid-cols-[48px_1fr] gap-3 border-b border-dot py-4">
                <span className={`font-mono text-label ${i === 3 ? "text-accent" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                <span><b>{t}</b> — <code className="font-mono text-label">{tool}</code> {d}</span>
              </li>
            ))}
          </ol>
          <ConsoleBlock
            prompt="Build an admin dashboard for refund requests"
            lines={[
              { text: "AppShell + AppTopBar — frame" },
              { text: "PageHeading — status, actions" },
              { text: "MetricCard × 3" },
              { text: "SortableDataTable — requests" },
              { text: "ApprovalCard — human decision", accent: true },
              { text: "Toast — confirmation" },
            ]}
            success="No new design needed. The system made the decisions."
          />
        </div>
      </section>

      <section aria-labelledby="outcomes" className="container-page pt-24">
        <H2 id="outcomes">Outcomes &amp; learnings</H2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
          <div className="flex flex-col gap-4 border border-ink bg-surface p-8">
            <h3 className="text-title font-bold">What this enables</h3>
            <ul className="list-disc pl-5 text-body">
              <li>Minimal design effort for new apps</li>
              <li>Consistency by default — no off-system values</li>
              <li>Accessibility you don&rsquo;t have to remember</li>
              <li>One-line rebrands, in both themes</li>
              <li>Figma, Storybook and MCP in step</li>
            </ul>
            {/* TODO: add a measured result (e.g. Sales Analytics build time, validate_usage pass rate) */}
            <p className="font-mono text-caption text-ink-muted">[Add a measured result: e.g. build time for Sales Analytics, validate_usage pass rate]</p>
          </div>
          <div className="flex flex-col gap-4 border border-ink bg-surface p-8 text-body">
            <h3 className="text-title font-bold">What I learned</h3>
            <p><b>An agent is the most literal reader you&rsquo;ll ever have.</b> Vague guidance gets ignored; testable rules get followed.</p>
            <p><b>&ldquo;When not to use&rdquo; matters more than &ldquo;when to use.&rdquo;</b></p>
            <p><b>Reach matters.</b> For people it&rsquo;s Figma and Storybook; for agents it&rsquo;s an MCP server — docs as a tool call.</p>
          </div>
        </div>
      </section>

      <section aria-label="What's next" className="container-page pt-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 border-t border-ink pt-5 text-small">
          <span className="font-mono text-label">NEXT →</span>
          <span><code className="font-mono">validate_usage</code> as a CI check</span>
          <span>Code Connect mappings Figma → <code className="font-mono">@sagui/ui</code></span>
          <span>More agent-native patterns</span>
        </div>
      </section>

      <section aria-label="Next case study" className="container-page py-16">
        <Link href="/work/mdm" className="flex flex-wrap items-center justify-between gap-4 bg-accent px-10 py-8 text-on-accent hover:text-on-accent">
          <span className="font-mono text-label">NEXT CASE STUDY · 02 PLATFORM</span>
          <span className="text-title-l font-bold">MDM Platform →</span>
        </Link>
      </section>
    </>
  );
}
