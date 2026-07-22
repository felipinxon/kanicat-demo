"use client";

import Image from "next/image";
import { galleryImages } from "@/lib/content";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/primitives";
import { Heart } from "lucide-react";

function Tile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative h-52 w-72 shrink-0 overflow-hidden rounded-3xl border border-brand-purple-100 shadow-sm sm:h-60 sm:w-80">
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="320px" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-900/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute bottom-3 left-3 flex translate-y-3 items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-purple-700 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <Heart className="h-3 w-3 fill-brand-purple-500 text-brand-purple-500" /> {alt}
      </div>
    </div>
  );
}

export function Gallery() {
  const half = Math.ceil(galleryImages.length / 2);
  const rowA = galleryImages.slice(0, half);
  const rowB = galleryImages.slice(half);

  return (
    <section className="relative overflow-hidden bg-brand-cream py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Nuestra familia peluda"
          title="Cada paciente, una historia de amor"
          subtitle="Miles de perros y gatos han pasado por nuestras manos. Estos son algunos de los que hoy están sanos y felices en casa."
        />
      </div>

      <div className="mt-14 space-y-5">
        <div className="mask-fade-x">
          <Marquee duration={55}>
            {rowA.map((g) => (
              <Tile key={g.src} src={g.src} alt={g.alt} />
            ))}
          </Marquee>
        </div>
        <div className="mask-fade-x">
          <Marquee duration={65} reverse>
            {rowB.map((g) => (
              <Tile key={g.src} src={g.src} alt={g.alt} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
