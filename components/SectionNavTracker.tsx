"use client";

import { useEffect, useRef } from "react";

type Props = {
  html: string;
  className?: string;
  "aria-label"?: string;
};

export function SectionNavTracker({
  html,
  className = "mini-link-row vertical-links",
  "aria-label": ariaLabel = "Section navigation",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const navLinks = Array.from(
      root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    if (!navLinks.length) return;

    const sections = navLinks
      .map((link) => {
        const id = (link.getAttribute("href") || "").slice(1);
        const section = id ? document.getElementById(id) : null;
        const onClick = () => setActiveLink(id);
        link.addEventListener("click", onClick);
        return { section, onClick, link };
      })
      .filter((x) => x.section) as {
      section: HTMLElement;
      onClick: () => void;
      link: HTMLAnchorElement;
    }[];

    if (!sections.length) return;

    function setActiveLink(activeId: string) {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === "#" + activeId;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function updateActiveLink() {
      const offset = 150;
      let currentSection = sections[0].section;
      sections.forEach(({ section }) => {
        if (section.getBoundingClientRect().top <= offset) {
          currentSection = section;
        }
      });
      if (currentSection?.id) {
        setActiveLink(currentSection.id);
      }
    }

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("resize", updateActiveLink);

    return () => {
      window.removeEventListener("scroll", updateActiveLink);
      window.removeEventListener("resize", updateActiveLink);
      sections.forEach(({ link, onClick }) =>
        link.removeEventListener("click", onClick),
      );
    };
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      data-role="section-nav"
      aria-label={ariaLabel}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
