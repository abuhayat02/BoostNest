"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

function AddServices() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    price: 0,
    deliveryTime: "",
    feature: [""],
    isActive: true,
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;

    setForm({
      ...form,
      [name]: newValue,
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...form.feature];
    updated[index] = value;
    setForm({ ...form, feature: updated });
  };

  const addFeature = () => {
    setForm({ ...form, feature: [...form.feature, ""] });
  };

  const uploadThumbnail = async (): Promise<string> => {
    if (!thumbnailFile) return "";
    const formData = new FormData();
    formData.append("image", thumbnailFile);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const uploadData = await uploadRes.json();
    return uploadData.imageURL;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const thumbnailURL = await uploadThumbnail();

      const fullData = {
        ...form,
        thumbnail: thumbnailURL,
        currency: "BDT",
      };

      const res = await fetch("http://localhost:3000/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });


      if (res.ok) {
        toast.success("✅ Service added!");
        setForm({
          title: "",
          subtitle: "",
          category: "",
          description: "",
          price: 0,
          deliveryTime: "",
          feature: [""],
          isActive: true,
        });
        setThumbnailFile(null);
      } else {
        throw new Error("Failed to submit service.");
      }
    } catch (err) {
      toast.warn("❌ Error uploading service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/50 text-white py-10 px-4">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-red-600 select-none text-center">Add Service</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="md:grid grid-cols-3 gap-3">
            <Input label="Title" name="title" value={form.title} onChange={handleChange} />
            <Input label="Subtitle" name="subtitle" value={form.subtitle} onChange={handleChange} />
            <Input label="Category" name="category" value={form.category} onChange={handleChange} />
          </div>


          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              name="price"
              value={form.price}

              onChange={handleChange}
              type="number"
            />
            <Input
              label="Delivery Time"
              name="deliveryTime"
              value={form.deliveryTime}
              onChange={handleChange}
            />
          </div>


          {/* File Upload */}
          <div>
            <label className="inline-block  mb-1 text-gray-300">Thumbnail (Image)</label><span className="text-red-700" >*</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
              className="w-full bg-neutral-900 border border-neutral-800 text-white p-2 outline-none"
              required
            />
          </div>
          <div>
            <label className="inline-block  mb-1 text-gray-300">Description </label><span className="text-red-700" >*</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 outline-none"
              required
            />
          </div>

          {/* Feature */}
          <div>
            <label className="inline-block  mb-1 text-gray-300">Features </label><span className="text-red-700" >*</span>
            <div className="space-y-2">
              {form.feature.map((f, i) => (
                <input
                  key={i}
                  value={f}
                  onChange={(e) => handleFeatureChange(i, e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-2 outline-none"
                  placeholder={`Feature ${i + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="text-sm text-red-600 hover:text-red-400 transition"
              >
                + Add Feature
              </button>
            </div>
          </div>

          {/* Is Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="accent-red-600"
            />
            <label className="text-gray-400">Service is Active</label>
          </div>



          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 transition hover:bg-red-700 active:bg-red-800 font-semibold text-lg rounded-none"
          >
            {loading ? "Uploading..." : "Submit Service"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddServices;
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = true, // ডিফল্ট true রাখলাম
}: {
  label: string;
  name: string;
  value: any;
  onChange: any;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="inline-block  mb-1 text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 outline-none rounded-none"
        required={required}
      />
    </div>
  );
}
