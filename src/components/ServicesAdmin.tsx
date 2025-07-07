"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

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

function ServicesAdmin({ service }: { service: Service }) {
  const handleEdit = () => {

  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this service?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/services/${service._id}`, {
        method: "DELETE",
      });

      if (res.ok) {

        toast.success("✅ Deleted successfully!");

      } else {
        toast.warn(" Failed to delete");
      }
    } catch (error) {
      console.error(error);
      toast.warn(" Something went wrong");
    }
  };

  return (
    <tr className="hover:bg-neutral-800 transition duration-200">
      <td className="p-3">
        <Image
          src={service.thumbnail}
          alt={service.title}
          width={48}
          height={48}
          className="rounded border border-neutral-700 object-cover"
        />
      </td>
      <td className="p-3">{service.title}</td>
      <td className="p-3 capitalize">{service.category}</td>
      <td className="p-3">৳ {service.price}</td>
      <td className="p-3">{service.deliveryTime}</td>
      <td className="p-3">
        {service.isActive ? (
          <span className="text-green-400">Active</span>
        ) : (
          <span className="text-red-500">Inactive</span>
        )}
      </td>
      <td className="p-3">
        <Link href={`/${service._id}`} >go</Link>
      </td>

      <td className="p-3 space-x-3">
        <button
          onClick={handleEdit}
          className="text-blue-400 hover:text-blue-300 transition"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-400 transition"
          title="Delete"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
}

export default ServicesAdmin;
