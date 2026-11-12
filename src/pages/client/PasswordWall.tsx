import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export interface PasswordWallProps {
  title: string;
  brandName: string;
  onSubmit: (password: string) => Promise<void> | void;
  error?: string;
}

export function PasswordWall({ title, brandName, onSubmit, error }: PasswordWallProps) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!password) return;
    setBusy(true);
    try {
      await onSubmit(password);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="client-wrap">
      <div className="client-card stack-4" style={{ textAlign: "center" }}>
        <span className="client-mark" style={{ margin: "0 auto" }}>
          <Lock size={18} />
        </span>
        <div>
          <p className="eyebrow">{brandName}</p>
          <h1 className="serif" style={{ fontSize: 28, marginTop: 8 }}>
            This document is protected.
          </h1>
          <p className="muted" style={{ marginTop: 6 }}>
            {title} — enter the password you were given.
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
          className="stack-3"
        >
          <Input
            id="document-password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={error}
            autoComplete="current-password"
            helper="It is usually sent separately from the link."
          />
          <Button type="submit" loading={busy} disabled={!password}>
            Open document
          </Button>
        </form>
      </div>
    </div>
  );
}
