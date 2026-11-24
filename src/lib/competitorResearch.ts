/**
 * Competitor pricing and third-party coverage.
 *
 * Prices change. Every figure here carries the date it was read and a link to
 * the vendor's own pricing page, so a stale number is a dated fact rather than
 * a broken claim. Update `PRICING_CHECKED` and the affected entry together.
 */

export const PRICING_CHECKED = "23 November 2026";

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
      { label: "Bonsai on G2", url: "https://www.g2.com/products/bonsai/reviews" },
      { label: "Bonsai on Capterra", url: "https://www.capterra.com/p/238825/Bonsai/" },
      { label: "The Digital Project Manager — Hello Bonsai review", url: "https://thedigitalprojectmanager.com/tools/hello-bonsai-review" },
    ],
    othersSay: {
      intro:
        "Independent reviews are not listed on this page yet. Each comparison is checked against the vendor's own pricing and product pages first, and third-party coverage is added only after its source has been read and dated.",
      summary:
        "Read the vendor's own pages for current pricing and features, and the checked dates above for when each figure was last confirmed.",
      articles: [],
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
      "Per month, before tax. Card processing starts around 2.7–2.9% plus a fixed fee, with ACH and instant deposit priced separately. There is no free plan; the trial is advertised as 30 days with no card. Promotional annual prices appear from time to time and are not the list price.",
    sources: [
      { label: "HoneyBook pricing (official)", url: "https://www.honeybook.com/pricing" },
      { label: "HoneyBook help centre — what is in each plan", url: "https://help.honeybook.com/en/articles/2418282-what-s-included-in-each-honeybook-membership-plan" },
      { label: "HoneyBook features (official)", url: "https://www.honeybook.com/features" },
      { label: "HoneyBook on G2", url: "https://www.g2.com/products/honeybook/reviews" },
      { label: "HoneyBook on Capterra", url: "https://www.capterra.com/p/162588/HoneyBook" },
      { label: "PCMag — HoneyBook review", url: "https://www.pcmag.com/reviews/honeybook" },
    ],
    othersSay: {
      intro:
        "Independent reviews are not listed on this page yet. Each comparison is checked against the vendor's own pricing and product pages first, and third-party coverage is added only after its source has been read and dated.",
      summary:
        "Read the vendor's own pages for current pricing and features, and the checked dates above for when each figure was last confirmed.",
      articles: [],
    },
  },

  dubsado: {
    checkedOn: "24 November 2026",
    pricingSource: { label: "Dubsado — official pricing page (checked 24 November 2026)", url: "https://www.dubsado.com/pricing" },
    pricing: [
      { plan: "Starter", price: "$335/yr billed annually", note: "Unlimited projects and clients, invoicing and payment plans, one active lead capture form, no scheduling, workflows or public proposals" },
      { plan: "Premier", price: "$525/yr billed annually", note: "Adds scheduling, automated workflows, public proposals, Zapier, bookkeeping integration and unlimited lead capture forms" },
    ],
    pricingNote:
      "The official page lists annual prices only, in US dollars. Add-ons: $10/mo per additional brand, and $25/mo for 4 to 10 users after three additional users are included free. There is no free plan. The trial is 21 days with full Premier access and no card. A Black Friday promotion runs to 30 November 2026 and is not the list price. Third-party monthly figures such as $35 and $55 are not shown on Dubsado's own page and are not used here.",
    sources: [
      { label: "Dubsado pricing (official, checked 24 November 2026)", url: "https://www.dubsado.com/pricing" },
      { label: "Dubsado help centre — choose the right plan", url: "https://help.dubsado.com/en/articles/15920232-choose-the-right-dubsado-plan-for-your-business" },
      { label: "Dubsado on Capterra", url: "https://www.capterra.com/p/206389/Dubsado" },
    ],

    othersSay: {
      intro:
        "Independent reviews are not listed on this page yet. Each comparison is checked against the vendor's own pricing and product pages first, and third-party coverage is added only after its source has been read and dated.",
      summary:
        "Read the vendor's own pages for current pricing and features, and the checked dates above for when each figure was last confirmed.",
      articles: [],
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
      { label: "Moxie on G2", url: "https://www.g2.com/products/geoff-mina-moxie/reviews" },
      { label: "Moxie on Capterra", url: "https://www.capterra.com/p/10026264/Moxie" },
      { label: "Millo — Moxie app review", url: "https://millo.co/moxie-app-review" },
    ],
    othersSay: {
      intro:
        "Independent reviews are not listed on this page yet. Each comparison is checked against the vendor's own pricing and product pages first, and third-party coverage is added only after its source has been read and dated.",
      summary:
        "Read the vendor's own pages for current pricing and features, and the checked dates above for when each figure was last confirmed.",
      articles: [],
    },
  },

  plutio: {
    checkedOn: "24 November 2026",
    pricingSource: { label: "Plutio — official pricing page (checked 24 November 2026)", url: "https://www.plutio.com/pricing" },
    pricing: [
      { plan: "Core", price: "$19/mo, or $190/yr", note: "Solo; 9 active clients, no contributors" },
      { plan: "Pro", price: "$49/mo, or $490/yr", note: "Unlimited clients, 30 contributors" },
      { plan: "Max", price: "$199/mo, or $1,990/yr", note: "Unlimited contributors, white-label included" },
      { plan: "Enterprise", price: "Custom quote" },
    ],
    pricingNote:
      "Flat per workspace, not per seat, before tax. There is no free plan; the trial is seven days with no card and capped at three active clients. White-label is a $9/mo add-on on Core and Pro, SSO is a $5/mo add-on on Pro, and both are included on Max.",
    sources: [
      { label: "Plutio pricing (official)", url: "https://www.plutio.com/pricing" },
      { label: "Plutio help centre — subscription plans overview", url: "https://www.plutio.com/help/subscription-plans-overview" },
      { label: "Plutio features directory", url: "https://www.plutio.com/features/directory" },
      { label: "Plutio on Capterra", url: "https://www.capterra.com/p/179406/Plutio" },
      { label: "Plutio on G2", url: "https://www.g2.com/products/plutio/reviews" },
      { label: "Search Legion — Plutio review 2026", url: "https://searchlegion.com/reviews/plutio" },
    ],
    othersSay: {
      intro:
        "Independent reviews are not listed on this page yet. Each comparison is checked against the vendor's own pricing and product pages first, and third-party coverage is added only after its source has been read and dated.",
      summary:
        "Read the vendor's own pages for current pricing and features, and the checked dates above for when each figure was last confirmed.",
      articles: [],
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
      "Per workspace, with seats included per plan; extra seats cost about $20 per seat per month on Pro and above. There is no free plan; the trial is 14 days with Business features and no card. Agiled only renders its annual view server-side, so the monthly figures are corroborated by its own comparison posts and an independent tracker rather than read directly from the toggle. The official page confirms the annual prices ($24, $59, $99, $199 a month billed annually). The monthly figures are from a third-party read of the monthly view and are not confirmed on the official page.",
    sources: [
      { label: "Agiled pricing (official)", url: "https://agiled.app/pricing" },
      { label: "Agiled documentation", url: "https://docs.agiled.app/" },
      { label: "Agiled features (official)", url: "https://agiled.app/features" },
      { label: "Agiled on G2", url: "https://www.g2.com/products/agiled/reviews" },
      { label: "Agiled on Capterra", url: "https://www.capterra.com/p/206203/Agiled/" },
      { label: "Frontier Edit — how Agiled built its user base", url: "https://www.frontieredit.com/stories/startup-agiled" },
    ],
    othersSay: {
      intro:
        "Independent reviews are not listed on this page yet. Each comparison is checked against the vendor's own pricing and product pages first, and third-party coverage is added only after its source has been read and dated.",
      summary:
        "Read the vendor's own pages for current pricing and features, and the checked dates above for when each figure was last confirmed.",
      articles: [],
    },
  },

  "google-microsoft": {
    checkedOn: "24 November 2026",
    pricingSource: { label: "Google Workspace pricing (Google support page, checked 24 November 2026)", url: "https://support.google.com/a/answer/15400543" },
    pricing: [
      { plan: "Google Workspace Business Starter", price: "$8.40/mo flexible, or $7.00/mo annual", note: "30 GB per user, 100-person meetings" },
      { plan: "Google Workspace Business Standard", price: "$16.80/mo flexible, or $14.00/mo annual", note: "2 TB per user, recording, eSignature" },
      { plan: "Google Workspace Business Plus", price: "$26.40/mo flexible, or $22.00/mo annual", note: "5 TB per user, Vault, advanced controls" },
      { plan: "Microsoft 365 Business Basic", price: "$8.40/mo monthly, or $7.00/mo annual", note: "Web and mobile Office apps, 1 TB OneDrive" },
      { plan: "Microsoft 365 Business Standard", price: "$16.80/mo monthly, or $14.00/mo annual", note: "Desktop Office apps on five devices" },
      { plan: "Microsoft 365 Business Premium", price: "$26.40/mo monthly, or $22.00/mo annual", note: "Intune, Defender, conditional access" },
    ],
    pricingNote:
      "Per user, per month, before tax, on US list prices. Google figures are from Google's own support page: Business Starter $7 annual or $8.40 flexible, Standard $14 or $16.80, Plus $22 or $26.40. Microsoft figures are from secondary sources that agree with each other (Business Basic $7 annual or $8.40 monthly, Standard $14 or $16.80, Premium $22 or $26.40, after the July 2026 price change); they are not yet confirmed on Microsoft's own page. Promotions and local pricing vary, so check the vendor page for a specific country.",
    sources: [
      { label: "Google Workspace pricing (official)", url: "https://workspace.google.com/pricing" },
      { label: "Microsoft 365 business plans (official)", url: "https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-plans-and-pricing" },
      { label: "Google Workspace — business editions documentation", url: "https://knowledge.workspace.google.com/admin/getting-started/editions/business-editions" },
      { label: "Microsoft Learn — Microsoft 365 plan options", url: "https://learn.microsoft.com/en-us/office365/servicedescriptions/office-365-platform-service-description/office-365-plan-options" },
      { label: "Capterra — Microsoft 365 vs Google Workspace", url: "https://www.capterra.com/compare/227157-247901/Microsoft-365-vs-Google-Workspace" },
      { label: "Computerworld — Google Workspace vs Microsoft 365", url: "https://www.computerworld.com/article/1672155/g-suite-vs-office-365-whats-the-best-office-suite-for-business.html" },
    ],
    othersSay: {
      intro:
        "Independent reviews are not listed on this page yet. Each comparison is checked against the vendor's own pricing and product pages first, and third-party coverage is added only after its source has been read and dated.",
      summary:
        "Read the vendor's own pages for current pricing and features, and the checked dates above for when each figure was last confirmed.",
      articles: [],
    },
  },
};
