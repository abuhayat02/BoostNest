"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IOrder, IYouTubeServices } from "@/interfaces/interfaces";

export default function Pending({ payment }: { payment: IOrder }) {
  const [showScreenshot, setShowScreenshot] = useState(false);
  const statusColor = {
    Checking: "bg-yellow-100 text-yellow-900 border border-yellow-300",
    Running: "bg-blue-100 text-blue-900 border border-blue-300",
    Completed: "bg-green-100 text-green-900 border border-green-300",
  }[payment.status ?? ""] || "bg-gray-100 text-gray-900 border border-gray-300";

  const service = payment.servicesId as IYouTubeServices;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border bg-gradient-to-br from-[#ffffffda] to-[#f5f5f5] dark:from-[#1e1e1e] dark:to-[#2a2a2a] border-gray-200 dark:border-gray-700 shadow-xl p-6 space-y-4 hover:scale-[1.02] transition-transform duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>{payment.status}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(payment.createdAt).toLocaleString()}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 italic">
          {payment.description?.slice(0, 120)}...
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 text-sm">
          <button
            onClick={() => setShowScreenshot(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full shadow transition-all duration-300"
          >
            🖼️ View Screenshot
          </button>

          {typeof service === "object" && service._id && (
            <Link
              href={`/${service._id}`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full shadow transition-all duration-300"
            >
              🔗 Service details
            </Link>
          )}

          <a
            href={payment.youTubeChannelLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full shadow transition-all duration-300"
          >
            📺 Channel
          </a>

          <a
            href={payment.youtubeVideoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full shadow transition-all duration-300"
          >
            Video
          </a>
        </div>
      </motion.div>

      {/* Screenshot modal */}
      <AnimatePresence>
        {showScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-2xl w-full">
              <button
                onClick={() => setShowScreenshot(false)}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-xl z-10 rounded-full shadow-lg"
              >
                ✕
              </button>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={payment.paymentScreenShort}
                  alt="Payment Screenshot"
                  width={800}
                  height={500}
                  className="rounded-xl border border-white shadow-2xl w-full h-auto object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
