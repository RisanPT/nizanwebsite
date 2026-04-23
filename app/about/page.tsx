import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import WhyChoose from '@/components/WhyChoose';
import About from '@/components/About';
import Branches from '@/components/Branches';

export const metadata: Metadata = {
  title: 'About Nizan Makeovers | Bridal Makeup Artists Across India',
  description:
    'Learn about Nizan Makeovers, our luxury bridal artistry, expert team, signature specialties, and growing branches across India.',
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Nizan"
        title="Our Story & Signature Artistry"
        description="Discover the journey behind Nizan Makeovers, our bridal expertise, and the vision that continues to expand our artistry across India."
      />
      <WhyChoose />
      <About />
      <Branches />
    </PageShell>
  );
}
