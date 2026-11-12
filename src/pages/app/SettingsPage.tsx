import { AppLayout } from '../../components/layout/AppLayout';

export default function SettingsPage() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Settings</h1><p className="body-secondary">Your account and your plan.</p></section>
      <section className="page-content"><p>Content for Settings.</p></section>
    </AppLayout>
  );
}
