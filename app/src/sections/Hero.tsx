import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2,
  Check,
  Scale
} from "lucide-react";
import AtencionVecinoModal from "@/components/AtencionVecinoModal";

// Institutional Slides showing collective council work & community engagement
const INSTITUTIONAL_SLIDES = [
  {
    image: "/images/banner-concejales-principal.jpg",
    mobileImage: "/images/concejales-mobile-team.jpg",
    quote: "“Legislando con Transparencia para Todo Maneiro”",
    subtitle: "Cuerpo edilicio colegiado y plural al servicio del orden, la seguridad y el progreso de nuestro municipio.",
    period: "PERIODO LEGISLATIVO 2025 – 2029"
  },
  {
    image: "/images/banner-sede-bienvenidos.jpg",
    mobileImage: "/images/banner-sede-bienvenidos.jpg",
    quote: "“Bienvenidos al Concejo Municipal de Maneiro”",
    subtitle: "Sede Histórica en Pampatar: Puertas abiertas a la ciudadanía, la participación vecinal y el progreso de nuestra gente.",
    period: "SEDE OFICIAL PAMPATAR"
  },
  {
    image: "/images/banner-ordenanzas-slide.jpg",
    mobileImage: "/images/banner-ordenanzas-slide.jpg",
    quote: "“Conoce Nuestras Ordenanzas Municipales”",
    subtitle: "Marco legal actualizado, gacetas oficiales y normativas para el desarrollo armónico de Maneiro.",
    period: "MARCO LEGAL Y GACETAS"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [vecinoModalOpen, setVecinoModalOpen] = useState(false);

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

  return (
    <section id="inicio" className="relative pt-[env(safe-area-inset-top,0px)] sm:pt-28 pb-6 sm:pb-10 px-0 sm:px-6 lg:px-8 bg-[#0a192f] sm:bg-[#eef3f8]">
      <div className="max-w-6xl mx-auto">

        {/* Top Institutional Badge Bar (En Desktop) */}
        <div className="hidden sm:flex items-center justify-between gap-3 mb-4 px-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Portal Oficial del Concejo Municipal de Maneiro
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sede Municipal: Plaza Bolívar de Pampatar • Isla de Margarita</span>
          </div>
        </div>

        {/* Main Hero Container: Borde a borde en móvil (Full Screen App Feel), Card en Desktop */}
        <div className="relative bg-slate-950 sm:bg-white sm:rounded-[2.5rem] sm:border sm:border-slate-200/90 sm:shadow-xl overflow-hidden p-0 sm:p-5 transition-all">

          {/* 1. Hero Community Carousel Banner (Ocupa la pantalla en móvil con visualización nítida y completa) */}
          <div className="relative overflow-hidden w-full h-[75vh] min-h-[500px] sm:h-auto sm:min-h-[440px] sm:aspect-[16/7] md:aspect-[16/6] sm:rounded-3xl bg-slate-950 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Responsive Picture: En móviles carga la composición vertical del equipo donde todos se ven enteros; en desktop la panorámica */}
                <picture className="w-full h-full block">
                  <source
                    media="(max-width: 640px)"
                    srcSet={INSTITUTIONAL_SLIDES[currentSlide].mobileImage || INSTITUTIONAL_SLIDES[currentSlide].image}
                  />
                  <img
                    src={INSTITUTIONAL_SLIDES[currentSlide].image}
                    alt={INSTITUTIONAL_SLIDES[currentSlide].quote}
                    className="w-full h-full object-cover object-center sm:object-[center_20%] transition-transform duration-1000"
                  />
                </picture>
                
                {/* Modern Cinematic Gradients: Sutil en el fondo y concentrado abajo para dar brillo y nitidez a las fotos */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent sm:via-slate-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent sm:from-slate-950/60" />
              </motion.div>
            </AnimatePresence>

            {/* Top Right Period Badge */}
            <div className="absolute top-16 sm:top-5 right-4 sm:right-6 z-20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-emerald-400 text-xs font-semibold shadow-lg">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 stroke-[3]" />
                <span className="tracking-wide text-white font-bold text-[10px] sm:text-xs">
                  {INSTITUTIONAL_SLIDES[currentSlide].period}
                </span>
              </div>
            </div>

            {/* Carousel Arrow Controls */}
            <button
              onClick={handlePrevSlide}
              aria-label="Slide anterior"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-md text-white flex items-center justify-center border border-white/15 transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Slide siguiente"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-md text-white flex items-center justify-center border border-white/15 transition-all hover:scale-105 active:scale-95 shadow-md"
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
                  <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight mb-1.5 sm:mb-2 drop-shadow-lg">
                    {INSTITUTIONAL_SLIDES[currentSlide].quote}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-xl font-medium leading-relaxed drop-shadow-md">
                    {INSTITUTIONAL_SLIDES[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slider Indicator Dots / Pills */}
              <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-5">
                {INSTITUTIONAL_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Ir a slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === i ? "w-8 sm:w-10 bg-white shadow" : "w-4 sm:w-5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Live Chamber Status Ribbon */}
          <div className="mx-3 my-3 sm:mx-1 sm:mt-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#122b52] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md border border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-black uppercase tracking-wider shrink-0">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>Cámara Activa</span>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white">Próxima Sesión Ordinaria: </span>
                <span className="text-slate-300">Jueves 10:00 AM • Salón de Sesiones Pampatar</span>
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
        </div>

      </div>

      {/* Atención Vecino Modal */}
      <AtencionVecinoModal
        open={vecinoModalOpen}
        onOpenChange={setVecinoModalOpen}
      />
    </section>
  );
}
