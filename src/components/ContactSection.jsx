import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Radio, ShieldCheck, ExternalLink, Sparkles, BookOpen, Plane, Music, Activity } from 'lucide-react';
import { soundFx } from '../utils/sound';

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

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFx.playClickSound();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const interests = [
    { label: 'Reading', icon: BookOpen },
    { label: 'Travel', icon: Plane },
    { label: 'Music', icon: Music },
    { label: 'Cricket', icon: Activity },
    { label: 'Basketball', icon: Activity },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-left">
          <div className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase mb-1">
            // SYSTEM MODULE 08
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white tracking-wider flex items-center gap-3">
            <span>ESTABLISH UPLINK</span>
            <span className="h-[2px] w-24 bg-gradient-to-r from-[#00D9FF] to-transparent" />
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-1">
            INITIATE SECURE STARK COMMS PROTOCOL WITH SAKINA RIZVI
          </p>
        </div>

        {/* Main Uplink Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Direct Telemetry Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="hud-panel p-6 sm:p-8 rounded-sm hud-bracket">
              
              <div className="flex items-center gap-2 font-mono text-xs text-[#00D9FF] mb-6 border-b border-cyan-500/20 pb-3">
                <Radio className="w-4 h-4 text-[#FFB000] animate-pulse" />
                <span>CHANNEL STATUS: BROADCASTING</span>
              </div>

              <div className="space-y-6 font-mono text-sm">
                
                {/* Email */}
                <div className="flex items-start gap-4" onMouseEnter={() => soundFx.playHoverBeep()}>
                  <div className="p-3 bg-[#05080D] border border-cyan-500/30 rounded-sm text-[#00D9FF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">// EMAIL FREQUENCY</div>
                    <a
                      href="mailto:rizvisakeena16@gmail.com"
                      className="text-white hover:text-[#00D9FF] transition-colors font-bold block"
                    >
                      rizvisakeena16@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4" onMouseEnter={() => soundFx.playHoverBeep()}>
                  <div className="p-3 bg-[#05080D] border border-amber-500/30 rounded-sm text-[#FFB000]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">// ENCRYPTED COMMS LINE</div>
                    <a
                      href="tel:+918097318543"
                      className="text-white hover:text-[#FFB000] transition-colors font-bold block"
                    >
                      +91 80973 18543
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4" onMouseEnter={() => soundFx.playHoverBeep()}>
                  <div className="p-3 bg-[#05080D] border border-emerald-500/30 rounded-sm text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">// PRIMARY GEOLOCATION</div>
                    <div className="text-white font-bold">Mumbai, Maharashtra, India</div>
                  </div>
                </div>

              </div>

              {/* Network Social Callouts */}
              <div className="mt-8 pt-6 border-t border-cyan-500/20">
                <div className="text-xs font-mono text-slate-400 mb-3">// SOCIAL SATELLITES</div>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/sakina-rizvi-5ab860247"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHoverBeep()}
                    className="flex-1 p-3 bg-[#05080D] border border-cyan-500/20 rounded text-center text-xs font-mono text-slate-300 hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all flex items-center justify-center gap-2"
                  >
                    <LinkedinIcon className="w-4 h-4" /> LINKEDIN
                  </a>
                  <a
                    href="https://github.com/Sakina-786-vi"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHoverBeep()}
                    className="flex-1 p-3 bg-[#05080D] border border-cyan-500/20 rounded text-center text-xs font-mono text-slate-300 hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all flex items-center justify-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" /> GITHUB
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: HUD Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="hud-panel p-6 sm:p-8 rounded-sm hud-bracket">
              
              <div className="flex items-center justify-between mb-6 border-b border-cyan-500/20 pb-3">
                <span className="font-mono text-xs text-[#00D9FF]">// TRANSMISSION FORM</span>
                <span className="font-mono text-[10px] text-slate-500">256-BIT ENCRYPTED</span>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center bg-cyan-950/30 border border-[#00D9FF] rounded-sm space-y-3"
                >
                  <ShieldCheck className="w-12 h-12 text-[#00D9FF] mx-auto animate-bounce" />
                  <h3 className="font-orbitron text-xl font-bold text-white">TRANSMISSION RECEIVED</h3>
                  <p className="font-mono text-xs text-slate-300">
                    JARVIS HAS CONFIRMED DISPATCH TO SAKINA RIZVI. EXPECT A PROMPT RESPONSE.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase mb-1.5">
                      OPERATIVE NAME // CALLSIGN
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tony Stark"
                        className="w-full bg-[#05080D] border border-cyan-500/30 rounded-sm px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase mb-1.5">
                      RETURN COMMS EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. stark@starkindustries.com"
                      className="w-full bg-[#05080D] border border-cyan-500/30 rounded-sm px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase mb-1.5">
                      TRANSMISSION PAYLOAD // MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter project details, deployment inquiries, or technical discussion topics..."
                      className="w-full bg-[#05080D] border border-cyan-500/30 rounded-sm px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Submit Action Chip */}
                  <button
                    type="submit"
                    onMouseEnter={() => soundFx.playHoverBeep()}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-[#00D9FF] text-black font-orbitron font-bold text-sm tracking-wider rounded-sm hover:shadow-[0_0_25px_#00D9FF] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>DISPATCH TRANSMISSION</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Section J: Interests Footer Strip */}
        <div className="pt-8 border-t border-cyan-500/20 text-center">
          <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
            // PERSONAL INTERESTS & AUXILIARY MODULES
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {interests.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => soundFx.playHoverBeep()}
                  className="px-4 py-2 bg-[#0A0E14] border border-cyan-500/20 rounded-full font-mono text-xs text-slate-300 flex items-center gap-2 hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-[#FFB000]" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Banner */}
        <footer className="mt-16 text-center font-mono text-xs text-slate-500 space-y-2">
          <div className="text-cyan-400/80 flex items-center justify-center gap-2">
            <span>Powered by Arc Reactor Technology ⚡</span>
            <span>|</span>
            <span>STARK OS v4.2</span>
          </div>
          <div>
            © {new Date().getFullYear()} SAKINA RIZVI. ALL RIGHTS RESERVED.
          </div>
        </footer>

      </div>
    </section>
  );
}
