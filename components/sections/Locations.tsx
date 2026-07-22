"use client";

import Image from "next/image";
import { MapPin, Clock, Phone, Navigation, Siren } from "lucide-react";
import { locations, clinic } from "@/lib/content";
import { SectionHeading, Reveal } from "@/components/ui/primitives";

const mapBbox = "-74.0545,4.6845,-74.0305,4.7065";
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapBbox}&layer=mapnik&marker=4.6969,-74.0428`;

export function Locations() {
  return (
    <section id="sedes" className="relative bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Dónde encontrarnos"
          title="Dos sedes en el norte de Bogotá"
          subtitle="Cerca de ti, con urgencias abiertas las 24 horas. Ven o pide indicaciones para llegar."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Mapa */}
          <Reveal>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] border border-brand-purple-200 shadow-soft">
              <iframe
                title="Mapa Kanicat"
                src={mapSrc}
                className="h-full w-full grayscale-[0.15]"
                loading="lazy"
                style={{ border: 0, minHeight: 420 }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-brand-purple-900/5" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-soft backdrop-blur">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-purple-500 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-purple-600" />
                </span>
                <span className="text-sm font-bold text-brand-ink">Kanicat · Usaquén</span>
              </div>
            </div>
          </Reveal>

          {/* Sedes */}
          <div className="space-y-5">
            {locations.map((loc, i) => (
              <Reveal key={loc.name} delay={i * 0.1}>
                <div className="group overflow-hidden rounded-3xl border border-brand-purple-100 bg-brand-cream card-hover">
                  <div className="flex">
                    <div className="relative w-28 shrink-0 overflow-hidden sm:w-32">
                      <Image src={loc.image} alt={loc.name} fill className="object-cover" sizes="128px" />
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-display text-lg font-bold text-brand-ink">{loc.name}</h3>
                      <p className="mt-1 flex items-start gap-1.5 text-sm text-brand-ink/70">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple-600" />
                        <span>
                          {loc.address}
                          <br />
                          <span className="text-xs text-brand-ink/50">{loc.zone}</span>
                        </span>
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <a
                          href={loc.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105"
                        >
                          <Navigation className="h-3.5 w-3.5" /> Cómo llegar
                        </a>
                        <a
                          href={`tel:${loc.phone.replace(/\D/g, "")}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple-200 px-3.5 py-1.5 text-xs font-semibold text-brand-purple-700 hover:bg-brand-purple-50"
                        >
                          <Phone className="h-3.5 w-3.5" /> {loc.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Horario + urgencias */}
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-brand-purple-100 bg-white p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-bold text-brand-ink">
                      <Clock className="h-4 w-4 text-brand-purple-600" /> Horario
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-brand-ink/70">
                      {clinic.hours.map((h) => (
                        <li key={h.d} className="flex justify-between gap-3">
                          <span>{h.d}</span>
                          <span className="font-medium text-brand-ink">{h.h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="tel:+576017443472"
                    className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-brand-purple-600 to-brand-purple-800 p-5 text-center text-white transition-transform hover:scale-[1.02]"
                  >
                    <Siren className="h-7 w-7" />
                    <span className="mt-1 font-display text-lg font-extrabold">Urgencias 24/7</span>
                    <span className="text-xs text-white/80">Llama ahora · siempre abiertos</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
