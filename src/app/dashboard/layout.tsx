"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col md:flex-row">
      <div className="md:hidden flex sticky top-0 justify-between items-center bg-[#181818] p-4 border-b border-[#2c2c2c] shadow-md z-50">
        <div className="text-2xl font-bold text-red-600 uppercase tracking-tight">
          Boost<span className="text-white">Nest</span>
        </div>
        <button onClick={toggleSidebar} className="text-white">
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <aside
        className={`fixed md:static z-40 top-0 left-0 w-[240px] h-screen bg-[#181818]  border-[#2c2c2c] px-6 py-2 shadow-xl transform transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="text-3xl font-extrabold uppercase text-red-600 tracking-tight hidden md:block">
          Boost<span className="text-white">Nest</span>
        </div>
        <nav className="flex flex-col gap-6 text-sm mt-10 border-t py-6">
          <Link href="/dashboard" className="hover:text-red-500 transition font-medium">
            📊 Dashboard
          </Link>

          <Link href="/dashboard/users" className="hover:text-red-500 transition font-medium">
            👥 Ongoing Orders
          </Link>
          <Link href="/dashboard/orders" className="hover:text-red-500 transition font-medium">
            🎥 Payment Requests
          </Link>
          <Link href="#" className="hover:text-red-500 transition font-medium">
            💼 Update Profile
          </Link>
          <Link href="#" className="hover:text-red-500 transition font-medium">
            ⚙️ Settings
          </Link>
        </nav>
      </aside>

      <main className=" w-full bg-[#121212] min-h-screen overflow-y-auto ">
        <h1 className="py-2  bg-[#181818]  sticky top-0 font-bold uppercase text-center items-center text-2xl"> {session?.user?.role} Dashboard </h1>
        <div className="bg-[#1e1e1e] shadow-lg  w-full min-h-[calc(100vh-48px)] ">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
