import { useEffect, useState } from "react";
import api from "../../lib/axios";

const MessagesPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/visit/stats").then((res) => setData(res.data));
  }, []);

  if (!data) return <p className="text-white">Loading analytics...</p>;

  return (
    <div className="p-6 text-white bg-black h-full">
      <h1 className="text-2xl font-bold mb-6">📊 Visitor Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Stat title="Total Visits" value={data.totalVisits} />
      </div>

      {/* Analytics Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Browser Usage */}
        <div className="bg-zinc-900 p-4 rounded">
          <h2 className="font-semibold mb-2">🌍 Browser Usage</h2>
          {data.visitsByBrowser.map((b) => (
            <p key={b._id} className="text-sm text-gray-300">
              {b._id || "Unknown"}: {b.count}
            </p>
          ))}
        </div>

        {/* Visits Per Day */}
        <div className="bg-zinc-900 p-4 rounded">
          <h2 className="font-semibold mb-2">📅 Last 7 Days</h2>
          {data.visitsPerDay.map((d) => (
            <p key={d._id} className="text-sm text-gray-300">
              {d._id}: {d.count}
            </p>
          ))}
        </div>

        {/* Recent Visits */}
        <div className="bg-zinc-900 p-4 rounded md:col-span-2">
          <h2 className="font-semibold mb-3">🕒 Recent Visits</h2>
          <div className="space-y-3">
            {data.recentVisits.map((v, i) => (
              <div key={i} className="text-sm text-gray-300">
                <p>
                  {v.browser || "Unknown"} • {v.city || "Unknown"},{" "}
                  {v.country || "Unknown"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(v.visitedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-zinc-900 p-4 rounded">
    <h3 className="text-sm text-gray-400">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default MessagesPage;
