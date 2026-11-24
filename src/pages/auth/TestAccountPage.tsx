import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { testAccountApi, type TestAccountInfo, type TestAccountSession } from "../../api/testAccount";
import type { PlanName, User } from "../../types";

const PLAN_LABELS: Record<PlanName, string> = {
  free: "Free",
  starter: "Starter",
  growth: "Growth",
  scale: "Scale",
  teams: "Teams",
};

/**
 * Review-environment entry point.
 *
 * This page exists so an automated agent (or a human reviewer) can enter the
 * product without AuthAction, switch between every plan and inspect a seeded
 * workspace. The credential is issued by the API; nothing here can create a
 * normal account.
 */
export function TestAccountPage() {
  const navigate = useNavigate();
  const { user, isTestSession, startTestSession, refresh, signOut } = useAuth();

  const [info, setInfo] = useState<TestAccountInfo | null>(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<PlanName>("growth");
  const [busy, setBusy] = useState<"login" | "signup" | "plan" | "reset" | "delete" | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadInfo = useCallback(async () => {
    try {
      const next = await testAccountApi.info();
      setInfo(next);
      setEmail((current) => current || next.email);
      setPlan(next.plan);
    } catch (cause) {
      setError((cause as Error)?.message || "The test account could not be loaded.");
    } finally {
      setLoadingInfo(false);
    }
  }, []);

  useEffect(() => {
    void loadInfo();
  }, [loadInfo]);

  const enter = useCallback(
    (session: TestAccountSession) => {
      startTestSession(session.token, session.user as User);
      navigate("/dashboard", { replace: true });
    },
    [navigate, startTestSession]
  );

  const signUp = useCallback(async () => {
    setBusy("signup");
    setError("");
    setNotice("");
    try {
      enter(await testAccountApi.signup(email, plan));
    } catch (cause) {
      setError((cause as Error)?.message || "The test account could not be created.");
    } finally {
      setBusy(null);
    }
  }, [email, enter, plan]);

  const logIn = useCallback(async () => {
    if (!info) return;
    setBusy("login");
    setError("");
    setNotice("");
    try {
      enter(await testAccountApi.login(email, info.password));
    } catch (cause) {
      setError((cause as Error)?.message || "The test account could not sign in.");
    } finally {
      setBusy(null);
    }
  }, [email, enter, info]);

  const switchPlan = useCallback(
    async (next: PlanName) => {
      setPlan(next);
      if (!isTestSession) return;
      setBusy("plan");
      setError("");
      setNotice("");
      try {
        const result = await testAccountApi.changePlan(next);
        await refresh();
        setNotice(`Plan switched to ${PLAN_LABELS[result.plan]}. Limits and features now follow that plan.`);
      } catch (cause) {
        setError((cause as Error)?.message || "The plan could not be changed.");
      } finally {
        setBusy(null);
      }
    },
    [isTestSession, refresh]
  );

  const resetSamples = useCallback(async () => {
    setBusy("reset");
    setError("");
    setNotice("");
    try {
      const result = await testAccountApi.reset();
      const counts = result.environment;
      setNotice(
        counts
          ? `Sample data recreated: ${counts.clients} clients, ${counts.proposals} proposals, ${counts.contracts} contracts, ${counts.forms} forms, ${counts.invoices} invoices.`
          : "Sample data recreated."
      );
      if (counts?.warnings?.length) setError(counts.warnings.join(" · "));
    } catch (cause) {
      setError((cause as Error)?.message || "The sample data could not be reset.");
    } finally {
      setBusy(null);
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    if (
      !window.confirm(
        "Delete the test account and every document, client, invoice, form, contract, notification and session it owns? This cannot be undone."
      )
    ) {
      return;
    }
    setBusy("delete");
    setError("");
    setNotice("");
    try {
      const result = await testAccountApi.remove();
      await signOut();
      setNotice(result.message);
      setInfo((current) => (current ? { ...current, registered: false, account: null } : current));
      navigate("/testaccountforyou", { replace: true });
    } catch (cause) {
      setError((cause as Error)?.message || "The test account could not be deleted.");
    } finally {
      setBusy(null);
    }
  }, [navigate, signOut]);

  return (
    <div className="auth-card test-card">
      <p className="eyebrow">Review environment</p>
      <h1>Test account.</h1>
      <p className="lede">
        Sign in without AuthAction, switch between plans and inspect a workspace seeded with
        clients, proposals, contracts, forms and invoices. This account only exists for review.
      </p>

      {error ? (
        <p className="auth-form-error" role="alert">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p className="auth-hint" role="status">
          {notice}
        </p>
      ) : null}

      {loadingInfo ? (
        <p className="muted">Loading the test account…</p>
      ) : !info ? (
        <p className="muted">The test account could not be loaded.</p>
      ) : !info.enabled ? (
        <p className="auth-hint">
          The test account is disabled on this deployment. Set <code>TEST_ACCOUNT_ENABLED=true</code>{" "}
          on the API to enable it.
        </p>
      ) : (
        <>
          <div className="test-creds" aria-label="Sample credentials">
            <div>
              <span>Email</span>
              <code>{info.email}</code>
            </div>
            <div>
              <span>Password</span>
              <code>{info.password}</code>
            </div>
          </div>

          <div className="test-section">
            <p className="test-section-title">Plan to test</p>
            <div className="test-plans" role="group" aria-label="Choose a plan">
              {info.plans.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`test-plan${plan === option ? " is-active" : ""}`}
                  aria-pressed={plan === option}
                  onClick={() => void switchPlan(option)}
                  disabled={busy === "plan"}
                >
                  {PLAN_LABELS[option]}
                </button>
              ))}
            </div>
            <p className="auth-hint-tight">
              Every plan keeps the same sample data; limits, features and billing screens change.
            </p>
          </div>

          <div className="auth-form">
            <label className="test-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                autoComplete="email"
                placeholder="agent@revercue.test"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <Button type="button" fullWidth loading={busy === "login"} onClick={() => void logIn()}>
              Log in as test account
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              loading={busy === "signup"}
              onClick={() => void signUp()}
            >
              {info.registered ? "Update / recreate test account" : "Create test account"}
            </Button>
          </div>

          <p className="auth-hint">
            Signing up sets the account email and recreates the sample workspace if it is missing.
            The password stays the same.
          </p>

          {isTestSession && user ? (
            <div className="test-section test-session">
              <p className="test-section-title">Signed in</p>
              <p className="muted">
                {user.email} · {PLAN_LABELS[user.plan] ?? user.plan}
              </p>
              <div className="test-actions">
                <Button type="button" variant="secondary" onClick={() => navigate("/dashboard")}>
                  Open dashboard
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  loading={busy === "reset"}
                  onClick={() => void resetSamples()}
                >
                  Reset sample data
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  loading={busy === "delete"}
                  onClick={() => void deleteAccount()}
                >
                  Delete test account and all its data
                </Button>
              </div>
            </div>
          ) : null}
        </>
      )}

      <p className="auth-foot">
        Reviewers with a normal account should <a href="/login">log in through AuthAction</a>.
      </p>
    </div>
  );
}
