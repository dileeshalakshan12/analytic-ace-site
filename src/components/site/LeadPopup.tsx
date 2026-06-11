import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { toast } from "sonner";

const KEY = "lumen_lead_popup_dismissed_v1";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try { localStorage.setItem(KEY, "1"); } catch {}
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Sent! Check your inbox for the free insight report.");
    close();
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[min(380px,calc(100vw-2rem))] animate-fade-in">
      <div className="glass shadow-card rounded-2xl p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary">
              <Download className="h-4 w-4 text-primary-foreground" />
            </span>
            <div>
              <p className="text-sm font-semibold">Free insight report</p>
              <p className="text-xs text-muted-foreground">5-min audit of your business data</p>
            </div>
          </div>
          <button onClick={close} aria-label="Close" className="rounded-full p-1 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={submit} className="mt-4 flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button type="submit" className="rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Get it
          </button>
        </form>
      </div>
    </div>
  );
}
