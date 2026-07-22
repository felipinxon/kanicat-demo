// ————————————————————————————————————————————————————————————————
//  KANICAT · Clínica Veterinaria — Fuente única de contenido (demo)
// ————————————————————————————————————————————————————————————————

export const clinic = {
  name: "Kanicat",
  legal: "Kanicat · Clínica Veterinaria en Valle S.A.S",
  tagline: "Donde la ciencia se mezcla con mucho amor animal",
  founded: 2000,
  yearsLabel: "25+ años",
  founder: {
    name: "Dr. Enrique Vallejo",
    role: "Fundador y Director Médico",
    bio: "Biólogo de la Universidad Javeriana y Médico Veterinario de la Universidad de La Salle, con internados en cirugía y ortopedia en Colorado State University y en medicina interna en la UNAM (México), y especialización en administración de salud en la EAN.",
  },
  phones: ["(601) 744 3472", "(601) 214 2991"],
  whatsapp: "573000000000", // demo
  email: "inventario@kanicat.com",
  instagram: "kanicatcv",
  website: "www.kanicat.com",
  hours: [
    { d: "Lunes a Sábado", h: "7:30 a.m. – 8:30 p.m." },
    { d: "Domingo", h: "8:00 a.m. – 8:00 p.m." },
    { d: "Urgencias", h: "24 horas · 7 días" },
  ],
};

export const stats = [
  { value: "25+", label: "años cuidando familias", sub: "desde el año 2000" },
  { value: "+1.200", label: "familias felices", sub: "perros y gatos" },
  { value: "4.9", label: "en reseñas", sub: "cientos de opiniones" },
  { value: "24/7", label: "urgencias abiertas", sub: "todos los días" },
];

export type Service = {
  slug: string;
  title: string;
  icon: string; // lucide-react icon name
  blurb: string;
  image?: string;
  span?: string; // bento column/row span classes
  accent: "purple" | "green" | "sky" | "gold";
};

export const services: Service[] = [
  {
    slug: "urgencias",
    title: "Urgencias 24/7",
    icon: "Siren",
    blurb:
      "Equipo de guardia toda la noche, todos los días. Triage inmediato y estabilización en minutos.",
    image: "/images/gallery/vet-4.jpg",
    span: "md:col-span-2 md:row-span-2",
    accent: "purple",
  },
  {
    slug: "consulta",
    title: "Consulta externa",
    icon: "Stethoscope",
    blurb: "Medicina general y preventiva para perros y gatos, con historia clínica digital.",
    image: "/images/gallery/vet-1.jpg",
    accent: "green",
  },
  {
    slug: "cirugia",
    title: "Cirugía y quirófano",
    icon: "Syringe",
    blurb: "Quirófano equipado, anestesia monitorizada y cirugía general y ortopédica.",
    image: "/images/gallery/vet-5.jpg",
    span: "md:col-span-1 md:row-span-2",
    accent: "sky",
  },
  {
    slug: "hospitalizacion",
    title: "Hospitalización & UCI",
    icon: "Activity",
    blurb: "Áreas separadas para caninos y felinos, observación y cuidados intensivos.",
    accent: "purple",
  },
  {
    slug: "laboratorio",
    title: "Laboratorio clínico",
    icon: "FlaskConical",
    blurb: "Resultados confiables y rápidos que apoyan cada diagnóstico.",
    accent: "green",
  },
  {
    slug: "imagenes",
    title: "Imágenes diagnósticas",
    icon: "ScanLine",
    blurb: "Rayos X, ecografía, endoscopia y laparoscopia de alta precisión.",
    image: "/images/gallery/cat-4.jpg",
    span: "md:col-span-2",
    accent: "sky",
  },
  {
    slug: "vacunacion",
    title: "Vacunación",
    icon: "ShieldCheck",
    blurb: "Planes individualizados según la etapa y estilo de vida de tu mascota.",
    accent: "gold",
  },
  {
    slug: "farmacia",
    title: "Farmacia veterinaria",
    icon: "Pill",
    blurb: "Alimento terapéutico, medicamentos y accesorios con entrega a domicilio.",
    accent: "green",
  },
];

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Alimento" | "Suplemento" | "Medicamento" | "Accesorio";
  species: "Perro" | "Gato" | "Perro y Gato";
  price: number; // COP (demo)
  image: string;
  tag?: string;
};

