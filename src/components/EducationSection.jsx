import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function EducationSection() {
  const educationList = [
    {
      degree: 'B.E. Computer Engineering',
      institution: 'Shree L.R. Tiwari College of Engineering',
      location: 'Mumbai, Maharashtra',
      period: '2024 – Present',
      score: 'CGPA (SE): 8.93',
      scoreLabel: 'DISTINCTION GRADE',
      details:
        'Focus on Machine Learning, Neural Networks, IoT Microcontrollers, Database Systems, Data Structures, and Software Architecture.',
    },
    {
      degree: 'Higher Secondary Certificate (HSC Science)',
      institution: 'Royal College of Arts, Science and Commerce',
      location: 'Mumbai, Maharashtra',
      period: '2022 – 2024',
      score: 'Score: 93.4%',
      scoreLabel: 'TOP PERCENTILE',
      details:
        'Rigorous foundation in Physics, Chemistry, Mathematics, and Computer Science fundamentals.',
    },
  ];

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-left">
          <div className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase mb-1">
            // SYSTEM MODULE 07
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white tracking-wider flex items-center gap-3">
            <span>TRAINING FACILITY RECORDS</span>
            <span className="h-[2px] w-24 bg-gradient-to-r from-[#00D9FF] to-transparent" />
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-1">
            ACADEMIC INSTITUTIONS & ENGINEERING ACCREDITATIONS
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              onMouseEnter={() => soundFx.playHoverBeep()}
              className="hud-panel p-6 sm:p-8 rounded-sm hud-bracket hud-panel-hover flex flex-col justify-between"
            >
              <div>
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 text-[#00D9FF] font-mono text-xs font-bold rounded">
                    {edu.score}
                  </span>
                  <GraduationCap className="w-6 h-6 text-[#00D9FF]" />
                </div>

                {/* Degree Title */}
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                  {edu.degree}
                </h3>
                
                {/* Institution */}
                <div className="font-chakra text-base text-[#FFB000] font-semibold mb-2">
                  {edu.institution}
                </div>

                {/* Location & Period */}
                <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {edu.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {edu.period}
                  </span>
                </div>

                {/* Description */}
                <p className="font-sans text-slate-300 text-sm leading-relaxed">
                  {edu.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-500/10 flex justify-between items-center font-mono text-xs text-slate-400">
                <span className="text-slate-500">// ACADEMIC STATUS:</span>
                <span className="text-emerald-400 font-bold">{edu.scoreLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
