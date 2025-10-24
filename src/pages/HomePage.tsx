import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Settings, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturePills from '../components/FeaturePills';
import WaveTransition from '../components/WaveTransition';
import TrustedBySection from '../components/TrustedBySection';
import ProductShowcase from '../components/ProductShowcase';
import EnrichSection from '../components/EnrichSection';

const HomePage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeLogo, setActiveLogo] = useState(0);
  const features = [
    { icon: Users, text: '👥 10000+ active user' },
    { icon: Settings, text: '🛠️ 20+ different scrapers' },
    { icon: CheckCircle, text: '✅ Verify 15+ million contacts/month' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setActiveLogo((prev) => (prev + 1) % 8); // 8 logos total
    }, 2500);
    return () => clearInterval(logoInterval);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Daddy Leads (DL) — Apify Alternative: Automate B2B Prospecting
        </title>
        <meta
          name="description"
          content="Daddy Leads automates your B2B prospecting with powerful LinkedIn & Sales Navigator scraping, domain/profile enrichment, email validation, B2B databases scraping, and web scraping tools. The ultimate Apify alternative for lead generation."
        />
        <meta
          property="og:title"
          content="Daddy Leads (DL) — Apify Alternative: Automate B2B Prospecting"
        />
        <meta
          property="og:description"
          content="Automate your B2B prospecting with powerful LinkedIn scraping, email validation, and enrichment tools. 10000+ active users trust Daddy Leads."
        />
      </Helmet>
      <div className="min-h-[100dvh] hero-gradient relative overflow-hidden pb-12">
        <Navbar />
        
        <HeroSection />
        
        <section className="relative pb-4 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <FeaturePills features={features} activeIndex={activeFeature} />
          </div>
        </section>
        
        <TrustedBySection activeIndex={activeLogo} />
        
        <WaveTransition />
      </div>

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Email Enrichment Section */}
      <EnrichSection />
    </>
  );
};

export default HomePage;
