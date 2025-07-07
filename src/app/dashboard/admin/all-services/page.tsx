// src/app/all-services/page.tsx

import ServicesAdmin from "@/components/ServicesAdmin";
import Image from "next/image";

interface Service {
  _id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  deliveryTime: string;
  feature: string[];
  thumbnail: string;
  isActive: boolean;
  createdAt: string;
}

const servicesInAdminPanel = async () => {
  const res = await fetch("http://localhost:3000/api/services", {
    cache: "no-store", // optional: prevents stale cache
  });

  return await res.json();

}

export default async function AllServices() {

  const services = await servicesInAdminPanel()

  console.log(services)
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-red-600 mb-8">
        All Services
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-neutral-700">
          <thead className="bg-neutral-900 text-gray-300">
            <tr>
              <th className="p-3 border-b border-neutral-800">Thumbnail</th>
              <th className="p-3 border-b border-neutral-800">Title</th>
              <th className="p-3 border-b border-neutral-800">Category</th>
              <th className="p-3 border-b border-neutral-800">Price</th>
              <th className="p-3 border-b border-neutral-800">Delivery</th>
              <th className="p-3 border-b border-neutral-800">Status</th>
              <th className="p-3 border-b border-neutral-800">details</th>
              <th className="p-3 border-b border-neutral-800">Action</th>

            </tr>
          </thead>
          <tbody>
            {services.services.map((s: Service) => (
              <ServicesAdmin service={s} key={s._id}></ServicesAdmin>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={6} className="p-5 text-center text-gray-500 italic">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
