import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, PieChart, Megaphone, Sparkles, Check, ArrowRight, Database, Bot } from "lucide-react";
import { Eyebrow, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Lumen Analytics" },
      { name: "description", content: "Data analytics, dashboards & reporting, marketing content, and growth consulting for small businesses." },
      { property: "og:title", content: "Services — Lumen Analytics" },
      { property: "og:description", content: "Analytics, dashboards, content, and consulting built for SMBs." },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: BarChart3,
    title: "Data analytics",
    text: "Understand customers, sales, and performance with analysis that answers real business questions.",
    features: ["Customer & cohort analysis", "Sales & product performance", "Churn & retention modeling", "Forecasting & scenario plans"],
  },
  {
    icon: PieChart,
    title: "Dashboards & reporting",
    text: "Always-on KPI dashboards in Power BI, Looker, or Excel — designed to be read at a glance.",
    features: ["Power BI / Looker builds", "Live data connections", "Executive KPI views", "Automated weekly reports"],
  },
  {
    icon: Megaphone,
    title: "Marketing content",
    text: "Content informed by your data: emails, posts, and reports that move the metrics that matter.",
    features: ["Email & newsletter copy", "Social content strategy", "Case study writing", "Landing page copy"],
  },
  {
    icon: Sparkles,
    title: "Business consulting",
    text: "Strategic sprints to turn insights into pricing, positioning, and operational improvements.",
    features: ["Pricing & packaging", "Funnel optimization", "Ops & workflow audits", "Quarterly growth plans"],
  },
  {
    icon: Bot,
    title: "AI automation",
    text: "Practical AI workflows that reduce manual reporting, enrich data, and speed up content.",
    features: ["AI report summaries", "Lead enrichment", "Content generation pipelines", "Custom GPT assistants"],
  },
  {
    icon: Database,
    title: "Data foundations",
    text: "Clean, connected data is where every good decision starts. We get the plumbing right.",
    features: ["Source integrations", "Data modeling", "Warehouse setup", "Governance & docs"],
  },
];

function Services() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-x relative py-24 text-center">
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
            Everything you need to grow <span className="text-gradient">with data.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Six services that combine analytics, content, and AI — delivered as standalone projects or an ongoing retainer.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:bg-surface-hi">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-glow/10 blur-3xl" />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-cyan-glow" /> {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <SectionHeading eyebrow="Process" title="A simple way to start" description="Most engagements follow the same proven path — adapted to your team." />
          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {[
              ["01", "Discovery call", "Free 30-min strategy session to understand your goals."],
              ["02", "Data audit", "We map your systems, KPIs, and biggest gaps in one week."],
              ["03", "Build", "Dashboards, models, or content — delivered in 2-4 week sprints."],
              ["04", "Grow", "Ongoing insights, reviews, and AI automation as you scale."],
            ].map(([n, t, d]) => (
              <div key={n} className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-sm font-semibold text-cyan-glow">{n}</div>
                <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground">
              Start with a free call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
