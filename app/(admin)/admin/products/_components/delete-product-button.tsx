"use client";

import { Button } from "@/components/ui/button";
import { adminDeleteProduct } from "@/lib/actions/admin/products";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Ou ta bibliothèque de notifications

export function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!confirm("Es-tu sûr de vouloir supprimer ce produit ?")) return;

    setLoading(true);
    const result = await adminDeleteProduct(id);

    if (result.success) {
      toast.success("Produit supprimé");
    } else {
      toast.error("Erreur lors de la suppression");
    }
    setLoading(false);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
