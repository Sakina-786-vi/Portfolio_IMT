import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  BookOpen,
  Mail,
  MapPin,
  Music,
  Phone,
  Plane,
  Send,
} from 'lucide-react';
import { soundFx } from '../utils/sound';

const GithubIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

const contactChannels = [
  { label: 'EMAIL FREQUENCY', value: 'rizvisakeena16@gmail.com', href: 'mailto:rizvisakeena16@gmail.com', icon: Mail },
  { label: 'COMMS LINE', value: '+91 80973 18543', href: 'tel:+918097318543', icon: Phone },
  { label: 'PRIMARY GEOLOCATION', value: 'Mumbai, Maharashtra, India', href: null, icon: MapPin },
];

const socialChannels = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/sakina-rizvi-5ab860247', icon: LinkedinIcon },
  { label: 'GITHUB', href: 'https://github.com/Sakina-786-vi', icon: GithubIcon },
];

const interests = [
  { label: 'Reading', icon: BookOpen },
  { label: 'Travel', icon: Plane },
  { label: 'Music', icon: Music },
  { label: 'Cricket', icon: Activity },
  { label: 'Basketball', icon: Activity },
];

export default function ContactSection() {
  const [draftReady, setDraftReady] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    soundFx.playClickSound();
    const subject = `Portfolio contact request from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    window.location.href = `mailto:rizvisakeena16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftReady(true);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div>
            <div className="hud-panel h-full rounded-sm p-6 hud-bracket sm:p-8">
              <div className="mb-7">
                <div className="mb-1 font-mono text-xs uppercase tracking-widest text-[#00D9FF]">
                  // SYSTEM MODULE 08
                </div>
                <h2 className="flex items-center gap-3 font-orbitron text-3xl font-bold tracking-wider text-white sm:text-4xl">
                  <span>ESTABLISH UPLINK</span>
                  <span className="h-[2px] w-16 bg-gradient-to-r from-[#00D9FF] to-transparent" />
                </h2>
                <p className="mt-2 font-mono text-xs text-slate-400">
                  Have a project in mind? Send a request and start a conversation with Sakina.
                </p>
              </div>

              <div className="mb-6 flex items-center justify-between border-b border-cyan-500/20 pb-3">
                <span className="font-mono text-xs text-[#00D9FF]">// TRANSMISSION FORM</span>
                <span className="font-mono text-[10px] text-slate-500">DIRECT EMAIL HANDOFF</span>
              </div>

              {draftReady ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                  className="space-y-3 rounded-sm border border-[#00D9FF] bg-cyan-950/30 p-8 text-center"
                >
                  <Mail className="mx-auto h-10 w-10 text-[#00D9FF]" />
                  <h3 className="font-orbitron text-lg font-bold text-white">EMAIL DRAFT PREPARED</h3>
                  <p className="font-mono text-xs text-slate-300">
                    Review and send the message in your email app to complete delivery.
                  </p>
                  <button
                    type="button"
                    onClick={() => setDraftReady(false)}
                    className="pt-2 font-mono text-xs text-cyan-300 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    EDIT REQUEST
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs uppercase text-slate-300">
                      OPERATIVE NAME // CALLSIGN
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      placeholder="e.g. Tony Stark"
                      className="w-full rounded-sm border border-cyan-500/30 bg-[#05080D] px-4 py-3 font-mono text-sm text-white transition-all placeholder:text-slate-600 focus:border-[#00D9FF] focus:outline-none focus:ring-1 focus:ring-[#00D9FF]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs uppercase text-slate-300">
                      RETURN COMMS EMAIL ADDRESS
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      placeholder="e.g. stark@starkindustries.com"
                      className="w-full rounded-sm border border-cyan-500/30 bg-[#05080D] px-4 py-3 font-mono text-sm text-white transition-all placeholder:text-slate-600 focus:border-[#00D9FF] focus:outline-none focus:ring-1 focus:ring-[#00D9FF]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs uppercase text-slate-300">
                      TRANSMISSION PAYLOAD // MESSAGE
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                      placeholder="Enter project details, deployment inquiries, or technical discussion topics..."
                      className="w-full rounded-sm border border-cyan-500/30 bg-[#05080D] px-4 py-3 font-mono text-sm text-white transition-all placeholder:text-slate-600 focus:border-[#00D9FF] focus:outline-none focus:ring-1 focus:ring-[#00D9FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => soundFx.playHoverBeep()}
                    className="w-full rounded-sm border border-cyan-300/50 bg-cyan-500/15 py-3.5 font-orbitron text-sm font-bold tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-400/25 hover:shadow-[0_0_22px_rgba(0,217,255,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      <span>SEND REQUEST</span>
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactChannels.map(({ label, value, href, icon: Icon }) => {
            const content = (
              <>
                <Icon className="h-5 w-5 shrink-0 text-cyan-300" />
                <span>
                  <span className="mb-1 block font-mono text-[10px] tracking-widest text-slate-500">{label}</span>
                  <span className="font-mono text-sm font-semibold text-white">{value}</span>
                </span>
              </>
            );
            return href ? (
              <a
                key={label}
                href={href}
                onMouseEnter={() => soundFx.playHoverBeep()}
                className="flex items-center gap-4 rounded-sm border border-cyan-500/20 bg-[#070D14]/75 p-4 transition-colors hover:border-cyan-300/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
              >
                {content}
              </a>
            ) : (
              <div key={label} className="flex items-center gap-4 rounded-sm border border-cyan-500/20 bg-[#070D14]/75 p-4">
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {socialChannels.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHoverBeep()}
              className="inline-flex items-center gap-2 rounded border border-cyan-500/20 bg-[#05080D] px-4 py-3 font-mono text-xs text-slate-300 transition-all hover:border-[#00D9FF] hover:text-[#00D9FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>

        <div className="mt-16 border-t border-cyan-500/20 pt-8 text-center">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500">
            // PERSONAL INTERESTS & AUXILIARY MODULES
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {interests.map(({ label, icon: Icon }) => (
              <div
                key={label}
                onMouseEnter={() => soundFx.playHoverBeep()}
                className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-[#0A0E14] px-4 py-2 font-mono text-xs text-slate-300 transition-all hover:border-[#00D9FF] hover:text-[#00D9FF]"
              >
                <Icon className="h-3.5 w-3.5 text-[#FFB000]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-16 space-y-2 text-center font-mono text-xs text-slate-500">
          <div className="flex items-center justify-center gap-2 text-cyan-400/80">
            <span>Powered by Arc Reactor Technology ⚡</span>
            <span>|</span>
            <span>STARK OS v4.2</span>
          </div>
          <div>© {new Date().getFullYear()} SAKINA RIZVI. ALL RIGHTS RESERVED.</div>
        </footer>
      </div>
    </section>
  );
}
