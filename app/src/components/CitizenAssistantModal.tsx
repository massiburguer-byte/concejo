import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  ArrowRight,
  FileText
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: { text: string; href: string };
}

const KNOWLEDGE_BASE: Record<string, { answer: string; href?: string; linkText?: string; suggestions?: string[] }> = {
  movilidad: {
    answer: "La Ordenanza de Convivencia y Seguridad Vial de Maneiro regula el tránsito urbano, zonas de estacionamiento en Pampatar y avenidas principales, y normas de respeto peatonal. Busca ordenar el flujo vehicular y promover una movilidad segura para vecinos y turistas.",
    href: "#ordenanzas",
    linkText: "Ver Ordenanza de Convivencia Vial",
    suggestions: ["¿Qué rige sobre ruidos molestos?", "¿Cómo pagar impuestos de vehículos?", "Horarios de atención"]
  },
  ruidos: {
    answer: "La iniciativa 'Cero Ruidos Molestos' y la Ordenanza de Convivencia Ciudadana regulan los niveles de decibeles permitidos en zonas residenciales y comerciales de Maneiro. Protege el descanso vecinal, especialmente en horas nocturnas en Pampatar, Playa El Ángel y Los Robles.",
    href: "#ordenanzas",
    linkText: "Consultar Normativa de Convivencia",
    suggestions: ["Reportar un incidente vecinal", "Ordenanza de Movilidad", "Hablar con un concejal"]
  },
  concejales: {
    answer: "El Concejo Municipal de Maneiro está presidido por la Concejala Carolina Guerra, con Eulys Cedeño (1ra Vicepresidenta), José Gregorio Marcano (2do Vicepresidente), y los concejales Haroldo Rojas, Asdrúbal Delgado, Gilberto Rojas y Ana González.",
    href: "#concejales",
    linkText: "Ver Galería de Concejales",
    suggestions: ["¿Cuándo son las sesiones?", "Comisiones de trabajo", "Contacto directo"]
  },
  sesiones: {
    answer: "El Concejo Municipal celebra sesiones ordinarias semanales en el Salón de Sesiones de la sede legislativa en Pampatar. Las sesiones son públicas y abiertas a la participación ciudadana mediante el derecho de palabra vecinal.",
    href: "#contacto",
    linkText: "Solicitar derecho de palabra",
    suggestions: ["¿Quiénes son los concejales?", "¿Dónde queda la sede?", "Ver ordenanzas aprobadas"]
  },
  sede: {
    answer: "La sede del Concejo Municipal de Maneiro está ubicada en la Calle Joaquín Maneiro, frente a la Plaza de Armas de Pampatar, Municipio Maneiro, Isla de Margarita, Nueva Esparta. Horario de atención: Lunes a Viernes de 8:00 AM a 4:00 PM.",
    href: "#contacto",
    linkText: "Ver Mapa y Datos de Contacto",
    suggestions: ["Teléfono de contacto", "Escribir por WhatsApp", "¿Qué trámites puedo hacer?"]
  },
  ordenanzas: {
    answer: "En nuestro portal digital disponemos de más de 30 ordenanzas oficiales aprobadas en formato PDF descargable, organizadas por años (2018 a 2026) y categorías: Hacienda y Finanzas, Planeamiento Urbano, Seguridad y Desarrollo Social.",
    href: "#ordenanzas",
    linkText: "Ir al Buscador de Ordenanzas",
    suggestions: ["Ordenanza de Movilidad", "Impuestos de Actividades Económicas", "Tasas y Servicios"]
  },
  impuestos: {
    answer: "Las ordenanzas de actividades económicas, inmuebles urbanos y aseo domiciliario establecen los procedimientos y beneficios tributarios vigentes para comerciantes y residentes del municipio Maneiro gestionados junto a SEDEMATRI.",
    href: "#ordenanzas",
    linkText: "Ver Ordenanzas de Hacienda",
    suggestions: ["Ordenanza de Aseo", "Registro de Contribuyentes", "Horarios de atención"]
  }
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "bot",
    text: "¡Hola! Soy el Asistente Digital del Concejo Municipal de Maneiro 🏛️. ¿En qué puedo orientarte hoy?",
    timestamp: "Ahora",
    suggestions: [
      "🚌 Ordenanza de Movilidad",
      "🔇 Cero Ruidos Molestos",
      "👥 Concejales y Comisiones",
      "📜 Consultar Gacetas",
      "📍 Ubicación y Horarios"
    ]
  }
];

