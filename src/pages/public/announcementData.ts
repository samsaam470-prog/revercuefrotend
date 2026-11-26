import data from "../../content/announcements.json";

export interface Announcement {
  slug: string;
  date: string;
  status: string;
  title: string;
  summary: string;
  links: { label: string; to: string }[];
  body: { heading: string; paragraphs: string[] }[];
}

export const ANNOUNCEMENTS: Announcement[] = [...(data as Announcement[])].sort((a, b) =>
  b.date.localeCompare(a.date),
);
