"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/content";
import { Reveal } from "@/components/ui/primitives";
import { Marquee } from "@/components/ui/marquee";
import { CalendarClock, FileHeart, Truck, BellRing, ShieldCheck, HeartHandshake } from "lucide-react";

const values = [
  { icon: CalendarClock, label: "Agenda en 30 segundos" },
  { icon: FileHeart, label: "Historia clínica digital" },
  { icon: BellRing, label: "Recordatorios automáticos" },
  { icon: Truck, label: "Farmacia a domicilio" },
  { icon: ShieldCheck, label: "Planes de vacunación" },
  { icon: HeartHandshake, label: "Acompañamiento humano" },
];

export function TrustBar() {
  return (
    <section className="relative z-10 -mt-2">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-brand-purple-200/50 bg-white/80 p-6 shadow-soft backdrop-blur-xl sm:p-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-display text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                <span className="bg-gradient-to-br from-brand-purple-600 to-brand-green-600 bg-clip-text">
                  {s.value}
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold text-brand-ink">{s.label}</p>
              <p className="text-xs text-brand-ink/50">{s.sub}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative mt-8 mask-fade-x">
        <Marquee duration={38}>
          {values.map((v) => (
            <div
              key={v.label}
              className="mx-2 flex items-center gap-2.5 whitespace-nowrap rounded-full border border-brand-purple-200/50 bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink/70"
            >
              <v.icon className="h-4 w-4 text-brand-green-600" />
              {v.label}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
