# Kanicat · Demo de rediseño web

Rediseño completo (demo) del sitio de **Kanicat · Clínica Veterinaria** (Bogotá), con UI/UX moderna, tienda/farmacia y un **asistente con IA ("Kani")** que ejecuta acciones demostrativas: agendar citas, triage de urgencias, plan de vacunas y pedidos de farmacia.

> ⚠️ Es una **demostración**. Las acciones del asistente son simuladas y los precios son de ejemplo.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **Framer Motion**
- Componentes al estilo **Aceternity UI** (navbar redimensionable, spotlight, bento grid, text-flip, gooey input, following pointer, dotted glow)
- Backend del chat: **Anthropic Claude** (`/api/chat`, tool-use) con fallback local

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

Sin `ANTHROPIC_API_KEY` el chat funciona en modo demo local (fallback por palabras clave).
Para conectar a Claude, copia `.env.example` a `.env.local` y define la clave.

## Producción

```bash
npm run build && npm run start
```

Se despliega con **Docker** (`output: standalone`) — ver `Dockerfile`. En Coolify se define
`ANTHROPIC_API_KEY` (y opcional `KANI_MODEL`) como variable de entorno.

## Marca

Colores tomados del logo real de Kanicat: morado `#6E2E92` + verde `#4FA83C`, con acentos
celeste `#2FA9DE` y amarillo `#F2CE3B`.
