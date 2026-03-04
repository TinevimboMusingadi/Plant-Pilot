import { useState } from 'react';
import Layout from './components/Layout';
import WeatherWidget from './components/WeatherWidget';
import CropAdvisor from './components/CropAdvisor';
import PestDetector from './components/PestDetector';
import SeedMap from './components/SeedMap';
import USSDSimulator from './components/USSDSimulator';
import { ZIMBABWE_LOCATIONS } from './services/weather';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [district, setDistrict] = useState('Harare');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <div>
                <h2 className="text-2xl font-serif font-bold text-emerald-900">Welcome back, Farmer!</h2>
                <p className="text-emerald-700">Here is your daily agricultural summary for {district}.</p>
              </div>
              <select 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-white border border-emerald-200 text-emerald-900 rounded-lg p-2 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {Object.keys(ZIMBABWE_LOCATIONS).map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            <WeatherWidget district={district} />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <h3 className="font-bold text-amber-900 mb-2">Pest Alert</h3>
                <p className="text-amber-800 text-sm">Armyworm detected in neighboring districts. Check your maize crops today.</p>
                <button 
                  onClick={() => setActiveTab('pests')}
                  className="mt-4 text-sm font-medium text-amber-700 hover:text-amber-900 underline"
                >
                  Check my crops &rarr;
                </button>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2">Market Price</h3>
                <p className="text-blue-800 text-sm">Maize prices are up 5% this week in Harare markets.</p>
              </div>
            </div>
          </div>
        );
      case 'weather':
        return (
          <div className="space-y-6">
            <div className="flex justify-end">
               <select 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-white border border-stone-200 rounded-lg p-2"
              >
                {Object.keys(ZIMBABWE_LOCATIONS).map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <WeatherWidget district={district} />
          </div>
        );
      case 'crops':
        return (
          <div className="space-y-6">
             <div className="flex justify-end">
               <select 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-white border border-stone-200 rounded-lg p-2"
              >
                {Object.keys(ZIMBABWE_LOCATIONS).map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <CropAdvisor district={district} />
          </div>
        );
      case 'pests':
        return (
          <div className="space-y-6">
             <div className="flex justify-end">
               <select 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-white border border-stone-200 rounded-lg p-2"
              >
                {Object.keys(ZIMBABWE_LOCATIONS).map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <PestDetector district={district} />
          </div>
        );
      case 'seeds':
        return <SeedMap />;
      case 'ussd':
        return <USSDSimulator />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
