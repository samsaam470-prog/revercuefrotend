export const PLANS = ['free', 'starter', 'growth', 'scale', 'teams'] as const;
export type Plan = typeof PLANS[number];

export const ACTIVE_DOCUMENT_LIMIT: Record<Plan, number> = { free: 5, starter: 20, growth: 100, scale: 300, teams: 500 };
export const DRAFT_RETENTION_DAYS: Record<Plan, number> = { free: 10, starter: 30, growth: 50, scale: 80, teams: 80 };
export const ARCHIVE_COUNT_LIMIT: Record<Plan, number> = { free: 5, starter: 15, growth: 30, scale: 30, teams: 30 };
export const ARCHIVE_RETENTION_DAYS: Record<Plan, number> = { free: 15, starter: 30, growth: 30, scale: 30, teams: 30 };
export const NOTES_PER_CLIENT: Record<Plan, number> = { free: 3, starter: 10, growth: 999999, scale: 999999, teams: 999999 };
export const SAVED_FAQ_LIMIT: Record<Plan, number> = { free: 0, starter: 0, growth: 10, scale: 30, teams: 30 };
export const SAVED_PACKAGE_LIMIT: Record<Plan, number> = { free: 0, starter: 0, growth: 10, scale: 15, teams: 15 };
export const PASSWORD_PROTECTED_LIMIT: Record<Plan, number> = { free: 0, starter: 0, growth: 15, scale: 50, teams: 50 };
export const EMAIL_NOTIFICATIONS: Record<Plan, boolean> = { free: false, starter: false, growth: true, scale: true, teams: true };
export const ADVANCED_TRACKING: Record<Plan, boolean> = { free: false, starter: false, growth: false, scale: true, teams: true };
export const REVENUE_TRACKER: Record<Plan, boolean> = { free: false, starter: false, growth: false, scale: true, teams: true };
export const EXPENSE_ENTRY: Record<Plan, boolean> = { free: false, starter: false, growth: false, scale: true, teams: true };
export const WHAT_REVERCUE_KNOWS: Record<Plan, boolean> = { free: false, starter: false, growth: false, scale: true, teams: true };
export const DEFAULT_MARGIN_PERCENT = 30;
