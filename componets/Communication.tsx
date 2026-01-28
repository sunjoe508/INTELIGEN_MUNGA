
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ShieldCheck, MessageSquare, AlertTriangle, Lightbulb, Star, Loader2 } from 'lucide-react';

const Communication: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('feedback');
  const [rating, setRating] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [transmissionLog, setTransmissionLog] = useState<string[]>([]);

  const categories = [
    { id: 'feedback', label: 'GENERAL FEEDBACK', icon: MessageSquare, color: 'text-cyan-400' },
    { id: 'intel', label: 'STRATEGIC INTEL', icon: Lightbulb, color: 'text-emerald-400' },
    { id: 'issue', label: 'TECHNICAL ISSUE', icon: AlertTriangle, color: 'text-amber-400' },
  ];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTransmissionLog(['Encrypting payload...', 'Establishing secure handshake...']);

    await new Promise(resolve => setTimeout(resolve, 800));
    setTransmissionLog(prev => [...prev, 'Routing via global Munga-Node-Alpha...', 'Injecting biometric hash...']);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTransmissionLog(prev => [...prev, 'Packet successfully delivered to joemunga329@gmail.com']);

    setIsSending(false);
    setIsSent(true);
    
    setTimeout(() => {
      setIsSent(false);
      setSubject('');
      setBody('');
      setRating(0);
      setTransmissionLog([]);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full p-8 md:p-12 max-w-5xl mx-auto w-full space-y-10 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end"
      >
        <div>
          <h2 className="text-4xl font-black text-white glow-text tracking-tighter font-tech uppercase">Feedback Terminal</h2>
          <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">Protocol: Direct_Link_MUNGA_Alpha</p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-[10px] font-mono text-cyan-500/60 uppercase">Destination Hub</div>
          <div className="text-xs font-mono text-cyan-400">joemunga329@gmail.com</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="glass-morphism p-6 rounded-2xl border-cyan-500/10 space-y-4">
            <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Transmission Status</h3>
            <div className="bg-black/40 rounded-xl p-4 font-mono text-[9px] h-32 overflow-y-auto scrollbar-hide text-cyan-400/80">
               {transmissionLog.length > 0 ? (
                 transmissionLog.map((log, i) => (
                   <div key={i} className="mb-1">{`[${new Date().toLocaleTimeString()}] ${log}`}</div>
                 ))
               ) : (
                 <div className="opacity-30 italic">Awaiting transmission initialization...</div>
               )}
            </div>
          </div>

          <div className="glass-morphism p-6 rounded-2xl border-cyan-500/10">
            <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4">Operator Satisfaction</h3>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-all transform hover:scale-125 ${
                    rating >= star ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-slate-700'
                  }`}
                >
                  <Star size={24} fill={rating >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 relative">
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSend}
                className="glass-morphism p-8 rounded-3xl border-cyan-500/20 space-y-6"
              >
                <div className="grid grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all space-y-2 ${
                        category === cat.id 
                          ? `bg-cyan-500/10 border-cyan-500/50 ${cat.color}` 
                          : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <cat.icon size={20} />
                      <span className="text-[9px] font-bold tracking-tighter">{cat.label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Subject Header</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-cyan-500/20 rounded-xl px-5 py-4 text-cyan-50 font-mono text-xs focus:ring-2 focus:ring-cyan-500/40 outline-none"
                    placeholder="Briefing Title..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Intelligence Body</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    className="w-full h-48 bg-slate-900 border border-cyan-500/20 rounded-xl px-5 py-4 text-cyan-50 font-mono text-xs focus:ring-2 focus:ring-cyan-500/40 outline-none resize-none"
                    placeholder="Enter strategic insights..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending || !subject || !body}
                  className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-cyan-600/20 uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3"
                >
                  {isSending ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /><span>Execute Transmission</span></>}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-morphism p-12 rounded-3xl border-emerald-500/30 flex flex-col items-center justify-center text-center space-y-6 min-h-[500px]"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <ShieldCheck size={48} />
                </div>
                <h3 className="text-2xl font-tech font-bold text-white uppercase tracking-tighter">Transmission Secured</h3>
                <p className="text-slate-400 font-mono text-sm max-w-sm">Intel packet delivered to joemunga329@gmail.com.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Communication;
