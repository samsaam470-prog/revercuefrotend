export interface User {
  id: string;
  email: string;
  name?: string;
  plan: 'free' | 'starter' | 'growth' | 'scale' | 'teams';
  onboarding_step: number;
  email_verified: boolean;
  two_factor_enabled: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  channel?: string;
  industry?: string;
  target_audience?: string;
  website_url?: string;
  value_prop?: string;
  interest_level?: number;
  status: 'active' | 'archived' | 'not_interested';
}

export interface Document {
  id: string;
  title: string;
  client_id: string;
  status: string;
  public_id?: string;
  total_time_spent_seconds?: number;
  created_at: string;
}

export interface Notification {
  id: string;
  event_type: string;
  client_id?: string;
  document_id?: string;
  title: string;
  body?: string;
  read: number;
  created_at: string;
}
