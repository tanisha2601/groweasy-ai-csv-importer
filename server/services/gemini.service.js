import { getGeminiClient } from "../config/gemini.js";
import { buildPrompt } from "../prompts/crmPrompt.js";

export const extractCRMData = async (records) => {
  const ai = getGeminiClient();

  const prompt = buildPrompt(records);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const clean = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(clean);
};