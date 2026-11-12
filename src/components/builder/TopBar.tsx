import { useState } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "../ui/Button";
import type { SaveState } from "../../hooks/useAutoSave";

const STATE_LABEL: Record<SaveState, string> = {
  saved: "Saved",
  saving: "Saving…",
  unsaved: "Unsaved changes",
  error: "Could not save — retrying",
};

export interface TopBarProps {
  title: string;
  onTitleChange: (value: string) => void;
  saveState: SaveState;
  onBack: () => void;
  onPreview: () => void;
  onSave: () => void;
  onCreate: () => void;
  creating?: boolean;
  moreItems?: { label: string; onClick: () => void; danger?: boolean }[];
  createLabel?: string;
}

export function TopBar({
  title,
  onTitleChange,
  saveState,
  onBack,
  onPreview,
  onSave,
  onCreate,
  creating,
  moreItems = [],
  createLabel = "Create",
}: TopBarProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="builder-bar">
      <div className="builder-title-wrap">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={14} /> Back
        </Button>
      </div>
      <div className="builder-title-wrap">
        <label htmlFor="builder-title" className="sr-only">
          Document title
        </label>
        <input
          id="builder-title"
          className="builder-title"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Untitled"
        />
        <span className={`save-state save-${saveState}`}>{STATE_LABEL[saveState]}</span>
      </div>
      <div className="inline">
        <Button variant="ghost" size="sm" onClick={onPreview}>
          Preview
        </Button>
        <Button variant="ghost" size="sm" onClick={onSave}>
          Save
        </Button>
        <Button size="sm" onClick={onCreate} loading={creating}>
          {createLabel}
        </Button>
        {moreItems.length > 0 && (
          <div style={{ position: "relative" }}>
            <button
              type="button"
              className="btn-icon"
              aria-label="More actions"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((value) => !value)}
            >
              <MoreVertical size={16} />
            </button>
            {moreOpen && (
              <div className="dropdown" style={{ right: 0, left: "auto" }}>
                {moreItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    style={item.danger ? { color: "var(--red)" } : undefined}
                    onClick={() => {
                      setMoreOpen(false);
                      item.onClick();
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
