import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";

/**
 * Field editor for the two builders whose content is not a block list.
 * Invoices keep money fields; forms keep questions. Both write the same shape
 * the builder pages and the server already use.
 */

type InvoiceContent = {
  line_items?: { description?: string; quantity?: number; unit_price?: number }[];
  notes?: string;
  currency?: string;
  tax?: number;
  total?: number;
  due_date?: string | null;
  payment_arrangement?: unknown;
};

type FormQuestion = { id?: string; label?: string; type?: string; required?: boolean };
type FormContent = {
  description?: string;
  questions?: FormQuestion[];
  branching?: unknown;
  thank_you_config?: unknown;
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/30 px-2 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-[#c9a961]/60 focus:outline-none disabled:opacity-60";

export function StructuredEditor({
  type,
  content,
  onChange,
  disabled = false,
  currency = "GBP",
}: {
  type: "invoice" | "form";
  content: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  disabled?: boolean;
  currency?: string;
}) {
  if (type === "invoice") {
    const invoice = content as InvoiceContent;
    const items = invoice.line_items ?? [];
    const tax = Number(invoice.tax ?? 0);
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.quantity ?? 1) * Number(item.unit_price ?? 0),
      0,
    );
    const total = Math.round(subtotal * (1 + tax / 100));

    const writeItems = (next: InvoiceContent["line_items"]) => {
      const list = next ?? [];
      const sub = list.reduce((sum, item) => sum + Number(item.quantity ?? 1) * Number(item.unit_price ?? 0), 0);
      onChange({ ...content, line_items: list, total: Math.round(sub * (1 + tax / 100)) });
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-white/60">
            Currency
            <input
              className={inputClass}
              value={String(invoice.currency ?? currency)}
              disabled={disabled}
              onChange={(event) => onChange({ ...content, currency: event.target.value.toUpperCase().slice(0, 3) })}
            />
          </label>
          <label className="text-xs text-white/60">
            Due date
            <input
              type="date"
              className={inputClass}
              value={String(invoice.due_date ?? "")}
              disabled={disabled}
              onChange={(event) => onChange({ ...content, due_date: event.target.value || null })}
            />
          </label>
          <label className="text-xs text-white/60">
            Tax %
            <input
              type="number"
              min={0}
              max={100}
              className={inputClass}
              value={Number(invoice.tax ?? 0)}
              disabled={disabled}
              onChange={(event) => {
                const nextTax = Number(event.target.value || 0);
                const sub = items.reduce((sum, item) => sum + Number(item.quantity ?? 1) * Number(item.unit_price ?? 0), 0);
                onChange({ ...content, tax: nextTax, total: Math.round(sub * (1 + nextTax / 100)) });
              }}
            />
          </label>
          <div className="text-xs text-white/60">
            Total
            <p className="mt-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5 text-sm text-[#e8d9a8]">
              {String(invoice.currency ?? currency)} {total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-white/50">Line items</p>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_60px_80px_28px] items-center gap-1">
              <input
                className={inputClass}
                aria-label={`Item ${index + 1} description`}
                value={String(item.description ?? "")}
                disabled={disabled}
                onChange={(event) =>
                  writeItems(items.map((entry, i) => (i === index ? { ...entry, description: event.target.value } : entry)))
                }
              />
              <input
                className={inputClass}
                type="number"
                min={1}
                aria-label={`Item ${index + 1} quantity`}
                value={Number(item.quantity ?? 1)}
                disabled={disabled}
                onChange={(event) =>
                  writeItems(
                    items.map((entry, i) => (i === index ? { ...entry, quantity: Number(event.target.value || 1) } : entry)),
                  )
                }
              />
              <input
                className={inputClass}
                type="number"
                min={0}
                step="0.01"
                aria-label={`Item ${index + 1} unit price`}
                value={Number(item.unit_price ?? 0)}
                disabled={disabled}
                onChange={(event) =>
                  writeItems(
                    items.map((entry, i) =>
                      i === index ? { ...entry, unit_price: Number(event.target.value || 0) } : entry,
                    ),
                  )
                }
              />
              <button
                type="button"
                aria-label={`Remove item ${index + 1}`}
                disabled={disabled}
                className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-red-300 disabled:opacity-40"
                onClick={() => writeItems(items.filter((_, i) => i !== index))}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {!disabled && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => writeItems([...items, { description: "New item", quantity: 1, unit_price: 0 }])}
            >
              <Plus size={12} className="mr-1" /> Add line item
            </Button>
          )}
        </div>

        <label className="block text-xs text-white/60">
          Notes
          <textarea
            rows={3}
            className={inputClass}
            value={String(invoice.notes ?? "")}
            disabled={disabled}
            onChange={(event) => onChange({ ...content, notes: event.target.value })}
          />
        </label>
      </div>
    );
  }

  const form = content as FormContent;
  const questions = form.questions ?? [];

  return (
    <div className="space-y-4">
      <label className="block text-xs text-white/60">
        Description
        <textarea
          rows={3}
          className={inputClass}
          value={String(form.description ?? "")}
          disabled={disabled}
          onChange={(event) => onChange({ ...content, description: event.target.value })}
        />
      </label>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-white/50">Questions</p>
        {questions.map((question, index) => (
          <div key={question.id ?? index} className="flex items-center gap-1">
            <input
              className={inputClass}
              aria-label={`Question ${index + 1}`}
              value={String(question.label ?? "")}
              disabled={disabled}
              onChange={(event) =>
                onChange({
                  ...content,
                  questions: questions.map((entry, i) => (i === index ? { ...entry, label: event.target.value } : entry)),
                })
              }
            />
            <button
              type="button"
              aria-label={`Remove question ${index + 1}`}
              disabled={disabled}
              className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-red-300 disabled:opacity-40"
              onClick={() => onChange({ ...content, questions: questions.filter((_, i) => i !== index) })}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {!disabled && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onChange({
                ...content,
                questions: [
                  ...questions,
                  { id: `q_${crypto.randomUUID()}`, label: "New question", type: "text", required: false },
                ],
              })
            }
          >
            <Plus size={12} className="mr-1" /> Add question
          </Button>
        )}
      </div>
    </div>
  );
}
