import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  handle?: string;
  content: string;
  rating: number;
}

export function TestimonialCard({
  name,
  handle,
  content,
  rating,
}: TestimonialProps) {
  return (
    <div className="h-full flex flex-col justify-between items-start text-left select-none p-0">
      <div className="space-y-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={10}
              fill={i < rating ? "black" : "none"}
              className="text-black stroke-[1.5]"
            />
          ))}
        </div>

        <blockquote className="text-xl md:text-2xl font-medium leading-[1.2] text-black uppercase tracking-tight">
          &quot;{content}&quot;
        </blockquote>
      </div>

      <div className="mt-8 pt-4 border-t border-black/10 w-full">
        <p className="font-bold uppercase text-[11px] tracking-widest text-black">
          {name}
        </p>
        {handle && (
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
            {handle}
          </p>
        )}
      </div>
    </div>
  );
}
