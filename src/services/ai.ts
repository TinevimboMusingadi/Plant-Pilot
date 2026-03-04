import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getCropAdvice(district: string, weatherData: any) {
  const prompt = `
    You are an agricultural expert for Zimbabwe.
    Based on the following weather data for ${district}:
    ${JSON.stringify(weatherData)}

    Provide a concise recommendation on:
    1. Best crops to plant right now.
    2. Specific seed varieties suitable for this weather.
    3. Any immediate precautions for pests or diseases based on the humidity/temp.

    Format the response in Markdown. Keep it practical for a farmer.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-latest",
    contents: prompt,
  });

  return response.text;
}

export async function analyzePestImage(imageBase64: string, district: string) {
  const prompt = `
    Analyze this image of a crop from ${district}, Zimbabwe.
    1. Identify the crop.
    2. Detect any visible pests or diseases.
    3. Suggest immediate treatment or prevention methods.
    4. If healthy, confirm it.

    Format the response in Markdown.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-latest",
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
        { text: prompt },
      ],
    },
  });

  return response.text;
}
