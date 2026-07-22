import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { KaniSection } from "@/components/sections/KaniSection";
import { Pharmacy } from "@/components/sections/Pharmacy";
import { Gallery } from "@/components/sections/Gallery";
import { About } from "@/components/sections/About";
import { Reviews } from "@/components/sections/Reviews";
import { Locations } from "@/components/sections/Locations";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { KaniLauncher } from "@/components/kani/KaniLauncher";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <KaniSection />
      <Pharmacy />
      <Gallery />
      <About />
      <Reviews />
      <Locations />
      <Contact />
      <Footer />
      <KaniLauncher />
    </main>
  );
}
