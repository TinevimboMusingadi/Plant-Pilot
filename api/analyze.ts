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
    const { imageBase64, district } = await request.json();
    if (!imageBase64 || !district) {
      return Response.json(
        { error: "imageBase64 and district are required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
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

    return Response.json({ text: response.text });
  } catch (error) {
    console.error("Analyze API error:", error);
    return Response.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
