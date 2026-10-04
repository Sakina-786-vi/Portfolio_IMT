import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Layers, ShieldCheck, Database, Radio, Terminal, ExternalLink, Code } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-[#05080D]/90 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative max-w-3xl w-full bg-[#0A0E14] border border-[#00D9FF]/50 rounded-sm p-6 sm:p-8 shadow-[0_0_50px_rgba(0,217,255,0.25)] z-10 hud-bracket my-8"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
            <div>
              <div className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase">
                // SYSTEM SCHEMATIC // DEEP DIAGNOSTIC
              </div>
              <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white tracking-wider">
                {project.title}
              </h3>
            </div>
            <button
              onClick={() => {
                soundFx.playClickSound();
                onClose();
              }}
              className="p-2 border border-slate-700 rounded text-slate-400 hover:border-[#00D9FF] hover:text-[#00D9FF] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Details Content */}
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            
            {/* Overview */}
            <div>
              <h4 className="font-mono text-xs text-[#FFB000] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> OBJECTIVE & ARCHITECTURE
              </h4>
              <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Architecture Highlights / Key Modules */}
            {project.highlights && (
              <div>
                <h4 className="font-mono text-xs text-[#00D9FF] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> CORE SUBSYSTEM BREAKDOWN
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#05080D] border border-cyan-500/20 rounded-sm text-xs font-mono text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-[#00D9FF] font-bold">[{idx + 1}]</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div>
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                DEPLOYED TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-cyan-950/40 border border-[#00D9FF]/40 text-[#00D9FF] font-mono text-xs rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-cyan-500/20 flex flex-wrap justify-end gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClickSound()}
                className="px-5 py-2 border border-[#00D9FF]/50 text-[#00D9FF] font-orbitron font-bold text-xs rounded-sm hover:bg-cyan-500/10 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                VIEW GITHUB
              </a>
            )}
            <button
              onClick={() => {
                soundFx.playClickSound();
                onClose();
              }}
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-[#00D9FF] text-black font-orbitron font-bold text-xs rounded-sm hover:shadow-[0_0_20px_#00D9FF] transition-all"
            >
              CLOSE DIAGNOSTIC
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
