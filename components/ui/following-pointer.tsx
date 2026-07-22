"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Following Pointer (Aceternity) — oculta el cursor nativo y muestra
 * un puntero personalizado con etiqueta que sigue al mouse dentro de la tarjeta.
 */
export const FollowerPointerCard = ({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inside, setInside] = useState(false);

  return (
    <div
      ref={ref}
      onMouseLeave={() => setInside(false)}
      onMouseEnter={() => setInside(true)}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) {
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }
      }}
      style={{ cursor: "none" }}
      className={cn("relative", className)}
    >
      <AnimatePresence>{inside && <FollowPointer x={x} y={y} title={title} />}</AnimatePresence>
      {children}
    </div>
  );
};

const FollowPointer = ({
  x,
  y,
  title,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  title?: ReactNode;
}) => {
  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      style={{ top: y, left: x }}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.6, opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-5 w-5 -translate-x-[2px] -translate-y-[2px] -rotate-[70deg] transform text-brand-purple-600"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>
      {title && (
        <motion.div className="ml-3 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-green-600 px-2.5 py-1 text-xs font-semibold text-white shadow-glow">
          {title}
        </motion.div>
      )}
    </motion.div>
  );
};

// Cursor personalizado global reutilizable — no exportado por ahora
export { FollowPointer };
