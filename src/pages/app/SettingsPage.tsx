import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Download, Lock, Trash2 } from "lucide-react";
import { settingsApi } from "../../api/settings";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { Fieldset } from "../../components/ui/Fieldset";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { SkeletonLines } from "../../components/ui/Skeleton";
import { PlanBadge } from "../../components/shared/PlanBadge";
import { WaitlistModal } from "../../components/shared/WaitlistModal";
import { useAuth } from "../../hooks/useAuth";
import { usePlanGate } from "../../hooks/usePlanGate";
import { useToast } from "../../hooks/useToast";
import { useTheme } from "../../hooks/useTheme";
import type { ThemeMode } from "../../contexts/ThemeContext";
import { PLANS, PLAN_LIMITS, SERVICE_OPTIONS, EMAIL_DELIVERY_NOTE, formatStorage } from "../../lib/constants";
import { PUBLIC_EMAILS } from "../../lib/contact";
import { formatCurrency, formatDate, formatRelative } from "../../lib/formatters";
import { errorMessage } from "../../lib/errors";
import { ApiError } from "../../types/api";
import type { PlanName } from "../../types";

export type SettingsSection =
  | "profile"
  | "appearance"
  | "plan"
  | "security"
  | "notifications"
  | "saved-faqs"
  | "saved-packages"
  | "revision-prices"
  | "what-revercue-knows"
  | "delete-account";

const TITLES: Record<SettingsSection, { title: string; subtitle: string }> = {
  profile: { title: "Profile", subtitle: "Your details and the brand that appears on client pages." },
  appearance: { title: "Appearance", subtitle: "Dark, light, or follow your system. The choice stays on this device." },
  plan: { title: "Plan & Billing", subtitle: "Your plan, your usage and your payment history." },
  security: { title: "Security", subtitle: "Password, two-factor and the sessions that are open." },
  notifications: { title: "Notifications", subtitle: "Email events and the newsletter." },
  "saved-faqs": { title: "Saved FAQs", subtitle: "The FAQ library the builder pre-fills from." },
  "saved-packages": { title: "Saved Packages", subtitle: "Reusable packages for the proposal builder." },
  "revision-prices": { title: "Revision Prices", subtitle: "A price per revision category, shown to the client." },
  "what-revercue-knows": { title: "What Revercue Knows", subtitle: "The read-only transparency page." },
  "delete-account": { title: "Delete Account", subtitle: "The danger card, with a five-day grace period." },
};

export function SettingsPage({ section }: { section: SettingsSection }) {
  const meta = TITLES[section];
  return (
    <>
      <div className="page-top">
        <div>
          <h1>{meta.title}</h1>
          <p>{meta.subtitle}</p>
        </div>
      </div>
      {section === "profile" && <ProfileSection />}
      {section === "appearance" && <AppearanceSection />}
      {section === "plan" && <PlanSection />}
      {section === "security" && <SecuritySection />}
      {section === "notifications" && <NotificationsSection />}
      {section === "saved-faqs" && <SavedFaqsSection />}
      {section === "saved-packages" && <SavedPackagesSection />}
      {section === "revision-prices" && <RevisionPricesSection />}
      {section === "what-revercue-knows" && <WhatRevercueKnowsSection />}
      {section === "delete-account" && <DeleteAccountSection />}
    </>
  );
}

/* ---------------------------------------------------------- appearance */

