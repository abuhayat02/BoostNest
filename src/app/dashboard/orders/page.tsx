"use client";

import { useEffect, useState } from "react";
import Pending from "@/components/Pending";
import { IOrder } from "@/interfaces/interfaces";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/order", {
          credentials: "include",
          method: "GET",
        });

        const data = await res.json();
        setOrders(data.allRequest || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Your All Payment Requests
      </h1>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((payment: IOrder) => (
            <Pending key={payment._id.toString()} payment={payment} />
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}
