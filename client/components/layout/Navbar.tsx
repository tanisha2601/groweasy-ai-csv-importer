"use client";

import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const scrollToUpload = () => {
    document
      .getElementById("upload-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <motion.header
      initial={{
        y: -70,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
      }}
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/65"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <div className="flex items-center gap-4">

          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.08,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
            }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 shadow-[0_0_35px_rgba(34,211,238,.35)]"
          >
            <UploadCloud className="h-6 w-6 text-black" />
          </motion.div>

          <div>

            <div className="flex items-center gap-2">

              <h1 className="text-xl font-black tracking-tight text-white">
                GrowEasy
              </h1>

              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                AI
              </span>

            </div>

            <p className="text-xs text-slate-400">
              Intelligent CRM CSV Importer
            </p>

          </div>

        </div>

        {/* CTA */}

      
       

      </div>
    </motion.header>
  );
}