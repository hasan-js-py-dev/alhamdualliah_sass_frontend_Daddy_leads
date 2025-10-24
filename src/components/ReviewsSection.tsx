import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Users } from 'lucide-react';
import { Button } from './ui/button';
import ReviewCard from './ReviewCard';
import chromeIcon from '@/assets/chrome-icon.png';

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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFE5D9] via-[#FFD4C4] to-[#FFBFA9]" style={{ paddingBottom: '120px' }}>
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
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-r from-[#6713e1] via-[#7c3aed] to-[#8b5cf6] rounded-3xl p-12 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
            </div>

            {/* Chrome Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                <img src={chromeIcon} alt="Chrome" className="w-16 h-16" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center pt-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Download LinkedIn Cookie Handler
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <a 
                  href="https://cookie-editor.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    className="bg-white text-[#6713e1] hover:bg-gray-50 px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-button-shake"
                  >
                    Download Extension
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -mb-16 -ml-16"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mt-20 -mr-20"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
