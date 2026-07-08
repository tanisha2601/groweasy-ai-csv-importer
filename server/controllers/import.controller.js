import { parseCSV } from "../utils/parseCSV.js";
import { extractCRMData } from "../services/gemini.service.js";

export const importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
    }

    // Parse CSV
    const records = parseCSV(req.file.buffer);

    if (!records.length) {
      return res.status(400).json({
        success: false,
        message: "CSV contains no records",
      });
    }

    // Process in batches
    const BATCH_SIZE = 20;
    const importedRecords = [];

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);

      const result = await extractCRMData(batch);

      if (Array.isArray(result)) {
        importedRecords.push(...result);
      }
    }

    return res.status(200).json({
      success: true,
      totalImported: importedRecords.length,
      totalSkipped: records.length - importedRecords.length,
      records: importedRecords,
    });
  } catch (error) {
    console.error("Import Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI Import Failed",
      error: error.message,
    });
  }
};