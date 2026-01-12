"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Scissors, FileOutput, Download, AlertCircle } from "lucide-react";
import ProcessingModal from "../../component/ProcessingModal";

export default function SplitClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<"all" | "range">("all");
  const [range, setRange] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Load PDF just to count pages
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
    }
  };

  const parseRange = (input: string, max: number): number[] => {
    // Logic to turn "1-3, 5" into [0, 1, 2, 4] (0-based index)
    const pages = new Set<number>();
    const parts = input.split(",");

    parts.forEach((part) => {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map((n) => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) pages.add(i - 1);
        }
      } else {
        const num = parseInt(part.trim());
        if (!isNaN(num)) pages.add(num - 1);
      }
    });

    return Array.from(pages)
      .filter((p) => p >= 0 && p < max)
      .sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(10);

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(fileArrayBuffer);

      // Determine which pages to extract
      let pagesToExtract: number[] = [];
      if (splitMode === "all") {
        pagesToExtract = sourcePdf.getPageIndices();
      } else {
        pagesToExtract = parseRange(range, sourcePdf.getPageCount());
      }

      if (pagesToExtract.length === 0)
        throw new Error("No valid pages selected");

      // Create new PDF
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(sourcePdf, pagesToExtract);
      copiedPages.forEach((page) => newPdf.addPage(page));

      setProgress(80);

      // 3-second Ad Wait
      setTimeout(async () => {
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `split-${file.name}`;
        link.click();

        setProgress(100);
        setTimeout(() => {
          setIsProcessing(false);
          setProgress(0);
        }, 1000);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Invalid page range or file error.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <ProcessingModal isOpen={isProcessing} progress={progress} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* === LEFT COLUMN: The Tool (Span 2) === */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <Scissors className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Split PDF</h1>
                <p className="text-gray-500">
                  Extract pages from your PDF documents instantly.
                </p>
              </div>
            </div>

            {/* Upload Box */}
            {!file ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-red-200 rounded-xl cursor-pointer bg-red-50/30 hover:bg-red-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Scissors className="w-12 h-12 text-red-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    Click to upload PDF
                  </p>
                  <p className="text-sm text-gray-500">Max file size 50MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded shadow-sm">
                    <FileOutput className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {pageCount} Pages • {(file.size / 1024 / 1024).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Change File
                </button>
              </div>
            )}
          </div>

          {/* Controls Card (Only shows after upload) */}
          {file && (
            <div className="bg-white rounded-2xl shadow-sm border p-8 animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="font-bold text-gray-800 mb-4">Split Options</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setSplitMode("all")}
                  className={`p-4 border rounded-xl text-left transition-all ${
                    splitMode === "all"
                      ? "border-red-500 bg-red-50 ring-1 ring-red-500"
                      : "hover:border-gray-300"
                  }`}
                >
                  <span className="font-bold block text-gray-800">
                    Extract All Pages
                  </span>
                  <span className="text-sm text-gray-500">
                    Save every page as a separate PDF.
                  </span>
                </button>

                <button
                  onClick={() => setSplitMode("range")}
                  className={`p-4 border rounded-xl text-left transition-all ${
                    splitMode === "range"
                      ? "border-red-500 bg-red-50 ring-1 ring-red-500"
                      : "hover:border-gray-300"
                  }`}
                >
                  <span className="font-bold block text-gray-800">
                    Select Range
                  </span>
                  <span className="text-sm text-gray-500">
                    Extract specific pages (e.g. 1-5).
                  </span>
                </button>
              </div>

              {/* Range Input */}
              {splitMode === "range" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Numbers
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1-5, 8, 11-13"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      Enter page numbers or ranges separated by commas.
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleSplit}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Split PDF
              </button>
            </div>
          )}
        </div>

        {/* === RIGHT COLUMN: Ad Sidebar (Span 1) === */}
        <div className="hidden lg:block space-y-6">
          {/* Sticky Ad Container */}
          <div className="sticky top-24 space-y-6">
            {/* Ad Block 1: Square (Good for tools) */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <span className="text-[10px] uppercase text-gray-400 font-bold mb-2 block">
                Advertisement
              </span>
              <div className="w-full aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                300x250 Ad Slot
              </div>
            </div>

            {/* Ad Block 2: Skyscraper (High CPM) */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <span className="text-[10px] uppercase text-gray-400 font-bold mb-2 block">
                Sponsored
              </span>
              <div className="w-full h-[600px] bg-gray-100 rounded border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm writing-vertical">
                160x600 or 300x600 Wide Skyscraper
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
