import { Link, useParams } from "react-router-dom";
import { ANNOUNCEMENTS } from "./announcementData";
import { formatDate } from "../../lib/formatters";

export function AnnouncementPage() {
  const { slug = "" } = useParams();
  const item = ANNOUNCEMENTS.find((a) => a.slug === slug);

  if (!item) {
    return (
      <div className="page">
        <div className="page-head">
          <h1>Announcement not found.</h1>
          <Link to="/announcements" className="btn btn-primary mt-6">All announcements</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <article className="article" style={{ margin: "0 auto" }}>
        <p className="caption">
          <Link to="/announcements">Announcements</Link> · {formatDate(item.date)} · <span className="badge badge-gold">{item.status}</span>
        </p>
        <h1 className="serif" style={{ fontSize: 36, margin: "12px 0 16px" }}>{item.title}</h1>
        <p className="muted">{item.summary}</p>
        {item.body.map((section) => (
          <section key={section.heading} style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 24 }}>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </section>
        ))}
        {item.links.length > 0 && (
          <section className="mt-8">
            <h2>Related on Revercue</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
              {item.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
