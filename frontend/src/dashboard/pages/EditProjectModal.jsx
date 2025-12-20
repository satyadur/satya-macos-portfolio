import { useState } from "react";
import api from "../../lib/axios";

const EditProjectModal = ({ project, onClose, onSaved }) => {
  const [form, setForm] = useState({
    title: project.title || "",
    description: project.description?.join("\n") || "",
    techStack: project.techStack?.join(", ") || "",
    liveUrl: project.liveUrl || "",
    videoUrl: project.videoUrl || "",
    windowPosition: project.windowPosition || "",
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

    await api.put(`/projects/${project._id}`, data);
    setLoading(false);

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[500px] rounded-lg p-6 space-y-4"
      >
        <h3 className="text-lg font-semibold">Edit Project</h3>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project title"
          className="input"
          required
        />

        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="One point per line"
          className="input"
        />

        <input
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="React, Next.js, Tailwind"
          className="input"
        />

        <input
          name="liveUrl"
          value={form.liveUrl}
          onChange={handleChange}
          placeholder="Live URL"
          className="input"
        />

        <input
          name="videoUrl"
          value={form.videoUrl}
          onChange={handleChange}
          placeholder="Video URL"
          className="input"
        />

        <input
          name="windowPosition"
          value={form.windowPosition}
          onChange={handleChange}
          placeholder="Finder window position (optional)"
          className="input"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectModal;
