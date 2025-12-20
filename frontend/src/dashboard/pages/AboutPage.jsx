"use client";

import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { Upload, Save } from "lucide-react";

export default function AboutDashboard() {
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState({
    me: "",
    casual: "",
    conference: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [uploading, setUploading] = useState({
    me: false,
    casual: false,
    conference: false,
  });

  // Fetch about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        const data = res.data;

        if (!data) return;

        setSubtitle(data.subtitle || "");
        setDescription((data.description || []).join("\n"));

        const imgMap = {};
        data.images?.forEach((img) => {
          imgMap[img.key] = img.url;
        });

        setImages((prev) => ({ ...prev, ...imgMap }));
      } catch (err) {
        console.error("Failed to load About data", err);
      }
    };

    fetchAbout();
  }, []);

  // Save about
  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      const payload = {
        subtitle,
        description: description.split("\n").filter(Boolean),
        images: Object.entries(images).map(([key, url]) => ({ key, url })),
      };

      await api.post("/about", payload);
      setMessage("About section updated successfully");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update About section");
    } finally {
      setLoading(false);
    }
  };

  // Image upload
  const handleImageUpload = async (key, file) => {
    if (!file) return;

    try {
      setUploading((prev) => ({ ...prev, [key]: true }));

      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("/about/upload", formData);

      setImages((prev) => ({
        ...prev,
        [key]: res.data.url,
      }));
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const isUploading = Object.values(uploading).some(Boolean);
  const disableSave = loading || isUploading;

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl space-y-8 border border-gray-700">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">About Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage your About section content</p>
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-300">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-300">Description</label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-300">Upload Images</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["me", "casual", "conference"].map((key) => (
              <div key={key} className="flex flex-col items-center space-y-2">
                <label className="text-xs font-medium text-gray-400 capitalize">{key} image</label>

                {/* Image Preview */}
                <div className="w-32 h-32 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden flex items-center justify-center">
                  {images[key] ? (
                    <img src={images[key]} alt={key} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 text-sm">No image</span>
                  )}
                </div>

                {/* Upload Button */}
                <label className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer border border-gray-700 hover:bg-gray-700 transition">
                  <Upload className="w-5 h-5" />
                  {uploading[key] ? "Uploading..." : "Choose Image"}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading[key]}
                    onChange={(e) => handleImageUpload(key, e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            disabled={disableSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : isUploading ? "Uploading..." : "Save Changes"}
          </button>

          {message && (
            <span
              className={`text-sm font-medium ${
                message.toLowerCase().includes("success")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
