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
  cardImage?: string;
  commission: string;
  commissionsList?: string[];
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
    cardImage: "/images/concejales/tarjetas/tarjeta-carolina.jpg",
    commission: "Comisión de Salud, Desarrollo Social Vecinal y Participación Ciudadana",
    commissionsList: [
      "Presidenta de la Comisión de Salud, Desarrollo Social Vecinal y Participación Ciudadana."
    ],
    description: "Liderando la gestión legislativa con visión estratégica y humana, promoviendo la salud comunitaria, el bienestar integral de las familias y la activa participación ciudadana en Maneiro.",
    initiatives: [
      "Jornadas Integrales de Salud Vecinal y Preventiva",
      "Plan de Acercamiento Parlamentario Vecinal",
      "Modernización y Transparencia del Régimen Legislativo"
    ],
    order: 1
  },
  {
    name: "Eulys Cedeño",
    role: "1ra Vicepresidenta",
    handle: "@eulyscedenomaneiro",
    image: "/images/concejales/eulys.png",
    avatar: "/images/avatars/eulys.png",
    cardImage: "/images/concejales/tarjetas/tarjeta-eulys.jpg",
    commission: "Comisión de Legislación y Ejidos",
    commissionsList: [
      "Presidenta de la Comisión de Legislación y Ejidos."
    ],
    description: "Impulsando el perfeccionamiento del marco normativo municipal, regularización de tierras y ejidos, garantizando la seguridad jurídica y la convivencia comunitaria.",
    initiatives: [
      "Actualización y Revisión de Ordenanzas Municipales",
      "Regularización Jurídica de Tierras y Ejidos Municipales",
      "Modernización de Procedimientos Legislativos y Gaceta"
    ],
    order: 2
  },
  {
    name: "José Gregorio Marcano",
    role: "2do Vicepresidente",
    handle: "@gregoriomarcanomaneiro",
    image: "/images/concejales/gregorio.png",
    avatar: "/images/avatars/gollo.png",
    cardImage: "/images/concejales/tarjetas/tarjeta-gregorio.jpg",
    commission: "Comisión de Hacienda Pública y Contraloría • Comisión de Educación, Cultura y Deporte",
    commissionsList: [
      "Presidente de la Comisión de Hacienda Pública y Contraloría.",
      "Presidente de la Comisión de Educación, Cultura y Deporte."
    ],
    description: "Supervisando la rigurosa fiscalización tributaria y presupuestaria, promoviendo a la par el deporte base, la excelencia educativa y la defensa del acervo cultural maneirense.",
    initiatives: [
      "Fiscalización y Control del Presupuesto Participativo",
      "Programa de Apoyo y Rescate a Escuelas y Espacios Deportivos",
      "Ordenanza Jesús Ávila al Honor y la Cultura"
    ],
    order: 3
  },
  {
    name: "Asdrúbal Delgado",
    role: "Concejal de Maneiro",
    handle: "@asdrubaldelgadomaneiro",
    image: "/images/concejales/asdrubal.png",
    avatar: "/images/avatars/asdrubal.png",
    cardImage: "/images/concejales/tarjetas/tarjeta-asdrubal.jpg",
    commission: "Comisión de Urbanismo, Infraestructura, Permisología y Servicios Públicos",
    commissionsList: [
      "Presidente de la Comisión de Urbanismo, Infraestructura, Permisología y Servicios Públicos."
    ],
    description: "Articulando con las comunidades el ordenamiento territorial planificado, la optimización de los servicios públicos esenciales y la celeridad en permisologías para el desarrollo sustentable.",
    initiatives: [
      "Plan Especial de Desarrollo Urbano e Infraestructura",
      "Supervisión y Eficiencia en Servicios de Agua y Electricidad",
      "Modernización de Trámites de Permisología Urbana"
    ],
    order: 4
  },
  {
    name: "Haroldo Rojas",
    role: "Concejal de Maneiro",
    handle: "@haroldorojasmaneiro",
    image: "/images/concejales/harolds.png",
    avatar: "/images/avatars/harolds.png",
    cardImage: "/images/concejales/tarjetas/tarjeta-harolds.jpg",
    commission: "Comisión de Seguridad, Orden Público y Espectáculos Públicos • Comisión de Jubilaciones",
    commissionsList: [
      "Presidente de la Comisión de Seguridad, Orden Público y Espectáculos Públicos.",
      "Presidente de la Comisión de Jubilaciones."
    ],
    description: "Trabajando en el fortalecimiento de la paz ciudadana, la convivencia nocturna ordenada y el reconocimiento y protección social digna a los trabajadores jubilados del municipio.",
    initiatives: [
      "Ordenanza de Seguridad, Convivencia y Espectáculos Públicos",
      "Protección y Reivindicación Integral a Servidores Jubilados",
      "Mesas Preventivas de Paz y Seguridad Cuadrantes"
    ],
    order: 5
  },
  {
    name: "Gilberto Rojas",
    role: "Concejal de Maneiro",
    handle: "@gilbertorojasmaneiro",
    image: "/images/concejales/gilberto.png",
    avatar: "/images/avatars/gilberto.png",
    cardImage: "/images/concejales/tarjetas/tarjeta-gilberto.jpg",
    commission: "Comisión de Turismo, Sitios Históricos, Naturales de Recreación y Conservación",
    commissionsList: [
      "Presidente de la Comisión de Turismo, Sitios Históricos, Naturales de Recreación y Conservación."
    ],
    description: "Consolidando a Maneiro y Pampatar como el polo de turismo histórico y ecológico por excelencia de Margarita, velando por la conservación de sus monumentos y áreas protegidas.",
    initiatives: [
      "Ruta Histórica y Turística del Casco Colonial de Pampatar",
      "Conservación y Limpieza de Zonas Costeras y Senderos Ecológicos",
      "Ordenanza de Protección al Patrimonio Histórico y Turístico"
    ],
    order: 6
  },
  {
    name: "Ana González",
    role: "Concejal de Maneiro",
    handle: "@anagonzalezmaneiro",
    image: "/images/concejales/ana-gonzalez.png",
    avatar: "/images/avatars/ana.png",
    commission: "Comisión de Desarrollo Social, Familia y Adulto Mayor",
    commissionsList: [
      "Presidenta de la Comisión de Desarrollo Social, Familia y Adulto Mayor."
    ],
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
    <section id="concejales" className="py-6 sm:py-10 bg-[#f4f7fb] relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section (Compacto y centrado o limpio) */}
        <div className="mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-3 h-3" />
            <span>Cuerpo Legislativo</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Concejales de Maneiro
          </h2>
        </div>

        {/* Carousel Container con flechas centradas verticalmente en el medio de las tarjetas */}
        <div className="relative px-0 sm:px-12">
          
          {/* Flecha Izquierda centrada verticalmente */}
          <button
            onClick={prev}
            aria-label="Concejal anterior"
            className="absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200/90 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Flecha Derecha centrada verticalmente */}
          <button
            onClick={next}
            aria-label="Concejal siguiente"
            className="absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200/90 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Concejales Slider: Tarjetas Pro tipo credencial ejecutiva, sin espacios vacíos */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <motion.div
              animate={{ x: `-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 2))}%` }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="flex gap-3 sm:gap-5"
            >
            {CONCEJALES_DATA.map((c) => (
              <motion.div
                key={c.name}
                className="min-w-full sm:min-w-[calc(50%-0.75rem)] bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedConcejal(c)}
              >
                <div>
                  {/* Top Header Card Visual: Inspirado exactamente en las fotos oficiales del Concejo */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#0d2242] to-[#153460]">
                    {/* Background Palace Graphic / Ambient Glow */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('/images/banner-sede-bienvenidos.jpg')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Ribbon de la bandera de Maneiro (Verde / Blanco / Azul) como en el arte oficial */}
                    <div className="absolute bottom-0 inset-x-0 h-2 flex flex-col z-10">
                      <div className="h-0.5 bg-emerald-500" />
                      <div className="h-1 bg-white" />
                      <div className="h-0.5 bg-blue-700" />
                    </div>

                    {/* Escudo / Logo Superior */}
                    <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                        <img src="/images/logo.png" alt="Concejo Maneiro" className="h-4 w-auto object-contain" />
                        <span className="text-[10px] font-bold text-white tracking-wider uppercase">Concejo Maneiro</span>
                      </div>
                    </div>

                    {/* Foto Oficial del Concejal Recortada sobre el Fondo */}
                    <div className="absolute bottom-2 left-4 z-10 flex items-end gap-3.5">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ring-2 ring-white/90 p-0.5 bg-white shadow-xl overflow-hidden flex items-center justify-center">
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="w-full h-full object-cover object-top rounded-xl"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = c.image;
                            }}
                          />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-xs" />
                      </div>

                      <div className="mb-1 text-white">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-sky-300">
                          CONCEJAL
                        </div>
                        <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 drop-shadow">
                          <span>{c.name}</span>
                          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-2xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        </h3>
                        <span className="inline-block text-[10px] sm:text-[11px] font-bold text-emerald-300 bg-emerald-950/60 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-400/30">
                          {c.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    {/* Comisiones Asignadas Oficiales */}
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50/80 to-slate-50 border border-blue-100/80 mb-3 shadow-2xs">
                      <div className="text-[9px] font-extrabold uppercase tracking-wider text-blue-700 mb-1 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                        <span>Comisión Responsable</span>
                      </div>
                      <div className="space-y-1">
                        {c.commissionsList && c.commissionsList.length > 0 ? (
                          c.commissionsList.map((comm, idx) => (
                            <p key={idx} className="text-xs font-bold text-slate-800 leading-snug">
                              {comm}
                            </p>
                          ))
                        ) : (
                          <p className="text-xs font-bold text-slate-800 leading-snug">
                            {c.commission}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-1">
                      {c.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedConcejal(c);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-[#122b52] hover:from-blue-700 hover:to-blue-600 text-white text-xs font-bold transition-all shadow-sm group-hover:shadow-md"
                  >
                    <span>Ver Afiche Oficial & Detalles</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          </div>
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
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Afiche Oficial si está disponible */}
              {selectedConcejal.cardImage && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 max-w-sm mx-auto">
                  <img
                    src={selectedConcejal.cardImage}
                    alt={`Tarjeta Oficial ${selectedConcejal.name}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Comisión Asignada
                </h4>
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                  {selectedConcejal.commissionsList && selectedConcejal.commissionsList.length > 0 ? (
                    selectedConcejal.commissionsList.map((comm, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm font-bold text-blue-950">
                          {comm}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm font-bold text-blue-950">
                        {selectedConcejal.commission}
                      </p>
                    </div>
                  )}
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
