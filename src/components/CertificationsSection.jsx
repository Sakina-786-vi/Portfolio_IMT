import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function CertificationsSection() {
  const certifications = [
    {
      title: 'Applied AI Engineer',
      issuer: 'Surfboard Ventures / edQuest',
      year: '2026',
      badgeId: 'SURF-AI-2026-08',
      level: 'LEVEL 9 CLEARANCE',
    },
    {
      title: 'Generative AI Certification',
      issuer: 'Nasscom',
      year: '2025',
      badgeId: 'NASSCOM-GENAI-99',
      level: 'LEVEL 8 CLEARANCE',
    },
    {
      title: 'Artificial Intelligence & Machine Learning',
      issuer: 'Pregrad',
      year: '2025',
      badgeId: 'PREGRAD-AIML-404',
      level: 'LEVEL 8 CLEARANCE',
    },
    {
      title: 'App Development Bootcamp',
      issuer: 'Shree L.R. Tiwari College of Engineering',
      year: '2024',
      badgeId: 'SLRTCE-BOOTCAMP-22',
      level: 'LEVEL 7 CLEARANCE',
    },
    {
      title: 'Python Core & Advanced Course',
      issuer: 'Shree L.R. Tiwari College of Engineering',
      year: '2024',
      badgeId: 'SLRTCE-PY-101',
      level: 'LEVEL 7 CLEARANCE',
    },
  ];

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-left">
          <div className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase mb-1">
            // SYSTEM MODULE 06
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white tracking-wider flex items-center gap-3">
            <span>CLEARANCE BADGES</span>
            <span className="h-[2px] w-24 bg-gradient-to-r from-[#00D9FF] to-transparent" />
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-1">
            VERIFIED INDUSTRY CERTIFICATIONS & DEPLOYMENT LICENSES
          </p>
        </div>

        {/* Grid of Clearance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onMouseEnter={() => soundFx.playHoverBeep()}
              className="hud-panel p-6 rounded-sm hud-bracket hud-panel-gold group flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-[#FFB000] border border-[#FFB000]/40 px-2 py-0.5 rounded bg-amber-950/30">
                    {cert.level}
                  </span>
                  <Award className="w-6 h-6 text-[#FFB000] group-hover:scale-110 transition-transform filter drop-shadow-[0_0_8px_#FFB000]" />
                </div>

                {/* Title */}
                <h3 className="font-orbitron font-bold text-lg text-white mb-1 group-hover:text-[#FFB000] transition-colors">
                  {cert.title}
                </h3>
                <div className="font-chakra text-xs text-slate-300 mb-4">
                  {cert.issuer}
                </div>
              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                </span>
                <span className="text-[#FFB000]">{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
