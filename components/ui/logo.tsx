import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "white" | "black";
}

export const Logo = ({ className, variant = "black" }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "inline-block select-none group transition-colors duration-300",
        variant === "white" ? "text-white" : "text-black",
        className,
      )}
    >
      <div className="flex flex-col items-start leading-none">
        <span className="text-2xl md:text-3xl font-medium tracking-[0.3em] uppercase">
          Prism
        </span>

        <div className="flex items-center w-full mt-1.5">
          <div
            className={cn(
              "h-[1px] flex-1 bg-current",
              variant === "white" ? "opacity-30" : "opacity-20",
            )}
          />
          <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.5em] ml-3 opacity-50">
            Studio
          </span>
        </div>
      </div>
    </Link>
  );
};
