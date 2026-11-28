import { useEffect } from "react";
import { SitemapPage } from "./pages/public/SitemapPage";
import { SolutionsIndexPage } from "./pages/public/SolutionsIndexPage";
import { AnnouncementsPage } from "./pages/public/AnnouncementsPage";
import { AnnouncementPage } from "./pages/public/AnnouncementPage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ScrollToTop } from "./components/shared/ScrollToTop";
import { applyRouteMetadata } from "./lib/seo";
import { Reveal } from "./components/shared/Reveal";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AuthLayout } from "./components/layout/AuthLayout";
import { AppLayout } from "./components/layout/AppLayout";
import { OnboardingGate } from "./components/auth/OnboardingGate";
import {
  AboutPage, BetaPage, BlogPage, BlogPostPage, ComparePage, CompareDetailPage,
  CompareCriteriaPage, ContactPage, FeaturesPage, FaqsPage, GuideDetailPage,
  GuidesPage, HomePage, PricingPage, PrivacyPage, SecurityPage, TermsPage,
  SolutionLandingPage, FeatureDetailPage,
} from "./pages/public";
import { CallbackPage, LoginPage } from "./pages/auth";
import {
  OnboardingStep1Page, OnboardingStep2Page, OnboardingStep4Page, OnboardingStep5Page,
} from "./pages/onboarding";
import {
  ContractsListPage, DashboardOverviewPage, FormsListPage, InvoicesListPage,
  NotificationsPage, ProposalsListPage, SettingsPage, type SettingsSection,
} from "./pages/app";
import { ProposalBuilderPage } from "./pages/builder/ProposalBuilderPage";
import { ContractBuilderPage } from "./pages/builder/ContractBuilderPage";
import { FormEditorPage } from "./pages/builder/FormEditorPage";
import { SharedTemplatePage } from "./pages/app/SharedTemplatePage";
import { InvoiceBuilderPage } from "./pages/builder/InvoiceBuilderPage";
import { OfflineEditorPage } from "./pages/builder/OfflineEditorPage";
import { ContributorBuilderPage } from "./pages/public/ContributorBuilderPage";
import { CollaborationDock } from "./components/collaboration/CollaborationDock";
import { CrmListPage } from "./pages/crm/CrmListPage";
import { ClientDetailPage } from "./pages/crm/ClientDetailPage";
import {
  ProofUploadPage, PublicContractPage, PublicFormPage, PublicInvoicePage, PublicProposalPage,
} from "./pages/client";
import {
  ForbiddenPage, NotFoundPage, OfflinePage, ServerErrorPage, SessionExpiredPage,
} from "./pages/utility";

export function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    applyRouteMetadata(pathname);
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    void import("./lib/webllm").then((helper) => {
      if (!cancelled && helper.isAvailable()) helper.scheduleWarmup();
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Reveal />
      <div className="route-view" key={pathname}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/features/:slug" element={<FeatureDetailPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/solutions" element={<SolutionsIndexPage />} />
            <Route path="/solutions/:slug" element={<SolutionLandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/compare/criteria" element={<CompareCriteriaPage />} />
            <Route path="/compare/:slug" element={<CompareDetailPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/:slug" element={<GuideDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/announcements/template-pack-73-released" element={<Navigate to="/announcements/new-template-pack-available-in-revercue" replace />} />
            <Route path="/guides/shareable-builder" element={<Navigate to="/guides/shareable-builder-guide" replace />} />
            <Route path="/guides/offline-builder" element={<Navigate to="/guides/offline-builder-guide" replace />} />
            <Route path="/announcements/:slug" element={<AnnouncementPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/beta" element={<BetaPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            {/* Review environment: no AuthAction, fixed sample credentials. */}
          </Route>
          <Route element={<OnboardingGate />}>
            <Route path="/onboarding/step-1" element={<OnboardingStep1Page />} />
            <Route path="/onboarding/step-2" element={<OnboardingStep2Page />} />
            <Route path="/onboarding/step-3" element={<Navigate to="/onboarding/step-4" replace />} />
            <Route path="/onboarding/step-4" element={<OnboardingStep4Page />} />
            <Route path="/onboarding/step-5" element={<OnboardingStep5Page />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardOverviewPage />} />
            <Route path="/proposals" element={<ProposalsListPage />} />
            <Route path="/contracts" element={<ContractsListPage />} />
            <Route path="/forms" element={<FormsListPage />} />
            <Route path="/invoices" element={<InvoicesListPage />} />
            <Route path="/crm" element={<CrmListPage />} />
            <Route path="/crm/:id" element={<ClientDetailPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<Navigate to="/settings/profile" replace />} />
            {(["profile", "appearance", "plan", "security", "notifications", "saved-faqs", "saved-packages", "templates", "template-library", "revision-prices", "revenue", "what-revercue-knows", "delete-account"] as SettingsSection[]).map((section) => (
              <Route key={section} path={`/settings/${section}`} element={<SettingsPage section={section} />} />
            ))}
          </Route>
          {/*
            A shared template link is opened by people who are usually signed
            out, so it gates itself: it shows a sign-in card and returns here
            after the AuthAction round trip. Inside AppLayout it would sit
            behind the app's loading state, which is wrong for a link someone
            just received.
          */}
          <Route path="/settings/shared-template/:token" element={<SharedTemplatePage />} />
          <Route path="/proposals/new" element={<ProposalBuilderPage />} />
          <Route path="/proposals/:id/edit" element={<ProposalBuilderPage />} />
          <Route path="/contracts/new" element={<ContractBuilderPage />} />
          <Route path="/contracts/:id/edit" element={<ContractBuilderPage />} />
          <Route path="/forms/new" element={<FormEditorPage />} />
          <Route path="/forms/:id/edit" element={<FormEditorPage />} />
          <Route path="/invoices/new" element={<InvoiceBuilderPage />} />
          <Route path="/invoices/:id/edit" element={<InvoiceBuilderPage />} />
          {/* Offline Builder: works from IndexedDB, so it sits outside the app shell. */}
          <Route path="/offline-editor/:type/:id" element={<OfflineEditorPage />} />
          {/* Shareable Builder: opened by a contributor with no Revercue account. */}
          <Route path="/contribute/:token" element={<ContributorBuilderPage />} />
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
        <CollaborationDock />
      </div>
    </>
  );
}
