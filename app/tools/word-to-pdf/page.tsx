"use client";

import { useState } from "react";

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const selectedFile = e.target.files[0];

    if (!selectedFile.name.endsWith(".docx")) {
      setError("Please upload a valid .docx file");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const convertToPdf = async () => {
    if (!file) return;

    setProcessing(true);
    setError("");

    try {
      /* 
        IMPORTANT:
        Mammoth CANNOT run in the browser.
        This demo assumes your DOCX → HTML conversion
        happens via an API route (recommended).
      */

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/word-to-html", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const { html } = await res.json();

      const container = document.createElement("div");
      container.innerHTML = `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 20px;
        ">
          ${html}
        </div>
      `;

      const html2pdf = (await import("html2pdf.js")).default;

      await html2pdf()
        .set({
          margin: 10,
          filename: file.name.replace(".docx", ".pdf"),
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(container)
        .save();
    } catch (err) {
      console.error(err);
      setError("Error converting file. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Word to PDF Converter
          </h1>
          <p className="mt-2 text-sm text-gray-600">Free, fast, and secure.</p>
        </div>

        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100">
          <span className="text-sm text-gray-600">Click to upload DOCX</span>
          <input
            type="file"
            className="hidden"
            accept=".docx"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <div className="bg-green-50 text-green-700 p-2 rounded text-sm text-center">
            {file.name}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={convertToPdf}
          disabled={!file || processing}
          className="w-full py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
        >
          {processing ? "Processing…" : "Convert to PDF"}
        </button>
      </div>
    </div>
  );
}
