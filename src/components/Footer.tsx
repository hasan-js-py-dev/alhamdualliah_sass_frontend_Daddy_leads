import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  const scrapers = [
    'LinkedIn Sales Nav Scraper',
    'Email Enricher',
    'Domain Enricher',
    'LinkedIn Profile Scraper',
    'Email Verifier',
    'Apollo Scraper',
    'Zoominfo Scraper',
    'Google Map & Directories Scraper',
    'Crunchbase Scraper',
    'Lemlist Scraper',
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black/60 via-black/80 to-black text-white pt-16 pb-8" style={{ marginTop: '-200px' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 bg-black/40 backdrop-blur-sm rounded-3xl py-12 shadow-2xl border border-white/10">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 px-6">
          {/* Company Info Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Daddy Leads</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Automate your B2B prospecting with powerful LinkedIn scraping, email validation, and enrichment tools. The ultimate solution for lead generation.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:support@daddyleads.com" className="text-sm">
                  support@daddyleads.com
                </a>
              </div>
              
              <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-sm">
                  +1 (234) 567-890
                </a>
              </div>
              
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Scrapers Column - Split into two sub-columns */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6">Our Scrapers</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {scrapers.map((scraper, index) => (
                <Link
                  key={index}
                  to="/product"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {scraper}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get Started</h4>
            <div className="space-y-4">
              <Link to="/pricing" className="block text-white/70 hover:text-white transition-colors text-sm">
                Pricing
              </Link>
              <Link to="/connect" className="block text-white/70 hover:text-white transition-colors text-sm">
                Contact
              </Link>
              
              <div className="pt-4 space-y-3">
                <Link to="/signup">
                  <Button className="w-full bg-white text-black hover:bg-white/90">
                    Sign Up
                  </Button>
                </Link>
                
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8 px-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-white/10 mb-6 mx-6"></div>

        {/* Copyright */}
        <div className="text-center px-6">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Daddy Leads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
