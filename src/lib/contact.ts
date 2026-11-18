/**
 * The only Revercue email addresses that exist. Do not add addresses here
 * unless the mailbox has actually been provisioned.
 *
 * The internal administrative mailbox is deliberately absent: it must never
 * be rendered on a public page, in metadata or in structured data.
 */
export const PUBLIC_EMAILS = {
  support: "support@revercue.co.uk",
  hello: "hello@revercue.co.uk",
  billing: "billing@revercue.co.uk",
  marketing: "marketing@revercue.co.uk",
  beta: "beta@revercue.co.uk",
} as const;

export const mailto = (address: string) => `mailto:${address}`;
