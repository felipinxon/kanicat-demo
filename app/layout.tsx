import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanicat · Clínica Veterinaria en Bogotá | Urgencias 24/7",
  description:
    "Kanicat: 25+ años cuidando perros y gatos en Bogotá. Urgencias 24/7, cirugía, laboratorio, imágenes y farmacia. Agenda con Kani, nuestra asistente con IA. (Demo de rediseño)",
  keywords: [
    "veterinaria Bogotá",
    "urgencias veterinarias 24 horas",
    "clínica veterinaria Usaquén",
    "Kanicat",
  ],
  openGraph: {
    title: "Kanicat · Clínica Veterinaria en Bogotá",
    description:
      "25+ años cuidando familias. Urgencias 24/7 y una asistente con IA que agenda, orienta y acompaña.",
    type: "website",
    locale: "es_CO",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#6E2E92",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-brand-cream font-sans text-brand-ink antialiased">
        {children}
      </body>
    </html>
  );
}
