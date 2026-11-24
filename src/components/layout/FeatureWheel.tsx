import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FEATURE_LINKS = [
  { to: "/features/proposals", label: "Proposals" },
  { to: "/features/contracts", label: "Contracts" },
  { to: "/features/requirement-forms", label: "Requirement forms" },
  { to: "/features/invoices", label: "Invoices" },
  { to: "/features/crm", label: "CRM" },
  { to: "/features/builder", label: "The builder" },
  { to: "/features/suggestions", label: "Suggestions" },
];

interface FeatureWheelProps {
  open: boolean;
  onClose: () => void;
}

export function FeatureWheel({ open, onClose }: FeatureWheelProps) {
  const [radius, setRadius] = useState(190);

  useEffect(() => {
    const update = () => setRadius(window.innerWidth < 640 ? 128 : 190);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="feature-wheel-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="feature-wheel" role="dialog" aria-label="Revercue features">
        <Link to="/features" className="feature-wheel-hub" onClick={onClose}>
          <span>Features</span>
          <small>All features</small>
        </Link>
        {FEATURE_LINKS.map((item, index) => {
          const angle = -90 + index * (360 / FEATURE_LINKS.length);
          const rad = (angle * Math.PI) / 180;
          const x = Math.round(Math.cos(rad) * radius);
          const y = Math.round(Math.sin(rad) * radius);
          return (
            <Link
              key={item.to}
              to={item.to}
              className="feature-wheel-item"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={onClose}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
