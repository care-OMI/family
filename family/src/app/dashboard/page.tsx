'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { respondToInvite, sendLinkRequest } from '@/lib/firebase/match';
import { Loader2, Users, Check, X, Send } from 'lucide-react';
import WifeView from '@/components/dashboard/WifeView';
import PartnerView from '@/components/dashboard/PartnerView';

/**
 * Main Dashboard Controller
 * Orchestrates real-time data syncing and role-based view rendering.
 */
export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [partnerCode, setPartnerCode] = useState('');

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) return router.push('/login');
      const unsubSnap = onSnapshot(doc(db, "users", currentUser.uid), (snap) => {
        setUser(snap.data());
      });
      return () => unsubSnap();
    });
    return () => unsubAuth();
  }, [router]);

  // FIXED: Changed loading spinner to emerald-500
  if (!user) return (
    <div className="h-screen flex items-center justify-center bg-[#F7FEFA]">
      <Loader2 className="animate-spin text-emerald-500" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-32 selection:bg-emerald-100">
      
      {/* 1. Header Navigation: Changed OMI Logo to Emerald */}
      <header className="p-6 bg-white border-b border-emerald-50 sticky top-0 z-30 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black italic text-emerald-500 tracking-tighter">OMI</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {user.role === 'wife' ? "Wife's Dashboard" : "Partner's Desk"}
          </p>
        </div>
      </header>

      {/* 2. Handshake Notification: Changed icons and accept button to Emerald */}
      {user.pendingInvite && (
        <div className="mx-6 mt-6 p-4 bg-slate-900 text-white rounded-[2rem] border border-emerald-900/20 flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <Users size={18} className="text-emerald-400" />
            <span className="text-xs font-semibold">{user.pendingInvite.fromName} wants to link</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => respondToInvite(true)} 
              className="p-2 bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all active:scale-90"
            >
              <Check size={16} />
            </button>
            <button 
              onClick={() => respondToInvite(false)} 
              className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Content Area */}
      <main className="p-6">
        {user.role === 'wife' ? <WifeView user={user} /> : <PartnerView user={user} />}
      </main>

      {/* 4. Footer Linking Tool: Changed My Code highlight to Emerald */}
      {!user.partnerId && !user.pendingInvite && (
        <div className="fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-[2.5rem] shadow-2xl border border-emerald-100 z-40 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
              My Code: <span className="text-emerald-500 font-black tracking-wider">{user.inviteCode}</span>
            </div>
            <input 
              placeholder="Partner Code"
              value={partnerCode}
              onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
              className="flex-1 bg-emerald-50/50 border-none rounded-2xl p-3 text-xs font-mono outline-none focus:ring-1 focus:ring-emerald-200 transition-all"
            />
            <button 
              onClick={() => sendLinkRequest(partnerCode, user.uid)} 
              className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-900/10"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}