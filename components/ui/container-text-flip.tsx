"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Container Text Flip (Aceternity) — el contenedor cambia de ancho
 * mientras rota entre palabras.
 */
export function ContainerTextFlip({
  words = ["amor", "ciencia", "urgencias 24/7", "familia"],
  interval = 2600,
  className,
  textClassName,
}: {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(120);
  const measureRef = useRef<HTMLSpanElement>(null);

  const current = useMemo(() => words[index % words.length], [index, words]);

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth + 8);
    }
  }, [current]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => i + 1), interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <motion.span
      layout
      animate={{ width }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-purple-600 to-brand-green-600 px-4 py-1 align-middle text-white shadow-glow",
        className
      )}
    >
      {/* medidor invisible */}
      <span
        ref={measureRef}
        className={cn("invisible absolute whitespace-nowrap font-display font-bold", textClassName)}
        aria-hidden
      >
        {current}
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={current}
          initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={cn("whitespace-nowrap font-display font-bold", textClassName)}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
