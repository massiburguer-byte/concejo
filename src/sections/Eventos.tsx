import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

const eventos = [
  {
    day: "12",
    month: "MAY",
    title: "Sesión Ordinaria",
    time: "10:00 AM",
    location: "Salón de Sesiones",
    type: "session",
    description: "Discusión y aprobación de proyectos de ordenanza en segunda discusión.",
  },
  {
    day: "20",
    month: "MAY",
    title: "Cabildo Abierto en Pampatar",
    time: "04:00 PM",
    location: "Plaza de Armas",
    type: "open",
    description: "Encuentro ciudadano para escuchar propuestas y necesidades de la comunidad.",
  },
  {
    day: "28",
    month: "MAY",
    title: "Audiencia Pública de Presupuesto",
    time: "09:00 AM",
    location: "Auditorio Municipal",
    type: "session",
    description: "Presentación del proyecto de presupuesto municipal para el ejercicio fiscal.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Eventos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="eventos" className="relative py-24 sm:py-32 bg-navy-950 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 30, bounce: 0 }}
          className="text-center mb-20"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.2em] border-primary/30 text-primary bg-primary/10"
          >
            Próximamente
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Agenda Legislativa
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Mantente informado sobre las sesiones, cabildos y eventos oficiales abiertos a la participación ciudadana en nuestro municipio.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-10 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/5 to-transparent" />

          <div className="flex flex-col gap-8">
            {eventos.map((e, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative flex gap-6 sm:gap-12"
              >
                {/* Date bubble */}
                <div className="relative z-10 flex-shrink-0 w-20 h-20 rounded-3xl flex flex-col items-center justify-center bg-navy-900 border border-white/5 group-hover:border-primary/50 transition-all duration-500 shadow-2xl group-hover:shadow-glow group-hover:-translate-y-1">
                  <span className="text-3xl font-black leading-none text-white mb-1">
                    {e.day}
                  </span>
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-primary">
                    {e.month}
                  </span>
                </div>

                {/* Card */}
                <div className="flex-1 glass-card rounded-[2.5rem] p-8 group-hover:-translate-y-1 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors tracking-tight leading-none">
                      {e.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-[0.6rem] font-black uppercase tracking-widest self-start ${
                        e.type === "open"
                          ? "bg-accent/20 text-accent border border-accent/20 shadow-glow"
                          : "bg-primary text-white shadow-glow"
                      }`}
                    >
                      {e.type === "open" ? "Evento Abierto" : "Sesión Legislativa"}
                    </span>
                  </div>

                  <p className="text-xs text-white/50 mb-8 leading-relaxed max-w-xl group-hover:text-white/70 transition-colors">
                    {e.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[0.65rem] font-bold text-white/60">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {e.time}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[0.65rem] font-bold text-white/60">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {e.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
