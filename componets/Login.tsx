import React, { useState } from 'react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (session: { username: string; email: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'auth' | 'otp'>('auth');
  const [loading, setLoading] = useState(false);

  const primaryEmail = "joemunga329@gmail.com";

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation of actual email dispatch logic
    console.log(`>>> SECURITY PROTOCOL: Dispatching OTP to ${email}`);
    
    await new Promise(resolve => setTimeout(resolve, 1800));
    setStep('otp');
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Standard verification for mock demo or bypass for primary developer email
    if (otp === '123456' || email === primaryEmail) {
      onLogin({ username: username || email.split('@')[0], email });
    } else {
      setLoading(false);
      alert("Verification Failed: INVALID_OTP_CODE");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative font-tech">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-morphism p-10 rounded-[40px] shadow-2xl relative z-10 border-2 border-cyan-500/20"
      >
        {/* Futuristic HUD corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 rounded-tl-[40px] opacity-60" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-[40px] opacity-60" />

        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo size="md" />
          </div>
          <h2 className="text-3xl font-black text-white glow-text tracking-tighter uppercase mb-2">
            {step === 'otp' ? 'Verification' : isSignUp ? 'Registry' : 'Authentication'}
          </h2>
          <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest">
             <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
             <span>Secure Terminal L-329</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'auth' ? (
            <motion.form 
              key="auth-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleInitialSubmit} 
              className="space-y-6"
            >
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Operator Handle</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50" size={16} />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="MUNGA_OPERATOR_01"
                      className="w-full bg-slate-900 border border-cyan-500/20 rounded-2xl pl-12 pr-5 py-4 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Secure Link Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@munga.intel"
                    className="w-full bg-slate-900 border border-cyan-500/20 rounded-2xl pl-12 pr-5 py-4 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full py-5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black rounded-2xl shadow-xl shadow-cyan-600/20 transition-all flex items-center justify-center space-x-3"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    <span className="uppercase tracking-[0.2em] text-sm">Initialize Session</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-[10px] font-mono text-slate-500 hover:text-cyan-400 transition-colors py-2 uppercase tracking-widest"
              >
                {isSignUp ? '>>> RETURN TO LOGIN PROTOCOL' : '>>> INITIALIZE NEW AGENT REGISTRY'}
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="otp-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleVerifyOtp} 
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-center space-x-3 text-emerald-400">
                  <ShieldCheck size={20} />
                  <span className="text-[10px] font-mono uppercase tracking-widest">OTP DISPATCHED TO: {email}</span>
                </div>
                <div className="flex justify-center gap-3">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    autoFocus
                    className="w-full bg-slate-900 border border-cyan-500/20 rounded-2xl px-5 py-5 text-center text-3xl font-black font-tech tracking-[0.4em] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-800"
                    placeholder="000000"
                  />
                </div>
                <p className="text-[9px] font-mono text-slate-600 uppercase italic">Verification code valid for 10 minutes.</p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/20 transition-all uppercase tracking-widest text-sm"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Finalize Authentication'}
              </button>
              
              {/* Escape special characters <<< to avoid JSX parsing error identifying 'RESET' as a variable */}
              <button
                type="button"
                onClick={() => setStep('auth')}
                className="w-full text-[10px] font-mono text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
              >
                {'<<< RESET AUTH PROTOCOL'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-8 border-t border-cyan-500/10 text-center">
          <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            MUNGA_OPERATING_SYSTEM // v4.0.2_SECURE
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;