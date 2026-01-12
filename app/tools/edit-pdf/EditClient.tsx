"use client";

import React, { useState, useRef } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileUp,
  Loader2,
  Type,
  Sparkles,
  X,
  Settings2,
  Move,
} from "lucide-react";

export default function EditClient() {
  const [file, setFile] = useState<File | null>(null);
  const [newText, setNewText] = useState("Corrected Text");
  const [isProcessing, setIsProcessing] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Export Function... (Keep your existing handleExport logic here)
  const handleExport = async () => {
    if (!file || !containerRef.current) return;
    setIsProcessing(true);
    // ... existing logic ...
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 flex flex-col overflow-x-hidden">
      {/* 1. TOP NAV */}
      <nav className="h-16 border-b border-white/5 bg-slate-900/90 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <span className="font-bold text-white tracking-tight">
            OfficeKit <span className="text-slate-500 font-normal">Edit</span>
          </span>
        </div>

        {file && (
          <button
            onClick={handleExport}
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
          >
            {isProcessing ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Download className="w-3 h-3" />
            )}
            Export PDF
          </button>
        )}
      </nav>

      {/* --- TOP AD BANNER --- */}
      <div className="w-full bg-black/40 border-b border-white/5 py-2 flex justify-center items-center overflow-hidden">
        <div className="w-[728px] h-[90px] bg-slate-800/50 rounded border border-white/10 flex items-center justify-center text-[10px] text-slate-500 uppercase tracking-widest">
          {/* AdSense Code Placeholder */}
          Advertisement Banner
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row relative h-[calc(100vh-170px)] overflow-hidden">
        {/* 2. UPLOAD AREA */}
        {!file ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <motion.label
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md p-10 border-2 border-dashed border-slate-800 rounded-[2rem] bg-slate-900/50 hover:bg-slate-800/50 cursor-pointer group"
            >
              <FileUp className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h2 className="text-white font-bold mb-2">Upload to Edit</h2>
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={(e) =>
                  e.target.files?.[0] && setFile(e.target.files[0])
                }
              />
              <div className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold mt-4">
                Browse Files
              </div>
            </motion.label>
          </div>
        ) : (
          <>
            {/* 3. DESKTOP SIDEBAR + SIDE AD */}
            <aside className="hidden lg:flex w-80 p-6 flex-col gap-6 border-r border-white/5 bg-slate-900/20 overflow-y-auto">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase block mb-3">
                  Fix Content
                </label>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-blue-500 min-h-[100px]"
                />
              </div>

              {/* --- SIDEBAR AD SLOT --- */}
              <div className="w-full h-[250px] bg-slate-800/30 rounded-2xl border border-white/5 flex items-center justify-center text-[10px] text-slate-600 uppercase">
                Square Ad Slot
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase block mb-3">
                  Font Size
                </label>
                <input
                  type="range"
                  min="8"
                  max="60"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </aside>

            {/* 4. MAIN PREVIEW */}
            <main className="flex-1 overflow-auto p-4 md:p-8 flex justify-center bg-black/20 relative">
              {/* Document Preview Area (Existing Logic) */}
              <div
                ref={containerRef}
                className="relative shadow-2xl bg-white rounded-sm self-start"
                style={{ width: "min(100%, 595px)", aspectRatio: "595/842" }}
              >
                <motion.div
                  drag
                  dragMomentum={false}
                  className="absolute z-30 cursor-grab p-1 border-2 border-blue-500 bg-white text-black"
                  style={{
                    top: coords.y,
                    left: coords.x,
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {newText}
                </motion.div>
                <iframe
                  src={URL.createObjectURL(file) + "#toolbar=0"}
                  className="w-full h-full border-none pointer-events-none"
                />
              </div>
            </main>

            {/* --- RIGHT AD SIDEBAR (OPTIONAL) --- */}
            <aside className="hidden xl:flex w-48 p-4 border-l border-white/5 bg-slate-900/10 items-start justify-center">
              <div className="w-full h-[600px] bg-slate-800/20 rounded-xl border border-white/5 flex items-center justify-center text-[10px] text-slate-600 [writing-mode:vertical-rl]">
                Vertical Skyscraper Ad
              </div>
            </aside>
          </>
        )}
      </div>

      {/* --- FOOTER AD (MOBILE) --- */}
      <div className="lg:hidden w-full h-14 bg-slate-900 border-t border-white/10 flex items-center justify-center text-[9px] text-slate-500">
        Mobile Sticky Ad Banner
      </div>
    </div>
  );
}
