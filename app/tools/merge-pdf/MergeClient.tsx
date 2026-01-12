"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Files, Trash2, Plus } from "lucide-react";
import ProcessingModal from "../../component/ProcessingModal";

export default function MergeClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;

    setIsProcessing(true);
    setProgress(10);

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        // Update progress based on number of files
        setProgress(Math.round(((i + 1) / files.length) * 80));

        const fileBytes = await files[i].arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      // 3-second delay for Ad exposure (same as Word-to-PDF)
      setTimeout(async () => {
        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "merged-officekit.io.pdf";
        link.click();

        setProgress(100);
        setTimeout(() => {
          setIsProcessing(false);
          setProgress(0);
        }, 1000);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Error merging PDFs. Ensure files are not password protected.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <ProcessingModal isOpen={isProcessing} progress={progress} />

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Merge PDF Files</h1>
          <p className="text-gray-500 mt-2">
            Combine multiple PDF documents into one in seconds.
          </p>
        </div>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors">
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Files className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-blue-700">
              Click to select PDF files
            </p>
            <p className="text-sm text-gray-500">or drag and drop them here</p>
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-8 space-y-3">
            <h3 className="font-semibold text-gray-700">
              Files to Merge ({files.length})
            </h3>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {file.name}
                  </p>
                  <span className="text-xs text-gray-400">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              onClick={mergePdfs}
              disabled={files.length < 2}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:shadow-none"
            >
              <Plus className="w-5 h-5" />
              Merge Now
            </button>
          </div>
        )}
      </div>

      {/* Vertical Side Ads Placeholder */}
      <div className="hidden lg:block fixed left-5 top-1/2 -translate-y-1/2 w-40 h-[600px] bg-gray-100 border flex items-center justify-center text-xs text-gray-400 text-center p-4">
        Sticky SkyScraper Ad (High Revenue)
      </div>
    </div>
  );
}
