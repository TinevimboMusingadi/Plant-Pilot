import { useEffect, useState } from 'react';
import { CloudRain, Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import { getWeather } from '../services/weather';

interface WeatherWidgetProps {
  district: string;
}

export default function WeatherWidget({ district }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWeather(district).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  }, [district]);

  if (loading) {
    return <div className="animate-pulse h-64 bg-stone-200 rounded-xl w-full"></div>;
  }

  if (!weather) {
    return <div className="text-red-500">Failed to load weather data.</div>;
  }

  const current = weather.current;
  const daily = weather.daily;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
      <h2 className="text-2xl font-serif font-bold text-stone-800 mb-4">{district} Weather</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
          <Thermometer className="h-8 w-8 text-blue-500 mb-2" />
          <span className="text-sm text-stone-500">Temperature</span>
          <span className="text-xl font-bold">{current.temperature_2m}°C</span>
        </div>
        <div className="bg-cyan-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
          <Droplets className="h-8 w-8 text-cyan-500 mb-2" />
          <span className="text-sm text-stone-500">Humidity</span>
          <span className="text-xl font-bold">{current.relative_humidity_2m}%</span>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
          <CloudRain className="h-8 w-8 text-indigo-500 mb-2" />
          <span className="text-sm text-stone-500">Rainfall</span>
          <span className="text-xl font-bold">{current.rain} mm</span>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
          <Sun className="h-8 w-8 text-amber-500 mb-2" />
          <span className="text-sm text-stone-500">Condition</span>
          <span className="text-xl font-bold">
             {current.rain > 0 ? 'Rainy' : current.cloud_cover > 50 ? 'Cloudy' : 'Sunny'}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3 text-stone-700">7-Day Forecast</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-2">
          {daily.time.map((date: string, i: number) => (
            <div key={date} className="bg-stone-50 p-3 rounded-lg border border-stone-100 min-w-[120px] text-center">
              <p className="text-xs text-stone-500 mb-1">{new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })}</p>
              <div className="flex justify-center my-2">
                {daily.precipitation_probability_max[i] > 50 ? (
                  <CloudRain className="h-6 w-6 text-blue-400" />
                ) : (
                  <Sun className="h-6 w-6 text-amber-400" />
                )}
              </div>
              <p className="text-sm font-bold">{daily.temperature_2m_max[i]}° / {daily.temperature_2m_min[i]}°</p>
              <p className="text-xs text-blue-600 mt-1">{daily.precipitation_probability_max[i]}% Rain</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
