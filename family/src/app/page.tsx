// src/app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Users, Zap, ArrowRight } from 'lucide-react';

/**
 * Landing Page for OMI (Our Motherhood Intelligence)
 * This is the root page at http://localhost:3000
 * Updated with a Green color scheme.
 */
export default function LandingPage() {
  return (
    // Changed selection color to emerald
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Changed logo background and shadow to emerald */}
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <span className="text-white font-black text-xl italic">O</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">OMI</span>
          </div>
          {/* Changed link color to emerald */}
          <Link href="/login" className="text-sm font-bold text-emerald-500 hover:text-emerald-600 transition-colors">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Changed badge colors to emerald */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-500 px-4 py-2 rounded-full text-xs font-bold mb-8 animate-bounce">
            <Sparkles size={14} />
            AI-POWERED PREGNANCY COMPANION
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
            Build Your <span className="text-emerald-500">Family Nest</span> Together.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-12 max-w-2xl mx-auto">
            OMI bridges the gap between expecting mothers and partners. 
            Translate needs into actions and build your future, one wish at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login" 
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <button className="px-10 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1: AI Translation (Kept Amber for distinction, or could be green) */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Intent Sync</h3>
              <p className="text-slate-500 leading-relaxed">
                Our AI Agent translates mood and research into clear, actionable tasks for partners. No more guessing.
              </p>
            </div>

            {/* Feature 2: Shared Wishlist (Changed to Emerald to match theme) */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Family Wishlist</h3>
              <p className="text-slate-500 leading-relaxed">
                A shared digital space to curate items for the baby. Sync decisions instantly across devices.
              </p>
            </div>

            {/* Feature 3: Couple Matching (Kept Blue for distinction) */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Perfect Sync</h3>
              <p className="text-slate-500 leading-relaxed">
                Connect with your partner via a simple code. Experience real-time collaboration throughout the 280-day journey.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">O</span>
            </div>
            <span className="font-bold text-slate-900">OMI © 2025</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400 font-medium">
            {/* Changed hover color to emerald */}
            <a href="#" className="hover:text-emerald-500">Privacy</a>
            <a href="#" className="hover:text-emerald-500">Terms</a>
            <a href="#" className="hover:text-emerald-500">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}