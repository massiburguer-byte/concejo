import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import AccesosRapidos from "./sections/AccesosRapidos";
import Concejales from "./sections/Concejales";
import Organigrama from "./sections/Organigrama";
import Noticias from "./sections/Noticias";
import RedesSociales from "./sections/RedesSociales";
import Ordenanzas from "./sections/Ordenanzas";
import Contacto from "./sections/Contacto";
import Footer from "./sections/Footer";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <div className="min-h-screen bg-[#eef3f8] text-foreground antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white pb-16 md:pb-0">
      <Navbar />
      <main className="space-y-0">
        <Hero />
        <AccesosRapidos />
        <Concejales />
        <Organigrama />
        <Ordenanzas />
        <Noticias />
        <RedesSociales />
        <Contacto />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
