import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, Activity, Terminal } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function ExperienceSection() {
  const experiences = [
    {
      role: 'Tech Intern',
      company: 'Neeyat AI',
      period: 'Mar 2026 – Aug 2026',
      badge: 'CURRENT / ACTIVE',
      badgeColor: 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400',
      description:
        'Diagnosed and resolved critical bottlenecks across AI tooling and workflows, enhancing system efficiency through creative troubleshooting.',
      skills: ['AI Tooling', 'Workflow Optimization', 'System Debugging', 'Process Engineering'],
    },
    {
      role: 'Gen AI Intern',
      company: 'Cyart',
      period: 'Jul 2025 – Jan 2026',
      badge: 'COMPLETED LOG',
      badgeColor: 'bg-cyan-950/60 border-cyan-500/50 text-[#00D9FF]',
      description:
        'Co-engineered core components of Text-to-Speech (TTS) pipelines, supporting cross-functional team projects from development to deployment.',
      skills: ['Text-to-Speech', 'Generative AI', 'Audio ML Pipelines', 'Full Stack Deployment'],
    },
    {
      role: 'Data Analyst Intern',
      company: 'Treadalytrix',
      period: 'Jun 2025 – Jul 2025',
      badge: 'COMPLETED LOG',
      badgeColor: 'bg-amber-950/60 border-amber-500/50 text-[#FFB000]',
      description:
        'Translated raw business data into strategic insights by designing data models and performing rigorous statistical analysis to guide executive decisions.',
      skills: ['Data Modeling', 'Statistical Analysis', 'Executive Reporting', 'Python / SQL'],
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase mb-1">
            // SYSTEM MODULE 03
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white tracking-wider flex items-center gap-3">
            <span>MISSION LOG</span>
            <span className="h-[2px] w-24 bg-gradient-to-r from-[#00D9FF] to-transparent" />
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-1">
            OPERATIONAL HISTORY & PROFESSIONAL DEPLOYMENTS
          </p>
        </div>

        {/* Vertical Mission Timeline */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onMouseEnter={() => soundFx.playHoverBeep()}
              className="relative group"
            >
              {/* Timeline Connector Ring Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#05080D] border-2 border-[#00D9FF] group-hover:border-[#FFB000] flex items-center justify-center transition-colors shadow-[0_0_10px_#00D9FF]">
                <div className="w-2 h-2 rounded-full bg-[#00D9FF] group-hover:bg-[#FFB000] animate-pulse" />
              </div>

              {/* Mission Card Panel */}
              <div className="hud-panel p-6 rounded-sm hud-bracket hud-panel-hover">
                
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="font-mono text-xs text-[#00D9FF] flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#FFB000]" />
                      <span className="font-bold text-white text-base sm:text-lg font-orbitron">{exp.role}</span>
                      <span className="text-slate-400 font-sans">@</span>
                      <span className="text-[#00D9FF] font-semibold font-chakra text-base">{exp.company}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded border text-[10px] font-mono ${exp.badgeColor}`}>
                      {exp.badge}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-cyan-500/10">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 bg-[#0A0E14] border border-cyan-500/20 text-slate-300 font-mono text-xs rounded-sm hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
