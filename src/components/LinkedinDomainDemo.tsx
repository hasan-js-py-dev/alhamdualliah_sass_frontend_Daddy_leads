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
  const [currentActiveIndex, setCurrentActiveIndex] = useState(-1);
  const [shouldReset, setShouldReset] = useState(false);

  const mockData: Record<'domain' | 'linkedin', EnrichData[]> = {
    domain: [
      {
        type: 'domain',
        input: 'acme.com',
        name: 'John Smith',
        title: 'CEO',
        company: 'Acme Corp',
        email: 'john@acme.com',
        location: 'San Francisco',
      },
      {
        type: 'domain',
        input: 'techco.io',
        name: 'Emily Davis',
        title: 'CTO',
        company: 'TechCo',
        email: 'emily@techco.io',
        location: 'Austin',
      },
      {
        type: 'domain',
        input: 'innovate.ai',
        name: 'Michael Chen',
        title: 'Founder',
        company: 'Innovate AI',
        email: 'michael@innovate.ai',
        location: 'Seattle',
      },
      {
        type: 'domain',
        input: 'salesforce.com',
        name: 'Jessica Brown',
        title: 'VP Marketing',
        company: 'Salesforce',
        email: 'jess@salesforce.com',
        location: 'San Francisco',
      },
    ],
    linkedin: [
      {
        type: 'linkedin',
        input: 'linkedin.com/in/sarah-j',
        name: 'Sarah Johnson',
        title: 'VP Sales',
        company: 'TechStart Inc',
        email: 'sarah@techstart.com',
        location: 'New York',
      },
      {
        type: 'linkedin',
        input: 'linkedin.com/in/alex-k',
        name: 'Alex Kumar',
        title: 'Product Lead',
        company: 'CloudBase',
        email: 'alex@cloudbase.io',
        location: 'Boston',
      },
      {
        type: 'linkedin',
        input: 'linkedin.com/in/maria-g',
        name: 'Maria Garcia',
        title: 'Head of Ops',
        company: 'DataFlow',
        email: 'maria@dataflow.com',
        location: 'Chicago',
      },
      {
        type: 'linkedin',
        input: 'linkedin.com/in/david-w',
        name: 'David Wilson',
        title: 'Engineering Dir',
        company: 'DevTools',
        email: 'david@devtools.ai',
        location: 'Denver',
      },
    ],
  };

  useEffect(() => {
    const sequence = async () => {
      // Reset all rows
      setShouldReset(true);
      setCurrentActiveIndex(-1);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setShouldReset(false);

      // Enrich each row sequentially
      for (let i = 0; i < 4; i++) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setCurrentActiveIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 1800));
      }

      // Wait before switching mode
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Switch mode
      setCurrentMode((prev) => (prev === 'domain' ? 'linkedin' : 'domain'));
    };

    // Start the sequence after a short delay
    const timer = setTimeout(sequence, 500);
    const interval = setInterval(sequence, 11000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
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

        {/* Data Rows */}
        <div className="space-y-2">
          <AnimatePresence mode="wait">
            {mockData[currentMode].map((data, index) => (
              <motion.div
                key={`${currentMode}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <EnrichRow
                  data={data}
                  triggerEnrich={currentActiveIndex === index}
                  shouldReset={shouldReset}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default LinkedinDomainDemo;
