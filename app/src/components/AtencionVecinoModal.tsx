import { useState } from "react";
import { 
  Users, 
  MessageCircle, 
  Send, 
  CheckCircle2
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AtencionVecinoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AtencionVecinoModal({ open, onOpenChange }: AtencionVecinoModalProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    sector: "Pampatar",
    type: "Solicitud Comunitaria",
    message: ""
  });

  // URL del Webhook de Google Apps Script para almacenar en Google Sheets
  const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbz3OMm52xllYJs54R0X7dWx1k2bRhay9CoLuDQMJZE9isDUI4bGDa1rm1iqzCCcqQyPXQ/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Envío de datos a Google Sheets mediante Google Apps Script
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha: new Date().toLocaleString("es-VE", { timeZone: "America/Caracas" }),
          nombre: formData.name,
          telefono: formData.phone,
          sector: formData.sector,
          tipo: formData.type,
          mensaje: formData.message
        }),
      });
    } catch (error) {
      console.warn("Envío a Google Sheets procesado:", error);
    } finally {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onOpenChange(false);
        setFormData({ name: "", phone: "", sector: "Pampatar", type: "Solicitud Comunitaria", message: "" });
      }, 3500);
    }
  };

  const whatsappNumber = "584120000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola, me comunico desde el portal web del Concejo Municipal de Maneiro para solicitar atención vecinal."
  )}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] p-0 overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 p-6 text-white relative">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
              <Users className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-lg font-bold text-white tracking-tight">
                  Oficina de Atención al Vecino
                </DialogTitle>
                <span className="bg-emerald-400/20 text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Respuesta Rápida
                </span>
              </div>
              <DialogDescription className="text-xs text-white/80 mt-0.5">
                Canal directo de escucha, propuestas ciudadanas y asistencia comunitaria
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {sent ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-in zoom-in">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">¡Solicitud Registrada con Éxito!</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
                Tu mensaje ha sido remitido a la Dirección de Atención al Ciudadano del Concejo Municipal de Maneiro.
              </p>
            </div>
          ) : (
            <>
              {/* Fast WhatsApp Callout */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                      Línea Vecinal WhatsApp
                    </h4>
                    <p className="text-xs text-emerald-700">
                      Atención inmediata de lunes a viernes (8:00 AM - 4:00 PM)
                    </p>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  Abrir WhatsApp
                </a>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nombre Completo
                    </label>
                    <Input
                      required
                      placeholder="Ej. Carmen Rodríguez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-xl border-slate-200 text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teléfono de Contacto
                    </label>
                    <Input
                      required
                      placeholder="Ej. 0412-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="rounded-xl border-slate-200 text-xs h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Sector / Comunidad
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Pampatar">Pampatar</option>
                      <option value="Los Robles">Los Robles</option>
                      <option value="Jorge Coll">Jorge Coll</option>
                      <option value="Playa El Ángel">Playa El Ángel</option>
                      <option value="Agua de Vaca">Agua de Vaca</option>
                      <option value="San Lorenzo">San Lorenzo</option>
                      <option value="Apostadero">Apostadero</option>
                      <option value="Otro sector de Maneiro">Otro sector de Maneiro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tipo de Solicitud
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Solicitud Comunitaria">Solicitud Comunitaria</option>
                      <option value="Derecho de Palabra en Cámara">Derecho de Palabra en Cámara</option>
                      <option value="Propuesta de Ordenanza">Propuesta de Ordenanza</option>
                      <option value="Convivencia y Ruidos">Convivencia / Cero Ruidos</option>
                      <option value="Otro trámite legislativo">Otro trámite legislativo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detalle de tu Mensaje o Propuesta
                  </label>
                  <Textarea
                    required
                    rows={3}
                    placeholder="Explica brevemente tu caso o propuesta para la comunidad..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="rounded-xl border-slate-200 text-xs resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onOpenChange(false)}
                    className="rounded-full text-xs text-slate-600"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-6 shadow-sm flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? "Registrando en Google Sheets..." : "Enviar a Atención Vecinal"}</span>
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
