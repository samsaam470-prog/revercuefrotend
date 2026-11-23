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
    checkedOn: PRICING_CHECKED,
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
        "Bonsai has one of the longest review trails in the freelancer-software category, which makes the pattern easier to see than any single verdict. The consistent picture is a strong all-in-one for a solo freelancer who wants proposals, contracts and invoices in one subscription, with two recurring reservations: the per-user price ladder and the payments layer.",
      summary:
        "Across editorial reviews, review-site profiles and buyer discussions, Bonsai is usually described as the safest default for a freelancer who is consolidating tools. Reviewers consistently praise the proposal-and-contract workflow, the template library and the fact that invoicing, expenses and basic tax estimates sit in the same account. The strongest editorial reviews describe it as an agency platform that spans the whole client lifecycle, while noting that it is less flexible for a highly specialised studio. The recurring criticism is not about missing features but about cost shape: the Basic tier cannot invoice, so the real entry point is Essentials, and payment-processing fees sit on top of the subscription. Review-site sentiment is broadly positive — roughly 4.3 to 4.6 out of five across the large profiles — while long-form buyer discussions are more mixed about support, payment holds and the invoicing interface. Several 2026 pricing trackers independently record the same plan ladder, which gives confidence in the numbers rather than in any one review. The useful conclusion for a buyer is that Bonsai is a good fit when the books and the paperwork are the bottleneck, and a weaker fit when the client conversation itself is the part that needs structure. One detail is easy to miss when the reviews are read in sequence: almost every reviewer evaluates Bonsai as a bundle, so a complaint about one layer such as payments or support sits next to praise for another such as templates or invoicing. For a buyer the useful question is not whether the bundle is good, but whether the layer that matters most in this particular client conversation is the layer the bundle is strongest at. If the decision happens inside the proposal itself, where the package is chosen, the questions are answered and the answer is reused, that is where a document-first product is judged, and it is the part Bonsai's reviews describe least.",
      articles: [
        {
          title: "Hello Bonsai Review",
          source: "The Digital Project Manager",
          url: "https://thedigitalprojectmanager.com/tools/hello-bonsai-review",
          summary:
            "An editorial review that frames Bonsai as an all-in-one agency platform covering proposals, contracts, projects, time tracking and invoicing. It concludes that the breadth suits agencies wanting the full client lifecycle in one tool, but that highly specialised studios may find it less flexible.",
        },
        {
          title: "Bonsai Review 2026",
          source: "The Software Brief",
          url: "https://thesoftwarebrief.com/bonsai-review",
          summary:
            "A six-week hands-on test across proposals, invoices, expenses and estimated taxes, scored 4.2/5. It calls Bonsai the best all-in-one for solo freelancers, praising the contract and proposal workflow and the tax estimator, while warning it is not built for teams beyond two or three people.",
        },
        {
          title: "Bonsai Review 2026: Best All-in-One Tool?",
          source: "Smart Tools Pick",
          url: "https://smarttoolspick.com/bonsai-review-2026",
          summary:
            "A twelve-week test running three small freelance businesses on the Essentials plan. It finds that consolidating separate proposal, invoicing, time-tracking and form tools saves real admin time, but notes the accounting layer is profit-and-loss only, with no balance sheet.",
        },
        {
          title: "Bonsai review: pricing, plans and who it suits",
          source: "Stack Verdict Review",
          url: "https://stackverdictreview.com/reviews/bonsai-review",
          summary:
            "A pricing-focused review that records the annual and monthly figures for every tier and explains the storage limits. Its most useful point is that Basic cannot invoice, so the practical entry price is Essentials, and that payment-processing fees stack on top of the plan price.",
        },
        {
          title: "Bonsai Review 2026: Is It Worth It?",
          source: "Search Legion",
          url: "http://searchlegion.com/reviews/bonsai",
          summary:
            "An editorial walkthrough of the four plans and the step-up between tiers. It also warns readers that a widely shared thread about a different company called Bonsai is not evidence about this platform, which is a useful reminder when researching the name.",
        },
        {
          title: "Bonsai Pricing 2026: Plans, Costs & Fees",
          source: "Search Legion",
          url: "http://searchlegion.com/pricing/bonsai",
          summary:
            "A price tracker that states the annual range as $9 to $49 per user per month and the monthly range as $15 to $59. It notes that invoicing, proposals and contracts start at Essentials, reporting starts at Premium, and Elite carries a three-user minimum.",
        },
        {
          title: "Bonsai Pricing in 2026: Plans, Fees and What Coaches Pay",
          source: "Coachful",
          url: "https://www.coachful.co/blog/bonsai-pricing",
          summary:
            "A coach-specific cost breakdown that converts the per-month prices into annual totals and models the Elite minimum. It confirms the seven-day trial gives full access and requires no card up front, and explains where the plan ladder becomes expensive for a small team.",
        },
        {
          title: "Comparing three freelance payment tools after using all of them",
          source: "Reddit r/Freelancers",
          url: "https://www.reddit.com/r/Freelancers/comments/1rycp48/comparing_three_freelance_payment_tools_after",
          summary:
            "A buyer discussion describing Bonsai as genuinely solid for running a freelance business end to end, with contracts, invoices, time tracking and expenses in one clean interface. The criticism is that its payment model is traditional — invoice, then wait — and does not tie payment to project progress.",
        },
        {
          title: "Bonsai Review 2026: Ratings, Pros, Cons, Verdict",
          source: "Agiled",
          url: "https://agiled.app/blog/bonsai-review",
          summary:
            "A competitor-published review that aggregates Capterra, GetApp, G2 and Trustpilot scores and argues Bonsai is loved by solo freelancers but polarising at scale. It highlights praise for contracts and tax features and criticism of per-user pricing and the payments experience; the vendor bias is disclosed by its authorship.",
        },
        {
          title: "Bonsai reviews on Capterra",
          source: "Capterra",
          url: "https://www.capterra.com/p/238825/Bonsai/",
          summary:
            "The verified-review profile, scoring around 4.6/5 from roughly 95 reviews at the time of reading, with a Shortlist badge. Reviewers are overwhelmingly small businesses, and the recurring themes are ease of use and breadth of features rather than depth in any one category.",
        },
      ],
    },
  },

  honeybook: {
    checkedOn: PRICING_CHECKED,
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
        "HoneyBook is reviewed more often by mainstream business publications than most competitors, and the consensus is unusually stable: excellent client experience, strong front-of-funnel flow, and a price that is high for a solo freelancer. The disagreement is about whether the flow is worth it.",
      summary:
        "Established reviewers describe HoneyBook as a clientflow platform rather than a document tool: inquiry form, call, proposal, contract, invoice and payment in one branded experience. PCMag calls it full-featured but expensive; TechRadar praises the all-in-one lifecycle while finding reporting basic; Forbes and Fortune both treat it as a serious option for service businesses. Review-site profiles are strong, with Capterra around 4.7 and G2 around 4.4, although Trustpilot sits lower and carries more billing and support complaints. The 2026 pricing coverage is consistent on the three-tier ladder at roughly $29/$49/$109 per month billed yearly or $36/$59/$129 monthly, and several reviewers argue that payment-processing fees, not the subscription, dominate the real cost for a business with meaningful volume. The recurring product criticism is that the proposal is a brochure with an accept button: what the client chose, read or hesitated over is not first-class data, and requirements usually live in a call or a separate form. That is the specific gap a document-centred product competes for. A second thread runs through the coverage: most reviewers judge HoneyBook on the booking experience, not on what happens after the booking. That is a fair test for a wedding photographer and a misleading one for a consultant whose work is defined by a written requirement and a sequence of approvals. Reading the reviews with the reviewer's business in mind explains most of the disagreement between the five-star and the two-star accounts. The shortest way to use this coverage is to decide which part of your own process currently costs the most time, then look for the reviews that discuss that part in detail rather than the ones that score the whole product.",
      articles: [
        {
          title: "HoneyBook Review: A Pricey CRM That Serves Established SMBs Well",
          source: "PCMag",
          url: "https://www.pcmag.com/reviews/honeybook",
          summary:
            "Rates HoneyBook 3.5/5 and calls it full-featured and capable for small businesses that have outgrown spreadsheets. The verdict is that it is very pricey, with basic reporting, and best suited to an established service business rather than a brand-new freelancer.",
        },
        {
          title: "HoneyBook CRM review 2026: Our hands-on evaluation",
          source: "TechRadar",
          url: "https://www.techradar.com/pro/software-services/honeybook-crm-review",
          summary:
            "A hands-on evaluation concluding HoneyBook is an excellent all-in-one CRM for small service businesses, freelancers and independents. It praises the streamlining of the full client lifecycle and finds reporting less advanced than specialised tools.",
        },
        {
          title: "HoneyBook Review: Features, Pricing and Alternatives",
          source: "TechRepublic",
          url: "https://www.techrepublic.com/article/honeybook-review/",
          summary:
            "A structured review based on a trial plus documentation and user feedback. It describes HoneyBook as a clientflow management platform combining invoicing, payments, scheduling and CRM, and weighs plans, automation, integrations, interface and support.",
        },
        {
          title: "HoneyBook Review: Features, Pros And Cons",
          source: "Forbes Advisor",
          url: "https://www.forbes.com/advisor/business/software/honeybook-review",
          summary:
            "An editorial review for small businesses covering features, advantages and limitations, with an affiliate disclosure. It treats HoneyBook as a mature option for service businesses that sell through a repeatable inquiry-to-payment flow.",
        },
        {
          title: "HoneyBook CRM review: A deep dive into an all-in-one client management platform",
          source: "Fortune Recommends",
          url: "https://fortune.com/recommends/crm/honeybook-review",
          summary:
            "An editorially independent deep dive into features, integrations and pricing. It frames HoneyBook as an all-in-one client-management platform and notes the affiliate relationship without letting it change the conclusions.",
        },
        {
          title: "HoneyBook pricing, explained (2026)",
          source: "Portico",
          url: "https://www.portico.run/blog/post/honeybook-pricing",
          summary:
            "Breaks out the three-tier grid and the gates that matter: team size, automation and lead forms. It also records a time-limited promotional annual price and warns that the renewal price after a promo year is not disclosed on the pricing page.",
        },
        {
          title: "HoneyBook Pricing 2026: Plans, Fees, Real Monthly Cost",
          source: "Finpresso",
          url: "https://finpresso.com/blog/honeybook-pricing",
          summary:
            "Argues that payment-processing fees, not the subscription, dominate total cost, modelling a freelancer billing several thousand dollars a month. It lists the yearly and monthly plan prices and compares them with cheaper alternatives for the same job.",
        },
        {
          title: "HoneyBook Review (4/5): Pricing & Fees (2026)",
          source: "DigiJaws",
          url: "https://digijaws.com/reviews/honeybook-review",
          summary:
            "Gives HoneyBook 4/5 and quotes both billing modes plus card fees. Its sharpest observation is that the plan gates are about team size and automation rather than usage volume, and that the discount badges on the page do not always match the arithmetic.",
        },
        {
          title: "HoneyBook Pricing 2026: Plans, Fees and What Agencies Really Pay",
          source: "ManyRequests",
          url: "https://manyrequests.com/blog/honeybook-pricing",
          summary:
            "An agency-focused breakdown of the three tiers with team-access and lead-form limits. It recommends modelling processing fees into the total and confirms the no-card trial and the absence of a free plan.",
        },
        {
          title: "HoneyBook reviews: the praise, the complaints, and five alternatives",
          source: "kiwilaunch",
          url: "https://kiwilaunch.com/honeybook-reviews-alternatives",
          summary:
            "Aggregates app-store, Google Play and Trustpilot data and quotes both happy and unhappy customers. It summarises the common praise for the client experience and the common complaints about price and support, then suggests alternatives for businesses HoneyBook does not fit.",
        },
      ],
    },
  },

  dubsado: {
    checkedOn: PRICING_CHECKED,
    pricingSource: { label: "Dubsado — official pricing page", url: "https://www.dubsado.com/pricing" },
    pricing: [
      { plan: "Starter", price: "$35/mo, or $335/yr", note: "Core tools; one active lead form" },
      { plan: "Premier", price: "$55/mo, or $525/yr", note: "Scheduler, Flows, proposals, Zapier, bookkeeping sync" },
    ],
    pricingNote:
      "Prices are per account, with three additional users included on every plan; more users and extra brands are add-ons. There is no free plan. The trial is 21 days with full Premier access and no card. A Black Friday promotion was live from 23 November 2026 and is not the list price.",
    sources: [
      { label: "Dubsado pricing (official)", url: "https://www.dubsado.com/pricing" },
      { label: "Dubsado help centre — choose the right plan", url: "https://help.dubsado.com/en/articles/15920232-choose-the-right-dubsado-plan-for-your-business" },
      { label: "Dubsado features (official)", url: "https://www.dubsado.com/features" },
      { label: "Dubsado on Capterra", url: "https://www.capterra.com/p/206389/Dubsado" },
      { label: "Dubsado on G2", url: "https://www.g2.com/products/dubsado/reviews" },
      { label: "Finpresso — Dubsado review 2026", url: "https://finpresso.com/reviews/dubsado-review" },
    ],
    othersSay: {
      intro:
        "Dubsado's reviews divide cleanly between people who built a machine and people who wanted one out of the box. Nobody disputes the power of its workflows; the argument is about the afternoon of configuration that comes before the first client.",
      summary:
        "Editorial and practitioner reviews describe Dubsado as the deepest automation product in the freelance client-management category. The positive case is conditional logic, branded portals, form and email templates, and workflows that move a client from inquiry to contract to invoice without manual steps. The negative case is also consistent: the setup is the product, the learning curve is steep, and the scheduler, Flows, public proposals, Zapier and bookkeeping sync are all gated behind Premier. Pricing coverage after the December 2025 increase agrees on two plans, roughly $35 per month or $335 per year for Starter and $55 per month or $525 per year for Premier, with three users included and add-ons for more seats and extra brands. Review-site scores sit around 4.2 on both Capterra and G2, with praise for automation and criticism for complexity. Practitioner write-ups add a useful nuance: many buyers run Dubsado at the front of the funnel and a different product for the documents where a decision has to be made, which is the overlap a document-centred product should be judged against. It is also worth weighing the trial and the price per account rather than per user: three included seats make Dubsado cheaper than it first appears for a very small team, while the Premier-only gates mean the headline Starter price buys considerably less than the product most reviewers describe. Buyers who dislike configuring software should treat the learning curve as a real cost, not a footnote, because the automation only repays the setup once a workflow is actually used. Buyers who enjoy building systems tend to stay for years, and several practitioners describe their Dubsado account as the operating manual for the business rather than a document tool. The reviews also reveal a split that the single scores hide. Reviewers who enjoy building workflows rate Dubsado very highly, while reviewers who want a working process on day one describe a long setup and a lot of decisions before the first invoice goes out. Both can be true at once, and that split is the buying decision. The reviews that matter most are the ones that say how long the first workflow took to build, not the ones that list features.",
      articles: [
        {
          title: "Dubsado Review 2026: Pricing After the Increase",
          source: "Finpresso",
          url: "https://finpresso.com/reviews/dubsado-review",
          summary:
            "Reviews the post-2025 pricing and argues Premier is the only version worth buying because the scheduler, Flows and bookkeeping sync are gated there. It also covers payment fees, bundled seats and alternatives.",
        },
        {
          title: "Dubsado Pricing 2026: $335 or $525 a Year",
          source: "Cait Potter",
          url: "https://caitpotter.com/dubsado-pricing",
          summary:
            "Written by a Dubsado Certified Specialist, it confirms the two plans and the two-months-free annual logic. It warns that many comparison sites still quote the old 2024 prices, which is a useful caution for anyone researching the product.",
        },
        {
          title: "Dubsado pricing (2026): plans, fees and what you really pay",
          source: "TaskSession",
          url: "https://www.tasksession.com/blog/dubsado-pricing",
          summary:
            "A tabular breakdown of both plans, the three included users, the per-user steps above that, the extra-brand price and the 21-day no-card trial. It also lists US payment-processing fees so the total cost is visible.",
        },
        {
          title: "Dubsado Pricing (Checked Oct 2026)",
          source: "ApeiroCraft",
          url: "https://apeirocraft.tech/blog/dubsado-pricing",
          summary:
            "Frames Dubsado as two plans priced by the year and explains which capabilities are Premier-only. It details per-user and per-brand add-ons and confirms there is no free plan, only a full-feature trial.",
        },
        {
          title: "Dubsado Pricing",
          source: "Coachful",
          url: "https://www.coachful.co/blog/dubsado-pricing",
          summary:
            "A coach-oriented monthly-versus-yearly table that names the specific limits on Starter: no scheduler, no workflows, no Zapier, no bookkeeping integration and no public proposals. That list is the clearest statement of why most buyers end up on Premier.",
        },
        {
          title: "Dubsado Review 2026: Honest CRM Review (+ 3.0 Update)",
          source: "Demilked",
          url: "https://www.demilked.com/dubsado-review-is-it-worth-it-for-freelancers-in-2026",
          summary:
            "A hands-on review of core features and onboarding after Dubsado 3.0. It concludes the product suits service businesses that want deep customisation, and positions HoneyBook as the easier out-of-the-box alternative.",
        },
        {
          title: "HoneyBook vs Dubsado: Which Fits a Freelancer?",
          source: "FeeBite",
          url: "https://feebite.com/blog/honeybook-vs-dubsado",
          summary:
            "A side-by-side price check dated November 2026 covering both products' plans, trial lengths and payment processors. It is useful mainly as an independent confirmation of the current Dubsado numbers against HoneyBook's.",
        },
        {
          title: "Dubsado vs HoneyBook for Wedding Photographers (2026)",
          source: "The Photo Testers",
          url: "https://www.thephototesters.com/dubsado-vs-honeybook",
          summary:
            "Recommends Dubsado for intricate conditional automations, multi-brand accounts and non-North-American payment processors. It calculates that Premier undercuts HoneyBook Essentials annually but requires much more setup time.",
        },
        {
          title: "Dubsado vs HoneyBook: Which Is Cheaper & Better in 2026?",
          source: "Taskip",
          url: "https://taskip.net/dubsado-vs-honeybook",
          summary:
            "Argues Dubsado is cheaper for small teams because three users are included on every plan, and better for advanced workflows and a fully branded portal. It positions HoneyBook as the faster start and Dubsado as the deeper system.",
        },
        {
          title: "Is Dubsado Premiere worth it?",
          source: "Reddit r/WeddingPhotography",
          url: "https://www.reddit.com/r/WeddingPhotography/comments/1u8hflo/is_dubsado_premiere_worth_it",
          summary:
            "A buyer discussion from someone on an older, cheaper plan weighing the jump to Premier. The replies are mixed: some describe leaving other tools over repeated price increases, while others say switching is hard once galleries and workflows are already embedded.",
        },
      ],
    },
  },

  moxie: {
    checkedOn: PRICING_CHECKED,
    pricingSource: { label: "Moxie — official pricing page", url: "https://www.withmoxie.com/pricing" },
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
        "Moxie has a smaller review base than its older competitors, and much of the strongest coverage predates its current pricing. The consistent theme is breadth for the money, with a warning that depth varies by module and that some connective features sit behind Pro.",
      summary:
        "Buyer write-ups describe Moxie — formerly Hectic — as the cheapest credible single bill for a freelancer who wants clients, projects, proposals, contracts, invoices, scheduling and a client portal in one place. The earliest hands-on reviews are enthusiastic about the breadth and the freelancer-specific design, and one three-month diary concludes the author moved everything onto it. Later reviews add caveats: setup takes time, the Pro tier is where white-labelling, automations and integrations live, and some modules are shallower than specialist tools. Review-site coverage is thin and split — a small but high Trustpilot score sits beside a very small G2 and Capterra base — which makes the practitioner diaries more useful than the star averages. The 2026 pricing trackers agree on the current ladder of roughly $12/$25/$40 monthly or $10/$20/$32 billed yearly, with a 14-day no-card trial and no free plan. The 2026 comparison pieces consistently place Moxie as the price-to-value pick for a solo freelancer, while steering teams and deep-automation users elsewhere. The review base is thin enough that the star averages should be treated as directional, and the strongest evidence comes from the long-form practitioner diaries rather than the aggregate scores. The practical caveats are consistent: expect to spend time on setup, expect the most useful connective features on Pro, and check which accounting and payment integrations you actually need before committing. For a solo freelancer whose main goal is to stop paying for five separate subscriptions, the value case is strong; for a team that needs deep automation, a fully branded portal on the entry plan, or a large review base to feel confident, the case is weaker. Read together, the reviews describe a product that is praised for how the client experience feels and questioned for how much structure it gives the freelancer behind the page. That distinction matters in practice: a page that looks polished still leaves the decision, the requirement and the follow-up to be assembled by hand unless the product records them. A buyer should look for the review that answers what happened after the client read the page, not only what the page looked like.",
      articles: [
        {
          title: "Moxie App Review: I Tested it as a Freelancer",
          source: "Millo",
          url: "https://millo.co/moxie-app-review",
          summary:
            "A freelancer's hands-on trial concluding Moxie is remarkably cheap relative to buying separate tools. It praises the freelancer-specific design and the breadth of client management, invoicing and time tracking, while noting some modules are less deep than specialists.",
        },
        {
          title: "Moxie 3 Month Review (Bonsai and Fiverr Workspace Killer?)",
          source: "Self-Employment Sidekick",
          url: "https://selfemploymentsidekick.com/moxie-3-month-review-bonsai-and-fiverr-workspace-killer",
          summary:
            "A three-month daily-use diary from a solo business owner. The author reports moving everything from older software onto Moxie and highlights the built-in scheduler and unified inbox as the features that made the difference.",
        },
        {
          title: "Moxie Review: The All-in-One Freelancer Toolkit Worth $39?",
          source: "Dave Swift",
          url: "https://daveswift.com/moxie",
          summary:
            "A review written around a lifetime-deal purchase, testing the CRM, invoicing, proposals, time tracking, scheduling and accounting modules in daily use. It asks whether an all-in-one toolkit can genuinely replace separate freelancer apps.",
        },
        {
          title: "Review de Moxie: CRM para freelancers y agencias All-in-one",
          source: "Economía TIC",
          url: "https://economiatic.com/herramientas-digitales/crm/moxie",
          summary:
            "A Spanish-language review calling Moxie a CRM on steroids for freelancers and agencies, with detailed coverage of selling, contracts, projects, the client portal, multi-currency invoicing and expense tracking. Its pricing references predate the current ladder.",
        },
        {
          title: "Moxie Review 2026: 7.2/10, from $12/mo",
          source: "MakerStack",
          url: "https://makerstack.co/reviews/moxie-review",
          summary:
            "Scores Moxie 7.2/10 and argues it can replace a stack of separate tools by bundling CRM, invoicing, contracts, bookkeeping and a business phone. It identifies steep setup and Pro-gated connective features as the main catches.",
        },
        {
          title: "HoneyBook vs Dubsado vs Bonsai vs Moxie: 2026 Verdict",
          source: "Freelance AI Daily",
          url: "https://freelanceaidaily.com/blog/honeybook-vs-dubsado-vs-bonsai-vs-moxie-2026",
          summary:
            "Compares four freelancer CRMs and concludes Moxie wins on price-to-value for a solo freelancer while Dubsado suits deep-automation power users. It also documents the Hectic-to-Moxie rebrand and the review-history split it caused.",
        },
        {
          title: "Moxie Pricing 2026: $12, $25 & $40 Plans + Hidden Costs",
          source: "Taskip",
          url: "https://taskip.net/moxie-pricing",
          summary:
            "A pricing-focused breakdown tabulating monthly and annual cost, total billed yearly, annual savings and the per-seat cost on Teams. It confirms the 14-day trial needs no card and that there is no free plan.",
        },
        {
          title: "Moxie Reviews, Pricing & Alternatives",
          source: "Toolradar",
          url: "https://toolradar.com/tools/moxie",
          summary:
            "An aggregator profile whose figures were read directly from the vendor pricing page in November 2026. It lists Starter and Pro in both billing modes with itemised inclusions, and is useful as a dated snapshot rather than an opinion.",
        },
        {
          title: "Moxie alternative: an honest comparison with Thrive",
          source: "Thrive",
          url: "https://runonthrive.com/blog/moxie-alternative",
          summary:
            "A competitor-authored but source-transparent comparison that lists all three plans with both billing modes. It credits the unified inbox and flat per-workspace pricing, and notes that Pro is required for a fully white-labelled portal.",
        },
        {
          title: "Keid vs Moxie (2026): Pricing, Client Portal & Who Each Fits",
          source: "Keid",
          url: "https://www.keid.io/compare/keid-vs-withmoxie",
          summary:
            "A vendor comparison that reproduces Moxie's plans from the official page in October 2026. It argues that client-portal depth and white-labelling are where the two products diverge, and that Moxie gates both behind Pro.",
        },
      ],
    },
  },

  plutio: {
    checkedOn: PRICING_CHECKED,
    pricingSource: { label: "Plutio — official pricing page", url: "https://www.plutio.com/pricing" },
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
        "Plutio's coverage is dominated by smaller review sites, comparison pages and marketplace reviews rather than mainstream publications. The themes are consistent even so: broad value for the price, with per-module depth and support reliability as the recurring doubts.",
      summary:
        "Reviewers describe Plutio as an all-in-one workspace where projects, tasks, proposals, invoices, forms, a CRM, a wiki and a client portal live under one flat subscription. The positive case is breadth per dollar: project management, time tracking, scheduling and AI credits on every plan, with no per-seat charge until the contributor limits. The critical case is depth and reliability. Review-site profiles put Capterra around 4.6 and G2 around 4.3, but Trustpilot sits much lower at roughly 3.0, and several long-running buyer discussions complain about support responsiveness and modules being decent rather than best-in-class. The pricing decision is unusually clear because Core caps active clients at nine and gives the owner no contributors, so most teams end up comparing Pro with the market rather than Core. The 2026 trackers agree on $19/$49/$199 monthly or $190/$490/$1,990 yearly, with a seven-day trial and no free plan. The practical read is that Plutio is strong value for a solo operator who wants one bill and can live with shallower modules, and a weaker fit for anyone who needs a specialist CRM or dependable support at scale. The support signal deserves particular weight because it appears in several independent places rather than one angry thread: marketplace buyers, forum users and at least one long-form review all describe slow or absent responses at some point. That does not make the product unusable, but it changes the risk calculation for a business that depends on it daily. The feature inventory is genuinely broad, and the flat pricing is unusual in a category that increasingly charges per seat, so a solo operator with a handful of clients can get a lot for the entry price. Teams should model the contributor limits carefully, because the step from Core to Pro is where most of the value and most of the cost sits, and the nine-client cap on Core is easy to outgrow within a few months. The other pattern in the reviews is breadth versus depth: Plutio is consistently described as unusually broad for the price, and just as consistently described as a workspace you configure rather than one that decides a process for you. The testimonials that read best come from people who wanted exactly that; the ones that read worst come from people who expected the modules to work together without setup. Neither is wrong, but the time-to-first-document is the number worth comparing.",
      articles: [
        {
          title: "Plutio Review 2026: Pricing, Features and Limits",
          source: "Search Legion",
          url: "https://searchlegion.com/reviews/plutio",
          summary:
            "Scores Plutio 6.3/10 with strong features and weaker support. It argues that the nine-active-client cap on Core makes the jump to Pro the real decision point, and that the flat price is attractive only if the limits match how you work.",
        },
        {
          title: "Plutio Review (2026)",
          source: "MakerStack",
          url: "https://makerstack.co/reviews/plutio-review",
          summary:
            "Gives Plutio 7.2/10 and calls it strong value for a solo operator at the entry price. It warns that each module is decent rather than best-in-class and that the feature sprawl carries a learning curve.",
        },
        {
          title: "Plutio Review 2026",
          source: "BStackRadar",
          url: "https://www.bstackradar.com/tools/plutio",
          summary:
            "Rated 6.6/10, describing Plutio as a bootstrapped all-in-one with shallow native automation and reporting. It also notes a public changelog that stopped updating, which is a useful signal about development pace.",
        },
        {
          title: "Plutio vs Dubsado (2026): Honest Comparison",
          source: "Agiled",
          url: "https://agiled.app/compare/plutio-vs-dubsado",
          summary:
            "Concludes Plutio gives more features per dollar while Dubsado wins on conditional logic and mature automation. The comparison is vendor-published, so its conclusions should be read with that in mind, but the feature inventory is detailed.",
        },
        {
          title: "Plutio vs Dubsado in 2026: Full Comparison",
          source: "Zendo",
          url: "https://getzendo.io/blog/plutio-vs-dubsado",
          summary:
            "Notes that the two products are effectively tied on G2 star ratings, so the choice comes down to features and setup time rather than social proof. It walks through the module-by-module differences for a small team.",
        },
        {
          title: "Plutio…does anyone use?",
          source: "Reddit r/freelance",
          url: "https://www.reddit.com/r/freelance/comments/ap6rn9/plutio_does_anyone_use",
          summary:
            "A long-running user thread where freelancers report daily use for invoicing, subscriptions, proposals, contracts and task management. The recurring complaint is the client-messaging system, with several users saying their clients simply revert to email.",
        },
        {
          title: "Finding an alternative solution to Plutio",
          source: "Reddit r/Plutio",
          url: "https://www.reddit.com/r/Plutio/comments/1cpfaer/finding_an_alternative_solution_to_plutio",
          summary:
            "A thread from an owner citing forum and marketplace reviews as evidence that support had become unreliable, and asking for alternatives with the same project, task and invoicing coverage. It illustrates the support concern more concretely than any score.",
        },
        {
          title: "Plutio on Product Hunt",
          source: "Product Hunt",
          url: "https://www.producthunt.com/products/plutio",
          summary:
            "The launch listing, rated around 3.7 from a small number of reviews. The most prominent review says the product used to be great but that responsiveness to bug reports declined, which mirrors the wider sentiment in user forums.",
        },
        {
          title: "Plutio reviews",
          source: "AppSumo",
          url: "https://appsumo.com/products/plutio/reviews",
          summary:
            "Marketplace reviews from lifetime-deal buyers, averaging around 4.6 from roughly 200 verified purchasers. Complaints focus on unanswered tickets and workspace archiving, and the founder has replied in-thread to clarify the archiving policy.",
        },
        {
          title: "Plutio Review: Pricing, Pros, Cons & The Catch",
          source: "Toolgradely",
          url: "https://toolgradely.com/tools/plutio",
          summary:
            "Grades Plutio A− and states the central trade-off plainly: the breadth of features means individual modules are less deep than specialist apps. It is a useful counterweight to reviews that count features without weighing them.",
        },
      ],
    },
  },

  agiled: {
    checkedOn: PRICING_CHECKED,
    pricingSource: { label: "Agiled — official pricing page", url: "https://agiled.app/pricing" },
    pricing: [
      { plan: "Starter", price: "$29/mo, or $24/mo billed yearly", note: "One seat; 500 contacts, 10 projects" },
      { plan: "Pro", price: "$69/mo, or $59/mo billed yearly", note: "Three seats; workflows, API, unlimited projects" },
      { plan: "Business", price: "$129/mo, or $99/mo billed yearly", note: "Seven seats; branded portal, accounting sync" },
      { plan: "Scale", price: "$249/mo, or $199/mo billed yearly", note: "Fifteen seats; accounting intelligence" },
    ],
    pricingNote:
      "Per workspace, with seats included per plan; extra seats cost about $20 per seat per month on Pro and above. There is no free plan; the trial is 14 days with Business features and no card. Agiled only renders its annual view server-side, so the monthly figures are corroborated by its own comparison posts and an independent tracker rather than read directly from the toggle.",
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
        "Agiled has a large, high review-site score and a much lower Trustpilot score, which makes it a good example of why a single average is a poor buying signal. Editorial and practitioner coverage agrees on the product shape: a very broad all-in-one with strong value and uneven depth.",
      summary:
        "Reviews describe Agiled as a sales-pipeline-centred platform: contacts, deals, projects, proposals, contracts, invoices, forms and automation in one account, priced per workspace with seats included rather than per seat. The positive case is breadth and price: G2 and Capterra both sit around 4.7 from several hundred reviews, and reviewers repeatedly praise the branded client portal and the fact that data is shared across modules. The critical case is depth and polish. Long-form reviews note that no module beats a specialist, that the interface can lag on large datasets, and that onboarding has a learning curve. Trustpilot is markedly lower at around 2.5, and marketplace reviews from lifetime-deal buyers are mixed about support and a platform migration. The 2026 pricing trackers agree on $24/$59/$99/$199 per month billed yearly, with a 14-day trial and no free plan, though the monthly figures are less certain because the vendor page renders only the annual view. The practical conclusion is that Agiled suits a small business that wants a pipeline and documents in one bill and values breadth over depth, and fits a document-first freelancer less well. The split between review-site and Trustpilot sentiment is the single most important thing to understand before buying: the product is genuinely liked by many small businesses, and simultaneously has a meaningful group of customers who feel let down by support or by a migration. Reading recent marketplace reviews is more useful than reading the average, because the recent ones describe the current support experience rather than the product as it was two years ago. The plan ladder is generous on seats and tight on module depth, so the Business tier is the first one that includes a branded portal and accounting sync — features many buyers assume are standard. A buyer should decide whether the pipeline or the client document is the centre of the business; Agiled is strongest when the pipeline is real and consistently maintained, and weakest when it is a form filled in because the software asks. A useful way to read the coverage is by the job the reviewer was doing. Pipeline-focused reviews rate Agiled on deals, automations and CRM hygiene; document-focused reviews spend their time on how a proposal is presented and what the client can do inside it. Both are fair, and they answer different questions. For a freelancer the document-focused pieces are the closer comparison, because the client never sees the pipeline and does see the proposal.",
      articles: [
        {
          title: "Agiled sold lifetime licences to build its user base…",
          source: "Frontier Edit",
          url: "https://www.frontieredit.com/stories/startup-agiled",
          summary:
            "An investigative piece arguing that Agiled's early growth came from a startup directory and marketplace lifetime deals rather than subscriptions. It contrasts the old per-company revenue with today's plan prices and details what a lifetime code unlocked.",
        },
        {
          title: "Agiled pricing (2026)",
          source: "Front Desk Review",
          url: "https://frontdeskreview.com/software/client-portal-crm/agiled",
          summary:
            "A price tracker that read both billing views directly, recording monthly and annual figures with seat counts and limits. It is the most useful independent confirmation of the monthly prices, which the vendor page itself does not server-render.",
        },
        {
          title: "Agiled review",
          source: "Stackbases",
          url: "https://stackbases.com/tools/agiled",
          summary:
            "Scores Agiled 4.7/5 but labels it overhyped, saying the main reason people switch is consolidating four or five tools. It flags weak module depth, missing two-factor authentication and a learning curve for teams needing a best-in-class CRM.",
        },
        {
          title: "Agiled Pricing Reviews Pros and Cons: Full 2026 Guide",
          source: "Tomba",
          url: "https://tomba.io/blog/agiled-pricing-reviews-pros-and-cons",
          summary:
            "Aggregates review-site sentiment and summarises recurring praise for value, shared data and the branded portal against recurring criticism of module depth, interface lag and support speed. It is a balanced summary of the public review record.",
        },
        {
          title: "9 Best Agiled Alternatives for 2026",
          source: "Tomba",
          url: "https://tomba.io/blog/agiled-alternatives",
          summary:
            "Frames Agiled against HoneyBook, Bonsai, SuiteDash, Plutio and others by price, features and use case. It positions Agiled as the flat-fee all-in-one, with depth versus specialisation as the trade-off.",
        },
        {
          title: "Agiled vs SuiteDash: An honest comparison",
          source: "Assembly",
          url: "https://assembly.com/blog/agiled-vs-suitedash",
          summary:
            "Praises Agiled's clean interface, core client and project management and mobile app, while saying SuiteDash is deeper but more complex. Its pricing section is outdated, so use it for the product comparison rather than the numbers.",
        },
        {
          title: "Agiled Review: How Agile It Truly Is?",
          source: "Zendo",
          url: "https://getzendo.io/blog/agiled-review",
          summary:
            "A sceptical review that still cites the strong G2 score and the near-absence of one-star ratings, while noting complaints about intuitiveness, unfinished features and onboarding. It characterises Agiled as genuinely all-in-one but rough around the edges.",
        },
        {
          title: "Agiled reviews",
          source: "AppSumo",
          url: "https://appsumo.com/products/agiled/reviews",
          summary:
            "Marketplace reviews from lifetime-deal buyers, averaging around 4.8 but with recent reviews skewing negative about support and a platform migration. Buyers with multiple codes report being asked to repurchase for the new version.",
        },
        {
          title: "Still Using Agiled? Its Free Plan Caps at 5 Invoices",
          source: "Plutio",
          url: "https://www.plutio.com/freelancer-magazine/still-using-agiled",
          summary:
            "A competitor-published critique listing reported bugs and claiming a free plan with tight invoice, project and client caps. It is heavily vendor-biased and its plan structure conflicts with Agiled's current page, so treat it as sentiment rather than fact.",
        },
        {
          title: "Agiled reviews",
          source: "SoftwareFinder",
          url: "https://softwarefinder.com/project-management-software/agiled/reviews",
          summary:
            "A verified-review profile scoring around 4.8 from dozens of customers, with ease of use and value for money both rated highly. It reinforces the review-site picture without addressing the Trustpilot divergence.",
        },
      ],
    },
  },

  "google-microsoft": {
    checkedOn: PRICING_CHECKED,
    pricingSource: { label: "Google Workspace pricing (official)", url: "https://workspace.google.com/pricing" },
    pricing: [
      { plan: "Google Workspace Business Starter", price: "$8.40/mo flexible, or $7.00/mo annual", note: "30 GB per user, 100-person meetings" },
      { plan: "Google Workspace Business Standard", price: "$16.80/mo flexible, or $14.00/mo annual", note: "2 TB per user, recording, eSignature" },
      { plan: "Google Workspace Business Plus", price: "$26.40/mo flexible, or $22.00/mo annual", note: "5 TB per user, Vault, advanced controls" },
      { plan: "Microsoft 365 Business Basic", price: "$8.40/mo monthly, or $7.00/mo annual", note: "Web and mobile Office apps, 1 TB OneDrive" },
      { plan: "Microsoft 365 Business Standard", price: "$16.80/mo monthly, or $14.00/mo annual", note: "Desktop Office apps on five devices" },
      { plan: "Microsoft 365 Business Premium", price: "$26.40/mo monthly, or $22.00/mo annual", note: "Intune, Defender, conditional access" },
    ],
    pricingNote:
      "Per user, per month, before tax, on US list prices. Since July 2026 both suites list at the same $7 / $14 / $22 annual tiers and $8.40 / $16.80 / $26.40 monthly tiers. Google and Microsoft both run time-limited promotions, and local currency and reseller pricing vary; the vendor pages are the only reliable source for a specific country.",
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
        "The suites are not really reviewed as products any more; they are reviewed as defaults. Coverage in 2026 focuses on two questions: which one fits a browser-first team, and whether paying for a suite is better than connecting free or cheap tools by hand.",
      summary:
        "Editorial comparisons now start from the fact that the two vendors list identical prices at the three small-business tiers: roughly $7, $14 and $22 per user per month on annual terms, or $8.40, $16.80 and $26.40 monthly. The decision therefore turns on inclusions and habits. Google is consistently described as the better browser-first collaboration suite, with pooled storage and bundled Gemini features, while Microsoft is described as the better fit for teams that live in desktop Word, Excel and Outlook or manage Windows devices with Intune. Review-site scores are high for both — Capterra around 4.7 for Google Workspace and 4.6 for Microsoft 365 — but those averages mostly measure familiarity. The critical coverage is about the gap between the pieces: a proposal is a file, the client's answer lives in an inbox, the contract is signed elsewhere, and the invoice is a PDF with bank details. Reviewers rarely call the suites bad; they describe the cost of connecting them as the freelancer's unpaid administrative work. That is the gap a document-centred product addresses, and the honest counter-argument is that the suites are cheaper and universally understood. The reviews of the suites themselves are not really reviews of a workflow: they assess documents, mail, storage and meetings one at a time, because that is how the products are sold. The gap appears only when the pieces are combined, and no suite review measures it, because the assembly is the customer's job. What the coverage does establish is the baseline any paid product has to beat: the documents are familiar, the storage is generous and the licence is already paid for. A reader can substitute the 13-point breakdown on this site for the missing end-to-end review: it asks the same questions of every platform, including the two suites, and records the answer where a suite review stops at the feature list.",
      articles: [
        {
          title: "Google Workspace vs. Microsoft 365: What's the best office suite for business?",
          source: "Computerworld",
          url: "https://www.computerworld.com/article/1672155/g-suite-vs-office-365-whats-the-best-office-suite-for-business.html",
          summary:
            "A long-running comparison from an established IT publication, refreshed for business buyers. It weighs collaboration against desktop-app depth and tracks the AI features each vendor bundles, rather than scoring consumer features.",
        },
        {
          title: "The best email hosting for small businesses in 2026",
          source: "ZDNET",
          url: "https://www.zdnet.com/article/best-email-hosting-for-small-businesses",
          summary:
            "A hands-on test aimed at freelancers and remote teams. It picks Google Workspace as the best bundle of domain email with documents and meetings, and Microsoft 365 for teams already inside Word, Excel and Outlook.",
        },
        {
          title: "Google Workspace vs Microsoft 365: Which Is Better in 2026?",
          source: "Fit Small Business",
          url: "https://fitsmallbusiness.com/g-suite-vs-office-365",
          summary:
            "Scores both suites on pricing, apps, collaboration, storage, security and ease of use. It concludes Google wins for browser-first collaboration and Microsoft for desktop apps and admin controls, and lists Google starting at $7 per user per month billed annually.",
        },
        {
          title: "Google Workspace vs Microsoft 365 for Small Business (2026)",
          source: "The Tech Hacker",
          url: "https://thetechhacker.com/2026/11/12/google-workspace-vs-microsoft-365-small-business/",
          summary:
            "A November 2026 side-by-side using both vendors' own US plan pages. It recommends Google Business Standard for browser and shared-document teams, and Microsoft Business Standard or Premium for desktop Office and device management.",
        },
        {
          title: "Google Workspace vs Microsoft 365 for Small Business",
          source: "Managed Nerds",
          url: "https://www.managednerds.tech/blog/google-workspace-vs-microsoft-365-the-honest-comparison-nobody-asked-for",
          summary:
            "An MSP-written tier-by-tier comparison that flags a common trap: Microsoft Business Basic has no desktop apps, so the fair comparison with Google Business Starter is the more expensive Standard tier. It advises staying put if the current suite works.",
        },
        {
          title: "Google Workspace vs Microsoft 365 for a Small Business",
          source: "4ITX",
          url: "https://4itx.com/en/blog/google-workspace-vs-microsoft-365-small-business",
          summary:
            "Declares no affiliate links or vendor payment and states prices were checked on the vendor sites in October 2026. It covers storage, desktop apps, security and AI, noting Gemini is bundled while Copilot is a paid add-on.",
        },
        {
          title: "Google Workspace vs Microsoft 365: 2026 Prices",
          source: "NetSys Group",
          url: "https://www.netsysgroup.com/blog/microsoft-365-vs-google-workspace-small-business",
          summary:
            "Argues price no longer decides the choice because the tiers match at $7/$14/$22, so the real comparison is inclusions and whether tiers can be mixed. It recommends Microsoft for desktop Office and managed Windows fleets, Google for browser co-editing.",
        },
        {
          title: "Microsoft 365 vs. Google Workspace: A Neutral Comparison",
          source: "Agile vCIO",
          url: "https://agilevcio.com/articles/microsoft-365-vs-google-workspace",
          summary:
            "A neutral, documentation-based comparison reviewed in October 2026 and aimed at small businesses choosing email, calendars, files and meetings. It focuses on apps, administration and security rather than scoring, and notes both vendors target organisations up to 300 users.",
        },
        {
          title: "Google Workspace vs Microsoft 365 for Startups in 2026: What Does AI Really Add per Seat?",
          source: "Startupik",
          url: "https://startupik.com/google-workspace-vs-microsoft-365-for-startups",
          summary:
            "Models a ten-seat team's annual bill including Gemini limits and Copilot add-on pricing. It concludes the base suites are identical at $7/$14/$22 and that Microsoft only wins on desktop Excel, managed Windows fleets or exhausted Gemini allowances.",
        },
        {
          title: "Microsoft 365 vs Google Workspace for IT Teams",
          source: "Flamingo",
          url: "https://www.flamingo.run/blog/microsoft-365-vs-google-workspace",
          summary:
            "An operator-oriented comparison covering apps, administration, security, storage and migration. It states plainly that since July 2026 both suites list at the same three price points and separates browser-first buyers from desktop-Office and Windows-fleet buyers.",
        },
      ],
    },
  },
};
