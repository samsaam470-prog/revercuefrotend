import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import type { ThemeMode } from "../../contexts/ThemeContext";

const NEXT: Record<ThemeMode, ThemeMode> = {
  dark: "light",
  light: "system",
  system: "dark",
};

export function ThemeToggle() {
  const { mode, resolved, setMode } = useTheme();
  const label = mode === "system" ? `System (${resolved})` : mode === "light" ? "Light" : "Dark";

  return (
    <button
      type="button"
      className="icon-toggle"
      onClick={() => setMode(NEXT[mode])}
      aria-label={`Appearance: ${label}. Change to ${NEXT[mode]}.`}
      title={`Appearance — ${label}`}
    >
      {resolved === "light" ? <Sun size={16} /> : <Moon size={16} />}
      {mode === "system" && <span className="icon-toggle-dot" aria-hidden="true" />}
    </button>
  );
}
