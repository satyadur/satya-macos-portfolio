import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    image: req.file?.path,
  });
  res.status(201).json(blog);
};

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};
