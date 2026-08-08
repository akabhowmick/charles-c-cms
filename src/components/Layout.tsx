import { useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/opportunities", label: "Opportunities" },
  { to: "/highlights", label: "Highlights" },
  { to: "/photos", label: "Photos" },
  { to: "/about", label: "About" },
];

export function Layout() {
  const { user, isMock, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {isMock && (
        <p className="bg-ink px-4 py-1.5 text-center text-xs text-paper">
          Demo mode: data resets on refresh. Connect Supabase keys to persist.
        </p>
      )}

      <header className="sticky top-0 z-50 border-b border-taupe-light/50 bg-paper/90 backdrop-blur-md">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
        >
          <Link to="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
            <span lang="ko" className="font-display text-xl font-bold text-pine">
              섬김
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">
              The Faithful · Serve
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink",
                  pathname.startsWith(l.to) && "bg-pine-tint text-pine-deep",
                )}
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink",
                    pathname.startsWith("/dashboard") && "bg-pine-tint text-pine-deep",
                  )}
                >
                  {user.role === "admin" ? "Admin" : "My Sign-ups"}
                </Link>
                <Button variant="ghost" size="sm" onClick={() => void signOut()}>
                  Sign out
                </Button>
              </>
            ) : (
              <Link to="/login" className="ml-2">
                <Button size="sm">Sign in</Button>
              </Link>
            )}
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>

        {open && (
          <div id="mobile-nav" className="border-t border-taupe-light/50 px-4 pb-4 md:hidden">
            <ul className="flex flex-col gap-1 pt-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 font-medium text-ink-soft hover:bg-paper-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                {user ? (
                  <div className="flex items-center gap-2 pt-2">
                    <Link to="/dashboard" onClick={() => setOpen(false)} className="flex-1">
                      <Button variant="secondary" className="w-full">
                        {user.role === "admin" ? "Admin" : "My Sign-ups"}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        void signOut();
                        setOpen(false);
                      }}
                    >
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)} className="block pt-2">
                    <Button className="w-full">Sign in</Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-taupe-light/50 bg-paper-deep">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <p className="flex items-baseline gap-2">
              <span lang="ko" className="font-display text-lg font-bold text-pine">
                섬김
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                The Faithful · Serve
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              Volunteer opportunities, mission trips, and community events, all in one
              place.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
              Pages
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-soft hover:text-pine">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
              Contact
            </h2>
            <p className="mt-3 text-sm text-ink-soft">
              serve@demo.church
              <br />
              Bayside, NY
            </p>
          </div>
        </div>
        <p className="border-t border-taupe-light/40 px-4 py-4 text-center text-xs text-ink-soft">
          Demo site. Name and branding pending church approval.
        </p>
      </footer>
    </div>
  );
}
