import type { Metadata } from "next";
import { Collage } from "@/components/collage";
import { FlowPlayer, type FlowStep } from "@/components/flow-player";
import {
  CsIntro, CsSection, Prose, H3, NumberedCards, Figure, Callout, Ledger, Table, Diagram, SplitLists, NextCase,
} from "@/components/case-study";
import { projects } from "@/content/site";

export const metadata: Metadata = { title: "Carmelo’s — online ordering for a family Mexican grill · Sagnik Dey" };

const cm = projects.find((p) => p.slug === "carmelos")!;
const I = "/images/carmelos/";
const F = "/images/carmelos/proto/";

const flow: FlowStep[] = [
  { src: `${F}01-home.jpg`, alt: "Homepage on a phone: hero photo, open-now status and a red Order pickup button", title: "Land on the homepage", note: "Order pickup is the one red action on the page.", tap: { x: 195, y: 510 } },
  { src: `${F}02-menu.jpg`, alt: "Menu page on a phone opening on the Popular row", title: "The menu opens on Popular", note: "Search lives in the sticky bar, so the first dish shows above the fold.", tap: null },
  { src: `${F}03-burritos.jpg`, alt: "Burritos carousel with the Famous burrito card and its Our famous badge", title: "Swipe to Burritos", note: "Each category is a carousel of photo-led cards with the price on the photo.", tap: { x: 255, y: 326 } },
  { src: `${F}04-item.jpg`, alt: "Famous burrito sheet with the required filling choice", title: "Choose a filling", note: "Required groups say so up front: “Required · Choose 1”.", tap: { x: 180, y: 662 } },
  { src: `${F}05-item-options.jpg`, alt: "Optional add-ons: chile con queso, meat gravy, extra meat with prices", title: "Make it mojado", note: "Add-ons are the restaurant’s own, priced from the CMS.", tap: { x: 187, y: 510 } },
  { src: `${F}06-item-add.jpg`, alt: "Add to bag bar with the live price", title: "Add to bag", note: "The button carries the price, updated with every choice.", tap: { x: 253, y: 802 } },
  { src: `${F}07-added.jpg`, alt: "Menu with a confirmation toast and a View bag bar", title: "Confirmed, without leaving the menu", note: "A toast confirms; a bag bar appears with the running total.", tap: { x: 195, y: 802 } },
  { src: `${F}08-bag.jpg`, alt: "Bag sheet with the burrito, its options, tax and an estimated total", title: "Review the bag", note: "Options are listed under each item; tax is estimated before checkout.", tap: { x: 195, y: 760 } },
  { src: `${F}09-checkout.jpg`, alt: "Checkout with guest details filled in", title: "Check out as a guest", note: "No account needed. Sign-in is offered, never forced.", tap: null },
  { src: `${F}10-checkout-pay.jpg`, alt: "Payment, tip and the Place order button with the total", title: "Tip and place the order", note: "The card is authorised now and charged only when the kitchen accepts.", tap: { x: 195, y: 784 } },
  { src: `${F}11-status.jpg`, alt: "Order confirmation: order number, ready-around time and progress steps", title: "It’s on the grill", note: "A ready time, live status and where to pick it up.", tap: null },
];

