import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import api from "../../lib/axios";
import { UploadCloud } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.js";
import "react-pdf/dist/Page/TextLayer.js";

// ✅ Correct worker import for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ResumePage = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResume = async () => {
    try {
      const res = await api.get("/resume");
      if (res.data?.url) {
        const fullUrl = `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}${
          res.data.url
        }?t=${Date.now()}`;

        setResumeUrl(fullUrl);
      } else {
        setResumeUrl("");
      }
    } catch (err) {
      console.error("No resume found", err);
      setResumeUrl("");
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a PDF to upload");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Resume uploaded successfully!");
      fetchResume();
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-2xl font-bold">Resume Management</h2>

      {resumeUrl ? (
        <div className="p-2 rounded shadow h-[600px]">
          <iframe
            src={resumeUrl}
            title="Resume"
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
      ) : (
        <p className="text-gray-500">No resume uploaded yet</p>
      )}

      <form
        onSubmit={handleUpload}
        className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4 items-center"
      >
        <label className="flex items-center text-indigo-500 gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
          <UploadCloud className="w-5 h-5 text-indigo-500" />
          {file ? file.name : "Choose PDF"}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <button
          type="submit"
          disabled={loading || !file}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-black/90 transition"
        >
          {loading ? "Uploading..." : "Upload / Update"}
        </button>
      </form>
    </div>
  );
};

export default ResumePage;
