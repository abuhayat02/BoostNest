"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  createdAt: string;
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // ডাটা ফেচ করার ফাংশন
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/users", { cache: "no-store" });
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    console.log("delet user id , ", id)
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      } else {
        toast.success("Failed to delete user");
      }
    } catch (error) {
      toast.success("Error deleting user");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">All Users</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-md text-sm">
            <thead className="bg-gray-900">
              <tr>
                <th className="py-3 px-4 border-b border-gray-700 text-left">Avatar</th>
                <th className="py-3 px-4 border-b border-gray-700 text-left">Name</th>
                <th className="py-3 px-4 border-b border-gray-700 text-left">Email</th>
                <th className="py-3 px-4 border-b border-gray-700 text-left">Role</th>
                <th className="py-3 px-4 border-b border-gray-700 text-left">Joined At</th>
                <th className="py-3 px-4 border-b border-gray-700 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500 italic">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="p-3">
                      <Image
                        src={user.image || "https://i.ibb.co/ZVh01dm/default-avatar.png"}
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3 lowercase">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="p-3">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
