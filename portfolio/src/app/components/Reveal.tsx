"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePortfolioIntro } from "./PortfolioIntro";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  distance?: number;
};

function getHiddenState(direction: RevealProps["direction"], distance: number) {
  switch (direction) {
    case "left":
      return { opacity: 0, x: -distance, y: 0, scale: 1 };
    case "right":
      return { opacity: 0, x: distance, y: 0, scale: 1 };
    case "scale":
      return { opacity: 0, x: 0, y: distance * 0.45, scale: 0.96 };
    default:
      return { opacity: 0, x: 0, y: distance, scale: 1 };
  }
}

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 30,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { introReady } = usePortfolioIntro();
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { amount: 0.18, once: false });
  const hidden = getHiddenState(direction, distance);
  const visible = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={prefersReducedMotion ? false : hidden}
      animate={prefersReducedMotion ? undefined : introReady && isInView ? visible : hidden}
      transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
