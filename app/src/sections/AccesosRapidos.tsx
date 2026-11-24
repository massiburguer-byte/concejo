import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Scale, Building, HeartHandshake } from "lucide-react";

const accesos = [
  {
    title: "Comisiones de Trabajo",
    image: "/images/shortcuts/1.png",
    icon: Scale,
    href: "#concejales",
    tag: "Legislativo",
    tagClass: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Conoce el trabajo parlamentario y las 7 comisiones permanentes de Maneiro."
  },
  {
    title: "Ordenanzas y Gacetas",
    image: "/images/shortcuts/2.png",
    icon: BookOpen,
    href: "#ordenanzas",
    tag: "Marco Legal",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Descarga el compendio legal, reglamentos y decretos vigentes."
  },
  {
    title: "Organigrama Institucional",
    image: "/images/shortcuts/3.png",
    icon: Building,
    href: "#organigrama",
    tag: "Estructura",
    tagClass: "bg-purple-50 text-purple-700 border-purple-200",
    description: "Estructura administrativa, secretaría de cámara y dependencias."
  },
  {
    title: "Atención al Ciudadano",
    image: "/images/shortcuts/4.png",
    icon: HeartHandshake,
    href: "#contacto",
    tag: "Comunidad",
    tagClass: "bg-amber-50 text-amber-700 border-amber-200",
    description: "Canal de denuncias vecinales, propuestas y trámites en línea."
  }
];

export default function AccesosRapidos() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative z-20 py-6 sm:py-8 px-3 sm:px-6 bg-[#eef3f8]">
      <div className="max-w-4xl mx-auto">
        {/* Grid de 2 columnas: 2 arriba y 2 abajo, diseño compacto */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {accesos.map((acceso, i) => {
            const Icon = acceso.icon;
            return (
              <motion.div
                key={acceso.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                onClick={() => handleScroll(acceso.href)}
                className="group cursor-pointer"
              >
                <div className="h-full flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-blue-300 p-3 sm:p-4">
                  <div>
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold border ${acceso.tagClass}`}>
                        {acceso.tag}
                      </span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 text-slate-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                    </div>

                    {/* Image compacta */}
                    <div className="aspect-[16/9] sm:aspect-[16/8] max-h-24 sm:max-h-28 overflow-hidden flex items-center justify-center p-1.5 mb-2 bg-slate-50/70 rounded-xl">
                      <img
                        src={acceso.image}
                        alt={acceso.title}
                        className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1 tracking-tight line-clamp-1">
                      {acceso.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 leading-snug line-clamp-2">
                      {acceso.description}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center text-[10px] sm:text-[11px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                    <span>Acceder</span>
                    <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
