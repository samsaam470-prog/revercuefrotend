/**
 * Competitor pricing and third-party coverage.
 *
 * Prices change. Every figure here carries the date it was read and a link to
 * the vendor's own pricing page, so a stale number is a dated fact rather than
 * a broken claim. Update `PRICING_CHECKED` and the affected entry together.
 */

export const PRICING_CHECKED = "24 November 2026";

export interface CompetitorPrice {
  plan: string;
  price: string;
  note?: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface ArticleSummary {
  title: string;
  source: string;
  url: string;
  summary: string;
}

export interface CompetitorResearch {
  checkedOn: string;
  pricingSource: SourceLink;
  pricing: CompetitorPrice[];
  pricingNote: string;
  sources: SourceLink[];
  othersSay: {
    intro: string;
    summary: string;
    articles: ArticleSummary[];
  };
}

export const COMPETITOR_RESEARCH: Record<string, CompetitorResearch> = {
  bonsai: {
    checkedOn: "24 November 2026",
    pricingSource: { label: "Bonsai — official pricing page", url: "https://www.hellobonsai.com/pricing" },
    pricing: [
      { plan: "Basic", price: "$15/mo, or $9/mo billed yearly", note: "No invoicing on this tier" },
      { plan: "Essentials", price: "$25/mo, or $19/mo billed yearly", note: "Invoices, proposals, contracts, forms" },
      { plan: "Premium", price: "$39/mo, or $29/mo billed yearly", note: "Reporting, integrations, removes branding" },
      { plan: "Elite", price: "$59/mo, or $49/mo billed yearly", note: "Three-user minimum" },
    ],
    pricingNote:
      "Per user, per month, before tax and payment-processing fees. There is no free plan; a 7-day trial is offered. Bonsai's own help centre confirms the plan ladder and that add-ons (tax tools, extra team members) are priced separately.",
    sources: [
      { label: "Bonsai pricing (official)", url: "https://www.hellobonsai.com/pricing" },
      { label: "Bonsai help centre — pricing and subscription plans", url: "https://help.hellobonsai.com/en/articles/455542-bonsai-s-pricing-and-subscription-plans" },
      { label: "Bonsai invoicing (official product page)", url: "https://www.hellobonsai.com/invoicing" },
      { label: "Bonsai on Capterra — reviews", url: "https://www.capterra.com/p/238825/Bonsai/reviews/" },
    ],
    othersSay: {
      intro: "Review-listing snapshots checked 24 November 2026. Ratings and counts belong to the review platforms, can change, and are not Revercue test scores.",
      summary: "Capterra shows 4.6/5 from 95 reviews; reviewers highlight contract-template flexibility and ease of use. Capterra lists ease of use at 4.6/5 and customer service at 4.3/5. This is a modest sample, not a universal verdict.",
      articles: [
      { title: "Capterra — 4.6/5 from 95 reviews", source: "Capterra · checked 24 Nov 2026", url: "https://www.capterra.com/p/238825/Bonsai/reviews/", summary: "Reviewers highlight contract-template flexibility and a straightforward experience; the profile lists ease of use at 4.6/5 and customer service at 4.3/5." },
      ],
    },
  },

  honeybook: {
    checkedOn: "24 November 2026",
    pricingSource: { label: "HoneyBook — official pricing page", url: "https://www.honeybook.com/pricing" },
    pricing: [
      { plan: "Starter", price: "$36/mo, or $29/mo billed yearly", note: "Solo; lead forms, invoices, proposals, contracts" },
      { plan: "Essentials", price: "$59/mo, or $49/mo billed yearly", note: "Automations, scheduler, two team members" },
      { plan: "Premium", price: "$129/mo, or $109/mo billed yearly", note: "Unlimited team, advanced reporting" },
    ],
    pricingNote:
      "US list prices before tax: Starter $36 monthly or $29/month billed yearly; Essentials $59 or $49; Premium $129 or $109. The current official page shows card processing from 2.7% + $0.10 and bank transfer at 1.5%; check the account's payment method and country for the applicable fee. All plans start with a free trial; promotional checkout prices may vary by session and are not the list prices shown here.",
    sources: [
      { label: "HoneyBook pricing (official)", url: "https://www.honeybook.com/pricing" },
      { label: "HoneyBook features (official)", url: "https://www.honeybook.com/features" },
      { label: "HoneyBook on Capterra — reviews", url: "https://www.capterra.com/p/162588/HoneyBook/reviews/" },
      { label: "HoneyBook on G2 — reviews", url: "https://www.g2.com/products/honeybook/reviews" },
    ],
    othersSay: {
      intro: "Review-listing snapshots checked 24 November 2026. Ratings and counts belong to the review platforms, can change, and are not Revercue test scores.",
      summary: "Capterra shows 4.7/5 from 696 reviews; G2 shows 4.4/5 from 253 reviews. Reviewers praise the centralized client workflow and ease of use, while some mention pricing, learning curve, reporting or customization limits.",
      articles: [
      { title: "Capterra — 4.7/5 from 696 reviews", source: "Capterra · checked 24 Nov 2026", url: "https://www.capterra.com/p/162588/HoneyBook/reviews/", summary: "Capterra lists ease of use at 4.6/5 and customer service at 4.7/5. Visible reviews praise bringing contracts, invoices, payments and client communication together; some report setup friction or limited customization." },
      { title: "G2 — 4.4/5 from 253 reviews", source: "G2 · checked 24 Nov 2026", url: "https://www.g2.com/products/honeybook/reviews", summary: "G2 reviewers value the connected client workflow, templates and automations. Recurring cautions include subscription cost, learning curve, limited customization and integrations." },
      ],
    },
  },

  dubsado: {
    checkedOn: "24 November 2026",
    pricingSource: { label: "Dubsado — official pricing page (checked 24 November 2026)", url: "https://www.dubsado.com/pricing" },
    pricing: [
      { plan: "Starter", price: "$35/mo, or $335/yr", note: "Unlimited projects and clients, invoicing and payment plans, one active lead capture form, no scheduling, workflows or public proposals" },
      { plan: "Premier", price: "$55/mo, or $525/yr", note: "Adds scheduling, automated workflows, public proposals, Zapier, bookkeeping integration and unlimited lead capture forms" },
    ],
    pricingNote:
      "The official Dubsado product information page lists Starter at $35/month or $335/year and Premier at $55/month or $525/year. The help page confirms three additional users are included; extra-user bands are $25/mo for 4–10 users, $45/mo for 11–20 and $60/mo for 21–30, plus $10/mo per additional brand. The 21-day Premier trial requires no card. Legacy subscribers may retain older pricing, so these are the published new-subscriber list prices checked on 24 November 2026.",
    sources: [
      { label: "Dubsado pricing (official)", url: "https://www.dubsado.com/pricing" },
      { label: "Dubsado help centre — choose the right plan", url: "https://help.dubsado.com/en/articles/15920232-choose-the-right-dubsado-plan-for-your-business" },
      { label: "Dubsado official product information and pricing details", url: "https://www.dubsado.com/llm-info" },
      { label: "Dubsado on Capterra — reviews", url: "https://www.capterra.com/p/206389/Dubsado/reviews/" },
      { label: "Dubsado on G2 — seller profile", url: "https://www.g2.com/sellers/dubsado" },
    ],

    othersSay: {
      intro: "Review-listing snapshots checked 24 November 2026. Ratings and counts belong to the review platforms, can change, and are not Revercue test scores.",
      summary: "Capterra shows 4.2/5 from 61 reviews (ease of use 3.7/5, customer service 4.3/5). G2's Dubsado seller profile shows 4.3/5 from 76 reviews. Reviewers value automation but also mention setup effort and learning curve.",
      articles: [
      { title: "Capterra — 4.2/5 from 61 reviews", source: "Capterra · checked 24 Nov 2026", url: "https://www.capterra.com/p/206389/Dubsado/reviews/", summary: "Reviewers praise automated workflows and client administration, while some describe form design, scheduling and setup as difficult. Recent feedback also raises concern about pricing increases." },
      { title: "G2 — 4.3/5 from 76 reviews", source: "G2 seller profile · checked 24 Nov 2026", url: "https://www.g2.com/sellers/dubsado", summary: "G2's seller profile shows a 4.3/5 average across 76 reviews; this is a seller-profile aggregate, not a controlled feature test." },
      ],
    },
  },

  moxie: {
    checkedOn: "24 November 2026",
    pricingSource: { label: "Moxie — official pricing page (checked 24 November 2026)", url: "https://withmoxie.com/pricing" },
    pricing: [
      { plan: "Starter", price: "$12/mo, or $10/mo billed yearly", note: "Clients, projects, invoices, proposals, basic accounting" },
      { plan: "Pro", price: "$25/mo, or $20/mo billed yearly", note: "White-label portal, automations, integrations, phone line" },
      { plan: "Teams", price: "$40/mo, or $32/mo billed yearly", note: "Up to five team members" },
    ],
    pricingNote:
      "Per workspace per month, before tax. There is no free plan; the trial is 14 days with no card. The vendor page lists the Teams annual total as $385 against a $32 monthly equivalent, a one-dollar inconsistency worth checking at checkout.",
    sources: [
      { label: "Moxie pricing (official)", url: "https://www.withmoxie.com/pricing" },
      { label: "Moxie help centre", url: "https://help.withmoxie.com/" },
      { label: "Moxie product pages", url: "https://www.withmoxie.com/" },
      { label: "Moxie on G2 — reviews", url: "https://www.g2.com/products/geoff-mina-moxie/reviews" },
      { label: "Moxie on Capterra", url: "https://www.capterra.com/p/10026264/Moxie/" },
      { label: "Moxie on Trustpilot", url: "https://www.trustpilot.com/review/withmoxie.com" },
    ],
    othersSay: {
      intro: "Review-listing snapshots checked 24 November 2026; Moxie's G2 and Capterra samples are very small, while Trustpilot's profile is marked as merged.",
      summary: "G2 shows 4.5/5 from 4 reviews, Capterra 4.0/5 from 1 review, and Trustpilot 4.8/5 from 539 reviews. G2 and Capterra samples are too small to generalize; Trustpilot marks the profile as merged, so its total may include reviews originally posted elsewhere.",
      articles: [
      { title: "G2 — 4.5/5 from 4 reviews", source: "G2 · checked 24 Nov 2026", url: "https://www.g2.com/products/geoff-mina-moxie/reviews", summary: "Four reviews are too few to generalize about product quality." },
      { title: "Capterra — 4.0/5 from 1 review", source: "Capterra · checked 24 Nov 2026", url: "https://www.capterra.com/p/10026264/Moxie/", summary: "One review is not a meaningful basis for comparing satisfaction." },
      { title: "Trustpilot — 4.8/5 from 539 reviews", source: "Trustpilot · checked 24 Nov 2026", url: "https://www.trustpilot.com/review/withmoxie.com", summary: "Trustpilot notes that the company profile was merged with one or more other profiles; take that merged history into account when interpreting the score." },
      ],
    },
  },

  plutio: {
    checkedOn: "24 November 2026",
    pricingSource: { label: "Plutio — official pricing page (checked 24 November 2026)", url: "https://www.plutio.com/pricing" },
    pricing: [
      { plan: "Core", price: "$19/mo", note: "Workspace price; up to 9 active clients; no contributors" },
      { plan: "Pro", price: "$49/mo", note: "Workspace price; unlimited clients; 30 contributors included" },
      { plan: "Max", price: "$199/mo", note: "Workspace price; unlimited clients and contributors; white-label included" },
      { plan: "Enterprise", price: "Custom quote" },
    ],
    pricingNote:
      "Flat workspace pricing, not per seat. The current help-centre plan table lists 9 active clients and no contributors on Core, 30 included contributors on Pro, and unlimited contributors on Max. White-label is an add-on on Core and Pro and included on Max; SSO is unavailable on Core, an add-on on Pro, and included on Max. The seven-day trial includes three active clients and requires no card. Annual billing is offered, but the current help-centre table checked here does not state annual totals.",
    sources: [
      { label: "Plutio pricing (official)", url: "https://www.plutio.com/pricing" },
      { label: "Plutio help centre — subscription plans overview", url: "https://www.plutio.com/help/subscription-plans-overview" },
      { label: "Plutio features directory", url: "https://www.plutio.com/features/directory" },
      { label: "Plutio on Capterra — reviews", url: "https://www.capterra.com/p/179406/Plutio/reviews/" },
      { label: "Plutio on G2 — reviews", url: "https://www.g2.com/products/plutio/reviews" },
    ],
    othersSay: {
      intro: "Review-listing snapshots checked 24 November 2026. Ratings and counts belong to the review platforms, can change, and are not Revercue test scores.",
      summary: "Capterra shows 4.6/5 from 162 reviews; G2 shows 4.3/5 from 57 reviews. Reviewers value breadth and customization, while some report a learning curve, navigation friction, support concerns or reliability issues.",
      articles: [
      { title: "Capterra — 4.6/5 from 162 reviews", source: "Capterra · checked 24 Nov 2026", url: "https://www.capterra.com/p/179406/Plutio/reviews/", summary: "Capterra lists ease of use and customer service at 4.5/5. Visible feedback praises customization and collaboration; some reviewers describe limitations in task handling or the client experience." },
      { title: "G2 — 4.3/5 from 57 reviews", source: "G2 · checked 24 Nov 2026", url: "https://www.g2.com/products/plutio/reviews", summary: "G2 reviewers value projects, proposals, invoicing and client communication. Some older reviews raise concerns about support responsiveness, reliability and learning curve." },
      ],
    },
  },

  agiled: {
    checkedOn: "24 November 2026",
    pricingSource: { label: "Agiled — official pricing page (checked 24 November 2026)", url: "https://agiled.app/pricing" },
    pricing: [
      { plan: "Starter", price: "$29/mo, or $24/mo billed yearly", note: "One seat; 500 contacts, 10 projects" },
      { plan: "Pro", price: "$69/mo, or $59/mo billed yearly", note: "Three seats; workflows, API, unlimited projects" },
      { plan: "Business", price: "$129/mo, or $99/mo billed yearly", note: "Seven seats; branded portal, accounting sync" },
      { plan: "Scale", price: "$249/mo, or $199/mo billed yearly", note: "Fifteen seats; accounting intelligence" },
    ],
    pricingNote:
      "Workspace pricing with 1, 3, 7 and 15 included seats across Starter, Pro, Business and Scale. The official pricing page lists annual-billing equivalents of $24, $59, $99 and $199 per month; Agiled's own freelancer-software comparison article lists monthly-billing prices of $29, $69, $129 and $249. Extra seats are $20 per seat per month on Pro and above. Agiled's pricing FAQ says a workspace can continue on Free after the 14-day trial, while its official product-information page says there is no free plan. Because those official statements conflict and the plan matrix does not list a Free tier, Free availability and limits are unresolved; confirm directly with Agiled before relying on it.",
    sources: [
      { label: "Agiled pricing (official)", url: "https://agiled.app/pricing" },
      { label: "Agiled documentation", url: "https://docs.agiled.app/" },
      { label: "Agiled official product information and plan availability", url: "https://agiled.app/llm-info" },
      { label: "Agiled official freelancer software pricing overview", url: "https://agiled.app/blog/software-for-freelancers" },
      { label: "Agiled on Capterra — reviews", url: "https://www.capterra.com/p/206203/Agiled/reviews/" },
      { label: "Agiled on G2 — reviews", url: "https://www.g2.com/products/agiled/reviews" },
    ],
    othersSay: {
      intro: "Review-listing snapshots checked 24 November 2026. Ratings and counts belong to the review platforms, can change, and are not Revercue test scores.",
      summary: "Capterra shows 4.7/5 from 350 reviews; G2 shows 4.7/5 from 387 reviews. Reviewers praise the breadth of CRM, project and finance tools; some mention performance, integration setup and customization limitations.",
      articles: [
      { title: "Capterra — 4.7/5 from 350 reviews", source: "Capterra · checked 24 Nov 2026", url: "https://www.capterra.com/p/206203/Agiled/reviews/", summary: "Capterra lists ease of use at 4.6/5 and customer service at 4.7/5. Visible reviewers praise CRM, onboarding and finance in one place; some mention notification volume and communication limits." },
      { title: "G2 — 4.7/5 from 387 reviews", source: "G2 · checked 24 Nov 2026", url: "https://www.g2.com/products/agiled/reviews", summary: "G2 reviewers highlight CRM, project management, invoicing and HRM. Some report slower performance, integration setup friction or less flexible templates and reports." },
      ],
    },
  },

  "google-microsoft": {
    checkedOn: "24 November 2026",
    pricingSource: { label: "Google Workspace pricing (Google support page, checked 24 November 2026)", url: "https://support.google.com/a/answer/15400543" },
    pricing: [
      { plan: "Google Workspace Business Starter", price: "$7.00/user/mo, billed annually", note: "30 GB pooled storage per user; eSignature not included" },
      { plan: "Google Workspace Business Standard", price: "$14.00/user/mo, billed annually", note: "2 TB pooled storage; Docs and PDF eSignature included" },
      { plan: "Google Workspace Business Plus", price: "$22.00/user/mo, billed annually", note: "5 TB pooled storage; eSignature included" },
      { plan: "Microsoft 365 Business Basic", price: "$7.00/user/mo, billed annually", note: "Web and mobile Office apps; 1 TB OneDrive" },
      { plan: "Microsoft 365 Business Standard with Copilot", price: "$23.50/user/mo, billed annually", note: "Desktop Office apps and Copilot" },
      { plan: "Microsoft 365 Business Premium with Copilot", price: "$32.00/user/mo, billed annually", note: "Productivity apps, Copilot, and advanced security" },
    ],
    pricingNote:
      "US list prices per user/month on annual commitment, before tax. Google's current pricing page lists $7, $14 and $22 for Starter, Standard and Plus; introductory offers may temporarily lower the checkout price. Microsoft's current US page lists Business Basic at $7, Business Standard with Copilot at $23.50, and Business Premium with Copilot at $32. It also shows separate no-Teams variants at $5.40, $20.30 and $28.80 respectively. The Microsoft page checked here displays annual-commitment prices; monthly billing prices are not shown in the extracted plan list. Country, tax and promotional pricing vary.",
    sources: [
      { label: "Google Workspace pricing (official)", url: "https://workspace.google.com/pricing" },
      { label: "Google Workspace eSignature eligibility (official help)", url: "https://support.google.com/docs/answer/16704506" },
      { label: "Microsoft 365 business plans and pricing (official)", url: "https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-plans-and-pricing" },
      { label: "Microsoft eSignature pay-as-you-go pricing (Microsoft Learn)", url: "https://learn.microsoft.com/microsoft-365/documentprocessing/syntex-pay-as-you-go-services?view=o365-worldwide" },
      { label: "Google Workspace on Capterra", url: "https://www.capterra.com/p/247901/Google-Workspace/" },
      { label: "Microsoft 365 on Capterra", url: "https://www.capterra.com/p/227157/Microsoft-365/reviews/" },
    ],
    othersSay: {
      intro: "Review-listing snapshots checked 24 November 2026. Ratings and counts belong to the review platforms, can change, and are not Revercue test scores.",
      summary: "Capterra shows Google Workspace at 4.7/5 from 87,024 reviews and Microsoft 365 at 4.6/5 from 14,176 reviews. These are separate product listings, not a combined score; reviewers praise collaboration and document tools, while mentioning sync delays, complexity and internet dependence.",
      articles: [
      { title: "Google Workspace — 4.7/5 from 87,024 reviews", source: "Capterra · checked 24 Nov 2026", url: "https://www.capterra.com/p/247901/Google-Workspace/", summary: "Capterra describes strong real-time collaboration and a centralized productivity suite. Visible concerns include stable-internet dependence and occasional synchronization delays." },
      { title: "Microsoft 365 — 4.6/5 from 14,176 reviews", source: "Capterra · checked 24 Nov 2026", url: "https://www.capterra.com/p/227157/Microsoft-365/reviews/", summary: "Capterra reviewers value the broad Office ecosystem and document sharing. Some mention subscription cost, complexity, OneDrive synchronization and interface changes." },
      ],
    },
  },
};
