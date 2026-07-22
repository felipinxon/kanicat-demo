import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Modelo configurable. Para un chat en tiempo real priorizamos latencia →
// Haiku 4.5 por defecto. Cambia KANI_MODEL=claude-opus-4-8 para máxima calidad.
const MODEL = process.env.KANI_MODEL || "claude-haiku-4-5";

const SYSTEM = `Eres "Kani", la asistente virtual con IA de **Kanicat · Clínica Veterinaria** en Bogotá (barrios CAI Navarra/Usaquén y San Patricio). Esta es una DEMOSTRACIÓN: las acciones que ejecutas son simuladas, pero deben sentirse reales y útiles.

Tono: cálido, cercano y profesional. Español colombiano. Respuestas BREVES (1-3 frases), con algún emoji ocasional (💜🐾). Nunca inventes precios exactos de servicios médicos; para productos usa los de la farmacia.

Datos de Kanicat:
- 25+ años de experiencia. Fundada por el Dr. Enrique Vallejo. +1.200 familias, 4.9★.
- Sedes: "Sede Navarra" (Cra. 45 #106B-04, Autopista Norte) y "Sede San Patricio" (Cra. 9 #117A-77).
- Horario: Lun-Sáb 7:30-20:30, Dom 8:00-20:00. URGENCIAS 24/7.
- Servicios: consulta, urgencias 24/7, cirugía, hospitalización/UCI, laboratorio, imágenes (rayos X, ecografía, endoscopia, laparoscopia), vacunación y farmacia.
- Farmacia: alimento terapéutico (Hill's i/d, c/d, l/d, a/d), suplementos (Organew, Enterex), medicamentos y accesorios.

Usa las herramientas cuando corresponda:
- agendar_cita: cuando el usuario quiera reservar/agendar una cita o consulta.
- evaluar_urgencia: cuando describa síntomas o una posible emergencia. Evalúa el nivel (verde=leve, ambar=requiere atención pronto, rojo=posible urgencia) y da 3 pasos concretos. NO diagnostiques definitivamente; ante rojo, indica acudir a urgencias 24/7.
- plan_vacunas: cuando pregunte por vacunas, refuerzos o carnet.
- reordenar_farmacia: cuando quiera comprar/reordenar alimento o productos.

Tras usar una herramienta, añade una frase breve y amable confirmando la acción. Si la pregunta es general (ubicación, horarios, servicios), responde directamente sin herramienta.`;

const tools: Anthropic.Tool[] = [
  {
    name: "agendar_cita",
    description:
      "Agenda una cita/consulta veterinaria (demo). Úsala cuando el usuario quiera reservar una cita.",
    input_schema: {
      type: "object",
      properties: {
        servicio: { type: "string", description: "Ej: Consulta general, Vacunación, Cirugía, Urgencia" },
        mascota: { type: "string", description: "Nombre de la mascota" },
        especie: { type: "string", description: "Perro o Gato" },
        sede: { type: "string", description: "Sede Navarra o Sede San Patricio" },
        fecha: { type: "string", description: "Fecha legible, ej: 'miércoles 24 jul'" },
        hora: { type: "string", description: "Hora, ej: '10:30 a.m.'" },
      },
      required: [],
    },
  },
  {
    name: "evaluar_urgencia",
    description:
      "Evalúa el nivel de urgencia a partir de los síntomas descritos (demo triage).",
    input_schema: {
      type: "object",
      properties: {
        sintomas: { type: "string", description: "Resumen de los síntomas del usuario" },
        nivel: { type: "string", enum: ["verde", "ambar", "rojo"] },
        recomendacion: { type: "string", description: "Recomendación breve" },
        pasos: { type: "array", items: { type: "string" }, description: "3 pasos concretos" },
      },
      required: ["sintomas", "nivel"],
    },
  },
  {
    name: "plan_vacunas",
    description: "Genera el carnet y plan de vacunación de la mascota (demo).",
    input_schema: {
      type: "object",
      properties: {
        nombre: { type: "string", description: "Nombre de la mascota" },
        especie: { type: "string", enum: ["Perro", "Gato"] },
        edadMeses: { type: "number", description: "Edad en meses" },
      },
      required: [],
    },
  },
  {
    name: "reordenar_farmacia",
    description: "Arma un pedido de farmacia (alimento/medicamentos) para recoger o domicilio (demo).",
    input_schema: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              producto: { type: "string" },
              cantidad: { type: "number" },
            },
          },
        },
        entrega: { type: "string", enum: ["domicilio", "recoger"] },
      },
      required: [],
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "no_key" }, { status: 200 });
    }

    const client = new Anthropic();

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM,
      tools,
      messages: messages.slice(-12).map((m) => ({ role: m.role, content: m.content })),
    });

    let text = "";
    let tool: { name: string; input: Record<string, any> } | null = null;
    for (const block of response.content) {
      if (block.type === "text") text += block.text;
      else if (block.type === "tool_use" && !tool) {
        tool = { name: block.name, input: block.input as Record<string, any> };
      }
    }

    return NextResponse.json({ text: text.trim(), tool });
  } catch (err: any) {
    console.error("[kani/api] error:", err?.message || err);
    return NextResponse.json({ error: "api_error" }, { status: 200 });
  }
}
