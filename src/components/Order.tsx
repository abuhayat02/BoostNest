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
        router.push("/dashboard");
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 p-8 bg-[#1f1f1f] shadow-2xl space-y-8">
      <h2 className="text-3xl font-bold text-center text-white">🚀 Submit Your Order</h2>

      {/* File input */}
      <div>
        <label className="text-white">Payment Screenshot *</label>
        <input type="file" name="paymentScreenshot" required className="w-full bg-gray-800 text-white p-2 mt-2" />
      </div>

      {/* Channel Link */}
      <div>
        <label className="text-white">YouTube Channel Link *</label>
        <input
          type="url"
          name="youTubeChannelLink"
          required
          value={youTubeChannelLink}
          onChange={(e) => setYouTubeChannelLink(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 mt-2"
        />
      </div>

      {/* Video Link */}
      <div>
        <label className="text-white">YouTube Video Link</label>
        <input
          type="url"
          name="youtubeVideoLink"
          value={youtubeVideoLink}
          onChange={(e) => setYoutubeVideoLink(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 mt-2"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-white">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 mt-2"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 mt-4">
        {loading ? "Submitting..." : "📩 Submit Order"}
      </button>
    </form>
  );
}
