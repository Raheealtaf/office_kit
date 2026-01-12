"use client";

import React, { useState, useRef } from "react";
import Script from "next/script"; // IMPORT THIS
import { Upload, FileText, X, Presentation, CheckCircle2 } from "lucide-react";
import pptxgen from "pptxgenjs";

// Tell TypeScript that pdfjsLib exists on the window (since we load it via CDN)
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function PdfToPowerpoint() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLibLoaded, setIsLibLoaded] = useState(false); // Track if library is ready
  const [fileName, setFileName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileName(selectedFile.name.replace(".pdf", ""));
      setProgress(0);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const convertToPPT = async () => {
    if (!file) return;
    if (!isLibLoaded) {
      alert(
        "PDF Library is still loading. Please wait 2 seconds and try again."
      );
      return;
    }

    try {
      setIsConverting(true);
      setProgress(5);

      // 1. Setup the Worker (Using the Global Window Object)
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

      // 2. Read the PDF
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      // 3. Setup PowerPoint
      const pptx = new pptxgen();

      // 4. Loop Pages
      for (let i = 1; i <= totalPages; i++) {
        setProgress(Math.round((i / totalPages) * 90));

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 }); // High res scale

        // Create Canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;

          // Get Image Data
          const imgData = canvas.toDataURL("image/jpeg", 0.8);

          // Add to Slide
          const slide = pptx.addSlide();
          slide.addImage({
            data: imgData,
            x: 0,
            y: 0,
            w: "100%",
            h: "100%",
            sizing: { type: "contain", align: "center" },
          });
        }
      }

      setProgress(100);

      // 5. Download
      await pptx.writeFile({ fileName: `${fileName}_converted.pptx` });

      setIsConverting(false);
    } catch (error) {
      console.error("Conversion Failed:", error);
      alert(
        "Error converting file. It might be password protected or too complex."
      );
      setIsConverting(false);
    }
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* --- THE FIX: Load Library from CDN --- */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("PDF Library Loaded");
          setIsLibLoaded(true);
        }}
      />

      {/* AD SLOT: TOP BANNER */}
      <div className="w-full bg-white border-b border-slate-200 py-4 flex justify-center">
        <div className="w-[728px] h-[90px] bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Google AdSense Leaderboard
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN TOOL */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-orange-600 p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-extrabold mb-2 flex items-center gap-3">
                  <Presentation className="w-8 h-8 text-white/90" /> PDF to
                  PowerPoint
                </h1>
                <p className="text-orange-100">
                  Convert documents to presentation slides.
                </p>
              </div>
              <Presentation className="absolute -right-6 -bottom-6 w-32 h-32 text-orange-500/30 rotate-12" />
            </div>

            <div className="p-8">
              {!file ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-2xl h-80 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all group"
                >
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-10 h-10 text-orange-600 flex items-center justify-center">
                      <Upload size={40} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-700">
                    Drop PDF here
                  </h3>
                  <p className="text-slate-400 mt-2">or click to browse</p>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-xl mb-8">
                    <FileText className="w-6 h-6 text-red-500" />
                    <span className="font-bold text-slate-700">
                      {fileName}.pdf
                    </span>
                    <button
                      onClick={reset}
                      className="ml-2 hover:bg-slate-200 p-1 rounded-full"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>

                  {!isConverting && progress === 0 && (
                    <button
                      onClick={convertToPPT}
                      className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg py-4 px-12 rounded-full shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2"
                    >
                      Convert to PowerPoint
                    </button>
                  )}

                  {isConverting && (
                    <div className="max-w-md mx-auto">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                        <span>Processing Pages...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-slate-400 mt-4 animate-pulse">
                        Creating slides...
                      </p>
                    </div>
                  )}

                  {progress === 100 && !isConverting && (
                    <div className="bg-green-50 border border-green-100 p-6 rounded-2xl inline-block w-full max-w-md">
                      <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        Conversion Complete!
                      </h3>
                      <button
                        onClick={convertToPPT}
                        className="text-orange-600 font-bold hover:underline text-sm"
                      >
                        Download again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
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
