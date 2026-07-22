"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingBag, Truck, Check, Sparkles, Trash2 } from "lucide-react";
import { products, cop, type Product } from "@/lib/content";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/ui/primitives";
import { openKani } from "@/lib/kani-bus";
import { cn } from "@/lib/utils";

type CartItem = { product: Product; qty: number };

const filters = ["Todos", "Perro", "Gato", "Suplemento"] as const;

export function Pharmacy() {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [done, setDone] = useState(false);

  const add = (p: Product) =>
    setCart((c) => ({ ...c, [p.id]: { product: p, qty: (c[p.id]?.qty || 0) + 1 } }));
  const dec = (id: string) =>
    setCart((c) => {
      const cur = c[id];
      if (!cur) return c;
      if (cur.qty <= 1) {
        const { [id]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [id]: { ...cur, qty: cur.qty - 1 } };
    });

  const items = Object.values(cart);
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);
  const count = items.reduce((s, it) => s + it.qty, 0);

  const shown = products.filter((p) => {
    if (filter === "Todos") return true;
    if (filter === "Suplemento") return p.category === "Suplemento";
    return p.species === filter || p.species === "Perro y Gato";
  });

  const checkout = () => {
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setCart({});
    }, 3200);
  };

  return (
    <section id="farmacia" className="relative bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Farmacia veterinaria"
          title="Todo para su bienestar, a un clic"
          subtitle="Alimento terapéutico, suplementos y medicamentos con la calidad que tu mascota merece. Recógelo en sede o recíbelo a domicilio."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Productos */}
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    filter === f
                      ? "bg-brand-purple-600 text-white shadow-glow"
                      : "border border-brand-purple-200 bg-white text-brand-ink/70 hover:bg-brand-purple-50"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((p) => (
                <SpotlightCard key={p.id} className="flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="300px" />
                    {p.tag && (
                      <span className="absolute left-3 top-3 rounded-full bg-brand-green-600 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                        {p.tag}
                      </span>
                    )}
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-brand-purple-700 backdrop-blur">
                      {p.species}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-purple-500">{p.brand}</p>
                    <h3 className="mt-0.5 text-sm font-bold leading-snug text-brand-ink">{p.name}</h3>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="font-display text-lg font-extrabold text-brand-ink">{cop(p.price)}</span>
                      <button
                        onClick={() => add(p)}
                        className="flex items-center gap-1 rounded-full bg-brand-purple-600 px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
                      >
                        <Plus className="h-3.5 w-3.5" /> Agregar
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Carrito */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-brand-purple-200 bg-brand-cream shadow-soft">
              <div className="flex items-center gap-2 bg-gradient-to-r from-brand-purple-700 to-brand-purple-600 px-5 py-3.5 text-white">
                <ShoppingBag className="h-5 w-5" />
                <span className="font-bold">Tu pedido</span>
                {count > 0 && (
                  <span className="ml-auto rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold">{count}</span>
                )}
              </div>

              <div className="max-h-64 space-y-3 overflow-y-auto p-4 no-scrollbar">
                <AnimatePresence initial={false}>
                  {items.length === 0 ? (
                    <p className="py-6 text-center text-sm text-brand-ink/50">Tu carrito está vacío 🛒</p>
                  ) : (
                    items.map((it) => (
                      <motion.div
                        key={it.product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                          <Image src={it.product.image} alt="" fill className="object-cover" sizes="44px" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-brand-ink">{it.product.name}</p>
                          <p className="text-xs text-brand-ink/50">{cop(it.product.price)}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => dec(it.product.id)} className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-purple-100 text-brand-purple-700">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold text-brand-ink">{it.qty}</span>
                          <button onClick={() => add(it.product)} className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-purple-100 text-brand-purple-700">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-brand-purple-100 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-brand-ink/60">
                    <Truck className="h-4 w-4" /> Envío gratis desde {cop(80000)}
                  </span>
                  <span className="font-display text-xl font-extrabold text-brand-ink">{cop(total)}</span>
                </div>
                <button
                  onClick={checkout}
                  disabled={items.length === 0 || done}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white transition-all",
                    done ? "bg-brand-green-600" : "bg-gradient-to-r from-brand-purple-600 to-brand-green-600 disabled:opacity-40"
                  )}
                >
                  {done ? (
                    <>
                      <Check className="h-4 w-4" /> ¡Pedido confirmado!
                    </>
                  ) : (
                    <>
                      Finalizar pedido <span className="text-white/70">(demo)</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => openKani("Quiero reordenar alimento en la farmacia")}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full border border-brand-purple-200 px-4 py-2.5 text-xs font-semibold text-brand-purple-700 hover:bg-brand-purple-50"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Pídelo por chat con Kani
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
