import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const { district, weatherData } = await request.json();
    if (!district || !weatherData) {
      return Response.json(
        { error: "district and weatherData are required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
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

    return Response.json({ text: response.text });
  } catch (error) {
    console.error("Advice API error:", error);
    return Response.json(
      { error: "Failed to generate crop advice" },
      { status: 500 }
    );
  }
}
