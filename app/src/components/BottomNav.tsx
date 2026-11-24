import { useState, useEffect } from "react";
import { 
  Home, 
  FileText, 
  Users, 
  Bot, 
  MessageSquare
} from "lucide-react";
import CitizenAssistantModal from "@/components/CitizenAssistantModal";
import AtencionVecinoModal from "@/components/AtencionVecinoModal";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [vecinoModalOpen, setVecinoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "ordenanzas", "concejales", "contacto"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 300) {
          setActiveTab(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav 
        aria-label="Navegación móvil inferior"
        className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-full px-3 py-2 flex items-center justify-around transition-all"
      >
        {/* 1. Inicio */}
        <button
          onClick={() => scrollTo("inicio")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full transition-all ${
            activeTab === "inicio"
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Inicio</span>
        </button>

        {/* 2. Ordenanzas */}
        <button
          onClick={() => scrollTo("ordenanzas")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full transition-all ${
            activeTab === "ordenanzas"
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Leyes</span>
        </button>

        {/* 3. Center Highlight: Asistente IA */}
        <button
          onClick={() => setAiModalOpen(true)}
          className="relative -top-3.5 bg-slate-900 text-white w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all border-2 border-white"
          title="Asistente Vecinal IA"
        >
          <Bot className="w-5 h-5 text-emerald-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1 right-1 border border-slate-900 animate-pulse" />
        </button>

        {/* 4. Concejales */}
        <button
          onClick={() => scrollTo("concejales")}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full transition-all ${
            activeTab === "concejales"
              ? "text-blue-600 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Users className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">Cámara</span>
        </button>

        {/* 5. Atención al Vecino */}
        <button
          onClick={() => setVecinoModalOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full text-slate-500 hover:text-emerald-700 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] tracking-tight font-medium">Atención</span>
        </button>
      </nav>

      {/* Modals triggered from Mobile Nav */}
      <CitizenAssistantModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
      />
      <AtencionVecinoModal
        open={vecinoModalOpen}
        onOpenChange={setVecinoModalOpen}
      />
    </>
  );
}
