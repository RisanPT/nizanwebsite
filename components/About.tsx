'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const highlights = [
  { label: 'Brides Transformed', value: '2000+' },
  { label: 'Years of Artistry', value: '10+' },
  { label: 'Cities Served', value: '4' },
  { label: 'Academy Students', value: '500+' },
];

const specialties = [
  'Hindu Bridal Transformations',
  'Muslim Bridal Artistry',
  'Christian Bridal Elegance',
  'Dusky Airbrush Makeup',
  'Professional Masterclasses',
  'Celebrity & Editorial Looks',
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="about"
      className="section-cream py-28 lg:py-36 relative overflow-hidden"
      ref={ref}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,162,39,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span
            {...fadeUp(0)}
            className="text-gold text-[11px] font-medium tracking-[0.3em] uppercase mb-4 block"
          >
            Our Story
          </motion.span>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-display text-4xl md:text-5xl font-light text-navy mb-5"
          >
            About <span className="italic gradient-text">Us</span>
          </motion.h2>
          <motion.div
            {...fadeUp(0.18)}
            className="flex items-center gap-4 max-w-xs mx-auto"
          >
            <div className="flex-1 h-px bg-navy/15" />
            <span className="text-gold/60 text-sm">✦</span>
            <div className="flex-1 h-px bg-navy/15" />
          </motion.div>
        </div>

        {/* Two-column layout — image RIGHT, text LEFT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Text content ── */}
          <div className="space-y-8 order-2 lg:order-1">

            <motion.p
              {...fadeUp(0.2)}
              className="text-navy/80 text-lg leading-[1.9] font-light"
            >
              <span className="text-gold font-semibold">Nizan Makeovers</span> is a premium
              bridal makeup and professional training brand founded by{' '}
              <span className="text-navy font-medium">Feeniya Nizan</span>, a celebrated
              celebrity makeup artist and educator. Based in{' '}
              <span className="font-medium text-navy">Calicut and Chennai</span>, we specialise
              in elegant bridal transformations for{' '}
              <span className="text-gold font-medium">
                Hindu, Muslim, and Christian brides
              </span>
              , with strong expertise in dusky airbrush makeup.
            </motion.p>

            <motion.p
              {...fadeUp(0.28)}
              className="text-navy/60 text-base leading-[1.9] font-light"
            >
              Nizan Makeovers Academy also offers professional masterclasses designed to build
              skilled and confident makeup artists — nurturing the next generation of bridal
              artistry across India.
            </motion.p>

            {/* Specialties grid */}
            <motion.div {...fadeUp(0.36)}>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">
                Our Specialties
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {specialties.map((s) => (
                  <div key={s} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span className="text-navy/70 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ornamental divider */}
            <motion.div
              {...fadeUp(0.42)}
              className="flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-navy/10" />
              <span className="text-gold/50 text-xs">✦</span>
              <div className="flex-1 h-px bg-navy/10" />
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUp(0.48)}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {highlights.map((h) => (
                <div key={h.label} className="text-center">
                  <p className="font-display text-2xl md:text-3xl text-gold font-semibold">
                    {h.value}
                  </p>
                  <p className="text-navy/45 text-[10px] tracking-[0.2em] uppercase mt-1 leading-tight">
                    {h.label}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ── Right: Photo of Feeniya Nizan ── */}
          <motion.div
            {...fadeUp(0.15)}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Portrait frame */}
              <div className="aspect-[3/4] w-full overflow-hidden border border-gold/30 shadow-[0_24px_80px_rgba(11,27,59,0.18)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/feeniya-nizan.jpg"
                  alt="Feeniya Nizan — Founder & Celebrity Makeup Artist, Nizan Makeovers"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

                {/* Name caption */}
                <div className="absolute bottom-0 left-0 right-0 px-7 py-6">
                  <p className="font-display text-white text-xl font-light italic drop-shadow-lg">
                    Feeniya Nizan
                  </p>
                  <p className="text-gold text-[11px] tracking-[0.28em] uppercase mt-1 drop-shadow-lg">
                    Founder & Celebrity Makeup Artist
                  </p>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-gold/60" />
            </div>

            {/* Floating glass stat */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute -left-6 bottom-16 bg-navy/90 backdrop-blur-md border border-gold/25 px-6 py-5 shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              <p className="font-display text-3xl text-gold font-semibold">10+</p>
              <p className="text-white/60 text-[10px] tracking-widest uppercase mt-1">
                Years of Excellence
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
