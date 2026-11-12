export interface TabItem {
  label: string;
  value: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

export function Tabs({ tabs, value, onChange, ariaLabel = "Sections" }: TabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={value === tab.value}
          className={`tab${value === tab.value ? " active" : ""}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
          {tab.count != null && <span className="tab-count">{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}
