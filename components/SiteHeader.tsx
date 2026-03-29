"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/fundamentals/", label: "Fundamentals" },
  { href: "/components/", label: "Components" },
  { href: "/interview-prep/", label: "Interview Prep" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/production-depth/", label: "Production Depth" },
] as const;

function isActive(href: string, pathname: string): boolean {
  if (href === "/") {
    return pathname === "/" || pathname === "";
  }
  return pathname === href || pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <header className={`site-header${open ? " is-nav-open" : ""}`}>
      <div className="site-header__bar">
        <Link className="brand" href="/" onClick={close}>
          System Design Study Hub
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="primary-navigation"
        className="main-nav"
        aria-label="Primary"
        {...(narrow && !open
          ? { "aria-hidden": true as const, inert: true }
          : {})}
      >
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href, pathname) ? "page" : undefined}
            onClick={close}
          >
            {label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="nav-backdrop"
        aria-hidden="true"
        tabIndex={-1}
        onClick={close}
      />
    </header>
  );
}
