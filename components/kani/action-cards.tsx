"use client";

import {
  CalendarCheck,
  MapPin,
  Clock,
  MessageCircle,
  Siren,
  Stethoscope,
  Syringe,
  ShieldCheck,
  Check,
  ShoppingBag,
  Truck,
  Store,
  Download,
  PawPrint,
} from "lucide-react";
import { cop } from "@/lib/content";
import type { ActionCard, VacunaRow } from "./types";
import { cn } from "@/lib/utils";

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mt-2 overflow-hidden rounded-2xl border bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}

function Cita({ c }: { c: Extract<ActionCard, { kind: "cita" }> }) {
  return (
    <Frame className="border-brand-green-200">
      <div className="flex items-center gap-2 bg-brand-green-50 px-4 py-2.5 text-brand-green-700">
        <CalendarCheck className="h-4 w-4" />
        <span className="text-sm font-bold">Cita confirmada</span>
        <span className="ml-auto rounded-full bg-brand-green-600 px-2 py-0.5 text-[10px] font-semibold text-white">
          DEMO
        </span>
      </div>
      <div className="space-y-2.5 p-4">
        <div className="flex items-center gap-2 text-sm">
          <Stethoscope className="h-4 w-4 text-brand-purple-600" />
          <span className="font-semibold text-brand-ink">{c.servicio}</span>
          <span className="text-brand-ink/50">· {c.mascota} ({c.especie})</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 rounded-xl bg-brand-purple-50 px-3 py-2">
            <Clock className="h-4 w-4 text-brand-purple-600" />
            <div className="leading-tight">
              <p className="font-semibold text-brand-ink">{c.fecha}</p>
              <p className="text-xs text-brand-ink/60">{c.hora}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-brand-purple-50 px-3 py-2">
            <MapPin className="h-4 w-4 text-brand-purple-600" />
            <p className="text-xs font-semibold leading-tight text-brand-ink">{c.sede}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-brand-green-50 px-3 py-2 text-xs font-medium text-brand-green-700">
          <MessageCircle className="h-3.5 w-3.5" />
          Recordatorio automático por WhatsApp programado
        </div>
      </div>
    </Frame>
  );
}

const nivelStyle = {
  verde: { bg: "bg-brand-green-50", text: "text-brand-green-700", ring: "border-brand-green-200", label: "Nivel bajo" },
  ambar: { bg: "bg-amber-50", text: "text-amber-700", ring: "border-amber-200", label: "Requiere atención" },
  rojo: { bg: "bg-red-50", text: "text-red-700", ring: "border-red-200", label: "Posible urgencia" },
} as const;

function Triage({ c }: { c: Extract<ActionCard, { kind: "triage" }> }) {
  const s = nivelStyle[c.nivel];
  return (
    <Frame className={s.ring}>
      <div className={cn("flex items-center gap-2 px-4 py-2.5", s.bg, s.text)}>
        <Siren className="h-4 w-4" />
        <span className="text-sm font-bold">Triage · {s.label}</span>
        <span className="ml-auto flex items-center gap-1">
          {(["verde", "ambar", "rojo"] as const).map((n) => (
            <span
              key={n}
              className={cn(
                "h-2 w-2 rounded-full",
                n === "verde" && "bg-brand-green-500",
                n === "ambar" && "bg-amber-400",
                n === "rojo" && "bg-red-500",
                c.nivel !== n && "opacity-25"
              )}
            />
          ))}
        </span>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-sm text-brand-ink/80">{c.recomendacion}</p>
        <ul className="space-y-1.5">
          {c.pasos.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-brand-ink/70">
              <span className={cn("mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold", s.bg, s.text)}>
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ul>
        {c.nivel === "rojo" && (
          <a
            href="tel:+576017443472"
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Siren className="h-4 w-4" /> Ir a urgencias 24/7 ahora
          </a>
        )}
      </div>
    </Frame>
  );
}

const estadoPill: Record<VacunaRow["estado"], string> = {
  aplicada: "bg-brand-green-100 text-brand-green-700",
  proxima: "bg-amber-100 text-amber-700",
  pendiente: "bg-brand-purple-50 text-brand-purple-600",
};

function Vacunas({ c }: { c: Extract<ActionCard, { kind: "vacunas" }> }) {
  return (
    <Frame className="border-brand-purple-200">
      <div className="flex items-center gap-2 bg-brand-purple-50 px-4 py-2.5 text-brand-purple-700">
        <ShieldCheck className="h-4 w-4" />
        <span className="text-sm font-bold">Carnet digital · {c.nombre}</span>
        <span className="ml-auto inline-flex items-center gap-1 text-xs text-brand-purple-600">
          <PawPrint className="h-3.5 w-3.5" /> {c.especie} · {c.edadMeses}m
        </span>
      </div>
      <div className="p-3">
        <ul className="divide-y divide-brand-purple-100">
          {c.plan.map((r, i) => (
            <li key={i} className="flex items-center gap-2 px-1 py-2">
              <Syringe className="h-4 w-4 text-brand-purple-500" />
              <span className="text-sm font-medium text-brand-ink">{r.vacuna}</span>
              <span className="ml-auto text-xs text-brand-ink/50">{r.cuando}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", estadoPill[r.estado])}>
                {r.estado}
              </span>
            </li>
          ))}
        </ul>
        <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple-600 px-4 py-2.5 text-sm font-semibold text-white">
          <Download className="h-4 w-4" /> Descargar carnet
        </button>
      </div>
    </Frame>
  );
}

function Pedido({ c }: { c: Extract<ActionCard, { kind: "pedido" }> }) {
  return (
    <Frame className="border-brand-green-200">
      <div className="flex items-center gap-2 bg-brand-green-50 px-4 py-2.5 text-brand-green-700">
        <ShoppingBag className="h-4 w-4" />
        <span className="text-sm font-bold">Pedido listo</span>
        <span className="ml-auto rounded-full bg-brand-green-600 px-2 py-0.5 text-[10px] font-semibold text-white">
          DEMO
        </span>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {c.items.map((it, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-purple-50 text-xs font-bold text-brand-purple-700">
                {it.cantidad}
              </span>
              <span className="flex-1 text-brand-ink/80">{it.nombre}</span>
              <span className="font-semibold text-brand-ink">{cop(it.precio * it.cantidad)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-dashed border-brand-purple-200 pt-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-brand-ink/60">
            {c.entrega === "domicilio" ? <Truck className="h-4 w-4" /> : <Store className="h-4 w-4" />}
            {c.entrega === "domicilio" ? "Envío a domicilio" : "Recoger en sede"}
          </span>
          <span className="font-display text-lg font-extrabold text-brand-ink">{cop(c.total)}</span>
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple-600 to-brand-green-600 px-4 py-2.5 text-sm font-semibold text-white">
          <Check className="h-4 w-4" /> Confirmar pedido
        </button>
      </div>
    </Frame>
  );
}

export function ActionCardView({ card }: { card: ActionCard }) {
  switch (card.kind) {
    case "cita":
      return <Cita c={card} />;
    case "triage":
      return <Triage c={card} />;
    case "vacunas":
      return <Vacunas c={card} />;
    case "pedido":
      return <Pedido c={card} />;
  }
}
