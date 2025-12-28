'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Send, ShoppingBag, Globe, Loader2, Heart, Leaf, Wind } from 'lucide-react';

export default function WifeView({ user }: { user: any }) {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi dear, I'm OMI. I'm here to listen. How is your heart feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.details);
      setMessages(prev => [...prev, { role: 'ai', content: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having a little trouble connecting. Could you try saying that again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // Container: Changed base background to a soft green gradient
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4 max-w-2xl mx-auto bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] p-4 rounded-[3rem]">
      
      {/* 1. Refined Navigation Grid (Green Theme) */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <button 
          onClick={() => router.push('/wishlist')} 
          className="group relative overflow-hidden p-5 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-[2rem] shadow-sm transition-all hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5"
        >
          <div className="relative z-10 flex flex-col items-start gap-2">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform shadow-sm">
              <ShoppingBag size={20} />
            </div>
            <span className="font-bold text-sm text-emerald-900 tracking-tight">Family Wishlist</span>
          </div>
          {/* Decorative Background Elements */}
          <Leaf className="absolute -right-2 -bottom-2 text-emerald-50/50 w-16 h-16 group-hover:rotate-12 transition-transform" />
        </button>

        <button 
          onClick={() => router.push('/community')} 
          className="group relative overflow-hidden p-5 bg-white/80 backdrop-blur-sm border border-teal-100 rounded-[2rem] shadow-sm transition-all hover:shadow-md hover:border-teal-200 hover:-translate-y-0.5"
        >
          <div className="relative z-10 flex flex-col items-start gap-2">
            <div className="p-2 bg-teal-50 rounded-xl text-teal-600 group-hover:scale-110 transition-transform shadow-sm">
              <Globe size={20} />
            </div>
            <span className="font-bold text-sm text-teal-900 tracking-tight">Community Hub</span>
          </div>
          <Wind className="absolute -right-2 -bottom-2 text-teal-50/50 w-16 h-16 group-hover:-translate-x-2 transition-transform" />
        </button>
      </div>

      {/* 2. Chat Container with Enhanced Glassmorphism & Green Accents */}
      <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-[3rem] border border-emerald-50/50 shadow-xl shadow-emerald-100/40 flex flex-col overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="px-8 py-5 border-b border-emerald-50 bg-white/40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200/50 rotate-3">
                <Heart size={16} className="text-white" fill="white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-tighter text-emerald-900">OMI Companion</p>
              <p className="text-[10px] text-emerald-600/80 font-bold flex items-center gap-1">
                Here for you, always.
              </p>
            </div>
          </div>
          <div className="p-2 bg-amber-50 rounded-full">
            <Sparkles size={18} className="text-amber-400 animate-pulse-slow" />
          </div>
        </div>
        
        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide relative">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.svg')] bg-repeat mix-blend-overlay pointer-events-none"></div>
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex w-full ${msg.role === 'ai' ? 'justify-start' : 'justify-end animate-in slide-in-from-right-4 duration-300'}`}>
              <div className={`flex gap-3 max-w-[85%] items-end ${msg.role === 'user' && 'flex-row-reverse'}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-white">
                    <Heart size={12} className="text-emerald-500" fill="currentColor" />
                  </div>
                )}
                <div className={`p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'ai' 
                  ? 'bg-white/80 backdrop-blur-sm text-emerald-900 border border-emerald-50 rounded-bl-none' 
                  : 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-br-none shadow-md shadow-emerald-200/50'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-50 px-5 py-4 rounded-[2rem] rounded-bl-none flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-white/40 border-t border-emerald-50 backdrop-blur-md">
          <div className="flex gap-3 bg-white/90 p-2 pl-3 rounded-[2rem] border border-emerald-100 shadow-sm focus-within:border-emerald-300 focus-within:shadow-md focus-within:shadow-emerald-100/50 transition-all">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tell OMI how you're feeling today..."
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-emerald-400/70 text-emerald-900"
            />
            <button 
              onClick={handleSend} 
              disabled={isTyping || !input.trim()} 
              className="w-12 h-12 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl flex items-center justify-center hover:shadow-lg hover:shadow-emerald-200/50 transition-all disabled:opacity-50 disabled:scale-95 disabled:shadow-none active:scale-90"
            >
              {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="ml-0.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}