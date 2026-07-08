"use client";

import { useState } from "react";
import Papa, { ParseResult } from "papaparse";
import StatsCards from "../result/StatsCards";

import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import Dropzone from "./Dropzone";
import PreviewTable from "../preview/PreviewTable";
import ResultTable from "../result/ResultTable";

import { toast } from "sonner";
import { exportCRMCSV } from "@/utils/csvExport";
import { Download } from "lucide-react";

import type { ImportResult } from "@/types/crm";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck2 } from "lucide-react";

import { Loader2 } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import AIProcessingOverlay from "@/components/ui/AIProcessingOverlay";

export default function UploadCard() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<Record<string, string>[]>([]);
    const [loading, setLoading] = useState(false);


    const [result, setResult] = useState<ImportResult | null>(null);

    const handleFile = (selectedFile: File) => {
        setFile(selectedFile);

        Papa.parse(selectedFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results: ParseResult<Record<string, string>>) => {
                setPreview(results.data);
            },
        });
    };

    const handleImport = async () => {
        if (!file) return;

        try {
            setLoading(true);
            toast.loading("Processing CSV with Gemini AI...", {
                id: "upload",
            });

            const formData = new FormData();
            formData.append("file", file);

            const { data } = await api.post("/import", formData);

            console.log(data);

            setResult(data);
            toast.success("AI processing completed!", {
                id: "upload",
            });



        } catch (error) {
            console.error(error);

            toast.error("Import failed", {
                id: "upload",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPreview([]);
        setResult(null);
    };

    <AIProcessingOverlay open={loading} />

    return (
        
        <Card className="relative mx-auto mt-16 max-w-6xl overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-900/55 p-8 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] transition-all duration-500">
            {!file ? (
                <Dropzone onFileSelect={handleFile} />
            ) : (
                <>
                    {/* File Info */}
                    <div className="mb-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-slate-900 to-slate-800 p-6 shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-green-400">
                                    <FileCheck2 className="mr-3 h-7 w-7 text-emerald-400" />
                                    {file.name}
                                </h2>

                                <p className="mt-2 text-slate-400">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleReset}
                                className="border-slate-600 bg-transparent text-white hover:bg-slate-700"
                            >
                                Change File
                            </Button>
                        </div>
                    </div>

                    {/* CSV Preview */}
                    <PreviewTable data={preview} />

                    {/* Buttons */}
                    <div className="mt-8 flex justify-end gap-4">
                        <Button
                            variant="outline"
                            onClick={handleReset}
                            disabled={loading}
                            className="border-slate-600 bg-transparent text-white hover:bg-slate-700"
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleImport}
                            disabled={loading}
                            className="bg-cyan-500 text-black transition-all duration-300 hover:scale-[1.03] hover:bg-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] active:scale-95"
                        >
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        </Button>
                    </div>

                   {/* Import Summary */}
<AnimatePresence>
  {result && (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StatsCards
        imported={result.totalImported}
        skipped={result.totalSkipped}
      />

      <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-8 w-8 text-green-400" />

          <h3 className="text-2xl font-bold text-green-400">
            AI Import Completed Successfully
          </h3>
        </div>

        <p className="mt-2 text-slate-300">
          Gemini AI has successfully extracted and mapped your CRM records.
        </p>

        {result.records && (
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-xl font-semibold text-white">
                CRM Records
              </h4>

              <Button
                onClick={() => exportCRMCSV(result.records)}
                className="bg-green-500 text-black hover:bg-green-400"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CRM CSV
              </Button>
            </div>

            <ResultTable records={result.records} />
          </div>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>
        </>
      )}
    </Card>
  );
}