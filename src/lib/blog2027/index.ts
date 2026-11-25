import type { BlogPost } from "../blog";
import { FOLLOW_UP_POSTS } from "./followUp";
import { PAYMENT_POSTS } from "./payments";
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
 * Kept out of blog.ts so the original posts stay readable.
 * Strategy and keyword mapping: docs/seo-aeo-geo-strategy-2027-batch2.md
 */
export const BLOG_2027_POSTS: BlogPost[] = [
  ...FOLLOW_UP_POSTS,
  ...PAYMENT_POSTS,
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
