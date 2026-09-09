import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Layers, Database, Radio, Sparkles, Sliders } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('AI/ML');

  const categories = [
    {
      name: 'AI/ML',
      icon: Sparkles,
      skills: [
        { name: 'Generative AI & LLMs', power: 95 },
        { name: 'RAG Pipelines & ChromaDB', power: 92 },
        { name: 'Computer Vision (RT-DETR)', power: 88 },
        { name: 'Fine-Tuning & Prompting', power: 90 },
        { name: 'Zero/Few-Shot Learning', power: 85 },
        { name: 'Isolation Forest & XGBoost', power: 94 },
      ],
    },
    {
      name: 'Languages',
      icon: Terminal,
      skills: [
        { name: 'Python', power: 96 },
        { name: 'Java', power: 85 },
        { name: 'SQL', power: 90 },
        { name: 'JavaScript / TypeScript', power: 88 },
      ],
    },
    {
      name: 'ML Tools',
      icon: Cpu,
      skills: [
        { name: 'Scikit-learn', power: 92 },
        { name: 'Sentence Transformers', power: 90 },
        { name: 'PyMuPDF & Extraction', power: 94 },
        { name: 'Ollama & Local LLMs', power: 89 },
        { name: 'Pandas & NumPy', power: 95 },
      ],
    },
    {
      name: 'Embedded / IoT',
      icon: Radio,
      skills: [
        { name: 'ESP32 Prototyping', power: 94 },
        { name: 'MPU6050 & BMP280 Sensors', power: 92 },
        { name: 'NRF24L01 Wireless Mesh', power: 88 },
        { name: 'Ultrasonic Array Nodes', power: 90 },
        { name: 'Power & Circuit Management', power: 86 },
      ],
    },
    {
      name: 'Backend & Web',
      icon: Layers,
      skills: [
        { name: 'FastAPI & Flask', power: 92 },
        { name: 'SQLite Database', power: 88 },
        { name: 'React.js', power: 90 },
        { name: 'Tailwind CSS', power: 94 },
        { name: 'Leaflet.js GIS', power: 87 },
      ],
    },
    {
      name: 'Data & Analytics',
      icon: Database,
      skills: [
        { name: 'Exploratory Data Analysis (EDA)', power: 95 },
        { name: 'Matplotlib & Seaborn', power: 92 },
        { name: 'Tableau Dashboards', power: 86 },
      ],
    },
    {
      name: 'Soft Skills',
      icon: Sliders,
      skills: [
        { name: 'Leadership & Team Ownership', power: 94 },
        { name: 'Creative Problem Solving', power: 98 },
        { name: 'Attention to Engineering Detail', power: 96 },
        { name: 'Cross-Functional Collaboration', power: 92 },
        { name: 'Technical Communication', power: 90 },
      ],
    },
  ];

  const currentCat = categories.find((c) => c.name === activeCategory) || categories[0];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-left">
          <div className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase mb-1">
            // SYSTEM MODULE 05
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white tracking-wider flex items-center gap-3">
            <span>SYSTEMS & LOADOUT</span>
            <span className="h-[2px] w-24 bg-gradient-to-r from-[#00D9FF] to-transparent" />
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-1">
            TECHNICAL MATRIX & HARDWARE/SOFTWARE CAPACITY
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  soundFx.playClickSound();
                  setActiveCategory(cat.name);
                }}
                onMouseEnter={() => soundFx.playHoverBeep()}
                className={`px-4 py-2 font-mono text-xs rounded-sm border transition-all duration-200 flex items-center gap-2 hud-bracket ${
                  isActive
                    ? 'bg-[#00D9FF]/15 border-[#00D9FF] text-[#00D9FF] font-bold shadow-[0_0_15px_rgba(0,217,255,0.3)]'
                    : 'bg-[#0A0E14] border-slate-800 text-slate-400 hover:border-cyan-500/40 hover:text-[#00D9FF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Display: Radial Arc Reactor Core + Skill Power Meters */}
        <div className="hud-panel p-6 sm:p-10 rounded-sm hud-bracket relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Arc Reactor Core Display */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-cyan-500/20 pb-8 lg:pb-0 lg:pr-8">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
                {/* Rotating Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00D9FF]/50 animate-spin-cw-slow" />
                <div className="absolute inset-3 rounded-full border border-[#FFB000]/60 animate-spin-ccw-slow" />
                
                {/* Core */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#05080D] border-2 border-[#00D9FF] flex flex-col items-center justify-center text-center p-3 animate-arc-pulse shadow-[0_0_30px_#00D9FF]">
                  <currentCat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#00D9FF] mb-1" />
                  <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
                    {currentCat.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#FFB000] mt-1">
                    {currentCat.skills.length} MODULES READY
                  </span>
                </div>
              </div>
              <div className="mt-4 font-mono text-xs text-slate-400 text-center">
                // SYSTEM CALIBRATION: OPTIMAL
              </div>
            </div>

            {/* Right: Skill Animated Power Bars */}
            <div className="lg:col-span-7 space-y-5">
              <div className="font-mono text-xs text-[#00D9FF] tracking-wider mb-2">
                SELECTED LOADOUT MATRIX // {currentCat.name.toUpperCase()}
              </div>

              {currentCat.skills.map((skill, idx) => (
                <div key={idx} className="space-y-1.5" onMouseEnter={() => soundFx.playHoverBeep()}>
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-slate-200 font-semibold">{skill.name}</span>
                    <span className="text-[#FFB000] font-bold">{skill.power}% EFFICIENCY</span>
                  </div>
                  
                  {/* HUD Bar Track */}
                  <div className="w-full h-3 bg-[#05080D] border border-cyan-500/20 p-0.5 rounded-sm overflow-hidden relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-600 via-[#00D9FF] to-[#1FE3FF] rounded-sm shadow-[0_0_8px_#00D9FF]"
                      initial={{ width: '0%' }}
                      animate={{ width: `${skill.power}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
