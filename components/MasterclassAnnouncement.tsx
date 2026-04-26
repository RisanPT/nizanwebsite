'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export default function MasterclassAnnouncement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-navy/40 backdrop-blur-md border border-gold/20 p-8 md:p-16 overflow-hidden group animate-living-border"
        >
          {/* Subtle Shimmer Background */}
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-10 h-px bg-gold" />
                <span className="text-gold text-[10px] tracking-[0.4em] uppercase font-bold">
                  Exclusive Opportunity
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-8"
              >
                Advanced Bridal <br />
                <span className="italic gradient-text">Masterclass 2025</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed"
              >
                Join Feeniya Nizan for an intensive professional training session. 
                Master the secrets of signature airbrush techniques and luxury bridal artistry.
              </motion.p>

              {/* Detail Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
                  { icon: Calendar, text: 'June 15-18, 2025' },
                  { icon: MapPin, text: 'Kochi, Kerala' },
                  { icon: Users, text: 'Limited Seats Available' },
                  { icon: ArrowRight, text: 'Professional Certification' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 text-white/80 group/item"
                  >
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover/item:bg-gold/20 transition-colors">
                      <item.icon size={16} className="text-gold" />
                    </div>
                    <span className="text-sm font-medium tracking-wide">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn inline-flex items-center gap-3 bg-gold text-navy px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-400 hover:shadow-[0_0_40px_rgba(201,162,39,0.5)] pulse-gold"
                >
                  Register Now
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            </div>

            {/* Right Column: Visual/Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative aspect-square lg:aspect-[4/5] overflow-hidden border border-gold/30 animate-float"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/frames/ezgif-frame-080.jpg?v=2"
                alt="Masterclass Showcase"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2 font-bold">
                  Expert Instruction
                </p>
                <p className="font-display text-2xl text-white font-light italic">
                  &ldquo;Artistry is a journey, not a destination.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[200%] h-[2px] bg-gold/30 rotate-45 translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute bottom-0 left-0 w-32 h-32 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 left-0 w-[200%] h-[2px] bg-gold/30 rotate-45 -translate-x-1/2 translate-y-1/2" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
