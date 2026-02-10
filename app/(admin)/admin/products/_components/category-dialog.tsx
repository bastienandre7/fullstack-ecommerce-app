"use client";

import {
  adminCreateCategory,
  getCategories,
} from "@/lib/actions/admin/categories";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface CategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryCreated: (categoryId: string) => void;
  onCategoriesUpdate: (categories: { id: string; name: string }[]) => void;
}

export function CategoryDialog({
  isOpen,
  onOpenChange,
  onCategoryCreated,
  onCategoriesUpdate,
}: CategoryDialogProps) {
  const [newCatName, setNewCatName] = useState("");

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;

    const res = await adminCreateCategory(newCatName);

    if (res.success && res.category) {
      const updated = await getCategories();
      onCategoriesUpdate(updated);
      onCategoryCreated(res.category.id);
      onOpenChange(false);
      setNewCatName("");
      toast.success("Catégorie créée !");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none border-gray-100 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xs uppercase tracking-widest font-bold">
            New Category
          </DialogTitle>
        </DialogHeader>
        <Input
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          placeholder="Category name..."
          className="rounded-none border-gray-100 font-medium"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCategory();
            }
          }}
        />
        <DialogFooter>
          <Button
            onClick={handleAddCategory}
            className="w-full bg-black text-white rounded-none uppercase text-[10px] tracking-widest"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
