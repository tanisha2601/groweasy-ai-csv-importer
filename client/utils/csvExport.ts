import Papa from "papaparse";
import { saveAs } from "file-saver";

export function exportCRMCSV<T extends object>(
  records: T[],
  fileName = "groweasy-crm-records.csv"
) {
  if (!records.length) return;

  const csv = Papa.unparse(records);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, fileName);
}