// components/home/brand-values.tsx
import { Globe, RefreshCcw, ShieldCheck, Truck } from "lucide-react";

const VALUES = [
  {
    icon: <Truck className="w-6 h-6 stroke-[1.5]" />,
    title: "Global Shipping",
    description:
      "Fast, tracked delivery to your doorstep, anywhere in the world.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 stroke-[1.5]" />,
    title: "Premium Quality",
    description:
      "Selected fabrics and materials designed for longevity and comfort.",
  },
  {
    icon: <Globe className="w-6 h-6 stroke-[1.5]" />,
    title: "Sustainable Craft",
    description:
      "Committed to reducing our footprint through conscious production.",
  },
  {
    icon: <RefreshCcw className="w-6 h-6 stroke-[1.5]" />,
    title: "Easy Returns",
    description:
      "Not the right fit? Exchange or return within 30 days, no questions asked.",
  },
];

export function BrandValues() {
  return (
    <section className="bg-[#F9F9F9] py-24 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {VALUES.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="text-black mb-2">{value.icon}</div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-black">
                {value.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[220px]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
