"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

export function ProductGallery({
  images,
  name,
}: {
  images: { url: string }[];
  name: string;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full">
      <div className="hidden md:flex flex-col gap-8">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] w-full bg-[#F9F9F9] border border-gray-100 overflow-hidden"
          >
            <Image
              src={img.url}
              alt={`${name} image ${index + 1}`}
              fill
              className="object-cover p-10"
              quality={100}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="ml-0">
            {images.map((img, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="relative aspect-[3/4] w-full bg-[#F9F9F9] border border-gray-100">
                  <Image
                    src={img.url}
                    alt={`${name} image ${index + 1}`}
                    fill
                    className="object-contain p-6"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                  current === i ? "bg-black w-4" : "bg-gray-200",
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
}
