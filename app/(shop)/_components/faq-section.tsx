// components/home/faq-section.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Shipping & Delivery",
    answer:
      "We offer worldwide shipping. Orders are processed within 24-48 hours. Domestic delivery takes 3-5 business days, while international shipping varies by location.",
  },
  {
    question: "Sizing & Fit Guide",
    answer:
      "Our garments generally follow a relaxed, slightly oversized silhouette. We recommend taking your usual size for the intended look, or sizing down for a more tailored fit.",
  },
  {
    question: "Sustainability & Materials",
    answer:
      "All our pieces are crafted from premium, sustainably sourced materials. We prioritize organic cotton and recycled fibers to ensure longevity and minimal environmental impact.",
  },
  {
    question: "Return Policy",
    answer:
      "If you're not completely satisfied, you can return your items within 30 days of delivery. Items must be unworn with original tags attached.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-white py-32 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Title Section - Style Magazine */}
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-5xl md:text-7xl font-medium uppercase tracking-tighter text-black leading-none">
            Common <span className="text-gray-300 italic">Inquiries</span>
          </h2>
          <div className="h-[1px] w-12 bg-black mx-auto" />
        </div>

        {/* Accordion Logic - Net et sans bordures lourdes */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-100 transition-all duration-300"
            >
              <AccordionTrigger className="text-sm md:text-base font-bold uppercase tracking-widest text-left py-6 hover:no-underline hover:text-gray-400">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-base leading-relaxed pb-6 max-w-2xl">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA Footer - Minimaliste */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-8">
            Still need assistance?
          </p>
          <a
            href="mailto:help@prism.com"
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black"
          >
            <Mail className="w-4 h-4" />
            Contact Customer Care
            <div className="w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  );
}
