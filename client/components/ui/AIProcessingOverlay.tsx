"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Loader2,
  CheckCircle2,
} from "lucide-react";

type Props = {
  open: boolean;
};

const steps = [
  "Reading CSV",
  "Detecting Columns",
  "Understanding Column Mapping",
  "Gemini AI Processing",
  "Generating CRM Records",
];

export default function AIProcessingOverlay({ open }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!open) {
      setActiveStep(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            className="w-[92%] max-w-xl rounded-3xl border border-cyan-500/20 bg-slate-900/95 p-8 shadow-[0_25px_80px_rgba(6,182,212,.25)]"
          >
            <div className="flex flex-col items-center">

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "linear",
                }}
                className="mb-5 rounded-full bg-cyan-500/10 p-5"
              >
                <Brain className="h-10 w-10 text-cyan-400" />
              </motion.div>

              <h2 className="text-3xl font-bold text-white">
                Gemini AI
              </h2>

              <p className="mt-2 text-slate-400 text-center">
                Please wait while AI analyzes your CSV.
              </p>

              <div className="mt-10 w-full space-y-4">

                {steps.map((step, index) => (
                  <motion.div
                    key={step}
                    layout
                    className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-4"
                  >
                    <span className="text-white">
                      {step}
                    </span>

                    {index < activeStep ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : index === activeStep ? (
                      <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border border-slate-600" />
                    )}
                  </motion.div>
                ))}

              </div>

              <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-cyan-400"
                  animate={{
                    width: `${(activeStep / steps.length) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-4 text-sm text-slate-500">
                AI is intelligently extracting CRM information...
              </p>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}