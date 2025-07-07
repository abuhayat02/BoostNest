"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const YtServices = ({ service }: { service: any }) => {
  const { data: session } = useSession();

  return (
    <div className="group relative bg-[#0b0b0bde] hover:bg-[#1d1d1ddf] overflow-hidden shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:-translate-y-2 rounded-md">
      {/* Thumbnail */}
      <Image
        src={service.thumbnail}
        alt={service.title}
        width={400}
        height={225}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
          {service.title}
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-red-400 text-lg font-semibold tracking-wide">
            ৳{service.price}
          </span>
          <div className="flex gap-4 items-center">
            {session?.user?.role === "user" && (
              <Link
                href={`/buy-now/${service._id}`}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all duration-300"
              >
                Buy Now
              </Link>
            )}
            <Link
              href={`/${service._id}`}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-all duration-300"
            >
              Details
            </Link>
          </div>
        </div>
      </div>

      {/* Badge */}
      <span className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-br-xl">
        YouTube Service
      </span>
    </div>
  );
};

export default YtServices;
