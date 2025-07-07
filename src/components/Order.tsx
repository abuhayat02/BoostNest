"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderForm({ servicesId }: { servicesId: string }) {
  const [paymentScreenshotUrl, setPaymentScreenshotUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [youTubeChannelLink, setYouTubeChannelLink] = useState("");
  const [youtubeVideoLink, setYoutubeVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const imageFile = (e.currentTarget.elements.namedItem("paymentScreenshot") as HTMLInputElement)?.files?.[0];

    if (imageFile) {
      formData.append("image", imageFile);
    }

    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.imageURL;
        setPaymentScreenshotUrl(imageUrl);
      }

      const orderPayload = {
        paymentScreenShort: imageUrl,
        userId: session?.user?.id,
        servicesId,
        youTubeChannelLink,
        youtubeVideoLink,
        description,
        paymentRequest: false,
      };

      const orderRes = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (orderRes.ok) {
        router.push("/dashboard/orders");
        alert("✅ Your request is pending");
      } else {
        const data = await orderRes.json();
        alert(data?.message || "Something went wrong");
      }
    } catch (error: any) {
      alert("❌ Error: " + error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-8 px-10 py-12 bg-gradient-to-bl from-[#0d08704f] via-[#d51a094d] to-[#38343487] shadow-[0_10px_40px_rgba(0,0,0,0.5)] space-y-4  border border-red-800"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight">
        Submit Your Order
      </h2>

      {/* Screenshot Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Payment Screenshot <span className="text-red-500">*</span></label>
        <input
          type="file"
          name="paymentScreenshot"
          required
          accept="image/*"
          className="w-full bg-white/5 text-white p-3  border border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-gray-500"
        />
      </div>

      {/* YouTube Channel */}
      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">YouTube Channel Link <span className="text-red-500">*</span></label>
        <input
          type="url"
          name="youTubeChannelLink"
          required
          placeholder="https://youtube.com/@yourchannel"
          value={youTubeChannelLink}
          onChange={(e) => setYouTubeChannelLink(e.target.value)}
          className="w-full bg-white/5 text-white p-3  border border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-gray-500"
        />
      </div>

      {/* YouTube Video */}
      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">YouTube Video Link</label>
        <input
          type="url"
          name="youtubeVideoLink"
          placeholder="https://youtube.com/watch?v=video"
          value={youtubeVideoLink}
          onChange={(e) => setYoutubeVideoLink(e.target.value)}
          className="w-full bg-white/5 text-white p-3  border border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-gray-500"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="text-white text-sm font-semibold">Description</label>
        <textarea
          name="description"
          placeholder="Write anything if needed (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/5 text-white p-3  border border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-gray-500 resize-none"
          rows={4}
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3  shadow-lg hover:shadow-red-500/30 transition duration-300 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Order"}
      </button>
    </form>

  );
}
