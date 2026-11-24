import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  ShieldCheck, 
  Users, 
  FileText, 
  MessageCircle, 
  Briefcase, 
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConcejalInfo {
  name: string;
  role: string;
  handle: string;
  image: string;
  avatar: string;
  commission: string;
  description: string;
  initiatives: string[];
  order: number;
}

const CONCEJALES_DATA: ConcejalInfo[] = [
  {
    name: "Carolina Guerra",
    role: "Presidenta de Cámara",
    handle: "@carolinaguerramaneiro",
    image: "/images/concejales/carolina.png",
    avatar: "/images/avatars/carolina.png",
    commission: "Legislación, Coordinación y Asuntos Institucionales",
    description: "Liderando la gestión legislativa con visión estratégica, garantizando el debate plural, la transparencia y el consenso para el progreso de todo el municipio Maneiro.",
    initiatives: [
      "Modernización y Digitalización de la Gaceta Municipal",
      "Plan de Acercamiento Parlamentario Vecinal",
      "Actualización del Régimen Parlamentario"
    ],
    order: 1
  },
  {
    name: "Eulys Cedeño",
    role: "1ra Vicepresidenta",
    handle: "@eulyscedenomaneiro",
    image: "/images/concejales/eulys.png",
    avatar: "/images/avatars/eulys.png",
    commission: "Educación, Cultura, Juventud y Deporte",
    description: "Impulsando el desarrollo del talento joven maneirense, la preservación del acervo histórico y el fomento de espacios deportivos y culturales.",
    initiatives: [
      "Ordenanza Jesús Ávila al Honor y la Cultura",
      "Programa Primera Experiencia Laboral Juvenil",
      "Rescate de Espacios Deportivos Comunitarios"
    ],
    order: 2
  },
  {
    name: "José Gregorio Marcano",
    role: "2do Vicepresidente",
    handle: "@gregoriomarcanomaneiro",
    image: "/images/concejales/gregorio.png",
    avatar: "/images/avatars/gollo.png",
    commission: "Urbanismo, Servicios Públicos y Ejidos",
    description: "Dedicado a la planificación urbana ordenada, regularización de tierras y optimización de los servicios básicos para las comunidades de Pampatar y Los Robles.",
    initiatives: [
      "Plan Especial de Desarrollo Urbano Av. Aldonza Manrique",
      "Regulación y Gestión del Aseo Domiciliario",
      "Protección del Arbolado Urbano y Áreas Verdes"
    ],
    order: 3
  },
  {
    name: "Asdrúbal Delgado",
    role: "Concejal de Maneiro",
    handle: "@asdrubaldelgadomaneiro",
    image: "/images/concejales/asdrubal.png",
    avatar: "/images/avatars/asdrubal.png",
    commission: "Seguridad Ciudadana, Movilidad y Convivencia",
    description: "Trabajando en la calle junto a los vecinos de cada sector para transformar el marco legal en orden público, seguridad vial y tranquilidad para todas las familias.",
    initiatives: [
      "Ordenanza de Movilidad y Convivencia Vial",
      "Iniciativa Cero Ruidos Molestos en Comunidades",
      "Mesas de Convivencia y Seguridad Vecinal"
    ],
    order: 4
  },
  {
    name: "Haroldo Rojas",
    role: "Concejal de Maneiro",
    handle: "@haroldorojasmaneiro",
    image: "/images/concejales/harolds.png",
    avatar: "/images/avatars/harolds.png",
    commission: "Turismo, Emprendimiento y Desarrollo Económico",
    description: "Fomentando la inversión privada, el crecimiento del sector comercial y la consolidación de Maneiro como la capital gastronómica y turística de Margarita.",
    initiatives: [
      "Régimen Simplificado para Nuevos Emprendimientos",
      "Ordenanza del Instituto Municipal de Turismo (IMTURM)",
      "Incentivos Tributarios para el Comercio Local"
    ],
    order: 5
  },
  {
    name: "Gilberto Rojas",
    role: "Concejal de Maneiro",
    handle: "@gilbertorojasmaneiro",
    image: "/images/concejales/gilberto.png",
    avatar: "/images/avatars/gilberto.png",
    commission: "Finanzas Públicas, Presupuesto y Hacienda",
    description: "Supervisando la correcta asignación presupuestaria y una recaudación municipal justa y equilibrada que se traduzca en obras reales para el municipio.",
    initiatives: [
      "Revisión y Estabilidad de Tasas por Servicios Públicos",
      "Ordenanza del Presupuesto Anual Participativo",
      "Modernización de Procedimientos Tributarios"
    ],
    order: 6
  },
  {
    name: "Ana González",
    role: "Concejal de Maneiro",
    handle: "@anagonzalezmaneiro",
    image: "/images/concejales/ana-gonzalez.png",
    avatar: "/images/avatars/ana.png",
    commission: "Desarrollo Social, Familia y Adulto Mayor",
    description: "Promoviendo políticas de inclusión, salud comunitaria, protección integral para la mujer y atención digna a los adultos mayores de nuestro municipio.",
    initiatives: [
      "Ordenanza de Protección al Adulto Mayor y Economía Plateada",
      "Creación del Instituto Municipal de la Mujer (IMMUJER)",
      "Jornadas de Atención Integral en Sectores Vulnerables"
    ],
    order: 7
  }
];

