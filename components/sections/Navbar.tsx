"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Siren, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { navLinks } from "@/lib/content";
import { openKani } from "@/lib/kani-bus";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3">
      <motion.nav
        className={cn(
          "mt-3 flex w-full items-center justify-between rounded-full border transition-all duration-500",
          scrolled
            ? "max-w-4xl border-brand-purple-200/60 bg-white/75 px-3 py-2 shadow-soft backdrop-blur-xl"
            : "max-w-6xl border-transparent bg-transparent px-4 py-2.5"
        )}
      >
        <a href="#inicio" className="pl-1">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-brand-ink/70 transition-colors hover:bg-brand-purple-50 hover:text-brand-purple-700"
            >
              {l.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="tel:+576017443472"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple-50 px-3.5 py-2 text-sm font-semibold text-brand-purple-700 ring-1 ring-inset ring-brand-purple-200 transition-colors hover:bg-brand-purple-100"
          >
            <Siren className="h-4 w-4" />
            Urgencias 24/7
          </a>
          <button
            onClick={() => openKani()}
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-green-600 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
          >
            <Sparkles className="h-4 w-4" />
            Agendar
          </button>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-ink lg:hidden"
          aria-label="Menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-4 top-[70px] rounded-3xl border border-brand-purple-200/60 bg-white/95 p-4 shadow-soft backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-brand-ink/80 hover:bg-brand-purple-50"
                >
                  {l.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openKani();
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-purple-600 to-brand-green-600 px-4 py-3 text-base font-semibold text-white"
              >
                <Sparkles className="h-4 w-4" /> Agendar con Kani
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
