import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sprout, Loader2 } from 'lucide-react';
import { getCropAdvice } from '../services/ai';
import { getWeather } from '../services/weather';

interface CropAdvisorProps {
  district: string;
}

export default function CropAdvisor({ district }: CropAdvisorProps) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    try {
      // 1. Get real weather data first
      const weatherData = await getWeather(district);
      
      // 2. Ask AI for advice based on that weather
      const aiResponse = await getCropAdvice(district, weatherData);
      setAdvice(aiResponse);
    } catch (error) {
      console.error(error);
      setAdvice("Error getting advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-stone-800">Crop Advisor</h2>
        <Sprout className="h-8 w-8 text-emerald-600" />
      </div>

      <div className="bg-emerald-50 p-4 rounded-lg mb-6 border border-emerald-100">
        <p className="text-emerald-800 mb-4">
          Get personalized crop recommendations for <strong>{district}</strong> based on real-time weather data and soil conditions.
        </p>
        <button
          onClick={handleGetAdvice}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sprout className="h-4 w-4" />}
          Generate Advice
        </button>
      </div>

      {advice && (
        <div className="prose prose-stone max-w-none bg-stone-50 p-6 rounded-xl border border-stone-200">
          <ReactMarkdown>{advice}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
