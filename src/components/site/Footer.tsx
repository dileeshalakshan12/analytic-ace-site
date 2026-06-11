import { Link } from "@tanstack/react-router";
import { Sparkles, Mail, MessageCircle, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-semibold">Lumen Analytics</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Data analytics, dashboards, and growth content for small businesses ready to scale.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Navigate</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link to="/case-studies" className="hover:text-foreground">Case studies</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@lumen.co</li>
              <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</li>
              <li className="flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Get started</h4>
            <p className="mt-4 text-sm text-muted-foreground">Free 30-min strategy call.</p>
            <Link to="/contact" className="mt-3 inline-flex rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Book now
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Lumen Analytics. All rights reserved.</p>
          <p>Built for businesses ready to grow with data.</p>
        </div>
      </div>
    </footer>
  );
}
