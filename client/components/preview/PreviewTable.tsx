"use client";

import { motion } from "framer-motion";
import { Table2, Eye } from "lucide-react";

type PreviewTableProps = {
  data: Record<string, string>[];
};

export default function PreviewTable({ data }: PreviewTableProps) {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/10 p-2">
            <Table2 className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">
              CSV Preview
            </h3>

            <p className="text-sm text-slate-400">
              Showing first {Math.min(data.length, 10)} of {data.length} records
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 md:flex">
          <Eye className="h-4 w-4" />
          Preview Mode
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/40 shadow-xl">
        <div className="max-h-[520px] overflow-auto">
          <table className="min-w-full">
            <thead className="sticky top-0 z-10 bg-slate-800/95 backdrop-blur">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="whitespace-nowrap border-b border-slate-700 px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-cyan-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.slice(0, 10).map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                  }}
                  className="border-b border-slate-800 transition-colors duration-200 hover:bg-cyan-500/5"
                >
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="whitespace-nowrap px-5 py-4 text-sm text-slate-300"
                    >
                      {row[header] || (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}