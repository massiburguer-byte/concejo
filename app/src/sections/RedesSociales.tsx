import { useEffect } from "react";
import { Instagram, ArrowUpRight, ExternalLink } from "lucide-react";

export default function RedesSociales() {
  const instagramUrl = "https://www.instagram.com/concejomunicipalmaneiro1/";

  // Cargar el script de Elfsight para el widget de Instagram en tiempo real
  useEffect(() => {
    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="redes" className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-[#eef3f8] overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 border border-pink-500/20 text-[11px] font-extrabold uppercase tracking-wider text-pink-700 mb-3">
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>Conexión en Tiempo Real</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Instagram <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">en Vivo</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Publicaciones, historias y actividades legislativas del Concejo Municipal de Maneiro sincronizadas automáticamente desde <span className="font-bold text-slate-800">@concejomunicipalmaneiro1</span>.
            </p>
          </div>

          {/* Botón de Seguir Oficial */}
          <div className="shrink-0 flex items-center gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Instagram className="w-4 h-4" />
              <span>@concejomunicipalmaneiro1</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Contenedor del Widget de Feed Oficial de Instagram */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-lg p-4 sm:p-6 lg:p-8 min-h-[420px] flex flex-col justify-center">
          
          {/* Elfsight Instagram Widget Container */}
          <div 
            className="elfsight-app-concejomaneiro-feed w-full" 
            data-elfsight-app-lazy
          />

          {/* Fallback elegante y banner de conexión directa con Instagram */}
          <div className="text-center py-8 px-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-1 mb-4 shadow-md">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-pink-600">
                <Instagram className="w-8 h-8" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
              Feed Oficial @concejomunicipalmaneiro1
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
              Conexión directa con la cuenta oficial. Para vincular el código ID de tu widget de Elfsight o Behold, solo indícanos el identificador y se sincronizará automáticamente.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>Abrir Instagram Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
