# MDM: User Journey Maps

Two sides of the same system, mapped stage by stage: the **vendor** moving through onboarding into ongoing self-service, and the **MDM admin** who reviews, approves, and protects master data at every one of those same moments. Every vendor-facing stage below has a matching admin-facing stage — that pairing is the core design insight behind the whole product: self-service and data integrity are designed together, not bolted on afterward.

---

## Vendor journey

| | Invited | Onboarding | Awaiting review | Approved, first login | Ongoing use |
|---|---|---|---|---|---|
| **Actions** | Opens a magic-link invite email, clicks through | Completes 8 steps: profile, contacts, addresses, categories, terms, compliance, banking, review | Waits; if flagged, edits only the requested fields and resubmits | Gets an approval email, signs into the vendor portal for the first time | Uploads catalog (bulk / barcode / manual), manages orders, edits profile as needed |
| **Thinking** | "Is this legitimate? What will they ask for?" | "How long is this? Is my banking data safe here?" | "Did I miss something? When will I hear back?" | "Good — now what can I actually do here?" | "Is my order status right? How fast do edits get approved?" |
| **Emotion** | Cautious | Effortful, but guided | Anxious, in limbo | Relieved | Settled, routine |
| **Pain point** | No preview of what onboarding will require | Compliance and banking steps feel high-stakes | No visibility into where the application sits | Unfamiliar portal, no onboarding tour | Waiting on staging approval for every edit |
| **Design response** | — | Progressive disclosure across 8 short steps; autosave draft at every step | Explicit `needs_info` state lets a vendor fix only the flagged fields, not restart | — | `needs_info`-style targeted review keeps edits fast without skipping the approval gate |

**Key transition points:**
- **Invited → Onboarding**: the moment trust is being built for the first time. Company profile (low-sensitivity) comes first specifically to keep early friction low.
- **Onboarding → Awaiting review**: the anxiety point. This is where a visible progress/status indicator and honest review-timeline expectations do the most work to reduce support inquiries.
- **Approved → Ongoing use**: the relationship shifts from "prove you're legitimate" to "run your business here." The portal's job changes from gatekeeping to enabling.

---

## MDM admin journey

| | Source & invite | Review application | Decide | Manage live vendor | Ongoing oversight |
|---|---|---|---|---|---|
| **Actions** | Identifies vendor need, sends a scoped magic-link invite | Works the review queue: checks profile, category-specific compliance docs, banking token | Approves, requests targeted info on specific fields, or rejects | Reviews staged profile edits and product submissions before they touch master data | Monitors order lifecycle, catalog health, and vendor performance across the base |
| **Thinking** | "Is this vendor a fit for the categories we need?" | "Is everything here complete and legitimate?" | "What's missing, and is it worth a back-and-forth?" | "Does this change put master data at risk?" | "Is this vendor relationship healthy at scale?" |
| **Emotion** | Transactional | Scrutinizing | Decisive | Vigilant | Strategic |
| **Pain point** | No pre-vetting before the invite goes out | Application volume vs. time available to review manually | A binary reject loses a vendor a targeted fix could have saved | Queue noise if edits aren't batched sensibly | Limited cross-vendor visibility as the base scales |
| **Design response** | — | Category-conditional compliance requirements mean the reviewer only sees documents relevant to what the vendor actually supplies | The explicit `needs_info` state exists specifically to avoid the false binary of approve/reject | Batched notifications — one email per admin decision regardless of item count — keep the queue from becoming noise | — |

**Key transition points:**
- **Review application → Decide**: this is where the `needs_info` state pays for itself — it converts what would otherwise be a lost vendor (hard reject) or a data-integrity risk (soft approve) into a resumable, targeted fix.
- **Decide → Manage live vendor**: the moment the system's core guarantee kicks in — nothing the vendor submits from here forward touches master data directly. Every edit and every new product still passes through the same staging gate that governed onboarding itself.
- **Manage live vendor → Ongoing oversight**: as vendor count grows, the admin's job shifts from item-by-item review to pattern-level monitoring — the queue design and batching decisions made early are what keep this stage from becoming unmanageable.

---

## Why these two journeys matter together

The vendor journey and the admin journey aren't separate flows that happen to share a database — they're the same system viewed from two sides of the same trust boundary. Every vendor-facing convenience (self-service catalog upload, direct order writes, fast-tracked resubmission) has a corresponding admin-facing safeguard (staging tables, category-conditional validation, the `needs_info` state) designed at the same time, not added afterward as a patch. That pairing — visible when the two journeys are read side by side — is the clearest evidence of the staging-and-approval architecture actually working as a design principle, not just a database pattern.
