import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container-x">
        <div className={`flex items-center justify-between rounded-full border border-border px-4 py-2 transition-all duration-300 ${scrolled ? "glass shadow-card" : "bg-transparent"}`}>
          <Link to="/" className="flex items-center gap-2 pl-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Lumen</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                activeProps={{ className: "rounded-full px-4 py-2 text-sm bg-surface text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
              Book a call
            </Link>
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-2xl border border-border glass p-2 md:hidden animate-fade-in">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-foreground hover:bg-surface">
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-1 block rounded-xl bg-gradient-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground">
              Book a call
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
