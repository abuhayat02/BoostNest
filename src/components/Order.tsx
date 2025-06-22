"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderForm({ params
}: { params: { servicesId: string } }) {
  let { servicesId } = params;
  const [paymentScreenshotUrl, setPaymentScreenshotUrl] = useState("");
  const [loading, setLoading] = useState(false);
  let { data: session } = useSession()
  const [youTubeChannelLink, setYouTubeChannelLink] = useState("");
  const [youtubeVideoLink, setYoutubeVideoLink] = useState("");
  const [description, setDescription] = useState("");
  let router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Prepare FormData for image upload
    const formData = new FormData();
    const imageFile = (e.currentTarget.elements.namedItem("paymentScreenshot") as HTMLInputElement).files?.[0];

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

      const orderRes = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      let data = await orderRes.json()
      console.log(data)
      if (orderRes.ok) {
        router.push('/dashboard')
        alert('your request is pending')
      } else {
        alert(data?.message)
      }

    } catch (error: any) {
      console.log(error.message)
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] dark:from-[#111827] dark:to-[#1f2937]  shadow-2xl space-y-8 transition-all duration-500"
    >
      <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-md">
        🚀 Submit Your Order
      </h2>

      {/* Payment Screenshot */}
      <div className="group">
        <label
          htmlFor="paymentScreenshot"
          className="block font-medium text-gray-300 mb-2"
        >
          Payment Screenshot <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="paymentScreenshot"
          name="paymentScreenshot"
          accept="image/*"
          required
          className="w-full px-4 py-3 bg-[#262626] text-white  shadow-inner outline-none border border-gray-700 hover:border-red-500 focus:ring-2 focus:ring-red-600 transition-all duration-300"
        />
      </div>

      {/* Channel Link */}
      <div className="group">
        <label htmlFor="youTubeChannelLink" className="block font-medium text-gray-300 mb-2">
          YouTube Channel Link <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="youTubeChannelLink"
          name="youTubeChannelLink"
          value={youTubeChannelLink}
          onChange={(e) => setYouTubeChannelLink(e.target.value)}
          placeholder="https://youtube.com/@yourchannel"
          className="w-full px-4 py-3 bg-[#262626] text-white  shadow-inner border border-gray-700 hover:border-red-500 focus:ring-2 focus:ring-red-600 outline-none transition"
        />
      </div>

      {/* Video Link */}
      <div className="group">
        <label htmlFor="youtubeVideoLink" className="block font-medium text-gray-300 mb-2">
          YouTube Video Link
        </label>
        <input
          type="url"
          id="youtubeVideoLink"
          name="youtubeVideoLink"
          value={youtubeVideoLink}
          onChange={(e) => setYoutubeVideoLink(e.target.value)}
          placeholder="https://youtube.com/watch?v=yourvideo"
          className="w-full px-4 py-3 bg-[#262626] text-white  shadow-inner border border-gray-700 hover:border-red-500 focus:ring-2 focus:ring-red-600 outline-none transition"
        />
      </div>

      {/* Description */}
      <div className="group">
        <label htmlFor="description" className="block font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write anything if needed (optional)"
          rows={4}
          className="w-full px-4 py-3 bg-[#262626] text-white  shadow-inner border border-gray-700 hover:border-red-500 focus:ring-2 focus:ring-red-600 outline-none transition resize-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3  bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg hover:shadow-red-500/30 transition duration-300 ease-in-out disabled:opacity-60"
      >
        {loading ? (
          <span className="animate-pulse">Submitting...</span>
        ) : (
          "📩 Submit Order"
        )}
      </button>
    </form>


  );
}
