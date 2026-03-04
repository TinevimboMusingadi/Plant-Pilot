import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bug, Camera, Upload, Loader2, AlertTriangle } from 'lucide-react';
import { analyzePestImage } from '../services/ai';

interface PestDetectorProps {
  district: string;
}

export default function PestDetector({ district }: PestDetectorProps) {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null); // Reset analysis on new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // Remove data:image/jpeg;base64, prefix
      const base64Data = image.split(',')[1];
      const result = await analyzePestImage(base64Data, district);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      setAnalysis("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-stone-800">Pest & Disease Detector</h2>
        <Bug className="h-8 w-8 text-amber-600" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-stone-300 rounded-xl h-64 flex flex-col items-center justify-center bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer relative overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="Uploaded crop" className="w-full h-full object-cover" />
            ) : (
              <>
                <Camera className="h-12 w-12 text-stone-400 mb-2" />
                <p className="text-stone-500 font-medium">Click to upload or capture photo</p>
                <p className="text-xs text-stone-400 mt-1">Supports JPG, PNG</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Bug className="h-5 w-5" />}
            Analyze Crop Health
          </button>
        </div>

        <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 min-h-[300px]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Analysis Results
          </h3>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 text-stone-400">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p>Analyzing image with AI...</p>
            </div>
          ) : analysis ? (
            <div className="prose prose-stone prose-sm max-w-none">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-stone-500 italic text-center mt-12">
              Upload an image and click "Analyze" to detect pests and diseases.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
