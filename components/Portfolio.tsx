'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const portfolioItems = [
  {
    src: '/frames/ezgif-frame-030.jpg',
    alt: 'The Classic Bride',
    title: 'The Classic Bride',
    category: 'Bridal Makeover',
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: 1,
  },
  {
    src: '/frames/ezgif-frame-070.jpg',
    alt: 'Evening Gala Glamour',
    title: 'Evening Gala',
    category: 'Event Glamour',
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: -1,
  },
  {
    src: '/frames/ezgif-frame-140.jpg',
    alt: 'Avant-Garde Editorial',
    title: 'Avant-Garde',
    category: 'Editorial',
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: 1,
  },
  {
    src: '/frames/ezgif-frame-210.jpg',
    alt: 'Flawless Natural Look',
    title: 'Flawless Canvas',
    category: 'Natural Beauty',
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: -1,
  },
];

function ParallaxPortfolioItem({
  src, alt, title, category, gridClass, aspect, parallaxDir, index,
}: typeof portfolioItems[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [parallaxDir * 40, parallaxDir * -40]);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={`${gridClass} relative overflow-hidden group cursor-pointer`}
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.13, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`${aspect} relative overflow-hidden`}>
        {/* Parallax image wrapper */}
        <motion.div
          className="absolute inset-[-10%] w-[120%] h-[120%]"
          style={{ y }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(6,15,34,0.95) 0%, rgba(11,27,59,0.3) 55%, transparent 100%)',
            opacity: 0.7,
          }}
        />
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
          <span className="text-gold text-[10px] tracking-[0.28em] uppercase font-semibold block mb-2">
            {category}
          </span>
          <h3 className="font-display text-xl md:text-2xl text-white font-light leading-tight">
            {title}
          </h3>
        </div>

        {/* Gold corner brackets */}
        <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
        <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="portfolio" className="section-dark py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-gold text-[11px] font-medium tracking-[0.3em] uppercase mb-4 block"
          >
            Selected Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="font-display text-4xl md:text-5xl font-light text-white mb-5"
          >
            The Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/50 text-lg max-w-lg mx-auto leading-relaxed"
          >
            A curated showcase of breathtaking transformations — each one a unique
            story of artistry, culture, and grace.
          </motion.p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {portfolioItems.map((item, i) => (
            <ParallaxPortfolioItem key={item.title} {...item} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="text-center mt-14"
        >
          <button className="shimmer-btn border border-gold/40 hover:border-gold hover:bg-gold hover:text-navy text-gold text-[11px] tracking-[0.22em] uppercase px-10 py-4 transition-all duration-400 font-medium">
            View Full Portfolio
          </button>
        </motion.div>
      </div>
    </section>
  );
}
