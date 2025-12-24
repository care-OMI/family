// src/app/dashboard/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { joinFamily } from '@/lib/firebase/match';
import { Users, Link2, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [partnerCode, setPartnerCode] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // 实时监听用户信息，一旦对方输入了你的码，这里会自动更新
    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      setUserData(snap.data());
    });
    return () => unsub();
  }, []);

  const handleLink = async () => {
    try {
      await joinFamily(partnerCode, auth.currentUser!.uid);
      alert("Successfully matched!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-6 text-slate-900">
      <header className="mb-8">
        <h1 className="text-3xl font-black italic text-rose-500">OMI</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
          {userData.role === 'wife' ? "Mom's Space" : "Partner's Desk"}
        </p>
      </header>

      {/* 如果没有绑定，显示匹配模块 */}
      {!userData.partnerId ? (
        <section className="bg-white p-6 rounded-[2.5rem] border-2 border-dashed border-rose-100 shadow-sm">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs mb-6 uppercase tracking-wider">
            <Users size={14} /> Match with Partner
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-rose-50 p-4 rounded-2xl">
              <span className="text-xs font-bold text-rose-400 uppercase">Your Code:</span>
              <code className="text-xl font-mono font-black text-rose-600 tracking-tighter">
                {userData.inviteCode}
              </code>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Partner Code"
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                className="flex-1 bg-slate-50 border-none p-4 rounded-2xl font-mono text-center outline-none focus:ring-2 focus:ring-rose-200"
              />
              <button 
                onClick={handleLink}
                className="bg-slate-900 text-white px-6 rounded-2xl hover:bg-black transition-all"
              >
                <Link2 size={20} />
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="bg-green-50 p-4 rounded-3xl flex items-center gap-3 border border-green-100">
          <CheckCircle className="text-green-500" size={20} />
          <p className="text-sm font-bold text-green-700">Matched with Partner</p>
        </div>
      )}

      {/* 这里的下方可以继续写 Mom 或 Partner 的专属功能 */}
    </div>
  );
}