// src/components/dashboard/PartnerView.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Zap, ShoppingBag, ArrowUpRight, MessageCircle, 
  Heart, Sun, Cloud, Wind, ListTodo, Sparkles, 
  ChevronRight, CheckCircle2 
} from 'lucide-react';

export default function PartnerView({ user }: { user: any }) {
  const router = useRouter();

  // Temporary mock data - In production, these would come from user.partnerInsights
  const emotionalWeather = {
    status: "Partly Sunny",
    note: "She's feeling a bit tired but overall positive.",
    icon: <Cloud className="text-emerald-400" size={32} />
  };

  const careGuide = [
    "She mentioned her lower back is sore. Bring a heat pad or offer a 10-minute massage tonight.",
    "She's a bit overwhelmed by the calendar. Maybe handle the grocery run this weekend?"
  ];

  const loveMissions = [
    { id: 1, task: "Buy XS Energy Drink (Caffeine-free version)", status: "pending" },
    { id: 2, task: "Restock Nutrilite prenatal vitamins", status: "completed" }
  ];

  return (
    <div className="space-y-6 pb-24 bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] p-4 rounded-[3rem]">
      
      {/* 1. Emotional Weather Widget */}
      <section className="bg-white/70 backdrop-blur-xl p-6 rounded-[2.5rem] border border-emerald-50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="text-emerald-500" size={18} fill="currentColor" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-emerald-800">Her Heart Weather</h2>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-50 px-2 py-1 rounded-md">LIVE INSIGHT</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="p-4 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[2rem] shadow-inner">
            {emotionalWeather.icon}
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-900 leading-none">{emotionalWeather.status}</h3>
            <p className="text-xs text-emerald-700/60 font-medium mt-2 leading-relaxed">
              {emotionalWeather.note}
            </p>
          </div>
        </div>
      </section>

      {/* 2. AI Care Guide (The "Sync" Logic) */}
      <section className="bg-emerald-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <Zap size={20} fill="currentColor" />
            <h2 className="text-xs font-black uppercase tracking-widest">OMI Care Guide</h2>
          </div>
          <div className="space-y-4">
            {careGuide.map((advice, index) => (
              <div key={index} className="flex gap-3 items-start group">
                <div className="mt-1 p-1 bg-emerald-500/20 rounded-full text-emerald-400 group-hover:scale-110 transition-transform">
                  <Sparkles size={14} />
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-90">
                  {advice}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase">
            <MessageCircle size={14} /> Reflected from her companion activity
          </div>
        </div>
        {/* Decorative background blur */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      </section>

      {/* 3. Love Missions (Task Center) */}
      <section className="bg-white rounded-[2.5rem] border border-emerald-50 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 px-2">
          <ListTodo className="text-teal-500" size={20} />
          <h3 className="font-bold text-emerald-900 tracking-tight">Love Missions</h3>
        </div>

        <div className="space-y-3">
          {loveMissions.map((mission) => (
            <div 
              key={mission.id} 
              className={`p-4 rounded-2xl flex items-center justify-between transition-all ${
                mission.status === 'completed' ? 'bg-emerald-50/50 opacity-60' : 'bg-slate-50 border border-emerald-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {mission.status === 'completed' ? (
                  <CheckCircle2 size={18} className="text-emerald-500" />
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-emerald-200" />
                )}
                <p className={`text-sm font-bold ${mission.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {mission.task}
                </p>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Synced Wishlist Preview */}
      <section className="bg-white rounded-[2.5rem] border border-emerald-50 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-emerald-500" size={20} />
            <h3 className="font-bold text-emerald-900 tracking-tight">Synced Wishlist</h3>
          </div>
          <button onClick={() => router.push('/wishlist')} className="text-[10px] font-bold text-emerald-600 uppercase">View All</button>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-emerald-50/30 rounded-2xl flex items-center justify-between group hover:bg-emerald-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Heart className="text-emerald-300" size={18} />
              </div>
              <p className="font-bold text-sm text-emerald-900">Family Item Sample</p>
            </div>
            <ArrowUpRight className="text-emerald-300 group-hover:text-emerald-500 transition-colors" size={18} />
          </div>
        </div>
      </section>
    </div>
  );
}