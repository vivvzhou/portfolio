"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FadeInComponentProps = {
  children: ReactNode;
  delay?: number;
};

export default function FadeInComponent({ children, delay = 0 }: FadeInComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
