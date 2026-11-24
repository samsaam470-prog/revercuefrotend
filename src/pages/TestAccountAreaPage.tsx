import { useState, type FormEvent } from 'react';
const configuredTestApi = ((import.meta.env as ImportMetaEnv & { VITE_TEST_HARNESS_API_URL?: string }).VITE_TEST_HARNESS_API_URL || '').trim();
const TEST_API_BASE = configuredTestApi.endsWith('/') ? configuredTestApi.slice(0, -1) : configuredTestApi;

type PlanName = 'free' | 'starter' | 'growth' | 'scale';
type PlanSnapshot = Record<string, string | number | boolean> & { plan: PlanName };
type Check = { id: string; label: string; status: string; detail: string };

const PLANS: { id: PlanName; label: string; description: string }[] = [
  { id: 'free', label: 'Free', description: 'Baseline limits and free-tier restrictions' },
  { id: 'starter', label: 'Starter', description: 'Starter document and storage allowances' },
  { id: 'growth', label: 'Growth', description: 'Saved FAQs, packages and adaptive forms' },
  { id: 'scale', label: 'Scale', description: 'Advanced tracking and business insights' },
];

const LABELS: Record<string, string> = {
  active_documents: 'Active documents',
  storage_mb: 'Storage (MB)',
  document_retention_months: 'Document retention (months)',
  draft_retention_days: 'Draft retention (days)',
  archive_count: 'Archive allowance',
  archive_retention_days: 'Archive retention (days)',
  notes_per_client: 'Notes per client',
  custom_templates: 'Custom templates',
  saved_faqs: 'Saved FAQs',
  saved_packages: 'Saved packages',
  password_protected_documents: 'Password-protected documents',
  adaptive_forms: 'Adaptive forms',
  email_notifications: 'Email notifications',
  advanced_tracking: 'Advanced tracking',
  custom_thank_you: 'Custom thank-you pages',
  what_revercue_knows: 'What Revercue knows',
  revenue_tracker: 'Revenue tracker',
  expense_entry: 'Expense entry',
  pattern_learning: 'Pattern learning',
  price_suggestion: 'Price suggestions',
};

