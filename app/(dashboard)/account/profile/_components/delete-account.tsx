"use client";

import { Button } from "@/components/ui/button";
import { deleteAccount } from "@/lib/actions/user";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteAccountSection() {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteAccount();
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      setConfirm(false);
    }
  };

  return (
    <div className="border-t border-red-100 pt-16 mt-16">
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
          Danger Zone
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          Once you delete your account, there is no going back. All your order
          history and personal data will be permanently removed.
        </p>

        {!confirm ? (
          <Button
            variant="destructive"
            onClick={() => setConfirm(true)}
            className="text-[10px] font-bold uppercase tracking-widest text-white hover:underline"
          >
            Delete Account — Permanently
          </Button>
        ) : (
          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-2">
            <button
              disabled={loading}
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
            >
              {loading ? "Deleting..." : "Confirm Destruction"}
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
