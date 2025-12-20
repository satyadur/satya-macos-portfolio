import { useEffect, useState } from "react";
import api from "../../lib/axios";

const DashboardHome = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const [projects, blogs, gallery, messages] = await Promise.all([
        api.get("/projects"),
        api.get("/blogs"),
        api.get("/gallery"),
        // api.get("/contact"),
      ]);

      setStats({
        projects: projects.data.length,
        blogs: blogs.data.length,
        images: gallery.data.length,
        messages: messages.data.length,
      });
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500 capitalize">{key}</h3>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
