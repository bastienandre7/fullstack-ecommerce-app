// components/home/testimonials-carousel.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { TestimonialCard } from "./testimonial-card";

const REVIEWS = [
  {
    name: "Alex P.",
    handle: "@alex_digital",
    content:
      "The fit is perfect and the quality of the fabric is exceptional. A must-have for daily wear.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    handle: "@sarah.fit",
    content:
      "Minimalist design with maximum comfort. This is exactly what I was looking for.",
    rating: 5,
  },
  {
    name: "Jordan K.",
    handle: "@jk_vibe",
    content:
      "Prism has redefined my wardrobe essentials. The attention to detail is impressive.",
    rating: 5,
  },
  {
    name: "Léa T.",
    handle: "@lea_creative",
    content:
      "Elegant, durable, and ethically made. I couldn't be happier with my purchase.",
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );

  return (
    <section className="bg-white py-32 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-medium uppercase tracking-tight text-black">
            Community <span className="text-gray-400">Voices</span>
          </h2>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold">
            Verified Reviews
          </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-6">
            {REVIEWS.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard {...review} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Contrôles minimalistes */}
          <div className="flex justify-center gap-6 mt-16">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border border-gray-200 bg-white text-black rounded-full hover:bg-black hover:text-white transition-all shadow-none" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border border-gray-200 bg-white text-black rounded-full hover:bg-black hover:text-white transition-all shadow-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
