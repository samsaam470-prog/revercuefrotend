import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarClock, PauseCircle, ShieldCheck, Sparkles } from "lucide-react";
import { settingsApi } from "../../api/settings";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useToast } from "../../hooks/useToast";
import { SCALE_BONUS } from "../../lib/constants";
import { formatCurrency, formatDate } from "../../lib/formatters";
import type { BillingEntitlements, CapacityOffer } from "../../types/billing";

/**
 * The billing screen's subscription lifecycle panel.
 *
 * Every paid action here is explicit: the prices, whether a charge is one-time
 * or monthly, and the fact that continuing with Scale is a NEW subscription are
 * all on screen before the customer leaves for Whop. Nothing is charged by
 * Revercue itself.
 */

interface Props {
  data: BillingEntitlements;
  subscription: any;
  onRefresh: () => void;
}

export function SubscriptionLifecyclePanel({ data, subscription, onRefresh }: Props) {
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<null | { title: string; description: string; confirmLabel: string; run: () => Promise<void> }>(null);

  const goToCheckout = (url: string) => {
    if (!url) {
      toast.error("Whop did not return a checkout link. Try again.");
      return;
    }
    window.location.assign(url);
  };

  const run = async (key: string, action: () => Promise<void>) => {
    setBusy(key);
    try {
      await action();
      onRefresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Try again.");
    } finally {
      setBusy(null);
    }
  };

  const startScale = (message: string) =>
    setConfirm({
      title: "Continue with Scale",
      description: message,
      confirmLabel: `Continue to $${SCALE_BONUS.scalePrice}/month checkout`,
      run: async () => {
        const result = await settingsApi.billingUpgrade("scale");
        goToCheckout(result.checkout_url);
      },
    });

  const startDowngrade = (plan: string) =>
    setConfirm({
      title: `Switch to ${plan}`,
      description:
        `We cancel your current subscription first, then send you a new Whop checkout for ${plan}. `
        + "You keep access until the end of the period you have already paid for, and the new plan starts only after Whop confirms the payment.",
      confirmLabel: `Cancel current plan and continue`,
      run: async () => {
        const result = await settingsApi.billingDowngrade(plan);
        if (result.checkout_url) goToCheckout(result.checkout_url);
        else toast.success("Your plan will move to Free at the end of this billing period.");
      },
    });

  const startCapacity = (offer: CapacityOffer) =>
    setConfirm({
      title: offer.name,
      description:
        `${formatCurrency(offer.amount_cents / 100)}${offer.interval === "month" ? " per month, renewing until you cancel" : " one-time payment"}. `
        + offer.summary,
      confirmLabel: "Continue to Whop checkout",
      run: async () => {
        const result = await settingsApi.billingCapacityCheckout(offer.key);
        goToCheckout(result.checkout_url);
      },
    });

  const status = data.status;
  const inBonus = status === "scale_bonus";
  const inCombined = status === "combined_limits";
  const paused = status === "paused";
  const pendingCancel = Boolean(subscription?.cancel_at_period_end);

  const trialProgress = data.bonus
    ? Math.min(100, Math.max(0, ((SCALE_BONUS.days - data.bonus.days_left) / SCALE_BONUS.days) * 100))
    : 0;

  return (
    <div className="stack-4">
      <div className="settings-card">
        <div className="between" style={{ alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {inCombined ? <Sparkles size={18} /> : inBonus ? <Sparkles size={18} /> : <CalendarClock size={18} />}
              {inBonus
                ? "Scale bonus active"
                : inCombined
                  ? "Temporary combined limits active"
                  : paused
                    ? "Subscription paused"
                    : status === "free"
                      ? "No active subscription"
                      : "Your plan"}
            </h2>
            <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
              {inBonus && data.bonus && (
                <>
                  You have normal Scale limits until {formatDate(data.bonus.ends_at)} —{" "}
                  <strong>{data.bonus.days_left} {data.bonus.days_left === 1 ? "day" : "days"} left</strong>. Nothing extra is
                  charged during the bonus.
                </>
              )}
              {inCombined && data.combined && (
                <>
                  Growth and Scale capacity are combined until {formatDate(data.combined.ends_at)} —{" "}
                  <strong>{data.combined.days_left} {data.combined.days_left === 1 ? "day" : "days"} left</strong>. After that,
                  normal Scale limits apply.
                </>
              )}
              {!inBonus && !inCombined && status !== "free" && !paused && (
                <>
                  {data.plan} plan{subscription?.current_period_end ? ` · renews or ends ${formatDate(subscription.current_period_end)}` : ""}.
                </>
              )}
              {paused && "Billing is paused. Your data is kept and nothing is charged until you resume."}
              {status === "free" && "Choose Growth to start 14 days of Scale access, or Scale for full access from day one."}
            </p>
          </div>
          <div className="inline">
            {inBonus && <Badge variant="gold">Scale bonus</Badge>}
            {inCombined && <Badge variant="gold">Combined limits</Badge>}
            {paused && <Badge variant="amber">Paused</Badge>}
            {pendingCancel && !paused && <Badge variant="amber">Cancels at period end</Badge>}
            {data.over_limit.any && <Badge variant="red">Over limit</Badge>}
          </div>
        </div>

        {inBonus && data.bonus && (
          <div className="usage-row" style={{ marginTop: 16 }}>
            <div className="labels">
              <span>Scale bonus</span>
              <span>{data.bonus.days_left} of {SCALE_BONUS.days} days left</span>
            </div>
            <div className="usage-bar">
              <span style={{ width: `${trialProgress}%` }} />
            </div>
          </div>
        )}

        {data.bonus?.ending_soon && (
          <p className="caption" style={{ marginTop: 12 }}>
            <strong>The bonus is about to end.</strong> You keep Scale access until{" "}
            {formatDate(data.bonus.ends_at)}. After that the account continues on Growth unless you start a Scale subscription.
          </p>
        )}

        {inCombined && data.combined && (
          <p className="caption" style={{ marginTop: 12 }}>
            Extra while combined: +{Math.round(data.combined.extra.storage_mb / 1024)} GB storage and +
            {data.combined.extra.active_documents} active documents. These end on {formatDate(data.combined.ends_at)}.
          </p>
        )}

        <div className="inline" style={{ marginTop: 18, flexWrap: "wrap", gap: 8 }}>
          {(inBonus || status === "plan" || status === "free" || status === "past_due") && data.plan !== "scale" && (
            <Button
              onClick={() =>
                startScale(
                  `Scale starts a new $${SCALE_BONUS.scalePrice}/month subscription in Whop, so payment details are entered again. `
                  + "Your current plan is cancelled only after Whop confirms the new Scale payment.",
                )
              }
              loading={busy === "scale"}
            >
              Continue with Scale — ${SCALE_BONUS.scalePrice}/month
            </Button>
          )}
          {inBonus && (
            <Button
              variant="secondary"
              onClick={() =>
                startScale(
                  `Scale is a new $${SCALE_BONUS.scalePrice}/month subscription, separate from the Growth plan you bought. `
                  + "Because more than five days remain in this Growth period, you also keep Growth's extra capacity (1 GB and 100 documents) until this period ends.",
                )
              }
              loading={busy === "scale-early"}
            >
              Upgrade to Scale now
            </Button>
          )}
          {paused ? (
            <Button
              variant="secondary"
              loading={busy === "resume"}
              onClick={() => run("resume", async () => { await settingsApi.billingResume(); toast.success("Subscription resumed."); })}
            >
              Resume subscription
            </Button>
          ) : (
            <Button
              variant="secondary"
              loading={busy === "pause"}
              onClick={() =>
                setConfirm({
                  title: "Pause subscription",
                  description:
                    "Pausing stops billing and pauses your access. It is not a cancellation: your data is kept, and you can resume at any time. Whop may keep the membership in your account while it is paused.",
                  confirmLabel: "Pause billing",
                  run: async () => {
                    await settingsApi.billingPause();
                    toast.success("Subscription paused. Nothing is charged until you resume.");
                  },
                })
              }
            >
              <PauseCircle size={14} /> Pause
            </Button>
          )}
          <Link to={SCALE_BONUS.guidePath} className="btn btn-ghost">
            How the 14 days work <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {data.over_limit.any && (
        <div className="settings-card" style={{ borderColor: "var(--gold)" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ShieldCheck size={18} /> You are over the Scale allowance
          </h2>
          <p className="muted" style={{ fontSize: 14 }}>
            Nothing has been deleted. You are {data.over_limit.over_by.active_documents > 0
              ? `${data.over_limit.over_by.active_documents} active document${data.over_limit.over_by.active_documents === 1 ? "" : "s"}`
              : ""}
            {data.over_limit.over_by.active_documents > 0 && data.over_limit.over_by.storage_mb > 0 ? " and " : ""}
            {data.over_limit.over_by.storage_mb > 0 ? `${data.over_limit.over_by.storage_mb} MB` : ""} over.
            You can still view and download everything, but new publishing and uploads are blocked until your usage is back inside the limit.
          </p>
          <div className="stack-2" style={{ marginTop: 12 }}>
            {data.capacity.offers.map((offer) => (
              <div key={offer.key} className="between" style={{ gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ maxWidth: 560 }}>
                  <strong>{offer.name}</strong>
                  <p className="muted" style={{ fontSize: 14, marginTop: 2 }}>{offer.summary}</p>
                  <p className="caption">
                    {formatCurrency(offer.amount_cents / 100)}{" "}
                    {offer.interval === "month" ? "per month, cancellable" : "one-time, never renews"}
                    {offer.storage_gb ? ` · +${offer.storage_gb} GB` : ""}
                    {offer.active_documents ? ` · +${offer.active_documents} active documents` : ""}
                  </p>
                </div>
                <Button
                  variant={offer.key === "protect_plus" ? "primary" : "secondary"}
                  disabled={!offer.configured}
                  loading={busy === offer.key}
                  onClick={() => startCapacity(offer)}
                >
                  {offer.configured ? "Choose this option" : "Not available yet"}
                </Button>
              </div>
            ))}
          </div>
          {data.capacity.decline_notice && <p className="caption" style={{ marginTop: 12 }}>{data.capacity.decline_notice}</p>}
          {data.capacity.offers.some((offer) => !offer.configured) && (
            <p className="caption" style={{ marginTop: 8 }}>
              An option marked “not available yet” needs its Whop variant configured first. Email support and we will turn it on.
            </p>
          )}
        </div>
      )}

      {data.addons.length > 0 && (
        <div className="settings-card">
          <h2>Capacity add-ons</h2>
          {data.addons.map((addon) => (
            <p key={addon.id} className="muted" style={{ fontSize: 14 }}>
              {addon.name} · {formatCurrency(addon.amount_cents / 100)} {addon.billing_interval === "month" ? "per month" : "one-time"}
              {addon.storage_gb ? ` · +${addon.storage_gb} GB` : ""}
              {addon.active_documents ? ` · +${addon.active_documents} documents` : ""}
            </p>
          ))}
        </div>
      )}

      <div className="settings-card">
        <h2>Change plan</h2>
        <p className="muted" style={{ fontSize: 14 }}>
          Downgrades cancel the current subscription first and then send you a new Whop checkout for the lower plan. The lower
          plan starts only after Whop confirms the payment, and you keep the access you already paid for.
        </p>
        <div className="inline" style={{ flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {["free", "starter", "growth", "scale"]
            .filter((plan) => plan !== data.plan)
            .map((plan) => (
              <Button
                key={plan}
                variant="secondary"
                size="sm"
                loading={busy === `to-${plan}`}
                onClick={() => {
                  const isDowngrade = ["free", "starter", "growth", "scale"].indexOf(plan) <
                    ["free", "starter", "growth", "scale"].indexOf(data.plan);
                  if (isDowngrade) {
                    startDowngrade(plan);
                  } else {
                    setBusy(`to-${plan}`);
                    settingsApi
                      .billingUpgrade(plan)
                      .then((result) => goToCheckout(result.checkout_url))
                      .catch((error) => toast.error(error instanceof Error ? error.message : "Something went wrong. Try again."))
                      .finally(() => setBusy(null));
                  }
                }}
              >
                {["free", "starter", "growth", "scale"].indexOf(plan) <
                ["free", "starter", "growth", "scale"].indexOf(data.plan)
                  ? `Downgrade to ${plan === "free" ? "Free" : plan}`
                  : `Upgrade to ${plan}`}
              </Button>
            ))}
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        title={confirm?.title ?? ""}
        description={confirm?.description ?? ""}
        confirmLabel={confirm?.confirmLabel ?? "Continue"}
        destructive={false}
        onConfirm={async () => {
          if (!confirm) return;
          await run("confirm", confirm.run);
        }}
      />
    </div>
  );
}
