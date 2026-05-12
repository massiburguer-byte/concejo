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
    <section id="eventos" className="relative py-24 sm:py-32 bg-navy-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 30, bounce: 0 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-primary/30 text-primary bg-primary/10"
          >
            Próximamente
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Agenda Legislativa
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Participa en las sesiones y eventos abiertos del concejo municipal.
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
          <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="flex flex-col gap-6">
            {eventos.map((e, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative flex gap-4 sm:gap-8 pl-2"
              >
                {/* Date bubble */}
                <div className="relative z-10 flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center bg-card border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300 shadow-lg">
                  <span className="text-lg sm:text-xl font-extrabold leading-none text-foreground">
                    {e.day}
                  </span>
                  <span className="text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {e.month}
                  </span>
                </div>

                {/* Connector dot */}
                <div className="absolute left-[2.6rem] sm:left-[3.3rem] top-6 w-3 h-3 rounded-full bg-primary border-2 border-navy-900 shadow-glow group-hover:scale-125 transition-transform" />

                {/* Card */}
                <div className="flex-1 rounded-2xl bg-card border border-white/5 p-5 sm:p-6 hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {e.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider self-start ${
                        e.type === "open"
                          ? "bg-gold/10 text-gold border border-gold/20"
                          : "bg-primary/10 text-primary border border-primary/20"
                      }`}
                    >
                      {e.type === "open" ? "Cabildo" : "Sesión"}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {e.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {e.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {e.location}
                    </span>
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
