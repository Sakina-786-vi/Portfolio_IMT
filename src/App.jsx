import React, { useState, useEffect } from 'react';
import BootSequence from './components/BootSequence';
import CanvasBackground from './components/CanvasBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import CertificationsSection from './components/CertificationsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(true);

  // Setup IntersectionObserver to track active section for reticle lock-on
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'certifications', 'education', 'contact'];
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [booting]);

  const handleNavigate = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05080D] text-[#EAEFF5] font-sans selection:bg-[#00D9FF]/30 selection:text-[#00D9FF]">
      
      {/* Boot Sequence Overlay */}
      <BootSequence onComplete={() => setBooting(false)} />

      {/* Cybernetic Particle Background */}
      <CanvasBackground />

      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none crt-overlay z-20" />

      {/* Fixed HUD Navigation */}
      <Navbar
        activeSection={activeSection}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Side Scroll Power Meter */}
      <ScrollProgress />

      {/* Main Single-Page Scroll Body */}
      <main className="relative z-10">
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
      </main>

    </div>
  );
}
