'use client';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Sparkles, Heart, Users, 
  Leaf, ShieldCheck, MapPin, MessageSquare, Mail 
} from 'lucide-react';

export default function CommunityPage() {
  const router = useRouter();

  const previews = [
    {
      title: "Peer Circles",
      desc: "Connect with women in the same stage of life.",
      icon: <Users className="text-emerald-500" size={24} />,
      tag: "Social"
    },
    {
      title: "Expert Wisdom",
      desc: "Live Q&As with wellness and family specialists.",
      icon: <Sparkles className="text-amber-500" size={24} />,
      tag: "Learning"
    },
    {
      title: "Local Meetups",
      desc: "Find your village in the real world.",
      icon: <MapPin className="text-teal-500" size={24} />,
      tag: "Physical"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FEFA] to-[#ECFDF5] flex flex-col p-8 pb-20">
      {/* 1. Header Navigation */}
      <button 
        onClick={() => router.back()} 
        className="group flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-widest mb-12"
      >
        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:-translate-x-1 transition-transform">
          <ArrowLeft size={16} />
        </div>
        Back to OMI
      </button>

      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col items-center justify-center space-y-16">
        
        {/* 2. Hero Section */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute -inset-6 bg-emerald-100 rounded-full blur-3xl opacity-40 animate-pulse" />
            <div className="relative w-28 h-28 bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 flex items-center justify-center rotate-3 border border-emerald-50">
              <Leaf className="text-emerald-500" size={48} fill="currentColor" />
            </div>
          </div>

          <div className="space-y-4 max-w-lg">
            <h1 className="text-5xl font-black text-emerald-900 tracking-tight leading-tight">
              The Village is <span className="text-emerald-600">Growing.</span>
            </h1>
            <p className="text-emerald-800/60 text-lg leading-relaxed font-medium">
              We're building a sanctuary where shared experiences become collective wisdom. Your support system is almost ready.
            </p>
          </div>
        </div>

        {/* 3. Future Feature Previews */}
        <div className="grid md:grid-cols-3 gap-6 w-full">
          {previews.map((item, i) => (
            <div 
              key={i} 
              className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-emerald-100/50 shadow-sm flex flex-col items-start gap-4 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-3 bg-emerald-50 rounded-2xl shadow-inner">
                {item.icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mb-1 block">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-emerald-900">{item.title}</h3>
                <p className="text-emerald-800/50 text-xs font-medium leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Lighter Waitlist Section (Soft Emerald Glass) */}
        <div className="w-full max-w-lg relative">
          {/* Subtle Glow Background */}
          <div className="absolute -inset-4 bg-emerald-200/20 blur-3xl rounded-full" />
          
          <section className="relative bg-emerald-50/40 backdrop-blur-md border border-emerald-100 p-10 rounded-[3.5rem] shadow-xl shadow-emerald-900/5 text-center space-y-8">
            <div className="flex justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[9px] font-black uppercase text-emerald-600 shadow-sm border border-emerald-50">
                <ShieldCheck size={12} /> Private Circles
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[9px] font-black uppercase text-emerald-600 shadow-sm border border-emerald-50">
                <MessageSquare size={12} /> Daily Support
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-emerald-900 tracking-tight">Be part of the OMI Village.</h2>
              <p className="text-emerald-700/60 text-sm font-medium">Be the first to know when our community opens its doors.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/80 rounded-[2rem] border border-emerald-100 shadow-inner">
              <div className="flex-1 flex items-center px-4 gap-2">
                <Mail size={18} className="text-emerald-300" />
                <input 
                  placeholder="Enter your email" 
                  className="bg-transparent w-full py-3 text-sm text-emerald-900 placeholder:text-emerald-200 outline-none"
                />
              </div>
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-[1.5rem] font-bold text-xs hover:bg-emerald-700 transition-all uppercase tracking-widest shadow-lg shadow-emerald-200 active:scale-95">
                Join Waitlist
              </button>
            </div>
            
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              No spam. Just heart-centered updates.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}