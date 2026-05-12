import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-950 pt-24 pb-12 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & About */}
          <div className="flex flex-col gap-8">
            <img 
              src="/images/logo.png" 
              alt="Logo Maneiro" 
              className="h-16 w-auto self-start" 
            />
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Institución legislativa de vanguardia, comprometida con el desarrollo sustentable y el bienestar de los ciudadanos del municipio Maneiro.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-white/5"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black text-white mb-8 tracking-tight uppercase tracking-widest text-xs">Secciones</h4>
            <ul className="flex flex-col gap-4">
              {["Inicio", "Concejalía", "Ordenanzas", "Noticias", "Transparencia"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-white/50 hover:text-primary transition-all flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-black text-white mb-8 tracking-tight uppercase tracking-widest text-xs">Trámites</h4>
            <ul className="flex flex-col gap-4">
              {["Atención Ciudadana", "Consultas Públicas", "Denuncias", "Gacetas Oficiales"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-primary transition-all flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-black text-white mb-8 tracking-tight uppercase tracking-widest text-xs">Ubicación</h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/50 leading-relaxed">
                  Av. Bolívar, Edificio Concejo Municipal, Pampatar, Nueva Esparta.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@concejomaneiro.gob.ve" className="text-sm text-white/50 hover:text-primary">
                  info@concejomaneiro.gob.ve
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/30">
            © {currentYear} Concejo Municipal de Maneiro. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">
              Terminos
            </a>
            <Badge variant="outline" className="text-[0.6rem] border-white/10 text-white/40">
              v1.2.0
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}
