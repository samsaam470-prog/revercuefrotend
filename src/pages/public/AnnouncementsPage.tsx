import { Link } from "react-router-dom";
import { ANNOUNCEMENTS } from "./announcementData";
import { formatDate } from "../../lib/formatters";

export function AnnouncementsPage() {
  return (
    <div className="page">
      <div className="page-head">
        <p className="eyebrow">Announcements</p>
        <h1>What changed at Revercue, and when.</h1>
        <p>Dated notes on releases, plans, checkout and what is still in beta or planning. Newest first.</p>
      </div>
      <div className="card-grid">
        {ANNOUNCEMENTS.map((item) => (
          <Link key={item.slug} to={`/announcements/${item.slug}`} className="link-card">
            <span className="badge badge-gold">{item.status}</span>
            <h3 style={{ marginTop: 12 }}>{item.title}</h3>
            <p>{item.summary.slice(0, 220)}…</p>
            <p className="caption mt-4">{formatDate(item.date)} · Read more</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
