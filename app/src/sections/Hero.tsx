import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Share2, 
  Bus, 
  VolumeX, 
  Bot, 
  MapPin, 
  FileText, 
  Building2,
  Check,
  ShieldCheck,
  Scale
} from "lucide-react";
import CitizenAssistantModal from "@/components/CitizenAssistantModal";
import AtencionVecinoModal from "@/components/AtencionVecinoModal";

// Institutional Slides showing collective council work & community engagement
const INSTITUTIONAL_SLIDES = [
  {
    image: "/images/2.png",
    quote: "“Legislando con Transparencia para Todo Maneiro”",
    subtitle: "Cuerpo edilicio colegiado y plural al servicio del orden, la seguridad y el progreso de nuestro municipio.",
    period: "PERIODO LEGISLATIVO 2025 – 2029"
  },
  {
    image: "/images/1.png",
    quote: "“Trabajando en la Calle con Nuestra Gente”",
    subtitle: "Cercanía, escucha activa y soluciones legislativas construidas junto a cada comunidad.",
    period: "CONSULTAS PÚBLICAS Y CABILDOS"
  },
  {
    image: "/images/3.png",
    quote: "“Puertas Abiertas a la Participación Ciudadana”",
    subtitle: "Sesiones públicas, derecho de palabra vecinal y rendición de cuentas permanente.",
    period: "ATENCIÓN CIUDADANA 24/7"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [vecinoModalOpen, setVecinoModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % INSTITUTIONAL_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % INSTITUTIONAL_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + INSTITUTIONAL_SLIDES.length) % INSTITUTIONAL_SLIDES.length);
  };

  const handleTagFilter = (tagQuery: string) => {
    window.dispatchEvent(new CustomEvent("filter-ordenanza", { detail: { query: tagQuery } }));
    const el = document.querySelector("#ordenanzas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Concejo Municipal de Maneiro",
          text: "Portal Oficial del Concejo Municipal de Maneiro - Gestión Legislativa y Atención al Ciudadano",
          url: window.location.href,
        });
      } catch {
        // Fallback to copy
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="inicio" className="pt-24 sm:pt-28 pb-10 px-3 sm:px-6 lg:px-8 bg-[#eef3f8]">
      <div className="max-w-6xl mx-auto">

        {/* Top Institutional Badge Bar */}
        <div className="flex items-center justify-between gap-3 mb-4 px-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Portal Oficial del Concejo Municipal de Maneiro
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sede Municipal: Plaza Bolívar de Pampatar • Isla de Margarita</span>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200/90 shadow-xl overflow-hidden p-3 sm:p-5 transition-all">

          {/* 1. Hero Community Carousel Banner */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] min-h-[300px] sm:min-h-[380px] bg-slate-900 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={INSTITUTIONAL_SLIDES[currentSlide].image}
                  alt={INSTITUTIONAL_SLIDES[currentSlide].quote}
                  className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000"
                />
                
                {/* Modern Cinematic Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Top Right Period Badge */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-20">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-emerald-400 text-xs font-semibold shadow-md">
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                <span className="tracking-wide text-white font-bold text-[11px] sm:text-xs">
                  {INSTITUTIONAL_SLIDES[currentSlide].period}
                </span>
              </div>
            </div>

            {/* Carousel Arrow Controls */}
            <button
              onClick={handlePrevSlide}
              aria-label="Slide anterior"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/85 backdrop-blur-md text-white flex items-center justify-center border border-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Slide siguiente"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/85 backdrop-blur-md text-white flex items-center justify-center border border-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Hero Headline & Quote */}
            <div className="absolute bottom-5 sm:bottom-7 left-4 sm:left-8 right-4 sm:right-8 z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentSlide}-text`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-2xl"
                >
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-1 sm:mb-2 drop-shadow-md">
                    {INSTITUTIONAL_SLIDES[currentSlide].quote}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-slate-200/90 max-w-xl font-medium leading-relaxed drop-shadow">
                    {INSTITUTIONAL_SLIDES[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slider Indicator Dots / Pills */}
              <div className="flex items-center justify-center gap-1.5 mt-4 sm:mt-5">
                {INSTITUTIONAL_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Ir a slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === i ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Live Chamber Status Ribbon */}
          <div className="mt-4 mx-1 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a192f] to-blue-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md border border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-black uppercase tracking-wider shrink-0">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>Cámara Activa</span>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white">Próxima Sesión Ordinaria: </span>
                <span className="text-slate-300">Jueves 10:00 AM • Salón de Sesiones Pampatar • Entrada Libre</span>
              </div>
            </div>
            <button
              onClick={() => setVecinoModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-full transition-all shrink-0 border border-white/10"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Solicitar Derecho de Palabra</span>
            </button>
          </div>

          {/* 2. Institutional Entity Profile & Citizen Action Bar */}
          <div className="pt-6 sm:pt-7 pb-4 px-2 sm:px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
              
              {/* Institutional details */}
              <div className="flex items-start sm:items-center gap-4">
                {/* Official Logo Avatar with blue ring and EN LÍNEA badge */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-sky-500/80 p-2.5 bg-white shadow-md overflow-hidden flex items-center justify-center">
                    <img
                      src="/images/logo.png"
                      alt="Escudo Concejo Municipal Maneiro"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* EN LÍNEA Badge */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 text-white font-extrabold text-[9px] sm:text-[10px] tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 border-2 border-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>EN LÍNEA</span>
                  </div>
                </div>

                {/* Name, Handle, Role */}
                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Concejo Municipal de Maneiro
                    </h2>
                    {/* Blue Verified Check */}
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-2xs" title="Ente Público Oficial Verificado">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    @concejomaneiro • Cámara Municipal
                  </p>

                  <div className="mt-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-lg text-xs font-bold border bg-blue-50 text-blue-700 border-blue-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Órgano Legislativo y Deliberante
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
                {/* Enviar Mensaje (IA) Button */}
                <button
                  onClick={() => setAiModalOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>Enviar Mensaje (IA)</span>
                </button>

                {/* Atención Vecino Button */}
                <button
                  onClick={() => setVecinoModalOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Users className="w-4 h-4" />
                  <span>Atención Vecino</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  aria-label="Compartir portal institucional"
                  className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs relative"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                      ¡Enlace Copiado!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 3. Live Metrics Bar (Institutional: Cámara Municipal) */}
            <div className="mt-6 bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-4 sm:p-5">
              <div className="grid grid-cols-3 divide-x divide-slate-200/80 text-center">
                <div className="px-2">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    148+
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                    SESIONES DE CÁMARA
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">
                    +8.5k
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                    VECINOS ATENDIDOS
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                    36+
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                    ORDENANZAS VIGENTES
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Institutional Bio / Plural Mission */}
            <div className="mt-5 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              <p>
                🏛 <strong>Concejo Municipal de Maneiro</strong> • Órgano legislativo y deliberante colegiado de representación popular. 
                Garantizando el debate democrático, la modernización del marco legal, el orden público, la seguridad jurídica 
                y el progreso de todas las familias de Pampatar, Los Robles y el Municipio Maneiro.
              </p>
            </div>

            {/* 5. Quick Tag Pills (Interactive) */}
            <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
              
              {/* Concejales de Cámara */}
              <button
                onClick={() => {
                  const el = document.querySelector("#concejales");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/80 hover:bg-blue-100 transition-colors shadow-2xs"
              >
                <Users className="w-3.5 h-3.5 text-blue-700" />
                <span>7 Concejales de Cámara</span>
              </button>

              {/* Ordenanza de Movilidad */}
              <button
                onClick={() => handleTagFilter("Movilidad")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <Bus className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ordenanza de Movilidad</span>
              </button>

              {/* Cero Ruidos Molestos */}
              <button
                onClick={() => handleTagFilter("Convivencia")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200/80 hover:bg-sky-100 transition-colors shadow-2xs"
              >
                <VolumeX className="w-3.5 h-3.5 text-sky-700" />
                <span>Cero Ruidos Molestos</span>
              </button>

              {/* Agente IA 24/7 */}
              <button
                onClick={() => setAiModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-white border border-slate-800 hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agente IA 24/7</span>
              </button>

              {/* Gacetas Oficiales */}
              <button
                onClick={() => {
                  const el = document.querySelector("#ordenanzas");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100 transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-amber-700" />
                <span>Gacetas 2025-2026</span>
              </button>

              {/* Pampatar • Los Robles • Jorge Coll */}
              <button
                onClick={() => {
                  const el = document.querySelector("#contacto");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors shadow-2xs"
              >
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Pampatar • Los Robles • Jorge Coll</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Citizen Assistant AI Modal */}
      <CitizenAssistantModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
        onSelectTag={handleTagFilter}
      />

      {/* Atención Vecino Modal */}
      <AtencionVecinoModal
        open={vecinoModalOpen}
        onOpenChange={setVecinoModalOpen}
      />
    </section>
  );
}
