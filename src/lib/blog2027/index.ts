import type { BlogPost } from "../blog";
import { FOLLOW_UP_ANNOYING_POST } from "./followUpAnnoying";
import { FOLLOW_UP_SILENCE_POST } from "./followUpSilence";
import { FOLLOW_UP_TEMPLATES_POST } from "./followUpTemplates";
import { PAYMENTS_DEPOSIT_POST } from "./paymentsDeposit";
import { PAYMENT_TERMS_POST } from "./paymentTerms";
import { UNPAID_INVOICE_POST } from "./unpaidInvoice";
import { SCOPE_CREEP_POST } from "./scopeCreep";
import { CHANGE_REQUEST_POST } from "./changeRequest";
import { OUT_OF_SCOPE_POST } from "./outOfScope";
import { ONBOARDING_POST } from "./onboarding";
import { CLIENT_QUESTIONS_POST } from "./clientQuestions";
import { DISCOVERY_CALL_POST } from "./discoveryCall";
import { CLIENT_PORTAL_POST } from "./clientPortal";
import { SECURE_SHARING_POST } from "./secureSharing";
import { SHARING_COMPARED_POST } from "./sharingCompared";

/**
 * The November 2026 content batch: five clusters, three articles each.
 * One module per article, so each piece stays easy to rewrite.
 * Strategy and keyword mapping: docs/seo-aeo-geo-strategy-2027-batch2.md
 */
export const BLOG_2027_POSTS: BlogPost[] = [
  FOLLOW_UP_ANNOYING_POST,
  FOLLOW_UP_SILENCE_POST,
  FOLLOW_UP_TEMPLATES_POST,
  PAYMENTS_DEPOSIT_POST,
  PAYMENT_TERMS_POST,
  UNPAID_INVOICE_POST,
  SCOPE_CREEP_POST,
  CHANGE_REQUEST_POST,
  OUT_OF_SCOPE_POST,
  ONBOARDING_POST,
  CLIENT_QUESTIONS_POST,
  DISCOVERY_CALL_POST,
  CLIENT_PORTAL_POST,
  SECURE_SHARING_POST,
  SHARING_COMPARED_POST,
];
