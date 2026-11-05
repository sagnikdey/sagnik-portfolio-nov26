import type { Metadata } from "next";
import { Collage } from "@/components/collage";
import {
  CsIntro, CsSection, Prose, H3, NumberedCards, Figure, Callout, Table, Diagram, SplitLists, Ledger, NextCase,
} from "@/components/case-study";
import { projects } from "@/content/site";

export const metadata: Metadata = { title: "QuickStop — a convenience-store app built for certainty · Sagnik Dey" };

const qs = projects.find((p) => p.slug === "quickstop-ios")!;

const brand = [
  { label: "Teal", token: "brandPrimary", hex: "#30C5FF" },
  { label: "Forest", token: "brandAccent1", hex: "#5C946E" },
  { label: "Sage", token: "brandAccent12", hex: "#80C2AF" },
  { label: "Sky", token: "brandAccent13", hex: "#A0DDE6" },
];

export default function QuickstopCaseStudy() {
  return (
    <>
      <CsIntro
        number="04"
        tag={{ label: "Product", variant: "outline" }}
        year="2025–26"
        title="QuickStop: a convenience-store app built for"
        accent="certainty."
        lead={
          <p>
            Convenience stores fail at the one thing in their name — lines, out-of-stock items, awkward checkout. QuickStop gives
            customers their time back. An end-to-end, AI-assisted workflow: research, information architecture, Figma screens and
            a native SwiftUI port.
          </p>
        }
        spec={[
          { label: "ROLE", value: "Product Designer + iOS Developer" },
          { label: "STATUS", value: "v1 — in progress" },
          { label: "STACK", value: "Claude · Figma + Figma MCP · SwiftUI / UIKit · Cursor · ConvexMobile · Stripe" },
          { label: "TIMELINE", value: "2025 – 2026" },
        ]}
        proof={[
          { value: "5", label: "Personas, five definitions of “fast”" },
          { value: "5", label: "Tabs — Scan & Go promoted" },
          { value: "10", label: "Shop categories, two age-gated" },
          { value: "70+", label: "Light/dark color tokens from Figma" },
        ]}
      />

      <section aria-label="Cover" className="container-page pt-12">
        <div className="group border border-ink">
          <Collage images={qs.images} className="h-[560px]" />
        </div>
      </section>

      <CsSection id="problem" title="The problem">
        <Prose>
          <p>
            Where convenience-store apps exist at all, they&rsquo;re glorified loyalty cards. They don&rsquo;t solve the core
            friction: uncertainty. Is it in stock? How long is the line? Will my mobile order be ready — or sitting on a shelf
            anyone can grab?
          </p>
        </Prose>
        <Callout>
          The opportunity was to build for certainty — and let speed <span className="text-inverse-accent">follow.</span>
        </Callout>
      </CsSection>

      <CsSection id="research" title="Research and personas">
        <Prose>
          <p>
            Five personas came from a bottom-up analysis of real convenience-store use — specific jobs to be done at different
            times of day, not demographics. Each had a weighting across Speed, Freshness, Reliability and Discovery, which became
            the decision criteria for the rest of the project.
          </p>
        </Prose>
        <NumberedCards
          min="220px"
          items={[
            { kicker: "THE COMMUTER", title: "Marcus, 32 · Sales rep", body: "Order-ahead and a 90-second in-and-out." },
            { kicker: "THE NIGHT SHIFTER", title: "Priya, 28 · ER nurse", body: "Curbside pickup and fresh-food transparency at 3am." },
            { kicker: "THE BULK BUYER", title: "Danny, 41 · Contractor", body: "Group orders, business receipts, crew presets." },
            { kicker: "THE IMPULSE LOCAL", title: "Zoe, 19 · Student", body: "Scan-and-go, discovery, three taps max." },
            { kicker: "THE EMERGENCY ERRAND", title: "Sarah, 38 · Parent / WFH", body: "Sub-15-minute delivery and verified real-time stock." },
          ]}
        />
        <Prose>
          <p className="text-lead">
            Across all five, the unifying need is certainty — that the item is there, the line won&rsquo;t kill them, and the trip
            takes exactly as long as expected.
          </p>
        </Prose>
      </CsSection>

      <CsSection id="ia" title="Information architecture">
        <Prose>
          <p>
            Worked out iteratively — propose a structure, stress-test it against each persona&rsquo;s flow, revise. It started as
            Home, Shop, Orders, Store, You.
          </p>
        </Prose>
        <NumberedCards
          items={[
            { title: "Scan & Go becomes a tab", body: "It's a mode of being in the store, not of browsing; it's camera-first; and Zoe's three-tap limit is easier from the tab bar.", highlight: true },
            { title: "Store folds into Home", body: "Live inventory, hours and locations moved into Home's header — the certainty layer on the first screen everyone sees." },
            { title: "Group ordering to v2", body: "Crew orders, business accounts and itemised tax receipts were scoped out to keep v1 shippable." },
          ]}
        />
        <H3>Final nav (v0.3)</H3>
        <Table
          head={["Tab", "Purpose", "Primary persona"]}
          rows={[
            ["Home", "Smart entry — reorder, quick actions, store status", "Marcus, Sarah"],
            ["Shop", "Browse catalog, Order Ahead + Delivery modes", "Zoe, Priya"],
            ["Scan", "Camera-first in-store checkout", "Zoe, Marcus"],
            ["Orders", "Active and past, every pickup and delivery method", "All"],
            ["You", "Profile, payment, loyalty", "All"],
          ]}
        />
      </CsSection>

      <CsSection id="taxonomy" title="Shop taxonomy">
        <Prose>
          <p>
            Shop was the most structurally complex part: ten categories with their own subcategories and filters, two of them
            age-gated with a separate verification model.
          </p>
        </Prose>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3">
          {["Hot Food & Pizza", "Coffee & Hot Drinks", "Cold Drinks", "Snacks & Candy", "Fresh Food", "Ice Cream & Frozen", "Beer, Wine & Spirits", "Tobacco & Vaping", "Grocery & Household", "Health & Beauty"].map((c, i) => (
            <li key={c} className="flex items-baseline gap-3 border border-ink bg-surface px-4 py-3">
              <span className="font-mono text-label">{String(i + 1).padStart(2, "0")}</span>
              <span>{c}</span>
              {(i === 6 || i === 7) && <span className="ml-auto border border-ink px-2 py-0.5 font-mono text-caption">21+</span>}
            </li>
          ))}
        </ol>
        <Ledger
          rows={[
            { label: "Trust and confirm", text: "Date of birth stored once at account level, a once-per-session cart acknowledgement, and a visual ID check at handoff. In-app ID scanning is deferred to v2 as a drop-in to the same flow." },
          ]}
        />
        <H3>Persona-driven features</H3>
        <NumberedCards
          min="220px"
          items={[
            { title: "The Usual", body: "History-driven reorder strip, built for Marcus." },
            { title: "New This Week", body: "Discovery strip for Zoe — excludes age-gated items." },
            { title: "Need It Now", body: "Emergency shortcut preset for Sarah." },
            { title: "Running Low?", body: "Cadence-based reorder prompts." },
          ]}
        />
      </CsSection>

      <CsSection id="design-system" title="Design system first">
        <Prose>
          <p>
            Before any screen, the color system: extracted from Figma&rsquo;s Apple Design System file through Figma MCP and
            exported as a production-ready <code className="font-mono text-small">DSColors.swift</code> — no manual copy-paste.
            70+ tokens covering brand, backgrounds, labels, fills, separators and overlays, each with light and dark values.
          </p>
        </Prose>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
          {brand.map((b) => (
            <li key={b.token} className="flex flex-col border border-ink bg-surface">
              {/* Swatch shows the product's own brand color — the one sanctioned inline color in this site. */}
              <span aria-hidden className="h-24 border-b border-ink" style={{ backgroundColor: b.hex }} />
              <span className="flex flex-col gap-1 p-4">
                <b>{b.label}</b>
                <span className="font-mono text-caption text-ink-muted">{b.token} · {b.hex}</span>
              </span>
            </li>
          ))}
        </ul>
      </CsSection>

      <CsSection id="screens" title="Screens, built through Figma MCP">
        <Prose>
          <p>
            Screens were built from the Apple Design System library with QuickStop tokens applied. Through Figma MCP, Claude wrote
            and ran plugin code in the file — creating frames, placing components, setting fills, wiring auto-layout — instead of
            me building each screen by hand.
          </p>
        </Prose>
        <Figure src="/images/quickstop/onboarding-flow.png" alt="Six-screen QuickStop onboarding flow: value prop, store finder, category preferences, sign-in, a pre-built first order, and an order-placed confirmation with a QR code" caption="Onboarding in six screens — it ends on a certain pickup time and a prompt to make the first order a habit." width={3105} height={1275} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-8">
          <Figure src="/images/quickstop/you-tab.png" alt="The You tab: profile card with points, streak and tier, grouped settings lists and the five-item tab bar" caption="The You tab — grouped lists, 14pt cards, continuous corners." width={402} height={1223} className="mx-auto w-full max-w-[360px]" />
          <NumberedCards
            min="100%"
            items={[
              { title: "Shop landing", body: "Search, Order Ahead / Delivery switch, “The Usual”, and a 10-category grid with age-gate badges." },
              { title: "Cold Drinks", body: "Subcategory chips, a featured banner and a product grid with stock indicators." },
              { title: "Product detail", body: "Nutrition grid (calories, sugar, caffeine, serving) and a “frequently bought together” strip." },
              { title: "Design language", body: "SF Pro, QuickStop teal for primary actions, iOS system colors for stock status, grouped backgrounds." },
            ]}
          />
        </div>
      </CsSection>

      <CsSection id="ios" title="Native iOS in Swift">
        <Prose>
          <p>
            The designs were ported to SwiftUI and UIKit, with <code className="font-mono text-small">DSColors.swift</code> as the
            bridge between design and code: an atomic hierarchy for components, a feature-based structure for product areas.
          </p>
        </Prose>
        <Diagram>{`Quickpitstop/Sources/
├── App/            entry points
├── Components/     atomic design system
│   ├── Atoms/        DSButton, DSBadge, DSTextField…
│   ├── Molecules/    ProductCard, StockBadge, CartItemRow…
│   ├── Navigation/   DSTabBar, DSToolbar
│   └── Organisms/    ProductGrid, CartSummary…
├── DesignSystem/Tokens/   DSColors, DSTypography, DSSpacing, DSRadius, DSShadow
├── Features/       Home, Cart, Orders, Search, Account, Auth
├── ViewModels/
└── PreviewMocks/`}</Diagram>
        <NumberedCards
          items={[
            { title: "Tokens only", body: "No hard-coded hex in feature or component code; light and dark handled entirely at the token level." },
            { title: "Figma mirrored in code", body: "A Figma molecule is a Swift molecule; the asset catalog follows the Figma variable groups, so handoff is mechanical." },
            { title: "Real-time backend", body: "ConvexMobile syncs live inventory and order status — serving the promise of certainty. Stripe handles checkout." },
            { title: "Previews without a backend", body: "PreviewMocks supply fixtures so every SwiftUI preview works offline." },
          ]}
        />
      </CsSection>

      <CsSection id="ai" title="What AI actually changed">
        <SplitLists
          left={{
            title: "What AI accelerated",
            items: [
              "Persona generation and synthesis: hours down to under one",
              "IA iteration: propose, critique, revise in one session",
              "Taxonomy naming, subcategory logic and age-gating edge cases",
              "DSColors.swift extracted from Figma, not transcribed",
              "Figma screens built by plugin code through MCP",
            ],
          }}
          right={{
            title: "What still needed judgment",
            items: [
              "Choosing the right structure (Scan & Go, Store into Home)",
              "Visual taste — right, not just structurally correct",
              "Scoping v1 against v2",
              "Swift architecture during the native port",
            ],
          }}
        />
        <Callout>
          The workflow didn&rsquo;t remove design judgment — it removed the time between having a judgment and seeing it
          <span className="text-inverse-accent"> rendered.</span>
        </Callout>
      </CsSection>

      <CsSection id="next" title="Open questions">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
          <div className="flex flex-col gap-3 border border-ink bg-surface p-6">
            <h3 className="font-mono text-label">STILL DECIDING</h3>
            <ul className="list-disc pl-5 text-small">
              <li>First DOB prompt: onboarding or just-in-time?</li>
              <li>Under-21 accounts: hide age-gated categories, or show them locked?</li>
              <li>Scan & Go: require in-store location, or always available?</li>
              <li>Home personalization on day one, with no history</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 border border-ink bg-surface p-6">
            <h3 className="font-mono text-label">NEXT TO DESIGN</h3>
            <ul className="list-disc pl-5 text-small">
              <li>Age-gated checkpoint sheet at cart level</li>
              <li>Orders tab: active tracking and pickup methods</li>
              <li>Scan & Go: scanner UI, cart drawer, exit and pay</li>
              <li>v2: group ordering, business accounts, in-app ID</li>
            </ul>
          </div>
        </div>
      </CsSection>

      <NextCase href="/work/vesta" label="05 PRODUCT" title="Vesta" />
    </>
  );
}
