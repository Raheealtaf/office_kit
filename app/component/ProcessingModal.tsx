"use client";

import { Loader2, ShieldCheck, Zap, Lock } from "lucide-react";

interface ProcessingModalProps {
  isOpen: boolean;
  progress: number;
}

const ProcessingModal = ({ isOpen, progress }: ProcessingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-300">
        {/* THE MONEY MAKER: Ad Slot inside the Modal */}
        <div className="w-full h-48 bg-slate-50 border border-dashed border-slate-300 rounded-xl mb-6 flex flex-col items-center justify-center overflow-hidden">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">
            Advertisement
          </span>
          <div className="w-full h-full bg-slate-200/50 animate-pulse flex items-center justify-center text-slate-400 text-sm italic">
            Google AdSense Slot
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative flex items-center justify-center mb-4">
          <Loader2 className="w-14 h-14 text-blue-600 animate-spin" />
          <span className="absolute text-[10px] font-bold text-blue-600">
            {progress}%
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {progress < 100 ? "Processing Your File..." : "Ready for Download!"}
        </h3>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden border border-slate-200">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Trust Badges (Makes users feel safe) */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100">
          <div className="flex flex-col items-center gap-1">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="text-[10px] text-slate-500 font-medium">
              Encrypted
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] text-slate-500 font-medium">
              Secure
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-[10px] text-slate-500 font-medium">Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;
