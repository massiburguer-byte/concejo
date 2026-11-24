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
    <section className="relative z-20 py-10 px-4 bg-[#eef3f8]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {accesos.map((acceso, i) => {
            const Icon = acceso.icon;
            return (
              <motion.div
                key={acceso.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => handleScroll(acceso.href)}
                className="group cursor-pointer"
              >
                <div className="h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-300 p-5">
                  <div>
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${acceso.tagClass}`}>
                        {acceso.tag}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden flex items-center justify-center p-2 mb-3 bg-slate-50/50 rounded-2xl">
                      <img
                        src={acceso.image}
                        alt={acceso.title}
                        className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 tracking-tight">
                      {acceso.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {acceso.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                    <span>Acceder</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
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
