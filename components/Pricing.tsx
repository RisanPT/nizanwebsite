'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic Makeover',
    price: '$150',
    period: '/session',
    features: [
      'Full Face Glam',
      'Premium Lashes',
      '1 Hour Session',
      'Skin Prep Included',
    ],
    cta: 'Select Package',
    highlight: false,
    badge: null,
  },
  {
    name: 'Premium Bridal',
    price: '$450',
    period: '/session',
    features: [
      'Pre-wedding Consultation',
      'Long-lasting HD Makeup',
      'Luxury Skin Prep & Primer',
      'Touch-up Kit Provided',
      '2.5 Hour Session',
    ],
    cta: 'Book Now',
    highlight: true,
    badge: 'Signature Choice',
  },
  {
    name: 'Luxury Package',
    price: '$850',
    period: '/session',
    features: [
      'Bridal Makeup & Hairstyling',
      'Touch-up Kit Included',
      'Makeup for 2 Bridesmaids',
      'On-location Premium Service',
      'Photography Lighting Tips',
    ],
    cta: 'Select Package',
    highlight: false,
    badge: null,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="section-dark py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-gold text-xs font-medium tracking-[0.3em] uppercase mb-4 block"
          >
            Investment in Beauty
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-light text-white mb-5"
          >
            Our Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/55 text-lg max-w-xl mx-auto"
          >
            Transparent packages designed to meet your specific luxury beauty
            needs — no hidden costs, ever.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: plan.highlight ? -4 : -6 }}
              className={`relative flex flex-col transition-all duration-400 ${
                plan.highlight
                  ? 'border-2 border-gold shadow-[0_0_60px_rgba(201,162,39,0.2)] scale-[1.02]'
                  : 'border border-white/10 hover:border-gold/40'
              }`}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(160deg, rgba(201,162,39,0.08) 0%, rgba(11,27,59,1) 40%)'
                  : 'rgba(255,255,255,0.03)',
                padding: '56px 40px',
              }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy text-[10px] font-bold tracking-[0.15em] uppercase px-5 py-1.5 whitespace-nowrap">
                  ✦ {plan.badge}
                </div>
              )}

              {/* Gold top bar for highlighted */}
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />
              )}

              <h3 className="font-display text-xl font-light text-white mb-2 text-center">
                {plan.name}
              </h3>

              <div className="text-center mt-2 mb-8">
                <span className="font-display text-5xl font-light text-gold">
                  {plan.price}
                </span>
                <span className="text-white/40 text-sm ml-1">{plan.period}</span>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />

              <ul className="flex-1 space-y-4 mb-10">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-white/70">
                    <Check size={16} className="text-gold shrink-0 mt-0.5" strokeWidth={2.5} />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`shimmer-btn w-full text-xs font-semibold tracking-[0.15em] uppercase py-4 transition-all duration-400 ${
                  plan.highlight
                    ? 'bg-gold hover:bg-gold-light text-navy hover:shadow-[0_0_30px_rgba(201,162,39,0.5)]'
                    : 'border border-white/20 hover:border-gold text-white hover:text-gold hover:bg-gold/5'
                }`}
                style={{ borderRadius: 0 }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-white/30 text-xs tracking-wider mt-10"
        >
          All packages include a complimentary pre-consultation. Custom packages available on request.
        </motion.p>
      </div>
    </section>
  );
}
