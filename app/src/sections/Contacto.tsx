import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, Phone, MapPin, CheckCircle2 } from "lucide-react";
import generalSettings from "../data/settings/general.json";

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
    <section id="contacto" className="relative py-24 sm:py-32 bg-[#f0f4f8]">
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
            <div className="rounded-[2.5rem] glass-card p-8 sm:p-10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-slate-800 tracking-tight">
                <MessageSquare className="w-6 h-6 text-primary" />
                Canales de Atención
              </h3>

              <div className="flex flex-col gap-8">
                <a
                  href={`mailto:${generalSettings.email}`}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-500 flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-primary mb-1">Correo Electrónico</p>
                    <p className="text-lg font-bold text-slate-700 group-hover:text-primary transition-colors">
                      {generalSettings.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-500 flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-primary mb-1">Central Telefónica</p>
                    <p className="text-lg font-bold text-slate-700">
                      {generalSettings.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-500 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-widest text-primary mb-1">Sede Administrativa</p>
                    <p className="text-base font-bold text-slate-700 leading-relaxed">
                      {generalSettings.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-[2.5rem] glass-card p-8 sm:p-10">
              <h3 className="text-xl font-black mb-6 text-slate-800 tracking-tight">Accesos Directos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-50 hover:bg-primary border border-slate-200/80 hover:border-primary transition-all duration-500 group"
                >
                  <Mail className="w-5 h-5 text-primary group-hover:text-white" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-600 group-hover:text-white">Enviar Correo</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-50 hover:bg-accent border border-slate-200/80 hover:border-accent transition-all duration-500 group"
                >
                  <MessageSquare className="w-5 h-5 text-accent group-hover:text-white" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-600 group-hover:text-white">WhatsApp</span>
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
            <h3 className="text-xl font-bold mb-6 text-slate-800">Enviar Mensaje</h3>

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
                      className="h-12 rounded-xl bg-white border border-slate-200 focus:border-primary/50 focus:ring-primary/20 text-slate-800"
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
                      className="h-12 rounded-xl bg-white border border-slate-200 focus:border-primary/50 focus:ring-primary/20 text-slate-800"
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
                    className="h-12 rounded-xl bg-white border border-slate-200 focus:border-primary/50 focus:ring-primary/20 text-slate-800"
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
                    className="rounded-xl bg-white border border-slate-200 focus:border-primary/50 focus:ring-primary/20 text-slate-800 resize-none"
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
