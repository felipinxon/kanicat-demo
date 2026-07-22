"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Marquee({
  children,
  reverse = false,
  className,
  duration = 40,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className="flex shrink-0 items-stretch justify-around gap-4 animate-scroll-x group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 items-stretch justify-around gap-4 animate-scroll-x group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
}
