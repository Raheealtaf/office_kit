"use client";

import React, { useState, useRef } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import SignatureCanvas from "react-signature-canvas";
import { motion } from "framer-motion";
import {
  FileUp,
  Download,
  Pencil,
  Trash2,
  Check,
  Type,
  Plus,
  X,
  Calendar,
} from "lucide-react";

export default function PdfSignerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Position states - Stored as Local Coordinates
  const [sigPos, setSigPos] = useState({ x: 20, y: 20 });
  const [textElements, setTextElements] = useState<
    { id: number; text: string; x: number; y: number }[]
  >([]);
  const [inputText, setInputText] = useState("");

  const sigCanvas = useRef<SignatureCanvas>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPdfUrl(URL.createObjectURL(selectedFile));
    }
  };

  const addTodayDate = () => {
    const date = new Date().toLocaleDateString();
    setTextElements([
      ...textElements,
      { id: Date.now(), text: date, x: 50, y: 150 },
    ]);
  };

  const handleExport = async () => {
    if (!file || !containerRef.current) return;
    setIsProcessing(true);
    try {
      const existingPdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const page = pdfDoc.getPages()[0];
      const { width: pWidth, height: pHeight } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const rect = containerRef.current.getBoundingClientRect();

      const multiplierX = pWidth / rect.width;
      const multiplierY = pHeight / rect.height;

      if (signatureImage) {
        const sigImage = await pdfDoc.embedPng(signatureImage);
        const sWidth = 150 * multiplierX;
        const sHeight = 60 * multiplierY;
        page.drawImage(sigImage, {
          x: sigPos.x * multiplierX,
          y: pHeight - sigPos.y * multiplierY - sHeight,
          width: sWidth,
          height: sHeight,
        });
      }

      textElements.forEach((el) => {
        page.drawText(el.text, {
          x: el.x * multiplierX,
          y: pHeight - el.y * multiplierY - 14 * multiplierY,
          size: 14 * multiplierY,
          font: font,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([pdfBytes]));
      link.download = `Signed_Document.pdf`;
      link.click();
    } catch (err) {
      alert("Error generating PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 flex flex-col items-center">
      {/* AD SLOT 1: TOP LEADERBOARD */}
      <div className="w-full bg-slate-900 border-b border-white/5 py-4 flex justify-center">
        <div className="w-full max-w-[728px] h-[90px] bg-slate-800 border border-dashed border-slate-700 flex items-center justify-center text-[10px] text-slate-500 uppercase">
          Advertisement: Leaderboard (728x90)
        </div>
      </div>

      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row p-6 gap-8">
        {/* LEFT TOOLBAR */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="bg-slate-900 p-6 rounded-[2rem] border border-white/10 shadow-2xl">
            <h2 className="text-xl font-black text-white mb-6 tracking-tighter uppercase italic">
              Office<span className="text-blue-500">Kit</span>
            </h2>

            {!file ? (
              <label className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-slate-700 rounded-3xl cursor-pointer hover:border-blue-500 transition-all">
                <FileUp className="w-8 h-8 mb-2 text-slate-500" />
                <span className="text-xs font-bold uppercase">Upload PDF</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setIsSignModalOpen(true)}
                  className="w-full py-3 bg-blue-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-500 transition-all"
                >
                  <Pencil size={16} />{" "}
                  {signatureImage ? "Change Sign" : "Add Signature"}
                </button>

                <button
                  onClick={addTodayDate}
                  className="w-full py-3 bg-slate-800 border border-white/10 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
                >
                  <Calendar size={16} /> Add Today's Date
                </button>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type Name..."
                    className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-3 text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (inputText)
                        setTextElements([
                          ...textElements,
                          { id: Date.now(), text: inputText, x: 50, y: 100 },
                        ]);
                      setInputText("");
                    }}
                    className="p-2 bg-blue-600 rounded-lg"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={handleExport}
                  disabled={isProcessing}
                  className="w-full py-4 bg-emerald-600 rounded-2xl font-black text-white mt-4 shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 transition-all uppercase tracking-widest text-xs"
                >
                  {isProcessing ? "Processing..." : "Download PDF"}
                </button>
              </div>
            )}
          </div>

          {/* AD SLOT 2: SIDEBAR VERTICAL */}
          <div className="hidden lg:flex w-full h-[400px] bg-slate-900/50 rounded-[2rem] border border-white/5 items-center justify-center text-[10px] text-slate-600 uppercase tracking-widest">
            Vertical Ad
          </div>
        </div>

        {/* PREVIEW CONTAINER */}
        <div className="flex-1 flex justify-center relative">
          {pdfUrl ? (
            <div
              ref={containerRef}
              className="relative bg-white shadow-2xl overflow-hidden border-8 border-slate-900"
              style={{ width: "100%", maxWidth: "600px", height: "840px" }}
            >
              {/* SHIELD: Blocks Iframe from capturing mouse */}
              <div className="absolute inset-0 z-10 bg-transparent pointer-events-none" />

              {/* SIGNATURE */}
              {signatureImage && (
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  dragConstraints={containerRef}
                  onDragEnd={(e, info) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (rect)
                      setSigPos({
                        x: info.point.x - rect.left,
                        y: info.point.y - rect.top,
                      });
                  }}
                  className="absolute z-50 cursor-grab active:cursor-grabbing p-1 group"
                  style={{ top: sigPos.y, left: sigPos.x, width: "150px" }}
                >
                  <img
                    src={signatureImage}
                    className="w-full pointer-events-none select-none"
                    alt="sign"
                  />
                  <div className="absolute -top-5 left-0 bg-blue-600 text-[8px] px-1 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold">
                    Signature
                  </div>
                  <X
                    size={12}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100"
                    onClick={() => setSignatureImage(null)}
                  />
                </motion.div>
              )}

              {/* TEXT ELEMENTS */}
              {textElements.map((el) => (
                <motion.div
                  key={el.id}
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  dragConstraints={containerRef}
                  onDragEnd={(e, info) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (rect)
                      setTextElements(
                        textElements.map((t) =>
                          t.id === el.id
                            ? {
                                ...t,
                                x: info.point.x - rect.left,
                                y: info.point.y - rect.top,
                              }
                            : t
                        )
                      );
                  }}
                  className="absolute z-50 cursor-move text-black font-medium border border-blue-400 bg-blue-100/40 px-2 py-1 group"
                  style={{
                    top: el.y,
                    left: el.x,
                    fontSize: "14px",
                    touchAction: "none",
                  }}
                >
                  {el.text}
                  <X
                    size={10}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100"
                    onClick={() =>
                      setTextElements(
                        textElements.filter((t) => t.id !== el.id)
                      )
                    }
                  />
                </motion.div>
              ))}

              <iframe
                src={pdfUrl + "#toolbar=0"}
                className="w-full h-full border-none pointer-events-none"
              />
            </div>
          ) : (
            <div className="w-full h-[600px] bg-slate-900/20 border border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-slate-600 italic">
              <Calendar className="w-12 h-12 mb-4 opacity-10" />
              <p className="uppercase tracking-widest text-xs font-bold">
                Waiting for PDF upload...
              </p>
            </div>
          )}
        </div>

        {/* AD SLOT 3: RIGHT RECTANGLE (Desktop Only) */}
        <div className="hidden xl:flex w-80 flex-col gap-4">
          <div className="w-full h-[250px] bg-slate-900/50 rounded-2xl border border-white/5 flex items-center justify-center text-[10px] text-slate-600 uppercase">
            Rectangle Ad
          </div>
          <div className="w-full h-[250px] bg-slate-900/50 rounded-2xl border border-white/5 flex items-center justify-center text-[10px] text-slate-600 uppercase">
            Rectangle Ad
          </div>
        </div>
      </div>

      {/* AD SLOT 4: MOBILE STICKY FOOTER */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-slate-900 border-t border-white/10 z-[100] flex items-center justify-center">
        <div className="text-[10px] text-slate-600 uppercase font-black tracking-widest">
          Mobile Footer Ad
        </div>
      </div>

      {/* MODAL */}
      {isSignModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/10 w-full max-w-xl shadow-3xl">
            <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-widest">
              Draw your Signature
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden mb-8 border-4 border-slate-700">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  width: 600,
                  height: 250,
                  className: "w-full h-64 cursor-crosshair",
                }}
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => sigCanvas.current?.clear()}
                className="flex-1 py-4 bg-slate-800 rounded-xl font-bold text-sm uppercase"
              >
                Clear Canvas
              </button>
              <button
                onClick={() => {
                  if (sigCanvas.current) {
                    setSignatureImage(
                      sigCanvas.current
                        .getTrimmedCanvas()
                        .toDataURL("image/png")
                    );
                    setIsSignModalOpen(false);
                  }
                }}
                className="flex-1 py-4 bg-blue-600 rounded-xl font-bold text-sm uppercase"
              >
                Save & Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
