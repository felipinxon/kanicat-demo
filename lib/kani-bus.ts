// Bus de eventos minimalista para abrir el asistente Kani desde cualquier CTA.
export function openKani(prompt?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("kani:open", { detail: { prompt } }));
  }
}
