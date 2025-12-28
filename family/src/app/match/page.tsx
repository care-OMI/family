// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { onSnapshot, doc } from 'firebase/firestore';
// import { auth, db } from '@/lib/firebase/config';
// import { createInvite, joinFamily } from '@/lib/firebase/match';
// import { Copy, Check, ArrowRight, Loader2, Link2 } from 'lucide-react';

// export default function MatchPage() {
//   const router = useRouter();
//   const [myCode, setMyCode] = useState('');
//   const [inputCode, setInputCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (!user) return;

//     const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
//       if (docSnap.exists() && docSnap.data().partnerId) {
//         router.push('/dashboard'); 
//       }
//     });
//     return () => unsub();
//   }, [router]);

//   const handleGenerate = async () => {
//     const user = auth.currentUser;
//     if (!user) return;
//     setLoading(true);
//     try {
//       const code = await createInvite(user.uid, 'wife'); 
//       setMyCode(code);
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleJoin = async () => {
//     const user = auth.currentUser;
//     if (!user || !inputCode) return;
//     setLoading(true);
//     try {
//       await joinFamily(inputCode, user.uid);
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 text-slate-900">
//       <div className="w-full max-w-sm space-y-8">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//             <Link2 className="text-white" size={32} />
//           </div>
//           <h1 className="text-2xl font-bold italic">OMI Link</h1>
//           <p className="text-slate-400 text-sm mt-1 tracking-tight">Connect with your partner to start syncing.</p>
//         </div>

//         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Your Invite Code</p>
//           {myCode ? (
//             <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
//               <code className="text-2xl font-mono font-bold text-rose-500">{myCode}</code>
//               <button 
//                 onClick={() => { navigator.clipboard.writeText(myCode); setCopied(true); }}
//                 className="p-2 text-slate-400"
//               >
//                 {copied ? <Check className="text-green-500" size={20} /> : <Copy size={20} />}
//               </button>
//             </div>
//           ) : (
//             <button 
//               onClick={handleGenerate}
//               disabled={loading}
//               className="w-full py-4 bg-rose-50 text-rose-600 font-bold rounded-2xl hover:bg-rose-100 transition-all"
//             >
//               Generate Code
//             </button>
//           )}
//         </div>

//         <div className="relative flex items-center">
//           <div className="flex-grow border-t border-slate-100"></div>
//           <span className="mx-4 text-[10px] font-black text-slate-200">OR</span>
//           <div className="flex-grow border-t border-slate-100"></div>
//         </div>

//         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Enter Partner's Code</p>
//           <div className="flex gap-2">
//             <input 
//               type="text" 
//               placeholder="E.G. A1B2C3"
//               value={inputCode}
//               onChange={(e) => setInputCode(e.target.value.toUpperCase())}
//               className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-2xl font-mono text-center text-xl uppercase focus:border-rose-400 outline-none"
//             />
//             <button 
//               onClick={handleJoin}
//               disabled={loading || !inputCode}
//               className="bg-slate-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-black transition-all disabled:bg-slate-200"
//             >
//               {loading ? <Loader2 className="animate-spin" /> : <ArrowRight size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }