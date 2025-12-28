// wishlist page for family app with real-time Firestore integration
// src/app/wishlist/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Plus, Loader2, Package, 
  Trash2, Heart, Calendar, Sparkles, Leaf 
} from 'lucide-react';
import { db, auth } from '@/lib/firebase/config';
import { 
  collection, addDoc, serverTimestamp, 
  query, orderBy, onSnapshot, deleteDoc, doc 
} from 'firebase/firestore';

export default function WishlistPage() {
  const router = useRouter();
  const [itemName, setItemName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  // Real-time listener to fetch wishlist items
  useEffect(() => {
    const q = query(collection(db, "wishlist"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));
      setItems(list);
    });

    return () => unsubscribe();
  }, []);

  const handleAddItem = async () => {
    if (!itemName.trim() || isAdding) return;
    setIsAdding(true);
    try {
      await addDoc(collection(db, "wishlist"), {
        name: itemName,
        addedBy: auth.currentUser?.uid,
        userName: auth.currentUser?.displayName || "Partner",
        createdAt: serverTimestamp(),
      });
      setItemName(''); // Clear input after success
    } catch (err) {
      console.error("Error adding item:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      await deleteDoc(doc(db, "wishlist", itemId));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] p-6 pb-20">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* 1. Botanical Header */}
        <header className="flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-widest"
          >
            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={16} />
            </div>
            Back
          </button>
          <div className="p-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-emerald-100">
            <Leaf className="text-emerald-500" size={20} />
          </div>
        </header>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-emerald-900 tracking-tight">Family Wishlist</h1>
          <p className="text-emerald-600/80 text-sm font-medium flex items-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            Envisioning our future nest together.
          </p>
        </div>

        {/* 2. Add New Item Card (Glassmorphism) */}
        <section className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-emerald-50 shadow-xl shadow-emerald-900/5">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400 mb-6 tracking-widest">
            <Package size={14} /> New Intention
          </div>
          
          <div className="flex flex-col gap-4">
            <input 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="What should we add to our nest?"
              className="w-full bg-emerald-50/50 border-2 border-transparent rounded-[2rem] p-5 text-emerald-900 placeholder:text-emerald-300 outline-none focus:border-emerald-200 focus:bg-white transition-all shadow-inner"
            />
            <button 
              onClick={handleAddItem}
              disabled={isAdding || !itemName.trim()}
              className="w-full bg-emerald-600 text-white font-bold py-5 rounded-[2rem] flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95 disabled:opacity-50 disabled:shadow-none"
            >
              {isAdding ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={20} /> Add to Family List</>}
            </button>
          </div>
        </section>

        {/* 3. Real-time Wishlist View */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xs font-black uppercase text-emerald-800 tracking-widest flex items-center gap-2">
              <Heart size={14} fill="currentColor" className="text-emerald-500" /> 
              Current Wishes ({items.length})
            </h2>
          </div>

          <div className="grid gap-4">
            {items.length === 0 ? (
              <div className="p-12 text-center bg-white/40 border-2 border-dashed border-emerald-100 rounded-[3rem]">
                <p className="text-emerald-800/40 text-sm font-medium italic">Your wishlist is empty. Start dreaming together!</p>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white/90 backdrop-blur-sm p-6 rounded-[2.5rem] border border-emerald-50 shadow-sm flex items-center justify-between hover:shadow-md hover:border-emerald-200 transition-all animate-in fade-in slide-in-from-bottom-2"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-inner">
                      <Heart size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900">{item.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> {item.userName}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                          <Calendar size={10} /> {item.createdAt?.toDate().toLocaleDateString() || 'Just now'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 text-slate-300 hover:text-rose-400 hover:bg-rose-50 rounded-2xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}