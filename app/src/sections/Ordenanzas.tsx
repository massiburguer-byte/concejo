import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, Search, X, CheckCircle2, ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";

const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

const categories = [
  { id: "all", label: "Todas las Categorías" },
  { id: "hacienda", label: "Hacienda y Finanzas" },
  { id: "urbano", label: "Planeamiento Urbano" },
  { id: "seguridad", label: "Seguridad Ciudadana" },
  { id: "social", label: "Desarrollo Social" },
];

const categoryColors: Record<string, string> = {
  hacienda: "bg-blue-50 text-blue-700 border-blue-100",
  urbano: "bg-emerald-50 text-emerald-700 border-emerald-100",
  seguridad: "bg-red-50 text-red-700 border-red-100",
  social: "bg-indigo-50 text-indigo-700 border-indigo-100",
};

const categoryLabels: Record<string, string> = {
  hacienda: "Hacienda y Finanzas",
  urbano: "Planeamiento Urbano",
  seguridad: "Seguridad Ciudadana",
  social: "Desarrollo Social",
};

interface Ordinance {
  name: string;
  file: string;
  category: string;
  gaceta: string;
  description: string;
}

const ordenanzasData: Record<string, Ordinance[]> = {
  "2025": [
    { name: "Adulto Mayor", file: "ADULTO MAYOR.pdf", category: "social", gaceta: "Gaceta Nro. 4.225", description: "Protección ciudadana e inclusión integral para adultos mayores." },
    { name: "Convivencia Vial 1986", file: "CONVIVENCIA VIAL 1986.pdf", category: "seguridad", gaceta: "Gaceta Nro. 4.224", description: "Normativa histórica sobre tránsito y convivencia vial." },
    { name: "Creación y Condecoración Orden Médico Ejemplar", file: "CREACION Y CONDECORACION ORDEN MEDICO EJEMPLAR.pdf", category: "social", gaceta: "Gaceta Nro. 4.218", description: "Creación y otorgamiento de la distinción en honor al mérito del personal médico del municipio." },
    { name: "Economía Plateada", file: "ECONOMIA PLATEADA.pdf", category: "social", gaceta: "Gaceta Nro. 4.223", description: "Incentivos y participación económica para las personas mayores." },
    { name: "Instituto Municipal de la Mujer (IMMUJER)", file: "IMMUJER.pdf", category: "social", gaceta: "Gaceta Nro. 4.222", description: "Creación y regulación del Instituto Municipal de la Mujer." },
    { name: "Impuesto sobre Inmuebles Urbanos", file: "IMPUESTO SOBRE INMUEBLES URBANOS.pdf", category: "hacienda", gaceta: "Gaceta Nro. 4.215", description: "Regulación tributaria y catastral sobre la propiedad inmobiliaria urbana en Maneiro." },
    { name: "Instituto Municipal de Turismo (IMTURM)", file: "IMTURM.pdf", category: "urbano", gaceta: "Gaceta Nro. 4.221", description: "Regulación de actividades turísticas e institución encargada de su promoción." },
    { name: "Orden Ing. José Luis Bruzual", file: "ORDEN ING JOSE LUIS BRUZUAL.pdf", category: "social", gaceta: "Gaceta Nro. 4.220", description: "Creación de la distinción honorífica al mérito en ingeniería civil y urbana." },
    { name: "Plan Especial de Desarrollo Urbano Av. Aldonza Manrique", file: "PROYECTO ESPECIAL DE DESARROLLO URBANO AV ALDONZA MANRIQUE.pdf", category: "urbano", gaceta: "Gaceta Nro. 4.212", description: "Lineamientos urbanísticos para el crecimiento sostenible de la Avenida Aldonza Manrique." },
  ],
  "2024": [
    { name: "Impuesto sobre Actividades Económicas", file: "ORD 1745(VIGENTE Mar-24).pdf", category: "hacienda", gaceta: "Gaceta Nro. 4.120", description: "Regulación de tributos aplicables al ejercicio de actividades comerciales e industriales." },
    { name: "Impuesto sobre Juegos y Apuestas Lícitas", file: "ORD 1746AL ABRIL 2024.pdf", category: "hacienda", gaceta: "Gaceta Nro. 4.118", description: "Normativa y alícuotas tributarias para actividades lúdicas autorizadas en el municipio." },
    { name: "Tasas por Uso de Espacios Públicos y Servicios Administrativos (Reforma Abril 2024)", file: "ORD_OTA ESPACIOS PUBLICOS ABRIL 2024.pdf", category: "hacienda", gaceta: "Gaceta Nro. 4.115", description: "Actualización de tarifas administrativas y derechos de concesión de espacios públicos." },
    { name: "Emprendimientos y su Régimen Simplificado", file: "ORD_EMPRENDIMIENTO ABRIL 2024.pdf", category: "social", gaceta: "Gaceta Nro. 4.112", description: "Estímulos fiscales y simplificación de trámites para nuevos emprendedores locales." },
    { name: "Impuesto sobre Propaganda y Publicidad Comercial", file: "ORD_GME 1668 OPPC (VIGENTE 2024).pdf", category: "hacienda", gaceta: "Gaceta Nro. 4.108", description: "Tributos aplicables a la difusión publicitaria en el espacio público del municipio." },
    { name: "Impuesto sobre Espectáculos Públicos", file: "ORD_GME 1669 OEP (VIGENTE 2024).pdf", category: "hacienda", gaceta: "Gaceta Nro. 4.105", description: "Tributación por la realización de eventos de entretenimiento y shows públicos." },
    { name: "Registro y Autorización para el Expendio de Bebidas y Especies Alcohólicas", file: "ORD_GME 1670 OEBA (VIGENTE 2024).pdf", category: "hacienda", gaceta: "Gaceta Nro. 4.102", description: "Control de licencias y autorizaciones comerciales para el sector de licores." },
    { name: "Tasas por Uso de Espacios Públicos y Servicios Administrativos (Noviembre 2023)", file: "ORD_GME 1671 OTA (VIGENTE 2024).pdf", category: "hacienda", gaceta: "Gaceta Nro. 4.095", description: "Tabulador de tasas administrativas y trámites municipales de fin de año." },
    { name: "Impuesto sobre Vehículos", file: "ORD_GME 1672 OIVH (VIGENTE 2024).pdf", category: "hacienda", gaceta: "Gaceta Nro. 4.090", description: "Tasa impositiva anual aplicable a los propietarios de vehículos registrados en Maneiro." }
  ],
  "2023": [
    { name: "Expendio de Bebidas y Especies Alcohólicas", file: "EXPEDIO DE BEBIDAS Y ESPECIES ALCOHOLICAS.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.988", description: "Normativa de comercialización y horarios de venta de especies alcohólicas." },
    { name: "Honor a la Cultura Jesús Ávila", file: "HONOR A LA CULTURA JESUS AVILA.pdf", category: "social", gaceta: "Gaceta Nro. 3.985", description: "Creación del galardón municipal en honor a la música popular y folclórica de la región." },
    { name: "Impuesto sobre Vehículos", file: "IMPUESTO SOBRE VEHICULOS.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.980", description: "Regulación impositiva de patentes vehiculares correspondiente al ejercicio fiscal 2023." },
    { name: "Orden Lech Naleska", file: "ORDEN LECH NALESKA.pdf", category: "social", gaceta: "Gaceta Nro. 3.975", description: "Otorgamiento del reconocimiento municipal para líderes comunitarios destacados." },
    { name: "Servicio de Aseo Urbano, Rural y Domiciliario", file: "SERVICIO DE ASEO URBANO,RURAL Y DOMICILIARIO.pdf", category: "urbano", gaceta: "Gaceta Nro. 3.970", description: "Regulación del sistema de recolección y tratamiento de desechos sólidos municipales." },
  ],
  "2022": [
    { name: "Poda, Tala, Repoblación y Trasplante de Árboles", file: "PODA,TALA,REPOBLACION Y TRANSPLANTE DE ARBOLES.pdf", category: "urbano", gaceta: "Gaceta Nro. 3.840", description: "Normativa ambiental de manejo forestal urbano y áreas verdes en Los Robles y Pampatar." },
    { name: "Presupuesto Anual de Ingresos y Gastos 2022", file: "PRESUPUESTO ANUEL DE INGRESO Y GASTOS 2022..pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.835", description: "Aprobación de la asignación presupuestaria para el desarrollo del municipio en 2022." },
  ],
  "2021": [
    { name: "Creación del Servicio de Administración Tributaria SEDEMADRI", file: "CREACION DEL SERVICIO DE ADMINISTRACION TRIBUTARIA SEDEMADRI.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.720", description: "Estructura organizacional y base jurídica para el nuevo organismo recaudador municipal." },
    { name: "Inclusión a la Primera Experiencia Laboral de la Juventud", file: "INCLUSION A LA PRIMERA EXPERIENCIA LABORAL DE LA JUVENTUD.pdf", category: "social", gaceta: "Gaceta Nro. 3.715", description: "Programa de incentivos a empresas locales para la inserción laboral de jóvenes profesionales." },
    { name: "Régimen Parlamentario del Municipio Maneiro", file: "REGIMEN PARLAMENTARIO DEL MUNICIPIO MANEIRO.pdf", category: "social", gaceta: "Gaceta Nro. 3.710", description: "Reglamento interno de funcionamiento del Concejo Municipal de Maneiro." },
    { name: "Revisión y Recargos de Multas e Impuestos", file: "REVISION Y RECARGOS DE MULTAS E IMPUESTOS DE ACTIVIDADES ECONOMICAS DE INDUSTRIA.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.705", description: "Tabulación y actualización de recargos por mora fiscal industrial y comercial." },
  ],
  "2020": [
    { name: "Actividades Económicas", file: "ACTIVIDADES ECONOMICAS.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.650", description: "Normativa fiscal básica para el ejercicio comercial en el periodo de contingencia nacional." },
    { name: "Creación del Instituto de Deporte", file: "CREACION DE INSTITUTO DE DEPORTE.pdf", category: "social", gaceta: "Gaceta Nro. 3.645", description: "Base jurídica y estructura operativa para el fomento deportivo de la juventud." },
    { name: "Creación de la Ordenanza de la Unidad de Cálculo Municipal", file: "CREACION DE LA ORDENANZA DE LA UNIDAD DE CALCULO MUNICIPAL.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.640", description: "Establecimiento del valor referencial de cálculo impositivo para trámites y multas locales." },
    { name: "Registro Único de Contribuyentes", file: "REGISTRO UNICO DE CONTRIBUYENTES.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.635", description: "Creación del censo tributario obligatorio de comercios y contribuyentes." },
    { name: "Solvencia Única Tributaria", file: "SOLVENCIA UNICA TRIBUTARIA.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.630", description: "Regulación de requisitos y emisión del certificado de solvencia fiscal municipal." }
  ],
  "2019": [
    { name: "Creación y Publicación de la Ordenanza de Cálculo Municipal", file: "CREACION Y PUBLICACION DE LA ORDENANZA DE CALCULO MUNICIPAL.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.520", description: "Primera publicación del marco regulatorio de unidades impositivas y multas de Maneiro." },
    { name: "Reforma de la Creación de SEDEMATRI", file: "REF. CREACION DE SERVICIO DECONCENTRADO DE ADM TRIBUTARIA (SEDEMATRI).pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.515", description: "Adecuación estructural de las funciones y competencias tributarias y recaudadoras." }
  ],
  "2018": [
    { name: "Bienes Municipales", file: "BIENES MUNICIPALES PDF.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.420", description: "Normas de registro, control, resguardo y avalúo del patrimonio municipal de Maneiro." },
    { name: "Comercio Informal", file: "COMERCIO INFORMAL.pdf", category: "urbano", gaceta: "Gaceta Nro. 3.415", description: "Regulación y censo del comercio informal en espacios urbanos públicos de Pampatar." },
    { name: "Contribuciones Especiales por Plusvalías", file: "CONTRIBUCIONES ESPECIALES POR PLUSVALIAS.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.410", description: "Tributación aplicable al incremento de valor de los inmuebles derivado de obras públicas." },
    { name: "Creación de SEDEMATRI", file: "CREACION DE SEDEMATRI.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.405", description: "Decreto primario de creación de la administración tributaria del municipio." },
    { name: "Servicio Desconcentrado Municipal de Adm. Tributaria", file: "CREACION DEL SERICIO DESCONCENTRADO MUNICIPAL DE ADM TRIBUTARIA.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.400", description: "Definición y estructura legal del funcionamiento institucional de SEDEMATRI." },
    { name: "Impuesto sobre Actividades Económicas", file: "IMPUESTO SOBRE ACTIVIDADES ECONOMICAS.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.395", description: "Tabulador impositivo básico comercial, industrial y de servicios del municipio." },
    { name: "Incumplimiento por Aparcamiento de Vehículo", file: "INCUMPLIMIENTO  POR APARCAMIENTO DE VEHICULO.pdf", category: "seguridad", gaceta: "Gaceta Nro. 3.390", description: "Reglamento vial de sanciones y multas aplicables a vehículos mal estacionados." },
    { name: "Plan Especial de Desarrollo Urbano Av. Aldonza Manrique", file: "PLAN ESPECIAL DE DESARROLLO URBANO AV ALDONZA MANRIQUE.pdf", category: "urbano", gaceta: "Gaceta Nro. 3.385", description: "Fijación de retiros, densidad y zonificación de la Av. Aldonza Manrique." },
    { name: "Procedimientos Tributarios", file: "PROCEDIMIENTOS TRIBUTARIOS.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.380", description: "Establecimiento de las pautas jurídicas y administrativas para reclamos y fiscalización." },
    { name: "Procedimientos y Requisitos para Funcionarios de SEDEMATRI", file: "PROCEDIMIENTOS Y REQUISITOS PARA DETERMINACION D EPAGOS A FUNCIONARIOS ADSCRITOS A SEDEMATRI.pdf", category: "hacienda", gaceta: "Gaceta Nro. 3.375", description: "Estatuto administrativo y de remuneraciones del personal adscrito a SEDEMATRI." },
    { name: "Protección Ciudadana a los Adultos Mayores", file: "PROTECCION CIUDADANA A LOS ADULTOS MAYORES.pdf", category: "social", gaceta: "Gaceta Nro. 3.370", description: "Programa de asistencia integral y defensa de derechos de los adultos mayores de Maneiro." },
    { name: "Uso de Plazas Públicas", file: "USO DE PLAZAS PUBLICAS.pdf", category: "urbano", gaceta: "Gaceta Nro. 3.365", description: "Reglas de convivencia y otorgamiento de permisos para actividades colectivas." }
  ],
};

