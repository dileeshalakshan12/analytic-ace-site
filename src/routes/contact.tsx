import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Calendar, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Eyebrow } from "@/components/site/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lumen Analytics" },
      { name: "description", content: "Book a free consultation, send a message, or reach out on WhatsApp." },
      { property: "og:title", content: "Contact — Lumen Analytics" },
      { property: "og:description", content: "Book a free consultation with Lumen Analytics." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks! I'll get back to you within 24 hours.");
    }, 600);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-x relative py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
              Let's turn your data into <span className="text-gradient">your next move.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Book a free 30-minute call, send a message, or ping me on WhatsApp. I reply within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-surface p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">Send a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tell me about your business and what you'd like to grow.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Jane Doe" required />
              <Field label="Email" name="email" type="email" placeholder="jane@company.com" required />
              <Field label="Company" name="company" placeholder="Acme Co." />
              <Field label="Budget" name="budget" placeholder="$500 – $5,000+" />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium">Project details</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="What's the goal? What data do you already have?"
                className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-70"
            >
              {sending ? "Sending..." : (<>Send message <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>

          <div className="space-y-4">
            <ContactCard
              icon={Calendar}
              title="Book a free consultation"
              desc="30 minutes, zero pressure. Walk away with one actionable insight."
              actionLabel="Schedule call"
              href="https://cal.com"
            />
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              desc="Prefer a quick chat? Message me directly."
              actionLabel="Open WhatsApp"
              href="https://wa.me/10000000000"
            />
            <ContactCard
              icon={Mail}
              title="Email"
              desc="hello@lumen.co"
              actionLabel="Send email"
              href="mailto:hello@lumen.co"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function ContactCard({ icon: Icon, title, desc, actionLabel, href }: { icon: any; title: string; desc: string; actionLabel: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group block rounded-3xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hi">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary">
          <Icon className="h-5 w-5 text-primary-foreground" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm text-foreground">
            {actionLabel} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}
