import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, Activity, Radio } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Navbar({ activeSection, isMuted, setIsMuted }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'SYSTEMS' },
    { id: 'about', label: 'DOSSIER' },
    { id: 'experience', label: 'LOGS' },
    { id: 'projects', label: 'ARSENAL' },
    { id: 'skills', label: 'LOADOUT' },
    { id: 'certifications', label: 'CLEARANCE' },
    { id: 'education', label: 'ACADEMY' },
    { id: 'contact', label: 'UPLINK' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newMuteState = soundFx.toggleMute();
    setIsMuted(newMuteState);
  };

  const scrollToSection = (id) => {
    soundFx.playClickSound();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05080D]/90 backdrop-blur-md border-b border-[#00D9FF]/20 shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      {/* Upper Diagnostics Telemetry Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-[#0A0E14]/80 border-b border-cyan-500/10 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-400">
            <Activity className="w-3 h-3 animate-pulse" /> SYS STATUS: OPTIMAL
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-[#00D9FF]">
            <Shield className="w-3 h-3" /> CLEARANCE: LEVEL 8
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">PROTOCOLS: JARVIS_v4.2</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[#FFB000]">
            <Radio className="w-3 h-3 animate-pulse" /> MUMBAI_NODE // IN
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400/80">LAT: 19.0760° N, LONG: 72.8777° E</span>
        </div>
      </div>

      {/* Main HUD Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo / Reticle Badge */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 group focus:outline-none"
          onMouseEnter={() => soundFx.playHoverBeep()}
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#00D9FF] group-hover:rotate-180 transition-transform duration-700" />
            <div className="absolute inset-1 rounded-full border border-dashed border-[#FFB000]/60" />
            <span className="font-orbitron font-black text-sm text-[#00D9FF]">SR</span>
          </div>
          <div className="text-left">
            <div className="font-orbitron text-sm font-bold tracking-widest text-white group-hover:text-[#00D9FF] transition-colors">
              SAKINA RIZVI
            </div>
            <div className="font-mono text-[10px] text-cyan-400/70 tracking-tighter">
              AI/ML & IoT ENGINEER
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0A0E14]/60 border border-[#00D9FF]/20 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                onMouseEnter={() => soundFx.playHoverBeep()}
                className={`relative px-3 py-1 font-mono text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-[#00D9FF] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {/* Targeting reticle indicators on active link */}
                {isActive && (
                  <>
                    <span className="absolute left-0 top-0 text-[#00D9FF] text-[10px]">⌐</span>
                    <span className="absolute right-0 bottom-0 text-[#00D9FF] text-[10px]">¬</span>
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
                  </>
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Audio Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => soundFx.playHoverBeep()}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-mono transition-all duration-200 hud-bracket ${
              !isMuted
                ? 'bg-[#00D9FF]/15 border-[#00D9FF] text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.3)]'
                : 'bg-[#0A0E14] border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
            title={!isMuted ? 'Mute Audio FX' : 'Enable JARVIS Audio FX'}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#00D9FF] animate-pulse" />
                <span className="hidden sm:inline text-[11px]">AUDIO: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-[11px]">AUDIO: MUTED</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundFx.playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-slate-300 hover:text-[#00D9FF] border border-cyan-500/20 rounded-sm bg-[#0A0E14]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile HUD Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0E14]/95 border-b border-[#00D9FF]/30 px-6 py-6 backdrop-blur-xl shadow-2xl animate-fadeIn">
          <div className="font-mono text-xs text-[#00D9FF] mb-4 tracking-widest border-b border-cyan-500/20 pb-2">
            // NAVIGATE STARK MODULES
          </div>
          <div className="grid grid-cols-2 gap-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`p-3 text-left font-mono text-xs rounded border transition-all ${
                    isActive
                      ? 'bg-[#00D9FF]/15 border-[#00D9FF] text-[#00D9FF] font-bold'
                      : 'bg-[#05080D] border-slate-800 text-slate-300 hover:border-cyan-500/40'
                  }`}
                >
                  <span className="text-[10px] text-slate-500 block">MODULE //</span>
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
