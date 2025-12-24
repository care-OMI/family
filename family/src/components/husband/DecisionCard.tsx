// src/components/husband/DecisionCard.tsx
import React from 'react';
import { CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface Props {
  item: {
    title: string;
    aiBrief: string;
    aiSuggestion: string;
  }
}

export const DecisionCard = ({ item }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">New Wish</span>
      </div>
      
      {/* AI Context Section */}
      <p className="text-sm text-slate-500 italic mb-4">
        " {item.aiBrief} "
      </p>

      {/* Actionable Suggestion */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mb-4">
        <p className="text-sm font-medium text-amber-800">
          💡 Dad's Action: {item.aiSuggestion}
        </p>
      </div>

      {/* Three-part Decision Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button className="flex flex-col items-center py-2 bg-green-500 text-white rounded-xl text-xs font-bold">
          <CheckCircle size={18} className="mb-1" /> Buy Now
        </button>
        <button className="flex flex-col items-center py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">
          <Clock size={18} className="mb-1" /> Later
        </button>
        <button className="flex flex-col items-center py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">
          <ExternalLink size={18} className="mb-1" /> Details
        </button>
      </div>
    </div>
  );
};