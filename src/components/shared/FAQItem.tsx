import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export interface FAQItemProps {
  question: string;
  answer: ReactNode;
  defaultOpen?: boolean;
}

/** A native <details> element — no accordion library, no modal. */
export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  return (
    <details className="faq-item" open={defaultOpen}>
      <summary>
        <span>{question}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </summary>
      <p>{answer}</p>
    </details>
  );
}
