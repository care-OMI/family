// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Loader2, Leaf, Sparkles } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; 
import { auth, db, googleProvider } from '@/lib/firebase/config';

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handles Google Login, syncs user to Firestore, and redirects to onboarding
   */
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // 1. Trigger Firebase Google Popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 2. Reference to the user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      // 3. If user doesn't exist in Firestore, create a basic profile
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: null,        // Set during onboarding
          partnerId: null,   // Set during matching
          inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(), // Initial code
          createdAt: serverTimestamp(),
        });
        console.log("New user created in Firestore");
      }

      // 4. Redirect to the Role Selection (Onboarding) page
      router.push('/onboarding');
      
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background: Soft botanical green gradient
    <div className="min-h-screen bg-gradient-to-b from-[#F7FEFA] to-[#ECFDF5] flex flex-col items-center justify-center p-6 selection:bg-emerald-100">
      <div className="w-full max-w-sm text-center space-y-10 relative">
        
        {/* Decorative Background Glow */}
        <div className="absolute -inset-10 bg-emerald-200/20 blur-3xl rounded-full -z-10" />

        <div className="space-y-4">
          {/* Logo: Emerald gradient with shadow */}
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-200/50 rotate-3">
              <Heart className="text-white" fill="white" size={36} />
            </div>
            {/* Added a floating leaf icon for botanical feel */}
            <div className="absolute -top-2 -right-2 p-2 bg-white rounded-xl shadow-sm">
              <Leaf className="text-emerald-500" size={16} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-emerald-900 tracking-tight leading-none">OMI</h1>
            <p className="text-emerald-700/60 text-sm font-medium">Your empathetic family companion</p>
          </div>
        </div>
        
        {error && (
          <div className="bg-rose-50 text-rose-500 p-4 rounded-2xl text-xs font-bold border border-rose-100 animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group w-full bg-white/80 backdrop-blur-md border border-emerald-100 py-5 rounded-[2rem] flex items-center justify-center gap-4 font-bold text-emerald-900 hover:bg-white hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 shadow-sm"
          >
            {loading ? (
              <Loader2 className="animate-spin text-emerald-500" />
            ) : (
              <>
                <div className="p-2 bg-emerald-50 rounded-lg group-hover:scale-110 transition-transform">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                </div>
                Continue with Google
              </>
            )}
          </button>

          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Sparkles size={12} className="text-amber-400" /> 
            AI-Powered Support System
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="absolute bottom-10 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">
        OMI © 2025 • Family Intelligence
      </footer>
    </div>
  );
}