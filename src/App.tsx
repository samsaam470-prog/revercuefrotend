import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ScrollToTop } from "./components/shared/ScrollToTop";
import { applyRouteMetadata } from "./lib/seo";
import { Reveal } from "./components/shared/Reveal";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AuthLayout } from "./components/layout/AuthLayout";
import { AppLayout } from "./components/layout/AppLayout";
import { OnboardingGate } from "./components/auth/OnboardingGate";
import {
  AboutPage,
  BetaPage,
  BlogPage,
  BlogPostPage,
  ComparePage,
  CompareDetailPage,
  CompareCriteriaPage,
  ContactPage,
  FeaturesPage,
  FaqsPage,
  GuideDetailPage,
  GuidesPage,
  HomePage,
  PricingPage,
  PrivacyPage,
  SecurityPage,
  TermsPage,
} from "./pages/public";
import {
  CallbackPage,
  ForgotPasswordPage,
  LoginPage,
  SignupPage,
} from "./pages/auth";
import {
  OnboardingStep1Page,
  OnboardingStep2Page,
  OnboardingStep4Page,
  OnboardingStep5Page,
} from "./pages/onboarding";
import {
  ContractsListPage,
  DashboardOverviewPage,
  FormsListPage,
  InvoicesListPage,
  NotificationsPage,
  ProposalsListPage,
  SettingsPage,
  type SettingsSection,
} from "./pages/app";
import { ProposalBuilderPage } from "./pages/builder/ProposalBuilderPage";
import { ContractBuilderPage } from "./pages/builder/ContractBuilderPage";
import { FormEditorPage } from "./pages/builder/FormEditorPage";
import { InvoiceBuilderPage } from "./pages/builder/InvoiceBuilderPage";
import { CrmListPage } from "./pages/crm/CrmListPage";
import { ClientDetailPage } from "./pages/crm/ClientDetailPage";
import {
  ProofUploadPage,
  PublicContractPage,
  PublicFormPage,
  PublicInvoicePage,
  PublicProposalPage,
} from "./pages/client";
import {
  ForbiddenPage,
  NotFoundPage,
  OfflinePage,
  ServerErrorPage,
  SessionExpiredPage,
} from "./pages/utility";

export function App() {
  const { pathname } = useLocation();

  /* One shell serves every route, so the title and description follow the path. */
  useEffect(() => {
    applyRouteMetadata(pathname);
  }, [pathname]);

  /* The helper downloads silently in the background. No panel, no progress. */
  useEffect(() => {
    let cancelled = false;
    void import("./lib/webllm").then((helper) => {
      if (!cancelled && helper.isAvailable()) helper.scheduleWarmup();
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <>
      <ScrollToTop />
      <Reveal />
      <div className="route-view" key={pathname}>
        <Routes>
      {/* public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/compare/criteria" element={<CompareCriteriaPage />} />
        <Route path="/compare/:slug" element={<CompareDetailPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:slug" element={<GuideDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/beta" element={<BetaPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
      </Route>

      {/* auth */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* The authorization response is completed here, never on a guarded route. */}
        <Route path="/callback" element={<CallbackPage />} />
      </Route>

      {/* onboarding, protected: sign-in required, completed users go to the app */}
      <Route element={<OnboardingGate />}>
        <Route path="/onboarding/step-1" element={<OnboardingStep1Page />} />
        <Route path="/onboarding/step-2" element={<OnboardingStep2Page />} />
        <Route path="/onboarding/step-3" element={<Navigate to="/onboarding/step-4" replace />} />
        <Route path="/onboarding/step-4" element={<OnboardingStep4Page />} />
        <Route path="/onboarding/step-5" element={<OnboardingStep5Page />} />
      </Route>

      {/* the app */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardOverviewPage />} />
        <Route path="/proposals" element={<ProposalsListPage />} />
        <Route path="/contracts" element={<ContractsListPage />} />
        <Route path="/forms" element={<FormsListPage />} />
        <Route path="/invoices" element={<InvoicesListPage />} />
        <Route path="/crm" element={<CrmListPage />} />
        <Route path="/crm/:id" element={<ClientDetailPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route
          path="/settings"
          element={<Navigate to="/settings/profile" replace />}
        />
        {(
          [
            "profile",
            "appearance",
            "plan",
            "security",
            "notifications",
            "saved-faqs",
            "saved-packages",
            "revision-prices",
            "what-revercue-knows",
            "delete-account",
          ] as SettingsSection[]
        ).map((section) => (
          <Route key={section} path={`/settings/${section}`} element={<SettingsPage section={section} />} />
        ))}
      </Route>

      {/* builders take the full screen, no app chrome */}
      <Route path="/proposals/new" element={<ProposalBuilderPage />} />
      <Route path="/proposals/:id/edit" element={<ProposalBuilderPage />} />
      <Route path="/contracts/new" element={<ContractBuilderPage />} />
      <Route path="/contracts/:id/edit" element={<ContractBuilderPage />} />
      <Route path="/forms/new" element={<FormEditorPage />} />
      <Route path="/forms/:id/edit" element={<FormEditorPage />} />
      <Route path="/invoices/new" element={<InvoiceBuilderPage />} />
      <Route path="/invoices/:id/edit" element={<InvoiceBuilderPage />} />

      {/* client-facing documents */}
      <Route path="/p/:publicId" element={<PublicProposalPage />} />
      <Route path="/c/:publicId" element={<PublicContractPage />} />
      <Route path="/i/:publicId" element={<PublicInvoicePage />} />
      <Route path="/i/:publicId/proof" element={<ProofUploadPage />} />
      <Route path="/f/:publicId" element={<PublicFormPage />} />

      <Route path="/offline" element={<OfflinePage />} />
      <Route path="/session-expired" element={<SessionExpiredPage />} />
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}
