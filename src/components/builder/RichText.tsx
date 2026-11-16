import type { CSSProperties, ReactNode } from "react";

const RULE = /^(?:[bius]|c:#[0-9a-fA-F]{3,8}|s:\d{1,3})$/;

function styled(rule: string, inner: ReactNode, key: number): ReactNode {
  if (rule === "b") return <strong key={key}>{inner}</strong>;
  if (rule === "i") return <em key={key}>{inner}</em>;
  if (rule === "u")
    return (
      <span key={key} style={{ textDecoration: "underline" }}>
        {inner}
      </span>
    );
  if (rule.startsWith("c:"))
    return (
      <span key={key} style={{ color: rule.slice(2) }}>
        {inner}
      </span>
    );
  return (
    <span key={key} style={{ fontSize: Number(rule.slice(2)) }}>
      {inner}
    </span>
  );
}

/** Parses {rule|text} tokens, including tokens nested inside other tokens. */
function parse(text: string, keyPrefix = "n"): ReactNode[] {
  const nodes: ReactNode[] = [];
  let buffer = "";
  let i = 0;

  const flush = () => {
    if (!buffer) return;
    nodes.push(buffer);
    buffer = "";
  };

  while (i < text.length) {
    if (text[i] === "{") {
      const bar = text.indexOf("|", i);
      const rule = bar > i + 1 ? text.slice(i + 1, bar) : "";
      if (bar > 0 && RULE.test(rule)) {
        let depth = 1;
        let j = bar + 1;
        while (j < text.length) {
          if (text[j] === "{") depth += 1;
          else if (text[j] === "}") depth -= 1;
          if (depth === 0) break;
          j += 1;
        }
        if (depth === 0) {
          flush();
          const inner = text.slice(bar + 1, j);
          nodes.push(styled(rule, parse(inner, `${keyPrefix}-${nodes.length}`), nodes.length));
          i = j + 1;
          continue;
        }
      }
    }
    buffer += text[i];
    i += 1;
  }

  flush();
  return nodes;
}

/**
 * Renders the formatting vocabulary the builder toolbar writes into a text
 * value: {b|bold}, {i|italic}, {u|underline}, {c:#hex|coloured}, {s:18|sized}.
 */
export function RichText({ value, style }: { value?: string; style?: CSSProperties }) {
  if (!value) return null;
  return <span style={style}>{parse(value)}</span>;
}
