"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white text-xl">
        Loading...
      </div>
    );

  if (!session?.user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212] text-red-600 font-bold text-xl">
        Not logged in
      </div>
    );

  const user = session.user;

  return (
    <div className="min-h-screen w-full bg-[#121212] flex flex-col items-center justify-center p-6 space-y-8 select-none">
      {/* Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-[#181818] border border-[#FF0000]  shadow-[0_0_20px_rgba(255,0,0,0.6)] p-10 flex flex-col gap-8"
      >
        {/* ১. Avatar + Name */}
        <section className="flex flex-col items-center gap-3">
          <motion.div
            className="relative w-40 h-40 rounded-full border-4 border-[#FF0000] shadow-lg overflow-hidden"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image
              src={user.image || "/default-avatar.png"}
              alt={user.name || "User Avatar"}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
          </motion.div>
          <motion.h1
            className="md:text-5xl text-xs text-center font-extrabold text-[#FF0000] tracking-wide"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome, {user.name || "User"}
          </motion.h1>
        </section>

        {/* ২. Email */}
        <section className="text-center">
          <motion.p
            className="text-gray-400 uppercase tracking-widest mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Email Address
          </motion.p>
          <motion.p
            className="text-white font-mono text-xs select-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            {user.email || "No Email Provided"}
          </motion.p>
        </section>

        {/* ৩. General Info */}
        <section className="md:grid grid-cols-2  gap-8 text-gray-300">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-[#222222] p-3 shadow-inner"
          >
            <h3 className="text-red-500 font-semibold mb-1">Username</h3>
            <p className="text-white">{user.name || "N/A"}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-[#222222] text-xm  p-3 md:py-2 mt-2 shadow-inner"
          >
            <h3 className="text-red-500 font-semibold mb-1">User ID</h3>
            <p className="text-white text-xs">{user.id || "N/A"}</p>
          </motion.div>
        </section>



        {/* ৫. Activity Status */}
        <section className="flex justify-between items-center text-gray-400 px-6 py-3 bg-[#222222] shadow-inner">
          <p>
            Last Login:{" "}
            <span className="text-white">
              {new Date(Date.now()).toLocaleString()}
            </span>
          </p>

        </section>

        {/* ৬. Action Buttons */}
        <section className="flex flex-wrap justify-center gap-6">
          <motion.button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:w-fit rounded-tl-lg rounded-br-lg w-full font-semibold shadow-lg transition duration-300"
            whileTap={{ scale: 0.95 }}
          >
            Log Out
          </motion.button>

          <motion.button
            onClick={() => alert("Profile edit clicked!")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 md:w-fit rounded-tl-lg rounded-br-lg w-full font-semibold shadow-lg transition duration-300"
            whileTap={{ scale: 0.95 }}
          >
            Edit Profile
          </motion.button>

          <motion.a
            href={`https://www.youtube.com || ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 md:w-fit rounded-tl-lg rounded-br-lg w-full font-semibold shadow-lg transition duration-300"
            whileTap={{ scale: 0.95 }}
          >
            YouTube Channel
          </motion.a>
        </section>
      </motion.div>
    </div>
  );
}
