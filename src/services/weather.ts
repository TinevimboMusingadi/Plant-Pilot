// OpenMeteo API
// Coordinates for some Zimbabwe districts/provinces
export const ZIMBABWE_LOCATIONS: Record<string, { lat: number; lon: number }> = {
  "Harare": { lat: -17.8292, lon: 31.0522 },
  "Bulawayo": { lat: -20.1561, lon: 28.5800 },
  "Mutare": { lat: -18.9707, lon: 32.6709 },
  "Gweru": { lat: -19.4587, lon: 29.8100 },
  "Masvingo": { lat: -20.0632, lon: 30.8277 },
  "Chinhoyi": { lat: -17.3667, lon: 30.2000 },
  "Bindura": { lat: -17.2999, lon: 31.3306 },
  "Marondera": { lat: -18.1853, lon: 31.5519 },
  "Gwanda": { lat: -20.9333, lon: 29.0000 },
  "Lupane": { lat: -18.9315, lon: 27.8070 },
};

export async function getWeather(district: string) {
  const coords = ZIMBABWE_LOCATIONS[district] || ZIMBABWE_LOCATIONS["Harare"];
  
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,rain,weather_code&daily=temperature_2m_max,temperature_2m_min,rain_sum,precipitation_probability_max&timezone=Africa%2FHarare`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}
