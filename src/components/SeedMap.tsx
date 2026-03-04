import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SEED_BANKS = [
  { id: 1, name: "Harare Seed Co.", lat: -17.8292, lon: 31.0522, stock: "Maize, Wheat, Soybeans" },
  { id: 2, name: "Bulawayo Agro Dealers", lat: -20.1561, lon: 28.5800, stock: "Sorghum, Millet" },
  { id: 3, name: "Mutare Farmers Hub", lat: -18.9707, lon: 32.6709, stock: "Coffee, Tea, Fruits" },
  { id: 4, name: "Gweru Midlands Seeds", lat: -19.4587, lon: 29.8100, stock: "Cotton, Maize" },
  { id: 5, name: "Masvingo Drought Resistant Seeds", lat: -20.0632, lon: 30.8277, stock: "Small Grains" },
];

export default function SeedMap() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif font-bold text-stone-800">Seed Bank Locator</h2>
        <MapPin className="h-6 w-6 text-emerald-600" />
      </div>
      
      <div className="flex-1 rounded-xl overflow-hidden border border-stone-200 relative z-0">
        <MapContainer 
          center={[-19.0154, 29.1549]} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {SEED_BANKS.map((bank) => (
            <Marker key={bank.id} position={[bank.lat, bank.lon]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-emerald-800">{bank.name}</h3>
                  <p className="text-sm text-stone-600 mt-1"><strong>Stock:</strong> {bank.stock}</p>
                  <button className="mt-2 text-xs bg-emerald-600 text-white px-2 py-1 rounded hover:bg-emerald-700 w-full">
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
