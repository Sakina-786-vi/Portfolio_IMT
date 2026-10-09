import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import reactorVideo from '../../arc-reactor-beam/Screen Recording 2026-10-08 214200.mp4?url';

const INTRO_DURATION_MS = 3600;
const VIDEO_FALLBACK_MS = 6500;

export default function ArcReactorIntro() {
  const videoRef = useRef(null);
  const introTimerRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const completedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(true);

  const finishIntro = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    window.clearTimeout(introTimerRef.current);
    window.clearTimeout(fallbackTimerRef.current);
    if (videoRef.current) videoRef.current.pause();
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishIntro();
      return undefined;
    }

    fallbackTimerRef.current = window.setTimeout(finishIntro, VIDEO_FALLBACK_MS);
    return () => {
      window.clearTimeout(introTimerRef.current);
      window.clearTimeout(fallbackTimerRef.current);
    };
  }, [finishIntro]);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video || completedRef.current) return;

    video.playbackRate = 2;
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt.catch(() => window.setTimeout(finishIntro, 700));
    }
  };

  const handlePlaying = () => {
    if (introTimerRef.current || completedRef.current) return;
    introTimerRef.current = window.setTimeout(finishIntro, INTRO_DURATION_MS);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-[#05080D]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025, transition: { duration: 0.65, ease: 'easeInOut' } }}
          aria-label="Arc Reactor cinematic introduction"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={reactorVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={startPlayback}
            onPlaying={handlePlaying}
            onEnded={finishIntro}
            onError={finishIntro}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05080D]/30 via-transparent to-[#05080D]/55" />
          <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between sm:bottom-10 sm:left-10 sm:right-10">
            <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-100/80 sm:text-xs">
              STARK SYSTEMS <span className="text-cyan-300">// REACTOR ONLINE</span>
            </div>
            <button
              type="button"
              onClick={finishIntro}
              className="rounded-sm border border-cyan-200/40 bg-slate-950/40 px-3 py-2 font-mono text-[10px] tracking-widest text-white/90 backdrop-blur transition-colors hover:border-cyan-200 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:text-xs"
            >
              SKIP INTRO
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
