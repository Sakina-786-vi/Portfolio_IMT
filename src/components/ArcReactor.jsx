import React, { useRef, useState, useId } from "react";

/**
 * ArcReactorCore
 * A chest-mounted energy core visual: concentric rotating rings, a
 * segmented turbine housing, radial coil spokes, and a pulsing
 * plasma center. Original design — not a reproduction of any
 * licensed prop, purely an interpretation of the "sci-fi energy
 * core" archetype.
 */
export default function ArcReactorCore({ size = "large", className = "", label = "REACTOR CORE" }) {
  const coreRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hot, setHot] = useState(false);
  const uid = useId().replace(/:/g, "");

  const sizeClasses =
    {
      small: "w-28 h-28",
      medium: "w-56 h-56",
      large: "w-80 h-80 sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]",
    }[size] || "w-80 h-80 sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]";

  const handleMouseMove = (e) => {
    const rect = coreRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotation({ x: (0.5 - y) * 16, y: (x - 0.5) * 16 });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  // 8 evenly spaced coil spokes around the ring
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  // 24 small teeth around the housing rim
  const teeth = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);

  return (
    <div
      ref={coreRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHot(true)}
      onMouseUp={() => setHot((h) => !h)}
      className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Ambient bloom on the surface behind the unit */}
      <div
        className={`absolute inset-[10%] rounded-full blur-[60px] transition-opacity duration-700 ${
          hot ? "opacity-90" : "opacity-50"
        }`}
        style={{ background: "radial-gradient(circle, #7fe9ff 0%, #1fb6e6 40%, transparent 70%)" }}
      />

      <div
        className="relative w-full h-full transition-transform duration-150 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
          <defs>
            <radialGradient id={`plasma-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="22%" stopColor="#bff4ff" />
              <stop offset="55%" stopColor="#37cfff" />
              <stop offset="100%" stopColor="#083b52" />
            </radialGradient>

            <linearGradient id={`housing-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3a4552" />
              <stop offset="35%" stopColor="#1b232c" />
              <stop offset="70%" stopColor="#0a0e13" />
              <stop offset="100%" stopColor="#232f38" />
            </linearGradient>

            <linearGradient id={`housing-light-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b7885" />
              <stop offset="50%" stopColor="#2c3742" />
              <stop offset="100%" stopColor="#111820" />
            </linearGradient>

            <linearGradient id={`ring-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5c9" />
              <stop offset="50%" stopColor="#8fefff" />
              <stop offset="100%" stopColor="#0ea5c9" />
            </linearGradient>

            <filter id={`softGlow-${uid}`} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id={`hotGlow-${uid}`} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="12" result="b1" />
              <feMerge>
                <feMergeNode in="b1" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer bolted housing ring — fixed, does not spin */}
          <circle cx="250" cy="250" r="235" fill={`url(#housing-${uid})`} stroke="#08282f" strokeWidth="3" />
          <circle cx="250" cy="250" r="235" fill="none" stroke="#1fb6e6" strokeWidth="1.5" opacity="0.35" />

          {/* Rim teeth (mechanical detailing, fixed) */}
          <g>
            {teeth.map((deg, i) => (
              <rect
                key={i}
                x="247"
                y="16"
                width="6"
                height="18"
                rx="1.5"
                fill={i % 3 === 0 ? "#8fefff" : "#3a4a54"}
                opacity={i % 3 === 0 ? 0.9 : 0.6}
                transform={`rotate(${deg} 250 250)`}
              />
            ))}
          </g>

          {/* Bolt heads */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <circle
              key={i}
              cx="250"
              cy="38"
              r="6"
              fill="#4b5a66"
              stroke="#0a0e13"
              strokeWidth="1.5"
              transform={`rotate(${deg} 250 250)`}
            />
          ))}

          {/* Middle housing ring, slight bevel */}
          <circle cx="250" cy="250" r="205" fill={`url(#housing-light-${uid})`} stroke="#0a0e13" strokeWidth="4" />
          <circle cx="250" cy="250" r="205" fill="none" stroke="#1fb6e6" strokeWidth="1" opacity="0.25" />

          {/* Rotating outer coil assembly */}
          <g style={{ transformOrigin: "250px 250px", animation: "arcSpinSlow 22s linear infinite" }}>
            <circle
              cx="250"
              cy="250"
              r="185"
              fill="none"
              stroke={`url(#ring-${uid})`}
              strokeWidth="5"
              strokeDasharray="18 14"
              opacity="0.85"
              filter={`url(#softGlow-${uid})`}
            />
            {spokes.map((deg, i) => (
              <g key={i} transform={`rotate(${deg} 250 250)`}>
                <rect
                  x="240"
                  y="60"
                  width="20"
                  height="34"
                  rx="4"
                  fill="url(#housing-" /* keep coil housings neutral metal */
                />
                <rect x="240" y="60" width="20" height="34" rx="4" fill={`url(#housing-${uid})`} stroke="#1fb6e6" strokeWidth="1.5" />
                <circle cx="250" cy="77" r="6" fill="#8fefff" filter={`url(#softGlow-${uid})`} />
              </g>
            ))}
          </g>

          {/* Inner rotating ring, opposite direction */}
          <g style={{ transformOrigin: "250px 250px", animation: "arcSpinFast 9s linear infinite reverse" }}>
            <circle
              cx="250"
              cy="250"
              r="150"
              fill="none"
              stroke="#8fefff"
              strokeWidth="2"
              strokeDasharray="2 10"
              opacity="0.7"
            />
          </g>

          {/* Triangular internal support struts, fixed */}
          <g opacity="0.9">
            {[0, 120, 240].map((deg, i) => (
              <path
                key={i}
                d="M250 250 L250 118 L268 150 Z"
                fill="#101820"
                stroke="#1fb6e6"
                strokeWidth="1.5"
                opacity="0.55"
                transform={`rotate(${deg} 250 250)`}
              />
            ))}
          </g>

          {/* Inner housing collar around the plasma chamber */}
          <circle cx="250" cy="250" r="118" fill="#060b0f" stroke="#08282f" strokeWidth="6" />
          <circle cx="250" cy="250" r="112" fill="none" stroke="#1fb6e6" strokeWidth="2" opacity="0.5" />

          {/* Triangular energy segments inside the chamber, fixed */}
          <g>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <path
                key={i}
                d="M250 250 L250 148 L305 178 Z"
                fill={i % 2 === 0 ? "#0f2a34" : "#0a1d24"}
                stroke="#37cfff"
                strokeWidth="1"
                opacity="0.5"
                transform={`rotate(${deg} 250 250)`}
              />
            ))}
          </g>

          {/* Plasma core */}
          <circle
            cx="250"
            cy="250"
            r={hot ? "78" : "70"}
            fill={`url(#plasma-${uid})`}
            filter={`url(#hotGlow-${uid})`}
            style={{
              transition: "r 0.5s ease",
              animation: "corePulse 2.6s ease-in-out infinite",
            }}
          />
          <circle cx="250" cy="250" r="34" fill="#ffffff" opacity="0.95" />
          <circle cx="250" cy="250" r="16" fill="#ffffff" />

          {/* Fine radial filament lines inside the plasma, rotating opposite the outer ring */}
          <g
            style={{ transformOrigin: "250px 250px", animation: "arcSpinFast 6s linear infinite" }}
            opacity="0.55"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <line
                key={i}
                x1="250"
                y1="250"
                x2="250"
                y2="192"
                stroke="#ffffff"
                strokeWidth="1"
                transform={`rotate(${i * 30} 250 250)`}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* HUD readout */}
      {label && (
        <div className="absolute -bottom-3 translate-y-full px-4 py-1.5 bg-[#04090c]/90 border border-cyan-400/30 rounded-sm">
          <div className="font-mono text-[10px] tracking-[0.2em] text-cyan-300">{label}</div>
          <div className="font-mono text-[8px] text-cyan-500/70">
            OUTPUT {hot ? "3.1 GJ/s" : "1.2 GJ/s"} — STABLE
          </div>
        </div>
      )}

      <style>{`
        @keyframes arcSpinSlow {
          from { transform: rotateZ(0deg); }
          to   { transform: rotateZ(360deg); }
        }
        @keyframes arcSpinFast {
          from { transform: rotateZ(0deg); }
          to   { transform: rotateZ(360deg); }
        }
        @keyframes corePulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}