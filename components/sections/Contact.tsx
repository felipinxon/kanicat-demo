"use client";

import { Mail, Phone, Instagram, MessageCircle, Sparkles } from "lucide-react";
import { clinic } from "@/lib/content";
import { GooeyInput } from "@/components/ui/gooey-input";
import { Spotlight } from "@/components/ui/spotlight";
import { Reveal } from "@/components/ui/primitives";
import { openKani } from "@/lib/kani-bus";

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-purple-500/30 bg-gradient-to-br from-brand-purple-800 to-brand-purple-950 p-8 shadow-2xl sm:p-14">
          <Spotlight className="-top-20 left-10" fill="#4FA83C" />
          <div className="absolute inset-0 bg-brand-mesh opacity-30" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                  Cuidemos juntos a quien más quieres 🐾
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-md text-lg text-white/70">
                  Recibe tips de salud y bienestar para tu mascota, y agenda en segundos con Kani.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-6 max-w-md">
                  <GooeyInput />
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <button
                  onClick={() => openKani()}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-purple-700 transition-transform hover:scale-105"
                >
                  <Sparkles className="h-4 w-4" /> Agendar con Kani
                </button>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="grid gap-3">
                <ContactRow icon={Phone} label="Llámanos" value={clinic.phones.join(" · ")} href="tel:+576017443472" />
                <ContactRow icon={MessageCircle} label="WhatsApp" value="Escríbenos por chat" onClick={() => openKani()} />
                <ContactRow icon={Mail} label="Correo" value={clinic.email} href={`mailto:${clinic.email}`} />
                <ContactRow icon={Instagram} label="Instagram" value={`@${clinic.instagram}`} href={`https://instagram.com/${clinic.instagram}`} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  onClick,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:bg-white/10">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-green-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-white/50">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="text-left">
      {inner}
    </button>
  );
}
