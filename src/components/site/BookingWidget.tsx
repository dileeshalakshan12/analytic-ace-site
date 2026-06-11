import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Check, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

// 30-min slots from 9:00 to 17:00 (8 working hours)
const HOURS = [9, 10, 11, 12, 14, 15, 16, 17];
const MINUTES = [0, 30];

function buildSlots(date: Date): Date[] {
  const slots: Date[] = [];
  for (const h of HOURS) {
    for (const m of MINUTES) {
      const d = new Date(date);
      d.setHours(h, m, 0, 0);
      slots.push(d);
    }
  }
  return slots;
}

function ymd(d: Date) {
  // local YYYY-MM-DD
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function BookingWidget() {
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [date, setDate] = useState<Date | undefined>(tomorrow);
  const [slot, setSlot] = useState<Date | null>(null);
  const [taken, setTaken] = useState<Set<string>>(new Set());
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<{ slot: Date } | null>(null);

  const tz = useMemo(
    () => (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC"),
    [],
  );

  // Load taken slots for chosen date (use UTC date matching server)
  useEffect(() => {
    if (!date) return;
    const ctrl = new AbortController();
    const dateParam = (() => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      // server filters by UTC day; send UTC date of local midnight start
      return d.toISOString().slice(0, 10);
    })();
    setLoadingSlots(true);
    fetch(`/api/public/bookings/availability?date=${dateParam}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d: { taken?: string[] }) => setTaken(new Set(d.taken ?? [])))
      .catch(() => {})
      .finally(() => setLoadingSlots(false));
    return () => ctrl.abort();
  }, [date]);

  const slots = date ? buildSlots(date) : [];
  const now = Date.now();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) {
      toast.error("Please choose a time slot.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          topic: form.topic.trim(),
          slot_at: slot.toISOString(),
          timezone: tz,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Could not book your call.");
        return;
      }
      setConfirmed({ slot });
      toast.success("Your call is booked. Check your inbox for confirmation.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-8 md:p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-primary">
          <Check className="h-6 w-6 text-primary-foreground" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight">You're booked!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {confirmed.slot.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })} ({tz})
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          A confirmation email is on its way. Reply to it any time to reschedule.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-border bg-surface p-6 md:p-8">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-cyan-glow" />
        <h3 className="text-xl font-semibold tracking-tight">Book a free 30-min consultation</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Pick a date and time — your timezone ({tz}).</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[auto_1fr]">
        <div className="rounded-2xl border border-border bg-background p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d ?? undefined);
              setSlot(null);
            }}
            disabled={(d) => {
              const day = new Date(d);
              day.setHours(0, 0, 0, 0);
              const t = new Date();
              t.setHours(0, 0, 0, 0);
              if (day <= t) return true; // no today/past
              const wd = day.getDay();
              return wd === 0 || wd === 6; // skip weekends
            }}
            className="rounded-xl"
          />
        </div>

        <div>
          <div className="text-sm font-medium">Available times</div>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {loadingSlots && (
              <div className="col-span-full flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading…
              </div>
            )}
            {!loadingSlots && slots.map((s) => {
              const isTaken = taken.has(s.toISOString());
              const isPast = s.getTime() < now;
              const disabled = isTaken || isPast;
              const active = slot?.getTime() === s.getTime();
              return (
                <button
                  key={s.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => setSlot(s)}
                  className={[
                    "rounded-full border px-3 py-2 text-sm transition-colors",
                    disabled
                      ? "border-border bg-surface/40 text-muted-foreground line-through opacity-50"
                      : active
                        ? "border-transparent bg-gradient-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:bg-surface-hi",
                  ].join(" ")}
                >
                  {s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </button>
              );
            })}
            {!loadingSlots && slots.length === 0 && (
              <p className="col-span-full text-sm text-muted-foreground">Pick a weekday to see slots.</p>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
            <Field label="What would you like to discuss?" value={form.topic} onChange={(v) => setForm({ ...form, topic: v })} />
          </div>

          <button
            type="submit"
            disabled={submitting || !slot}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60 sm:w-auto"
          >
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Booking…</> : "Confirm booking"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}{required && <span className="text-cyan-glow"> *</span>}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={254}
        className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
