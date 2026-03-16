import React from "react";
import { motion, type Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
};

const Reveal = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  amount = 0.15,
  direction = "up",
  once = true,
}: RevealProps) => {
  const dist = 24;
  const offset = {
    up: { y: dist },
    down: { y: -dist },
    left: { x: dist },
    right: { x: -dist },
  } as const;

  const variants: Variants = {
    hidden: { opacity: 0, ...(offset[direction] || {}) },
    show: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;