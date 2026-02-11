"use client";

import { OrderStatus } from "@/app/generated/prisma/enums";
import { updateOrderStatus } from "@/lib/actions/admin/orders";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface OrderStatusActionsProps {
  orderId: string;
  currentStatus: OrderStatus;
  currentTracking: string | null;
}

export function OrderStatusActions({
  orderId,
  currentStatus,
  currentTracking,
}: OrderStatusActionsProps) {
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState(currentTracking || "");

  const onStatusChange = async (newStatus: OrderStatus) => {
    try {
      setLoading(true);
      await updateOrderStatus(orderId, newStatus, tracking);
      toast.success(`Order status updated to ${newStatus.toLowerCase()}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred during update.");
    } finally {
      setLoading(false);
    }
  };

  const saveTracking = async () => {
    try {
      setLoading(true);
      await updateOrderStatus(orderId, currentStatus, tracking);
      toast.success("Tracking number archived");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to save tracking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 min-w-[160px]">
      <div className="relative">
        <select
          disabled={loading}
          defaultValue={currentStatus}
          onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
          className="w-full bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer border-b border-gray-100 hover:border-black transition-colors pb-1 disabled:opacity-50"
        >
          {Object.values(OrderStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {loading && (
          <Loader2 className="absolute right-0 top-0 h-3 w-3 animate-spin text-gray-400" />
        )}
      </div>

      {(currentStatus === "SHIPPED" || currentStatus === "PREPARING") && (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
          <input
            type="text"
            placeholder="TRACKING ID"
            value={tracking}
            onChange={(e) => setTracking(e.target.value.toUpperCase())}
            className="flex-1 bg-gray-50 border-none text-[9px] font-mono tracking-tighter p-2 outline-none focus:bg-gray-100 transition-colors"
          />
          <button
            onClick={saveTracking}
            disabled={loading || tracking === currentTracking}
            className="text-gray-400 hover:text-black disabled:opacity-0 transition-all"
          >
            <Check size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
