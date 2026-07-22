"use client";

import { cn } from "@/lib/utils";

/**
 * Fondo de puntos con "glow" animado — inspirado en el Dotted Glow Background
 * de Aceternity, reconstruido con CSS para máximo rendimiento.
 */
export function DottedGlowBackground({
  className,
  dotColor = "rgba(110,46,146,0.16)",
  glow = true,
}: {
  className?: string;
  dotColor?: string;
  glow?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1.1px, transparent 1.1px)`,
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 78%)",
        }}
      />
      {glow && (
        <>
          <div className="absolute left-[8%] top-[10%] h-72 w-72 animate-float rounded-full bg-brand-purple-500/25 blur-[90px]" />
          <div className="absolute right-[10%] top-[18%] h-64 w-64 animate-float-slow rounded-full bg-brand-sky/20 blur-[90px]" />
          <div className="absolute bottom-[6%] left-[42%] h-72 w-72 animate-float rounded-full bg-brand-green-500/20 blur-[100px]" />
        </>
      )}
    </div>
  );
}
