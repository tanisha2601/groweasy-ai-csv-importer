"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Sparkles,
  FileText,
} from "lucide-react";

type DropzoneProps = {
  onFileSelect: (file: File) => void;
};

export default function Dropzone({ onFileSelect }: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`group relative overflow-hidden rounded-[32px] border-2 border-dashed p-16 text-center cursor-pointer transition-all duration-300
    ${isDragActive
          ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_45px_rgba(6,182,212,0.35)] scale-[1.01]"
          : "border-cyan-500/25 bg-slate-900/40 hover:border-cyan-400/60 hover:bg-slate-900/60 hover:shadow-[0_20px_60px_rgba(6,182,212,0.18)]"
        }`}
    >
      <input {...getInputProps()} />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-[90px]" />
          <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-sky-500/10 blur-[100px]" />
        </div>

        {/* Floating Icon */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10 ring-1 ring-cyan-500/20 backdrop-blur">
            <UploadCloud className="h-12 w-12 text-cyan-400" />
          </div>
        </motion.div>

        {/* Badge */}
        <div className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur">
          <Sparkles className="h-4 w-4" />
          AI Ready CSV Import
        </div>

        {/* Title */}
        <h2 className="relative z-10 mt-8 text-4xl font-bold text-white">
          {isDragActive ? "Drop your CSV here" : "Drag & Drop your CSV"}
        </h2>

        {/* Subtitle */}
        <p className="relative z-10 mt-4 text-slate-400">
          or click anywhere to browse your computer
        </p>

        {/* Bottom Info */}
        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-cyan-400" />
            CSV Only
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <div>Facebook Leads</div>

          <div className="h-4 w-px bg-slate-700" />

          <div>Google Ads</div>

          <div className="h-4 w-px bg-slate-700" />

          <div>Excel Export</div>
        </div>
         </motion.div>
    </div>
  );
}