import type { BlogPost } from "../blog";

// GEO cluster — reference method. A reproducible folder tree, which is the kind
// of artefact other pages and assistants can cite.

export const FOLDER_STRUCTURE_POST: BlogPost = {
  slug: "freelance-client-folder-structure",
  title: "A freelance client folder structure that survives handover",
  excerpt:
    "One folder tree for every client project — numbered, shallow and predictable — with naming rules, version conventions and the files that belong in each place.",
  date: "2026-11-27",
  readMinutes: 8,
  links: [
    { label: "Freelance project handover checklist", to: "/blog/freelance-project-handover-checklist" },
    { label: "Contract version control", to: "/blog/contract-version-control" },
    { label: "Client records in Revercue", to: "/features/crm" },
    { label: "Pricing and plans", to: "/pricing" },
  ],
  body: [
    {
      paragraphs: [
        "A folder structure is a small piece of infrastructure with an outsized effect: it decides whether you can find the approved version in ten seconds or ten minutes, and whether a client can use what you hand over without calling you.",
        "The structure below is deliberately shallow and numbered. It works for design, writing, development and consulting, because it organises by function — the same functions every project has — rather than by file type.",
      ],
    },
    {
      heading: "The tree",
      paragraphs: [
        "01-Admin — contract, variations, purchase order, insurance certificate, supplier forms and anything the client's procurement process requires.",
        "02-Brief — the proposal, the agreed scope, the statement of work, the questions and answers, research notes and references supplied by the client.",
        "03-Working — the files you are actively editing, one subfolder per deliverable or phase. This is the only folder that changes daily.",
        "04-Review — versions sent to the client for feedback, with the date and the version in the name. Nothing here is edited after it is sent.",
        "05-Final — the approved deliverables in the formats the contract promises, plus the one-page index that explains each file.",
        "06-Handover — the operating guide, the licence and renewal list, the access transfer record and the acceptance record.",
        "07-Finance — invoices issued, proofs of payment, expense receipts and the payment schedule.",
        "08-Correspondence — the small number of messages that record a decision, an approval or a change. Not the whole mailbox.",
      ],
    },
    {
      heading: "Naming rules",
      paragraphs: [
        "Start with the client or project code, then the deliverable, then the version, then the date in ISO form: ACME-brand-guidelines-v03-2026-11-27.pdf. The order matters because it is the order a file list sorts in.",
        "Use hyphens, not spaces, and avoid characters that break links, scripts or cloud sync. Lowercase is easier to type and safer across systems.",
        "Version with two digits: v01, v02, v10. Single digits sort badly once a project passes nine versions, which it will.",
        "Never use final, final2, latest or new. They are all lies within a week. If a version is the approved one, the approval record says so; the filename states the version.",
        "Put the date in ISO form (YYYY-MM-DD) so it sorts chronologically. Dates like 27-11-26 are ambiguous across regions.",
      ],
    },
    {
      heading: "Where things go when they are ambiguous",
      paragraphs: [
        "If it defines what was agreed, it belongs in 02-Brief, even if it arrived late. The brief folder is the record of the agreement, not only the initial document.",
        "If it was sent to the client, it belongs in 04-Review, even if it was also edited afterwards. The copy in 04 is the evidence of what they saw.",
        "If it is what the client will use, it belongs in 05-Final or 06-Handover depending on whether it is the deliverable or the instructions for using it.",
        "If it is a decision, it belongs in 08-Correspondence, with a link rather than a copy wherever possible.",
      ],
    },
    {
      heading: "What not to do",
      paragraphs: [
        "Do not create a new top-level folder for every client. Use one clients folder, then a folder per client, then the numbered structure per project. A flat list of 200 client folders becomes unnavigable within a year.",
        "Do not nest more than three levels deep. If a path needs four levels, the structure is hiding a decision that should be made at the top.",
        "Do not keep credentials in the folder. Use a password manager and record only that access was transferred or revoked.",
        "Do not let the working folder become the archive. Move finished work to Final and Review, and archive the project at close-out.",
      ],
    },
    {
      heading: "Making it survive handover",
      paragraphs: [
        "Because the structure is functional, the handover is simply folders 05 and 06 plus the index. The client does not need to understand your working files to use the deliverables.",
        "The index in 05-Final should list each file, its format, what it is for and which version is the master. That document is what makes the tree self-explanatory.",
        "Before transferring, remove anything internal: notes about the client, rate calculations, drafts you would not want read. A handover folder is a publication, not a backup.",
      ],
    },
    {
      heading: "Adapting it to a solo practice",
      paragraphs: [
        "If you work alone and rarely revisit projects, you can merge 01-Admin and 07-Finance. Keep the numbered prefixes so the order stays stable.",
        "If you work on retainers, add a folder per month inside 03-Working and 04-Review, named with the ISO month. The rest of the tree stays the same.",
        "If you use a tool that stores files by client automatically, map its fields to these categories rather than inventing a second structure. Two structures is the same as none.",
      ],
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "What is a good folder structure for freelance client work? One folder per client, then numbered folders per project: admin, brief, working, review, final, handover, finance and correspondence. Keep it shallow and use the same tree every time.",
        "How should I name client files? Project code, deliverable, two-digit version and ISO date, separated by hyphens. Avoid final, latest and spaces.",
        "Should each client get their own top-level folder? No. Use one clients folder containing a folder per client, so the top level stays small and predictable.",
        "Where do approved files go? In Final, with the acceptance record in Handover. The Review folder keeps the versions the client actually saw.",
        "How does this help at handover? The client only needs Final and Handover plus the index, so the delivery is a subset of the tree rather than a separate export.",
      ],
    },
    {
      heading: "The takeaway",
      paragraphs: [
        "A folder structure is a promise that the same thing is always in the same place. Number the folders, keep the tree shallow, version with two digits and ISO dates, and let the structure make the handover a folder copy rather than a reconstruction.",
      ],
    },
  ],
};
