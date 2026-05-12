import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Briefcase,
  ChevronDown,
  Info
} from "lucide-react";

const structure = {
  president: {
    title: "Presidente",
    icon: ShieldCheck,
    color: "bg-primary shadow-glow",
  },
  vices: [
    { title: "1er Vice-Presidente", icon: Users },
    { title: "2do Vice-Presidente", icon: Users },
  ],
  legislative: [
    { title: "Secretaría de Cámara", icon: FileText },
    { title: "Cronista del Municipio", icon: FileText },
    { title: "Auditoría Interna", icon: ShieldCheck },
  ],
  commissions: [
    "Legislación y Ejidos",
    "Finanzas Públicas",
    "Turismo y Recreación",
    "Educación y Cultura",
    "Urbanismo y Servicios",
    "Seguridad Ciudadana",
    "Salud y Desarrollo Social",
  ],
  administration: [
    "Recursos Humanos",
    "Dirección de Administración",
    "Consultoría Jurídica",
    "Atención al Ciudadano",
    "Informática",
  ]
};

export default function Organigrama() {
  return (
    <section id="organigrama" className="relative py-24 sm:py-32 bg-navy-950 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Transparencia
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Estructura Organizativa
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Conoce la jerarquía y las diferentes comisiones que integran el Concejo Municipal de Maneiro, diseñadas para una gestión eficiente y transparente.
          </p>
        </motion.div>

        {/* Visual Chart - Simplified Interactive Version */}
        <div className="flex flex-col items-center gap-12">
          {/* Level 1: President */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-8 px-12 rounded-[2.5rem] border-primary/50 shadow-glow flex flex-col items-center group cursor-pointer hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-glow">
                <structure.president.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight uppercase tracking-widest text-xs mb-1">
                {structure.president.title}
              </h3>
              <p className="text-primary font-black text-[0.6rem] uppercase tracking-widest">Máxima Autoridad</p>
            </div>
            {/* Connector */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-primary to-white/10" />
          </motion.div>

          {/* Level 2: Vices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative">
            {/* Horizontal Connector for Vices */}
            <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-px bg-white/10" />
            
            {structure.vices.map((vice, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center"
              >
                <div className="md:absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-white/10" />
                <div className="glass-card p-6 px-10 rounded-[2rem] flex flex-col items-center group hover:border-primary/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <vice.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-sm font-black text-white/90 uppercase tracking-widest">{vice.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Level 3: Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12">
            {/* Commissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2.5rem] hover:border-accent/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-accent" />
                </div>
                <h5 className="text-sm font-black text-white uppercase tracking-widest">Comisiones Permanente</h5>
              </div>
              <div className="space-y-3">
                {structure.commissions.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                    {c}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Legislative Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h5 className="text-sm font-black text-white uppercase tracking-widest">Apoyo Legislativo</h5>
              </div>
              <div className="space-y-4">
                {structure.legislative.map((l, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                    <p className="text-xs font-bold text-white/70">{l.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Administration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-[2.5rem] hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-emerald-500" />
                </div>
                <h5 className="text-sm font-black text-white uppercase tracking-widest">Gestión Adm.</h5>
              </div>
              <div className="space-y-3">
                {structure.administration.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                    {a}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 max-w-2xl text-center">
            <Info className="w-6 h-6 text-primary mx-auto mb-4" />
            <p className="text-xs text-white/40 leading-relaxed mb-6">
              Para ver el detalle técnico completo y las coordinaciones subordinadas, puedes descargar o visualizar el organigrama institucional en alta resolución.
            </p>
            <button className="px-8 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-white text-[0.7rem] font-black uppercase tracking-widest shadow-glow transition-all hover:-translate-y-1">
              Ver Organigrama Institucional HD
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
