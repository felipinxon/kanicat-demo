"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Tarjeta con "spotlight" radial que sigue el cursor (patrón Aceternity Cards).
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(110,46,146,0.16)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [opacity, setOpacity] = useState(0);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-brand-purple-200/50 bg-white transition-all duration-500",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 42%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
