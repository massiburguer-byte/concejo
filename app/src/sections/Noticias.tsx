import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black md:bg-white rounded-none md:rounded-[1rem] border-0 shadow-2xl h-[100dvh] md:h-auto md:max-h-[90vh] flex flex-col md:flex-row w-full sm:max-w-4xl lg:max-w-6xl">
          {selectedNoticia && (
            <>
              <div className="relative w-full md:w-[55%] lg:w-[60%] h-[40vh] md:h-[80vh] shrink-0 bg-black flex items-center justify-center border-r border-slate-200">
                <img
                  src={selectedNoticia.image}
                  alt={selectedNoticia.title}
                  className="w-full h-full object-cover md:object-contain"
                />
              </div>
              <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col h-[60vh] md:h-[80vh] bg-white text-black">
                {/* Header Modal */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                      <div className="w-full h-full bg-white rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                        <img src="/logo-alcaldia.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=C+M&background=0D8ABC&color=fff'; }} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-none">concejomunicipalmaneiro1</h4>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-slate-800">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Area (Scrollable) */}
                <div className="p-4 overflow-y-auto flex-1 hide-scrollbar">
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px] shrink-0">
                      <div className="w-full h-full bg-white rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                        <img src="/logo-alcaldia.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=C+M&background=0D8ABC&color=fff'; }} />
                      </div>
                    </div>
                    <div className="text-sm text-slate-800">
                      <span className="font-bold text-slate-900 mr-2">concejomunicipalmaneiro1</span>
                      <DialogTitle className="inline font-bold">{selectedNoticia.title}</DialogTitle>
                      <DialogDescription className="hidden" />
                      
                      <article className="prose prose-sm prose-slate mt-2 max-w-none text-slate-700 marker:text-primary prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                        {selectedNoticia.content ? (
                          <ReactMarkdown>{selectedNoticia.content}</ReactMarkdown>
                        ) : (
                          <p>{selectedNoticia.excerpt}</p>
                        )}
                      </article>
                    </div>
                  </div>
                </div>

                {/* Footer Modal */}
                <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <button className="text-slate-900 hover:text-slate-600 transition-colors">
                        <Heart className="w-6 h-6" />
                      </button>
                      <button className="text-slate-900 hover:text-slate-600 transition-colors">
                        <MessageCircle className="w-6 h-6" />
                      </button>
                      <button className="text-slate-900 hover:text-slate-600 transition-colors -rotate-45 mb-1">
                        <Send className="w-6 h-6" />
                      </button>
                    </div>
                    <button className="text-slate-900 hover:text-slate-600 transition-colors">
                      <Bookmark className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    Les gusta a asdrubal_delgado_ y otras personas
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                    {selectedNoticia.date}
                  </div>
                  
                  {/* Comentario input ficticio */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                       <img src="https://ui-avatars.com/api/?name=U+S&background=f1f5f9&color=64748b" alt="User" />
                    </div>
                    <input type="text" placeholder="Agrega un comentario..." className="flex-1 text-sm bg-transparent border-none focus:ring-0 outline-none placeholder:text-slate-400" />
                    <button className="text-blue-500 font-semibold text-sm hover:text-blue-700">Publicar</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
