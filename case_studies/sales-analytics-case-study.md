# Sales Analytics: From Signal to Action

**Role:** Product Designer & Design-Engineer (solo)
**Timeline:** 2026
**Stack:** Next.js 16, React 19, TypeScript, SagUI (`@sagui/ui`, `@sagui/tokens`), Vercel
**Live demo:** [sales-analytics-delta-one.vercel.app](https://sales-analytics-delta-one.vercel.app/)
**Repo:** [github.com/sagnikdey/sales-analytics](https://github.com/sagnikdey/sales-analytics)

---

## TL;DR

Sales Analytics is a dashboard for a regional sales leader running 10 convenience stores in Texas. It shows the best and worst sellers, compares stores against target, watches stock health, and — the part most dashboards skip — turns what it finds into **alerts with a recommended next step, and actions you can track to done**.

It's the third piece of one system:

- **MDM** governs the master data — stores, vendors, categories, products.
- **SagUI** provides the interface — every screen is assembled from it.
- **Sales Analytics** consumes the first and is built entirely from the second.

---

## 1. The problem

A regional leader's day isn't short of numbers. It's short of decisions. Typical retail dashboards answer "what happened?" with charts, then leave the leader to work out what to do, who to call, and whether anyone did it.

Three questions drove the design:

1. **What needs my attention today?** Not every metric — the handful of things that are costing money right now.
2. **What should I do about it?** A specific, sensible next step, not just a red number.
3. **Did it get done?** A loop that closes, so the same problem doesn't resurface next week unnoticed.

---

## 2. Built on MDM's master data

Sales Analytics doesn't invent its own stores and products. Its master data — 10 stores, 10 vendors, 16 categories and 25 products — comes from the same convenience-store MDM data set the [MDM platform](/work/mdm) governs. That matters in three places:

- **Every alert knows who to call.** Because each product carries its MDM vendor, a stockout recommends "Reorder 900 units from Healthy Beverage Corp." — not just "reorder".
- **Every store knows its manager.** A falling store recommends asking its named manager for a recovery plan.
- **Categories group the analysis.** The category map, the product filters and the margins all roll up the MDM category tree.

On top of that master data, a seeded generator builds two years of daily sales and a stock snapshot (244 store-product series × 730 days). The same seed always gives the same numbers, with planted scenarios so the product has a story to tell:

- An energy drink surging chain-wide, and out of stock at two stores
- A salad in sharp decline, and overstocked
- A store losing traffic over the last quarter
- The airport store as the busiest location

MDM keeps the master data trustworthy; Sales Analytics shows what that data is worth.

---

## 3. Information architecture

Six areas, split into **analysis** and **operations**:

| Area | Job | Key views |
|---|---|---|
| Dashboard | Today at a glance | Revenue, units, margin, open alerts; revenue trend vs. the previous period |
| Products | What sells and what doesn't | Highest and lowest selling, biggest movers, category map; per-product detail |
| Stores | How each store tracks to target | Progress-to-target gauges, revenue ranking; per-store detail with inventory health |
| Inventory | Where stock is wrong | Out of stock, below reorder point, overstocked, healthy |
| Alerts | What needs attention | An inbox triaged by severity and type, each alert with a recommended next step |
| Actions | What's being done | A tracker of reorders, transfers, markdowns and follow-ups, with an activity timeline |

Every analysis view shares one store filter and one period control (7 days, 30 days, 90 days, 12 months), and every metric is compared with the period before it.

---

## 4. From signal to action

The core of the product is a loop: **signal → alert → recommended step → action → resolved.**

### 4.1 Six alert types, each with a default answer

| Alert | Raised when | Recommended step |
|---|---|---|
| Stockout | A product is at zero on the shelf | Transfer from a store with surplus, else reorder from the vendor |
| Low stock | Below its reorder point | Reorder back to the shelf maximum |
| Overstock | Far more cover than it needs | Mark down 20% for two weeks, or transfer surplus |
| Falling sales | Sales dropping against the previous period | A 15% promotion and a shelf-placement review with the vendor |
| Demand surge | Sales climbing chain-wide | A chain-wide order covering two weeks of the new demand |
| Store decline | A store's revenue is down | Ask the store manager for a recovery plan |

Alerts carry their cost in plain language ("usually sells 30 units a day here, so every day out of stock loses about $99"), so severity is something a leader can feel, not just a colour.

### 4.2 One click from alert to action

Opening an alert shows the evidence, the store, the product, the vendor and the recommended next step. **Take action** opens a pre-filled form — action type, store, product, quantity, due date, owner, note — so accepting the recommendation is one confirmation, and changing it is still easy.

Creating an action marks the alert as actioned. Completing the action resolves it. The alert inbox has tabs for exactly those states — *Needs attention*, *Action taken*, *Resolved* — so nothing disappears just because someone looked at it.

### 4.3 Ready for an AI assistant

Each alert and action form has **Copy prompt**: it copies the situation and the recommendation as a ready-made prompt for an AI assistant — to draft the vendor email, the transfer request or the note to a store manager.

---

## 5. Built entirely on SagUI

Sales Analytics is the proof case for [SagUI](/work/sagui): a real, data-heavy product assembled from the design system rather than designed screen by screen.

- **Components:** the app shell and navigation, metric cards, sortable data tables, tabs, chip groups, segmented controls, selects and multi-selects, number fields, dialogs, drawers, alerts, badges, toasts, timelines, empty states and skeletons — all from `@sagui/ui`.
- **Charts:** line, bar, donut, gauge, treemap, slope, waffle and activity heatmap — SagUI's chart components, morphing between periods instead of redrawing.
- **Tokens:** colours, type, radius and elevation come from `@sagui/tokens`, so light and dark mode work everywhere without app-level styling.
- **Shared shell with MDM:** the same AppShell, sidebar and top bar as the MDM apps — two products that read as one family.

SagUI is installed from packed tarballs in the repo, and upgrading is one pack-and-install step from the SagUI monorepo.

---

## 6. What this demonstrates

- **Systems thinking across products.** Master data (MDM), interface (SagUI) and analysis (Sales Analytics) as three layers of one system, each doing one job.
- **Design for decisions, not displays.** Every alert ends in a recommended step, and every step can be tracked to done.
- **A design system earning its keep.** A data-dense, six-area product built without inventing a single new component.

---

## What's next

- Move from seeded data to a live feed from the MDM database
- Notify store managers and vendors directly from an action
- Measure the loop: time from alert to action, and actions completed on time
