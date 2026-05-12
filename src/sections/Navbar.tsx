import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { 
    label: "Concejo",
    submenu: [
      { href: "#concejales", label: "Concejales" },
      { href: "#que-es", label: "¿Qué es el Concejo?" },
      { href: "#mision", label: "Misión y Visión" },
      { href: "#organigrama", label: "Organigrama" },
      { href: "#departamentos", label: "Departamentos" },
    ]
  },
  { href: "#ordenanzas", label: "Ordenanzas" },
  { href: "#noticias", label: "Noticias" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isConcejoOpen, setIsConcejoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const flatLinks = navLinks.flatMap(l => l.submenu ? l.submenu : l);
      const sections = flatLinks.map((l) => l.href.replace("#", ""));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    setIsConcejoOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-premium py-3 shadow-2xl border-b border-white/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => handleClick(e, "#inicio")}
          className="flex items-center gap-3 group"
        >
          <img 
            src="/images/logo.png" 
            alt="Logo Maneiro" 
            className="h-12 w-auto group-hover:scale-105 transition-all duration-500" 
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            link.submenu ? (
              <div 
                key={link.label}
                className="relative"
                onMouseEnter={() => setIsConcejoOpen(true)}
                onMouseLeave={() => setIsConcejoOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-lg ${
                    link.submenu.some(s => s.href.replace("#", "") === activeSection)
                      ? "text-primary bg-primary/10"
                      : "text-white hover:text-primary hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isConcejoOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isConcejoOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 mt-2 w-56 glass-strong rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                    >
                      <div className="p-2 flex flex-col gap-1">
                        {link.submenu.map((sub) => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={(e) => handleClick(e, sub.href)}
                            className={`px-4 py-2.5 rounded-lg text-[0.7rem] font-bold uppercase tracking-wide transition-all ${
                              activeSection === sub.href.replace("#", "")
                                ? "bg-primary text-white shadow-lg"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href!)}
                className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-lg drop-shadow-md ${
                  activeSection === link.href!.replace("#", "")
                    ? "text-primary bg-primary/10"
                    : "text-white hover:text-primary hover:bg-white/5"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
              </a>
            )
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 rounded-xl glass flex items-center justify-center"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong mx-4 mt-2 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="p-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link, i) => (
                <div key={link.label}>
                  {link.submenu ? (
                    <div className="flex flex-col gap-1">
                      <div className="px-4 py-2 text-[0.65rem] font-black text-primary uppercase tracking-[0.2em] opacity-70 mt-2">
                        {link.label}
                      </div>
                      {link.submenu.map((sub) => (
                        <a
                          key={sub.href}
                          href={sub.href}
                          onClick={(e) => handleClick(e, sub.href)}
                          className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            activeSection === sub.href.replace("#", "")
                              ? "bg-primary/20 text-primary border border-primary/10"
                              : "text-white/60 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href!)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center ${
                        activeSection === link.href!.replace("#", "")
                          ? "bg-primary/20 text-primary border border-primary/10"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