export default function Concejales() {
  const [selectedConcejal, setSelectedConcejal] = useState<ConcejalInfo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % CONCEJALES_DATA.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + CONCEJALES_DATA.length) % CONCEJALES_DATA.length);
  };

  return (
    <section id="concejales" className="py-12 sm:py-20 bg-[#f4f7fb] relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section with Navigation Buttons (Más compacto y directo) */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
              <Users className="w-3 h-3" />
              <span>Cuerpo Legislativo</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Concejales de Maneiro
            </h2>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-all hover:scale-105 active:scale-95"
              aria-label="Concejal anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-all hover:scale-105 active:scale-95"
              aria-label="Concejal siguiente"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Concejales Slider: Tarjetas Pro tipo credencial ejecutiva, sin espacios vacíos */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: `-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 2))}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="flex gap-4 sm:gap-6"
          >
            {CONCEJALES_DATA.map((c) => (
              <motion.div
                key={c.name}
                className="min-w-full sm:min-w-[calc(50%-0.75rem)] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedConcejal(c)}
              >
                <div>
                  {/* Top Profile Header */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-2 sm:ring-3 ring-sky-500/80 p-0.5 bg-white shadow-sm overflow-hidden flex items-center justify-center">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-full h-full object-cover object-top rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = c.image;
                          }}
                        />
                      </div>
                      {/* Active Status Dot */}
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                          {c.name}
                        </h3>
                        {/* Blue Verified Check */}
                        <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-2xs" title="Verificado">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium truncate">
                        {c.handle}
                      </p>
                      <span className="inline-block mt-1 text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        {c.role}
                      </span>
                    </div>
                  </div>

                  {/* Commission Badge Compacto */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-2.5">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-slate-500" />
                      <span>Comisión Responsable</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {c.commission}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {c.description}
                  </p>
                </div>

                {/* Bottom Action Button Compacto */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedConcejal(c);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-2xs group-hover:shadow-sm"
                  >
                    <span>Ver Perfil & Comisiones</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slider Indicators */}
        <div className="flex justify-center gap-1.5 mt-5">
          {CONCEJALES_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Ir a concejal ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-6 bg-blue-600 shadow" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>

      </div>

      {/* Concejal Detail Modal */}
      <Dialog open={!!selectedConcejal} onOpenChange={(open) => !open && setSelectedConcejal(null)}>
        {selectedConcejal && (
          <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#1e3a8a] p-6 text-white relative">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full ring-3 ring-sky-400 p-0.5 bg-white shadow-md overflow-hidden shrink-0">
                  <img
                    src={selectedConcejal.avatar}
                    alt={selectedConcejal.name}
                    className="w-full h-full object-cover object-top rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = selectedConcejal.image;
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-lg font-bold text-white tracking-tight">
                      {selectedConcejal.name}
                    </DialogTitle>
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  </div>
                  <DialogDescription className="text-xs text-white/70">
                    {selectedConcejal.handle} • {selectedConcejal.role}
                  </DialogDescription>
                  <span className="inline-block mt-1 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-md border border-emerald-400/30">
                    Periodo 2024 – 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Comisión Asignada
                </h4>
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-bold text-blue-950">
                    {selectedConcejal.commission}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Gestión y Compromiso
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedConcejal.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Iniciativas y Proyectos Clave
                </h4>
                <ul className="space-y-2">
                  {selectedConcejal.initiatives.map((init, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{init}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    const query = selectedConcejal.name.includes("Asdrúbal") ? "Movilidad" : selectedConcejal.initiatives[0];
                    window.dispatchEvent(new CustomEvent("filter-ordenanza", { detail: { query } }));
                    setSelectedConcejal(null);
                    document.querySelector("#ordenanzas")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold py-2.5"
                >
                  <FileText className="w-3.5 h-3.5 mr-1.5" />
                  Ver Ordenanzas Relacionadas
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedConcejal(null);
                    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold py-2.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  Solicitar Audiencia
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
