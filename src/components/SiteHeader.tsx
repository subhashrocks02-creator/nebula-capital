import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { company, navLinks } from "@/lib/company";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-xl transition-[border-color,box-shadow]",
        scrolled ? "border-border shadow-card" : "border-transparent",
      )}
    >
      <div
        className={cn(
          "shell flex items-center justify-between gap-4 transition-[height] duration-300",
          scrolled ? "h-[64px] md:h-[72px]" : "h-[76px] md:h-[92px]",
        )}
      >
        <Link
          to="/"
          aria-label={`${company.shortName} — home`}
          className="flex items-center gap-4 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none data-[status=active]:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="lg" className="ml-3">
            <Link to="/careers">Join Our Team</Link>
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-primary transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="shell flex flex-col gap-1 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="rounded-md px-2 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary data-[status=active]:text-brand-deep"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="lg" className="mt-3 w-full">
            <Link to="/careers">View Careers</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
