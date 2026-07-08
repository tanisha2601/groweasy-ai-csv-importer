"use client";

import { motion } from "framer-motion";
import { Sparkles, UploadCloud, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";

export default function Hero() {
  const scrollToUpload = () => {
    document
      .getElementById("upload-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-24">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />

        <div className="absolute right-10 top-32 h-80 w-80 rounded-full bg-sky-500/10 blur-[140px] animate-pulse" />

        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px] animate-pulse" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
        >
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-500 hover:scale-105 hover:border-cyan-300/60 hover:shadow-[0_0_45px_rgba(34,211,238,0.35)]"
          >
            <Sparkles className="h-4 w-4" />

            AI Powered CRM Import
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: .2,
            duration: .7,
          }}
          className="mt-10 bg-gradient-to-b from-white to-slate-300 bg-clip-text text-5xl font-black leading-tight tracking-tight text-transparent md:text-7xl"
        >
          Upload Any CSV
          <br />

          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-500 bg-clip-text text-transparent">
            AI Understands Everything
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: .4,
            duration: .7,
          }}
          className="mt-8 max-w-3xl text-lg leading-8 text-slate-400"
        >
          Upload Facebook Leads, Google Ads exports, Excel sheets,
          Real Estate CRM exports or any custom CSV.

          <br />

          GrowEasy AI automatically maps every column into a clean CRM
          structure within seconds.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: .6,
          }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToUpload}
            className="group bg-cyan-500 px-8 py-6 text-base font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:shadow-[0_0_35px_#06b6d4]"
          >
            <UploadCloud className="mr-2 h-5 w-5" />

            Upload CSV

            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            
            variant="outline"
            onClick={scrollToUpload}
            className="group border-slate-700 bg-slate-900/40 px-8 py-6 text-base text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:bg-slate-800 hover:text-cyan-300"
          >
            Explore Features

            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: .9,
          }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 hover:bg-slate-900/60 hover:shadow-[0_20px_60px_rgba(6,182,212,0.18)]">
            <h3 className="text-3xl font-black text-cyan-400">
              <CountUp
                end={10000}
                duration={2}
                separator=","
              />
              +
            </h3>

            <p className="mt-2 text-slate-400">
              Records Imported
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 hover:bg-slate-900/60 hover:shadow-[0_20px_60px_rgba(6,182,212,0.18)]">
            <h3 className="text-3xl font-black text-cyan-400">
              <CountUp
                end={99}
                duration={2}
              />
              %
            </h3>

            <p className="mt-2 text-slate-400">
              Mapping Accuracy
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 hover:bg-slate-900/60 hover:shadow-[0_20px_60px_rgba(6,182,212,0.18)]">
            <h3 className="text-3xl font-black text-cyan-400">
              &lt;
              <CountUp
                end={5}
                duration={2}
              />
              s
            </h3>

            <p className="mt-2 text-slate-400">
              AI Processing Time
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}