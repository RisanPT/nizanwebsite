import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import Services from '@/components/Services';

export const metadata: Metadata = {
  title: 'Bridal Makeup Services | Nizan Makeovers',
  description:
    'Explore Nizan Makeovers bridal and signature makeup services crafted for weddings, engagements, editorial shoots, and luxury beauty events.',
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Luxury Services"
        title="Bridal & Signature Makeup Services"
        description="Explore our premium beauty offerings designed for unforgettable weddings, refined occasions, and graceful bridal transformations."
      />
      <Services />
    </PageShell>
  );
}
