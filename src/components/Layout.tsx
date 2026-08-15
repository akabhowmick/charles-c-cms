import { useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { Button, buttonClasses } from "@/components/ui/Button";
import { LocaleToggle } from "@/components/ui/LocaleToggle";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export function Layout() {
  const { user, isMock, signOut } = useAuth();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navLinks = [
    { to: "/opportunities", label: t.nav.opportunities },
    { to: "/highlights", label: t.nav.highlights },
    { to: "/photos", label: t.nav.photos },
    { to: "/about", label: t.nav.about },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        {t.common.skipToMain}
      </a>

      {isMock && (
        <p className="bg-ink px-4 py-1.5 text-center text-xs text-paper">
          {t.layout.demoBanner}
        </p>
      )}

      <header className="sticky top-0 z-50 border-b border-taupe-strong bg-paper/90 backdrop-blur-md">
        <nav
          aria-label={t.layout.mainNavLabel}
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
        >
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <img src={logo} alt="Faithful Church of New York" className="h-8 w-auto" />
            <span lang="ko" className="font-display text-lg font-bold text-pine">
              섬김
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
            <LocaleToggle className="ml-2" />
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink",
                    pathname.startsWith("/dashboard") && "bg-pine-tint text-pine-deep",
                  )}
                >
                  {user.role === "admin" ? t.common.admin : t.common.mySignups}
                </Link>
                <Button variant="ghost" size="sm" onClick={() => void signOut()}>
                  {t.common.signOut}
                </Button>
              </>
            ) : (
              <Link to="/login" className={buttonClasses({ size: "sm", className: "ml-2" })}>
                {t.common.signIn}
              </Link>
            )}
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.layout.closeMenu : t.layout.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>

        {open && (
          <div id="mobile-nav" className="border-t border-taupe-strong px-4 pb-4 md:hidden">
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
              <li className="pt-2">
                <LocaleToggle className="w-full" />
              </li>
              <li>
                {user ? (
                  <div className="flex items-center gap-2 pt-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className={buttonClasses({ variant: "secondary", className: "flex-1" })}
                    >
                      {user.role === "admin" ? t.common.admin : t.common.mySignups}
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        void signOut();
                        setOpen(false);
                      }}
                    >
                      {t.common.signOut}
                    </Button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className={buttonClasses({ className: "mt-2 w-full" })}
                  >
                    {t.common.signIn}
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

      <footer className="mt-20 border-t border-taupe-strong bg-paper-deep">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div>
            <p className="flex items-center gap-2.5">
              <img src={logo} alt="Faithful Church of New York" className="h-8 w-auto" />
              <span lang="ko" className="font-display text-lg font-bold text-pine">
                섬김
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              {t.layout.footerTagline}
            </p>
          </div>
          <nav aria-label={t.layout.footerNavLabel}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
              {t.layout.footerPagesHeading}
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
              {t.layout.footerContactHeading}
            </h2>
            <p className="mt-3 text-sm text-ink-soft">
              pcha.fcny@gmail.com
              <br />
              {t.layout.footerAddress}
            </p>
          </div>
          <nav aria-label={t.layout.footerLegalHeading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
              {t.layout.footerLegalHeading}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-ink-soft hover:text-pine">
                  {t.legal.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-ink-soft hover:text-pine">
                  {t.legal.terms}
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-ink-soft hover:text-pine">
                  {t.legal.accessibility}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="border-t border-taupe-strong px-4 py-4 text-center text-xs text-ink-soft">
          {t.layout.footerDisclaimer}
        </p>
      </footer>
    </div>
  );
}
