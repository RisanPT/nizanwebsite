'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Studio Location',
    detail: '45 Bridal Lane, Luxury District\nKozhikkode, Kerala',
  },
  {
    icon: Phone,
    title: 'Call or WhatsApp',
    detail: '+91 300 123 4567',
  },
  {
    icon: Mail,
    title: 'Email Us',
    detail: 'hello@nizanmakeovers.com',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    detail: 'Tue – Sun: 9 AM – 7 PM\nMonday: By Appointment',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="section-cream py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-gold text-xs font-medium tracking-[0.3em] uppercase mb-4 block"
          >
            Let&apos;s Connect
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-light text-navy mb-5"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-navy/60 text-lg max-w-xl mx-auto"
          >
            Ready to begin your luxury beauty journey? Reach out and let us
            craft your perfect look.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <div className="space-y-8 mb-10">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="flex gap-5 items-start group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon size={18} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-navy font-medium text-sm tracking-wide mb-1">
                        {info.title}
                      </h4>
                      <p className="text-navy/60 text-sm leading-relaxed whitespace-pre-line">
                        {info.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="relative h-56 bg-navy/5 border border-navy/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-gold mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-navy/50 text-sm">Interactive Map</p>
                  <p className="text-navy/30 text-xs mt-1">45 Bridal Lane, Karachi</p>
                </div>
              </div>
              {/* decorative grid */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'linear-gradient(#0b1b3b 1px, transparent 1px), linear-gradient(to right, #0b1b3b 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                  <Send size={24} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-navy mb-3">Message Sent!</h3>
                <p className="text-navy/60 text-sm">
                  Thank you for reaching out. We&apos;ll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium tracking-[0.1em] uppercase text-navy/70 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Fatima"
                      className="w-full px-4 py-3.5 border border-navy/15 bg-white text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-[0.1em] uppercase text-navy/70 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmed"
                      className="w-full px-4 py-3.5 border border-navy/15 bg-white text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-[0.1em] uppercase text-navy/70 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="fatima@example.com"
                    className="w-full px-4 py-3.5 border border-navy/15 bg-white text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-[0.1em] uppercase text-navy/70 mb-2">
                    Service Interested In
                  </label>
                  <select
                    className="w-full px-4 py-3.5 border border-navy/15 bg-white text-navy text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300 appearance-none"
                  >
                    <option value="">Select a service...</option>
                    <option>Bridal Elegance</option>
                    <option>Event Glamour</option>
                    <option>Editorial & Fashion</option>
                    <option>Luxury Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-[0.1em] uppercase text-navy/70 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3.5 border border-navy/15 bg-white text-navy text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-[0.1em] uppercase text-navy/70 mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your vision, skin type, or any special requests..."
                    className="w-full px-4 py-3.5 border border-navy/15 bg-white text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="shimmer-btn w-full bg-navy hover:bg-navy-dark text-white text-xs font-semibold tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-3 transition-all duration-400 hover:shadow-[0_8px_30px_rgba(11,27,59,0.3)] disabled:opacity-60"
                  style={{ borderRadius: 0 }}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={14} strokeWidth={2} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
