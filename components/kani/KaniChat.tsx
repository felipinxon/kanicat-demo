"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CalendarPlus, Siren, Syringe, ShoppingBag, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { ActionCardView } from "./action-cards";
import { buildFromTool, localIntent } from "./executor";
import { ChatMessage, uid } from "./types";
import { cn } from "@/lib/utils";

const quickActions = [
  { icon: CalendarPlus, label: "Agendar cita", prompt: "Quiero agendar una cita para mi mascota 🐶" },
  { icon: Siren, label: "¿Es urgencia?", prompt: "Mi perro está decaído y no quiere comer, ¿es urgente?" },
  { icon: Syringe, label: "Plan de vacunas", prompt: "¿Qué vacunas necesita mi gatito de 3 meses?" },
  { icon: ShoppingBag, label: "Reordenar farmacia", prompt: "Quiero reordenar alimento Hill's para mi perro" },
];

const greeting: ChatMessage = {
  id: "greet",
  role: "assistant",
  text: "¡Hola! Soy Kani, la asistente con IA de Kanicat 💜 Puedo agendar citas, orientarte en una urgencia, armar el plan de vacunas o preparar un pedido de farmacia. ¿En qué te ayudo hoy?",
};

export function KaniChat({
  className,
  initialPrompt,
  compact = false,
}: {
  className?: string;
  initialPrompt?: string;
  compact?: boolean;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastPrompt = useRef<string | undefined>(undefined);

  const scrollDown = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollDown();
  }, [messages, loading, scrollDown]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;

      const userMsg: ChatMessage = { id: uid(), role: "user", text };
      const newHistory = [...history, { role: "user" as const, content: text }];
      setMessages((m) => [...m, userMsg]);
      setHistory(newHistory);
      setInput("");
      setLoading(true);

      let reply = "";
      let card: ChatMessage["card"] | undefined;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newHistory }),
        });
        const data = await res.json();

        if (data?.error || (!data?.text && !data?.tool)) {
          const built = localIntent(text);
          reply = built.reply;
          card = built.card;
        } else if (data.tool) {
          const built = buildFromTool(data.tool.name, data.tool.input || {}) ?? localIntent(text);
          reply = (data.text && data.text.length > 0 ? data.text : built.reply) as string;
          card = built.card;
        } else {
          reply = data.text;
        }
      } catch {
        const built = localIntent(text);
        reply = built.reply;
        card = built.card;
      }

      // pequeño retardo natural
      await new Promise((r) => setTimeout(r, 260));

      setMessages((m) => [...m, { id: uid(), role: "assistant", text: reply, card }]);
      setHistory((h) => [...h, { role: "assistant", content: card ? `${reply} [acción ejecutada]` : reply }]);
      setLoading(false);
    },
    [history, loading]
  );

  // Prompt inicial (desde un CTA externo)
  useEffect(() => {
    if (initialPrompt && initialPrompt !== lastPrompt.current) {
      lastPrompt.current = initialPrompt;
      send(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Mensajes */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4 no-scrollbar"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} m={m} />
        ))}

        {loading && (
          <div className="flex items-end gap-2">
            <KaniAvatar />
            <div className="rounded-2xl rounded-bl-md border border-brand-purple-100 bg-white px-4 py-3 shadow-sm">
              <span className="flex gap-1">
                <span className="typing-dot h-2 w-2 rounded-full bg-brand-purple-400" />
                <span className="typing-dot h-2 w-2 rounded-full bg-brand-purple-400" style={{ animationDelay: "0.15s" }} />
                <span className="typing-dot h-2 w-2 rounded-full bg-brand-purple-400" style={{ animationDelay: "0.3s" }} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick actions (solo al inicio) */}
      {messages.length <= 1 && !loading && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {quickActions.map((q) => (
            <button
              key={q.label}
              onClick={() => send(q.prompt)}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple-200 bg-brand-purple-50 px-3 py-1.5 text-xs font-semibold text-brand-purple-700 transition-colors hover:bg-brand-purple-100"
            >
              <q.icon className="h-3.5 w-3.5" />
              {q.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-brand-purple-100 bg-white/80 p-3 backdrop-blur"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escríbele a Kani…"
          className="flex-1 rounded-full border border-brand-purple-200 bg-white px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-purple-400 focus:outline-none focus:ring-2 focus:ring-brand-purple-200"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple-600 to-brand-green-600 text-white transition-transform hover:scale-105 disabled:opacity-40"
          aria-label="Enviar"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
      {!compact && (
        <p className="bg-white/80 px-4 pb-2 text-center text-[10px] text-brand-ink/40">
          <Sparkles className="mr-1 inline h-3 w-3" /> Demo con IA · las acciones son simuladas
        </p>
      )}
    </div>
  );
}

function KaniAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm">
      <LogoMark className="h-8 w-8" />
    </div>
  );
}

function MessageBubble({ m }: { m: ChatMessage }) {
  const isUser = m.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}
    >
      {isUser ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-ink text-xs font-bold text-white">
          Tú
        </div>
      ) : (
        <KaniAvatar />
      )}
      <div className={cn("max-w-[82%]", isUser && "flex flex-col items-end")}>
        {m.text && (
          <div
            className={cn(
              "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
              isUser
                ? "rounded-br-md bg-gradient-to-br from-brand-purple-600 to-brand-purple-700 text-white"
                : "rounded-bl-md border border-brand-purple-100 bg-white text-brand-ink"
            )}
          >
            {m.text}
          </div>
        )}
        {m.card && <ActionCardView card={m.card} />}
      </div>
    </motion.div>
  );
}
