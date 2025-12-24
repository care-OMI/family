// src/app/wife/page.tsx
'use client';

import React, { useState } from 'react';
import { Share2, Sparkles, Loader2 } from 'lucide-react';

export default function WifePage() {
  const [productName, setProductName] = useState('');
  const [researchLogs, setResearchLogs] = useState('back pain, pregnancy pillows, side sleeping');
  const [isSyncing, setIsSyncing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSync = async () => {
    if (!productName) return alert('Please enter a product name');
    
    setIsSyncing(true);
    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          // Simulating search history as an array
          searchHistory: researchLogs.split(',').map(s => s.trim()),
        }),
      });
      
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error('Sync failed', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 p-6 flex flex-col items-center">
      {/* Mobile Header */}
      <div className="w-full max-w-md text-center mt-8 mb-10">
        <h1 className="text-2xl font-bold text-rose-900">Nesting Hub</h1>
        <p className="text-rose-600 text-sm">Prepare your home together</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Research Simulation Box */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-rose-100">
          <label className="block text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
            Your Recent Research (Simulated)
          </label>
          <textarea 
            value={researchLogs}
            onChange={(e) => setResearchLogs(e.target.value)}
            className="w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 p-0 resize-none"
            rows={2}
          />
        </div>

        {/* Input for Product */}
        <div className="bg-white rounded-3xl p-5 shadow-md border-2 border-rose-200">
          <label className="block text-sm font-semibold text-slate-800 mb-3">
            What item did you find?
          </label>
          <input 
            type="text"
            placeholder="e.g. Ergonomic Pregnancy Pillow"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border-b-2 border-rose-100 focus:border-rose-400 outline-none pb-2 text-lg"
          />
          
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full mt-6 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
          >
            {isSyncing ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <><Share2 size={20} /> Sync to Partner</>
            )}
          </button>
        </div>

        {/* AI Preview Section */}
        {result && (
          <div className="mt-4 p-4 bg-white/60 rounded-2xl border border-dashed border-rose-300 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs mb-2">
              <Sparkles size={14} /> AI AGENT PREVIEW FOR HUSBAND
            </div>
            <p className="text-xs text-slate-500 italic mb-2">"{result.aiBrief}"</p>
            <div className="bg-rose-100 p-2 rounded-lg text-xs font-bold text-rose-700">
              Suggestion: {result.aiSuggestion}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}