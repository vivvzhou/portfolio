"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/portfolio";
import FlowerMaterialControls from "./FlowerMaterialControls";
import { usePortfolioIntro } from "./PortfolioIntro";
import styles from "./hero-overlay.module.css";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { introReady } = usePortfolioIntro();
  const showIntro = prefersReducedMotion || introReady;
  const transition = { duration: 1.7, ease: [0.16, 1, 0.3, 1] as const };
  const hidden = { opacity: 0, y: 18 };
  const visible = { opacity: 1, y: 0 };

  return (
    <section className={`hero ${styles.hero}`} data-hero aria-labelledby="intro-title">
      <FlowerMaterialControls />
      <div className={`page-shell hero__content ${styles.content}`}>
        <h1 id="intro-title" className={styles.visuallyHidden}>
          {site.name} — Creative technologist
        </h1>
        <motion.p
          className="eyebrow hero__eyebrow"
          initial={prefersReducedMotion ? false : hidden}
          animate={prefersReducedMotion ? undefined : showIntro ? visible : hidden}
          transition={{ ...transition, delay: 0.72 }}
        >
          <span>VZ / 001</span> Atlanta, Georgia
        </motion.p>
        <motion.div
          className={`hero__bottom ${styles.bottom}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ ...transition, delay: 1.04 }}
        >
          <p>{site.intro}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#work">
              Explore selected work <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href={"mailto:" + site.email}>
              Let&apos;s build something <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>
      </div>
      <motion.p
        className={`hero__index ${styles.index}`}
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={prefersReducedMotion ? undefined : showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ ...transition, delay: 1.32 }}
      >
        INPUT / CURSOR + SCROLL
      </motion.p>
    </section>
  );
}
