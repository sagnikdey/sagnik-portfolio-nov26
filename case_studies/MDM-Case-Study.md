# MDM: A Master Data Management Platform for Convenience Store Vendors

**Role:** Product Designer & Design-Engineer (solo)
**Status:** Admin console, invite-only onboarding and vendor portal running end to end; rebuilt on the SagUI design system
**Stack:** Next.js 16 (App Router), TypeScript, PostgreSQL (plain SQL via `pg`), SagUI (`@sagui/ui`), Turborepo, Vercel
**Repo:** [github.com/sagnikdey/mdm](https://github.com/sagnikdey/mdm)
**AI collaborator:** Claude (Anthropic), used throughout as an architecture partner, spec writer, and build accelerant

---

## TL;DR

MDM is a Master Data Management platform for convenience-store operators — the kind of system that sits underneath a company like 7-Eleven and governs a single source of truth for stores, vendors, products, and inventory. I designed and am building it solo, end to end: domain modeling, information architecture, UX flows, database schema, and application code.

What makes this project worth a case study isn't just the product — it's the *process*. I used Claude as a genuine design and engineering partner throughout: pressure-testing architectural decisions, co-writing detailed UX specifications before a line of code existed, and translating those specs into a working Next.js/Postgres implementation. This document walks through the problem, the system design, the vendor onboarding experience I specified in depth, and — because it's the part most case studies skip — exactly how and where AI fit into the work.

---

## 1. Problem Statement

### Where this came from

This project didn't start as a hypothetical. It started with an observation from an enterprise Master Data Management system I worked on earlier in my career — a real, in-production system for a large convenience-store operation — where I kept running into the same structural gap between how the system actually worked and how a system managing vendor and product data at that scale should work.

**What I found being done:**

1. **Products were created and set up entirely by MDM admins.** Vendors had no way to enter or maintain their own product data — every SKU, every attribute, every update went through an internal admin, by hand.
2. **Admins manually linked products to vendors after the fact.** The vendor relationship to a product was an administrative bookkeeping task, not a step in a vendor's own workflow.
3. **There was no vendor onboarding or categorization step at all.** Vendors weren't classified by what they supplied, which meant nothing downstream — compliance requirements, category-specific fields, permissions — could be conditioned on vendor type. Everyone was handled the same way, or handled ad hoc.
4. **There was no approval process for either vendors or products.** Data moved straight into production tables with no staging, no review gate, and no formal accept/reject/needs-more-info step — for either a new vendor relationship or a new product.
5. **"Design" effort was heavily weighted toward visual polish, not process.** A disproportionate amount of design attention went into how screens looked — layout, styling, visual consistency — while the actual broken piece, the underlying workflow and data-governance process, went largely unaddressed. The system was good-looking and structurally thin.

### What I believed it should look like instead

None of those five gaps are cosmetic — they're process gaps, and they compound. No onboarding means no categorization; no categorization means no conditional compliance; no approval gate means bad data has a straight, unguarded path into production. I formed a point of view on how this should actually work — vendors onboard and categorize themselves, every vendor- and product-facing change passes through an explicit approval step, and the "design" investment goes into the process and system that makes that trustworthy, not just the pixels on top of it.

I didn't just take that point of view on faith — I ran it by subject matter experts who'd worked the operational side of vendor and product management, walked through the gaps I'd identified and the process I thought should replace them, and got their buy-in that this was the right shape for the problem before I committed to building it.

### The MVP process flow I designed

1. **MDM admin sends out vendor invites** — replacing ad hoc, admin-created vendor records with a deliberate, invited, self-service relationship.
2. **MDM admin handles vendor and product approvals** — introducing the review gate that the original system never had, for both new vendors and new products.
3. **Vendor onboarding and product catalog self-service** — vendors categorize themselves at onboarding and maintain their own catalog going forward, instead of an admin doing it on their behalf.
4. **A robust design system to handle all "design" tasks** — so that visual consistency is infrastructure, produced once and reused, rather than the disproportionate, screen-by-screen effort I'd observed in the original system.

### Why I built this MVP

- **To showcase end-to-end project ownership** — the ability to spot a structural gap in a live enterprise system, form and validate a point of view on the fix with the people who'd actually feel it, and carry that all the way through architecture, UX, and a working build, solo.
- **To prove out a design system that absorbs the "design" workload properly** — so that the lesson from gap #5 gets applied, not just diagnosed: a real design system doing the visual-consistency work systematically, freeing the actual design effort to go where it belongs, on process and workflow.

I set out to design (and build) the system that solves this: a Turborepo monorepo with three purpose-built apps — the internal MDM admin console, a vendor onboarding wizard, and an ongoing-use vendor portal — all sharing one PostgreSQL source of truth.

---

## 2. System Architecture

Before any screen design happened, the domain had to be modeled correctly. I treated the architecture phase as a design problem in its own right: every structural decision below has direct UX consequences downstream.

### 2.1 Three apps, one database

```
                     ┌──────────────────────────────────────────────────────┐
                     │                    Turborepo                         │
                     ├──────────────────────────────────────────────────────┤
  app.company        │  apps/web         apps/onboarding   apps/vendor-portal│  vendors.company
  ───────────────►   │  (MDM/admin)      (invite wizard)   (approved vendor) │  ◄──────────────
                     │       │                 │                  │          │
                     │       │  approves       │                  │          │
                     │       │  application    │                  │          │
                     │       │       └─────────┴──── handoff ────►│          │
                     │       │  reviews vendor submissions ◄──────┤          │
                     │       └────────────────────┬───────────────┘          │
                     │             packages/db  (@workspace/db)              │
                     │             packages/ui  (@workspace/ui)              │
                     └──────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
                                          PostgreSQL (shared)
```

*(Two more apps, `apps/sagui-docs` and `apps/sagui-storybook`, sit alongside these three. They don't talk to Postgres or ship to vendors or staff — they document the SagUI design system the three apps are built on, covered in §3.)*

I made the call to split three separate applications rather than build one monolith with route groups, for reasons that are more product-strategy than engineering:

- **Different threat models.** The vendor portal faces the open internet; the internal MDM console doesn't need to. Splitting deploys means a vulnerability in the vendor-facing surface can't touch internal admin tooling.
- **Different auth surfaces, cleanly separated.** Staff use one auth system; vendors use a separate, scoped session model. Neither app's middleware has to branch on "which kind of user is this."
- **Independent scaling.** If 400 vendors hit "sync my catalog" at 9am, that traffic shouldn't queue behind internal admin usage.

**What this looks like, live** — all three apps are deployed and running against the shared database:

![MDM admin console — Dashboard showing store, vendor, product, and inventory counts for a live data set](../public/images/mdm/v2/admin-dashboard.png)
*`apps/web` — the internal MDM console. This is the "reviews vendor submissions" side of the diagram above.*

![Vendor invitations screen — a form to send a scoped, single-use 14-day invite link, with a table of recent invitations and their redemption status](../public/images/mdm/v2/admin-invite.png)
*`apps/web/admin/vendors/invite` — where the vendor journey in §4.5 actually begins: an admin sends the scoped, single-use invite.*

![Vendor portal dashboard — Artisan Bakery Partners' view showing live product count, draft packet status, and account settings](../public/images/mdm/v2/portal-dashboard.png)
*`apps/vendor-portal` — the "Ongoing Use" stage of the vendor journey: an approved vendor's own dashboard, scoped to just their data.*

### 2.2 The staging-and-approval pattern (the backbone of the whole system)

The single most important design decision in this project: **nothing a vendor submits touches master data directly.** Every vendor-initiated change — a profile edit, a new product, a product edit — lands in a staging table with a status field. An admin reviewer acts on it. Only then does a promotion step write into the real `vendors` or `products` tables.

```
   Vendor action                Staging table                  On approval →
   ─────────────                ─────────────                  ─────────────
   Edits profile        →   vendor_edit_requests    →   updates vendors table
   Submits new product   →   product_submissions      →   inserts into products,
                              + line items                 assigns MDM SKU
   Edits existing product →  product_edit_requests    →   updates products table
```

Orders are the deliberate exception — they move fast enough, and are reversible enough, that vendors write directly into an order state machine (`pending → confirmed → shipped → delivered`) rather than going through staging.

This pattern isn't incidental architecture — it *is* the product's value proposition. Everything else (the onboarding wizard, the portal, the review queues) is UI wrapped around this one guarantee: master data stays trustworthy no matter how much self-service the front end offers.

### 2.3 Stack decisions, and why

| Decision | Choice | Why |
|---|---|---|
| Data access | Plain SQL through `pg` | Prisma was evaluated and ruled out — the system's cross-table analytics queries (inventory rollups, vendor performance) needed hand-tunable SQL that Prisma's abstraction fought against |
| Auth (vendor-facing) | Magic-link only, no passwords | Removes a whole class of credential-management UX and support burden for a v1; sessions are scoped, signed, httpOnly cookies (via `jose`) kept entirely separate from staff auth |
| UI | SagUI (`@sagui/ui`, `@sagui/tokens`) | One component library and token set for all three apps, with always-on rules and an MCP server that AI agents use when they build screens |
| Deployment | Vercel, three separate projects | Matches the three-app split above; each app scales and deploys independently |
| Sensitive data | Hashes, never raw tokens | Invite tokens are stored only as hashes; the raw link is shown once, at creation |

---

## 3. Design System Approach: Rebuilt on SagUI

The first version of MDM sat on **shadcn/ui** with a small documented kit of its own (the Lamplight UI Kit). That was the pragmatic call at the start: a consistent, accessible baseline without hand-rolling a design system before the product had proven its shape.

I've since rebuilt all three apps on **[SagUI](https://sagui-docs.vercel.app/)**, my design system for people and AI agents. Every MDM screen now comes from `@sagui/ui`: the AppShell and sidebar, page headings, metric cards, data tables, the onboarding stepper, chips, badges and dialogs.

- **One shell, three apps.** The admin console, the onboarding wizard and the vendor portal share the same AppShell, tokens and components, so consistency is enforced structurally rather than by convention.
- **Tokens only.** App code uses semantic tokens — colors, radius roles, elevation levels — never hard-coded values, and light/dark switches at the token level.
- **An agent-ready repo.** The monorepo carries SagUI's always-on rules for AI agents (`packages/sagui-ui/AGENTS.md`), and agents check the SagUI MCP server (`search_components` → `get_component` → `validate_usage`) before writing UI. New screens come out on-system without a separate design pass.
- **Docs in the monorepo.** `apps/sagui-docs` and `apps/sagui-storybook` sit alongside the three product apps.

The result is that the lesson from gap #5 is applied, not just diagnosed: the design system absorbs the visual-consistency work, and the design effort goes where it belongs — on process and workflow. The actual UX decisions in this project are things like which fields appear on which onboarding step, how an inline error behaves, and how an upload preview shows mixed valid and invalid rows at a glance.

![MDM admin products table built from SagUI's data table, filters and badges](../public/images/mdm/v2/admin-products.png)

---

## 4. Vendor Onboarding: The Core UX Case Study

This is the most fully-specified part of the product, and the clearest example of UX thinking translated into an implementable spec. Vendor onboarding is, at its core, **a form problem and a trust problem simultaneously**: you're asking a business to hand over sensitive information before they've received any value back.

### 4.1 Seven principles that drove every decision

1. **Progressive disclosure** — never one 40-field form; break it into steps small enough that each screen feels manageable.
2. **Ask only what's needed, when it's needed** — compliance documents come after categories, so vendors only see what applies to them.
3. **Save and resume** — every step autosaves a draft; vendors abandon and return constantly, and losing progress is the single fastest way to lose a vendor relationship before it starts.
4. **Validate inline, early** — catch a malformed EIN or email the moment a field loses focus, not at final submit.
5. **Be transparent about what happens next** — a visible progress stepper and honest review-timeline expectations reduce support inquiries and anxiety.
6. **Smart defaults** — the invite pre-fills the vendor's email, and the primary category pre-selects what they supply.
7. **Two-sided by design** — the vendor-facing wizard is only half the product; the admin review queue on the other side needed equal design attention.

### 4.2 The flow, and why it's ordered this way

```
  Invite / Sign-in
        │
        ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  STEP 1  Company      legal name, DBA, tax ID, category    │
  │  STEP 2  Contact      primary contact person               │
  │  STEP 3  Address      business location                    │
  │  STEP 4  Payment      payment terms, minimum order         │
  │  STEP 5  Categories   product categories supplied          │
  │  STEP 6  Documents    compliance uploads                   │
  │  STEP 7  Review       verify the application               │
  │  STEP 8  Submit       send for approval                    │
  └─────────────────────────────────────────────────────────────┘
        │
        ▼
  Submitted → Under Review → (Needs Info ⟲) → Approved / Rejected
        │
        ▼
  Vendor record created in MDM
```

The sequencing is deliberate, not arbitrary:

- **Company profile first** — lowest-friction, highest-identity data, and it lets the system dedupe against existing vendors immediately (catching "Coca-Cola Inc." vs. "Coca Cola" before it pollutes master data).
- **Product categories mid-flow** — this single selection drives every downstream conditional requirement. A vendor who selects a food category is later required to provide FDA registration and a HACCP plan or SQF/BRC audit; a beverage-only vendor isn't. Making compliance *category-aware* rather than one-size-fits-all is what separates a purpose-built onboarding flow from a generic form.
- **Compliance documents last** — the highest-friction step goes where a vendor has already invested five steps of effort, and it can be limited to the documents their categories actually require.

### 4.3 The status state machine

Onboarding is modeled as an explicit state machine, which drives what the vendor sees, what a reviewer can do, and which side effects fire:

```
draft ──submit──▶ submitted ──assign──▶ under_review
                                            │
                        ┌───────────────────┼────────────────────┐
                        ▼                    ▼                    ▼
                   needs_info            approved             rejected
                        │                    │
                        └──resubmit──▶ under_review          (terminal)
                                             │
                                             ▼
                                    vendor promoted into
                                    the live vendors table
```

The `needs_info` state is worth calling out specifically as a UX decision: rather than a binary approve/reject, reviewers can request changes to *specific fields*, and the vendor gets a targeted, resumable edit experience rather than having to resubmit the entire application. This single state prevents a huge amount of rejection-and-restart friction that a simpler two-state model would have created.

### 4.4 Product onboarding, once a vendor is live

Once approved, vendors add products to their catalog through the vendor portal via three deliberately-ordered entry paths:

1. **Bulk Excel upload** — for initial catalog loading (a vendor bringing in a full SKU list) or periodic large additions. The download is *personalized per vendor*: the template includes a pre-populated "Allowed Values" sheet reflecting that specific vendor's approved categories, so a bakery vendor's template won't validate against a beverage vendor's rules.
2. **Barcode** — for the "just got one new item" case, looked up server-side against barcode databases (with a local cache) so most fields fill themselves.
3. **Manual entry** — the fallback for products with no barcode match or fields the automated paths can't populate.

The bulk-upload UX in particular required real design thought: the parser accepts unknown columns with a soft "we skipped these" notice rather than hard failure (handling vendors exporting from other systems with extra columns), silently skips empty trailing rows (an extremely common Excel artifact), and — critically — lets a vendor **fix validation errors inline in a preview table** rather than forcing a re-upload for something as small as a typo. That inline-fix capability was a specific push-back against a "just re-upload the file" default, because forcing a full re-upload cycle for one bad cell is a disproportionate amount of friction for the size of the error.

### 4.5 Journey Maps: Vendor and Admin, Side by Side

Everything above reads as a single flow, but it's really two: a vendor moving through onboarding into ongoing self-service, and an MDM admin who reviews, approves, and protects master data at every one of those same moments. Mapping both side by side — rather than just the vendor path — is what actually surfaces the design insight behind the whole product: self-service and data integrity were designed together, stage by stage, not bolted on afterward.

![MDM User Journey Map — vendor and admin journeys mapped stage by stage, with an emotion curve, key actions, and pain points for each](./assets/user-journey-map.png)

A few things the pairing makes visible that a single-sided map wouldn't:

- **The emotional low point isn't symmetric.** The vendor's steepest dip is *Awaiting Review* — anxious, in limbo, no visibility into where the application sits. The admin's low point is one stage earlier, at *Review Application* — scrutinizing, working a queue against limited time. The same transition that's an anxious wait for one side is a workload crunch for the other, and that mismatch is exactly why a visible progress stepper (vendor side) and batched, category-conditional queues (admin side) were designed as a pair, not independently.
- **The `needs_info` state sits at the hinge.** It's the design response to the vendor's worst stage (*Awaiting Review*) and the admin's *Decide* stage in the same beat — converting what would otherwise be a lost vendor (a hard reject) or a data-integrity risk (a soft approve) into a resumable, targeted fix on one side and a non-binary decision on the other.
- **Trust visibly changes shape at "Approved."** The vendor's emotional arc turns from cautious/anxious to relieved and settled right where the admin's turns from scrutinizing/deciding to vigilant and strategic — the relationship shifts from "prove you're legitimate" to "run your business here," and the product's job shifts from gatekeeping to enabling, on both sides at once.

The full stage-by-stage detail behind this map — thinking, emotion, pain point, and design response for every stage of both journeys — lives in `MDM-User-Journeys.md`, one of the standalone specification documents referenced in §6.2.

---

## 5. Domain-Aware Validation as a Design Discipline

A recurring theme across the product: validation rules aren't uniform — they're conditional on category, and encoding that correctly is as much a UX decision as a technical one. A few examples that shaped both the schema and the interface:

- Compliance documents required at onboarding are computed server-side from a vendor's selected product categories — a food-category vendor is asked for food-safety documentation; a general merchandise vendor isn't shown fields that don't apply to them.
- Product submission fields vary by category (pack hierarchy, physical attributes, regulatory fields) via category-conditional validation, so the manual-entry and bulk-upload paths never present fields irrelevant to what a vendor actually sells.
- Category constraints are enforced, not just suggested: a vendor can only submit products in categories selected during onboarding, surfaced proactively in the UI ("You're approved to submit products in: Beverages, Snacks, Candy") rather than discovered only after a rejected submission.

---

## 6. How AI Fit Into the Work

This section is deliberately explicit, because the *how* matters as much as the *what*. I used Claude throughout this project in two distinct modes, roughly equal in weight:

### 6.1 Claude as a design and product thinking partner

Before any specification document existed, the architecture and UX decisions above went through genuine back-and-forth with Claude — not as a content generator, but as a partner for pressure-testing tradeoffs:

- **Scoping calls.** Decisions like collapsing email+password auth down to magic-link-only, deferring product images to post-MVP, and shipping single-seat vendor accounts for v1 all came out of explicit "what's the minimum that's still trustworthy" conversations. Claude's role here was to surface the second-order consequences of each scoping choice (e.g., "if you defer multi-seat, what does that do to a vendor's ops team workflow?") so the tradeoffs were made with eyes open rather than skipped.
- **Domain modeling.** The staging/approval pattern — arguably the single most important architectural decision in the system — was arrived at through iterative conversation about what "master data integrity" actually requires structurally, not just as a principle.
- **UX sequencing decisions.** The reasoning behind onboarding step order (cheap/low-trust data first, sensitive/high-trust data last) and the three-entry-path ordering for product onboarding (bulk → barcode → manual) were developed collaboratively, with Claude asked directly to argue *for* alternative orderings so I could stress-test my own instinct before locking it in.

### 6.2 Claude as an engineering accelerant

Once decisions were locked, Claude was used to translate specification into implementation-ready detail and, increasingly, into code:

- **Spec-to-schema.** Full SQL schemas — tables, enums, relations — were drafted directly from the agreed UX flows, keeping the database model and the user-facing steps in lockstep rather than designed separately and reconciled later.
- **Repo-grounded work.** Rather than working from assumptions, I had Claude fetch and read the actual GitHub repository structure before making recommendations, so architectural advice stayed grounded in what genuinely existed in the codebase rather than a hypothetical version of it.
- **Discrete, versioned outputs.** Planning work was captured as standalone markdown specification documents (vendor portal architecture, product onboarding module, database implementation guide) rather than scattered chat history — each one a reference artifact the implementation phase could be built against directly.
- **Targeted iteration, not regeneration.** Corrections during the process were handled as precise, scoped edits to existing specs rather than full rewrites — the same discipline I'd want from any engineering collaborator, applied to AI-assisted work.

### 6.3 Where the line stayed human

Every architectural call, every scoping tradeoff, and every UX sequencing decision in this document was a decision I made — Claude's role was to generate options, argue the counter-case, and produce clean, implementation-ready output once a direction was set. The product judgment — what "trustworthy master data" requires, what a vendor will and won't tolerate in an onboarding flow, which corners are safe to cut for a v1 — stayed mine throughout. That division of labor is, I think, the honest and replicable way to describe "AI-assisted design work": AI compressed the distance between a decision and a build-ready artifact; it didn't make the decisions.

---

## 7. Current State & What's Next

**Working:**
- Admin console: dashboard, stores, vendors, products, inventory, search
- Invite → 8-step onboarding → review queue → approve / needs info / reject
- Vendor portal: magic-link sign-in, live catalog, add products by bulk upload, barcode or manual entry into a draft packet
- Vendor submissions queue in the admin console
- All three apps rebuilt on SagUI

**Deliberately deferred (post-MVP):**
- Product images
- Multi-seat vendor accounts
- Vendor self-service category expansion
- AI copilot / agent-native UI components (prompt bar, streaming responses)

---

## Why This Project

I took this on as a way to demonstrate a specific kind of design capability: the ability to own a B2B product from ambiguous problem statement through data modeling, UX architecture, and into implementation — the same end-to-end ownership I brought to the 7-UI Design System and data-heavy platforms at 7-Eleven's Global Solutions Center, but built solo and end-to-end, using AI collaboration deliberately and transparently rather than treating it as an implementation detail to gloss over.
