"use client";

import React, { useEffect, useState } from "react";
import DashboardClient from "@/components/UserDashboard";

export default function DashboardPage() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("hello")
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("http://localhost:3000/api/order", {
          credentials: "include",
          method: "GET",
        });
        const data = await res.json();
        setOrders(data.allRequest || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!orders) return <div>No orders found</div>;

  return <DashboardClient orders={orders} />;
}
