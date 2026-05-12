import { motion } from "framer-motion";
import { 
  FileText, 
  Users, 
  MapPin, 
  Scale, 
  Info,
  CalendarDays
} from "lucide-react";

const links = [
  {
    icon: FileText,
    label: "Gacetas Oficiales",
    href: "#ordenanzas",
    color: "bg-blue-500/10 text-blue-500",
    description: "Consulta el marco legal vigente."
  },
  {
    icon: Users,
    label: "Concejales",
    href: "#concejales",
    color: "bg-purple-500/10 text-purple-500",
    description: "Conoce a tus representantes."
  },
  {
    icon: CalendarDays,
    label: "Sesiones",
    href: "#eventos",
    color: "bg-amber-500/10 text-amber-500",
    description: "Calendario de actividades legislativas."
  },
  {
    icon: Scale,
    label: "Legislación",
    href: "#ordenanzas",
    color: "bg-emerald-500/10 text-emerald-500",
    description: "Leyes y reglamentos municipales."
  },
  {
    icon: MapPin,
    label: "Sede Municipal",
    href: "#contacto",
    color: "bg-rose-500/10 text-rose-500",
    description: "Ubicación y atención al ciudadano."
  },
  {
    icon: Info,
    label: "Atención",
    href: "#contacto",
    color: "bg-cyan-500/10 text-cyan-500",
    description: "Preguntas y trámites administrativos."
  }
];

export default function AccesosRapidos() {
  return (
    <section className="relative -mt-16 z-30 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group glass-premium p-6 rounded-3xl hover:bg-white/10 transition-all duration-500 border border-white/5 hover:border-primary/30 hover:-translate-y-2 flex flex-col items-center text-center shadow-2xl"
            >
              <div className={`w-14 h-14 rounded-2xl ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                <link.icon className="w-7 h-7" />
              </div>
              <h3 className="text-[0.7rem] font-black uppercase tracking-widest text-white/90 group-hover:text-primary transition-colors">
                {link.label}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
