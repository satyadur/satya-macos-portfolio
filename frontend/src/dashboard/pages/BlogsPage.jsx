import { useEffect, useState } from "react";
import api from "../../lib/axios";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get("/blogs").then(res => setBlogs(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      {blogs.map(blog => (
        <div key={blog._id} className="bg-white p-4 mb-3 rounded shadow">
          <h3 className="font-semibold">{blog.title}</h3>
          <a
            href={blog.link}
            target="_blank"
            className="text-blue-600 text-sm"
          >
            Read Article
          </a>
        </div>
      ))}
    </div>
  );
};

export default BlogsPage;
