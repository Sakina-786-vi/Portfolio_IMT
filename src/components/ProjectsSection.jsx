import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldCheck, Terminal, Layers, ArrowUpRight, Filter, Eye } from 'lucide-react';
import { soundFx } from '../utils/sound';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'minesentinel',
      title: 'MineSentinel AI',
      githubUrl: 'https://github.com/Sakina-786-vi/MineSentinel_AI',
      subtitle: 'Real-Time Mine Subsidence Early-Warning System',
      category: 'Hardware+IoT',
      badge: 'HARDWARE + SOFTWARE',
      badgeColor: 'border-[#FFB000] text-[#FFB000] bg-amber-950/40',
      icon: Cpu,
      description:
        'AI-enabled, low-cost real-time mine subsidence early-warning system for underground coal mines combining ESP32 multi-sensor hardware nodes with two-stage ML risk prediction.',
      longDescription:
        'MineSentinel AI is an end-to-end IoT and Machine Learning solution designed for dangerous underground coal mining environments. It deploys custom ESP32 sensor nodes equipped with MPU6050 tilt/vibration meters, BMP280 pressure/temp units, and ultrasonic depth sensors over NRF24L01 wireless mesh networks to continuously log geological shifting and environmental metrics.',
      highlights: [
        'ESP32 sensor nodes with NRF24L01 mesh wireless communications',
        'Li-Po power management with onboard LED/buzzer safety warnings',
        'Two-Stage ML Pipeline: Isolation Forest (Anomaly) + XGBoost (Subsidence Risk)',
        'FastAPI/Flask + SQLite telemetry aggregation backend',
        'Interactive Leaflet.js GIS dashboard for real-time risk map visualization',
      ],
      tags: ['ESP32', 'Isolation Forest', 'XGBoost', 'FastAPI', 'Leaflet.js', 'IoT'],
    },
    {
      id: 'visionvault',
      title: 'VisionVault',
      githubUrl: 'https://github.com/Sakina-786-vi/VisionVault',
      subtitle: 'Offline-First Personal RAG Knowledge System',
      category: 'AI-Software',
      badge: 'RAG & PRIVACY',
      badgeColor: 'border-[#00D9FF] text-[#00D9FF] bg-cyan-950/40',
      icon: Layers,
      description:
        'Modular, fully local retrieval-augmented generation pipeline with PDF ingestion, semantic vector search via ChromaDB, and zero external cloud data dependencies.',
      longDescription:
        'VisionVault guarantees 100% data privacy and offline operational capability for document analysis. Built with PyMuPDF document extraction, custom recursive token chunking, and local BAAI/bge-small-en-v1.5 embeddings stored inside a ChromaDB vector database. Architected with an Ollama local LLM execution layer for private querying.',
      highlights: [
        'PyMuPDF automated PDF ingestion & structure-aware chunking',
        'BAAI/bge-small-en-v1.5 high-density local embeddings',
        'ChromaDB vector store with semantic similarity search',
        'Ollama local-LLM execution framework',
        'FastAPI + React modular API architecture',
      ],
      tags: ['RAG', 'LLM', 'ChromaDB', 'Ollama', 'FastAPI', 'Privacy-First'],
    },
    {
      id: 'exoplanet-estimation-astrobit',
      title: 'Astro: Kepler Transit Detection',
      githubUrl: 'https://github.com/Sakina-786-vi/Exoplanet_Estimation_Astrobit',
      subtitle: 'Leakage-Controlled Exoplanet Detection Pipeline',
      category: 'AI-Software',
      badge: 'ASTROPHYSICS / ML',
      badgeColor: 'border-[#00D9FF] text-[#00D9FF] bg-cyan-950/40',
      icon: ShieldCheck,
      description: 'A reproducible pipeline that searches NASA Kepler light curves for repeating planet-transit dips using quarter-aware preprocessing and an optimized Box Least Squares search.',
      longDescription: 'Astro turns Kepler brightness measurements into exoplanet transit candidates. It reads Parquet light curves, normalizes each observing quarter independently, detrends around data gaps, and searches periods with an in-house optimized Box Least Squares (BLS) implementation. Its frozen production decision uses a statistical BLS score with isotonic calibration and leakage controls. The documented results report 95.2% recall on DEV and a validated 87-row PRIVATE inference output.',
      highlights: [
        'Quarter-aware normalization and gap-aware rolling-median detrending',
        'Optimized BLS search across periods from 3 to 400 days',
        '16 candidate features and calibrated confidence scores',
        'Blind preprocessing that excludes labels and transit parameters',
        'Frozen threshold and deterministic, validated inference output',
      ],
      tags: ['NASA Kepler', 'Exoplanets', 'Parquet', 'Box Least Squares', 'Python', 'Machine Learning'],
    },
    {
      id: 'insura',
      title: 'Insura',
      githubUrl: 'https://github.com/Sakina-786-vi/Insura',
      subtitle: 'Intelligent Insurance Policy Assistant',
      category: 'AI-Software',
      badge: 'GENERATIVE AI',
      badgeColor: 'border-[#00D9FF] text-[#00D9FF] bg-cyan-950/40',
      icon: ShieldCheck,
      description: 'AI-powered insurance assistant for understanding policies through document extraction, policy-aware chat, simulation, and multilingual voice support.',
      longDescription: 'Insura helps users understand and interact with insurance policies. Uploaded policy PDFs are processed through an extraction workflow, with policy information stored and indexed for contextual retrieval. The platform combines an AI chatbot, insurance simulations, and multilingual speech and translation capabilities.',
      highlights: [
        'Insurance policy PDF extraction and structured storage',
        'Policy-aware chatbot with contextual retrieval',
        'Insurance simulation capabilities',
        'Multilingual speech, translation, and text-to-speech support',
        'Flask, n8n, SurrealDB, Cognee, Groq, and Sarvam AI',
      ],
      tags: ['Generative AI', 'RAG', 'Flask', 'SurrealDB', 'Multilingual', 'Voice AI'],
    },
    {
      id: 'gridtwin',
      title: 'GridTwin',
      githubUrl: 'https://github.com/Sakina-786-vi/GridTwin',
      subtitle: '3D Digital Twin for Distribution Grid Simulation',
      category: 'AI-Software',
      badge: 'ENERGY / DIGITAL TWIN',
      badgeColor: 'border-[#00D9FF] text-[#00D9FF] bg-cyan-950/40',
      icon: Layers,
      description: 'An offline simulation and decision-support prototype that runs time-series AC power-flow studies for a distribution feeder with solar, loads, and a battery, then visualizes results in an interactive 3D scene.',
      longDescription: 'GridTwin couples a Python backend using FastAPI and pandapower with a React, TypeScript, and Three.js frontend. Solar and load time series, and optional weather context, drive timestep simulations. The backend calculates voltages, line loading, losses, battery state, and violations; the frontend presents the results in a synchronized 3D twin, timeline, and analytics views. It is a simulation prototype and is not connected to a live utility system.',
      highlights: [
        'Time-series AC power-flow simulation with pandapower',
        'Solar PV, load, and battery modelling',
        'Interactive 3D feeder visualization with synchronized timeline',
        'Voltage, loading, power-loss, and violation analytics',
        'FastAPI backend with React, TypeScript, and Three.js frontend',
      ],
      tags: ['Digital Twin', 'Power Systems', 'pandapower', 'FastAPI', 'Three.js', 'Renewable Energy'],
    },
    {
      id: 'skillmatch',
      title: 'SkillMatch',
      githubUrl: 'https://github.com/Sakina-786-vi/SkillMatch',
      subtitle: 'Skill-Matching Application',
      category: 'AI-Software',
      badge: 'AI / SOFTWARE',
      badgeColor: 'border-[#00D9FF] text-[#00D9FF] bg-cyan-950/40',
      icon: Layers,
      description: 'A skill-matching project that connects people, skills, and relevant opportunities.',
      longDescription: 'SkillMatch is a software project focused on matching users with relevant skills and opportunities.',
      highlights: ['Skill and opportunity matching', 'Repository-backed project implementation'],
      tags: ['Skill Matching', 'Software'],
    },
    {
      id: 'newsquest',
      title: 'NewsQuest',
      githubUrl: 'https://github.com/Sakina-786-vi/NewsQuest',
      subtitle: 'Gamified News Learning & Prediction Platform',
      category: 'AI-Software',
      badge: 'AI / GAMIFIED LEARNING',
      badgeColor: 'border-[#00D9FF] text-[#00D9FF] bg-cyan-950/40',
      icon: Terminal,
      description: 'A full-stack news platform that turns current events into gameplay with AI-generated quizzes, event predictions, real-time battles, XP, streaks, and leaderboards.',
      longDescription: 'NewsQuest makes news more interactive by combining live articles with AI-generated quizzes and prediction games. Players can challenge others in real-time quiz battles, earn XP, maintain streaks, and track progress on leaderboards. Its README describes Qwen and NewIO powered quiz generation and a React frontend backed by a Node.js and Express API with Supabase authentication and data sync.',
      highlights: [
        'AI-generated, context-aware quizzes from real news articles',
        'Prediction gameplay around real-world events',
        'Real-time competitive quiz battle mode',
        'XP, levels, streaks, daily quests, and leaderboards',
        'React, TypeScript, Express, Supabase, Qwen API, and NewIO API',
      ],
      tags: ['News', 'Generative AI', 'React', 'TypeScript', 'Supabase', 'Gamification'],
    },
    {
      id: 'mindcode',
      title: 'MindCode',
      githubUrl: 'https://github.com/Sakina-786-vi/MindCode',
      subtitle: 'Open-Source Software Project',
      category: 'AI-Software',
      badge: 'AI / SOFTWARE',
      badgeColor: 'border-[#00D9FF] text-[#00D9FF] bg-cyan-950/40',
      icon: Cpu,
      description: 'MindCode is an open-source project available on GitHub.',
      longDescription: 'MindCode is a software project maintained in its public GitHub repository.',
      highlights: ['Public GitHub source code', 'Open-source project'],
      tags: ['Software', 'Open Source'],
    },
    {
      id: 'road-damage-detection',
      title: 'Road Damage Detection',
      githubUrl: 'https://github.com/Sakina-786-vi/Road_Damage_Detection',
      subtitle: 'Computer Vision Road Inspection',
      category: 'AI-Software',
      badge: 'COMPUTER VISION',
      badgeColor: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
      icon: ShieldCheck,
      description: 'A computer-vision project for detecting road damage from visual data.',
      longDescription: 'Road Damage Detection is a computer-vision project with its implementation available on GitHub.',
      highlights: ['Visual road-damage detection', 'Public source repository'],
      tags: ['Computer Vision', 'Road Safety'],
    },
    {
      id: 'tts-system',
      title: 'Improved Text-to-Speech (TTS) System',
      subtitle: 'VALL-E-X Voice Cloning & Accuracy Scoring',
      category: 'AI-Software',
      badge: 'GENERATIVE AI',
      badgeColor: 'border-[#00D9FF] text-[#00D9FF] bg-cyan-950/40',
      icon: Terminal,
      description:
        'Cloned and extended the VALL-E-X neural architecture, adding multi-voice detection, synthesis-error identification, and a voice accuracy-scoring module.',
      longDescription:
        'Advanced speech synthesis engine built by extending Microsoft\'s VALL-E-X zero-shot voice cloning model. Implemented multi-speaker acoustics classification, synthesis artifact detection, and automated acoustic distance scoring to benchmark synthesized audio against original target voice prompts.',
      highlights: [
        'VALL-E-X neural voice cloning fine-tuning & evaluation',
        'Multi-voice detection & acoustic embedding extraction',
        'Synthesis-error detection algorithm for audio artifacts',
        'Automated voice match accuracy-scoring pipeline',
      ],
      tags: ['Generative AI', 'Voice Cloning', 'VALL-E-X', 'Audio ML'],
    },
    {
      id: 'vision-eda',
      title: 'Person Detection (RT-DETR) & Loan Eligibility EDA',
      subtitle: 'Real-Time Vision & Predictive Statistical Analytics',
      category: 'AI-Software',
      badge: 'COMPUTER VISION',
      badgeColor: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
      icon: ShieldCheck,
      description:
        'Fine-tuned RT-DETR vision transformer for high-precision real-time person detection, paired with loan-approval classification and housing market EDA.',
      longDescription:
        'Dual computer vision and predictive analytics portfolio project. Fine-tuned the Real-Time DEtection TRansformer (RT-DETR) model on targeted custom datasets for low-latency person detection. Complemented with statistical exploratory data analysis (EDA) and XGBoost loan eligibility classifiers.',
      highlights: [
        'Fine-tuned RT-DETR Vision Transformer model',
        'Real-time multi-person boundary detection',
        'Loan approval predictive classification data models',
        'Housing market Exploratory Data Analysis (EDA)',
      ],
      tags: ['Computer Vision', 'RT-DETR', 'Classification', 'EDA'],
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase mb-1">
              // SYSTEM MODULE 04
            </div>
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white tracking-wider flex items-center gap-3">
              <span>STARK TECH ARSENAL</span>
              <span className="h-[2px] w-24 bg-gradient-to-r from-[#00D9FF] to-transparent" />
            </h2>
            <p className="font-mono text-xs text-slate-400 mt-1">
              DEPLOYED HARDWARE NODES & INTELLECTUAL PROPERTY
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-[#0A0E14] border border-cyan-500/20 p-1 rounded-sm hud-bracket">
            {['All', 'AI-Software', 'Hardware+IoT'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  soundFx.playClickSound();
                  setActiveFilter(tab);
                }}
                onMouseEnter={() => soundFx.playHoverBeep()}
                className={`px-4 py-1.5 font-mono text-xs rounded transition-all ${
                  activeFilter === tab
                    ? 'bg-[#00D9FF] text-black font-bold shadow-[0_0_12px_#00D9FF]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'All' ? 'ALL MODULES' : tab === 'AI-Software' ? 'AI / SOFTWARE' : 'HARDWARE + IOT'}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const IconComp = project.icon;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => soundFx.playHoverBeep()}
                  className="hud-panel p-6 sm:p-8 rounded-sm hud-bracket hud-panel-hover flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Badge & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-0.5 border font-mono text-[10px] rounded ${project.badgeColor}`}>
                        {project.badge}
                      </span>
                      <IconComp className="w-5 h-5 text-[#00D9FF] group-hover:rotate-12 transition-transform" />
                    </div>

                    {/* Title */}
                    <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-[#00D9FF] transition-colors">
                      {project.title}
                    </h3>
                    <div className="font-chakra text-xs text-[#FFB000] font-semibold mb-3">
                      {project.subtitle}
                    </div>

                    {/* Description */}
                    <p className="font-sans text-slate-300 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-cyan-500/10">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-[#05080D] border border-cyan-500/20 text-slate-400 font-mono text-[11px] rounded group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          soundFx.playClickSound();
                          setSelectedProject(project);
                        }}
                        className="py-2.5 bg-[#0A0E14] border border-[#00D9FF]/40 text-[#00D9FF] font-mono text-xs tracking-wider rounded-sm group-hover:bg-[#00D9FF] group-hover:text-black font-bold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>VIEW DETAILS</span>
                      </button>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => soundFx.playClickSound()}
                          className="py-2.5 border border-slate-600 text-slate-300 font-mono text-xs tracking-wider rounded-sm hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                          <span>VIEW SOURCE</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Modal for inspect details */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </section>
  );
}
