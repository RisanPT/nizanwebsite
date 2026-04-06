'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

// Lazy-load below-fold sections
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Portfolio = dynamic(() => import('@/components/Portfolio'), { ssr: false });
const WhyChoose = dynamic(() => import('@/components/WhyChoose'), { ssr: false });
const Pricing = dynamic(() => import('@/components/Pricing'), { ssr: false });
const CTA = dynamic(() => import('@/components/CTA'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <main className={`min-h-screen ${isBookingOpen ? 'overflow-hidden' : ''}`}>
      <Header onBook={openBooking} />
      <Hero onBook={openBooking} />
      <Services />
      <Portfolio />
      <WhyChoose />
      <Pricing />
      <CTA onBook={openBooking} />
      <Contact />
      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </main>
  );
}
