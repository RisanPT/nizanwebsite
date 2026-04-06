'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Sparkles, PartyPopper, Camera } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: 'Bridal Elegance',
    description:
      'Flawless, long-lasting luxury makeup tailored to enhance your natural features on your most cherished day. Every detail perfected.',
    tag: 'Most Popular',
  },
  {
    icon: PartyPopper,
    title: 'Event Glamour',
    description:
      'Stand out at any occasion with our signature party glam, ranging from subtle sophistication to bold, statement-making looks.',
    tag: null,
  },
  {
    icon: Camera,
    title: 'Editorial & Fashion',
    description:
      'Camera-ready avant-garde artistry designed for professional shoots, runway shows, and high-fashion editorial campaigns.',
    tag: null,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section-cream py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-gold text-xs font-medium tracking-[0.3em] uppercase mb-4 block"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-light text-navy mb-5"
          >
            Signature Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-navy/60 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Premium beauty experiences crafted with the finest products and
            techniques for your most unforgettable moments.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 60px rgba(11,27,59,0.12), 0 0 0 1px rgba(201,162,39,0.4)',
                }}
                className="relative bg-white border border-navy/10 rounded-none p-10 flex flex-col text-center group cursor-pointer transition-all duration-400"
                style={{ boxShadow: '0 4px 24px rgba(11,27,59,0.06)' }}
              >
                {svc.tag && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-navy text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 whitespace-nowrap">
                    {svc.tag}
                  </div>
                )}

                {/* Icon */}
                <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center transition-all duration-300 group-hover:bg-gold/20 group-hover:scale-110">
                  <Icon size={32} className="text-gold" strokeWidth={1.5} />
                </div>

                {/* Gold line */}
                <div className="w-8 h-px bg-gold mx-auto mb-6 transition-all duration-300 group-hover:w-16" />

                <h3 className="font-display text-2xl font-medium text-navy mb-4">
                  {svc.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed flex-1">{svc.description}</p>

                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-8 border border-navy/20 hover:border-gold text-navy hover:text-gold text-xs tracking-[0.15em] uppercase py-3 px-6 transition-all duration-300 hover:bg-gold/5"
                >
                  Learn More →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
