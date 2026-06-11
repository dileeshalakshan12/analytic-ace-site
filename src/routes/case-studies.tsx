import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp, Users, Megaphone } from "lucide-react";
import { Eyebrow, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case studies — Lumen Analytics" },
      { name: "description", content: "Real results from small business analytics and dashboard engagements." },
      { property: "og:title", content: "Case studies — Lumen Analytics" },
      { property: "og:description", content: "Retail dashboards, customer segmentation, and marketing reports." },
    ],
  }),
  component: CaseStudies;
});

const cases = [
  {
    icon: TrendingUp,
    tag: "Retail · Dashboards",
    title: "Retail sales dashboard that grew margin 18%",
    text: "Built a unified Power BI dashboard across 4 store locations and Shopify. Surfaced top SKUs, dead stock, and best-performing days — within 60 days, gross margin climbed 18% with zero new spend.",
    stats: [["18%", "Margin lift"], ["4", "Locations unified"], ["60d", "To impact"]],
  },
  {
    icon: Users,
    tag: "Services · Analysis",
    title: "Customer segmentation that doubled repeat revenue",
    text: "Clustered 12k customers for a wellness brand using RFM + behavioral signals. The top segment got tailored offers and email flows — repeat revenue doubled in one quarter.",
    stats: [["2×", "Repeat revenue"], ["12k", "Customers modeled"], ["7", "Actionable segments"]],
  },
  {
    icon: Megaphone,
    tag: "SaaS · Marketing",
    title: "Marketing performance reports that cut CAC by 34%",
    text: "Replaced a tangle of platform exports with a single weekly report. The team killed two losing channels in week one and reinvested into the highest-LTV source.",
    stats: [["-34%", "CAC reduction"], ["1", "Source of truth"], ["3.1×", "ROAS on best channel"]],
  },
];

function CaseStudies() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-x relative py-24 text-center">
          <Eyebrow>Case studies</Eyebrow>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
            Real businesses. <span className="text-gradient">Real numbers.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Selected engagements where data work translated directly into revenue, retention, or saved hours.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x space-y-6">
          {cases.map((c, i) => (
            <article key={c.title} className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 md:p-10">
              <div className={`grid items-center gap-10 ${i % 2 ? "md:grid-cols-[1fr_1.2fr]" : "md:grid-cols-[1.2fr_1fr]"}`}>
                <div className={i % 2 ? "md:order-2" : ""}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                    <c.icon className="h-3.5 w-3.5" /> {c.tag}
                  </span>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight">{c.title}</h2>
                  <p className="mt-3 text-muted-foreground">{c.text}</p>
                  <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm text-foreground">
                    Discuss a similar project <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className={`grid grid-cols-3 gap-3 ${i % 2 ? "md:order-1" : ""}`}>
                  {c.stats.map(([n, l]) => (
                    <div key={l} className="rounded-2xl border border-border bg-background p-5 text-center">
                      <div className="text-2xl font-semibold text-gradient sm:text-3xl">{n}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl border border-border p-10 sm:p-16">
            <div className="absolute inset-0 bg-gradient-primary opacity-90" />
            <SectionHeading title={<span className="text-primary-foreground">Your story next?</span>} description={<span className="text-primary-foreground/85">Tell me what you're trying to grow — I'll show you how data can get you there.</span>} />
            <div className="relative mt-8 flex justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground">
                Book a free call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
