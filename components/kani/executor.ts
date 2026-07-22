import { products, locations, cop } from "@/lib/content";
import type { ActionCard, PedidoItem, VacunaRow } from "./types";

// ————————————————————————————————————————————————
//  Convierte una llamada de herramienta (o intención local)
//  en una tarjeta de acción demo + un texto de confirmación.
// ————————————————————————————————————————————————

const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function proximaFecha(offset = 1): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`;
}

function normalizarSede(input?: string): string {
  if (!input) return locations[0].name;
  const t = input.toLowerCase();
  const hit = locations.find(
    (l) => t.includes("patricio") ? l.name.includes("Patricio") : t.includes("navarra") ? l.name.includes("Navarra") : false
  );
  return hit?.name ?? locations[0].name;
}

function especieDe(text?: string): string {
  const t = (text ?? "").toLowerCase();
  if (t.includes("gat") || t.includes("felin") || t.includes("michi")) return "Gato";
  if (t.includes("perr") || t.includes("can")) return "Perro";
  return text && text.length ? text : "Perro";
}

export type Built = { card: ActionCard; reply: string };

export function buildCita(input: Record<string, any>): Built {
  const servicio = input.servicio || "Consulta general";
  const mascota = input.mascota || "tu mascota";
  const especie = especieDe(input.especie || input.mascota);
  const sede = normalizarSede(input.sede);
  const fecha = input.fecha || proximaFecha(1);
  const hora = input.hora || "10:30 a.m.";
  return {
    card: { kind: "cita", servicio, mascota, especie, sede, fecha, hora },
    reply: `¡Listo! Agendé la cita de ${servicio.toLowerCase()} para ${mascota} el ${fecha} a las ${hora} en ${sede}. Te enviaré un recordatorio por WhatsApp el día anterior 💜`,
  };
}

export function buildTriage(input: Record<string, any>): Built {
  const sintomas = input.sintomas || "los síntomas que describes";
  const nivel = (["verde", "ambar", "rojo"].includes(input.nivel) ? input.nivel : "ambar") as
    | "verde"
    | "ambar"
    | "rojo";
  const recomendacion =
    input.recomendacion ||
    (nivel === "rojo"
      ? "Es una posible urgencia. Ven de inmediato a nuestra sede — estamos abiertos 24/7."
      : nivel === "ambar"
      ? "Conviene una valoración pronto. Te sugiero agendar hoy o mañana."
      : "Parece leve, pero vale la pena vigilar. Observa la evolución en casa.");
  const pasos: string[] = Array.isArray(input.pasos) && input.pasos.length
    ? input.pasos
    : nivel === "rojo"
    ? ["Mantén a tu mascota calmada y abrigada", "No des alimento ni medicamentos", "Llámanos y ven ya a urgencias 24/7"]
    : nivel === "ambar"
    ? ["Ofrece agua fresca", "Evita el ejercicio intenso", "Anota cuándo empezó y cómo evoluciona"]
    : ["Vigila que coma y beba normal", "Dale un espacio tranquilo", "Escríbeme si algo cambia"];
  const reply =
    nivel === "rojo"
      ? `⚠️ Con "${sintomas}" activo alerta ROJA. ${recomendacion}`
      : `Analicé "${sintomas}". Nivel ${nivel.toUpperCase()}. ${recomendacion}`;
  return { card: { kind: "triage", sintomas, nivel, recomendacion, pasos }, reply };
}

export function buildVacunas(input: Record<string, any>): Built {
  const nombre = input.nombre || "tu mascota";
  const especie = especieDe(input.especie);
  const edadMeses = Number(input.edadMeses ?? input.edad ?? 3) || 3;

  const base =
    especie === "Gato"
      ? [
          { vacuna: "Triple felina (1ª)", edad: 2 },
          { vacuna: "Triple felina (refuerzo)", edad: 3 },
          { vacuna: "Leucemia felina", edad: 3.5 },
          { vacuna: "Antirrábica", edad: 4 },
          { vacuna: "Refuerzo anual", edad: 12 },
        ]
      : [
          { vacuna: "Puppy / Parvovirus", edad: 1.5 },
          { vacuna: "Séxtuple (1ª)", edad: 2.5 },
          { vacuna: "Séxtuple (refuerzo)", edad: 3.5 },
          { vacuna: "Antirrábica", edad: 4 },
          { vacuna: "Refuerzo anual", edad: 12 },
        ];

  const plan: VacunaRow[] = base.map((b) => {
    const estado: VacunaRow["estado"] =
      edadMeses >= b.edad + 0.5 ? "aplicada" : edadMeses >= b.edad - 0.6 ? "proxima" : "pendiente";
    const cuando =
      estado === "aplicada"
        ? "Al día ✓"
        : estado === "proxima"
        ? "¡Ahora toca!"
        : `a los ${b.edad % 1 === 0 ? b.edad : b.edad.toFixed(1)} meses`;
    return { vacuna: b.vacuna, cuando, estado };
  });

  return {
    card: { kind: "vacunas", nombre, especie, edadMeses, plan },
    reply: `Armé el carnet digital de ${nombre} (${especie.toLowerCase()}, ${edadMeses} meses). Programé recordatorios automáticos para cada dosis 📅`,
  };
}

function matchProducto(q: string) {
  const t = q.toLowerCase();
  return (
    products.find((p) => (p.name + " " + p.brand).toLowerCase().includes(t)) ||
    products.find((p) => t.split(" ").some((w) => w.length > 3 && p.name.toLowerCase().includes(w))) ||
    products.find((p) => (t.includes("gat") && p.species !== "Perro") || (t.includes("perr") && p.species !== "Gato")) ||
    products[0]
  );
}

export function buildPedido(input: Record<string, any>): Built {
  const rawItems: any[] = Array.isArray(input.items) && input.items.length
    ? input.items
    : [{ producto: input.producto || products[0].name, cantidad: input.cantidad || 1 }];

  const items: PedidoItem[] = rawItems.map((it) => {
    const p = matchProducto(String(it.producto || it.nombre || ""));
    const cantidad = Math.max(1, Number(it.cantidad) || 1);
    return { nombre: `${p.name} · ${p.species}`, cantidad, precio: p.price };
  });

  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const entrega = (input.entrega === "recoger" ? "recoger" : "domicilio") as "domicilio" | "recoger";

  return {
    card: { kind: "pedido", items, total, entrega },
    reply: `Preparé tu pedido (${items.length} ${items.length === 1 ? "producto" : "productos"}, ${cop(
      total
    )}). ${entrega === "domicilio" ? "Lo enviamos a domicilio hoy mismo 🛵" : "Puedes recogerlo en sede en 30 min 🛍️"}`,
  };
}

export function buildFromTool(name: string, input: Record<string, any>): Built | null {
  switch (name) {
    case "agendar_cita":
      return buildCita(input);
    case "evaluar_urgencia":
      return buildTriage(input);
    case "plan_vacunas":
      return buildVacunas(input);
    case "reordenar_farmacia":
      return buildPedido(input);
    default:
      return null;
  }
}

// ————————————————————————————————————————————————
//  Fallback local: sin API, deducimos la intención por palabras clave
// ————————————————————————————————————————————————
export function localIntent(text: string): Built & { extra?: string } {
  const t = text.toLowerCase();

  if (/(vomit|sangre|convuls|no respira|intoxic|atropell|grave|urgenc|emergenc|decaíd|decaid|no come|dolor)/.test(t)) {
    const nivel = /(sangre|convuls|no respira|intoxic|atropell|grave|no reacciona)/.test(t)
      ? "rojo"
      : /(vomit|no come|decaíd|decaid|dolor|fiebre)/.test(t)
      ? "ambar"
      : "verde";
    return buildTriage({ sintomas: text, nivel });
  }
  if (/(vacun|carnet|refuerzo|inmuniz)/.test(t)) {
    return buildVacunas({ especie: t, edadMeses: 3 });
  }
  if (/(pedid|compr|reorden|aliment|hills|organew|enterex|domicilio|farmac)/.test(t)) {
    return buildPedido({ producto: text, cantidad: 1, entrega: t.includes("recog") ? "recoger" : "domicilio" });
  }
  // por defecto: agendar
  return buildCita({ servicio: "Consulta general", mascota: "tu mascota", especie: t });
}
