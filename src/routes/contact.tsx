import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { Eyebrow } from "@/components/site/Section";
import { BookingWidget } from "@/components/site/BookingWidget";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lumen Analytics" },
      { name: "description", content: "Book a free 30-min consultation, send a message, or reach out on WhatsApp." },
      { property: "og:title", content: "Contact — Lumen Analytics" },
      { property: "og:description", content: "Book a free consultation with Lumen Analytics." },
    ],
  }),
  component: Contact,
});

function Contact() {
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
              Pick a time below — you'll get an instant confirmation email with the call link.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <BookingWidget />

          <div className="space-y-4">
            <ContactCard
              icon={CalendarIcon}
              title="Prefer your own calendar?"
              desc="Send me your availability via email and I'll send a calendar invite."
              actionLabel="Email availability"
              href="mailto:hello@lumen.co?subject=Consultation%20availability"
            />
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              desc="Quick questions? Message me directly."
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
            <div className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">What to expect</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• 30-minute video call, no slides.</li>
                <li>• We diagnose one growth bottleneck together.</li>
                <li>• You walk away with one actionable insight — even if we never work together.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
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
