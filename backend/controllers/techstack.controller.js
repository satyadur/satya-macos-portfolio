import TechStack from "../models/TechStack.js";

// ➕ Create or Update (Upsert)
export const upsertTechStack = async (req, res) => {
  try {
    const { category, items } = req.body;

    if (!category || !Array.isArray(items)) {
      return res.status(400).json({
        message: "Category and items array are required",
      });
    }

    const stack = await TechStack.findOneAndUpdate(
      { category: category.trim() },
      { items },
      { new: true, upsert: true }
    );

    res.status(201).json(stack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get All Tech Stacks
export const getTechStacks = async (_, res) => {
  try {
    const stacks = await TechStack.find().sort({ category: 1 });
    res.json(stacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
