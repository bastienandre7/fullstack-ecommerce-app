"use client";

import { Button } from "@/components/ui/button";
import { adminDeleteProduct } from "@/lib/actions/admin/products";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    const result = await adminDeleteProduct(id);

    if (result.success) {
      toast.success("Product deleted successfully");
    } else {
      toast.error("Error deleting product");
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