export function TestAccountAreaPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [plan, setPlan] = useState<PlanName>('free');
  const [snapshot, setSnapshot] = useState<PlanSnapshot | null>(null);
  const [checks, setChecks] = useState<Check[]>([]);
  const [workspace, setWorkspace] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function request(path: string, method = 'GET', body?: unknown, currentToken = token) {
    if (!TEST_API_BASE) throw new Error('This staging page is not connected to its isolated test API. It will not call the production API.');
    const response = await fetch(`${TEST_API_BASE}/api/test-harness${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || `Request failed (${response.status})`);
    return payload;
  }

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const result = await request('/session', 'POST', { name, password }, '');
      setToken(result.token);
      setPlan('free');
      setNotice(result.notice);
      const [workspaceResult, checksResult] = await Promise.all([
        request('/workspace', 'GET', undefined, result.token),
        request('/checks', 'GET', undefined, result.token),
      ]);
      setWorkspace(workspaceResult);
      setSnapshot(workspaceResult.plan);
      setChecks(checksResult.checks);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not start the test session.');
    } finally {
      setBusy(false);
    }
  }

  async function changePlan(nextPlan: PlanName) {
    setBusy(true);
    setError('');
    try {
      const result = await request('/plan', 'POST', { plan: nextPlan });
      setToken(result.token);
      setPlan(nextPlan);
      setSnapshot(result.plan);
      const checksResult = await request('/checks');
      setChecks(checksResult.checks);
      setNotice(`Synthetic session switched to ${nextPlan}.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not switch plan.');
    } finally {
      setBusy(false);
    }
  }

  function signOut() {
    setToken('');
    setSnapshot(null);
    setWorkspace(null);
    setChecks([]);
    setName('');
    setPassword('');
    setNotice('The local test session has ended.');
    setError('');
  }

  return (
    <main className="page page-wide" style={{ minHeight: '80vh' }}>
      <div className="page-head">
        <p className="eyebrow">Private staging utility</p>
        <h1>Isolated test account area</h1>
        <p>This is a synthetic sandbox for reviewing plan limits and sample workflows. It does not create a real Revercue account, call AuthAction, or write to D1 or Turso.</p>
      </div>

      <div className="notice notice-gold" style={{ marginBottom: 24 }}>
        Staging only. No real customer records, payments, emails, signatures or documents are created. The workspace below uses fixture data. This sandbox checks plan configuration, not live product workflows.
      </div>

      {!token ? (
        <section className="card card-lg" style={{ maxWidth: 520 }}>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Start the test session</h2>
          <p className="muted" style={{ marginBottom: 24 }}>Enter the temporary test credentials configured as Worker secrets in the staging environment.</p>
          <form className="stack" onSubmit={signIn}>
            <div className="input-group">
              <label htmlFor="test-name">Test account name</label>
              <input id="test-name" autoComplete="username" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="test-password">Test account password</label>
              <input id="test-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            <button className="btn btn-primary btn-full" type="submit" disabled={busy}>{busy ? 'Starting…' : 'Start isolated test session'}</button>
          </form>
        </section>
      ) : (
        <div className="stack">
          <section className="card card-md">
            <div className="row-between">
              <div>
                <p className="eyebrow">Synthetic account</p>
                <h2 style={{ fontSize: 22, marginTop: 6 }}>Isolated test account</h2>
                <p className="muted" style={{ marginTop: 6 }}>Session expires automatically after 20 minutes.</p>
              </div>
              <button type="button" className="btn btn-secondary" onClick={signOut}>End session</button>
            </div>
            <div className="divider" style={{ margin: '20px 0' }} />
            <p className="field-label" style={{ marginBottom: 12 }}>Switch plan for entitlement checks</p>
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
              {PLANS.map((item) => (
                <button key={item.id} type="button" className="card card-sm" aria-pressed={plan === item.id} disabled={busy} onClick={() => void changePlan(item.id)} style={{ textAlign: 'left', borderColor: plan === item.id ? 'var(--gold)' : 'var(--border)', background: plan === item.id ? 'var(--gold-soft)' : 'var(--bg-card)' }}>
                  <strong>{item.label}</strong>
                  <span className="caption" style={{ display: 'block', marginTop: 5, whiteSpace: 'normal' }}>{item.description}</span>
                </button>
              ))}
            </div>
          </section>

          {snapshot && (
            <section className="card card-md">
              <div className="row-between" style={{ marginBottom: 16 }}>
                <div><p className="eyebrow">Current entitlement snapshot</p><h2 style={{ fontSize: 22, marginTop: 6 }}>{PLANS.find((item) => item.id === plan)?.label} plan</h2></div>
                <span className="badge badge-gold">Backend constants</span>
              </div>
              <div className="table-wrap">
                <table className="data">
                  <thead><tr><th>Capability</th><th>Limit / access</th></tr></thead>
                  <tbody>
                    {Object.entries(snapshot).filter(([key]) => key !== 'plan').map(([key, value]) => (
                      <tr key={key}><td>{LABELS[key] || key}</td><td>{typeof value === 'boolean' ? (value ? 'Included' : 'Not included') : value === 999999 ? 'Unlimited' : value}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {workspace && (
            <section className="card card-md">
              <p className="eyebrow">Sample workspace</p>
              <h2 style={{ fontSize: 22, margin: '6px 0 16px' }}>Dashboard fixture</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
                {Object.entries(workspace.dashboard).map(([key, value]) => (
                  <div className="card card-sm" key={key}><span className="caption">{key.replace(/_/g, ' ')}</span><strong style={{ display: 'block', fontSize: 22, marginTop: 8 }}>{typeof value === 'number' && key.includes('revenue') ? `$${value.toLocaleString()}` : String(value)}</strong></div>
                ))}
              </div>
              <h3 style={{ fontSize: 17, margin: '24px 0 12px' }}>Sample records</h3>
              <div className="table-wrap">
                <table className="data">
                  <thead><tr><th>Type</th><th>Title</th><th>Status</th></tr></thead>
                  <tbody>{workspace.documents.map((doc: any) => <tr key={doc.id}><td>{doc.type}</td><td>{doc.title}</td><td>{doc.status}</td></tr>)}</tbody>
                </table>
              </div>
              <p className="caption" style={{ marginTop: 12 }}>These are fixture records only; the real document builders and CRUD endpoints are not being exercised.</p>
            </section>
          )}

          <section className="card card-md">
            <p className="eyebrow">Harness checks</p>
            <h2 style={{ fontSize: 22, margin: '6px 0 16px' }}>Environment and fixture checks</h2>
            <div className="stack" style={{ gap: 12 }}>
              {checks.map((check) => (
                <div key={check.id} className="row-between" style={{ alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                  <div><strong>{check.label}</strong><p className="caption" style={{ marginTop: 4 }}>{check.detail}</p></div>
                  <span className={`badge ${check.status === 'passed' ? 'badge-green' : 'badge-default'}`}>{check.status}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {error && <p className="notice notice-red" role="alert" style={{ marginTop: 20 }}>{error}</p>}
      {notice && <p className="notice" role="status" style={{ marginTop: 20 }}>{notice}</p>}
    </main>
  );
}
