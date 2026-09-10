import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Particles from "@/components/Particles";
import ValueProps from "@/components/ValueProps";
import FeaturedHouses from "@/components/FeaturedHouses";
import Amenities from "@/components/Amenities";
import Gallery from "@/components/Gallery";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Booking from "@/components/Booking";
import Location from "@/components/Location";
import Reviews from "@/components/Reviews";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

function GradientLine() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Particles />
      <Navigation />

      <main id="main-content">
        <Hero />
        <GradientLine />
        <ValueProps />
        <GradientLine />
        <FeaturedHouses />
        <GradientLine />
        <Amenities />
        <GradientLine />
        <Gallery />
        <GradientLine />
        <Experience />
        <GradientLine />
        <Faq />
        <GradientLine />
        <Booking />
        <GradientLine />
        <Location />
        <GradientLine />
        <Reviews />
        <GradientLine />
        <CtaBand />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
