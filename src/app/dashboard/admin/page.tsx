"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaBoxOpen,
  FaTools,
  FaBell,
  FaPlusCircle,
} from "react-icons/fa";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminOverview() {
  const [stats, setStats] = useState({
    users: 1234,
    orders: 567,
    earnings: 89000,
    services: 45,
  });

  const recentActivities = [
    "User John Doe registered",
    "Order #234 completed",
    "Service update deployed",
    "New feedback received",
    "System backup done",
  ];

  const notifications = [
    "New user signup pending approval",
    "Payment gateway maintenance scheduled",
    "Server CPU usage high",
    "New order received #568",
  ];

  const quickActions = [
    { label: "Add User", icon: <FaUsers /> },
    { label: "Add Order", icon: <FaBoxOpen /> },
    { label: "Add Service", icon: <FaTools /> },
  ];

  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 7, 15, 22, 18, 25],
        backgroundColor: "rgba(14, 165, 233, 0.85)",
        borderRadius: 6,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#cbd5e1" },
      },
      title: {
        display: true,
        text: "Weekly Sales",
        color: "#94a3b8",
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { color: "#cbd5e1" } },
      y: {
        ticks: { color: "#cbd5e1" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen   p-8 text-slate-200 flex flex-col items-center space-y-12 font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className=" font-extrabold tracking-wide text-xs md:text-5xl text-white/50 drop-shadow-lg select-none"
      >
        Welcome To Our <span className="text-red-600" >Admin Dashboard</span>
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        <StatCard
          icon={<FaUsers className="text-red-700" />}
          label="Total Users"
          value={stats.users}
          delay={0}
        />
        <StatCard
          icon={<FaBoxOpen className="text-red-700" />}
          label="Total Orders"
          value={stats.orders}
          delay={0.1}
        />
        <StatCard
          icon={<FaMoneyBillWave className="text-red-700" />}
          label="Total Earnings"
          value={`৳${stats.earnings.toLocaleString()}`}
          delay={0.2}
        />
        <StatCard
          icon={<FaTools className="text-red-700" />}
          label="Total Services"
          value={stats.services}
          delay={0.3}
        />
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full ">
        {/* Recent Activities */}
        <SectionCard title="Recent Activities" className="max-h-64 overflow-y-auto">
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
            {recentActivities.map((act, i) => (
              <li key={i}>{act}</li>
            ))}
          </ul>
        </SectionCard>

        {/* Notifications */}
        <SectionCard title="Notifications" className="max-h-64 overflow-y-auto">
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400">
            {notifications.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </SectionCard>

        {/* Quick Actions */}
        <SectionCard title="Quick Actions">
          <div className="flex space-x-6">
            {quickActions.map((action, i) => (
              <button
                key={i}
                className="flex items-center justify-center gap-1 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800  px-3 py-3 text-white shadow-lg transition"
              >
                <div className="text-xl">{action.icon}</div>
                <span className="font-semibold">{action.label}</span>
              </button>
            ))}
          </div>
        </SectionCard>
      </div>


    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      className="bg-gradient-to-br from-[#000000] to-[#610000]  hover:shadow-cyan-500/60 hover:scale-[1.06] transition-transform duration-300  px-7 py-10 text-white flex flex-col items-start space-y-4 cursor-pointer select-none"
    >
      <div className="text-4xl drop-shadow-md">{icon}</div>
      <div className="text-lg font-semibold tracking-wide">{label}</div>
      <div className="text-5xl font-bold tracking-tight">{value}</div>
    </motion.div>
  );
}

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white/5  p-6 shadow-lg text-slate-300 ${className}`}
    >
      <h3 className="text-xl font-bold mb-4 border-b border-red-500 pb-2">{title}</h3>
      {children}
    </motion.div>
  );
}
