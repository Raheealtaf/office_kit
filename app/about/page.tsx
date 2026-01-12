"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Heart, Sparkles, Lock } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Processing", value: "100% Client-Side" },
    { label: "File Storage", value: "Zero (No Uploads)" },
    { label: "Accessibility", value: "Always Free" },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6"
          >
            <Sparkles className="w-4 h-4" /> Our Mission
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Redefining Document <span className="text-blue-500">Freedom.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            OfficeKit was built on a simple premise: professional PDF tools
            should be fast, free, and above all—completely private.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 border-x border-white/5 first:border-l-0 last:border-r-0"
              >
                <p className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Why we started OfficeKit
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Most online PDF tools require you to upload your sensitive
                documents to their servers. This creates a massive privacy risk
                for businesses and individuals alike.
              </p>
              <p>
                <strong className="text-blue-400">
                  OfficeKit is different.
                </strong>{" "}
                We utilize modern WebAssembly and JavaScript technologies to
                process your files directly in your browser.
              </p>
              <p>
                Your data never leaves your computer. We don't see your files,
                we don't store them, and we certainly don't sell your
                information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-800/40 rounded-3xl border border-white/5 flex flex-col items-center text-center">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mb-3" />
              <h3 className="text-white font-bold text-sm">Safe</h3>
            </div>
            <div className="p-6 bg-slate-800/40 rounded-3xl border border-white/5 flex flex-col items-center text-center">
              <Zap className="w-8 h-8 text-yellow-500 mb-3" />
              <h3 className="text-white font-bold text-sm">Fast</h3>
            </div>
            <div className="p-6 bg-slate-800/40 rounded-3xl border border-white/5 flex flex-col items-center text-center">
              <Globe className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-white font-bold text-sm">Global</h3>
            </div>
            <div className="p-6 bg-slate-800/40 rounded-3xl border border-white/5 flex flex-col items-center text-center">
              <Lock className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="text-white font-bold text-sm">Private</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-blue-600/5 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Our Core Values
          </h2>
          <div className="space-y-12 text-left">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  User First
                </h4>
                <p className="text-slate-400">
                  We build tools that we would use ourselves. No annoying
                  pop-ups, no hidden fees, and no data tracking.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Privacy by Design
                </h4>
                <p className="text-slate-400">
                  Security isn't a feature; it's the foundation. Everything we
                  build starts with the question "How do we make this
                  zero-knowledge?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          Ready to get started?
        </h2>
        <a
          href="/"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20"
        >
          Go to Dashboard
        </a>
      </section>
    </div>
  );
}
