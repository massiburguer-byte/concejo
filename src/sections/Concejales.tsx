import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

const concejales = [
  {
    name: "Carolina Guerra",
    role: "Presidenta",
    image: "/images/concejales/carolina.png",
    tags: ["Legislación", "Administración"],
    highlight: true,
  },
  {
    name: "Eulys Cedeño",
    role: "Vicepresidenta",
    image: "/images/concejales/eulys.png",
    tags: ["Contraloría", "Presupuesto"],
    highlight: true,
  },
  {
    name: "José Gregorio Marcano",
    role: "Concejal",
    image: "/images/concejales/gregorio.png",
    tags: ["Urbanismo", "Vivienda"],
    highlight: false,
  },
  {
    name: "Harolds Rojas",
    role: "Concejal",
    image: "/images/concejales/harolds.png",
    tags: ["Servicios Públicos", "Seguridad"],
    highlight: false,
  },
  {
    name: "Asdrúbal Delgado",
    role: "Concejal",
    image: "/images/concejales/asdrubal.png",
    tags: ["Turismo", "Cultura"],
    highlight: false,
  },
  {
    name: "Gilberto Rojas",
    role: "Concejal",
    image: "/images/concejales/gilberto.png",
    tags: ["Educación", "Deporte"],
    highlight: false,
  },
  {
    name: "Ana Gonzalez",
    role: "Concejal",
    image: "/images/concejales/ana-gonzalez.png",
    tags: ["Salud", "Social"],
    highlight: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Concejales() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="concejales" className="relative py-24 sm:py-32 overflow-hidden bg-navy-950">
      <div className="absolute inset-0 bg-navy-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.2em] border-primary/30 text-primary bg-primary/10"
          >
            Nuestro Equipo
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Cuerpo Legislativo
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Concejales comprometidos con el desarrollo, la transparencia y el bienestar integral de todos los habitantes del municipio Maneiro.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {concejales.map((c) => (
            <motion.div
              key={c.name}
              variants={cardVariants}
              className={`group relative rounded-[2.5rem] p-px transition-all duration-500 ${
                c.highlight
                  ? "bg-gradient-to-b from-primary/50 to-transparent shadow-glow"
                  : ""
              }`}
            >
              <div className="relative h-full glass-card rounded-[2.5rem] overflow-hidden">
                {/* Image */}
                <div className="relative h-96 overflow-hidden bg-navy-900">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-8 -mt-24 bg-gradient-to-t from-navy-950 via-navy-950/90 to-transparent pt-24">
                  <div className="mb-4">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-[0.6rem] font-black uppercase tracking-widest ${
                        c.highlight
                          ? "bg-primary text-white shadow-glow"
                          : "bg-white/10 text-white/80 border border-white/10"
                      }`}
                    >
                      {c.role}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mb-6 text-white group-hover:text-primary transition-all duration-300 tracking-tight leading-none">
                    {c.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-xl text-[0.6rem] font-bold bg-white/5 text-white/40 border border-white/5 group-hover:border-primary/20 group-hover:text-white/70 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-6" />
                  
                  <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/40 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                    Ver Perfil Legislativo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
