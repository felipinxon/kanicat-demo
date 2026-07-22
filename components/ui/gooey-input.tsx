"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Gooey Input (Aceternity) — input con efecto "gooey" y burbujas al enviar.
 */
export function GooeyInput({
  placeholder = "tucorreo@ejemplo.com",
  buttonLabel = "Recibir tips",
  className,
  onSubmitValue,
}: {
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
  onSubmitValue?: (v: string) => void;
}) {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmitValue?.(value);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setValue("");
    }, 2600);
  };

  return (
    <form onSubmit={submit} className={cn("relative w-full", className)}>
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="goo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="flex items-center gap-2 rounded-full border border-brand-purple-200 bg-white/80 p-1.5 pl-5 shadow-soft backdrop-blur-xl">
        <input
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-brand-ink placeholder:text-brand-ink/40 focus:outline-none"
          aria-label="Correo electrónico"
        />
        <button
          type="submit"
          className="relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95"
        >
          {/* burbujas gooey */}
          <span
            className="pointer-events-none absolute inset-0 z-0"
            style={{ filter: "url(#goo-filter)" }}
            aria-hidden
          >
            <AnimatePresence>
              {sent &&
                [0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute bottom-0 h-6 w-6 rounded-full bg-brand-green-500"
                    style={{ left: `${18 + i * 20}%` }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: -34, opacity: [0, 1, 0] }}
                    transition={{ duration: 1, delay: i * 0.08 }}
                  />
                ))}
            </AnimatePresence>
          </span>
          <span className="relative z-10 flex items-center gap-2">
            {sent ? (
              <>
                <Check className="h-4 w-4" /> ¡Listo!
              </>
            ) : (
              <>
                {buttonLabel} <Send className="h-4 w-4" />
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
