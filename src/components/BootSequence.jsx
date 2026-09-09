import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING STARK_OS v4.2...');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if session flag is set
    const hasBooted = sessionStorage.getItem('jarvis_booted');
    if (hasBooted) {
      setIsVisible(false);
      onComplete();
      return;
    }

    soundFx.playBootChime();

    const statusSteps = [
      { p: 15, text: 'ESTABLISHING SECURE STARK UPLINK...' },
      { p: 40, text: 'CALIBRATING ARC REACTOR POWER CORE...' },
      { p: 65, text: 'LOADING NEURAL NETWORKS & EMBEDDED SPECS...' },
      { p: 85, text: 'DECRYPTING SAKINA_RIZVI.DOSSIER...' },
      { p: 100, text: 'SYSTEM ONLINE. WELCOME COMMANDER.' },
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < statusSteps.length) {
        setProgress(statusSteps[stepIndex].p);
        setStatusText(statusSteps[stepIndex].text);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          finishBoot();
        }, 400);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const finishBoot = () => {
    sessionStorage.setItem('jarvis_booted', 'true');
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-[#05080D] flex flex-col items-center justify-center p-4 cursor-pointer select-none crt-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: 'easeInOut' } }}
        onClick={finishBoot}
      >
        {/* Background Grid & Scanline */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.12)_0%,transparent_70%)] pointer-events-none" />

        {/* Central Spinning Arc Reactor */}
        <div className="relative w-40 h-40 md:w-52 md:h-52 flex items-center justify-center mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00D9FF]/40 animate-spin-cw-slow" />
          {/* Middle Ring */}
          <div className="absolute inset-3 rounded-full border border-cyan-400/60 border-t-transparent animate-spin-ccw-slow" />
          {/* Golden Highlight Ring */}
          <div className="absolute inset-6 rounded-full border border-[#FFB000]/40 border-b-transparent animate-spin-cw-fast" />
          {/* Core Glow */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyan-400/20 border-2 border-[#00D9FF] flex items-center justify-center animate-arc-pulse shadow-[0_0_40px_#00D9FF]">
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-[#00D9FF] animate-pulse" />
          </div>
        </div>

        {/* Telemetry Title */}
        <div className="text-center max-w-md w-full px-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-[#00D9FF]" />
            <span className="font-mono text-xs tracking-widest text-[#00D9FF] uppercase">
              JARVIS OS // AUTHORIZATION LEVEL 8
            </span>
          </div>

          <h1 className="font-orbitron text-xl md:text-2xl font-bold tracking-wider text-white mb-4">
            SAKINA RIZVI
          </h1>

          {/* Progress Bar Container */}
          <div className="w-full bg-[#0A0E14] border border-[#00D9FF]/30 p-1 rounded-sm relative overflow-hidden mb-3 hud-bracket">
            <motion.div
              className="h-2 bg-gradient-to-r from-cyan-600 via-[#00D9FF] to-[#1FE3FF] rounded-sm shadow-[0_0_12px_#00D9FF]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Telemetry Status Line */}
          <div className="flex justify-between items-center font-mono text-xs text-slate-400">
            <span className="text-[#00D9FF]">{statusText}</span>
            <span className="text-[#FFB000] font-bold">{progress}%</span>
          </div>

          {/* Override CTA */}
          <button
            onClick={finishBoot}
            className="mt-8 font-mono text-xs text-slate-400 hover:text-[#00D9FF] transition-colors flex items-center justify-center gap-2 mx-auto border border-slate-700 hover:border-[#00D9FF]/50 px-4 py-1.5 rounded-full bg-[#0A0E14]/80"
          >
            <span>[ CLICK ANYWHERE TO OVERRIDE ]</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
