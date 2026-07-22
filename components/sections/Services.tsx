"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Siren,
  Stethoscope,
  Syringe,
  Activity,
  FlaskConical,
  ScanLine,
  ShieldCheck,
  Pill,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { services, type Service } from "@/lib/content";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SectionHeading, Reveal } from "@/components/ui/primitives";
import { openKani } from "@/lib/kani-bus";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Siren,
  Stethoscope,
  Syringe,
  Activity,
  FlaskConical,
  ScanLine,
  ShieldCheck,
  Pill,
};

const accentText: Record<Service["accent"], string> = {
  purple: "text-brand-purple-600",
  green: "text-brand-green-600",
  sky: "text-brand-sky",
  gold: "text-brand-gold",
};
const accentBg: Record<Service["accent"], string> = {
  purple: "bg-brand-purple-100 text-brand-purple-700",
  green: "bg-brand-green-100 text-brand-green-700",
  sky: "bg-sky-100 text-brand-sky",
  gold: "bg-amber-100 text-amber-600",
};

function ServiceCard({ s }: { s: Service }) {
  const Icon = icons[s.icon] ?? Stethoscope;
  const hasImage = Boolean(s.image);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-brand-purple-200/40 p-6 shadow-[0_4px_30px_-14px_rgba(23,20,31,0.18)] transition-shadow duration-500 hover:shadow-soft",
        hasImage ? "text-white" : "bg-white",
        s.span
      )}
    >
      {hasImage && (
        <>
          <Image
            src={s.image!}
            alt={s.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-900/90 via-brand-purple-900/45 to-brand-purple-900/10" />
        </>
      )}

      <div className="relative flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            hasImage ? "bg-white/20 text-white backdrop-blur" : accentBg[s.accent]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <ArrowUpRight
          className={cn(
            "h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100",
            hasImage ? "text-white" : "text-brand-ink/40"
          )}
        />
      </div>

      <div className="relative mt-6">
        <h3 className={cn("font-display text-xl font-bold", hasImage ? "text-white" : "text-brand-ink")}>
          {s.title}
        </h3>
        <p className={cn("mt-1.5 text-sm leading-relaxed", hasImage ? "text-white/85" : "text-brand-ink/60")}>
          {s.blurb}
        </p>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="servicios" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Servicios integrales"
          title={
            <>
              Todo lo que tu mascota necesita,
              <br className="hidden sm:block" /> bajo un mismo techo
            </>
          }
          subtitle="Un hospital veterinario completo: desde una consulta de rutina hasta una cirugía de alta complejidad, con urgencias abiertas las 24 horas."
        />

        <div className="mt-14">
          <BentoGrid className="md:auto-rows-[14rem]">
            {services.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </BentoGrid>
        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <button
            onClick={() => openKani("Quiero agendar una consulta")}
            className="inline-flex items-center gap-2 rounded-full border border-brand-purple-200 bg-white px-6 py-3 text-sm font-semibold text-brand-purple-700 transition-colors hover:bg-brand-purple-50"
          >
            ¿No sabes qué necesita tu mascota? Pregúntale a Kani →
          </button>
        </Reveal>
      </div>
    </section>
  );
}
