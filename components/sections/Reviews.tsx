"use client";

import { reviews } from "@/lib/content";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { StarRow, Reveal, Eyebrow } from "@/components/ui/primitives";
import { Star, BadgeCheck, Quote } from "lucide-react";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

const avatarGradients = [
  "from-brand-purple-500 to-brand-purple-700",
  "from-brand-green-500 to-brand-green-700",
  "from-brand-sky to-brand-purple-600",
  "from-amber-400 to-brand-green-600",
];

export function Reviews() {
  return (
    <section id="resenas" className="relative overflow-hidden bg-brand-cream py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-brand-mesh opacity-30" />
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Aggregate */}
          <Reveal>
            <div>
              <Eyebrow>
                <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" /> Lo que dicen las familias
              </Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-5xl">
                Miles de mascotas,
                <br /> miles de gracias
              </h2>
              <div className="mt-7 flex items-center gap-5">
                <div className="text-center">
                  <div className="font-display text-6xl font-extrabold text-transparent">
                    <span className="bg-gradient-to-br from-brand-purple-600 to-brand-green-600 bg-clip-text">4.9</span>
                  </div>
                  <StarRow n={5} className="mt-1 justify-center" />
                </div>
                <div className="h-16 w-px bg-brand-purple-200" />
                <div>
                  <p className="font-display text-3xl font-extrabold text-brand-ink">+1.200</p>
                  <p className="text-sm text-brand-ink/60">familias felices</p>
                </div>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-green-200 bg-brand-green-50 px-4 py-2 text-sm font-semibold text-brand-green-700">
                <BadgeCheck className="h-4 w-4" /> Reseñas verificadas de Google, Facebook e Instagram
              </div>
            </div>
          </Reveal>

          {/* Cards */}
          <div className="columns-1 gap-4 sm:columns-2">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.06} className="mb-4 break-inside-avoid">
                <SpotlightCard className="p-5">
                  <Quote className="h-6 w-6 text-brand-purple-200" />
                  <p className="mt-2 text-sm leading-relaxed text-brand-ink/80">{r.text}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradients[i % 4]} text-xs font-bold text-white`}>
                      {initials(r.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-brand-ink">{r.name}</p>
                      <p className="truncate text-xs text-brand-ink/50">{r.pet}</p>
                    </div>
                    <div className="text-right">
                      <StarRow n={r.stars} />
                      <p className="mt-0.5 text-[10px] font-medium text-brand-ink/40">vía {r.source}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
