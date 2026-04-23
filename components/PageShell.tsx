'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { WHATSAPP_URL } from '@/lib/constants';


interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className={`min-h-screen ${isBookingOpen ? 'overflow-hidden' : ''}`}>
      <Header onBook={() => window.open(WHATSAPP_URL, '_blank')} />

      {children}
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
