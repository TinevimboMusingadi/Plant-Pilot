/**
 * Client-side AI service. Calls Vercel API routes to keep GEMINI_API_KEY server-side.
 */

function getApiBase(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

export async function getCropAdvice(
  district: string,
  weatherData: Record<string, unknown>
): Promise<string> {
  const res = await fetch(`${getApiBase()}/api/advice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ district, weatherData }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to get crop advice");
  }

  const data = await res.json();
  return data.text;
}

export async function analyzePestImage(
  imageBase64: string,
  district: string
): Promise<string> {
  const res = await fetch(`${getApiBase()}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64, district }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to analyze image");
  }

  const data = await res.json();
  return data.text;
}
