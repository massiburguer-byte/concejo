import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";

const slides = [
  {
    image: "/images/1.png",
    badge: "Gestión Legislativa 2026",
    title: <>Maneiro avanza con <span className="text-primary">Transparencia</span></>,
    description: "Portal oficial del Concejo Municipal de Maneiro. Información pública, ordenanzas y atención ciudadana en un solo lugar.",
    primaryBtn: { text: "Gacetas Oficiales", href: "#ordenanzas" },
    position: "items-center", // Centrado verticalmente
    imgPos: "object-center"
  },
  {
    image: "/images/2.png",
    badge: "Periodo 2025 - 2029",
    title: <>Cuerpo Legislativo <span className="text-primary">Comprometido</span></>,
    description: "Conoce a los concejales que trabajan día a día por el bienestar y desarrollo de nuestro municipio ejemplar.",
    primaryBtn: { text: "Ver Concejales", href: "#concejales" },
    position: "items-end pb-20", // Abajo para no tapar caras
    imgPos: "object-right" // Mover imagen a la derecha para dar espacio al texto
  },
  {
    image: "/images/3.png",
    badge: "Atención al Ciudadano",
    title: <>Legislando para el <span className="text-primary">Progreso</span></>,
    description: "Nuestra prioridad es escuchar al pueblo. Participa en las consultas públicas y construye el futuro de Maneiro.",
    primaryBtn: { text: "Consultas Públicas", href: "#noticias" },
    position: "items-center",
    imgPos: "object-center"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeInOut" as const },
  },
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative h-[80vh] w-full flex items-center overflow-hidden bg-navy-950"
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlide].image}
              alt="Hero Background"
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-950 z-10" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`relative z-20 w-full px-4 sm:px-10 lg:px-24 h-full flex justify-start ${slides[currentSlide].position}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-2xl text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-[0.65rem] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md shadow-glow">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {slides[currentSlide].badge}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8 text-white drop-shadow-2xl"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/80 max-w-lg mb-10 leading-relaxed drop-shadow-lg"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-5"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-[0.75rem] uppercase tracking-widest gap-3 shadow-glow transition-all hover:-translate-y-1 active:scale-95"
                onClick={() => handleScroll(slides[currentSlide].primaryBtn.href)}
              >
                <FileText className="w-5 h-5" />
                {slides[currentSlide].primaryBtn.text}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-[0.75rem] uppercase tracking-widest gap-3 backdrop-blur-md transition-all hover:-translate-y-1 active:scale-95"
                onClick={() => handleScroll("#contacto")}
              >
                Contacto
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === i ? "w-8 bg-primary" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
