"use client";

import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  FileUp,
  Sun,
  Download,
  Trash2,
  Wand2,
  Contrast,
  Crop as CropIcon,
} from "lucide-react";

export default function DocumentScannerClient() {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [brightness, setBrightness] = useState(110);
  const [isBlackWhite, setIsBlackWhite] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Reset crop
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // Initialize crop when image loads
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 1 / 1.4, width, height),
      width,
      height
    );
    setCrop(initialCrop);
  }

  const downloadCrop = () => {
    const image = imgRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas || !completedCrop) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    ctx.imageSmoothingQuality = "high";

    // Apply filters
    let filterString = `brightness(${brightness}%) contrast(120%)`;
    if (isBlackWhite) filterString += ` grayscale(100%)`;
    ctx.filter = filterString;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );

    const link = document.createElement("a");
    link.download = "scanned-doc.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col items-center">
      {/* AD SLOT: TOP */}
      <div className="w-full bg-slate-900 border-b border-white/5 py-4 flex justify-center">
        <div className="w-full max-w-[728px] h-20 bg-slate-800/40 border border-dashed border-slate-700 flex items-center justify-center text-[10px] text-slate-500">
          ADVERTISEMENT: LEADERBOARD
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8 p-6 lg:p-10">
        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/10 shadow-2xl">
            <h1 className="text-xl font-black mb-6 flex items-center gap-2 italic">
              <Wand2 className="text-blue-500" /> SCANNER
            </h1>

            {!imgSrc ? (
              <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-700 rounded-3xl cursor-pointer hover:border-blue-500 transition-all">
                <FileUp className="mb-2 text-slate-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Upload Photo
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={onSelectFile}
                />
              </label>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                      <Sun size={12} /> Brightness
                    </label>
                    <span className="text-[10px] text-blue-500 font-bold">
                      {brightness}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="250"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <button
                  onClick={() => setIsBlackWhite(!isBlackWhite)}
                  className={`w-full py-3 rounded-xl font-bold text-[10px] uppercase border transition-all ${
                    isBlackWhite
                      ? "bg-white text-black"
                      : "bg-slate-800 text-white border-white/10"
                  }`}
                >
                  <Contrast size={14} className="inline mr-2" />
                  Mode: {isBlackWhite ? "B&W Scan" : "Full Color"}
                </button>

                <button
                  onClick={downloadCrop}
                  className="w-full py-4 bg-emerald-600 rounded-2xl font-black text-white shadow-lg hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 uppercase text-xs"
                >
                  <Download size={18} /> Download Crop
                </button>

                <button
                  onClick={() => setImgSrc("")}
                  className="w-full text-[10px] font-bold text-slate-500 hover:text-red-400 flex items-center justify-center gap-1 uppercase"
                >
                  <Trash2 size={12} /> Reset
                </button>
              </div>
            )}
          </div>

          <div className="hidden lg:block h-64 bg-slate-900/50 rounded-3xl border border-white/5 flex items-center justify-center text-[10px] text-slate-700">
            SIDE AD
          </div>
        </div>

        {/* EDITOR AREA */}
        <div className="lg:col-span-3 flex flex-col items-center">
          {imgSrc ? (
            <div className="w-full bg-slate-900/40 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
              <p className="text-[10px] font-bold text-blue-500 uppercase mb-4 tracking-[0.2em]">
                Drag the corners to crop your document
              </p>

              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                className="max-h-[70vh] shadow-2xl"
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{
                    filter: `brightness(${brightness}%) contrast(115%) ${
                      isBlackWhite ? "grayscale(100%)" : ""
                    }`,
                    maxHeight: "70vh",
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>

              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            <div className="w-full h-[500px] flex flex-col items-center justify-center bg-slate-900/20 rounded-[3rem] border border-white/5 text-slate-700 italic">
              <CropIcon size={48} className="mb-4 opacity-5" />
              <p className="text-sm font-bold uppercase tracking-widest">
                No Document Selected
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE STICKY AD */}
      <div className="lg:hidden fixed bottom-0 w-full h-14 bg-slate-900 border-t border-white/10 flex items-center justify-center z-50">
        <span className="text-[10px] text-slate-600 font-bold uppercase">
          Mobile Banner
        </span>
      </div>
    </div>
  );
}
