import { cn } from "@/lib/utils";

/**
 * Kanicat brand mark — reconstruido en SVG a partir del logo real:
 * badge morado con un perro (blanco) y un gato (verde) superpuestos.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={cn("h-10 w-10", className)}
      role="img"
      aria-label="Kanicat"
    >
      <defs>
        <linearGradient id="kani-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7E3AA6" />
          <stop offset="100%" stopColor="#571E77" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="116" height="116" rx="30" fill="url(#kani-badge)" />
      <rect
        x="6"
        y="6"
        width="116"
        height="116"
        rx="30"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.14"
        strokeWidth="1.5"
      />
      {/* Dog (white), behind */}
      <g fill="#ffffff">
        <ellipse cx="62" cy="56" rx="9" ry="18" transform="rotate(-24 62 56)" />
        <ellipse cx="104" cy="56" rx="9" ry="18" transform="rotate(24 104 56)" />
        <ellipse cx="83" cy="62" rx="23" ry="21" />
        <ellipse cx="83" cy="79" rx="11" ry="9" />
      </g>
      {/* Cat (green), in front */}
      <g fill="#4FA83C">
        <path d="M31 60 L35 39 L49 57 Z" />
        <path d="M63 60 L59 39 L45 57 Z" />
        <circle cx="47" cy="71" r="19" />
        <path d="M47 84 q10 6 20 1 q-9 12 -20 4 Z" fill="#4FA83C" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  variant = "dark",
  withText = true,
}: {
  className?: string;
  variant?: "light" | "dark";
  withText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5 select-none", className)}>
      <LogoMark className="h-9 w-9 shrink-0 drop-shadow-sm" />
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.35rem] font-extrabold tracking-tight",
              variant === "dark" ? "text-brand-purple-700" : "text-white"
            )}
          >
            KANI<span className="text-brand-green-600">CAT</span>
          </span>
          <span
            className={cn(
              "mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.22em]",
              variant === "dark" ? "text-brand-ink/55" : "text-white/70"
            )}
          >
            Clínica Veterinaria
          </span>
        </span>
      )}
    </span>
  );
}
