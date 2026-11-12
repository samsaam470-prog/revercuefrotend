export function getToken(): string | null {
  return typeof window !== 'undefined' ? sessionStorage.getItem('revercue_token') : null;
}

export function setToken(token: string): void {
  if (typeof window !== 'undefined') sessionStorage.setItem('revercue_token', token);
}

export function clearToken(): void {
  if (typeof window !== 'undefined') sessionStorage.removeItem('revercue_token');
}

export function getDraft(key: string): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem(`draft:${key}`) : null;
}

export function setDraft(key: string, content: string): void {
  if (typeof window !== 'undefined') localStorage.setItem(`draft:${key}`, content);
}

export function clearDraft(key: string): void {
  if (typeof window !== 'undefined') localStorage.removeItem(`draft:${key}`);
}
