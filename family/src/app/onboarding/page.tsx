'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { Loader2, Leaf, Sparkles, Heart } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Helper to generate a unique 6-character alphanumeric code for family linking
   */
  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  /**
   * Updates the user's role, generates their unique invite code, 
   * and redirects to the main dashboard.
   */
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
      
      // Save role and the newly generated invite code to Firestore
      await updateDoc(userRef, { 
        role: role,
        inviteCode: myInviteCode,
        partnerId: null, // Initialized as null for the dashboard handshake logic
        updatedAt: serverTimestamp()
      });
      
      // Proceed to the dashboard where the role-specific view will render
      router.push('/dashboard'); 
    } catch (err: any) {
      console.error("Failed to update onboarding role:", err);
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    // Background: Matching the botanical green gradient of the OMI ecosystem
    <div className="min-h-screen bg-gradient-to-b from-[#F7FEFA] to-[#ECFDF5] flex flex-col items-center justify-center p-6 text-slate-900 selection:bg-emerald-100">
      
      {/* Decorative Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-200/20 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-sm space-y-8 relative">
        <div className="text-center space-y-4">
          {/* Logo Icon: Switched to Emerald theme */}
          <div className="relative inline-block">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black italic text-2xl shadow-sm border border-emerald-50">
              O
            </div>
            <Leaf className="absolute -top-1 -right-1 text-emerald-400" size={16} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-emerald-900 tracking-tight">One last thing...</h2>
            <p className="text-emerald-700/60 text-sm font-medium">Select your role to personalize OMI.</p>
          </div>
        </div>
        
        <div className="grid gap-4 mt-8">
          {/* Mom Selection Card: Refined with Emerald and Glassmorphism */}
          <button 
            onClick={() => selectRole('wife')}
            disabled={isUpdating}
            className="group relative overflow-hidden p-6 bg-white/80 backdrop-blur-md border-2 border-transparent hover:border-emerald-400 rounded-[2.5rem] text-left shadow-sm transition-all disabled:opacity-50 active:scale-95"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
                <Heart size={24} fill="currentColor" />
              </div>
              {isUpdating && <Loader2 className="animate-spin text-emerald-400" size={20} />}
            </div>
            <h3 className="font-bold text-xl text-emerald-900 tracking-tight">I am the Mom</h3>
            <p className="text-xs text-emerald-700/60 mt-2 font-medium leading-relaxed">
              Experience the companion AI, sync your wishlist, and track your wellness.
            </p>
          </button>

          {/* Partner Selection Card: Matches the emerald palette */}
          <button 
            onClick={() => selectRole('husband')}
            disabled={isUpdating}
            className="group relative overflow-hidden p-6 bg-white/80 backdrop-blur-md border-2 border-transparent hover:border-teal-400 rounded-[2.5rem] text-left shadow-sm transition-all disabled:opacity-50 active:scale-95"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              {isUpdating && <Loader2 className="animate-spin text-teal-400" size={20} />}
            </div>
            <h3 className="font-bold text-xl text-teal-900 tracking-tight">I am the Partner</h3>
            <p className="text-xs text-teal-700/60 mt-2 font-medium leading-relaxed">
              Receive AI insights, manage shared tasks, and support your partner's journey.
            </p>
          </button>
        </div>

        {isUpdating && (
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 animate-pulse">
              Cultivating your family space...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}