export const products: Product[] = [
  {
    id: "hills-id-perro",
    name: "Hill's i/d · Cuidado digestivo",
    brand: "Hill's Prescription Diet",
    category: "Alimento",
    species: "Perro",
    price: 18900,
    image: "/images/gallery/dogcat-2.jpg",
    tag: "Más pedido",
  },
  {
    id: "hills-id-gato",
    name: "Hill's i/d · Cuidado digestivo",
    brand: "Hill's Prescription Diet",
    category: "Alimento",
    species: "Gato",
    price: 17500,
    image: "/images/gallery/cat-3.jpg",
  },
  {
    id: "hills-cd-gato",
    name: "Hill's c/d Multicare · Urinario",
    brand: "Hill's Prescription Diet",
    category: "Alimento",
    species: "Gato",
    price: 19900,
    image: "/images/gallery/cat-1.jpg",
  },
  {
    id: "hills-ld-perro",
    name: "Hill's l/d · Cuidado hepático",
    brand: "Hill's Prescription Diet",
    category: "Alimento",
    species: "Perro",
    price: 21500,
    image: "/images/gallery/puppy-2.jpg",
  },
  {
    id: "organew",
    name: "Organew · Vitaminas y enzimas",
    brand: "Vetnil",
    category: "Suplemento",
    species: "Perro y Gato",
    price: 14200,
    image: "/images/gallery/petfamily.jpg",
    tag: "Recomendado",
  },
  {
    id: "enterex",
    name: "Enterex · Soporte digestivo",
    brand: "Vetnil",
    category: "Suplemento",
    species: "Perro y Gato",
    price: 9800,
    image: "/images/gallery/dogcat-3.jpg",
  },
];

export type Review = {
  name: string;
  pet: string;
  stars: number;
  text: string;
  source: string;
};

export const reviews: Review[] = [
  {
    name: "Laura M.",
    pet: "mamá de Kira 🐱",
    stars: 5,
    text: "Excelente servicio. 100% recomendado. El personal humano de veterinarios es maravilloso y se nota que aman lo que hacen.",
    source: "Google",
  },
  {
    name: "Andrés G.",
    pet: "papá de Rocco 🐶",
    stars: 5,
    text: "Presta un buen servicio y tiene un excelente equipo de veterinarios. Nos atendieron una urgencia a medianoche. Recomendada ampliamente.",
    source: "Google",
  },
  {
    name: "Valentina R.",
    pet: "mamá de Luna 🐱",
    stars: 5,
    text: "El servicio es excelente y los productos son de buena calidad. Llevo años trayendo a mis gatos y siempre salgo tranquila.",
    source: "Google",
  },
  {
    name: "Camilo P.",
    pet: "papá de Thor 🐶",
    stars: 5,
    text: "Profesionalismo y calidez. El Dr. Vallejo y su equipo explican todo con paciencia. Mi perro llegó grave y hoy está perfecto.",
    source: "Facebook",
  },
  {
    name: "Daniela S.",
    pet: "mamá de Michi 🐱",
    stars: 5,
    text: "La mejor clínica del norte de Bogotá. Instalaciones impecables y atención 24 horas de verdad. Gracias por cuidar a mi familia.",
    source: "Google",
  },
  {
    name: "Julián T.",
    pet: "papá de Nala 🐶",
    stars: 5,
    text: "Agendé por WhatsApp, me recordaron la cita y la vacunación al día. Muy organizados y súper amables. ¡Un 10!",
    source: "Instagram",
  },
];

export type Location = {
  name: string;
  address: string;
  zone: string;
  phone: string;
  lat: number;
  lng: number;
  image: string;
  mapsUrl: string;
};

export const locations: Location[] = [
  {
    name: "Sede Navarra",
    address: "Cra. 45 #106B-04",
    zone: "CAI Navarra · Usaquén (Autopista Norte)",
    phone: "(601) 744 3472",
    lat: 4.6969,
    lng: -74.0428,
    image: "/images/sede-sign.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kanicat+Clinica+Veterinaria+Navarra+Bogota",
  },
  {
    name: "Sede San Patricio",
    address: "Cra. 9 #117A-77",
    zone: "San Patricio · Usaquén",
    phone: "(601) 214 2991",
    lat: 4.6912,
    lng: -74.0375,
    image: "/images/gallery/vet-1.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kanicat+Clinica+Veterinaria+San+Patricio+Bogota",
  },
];

export const galleryImages: { src: string; alt: string }[] = [
  { src: "/images/gallery/hug-2.jpg", alt: "Familia abrazando a su perro" },
  { src: "/images/gallery/cat-3.jpg", alt: "Gato naranja feliz" },
  { src: "/images/gallery/puppy-1.jpg", alt: "Cachorro golden retriever" },
  { src: "/images/gallery/dogcat-3.jpg", alt: "Perro y gato en casa" },
  { src: "/images/gallery/vet-5.jpg", alt: "Equipo médico en quirófano" },
  { src: "/images/gallery/cat-5.jpg", alt: "Gato descansando" },
  { src: "/images/gallery/hug-3.jpg", alt: "Dueño con su perro" },
  { src: "/images/gallery/puppy-3.jpg", alt: "Cachorro entre flores" },
  { src: "/images/gallery/petfamily.jpg", alt: "Perro y gato juntos" },
  { src: "/images/gallery/vet-1.jpg", alt: "Consulta veterinaria" },
  { src: "/images/gallery/cat-1.jpg", alt: "Gato atigrado" },
  { src: "/images/gallery/hug-1.jpg", alt: "Mujer con su labrador" },
];

export const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Kani IA", href: "#kani" },
  { name: "Farmacia", href: "#farmacia" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Sedes", href: "#sedes" },
];

export const cop = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
