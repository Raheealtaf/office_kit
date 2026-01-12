"use client";

import React from "react"; // Removed useState as Formspree handles state
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
// 1. Import Formspree Tools
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  // ---------------------------------------------------------
  // 2. YOUR FORMSPREE ID IS CONNECTED HERE
  // ---------------------------------------------------------
  const [state, handleSubmit] = useForm("xgooealn");

  // 3. Success Screen (What users see after sending)
  if (state.succeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800/40 backdrop-blur-3xl border border-green-500/30 p-12 rounded-[2.5rem] shadow-2xl text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Message Sent!</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Thanks for reaching out! We have received your message and will
            reply via email shortly.
          </p>
          <Link
            href="/"
            className="inline-block w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Glowing Background Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600/30 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-cyan-400/30 blur-[100px]"
        />
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-slate-800/40 backdrop-blur-3xl border border-slate-700/50 rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden p-6 sm:p-10"
      >
        {/* Card Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-slate-300 text-sm font-medium">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              officekit.io
            </Link>
            <button className="px-3 py-1 bg-slate-700/50 rounded-full border border-slate-600/50 text-xs hover:bg-slate-600/50 transition-colors">
              Contact
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column: Contact Info */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Contact Us
            </h1>
            <p className="text-slate-400 mb-10 text-lg">
              Get in touch with us! Send us a message and we'll get back to you
              as soon as possible.
            </p>

            <div className="space-y-5">
              {/* Email Card */}
              <div className="flex items-center gap-5 p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all group">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Email Us</h3>
                  <p className="text-slate-400 text-sm">support@officekit.io</p>
                </div>
              </div>

              {/* Call Us Card */}
              <div className="flex items-center gap-5 p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all group">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Call Us</h3>
                  <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Our Office Card */}
              <div className="flex items-center gap-5 p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all group">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Our Office</h3>
                  <p className="text-slate-400 text-sm">
                    123 Document City, CA 90210
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit} // Connected to Formspree
              className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 sm:p-8"
            >
              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-slate-400 text-sm font-medium mb-2 ml-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name" // Important for Formspree
                    required
                    placeholder="Your name"
                    className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 placeholder-slate-500 transition-all"
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-slate-400 text-sm font-medium mb-2 ml-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email" // Important for Formspree
                    required
                    placeholder="Your email address"
                    className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 placeholder-slate-500 transition-all"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-slate-400 text-sm font-medium mb-2 ml-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message" // Important for Formspree
                    required
                    placeholder="What can we help you with?"
                    rows={5}
                    className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 placeholder-slate-500 resize-none transition-all"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full mt-8 p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
