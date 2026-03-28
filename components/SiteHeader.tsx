"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/fundamentals", label: "Fundamentals" },
  { href: "/components", label: "Components" },
  { href: "/interview-prep", label: "Interview Prep" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/production-depth", label: "Production Depth" },
] as const;

export function SiteHeader() {
  const pathname = usePathname() || "";

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        System Design Study Hub
      </Link>
      <nav className="main-nav" aria-label="Primary">
        {NAV.map(({ href, label }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
