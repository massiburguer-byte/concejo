import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Instagram, Facebook, ExternalLink, Heart, MessageCircle } from "lucide-react";
import generalSettings from "../data/settings/general.json";

const mockInstaPosts = [
  { id: 1, image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=500&auto=format&fit=crop", likes: "124", comments: "12" },
  { id: 2, image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=500&auto=format&fit=crop", likes: "89", comments: "5" },
  { id: 3, image: "https://images.unsplash.com/photo-1521791136064-7986c2959210?q=80&w=500&auto=format&fit=crop", likes: "210", comments: "18" },
  { id: 4, image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=500&auto=format&fit=crop", likes: "156", comments: "24" },
];

export default function RedesSociales() {
  return (
    <section id="redes" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.2em] border-primary/30 text-primary bg-primary/10"
          >
            Conéctate con nosotros
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">
            Nuestras Redes Sociales
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Sigue de cerca nuestra gestión legislativa y mantente informado en tiempo real a través de nuestras plataformas oficiales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Instagram Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Instagram</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    {generalSettings.instagram ? `@${generalSettings.instagram.split('/').pop()}` : '@concejomunicipalmaneiro1'}
                  </p>
                </div>
              </div>
              <a 
                href={generalSettings.instagram || "https://instagram.com/concejomunicipalmaneiro1"} 
                target="_blank" 
                className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-[0.65rem] font-black uppercase tracking-widest text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
              >
                Seguir
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mockInstaPosts.map((post) => (
                <div key={post.id} className="group relative aspect-square rounded-[2rem] overflow-hidden glass-card border-slate-200/50">
                  <img src={post.image} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 z-10">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Heart className="w-5 h-5 fill-white" /> {post.likes}
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <MessageCircle className="w-5 h-5 fill-white" /> {post.comments}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Facebook Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1877F2] flex items-center justify-center shadow-lg">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Facebook</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Concejo Municipal de Maneiro</p>
                </div>
              </div>
              <a 
                href={generalSettings.facebook || "https://facebook.com"} 
                target="_blank" 
                className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-[0.65rem] font-black uppercase tracking-widest text-slate-700 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm"
              >
                Seguir
              </a>
            </div>

            {/* Facebook Feed Placeholder (Real Widget would go here) */}
            <div className="flex-1 min-h-[450px] rounded-[2.5rem] glass-card border-slate-200 bg-white p-2 overflow-hidden shadow-sm">
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-[#1877F2]/10 flex items-center justify-center mb-6">
                  <Facebook className="w-10 h-10 text-[#1877F2]" />
                </div>
                <h4 className="text-lg font-black text-slate-800 mb-2">Feed de Facebook</h4>
                <p className="text-xs text-muted-foreground mb-8 max-w-xs">
                  Para ver las publicaciones en tiempo real, asegúrate de haber aceptado las cookies de redes sociales.
                </p>
                <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1877F2] text-white text-[0.7rem] font-black uppercase tracking-widest shadow-glow hover:-translate-y-1 transition-all">
                  Cargar publicaciones <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
