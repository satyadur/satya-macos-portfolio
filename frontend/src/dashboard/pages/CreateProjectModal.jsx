import { useState } from "react";
import api from "../../lib/axios";
import FormField from "../components/FormField";
import Modal from "../components/Modal";

const CreateProjectModal = ({ onClose, onSaved }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    videoUrl: "",
    windowPosition: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", form.title);
    data.append(
      "description",
      form.description.split("\n").filter(Boolean)
    );
    data.append(
      "techStack",
      form.techStack.split(",").map((t) => t.trim())
    );
    data.append("liveUrl", form.liveUrl);
    data.append("videoUrl", form.videoUrl);
    data.append("windowPosition", form.windowPosition);

    if (thumbnail) data.append("thumbnail", thumbnail);

    await api.post("/projects", data);
    setLoading(false);

    onSaved();
    onClose();
  };

  return (
    <Modal title="Create New Project" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <FormField
          label="Project Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Nike Ecommerce Website"
          required
        />

        <FormField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="One point per line"
          textarea
        />

        {/* URLs */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Live URL"
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            placeholder="https://example.com"
          />

          <FormField
            label="Video URL"
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
          />
        </div>

        <FormField
          label="Tech Stack"
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="React, Next.js, Tailwind"
        />

        <FormField
          label="Finder Window Position"
          name="windowPosition"
          value={form.windowPosition}
          onChange={handleChange}
          placeholder="top-[20vh] left-7"
        />

        {/* Thumbnail */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="text-sm border text-black"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-black text-white rounded-md"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
