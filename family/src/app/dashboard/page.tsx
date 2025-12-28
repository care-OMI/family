// src/app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { respondToInvite, sendLinkRequest } from '@/lib/firebase/match';
import { Loader2, Users, Check, X, Send } from 'lucide-react';
import WifeView from '@/components/dashboard/WifeView';
import PartnerView from '@/components/dashboard/PartnerView';

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

  if (!user) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-rose-500" /></div>;

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-32">
      <header className="p-6 bg-white border-b border-slate-50 sticky top-0 z-30 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black italic text-rose-500">OMI</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {user.role === 'wife' ? "Wife's Dashboard" : "Partner's Desk"}
          </p>
        </div>
      </header>

      {user.pendingInvite && (
        <div className="mx-6 mt-6 p-4 bg-slate-900 text-white rounded-3xl flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <Users size={18} className="text-rose-400" />
            <span className="text-xs font-semibold">{user.pendingInvite.fromName} wants to link</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => respondToInvite(true)} className="p-2 bg-rose-500 rounded-xl"><Check size={16} /></button>
            <button onClick={() => respondToInvite(false)} className="p-2 bg-white/10 rounded-xl"><X size={16} /></button>
          </div>
        </div>
      )}

      <main className="p-6">
        {user.role === 'wife' ? <WifeView user={user} /> : <PartnerView user={user} />}
      </main>

      {!user.partnerId && !user.pendingInvite && (
        <div className="fixed bottom-6 left-6 right-6 bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-100 z-40">
          <div className="flex items-center gap-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase">My Code: <span className="text-rose-500">{user.inviteCode}</span></div>
            <input 
              placeholder="Partner Code"
              value={partnerCode}
              onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
              className="flex-1 bg-slate-50 border-none rounded-xl p-2 text-xs font-mono outline-none"
            />
            <button onClick={() => sendLinkRequest(partnerCode, user.uid)} className="p-2 bg-slate-900 text-white rounded-xl">
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}