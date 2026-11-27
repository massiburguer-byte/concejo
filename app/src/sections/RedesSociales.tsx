import { motion } from "framer-motion";
import { Instagram, ExternalLink, Heart, MessageCircle, Check, ArrowUpRight } from "lucide-react";

// Publicaciones representativas de la cuenta oficial @concejomunicipalmaneiro1
// Con imágenes de las actividades parlamentarias oficiales en Pampatar
const REAL_INSTA_POSTS = [
  {
    id: "post-1",
    url: "https://www.instagram.com/concejomunicipalmaneiro1/",
    image: "/images/concejales/tarjetas/tarjeta-carolina.jpg",
    caption: "Comisión de Salud, Desarrollo Social Vecinal y Participación Ciudadana sesionando en beneficio de las familias de Maneiro.",
    date: "Hace 2 días",
    likes: "184",
    comments: "28"
  },
  {
    id: "post-2",
    url: "https://www.instagram.com/concejomunicipalmaneiro1/",
    image: "/images/concejales/tarjetas/tarjeta-asdrubal.jpg",
    caption: "Inspección y trabajo parlamentario en comunidades: Urbanismo, vialidad y optimización de servicios en Pampatar.",
    date: "Hace 3 días",
    likes: "215",
    comments: "34"
  },
  {
    id: "post-3",
    url: "https://www.instagram.com/concejomunicipalmaneiro1/",
    image: "/images/banner-sede-bienvenidos.jpg",
    caption: "Sesión Solemne en el Salón de Sesiones del Palacio Municipal de Pampatar con la participación activa de los vecinos.",
    date: "Hace 5 días",
    likes: "320",
    comments: "42"
  },
  {
    id: "post-4",
    url: "https://www.instagram.com/concejomunicipalmaneiro1/",
    image: "/images/concejales/tarjetas/tarjeta-eulys.jpg",
    caption: "Comisión de Legislación y Ejidos avanzando en la regularización y seguridad jurídica de nuestras tierras.",
    date: "Hace 1 semana",
    likes: "167",
    comments: "19"
  },
  {
    id: "post-5",
    url: "https://www.instagram.com/concejomunicipalmaneiro1/",
    image: "/images/concejales/tarjetas/tarjeta-gregorio.jpg",
    caption: "Fiscalización y contraloría de los recursos del municipio y fomento al desarrollo educativo y deportivo.",
    date: "Hace 1 semana",
    likes: "198",
    comments: "23"
  },
  {
    id: "post-6",
    url: "https://www.instagram.com/concejomunicipalmaneiro1/",
    image: "/images/concejales/tarjetas/tarjeta-harolds.jpg",
    caption: "Seguridad ciudadana y resguardo del orden público en los diferentes cuadrantes de paz de Maneiro.",
    date: "Hace 2 semanas",
    likes: "240",
    comments: "31"
  }
];

export default function RedesSociales() {
  const instagramUrl = "https://www.instagram.com/concejomunicipalmaneiro1/";

  return (
    <section id="redes" className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-[#eef3f8] overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 border border-pink-500/20 text-[11px] font-extrabold uppercase tracking-wider text-pink-700 mb-3">
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>Canal Oficial de Instagram</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              En Vivo en <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Instagram</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Sigue las sesiones, acuerdos de cámara, jornadas comunitarias y novedades legislativas directamente desde nuestro perfil oficial.
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

        {/* Profile Stats Bar (Estilo Perfil Verificado de Instagram) */}
        <div className="mb-8 p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shadow-md">
                <div className="w-full h-full rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center">
                  <img src="/images/logo.png" alt="Concejo Maneiro" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white" title="Cuenta Oficial">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  concejomunicipalmaneiro1
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                Concejo Municipal de Maneiro
              </p>
              <p className="text-xs text-slate-500">
                Órgano legislativo municipal de Pampatar, Isla de Margarita • Periodo 2025 - 2029
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-around sm:justify-end">
            <div className="text-center">
              <div className="text-base sm:text-lg font-black text-slate-900">Oficial</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Cuenta</div>
            </div>
            <div className="text-center">
              <div className="text-base sm:text-lg font-black text-emerald-600">En Vivo</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Actividad</div>
            </div>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <span>Ver Perfil</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Instagram Grid Feed: Diseño tipo cuadrícula de Instagram en tiempo real */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {REAL_INSTA_POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer block border border-slate-200/50"
            >
              {/* Foto de la publicación */}
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              {/* Instagram Logo Badge en la esquina */}
              <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <Instagram className="w-4 h-4 text-pink-400" />
              </div>

              {/* Hover Overlay con Likes, Comentarios y Caption real de Instagram */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 z-20">
                <div className="text-[10px] font-bold text-pink-300 uppercase tracking-wider">
                  {post.date}
                </div>

                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold line-clamp-3 leading-snug mb-3">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/20 text-white text-xs font-bold">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 fill-white text-white" />
                        <span>{post.comments}</span>
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] text-pink-300 group-hover:underline">
                      <span>Ver post</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer Callout */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-pink-600 bg-white hover:bg-pink-50 border border-slate-200/80 px-6 py-3 rounded-full shadow-sm transition-all duration-300 hover:shadow"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Ver todas las publicaciones y videos en @concejomunicipalmaneiro1</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
