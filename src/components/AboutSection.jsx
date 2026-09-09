import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Shield, MapPin, Award, BookOpen, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function AboutSection() {
  const stats = [
    { label: 'CGPA (BE Computer)', value: '8.93', detail: 'SLRTCE Mumbai', icon: Award, color: 'text-[#00D9FF]' },
    { label: 'HSC Science', value: '93.4%', detail: 'Royal College', icon: BookOpen, color: 'text-[#FFB000]' },
    { label: 'LOCATION', value: 'Mumbai, IN', detail: 'Primary Base', icon: MapPin, color: 'text-[#00D9FF]' },
    { label: 'CLEARANCE', value: 'Level 8', detail: 'Full Stack AI + IoT', icon: Shield, color: 'text-emerald-400' },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase mb-1">
            // SYSTEM MODULE 02
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white tracking-wider flex items-center gap-3">
            <span>PILOT PROFILE</span>
            <span className="h-[2px] w-24 bg-gradient-to-r from-[#00D9FF] to-transparent" />
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-1">
            CLASSIFICATION: STARK INDUSTRIES DOSSIER // ID: SR-893
          </p>
        </div>

        {/* Dossier Card Panel */}
        <div className="hud-panel p-6 sm:p-10 rounded-sm hud-bracket relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Arc Reactor Photo Frame */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                {/* Outer Rotating Arc Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00D9FF]/60 animate-spin-cw-slow" />
                <div className="absolute inset-2 rounded-full border border-[#FFB000]/50 animate-spin-ccw-slow" />
                
                {/* Avatar Core */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#0A0E14] border-2 border-[#00D9FF] overflow-hidden flex flex-col items-center justify-center p-4 relative shadow-[0_0_25px_rgba(0,217,255,0.3)]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-950/60 to-slate-950/90 flex flex-col items-center justify-center text-center p-2">
                    <UserCheck className="w-14 h-14 text-[#00D9FF] mb-2 filter drop-shadow-[0_0_10px_#00D9FF]" />
                    <span className="font-orbitron font-bold text-xs text-white">SAKINA RIZVI</span>
                    <span className="font-mono text-[10px] text-[#FFB000]">OPERATIVE ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="font-mono text-[11px] text-slate-400 border border-slate-700 px-3 py-1 rounded bg-[#0A0E14]">
                  STATUS: VERIFIED & CLEAR
                </span>
              </div>
            </div>

            {/* Right Column: Key Stats & Career Bio */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Stats HUD Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => soundFx.playHoverBeep()}
                    className="p-3 bg-[#0A0E14]/80 border border-cyan-500/20 rounded-sm hover:border-[#00D9FF]/60 transition-all hud-bracket"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-slate-400 uppercase">{stat.label}</span>
                      <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    </div>
                    <div className={`font-orbitron text-xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                      {stat.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Combined Detailed Bio */}
              <div className="bg-[#05080D]/80 p-5 rounded border border-cyan-500/15 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#00D9FF]">
                  <Sparkles className="w-4 h-4 text-[#FFB000]" />
                  <span>// EXECUTIVE SUMMARY</span>
                </div>
                <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
                  AI/ML and IoT engineer in training with hands-on experience building Generative AI, NLP, and Computer Vision systems end-to-end, alongside embedded hardware prototyping — from ESP32-based sensor nodes to retrieval-augmented generation pipelines and fine-tuned voice and detection models.
                </p>
                <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
                  Comfortable across the full lifecycle: hardware prototyping, data processing, training/fine-tuning, evaluation, backend integration, and cloud/edge deployment.
                </p>
              </div>

              {/* Technical Capabilities Matrix */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 rounded-sm">
                  ⚡ Generative AI & RAG
                </span>
                <span className="px-3 py-1 bg-amber-950/40 border border-amber-500/30 text-amber-300 rounded-sm">
                  ⚡ ESP32 Sensor Hardware Mesh
                </span>
                <span className="px-3 py-1 bg-blue-950/40 border border-blue-500/30 text-blue-300 rounded-sm">
                  ⚡ Computer Vision (RT-DETR)
                </span>
                <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded-sm">
                  ⚡ Voice Synthesis & TTS
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
