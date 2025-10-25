import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Database, Mail, Globe, UserCheck, MapPin, Building2, MessageCircle, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const products = [
  {
    id: 'linkedin-sales-nav',
    name: 'LinkedIn Sales Nav Scraper',
    icon: Database,
    subtitle: 'Extract unlimited leads from LinkedIn Sales Navigator with advanced filters',
    features: [
      'Extract leads with email, phone, and company data',
      'Advanced search filters for precise targeting',
      'Export to CSV with CRM-ready format'
    ]
  },
  {
    id: 'email-enricher',
    name: 'Email Enricher',
    icon: Mail,
    subtitle: 'Find professional email addresses for any lead with 95%+ accuracy',
    features: [
      'Multi-source email discovery across databases',
      'Intelligent email pattern matching algorithms',
      'Real-time verification included'
    ]
  },
  {
    id: 'domain-enricher',
    name: 'Domain Enricher',
    icon: Globe,
    subtitle: 'Enrich company data using domain names for complete business intelligence',
    features: [
      'Company information and employee count',
      'Technology stack and industry classification',
      'Social media profiles and contact details'
    ]
  },
  {
    id: 'linkedin-profile',
    name: 'LinkedIn Profile Scraper',
    icon: UserCheck,
    subtitle: 'Extract detailed information from any LinkedIn profile instantly',
    features: [
      'Complete profile data including experience and skills',
      'Contact information discovery',
      'Export multiple profiles in bulk'
    ]
  },
  {
    id: 'email-verifier',
    name: 'Email Verifier',
    icon: Check,
    subtitle: 'Validate email addresses to improve deliverability and reduce bounce rates',
    features: [
      'Syntax and domain verification checks',
      'Mailbox existence confirmation',
      'Spam trap and disposable email detection'
    ]
  },
  {
    id: 'apollo-scraper',
    name: 'Apollo Scraper',
    icon: Database,
    subtitle: 'Extract contact and company data from Apollo.io for targeted outreach',
    features: [
      'Scrape Apollo search results and saved lists',
      'Get verified contact information',
      'Export with custom field mapping'
    ]
  },
  {
    id: 'zoominfo-scraper',
    name: 'Zoominfo Scraper',
    icon: Building2,
    subtitle: 'Access ZoomInfo data for enterprise-level lead generation campaigns',
    features: [
      'Extract decision-maker contact details',
      'Company firmographic data',
      'Intent data and technographic insights'
    ]
  },
  {
    id: 'google-map-scraper',
    name: 'Google Map & Directories Scraper',
    icon: MapPin,
    subtitle: 'Scrape local business data from Google Maps and online directories',
    features: [
      'Business name, address, phone, and website',
      'Reviews and ratings extraction',
      'Category-based bulk scraping'
    ]
  },
  {
    id: 'crunchbase-scraper',
    name: 'Crunchbase Scraper',
    icon: Building2,
    subtitle: 'Extract startup and funding data from Crunchbase for investor intelligence',
    features: [
      'Company funding rounds and investors',
      'Founder and executive team details',
      'Acquisition and IPO information'
    ]
  },
  {
    id: 'lemlist-scraper',
    name: 'Lemlist Scraper',
    icon: Send,
    subtitle: 'Export campaign data and leads from Lemlist for analysis',
    features: [
      'Campaign performance metrics',
      'Lead engagement tracking',
      'Export to CSV for external analysis'
    ]
  }
];

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  return (
    <>
      <Helmet>
        <title>Multi-Source Lead Scraper Tools - Extract B2B Leads at Low Cost | Daddy Leads</title>
        <meta 
          name="description" 
          content="Access 20+ powerful scrapers to extract fresh B2B leads from LinkedIn, Apollo, ZoomInfo, Google Maps, and more. Affordable pricing with email enrichment and verification included." 
        />
        <meta 
          name="keywords" 
          content="lead scraper, LinkedIn scraper, email enricher, B2B lead generation, Apollo scraper, ZoomInfo scraper, Google Maps scraper, Crunchbase data, email verifier" 
        />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: '#faf8f0' }}>
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Extract B2B Leads from 20+ Sources
              <br />
              <span className="text-[#6713e1]">at Unbeatable Prices</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Daddy Leads gives you access to 20+ professional scrapers to extract fresh, verified leads from LinkedIn, Apollo, ZoomInfo, Google Maps, and more—all at competitive prices.
            </motion.p>
          </div>
        </section>

        {/* Main Product Section */}
        <section className="pb-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - Product List */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                    DATA ENRICHMENT SERVICES
                  </h3>
                  <div className="space-y-2">
                    {products.map((product, index) => (
                      <motion.button
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                          selectedProduct.id === product.id
                            ? 'bg-[#5b4cee] text-white shadow-lg'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <product.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">{product.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="lg:col-span-8">
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5b4cee] to-[#7c3aed] flex items-center justify-center text-white shadow-lg">
                      <selectedProduct.icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {selectedProduct.name}
                    </h2>
                  </div>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {selectedProduct.subtitle}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Includes:</h3>
                    <div className="space-y-3">
                      {selectedProduct.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#5b4cee] flex-shrink-0 mt-1" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to="/access?p=signup">
                    <Button 
                      size="lg"
                      className="w-full bg-[#5b4cee] hover:bg-[#4c3dd8] text-white py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      GET STARTED
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div style={{ backgroundColor: '#faf8f0' }}>
          <FAQSection />
        </div>

        {/* CTA Section with Social Icons */}
        <section className="py-16 px-6" style={{ backgroundColor: '#faf8f0' }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Link to="/access?p=signup">
                <Button 
                  size="lg"
                  className="bg-[#5b4cee] hover:bg-[#4c3dd8] text-white px-12 py-6 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Get Started Now
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex justify-center gap-6 mb-8"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
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
                      href="https://t.me/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0088cc] to-[#006699] flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
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
                      href="https://discord.gg/yourinvite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5865F2] to-[#4752C4] flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                    >
                      <MessageCircle className="w-7 h-7" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Discord</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-sm"
            >
              Connect with us for a personalized demo
            </motion.p>
          </div>
        </section>

        {/* Footer */}
        <div style={{ backgroundColor: '#faf8f0' }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
