import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { useToast } from "../../hooks/useToast";

export interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  url: string;
  defaultMessage: string;
  password?: string;
  onDone: () => void;
}

const CHANNELS = ["WhatsApp", "Email", "Instagram", "Facebook", "X", "Threads", "Copy Link"];

export function ShareModal({ open, onClose, title, url, defaultMessage, password, onDone }: ShareModalProps) {
  const [message, setMessage] = useState(defaultMessage);
  const [copied, setCopied] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (open) setMessage(defaultMessage);
  }, [open, defaultMessage]);

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      toast.success(`${label} copied.`);
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      toast.error("Copy failed. Select the text and copy it manually.");
    }
  };

  const share = async (channel: string) => {
    if (!url) {
      toast.error("Publish the document first — there is no public link yet.");
      return;
    }
    if (channel === "Copy Link") {
      await copy(url, "Link");
      return;
    }
    const text = `${message}\n${url}`;
    const targets: Record<string, string> = {
      WhatsApp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      Email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      X: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
      Threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`,
      Instagram: "https://www.instagram.com/",
    };
    if (navigator.share && (channel === "Instagram" || channel === "WhatsApp")) {
      try {
        await navigator.share({ title, text: message, url });
        return;
      } catch {
        /* the user cancelled the native sheet */
      }
    }
    window.open(targets[channel] || url, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="md"
      footer={<Button onClick={onDone}>Done</Button>}
    >
      <div className="stack-4">
        <div className="input-group">
          <label htmlFor="share-link">Public link</label>
          <div className="inline">
            <input id="share-link" className="input mono" value={url} readOnly style={{ flex: 1 }} />
            <Button variant="secondary" size="sm" onClick={() => void copy(url, "Link")}>
              <Copy size={13} /> {copied === "Link" ? "Copied" : "Copy"}
            </Button>
          </div>
          <span className="helper">Unguessable and noindex. No login for the client.</span>
        </div>

        <Textarea
          id="share-message"
          label="Message"
          value={message}
          onChange={setMessage}
          rows={4}
          helper="Edit it here, then send it from your own account."
        />

        <div className="inline">
          {CHANNELS.map((channel) => (
            <button
              key={channel}
              type="button"
              className="tab"
              onClick={() => void share(channel)}
              disabled={!url}
            >
              {channel}
            </button>
          ))}
        </div>

        {password && (
          <div className="notice notice-gold">
            Send the password separately: <span className="mono">{password}</span>{" "}
            <button type="button" className="btn btn-text btn-sm" onClick={() => void copy(password, "Password")}>
              Copy
            </button>
          </div>
        )}

        <p className="caption" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
          Revercue does not send the message. You send it from your own account.
        </p>
      </div>
    </Modal>
  );
}
