import { useEffect, useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import api from "../lib/axios";

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the resume URL from backend
  const fetchResume = async () => {
    try {
      const res = await api.get("/resume");
      if (res.data?.url) {
        // Construct full URL with cache busting
        const fullUrl = `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}${res.data.url}?t=${Date.now()}`;
        setResumeUrl(fullUrl);
      } else {
        setResumeUrl(""); // No resume uploaded
      }
    } catch (err) {
      console.error("Error fetching resume:", err);
      setResumeUrl("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div id="window-header" className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <WindowControls target="resume" />
          <h2 className="font-bold text-lg">Durga_Satyanarayana_Kudupudi.pdf</h2>
        </div>

        {resumeUrl && (
          <a
            href={resumeUrl}
            download
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition"
            title="Download resume"
          >
            <Download className="w-5 h-5" />
            Download
          </a>
        )}
      </div>

      <div className="resume-preview border rounded shadow p-2 min-h-[400px] flex justify-center items-center">
        {loading ? (
          <p className="text-gray-500">Loading resume...</p>
        ) : resumeUrl ? (
          <iframe
            src={resumeUrl}
            title="Resume"
            width="100%"
            height="600px"
            className="rounded border"
          />
        ) : (
          <p className="text-gray-500">No resume uploaded yet</p>
        )}
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
