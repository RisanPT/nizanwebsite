import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import Team from '@/components/Team';
import Branches from '@/components/Branches';

export const metadata: Metadata = {
  title: 'Team Nizan Makeovers | Bridal Makeup Experts',
  description:
    'Meet the Nizan Makeovers team of bridal makeup artists and explore the expert branch teams serving clients across India.',
};

export default function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Meet The Team"
        title="Experts Behind Every Bridal Look"
        description="Meet the artists behind Nizan Makeovers and explore the talented teams delivering signature beauty experiences across our branches."
      />
      <Team />
      <Branches />
    </PageShell>
  );
}
