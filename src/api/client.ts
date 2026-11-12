const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://revercue-api.samsaam470.workers.dev';

async function request(method: string, path: string, data?: any) {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('revercue_token') : null;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  const text = await res.text();
  const body = text ? JSON.parse(text) : {};
  if (!res.ok) throw Object.assign(new Error(body.message || 'Request failed'), { status: res.status, code: body.error });
  return body;
}

export const client = {
  get: (path: string, data?: any) => request('GET', path, data),
  post: (path: string, data?: any) => request('POST', path, data),
  patch: (path: string, data?: any) => request('PATCH', path, data),
  delete: (path: string, data?: any) => request('DELETE', path, data),
};
