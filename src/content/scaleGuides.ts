import type { Guide } from "../lib/guides";

/**
 * The two Revercue Scale guides. They are written for small business owners,
 * so the language stays plain and every step says what happens on screen.
 * Character counts are verified by `scripts/guide-lengths.mjs`.
 */
export const SCALE_GUIDES: Guide[] = [
  {
    slug: "shareable-builder-guide",
    title: "Shareable Builder: invite contributors and work together",
    excerpt:
      "Invite one external contributor by secure link, watch their edits live, talk in a temporary chat, and take back full control when they finish.",
    category: "Product",
    readMinutes: 8,
    updated: "2026-11-28",
    visual: "BuilderVisual",
    sections: [
      {
        heading: "What Shareable Builder does",
        paragraphs: [
          "Shareable Builder lets you invite one other person to edit a single Revercue document without giving them an account. You keep the client relationship, the publishing controls and the final say; they get a focused editing screen for that one document.",
          "It is for the moment a client, subcontractor or partner knows a section better than you do: you hand them the document itself for a short, supervised session instead of copying text into email.",
        ],
      },
      {
        heading: "Which documents it supports",
        paragraphs: [
          "Proposals, contracts, invoices and forms all support it. The Work together button sits at the bottom right of every builder, and the contributor's editor matches the document: sections for proposals and contracts, line items for invoices, questions for forms.",
        ],
      },
      {
        heading: "Who can use it",
        paragraphs: [
          "Shareable Builder is part of Revercue Scale. On a lower plan the panel explains the feature and links to the plans page instead of showing controls that would fail later. A contributor never needs a Revercue account or a paid seat.",
        ],
      },
      {
        heading: "Add a contributor",
        paragraphs: [
          "Open the document, press Work together, then open the Contributor tab. Type the person's email address and press Create invitation link. Revercue saves the document, creates a single-use secure link and copies it to your clipboard.",
          "Send it the way you normally message that person. Revercue does not email the invitation, so the wording and timing stay yours. The panel also offers addresses you have used before under Add previous contributor.",
        ],
      },
      {
        heading: "Why the email address is required",
        paragraphs: [
          "The email is a label, not a password. It appears in the document's contributor history and is shown while the session runs, so you always know who is inside.",
          "Access comes from the link. Its token is long, random, limited to one document, time-limited and revocable. Share it as you would share a document, not as you would share a password.",
        ],
      },
      {
        heading: "How contributors get in",
        paragraphs: [
          "They open the link in any browser. There is no sign-up, no code, no app. The page shows the title, their email and what they can change. If the link expired, was revoked or the work is complete, the page says so and asks them to request a new one.",
        ],
      },
      {
        heading: "What contributors can and cannot do",
        paragraphs: [
          "They can edit text, add, remove, reorder and duplicate sections, change formatting, edit pricing, packages, timelines and FAQs, edit invoice line items or form questions, and preview the document. Work saves as they type.",
          "They cannot publish, create client links, send anything to a client, see client tracking, invite anyone else, or reach your dashboard, CRM, settings or billing. Those limits are enforced on the server: every save is checked against the live session before it is written.",
        ],
      },
      {
        heading: "Watching edits live",
        paragraphs: [
          "While the contributor works, your panel refreshes every few seconds and shows their email, their activity and the time of the last successful save. Keep the panel open beside the builder to follow the document as it changes.",
          "Live here means within a few seconds, not keystroke by keystroke: one clear writer keeps a single saved version instead of merging two.",
        ],
      },
      {
        heading: "Why your editing is locked",
        paragraphs: [
          "One document, one active editor. While the contributor holds the document, your own saves are refused by the server with a clear message, so a second tab or an older window cannot overwrite their work.",
          "The lock ends at completion and nothing is lost by waiting: their last saved version becomes the version you inherit.",
        ],
      },
      {
        heading: "Temporary collaboration chat",
        paragraphs: [
          "The Chat tab is a short-lived panel for questions about the document: a price to confirm, a section to cut, a sentence that reads badly. Both sides can send messages while the session is active. There are no attachments in this release.",
          "The chat is not part of your document history and not a permanent Revercue conversation. When either side completes the contribution, or you revoke the invitation, Revercue deletes the messages it holds, closes the panel for both people, and writes nothing from it into activity logs, analytics or error reports.",
          "One honest limit: Revercue deletes what it controls at once, but no service can promise a screenshot or a provider backup vanishes at the same moment. Treat the chat as a working conversation, not a confidential archive.",
        ],
      },
      {
        heading: "How the contributor completes",
        paragraphs: [
          "They press Complete contribution. Revercue keeps their latest saved version, ends the session, revokes editing access, clears the chat and hands the document back to you. If some typing is not saved yet, they see a warning first, because only saved changes are kept.",
        ],
      },
      {
        heading: "How you complete",
        paragraphs: [
          "You can press Complete contribution in your panel at any time. Revercue ends the session, blocks further contributor changes, keeps their last saved version, clears the chat and restores your editing. You are asked to confirm, because their access ends immediately.",
        ],
      },
      {
        heading: "Regaining control",
        paragraphs: [
          "After completion the document is yours again: edit, publish, create a client link, send and track as before. Their changes are already in the document, so there is nothing to merge.",
        ],
      },
      {
        heading: "History, previous emails and revoking",
        paragraphs: [
          "The panel lists recent invitations with their status: pending, active, completed, revoked or expired. The history grants no access by itself.",
          "Press Revoke access while an invitation is pending or active and the link stops working immediately: any open session ends, the chat closes and your document returns to normal editing. If a link went to the wrong person, revoke first and create a new one.",
        ],
      },
      {
        heading: "Security and privacy",
        paragraphs: [
          "Links are unguessable random tokens, valid for one document, expiring automatically and revocable. Contributor requests are scoped to that document, and every save is re-checked so a stale tab cannot write after completion. Contributor access never includes your account, your clients, your CRM, your billing or your other documents.",
        ],
      },
      {
        heading: "Sending the finished document",
        paragraphs: [
          "Once the contribution is complete, use the builder's usual share or publish controls to create the client link and send it. Revercue does not send documents for you, so the message, timing and recipient remain your decision.",
        ],
      },
      {
        heading: "Common problems",
        paragraphs: [
          "The link does not work: it has probably expired, been revoked or already completed. Create a fresh invitation; the panel offers the same address as a previous contributor.",
          "The contributor cannot save: their session ended because you completed it or because the document moved into Offline Mode. Both show a clear message on their page.",
          "You cannot type in the document: the contributor currently holds it, so complete the contribution to take it back. An empty chat means no contributor is actively editing.",
        ],
      },
      {
        heading: "A good working rhythm",
        paragraphs: [
          "Send the link with one sentence about what you want changed and by when, keep the panel open while they work, then check the last saved time before you complete and publish as usual.",
        ],
      },
    ],
  },
  {
    slug: "offline-builder-guide",
    title: "Offline Builder: prepare, edit and sync documents offline",
    excerpt:
      "Prepare a document while online, keep editing it on the same device with no connection, complete it deliberately, then sync it when you are online again.",
    category: "Product",
    readMinutes: 8,
    updated: "2026-11-28",
    visual: "DashboardVisual",
    sections: [
      {
        heading: "What Offline Builder does",
        paragraphs: [
          "Offline Builder lets you keep working when there is no usable internet: on a train, in a basement meeting room, on a site with no signal. You prepare the document while online, Revercue downloads it to this browser, and you edit locally until you sync.",
          "The rule underneath is simple: one document, one active editor, one source of truth. While your offline copy is the editable version, the online copy is locked, so a second version never drifts quietly.",
        ],
      },
      {
        heading: "Which documents it supports",
        paragraphs: [
          "Proposals, contracts, invoices and forms. The same Work together panel appears in all four builders, and the offline editor uses the same block model, so a section you rearrange offline looks the same after sync.",
        ],
      },
      {
        heading: "Same device, same browser",
        paragraphs: [
          "The offline copy lives in this browser on this device. Another browser, a private window, another laptop or your phone will not see it, which keeps unsynced work out of shared storage. If you use two browsers, pick one for offline work.",
        ],
      },
      {
        heading: "Preparation must happen online",
        paragraphs: [
          "Revercue has to save the document, confirm the save with the server and take the editing lock before any offline copy exists, and all three need a connection. If it drops, nothing is locked and nothing downloaded; try again when the signal returns.",
        ],
      },
      {
        heading: "Enable Offline Mode",
        paragraphs: [
          "Open the document, press Work together and choose the Offline tab. Read the short list of what stops working, then press Enable Offline Mode. Revercue saves the latest version, captures it, stores it in this browser and asks the server for the lock.",
          "When that succeeds the offline editor opens at its own address and keeps working after a reload as long as the browser keeps its data.",
        ],
      },
      {
        heading: "The readiness check",
        paragraphs: [
          "A document only goes offline when Revercue confirms four things: the latest changes are saved, the data was captured, the local copy was written and the server granted the lock. If one fails, Offline Mode is not activated and you are told which.",
          "One honest exception: a section that depends on an external service, such as an image loaded from another site, may not render offline even when the rest of the document is fine.",
        ],
      },
      {
        heading: "Why the online copy locks",
        paragraphs: [
          "Once the lock is granted the online document is read-only everywhere: this tab, another tab, another device and any contributor. Invitations cannot be created, an existing contributor session must be resolved first, and normal saves are refused.",
          "The lock is enforced by the server, so a second window or an old tab cannot get around it. Opening the document from another online session shows a clear message that Offline Mode holds it.",
        ],
      },
      {
        heading: "Editing offline",
        paragraphs: [
          "The offline editor supports text, adding, removing, reordering and duplicating sections, formatting, pricing and packages, timelines, FAQs, contract clauses, invoice line items and totals, form questions and previewing.",
          "Every change is written to local storage as you go and the header shows the last save time. Closing the tab or restarting the browser or device does not lose the work.",
        ],
      },
      {
        heading: "What stops working offline",
        paragraphs: [
          "AI help, research, integrations, Add Contributor, live collaboration, client links, publishing, delivery and email, tracking, CRM and dashboard actions, uploads, payments and notifications all need the server and are switched off.",
          "The offline editor says so at the top instead of failing silently, and everything returns when the sync completes.",
        ],
      },
      {
        heading: "Why contributors cannot join",
        paragraphs: [
          "Shareable Builder is a two-person online feature: the owner watches live and the chat runs in real time. Neither exists without a connection, so Offline Mode excludes contributors. If a session is active, finish it first; Revercue refuses to prepare an offline copy until then.",
        ],
      },
      {
        heading: "Complete offline editing",
        paragraphs: [
          "Press Complete offline editing when the work is done. Revercue flushes pending changes, checks the document, marks the session complete and makes it read-only. If you are offline, the completion is recorded here and confirmed next time you are online, before any sync is allowed.",
          "Completing is deliberate, not automatic: it is your statement that this is the version you want to keep.",
        ],
      },
      {
        heading: "Why Complete comes before Sync",
        paragraphs: [
          "Sync is only available after completion. That ordering stops a half-finished document landing in your workspace and gives you one clear moment to check the work. If you change your mind, press Reopen: completion is cancelled, the document becomes editable, and you must complete it again before syncing.",
        ],
      },
      {
        heading: "Reconnect and sync",
        paragraphs: [
          "Back online, Sync now becomes available. Press it and Revercue checks that the lock and session belong to this device, checks the expected cloud version, writes the new version, confirms the save and only then releases the lock.",
          "After a successful sync you return to the normal builder, where editing, publishing, client links, sending and tracking all work again.",
        ],
      },
      {
        heading: "If sync fails",
        paragraphs: [
          "A failed sync keeps everything in place: your copy stays intact, the document stays locked and you can retry. Revercue explains the reason, whether that is a dropped connection, an expired session or a version that changed underneath you.",
          "Never clear site data to fix a failed sync; that is the one action that discards unsynced work. Retry first, and use Release the lock without syncing only when you accept the loss.",
        ],
      },
      {
        heading: "Browser restart and recovery",
        paragraphs: [
          "Reopen the offline editor address and the session is still there with its latest local save. If the browser lost its storage, the editor says there is no copy on this device; the online document is still locked, so release the lock and start again.",
        ],
      },
      {
        heading: "Device loss and unsynced work",
        paragraphs: [
          "If the device is lost or broken the offline copy cannot be recovered, because it was never uploaded. The online document is safe and holds the version from before preparation. Open it online, choose Release the lock without syncing and confirm. Treat the offline work as lost, because in this case it is.",
        ],
      },
      {
        heading: "Troubleshooting",
        paragraphs: [
          "Enable Offline Mode is refused: a contributor may be active, or another offline session holds the document. Resolve that first; the panel names the reason.",
          "The offline editor will not open: you may be in another browser or a private window, so use the one where you prepared it.",
          "Sync is greyed out: editing is not complete, or the device is still offline. Complete first, then wait for the connection.",
          "Sync says the version changed: the cloud copy moved after preparation. Keep your copy, note what changed, release the lock, apply the changes online.",
        ],
      },
      {
        heading: "Getting back to normal",
        paragraphs: [
          "A successful sync ends the offline session: the document unlocks, the local copy is cleared from this browser, and every online feature is available again, including invitations.",
          "The habit worth building is short sessions: prepare, edit, complete, sync, so there is less to remember about what changed where.",
        ],
      },
    ],
  },
];
