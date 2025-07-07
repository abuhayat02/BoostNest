"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

interface Order {
  _id: string;
  status: string;
  paymentScreenShort: string;
  youTubeChannelLink: string;
  youtubeVideoLink: string;
  description: string;
  paymentRequest: boolean;
  createdAt: string;
  userId?: User | null;
}

export default function Payments() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [checking, setChecking] = useState<Order[]>([])
  const [inProgress, setinProgress] = useState<Order[]>([])
  const [last, setLast] = useState<Order[]>([])

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/order");
      const result = await response.json();
      const sorted = result.allRequest.sort(
        (a: Order, b: Order) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const checkingOrders = sorted.filter(order => order.status === "Checking");
      const progress = sorted.filter(order => order.status === "In Progress");
      const last = sorted.filter(order => order.status === "Completed" || order.status === "Rejected");
      setLast(last)
      setinProgress(progress)
      setChecking(checkingOrders)
      setOrders(sorted);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const startUpdate = (orderId: string, currentStatus: string) => {
    setUpdatingOrderId(orderId);
    setNewStatus(currentStatus);
  };

  const cancelUpdate = () => {
    setUpdatingOrderId(null);
    setNewStatus("");
  };


  const deleteOrder = async (id: string) => {
    try {
      const res = await fetch(`/api/order/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete");
        return;
      }

      toast.success("Deleted successfully!");
      fetchData(); // আবার রিফ্রেশ করবে
    } catch (err: any) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const saveStatus = async (orderId: string) => {
    try {
      await fetch(`http://localhost:3000/api/order`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, orderId }),
      });
      setUpdatingOrderId(null);
      setNewStatus("");
      fetchData();
      toast.success(`status ${newStatus} updated`)
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="h-[800px] overflow-scroll bg-black text-gray-200 px-4 py-8">
      <h1 className="text-2xl text-red-800 font-semibold  mb-2">
        Pending Payment Requests
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-neutral-800">
          <thead className="bg-neutral-900 text-left uppercase tracking-wide">
            <tr>
              <th className="p-3 border-b text-blue-200 border-neutral-800">User</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Screenshot</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Channel</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Video</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Description</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Requested</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Status</th>

              <th className="p-3 border-b text-blue-200 border-neutral-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6  text-gray-500 italic">
                  No orders found.
                </td>
              </tr>
            )}
            {checking.map((order) => (
              <tr
                key={order._id}
                className="border-t border-neutral-800 hover:bg-neutral-900 transition"
              >

                <td className="p-3 text-xs">
                  {order.userId ? (
                    <>
                      <div>{order.userId.name}</div>
                      <div className="text-gray-400 text-[10px]">
                        {order.userId.email}
                      </div>
                    </>
                  ) : (
                    "—"
                  )}
                </td>


                <td className="p-3 text-xs underline">
                  <a href={order.paymentScreenShort} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>

                <td className="p-3 text-xs underline">
                  {order.youTubeChannelLink ? (
                    <a
                      href={order.youTubeChannelLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3 text-xs underline">
                  {order.youtubeVideoLink ? (
                    <a href={order.youtubeVideoLink} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3 text-xs line-clamp-2 max-w-xs">
                  {order.description || "—"}
                </td>

                <td className="p-3 text-xs">{formatDate(order.createdAt)}</td>
                <td className="p-3 text-xs">
                  {updatingOrderId === order._id ? (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="bg-neutral-800 text-gray-200 p-1  w-full"
                    >
                      <option value="Checking">Checking</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  ) : (
                    order.status
                  )}
                </td>

                <td className="p-3 text-xs space-x-1">
                  {updatingOrderId === order._id ? (
                    <>
                      <button
                        onClick={() => saveStatus(order._id)}
                        className="bg-green-700 hover:bg-green-600 text-white px-2 py-1 "
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelUpdate}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 "
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startUpdate(order._id, order.status)}
                      className="bg-blue-700 hover:bg-blue-600 text-white px-2 py-1 "
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="text-2xl text-red-800 font-semibold mt-8  mb-6">
        In-Progress
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-neutral-800">
          <thead className="bg-neutral-900 text-left uppercase tracking-wide">
            <tr>
              <th className="p-3 border-b text-blue-200 border-neutral-800">User</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Screenshot</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Channel</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Video</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Description</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Requested</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Status</th>

              <th className="p-3 border-b  text-blue-200 border-neutral-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500 italic">
                  No orders found.
                </td>
              </tr>
            )}
            {inProgress.map((order) => (
              <tr
                key={order._id}
                className="border-t border-neutral-800 hover:bg-neutral-900 transition"
              >

                <td className="p-3 text-xs">
                  {order.userId ? (
                    <>
                      <div>{order.userId.name}</div>
                      <div className="text-gray-400 text-[10px]">
                        {order.userId.email}
                      </div>
                    </>
                  ) : (
                    "—"
                  )}
                </td>


                <td className="p-3 text-xs underline">
                  <a href={order.paymentScreenShort} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>

                <td className="p-3 text-xs underline">
                  {order.youTubeChannelLink ? (
                    <a
                      href={order.youTubeChannelLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3 text-xs underline">
                  {order.youtubeVideoLink ? (
                    <a href={order.youtubeVideoLink} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3 text-xs line-clamp-2 max-w-xs">
                  {order.description || "—"}
                </td>

                <td className="p-3 text-xs">{formatDate(order.createdAt)}</td>
                <td className="p-3 text-xs">
                  {updatingOrderId === order._id ? (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="bg-neutral-800 text-gray-200 p-1  w-full"
                    >
                      <option value="Checking">Checking</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  ) : (
                    <p className="font-bold text-yellow-500 animate-pulse">
                      {order.status}
                    </p>)}
                </td>

                <td className="p-3 text-xs space-x-1">
                  {updatingOrderId === order._id ? (
                    <>
                      <button
                        onClick={() => saveStatus(order._id)}
                        className="bg-green-700 hover:bg-green-600 text-white px-2 py-1 "
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelUpdate}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 "
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startUpdate(order._id, order.status)}
                      className="bg-blue-700 hover:bg-blue-600 text-white px-2 py-1 "
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="text-2xl text-red-800 font-semibold mt-8  mb-6">
        Complete or Rejected
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-neutral-800">
          <thead className="bg-neutral-900 text-left uppercase tracking-wide">
            <tr>
              <th className="p-3 border-b text-blue-200 border-neutral-800">User</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Screenshot</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Channel</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Video</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Description</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Requested</th>
              <th className="p-3 border-b text-blue-200 border-neutral-800">Status</th>

              <th className="p-3 border-b text-blue-200 border-neutral-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500 italic">
                  No orders found.
                </td>
              </tr>
            )}
            {last.map((order) => (
              <tr
                key={order._id}
                className="border-t border-neutral-800 hover:bg-neutral-900 transition"
              >

                <td className="p-3 text-xs">
                  {order.userId ? (
                    <>
                      <div>{order.userId.name}</div>
                      <div className="text-gray-400 text-[10px]">
                        {order.userId.email}
                      </div>
                    </>
                  ) : (
                    "—"
                  )}
                </td>


                <td className="p-3 text-xs underline">
                  <a href={order.paymentScreenShort} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>

                <td className="p-3 text-xs underline">
                  {order.youTubeChannelLink ? (
                    <a
                      href={order.youTubeChannelLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3 text-xs underline">
                  {order.youtubeVideoLink ? (
                    <a href={order.youtubeVideoLink} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3 text-xs line-clamp-2 max-w-xs">
                  {order.description || "—"}
                </td>

                <td className="p-3 text-xs">{formatDate(order.createdAt)}</td>
                <td className="p-3 text-xs">
                  {updatingOrderId === order._id ? (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="bg-neutral-800 text-gray-200 p-1  w-full"
                    >
                      <option value="Checking">Checking</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  ) : (
                    order.status === "Completed" ? <p className="text-green-700 font-bold">{order.status}</p> : <p className="text-red-700 font-bold">{order.status}</p>
                  )}
                </td>

                <td className="p-3 text-xs space-x-1">
                  {updatingOrderId === order._id ? (
                    <>
                      <button
                        onClick={() => saveStatus(order._id)}
                        className="bg-green-700 hover:bg-green-600 text-white px-2 py-1 "
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelUpdate}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 "
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div>
                      <button
                        onClick={() => startUpdate(order._id, order.status)}
                        className="bg-blue-700 hover:bg-blue-600 text-white px-2 py-1 "
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="bg-red-700 hover:bg-red-600 ml-1 text-white px-2 py-1 "
                      >
                        Delate
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
