'use client';

import { Instagram, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  Services: ['Bridal Elegance', 'Event Glamour', 'Editorial & Fashion', 'Skin Preparations'],
  Company: ['About Nizan', 'Our Portfolio', 'Testimonials', 'Contact Us'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Refund Policy'],
};

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-gold/10 pt-20 pb-8">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <span className="font-display text-3xl font-semibold text-white block leading-tight">
                Nizan
              </span>
              <span className="text-xs tracking-[0.25em] text-gold uppercase">Makeovers</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Redefining luxury beauty with artistry, precision, and the finest
              cosmetics available. Every look is a masterpiece.
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-white/15 hover:border-gold flex items-center justify-center text-white/50 hover:text-gold transition-all duration-300 hover:shadow-[0_0_16px_rgba(201,162,39,0.2)]"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/45 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-3 h-px bg-gold/0 group-hover:bg-gold/60 transition-all duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-gold/40 text-xs">✦</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide">
            © 2025 Nizan Makeovers. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Crafted with elegance &amp; passion ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
