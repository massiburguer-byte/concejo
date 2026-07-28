import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

const modules = import.meta.glob('../data/noticias/*.json', { eager: true });
const noticias = Object.keys(modules)
  .sort()
  .reverse()
  .map((key) => (modules[key] as any).default || modules[key]);

export default function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNoticia, setSelectedNoticia] = useState<any>(null);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % noticias.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length);
  };

  return (
    <section id="noticias" className="relative py-20 bg-gradient-to-b from-[#f0f4f8] to-white">
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
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Noticias Recientes
            </h2>
          </motion.div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
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
                className="min-w-full md:min-w-[calc(33.333%-1rem)] group relative rounded-[2.5rem] overflow-hidden glass-card cursor-pointer"
                onClick={() => setSelectedNoticia(n)}
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 z-10" />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-1.5 rounded-full text-[0.6rem] font-black uppercase tracking-widest bg-primary text-white shadow-glow">
                      {n.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 relative z-20">
                  <div className="flex items-center gap-2 text-primary text-[0.65rem] font-black uppercase tracking-widest mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    {n.date}
                  </div>

                  <h3 className="text-xl font-black text-foreground mb-4 group-hover:text-primary transition-all duration-300 leading-[1.2] line-clamp-2 tracking-tight">
                    {n.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-8 line-clamp-2 group-hover:text-foreground/80 transition-colors">
                    {n.excerpt}
                  </p>

                  <button className="w-full py-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-[0.7rem] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 flex items-center justify-center gap-2">
                    Leer artículo completo
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {noticias.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-8 bg-primary" : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedNoticia} onOpenChange={(open) => !open && setSelectedNoticia(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-[2.5rem] border-0 shadow-2xl h-[90vh] md:h-auto md:max-h-[90vh] flex flex-col">
          {selectedNoticia && (
            <>
              <div className="relative h-64 md:h-80 shrink-0">
                <img
                  src={selectedNoticia.image}
                  alt={selectedNoticia.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-10 md:right-10 z-20 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-widest bg-primary text-white">
                      {selectedNoticia.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-white/90">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedNoticia.date}
                    </div>
                  </div>
                  <DialogTitle className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight">
                    {selectedNoticia.title}
                  </DialogTitle>
                  <DialogDescription className="hidden" />
                </div>
              </div>
              <div className="p-6 md:p-10 overflow-y-auto shrink-1 bg-white">
                <article className="prose prose-slate md:prose-lg max-w-none text-slate-700 marker:text-primary prose-headings:font-black prose-headings:text-slate-900 prose-a:text-primary prose-a:font-bold hover:prose-a:text-primary/80 prose-img:rounded-2xl">
                  {selectedNoticia.content ? (
                    <ReactMarkdown>{selectedNoticia.content}</ReactMarkdown>
                  ) : (
                    <p>{selectedNoticia.excerpt}</p>
                  )}
                </article>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
