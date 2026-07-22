"use client";

import Image from "next/image";
import { GraduationCap, HeartHandshake, Microscope, Award, Quote } from "lucide-react";
import { clinic } from "@/lib/content";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { SectionHeading, Reveal } from "@/components/ui/primitives";

const values = [
  { icon: HeartHandshake, title: "Amor animal", desc: "Tratamos a cada mascota como parte de nuestra familia." },
  { icon: Microscope, title: "Ciencia de punta", desc: "Equipos modernos y educación médica continua." },
  { icon: Award, title: "Ética y respeto", desc: "Transparencia y compromiso en cada decisión." },
];

export function About() {
  return (
    <section id="nosotros" className="relative bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Nuestra historia"
          title="25 años de ciencia con alma"
          subtitle="Lo que empezó como un sueño hoy es uno de los hospitales veterinarios más reconocidos de Bogotá."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          {/* Retrato del fundador */}
          <Reveal>
            <FollowerPointerCard title={<span>Dr. Enrique Vallejo</span>}>
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand-purple-500/20 to-brand-green-500/20 blur-2xl" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white shadow-soft">
                  <Image src="/images/vet-portrait.jpg" alt={clinic.founder.name} fill className="object-cover" sizes="(max-width:1024px) 90vw, 45vw" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-purple-900/85 to-transparent p-6 pt-16">
                    <p className="font-display text-xl font-bold text-white">{clinic.founder.name}</p>
                    <p className="text-sm text-white/80">{clinic.founder.role}</p>
                  </div>
                </div>
              </div>
            </FollowerPointerCard>
          </Reveal>

          {/* Texto */}
          <div>
            <Reveal>
              <div className="relative rounded-3xl border border-brand-purple-100 bg-brand-cream p-7">
                <Quote className="absolute -top-4 left-6 h-9 w-9 rounded-full bg-brand-purple-600 p-2 text-white" />
                <p className="text-lg leading-relaxed text-brand-ink/80">
                  Para nosotros es fundamental la salud y el bienestar de tu mascota. Por eso prestamos un
                  servicio clínico y médico de calidad, pensando en ti y en tu mascota como
                  <strong className="text-brand-purple-700"> parte de la familia.</strong>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-purple-50 p-4">
                <GraduationCap className="mt-0.5 h-6 w-6 shrink-0 text-brand-purple-600" />
                <p className="text-sm leading-relaxed text-brand-ink/70">{clinic.founder.bio}</p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={0.15 + i * 0.08}>
                  <div className="h-full rounded-2xl border border-brand-purple-100 bg-white p-4 text-center card-hover">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple-100 to-brand-green-100 text-brand-purple-700">
                      <v.icon className="h-6 w-6" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-brand-ink">{v.title}</p>
                    <p className="mt-1 text-xs text-brand-ink/55">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
