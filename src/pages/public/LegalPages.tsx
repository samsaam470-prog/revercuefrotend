import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../lib/formatters";
import { FAQItem } from "../../components/shared/FAQItem";
import { faqsByGroup } from "../../lib/faqs";

interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

function ContactLink() {
  return (
    <Link to="/contact" style={{ color: "var(--gold)" }}>
      contact form
    </Link>
  );
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
      updated="2026-11-22"
      intro="This page says exactly what we collect, why, who stores it and how long it stays. If a sentence here is vague, treat it as a bug and tell us."
      sections={[
        {
          id: "collect",
          heading: "1. What we collect",
          body: (
            <>
              <p>
                <strong>Account data.</strong> Your email address, name, business name, account type,
                plan, services, brand colours, website and optional Fiverr profile. We also keep
                coarse usage counts (documents, clients, storage), the time of your last login, and
                your email and notification preferences.
                This is the minimum needed to sign you in, apply your plan limits and render your
                brand on client pages.
              </p>
              <p>
                <strong>Product data.</strong> The documents you create and everything inside them:
                proposals, contracts, requirement forms, invoices, their blocks and answers, the
                client records, the communication log you write, notes, saved FAQs, saved packages,
                revision prices, templates and any files you upload. This is your content. We store it
                so the product works and we do not read it.
              </p>
              <p>
                <strong>Tracking data.</strong> When a client opens a shared link we record the open,
                and depending on your plan the timestamp, the time spent, the buttons clicked, the
                answers submitted and the questions asked. On Scale we also keep the session timeline
                and the behavioural signals that produce the interest level. Tracking is about the
                document, not about advertising: there are no third-party pixels on client pages.
              </p>
              <p>
                <strong>Payment data.</strong> Plan, amount, date, method, reference and status. Card
                numbers never touch our servers: payment is handled by the payment provider, and we
                only receive the outcome.
              </p>
              <p>
                <strong>Support data.</strong> What you write in the contact form or in Settings →
                Feedback, including the account context attached to it. That context is the reason the
                form exists instead of a public email address.
              </p>
            </>
          ),
        },
        {
          id: "use",
          heading: "2. How we use it",
          body: (
            <>
              <ul>
                <li>To authenticate you, keep the session alive and protect the account.</li>
                <li>To render your documents, apply your brand and enforce the plan limits.</li>
                <li>To build the client record from the documents you send, so you do not re-type it.</li>
                <li>To calculate the tracking summaries and, on Scale, the interest arithmetic.</li>
                <li>To send transactional email: account notices, security alerts and document reminders.</li>
                <li>To bill you, keep the records tax law requires, and answer your support requests.</li>
                <li>To evaluate the suggestion rules against your own activity, so a follow-up fires when it should.</li>
              </ul>
              <p>
                We do not use your content to train anything. The helper that rewrites a selected
                passage in the builders never sends that text to us, and we never store it; the
                suggestions elsewhere are written rules over your own record. We do not build an
                advertising profile, and we do not sell or rent data to anyone.
              </p>
            </>
          ),
        },
        {
          id: "share",
          heading: "3. Who we share it with",
          body: (
            <>
              <p>
                We share data only with the processors that make the service run, and only the part
                each one needs:
              </p>
              <ul>
                <li><strong>Cloudflare</strong> — delivery, DNS, the Worker proxy and rate limiting.</li>
                <li><strong>Backblaze B2</strong> — file storage in a private bucket, served through the proxy.</li>
                <li><strong>Turso</strong> — the database that holds accounts and documents.</li>
                <li><strong>AuthAction</strong> — authentication and OIDC.</li>
                <li><strong>Coopermail</strong> — primary transactional email delivery for account, security and document notices.</li>
                <li><strong>Openmail</strong> — fallback transactional email delivery.</li>
              </ul>
              <p>
                We may disclose data if the law requires it, or to investigate a credible report of
                illegal use. If that happens and we are allowed to tell you, we will. We never sell
                data, and we never hand your client list to another customer.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          heading: "4. Retention",
          body: (
            <>
              <p>
                Retention follows the plan because that is what you pay for. Documents live for 1
                month on Free, 3 on Starter, 12 on Growth, 24 on Scale and 36 on Teams. Before a
                document is deleted at the end of its retention, a PDF is emailed to you, so the
                content is not lost in a silent sweep.
              </p>
              <ul>
                <li>Drafts are kept for 10, 30, 50, 80 or 80 days depending on the plan.</li>
                <li>Raw tracking events are reduced to a time-spent total after 5 days; the events themselves are deleted.</li>
                <li>Notifications live for 90 days.</li>
                <li>Saved FAQs and saved packages expire after 3 months without use.</li>
                <li>A deleted account enters a 5-day grace period, then is removed with its documents and files.</li>
              </ul>
              <p>
                Billing records are kept longer where tax law requires it. Those records contain the
                payment, not the content of your documents.
              </p>
            </>
          ),
        },
        {
          id: "rights",
          heading: "5. Your rights",
          body: (
            <>
              <p>
                You can see and correct your profile at any time in Settings. You can export your
                clients as CSV and download each document as a PDF. You can delete the account
                yourself from Settings → Delete Account; the grace period exists so an accidental
                click is recoverable, not so deletion is hard.
              </p>
              <p>
                For an access, correction, deletion or portability request beyond what the product
                offers, use the <ContactLink /> or Settings → Feedback so the request arrives with
                your account attached. Where GDPR or CCPA applies, we honour the rights those laws
                provide, including the right to object to processing and the right to a copy of your
                data in a portable format. We answer within one business day and complete the request
                within the period the law allows.
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          heading: "6. Cookies and local storage",
          body: (
            <>
              <p>
                Revercue does not use advertising cookies and does not embed advertising pixels. The
                product stores what it needs to work: a session token so you stay signed in, the theme
                choice you made in Settings → Appearance, and small client-side drafts so a reload does
                not lose a paragraph you were writing.
              </p>
              <p>
                The theme is stored on your device, not on your account. That is deliberate: a phone and a
                work laptop can differ, and clearing the browser storage only costs you the toggle, not
                access to your account.
              </p>
              <p>
                Client-facing document pages carry no analytics scripts. A client opening a proposal is
                not tracked by a third party, and the tracking you see is first-party, derived from the
                document itself.
              </p>
            </>
          ),
        },
        {
          id: "transfers",
          heading: "7. Where the data goes",
          body: (
            <>
              <p>
                The application runs on Cloudflare's network, the files sit in a private Backblaze B2
                bucket served through a Worker proxy, and the application data lives in Turso.
                Authentication is handled by AuthAction. Transactional email is delivered by Coopermail,
                with Openmail as fallback. These providers may process data in more than one region;
                where a transfer crosses a border, it relies on the safeguards those providers publish,
                such as standard contractual clauses.
              </p>
              <p>
                Your documents are not sent to any other party. There is no analytics vendor, no data
                broker, no advertising network and no model provider in the path of your client work.
              </p>
              <p>
                If a processor changes, this page and the Security page are updated before the change
                takes effect, because a change of processor is a material change to this policy.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          heading: "8. Changes to this page",
          body: (
            <>
              <p>
                When this policy changes, the date at the top changes with it, and a material change is
                announced inside the product before it takes effect. A material change means a new
                category of data, a new processor, or a new use of data you already gave us.
              </p>
              <p>
                If you disagree with a change, you can export your data and close the account; the
                five-day deletion grace period still applies.
              </p>
            </>
          ),
        },
        {
          id: "contact",
          heading: "9. Contact",
          body: (
            <>
              <p>
                Use the <ContactLink /> for a privacy question. If the question involves your account
                or your data, Settings → Feedback is faster because it carries the account context.
                We read every message and reply within one business day.
              </p>
              <p>
                There is no public email address, by design. A form gives us the account, the plan and
                the request in one place, which is what a privacy request needs.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      title="Terms"
      updated="2026-11-22"
      intro="The rules of the service, in plain language. Where these terms and the product disagree, the product's actual behaviour is the bug — tell us."
      sections={[
        {
          id: "service",
          heading: "1. The service",
          body: (
            <>
              <p>
                Revercue provides tools for proposals, contracts, requirement forms, invoices and a
                client record. It keeps the thread between them: a client created by a proposal is the
                same client on the contract, the form, the invoice and the record.
              </p>
              <p>
                Revercue is not a law firm, not an accountant and not a payment processor. A contract
                can be signed here with a simple electronic signature: the signer types their full name
                and ticks explicit consent, and the signature is recorded against that document version
                with a timestamp. It is not a qualified or certificate-based signature, there is no
                identity verification beyond the email address and the browser session, and there is no
                audit certificate. Invoice payment instructions are yours: Option A redirects to a link
                you supply, Option B displays the account details you enter. We do not hold, move or
                guarantee the money.
              </p>
            </>
          ),
        },
        {
          id: "account",
          heading: "2. Your account",
          body: (
            <>
              <p>
                One person per account. You are responsible for keeping your AuthAction credentials and any
                document passwords secure, and for the content you publish
                under your links. Tell us promptly if you believe an account or a link has been
                compromised so we can help you rotate it.
              </p>
              <p>
                You must be old enough to enter a contract where you live. If you use Revercue for a
                company, you confirm you may accept these terms for it.
              </p>
            </>
          ),
        },
        {
          id: "use",
          heading: "3. Acceptable use",
          body: (
            <>
              <ul>
                <li>No illegal content, no harassment and no spam sent through shared links.</li>
                <li>No attempt to break the rate limits, the password walls or the access rules.</li>
                <li>No reselling the service, or exposing it as your own product, without an agreement.</li>
                <li>No uploading malware, or content you have no right to share.</li>
                <li>No automated scraping of other customers' public documents.</li>
              </ul>
              <p>
                We can suspend an account that breaks these rules. Where the situation allows notice,
                you get it, along with a way to export your data.
              </p>
            </>
          ),
        },
        {
          id: "payment",
          heading: "4. Payment",
          body: (
            <>
              <p>
                Free is available now. Starter, Growth and Scale are invite-only: you join the
                waitlist and the team reaches out when a spot opens. Teams is in beta; join the beta
                and the team will reach out when a spot opens.
              </p>
              <p>
                There is no automated checkout in the fresh state and no refunds. A plan change takes
                effect at the end of the current cycle. On a downgrade, documents above the new limit
                are archived rather than deleted, and the archive rules of your new plan apply. If a
                payment fails, the plan drops to Free at the end of the grace period and the Free
                limits apply.
              </p>
            </>
          ),
        },
        {
          id: "termination",
          heading: "5. Termination",
          body: (
            <>
              <p>
                You can delete your account at any time from Settings → Delete Account. Deletion has a
                5-day grace period, during which logging in cancels it, and an email copy of your data
                is sent before removal. After the grace period the account, its documents, its files
                and its client records are removed.
              </p>
              <p>
                We can suspend or terminate an account for a serious breach of these terms, for
                non-payment, or where the law requires it. Except in an emergency or where the law
                forbids it, we tell you why and give you a window to export.
              </p>
            </>
          ),
        },
        {
          id: "liability",
          heading: "6. Liability",
          body: (
            <>
              <p>
                The service is provided as is. To the extent the law allows, our total liability is
                limited to the amount you paid in the previous twelve months, and we are not liable
                for lost profits, lost opportunities or a client relationship that did not work out.
              </p>
              <p>
                You are responsible for the accuracy of what you send: prices, scope, payment details
                and legal wording. Keep your own copy of anything you cannot afford to lose; the PDF
                export exists for exactly that.
              </p>
            </>
          ),
        },
        {
          id: "content",
          heading: "7. Your content and your clients",
          body: (
            <>
              <p>
                Everything you put into Revercue stays yours: the proposal text, the contract wording, the
                form questions, the invoice line items, your logo and your client records. You grant us
                the limited permission needed to store, render and deliver those documents to the people
                you share them with — nothing more.
              </p>
              <p>
                You are responsible for having the right to use the content you upload, including a
                client's logo or contact details, and for the accuracy of what you send: prices, scope,
                payment details and legal wording. Revercue does not review documents for legal
                sufficiency and does not act as your lawyer.
              </p>
              <p>
                The client record — names, dates, services, summaries — survives the documents, as
                described on the Privacy page. Export it whenever you like; leaving does not require our
                permission.
              </p>
            </>
          ),
        },
        {
          id: "third-party",
          heading: "8. Links and external tools",
          body: (
            <>
              <p>
                The footer buttons open external tools with a prompt we wrote. The answer comes from that
                tool, under that tool's terms. We send nothing with you except the public prompt in the
                URL, and we do not receive the answer back.
              </p>
              <p>
                Client documents can contain links you add yourself, such as a payment page or your own
                website. Those destinations are yours to choose and yours to support. A link in a
                document is not an endorsement by Revercue.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          heading: "9. Changes to the service and these terms",
          body: (
            <>
              <p>
                Features can change. When a change removes something you rely on, we say so in the
                product before it happens and, where the plan allows, keep a path to export what the
                feature produced. The plans themselves are described on the Pricing page; the Free plan
                stays free, the paid plans stay invite-only while the product is in its fresh state.
              </p>
              <p>
                These terms can be updated. The date at the top of this page always identifies the
                version in force, and a material change is announced before its effective date. If you
                do not accept it, export your data and close the account.
              </p>
            </>
          ),
        },
        {
          id: "law",
          heading: "10. Governing law",
          body: (
            <>
              <p>
                These terms are governed by the laws of the jurisdiction stated on your invoice. If a
                dispute arises, we will try to resolve it with you directly first: write through the{" "}
                <ContactLink /> and we will answer within one business day.
              </p>
              <p>
                If any part of these terms is found unenforceable, the rest stays in force. We may
                update the terms; a material change is announced in the product before it takes
                effect, and the date at the top of this page always tells you which version you are
                reading.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}

export function SecurityPage() {
  const dataFaqs = faqsByGroup(["data"]);
  return (
    <>
    <LegalLayout
      title="Security"
      updated="2026-11-22"
      intro="A trust page, not a legal one. What is encrypted, who can see what, and what we deliberately do not do."
      sections={[
        {
          id: "encryption",
          heading: "1. Encryption",
          body: (
            <>
              <p>
                Everything travels over TLS 1.3. Data at rest is encrypted with AES-256. Account
                passwords are hashed with bcrypt; document passwords are hashed with Argon2id, so a
                leaked database does not hand over a document password in a usable form.
              </p>
              <p>
                Sessions use short-lived bearer tokens stored in the browser, revoked on logout. The
                password wall issues a separate session token for that one document, so unlocking a
                proposal does not unlock anything else.
              </p>
            </>
          ),
        },
        {
          id: "storage",
          heading: "2. Storage",
          body: (
            <>
              <p>
                Files live in a private bucket and are served through a Worker proxy. There are no
                direct storage URLs to guess or to leak. Public document IDs are long, random and
                unguessable, and client pages are served with noindex, nofollow so search engines do
                not archive them.
              </p>
              <p>
                Document passwords add a second gate on top of the unguessable link: three attempts,
                then a fifteen-minute lock. On a shared computer, the closed page tells the next
                visitor that the document is closed rather than showing its contents.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          heading: "3. Retention",
          body: (
            <>
              <p>
                Raw tracking events are reduced to a time-spent total after 5 days and the events are
                deleted. Notifications live for 90 days. Documents are deleted at the end of the
                plan's retention, and a PDF is emailed first. Saved FAQs and packages expire after
                three months without use. A deleted account is removed after a five-day grace period.
              </p>
              <p>
                Backups are short-lived and follow the same deletion: a backup that still holds a
                deleted document ages out on its own schedule, and is never restored except to
                recover from an outage.
              </p>
            </>
          ),
        },
        {
          id: "access",
          heading: "4. Access",
          body: (
            <>
              <p>
                The team sees account data for support and billing, not the content of your
                documents, your clients, your notes or your communication log. Access to production
                systems is limited to the people who need it, uses individual credentials, and is
                logged.
              </p>
              <p>
                The one exception, stated honestly: a credible report of illegal use, or a legal
                requirement. If that happens and we are allowed to tell you, we will tell you.
              </p>
            </>
          ),
        },
        {
          id: "third-parties",
          heading: "5. The third parties",
          body: (
            <>
              <p>
                Cloudflare, Backblaze B2, Turso, AuthAction, Coopermail and Openmail. They store or
                deliver; they do not read your documents. Each is bound by its own agreement with us,
                and we choose processors with a real security record rather than the cheapest option.
              </p>
              <p>
                The external tools in the footer are not processors. If you click one, you leave
                Revercue and that tool's own terms apply; we send no data with you beyond the public
                prompt in the URL.
              </p>
            </>
          ),
        },
        {
          id: "availability",
          heading: "6. Backups and availability",
          body: (
            <>
              <p>
                The database is backed up on a daily schedule with a short retention window, and the file
                bucket keeps object versions so an accidental overwrite can be recovered. A backup is a
                safety net for the service, not a personal archive: export anything you cannot afford to
                lose, and keep the PDF the product emails you before a document is deleted.
              </p>
              <p>
                The product aims to be available continuously, but no service can promise that. When
                something is down, the status of the incident is published in the app rather than left to
                guesswork, and the offline page explains what still works: already-open documents in the
                browser, and the client pages that were rendered before the failure.
              </p>
            </>
          ),
        },
        {
          id: "incident",
          heading: "7. If something goes wrong",
          body: (
            <>
              <p>
                If we detect a breach that affects personal data, we investigate first, contain it, then
                notify the affected accounts without undue delay, with what happened, what data was
                involved and what we changed. Regulators are notified where the law requires it.
              </p>
              <p>
                Sessions can be revoked from Settings → Security, and a password reset revokes every other
                session immediately. Authentication is handled by AuthAction (OIDC).
              </p>
            </>
          ),
        },
        {
          id: "report",
          heading: "8. Reporting a vulnerability",
          body: (
            <>
              <p>
                Report a suspected vulnerability through the <ContactLink /> with “security” in the
                topic. Include the steps to reproduce and what you expected. Do not test against another
                user's account, do not exfiltrate data, and give us a reasonable window to fix the issue
                before publishing it.
              </p>
              <p>
                We confirm receipt, keep you updated while it is open, and credit you if you want to be
                credited. There is no bounty programme yet; there is a real person reading the report.
              </p>
            </>
          ),
        },
        {
          id: "honest",
          heading: "9. How the claim stays honest",
          body: (
            <>
              <p>
                Claims about security age badly, so this page is written to be checkable. The headers sent
                to a client page can be inspected in the browser's network tab; the cookies set at sign-in
                are the ones described here and no others; the tokens a document link uses are scoped to
                that document and expire.
              </p>
              <p>
                If something on this page stops being true, it is a bug and we would rather hear about it
                than keep the sentence. Where the product cannot meet a standard — a formal certification,
                for example — the page says so instead of implying it.
              </p>
            </>
          ),
        },
        {
          id: "not",
          heading: "10. What we do not do",
          body: (
            <>
              <ul>
                <li>
                  No Revercue server reads or analyses your content. The pattern suggestions are
                  rules, not inference. The optional writing helper runs in your own browser, on your
                  device, only when you invoke it.
                </li>
                <li>No cross-site tracking, no advertising pixels, no third-party analytics on client pages.</li>
                <li>No selling or renting data, ever.</li>
                <li>No hidden admin view of your documents; support asks you to share the link.</li>
              </ul>
              <p>
                If you find a security problem, report it through the <ContactLink /> and say
                “security” in the topic. We will confirm receipt, keep you updated, and credit you if
                you want to be credited.
              </p>
            </>
          ),
        },
      ]}
    />
    <section className="section" style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px" }}>
      <div className="section-head">
        <h2>The data questions, answered.</h2>
        <p>The same answers as the FAQ, gathered where the security claim is made.</p>
      </div>
      <div className="faq-list">
        {dataFaqs.map((faq) => (
          <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
    </>
  );
}
