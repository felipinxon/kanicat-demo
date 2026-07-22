import { Logo } from "@/components/brand/Logo";
import { navLinks, clinic, locations } from "@/lib/content";
import { Instagram, Mail, Phone, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-brand-purple-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-ink/60">
              {clinic.tagline}. 25+ años cuidando a los perros y gatos de Bogotá, con urgencias abiertas
              las 24 horas.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={`https://instagram.com/${clinic.instagram}`} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple-50 text-brand-purple-700 transition-colors hover:bg-brand-purple-100">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="tel:+576017443472" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple-50 text-brand-purple-700 transition-colors hover:bg-brand-purple-100">
                <Phone className="h-5 w-5" />
              </a>
              <a href={`mailto:${clinic.email}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple-50 text-brand-purple-700 transition-colors hover:bg-brand-purple-100">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wider text-brand-ink">Explora</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-brand-ink/60 transition-colors hover:text-brand-purple-700">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wider text-brand-ink">Sedes</p>
            <ul className="mt-4 space-y-3">
              {locations.map((l) => (
                <li key={l.name} className="text-sm text-brand-ink/60">
                  <span className="font-semibold text-brand-ink/80">{l.name}</span>
                  <br />
                  {l.address} · {l.zone}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-purple-100 pt-6 text-xs text-brand-ink/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Kanicat · Clínica Veterinaria. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            Demo de rediseño hecho con <Heart className="h-3.5 w-3.5 fill-brand-purple-500 text-brand-purple-500" /> y mucha IA
          </p>
        </div>
      </div>
    </footer>
  );
}
