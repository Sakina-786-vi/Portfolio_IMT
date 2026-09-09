import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, ArrowUpRight, Mail, Phone, ExternalLink, Download, Code } from 'lucide-react';
import { soundFx } from '../utils/sound';
import ArcReactor from './ArcReactor';

// Custom Crisp SVG Icons for Brand Networks
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

export default function HeroSection({ onNavigate }) {
  // Scramble decode effect for name
  const targetName = 'SAKINA RIZVI';
  const [displayName, setDisplayName] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%#@$&';

  // Role Cycler
  const roles = [
    'AI/ML Engineer — Generative AI · NLP · Computer Vision',
    'IoT + AI Systems Builder — Hardware to Cloud',
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentRoleText, setCurrentRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Decode scramble effect on mount
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayName(
        targetName
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return targetName[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= targetName.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for roles
  useEffect(() => {
    const fullText = roles[roleIndex];
    let timer;

    if (!isDeleting && currentRoleText.length < fullText.length) {
      timer = setTimeout(() => {
        setCurrentRoleText(fullText.substring(0, currentRoleText.length + 1));
      }, 50);
    } else if (!isDeleting && currentRoleText.length === fullText.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && currentRoleText.length > 0) {
      timer = setTimeout(() => {
        setCurrentRoleText(fullText.substring(0, currentRoleText.length - 1));
      }, 30);
    } else if (isDeleting && currentRoleText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentRoleText, isDeleting, roleIndex]);

  const socialLinks = [
    { label: 'EMAIL // DIRECT', icon: Mail, href: 'mailto:rizvisakeena16@gmail.com', value: 'rizvisakeena16@gmail.com' },
    { label: 'PHONE // COMMS', icon: Phone, href: 'tel:+918097318543', value: '+91 8097318543' },
    { label: 'LINKEDIN // PROFILE', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/sakina-rizvi-5ab860247', value: 'LinkedIn' },
    { label: 'GITHUB // REPOS', icon: GithubIcon, href: 'https://github.com/Sakina-786-vi', value: 'GitHub' },
    { label: 'PORTFOLIO // HQ', icon: ExternalLink, href: '#', value: 'Portfolio' },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* HUD Reticle Overlay Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Typography & Bio */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Eyebrow Status Chip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A0E14] border border-[#00D9FF]/40 rounded-sm text-xs font-mono text-[#00D9FF] hud-bracket"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping" />
            <span>SYSTEM MODULE // 01 — SYSTEM ONLINE</span>
          </motion.div>

          {/* Decoded Title */}
          <div>
            <h1 className="font-orbitron font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase drop-shadow-[0_0_25px_rgba(0,217,255,0.4)]">
              {displayName || 'SAKINA RIZVI'}
            </h1>

            {/* Dynamic Typewriter Role Tagline */}
            <div className="mt-3 min-h-[32px] flex items-center font-chakra text-lg sm:text-xl md:text-2xl text-[#FFB000] font-semibold">
              <Terminal className="w-5 h-5 mr-2 text-[#00D9FF] shrink-0" />
              <span>{currentRoleText}</span>
              <span className="w-2 h-6 bg-[#00D9FF] ml-1 animate-pulse" />
            </div>
          </div>

          {/* One-Line Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl bg-[#0A0E14]/40 p-4 border-l-2 border-[#00D9FF] backdrop-blur-sm"
          >
            Engineer building end-to-end intelligent systems — from ESP32 sensor nodes and RAG pipelines to fine-tuned voice and vision models. Comfortable across the full stack: hardware, ML, backend, and deployment.
          </motion.p>

          {/* HUD Action Chips (CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={() => {
                soundFx.playClickSound();
                onNavigate('projects');
              }}
              onMouseEnter={() => soundFx.playHoverBeep()}
              className="relative group px-6 py-3 bg-gradient-to-r from-cyan-500 to-[#00D9FF] text-black font-orbitron font-bold text-sm tracking-wider rounded-sm shadow-[0_0_20px_rgba(0,217,255,0.5)] hover:shadow-[0_0_35px_rgba(0,217,255,0.8)] transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span>VIEW PROJECTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                soundFx.playClickSound();
                onNavigate('contact');
              }}
              onMouseEnter={() => soundFx.playHoverBeep()}
              className="px-6 py-3 bg-[#0A0E14] border border-[#FFB000]/60 text-[#FFB000] font-orbitron font-bold text-sm tracking-wider rounded-sm hover:bg-[#FFB000]/10 hover:border-[#FFB000] shadow-[0_0_15px_rgba(255,176,0,0.2)] transition-all duration-300 flex items-center gap-2 hud-bracket"
            >
              <span>CONTACT ME</span>
              <Mail className="w-4 h-4 text-[#FFB000]" />
            </a>

            <a
              href="#dossier"
              onClick={(e) => {
                e.preventDefault();
                soundFx.playClickSound();
                onNavigate('about');
              }}
              onMouseEnter={() => soundFx.playHoverBeep()}
              className="px-5 py-3 bg-[#0A0E14]/80 border border-slate-700 text-slate-300 font-mono text-xs tracking-wider rounded-sm hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD DOSSIER</span>
            </a>
          </motion.div>

          {/* Social Callouts Header */}
          <div className="pt-4 flex items-center gap-3">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">// DIRECT COMMUNICATIONS:</span>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link, idx) => (
                <div key={idx} className="relative group">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHoverBeep()}
                    className="p-2.5 bg-[#0A0E14] border border-cyan-500/30 rounded-sm text-slate-300 hover:text-[#00D9FF] hover:border-[#00D9FF] hover:shadow-[0_0_12px_rgba(0,217,255,0.4)] transition-all block"
                  >
                    <link.icon className="w-4 h-4" />
                  </a>

                  {/* JARVIS Floating Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-30 whitespace-nowrap bg-[#0A0E14] border border-[#00D9FF] px-2.5 py-1 rounded-sm shadow-[0_0_15px_rgba(0,217,255,0.3)]">
                    <div className="font-mono text-[10px] text-[#00D9FF]">{link.label}</div>
                    <div className="font-mono text-[10px] text-slate-300">{link.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Shared interactive Arc Reactor */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center">
            <ArcReactor size="large" />

            {/* Surrounding Telemetry HUD Markers */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0A0E14] border border-[#00D9FF]/30 px-3 py-0.5 rounded text-[10px] font-mono text-[#00D9FF]">
              SYSTEM RADIUS // 360°
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0A0E14] border border-[#FFB000]/30 px-3 py-0.5 rounded text-[10px] font-mono text-[#FFB000]">
              CORE FREQ // 8.93 GHz
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
