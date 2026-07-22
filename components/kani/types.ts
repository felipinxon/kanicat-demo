export type Role = "user" | "assistant";

export type CitaCard = {
  kind: "cita";
  servicio: string;
  mascota: string;
  especie: string;
  sede: string;
  fecha: string;
  hora: string;
};

export type TriageCard = {
  kind: "triage";
  sintomas: string;
  nivel: "verde" | "ambar" | "rojo";
  recomendacion: string;
  pasos: string[];
};

export type VacunaRow = {
  vacuna: string;
  cuando: string;
  estado: "aplicada" | "proxima" | "pendiente";
};

export type VacunasCard = {
  kind: "vacunas";
  nombre: string;
  especie: string;
  edadMeses: number;
  plan: VacunaRow[];
};

export type PedidoItem = { nombre: string; cantidad: number; precio: number };
export type PedidoCard = {
  kind: "pedido";
  items: PedidoItem[];
  total: number;
  entrega: "domicilio" | "recoger";
};

export type ActionCard = CitaCard | TriageCard | VacunasCard | PedidoCard;

export type ChatMessage = {
  id: string;
  role: Role;
  text?: string;
  card?: ActionCard;
  pending?: boolean;
};

export const uid = () => Math.random().toString(36).slice(2, 10);
