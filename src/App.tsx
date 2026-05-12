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

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-foreground antialiased overflow-x-hidden">
      <Navbar />
      <main>
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
    </div>
  );
}
