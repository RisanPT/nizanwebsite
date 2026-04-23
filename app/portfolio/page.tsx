import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import Portfolio from '@/components/Portfolio';

export const metadata: Metadata = {
  title: 'Portfolio | Nizan Makeovers Bridal Transformations',
  description:
    'Browse the bridal, editorial, and event makeover portfolio of Nizan Makeovers featuring signature luxury beauty transformations.',
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Selected Work"
        title="Portfolio of Bridal Transformations"
        description="View a larger curated gallery of bridal, editorial, reception, and occasion looks shaped with elegance, precision, and luxury artistry."
      />
      <Portfolio showViewAll={false} />
    </PageShell>
  );
}
