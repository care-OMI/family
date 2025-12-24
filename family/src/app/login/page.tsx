// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore functions
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
          role: null,        // Will be set in the next step
          partnerId: null,   // Will be set during matching
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
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm text-center space-y-8">
        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Heart className="text-white" fill="white" size={32} />
        </div>
        <h1 className="text-3xl font-black">OMI</h1>
        
        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white border border-slate-200 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          {loading ? (
            <Loader2 className="animate-spin text-slate-400" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
}