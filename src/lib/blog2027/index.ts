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
import { PROPOSAL_VS_CONTRACT_POST } from "./proposalVsContract";
import { STATEMENT_OF_WORK_POST } from "./statementOfWork";
import { CONTRACT_CHECKLIST_POST } from "./contractChecklist";
import { PROJECT_PRICING_POST } from "./projectPricing";
import { RETAINER_GUIDE_POST } from "./retainerGuide";
import { PROPOSAL_LENGTH_POST } from "./proposalLength";
import { PROPOSAL_BINDING_POST } from "./proposalBinding";
import { FREELANCER_CONTRACTS_POST } from "./freelancerContracts";
import { REVISION_ROUNDS_POST } from "./revisionRounds";
import { WORK_OWNERSHIP_POST } from "./workOwnership";
import { CONTRACT_GLOSSARY_POST } from "./contractGlossary";
import { PROPOSAL_APPROVAL_POST } from "./proposalApproval";
import { CONTRACT_VERSIONS_POST } from "./contractVersions";
import { CLIENT_RED_FLAGS_POST } from "./clientRedFlags";
import { CONTRACT_TEMPLATE_POST } from "./contractTemplateChoice";

/**
 * The November 2026 content batches. The first fifteen are five clusters of
 * three articles; the second fifteen are a five-per-discipline SEO, AEO and GEO
 * set. One module per article, so each piece stays easy to rewrite.
 * Strategy and keyword mapping:
 * docs/seo-aeo-geo-strategy-2027-batch2.md and
 * docs/seo-aeo-geo-strategy-2026-11-26.md
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
  PROPOSAL_VS_CONTRACT_POST,
  STATEMENT_OF_WORK_POST,
  CONTRACT_CHECKLIST_POST,
  PROJECT_PRICING_POST,
  RETAINER_GUIDE_POST,
  PROPOSAL_LENGTH_POST,
  PROPOSAL_BINDING_POST,
  FREELANCER_CONTRACTS_POST,
  REVISION_ROUNDS_POST,
  WORK_OWNERSHIP_POST,
  CONTRACT_GLOSSARY_POST,
  PROPOSAL_APPROVAL_POST,
  CONTRACT_VERSIONS_POST,
  CLIENT_RED_FLAGS_POST,
  CONTRACT_TEMPLATE_POST,
];
