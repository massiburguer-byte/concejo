import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const noticias = [
  {
    title: "Maneiro se une en una sola fe por el Santísimo Cristo del Buen Viaje",
    date: "04 MAY, 2026",
    image: "/images/noticias/noticia-1.jpg",
    excerpt: "Autoridades y concejales acompañaron a la comunidad de Pampatar en la celebración litúrgica y cultural del Santo Patrono.",
    category: "Religión",
  },
  {
    title: "Excelencia y Mérito: Sesión Solemne en Honor al Santo Patrono",
    date: "03 MAY, 2026",
    image: "/images/noticias/noticia-2.jpg",
    excerpt: "Distinguimos a personalidades que son orgullo de nuestra tierra por sus méritos y aporte a la sociedad maneirense.",
    category: "Gala",
  },
  {
    title: "Consulta Pública: Construyendo el Futuro de Maneiro",
    date: "30 ABR, 2026",
    image: "/images/noticias/noticia-3.jpg",
    excerpt: "Debatimos instrumentos legales fundamentales sobre desarrollo urbano y gestión eficiente de ejidos municipales.",
    category: "Legislación",
  },
  {
    title: "Avanza la Construcción de la Ordenanza de la Mujer",
    date: "25 ABR, 2026",
    image: "/images/noticias/noticia-4.jpg",
    excerpt: "Primera mesa técnica para fortalecer el rol femenino, el emprendimiento y la autonomía económica en el municipio.",
    category: "Social",
  },
  {
    title: "Bajada del Santísimo Cristo: Tradición y Fe Inquebrantable",
    date: "20 ABR, 2026",
    image: "/images/noticias/noticia-5.jpg",
    excerpt: "El pueblo de Maneiro se reencuentra con su protector en un momento de profunda devoción y esperanza para cada hogar.",
    category: "Tradición",
  },
];

export default function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % noticias.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length);
  };

  return (
    <section id="noticias" className="relative py-20 bg-navy-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <Badge
              variant="outline"
              className="mb-4 px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.2em] border-primary/30 text-primary bg-primary/10"
            >
              Novedades
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Noticias Recientes
            </h2>
          </motion.div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-white/10 bg-white/5 hover:bg-primary hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-white/10 bg-white/5 hover:bg-primary hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: `-${currentIndex * (100 / (window.innerWidth < 768 ? 1 : 3))}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex gap-6"
          >
            {noticias.map((n, i) => (
              <motion.article
                key={i}
                className="min-w-full md:min-w-[calc(33.333%-1rem)] group relative rounded-[2rem] overflow-hidden bg-navy-900/50 border border-white/5 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-navy-800 animate-pulse" />
                  <img
                    src={n.image}
                    alt={n.title}
                    className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider bg-primary text-white backdrop-blur-sm">
                      {n.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary text-[0.65rem] font-bold uppercase tracking-wider mb-3">
                    <Calendar className="w-3 h-3" />
                    {n.date}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                    {n.title}
                  </h3>

                  <p className="text-xs text-white/60 leading-relaxed mb-6 line-clamp-2">
                    {n.excerpt}
                  </p>

                  <button className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors group/btn">
                    Leer más
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {noticias.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-8 bg-primary" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
