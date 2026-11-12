import { useEffect, useRef, useState, type ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";

export interface RowMenuItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
  hidden?: boolean;
}

export function RowMenu({ items, label = "Row actions" }: { items: RowMenuItem[]; label?: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const visible = items.filter((item) => !item.hidden);
  if (visible.length === 0) return null;

  return (
    <div className="bell-wrap" ref={wrapRef} onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        className="btn-icon"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div className="dropdown" style={{ minWidth: 160 }}>
          {visible.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
              style={item.danger ? { color: "var(--red)" } : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-top">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="inline">{actions}</div>}
    </div>
  );
}
