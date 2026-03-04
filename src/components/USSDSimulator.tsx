import { useState } from 'react';
import { Phone, Send } from 'lucide-react';
import { getWeather } from '../services/weather';
import { getCropAdvice } from '../services/ai';

export default function USSDSimulator() {
  const [screen, setScreen] = useState('dialer'); // dialer, menu, weather, crops
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleDial = () => {
    if (input === '*123#') {
      setScreen('menu');
      setDisplay("Welcome to Plant Pilot\n1. Weather\n2. Crop Advice\n3. Pest Report\n4. Seed Bank");
      setInput('');
    } else {
      setDisplay("Invalid Code. Try *123#");
    }
  };

  const handleMenuSelection = async () => {
    const choice = input.trim();
    setInput('');
    
    if (screen === 'menu') {
      if (choice === '1') {
        setScreen('weather_loc');
        setDisplay("Enter Province:\n1. Harare\n2. Bulawayo\n3. Mutare");
      } else if (choice === '2') {
        setScreen('crop_loc');
        setDisplay("Enter Province for Advice:\n1. Harare\n2. Bulawayo\n3. Mutare");
      } else {
        setDisplay("Invalid Option\n0. Back");
      }
    } else if (screen === 'weather_loc' || screen === 'crop_loc') {
      const locs = ['Harare', 'Bulawayo', 'Mutare'];
      const loc = locs[parseInt(choice) - 1];
      
      if (loc) {
        setDisplay("Loading...");
        if (screen === 'weather_loc') {
          const data = await getWeather(loc);
          if (data) {
            const current = data.current;
            setDisplay(`${loc} Weather:\nTemp: ${current.temperature_2m}C\nRain: ${current.rain}mm\nHumidity: ${current.relative_humidity_2m}%\n0. Back`);
          } else {
            setDisplay("Error fetching data.\n0. Back");
          }
        } else {
           // Mock advice for USSD to be fast
           setDisplay(`Advice for ${loc}:\nPlant maize now. Rain expected.\nUse SC727 seeds.\n0. Back`);
        }
        setScreen('result');
      } else {
        setDisplay("Invalid Province\n0. Back");
      }
    } else if (choice === '0') {
      setScreen('menu');
      setDisplay("Welcome to Plant Pilot\n1. Weather\n2. Crop Advice\n3. Pest Report\n4. Seed Bank");
    }
  };

  return (
    <div className="flex justify-center items-center p-8 bg-stone-100 rounded-xl">
      <div className="w-[300px] h-[600px] bg-black rounded-[3rem] p-4 shadow-2xl border-4 border-stone-800 relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>
        
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col relative">
          {/* Status Bar */}
          <div className="bg-stone-900 text-white text-xs p-2 pt-8 flex justify-between px-4">
            <span>09:41</span>
            <span>LTE</span>
          </div>

          {/* Content */}
          <div className="flex-1 bg-stone-100 p-4 flex flex-col">
            {screen === 'dialer' ? (
              <div className="flex-1 flex flex-col justify-end pb-8">
                <div className="text-3xl text-center mb-8 font-mono">{input}</div>
                <div className="grid grid-cols-3 gap-4 text-center font-bold text-xl">
                  {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((key) => (
                    <button 
                      key={key}
                      onClick={() => setInput(prev => prev + key)}
                      className="h-16 w-16 rounded-full bg-stone-200 flex items-center justify-center active:bg-stone-300 mx-auto"
                    >
                      {key}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleDial}
                  className="mt-6 h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mx-auto text-white"
                >
                  <Phone fill="currentColor" />
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-4 font-mono text-sm whitespace-pre-wrap">
                  {display}
                </div>
                <div className="mt-auto flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border border-stone-300 rounded px-2 py-1"
                    placeholder="Type..."
                  />
                  <button 
                    onClick={handleMenuSelection}
                    className="bg-blue-600 text-white p-2 rounded"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <button 
                  onClick={() => { setScreen('dialer'); setInput(''); }}
                  className="mt-4 text-center text-red-500 text-sm"
                >
                  End Session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
