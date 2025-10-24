import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnrichData {
  type: 'domain' | 'linkedin';
  input: string;
  name?: string;
  title?: string;
  company?: string;
  email?: string;
  location?: string;
}

interface EnrichRowProps {
  data: EnrichData;
  triggerEnrich: boolean;
  shouldReset: boolean;
}

const EnrichRow = ({ data, triggerEnrich, shouldReset }: EnrichRowProps) => {
  const [enriching, setEnriching] = useState(false);
  const [enriched, setEnriched] = useState(false);

  useEffect(() => {
    if (shouldReset) {
      setEnriching(false);
      setEnriched(false);
    }
  }, [shouldReset]);

  useEffect(() => {
    if (triggerEnrich && !enriching && !enriched) {
      setEnriching(true);
      const timer = setTimeout(() => {
        setEnriching(false);
        setEnriched(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [triggerEnrich, enriching, enriched]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-6 gap-2 py-3 px-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40 shadow-sm"
    >
      {/* Input Column (Domain or LinkedIn) */}
      <div className="col-span-1 flex items-center">
        <span className="text-xs font-medium bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent truncate">
          {data.input}
        </span>
      </div>

      {/* Name */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-name"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-medium bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent"
            >
              {data.name}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>

      {/* Title */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-gray-700 truncate"
            >
              {data.title}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>

      {/* Company */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-company"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-company"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-gray-700 truncate"
            >
              {data.company}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>

      {/* Email */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-email"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-email"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent animate-shimmer truncate"
              style={{ backgroundSize: '200% 100%' }}
            >
              {data.email}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>

      {/* Location */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-location"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-location"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-gray-700 truncate"
            >
              {data.location}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const LinkedinDomainDemo = () => {
  const [currentMode, setCurrentMode] = useState<'domain' | 'linkedin'>('domain');
  const [triggerEnrich, setTriggerEnrich] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const mockData: Record<'domain' | 'linkedin', EnrichData> = {
    domain: {
      type: 'domain',
      input: 'acme.com',
      name: 'John Smith',
      title: 'CEO',
      company: 'Acme Corp',
      email: 'john@acme.com',
      location: 'San Francisco',
    },
    linkedin: {
      type: 'linkedin',
      input: 'linkedin.com/in/sarah-j',
      name: 'Sarah Johnson',
      title: 'VP Sales',
      company: 'TechStart Inc',
      email: 'sarah@techstart.com',
      location: 'New York',
    },
  };

  useEffect(() => {
    const sequence = async () => {
      // Wait a bit, then start enriching
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTriggerEnrich(true);

      // Wait for enrichment to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Wait to show the result
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset and switch mode
      setShouldReset(true);
      await new Promise((resolve) => setTimeout(resolve, 100));
      setShouldReset(false);
      setTriggerEnrich(false);
      setCurrentMode((prev) => (prev === 'domain' ? 'linkedin' : 'domain'));
    };

    sequence();
    const interval = setInterval(sequence, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6"
      >
        {/* Header with mode indicator */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            {currentMode === 'domain' ? 'Domain Enrichment' : 'LinkedIn Profile Enrichment'}
          </h3>
          <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full ${currentMode === 'domain' ? 'bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] animate-pulse' : 'bg-gray-300'}`} />
            <div className={`w-2 h-2 rounded-full ${currentMode === 'linkedin' ? 'bg-gradient-to-r from-[#14F195] to-[#9945FF] animate-pulse' : 'bg-gray-300'}`} />
          </div>
        </div>

        {/* CSV Header */}
        <div className="grid grid-cols-6 gap-2 mb-3 px-4 py-2 bg-gradient-to-r from-[#FF6B35]/10 via-[#FF8C42]/10 to-[#FFA07A]/10 rounded-lg border border-[#FF6B35]/20">
          <div className="col-span-1 text-xs font-bold text-gray-700">
            {currentMode === 'domain' ? 'Domain' : 'LinkedIn'}
          </div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Name</div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Title</div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Company</div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Email</div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Location</div>
        </div>

        {/* Data Row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMode}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <EnrichRow
              data={mockData[currentMode]}
              triggerEnrich={triggerEnrich}
              shouldReset={shouldReset}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LinkedinDomainDemo;
