import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/public/HomePage';
import FeaturesPage from './pages/public/FeaturesPage';
import PricingPage from './pages/public/PricingPage';
import ComparePage from './pages/public/ComparePage';
import GuidesPage from './pages/public/GuidesPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import BlogPage from './pages/public/BlogPage';
import BetaPage from './pages/public/BetaPage';
import PrivacyPage from './pages/public/PrivacyPage';
import TermsPage from './pages/public/TermsPage';
import SecurityPage from './pages/public/SecurityPage';
import DashboardOverviewPage from './pages/app/DashboardOverviewPage';
import ProposalsListPage from './pages/app/ProposalsListPage';
import ContractsListPage from './pages/app/ContractsListPage';
import FormsListPage from './pages/app/FormsListPage';
import InvoicesListPage from './pages/app/InvoicesListPage';
import SettingsPage from './pages/app/SettingsPage';
import NotificationsPage from './pages/app/NotificationsPage';
import ProposalBuilderPage from './pages/builder/ProposalBuilderPage';
import ContractBuilderPage from './pages/builder/ContractBuilderPage';
import FormEditorPage from './pages/builder/FormEditorPage';
import InvoiceBuilderPage from './pages/builder/InvoiceBuilderPage';
import CrmListPage from './pages/crm/CrmListPage';
import ClientDetailPage from './pages/crm/ClientDetailPage';
import PublicProposalPage from './pages/client/PublicProposalPage';
import PublicContractPage from './pages/client/PublicContractPage';
import PublicInvoicePage from './pages/client/PublicInvoicePage';
import PublicFormPage from './pages/client/PublicFormPage';
import PasswordWall from './pages/client/PasswordWall';
import ClosedPage from './pages/client/ClosedPage';
import ProofUploadPage from './pages/client/ProofUploadPage';
import NotFoundPage from './pages/utility/NotFoundPage';
import ForbiddenPage from './pages/utility/ForbiddenPage';
import ServerErrorPage from './pages/utility/ServerErrorPage';
import OfflinePage from './pages/utility/OfflinePage';
import SessionExpiredPage from './pages/utility/SessionExpiredPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/guides" element={<GuidesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/beta" element={<BetaPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/dashboard" element={<DashboardOverviewPage />} />
      <Route path="/proposals" element={<ProposalsListPage />} />
      <Route path="/contracts" element={<ContractsListPage />} />
      <Route path="/forms" element={<FormsListPage />} />
      <Route path="/invoices" element={<InvoicesListPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/proposals/new" element={<ProposalBuilderPage />} />
      <Route path="/contracts/new" element={<ContractBuilderPage />} />
      <Route path="/forms/new" element={<FormEditorPage />} />
      <Route path="/invoices/new" element={<InvoiceBuilderPage />} />
      <Route path="/crm" element={<CrmListPage />} />
      <Route path="/crm/:id" element={<ClientDetailPage />} />
      <Route path="/p/:publicId" element={<PublicProposalPage />} />
      <Route path="/c/:publicId" element={<PublicContractPage />} />
      <Route path="/i/:publicId" element={<PublicInvoicePage />} />
      <Route path="/f/:publicId" element={<PublicFormPage />} />
      <Route path="/unlock" element={<PasswordWall />} />
      <Route path="/closed" element={<ClosedPage />} />
      <Route path="/proof" element={<ProofUploadPage />} />
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="/offline" element={<OfflinePage />} />
      <Route path="/session-expired" element={<SessionExpiredPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
