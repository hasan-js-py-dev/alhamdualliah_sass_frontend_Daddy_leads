import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { SIGNUP_URL } from '@/config/domains';

const PricingPage = () => {
  const [leadsQuantity, setLeadsQuantity] = useState<number>(1000);
  const [dataQuantity, setDataQuantity] = useState<number>(1000);

  const leadsPrice = 0.001;
  const dataPrice = 0.0005;

  const leadsFeatures = [
    'LinkedIn Sales Nav Scraper',
    'Email Enricher',
    'Domain Enricher',
    'LinkedIn Profile Scraper',
    'Apollo Scraper',
    'Zoominfo Scraper',
    'Crunchbase Scraper',
    'Lemlist Scraper'
  ];

  const dataFeatures = [
    'Email Verifier',
    'LinkedIn Sales Nav Company Scraper',
    'Yelp Scraper',
    'Google Map Scraper',
    'Restaurant Directories',
    'RealEstate Directories',
    'Scrape Companies from b2b Databases'
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - Affordable B2B Lead Scraping Plans | Daddy Leads</title>
        <meta name="description" content="Pay-as-you-go pricing for B2B lead scraping. Start at $0.001 per valid email or $0.0005 per data scrape. Access 20+ scrapers with no hidden fees." />
      </Helmet>
      
      <div className="min-h-screen" style={{ backgroundColor: '#faf8f0' }}>
        <Navbar />
        
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#411c78' }}>
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Pay only for what you use. No subscriptions, no hidden fees. Choose the plan that fits your lead generation needs.
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* B2B Leads Finder Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full border-2 hover:shadow-xl transition-shadow" style={{ borderColor: '#411c78' }}>
                  <CardHeader>
                    <CardTitle className="text-2xl" style={{ color: '#411c78' }}>B2B LEADS FINDER</CardTitle>
                    <CardDescription className="text-lg font-semibold text-gray-700">
                      ${leadsPrice} per valid email
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Calculator */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">Number of emails:</label>
                      <Input
                        type="number"
                        min="1"
                        value={leadsQuantity}
                        onChange={(e) => setLeadsQuantity(Number(e.target.value) || 0)}
                        className="text-lg"
                      />
                      <div className="p-4 rounded-lg" style={{ backgroundColor: '#411c78' }}>
                        <p className="text-white text-center text-2xl font-bold">
                          ${(leadsQuantity * leadsPrice).toFixed(2)}
                        </p>
                        <p className="text-white/80 text-center text-sm">Total Cost</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-700">Included Scrapers:</p>
                      {leadsFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#411c78' }} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full" style={{ backgroundColor: '#411c78' }}>
                      <a href={SIGNUP_URL}>Get Started</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* B2B Data Scraper Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="h-full border-2 hover:shadow-xl transition-shadow" style={{ borderColor: '#411c78' }}>
                  <CardHeader>
                    <CardTitle className="text-2xl" style={{ color: '#411c78' }}>B2B DATA SCRAPER</CardTitle>
                    <CardDescription className="text-lg font-semibold text-gray-700">
                      ${dataPrice} per successful data scrape
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Calculator */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">Number of records:</label>
                      <Input
                        type="number"
                        min="1"
                        value={dataQuantity}
                        onChange={(e) => setDataQuantity(Number(e.target.value) || 0)}
                        className="text-lg"
                      />
                      <div className="p-4 rounded-lg" style={{ backgroundColor: '#411c78' }}>
                        <p className="text-white text-center text-2xl font-bold">
                          ${(dataQuantity * dataPrice).toFixed(2)}
                        </p>
                        <p className="text-white/80 text-center text-sm">Total Cost</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-700">Included Scrapers:</p>
                      {dataFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#411c78' }} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full" style={{ backgroundColor: '#411c78' }}>
                      <a href={SIGNUP_URL}>Get Started</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Get Connected Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-16 space-y-6"
            >
              <h3 className="text-2xl font-bold" style={{ color: '#411c78' }}>
                Get Connected
              </h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Have questions about pricing? Connect with us for personalized assistance
              </p>
              <TooltipProvider>
                <div className="flex justify-center gap-6">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://wa.me/message/UPRRNRLKPFAQL1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                      >
                        <MessageCircle className="w-7 h-7" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>WhatsApp</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://t.me/daddyleadss"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #0088cc, #006699)' }}
                      >
                        <Send className="w-7 h-7" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Telegram</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://discord.gg/daddyleadss"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #5865F2, #4752C4)' }}
                      >
                        <MessageCircle className="w-7 h-7" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Discord</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </motion.div>
          </div>
        </main>

        {/* FAQ Section */}
        <div style={{ backgroundColor: '#faf8f0' }}>
          <FAQSection />
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: '#faf8f0' }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PricingPage;
