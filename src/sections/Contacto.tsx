import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contacto" className="relative py-24 sm:py-32 bg-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.2em] border-primary/30 text-primary bg-primary/10"
          >
            Contacto Directo
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Estamos para servirte
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Puedes contactarnos vía correo electrónico, a través de nuestras oficinas o directamente desde este formulario oficial de atención ciudadana.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-[2.5rem] glass-card p-8 sm:p-10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-white tracking-tight">
                <MessageSquare className="w-6 h-6 text-primary" />
                Canales de Atención
              </h3>

              <div className="flex flex-col gap-8">
                <a
                  href="mailto:info@concejomaneiro.gob.ve"
                  className="flex items-start gap-5 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-500 flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-primary mb-1">Correo Electrónico</p>
                    <p className="text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                      info@concejomaneiro.gob.ve
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-500 flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-primary mb-1">Central Telefónica</p>
                    <p className="text-lg font-bold text-white/80">
                      +58 (295) 555-0100
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-500 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-primary mb-1">Sede Administrativa</p>
                    <p className="text-base font-bold text-white/80 leading-relaxed">
                      Av. Bolívar, Edificio Concejo Municipal, Pampatar, Municipio Maneiro, Nueva Esparta.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-[2.5rem] glass-card p-8 sm:p-10">
              <h3 className="text-xl font-black mb-6 text-white tracking-tight">Accesos Directos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 hover:bg-primary border border-white/5 hover:border-primary transition-all duration-500 group"
                >
                  <Mail className="w-5 h-5 text-primary group-hover:text-white" />
                  <span className="text-xs font-black uppercase tracking-widest text-white/60 group-hover:text-white">Enviar Correo</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 hover:bg-accent border border-white/5 hover:border-accent transition-all duration-500 group"
                >
                  <MessageSquare className="w-5 h-5 text-accent group-hover:text-white" />
                  <span className="text-xs font-black uppercase tracking-widest text-white/60 group-hover:text-white">WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2.5rem] glass-card p-8 sm:p-10"
          >
            <h3 className="text-2xl font-black mb-10 text-white tracking-tight">Enviar Mensaje</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 shadow-glow border border-green-500/20">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-2xl font-black mb-3 text-white">¡Mensaje Enviado!</h4>
                <p className="text-white/50">
                  Gracias por contactarnos. Nuestro equipo legislativo te responderá a la brevedad posible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-[0.65rem] font-black uppercase tracking-widest text-white/40 ml-1">
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[0.65rem] font-black uppercase tracking-widest text-white/40 ml-1">
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-[0.65rem] font-black uppercase tracking-widest text-white/40 ml-1">
                    Asunto de la consulta
                  </Label>
                  <Input
                    id="subject"
                    placeholder="¿Sobre qué nos quieres contactar?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-[0.65rem] font-black uppercase tracking-widest text-white/40 ml-1">
                    Mensaje detallado
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/20 resize-none transition-all"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-[0.75rem] uppercase tracking-widest gap-3 shadow-glow transition-all hover:-translate-y-1 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                  Enviar Mensaje Oficial
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
