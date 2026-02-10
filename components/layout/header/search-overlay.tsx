"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchProducts } from "@/lib/actions/products";
import { Loader2, Search as SearchIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  category: string;
  imageUrl: string;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.length < 2) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      const data = await searchProducts(searchTerm);
      setResults(data);
      setIsLoading(false);
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleProductClick = (slug: string) => {
    onClose();
    router.push(`/products/${slug}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {/* Header masqué visuellement mais présent pour l'accessibilité */}
        <DialogHeader className="sr-only">
          <DialogTitle>Recherche de produits</DialogTitle>
          <DialogDescription>
            Recherchez des articles dans notre catalogue par nom ou catégorie.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0"
          />
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
          {searchTerm.length > 0 && !isLoading && (
            <button
              onClick={() => setSearchTerm("")}
              className="p-1 rounded-full hover:bg-accent transition-colors"
              type="button"
            >
              <X className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto pt-4">
          {results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.slug)}
                  className="flex items-center gap-4 rounded-lg p-2 hover:bg-accent transition-colors text-left w-full"
                >
                  <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                    {product.imageUrl && (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase mt-1">
                      {product.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            searchTerm.length >= 2 &&
            !isLoading && (
              <p className="text-center text-sm text-muted-foreground py-4">
                Aucun résultat pour &quot;{searchTerm}&quot;
              </p>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
