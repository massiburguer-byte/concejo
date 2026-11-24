import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  Plus, 
  Compass, 
  Bot,
  Users,
  Sun,
  Moon
} from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";
import CitizenAssistantModal from "@/components/CitizenAssistantModal";
import AtencionVecinoModal from "@/components/AtencionVecinoModal";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { 
    label: "Concejo",
    submenu: [
      { href: "#concejales", label: "Concejales" },
      { href: "#organigrama", label: "Organigrama" },
      { href: "#ordenanzas", label: "Ordenanzas y Gacetas" },
    ]
  },
  { href: "#ordenanzas", label: "Ordenanzas" },
  { href: "#noticias", label: "Noticias" },
  { href: "#redes", label: "Redes" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isConcejoOpen, setIsConcejoOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [vecinoModalOpen, setVecinoModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { isEasyRead, toggleEasyRead } = useAccessibility();

  useEffect(() => {
    const isDarkSaved = localStorage.getItem("theme") === "dark";
    if (isDarkSaved) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDark = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const flatLinks = navLinks.flatMap(l => l.submenu ? l.submenu : l);
      const sections = flatLinks.map((l) => l.href.replace("#", ""));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 180) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    setIsConcejoOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Native App Top Status Bar Gradient (SafeArea on Mobile) */}
      <div className="fixed top-0 inset-x-0 h-[env(safe-area-inset-top,0px)] bg-gradient-to-r from-slate-950 via-[#0a192f] to-[#0d2242] z-[60]" />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-[env(safe-area-inset-top,0px)] left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-slate-950 via-[#0a192f] to-[#11294d] text-white py-2.5 sm:py-3 shadow-xl border-b border-white/10 backdrop-blur-xl"
            : "bg-gradient-to-r from-[#0a192f] via-[#0d2242] to-[#153460] text-white py-3 sm:py-3.5 border-b border-white/10 shadow-lg backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Verified Badge */}
          <a
            href="#inicio"
            onClick={(e) => handleClick(e, "#inicio")}
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="relative p-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 shadow-sm">
                <img 
                  src="/images/logo.png" 
                  alt="Logo Concejo Municipal Maneiro" 
                  className="h-[34px] sm:h-[42px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow" 
                />
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.submenu ? (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setIsConcejoOpen(true)}
                  onMouseLeave={() => setIsConcejoOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-full ${
                      link.submenu.some(s => s.href.replace("#", "") === activeSection)
                        ? "text-blue-700 bg-blue-50 font-extrabold"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isConcejoOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isConcejoOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
                      >
                        <div className="p-2 flex flex-col gap-1">
                          {link.submenu.map((sub) => (
                            <a
                              key={sub.href}
                              href={sub.href}
                              onClick={(e) => handleClick(e, sub.href)}
                              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                activeSection === sub.href.replace("#", "")
                                  ? "bg-blue-600 text-white font-bold"
                                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                              }`}
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href!)}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-full ${
                    activeSection === link.href!.replace("#", "")
                      ? "text-blue-700 bg-blue-50 font-extrabold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Right Action Icons (Matching the design in the user screenshot with premium gradient style) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* 1. Chat / IA Message Bubble with green badge */}
            <button
              onClick={() => setAiModalOpen(true)}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Asistente Ciudadano IA"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              {/* Green notification pill/dot */}
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a192f] flex items-center justify-center text-[9px] font-bold text-white shadow-2xs">
                0
              </span>
            </button>

            {/* 2. Plus icon (Atención Vecino Express) */}
            <button
              onClick={() => setVecinoModalOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Atención al Vecino / Solicitud"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>

            {/* 3. Compass / Explore Ordenanzas */}
            <button
              onClick={() => {
                const el = document.querySelector("#ordenanzas");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Explorar Ordenanzas"
            >
              <Compass className="w-4 h-4 text-white" />
            </button>

            {/* 4. Dark / Light Mode Toggle */}
            <button
              onClick={toggleDark}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
              title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              aria-label="Alternar tema"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-white" />}
            </button>

            {/* 5. Accessibility Mode */}
            <button
              onClick={toggleEasyRead}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all border ${
                isEasyRead 
                  ? "bg-blue-600 text-white border-blue-400 shadow-sm" 
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              }`}
              title={isEasyRead ? "Desactivar Lectura Fácil" : "Activar Lectura Fácil"}
            >
              {isEasyRead ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">Lectura Fácil</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Abrir menú"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white mx-3 mt-2 rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
            >
              <div className="p-3 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.submenu ? (
                      <div className="flex flex-col gap-1 py-1">
                        <div className="px-3 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {link.label}
                        </div>
                        {link.submenu.map((sub) => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={(e) => handleClick(e, sub.href)}
                            className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href!)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          activeSection === link.href!.replace("#", "")
                            ? "bg-blue-50 text-blue-700 font-extrabold"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsMobileOpen(false);
                      setAiModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold"
                  >
                    <Bot className="w-4 h-4 text-emerald-400" />
                    Asistente IA Maneiro
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileOpen(false);
                      setVecinoModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold"
                  >
                    <Users className="w-4 h-4" />
                    Atención al Vecino
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modals triggered from Navbar icons */}
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
