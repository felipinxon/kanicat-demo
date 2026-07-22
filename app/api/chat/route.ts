import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Reutiliza la API de OpenAI ya disponible en el servidor (app panoramax).
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const SYSTEM = `Eres "Kani", la asistente virtual con IA de **Kanicat · Clínica Veterinaria** en Bogotá (sedes CAI Navarra/Usaquén y San Patricio). Esto es una DEMOSTRACIÓN: las acciones que ejecutas son simuladas, pero deben sentirse reales y útiles.

Tono: cálido, cercano y profesional. Español colombiano. Respuestas BREVES (1-3 frases), con algún emoji ocasional (💜🐾). Nunca inventes precios de servicios médicos; para productos usa los de la farmacia.

Datos de Kanicat:
- 25+ años de experiencia. Fundada por el Dr. Enrique Vallejo. +1.200 familias, 4.9★.
- Sedes: "Sede Navarra" (Cra. 45 #106B-04, Autopista Norte) y "Sede San Patricio" (Cra. 9 #117A-77).
- Horario: Lun-Sáb 7:30-20:30, Dom 8:00-20:00. URGENCIAS 24/7.
- Servicios: consulta, urgencias 24/7, cirugía, hospitalización/UCI, laboratorio, imágenes (rayos X, ecografía, endoscopia, laparoscopia), vacunación y farmacia.
- Farmacia: alimento terapéutico (Hill's i/d, c/d, l/d, a/d), suplementos (Organew, Enterex), medicamentos y accesorios.

Usa las funciones cuando corresponda:
- agendar_cita: cuando el usuario quiera reservar/agendar una cita.
- evaluar_urgencia: cuando describa síntomas. Evalúa nivel (verde=leve, ambar=atención pronto, rojo=posible urgencia) y da 3 pasos. NO diagnostiques definitivamente; ante rojo, indica acudir a urgencias 24/7.
- plan_vacunas: cuando pregunte por vacunas, refuerzos o carnet.
- reordenar_farmacia: cuando quiera comprar/reordenar alimento o productos.

Tras usar una función, añade una frase breve confirmando la acción. Para preguntas generales (ubicación, horarios, servicios) responde directamente sin función.`;

const tools = [
  {
    type: "function",
    function: {
      name: "agendar_cita",
      description: "Agenda una cita/consulta veterinaria (demo).",
      parameters: {
        type: "object",
        properties: {
          servicio: { type: "string", description: "Ej: Consulta general, Vacunación, Cirugía, Urgencia" },
          mascota: { type: "string" },
          especie: { type: "string", description: "Perro o Gato" },
          sede: { type: "string", description: "Sede Navarra o Sede San Patricio" },
          fecha: { type: "string", description: "Ej: 'miércoles 24 jul'" },
          hora: { type: "string", description: "Ej: '10:30 a.m.'" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "evaluar_urgencia",
      description: "Evalúa el nivel de urgencia a partir de los síntomas (demo triage).",
      parameters: {
        type: "object",
        properties: {
          sintomas: { type: "string" },
          nivel: { type: "string", enum: ["verde", "ambar", "rojo"] },
          recomendacion: { type: "string" },
          pasos: { type: "array", items: { type: "string" } },
        },
        required: ["sintomas", "nivel"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "plan_vacunas",
      description: "Genera el carnet y plan de vacunación de la mascota (demo).",
      parameters: {
        type: "object",
        properties: {
          nombre: { type: "string" },
          especie: { type: "string", enum: ["Perro", "Gato"] },
          edadMeses: { type: "number" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "reordenar_farmacia",
      description: "Arma un pedido de farmacia para recoger o domicilio (demo).",
      parameters: {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: {
              type: "object",
              properties: { producto: { type: "string" }, cantidad: { type: "number" } },
            },
          },
          entrega: { type: "string", enum: ["domicilio", "recoger"] },
        },
      },
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "no_key" }, { status: 200 });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM }, ...messages.slice(-12)],
        tools,
        tool_choice: "auto",
        temperature: 0.6,
        max_tokens: 700,
      }),
    });

    if (!res.ok) {
      console.error("[kani/api] openai error", res.status, await res.text());
      return NextResponse.json({ error: "api_error" }, { status: 200 });
    }

    const data = await res.json();
    const msg = data?.choices?.[0]?.message;
    let text: string = (msg?.content || "").trim();
    let tool: { name: string; input: Record<string, any> } | null = null;

    const call = msg?.tool_calls?.[0];
    if (call?.function?.name) {
      let input: Record<string, any> = {};
      try {
        input = JSON.parse(call.function.arguments || "{}");
      } catch {
        input = {};
      }
      tool = { name: call.function.name, input };
    }

    return NextResponse.json({ text, tool });
  } catch (err: any) {
    console.error("[kani/api] error:", err?.message || err);
    return NextResponse.json({ error: "api_error" }, { status: 200 });
  }
}
