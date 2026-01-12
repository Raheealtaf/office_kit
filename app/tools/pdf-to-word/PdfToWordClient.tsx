"use client";

import React, { useState, useEffect } from "react";
// FIX: Use the standard import, NOT legacy. This removes the 'canvas' dependency.
import * as pdfjsLib from "pdfjs-dist"; // <--- MODERN VERSION
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowRight,
  FileDown,
  Loader2,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";

export default function PdfToWordClient() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);

  // Initialize Worker safely on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      // We use the UNPKG CDN to fetch the exact worker version needed
      // This prevents version mismatch errors
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
    }
  }, []);

  const handleConversion = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);
    setProgress(5);

    try {
      const arrayBuffer = await file.arrayBuffer();

      // Load PDF
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      const docChildren: Paragraph[] = [];
      const totalPages = pdf.numPages;

      // Extract text from each page
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");

        if (pageText.trim().length > 0) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: pageText,
                  size: 24, // 12pt in Word
                }),
              ],
              spacing: { after: 200 },
            })
          );
        }

        // Update progress bar
        setProgress(Math.round((i / totalPages) * 100));
      }

      // Generate .docx
      const doc = new Document({
        sections: [{ properties: {}, children: docChildren }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, file.name.replace(/\.[^/.]+$/, "") + "_converted.docx");
    } catch (error) {
      console.error("Conversion Error:", error);
      alert(
        "Could not convert this file. It might be password protected or scanned."
      );
    } finally {
      setIsProcessing(false);
      setProgress(0);
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 flex flex-col font-sans">
      {/* --- AD SLOT 1: TOP BANNER (Responsive Leaderboard) --- */}
      {/* This gray box is where your AdSense code goes. Replace the inner div with your <ins> tag */}
      <div className="w-full bg-slate-900 border-b border-white/5 py-4 flex justify-center items-center">
        <div className="w-[320px] h-[50px] md:w-[728px] md:h-[90px] bg-slate-800/50 border border-dashed border-slate-700 rounded flex items-center justify-center text-[10px] text-slate-500 uppercase tracking-widest">
          Ad Space (Top Banner)
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* --- AD SLOT 2: LEFT SKYSCRAPER (Desktop Only) --- */}
        <aside className="hidden xl:flex w-64 p-6 border-r border-white/5 bg-slate-900/20 flex-col items-center">
          <div className="w-[160px] h-[600px] bg-slate-800/50 border border-dashed border-slate-700 rounded flex items-center justify-center text-[10px] text-slate-500 [writing-mode:vertical-rl] uppercase tracking-widest">
            Ad Space (Vertical)
          </div>
        </aside>

        {/* --- MAIN TOOL CONTENT --- */}
        <main className="flex-1 p-6 md:p-12 flex flex-col items-center">
          <div className="max-w-3xl w-full text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              PDF to <span className="text-blue-500">Word</span>
            </h1>
            <p className="text-lg text-slate-400">
              Transform your PDFs into editable documents instantly.
            </p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-xl bg-slate-900/50 border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-sm"
          >
            {/* Glow Effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />

            {!isProcessing ? (
              <label className="relative z-10 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-3xl cursor-pointer hover:bg-slate-800/50 hover:border-blue-500/50 transition-all group">
                <div className="flex items-center gap-6 mb-6 group-hover:scale-105 transition-transform">
                  <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                    <FileText className="w-8 h-8 text-red-500" />
                  </div>
                  <ArrowRight className="text-slate-600 w-5 h-5" />
                  <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    <FileDown className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">Upload PDF</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Click to browse files
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleConversion}
                />
              </label>
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center h-64 text-center">
                <div className="relative mb-6">
                  <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {progress}%
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Converting...
                </h3>
                <p className="text-sm text-slate-500 max-w-[200px] truncate">
                  {fileName}
                </p>
              </div>
            )}
          </motion.div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl">
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/5">
              <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
              <span className="text-white font-bold text-sm">100% Secure</span>
              <span className="text-slate-500 text-xs">
                Files stay on your device
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/5">
              <Zap className="w-6 h-6 text-yellow-500 mb-2" />
              <span className="text-white font-bold text-sm">Instant</span>
              <span className="text-slate-500 text-xs">No server queues</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/5">
              <Sparkles className="w-6 h-6 text-purple-500 mb-2" />
              <span className="text-white font-bold text-sm">Always Free</span>
              <span className="text-slate-500 text-xs">
                Unlimited conversions
              </span>
            </div>
          </div>
        </main>

        {/* --- AD SLOT 3: RIGHT RECTANGLE (Desktop Only) --- */}
        <aside className="hidden lg:flex w-80 p-6 border-l border-white/5 bg-slate-900/10 flex-col gap-6">
          <div className="w-full h-[250px] bg-slate-800/50 border border-dashed border-slate-700 rounded flex items-center justify-center text-[10px] text-slate-500 uppercase tracking-widest">
            Ad Space (Rect)
          </div>
          <div className="w-full h-[250px] bg-slate-800/50 border border-dashed border-slate-700 rounded flex items-center justify-center text-[10px] text-slate-500 uppercase tracking-widest">
            Ad Space (Rect)
          </div>
        </aside>
      </div>

      {/* --- AD SLOT 4: MOBILE STICKY FOOTER --- */}
      <div className="lg:hidden sticky bottom-0 left-0 right-0 h-[60px] bg-slate-900 border-t border-white/10 z-50 flex items-center justify-center">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest">
          Ad Space (Mobile Sticky)
        </div>
      </div>
    </div>
  );
}
