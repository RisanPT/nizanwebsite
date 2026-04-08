'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

const MIN_LOADING_MS = 5000;
const HERO_VIDEO_SRC = '/video-swap_2026-04-07_03-23-46.mp4';
const HERO_POSTER_SRC = '/frames/ezgif-frame-001.jpg?v=3';

const BRIDAL_STYLES = [
  { frame: 30, label: 'The Hindu Bride' },
  { frame: 70, label: 'The Muslim Bride' },
  { frame: 140, label: 'Christian Elegance' },
  { frame: 210, label: 'Modern Glamour' },
];

interface HeroProps {
  onBook: () => void;
}

export default function Hero({ onBook }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [showBridalIcons, setShowBridalIcons] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [minDelayPassed, setMinDelayPassed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setShowBridalIcons(true);
      setMinDelayPassed(true);
      setHeroReady(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowBridalIcons(true);
      setMinDelayPassed(true);
    }, MIN_LOADING_MS);

    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsLoaded(true);
      setLoadingProgress(100);
      return;
    }

    const poster = new Image();
    poster.src = HERO_POSTER_SRC;
    poster.onload = () => {
      setLoadingProgress(100);
      setIsLoaded(true);
    };
    poster.onerror = () => {
      setLoadingProgress(100);
      setIsLoaded(true);
    };

    const video = videoRef.current;
    if (video) {
      const handleReady = () => {
        setLoadingProgress(100);
        setIsLoaded(true);
      };

      video.addEventListener('loadeddata', handleReady, { once: true });
      video.load();

      return () => {
        video.removeEventListener('loadeddata', handleReady);
      };
    }
  }, [isMobile]);

  // Initial hero activation sequence — wait for BOTH assets and the minimum splash duration.
  useEffect(() => {
    if (isMobile) return;

    if (isLoaded && minDelayPassed) {
      const t = setTimeout(() => setHeroReady(true), 500);
      return () => clearTimeout(t);
    }
  }, [isLoaded, isMobile, minDelayPassed]);

  useEffect(() => {
    if (!isMobile && heroReady && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    }
  }, [heroReady, isMobile]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative"
      style={{ height: '100vh', background: '#060f22' }}
    >
      <div className="relative h-screen overflow-hidden">

        <motion.div
          className="absolute inset-0 z-0 bg-navy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {isMobile ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={HERO_POSTER_SRC}
              alt="Bridal makeup cinematic portrait"
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none"
              style={{ display: 'block' }}
            />
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
              poster={HERO_POSTER_SRC}
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          )}
        </motion.div>

        {/* Loading Overlay — Full screen luxury splash */}
        {!heroReady && !isMobile && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={heroReady ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-[400px] flex flex-col items-center space-y-12">
              
              {/* Rounded Bridal Icons Sequence */}
              <div className="flex gap-4 md:gap-6">
                {BRIDAL_STYLES.map((style, idx) => (
                  <motion.div
                    key={style.label}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: idx * 0.8, 
                      duration: 0.8, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="relative group"
                  >
                    {/* Animated Border Ring */}
                    <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90">
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="48%"
                        fill="none"
                        stroke="#c9a227"
                        strokeWidth="1"
                        strokeDasharray="100 100"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ delay: idx * 0.8, duration: 2, ease: "linear" }}
                      />
                    </svg>

                    {/* Circular Icon */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/10 bg-navy-light relative z-10">
                      {showBridalIcons ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/frames/ezgif-frame-${String(style.frame).padStart(3, '0')}.jpg`}
                            alt={style.label}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-white/10 via-gold/10 to-white/5 animate-pulse" />
                      )}
                    </div>

                    {/* Tiny Label */}
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (idx * 0.8) + 0.4 }}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] md:text-[8px] tracking-[0.2em] text-gold/40 uppercase whitespace-nowrap"
                    >
                      {style.label.split(' ')[1] || style.label}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Loader Info */}
              <div className="w-full max-w-[280px] space-y-8 pt-8">
                {/* Luxury Text */}
                <div className="text-center space-y-2">
                  <motion.span 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-gold text-[10px] font-medium tracking-[0.4em] uppercase block"
                  >
                    CRAFTING ARTISTRY
                  </motion.span>
                  <div className="font-display text-white/40 text-[9px] tracking-[0.25em] uppercase">
                    Initializing Cinematic Experience
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-[10px] font-medium inline-block text-gold/60 tracking-wider">
                        {loadingProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-[1px] mb-4 text-xs flex bg-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ type: "spring", stiffness: 50, damping: 20 }}
                      style={{ width: `${loadingProgress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gold"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual background element */}
            <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none opacity-20">
               <div 
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                 style={{ 
                   background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)',
                   filter: 'blur(80px)'
                 }}
               />
            </div>
          </motion.div>
        )}

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

        {/* Watermark cover — soft corner blend */}
        <div
          className="absolute bottom-0 right-0 z-[2] pointer-events-none"
          style={{
            width: '200px',
            height: '100px',
            background: 'radial-gradient(ellipse at bottom right, rgba(6,15,34,1) 0%, rgba(6,15,34,0.85) 40%, transparent 75%)',
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
                  Luxury Bridal Makeup Studio
                </span>
                <div className="w-8 h-px bg-gold" />
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 44 }}
                animate={heroReady ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-white leading-[1.05] tracking-tight mb-8"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
              >
                Professional{' '}
                <span className="relative italic">
                  Bridal
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
                  Makeup Services
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={heroReady ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
                className="text-white/70 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl"
              >
                Soft glam. Timeless beauty. Unforgettable moments.<br />
                <span className="text-white/50 text-sm mt-2 block">
                  Professional Airbrush Bridal Makeup for weddings, engagements, and special events — specializing in Hindu, Christian &amp; Muslim bridal looks. Luxury services also available for celebrities and public figures.
                </span>
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
                  Book Now
                </button>
                <button
                  onClick={() => scrollTo('services')}
                  className="group border border-white/25 hover:border-gold/70 text-white/80 hover:text-gold text-[11px] font-medium tracking-[0.22em] uppercase px-9 py-4 transition-all duration-400 backdrop-blur-sm hover:bg-gold/5"
                  style={{ borderRadius: 0 }}
                >
                  Our Services
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
