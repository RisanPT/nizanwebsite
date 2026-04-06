'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

const TOTAL_FRAMES = 244;
const CACHE_BUSTER = "?v=2";

// Preload first N frames for instant display
const PRELOAD_COUNT = 20;

interface HeroProps {
  onBook: () => void;
}

export default function Hero({ onBook }: HeroProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const rafRef = useRef<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const t = setTimeout(() => setHeroReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Preload initial frames for smooth start
  useEffect(() => {
    for (let i = 1; i <= PRELOAD_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg${CACHE_BUSTER}`;
    }
  }, []);

  // Scroll-driven frame sequencing
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const heroEl = document.getElementById('home');
          if (!heroEl) { ticking = false; return; }
          const heroHeight = heroEl.offsetHeight;
          const scrollY = window.scrollY;
          const progress = Math.min(scrollY / (heroHeight - window.innerHeight), 1);
          const frame = Math.max(1, Math.min(TOTAL_FRAMES, Math.ceil(progress * TOTAL_FRAMES)));
          setCurrentFrame(frame);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const frameNum = String(currentFrame).padStart(3, '0');
  const frameSrc = `/frames/ezgif-frame-${frameNum}.jpg${CACHE_BUSTER}`;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Tall scroll container — 400vh gives full scroll range for 240 frames
    <section
      id="home"
      className="relative"
      style={{ height: '400vh', background: '#060f22' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Frame background image — plain <img> for max scroll perf */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={heroReady ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={frameSrc}
            alt="Bridal makeup cinematic portrait"
            className="absolute top-0 right-0 h-full w-auto max-w-none"
            style={{ display: 'block' }}
          />
        </motion.div>

        {/* Dark gradient overlay — left-heavy navy fade */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(6,15,34,0.94) 0%, rgba(11,27,59,0.72) 45%, rgba(11,27,59,0.18) 100%)',
          }}
        />

        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(6,15,34,0.8) 0%, transparent 100%)',
          }}
        />

        {/* Antigravity particle system — z above overlay */}
        <ParticleCanvas isMobile={isMobile} />

        {/* ── Hero Content ─────────────────────────────── */}
        <div className="relative z-[3] h-full flex items-center">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-2xl">

              {/* Eyebrow label */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroReady ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-px bg-gold" />
                <span className="text-gold text-[11px] font-medium tracking-[0.35em] uppercase">
                  Luxury Beauty Aesthetics
                </span>
                <div className="w-8 h-px bg-gold" />
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 44 }}
                animate={heroReady ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-white leading-[1.05] tracking-tight mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                Reveal Your{' '}
                <span className="relative italic">
                  Ultimate
                  {/* Gold underline — draws left to right */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={heroReady ? { scaleX: 1 } : {}}
                    transition={{ delay: 2.3, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-gold block origin-left"
                  />
                </span>
                <br />
                <span
                  className="font-display"
                  style={{
                    background: 'linear-gradient(120deg, #c9a227 0%, #f0d060 50%, #c9a227 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Beauty
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={heroReady ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
                className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg"
              >
                Experience unparalleled luxury with professional bridal, fashion,
                and party makeovers — tailored perfectly to you.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroReady ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.8, duration: 0.7, ease: 'easeOut' }}
                className="flex flex-wrap gap-4 mb-14"
              >
                <button
                  id="hero-book-btn"
                  onClick={onBook}
                  className="shimmer-btn group relative bg-gold text-navy text-[11px] font-bold tracking-[0.22em] uppercase px-9 py-4 transition-all duration-400 hover:bg-gold-light hover:shadow-[0_0_40px_rgba(201,162,39,0.65)] pulse-gold"
                  style={{ borderRadius: 0 }}
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => scrollTo('services')}
                  className="group border border-white/25 hover:border-gold/70 text-white/80 hover:text-gold text-[11px] font-medium tracking-[0.22em] uppercase px-9 py-4 transition-all duration-400 backdrop-blur-sm hover:bg-gold/5"
                  style={{ borderRadius: 0 }}
                >
                  Discover Services
                  <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroReady ? { opacity: 1 } : {}}
                transition={{ delay: 2.1, duration: 0.9 }}
                className="flex gap-8 pt-8 border-t border-white/10"
              >
                {[
                  { n: '500+', label: 'Happy Brides' },
                  { n: '8+', label: 'Years Expertise' },
                  { n: '100%', label: 'Luxury Products' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl md:text-3xl font-light text-gold leading-none mb-1">
                      {s.n}
                    </div>
                    <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroReady ? { opacity: 1 } : {}}
          transition={{ delay: 2.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
          />
          <span className="text-[9px] tracking-[0.35em] text-gold/50 uppercase">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
