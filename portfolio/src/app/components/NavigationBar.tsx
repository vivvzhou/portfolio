"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { navigation, site } from "@/data/portfolio";
import { usePortfolioIntro } from "./PortfolioIntro";

export function NavigationBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const prefersReducedMotion = useReducedMotion();
  const { introReady } = usePortfolioIntro();
  const showIntro = prefersReducedMotion || introReady;

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <motion.header
      className="site-header"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
      animate={prefersReducedMotion ? undefined : showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
      transition={{ duration: 1.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="page-shell site-header__inner">
        <Link href="/" className="wordmark" aria-label="Vivian Zhou home">
          <span>V</span>IVIAN ZHOU
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{isOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
        <nav
          id="site-navigation"
          className="site-nav"
          data-open={isOpen}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className={activeSection === item.id ? "is-active" : undefined}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/projects" onClick={() => setIsOpen(false)}>
            Archive
          </Link>
          <a
            href="https://www.instagram.com/soooshieee"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
          >
            Art <span aria-hidden="true">↗</span>
          </a>
          <a className="nav-contact" href={"mailto:" + site.email} onClick={() => setIsOpen(false)}>
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
