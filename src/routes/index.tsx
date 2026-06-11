import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, LineChart, PieChart, Sparkles, Bot, Megaphone, Check, Star, Quote } from "lucide-react";
import heroImg from "@/assets/hero-data.jpg";
import { Eyebrow, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen Analytics — Turn business data into real growth" },
      { name: "description", content: "Dashboards, analytics, and AI-powered insights that help small businesses make smarter, faster decisions." },
      { property: "og:title", content: "Lumen Analytics — Data-driven growth for SMBs" },
      { property: "og:description", content: "Dashboards, insights, content, and consulting — built for small businesses." },
    ],
  }),
  component: Home,
});

const benefits = [
  { icon: BarChart3, title: "See what's actually working", text: "Unified dashboards across sales, marketing, and ops — one source of truth." },
  { icon: LineChart, title: "Predict, don't guess", text: "KPI tracking and forecasts that turn gut decisions into data-backed plays." },
  { icon: Bot, title: "AI that saves hours", text: "Automation suggestions for reporting, outreach, and content workflows." },
  { icon: Megaphone, title: "Content that converts", text: "Marketing assets informed by your data — not generic templates." },
];

const services = [
  { icon: BarChart3, title: "Data analytics", text: "Sales, customer, and performance analysis with clear next steps." },
  { icon: PieChart, title: "Dashboards & reporting", text: "Power BI, Looker, Excel — built to be read, not decoded." },
  { icon: Megaphone, title: "Marketing content", text: "Posts, emails, and reports tuned to your audience and metrics." },
  { icon: Sparkles, title: "Growth consulting", text: "Strategy sprints that turn data into measurable revenue." },
];

const testimonials = [
  { quote: "We finally know which products actually make us money. Revenue is up 32% in 4 months.", name: "Amara O.", role: "Founder, Bloom Retail" },
  { quote: "The dashboard replaced 6 spreadsheets and a weekly meeting. Our team is faster everywhere.", name: "Daniel K.", role: "COO, Northline Foods" },
  { quote: "Felt like hiring a fractional CMO and analyst at once. Best money we've spent this year.", name: "Priya S.", role: "CEO, Atlas Studio" },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute left-1/2 top-[-10rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-purple-glow/20 blur-[120px]" />
        <div className="container-x relative pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Eyebrow>Data analytics for small businesses</Eyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Turn your business data into{" "}
              <span className="text-gradient">real growth</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Dashboards, insights, and AI-powered automation built for owners who'd rather grow than wrangle spreadsheets.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
                Book a free consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/case-studies" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground hover:bg-surface-hi">
                See case studies
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-cyan-glow text-cyan-glow" />)}</div>
              <span>Trusted by 40+ small businesses across retail, services, and SaaS</span>
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-primary opacity-25 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border glass">
              <img
                src={heroImg}
                alt="Data dashboards illustrating revenue, customer, and KPI insights"
                width={1600}
                height={1000}
                className="block w-full"
              />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {[
              ["40+", "Businesses served"],
              ["3.4×", "Avg. ROI in 6 mo"],
              ["120k+", "Data points modeled"],
              ["98%", "Client retention"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-border bg-surface/60 p-6">
                <div className="text-3xl font-semibold text-gradient">{n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Lumen"
            title={<>Built for businesses ready to scale, not enterprises buried in BI</>}
            description="Everything you need to turn raw data into decisions — without the agency price tag."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="group relative rounded-2xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hi">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary">
                  <b.icon className="h-5 w-5 text-primary-foreground" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Services</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">A complete growth toolkit — without hiring a full team.</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm hover:bg-surface-hi">
              Explore services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:bg-surface-hi">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-glow/10 blur-3xl transition-opacity group-hover:opacity-100" />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
                <Link to="/services" className="mt-5 inline-flex items-center gap-1 text-sm text-foreground">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading eyebrow="Loved by founders" title={<>Results that show up in the bank, not just the dashboard.</>} />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-surface p-6">
                <Quote className="h-6 w-6 text-cyan-glow" />
                <blockquote className="mt-4 text-foreground">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading eyebrow="Simple pricing" title="Engagements that fit how SMBs actually buy" description="Start small, scale when you're ready. Cancel any time." />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              { name: "Starter audit", price: "$490", desc: "One-time data audit + insight report", features: ["2-week engagement", "Up to 3 data sources", "Insight report + roadmap"] },
              { name: "Growth retainer", price: "$1,490/mo", desc: "Dashboards + monthly analytics", features: ["Custom dashboard", "Monthly KPI review", "Slack/email support"], featured: true },
              { name: "Fractional analyst", price: "$3,290/mo", desc: "Embedded analytics partner", features: ["Weekly strategy calls", "Content + reporting", "AI automation builds"] },
            ].map((p) => (
              <div key={p.name} className={`relative rounded-2xl border p-8 ${p.featured ? "border-transparent glow-ring bg-surface-hi" : "border-border bg-surface"}`}>
                {p.featured && <span className="absolute -top-3 left-6 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most popular</span>}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="mt-3 text-4xl font-semibold text-gradient">{p.price}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-cyan-glow" /> {f}</li>
                  ))}
                </ul>
                <Link to="/contact" className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium ${p.featured ? "bg-gradient-primary text-primary-foreground" : "border border-border bg-surface hover:bg-surface-hi"}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface">
            {[
              ["Do I need clean data to get started?", "No. Most clients come to us with messy spreadsheets. The first step is always cleaning and modeling."],
              ["What tools do you work with?", "Power BI, Looker Studio, Excel, Google Sheets, Supabase, Postgres, Shopify, Stripe, HubSpot — and most modern SaaS."],
              ["How fast will I see results?", "Most clients have a working dashboard in 10 days and measurable revenue lift within 60-90 days."],
              ["Do you offer one-off projects?", "Yes — the Starter audit is a great way to test the relationship before committing to a retainer."],
            ].map(([q, a]) => (
              <details key={q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium">
                  {q}
                  <span className="ml-4 grid h-7 w-7 place-items-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl border border-border p-10 sm:p-16">
            <div className="absolute inset-0 bg-gradient-primary opacity-90" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h3 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">Ready to make decisions with confidence?</h3>
                <p className="mt-3 text-primary-foreground/85">Book a free 30-minute call. Walk away with one actionable insight — even if we never work together.</p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform hover:scale-[1.02]">
                Book your free call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