function AppearanceSection() {
  const { mode, resolved, setMode } = useTheme();
  const options: { value: ThemeMode; label: string; hint: string }[] = [
    { value: "dark", label: "Dark", hint: "The near-black app with the white document page." },
    { value: "light", label: "Light", hint: "A warm paper app. The gold and the serif stay." },
    { value: "system", label: "System", hint: "Follow the device setting and change with it." },
  ];

  return (
    <div className="card card-lg" style={{ maxWidth: 640 }}>
      <Fieldset legend="Theme" helper="It applies to the public site, the dashboard, the builders and the client pages. Saved on this device only.">
        <div className="segmented" role="radiogroup" aria-label="Theme">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={mode === option.value}
              aria-pressed={mode === option.value}
              onClick={() => setMode(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Fieldset>
      <p className="caption" style={{ marginTop: 12 }}>
        Now showing: <strong>{resolved}</strong>
        {mode === "system" ? " (following your system)" : ""}. The setting is remembered in this
        browser; it does not change your account.
      </p>
      <div className="theme-preview" aria-hidden="true">
        <div className="theme-preview-bar">
          <span className="mark">R</span>
          <span>Preview</span>
        </div>
        <div className="theme-preview-body">
          <div className="theme-preview-card">
            <span className="theme-preview-label">Active documents</span>
            <strong>12</strong>
          </div>
          <div className="theme-preview-card">
            <span className="theme-preview-label">Follow-ups due</span>
            <strong>3</strong>
          </div>
          <span className="btn btn-primary btn-sm">Create proposal</span>
        </div>
      </div>
      {options.map((option) => (
        <p className="caption" key={option.value} style={{ marginTop: 8 }}>
          <strong>{option.label}:</strong> {option.hint}
        </p>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- profile */

function ProfileSection() {
  const { user, refresh } = useAuth();
  const toast = useToast();
  const query = useQuery({ queryKey: ["settings", "profile"], queryFn: () => settingsApi.getProfile() });
  const [name, setName] = useState(user?.name || "");
  const [business, setBusiness] = useState(user?.business_name || "");
  const [website, setWebsite] = useState(user?.website || "");
  const [fiverr, setFiverr] = useState(user?.fiverr_profile || "");
  const [services, setServices] = useState<string[]>([]);
  const [primary, setPrimary] = useState(user?.brand_primary || "#c9a961");
  const [secondary, setSecondary] = useState(user?.brand_secondary || "#1a1a1a");
  const [saving, setSaving] = useState(false);
  const [logoNote, setLogoNote] = useState("");

  useEffect(() => {
    if (query.data?.profile) {
      const profile = query.data.profile;
      setName(profile.name || "");
      setBusiness(profile.business_name || "");
      setWebsite(profile.website || "");
      setFiverr(profile.fiverr_profile || "");
      setPrimary(profile.brand_primary || "#c9a961");
      setSecondary(profile.brand_secondary || "#1a1a1a");
    }
  }, [query.data]);

  const dirty =
    name !== (user?.name || "") ||
    business !== (user?.business_name || "") ||
    website !== (user?.website || "") ||
    fiverr !== (user?.fiverr_profile || "") ||
    primary !== (user?.brand_primary || "#c9a961") ||
    secondary !== (user?.brand_secondary || "#1a1a1a");

  const save = async () => {
    setSaving(true);
    try {
      await settingsApi.updateProfile({
        name,
        business_name: business,
        website,
        fiverr_profile: fiverr,
        services,
        brand_primary: primary,
        brand_secondary: secondary,
      });
      await refresh();
      toast.success("Profile saved.");
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-card">
      {query.isLoading && <SkeletonLines count={4} />}
      <Input id="profile-name" label="Name" value={name} onChange={setName} required />
      <Input
        id="profile-email"
        label="Email"
        value={user?.email || ""}
        onChange={() => undefined}
        disabled
        helper={`To change your email, contact ${PUBLIC_EMAILS.support}.`}
      />
      <Input id="profile-business" label="Business name" value={business} onChange={setBusiness} />
      <Input
        id="profile-website"
        label="Website (optional)"
        type="url"
        value={website}
        onChange={setWebsite}
        placeholder="https://"
        helper="Appears on your client documents when set."
      />
      <Input
        id="profile-fiverr"
        label="Fiverr profile (optional)"
        type="url"
        value={fiverr}
        onChange={setFiverr}
        placeholder="https://fiverr.com/"
        helper="Only if you take work there."
      />

      <Fieldset legend="Services" helper="Used to decide which templates are marked Suggested.">
        {SERVICE_OPTIONS.map((service) => (
          <Checkbox
            key={service}
            id={`profile-service-${service}`}
            label={service}
            checked={services.includes(service)}
            onChange={() =>
              setServices((current) =>
                current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
              )
            }
          />
        ))}
      </Fieldset>

      <div className="two-up">
        <div className="input-group">
          <label htmlFor="profile-primary">Brand primary</label>
          <input
            id="profile-primary"
            type="color"
            value={primary}
            onChange={(event) => setPrimary(event.target.value)}
            style={{ height: 42, padding: 4 }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="profile-secondary">Brand secondary</label>
          <input
            id="profile-secondary"
            type="color"
            value={secondary}
            onChange={(event) => setSecondary(event.target.value)}
            style={{ height: 42, padding: 4 }}
          />
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="profile-logo">Logo</label>
        <input
          id="profile-logo"
          type="file"
          accept="image/png,image/svg+xml"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (file.size > 1024 * 1024) {
              setLogoNote("The logo must be 1 MB or smaller.");
              return;
            }
            try {
              await settingsApi.uploadLogo(file);
              setLogoNote("Logo uploaded.");
              toast.success("Logo uploaded.");
            } catch (cause) {
              const apiError = cause as ApiError;
              setLogoNote(errorMessage(apiError.code, apiError.message));
            }
          }}
        />
        <span className={logoNote.startsWith("Logo") ? "success" : "helper"} style={{ color: logoNote.startsWith("Logo") ? "var(--green)" : undefined }}>
          {logoNote || "PNG or SVG, max 1 MB. It replaces the wordmark on client pages."}
        </span>
      </div>

      <div className="settings-actions">
        <Button variant="ghost" onClick={() => void query.refetch()} disabled={!dirty}>
          Cancel
        </Button>
        <Button onClick={save} loading={saving} disabled={!dirty}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- plan */

function PlanSection() {
  const { user } = useAuth();
  const { plan, limits } = usePlanGate();
  const [waitlist, setWaitlist] = useState<PlanName | null>(null);
  const query = useQuery({ queryKey: ["settings", "plan"], queryFn: () => settingsApi.getPlan() });
  const definition = PLANS.find((item) => item.id === plan)!;

  const usage = [
    {
      label: "Active documents",
      used: query.data?.active_documents ?? 0,
      max: limits.active_documents,
    },
    { label: "Storage", used: query.data?.storage_gb ?? 0, max: limits.storage_gb },
    { label: "Archived", used: query.data?.archive_count ?? 0, max: limits.archive_count },
    {
      label: "Password-protected",
      used: query.data?.password_protected ?? 0,
      max: limits.password_protected,
    },
  ];

  return (
    <div className="stack-4">
      <div className="settings-card">
        <div className="between">
          <div>
            <h2>
              {definition.name} <PlanBadge plan={plan} />
            </h2>
            <p className="muted" style={{ fontSize: 14 }}>
              {definition.price == null
                ? `$${definition.price ?? 0} base — ${definition.statusLabel}`
                : definition.price === 0
                  ? "Free — available now"
                  : `$${definition.price}/month — ${definition.statusLabel}`}
            </p>
          </div>
          <div className="inline">
            {plan !== "teams" && (
              <Button variant="secondary" onClick={() => setWaitlist(plan === "free" ? "starter" : "scale")}>
                Request a paid plan
              </Button>
            )}
          </div>
        </div>
        <p className="caption">
          {plan === "free"
            ? "Free is available now. The paid plans are invite-only: join the waitlist and the team will reach out when a spot opens."
            : "Your plan was set by the team. Changes are handled through the waitlist."}
        </p>
      </div>

      <div className="settings-card">
        <h2>Usage this month</h2>
        {usage.map((row) => {
          const max = row.max;
          const percent = max && max > 0 ? Math.min(100, (row.used / max) * 100) : 12;
          return (
            <div className="usage-row" key={row.label}>
              <div className="labels">
                <span>{row.label}</span>
                <span>
                  {row.label === "Storage" ? formatStorage(row.used) : row.used}{" "}
                  {max === null
                    ? "of unlimited"
                    : `of ${row.label === "Storage" ? formatStorage(max) : max}`}
                </span>
              </div>
              <div className={`usage-bar${percent >= 90 ? " high" : ""}`}>
                <span style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="settings-card">
        <h2>Payment history</h2>
        {query.isLoading && <SkeletonLines count={2} />}
        {!query.isLoading && (query.data?.payments.length ?? 0) === 0 && (
          <p className="muted" style={{ fontSize: 14 }}>
            No payments yet. The Free plan does not generate a payment row.
          </p>
        )}
        {(query.data?.payments ?? []).length > 0 && (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Reference</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {query.data?.payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{formatDate(payment.date)}</td>
                    <td>{payment.plan}</td>
                    <td>{formatCurrency(payment.amount)}</td>
                    <td>{payment.method || "—"}</td>
                    <td className="mono">{payment.reference || "—"}</td>
                    <td>
                      <Badge variant="green">{payment.status}</Badge>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-text btn-sm"
                        onClick={async () => {
                          const blob = await settingsApi.receipt(payment.id);
                          const url = URL.createObjectURL(blob);
                          window.open(url, "_blank", "noopener");
                        }}
                      >
                        <Download size={13} /> Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="settings-card">
        <h2>Downgrade</h2>
        <p className="muted" style={{ fontSize: 14 }}>
          Downgrades take effect at the end of the billing cycle. You choose which documents to keep
          within the new limit; the rest are archived with a PDF emailed to you and a 7-day grace
          period before the new archive retention applies.
        </p>
        <div>
          <Button variant="secondary" onClick={() => setWaitlist(null)} disabled>
            Downgrade is handled by the team
          </Button>
        </div>
      </div>

      <WaitlistModal
        open={Boolean(waitlist)}
        onClose={() => setWaitlist(null)}
        plan={waitlist ?? undefined}
      />
      {user?.plan !== plan && <p className="caption">Plan changed. Refresh to see the new gates.</p>}
    </div>
  );
}

/* ---------------------------------------------------------- security */

function SecuritySection() {
  const { user, refresh } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [twoFaPassword, setTwoFaPassword] = useState("");
  const [twoFaModal, setTwoFaModal] = useState(false);

  const sessions = useQuery({ queryKey: ["settings", "sessions"], queryFn: () => settingsApi.sessions() });

  const changePassword = async () => {
    if (next !== confirm) {
      setError("The new passwords do not match.");
      return;
    }
    if (next.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await settingsApi.changePassword({ current_password: current, new_password: next });
      toast.success("Password updated. Other sessions were revoked.");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (cause) {
      const apiError = cause as ApiError;
      setError(errorMessage(apiError.code, apiError.message));
    } finally {
      setSaving(false);
    }
  };

  const toggle2fa = async () => {
    setSaving(true);
    try {
      await settingsApi.toggle2fa({ enabled: !user?.two_factor_enabled, current_password: twoFaPassword });
      await refresh();
      setTwoFaModal(false);
      setTwoFaPassword("");
      toast.success(user?.two_factor_enabled ? "Two-factor turned off." : "Two-factor turned on.");
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="stack-4">
      <div className="settings-card">
        <h2>Password</h2>
        <Input
          id="pw-current"
          label="Current password"
          type="password"
          value={current}
          onChange={setCurrent}
          autoComplete="current-password"
        />
        <Input
          id="pw-new"
          label="New password"
          type="password"
          value={next}
          onChange={setNext}
          helper="At least 8 characters."
          autoComplete="new-password"
        />
        <Input
          id="pw-confirm"
          label="Confirm new password"
          type="password"
          value={confirm}
          onChange={setConfirm}
          error={error}
          autoComplete="new-password"
        />
        <div className="settings-actions">
          <Button
            variant="ghost"
            onClick={() => {
              setCurrent("");
              setNext("");
              setConfirm("");
              setError("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={changePassword} loading={saving} disabled={!current || !next || !confirm}>
            Update password
          </Button>
        </div>
      </div>

      <div className="settings-card">
        <div className="between">
          <div>
            <h2>Two-factor authentication</h2>
            <p className="muted" style={{ fontSize: 14 }}>
              A six-digit code from your email at every login. Turning it on or off requires your
              current password.
            </p>
          </div>
          <Badge variant={user?.two_factor_enabled ? "green" : "muted"}>
            {user?.two_factor_enabled ? "On" : "Off"}
          </Badge>
        </div>
        <div>
          <Button variant="secondary" onClick={() => setTwoFaModal(true)}>
            {user?.two_factor_enabled ? "Turn off" : "Turn on"}
          </Button>
        </div>
      </div>

      <div className="settings-card">
        <div className="between">
          <h2>Active sessions</h2>
          <Button
            variant="secondary"
            onClick={async () => {
              await settingsApi.logoutAll();
              await queryClient.invalidateQueries({ queryKey: ["settings", "sessions"] });
              toast.success("Other sessions logged out.");
            }}
          >
            Log out all other sessions
          </Button>
        </div>
        {sessions.isLoading && <SkeletonLines count={2} />}
        {(sessions.data?.data ?? []).length === 0 && !sessions.isLoading && (
          <p className="muted" style={{ fontSize: 14 }}>
            No other sessions.
          </p>
        )}
        {sessions.data?.data.map((session) => (
          <div className="activity-row" key={session.id}>
            <div className="meta">
              <div>
                {session.device} · {session.browser}
              </div>
              <small>
                {session.location ? `${session.location} · ` : ""}
                Last active {formatRelative(session.last_active_at)}
              </small>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await settingsApi.logoutSession(session.id);
                await queryClient.invalidateQueries({ queryKey: ["settings", "sessions"] });
              }}
            >
              Log out
            </Button>
          </div>
        ))}
      </div>

      <Modal
        open={twoFaModal}
        onClose={() => setTwoFaModal(false)}
        title={user?.two_factor_enabled ? "Turn off two-factor?" : "Turn on two-factor?"}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setTwoFaModal(false)}>
              Cancel
            </Button>
            <Button onClick={toggle2fa} loading={saving} disabled={!twoFaPassword}>
              {user?.two_factor_enabled ? "Turn off" : "Turn on"}
            </Button>
          </>
        }
      >
        <Input
          id="twofa-password"
          label="Current password"
          type="password"
          value={twoFaPassword}
          onChange={setTwoFaPassword}
          helper="Confirms it is you."
          autoComplete="current-password"
        />
      </Modal>
    </div>
  );
}

/* ---------------------------------------------------------- notifications */

function NotificationsSection() {
  const { user, refresh } = useAuth();
  const { hasFeature } = usePlanGate();
  const toast = useToast();
  const query = useQuery({ queryKey: ["settings", "notifications"], queryFn: () => settingsApi.getNotifications() });
  const [values, setValues] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (query.data) setValues(query.data as Record<string, boolean>);
  }, [query.data]);

  const allowed = hasFeature("email_notifications");
  const items = useMemo(
    () => [
      { key: "proposal_opened", label: "Proposal opened" },
      { key: "proposal_answered", label: "Proposal accepted or declined" },
      { key: "contract_action", label: "Contract approved or declined" },
      { key: "form_submitted", label: "Form submitted" },
      { key: "invoice_paid", label: "Invoice paid" },
      { key: "proof_uploaded", label: "Payment proof uploaded" },
    ],
    [],
  );

  const save = async () => {
    setSaving(true);
    try {
      await settingsApi.updateNotifications(values);
      toast.success("Notification settings saved.");
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="stack-4">
      <div className="settings-card">
        <h2>Email notifications</h2>
        {!allowed ? (
          <p className="muted" style={{ fontSize: 14 }}>
            Email notifications are available on Growth and Scale. In-app notifications are always on.{" "}
            <Link to="/settings/plan" style={{ color: "var(--gold)" }}>
              See the plans
            </Link>
            .
          </p>
        ) : (
          <>
            <Checkbox
              id="email-master"
              label="Send me email notifications"
              checked={Boolean(values.email_enabled)}
              onChange={(value) => setValues((current) => ({ ...current, email_enabled: value }))}
            />
            <Fieldset legend="Per event">
              {items.map((item) => (
                <Checkbox
                  key={item.key}
                  id={`notif-${item.key}`}
                  label={item.label}
                  checked={Boolean(values[item.key])}
                  disabled={!values.email_enabled}
                  onChange={(value) => setValues((current) => ({ ...current, [item.key]: value }))}
                />
              ))}
            </Fieldset>
          </>
        )}
        <Checkbox
          id="newsletter"
          label="Send me product updates (the newsletter)"
          checked={Boolean(values.newsletter_opt_in)}
          onChange={(value) => setValues((current) => ({ ...current, newsletter_opt_in: value }))}
        />
        <div className="settings-actions">
          <Button onClick={save} loading={saving}>
            Save changes
          </Button>
        </div>
      </div>

      <div className="settings-card">
        <h2>Email delivery</h2>
        <p className="caption">{EMAIL_DELIVERY_NOTE}</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- saved FAQs */

function SavedFaqsSection() {
  const { hasFeature, limits } = usePlanGate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["settings", "saved-faqs"], queryFn: () => settingsApi.savedFaqs() });
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [pending, setPending] = useState<string | null>(null);

  if (!hasFeature("saved_faqs")) return <UpgradeCard feature="Saved FAQs" />;

  const create = async () => {
    if (!question.trim() || !answer.trim()) return;
    await settingsApi.createSavedFaq({ question, answer });
    setQuestion("");
    setAnswer("");
    await queryClient.invalidateQueries({ queryKey: ["settings", "saved-faqs"] });
    toast.success("FAQ saved.");
  };

  return (
    <div className="stack-4">
      <div className="settings-card">
        <div className="between">
          <h2>Your library</h2>
          <span className="caption">
            {query.data?.data.length ?? 0} of {limits.saved_faqs}
          </span>
        </div>
        {query.isLoading && <SkeletonLines count={3} />}
        {(query.data?.data ?? []).length === 0 && !query.isLoading && (
          <p className="muted" style={{ fontSize: 14 }}>
            No saved FAQs yet. Add the ones you answer most often.
          </p>
        )}
        {query.data?.data.map((faq) => (
          <div className="activity-row" key={faq.id}>
            <div className="meta">
              <div>{faq.question}</div>
              <small>{faq.answer}</small>
              {faq.deletion_warning && (
                <span className="notice notice-gold" style={{ display: "block", marginTop: 6 }}>
                  Deletes in 10 days unless you keep it.{" "}
                  <button
                    type="button"
                    className="btn btn-text btn-sm"
                    onClick={async () => {
                      await settingsApi.keepSavedFaq(faq.id);
                      await queryClient.invalidateQueries({ queryKey: ["settings", "saved-faqs"] });
                    }}
                  >
                    Keep it
                  </button>
                </span>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={() => setPending(faq.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>

      <div className="settings-card">
        <h2>Add a FAQ</h2>
        <Input id="faq-question" label="Question" value={question} onChange={setQuestion} />
        <Textarea id="faq-answer" label="Answer" value={answer} onChange={setAnswer} rows={3} />
        <div className="settings-actions">
          <Button onClick={create} disabled={!question.trim() || !answer.trim()}>
            Save FAQ
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        onConfirm={async () => {
          if (pending) await settingsApi.deleteSavedFaq(pending);
          await queryClient.invalidateQueries({ queryKey: ["settings", "saved-faqs"] });
        }}
        title="Delete this saved FAQ?"
        description="It stops appearing in the builder. This cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
}

/* ---------------------------------------------------------- saved packages */

function SavedPackagesSection() {
  const { hasFeature, limits } = usePlanGate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["settings", "saved-packages"], queryFn: () => settingsApi.savedPackages() });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [recommended, setRecommended] = useState(false);

  if (!hasFeature("saved_packages")) return <UpgradeCard feature="Saved Packages" />;

  const create = async () => {
    if (!name.trim()) return;
    await settingsApi.createSavedPackage({
      name,
      price: Number(price) || 0,
      deliverables,
      recommended,
    });
    setName("");
    setPrice("");
    setDeliverables("");
    setRecommended(false);
    await queryClient.invalidateQueries({ queryKey: ["settings", "saved-packages"] });
    toast.success("Package saved.");
  };

  return (
    <div className="stack-4">
      <div className="settings-card">
        <div className="between">
          <h2>Your packages</h2>
          <span className="caption">
            {query.data?.data.length ?? 0} of {limits.saved_packages}
          </span>
        </div>
        {query.isLoading && <SkeletonLines count={3} />}
        {(query.data?.data ?? []).length === 0 && !query.isLoading && (
          <p className="muted" style={{ fontSize: 14 }}>
            No saved packages yet. Basic, Standard and Premium are a good start.
          </p>
        )}
        {query.data?.data.map((pkg) => (
          <div className="activity-row" key={pkg.id}>
            <div className="meta">
              <div>
                {pkg.name} <span className="mono">{formatCurrency(pkg.price)}</span>{" "}
                {pkg.recommended && <Badge variant="gold">Recommended</Badge>}
              </div>
              <small>{pkg.deliverables || pkg.description || "No description."}</small>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await settingsApi.deleteSavedPackage(pkg.id);
                await queryClient.invalidateQueries({ queryKey: ["settings", "saved-packages"] });
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      <div className="settings-card">
        <h2>Add a package</h2>
        <Input id="pkg-name" label="Name" value={name} onChange={setName} />
        <Input
          id="pkg-price"
          label="Price"
          type="number"
          value={price}
          onChange={setPrice}
          helper="In your default currency."
        />
        <Textarea id="pkg-deliverables" label="Deliverables" value={deliverables} onChange={setDeliverables} rows={3} />
        <Checkbox
          id="pkg-recommended"
          label="Mark as Recommended"
          checked={recommended}
          onChange={setRecommended}
        />
        <div className="settings-actions">
          <Button onClick={create} disabled={!name.trim()}>
            Save package
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- revision prices */

function RevisionPricesSection() {
  const { hasFeature } = usePlanGate();
  const toast = useToast();
  const query = useQuery({ queryKey: ["settings", "revision-prices"], queryFn: () => settingsApi.revisionPrices() });
  const [rows, setRows] = useState<{ category: string; price: string }[]>([]);

  useEffect(() => {
    if (query.data?.data) {
      setRows(
        query.data.data.length > 0
          ? query.data.data.map((row) => ({ category: row.category, price: row.price == null ? "" : String(row.price) }))
          : [
              { category: "Design revision", price: "" },
              { category: "Development revision", price: "" },
              { category: "Copy revision", price: "" },
            ],
      );
    }
  }, [query.data]);

  if (!hasFeature("revenue_tracker")) return <UpgradeCard feature="Revision prices" />;

  return (
    <div className="settings-card">
      <h2>Price per revision category</h2>
      <p className="muted" style={{ fontSize: 14 }}>
        Optional. When a price is set, the client sees it on a revision request. Leave it blank to
        discuss it per project.
      </p>
      {query.isLoading && <SkeletonLines count={3} />}
      {rows.map((row, index) => (
        <div className="two-up" key={`${row.category}-${index}`}>
          <Input
            id={`revision-category-${index}`}
            label="Category"
            value={row.category}
            onChange={(value) =>
              setRows((current) => current.map((item, i) => (i === index ? { ...item, category: value } : item)))
            }
          />
          <Input
            id={`revision-price-${index}`}
            label="Price"
            type="number"
            value={row.price}
            onChange={(value) =>
              setRows((current) => current.map((item, i) => (i === index ? { ...item, price: value } : item)))
            }
            helper="Blank means no fixed price."
          />
        </div>
      ))}
      <div className="settings-actions">
        <Button
          onClick={async () => {
            await settingsApi.updateRevisionPrices({
              data: rows.map((row) => ({ category: row.category, price: row.price ? Number(row.price) : null })),
            });
            toast.success("Revision prices saved.");
          }}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- what revercue knows */

function WhatRevercueKnowsSection() {
  const { hasFeature } = usePlanGate();
  const query = useQuery({
    queryKey: ["settings", "what-revercue-knows"],
    queryFn: () => settingsApi.whatRevercueKnows(),
    enabled: hasFeature("what_revercue_knows"),
  });

  if (!hasFeature("what_revercue_knows")) return <UpgradeCard feature="The transparency page" />;

  return (
    <div className="stack-4">
      <div className="settings-card">
        <h2>Account data — the team can see this</h2>
        {query.isLoading && <SkeletonLines count={3} />}
        <div className="table-wrap">
          <table className="data">
            <tbody>
              {(query.data?.account ?? []).map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="settings-card">
        <h2>Private data — only you can see this</h2>
        <ul className="stack-2 muted" style={{ fontSize: 14, paddingLeft: 4 }}>
          {(query.data?.private ?? []).map((item) => (
            <li key={item} className="inline">
              <Check size={13} color="var(--green)" /> {item}
            </li>
          ))}
        </ul>
        <p className="caption">
          We store your data so the product works. We do not read it. The team sees your account
          details, nothing more.
        </p>
      </div>

      <div className="settings-card">
        <h2>What Revercue does not know</h2>
        <ul className="stack-2 muted" style={{ fontSize: 14, paddingLeft: 4 }}>
          {(query.data?.not_known ?? []).map((item) => (
            <li key={item} className="inline">
              <Lock size={13} color="var(--gold)" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- delete account */

function DeleteAccountSection() {
  const { user } = useAuth();
  const toast = useToast();
  const [confirmEmail, setConfirmEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [scheduled, setScheduled] = useState(false);

  const remove = async () => {
    setBusy(true);
    try {
      await settingsApi.deleteAccount(confirmEmail);
      setScheduled(true);
      toast.success("Account scheduled for deletion. You have 5 days to change your mind.");
    } catch (cause) {
      const apiError = cause as ApiError;
      toast.error(errorMessage(apiError.code, apiError.message));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="settings-card" style={{ borderColor: "rgba(248,113,113,.4)" }}>
      <h2 style={{ color: "var(--red)" }}>Delete account</h2>
      <p className="muted" style={{ fontSize: 14 }}>
        This permanently deletes your account, your documents, your client records and your
        communication log. You have 5 days to change your mind. Before deletion, we email you a copy
        of your documents and client records.
      </p>

      {scheduled ? (
        <div className="stack-3">
          <p className="notice notice-red">
            Your account is scheduled for deletion. Log in within 5 days and cancel to restore it.
          </p>
          <div>
            <Button
              variant="secondary"
              onClick={async () => {
                await settingsApi.cancelDeletion();
                setScheduled(false);
                toast.success("Deletion cancelled. Welcome back.");
              }}
            >
              Cancel deletion
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Button variant="danger" onClick={() => setOpen(true)}>
            <Trash2 size={14} /> Delete my account
          </Button>
        </div>
      )}

      <p className="caption">
        Export first: Settings → Export gives you the clients CSV and the document PDFs.
        {user?.email ? ` The confirmation is your email: ${user.email}.` : ""}
      </p>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this account?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={busy}>
              Keep my account
            </Button>
            <Button
              variant="danger"
              onClick={remove}
              loading={busy}
              disabled={confirmEmail !== user?.email}
            >
              Delete my account
            </Button>
          </>
        }
      >
        <div className="stack-3">
          <p className="muted">
            Type <span className="mono">{user?.email}</span> to confirm. The deletion happens after 5
            days; you can cancel any time before then.
          </p>
          <Input
            id="delete-confirm"
            label="Your email"
            value={confirmEmail}
            onChange={setConfirmEmail}
            autoComplete="off"
          />
        </div>
      </Modal>
    </div>
  );
}

/* ---------------------------------------------------------- shared */

function UpgradeCard({ feature }: { feature: string }) {
  return (
    <div className="settings-card">
      <div className="inline">
        <Lock size={18} color="var(--gold)" />
        <h2>{feature} is not on your plan</h2>
      </div>
      <p className="muted">
        {feature} is part of a higher plan. The Free plan is available now; the paid plans are
        invite-only, so join the waitlist and the team will reach out when a spot opens.
      </p>
      <div className="inline">
        <Link to="/settings/plan" className="btn btn-primary btn-sm">
          See the plans
        </Link>
        <Link to="/pricing" className="btn btn-ghost btn-sm">
          Compare plans
        </Link>
      </div>
      <p className="caption">
        Limits: Starter {PLAN_LIMITS.starter.saved_faqs} saved FAQs, Growth{" "}
        {PLAN_LIMITS.growth.saved_faqs}, Scale {PLAN_LIMITS.scale.saved_faqs}.
      </p>
    </div>
  );
}
