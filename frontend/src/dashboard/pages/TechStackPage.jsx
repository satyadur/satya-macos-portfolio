import { useEffect, useState } from "react";
import api from "../../lib/axios";

const TechStackPage = () => {
  const [stacks, setStacks] = useState([]);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await api.get("/tech-stack");
        if (!ignore) setStacks(res.data);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const resetForm = () => {
    setCategory("");
    setItems("");
    setEditingId(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await api.post("/tech-stack", {
      category,
      items: items.split(",").map(i => i.trim()),
    });

    resetForm();

    const res = await api.get("/tech-stack");
    setStacks(res.data);
  };

  const handleEdit = stack => {
    setEditingId(stack._id);
    setCategory(stack.category);
    setItems(stack.items.join(", "));
  };

  return (
    <div className="space-y-8 max-w-full">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Tech Stack</h2>
        <p className="text-gray-500">
          Manage technologies shown on your portfolio
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Frontend, Backend, Mobile..."
              disabled={!!editingId}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/20 focus:outline-none disabled:bg-gray-100 text-black"
              required
            />
          </div>

          {/* Items */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Technologies
            </label>
            <input
              value={items}
              onChange={e => setItems(e.target.value)}
              placeholder="React, Next.js, TypeScript"
              className="border text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/20 focus:outline-none"
              required
            />
            <span className="text-xs text-gray-400">
              Separate items using commas
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-black/90 transition"
          >
            {editingId ? "Update Tech Stack" : "Add Tech Stack"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2 rounded-lg border hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="space-y-4">
        {stacks.map(stack => (
          <div
            key={stack._id}
            className="bg-white border rounded-xl p-5 flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-amber-500 text-lg">{stack.category}</h3>
              <p className="text-gray-600 mt-1">
                {stack.items.join(", ")}
              </p>
            </div>

            <button
              onClick={() => handleEdit(stack)}
              className="text-sm text-indigo-600 hover:underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackPage;
