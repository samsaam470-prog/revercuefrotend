import type { CSSProperties, ReactNode } from "react";

const TOKEN = /\{([bius]|c:#[0-9a-fA-F]{3,8}|s:\d{1,3})\|([^}]*)\}/g;

/**
 * Renders the small formatting vocabulary the builder toolbar writes into a
 * text value: {b|bold}, {i|italic}, {u|underline}, {c:#hex|coloured} and
 * {s:18|sized}. Tokens never nest; the text between them is literal.
 */
export function RichText({ value, style }: { value?: string; style?: CSSProperties }) {
  if (!value) return null;

  const parts: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;

  while ((match = TOKEN.exec(value)) !== null) {
    if (match.index > cursor) parts.push(value.slice(cursor, match.index));
    const [, rule, inner] = match;
    let node: ReactNode = inner;

    if (rule === "b") node = <strong>{inner}</strong>;
    else if (rule === "i") node = <em>{inner}</em>;
    else if (rule === "u") node = <span style={{ textDecoration: "underline" }}>{inner}</span>;
    else if (rule.startsWith("c:")) node = <span style={{ color: rule.slice(2) }}>{inner}</span>;
    else if (rule.startsWith("s:")) node = <span style={{ fontSize: Number(rule.slice(2)) }}>{inner}</span>;

    parts.push(<span key={`${match.index}-${rule}`}>{node}</span>);
    cursor = match.index + match[0].length;
  }

  if (cursor < value.length) parts.push(value.slice(cursor));

  return <span style={style}>{parts}</span>;
}