interface CitizenAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTag?: (query: string) => void;
}

export default function CitizenAssistantModal({ open, onOpenChange }: CitizenAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      setTimeout(scrollToBottom, 200);
    }
  }, [messages, open]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let match = null;

      if (lower.includes("movilidad") || lower.includes("tránsito") || lower.includes("vial") || lower.includes("carro") || lower.includes("estacion")) {
        match = KNOWLEDGE_BASE.movilidad;
      } else if (lower.includes("ruido") || lower.includes("molest") || lower.includes("musica") || lower.includes("sonido") || lower.includes("convivencia")) {
        match = KNOWLEDGE_BASE.ruidos;
      } else if (lower.includes("concejal") || lower.includes("asdrubal") || lower.includes("carolina") || lower.includes("cuerpo") || lower.includes("quienes")) {
        match = KNOWLEDGE_BASE.concejales;
      } else if (lower.includes("sesion") || lower.includes("camara") || lower.includes("palabra") || lower.includes("reunion")) {
        match = KNOWLEDGE_BASE.sesiones;
      } else if (lower.includes("donde") || lower.includes("horario") || lower.includes("sede") || lower.includes("ubicacion") || lower.includes("pampatar")) {
        match = KNOWLEDGE_BASE.sede;
      } else if (lower.includes("ordenanza") || lower.includes("gaceta") || lower.includes("ley") || lower.includes("documento")) {
        match = KNOWLEDGE_BASE.ordenanzas;
      } else if (lower.includes("impuesto") || lower.includes("tasa") || lower.includes("tribut") || lower.includes("sedematri") || lower.includes("pago")) {
        match = KNOWLEDGE_BASE.impuestos;
      }

      let botResponse: Message;

      if (match) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: match.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: match.suggestions,
          actionLink: match.href ? { text: match.linkText || "Ver más", href: match.href } : undefined
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Con gusto puedo orientarte sobre ese tema. El Concejo Municipal de Maneiro trabaja continuamente en el marco legal del municipio. Puedes consultar nuestras ordenanzas oficiales, revisar las comisiones de trabajo de los concejales o comunicarte directamente con Atención al Vecino.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionLink: { text: "Ir a Atención al Vecino", href: "#contacto" },
          suggestions: ["Consultar Ordenanzas", "Ver Concejales", "Horarios de Atención"]
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleLinkClick = (href: string) => {
    onOpenChange(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[88vh] p-0 overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#1e3a8a] p-5 text-white flex items-center justify-between relative">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-emerald-400">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base font-bold text-white tracking-tight">
                  Asistente Vecinal Maneiro IA
                </DialogTitle>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Activo 24/7
                </span>
              </div>
              <DialogDescription className="text-xs text-white/70">
                Orientación sobre ordenanzas, trámites y atención ciudadana
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#f8fafc] max-h-[50vh]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-end gap-2 max-w-[85%]">
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs flex-shrink-0 mb-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white rounded-br-none shadow-md"
                      : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {m.actionLink && (
                    <button
                      onClick={() => handleLinkClick(m.actionLink!.href)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      {m.actionLink.text}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {m.suggestions && m.suggestions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 pl-9">
                  {m.suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(s)}
                      className="text-[11px] font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 px-2.5 py-1 rounded-full transition-all hover:border-blue-400 hover:text-blue-600 shadow-2xs"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 pl-9 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
              <span>Consultando marco municipal...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer input */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80 flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Pregunta sobre ordenanzas, trámites, concejales..."
            className="flex-1 rounded-full border-slate-200 bg-slate-50 focus-visible:ring-blue-500 text-xs sm:text-sm px-4 h-11"
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="rounded-full bg-slate-900 hover:bg-blue-600 text-white w-11 h-11 p-0 flex items-center justify-center shrink-0 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
