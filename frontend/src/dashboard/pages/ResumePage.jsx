// frontend/src/components/ResumeManager.js
import React, { useState, useEffect, useRef } from "react";
import api from "../../lib/axios";
import { UploadCloud } from "lucide-react";

const ResumeManager = () => {
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type !== "application/pdf") {
      setUploadStatus("Please select a valid PDF file");
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    try {
      await api.post("/resume/insert-resume", formData);
      setUploadStatus("✅ Resume uploaded successfully!");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
      fetchResume();
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("❌ Upload failed — check file or server");
    } finally {
      setLoading(false);
    }
  };

  const fetchResume = async () => {
    setLoading(true);
    try {
      const response = await api.get("/resume/get-resume", {
        responseType: "blob",
        transformResponse: [],
      });

      if (response.data && response.data.size > 1000) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        if (resumeUrl) URL.revokeObjectURL(resumeUrl);
        setResumeUrl(url);
        setUploadStatus("📄 Resume loaded successfully");
      } else {
        setUploadStatus("No resume found on server");
        setResumeUrl(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setUploadStatus("❌ Failed to load resume — check network/console");
      setResumeUrl(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
    return () => resumeUrl && URL.revokeObjectURL(resumeUrl);
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Manage Your Resume</h2>

      {/* Upload Box */}
      <div
        style={{
          border: "2px dashed #007bff",
          borderRadius: "12px",
          padding: "40px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          transition: "border-color 0.3s",
        }}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <UploadCloud size={48} color="#007bff" />
        <span style={{ fontWeight: "bold", color: "#007bff" }}>
          {file ? file.name : "Click or Drag PDF to Upload"}
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          style={{
            marginTop: "10px",
            padding: "10px 25px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: file && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <p
        style={{
          color: uploadStatus.includes("success") ? "green" : "red",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {uploadStatus || "Ready"}
      </p>

      {/* Refresh */}
      <button
        onClick={fetchResume}
        disabled={loading}
        style={{
          padding: "8px 16px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginBottom: "30px",
        }}
      >
        Refresh Preview
      </button>

      {/* Resume Preview */}
      {resumeUrl ? (
        <div>
          <h3>Your Resume Preview</h3>
          <div
            style={{
              border: "2px solid #ddd",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              background: "#fff",
              height: "800px",
              marginBottom: "20px",
            }}
          >
            <iframe
              src={resumeUrl}
              title="Resume Preview"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            >
              Your browser does not support PDFs.
              <a href={resumeUrl} download="My_Resume.pdf">
                Download instead
              </a>
            </iframe>
          </div>

          <a
            href={resumeUrl}
            download="Durga_Satyanarayana_Kudupudi_Resume.pdf"
            style={{
              display: "inline-block",
              padding: "12px 30px",
              background: "#dc3545",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            📄 Download Resume
          </a>
        </div>
      ) : (
        !loading && (
          <p style={{ fontStyle: "italic", color: "#666" }}>
            No resume uploaded yet.
          </p>
        )
      )}
    </div>
  );
};

export default ResumeManager;
