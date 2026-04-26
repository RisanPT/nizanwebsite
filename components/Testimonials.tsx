'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Anjali Menon',
    role: 'Bridal Client',
    text: "Feeniya and her team made my wedding day truly magical. The airbrush makeup was flawless and lasted throughout the entire event. I felt like the best version of myself!",
    location: 'Kochi, Kerala'
  },
  {
    name: 'Sarah Joseph',
    role: 'Bridal Client',
    text: "The level of professionalism and artistry at Nizan Makeovers is unmatched. They understood exactly what I wanted for my Christian bridal look and executed it with perfection.",
    location: 'Dubai, UAE'
  },
  {
    name: 'Priya Sharma',
    role: 'Celebrity Client',
    text: "Working with Feeniya for my editorial shoot was an incredible experience. Her eye for detail and ability to create a high-fashion look is why she's at the top of her game.",
    location: 'Mumbai, India'
  }
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="section-dark py-28 lg:py-36 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 text-gold/20 select-none">
          <Quote size={200} />
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-gold text-[11px] font-medium tracking-[0.3em] uppercase mb-4 block"
          >
            Kind Words
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-light text-white mb-5"
          >
            Client <span className="italic">Testimonials</span>
          </motion.h2>
          <div className="w-12 h-px bg-gold/40 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              className="bg-white/[0.03] border border-white/10 p-8 lg:p-10 relative group hover:bg-white/[0.05] transition-all duration-500"
            >
              <Quote className="text-gold/30 mb-6 group-hover:text-gold/50 transition-colors" size={32} />
              <p className="text-white/70 text-lg leading-relaxed mb-8 italic font-light">
                "{t.text}"
              </p>
              <div>
                <p className="text-white font-display text-xl mb-1">{t.name}</p>
                <p className="text-gold text-[10px] tracking-widest uppercase">{t.role} — {t.location}</p>
              </div>
              
              {/* Decorative accent */}
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
