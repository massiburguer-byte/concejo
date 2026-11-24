import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Briefcase, 
  Download
} from "lucide-react";

interface TabSection {
  id: string;
  label: string;
  icon: any;
}

const TABS: TabSection[] = [
  { id: "directiva", label: "Junta Directiva", icon: ShieldCheck },
  { id: "comisiones", label: "Comisiones Legislativas", icon: Scale },
  { id: "control", label: "Secretaría y Control", icon: FileText },
  { id: "admin", label: "Direcciones y Atención", icon: Briefcase },
];

const DIRECTIVA = [
  {
    role: "Presidenta de Cámara",
    name: "Carolina Guerra",
    description: "Máxima representación del órgano legislativo, conducción de las sesiones plenarias y coordinación institucional.",
    badge: "Directiva",
    icon: ShieldCheck,
    color: "bg-blue-600 text-white"
  },
  {
    role: "1ra Vicepresidenta",
    name: "Eulys Cedeño",
    description: "Sustitución reglamentaria de presidencia, enlace con organizaciones comunitarias y comisiones de desarrollo.",
    badge: "Directiva",
    icon: Users,
    color: "bg-emerald-600 text-white"
  },
  {
    role: "2do Vicepresidente",
    name: "José Gregorio Marcano",
    description: "Coordinación de seguimiento a ordenanzas urbanas, servicios públicos y atención vecinal en parroquias.",
    badge: "Directiva",
    icon: Users,
    color: "bg-purple-600 text-white"
  }
];

const COMISIONES = [
  {
    name: "Comisión de Legislación y Ejidos",
    titular: "Concejalía Presidencial",
    focus: "Revisión técnica de proyectos de ordenanza, reformas y regularización jurídica de tierras ejidales."
  },
  {
    name: "Comisión de Finanzas Públicas y Presupuesto",
    titular: "Concejal Gilberto Rojas",
    focus: "Seguimiento al presupuesto municipal, tasas de servicios, recaudación y solvencia tributaria (SEDEMATRI)."
  },
  {
    name: "Comisión de Seguridad Ciudadana, Convivencia y Movilidad",
    titular: "Concejal Asdrúbal Delgado",
    focus: "Ordenanza de convivencia vial, programa cero ruidos molestos, orden público y seguridad vecinal."
  },
  {
    name: "Comisión de Urbanismo, Servicios Públicos y Ambiente",
    titular: "Concejal José Gregorio Marcano",
    focus: "Planificación territorial, aseo urbano, arbolado y ordenación de corredores viales en Maneiro."
  },
  {
    name: "Comisión de Turismo, Emprendimiento y Desarrollo Económico",
    titular: "Concejal Haroldo Rojas",
    focus: "Impulso al comercio, zonas gastronómicas de Pampatar y régimen simplificado de emprendimientos."
  },
  {
    name: "Comisión de Educación, Cultura, Deporte y Recreación",
    titular: "Concejala Eulys Cedeño",
    focus: "Preservación del patrimonio histórico, becas al mérito, orden Jesús Ávila y espacios deportivos."
  },
  {
    name: "Comisión de Desarrollo Social, Familia y Adulto Mayor",
    titular: "Concejala Ana González",
    focus: "Atención a la economía plateada, protección a la mujer (IMMUJER) y salud comunitaria."
  }
];

const CONTROL = [
  {
    title: "Secretaría de Cámara",
    duty: "Redacción de actas de sesiones, custodia del archivo legislativo y expedición de certificaciones de ordenanzas."
  },
  {
    title: "Auditoría Interna",
    duty: "Fiscalización del cumplimiento normativo, control previo y posterior de los recursos públicos municipales."
  },
  {
    title: "Cronista del Municipio Maneiro",
    duty: "Investigación, registro y divulgación de la memoria histórica, costumbres y fechas patrias de Pampatar y Los Robles."
  }
];

const ADMIN = [
  {
    title: "Dirección de Atención al Ciudadano",
    duty: "Recepción de solicitudes vecinales, denuncias, canalización de derechos de palabra y audiencias públicas."
  },
  {
    title: "Consultoría Jurídica",
    duty: "Asesoría legal a la presidencia y comisiones en la técnica legislativa y adecuación constitucional de normas."
  },
  {
    title: "Dirección de Administración y Finanzas",
    duty: "Ejecución presupuestaria, nómina del personal legislativo y compras institucionales."
  },
  {
    title: "Informática y Modernización Digital",
    duty: "Administración del portal web, gacetas digitales, redes oficiales y asistencia tecnológica."
  }
];

export default function Organigrama() {
  const [activeTab, setActiveTab] = useState("directiva");

  return (
    <section id="organigrama" className="relative py-20 sm:py-28 bg-[#f4f7fb] overflow-hidden">
      
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge
            variant="outline"
            className="mb-3 px-4 py-1 text-[11px] font-bold uppercase tracking-wider border-blue-200 text-blue-700 bg-blue-50"
          >
            Estructura Institucional
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Organigrama del Concejo Municipal
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Conoce la estructura democrática y funcional diseñada para legislar con eficacia, transparencia y cercanía al vecino.
          </p>
        </div>

        {/* Tab Selector Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          <div className="inline-flex bg-white p-1.5 rounded-full border border-slate-200/90 shadow-sm">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            
            {/* 1. Junta Directiva */}
            {activeTab === "directiva" && (
              <motion.div
                key="directiva"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {DIRECTIVA.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                            {d.badge}
                          </span>
                          <div className={`w-10 h-10 rounded-2xl ${d.color} flex items-center justify-center shadow-sm`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          {d.role}
                        </span>
                        <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                          {d.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {d.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
                        <span>Cámara Municipal de Maneiro</span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* 2. Comisiones Legislativas */}
            {activeTab === "comisiones" && (
              <motion.div
                key="comisiones"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {COMISIONES.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                        <Scale className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                        {c.name}
                      </h4>
                      <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-2">
                        {c.titular}
                      </span>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {c.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 3. Secretaría y Control */}
            {activeTab === "control" && (
              <motion.div
                key="control"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {CONTROL.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 hover:shadow-xl transition-all"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4 shadow-sm">
                      <FileText className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.duty}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 4. Direcciones y Atención */}
            {activeTab === "admin" && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {ADMIN.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.duty}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Graphic Chart Download Button */}
        <div className="mt-12 text-center">
          <a
            href="/images/organigrama.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Descargar Gráfico Estructural Completo (PNG)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
