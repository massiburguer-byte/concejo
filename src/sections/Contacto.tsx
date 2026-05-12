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
    <section id="contacto" className="relative py-24 sm:py-32">
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
            Contacto Directo
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Estamos para servirte
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Puedes contactarnos vía correo electrónico, a través de nuestras oficinas o directamente desde este formulario.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl bg-card border border-white/5 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Información de Contacto
              </h3>

              <div className="flex flex-col gap-5">
                <a
                  href="mailto:info@concejomaneiro.gob.ve"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">Correo Electrónico</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      info@concejomaneiro.gob.ve
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">Teléfono</p>
                    <p className="text-sm text-muted-foreground">
                      +58 (295) 555-0100
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">Dirección</p>
                    <p className="text-sm text-muted-foreground">
                      Av. Bolívar, Edificio Concejo Municipal, Pampatar, Municipio Maneiro, Nueva Esparta.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-3xl bg-card border border-white/5 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-4">Accesos Directos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/20 transition-all group"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Enviar Correo</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold/20 transition-all group"
                >
                  <MessageSquare className="w-5 h-5 text-gold" />
                  <span className="text-sm font-medium">WhatsApp</span>
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
            className="rounded-3xl bg-card border border-white/5 p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold mb-6">Enviar Mensaje</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-lg font-bold mb-2">¡Mensaje Enviado!</h4>
                <p className="text-sm text-muted-foreground">
                  Gracias por contactarnos. Te responderemos a la brevedad.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
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
                      className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Asunto
                  </Label>
                  <Input
                    id="subject"
                    placeholder="¿Sobre qué nos quieres contactar?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="rounded-xl bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-glow hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  Enviar Mensaje
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
