import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import FeaturedProperties from "@/components/featured-properties";
import WhyChooseUs from "@/components/why-choose-us";
import LocationsSection from "@/components/locations-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <LocationsSection />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
