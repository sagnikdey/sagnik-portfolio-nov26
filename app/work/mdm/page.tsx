import type { Metadata } from "next";
import { Collage } from "@/components/collage";
import {
  CsIntro, CsSection, Prose, H3, NumberedCards, Figure, Callout, Ledger, Table, Diagram, SplitLists, NextCase,
} from "@/components/case-study";
import { projects } from "@/content/site";

export const metadata: Metadata = { title: "MDM Platform — master data for convenience-store vendors · Sagnik Dey" };

const mdm = projects.find((p) => p.slug === "mdm")!;

export default function MdmCaseStudy() {
  return (
    <>
      <CsIntro
        tag={{ label: "Platform", variant: "outline" }}
        title="MDM: master data for convenience-store vendors,"
        accent="governed by design."
        lead={
          <p>
            A Master Data Management platform — the system that sits underneath a convenience-store operator and governs one
            source of truth for stores, vendors, products and inventory. Designed and built solo, end to end: domain model,
            information architecture, UX flows, database schema and application code.
          </p>
        }
        spec={[
          { label: "ROLE", value: "Product Designer & Design-Engineer (solo)" },
          { label: "STATUS", value: "Admin console, onboarding and vendor portal running end to end; rebuilt on SagUI" },
          { label: "STACK", value: "Next.js 16 · TypeScript · PostgreSQL · SagUI · Turborepo · Vercel" },
          {
            label: "LINKS",
            value: (
              <span className="flex flex-wrap gap-4">
                <a href="https://sagui-docs.vercel.app/">SagUI docs ↗</a>
                <a href="https://github.com/sagnikdey/mdm">GitHub ↗</a>
              </span>
            ),
          },
        ]}
        proof={[
          { value: "3", label: "Apps on one Postgres database" },
          { value: "8", label: "Steps in vendor onboarding" },
          { value: "1", label: "Design system: SagUI, shared with this site’s case studies" },
          { value: "0", label: "Vendor writes straight to master data" },
        ]}
      />

      <section aria-label="Cover" className="container-page pt-12">
        <div className="group border border-ink">
          <Collage images={mdm.images} className="h-[560px]" />
        </div>
      </section>

      <CsSection id="problem" title="The problem">
        <Prose>
          <p>
            This started with an observation from an in-production enterprise MDM system for a large convenience-store
            operation. The way it worked and the way a system managing vendor and product data at that scale <em>should</em>{" "}
            work kept pulling apart in the same five places:
          </p>
        </Prose>
        <NumberedCards
          items={[
            { title: "Admins created every product", body: "Vendors couldn't enter or maintain their own data — every SKU, attribute and update went through an internal admin, by hand." },
            { title: "Vendor links added after the fact", body: "The vendor–product relationship was admin bookkeeping, not a step in the vendor's own workflow." },
            { title: "No onboarding or categorization", body: "Vendors weren't classified by what they supplied, so nothing downstream — compliance, fields, permissions — could depend on it." },
            { title: "No approval gate", body: "Vendor and product data went straight into production tables with no staging, review or needs-more-info step." },
            { title: "Design spent on polish, not process", body: "Screens were good-looking; the broken workflow and data governance underneath went largely unaddressed.", highlight: true },
          ]}
          min="220px"
        />
        <Callout>
          None of these gaps are cosmetic. No onboarding means no categorization; no categorization means no conditional
          compliance; no approval gate means bad data has a straight path into <span className="text-inverse-accent">production.</span>
        </Callout>
        <Prose>
          <p>
            I formed a point of view on the fix — vendors onboard and categorize themselves, every vendor- and product-facing
            change passes an explicit approval step, and design effort goes into the process, not just the pixels — and
            validated it with subject-matter experts from the operational side before building anything.
          </p>
        </Prose>
        <H3>The MVP flow</H3>
        <Ledger
          rows={[
            { label: "01 Invite", text: "MDM admins send vendor invites — a deliberate, self-service relationship instead of admin-created records." },
            { label: "02 Approve", text: "Admins review and approve vendors and products — the gate the original system never had." },
            { label: "03 Self-service", text: "Vendors categorize themselves at onboarding and maintain their own catalog from then on." },
            { label: "04 Design system", text: "Visual consistency becomes infrastructure — now SagUI, built once and reused across every app." },
          ]}
        />
      </CsSection>
      <CsSection id="architecture" title="System architecture">
        <Prose>
          <p>
            The domain had to be modeled before any screen was designed. I treated architecture as a design problem: every
            structural decision has a UX consequence downstream.
          </p>
        </Prose>
        <Diagram>{`                 ┌───────────────────────── Turborepo ─────────────────────────┐
  staff  ───────►│  apps/web          apps/onboarding      apps/vendor-portal   │◄──── vendors
                 │  (MDM admin)       (invite wizard)      (approved vendors)   │
                 │      │ approves ──────── handoff ──────────►│               │
                 │      │◄──────────── reviews submissions ────┤               │
                 │      └──────── packages/db · packages/ui ───┘               │
                 └──────────────────────────┬──────────────────────────────────┘
                                            ▼
                                   PostgreSQL (shared)`}</Diagram>
        <NumberedCards
          items={[
            { title: "Different threat models", body: "The vendor portal faces the open internet; the admin console doesn't need to. Separate deploys keep a vendor-side issue away from internal tooling." },
            { title: "Separate auth, no branching", body: "Staff and vendors use different session models, so neither app's middleware has to ask “which kind of user is this?”" },
            { title: "Independent scaling", body: "400 vendors syncing catalogs at 9am shouldn't queue behind internal admin work." },
          ]}
        />
        <Figure src="/images/mdm/v2/admin-dashboard.png" alt="MDM admin dashboard: counts of stores, vendors, products and inventory records, plus store-vendor relationships and product availability" caption="apps/web — the MDM admin console on SagUI’s AppShell, against a seeded data set." width={2160} height={1350} />
        <Figure src="/images/mdm/v2/admin-invite.png" alt="Vendor invitations screen: a form to send a single-use, 14-day onboarding link" caption="apps/web — an admin sends a single-use, 14-day invite. This is where the vendor journey begins." width={2160} height={1350} />
        <H3>The staging-and-approval pattern</H3>
        <Prose>
          <p>
            The single most important decision: <b>nothing a vendor submits touches master data directly.</b> Every
            vendor-initiated change lands in a staging table with a status. An admin acts on it. Only then does a promotion step
            write to the real tables. Orders are the deliberate exception — fast and reversible enough to write straight into
            their own state machine.
          </p>
        </Prose>
        <Table
          head={["Vendor action", "Staging table", "On approval"]}
          rows={[
            ["Edits profile", "vendor_edit_requests", "Updates vendors"],
            ["Submits a new product", "product_submissions + line items", "Inserts into products, assigns MDM SKU"],
            ["Edits an existing product", "product_edit_requests", "Updates products"],
          ]}
        />
        <Callout>
          This pattern isn&rsquo;t incidental architecture — it <span className="text-inverse-accent">is</span> the product.
          Everything else is UI wrapped around one guarantee: master data stays trustworthy however much self-service the front
          end offers.
        </Callout>
        <H3>Stack decisions</H3>
        <Ledger
          rows={[
            { label: "Plain SQL via pg", text: "Prisma was ruled out — cross-table analytics needed hand-tunable SQL its abstraction fought against." },
            { label: "Magic-link auth", text: "No passwords for vendors in v1 — removes a whole class of credential UX; scoped, signed, httpOnly sessions kept separate from staff auth." },
            { label: "SagUI", text: "One component library and token set for all three apps, with rules AI agents follow when they build screens." },
            { label: "Hashed invite tokens", text: "Invite tokens are stored only as hashes; the raw link is shown once, at creation." },
          ]}
        />
      </CsSection>

      <CsSection id="design-system" title="Rebuilt on SagUI">
        <Prose>
          <p>
            The first version sat on shadcn/ui with its own small kit. I&rsquo;ve since rebuilt all three apps on{" "}
            <a href="/work/sagui" className="font-medium">SagUI →</a>, my design system for people and AI agents. Every screen
            on this page is SagUI: the AppShell and sidebar, page headings, metric cards, data tables, the stepper, chips and
            badges.
          </p>
          <p>
            That changed how the product gets built. The repo carries SagUI&rsquo;s rules for AI agents, and agents check the
            SagUI MCP server before they write UI — so new screens come out on-system without a design pass. The design effort
            stays where it belongs: on the workflow.
          </p>
        </Prose>
        <Ledger
          labelWidth="180px"
          rows={[
            { label: "One shell, three apps", text: "Admin, onboarding and vendor portal share the same AppShell, tokens and components from @sagui/ui." },
            { label: "Tokens only", text: "Semantic colors, radius roles and elevation levels — no hard-coded values in app code." },
            { label: "Agent-ready repo", text: "AGENTS.md rules plus search → get → validate through the SagUI MCP server." },
            { label: "Docs in the monorepo", text: "SagUI docs and Storybook live alongside the three apps." },
          ]}
        />
        <Figure src="/images/mdm/v2/admin-products.png" alt="MDM admin products table with SKUs, categories, vendors and status badges" caption="apps/web — the product master, built from SagUI’s data table, filters and badges." width={2160} height={1350} />
      </CsSection>

      <CsSection id="onboarding" title="Vendor onboarding">
        <Prose>
          <p>
            Vendor onboarding is a form problem and a trust problem at once: you&rsquo;re asking a business for sensitive
            information before it has received any value back. Seven principles drove every decision:
          </p>
        </Prose>
        <NumberedCards
          min="240px"
          items={[
            { title: "Progressive disclosure", body: "Never one 40-field form — steps small enough to feel manageable." },
            { title: "Ask only when needed", body: "Compliance documents come after categories, so vendors see only what applies." },
            { title: "Save and resume", body: "Every step autosaves; losing progress is the fastest way to lose a vendor." },
            { title: "Validate inline, early", body: "Catch a malformed EIN on blur, not at final submit." },
            { title: "Say what happens next", body: "A visible stepper and honest review timelines cut anxiety and support load." },
            { title: "Smart defaults", body: "The invite pre-fills the email; the primary category pre-selects what they supply." },
            { title: "Two-sided by design", body: "The admin review queue got as much design attention as the vendor wizard.", highlight: true },
          ]}
        />
        <H3>Eight steps, ordered on purpose</H3>
        <Table
          head={["Step", "Collects", "Why here"]}
          rows={[
            ["1 Company", "Legal name, DBA, tax ID, primary category", "Lowest friction; lets the system dedupe against existing vendors"],
            ["2 Contact", "Primary contact person", "Still low-sensitivity"],
            ["3 Address", "Business location", "Validated inline (5-digit ZIP)"],
            ["4 Payment", "Payment terms, minimum order", "Commercial context before compliance"],
            ["5 Categories", "Product categories supplied", "Drives every downstream conditional requirement"],
            ["6 Documents", "Compliance uploads", "Category-aware: only what applies"],
            ["7 Review", "Everything, one page", "A last check before committing"],
            ["8 Submit", "Send for approval", "One clear commit point"],
          ]}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
          <Figure src="/images/mdm/v2/onboarding-company.png" alt="Onboarding step 1 of 8, Company: legal name, DBA, tax ID and primary category, with the eight-step progress list" caption="apps/onboarding — step 1, with all eight steps visible up front." width={2160} height={1350} />
          <Figure src="/images/mdm/v2/onboarding-categories.png" alt="Onboarding step 5 of 8, Categories: checkboxes for the product categories a vendor supplies, with earlier steps ticked" caption="Step 5 — categories decide which documents and products come next." width={2160} height={1350} />
        </div>
        <H3>A status machine with a third answer</H3>
        <Diagram>{`draft ─submit─▶ submitted ─assign─▶ under_review
                                        │
                  ┌─────────────────────┼─────────────────────┐
                  ▼                     ▼                     ▼
             needs_info              approved              rejected
                  │                     │
                  └─resubmit─▶ under_review     ▶ promoted into live vendors`}</Diagram>
        <Prose>
          <p>
            <b>needs_info</b> is the key UX decision. Instead of a binary approve/reject, reviewers request changes to specific
            fields, and the vendor gets a targeted, resumable edit — not a full resubmission. It converts what would be a lost
            vendor (hard reject) or a data-integrity risk (soft approve) into a fix.
          </p>
        </Prose>
        <Figure src="/images/mdm/v2/admin-applications.png" alt="Vendor applications queue with status filters: all, submitted, under review, needs info, approved, rejected" caption="apps/web — the review queue, filtered by every state in the machine." width={2160} height={1350} />
        <Figure src="/images/mdm/v2/admin-application-review.png" alt="Application review for Lone Star Brewing Co. with contact, address, terms and categories, and Approve, Needs info and Reject actions" caption="The review side: approve, ask for targeted info, or reject. Data shown is a test application." width={2160} height={1350} />
        <H3>Products, once a vendor is live</H3>
        <NumberedCards
          items={[
            { title: "Bulk Excel upload", body: "For full catalogs. Templates are personalised per vendor with their approved categories; errors are fixed inline in a preview table instead of forcing a re-upload." },
            { title: "Barcode", body: "For the single new item, looked up against barcode databases so most fields fill themselves." },
            { title: "Manual entry", body: "The fallback for products with no barcode match or fields automation can't fill." },
          ]}
        />
        <Figure src="/images/mdm/v2/portal-add-products.png" alt="Vendor portal Add products page: approved categories notice and Bulk upload, Barcode and Manual tabs" caption="apps/vendor-portal — three entry paths into one draft packet, limited to approved categories." width={2160} height={1350} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
          <Figure src="/images/mdm/v2/portal-dashboard.png" alt="Vendor portal dashboard: live products, draft packet and settings" caption="An approved vendor’s dashboard, scoped to their own data." width={2160} height={1350} />
          <Figure src="/images/mdm/v2/portal-products.png" alt="Vendor portal product catalog with SKUs, categories, wholesale prices and status" caption="Their live catalog. New items go into a draft packet, then MDM review." width={2160} height={1350} />
        </div>
      </CsSection>

      <CsSection id="journeys" title="Two journeys, one trust boundary">
        <Prose>
          <p>
            Onboarding reads as one flow, but it&rsquo;s two: a vendor moving into self-service, and an admin protecting master
            data at the same moments. Mapping both side by side is what surfaces the core insight — self-service and data
            integrity were designed together, stage by stage.
          </p>
        </Prose>
        <Figure src="/images/mdm/user-journey-map.png" alt="User journey map with vendor and admin journeys side by side, showing stages, emotion curves, actions and pain points" caption="Vendor and admin journeys mapped stage by stage, with emotion curves and pain points." width={3520} height={2813} />
        <Table
          head={["Vendor stage", "Feeling", "Matching admin stage", "Design response"]}
          rows={[
            ["Invited", "Cautious", "Source & invite", "Low-sensitivity profile step first"],
            ["Onboarding", "Effortful, guided", "Review application", "Category-conditional docs: reviewers see only what applies"],
            ["Awaiting review", "Anxious, in limbo", "Decide", "needs_info: fix only the flagged fields"],
            ["Approved", "Relieved", "Manage live vendor", "Staged edits, batched notifications"],
            ["Ongoing use", "Settled", "Ongoing oversight", "Same staging gate for every edit and product"],
          ]}
        />
        <Ledger
          rows={[
            { label: "Asymmetric low points", text: "The vendor's worst moment is the wait; the admin's is the review queue one stage earlier. The progress stepper and batched, category-conditional queues were designed as a pair." },
            { label: "needs_info at the hinge", text: "It answers the vendor's worst stage and the admin's decision in the same beat." },
            { label: "Trust changes shape", text: "At approval the relationship shifts from “prove you're legitimate” to “run your business here” — gatekeeping becomes enabling on both sides." },
          ]}
        />
      </CsSection>

      <CsSection id="ai" title="How AI fit into the work">
        <Prose>
          <p>
            I used Claude in two modes of roughly equal weight: as a thinking partner to pressure-test decisions, and as an
            accelerant to turn agreed specs into schemas and code.
          </p>
        </Prose>
        <SplitLists
          left={{
            title: "Thinking partner",
            items: [
              "Scoping: magic-link only, images and multi-seat deferred — with second-order effects surfaced first",
              "Domain modeling that led to the staging-and-approval pattern",
              "Asked to argue for alternative step orders so I could stress-test my own",
            ],
          }}
          right={{
            title: "Engineering accelerant",
            items: [
              "SQL schemas drafted straight from the UX flows, keeping data and steps in lockstep",
              "Grounded in the real repo, not a hypothetical one",
              "Specs kept as versioned markdown documents, edited surgically rather than regenerated",
              "The SagUI rebuild done with agents following SagUI's own rules and MCP server",
            ],
          }}
        />
        <Callout>
          Every architectural call, scoping tradeoff and sequencing decision was mine. AI compressed the distance between a
          decision and a build-ready artifact; it didn&rsquo;t make the <span className="text-inverse-accent">decisions.</span>
        </Callout>
      </CsSection>

      <CsSection id="status" title="Where it stands">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {[
            { t: "Working", i: ["Admin console: dashboard, stores, vendors, products, inventory, search", "Invite → 8-step onboarding → review queue → approve / needs info / reject", "Vendor portal: magic-link sign-in, catalog, add products by bulk, barcode or hand", "Vendor submissions queue in the admin console", "All three apps rebuilt on SagUI"] },
            { t: "Deferred", i: ["Product images", "Multi-seat vendor accounts", "Self-service category expansion", "AI copilot UI"] },
          ].map((c) => (
            <div key={c.t} className="flex flex-col gap-3 border border-ink bg-surface p-6">
              <h3 className="font-mono text-label">{c.t.toUpperCase()}</h3>
              <ul className="list-disc pl-5 text-small">{c.i.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </CsSection>

      <NextCase href="/work/sales-analytics" label="BUILT ON SAGUI" title="Sales Analytics" />
    </>
  );
}