export default function CarmelosCaseStudy() {
  return (
    <>
      <CsIntro
        tag={{ label: "Concept · Real client", variant: "outline" }}
        title="Carmelo’s: from phone-only to"
        accent="ordering online."
        lead={
          <p>
            Carmelo&rsquo;s Mexican Grill in Sugar Land, Texas has loyal regulars and a website that can&rsquo;t take an
            order. I designed and built a first-party ordering site, a menu the restaurant runs itself, and a staff app for
            the kitchen &mdash; as a working concept to pitch to the owners.
          </p>
        }
        spec={[
          { label: "ROLE", value: "Designer, product manager and developer (solo)" },
          { label: "CLIENT", value: "Carmelo’s Mexican Grill, Sugar Land TX — concept for a pitch" },
          { label: "STACK", value: "Next.js 15 · Payload 3 CMS · Postgres · Stripe · Tailwind v4 · Vercel" },
          {
            label: "LINKS",
            value: (
              <span className="flex flex-wrap gap-4">
                <a href="https://carmello-three.vercel.app/" target="_blank" rel="noopener noreferrer">Live concept ↗</a>
                <a href="https://www.figma.com/design/5lJjON6iQ2HaZzBrRdeEU3/" target="_blank" rel="noopener noreferrer">Figma ↗</a>
                <a href="https://carmelosmexicangrill.com/" target="_blank" rel="noopener noreferrer">Current site ↗</a>
              </span>
            ),
          },
        ]}
        proof={[
          { value: "4.8", label: "Google rating from 1,976 reviews" },
          { value: "0", label: "Ways to order on the current site" },
          { value: "141", label: "Dishes across 15 categories, run from the CMS" },
          { value: "2", label: "Heuristic reviews, each driving a redesign" },
        ]}
      />

      <section aria-label="Cover" className="container-page pt-12">
        <div className="group border border-ink">
          <Collage images={cm.images} className="h-[460px] md:h-[600px]" caption="PHONE → MENU → BAG → PICKUP" />
        </div>
      </section>

      <CsSection id="why" title="Why we’re doing this">
        <Prose>
          <p>
            Carmelo&rsquo;s is a family restaurant with a following: <b>4.8 stars from 1,976 Google reviews</b>, with
            reviewers singling out the fajitas, the burritos and the fact that it&rsquo;s family owned. People already want
            the food. What they can&rsquo;t do is order it the way they order everything else.
          </p>
          <p>
            Today the restaurant&rsquo;s own website is a brochure. To get food to go, you call the store, walk in, or use a
            third-party delivery app that takes a cut of every order and owns the customer relationship. The goal is simple:
            give Carmelo&rsquo;s its own front door for orders, one the family controls.
          </p>
        </Prose>
      </CsSection>

      <CsSection id="problem" title="The problem">
        <Prose>
          <p>
            Customers find the website, then hit a dead end. There&rsquo;s no way to order, and the menu isn&rsquo;t a
            reliable source of truth.
          </p>
        </Prose>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-4">
          <Figure src={`${I}before-desktop.jpg`} width={1800} height={1125} alt="Current Carmelo’s homepage: a photo carousel and links to Dinner, Lunch, Breakfast, Kids and Family Packs menus, with no order button" caption="BEFORE · HOMEPAGE — NO WAY TO ORDER" />
          <Figure src={`${I}before-menu.jpg`} width={1800} height={1125} alt="Current dinner menu page listing burritos with prices shown as a bare dollar sign" caption="BEFORE · DINNER MENU — PRICES SHOW AS “$.”" />
        </div>
        <NumberedCards
          min="260px"
          items={[
            { title: "No online ordering", body: "Every to-go order is a phone call or a walk-in. Customers who won’t call go to a delivery app or go elsewhere." },
            { title: "A menu you can’t trust", body: "Prices show as “$.” on the live menu. Dishes listed online sometimes don’t exist, and add-ons get swapped for something else." },
            { title: "Orders that depend on hearing right", body: "Modifiers — no onions, extra queso, mojado — are taken by ear during the rush, when mistakes are most likely." },
            { title: "Margin and customers lost to apps", body: "Third-party apps take a commission on each order and keep the customer’s details, not the restaurant.", highlight: true },
          ]}
        />
        <Callout>The website brings people to the door, then gives them nothing to do but pick up the phone.</Callout>
      </CsSection>

      <CsSection id="who" title="Who it’s for">
        <Prose>
          <p>I wrote the PRD around five people &mdash; three customers and the two people who run the store.</p>
        </Prose>
        <Ledger
          labelWidth="240px"
          rows={[
            { label: "Lunch-break Luis", text: "Orders on his phone during a 30–45 minute break. Wants a two-tap reorder and an accurate pickup time." },
            { label: "Family-dinner Fatima", text: "Feeds 4–6 with family packs and kids’ plates. Cares about modifiers (no onions, mild salsa) and the total." },
            { label: "Weekend-breakfast Brian", text: "Orders breakfast tacos for a group and wants them ready Saturday morning." },
            { label: "Kitchen staff", text: "Need orders with clear modifiers and pickup times, and a quick way to mark a dish sold out (“86 it”)." },
            { label: "Owner / manager", text: "Edits menu, prices and hours, pauses online ordering on a slammed night, and handles refunds." },
          ]}
        />
      </CsSection>

      <CsSection id="approach" title="How I approached it">
        <NumberedCards
          min="220px"
          items={[
            { title: "Understand", body: "Audited the current site and menu, wrote the PRD and an admin/CMS spec: personas, goals, scope, non-goals." },
            { title: "Structure", body: "Modelled the menu (categories, items, modifier groups, service windows) and the order lifecycle before any screen." },
            { title: "Design", body: "Figma frames for the storefront, then heuristic reviews of the built pages, fixed one issue at a time." },
            { title: "Systematize", body: "One token set and component library for the storefront; shadcn on the same tokens for the staff app.", highlight: true },
            { title: "Scale", body: "A CMS the family runs without me: menu, prices, hours, 86 board and refunds — and one location ready to become several." },
          ]}
        />
      </CsSection>

      <CsSection id="decisions" title="Deciding when the docs disagreed">
        <Prose>
          <p>
            The PRD was written before the visual design, so the two disagreed in places. I logged every conflict and
            settled it once, in the build plan, rather than letting it resurface screen by screen.
          </p>
        </Prose>
        <Table
          head={["Topic", "PRD said", "Design said", "Decision"]}
          rows={[
            ["Visual direction", "Chile red, rounded, Fraunces/Inter", "Ink and cream, square corners, Barlow Condensed + DM Sans", "Design system wins; the PRD’s look was a pre-design guess"],
            ["Data layer", "Prisma + Postgres", "Payload 3 on the same Postgres", "Payload owns menu, content and orders — one model, one admin"],
            ["Navigation", "Menu · Catering · Location", "Menu · Family packs · Location & hours · Gallery", "Figma — it matches how the restaurant already talks"],
            ["Menu layout", "Left category rail", "Sticky category bar over scrolling sections", "Sticky bar — works the same on a phone"],
            ["Special instructions", "140 characters", "200 characters", "140, confirmed — enough for a note, short enough to read on a ticket"],
          ]}
        />
      </CsSection>

      <CsSection id="cms" title="A menu the restaurant runs itself">
        <Prose>
          <p>
            The menu problem isn&rsquo;t a design problem; it&rsquo;s an ownership problem. Prices go stale and add-ons
            drift because nobody at the restaurant can edit the site. So the menu lives in <b>Payload CMS</b>, on the same
            Postgres database as the orders, and the storefront reads from it directly.
          </p>
        </Prose>
        <SplitLists
          left={{
            title: "What the CMS models",
            items: [
              "Categories with service windows — breakfast 7–11 daily, lunch specials 11–3 on weekdays",
              "Menu items with photos, dietary tags, price and a “from” flag when options change it",
              "Modifier groups: required or optional, min/max, priced add-ons (“Make it mojado”)",
              "Locations: hours, prep time and an online-ordering pause switch",
              "Orders, payments, refunds and an audit log of every change",
            ],
          }}
          right={{
            title: "Why it fixes the drift",
            items: [
              "One source of truth: the price on the card is the price at checkout, re-checked server-side",
              "Marking a dish sold out hides it everywhere in seconds — no stale listings",
              "Add-ons are data, not prose, so they can’t be quietly swapped",
              "Hours drive the storefront: the menu says when it’s closed and what’s next",
              "Built for one store, modelled for more without a migration",
            ],
          }}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-4">
          <Figure src={`${I}staff-cms-item-edit.jpg`} width={1800} height={1125} alt="Payload editor for Huevos revueltos with name, card label, description, category and price, plus tabs for photo, modifiers and availability" caption="PAYLOAD · EDITING A DISH" />
          <Figure src={`${I}staff-menu-table.jpg`} width={1800} height={1125} alt="Staff menu table listing dishes with category, price and availability for quick edits" caption="STAFF APP · QUICK PRICE AND AVAILABILITY EDITS" />
        </div>
        <Prose>
          <p>
            Because the current site is missing most prices, <b>91 of the 141 prices</b> in the concept are flagged in
            the CMS as placeholders to confirm with the owner, and the staff menu counts them. The flag is part of the pitch: the first job after a yes is a
            price pass with the family, in the same editor they&rsquo;ll use from then on.
          </p>
        </Prose>
        <Diagram>{`Payload CMS (menu · hours · 86 board)
        │
        ▼
Storefront ──▶ Bag ──▶ Checkout ──▶ Stripe (authorise only)
                                        │
                                        ▼
                          Order ──▶ Staff app: Live orders
                                        │  accept → capture payment
                                        ▼
                          Status page + SMS/email ──▶ Pickup`}</Diagram>
      </CsSection>

      <CsSection id="ordering" title="Ordering, end to end">
        <Prose>
          <p>
            The whole flow on a phone, from the homepage to a ready time. These are real screens from the working build,
            played in order. Pause it, or jump to any step.
          </p>
        </Prose>
        <FlowPlayer steps={flow} label="Prototype · pickup order on a phone" />
        <H3>Decisions that shaped the flow</H3>
        <Ledger
          labelWidth="240px"
          rows={[
            { label: "Guest checkout", text: "No account wall. After the order, guests can add a password to save their details for a one-tap reorder." },
            { label: "Authorise, then capture", text: "Stripe holds the amount when the order is placed and charges only when the kitchen accepts — so a declined order is never a refund." },
            { label: "Honest closed state", text: "When the store is closed the menu says so at the top and on every card (“Opens 7 am”), instead of letting someone customise a burrito first." },
            { label: "Price on the button", text: "The add button carries the running price, so options never surprise anyone at checkout." },
            { label: "Allergy route", text: "Allergy questions go to a phone call before ordering — the honest answer for a kitchen without a certified allergen process." },
          ]}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-4">
          <Figure src={`${I}item-desktop.jpg`} width={1800} height={1125} alt="Famous burrito detail on desktop with filling choices and prices" caption="ITEM · REQUIRED AND OPTIONAL CHOICES, PRICED" />
          <Figure src={`${I}checkout-desktop.jpg`} width={1574} height={1800} alt="Desktop checkout: details, pickup type and time, payment, tip and the order summary" caption="CHECKOUT · ONE PAGE, FIVE NUMBERED STEPS" />
        </div>
      </CsSection>

      <CsSection id="landing" title="Heuristic review: the landing page">
        <Prose>
          <p>
            Once the pages worked, I reviewed them against Nielsen&rsquo;s ten usability heuristics, with a second pass from an
            automated design detector. The landing page scored <b>25 of 36</b> (one heuristic didn&rsquo;t apply): acceptable,
            but it sold the restaurant better than it sold an order.
          </p>
        </Prose>
        <Table
          head={["Priority", "Finding", "Fix"]}
          rows={[
            ["P1", "One order button, only at the top; dish cards said “Explore…” and the page ended on the gallery", "Priced dish cards that open the dish, a closing order band, a sticky “Order pickup” bar on phones"],
            ["P1", "No signal colour: the order button and “View bag” were both ink, so nothing said “start here”", "A warm chile-red action colour used only for ordering, and a live open-now dot"],
            ["P2", "Featured cards had no price and two separate tap targets", "Price on every card, one target per card"],
            ["P2", "Every section used the same template, with filler “01–04” labels", "Dropped the numbering, one full-bleed photo moment, varied headline scale"],
            ["P2", "No pickup reassurance", "A three-item strip under the hero: ready time, where to pick up, how to pay"],
          ]}
        />
        <Figure src={`${I}home-desktop.jpg`} width={1800} height={1125} alt="Redesigned homepage: hero photo, open-now status, red Order pickup button and pickup reassurance" caption="AFTER · HOMEPAGE — ONE CLEAR ACTION" />
      </CsSection>

      <CsSection id="menu" title="Heuristic review: the menu">
        <Prose>
          <p>
            The menu is where people actually work, so I reviewed it as a tool, not a brochure. It scored{" "}
            <b>27 of 40</b>. The worst problems were about honesty and distance: the page said &ldquo;ASAP&rdquo; while
            the store was closed, and on a phone the first dish sat about 900px down.
          </p>
        </Prose>
        <Table
          head={["Priority", "Finding", "Fix"]}
          rows={[
            ["P1", "Closed state contradicted (an ASAP chip) and announced only after customising", "Closed note at the top and on each card; the sheet states the reason first"],
            ["P1", "Too much above the menu on phones", "A compact header with search inside the sticky bar; first dish above the fold"],
            ["P2", "15 categories in a strip with an icon-only “All” and no scroll cue", "Labelled “All 15 categories” button, edge fade, active tab kept in view"],
            ["P2", "Dietary info lossy: one tag per card, no allergen note", "All dietary tags on cards and in the sheet, allergy line at the top"],
            ["P3", "A generic sheet slogan; corn vs flour price buried in text", "Panel copy written from the menu itself"],
          ]}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-4">
          <Figure src={`${I}menu-desktop.jpg`} width={1800} height={1125} alt="Menu page on desktop: sticky category bar, filters and the Popular row" caption="AFTER · MENU — SEARCH, FILTERS, POPULAR" />
          <Figure src={`${I}menu-carousel.jpg`} width={1800} height={1125} alt="Burritos category shown as a carousel of photo-led cards with arrow buttons" caption="AFTER · EVERY CATEGORY A CAROUSEL" />
        </div>
      </CsSection>

      <CsSection id="cards" title="Three directions for the menu card">
        <Prose>
          <p>
            The card is the most repeated thing on the site &mdash; 141 of them &mdash; so I explored it properly. I built
            three directions side by side, in both vertical and horizontal layouts, using real dishes and real photos.
          </p>
        </Prose>
        <NumberedCards
          min="260px"
          items={[
            { kicker: "A", title: "Photo-led", body: "Big photo, the price painted on it like a menu-board tag, one red add button. The food does the selling.", highlight: true },
            { kicker: "B", title: "Menu board", body: "Name, dotted leader, price — reads like the board at the counter. Calm and distinctive, but the photo plays second." },
            { kicker: "C", title: "Compact", body: "Small square photo, one-line copy, the price is the add button. Fits the most dishes per screen." },
          ]}
        />
        <Figure src={`${I}card-study-top.jpg`} width={1600} height={2100} alt="Card study comparing the photo-led and menu-board card directions, vertical and horizontal" caption="STUDY · A PHOTO-LED VS B MENU BOARD, REAL DISHES" />
        <Prose>
          <p>
            <b>A won.</b> Carmelo&rsquo;s photos are its strongest asset, and on a phone the photo is what stops the thumb.
            I then moved categories from a two-column list to carousels of A cards, floated each dish&rsquo;s own label
            (&ldquo;Our famous&rdquo;, &ldquo;Named for a regular&rdquo;) onto the photo, and gave dishes without a photo a
            consistent placeholder tile so rows still line up.
          </p>
        </Prose>
      </CsSection>

      <CsSection id="colour" title="Colour that means “order”">
        <Prose>
          <p>
            The first build was ink on cream: tasteful, and silent. The review showed nothing signalled where to act. I
            warmed the background to masa &mdash; the colour of fresh tortillas &mdash; and gave every order action a single
            chile red, so red always means &ldquo;this moves your order forward.&rdquo; The staff app and the Stripe payment
            form use the same values.
          </p>
        </Prose>
        <Table
          head={["Role", "Token", "Value", "Used for"]}
          rows={[
            ["Page", "masa", "#f6eedf", "Storefront background"],
            ["Surface", "surface", "#fffcf6", "Cards, sheets, inputs"],
            ["Action", "chile", "#b5301b", "Every order button and selected control"],
            ["Action hover", "chile-deep", "#9c2814", "Hover and pressed states"],
            ["Text, secondary", "earth", "#6b5d4f", "Descriptions and captions"],
          ]}
        />
      </CsSection>

      <CsSection id="daypart" title="A homepage that knows what time it is">
        <Prose>
          <p>
            Carmelo&rsquo;s menu changes through the day: breakfast until 11, lunch specials on weekdays until 3, then
            fajitas and enchiladas into the evening. The homepage now shows the meal that&rsquo;s being served right now,
            straight from the store hours in the CMS &mdash; and when the store is closed, it previews the next meal and
            when it opens.
          </p>
        </Prose>
        <Figure src={`${I}daypart-study-top.jpg`} width={1600} height={2100} alt="Time-of-day section previewed at lunch, afternoon and evening, each with its own dishes and prices" caption="TIME OF DAY · LUNCH → AFTERNOON → TONIGHT" />
      </CsSection>

      <CsSection id="staff" title="The kitchen side">
        <Prose>
          <p>
            An order is only as good as the ticket the kitchen sees. The staff app, built on shadcn with the same tokens,
            gives the team a live orders board, an order queue with accept, ready and refund actions, an 86 board to mark
            dishes sold out, and a menu table for quick price and availability changes. Statuses are colour-coded so a busy
            cook can read the board at a glance.
          </p>
        </Prose>
        <Figure src={`${I}staff-live.jpg`} width={1800} height={1125} alt="Live orders board with New, Preparing, Ready and Picked up columns; each new ticket shows items, modifiers and accept buttons for +10, +15, +20 or +30 minutes" caption="LIVE ORDERS · ACCEPT WITH A READY TIME IN ONE TAP" />
        <Ledger
          labelWidth="240px"
          rows={[
            { label: "Accept sets the promise", text: "Accepting a ticket means picking +10, +15, +20 or +30 minutes. That becomes the customer’s ready time — and the moment the card is charged." },
            { label: "Nothing waits forever", text: "An order nobody accepts within 10 minutes cancels itself and the card hold is released, so a customer is never left wondering." },
            { label: "One trail per order", text: "Every order keeps a timeline (placed, accepted, ready, picked up, refunded) and its point-of-sale status." },
          ]}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-4">
          <Figure src={`${I}staff-order-detail.jpg`} width={1800} height={1125} alt="Order detail with items and modifiers, customer, payment status, POS confirmation and a timeline ending in an automatic cancellation" caption="ORDER DETAIL · PAYMENT, POS AND TIMELINE" />
          <Figure src={`${I}staff-eighty-six.jpg`} width={1800} height={1125} alt="86 board: every dish as a tile marked Available, grouped by category, with a search field" caption="86 BOARD · TAP A DISH TO MARK IT SOLD OUT" />
        </div>
        <Figure src={`${I}staff-dashboard.jpg`} width={1800} height={1125} alt="Staff dashboard showing today’s orders, sales, prep time, open tickets and the latest orders" caption="DASHBOARD · TODAY AT SUGAR LAND" />
      </CsSection>

      <CsSection id="next" title="What’s next">
        <Prose>
          <p>
            This is a working concept, not a launch. The next step is putting it in front of the owners, with the current
            site beside it.
          </p>
        </Prose>
        <SplitLists
          left={{
            title: "For the pitch",
            items: [
              "Walk the owners through ordering on their own phones",
              "Show the CMS: change a price, 86 a dish, pause ordering",
              "Agree what success looks like before any launch",
            ],
          }}
          right={{
            title: "Before launch",
            items: [
              "Live Stripe keys, email and text receipts",
              "Connect the real POS (the build uses a demo adapter)",
              "Pull Google reviews into the homepage",
              "Photograph the breakfast menu — most of it has no photos yet",
            ],
          }}
        />
      </CsSection>

      <NextCase href="/work/sagui" label="SYSTEM" title="SagUI" />
    </>
  );
}
