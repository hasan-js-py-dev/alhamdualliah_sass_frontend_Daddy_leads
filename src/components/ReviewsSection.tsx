import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Users } from 'lucide-react';
import { Button } from './ui/button';
import ReviewCard from './ReviewCard';
import chromeIcon from '@/assets/chrome-extension-icon.png';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ReviewsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const reviews = [
    {
      name: "Moustapha A.",
      title: "CEO & Co-founder",
      company: "Small-Business (50 or fewer emp.)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Amazing SaaS! Amazing customer service. It is extremely simple to use and perfectly efficient. Extracting a database from LinkedIn Sales Navigator has never been easier.",
      source: 'g2' as const,
      date: "Jun 7, 2024"
    },
    {
      name: "Oscar Goodwin-Monteagudo",
      title: "Sales Manager",
      company: "Mid-Market Company",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Ease of use is super straightforward! Everything I need. Great tool for a sales person! Thank you. Have recommended to my team.",
      source: 'chrome_web_store' as const,
      date: "Jul 22, 2024"
    },
    {
      name: "Phil Lotter",
      title: "Business Development Lead",
      company: "Enterprise",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Great tool to use in business development to get info from LinkedIn Leads to your CRM system. Also like the safe email option which means better delivery rates.",
      source: 'chrome_web_store' as const,
      date: "Jun 12, 2024"
    },
    {
      name: "Zach Ledner",
      title: "Director of Partnerships at Voxel",
      company: "Tech Startup",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Daddy Leads is the only company I could find that easily enables users to quickly export sales nav leads to excel. The exported data also includes LinkedIn profile headlines and summaries which is a HUGE help. Would absolutely recommend.",
      source: 'chrome_web_store' as const,
      date: "Apr 19, 2024"
    },
    {
      name: "Mounika P.",
      title: "Digital Marketing Analyst",
      company: "Small-Business (50 or fewer emp.)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "I can extract all the leads from sales navigator along with verified emails all at once. This cuts a lot of time and effort. I can integrate with my Sales navigator with just 1 click. Also I can use credits as per my requirements as many times I want.",
      source: 'g2' as const,
      date: "Dec 29, 2024"
    },
    {
      name: "Sadashiv Borgaonkar",
      title: "Sales Operations Manager",
      company: "Enterprise",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "I have been using Daddy Leads since its launch date. Initially, the tool was not very effective in obtaining accurate emails. However, it has significantly improved. It is 100% reliable and safe. Use it without any hesitation.",
      source: 'chrome_web_store' as const,
      date: "Sep 15, 2024"
    },
    {
      name: "Chris Radvansky",
      title: "Business Development",
      company: "Tech Company",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Easy to use and great tool to have! Not too costly either. Highly recommend for lead generation.",
      source: 'chrome_web_store' as const,
      date: "Jul 17, 2024"
    },
    {
      name: "Richard Parmar",
      title: "Sales Director",
      company: "Mid-Market",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "One of the best tools to download lists out of LinkedIn Sales Navigator. Very satisfied with the experience.",
      source: 'chrome_web_store' as const,
      date: "Jul 7, 2024"
    },
    {
      name: "Caroline Forest",
      title: "Business Development Manager",
      company: "Small Business",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Must-have tool for anyone in business development or sales for prospecting. Easy to use and the quality of the information is quite good. They are even flexible for small users like me. I highly recommend.",
      source: 'chrome_web_store' as const,
      date: "May 30, 2024"
    },
    {
      name: "Matt R.",
      title: "International Go To Market Consultant",
      company: "Small-Business (50 or fewer emp.)",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "I've used dozens of LI scrapers, but they all have a major issue. Daddy Leads has finally figured it out by not trusting LinkedIn blindly. You scrape your Sales Nav search and Daddy Leads cleans up your search results. Daddy Leads is the first scraper that builds lists I can trust.",
      source: 'g2' as const,
      date: "Jan 11, 2024"
    }
  ];

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFE5D9] via-[#FFD4C4] to-[#FFBFA9]" style={{ paddingBottom: '0px' }}>
      {/* Top curved edge - transitioning from black */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-[100px] md:h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
            fill="#000000"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Loved by{' '}
            </span>
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent">
              10,000+
            </span>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {' '}Sales Professionals
            </span>
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            See what our customers have to say about their experience with Daddy Leads
          </p>
        </motion.div>

        {/* Scrolling Reviews */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <style>
            {`
              @keyframes scroll-reviews {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-33.333%);
                }
              }
              
              .animate-scroll-reviews {
                animation: scroll-reviews 60s linear infinite;
              }
              
              .animate-scroll-reviews.paused {
                animation-play-state: paused;
              }
              
              @media (prefers-reduced-motion: reduce) {
                .animate-scroll-reviews {
                  animation: none;
                }
              }
            `}
          </style>
          
          <div className={`flex gap-6 animate-scroll-reviews ${isPaused ? 'paused' : ''}`}>
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>

        {/* Safe, GDPR, Scalable Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-12 px-6">
            {/* Safe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="relative animate-icon-float">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-lg animate-pulse-glow">
                    <Shield className="w-16 h-16 text-[#6366F1]" strokeWidth={2} />
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6, type: "spring" }}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-[#6366F1] rounded-full flex items-center justify-center shadow-lg animate-badge-bounce"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Safe</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Make sure your account never goes above the scraping limitations set by LinkedIn.
              </p>
            </motion.div>

            {/* GDPR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="relative animate-icon-float" style={{ animationDelay: '0.5s' }}>
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-lg animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                    <FileCheck className="w-16 h-16 text-[#6366F1]" strokeWidth={2} />
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                      className="absolute top-4 right-4 w-10 h-10 bg-[#6366F1] rounded-full flex items-center justify-center shadow-lg animate-badge-bounce"
                      style={{ animationDelay: '0.3s' }}
                    >
                      <Shield className="w-5 h-5 text-white" strokeWidth={3} />
                    </motion.div>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">GDPR</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Make your lead generation process GDPR compliant without effort.
              </p>
            </motion.div>

            {/* Scalable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="relative animate-icon-float" style={{ animationDelay: '1s' }}>
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-lg animate-pulse-glow" style={{ animationDelay: '1s' }}>
                    <Users className="w-16 h-16 text-[#6366F1]" strokeWidth={2} />
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
                      className="absolute top-3 right-3 w-8 h-8 bg-[#6366F1] rounded-full flex items-center justify-center shadow-lg animate-badge-bounce"
                      style={{ animationDelay: '0.6s' }}
                    >
                      <span className="text-white text-xs font-bold">3+</span>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.9, type: "spring" }}
                      className="absolute bottom-3 right-3 w-6 h-6 bg-[#6366F1] rounded-full flex items-center justify-center shadow-lg animate-badge-bounce"
                      style={{ animationDelay: '0.9s' }}
                    >
                      <Shield className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Scalable</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Connect all your Sales Navigator accounts and collaborate with your team.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Cookie Handler Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 max-w-2xl mx-auto px-6 mb-4"
        >
          {/* Main Card */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl px-8 py-12 shadow-2xl overflow-hidden border border-white/20">
            {/* Animated Stars Background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a 
                  href="https://cookie-editor.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    className="relative bg-white/90 text-[#5B21B6] hover:bg-white px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 animate-button-shake"
                    style={{
                      boxShadow: '0 8px 0 #d1d5db, 0 12px 25px rgba(0, 0, 0, 0.5)',
                      transform: 'translateY(0px)',
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'translateY(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 0 #d1d5db, 0 8px 15px rgba(0, 0, 0, 0.4)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 8px 0 #d1d5db, 0 12px 25px rgba(0, 0, 0, 0.5)';
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 0 #d1d5db, 0 16px 30px rgba(0, 0, 0, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 8px 0 #d1d5db, 0 12px 25px rgba(0, 0, 0, 0.5)';
                    }}
                  >
                    Download Cookie Handler Extension
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-6xl mx-auto px-6 mb-20"
        >
          <div className="bg-gradient-to-br from-white/50 via-blue-50/40 to-purple-50/30 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Title Section */}
              <div className="lg:col-span-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              {/* FAQ Accordion */}
              <div className="lg:col-span-8">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="item-0"
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/50 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        How does the LinkedIn scraping process work?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Our LinkedIn scrapers use advanced automation to extract data from LinkedIn Sales Navigator, LinkedIn profiles, and company pages. Simply provide your search criteria or profile URLs, and our tool will collect names, titles, companies, emails, and other relevant information in minutes. All data is exported in CSV format for easy integration with your CRM.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-1"
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/50 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        Do you provide emails for all the leads that you scrape?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Yes! Our Email Enricher automatically finds and verifies professional email addresses for the leads we scrape. We use multiple data sources and verification methods to ensure high accuracy rates (95%+). If an email isn't available in our database, we use advanced algorithms to generate and verify potential email addresses.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/50 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        What is the difference between Email Enricher and Email Verifier?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Email Enricher finds missing email addresses for your leads by searching across multiple databases and using intelligent email pattern matching. Email Verifier checks if existing email addresses are valid, deliverable, and active by performing real-time verification checks including syntax validation, domain verification, and mailbox confirmation.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/50 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        Can I scrape data from Apollo, ZoomInfo, and other B2B databases?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Absolutely! We offer specialized scrapers for Apollo, ZoomInfo, Crunchbase, and other major B2B databases. These scrapers can extract company information, contact details, funding data, and technographic information. You can use filters to target specific industries, company sizes, locations, and more.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/50 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        How long does it take to complete a scraping request?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Processing time depends on the size of your request. Small batches (up to 500 leads) typically complete in 5-15 minutes. Medium batches (500-2,000 leads) take 30-60 minutes. Large requests (2,000+ leads) may take 2-4 hours. You'll receive an email notification when your data is ready for download.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-5"
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/50 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        Is the data scraping compliant with LinkedIn's terms of service?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      We prioritize ethical data collection practices. Our tools are designed for legitimate business purposes such as lead generation, market research, and recruitment. We recommend users review and comply with LinkedIn's terms of service and applicable data protection regulations (GDPR, CCPA) in their jurisdiction. Users are responsible for how they use the collected data.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-6"
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/50 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        What file formats do you support for data export and import?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      We support CSV (Comma Separated Values) and Excel (XLSX) formats for both import and export. You can upload your existing lead lists for enrichment or verification, and download the processed results in your preferred format. Our CSV files are compatible with all major CRM systems including Salesforce, HubSpot, Pipedrive, and more.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;

