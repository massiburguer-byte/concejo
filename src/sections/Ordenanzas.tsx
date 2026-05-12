import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const years = ["2025", "2024", "2023", "2022", "2021", "2018"];

const ordenanzasData: Record<string, { name: string; file: string }[]> = {
  "2025": [
    { name: "Creación y Condecoración Orden Médico Ejemplar", file: "CREACION Y CONDECORACION ORDEN MEDICO EJEMPLAR.pdf" },
    { name: "Impuesto sobre Inmuebles Urbanos", file: "IMPUESTO SOBRE INMUEBLES URBANOS.pdf" },
    { name: "Plan Especial de Desarrollo Urbano Av. Aldonza Manrique", file: "PROYECTO ESPECIAL DE DESARROLLO URBANO AV ALDONZA MANRIQUE.pdf" },
  ],
  "2024": [
    // Pásame los nombres aquí para agregarlos
  ],
  "2023": [
    { name: "Expendio de Bebidas y Especies Alcohólicas", file: "EXPEDIO DE BEBIDAS Y ESPECIES ALCOHOLICAS.pdf" },
    { name: "Honor a la Cultura Jesús Ávila", file: "HONOR A LA CULTURA JESUS AVILA.pdf" },
    { name: "Impuesto sobre Vehículos", file: "IMPUESTO SOBRE VEHICULOS.pdf" },
    { name: "Orden Lech Naleska", file: "ORDEN LECH NALESKA.pdf" },
    { name: "Servicio de Aseo Urbano, Rural y Domiciliario", file: "SERVICIO DE ASEO URBANO,RURAL Y DOMICILIARIO.pdf" },
  ],
  "2022": [
    { name: "Poda, Tala, Repoblación y Trasplante de Árboles", file: "PODA,TALA,REPOBLACION Y TRANSPLANTE DE ARBOLES.pdf" },
    { name: "Presupuesto Anual de Ingresos y Gastos 2022", file: "PRESUPUESTO ANUEL DE INGRESO Y GASTOS 2022..pdf" },
  ],
  "2021": [
    { name: "Creación del Servicio de Administración Tributaria SEDEMADRI", file: "CREACION DEL SERVICIO DE ADMINISTRACION TRIBUTARIA SEDEMADRI.pdf" },
    { name: "Inclusión a la Primera Experiencia Laboral de la Juventud", file: "INCLUSION A LA PRIMERA EXPERIENCIA LABORAL DE LA JUVENTUD.pdf" },
    { name: "Régimen Parlamentario del Municipio Maneiro", file: "REGIMEN PARLAMENTARIO DEL MUNICIPIO MANEIRO.pdf" },
    { name: "Revisión y Recargos de Multas e Impuestos", file: "REVISION Y RECARGOS DE MULTAS E IMPUESTOS DE ACTIVIDADES ECONOMICAS DE INDUSTRIA.pdf" },
  ],
  "2018": [
    { name: "Bienes Municipales", file: "BIENES MUNICIPALES PDF.pdf" },
    { name: "Comercio Informal", file: "COMERCIO INFORMAL.pdf" },
    { name: "Contribuciones Especiales por Plusvalías", file: "CONTRIBUCIONES ESPECIALES POR PLUSVALIAS.pdf" },
    { name: "Creación de SEDEMATRI", file: "CREACION DE SEDEMATRI.pdf" },
    { name: "Servicio Desconcentrado Municipal de Adm. Tributaria", file: "CREACION DEL SERICIO DESCONCENTRADO MUNICIPAL DE ADM TRIBUTARIA.pdf" },
    { name: "Impuesto sobre Actividades Económicas", file: "IMPUESTO SOBRE ACTIVIDADES ECONOMICAS.pdf" },
    { name: "Incumplimiento por Aparcamiento de Vehículo", file: "INCUMPLIMIENTO  POR APARCAMIENTO DE VEHICULO.pdf" },
  ],
};

export default function Ordenanzas() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [search, setSearch] = useState("");

  const filteredDocs = ordenanzasData[selectedYear]?.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="ordenanzas" className="relative py-24 sm:py-32 bg-navy-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-primary/30 text-primary bg-primary/10"
          >
            Marco Legal
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Ordenanzas Municipales
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Consulta y descarga las leyes municipales vigentes y gacetas oficiales del municipio Maneiro.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Years */}
          <div className="w-full md:w-48 flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                  selectedYear === year
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-card text-muted-foreground border-white/5 hover:border-primary/30 hover:text-foreground"
                }`}
              >
                Año {year}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por título de ordenanza..."
                className="pl-11 h-12 bg-card border-white/5 focus:border-primary/50 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocs?.map((doc, i) => (
                <motion.div
                  key={doc.file}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold mb-4 line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                    {doc.name}
                  </h3>
                  <a
                    href={`/docs/ordenanzas/${selectedYear}/${doc.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    DESCARGAR PDF
                  </a>
                </motion.div>
              ))}
              
              {filteredDocs?.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-muted-foreground italic">No se encontraron ordenanzas para este año.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
