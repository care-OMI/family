'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { Loader2 } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const selectRole = async (role: 'wife' | 'husband') => {
    const user = auth.currentUser;
    if (!user) {
      router.push('/login');
      return;
    }

    setIsUpdating(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      const myInviteCode = generateInviteCode();
      
      await updateDoc(userRef, { 
        role: role,
        inviteCode: myInviteCode,
        partnerId: null,
        updatedAt: serverTimestamp()
      });
      
      router.push('/dashboard'); 
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black italic text-xl">
            O
          </div>
          <h2 className="text-2xl font-bold">One last thing...</h2>
          <p className="text-slate-400 text-sm">Select your role to personalize OMI.</p>
        </div>
        
        <div className="grid gap-4 mt-8">
          <button 
            onClick={() => selectRole('wife')}
            disabled={isUpdating}
            className="group p-6 bg-white border-2 border-transparent hover:border-rose-400 rounded-[2rem] text-left shadow-sm transition-all disabled:opacity-50"
          >
            <div className="flex justify-between items-start">
              <span className="text-4xl mb-2 block">🤰</span>
              {isUpdating && <Loader2 className="animate-spin text-rose-400" size={20} />}
            </div>
            <p className="font-bold text-lg text-slate-800">I am the Mom</p>
            <p className="text-xs text-slate-400 mt-1">Track pregnancy and sync your needs.</p>
          </button>

          <button 
            onClick={() => selectRole('husband')}
            disabled={isUpdating}
            className="group p-6 bg-white border-2 border-transparent hover:border-blue-400 rounded-[2rem] text-left shadow-sm transition-all disabled:opacity-50"
          >
            <div className="flex justify-between items-start">
              <span className="text-4xl mb-2 block">🧔‍♂️</span>
              {isUpdating && <Loader2 className="animate-spin text-blue-400" size={20} />}
            </div>
            <p className="font-bold text-lg text-slate-800">I am the Partner</p>
            <p className="text-xs text-slate-400 mt-1">Support and manage shared tasks.</p>
          </button>
        </div>
      </div>
    </div>
  );
}