"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Siren, ShieldCheck, ShoppingBag, Clock, Sparkles } from "lucide-react";
import { KaniChat } from "@/components/kani/KaniChat";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { Reveal, Eyebrow } from "@/components/ui/primitives";

const features = [
  { icon: CalendarCheck, title: "Agenda en segundos", desc: "Reserva citas por chat, con recordatorios automáticos por WhatsApp." },
  { icon: Siren, title: "Triage de urgencias 24/7", desc: "Orienta sobre síntomas y prioriza los casos que no pueden esperar." },
  { icon: ShieldCheck, title: "Carnet y vacunas al día", desc: "Genera el plan de vacunación y avisa antes de cada dosis." },
  { icon: ShoppingBag, title: "Farmacia sin filas", desc: "Reordena alimento y medicamentos para recoger o a domicilio." },
];

export function KaniSection() {
  return (
    <section id="kani" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-purple-900 via-brand-purple-800 to-brand-purple-900" />
      <div className="absolute inset-0 -z-10 bg-brand-mesh opacity-40" />
      <DottedGlowBackground className="-z-10 opacity-60" dotColor="rgba(255,255,255,0.12)" glow={false} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow className="border-white/20 bg-white/10 text-white">
              <Sparkles className="h-3.5 w-3.5" /> Innovación con IA
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Conoce a <span className="text-gradient-sky bg-gradient-to-r from-brand-green-300 via-white to-brand-sky bg-clip-text text-transparent">Kani</span>,
              <br /> tu asistente veterinaria con IA
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
              Una IA que <strong className="text-white">ahorra tiempo</strong> a tu familia y al equipo de la clínica:
              atiende, agenda y resuelve al instante, 24/7. Pruébala aquí mismo →
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.15 + i * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-green-300">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{f.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/60">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70">
              <Clock className="h-4 w-4 text-brand-green-300" />
              Reduce hasta <strong className="mx-1 text-white">70%</strong> las llamadas repetitivas
            </div>
          </Reveal>
        </div>

        {/* Chat device */}
        <Reveal delay={0.2}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-brand-green-400/30 to-brand-sky/30 blur-2xl" />
            <div className="relative h-[560px] overflow-hidden rounded-[2rem] border border-white/20 bg-brand-cream shadow-2xl">
              <div className="flex items-center gap-2 border-b border-brand-purple-100 bg-white px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-brand-green-400" />
                <span className="ml-2 text-xs font-semibold text-brand-ink/50">kanicat.com · Kani IA</span>
              </div>
              <div className="h-[calc(560px-42px)]">
                <KaniChat />
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
