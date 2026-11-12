import { AppLayout } from '../../components/layout/AppLayout';

export default function PasswordWall() {
  return (
    <AppLayout>
      <section className="page-header"><h1 className="headline">Protected</h1><p className="body-secondary">Enter the password.</p></section>
      <section className="page-content"><p>Content for Protected.</p></section>
    </AppLayout>
  );
}
