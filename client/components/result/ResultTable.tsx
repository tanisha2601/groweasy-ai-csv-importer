"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";

const getStatusStyle = (status?: string) => {
  switch (status) {
    case "GOOD_LEAD_FOLLOW_UP":
      return "bg-green-500/20 text-green-400 border border-green-500/30";

    case "SALE_DONE":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";

    case "BAD_LEAD":
      return "bg-red-500/20 text-red-400 border border-red-500/30";

    case "DID_NOT_CONNECT":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";

    default:
      return "bg-slate-700 text-slate-300 border border-slate-600";
  }
};

type CRMRecord = {
  name: string;
  email: string;
  mobile_without_country_code: string;
  company: string;
  city: string;
  crm_status: string;
};

type Props = {
  records: CRMRecord[];
};

export default function ResultTable({ records }: Props) {
  const [search, setSearch] = useState("");

  const filteredRecords = useMemo(() => {
    const query = search.toLowerCase();

    return records.filter((record) => {
      return (
        record.name?.toLowerCase().includes(query) ||
        record.email?.toLowerCase().includes(query) ||
        record.company?.toLowerCase().includes(query) ||
        record.city?.toLowerCase().includes(query)
      );
    });
  }, [records, search]);

  if (!records.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-500/10 p-2">
            <Users className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">
              CRM Records
            </h3>

            <p className="text-sm text-slate-400">
              {filteredRecords.length} of {records.length} records
            </p>
          </div>

        </div>

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 md:w-80"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/40 shadow-xl">

        <div className="max-h-[550px] overflow-auto">

          <table className="min-w-full">

            <thead className="sticky top-0 z-10 bg-slate-800/95 backdrop-blur">

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-cyan-300">
                  Name
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-cyan-300">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-cyan-300">
                  Phone
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-cyan-300">
                  Company
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-cyan-300">
                  City
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-cyan-300">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredRecords.map((record, index) => (

                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.25,
                  }}
                  className="border-b border-slate-800 transition-colors duration-200 hover:bg-cyan-500/5"
                >

                  <td className="px-5 py-4 font-medium text-white">
                    {record.name || "-"}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {record.email || "-"}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {record.mobile_without_country_code || "-"}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {record.company || "-"}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {record.city || "-"}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        record.crm_status
                      )}`}
                    >
                      {record.crm_status || "N/A"}
                    </span>

                  </td>

                </motion.tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <p className="mt-4 text-sm text-slate-400">
        Showing <span className="font-semibold text-white">{filteredRecords.length}</span> of{" "}
        <span className="font-semibold text-white">{records.length}</span> records
      </p>
    </motion.div>
  );
}