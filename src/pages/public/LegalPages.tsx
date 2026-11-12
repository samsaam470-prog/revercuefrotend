import type { ReactNode } from "react";
import { formatDate } from "../../lib/formatters";

interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

function LegalLayout({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="legal-layout">
      <nav className="legal-toc" aria-label="Contents">
        <span className="eyebrow">Contents</span>
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.heading}
          </a>
        ))}
      </nav>
      <article className="legal-body">
        <h1>{title}</h1>
        <p className="caption">Last updated {formatDate(updated)}</p>
        <p style={{ marginTop: 16 }}>{intro}</p>
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.heading}</h2>
            {section.body}
          </section>
        ))}
      </article>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy"
      updated="2026-11-01"
      intro="This page says exactly what we collect, why, who stores it and how long it stays. If a sentence here is vague, treat it as a bug and tell us."
      sections={[
        {
          id: "collect",
          heading: "1. What we collect",
          body: (
            <>
              <p>
                <strong>Account data:</strong> email, name, business name, plan, usage counts, last
                login, two-factor state.
              </p>
              <p>
                <strong>Product data:</strong> documents, client records, communication entries,
                notes, saved FAQs and packages, templates and their files.
              </p>
              <p>
                <strong>Tracking data:</strong> document opens, time spent, clicks and answers, by
                plan. Raw events are reduced to a time-spent total after five days.
              </p>
              <p>
                <strong>Payment data:</strong> plan, amount, date, reference and status. We never see
                or store card numbers.
              </p>
            </>
          ),
        },
        {
          id: "use",
          heading: "2. How we use it",
          body: (
            <ul>
              <li>To run the product: documents, tracking, the client record.</li>
              <li>To support you when you write to us.</li>
              <li>To bill you and keep the records tax law requires.</li>
              <li>To evaluate the suggestion patterns against your own log.</li>
            </ul>
          ),
        },
        {
          id: "share",
          heading: "3. Who we share it with",
          body: (
            <ul>
              <li>Cloudflare for delivery and the Worker proxy.</li>
              <li>Backblaze B2 for file storage in a private bucket.</li>
              <li>Turso for the database.</li>
              <li>FormSubmit for transactional email delivery.</li>
            </ul>
          ),
        },
        {
          id: "retention",
          heading: "4. Retention",
          body: (
            <ul>
              <li>Documents follow the plan: 1, 3, 12, 24 or 36 months, with a PDF emailed before deletion.</li>
              <li>Tracking events are reduced after 5 days.</li>
              <li>Notifications live for 90 days.</li>
              <li>Saved FAQs and packages expire after 3 months of not being used.</li>
              <li>A deleted account is removed after a 5-day grace period.</li>
            </ul>
          ),
        },
        {
          id: "rights",
          heading: "5. Your rights",
          body: (
            <p>
              You can export your clients as CSV and your documents as PDF, correct your profile at
              any time, and delete the account from Settings. Write to hello@revercue.com for
              anything else. Where GDPR or CCPA applies, we honour the access, correction, deletion
              and portability rights those laws provide.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "6. Contact",
          body: <p>hello@revercue.com — we read every message and reply within one business day.</p>,
        },
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      title="Terms"
      updated="2026-11-01"
      intro="The rules of the service, in plain language. Where these terms and the product disagree, the product's actual behaviour is the bug — tell us."
      sections={[
        {
          id: "service",
          heading: "1. The service",
          body: (
            <p>
              Revercue provides tools for proposals, contracts, requirement forms, invoices and a
              client record. Revercue is not a law firm, not an accountant and not a payment
              processor. Contracts created here are not a legally binding e-signature; the client's
              approval is a confirmation, not a signature.
            </p>
          ),
        },
        {
          id: "account",
          heading: "2. Your account",
          body: (
            <p>
              One person per account. Keep your password and your document passwords secure. You are
              responsible for the content you publish and for the links you share.
            </p>
          ),
        },
        {
          id: "use",
          heading: "3. Acceptable use",
          body: (
            <ul>
              <li>No illegal content, no harassment, no spam.</li>
              <li>No abuse of the API or the rate limits.</li>
              <li>No reselling the service without an agreement.</li>
            </ul>
          ),
        },
        {
          id: "payment",
          heading: "4. Payment",
          body: (
            <p>
              Free is available now. The paid plans are invite-only: you join the waitlist and the
              team reaches out when a spot opens. There is no automated checkout and there are no
              refunds. Downgrades take effect at the end of the billing cycle, and documents above the
              new limit are archived.
            </p>
          ),
        },
        {
          id: "termination",
          heading: "5. Termination",
          body: (
            <p>
              You can delete your account at any time, with a 5-day grace period and an email copy of
              your data. We can suspend an account for abuse, with notice unless the law says
              otherwise.
            </p>
          ),
        },
        {
          id: "liability",
          heading: "6. Liability",
          body: (
            <p>
              The service is provided as is. Our liability is limited to the amount you paid in the
              previous twelve months. We are not liable for lost profits or for a client relationship
              that did not work out.
            </p>
          ),
        },
        {
          id: "law",
          heading: "7. Governing law",
          body: <p>The terms are governed by the laws of the jurisdiction stated in your invoice.</p>,
        },
      ]}
    />
  );
}

export function SecurityPage() {
  return (
    <>
      <LegalLayout
        title="Security"
        updated="2026-11-01"
        intro="A trust page, not a legal one. What is encrypted, who can see what, and what we deliberately do not do."
        sections={[
          {
            id: "encryption",
            heading: "1. Encryption",
            body: (
              <ul>
                <li>TLS 1.3 in transit.</li>
                <li>AES-256 at rest.</li>
                <li>bcrypt for account passwords.</li>
                <li>Argon2id for document passwords.</li>
              </ul>
            ),
          },
          {
            id: "storage",
            heading: "2. Storage",
            body: (
              <p>
                Files live in a private bucket and are served through a Worker proxy. There are no
                direct storage URLs. Public document IDs are unguessable and served noindex, nofollow.
              </p>
            ),
          },
          {
            id: "retention",
            heading: "3. Retention",
            body: (
              <p>
                Tracking events are reduced after 5 days. Notifications live for 90 days. Documents
                are deleted at the end of the plan's retention, and a PDF is emailed first.
              </p>
            ),
          },
          {
            id: "access",
            heading: "4. Access",
            body: (
              <p>
                The team sees account data for support and billing, not the content of your
                documents, clients, notes or communication log. The one exception, stated honestly: a
                report of illegal use, or a legal requirement.
              </p>
            ),
          },
          {
            id: "third-parties",
            heading: "5. The third parties",
            body: (
              <p>
                Cloudflare, Backblaze B2, Turso and FormSubmit. They store or deliver; they do not
                read your documents.
              </p>
            ),
          },
          {
            id: "not",
            heading: "6. What we do not do",
            body: (
              <ul>
                <li>No model analyses your content.</li>
                <li>No cross-site tracking and no advertising pixels.</li>
                <li>We do not sell data.</li>
              </ul>
            ),
          },
        ]}
      />
    </>
  );
}
