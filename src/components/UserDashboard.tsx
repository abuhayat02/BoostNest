"use client";

import { IOrder } from "@/interfaces/interfaces";
import { motion } from "framer-motion";
import React from "react";
import { FiShoppingCart, FiClock, FiDollarSign } from "react-icons/fi";



export default function DashboardClient({
  orders,
  userName = "User",
}: {
  orders: IOrder[];
  userName?: string;
}) {

  const pending = orders.filter(order => order.status !== "Checking").length;
  const Complted = orders.filter(order => order.status !== "Completed").length;
  const price = orders.reduce((total, order) => {
    return typeof order.servicesId === "object" && 'price' in order.servicesId
      ? total + (order?.servicesId?.price || 0)
      : total;
  }, 0);

  const stats = [
    { title: "Total Orders", value: orders.length, icon: <FiShoppingCart size={20} /> },
    { title: "Pending Orders", value: pending, icon: <FiClock size={20} /> },
    { title: "Total Spent", value: price, icon: <FiDollarSign size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-bold tracking-tight">Welcome, {userName}</h1>
        <p className="text-gray-500 text-sm">Manage your YouTube services effectively</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between shadow-sm border border-gray-800 rounded-md"
          >
            <div className="text-white text-sm font-medium">{stat.title}</div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{stat.value}</span>
              <span className="text-gray-400">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-[#161616] p-4 shadow-sm border border-gray-800 overflow-x-auto rounded-md"
      >
        <h2 className="text-lg font-semibold mb-3">My Orders</h2>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b border-gray-700">
              <th className="p-2 font-normal">Video</th>
              <th className="p-2 font-normal">Service Category</th>
              <th className="p-2 font-normal">Quantity</th>
              <th className="p-2 font-normal">Status</th>
              <th className="p-2 font-normal">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: IOrder, i) => (
              <tr
                key={order._id}
                className="border-b border-gray-800 hover:bg-[#222] transition-colors duration-300"
              >
                <td className="p-2 text-blue-500 underline">
                  <a
                    href={order.youTubeChannelLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Video
                  </a>
                </td>
                <td className="p-2 text-white">
                  {typeof order.servicesId === "object" && "category" in order.servicesId
                    ? order.servicesId.category
                    : "No service"}
                  ts
                  Copy
                  Edit
                </td>
                <td className="p-2 text-white">{1}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${order.status === "Completed"
                      ? "bg-green-500 text-black"
                      : "bg-yellow-400 text-black animate-pulse"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2 text-gray-500">
                  {new Date(order.createdAt || "").toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="mt-10 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-base font-semibold mb-2"
        >
          Need Help?
        </motion.h2>
        <p className="text-gray-500 text-sm">
          Contact support for any issues or queries
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-3 bg-yellow-400 text-black font-medium px-4 py-2 shadow-sm rounded-md"
        >
          Raise Support Ticket
        </motion.button>
      </div>
    </div>
  );
}
