import { useEffect, useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import api from "../lib/axios";

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchResume = async () => {
    setLoading(true);
    try {
      const response = await api.get("/resume/get-resume", {
        responseType: "blob", // Critical: Tell Axios it's binary data
        transformResponse: [], // Prevent Axios from trying to parse as JSON
      });

      // Check if we actually received PDF data
      if (
        response.data &&
        response.data.size > 0 &&
        response.data.type === "application/pdf"
      ) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        // Revoke previous URL to avoid memory leaks
        if (resumeUrl) {
          URL.revokeObjectURL(resumeUrl);
        }

        setResumeUrl(url);
      } else {
        // No valid PDF returned
        setResumeUrl("");
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

    // Cleanup blob URL on unmount
    return () => {
      if (resumeUrl) {
        URL.revokeObjectURL(resumeUrl);
      }
    };
  }, []);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div
        id="window-header"
        className="flex justify-between items-center mb-2"
      >
        <div className="flex items-center gap-2">
          <WindowControls target="resume" />
          <h2 className="font-bold text-lg">
            Durga_Satyanarayana_Kudupudi.pdf
          </h2>
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
