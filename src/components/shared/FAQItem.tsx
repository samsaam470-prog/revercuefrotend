export function FAQItem({ q, a }: { q: string; a: string }) { return (<details className="faq-item"><summary>{q}</summary><p>{a}</p></details>); }
