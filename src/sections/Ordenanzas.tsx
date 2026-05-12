import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Download, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const years = [2026, 2025, 2024, 2023, 2022];

const ordenanzas = [
  {
    year: 2026,
    docs: [
      { name: "Ordenanza sobre la Gestión de Residuos y Desechos Sólidos", file: "residuos-2026.pdf" },
      { name: "Ordenanza sobre Actividades Económicas y Comercio Municipal", file: "actividades-economicas-2026.pdf" },
      { name: "Ordenanza de Convivencia Ciudadana y Civismo", file: "convivencia-2026.pdf" },
    ]
  },
  {
    year: 2025,
    docs: [
      { name: "Ordenanza de Presupuesto de Ingresos y Gastos Ejercicio 2025", file: "presupuesto-2025.pdf" },
      { name: "Ordenanza sobre Tasas por Servicios Administrativos", file: "tasas-2025.pdf" },
      { name: "Reforma de la Ordenanza de Impuesto sobre Inmuebles Urbanos", file: "inmuebles-2025.pdf" },
    ]
  }
];

export default function Ordenanzas() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const currentDocs = ordenanzas.find(o => o.year === selectedYear)?.docs.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <section id="ordenanzas" className="relative py-24 sm:py-32 bg-navy-950 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.2em] border-primary/30 text-primary bg-primary/10">
            Marco Legal
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Ordenanzas Municipales
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Consulta y descarga el marco legal vigente que rige nuestro municipio. Transparencia y acceso a la información pública.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap justify-center gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedYear === year
                    ? "bg-primary text-white shadow-glow"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              type="text"
              placeholder="Buscar por nombre..."
              className="pl-12 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/30 focus:ring-primary/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Docs Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentDocs.length > 0 ? (
            currentDocs.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative p-8 rounded-3xl glass-card"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:shadow-glow transition-all duration-500">
                  <FileText className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-bold mb-6 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors leading-tight">
                  {doc.name}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <a
                    href={`/docs/ordenanzas/${selectedYear}/${doc.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.7rem] font-black text-primary hover:text-primary/80 transition-all uppercase tracking-widest"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </a>
                  <Badge variant="outline" className="text-[0.6rem] border-white/10 text-muted-foreground">
                    PDF
                  </Badge>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <Filter className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-white/40 font-medium">No se encontraron documentos para este año o búsqueda.</p>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 rounded-[2.5rem] bg-gradient-to-r from-primary/20 to-accent/5 border border-white/10 text-center"
        >
          <h3 className="text-xl font-bold mb-2">¿Necesitas un documento específico?</h3>
          <p className="text-sm text-white/60 mb-6">Si no encuentras la gaceta que buscas, puedes solicitarla en nuestras oficinas.</p>
          <button className="px-8 py-3 rounded-xl bg-white text-navy-950 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl">
            Atención al Ciudadano
          </button>
        </motion.div>
      </div>
    </section>
  );
}
