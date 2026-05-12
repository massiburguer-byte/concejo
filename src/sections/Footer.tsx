import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/images/logo.png" 
                alt="Logo Maneiro" 
                className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity" 
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Trabajando por la transparencia legislativa y el desarrollo del municipio Maneiro, Nueva Esparta.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-foreground">
              Enlaces Rápidos
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Concejales", href: "#concejales" },
                { label: "Ordenanzas", href: "#ordenanzas" },
                { label: "Noticias", href: "#noticias" },
                { label: "Redes", href: "#redes" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-foreground">
              Síguenos
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/concejomunicipalmaneiro1"
                target="_blank"
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Concejo Municipal de Maneiro &copy; 2026. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Desarrollado para la transparencia legislativa de Nueva Esparta{" "}
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
