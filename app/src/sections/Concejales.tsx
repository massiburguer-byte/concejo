import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const concejales = [
  {
    name: "Carolina Guerra",
    role: "Presidenta",
    image: "/images/concejales/carolina.png",
    description: "Liderando con visión estratégica para el futuro de Maneiro.",
    large: true,
  },
  {
    name: "Eulys Cedeño",
    role: "Vicepresidenta",
    image: "/images/concejales/eulys.png",
  },
  {
    name: "José Gregorio Marcano",
    role: "Concejal",
    image: "/images/concejales/gregorio.png",
  },
  {
    name: "Haroldo Rojas",
    role: "Concejal",
    image: "/images/concejales/harolds.png",
  },
  {
    name: "Asdrúbal Delgado",
    role: "Concejal",
    image: "/images/concejales/asdrubal.png",
  },
  {
    name: "Gilberto Rojas",
    role: "Concejal",
    image: "/images/concejales/gilberto.png",
  },
  {
    name: "Ana Gonzalez",
    role: "Concejal",
    image: "/images/concejales/ana-gonzalez.png",
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Concejales() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="concejales" className="relative py-24 sm:py-32 bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a192f]">
            Cuerpo Legislativo
          </h2>
          <div className="w-16 h-1 bg-[#1e5baf] mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Concejales dedicados al servicio público y la creación de marcos legales que impulsan nuestra comunidad.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {concejales.map((c) => (
            <motion.div
              key={c.name}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-[1.5rem] bg-[#0f172a] shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                c.large ? "sm:col-span-2 sm:row-span-2 min-h-[400px] lg:min-h-[500px]" : "min-h-[250px] lg:min-h-[280px]"
              }`}
            >
              {/* Background Image */}
              <img
                src={c.image}
                alt={c.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${c.large ? "object-top" : "object-center"}`}
              />
              
              {/* Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${c.large ? "from-[#0f172a] via-[#0f172a]/60 to-transparent" : "from-[#0f172a] via-[#0f172a]/40 to-transparent"}`} />

              {/* Decorative Corner Element */}
              <div className="absolute bottom-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="white"/>
                </svg>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-10">
                {c.large ? (
                  <>
                    <span className="inline-block px-3 py-1 bg-[#1e5baf] text-white text-[0.65rem] font-bold tracking-wider rounded-md mb-3 w-fit uppercase">
                      {c.role}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                      {c.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 max-w-sm">
                      {c.description}
                    </p>
                    <button className="flex items-center text-sm font-bold text-white group/btn">
                      Ver Perfil 
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {c.role}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                      {c.name}
                    </h3>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
