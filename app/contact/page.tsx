import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Nizan Makeovers | Bridal Makeup Booking',
  description:
    'Contact Nizan Makeovers for bridal makeup bookings, luxury makeover enquiries, and service consultations.',
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact Nizan"
        title="Book Your Bridal Experience"
        description="Reach out for bridal bookings, makeover consultations, and personalised beauty planning with Nizan Makeovers."
      />
      <Contact />
    </PageShell>
  );
}
