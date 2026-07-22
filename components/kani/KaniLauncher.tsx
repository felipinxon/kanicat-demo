"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { KaniChat } from "./KaniChat";

export function KaniLauncher() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<string | undefined>(undefined);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { prompt?: string } | undefined;
      setPrompt(detail?.prompt ? `${detail.prompt}` : undefined);
      setOpen(true);
    };
    window.addEventListener("kani:open", onOpen as EventListener);
    return () => window.removeEventListener("kani:open", onOpen as EventListener);
  }, []);

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed bottom-24 right-4 z-[60] flex h-[min(600px,75vh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-brand-purple-200 bg-brand-cream shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-brand-purple-700 to-brand-purple-600 px-4 py-3 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <LogoMark className="h-7 w-7" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold">Kani · Asistente IA</p>
                <p className="flex items-center gap-1 text-[11px] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green-400" /> En línea
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <KaniChat initialPrompt={prompt} compact />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple-600 to-brand-green-600 text-white shadow-glow"
        aria-label="Abrir chat de Kani"
      >
        <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-brand-purple-500/50" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-7 w-7" />
            </motion.span>
          ) : (
            <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="h-7 w-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
