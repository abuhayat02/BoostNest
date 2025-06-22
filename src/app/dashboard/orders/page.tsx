"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Orders() {
  const { data: session, status } = useSession();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (status === "authenticated") {
        try {
          const res = await fetch(`http://localhost:3000/api/order?role=${session?.user?.role}&userId=${session?.user?.id}`
          );
          const data = await res.json();
          setInfo(data.allRequest || []);
          console.log(data)
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    console.log(info)
    fetchOrders();
  }, [session, status]);

  return (
    <div className=" py-10 px-4 sm:px-10 h-screen overflow-scroll  ">

      <div className="space-y-10  md:grid grid-cols-2  ">
        {info.map((order, i) => (
          <div
            key={order._id}
            className=" mx-auto h-fit p-6 w-fit sm:p-8 bg-white dark:bg-gray-900  shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Top section: Thumbnail + Service Info */}
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img
                src={order.servicesId.thumbnail}
                alt={order.servicesId.title}
                className="w-full sm:w-60 h-40 object-cover rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
              />

              <div className="flex-1 md:space-y-8">
                <h2 className="md:text-2xl text-xm font-bold text-gray-900 dark:text-white">
                  {order.servicesId.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{order.servicesId.subtitle}</p>

                <div className="flex flex-wrap items-center gap-3 text-sm mt-2 text-gray-500 dark:text-gray-400">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                    Category: {order.servicesId.category}
                  </span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                    ৳ {order.servicesId.price} {order.servicesId.currency}
                  </span>
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full">
                    Delivery: {order.servicesId.deliveryTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-dashed border-gray-300 dark:border-gray-700"></div>

            <div className="grid  text-xs items-center text-center justify-center grid-cols-3 gap-4">

              <span
                className={` text-center flex flex-row items-center px-2 py-2 rounded-full w-fit text-xs  ${order.paymentRequest
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                  : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  }`}
              >
                Payment : {order.paymentRequest ? " Success" : " Pending "}
              </span>
              <Link
                href={order.youTubeChannelLink}
                className="inline-block px-4 w-fit rounded-full py-2 text-white border shadow  transition duration-200"
                target="_blank"
              >
                Visit Channel
              </Link>
              <Link
                href={order.youTubeChannelLink}
                className="inline-block px-4 rounded-full py-2 text-white border shadow w-fit transition duration-200"
                target="_blank"
              >
                Visit Channel
              </Link>
            </div>

            {(
              <div className="flex flex-row items-center justify-center gap-3 ">


              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
