const MESSAGES: Record<string, string> = {
  invalid_payload: 'Check the fields and try again.',
  unauthorized: 'Please log in.',
  forbidden: 'You do not have access to this.',
  not_found: 'Not found.',
  conflict: 'This already exists.',
  rate_limited: 'Too many attempts. Try again later.',
  plan_limit_reached: 'You have reached your plan limit.',
  internal_server_error: 'Something went wrong. Try again.',
};

export function errorMessage(code?: string, fallback = 'Something went wrong.'): string {
  return (code && MESSAGES[code]) || fallback;
}
