import Link from "next/link";
import type { Metadata } from "next";
import { CoverArt } from "@/components/cover-art";
import {
  CsIntro, CsSection, Prose, H3, NumberedCards, Figure, Callout, Ledger, Table, KitPanels, NextCase,
} from "@/components/case-study";
import { projects } from "@/content/site";

export const metadata: Metadata = { title: "Sales Analytics — from signal to action · Sagnik Dey" };

const sa = projects.find((p) => p.slug === "sales-analytics")!;
const K = "/images/sales-analytics/kit/";
const V = "/images/sales-analytics/v2/";

export default function SalesAnalyticsCaseStudy() {
  return (
    <>
      <CsIntro
        number="03"
        tag={{ label: "Built on SagUI", variant: "accent-outline" }}
        year="2026"
        title="Sales Analytics: from signal to"
        accent="action."
        lead={
          <p>
            A dashboard for a regional sales leader running 10 convenience stores. It finds the best and worst sellers,
            compares stores against target and watches stock — then turns what it finds into alerts with a recommended next
            step, and actions you can track to done.
          </p>
        }
        spec={[
          { label: "ROLE", value: "Product Designer & Design-Engineer (solo)" },
          { label: "STACK", value: "Next.js 16 · React 19 · TypeScript · SagUI · Vercel" },
          { label: "DATA", value: "MDM master data + two years of seeded daily sales" },
          {
            label: "LINKS",
            value: (
              <span className="flex flex-wrap gap-4">
                <a href="https://sales-analytics-delta-one.vercel.app/">Live demo ↗</a>
                <a href="https://github.com/sagnikdey/sales-analytics">GitHub ↗</a>
              </span>
            ),
          },
        ]}
        proof={[
          { value: "10", label: "Stores from MDM master data" },
          { value: "6", label: "Alert types, each with a next step" },
          { value: "730", label: "Days of seeded daily sales" },
          { value: "0", label: "New components — all SagUI" },
        ]}
      />

      <section aria-label="Cover" className="container-page pt-12">
        <div className="group border border-ink">
          <CoverArt src={sa.cover!.src} alt={sa.cover!.alt} className="h-[420px] md:h-[620px]" />
        </div>
      </section>

      <CsSection id="system" title="One system, three layers">
        <Prose>
          <p>
            Sales Analytics is the third piece of one system. Each layer does one job, and each makes the next one possible.
          </p>
        </Prose>
        <NumberedCards
          items={[
            { kicker: "DATA", title: "MDM", body: "Governs the master data — stores, vendors, categories, products — behind a staging-and-approval gate." },
            { kicker: "INTERFACE", title: "SagUI", body: "Provides every component, chart and token. Screens are assembled, not designed one by one." },
            { kicker: "DECISIONS", title: "Sales Analytics", body: "Consumes MDM's data, is built from SagUI, and turns sales signals into tracked actions.", highlight: true },
          ]}
        />
        <div className="flex flex-wrap gap-6 font-medium">
          <Link href="/work/mdm">MDM case study →</Link>
          <Link href="/work/sagui">SagUI case study →</Link>
        </div>
      </CsSection>

      <CsSection id="problem" title="The problem">
        <Prose>
          <p>
            A regional leader&rsquo;s day isn&rsquo;t short of numbers. It&rsquo;s short of decisions. Most retail dashboards
            answer &ldquo;what happened?&rdquo; with charts, then leave the leader to work out what to do, who to call, and
            whether anyone did it.
          </p>
        </Prose>
        <NumberedCards
          items={[
            { title: "What needs my attention today?", body: "Not every metric — the few things costing money right now." },
            { title: "What should I do about it?", body: "A specific, sensible next step, not just a red number." },
            { title: "Did it get done?", body: "A loop that closes, so the same problem doesn't quietly come back." },
          ]}
        />
      </CsSection>

      <CsSection id="mdm" title="Built on MDM’s master data">
        <Prose>
          <p>
            Sales Analytics doesn&rsquo;t invent its own stores and products. Its 10 stores, 10 vendors, 16 categories and 25
            products come from the same convenience-store data set the MDM platform governs — and that pays off in the details.
          </p>
        </Prose>
        <Ledger
          rows={[
            { label: "Alerts know who to call", text: "Each product carries its MDM vendor, so a stockout recommends “Reorder 900 units from Healthy Beverage Corp.” — not just “reorder”." },
            { label: "Stores know their manager", text: "A falling store recommends asking its named manager for a recovery plan." },
            { label: "Categories group the analysis", text: "The category map, product filters and margins all roll up the MDM category tree." },
          ]}
        />
        <Prose>
          <p>
            On top of that master data, a seeded generator builds two years of daily sales and a stock snapshot — 244
            store-product series × 730 days. The same seed always gives the same numbers, with planted scenarios so the product
            has a story to tell: an energy drink surging and out of stock at two stores, a salad in decline and overstocked, a
            store losing traffic, and the airport store as the busiest location.
          </p>
        </Prose>
        <Callout>
          MDM keeps the master data trustworthy. Sales Analytics shows what that data is <span className="text-inverse-accent">worth.</span>
        </Callout>
      </CsSection>

      <CsSection id="ia" title="Information architecture">
        <Prose>
          <p>
            Six areas, split into analysis and operations. Every analysis view shares one store filter and one period control
            (7 days, 30 days, 90 days, 12 months), and every metric is compared with the period before it.
          </p>
        </Prose>
        <Table
          head={["Area", "Job", "Key views"]}
          rows={[
            ["Dashboard", "Today at a glance", "Revenue, units, margin, open alerts; revenue trend vs. the previous period"],
            ["Products", "What sells and what doesn't", "Highest and lowest selling, biggest movers, category map; per-product detail"],
            ["Stores", "How each store tracks to target", "Progress-to-target gauges, revenue ranking; per-store detail"],
            ["Inventory", "Where stock is wrong", "Out of stock, below reorder point, overstocked, healthy"],
            ["Alerts", "What needs attention", "An inbox by severity and type, each with a recommended next step"],
            ["Actions", "What's being done", "Reorders, transfers, markdowns and follow-ups, with an activity timeline"],
          ]}
        />
        <Figure src={`${V}dashboard-light.png`} alt="Sales overview dashboard: revenue, units sold, gross margin and open alerts, with a revenue trend against the previous period" caption="Dashboard — today at a glance, every number against the period before." width={2160} height={1350} />
        <KitPanels
          items={[
            { src: `${K}sellers.jpg`, alt: "Best and worst sellers panel: ranked product table with revenue, units, change and margin", w: 1020, h: 755 },
            { src: `${K}store-targets.jpg`, alt: "Store targets panel: progress-to-target gauges for all 10 stores", w: 1020, h: 755 },
            { src: `${K}category-map.jpg`, alt: "Category map panel: treemap of revenue by category and product", w: 1020, h: 762 },
            { src: `${K}stock-health.jpg`, alt: "Stock health panel: out of stock, below reorder point, overstocked and healthy counts with a stock table", w: 1020, h: 813 },
            { src: `${K}product-detail.jpg`, alt: "Product detail panel: revenue, units and margin with a revenue trend", w: 1020, h: 820 },
            { src: `${K}inventory-health.jpg`, alt: "Inventory health panel in dark mode: waffle chart of healthy, low and out-of-stock lines", w: 1020, h: 912 },
          ]}
        />
      </CsSection>

      <CsSection id="loop" title="From signal to action">
        <Prose>
          <p>
            The core of the product is one loop: <b>signal → alert → recommended step → action → resolved.</b>
          </p>
        </Prose>
        <H3>Six alert types, each with a default answer</H3>
        <Table
          head={["Alert", "Raised when", "Recommended step"]}
          rows={[
            ["Stockout", "A product is at zero on the shelf", "Transfer from a store with surplus, else reorder from the vendor"],
            ["Low stock", "Below its reorder point", "Reorder back to the shelf maximum"],
            ["Overstock", "Far more cover than it needs", "Mark down 20% for two weeks, or transfer surplus"],
            ["Falling sales", "Sales dropping against the previous period", "A 15% promotion and a shelf review with the vendor"],
            ["Demand surge", "Sales climbing chain-wide", "A chain-wide order covering two weeks of new demand"],
            ["Store decline", "A store's revenue is down", "Ask the store manager for a recovery plan"],
          ]}
        />
        <Prose>
          <p>
            Alerts carry their cost in plain language — &ldquo;usually sells 30 units a day here, so every day out of stock loses
            about $99&rdquo; — so severity is something a leader can feel, not just a colour.
          </p>
        </Prose>
        <Figure src={`${V}alerts-light.png`} alt="Alert inbox: tabs for needs attention, action taken and resolved; filters by severity and type; a table of alerts with signals and status" caption="Alerts — triaged by severity and type, with tabs for every state an alert can be in." width={2160} height={1350} />
        <H3>One click from alert to action</H3>
        <KitPanels
          items={[
            { src: `${K}recommended-action.jpg`, alt: "Recommended action panel: an alert's evidence, store, product, vendor and the recommended next step", w: 1020, h: 942 },
            { src: `${K}take-action.jpg`, alt: "Take action panel: a pre-filled form with action type, store, product, quantity, due date, owner and note", w: 1020, h: 1142 },
            { src: `${K}action-tracker.jpg`, alt: "Action tracker panel: a table of actions with status and an activity timeline", w: 1020, h: 479 },
          ]}
        />
        <Ledger
          rows={[
            { label: "Evidence first", text: "An alert opens on the store, product, vendor and cost — then the recommended next step." },
            { label: "Pre-filled action", text: "Take action fills the type, store, product, quantity, due date, owner and note, so accepting the recommendation is one confirmation." },
            { label: "A loop that closes", text: "Creating an action marks the alert actioned; completing it resolves the alert. Nothing disappears just because someone looked at it." },
            { label: "Ready for an AI assistant", text: "Copy prompt hands the situation and recommendation to an AI assistant — to draft the vendor email or the note to a store manager." },
          ]}
        />
      </CsSection>

      <CsSection id="sagui" title="Built entirely on SagUI">
        <Prose>
          <p>
            Sales Analytics is the proof case for SagUI: a real, data-dense product assembled from the design system rather than
            designed screen by screen.
          </p>
        </Prose>
        <Ledger
          labelWidth="160px"
          rows={[
            { label: "Components", text: "App shell, metric cards, sortable data tables, tabs, chip groups, segmented controls, selects, number fields, dialogs, drawers, alerts, badges, toasts, timelines, empty states, skeletons." },
            { label: "Charts", text: "Line, bar, donut, gauge, treemap, slope, waffle and activity heatmap — SagUI's own charts." },
            { label: "Tokens", text: "Colour, type, radius and elevation from @sagui/tokens, so light and dark mode work everywhere." },
            { label: "Shared shell", text: "The same AppShell, sidebar and top bar as the MDM apps — two products that read as one family." },
          ]}
        />
        <Figure src={`${V}store-detail-dark.png`} alt="Store detail for Lubbock Tech Park in dark mode: revenue, units, margin and target metrics, revenue trend and inventory health" caption="Store detail in dark mode — the theme switches through SagUI tokens, with no app-level styling." width={2160} height={1350} />
      </CsSection>

      <CsSection id="demonstrates" title="What this demonstrates">
        <NumberedCards
          items={[
            { title: "Systems thinking across products", body: "Data, interface and decisions as three layers of one system, each doing one job." },
            { title: "Design for decisions, not displays", body: "Every alert ends in a next step, and every step can be tracked to done.", highlight: true },
            { title: "A design system earning its keep", body: "A six-area, data-dense product built without inventing a single new component." },
          ]}
        />
        <div className="flex flex-col gap-3 border-t border-ink pt-5 text-small md:flex-row md:gap-10">
          <span className="font-mono text-label">NEXT →</span>
          <span>A live feed from the MDM database</span>
          <span>Notify managers and vendors from an action</span>
          <span>Measure the loop: alert to action, actions done on time</span>
        </div>
      </CsSection>

      <NextCase href="/work/quickstop-ios" label="04 PRODUCT" title="QuickStop iOS" />
    </>
  );
}
