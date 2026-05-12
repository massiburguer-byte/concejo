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
    <section id="concejales" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-navy-900/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-primary/30 text-primary bg-primary/10"
          >
            Nuestro Equipo
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Cuerpo Legislativo
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Concejales comprometidos con el desarrollo y bienestar del municipio Maneiro.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {concejales.map((c) => (
            <motion.div
              key={c.name}
              variants={cardVariants}
              className={`group relative rounded-[2.5rem] p-px transition-all duration-500 hover:-translate-y-2 ${
                c.highlight
                  ? "bg-gradient-to-b from-primary/40 to-transparent shadow-[0_0_40px_-15px_rgba(37,99,235,0.3)]"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="relative h-full bg-navy-950/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/5">
                {/* Image */}
                <div className="relative h-80 overflow-hidden bg-navy-900">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-6 -mt-12 bg-gradient-to-t from-navy-950 to-transparent pt-16">
                  <div className="mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-[0.1em] ${
                        c.highlight
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-white/10 text-white/80 border border-white/10"
                      }`}
                    >
                      {c.role}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                    {c.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-[0.65rem] font-semibold bg-white/5 text-white/60 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
