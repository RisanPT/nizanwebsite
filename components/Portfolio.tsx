'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export interface PortfolioCard {
  src: string;
  alt: string;
  title: string;
  category: string;
  gridClass: string;
  aspect: string;
  parallaxDir: 1 | -1;
}

export const portfolioItems: PortfolioCard[] = [
  {
    src: '/portfolio_images/photo-output (24).JPEG',
    alt: 'Complete Bridal Transformation',
    title: 'Complete Bridal',
    category: 'Bridal Makeover',
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: 1,
  },
  {
    src: '/portfolio_images/photo-output (23).JPEG',
    alt: 'Elegant Fashion Makeover',
    title: 'Fashion Forward',
    category: 'Editorial',
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: -1,
  },
  {
    src: '/portfolio_images/photo-output (21).JPEG',
    alt: 'Masterclass Signature Look',
    title: 'Masterclass Look',
    category: 'Celebrity Makeup',
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: 1,
  },
  {
    src: '/portfolio_images/photo-output (20).JPEG',
    alt: 'Radiant Glow Look',
    title: 'Radiant Glow',
    category: 'Bridal Makeover',
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: -1,
  },
  {
    src: '/portfolio_images/photo-output (19).JPEG',
    alt: 'Exquisite Bridal Detail',
    title: 'Exquisite Detail',
    category: 'Bridal Makeover',
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: 1,
  },
  {
    src: '/portfolio_images/photo-output (18).JPEG',
    alt: 'Flawless Editorial Makeup',
    title: 'Editorial Edge',
    category: 'Editorial',
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: -1,
  },
  {
    src: '/portfolio_images/photo-output (17).JPEG',
    alt: 'Royal Bridal Makeover',
    title: 'Royal Bride',
    category: 'Bridal Makeover',
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: 1,
  },
  {
    src: '/portfolio_images/photo-output (16).JPEG',
    alt: 'Timeless Beauty Look',
    title: 'Timeless Beauty',
    category: 'Editorial',
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: -1,
  },
  {
    src: '/portfolio_images/photo-output (14).JPEG',
    alt: 'Modern Bridal Transformation',
    title: 'Modern Bride',
    category: 'Bridal Makeover',
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: 1,
  },
  {
    src: '/portfolio_images/photo-output (13).JPEG',
    alt: 'Signature Glow Finish',
    title: 'Signature Glow',
    category: 'Bridal Makeover',
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: -1,
  },
  {
    src: '/portfolio_images/photo-output (12).JPEG',
    alt: 'Luxury Airbrush Artistry',
    title: 'Luxury Airbrush',
    category: 'Airbrush Artistry',
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: 1,
  },
  {
    src: '/portfolio_images/photo-output (9).JPEG',
    alt: 'Elegant Event Makeup',
    title: 'Evening Elegance',
    category: 'Event Glamour',
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: -1,
  },
  {
    src: '/portfolio_images/photo-output.JPEG',
    alt: 'Nizan Signature Bridal Look',
    title: 'Signature Bridal',
    category: 'Bridal Makeover',
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: 1,
  },
];




const layoutPresets: Array<Pick<PortfolioCard, 'gridClass' | 'aspect' | 'parallaxDir'>> = [
  {
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: 1,
  },
  {
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: -1,
  },
  {
    gridClass: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[3/4]',
    parallaxDir: 1,
  },
  {
    gridClass: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[16/9]',
    parallaxDir: -1,
  },
];

interface BackendPortfolioItem {
  id: string;
  title: string;
  category?: string;
  alt_text?: string;
  image_url: string;
  status?: string;
  sort_order?: number;
}

function ParallaxPortfolioItem({
  src,
  alt,
  title,
  category,
  gridClass,
  aspect,
  parallaxDir,
  index,
}: PortfolioCard & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxDir * 40, parallaxDir * -40]
  );
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={`${gridClass} relative overflow-hidden group cursor-pointer`}
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.13,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={`${aspect} relative overflow-hidden`}>
        <motion.div className="absolute inset-[-10%] w-[120%] h-[120%]" style={{ y }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </motion.div>

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(to top, rgba(6,15,34,0.95) 0%, rgba(11,27,59,0.3) 55%, transparent 100%)',
            opacity: 0.7,
          }}
        />
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
          <span className="text-gold text-[10px] tracking-[0.28em] uppercase font-semibold block mb-2">
            {category}
          </span>
          <h3 className="font-display text-xl md:text-2xl text-white font-light leading-tight">
            {title}
          </h3>
        </div>

        <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
        <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
    </motion.div>
  );
}

interface PortfolioProps {
  items?: PortfolioCard[];
  showViewAll?: boolean;
  maxItems?: number;
}

export default function Portfolio({
  items,
  showViewAll = true,
  maxItems,
}: PortfolioProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [remoteItems, setRemoteItems] = useState<PortfolioCard[]>([]);

  useEffect(() => {
    if (items && items.length > 0) return;

    const loadPortfolio = async () => {
      if (!supabase) return;
      
      try {
        const { data: list, error } = await supabase
          .from('portfolio')
          .select('*')
          .eq('status', 'active')
          .order('sort_order', { ascending: true });

        if (error) throw error;

        const mapped = (list || []).map((item: any, index: number) => {
          const preset = layoutPresets[index % layoutPresets.length];
          return {
            src: item.image_url,
            alt: item.alt_text?.trim() || item.title,
            title: item.title,
            category: item.category?.trim() || 'Portfolio',
            ...preset,
          };
        });

        setRemoteItems(mapped);
      } catch (error) {
        console.error('Portfolio fetch error:', error);
        setRemoteItems([]);
      }
    };

    loadPortfolio();
  }, [items]);

  // Calculate resolved items directly without useMemo to avoid hook count issues
  const source =
    items && items.length > 0
      ? items
      : remoteItems.length > 0
        ? remoteItems
        : portfolioItems;

  const resolvedItems = typeof maxItems === 'number' 
    ? source.slice(0, Math.max(0, maxItems)) 
    : source;

  return (
    <section id="portfolio" className="section-dark py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
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

        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {resolvedItems.map((item, i) => (
            <ParallaxPortfolioItem key={`${item.src}-${i}`} {...item} index={i} />
          ))}
        </div>

        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="text-center mt-14"
          >
            <Link
              href="/portfolio"
              className="shimmer-btn inline-flex border border-gold/40 hover:border-gold hover:bg-gold hover:text-navy text-gold text-[11px] tracking-[0.22em] uppercase px-10 py-4 transition-all duration-400 font-medium"
            >
              View Full Portfolio
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
