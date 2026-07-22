"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, CalendarCheck, Siren, Star, ArrowRight, Stethoscope } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { MagneticButton } from "@/components/ui/primitives";
import { openKani } from "@/lib/kani-bus";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-40">
      {/* fondos */}
      <div className="absolute inset-0 -z-10 bg-brand-mesh opacity-70" />
      <DottedGlowBackground className="-z-10" />
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-16" fill="#8B4FB0" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Columna de texto */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-brand-purple-700 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green-600" />
            </span>
            Clínica veterinaria en Bogotá · desde el año 2000
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-ink sm:text-6xl lg:text-7xl"
          >
            Tu mascota
            <br className="hidden sm:block" /> merece{" "}
            <ContainerTextFlip
              words={["amor", "ciencia real", "atención 24/7", "calma"]}
              textClassName="text-4xl sm:text-5xl lg:text-6xl"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-ink/65 lg:mx-0"
          >
            25 años uniendo tecnología de punta y calidez humana para cuidar a
            perros y gatos. Urgencias abiertas <strong className="text-brand-ink">24 horas</strong>,
            todos los días —{" "}
            <span className="text-brand-purple-700">donde la ciencia se mezcla con mucho amor animal.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <MagneticButton
              onClick={() => openKani()}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-green-600 px-7 py-4 text-base font-semibold text-white shadow-glow sm:w-auto"
            >
              <Sparkles className="h-5 w-5" />
              Agendar con Kani
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <a
              href="#servicios"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-purple-200 bg-white/70 px-7 py-4 text-base font-semibold text-brand-ink backdrop-blur transition-colors hover:bg-white sm:w-auto"
            >
              <Stethoscope className="h-5 w-5 text-brand-purple-600" />
              Ver servicios
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-ink/60 lg:justify-start"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
              <strong className="text-brand-ink">4.9</strong> en reseñas
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-brand-green-600">●</span> +1.200 familias felices
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-brand-purple-600">●</span> 2 sedes en Usaquén
            </span>
          </motion.div>
        </div>

        {/* Columna visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full">
            {/* halo */}
            <div className="absolute inset-6 rounded-[2.75rem] bg-gradient-to-br from-brand-purple-500/30 to-brand-green-500/30 blur-2xl" />

            {/* imagen principal */}
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-soft">
              <Image
                src="/images/vet-portrait.jpg"
                alt="Médico veterinario de Kanicat"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-900/30 via-transparent to-transparent" />
            </div>

            {/* tarjeta flotante: cita confirmada (teaser IA) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3 top-10 w-52 rounded-2xl border border-white/60 bg-white/90 p-3 shadow-soft backdrop-blur-xl sm:-left-6"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-brand-ink">Cita confirmada ✓</p>
                  <p className="text-[11px] text-brand-ink/60">Mié 10:30 · Dr. Vallejo</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-brand-purple-600">
                <Sparkles className="h-3 w-3" /> agendada por Kani IA
              </div>
            </motion.div>

            {/* tarjeta flotante: urgencias */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-3 bottom-16 w-44 rounded-2xl border border-white/60 bg-white/90 p-3 shadow-soft backdrop-blur-xl sm:-right-6"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-purple-100 text-brand-purple-700">
                  <Siren className="h-5 w-5" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-brand-ink">Urgencias 24/7</p>
                  <p className="text-[11px] text-brand-ink/60">Siempre abiertos</p>
                </div>
              </div>
            </motion.div>

            {/* mini foto flotante */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 left-8 h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-soft"
            >
              <Image src="/images/gallery/cat-3.jpg" alt="Gato feliz" fill className="object-cover" sizes="96px" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
