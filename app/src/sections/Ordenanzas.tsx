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

const modules = import.meta.glob('../data/ordenanzas/*.json', { eager: true });
const ordenanzasDataRaw = Object.values(modules).map((m: any) => m.default as Ordinance & { year?: string });

const ordenanzasData = ordenanzasDataRaw.reduce((acc: Record<string, Ordinance[]>, doc: Ordinance & { year?: string }) => {
  const year = doc.year || "2024";
  if (!acc[year]) acc[year] = [];
  acc[year].push(doc);
  return acc;
}, {} as Record<string, Ordinance[]>);

// Ordenar las ordenanzas por nombre dentro de cada año
Object.keys(ordenanzasData).forEach(year => {
  ordenanzasData[year].sort((a: Ordinance, b: Ordinance) => a.name.localeCompare(b.name));
});

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
  const filteredDocs = Object.entries(ordenanzasData).flatMap(([year, docs]: [string, Ordinance[]]) =>
    docs
      .filter((doc: Ordinance) => {
        const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || 
                             doc.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
        const matchesYear = selectedYear === "all" || year === selectedYear;
        return matchesSearch && matchesCategory && matchesYear;
      })
      .map((doc: Ordinance) => ({ ...doc, year }))
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
