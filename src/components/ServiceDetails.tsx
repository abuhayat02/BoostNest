"use client";

import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ServiceCardProps {
  _id?: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  price: number;
  deliveryTime: string;
  thumbnail: string;
  feature: string[];
}

export default function ServiceDetails(params: ServiceCardProps) {
  const session = useSession()
  const {
    _id,
    title,
    subtitle,
    category,
    description,
    price,
    deliveryTime,
    thumbnail,
    feature,
  }
    = params
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#000000] hover:bg-white/10 container mx-auto text-white border border-[#222] overflow-hidden shadow-md hover:shadow-red-700/40 group transition-all duration-300  flex flex-col my-4 md:flex-row"
    >
      <div className="md:w-1/2 w-full relative h-56 md:h-auto">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover md:rounded-r-3xl group-hover:scale-102 transition-transform duration-500"
        />
      </div>

      <div className="md:w-1/2 w-full p-6 flex flex-col justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          <span className="inline-block text-xs mt-2 bg-[#222] px-3 py-1 rounded-full text-red-400">
            📂 {category}
          </span>

          <p className="text-sm text-gray-300 mt-4">{description}</p>

          <ul className="mt-4 space-y-1 text-sm text-gray-300">
            {feature.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <FaCheck className="text-red-500" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
          <div className="flex items-center gap-5 text-sm">
            <span className="text-[#ff4c4c] font-semibold text-lg"> ৳ {price}</span>
            <span className="text-gray-400"> Delivery Time : ⏱ {deliveryTime[0]}d</span>
          </div>
          {
            session.data?.user.role === 'admin' ? <Link href={`/dashboard/admin/all-services`} className=" shadow2  text-white px-4 py-2  font-medium rounded-full text-center md:rounded-none  hover:brightness-110 hover:scale-105 transition-all duration-300">
              Back
            </Link> : <Link href={`/buy-now/${_id}`} className=" shadow2  text-white px-4 py-2  font-medium rounded-full text-center md:rounded-none  hover:brightness-110 hover:scale-105 transition-all duration-300">
              Buy Now
            </Link>
          }
        </div>
      </div>
    </motion.div>
  );
}
