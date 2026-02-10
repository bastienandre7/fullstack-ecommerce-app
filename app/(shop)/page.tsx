import { AboutSection } from "@/app/(shop)/_components/about-section";
import { AllProducts } from "@/app/(shop)/_components/all-products";
import { BrandValues } from "@/app/(shop)/_components/brand-values";
import { FaqSection } from "@/app/(shop)/_components/faq-section";
import { HeroSection } from "@/app/(shop)/_components/hero-section";
import { TestimonialsCarousel } from "@/app/(shop)/_components/testimonials-carousel";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AllProducts />
      <BrandValues />
      <TestimonialsCarousel />
      <AboutSection />
      <FaqSection />
    </main>
  );
}
