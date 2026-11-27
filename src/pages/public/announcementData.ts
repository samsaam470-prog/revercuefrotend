import data from "../../content/announcements.json";

export interface Announcement {
  slug: string;
  date: string;
  status: string;
  title: string;
  summary: string;
  links: { label: string; to: string }[];
  body: { heading: string; paragraphs: string[] }[];
  order?: number;
}

export const ANNOUNCEMENTS: Announcement[] = [...(data as Announcement[])].sort(
  (a, b) => b.date.localeCompare(a.date) || (b.order ?? 0) - (a.order ?? 0),
);