export default function Ordenanzas() {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const isSearching = search.trim() !== "";

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedYear]);

  // Dynamic filter query
  const filteredDocs = Object.entries(ordenanzasData).flatMap(([year, docs]) =>
    docs
      .filter((doc) => {
        const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || 
                             doc.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
        const matchesYear = selectedYear === "all" || year === selectedYear;
        return matchesSearch && matchesCategory && matchesYear;
      })
      .map((doc) => ({ ...doc, year }))
  );

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);
  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Helper function to highlight matching search term
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-100 text-amber-950 rounded px-1 font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <section id="ordenanzas" className="relative py-24 sm:py-32 bg-[#f0f4f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Sidebar Filters */}
          <div className="w-full lg:w-80 flex flex-col gap-8 flex-shrink-0">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 leading-[1.1] tracking-tight">
                Ordenanzas Municipales
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                Acceda al marco legal vigente del Municipio Maneiro de forma transparente y organizada.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por palabra clave..."
                className="pl-11 pr-10 h-12 bg-white border-slate-200 focus:border-primary/50 rounded-xl shadow-sm text-slate-800 text-sm placeholder:text-slate-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {isSearching && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div>
              <span className="text-[0.65rem] font-black text-slate-400 tracking-wider mb-3 block uppercase">
                Filtrar por Categoría
              </span>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all duration-300 border text-left ${
                      selectedCategory === cat.id
                        ? "bg-primary text-white border-primary shadow-glow"
                        : "bg-white text-slate-600 border-slate-200 hover:border-primary/30 hover:text-slate-900 shadow-sm"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Filters */}
            <div>
              <span className="text-[0.65rem] font-black text-slate-400 tracking-wider mb-3 block uppercase">
                Filtrar por Año
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedYear("all")}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                    selectedYear === "all"
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-primary/30 hover:text-slate-950 shadow-sm"
                  }`}
                >
                  Todos
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                      selectedYear === year
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-primary/30 hover:text-slate-950 shadow-sm"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Cards List */}
          <div className="flex-1 w-full flex flex-col gap-6">
            
            {/* Header info */}
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 flex items-center justify-between">
              <span>
                Mostrando <span className="text-primary">{filteredDocs.length}</span> documentos encontrados
              </span>
              {(isSearching || selectedCategory !== "all" || selectedYear !== "all") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("all");
                    setSelectedYear("all");
                  }}
                  className="text-primary hover:text-primary/80 transition-colors lowercase font-bold"
                >
                  [limpiar filtros]
                </button>
              )}
            </div>

            {/* Horizontal cards container */}
            <div className="flex flex-col gap-4">
              {paginatedDocs.map((doc, i) => (
                <motion.div
                  key={doc.file}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                  className="group relative bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  {/* Left Side: Badges, Title, Desc */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className={`px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider border ${categoryColors[doc.category]}`}>
                        {categoryLabels[doc.category]}
                      </span>
                      <span className="text-[0.65rem] font-bold text-slate-400">
                        {doc.gaceta}
                      </span>
                      <span className="text-[0.65rem] font-bold text-slate-300">|</span>
                      <span className="text-[0.65rem] font-bold text-slate-400">
                        Año {doc.year}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 leading-snug tracking-tight mb-1 group-hover:text-primary transition-colors">
                      {highlightText(doc.name, search)}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
                      {highlightText(doc.description, search)}
                    </p>
                  </div>

                  {/* Right Side: Action Button */}
                  <a
                    href={`/docs/ordenanzas/${doc.year}/${doc.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 px-6 rounded-2xl bg-slate-950 hover:bg-primary text-white font-bold text-xs uppercase tracking-wider gap-2 flex items-center justify-center transition-all flex-shrink-0 w-full md:w-auto hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Descargar PDF
                  </a>
                </motion.div>
              ))}

              {filteredDocs.length === 0 && (
                <div className="py-20 text-center bg-white border border-slate-200/80 rounded-3xl shadow-sm">
                  <p className="text-muted-foreground italic">No se encontraron ordenanzas que coincidan con los filtros seleccionados.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 border-t border-slate-200 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
                <div className="flex items-center gap-1 hidden sm:flex">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                        currentPage === i + 1
                          ? "bg-primary text-white shadow-md"
                          : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bottom Dashed Action Link */}
            <a
              href="https://concejomunicipaldemaneiro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-dashed border-slate-300 hover:border-primary hover:bg-slate-50 rounded-2xl py-4 text-center font-bold text-sm text-slate-600 hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer w-full mt-2"
            >
              <span>Ver Repositorio Histórico Completo</span>
              <ExternalLink className="w-4 h-4" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
