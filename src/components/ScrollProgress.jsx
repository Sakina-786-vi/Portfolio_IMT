import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      if (documentHeight > 0) {
        const currentProgress = (window.scrollY / documentHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-2 select-none pointer-events-none">
      <div className="font-mono text-[9px] text-[#00D9FF] tracking-tighter rotate-90 mb-6">
        POWER
      </div>

      {/* Meter Bar Container */}
      <div className="w-2 h-48 bg-[#0A0E14] border border-cyan-500/30 rounded-full relative overflow-hidden p-0.5">
        <div
          className="w-full bg-gradient-to-t from-cyan-600 via-[#00D9FF] to-[#1FE3FF] rounded-full shadow-[0_0_10px_#00D9FF] transition-all duration-150"
          style={{ height: `${scrollPercentage}%` }}
        />
      </div>

      <div className="font-mono text-[10px] text-[#FFB000] font-bold mt-2">
        {Math.round(scrollPercentage)}%
      </div>
    </div>
  );
}
