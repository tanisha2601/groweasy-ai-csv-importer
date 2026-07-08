"use client";

import { motion } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import UploadCard from "@/components/upload/UploadCard";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[-120px] top-80 h-80 w-80 rounded-full bg-violet-500/10 blur-[150px]" />
        <div className="absolute bottom-[-120px] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px]" />
    </div>

      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <Hero />
        </motion.div>

        <motion.div
          id="upload-section"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          <UploadCard />
        </motion.div>
      </motion.div>
    </main>
  );
}