import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Eyebrow, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Lumen Analytics" },
      { name: "description", content: "Meet the analyst behind Lumen. A mission to make data approachable for small businesses." },
      { property: "og:title", content: "About — Lumen Analytics" },
      { property: "og:description", content: "A solo consultant making BI accessible to small businesses." },
    ],
  }),
  component: About,
});

const skills = ["Python", "R", "SQL", "Power BI", "Looker Studio", "Excel", "dbt", "Supabase", "OpenAI", "n8n", "HubSpot", "Shopify"];

function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-x relative py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow>About</Eyebrow>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
                I help small businesses make <span className="text-gradient">bigger decisions</span> with their data.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                I've spent the last 7 years building analytics for retailers, agencies, and fast-growing SaaS teams. Lumen exists because every small business deserves the same clarity that enterprises pay six figures for.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground">
                  Work together <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/case-studies" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium hover:bg-surface-hi">
                  See my work
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-primary opacity-25 blur-2xl" />
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-border glass">
                <div className="grid h-full w-full place-items-center bg-gradient-primary">
                  <span className="font-display text-[10rem] font-semibold text-primary-foreground">L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface p-8">
            <Eyebrow>Mission</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Make data approachable.</h2>
            <p className="mt-4 text-muted-foreground">
              Most small businesses are sitting on goldmines of customer and sales data but lack the time, tools, or team to use it. Lumen turns that data into clear dashboards and stories that anyone on the team can act on.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-surface p-8">
            <Eyebrow>How I work</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Senior consulting, indie pricing.</h2>
            <p className="mt-4 text-muted-foreground">
              You work directly with me — no juniors, no handoffs. Engagements are scoped tightly, priced predictably, and shipped in weeks not quarters.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <SectionHeading eyebrow="Toolkit" title="Tools I work with every day" />
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground">{s}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
