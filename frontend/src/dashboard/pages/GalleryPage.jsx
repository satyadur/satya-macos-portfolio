"use client";
import { useEffect, useState } from "react";
import usePhotoStore from "../../store/photos";
import api from "../../lib/axios";
import { Upload, Trash2 } from "lucide-react";

export default function GalleryPage() {
  const { photos, loadPhotos, addPhoto } = usePhotoStore();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const handleUpload = async () => {
    if (!file) return setMessage("Select an image first");
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);

      const res = await api.post("/gallery/upload", formData);
      addPhoto(res.data);
      setTitle("");
      setFile(null);
      setMessage("Photo uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload photo");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      await api.delete(`/gallery/${id}`);
      loadPhotos(); // reload gallery
      setMessage("Photo deleted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete photo");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <div className="max-w-5xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg space-y-8">
        <h1 className="text-3xl font-bold text-white">Photos Dashboard</h1>

        {/* Upload Form */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Photo Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <label className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer border border-gray-700 hover:bg-gray-700 transition">
            <Upload className="w-5 h-5" />
            {file ? file.name : "Choose Image"}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>
        </div>

        {message && (
          <p className="text-sm text-green-400 font-medium">{message}</p>
        )}

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo._id}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden relative hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-48 object-cover"
              />
              <p className="text-center text-white text-sm p-2 truncate">
                {photo.title}
              </p>
              <button
                onClick={() => handleDelete(photo._id)}
                className="absolute top-2 right-2 bg-red-600 p-1 rounded-full hover:bg-red-700 transition"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
