import { motion } from "framer-motion";

const accesos = [
  {
    title: "Comisiones Legislativas",
    image: "/images/shortcuts/1.png",
    href: "#concejales",
    description: "Conoce el trabajo de nuestras comisiones."
  },
  {
    title: "Ordenanzas Municipales",
    image: "/images/shortcuts/2.png",
    href: "#ordenanzas",
    description: "Consulta el marco legal del municipio."
  },
  {
    title: "Departamentos",
    image: "/images/shortcuts/3.png",
    href: "#contacto",
    description: "Información sobre áreas administrativas."
  },
  {
    title: "Atención al Ciudadano",
    image: "/images/shortcuts/4.png",
    href: "#contacto",
    description: "Estamos para escucharte y ayudarte."
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
    <section className="relative z-20 py-8 px-4 bg-navy-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accesos.map((acceso, i) => (
            <motion.div
              key={acceso.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleScroll(acceso.href)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2rem] glass-premium transition-all duration-500 group-hover:shadow-premium group-hover:-translate-y-1">
                {/* Image Container */}
                <div className="aspect-[16/10] overflow-hidden flex items-center justify-center p-6 bg-white">
                  <img
                    src={acceso.image}
                    alt={acceso.title}
                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 pt-0 text-center">
                  <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors mb-2 uppercase tracking-wide">
                    {acceso.title}
                  </h3>
                  <p className="text-[0.65rem] text-white/50 leading-relaxed line-clamp-1">
                    {acceso.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
