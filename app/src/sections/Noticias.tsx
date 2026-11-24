import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Send, 
  Bookmark, 
  Check, 
  MapPin, 
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

interface NoticiaItem {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
  category: string;
}

const modules = import.meta.glob('../data/noticias/*.json', { eager: true });
const noticias = Object.keys(modules)
  .sort()
  .reverse()
  .map((key) => (modules[key] as any).default || modules[key]) as NoticiaItem[];

export default function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNoticia, setSelectedNoticia] = useState<NoticiaItem | null>(null);
  
  // Interactive social states (Only Likes & Share)
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % noticias.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length);
  };

  const currentKey = selectedNoticia?.title || "default";
  const isLiked = !!likedMap[currentKey];
  const isSaved = !!savedMap[currentKey];

  const toggleLike = () => {
    setLikedMap((prev) => ({
      ...prev,
      [currentKey]: !prev[currentKey]
    }));
  };

  const toggleSave = () => {
    setSavedMap((prev) => ({
      ...prev,
      [currentKey]: !prev[currentKey]
    }));
  };

  const handleShare = async () => {
    if (navigator.share && selectedNoticia) {
      try {
        await navigator.share({
          title: selectedNoticia.title,
          text: selectedNoticia.excerpt,
          url: window.location.href,
        });
      } catch {
        // fallback
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="noticias" className="relative py-20 bg-gradient-to-b from-[#eef3f8] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <Badge
              variant="outline"
              className="mb-3 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider border-blue-200 text-blue-700 bg-blue-50"
            >
              Sala de Prensa Oficial
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Noticias y Novedades Legislativas
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl font-medium">
              Acontecimientos, sesiones de cámara, acuerdos y actividades comunitarias del municipio Maneiro.
            </p>
          </motion.div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              aria-label="Noticia anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              aria-label="Noticia siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: `-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2))}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex gap-6"
          >
            {noticias.map((n, i) => (
              <motion.article
                key={i}
                className="min-w-full md:min-w-[calc(50%-0.75rem)] group relative rounded-[2rem] overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedNoticia(n)}
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-900 shadow-sm border border-white/20">
                        {n.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] font-semibold mb-2.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{n.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-2">
                      {n.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {n.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Leer publicación completa</span>
                  <span className="text-slate-400 font-normal text-[11px]">Ver post</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {noticias.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Ir a noticia ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-8 bg-slate-900" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Upgraded Instagram-Style News Modal (Likes Only, No Comments) */}
      <Dialog open={!!selectedNoticia} onOpenChange={(open) => !open && setSelectedNoticia(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-white rounded-3xl border border-slate-200/90 shadow-2xl h-[92dvh] md:h-auto md:max-h-[88vh] flex flex-col md:flex-row w-full sm:max-w-4xl lg:max-w-5xl">
          {selectedNoticia && (
            <>
              {/* 1. Left Column: Image Showcase with Atmospheric Glow */}
              <div className="relative w-full md:w-[52%] lg:w-[56%] h-[35vh] md:h-[82vh] shrink-0 bg-slate-950 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-200">
                
                {/* Blurred Backdrop */}
                <img
                  src={selectedNoticia.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none"
                />

                {/* Crisp Main Photo */}
                <img
                  src={selectedNoticia.image}
                  alt={selectedNoticia.title}
                  className="relative z-10 w-full h-full object-contain p-2 drop-shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800";
                  }}
                />

                {/* Category Pill Floating on Image */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-white/10 shadow-md">
                    <Tag className="w-3 h-3 text-emerald-400" />
                    <span>{selectedNoticia.category}</span>
                  </span>
                </div>
              </div>

              {/* 2. Right Column: Instagram & Editorial Content Feed */}
              <div className="w-full md:w-[48%] lg:w-[44%] flex flex-col h-[57vh] md:h-[82vh] bg-white text-slate-900 justify-between">
                
                {/* Header (Cabecera Oficial Verificada) */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 shrink-0 bg-white">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Instagram Gradient Ring Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[2px] shrink-0 shadow-sm">
                      <div className="w-full h-full bg-white rounded-full p-1 flex items-center justify-center overflow-hidden">
                        <img 
                          src="/images/logo.png" 
                          alt="Concejo Municipal Maneiro" 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                          concejomunicipalmaneiro1
                        </h4>
                        {/* Blue Verified Check */}
                        <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-2xs" title="Cuenta Oficial Verificada">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                        <span>Pampatar • Municipio Maneiro</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                    Oficial
                  </span>
                </div>

                {/* Body (Cuerpo Editorial con Jerarquía) */}
                <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
                  
                  {/* Article Title */}
                  <div>
                    <DialogTitle className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                      {selectedNoticia.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Publicado el {selectedNoticia.date}</span>
                    </DialogDescription>
                  </div>

                  {/* Body Content / Markdown */}
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                    {selectedNoticia.content ? (
                      <ReactMarkdown>{selectedNoticia.content}</ReactMarkdown>
                    ) : (
                      <p>{selectedNoticia.excerpt}</p>
                    )}

                    {/* Civic Hashtags */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5 text-[11px] font-semibold text-blue-600">
                      <span>#Maneiro</span>
                      <span>#Pampatar</span>
                      <span>#ConcejoMunicipal</span>
                      <span>#NuevaEsparta</span>
                      <span>#GestiónLegislativa</span>
                      <span>#Comunidad</span>
                    </div>
                  </div>

                </div>

                {/* Footer (Solo Likes, Compartir y Guardar - Sin Comentarios) */}
                <div className="p-4 border-t border-slate-100 shrink-0 bg-white">
                  
                  {/* Action Icons Bar */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-4">
                      {/* Heart (Like) Button */}
                      <button 
                        onClick={toggleLike}
                        className="transition-transform active:scale-125 flex items-center gap-1.5 group"
                        aria-label="Me gusta"
                      >
                        <Heart 
                          className={`w-6 h-6 transition-colors ${
                            isLiked 
                              ? "fill-red-500 text-red-500" 
                              : "text-slate-800 hover:text-red-500"
                          }`} 
                        />
                        <span className={`text-xs font-bold ${isLiked ? "text-red-600" : "text-slate-600 group-hover:text-red-500"}`}>
                          {isLiked ? 429 : 428}
                        </span>
                      </button>

                      {/* Share Button */}
                      <button 
                        onClick={handleShare}
                        className="text-slate-800 hover:text-blue-600 transition-colors relative"
                        aria-label="Compartir publicación"
                        title="Compartir enlace"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Send className="w-5 h-5 -rotate-45" />
                        )}
                        {copied && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                            ¡Enlace copiado!
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Bookmark Button */}
                    <button 
                      onClick={toggleSave}
                      className="transition-transform active:scale-125 text-slate-800 hover:text-slate-900"
                      aria-label="Guardar"
                      title={isSaved ? "Guardado" : "Guardar publicación"}
                    >
                      <Bookmark 
                        className={`w-6 h-6 transition-colors ${
                          isSaved 
                            ? "fill-slate-900 text-slate-900" 
                            : "text-slate-800"
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Likes Summary (Institutional & Community) */}
                  <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <span>Les gusta a</span>
                    <span className="text-blue-700 font-extrabold">alcaldiademaneiro</span>
                    <span>y</span>
                    <span>{isLiked ? 429 : 428} personas más</span>
                  </div>

                  <div className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                    {selectedNoticia.date} • Sala de Prensa Oficial
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
