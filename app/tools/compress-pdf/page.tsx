"use client";

import React, { useState, useRef } from "react";
import Script from "next/script";
import {
  Upload,
  FileText,
  Download,
  X,
  Minimize2,
  CheckCircle2,
  Settings2,
  ArrowRight,
} from "lucide-react";
import { jsPDF } from "jspdf";

// Declare global for the CDN loaded library
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLibLoaded, setIsLibLoaded] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(0.5); // 0.1 (Max) to 1.0 (Min)
  const [resultSize, setResultSize] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper: Format Bytes
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setResultSize(null);
      setProgress(0);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const compressPDF = async () => {
    if (!file || !isLibLoaded) return;

    try {
      setIsProcessing(true);
      setProgress(5);

      // 1. Setup Worker
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

      // 2. Load PDF
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      // 3. Initialize New PDF
      // Orientation 'p' (portrait), unit 'mm', format 'a4'
      const newPdf = new jsPDF("p", "mm", "a4");
      const width = newPdf.internal.pageSize.getWidth();
      const height = newPdf.internal.pageSize.getHeight();

      // 4. Loop Pages
      for (let i = 1; i <= totalPages; i++) {
        setProgress(Math.round((i / totalPages) * 90));

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 }); // Scale 1.5 is a good balance for web

        // Create Canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;

          // --- THE MAGIC: Compress via JPEG Quality ---
          // compressionLevel: 0.1 (High Compression) -> 1.0 (No Compression)
          const imgData = canvas.toDataURL("image/jpeg", compressionLevel);

          // Add Image to PDF (Fit to A4)
          if (i > 1) newPdf.addPage();
          newPdf.addImage(imgData, "JPEG", 0, 0, width, height);
        }
      }

      setProgress(100);

      // 5. Generate Output
      const pdfBlob = newPdf.output("blob");
      setResultSize(formatBytes(pdfBlob.size));
      newPdf.save(`${file.name.replace(".pdf", "")}_compressed.pdf`);

      setIsProcessing(false);
    } catch (error) {
      console.error("Compression Failed:", error);
      alert("An error occurred. The PDF might be password protected.");
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    setResultSize(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* CDN SCRIPT (Crucial for Client Side) */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        strategy="afterInteractive"
        onLoad={() => setIsLibLoaded(true)}
      />

      {/* AD: TOP LEADERBOARD */}
      <div className="w-full bg-white border-b border-slate-200 py-4 flex justify-center">
        <div className="w-[728px] h-[90px] bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Google AdSense Leaderboard
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN TOOL */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-rose-600 p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-extrabold mb-2 flex items-center gap-3">
                  <Minimize2 className="w-8 h-8 text-white/90" /> Compress PDF
                </h1>
                <p className="text-rose-100">
                  Reduce file size while maintaining quality.
                </p>
              </div>
              <Minimize2 className="absolute -right-6 -bottom-6 w-32 h-32 text-rose-500/30 rotate-12" />
            </div>

            <div className="p-8">
              {!file ? (
                // UPLOAD
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-2xl h-80 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50 hover:border-rose-300 transition-all group"
                >
                  <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700">
                    Drop PDF here
                  </h3>
                  <p className="text-slate-400 mt-2">or click to browse</p>
                </div>
              ) : (
                // SETTINGS & PROCESS
                <div className="text-center py-6">
                  <div className="inline-flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-xl mb-8">
                    <FileText className="w-6 h-6 text-rose-500" />
                    <div className="text-left">
                      <span className="block font-bold text-slate-700 text-sm">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        Original: {formatBytes(file.size)}
                      </span>
                    </div>
                    <button
                      onClick={reset}
                      className="ml-4 hover:bg-slate-200 p-1 rounded-full"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>

                  {!isProcessing && !resultSize && (
                    <div className="max-w-md mx-auto mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-rose-600 font-bold">
                          <Settings2 className="w-4 h-4" /> Compression Level
                        </div>
                        <span className="text-xs font-bold bg-white px-2 py-1 rounded border">
                          {compressionLevel < 0.4
                            ? "Extreme"
                            : compressionLevel < 0.7
                            ? "Recommended"
                            : "Low"}
                        </span>
                      </div>

                      <input
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.1"
                        value={compressionLevel}
                        onChange={(e) =>
                          setCompressionLevel(parseFloat(e.target.value))
                        }
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                        <span>Smallest Size</span>
                        <span>Best Quality</span>
                      </div>
                    </div>
                  )}

                  {!isProcessing && !resultSize && (
                    <button
                      onClick={compressPDF}
                      className="w-full md:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg py-4 px-12 rounded-full shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2 mx-auto"
                    >
                      Compress PDF Now
                    </button>
                  )}

                  {isProcessing && (
                    <div className="max-w-md mx-auto">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                        <span>Compressing...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-slate-400 mt-4 animate-pulse">
                        Analyzing and optimizing pages...
                      </p>
                    </div>
                  )}

                  {resultSize && (
                    <div className="bg-green-50 border border-green-100 p-6 rounded-2xl inline-block w-full max-w-md animate-in fade-in zoom-in duration-300">
                      <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        Compression Successful!
                      </h3>

                      <div className="flex items-center justify-center gap-4 text-sm mb-6">
                        <span className="text-slate-400 line-through">
                          {formatBytes(file.size)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-300" />
                        <span className="text-green-600 font-bold text-lg">
                          {resultSize}
                        </span>
                      </div>

                      <button
                        onClick={compressPDF}
                        className="text-rose-600 font-bold hover:underline text-sm"
                      >
                        Download Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SEO / Content */}
          <div className="prose prose-slate max-w-none">
            <h3>Why use our Free PDF Compressor?</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>100% Free & Unlimited:</strong> No hidden costs or daily
                limits.
              </li>
              <li>
                <strong>Browser-Based:</strong> Your files are compressed on
                your device, ensuring maximum privacy.
              </li>
              <li>
                <strong>Adjustable Quality:</strong> You decide the balance
                between file size and image clarity.
              </li>
            </ul>
          </div>
        </div>

        {/* SIDEBAR AD */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24">
            <div className="w-full min-h-[600px] bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-4 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Advertisement
              </span>
              <p className="text-xs text-slate-400">
                Vertical Ad Unit (300x600)
              </p>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        className="hidden"
      />
    </div>
  );
}
